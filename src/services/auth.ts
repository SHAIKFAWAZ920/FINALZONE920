import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (email: string, pass: string) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

export const loginWithEmail = async (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

export const loginWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  return signOut(auth);
};
