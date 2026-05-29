import { useState, useEffect } from 'react';
import { escucharSesion, iniciarSesion, cerrarSesion } from '../services/auth.js';

export function useUsuario() {
  const [usuario, setUsuario] = useState(null);
  // true hasta que Firebase confirme el estado de sesión — evita el parpadeo de login
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const desuscribir = escucharSesion((u) => {
      setUsuario(u);
      setVerificando(false);
    });
    return () => desuscribir();
  }, []);

  return { usuario, verificando, iniciarSesion, cerrarSesion };
}
