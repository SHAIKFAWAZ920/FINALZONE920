import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type Auth,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (email: string, pass: string) => {
  return createUserWithEmailAndPassword(auth as Auth, email, pass);
};

export const loginWithEmail = async (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth as Auth, email, pass);
};

export const loginWithGoogle = async () => {
  return signInWithPopup(auth as Auth, googleProvider);
};

export const logout = async () => {
  return signOut(auth as Auth);
};
