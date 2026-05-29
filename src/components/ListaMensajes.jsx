import { useEffect, useRef } from 'react';
import { Mensaje } from './Mensaje.jsx';

export function ListaMensajes({ mensajes, miUid, cargando, onEliminar }) {
  const finRef = useRef(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  if (cargando) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-text-muted">Conectando al chat...</p>
      </div>
    );
  }

  if (mensajes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-3 text-4xl">👋</div>
        <p className="text-sm font-medium">Aún no hay mensajes</p>
        <p className="mt-1 text-xs text-text-muted">¡Sé el primero en escribir!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
      {mensajes.map((m) => (
        <Mensaje
          key={m.id}
          mensaje={m}
          esPropio={m.autorId === miUid}
          onEliminar={onEliminar}
        />
      ))}
      <div ref={finRef} />
    </div>
  );
}
