import React, { useEffect, useState } from 'react';
import { subscribeToRoutes } from '../services/db';
import type { Route } from '../services/db';

export const SmartNavigation: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToRoutes(setRoutes);
    return () => unsubscribe();
  }, []);

  if (routes.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-6 rounded-xl border border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.3)] w-full mb-6 relative overflow-hidden group">
      {/* AI Pulse Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[scan_3s_ease-in-out_infinite]"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl animate-pulse drop-shadow-lg">🧭</span>
        <h2 className="text-xl font-bold text-white tracking-widest drop-shadow-md">LIVE INTELLIGENT ROUTING</h2>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {routes.map((route) => (
          <div key={route.id} className="bg-slate-900/60 p-4 rounded-lg border border-indigo-400/30 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-blue-300 font-semibold uppercase tracking-wider">
                Autonomous Reroute Active
              </div>
              <div className="text-sm font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {route.estimatedMinutes} min ETA
              </div>
            </div>

            <p className="text-white text-lg font-medium mb-4">{route.reason}</p>

            {/* Path rendering */}
            <div className="flex flex-wrap items-center gap-2 text-indigo-200 font-medium">
              {route.path.map((node, index) => (
                <React.Fragment key={index}>
                  <div className="bg-indigo-600 px-3 py-1.5 rounded-md shadow-inner text-white text-sm">
                    {node}
                  </div>
                  {index < route.path.length - 1 && (
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
