export function Cabecera({ usuario, onLogout, oscuro, alternarTema, conectado }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-600 text-base text-white">
            💬
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight">Chat Live</h1>
            <p className="font-mono text-[10px] text-text-muted">Firestore</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-text-muted sm:flex">
            <span className={`h-1.5 w-1.5 rounded-full ${conectado ? 'animate-pulse bg-success' : 'bg-text-subtle'}`} />
            En vivo
          </span>

          <button
            onClick={alternarTema}
            className="rounded-md border border-border px-2 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-2"
            aria-label="Cambiar tema"
          >
            {oscuro ? '☀️' : '🌙'}
          </button>

          <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
            {usuario.photoURL ? (
              <img src={usuario.photoURL} alt="" className="h-6 w-6 rounded-full" />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
                {(usuario.displayName || '?')[0]}
              </div>
            )}
            <span className="hidden text-sm font-medium sm:inline">
              {usuario.displayName?.split(' ')[0] || 'Tú'}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="rounded-md px-2.5 py-1.5 text-xs text-text-muted transition-colors hover:bg-surface-2"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
