function horaCorta(timestamp) {
  if (!timestamp) return '';
  // serverTimestamp() puede no estar resuelto aún en el mensaje recién enviado
  const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
}

export function Mensaje({ mensaje, esPropio, onEliminar }) {
  return (
    <div className={`flex gap-2 ${esPropio ? 'flex-row-reverse' : ''}`}>
      {mensaje.autorFoto ? (
        <img src={mensaje.autorFoto} alt="" className="h-7 w-7 flex-shrink-0 rounded-full" />
      ) : (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
          {(mensaje.autorNombre || '?')[0]}
        </div>
      )}

      <div className={`group max-w-[75%] ${esPropio ? 'items-end' : 'items-start'} flex flex-col`}>
        {!esPropio && (
          <span className="mb-0.5 px-2 text-xs text-text-muted">{mensaje.autorNombre}</span>
        )}
        <div className="flex items-end gap-2">
          {esPropio && (
            <button
              onClick={() => onEliminar(mensaje.id)}
              className="rounded p-1 text-xs text-text-subtle opacity-0 transition-opacity hover:text-error group-hover:opacity-100"
              aria-label="Eliminar mensaje"
            >
              🗑
            </button>
          )}
          <div
            className={`rounded-md px-3.5 py-2 text-sm ${
              esPropio
                ? 'rounded-br-sm bg-brand-600 text-white'
                : 'rounded-bl-sm bg-surface-2 text-text'
            }`}
          >
            {mensaje.texto}
          </div>
        </div>
        <span className="mt-0.5 px-2 font-mono text-[10px] text-text-subtle">
          {horaCorta(mensaje.creado)}
        </span>
      </div>
    </div>
  );
}
