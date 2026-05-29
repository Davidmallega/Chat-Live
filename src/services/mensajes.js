import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase.js';

const mensajesRef = collection(db, 'mensajes');

export async function enviarMensaje({ texto, autorId, autorNombre, autorFoto }) {
  await addDoc(mensajesRef, {
    texto: texto.trim(),
    autorId,
    autorNombre,
    autorFoto: autorFoto || null,
    // serverTimestamp() garantiza orden global correcto independiente del reloj del cliente
    creado: serverTimestamp(),
  });
}

export async function eliminarMensaje(id) {
  await deleteDoc(doc(db, 'mensajes', id));
}

export function escucharMensajes(callback) {
  const q = query(mensajesRef, orderBy('creado', 'asc'), limit(200));
  return onSnapshot(q, (snapshot) => {
    const mensajes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(mensajes);
  });
}
