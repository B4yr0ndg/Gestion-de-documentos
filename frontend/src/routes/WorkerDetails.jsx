import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkerById, deleteWorker } from '../services/worker.service';

const WorkerDetails = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!id) {
        console.error('ID no proporcionado en la URL');
        setLoading(false);
        return;
      }

      try {
        const data = await getWorkerById(id);
        setWorker(data);
      } catch (error) {
        console.error('Error al obtener el trabajador:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de eliminar este trabajador?')) {
      try {
        await deleteWorker(id);
        alert('Trabajador eliminado exitosamente.');
        navigate('/workers/list'); // Redirige a la lista de trabajadores después de eliminar
      } catch (error) {
        console.error('Error al eliminar el trabajador:', error.message);
        alert('Error al eliminar el trabajador.');
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/workers/update/${id}`); // Redirige al formulario de actualización
  };

  if (loading) return <div>Cargando...</div>;

  if (!worker) return <div>Trabajador no encontrado.</div>;

  return (
    <div>
      <h2>Detalles del Trabajador</h2>
      <p><strong>Nombre:</strong> {worker.name}</p>
      <p><strong>Número de Identificación:</strong> {worker.identificationNumber}</p>
      <p><strong>Cargo:</strong> {worker.position}</p>
      <div>
        <button onClick={handleUpdate}>Actualizar</button>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </div>
    </div>
  );
};

export default WorkerDetails;

