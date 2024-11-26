import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="\74e3c9a9-4407-42e5-b4b4-af25be915d92.jpg" alt="Wolf Service Logo" className="logo-navbar" style={{ borderRadius: '50%', marginRight: '10px', width: '40px', height: '40px' }} />
          <h1>Wolf Service & CIA</h1>
        </div>
        <div className="menu">
          <button onClick={() => navigate('/home')}>Inicio</button>
          <button onClick={() => navigate('/workers')}>Gestión de Trabajadores</button>
          <button onClick={() => navigate('/documents/list')}>Gestión de Documentos</button>
          <button onClick={goBack}>Volver Atrás</button>
          <button onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: '#ff4d4d', color: '#fff' }}>Cerrar Sesión</button>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;