import type { Zone, Queue, Alert, Route, Decision } from './db';
import type { Timestamp } from 'firebase/firestore';

// PREDICTIVE ENGINE DATASETS for DIGITAL TWIN

const baseZones = [
  { id: 'z1', name: 'Gate A Entry', currentDensity: 10, status: 'safe' as const },
  { id: 'z2', name: 'Section 100-110', currentDensity: 40, status: 'safe' as const },
  { id: 'z3', name: 'Food Court North', currentDensity: 80, status: 'crowded' as const },
  { id: 'z4', name: 'Section 200-210', currentDensity: 20, status: 'safe' as const },
  { id: 'z5', name: 'Restroom Block C', currentDensity: 95, status: 'congested' as const },
];

const baseQueues = [
  { id: 'q1', facilityName: 'Burger Stadium', type: 'food' as const, currentWaitTimeMinutes: 5 },
  {
    id: 'q2',
    facilityName: 'North Washrooms',
    type: 'restroom' as const,
    currentWaitTimeMinutes: 12,
  },
  { id: 'q3', facilityName: 'Merch Stand B', type: 'merch' as const, currentWaitTimeMinutes: 25 },
];

// In a real environment, this would write to Firestore.
// For the standalone autonomous platform, we stream real-time system behaviors
// by invoking the callbacks to emulate live network sockets.
export const startSystemEngine = (
  onZoneUpdate: (z: Zone[]) => void,
  onQueueUpdate: (q: Queue[]) => void,
  onAlertUpdate: (a: Alert[]) => void,
  onRouteUpdate: (r: Route[]) => void,
  onDecisionUpdate?: (d: Decision[]) => void
) => {
  let zones = [...baseZones];
  let queues = [...baseQueues];
  let alerts: Alert[] = [];
  let routes: Route[] = [];
  const decisions: Decision[] = [];

  // Initial emit
  onZoneUpdate(zones as Zone[]);
  onQueueUpdate(queues as Queue[]);
  onRouteUpdate(routes as Route[]);

  // Every 5 seconds, alter data realistically
  const interval = setInterval(() => {
    // Modify zones
    zones = zones.map((z) => {
      const shift = Math.floor(Math.random() * 15) - 7;
      const newDensity = Math.max(0, Math.min(100, z.currentDensity + shift));
      const status = newDensity > 85 ? 'congested' : newDensity > 60 ? 'crowded' : 'safe';
      return { ...z, currentDensity: newDensity, status: status as 'safe' | 'crowded' | 'congested' };
    });

    // Modify queues
    queues = queues.map((q) => {
      const shift = Math.floor(Math.random() * 5) - 2;
      const newWait = Math.max(0, Math.min(60, q.currentWaitTimeMinutes + shift));
      return { ...q, currentWaitTimeMinutes: newWait };
    });

    // Generate alerts if congested (Proactive Alert System)
    const congestedZones = zones.filter((z) => z.currentDensity > 85);
    alerts = congestedZones.map((z) => ({
      id: `alert-${z.id}`,
      title: `⚠️ Predictive Alert: ${z.name}`,
      message: `Crowd density escalating rapidly (${z.currentDensity}% capacity). Autonomous rerouting initiated.`,
      type: 'critical',
      active: true,
      timestamp: new Date() as unknown as Timestamp,
    }));

    if (congestedZones.length > 0) {
      routes = [
        {
          id: `route-${Date.now()}`,
          from: 'Main Entrance',
          to: 'Gate C (Alternative)',
          path: ['Main Concourse', 'South Wing', 'Gate C'],
          estimatedMinutes: 4,
          isOptimal: true,
          reason: 'Main Corridors congested. Faster via South Wing.',
          timestamp: new Date() as unknown as Timestamp,
        }
      ];
      
      const latestCongested = congestedZones[0];
      decisions.unshift({
        id: `dec-${Date.now()}`,
        message: `🚨 Redirecting users bound for ${latestCongested.name} to alternative paths.`,
        type: 'redirect',
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
        riskLevel: 'medium',
        reasoning: `Predicted severe bottleneck at ${latestCongested.name} reaching ${latestCongested.currentDensity}% capacity.`
      });
      
    } else {
      if (Math.random() > 0.5) {
        decisions.unshift({
          id: `dec-${Date.now()}`,
          message: `✅ Flow stabilized. Maintain current routing protocols.`,
          type: 'optimization',
          timestamp: new Date(),
          confidence: Math.floor(Math.random() * 5) + 95, // 95-99%
          riskLevel: 'low',
          reasoning: `All sub-sectors under 60% capacity constraint.`
        });
      }
      routes = [
        {
          id: `route-${Date.now()}`,
          from: 'Main Entrance',
          to: 'Any Seat',
          path: ['Main Concourse', 'Direct Access'],
          estimatedMinutes: 2,
          isOptimal: true,
          reason: 'Optimal flow detected. Standard routing active.',
          timestamp: new Date() as unknown as Timestamp,
        }
      ];
    }
    
    // Auto-cleanup decisions if too long
    if (decisions.length > 5) decisions.pop();

    onZoneUpdate(zones as Zone[]);
    onQueueUpdate(queues as Queue[]);
    onAlertUpdate(alerts);
    onRouteUpdate(routes);
    onDecisionUpdate?.(decisions.length ? decisions : [{ id: `fallback-${Date.now()}`, message: 'System Stable — No anomalies detected', type: 'optimization', timestamp: new Date(), confidence: 99, riskLevel: 'low', reasoning: 'Optimal Flow Maintained' }]);
  }, 5000);

  return () => clearInterval(interval);
};
