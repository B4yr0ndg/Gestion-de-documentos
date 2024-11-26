import '../styles.css'; // Importa los estilos que vamos a crear
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Función para manejar navegación
  const handleWorkers = () => {
    navigate('/workers/list'); // Navega a la gestión de trabajadores
  };

  const handleDocuments = () => {
    navigate('/documents/list'); // Navega a la gestión de documentos
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpia el token de autenticación
    navigate('/auth'); // Redirige al login
  };

  return (
    <div className="homepage">
      {/* Header con título */}
      <header className="header">
        <h1>Wolf y Compañía Limitada</h1>
      </header>

      {/* Contenedor principal */}
      <div className="info-container">
        {/* Información de la empresa */}
        <div className="info">
          <p><strong>Razón Social:</strong> Wolf y Compañía Limitada</p>
          <p><strong>Rut:</strong> 78768630-3</p>
          <p><strong>Dirección:</strong> Avenida Argentina 223 Of. San Vicen, Talcahuano</p>
          <p><strong>Teléfono:</strong> (56-41) 2557069</p>
        </div>

        {/* Opciones */}
        <div className="options">
        <button onClick={() => navigate('/workers')}>Gestión de Trabajadores</button>
          <button onClick={handleDocuments}>Gestión de Documentos</button>
          <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d' }}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
