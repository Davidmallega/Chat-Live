import { useState, useEffect } from 'react';
import { escucharMensajes, enviarMensaje, eliminarMensaje } from '../services/mensajes.js';

export function useMensajes(usuario) {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!usuario) return;

    let activo = true;
    const desuscribir = escucharMensajes((lista) => {
      if (!activo) return;
      setMensajes(lista);
      setCargando(false);
    });

    return () => {
      activo = false;
      desuscribir();
    };
  }, [usuario]);

  const enviar = async (texto) => {
    setError(null);
    if (!texto.trim()) return;
    try {
      await enviarMensaje({
        texto,
        autorId: usuario.uid,
        autorNombre: usuario.displayName || 'Anónimo',
        autorFoto: usuario.photoURL,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarMensaje(id);
    } catch (err) {
      setError('No se pudo eliminar (¿es tu mensaje?).');
    }
  };

  return { mensajes, cargando, error, enviar, eliminar };
}
