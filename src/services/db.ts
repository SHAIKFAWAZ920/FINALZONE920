import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ========================
// SCHEMAS & INTERFACES
// ========================
export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Timestamp;
}

export interface Zone {
  id: string;
  name: string;
  currentDensity: number; // 0 to 100
  status: 'safe' | 'crowded' | 'congested';
  lastUpdated: Timestamp;
}

export interface Queue {
  id: string;
  facilityName: string; // e.g. "Food Counter A" or "Restroom Block B"
  type: 'food' | 'restroom' | 'merch';
  currentWaitTimeMinutes: number;
  lastUpdated: Timestamp;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: Timestamp;
  active: boolean;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  path: string[];
  estimatedMinutes: number;
  isOptimal: boolean;
  reason: string;
  timestamp: Timestamp;
}



export interface Decision {
  id: string;
  message: string;
  type: 'redirect' | 'prediction' | 'optimization';
  timestamp: Date;
  confidence?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  reasoning?: string;
}

// ========================
// DATABASE METHODS
// ========================

// Users
export const createUserProfile = async (user: UserProfile) => {
  const userRef = doc(db!, 'users', user.uid);
  return setDoc(userRef, user, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db!, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

// Fallback arrays for Autonomous Mode
let activeZones: Zone[] = [];
let activeQueues: Queue[] = [];
let activeAlerts: Alert[] = [];
let activeRoutes: Route[] = [];
let activeDecisions: Decision[] = [];
let engineStarted = false;

import { startSystemEngine } from './simulator';

const ensureEngine = () => {
  if (!engineStarted) {
    engineStarted = true;
    startSystemEngine(
      (z) => {
        activeZones = z;
        zoneListeners.forEach((cb) => cb(z));
      },
      (q) => {
        activeQueues = q;
        queueListeners.forEach((cb) => cb(q));
      },
      (a) => {
        activeAlerts = a;
        alertListeners.forEach((cb) => cb(a));
      },
      (r) => {
        activeRoutes = r;
        routeListeners.forEach((cb) => cb(r));
      },
      (d) => {
        activeDecisions = d;
        decisionListeners.forEach((cb) => cb(d));
      }
    );
  }
};

const zoneListeners = new Set<(z: Zone[]) => void>();
const queueListeners = new Set<(q: Queue[]) => void>();
const alertListeners = new Set<(a: Alert[]) => void>();
const routeListeners = new Set<(r: Route[]) => void>();
const decisionListeners = new Set<(d: Decision[]) => void>();

export const subscribeToZones = (callback: (zones: Zone[]) => void) => {
  try {
    ensureEngine();
    zoneListeners.add(callback);
    callback(activeZones);
    return () => zoneListeners.delete(callback);
  } catch {
    /* tracking exception */
  }
  return () => {};
};

export const subscribeToQueues = (callback: (queues: Queue[]) => void) => {
  try {
    ensureEngine();
    queueListeners.add(callback);
    callback(activeQueues);
    return () => queueListeners.delete(callback);
  } catch {
    /* tracking exception */
  }
  return () => {};
};

export const subscribeToActiveAlerts = (callback: (alerts: Alert[]) => void) => {
  try {
    ensureEngine();
    alertListeners.add(callback);
    callback(activeAlerts);
    return () => alertListeners.delete(callback);
  } catch {
    /* tracking exception */
  }
  return () => {};
};

export const subscribeToRoutes = (callback: (routes: Route[]) => void) => {
  try {
    ensureEngine();
    routeListeners.add(callback);
    callback(activeRoutes);
    return () => routeListeners.delete(callback);
  } catch {
    /* tracking exception */
  }
  return () => {};
};

export const subscribeToDecisions = (callback: (decisions: Decision[]) => void) => {
  try {
    ensureEngine();
    decisionListeners.add(callback);
    callback(activeDecisions);
    return () => decisionListeners.delete(callback);
  } catch {
    /* tracking exception */
  }
  return () => {};
};
