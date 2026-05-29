import {
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase.js';

export async function iniciarSesion() {
  const resultado = await signInWithPopup(auth, googleProvider);
  return resultado.user;
}

export async function cerrarSesion() {
  await fbSignOut(auth);
}

export function escucharSesion(callback) {
  return onAuthStateChanged(auth, callback);
}
