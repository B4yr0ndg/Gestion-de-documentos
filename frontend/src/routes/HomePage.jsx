import AdvancedSearch from "../components/AdvancedSearch";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="header">
        <h1>Wolf y Compañía Limitada</h1>
      </header>
      <div className="info-container">
        <div className="info">
          <p><strong>Razón Social:</strong> Wolf y Compañía Limitada</p>
          <p><strong>Rut:</strong> 78768630-3</p>
          <p><strong>Dirección:</strong> Avenida Argentina 223 Of. San Vicen, Talcahuano</p>
          <p><strong>Teléfono:</strong> (56-41) 2557069</p>
        </div>
        <AdvancedSearch /> {/* Componente de búsqueda avanzada */}
        <div className="options">
          <button className="btn-primary" onClick={() => navigate("/workers")}>
            Gestión de Trabajadores
          </button>
          <button className="btn-primary" onClick={() => navigate("/documents/list")}>
            Gestión de Documentos
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

