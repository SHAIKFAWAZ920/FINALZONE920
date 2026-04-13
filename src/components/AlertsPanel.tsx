import React, { useEffect, useState } from 'react';
import { subscribeToActiveAlerts } from '../services/db';
import type { Alert } from '../services/db';

export const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToActiveAlerts(setAlerts);
    return () => unsubscribe();
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg flex items-start gap-3 border ${
            alert.type === 'critical'
              ? 'bg-red-900/30 border-red-500/50 text-red-100'
              : alert.type === 'warning'
                ? 'bg-orange-900/30 border-orange-500/50 text-orange-100'
                : 'bg-blue-900/30 border-blue-500/50 text-blue-100'
          }`}
        >
          <div>
            <h3 className="font-bold">{alert.title}</h3>
            <p className="text-sm opacity-90">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
