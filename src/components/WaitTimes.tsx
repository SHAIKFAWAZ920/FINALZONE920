import React, { useEffect, useState } from 'react';
import { subscribeToQueues } from '../services/db';
import type { Queue } from '../services/db';

export const WaitTimes: React.FC = () => {
  const [queues, setQueues] = useState<Queue[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToQueues(setQueues);
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-card p-5 rounded-xl border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Queue Wait Times</h2>
      <div className="flex flex-col gap-3">
        {queues.length === 0 ? (
          <p className="text-slate-400">Waiting for Live Data...</p>
        ) : (
          queues
            .sort((a, b) => a.currentWaitTimeMinutes - b.currentWaitTimeMinutes)
            .map((queue) => (
              <div
                key={queue.id}
                className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {queue.type === 'food' ? '🍔' : queue.type === 'restroom' ? '🚻' : '🛍️'}
                  </span>
                  <span className="font-medium text-white">{queue.facilityName}</span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    queue.currentWaitTimeMinutes > 15
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : queue.currentWaitTimeMinutes > 5
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                        : 'bg-green-500/20 text-green-400 border border-green-500/50'
                  }`}
                >
                  {queue.currentWaitTimeMinutes} min
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};
