import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkerById, updateWorker, createWorker } from '../services/worker.service';

const WorkerForm = () => {
  const { id } = useParams(); // Captura el ID para actualización
  const navigate = useNavigate();
  const [worker, setWorker] = useState({ name: '', identificationNumber: '', position: '' });
  const [isEditing, setIsEditing] = useState(false); // Indica si estamos en modo edición

  useEffect(() => {
    const fetchWorker = async () => {
      if (id) {
        try {
          const data = await getWorkerById(id);
          setWorker(data);
          setIsEditing(true); // Cambia a modo edición
        } catch (error) {
          console.error('Error al obtener trabajador para actualización:', error.message);
        }
      }
    };

    fetchWorker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({ ...worker, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Actualiza el trabajador existente
        await updateWorker(id, worker);
        alert('Trabajador actualizado exitosamente.');
      } else {
        // Crea un nuevo trabajador
        await createWorker(worker);
        alert('Trabajador creado exitosamente.');
      }
      navigate('/workers/list'); // Redirige a la lista después de guardar
    } catch (error) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'crear'} trabajador:`, error.message);
      alert(`Error al ${isEditing ? 'actualizar' : 'crear'} el trabajador.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Actualizar Trabajador' : 'Crear Trabajador'}</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={worker.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Número de Identificación:</label>
        <input
          type="text"
          name="identificationNumber"
          value={worker.identificationNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cargo:</label>
        <input
          type="text"
          name="position"
          value={worker.position}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default WorkerForm;