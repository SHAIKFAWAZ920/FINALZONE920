import React from 'react';

export const HeroSection: React.FC = () => {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  return (
    <div className="flex flex-col gap-8 w-full mb-8 animate-fade-in">
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl overflow-hidden group">
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
        
        {/* BADGE */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.2)] flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          🧠 Autonomous Mode Active
        </div>

        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight mt-6 md:mt-0">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            🚀 AI-Powered Real-Time<br/>Crowd Intelligence System
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-medium mb-8 max-w-2xl">
          Predicting congestion, optimizing routes, and enhancing live event experiences using AI.
        </p>
        
        <button
          onClick={openChat}
          className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 ring-2 ring-blue-400/50"
        >
          ✨ Get Smart Recommendations
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-slate-700 shadow-lg hover:border-blue-500 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🧠</div>
          <h3 className="text-xl font-bold text-white mb-2">AI Prediction Engine</h3>
          <p className="text-slate-400 font-medium text-sm">Predicts crowd congestion before it happens</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-slate-700 shadow-lg hover:border-green-500 hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🔄</div>
          <h3 className="text-xl font-bold text-white mb-2">Real-Time Data Sync</h3>
          <p className="text-slate-400 font-medium text-sm">Live updates powered by Firestore</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-slate-700 shadow-lg hover:border-purple-500 hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🗺️</div>
          <h3 className="text-xl font-bold text-white mb-2">Smart Navigation</h3>
          <p className="text-slate-400 font-medium text-sm">Optimized routes based on crowd density</p>
        </div>
      </div>
    </div>
  );
};
