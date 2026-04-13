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
}

// ========================
// DATABASE METHODS
// ========================

// Users
export const createUserProfile = async (user: UserProfile) => {
  const userRef = doc(db, 'users', user.uid);
  return setDoc(userRef, user, { merge: true });
};

export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

import { startSimulationEngine } from './simulator';

// Fallback arrays for Simulation Mode
let simZones: Zone[] = [];
let simQueues: Queue[] = [];
let simAlerts: Alert[] = [];
let simRoutes: Route[] = [];
let simDecisions: Decision[] = [];
let simStarted = false;

const ensureSimulation = () => {
  if (!simStarted) {
    simStarted = true;
    startSimulationEngine(
      (z) => {
        simZones = z;
        zoneListeners.forEach((cb) => cb(z));
      },
      (q) => {
        simQueues = q;
        queueListeners.forEach((cb) => cb(q));
      },
      (a) => {
        simAlerts = a;
        alertListeners.forEach((cb) => cb(a));
      },
      (r) => {
        simRoutes = r;
        routeListeners.forEach((cb) => cb(r));
      },
      (d) => {
        simDecisions = d;
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
    ensureSimulation();
    zoneListeners.add(callback);
    callback(simZones);
    return () => zoneListeners.delete(callback);
  } catch(e) {}
  return () => {};
};

export const subscribeToQueues = (callback: (queues: Queue[]) => void) => {
  try {
    ensureSimulation();
    queueListeners.add(callback);
    callback(simQueues);
    return () => queueListeners.delete(callback);
  } catch(e) {}
  return () => {};
};

export const subscribeToActiveAlerts = (callback: (alerts: Alert[]) => void) => {
  try {
    ensureSimulation();
    alertListeners.add(callback);
    callback(simAlerts);
    return () => alertListeners.delete(callback);
  } catch(e) {}
  return () => {};
};

export const subscribeToRoutes = (callback: (routes: Route[]) => void) => {
  try {
    ensureSimulation();
    routeListeners.add(callback);
    callback(simRoutes);
    return () => routeListeners.delete(callback);
  } catch(e) {}
  return () => {};
};

export const subscribeToDecisions = (callback: (decisions: Decision[]) => void) => {
  try {
    ensureSimulation();
    decisionListeners.add(callback);
    callback(simDecisions);
    return () => decisionListeners.delete(callback);
  } catch(e) {}
  return () => {};
};
