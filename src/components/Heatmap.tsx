import React, { useEffect, useState } from 'react';
import { subscribeToZones } from '../services/db';
import type { Zone } from '../services/db';

export const Heatmap: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToZones(setZones);
    return () => unsubscribe();
  }, []);

  // Simple mock layout for the venue heatmap
  return (
    <div className="bg-card p-5 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Live Crowd Density</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {zones.length === 0 ? (
          <p className="text-slate-400 col-span-full">Waiting for Live Data...</p>
        ) : (
          zones.map((zone) => {
            const getColor = (density: number) => {
              if (density < 40) return 'bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]';
              if (density < 75) return 'bg-orange-500/20 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]';
              return 'bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse';
            };
            return (
              <div
                key={zone.id}
                className={`p-4 rounded-xl border-2 ${getColor(zone.currentDensity)} flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group`}
              >
                {/* Subtle AI scanline effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100"></div>
                <span className="font-bold text-white text-sm text-center relative z-10">{zone.name}</span>
                <span className="text-2xl font-black mt-2 text-white relative z-10 drop-shadow-md">{zone.currentDensity}%</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
