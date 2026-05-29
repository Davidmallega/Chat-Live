// components/FormularioMensaje.jsx
import { useState } from 'react';

export function FormularioMensaje({ onEnviar }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    if (!texto.trim() || enviando) return;
    try {
      setEnviando(true);
      await onEnviar(texto);
      setTexto('');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={enviar}
      className="flex gap-2 border-t border-border bg-surface px-4 py-3"
    >
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe un mensaje..."
        maxLength={500}
        className="flex-1 rounded-sm border border-border bg-bg px-3.5 py-2 text-sm text-text placeholder:text-text-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
      <button
        type="submit"
        disabled={!texto.trim() || enviando}
        className="rounded-sm bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {enviando ? '...' : 'Enviar'}
      </button>
    </form>
  );
}
