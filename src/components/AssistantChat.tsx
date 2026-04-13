import React, { useState, useEffect } from 'react';

import { getAIPrediction } from '../services/ai';
import { subscribeToZones, subscribeToQueues } from '../services/db';
import type { Zone, Queue } from '../services/db';

export const AssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'system'; text: string }[]>([
    { role: 'system', text: 'Hi! I am EventIQ Assistant. Need help finding a seat or restroom?' },
  ]);

  const [scenarioContext, setScenarioContext] = useState<{ zones: Zone[]; queues: Queue[] }>({
    zones: [],
    queues: [],
  });

  useEffect(() => {
    let zData: Zone[] = [];
    let qData: Queue[] = [];
    const unsubZ = subscribeToZones((z) => {
      zData = z;
      updateCtx();
    });
    const unsubQ = subscribeToQueues((q) => {
      qData = q;
      updateCtx();
    });

    const updateCtx = () => setScenarioContext({ zones: zData, queues: qData });
    
    // Listen for custom event from CTA button
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    
    return () => {
      unsubZ();
      unsubQ();
      window.removeEventListener('open-ai-chat', handleOpenChat);
    };
  }, []);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userQ = query;
    setMessages((prev) => [...prev, { role: 'user', text: userQ }]);
    setQuery('');

    // Show typing state
    setMessages((prev) => [...prev, { role: 'system', text: 'Analyzing...' }]);

    const aiResponse = await getAIPrediction(scenarioContext, userQ);

    setMessages((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { role: 'system', text: aiResponse || 'I am currently analyzing...' }; // replace 'Analyzing...'
      return copy;
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50 flex items-center justify-center border-2 border-blue-400 shadow-blue-500/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-card rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden z-50 animate-fade-in">
          <div className="bg-primary p-4 text-white font-bold flex justify-between items-center">
            <span>EventIQ AI Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-300">
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 h-64 overflow-y-auto flex flex-col gap-3 bg-slate-900">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white self-end rounded-br-none' : 'bg-slate-700 text-slate-100 self-start rounded-bl-none'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleSend}
              className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
