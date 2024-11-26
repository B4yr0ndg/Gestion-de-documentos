import { useNavigate } from 'react-router-dom';

const WorkersPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Gestión de Trabajadores</h1>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/workers/create')}>Crear Trabajador</button>
      <button onClick={() => navigate('/workers/list')}>Ver Trabajadores</button>
    </div>
  );
};

export default WorkersPage;
