import React, { useEffect, useState } from 'react';
import { subscribeToDecisions } from '../services/db';
import type { Decision } from '../services/db';

export const LiveDecisions: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToDecisions(setDecisions);
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-card p-5 rounded-xl border border-slate-700 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl animate-pulse">🤖</span>
        <h2 className="text-xl font-semibold text-white">Live System Decisions</h2>
      </div>

      <div className="flex flex-col gap-3 h-56 overflow-y-auto pr-2 custom-scrollbar">
        {decisions.length === 0 ? (
          <p className="text-slate-400 italic text-sm">Monitoring venue conditions...</p>
        ) : (
          decisions.map((decision) => (
            <div 
              key={decision.id} 
              className="bg-slate-800 p-3 rounded-lg border-l-4 border-blue-500 shadow-md animate-fade-in text-sm"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-blue-400 font-bold uppercase text-[10px] tracking-wider">
                  {decision.type}
                </span>
                <span className="text-slate-500 text-[10px]">
                  {decision.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-white font-medium">{decision.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
