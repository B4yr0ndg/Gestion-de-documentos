import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Root = () => {
  const { isAuthenticated, logout } = useAuth(); // Usa el contexto correctamente

  if (!isAuthenticated) {
    return <p>Redirigiendo al inicio de sesión...</p>; // Evita renderizar nada si no está autenticado
  }

  return (
    <div>
      <header>
        <h1>Gestión de Trabajadores</h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </header>
      <Outlet /> {/* Renderiza las rutas hijas */}
    </div>
  );
};

export default Root;
