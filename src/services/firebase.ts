import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For the purpose of this setup, placeholder values are used.
// These should be replaced securely using import.meta.env.* variables in production.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSy_placeholder_key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'eventiq-system.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'eventiq-system',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'eventiq-system.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef123456',
};

// Initialize Firebase
export let app: any = null;
export let auth: any = null;
export let db: any = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.debug('Firebase init skipped due to missing keys', error);
}
