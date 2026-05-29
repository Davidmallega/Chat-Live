import { useUsuario } from './hooks/useUsuario.js';
import { useMensajes } from './hooks/useMensajes.js';
import { useTema } from './hooks/useTema.js';
import { PantallaLogin } from './components/PantallaLogin.jsx';
import { Cabecera } from './components/Cabecera.jsx';
import { ListaMensajes } from './components/ListaMensajes.jsx';
import { FormularioMensaje } from './components/FormularioMensaje.jsx';

export default function App() {
  const { usuario, verificando, iniciarSesion, cerrarSesion } = useUsuario();
  const { oscuro, alternar } = useTema();

  if (verificando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-sm text-text-muted">Verificando sesión...</p>
      </div>
    );
  }

  if (!usuario) {
    return <PantallaLogin onLogin={iniciarSesion} />;
  }

  return <ChatAutenticado usuario={usuario} onLogout={cerrarSesion} oscuro={oscuro} alternar={alternar} />;
}

// Componente separado para que useMensajes nunca se monte sin sesión activa
function ChatAutenticado({ usuario, onLogout, oscuro, alternar }) {
  const { mensajes, cargando, error, enviar, eliminar } = useMensajes(usuario);

  return (
    <div className="flex h-screen flex-col bg-bg text-text">
      <Cabecera
        usuario={usuario}
        onLogout={onLogout}
        oscuro={oscuro}
        alternarTema={alternar}
        conectado={!cargando}
      />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden">
        {error && (
          <div className="border-b border-error/30 bg-error-bg px-4 py-2 text-sm text-error">
            {error}
          </div>
        )}
        <ListaMensajes mensajes={mensajes} miUid={usuario.uid} cargando={cargando} onEliminar={eliminar} />
        <FormularioMensaje onEnviar={enviar} />
      </main>
    </div>
  );
}
