import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkers } from '../services/worker.service';

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      const data = await getWorkers();
      setWorkers(data);
    };
    fetchWorkers();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Número de Identificación</th>
          <th>Cargo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker) => (
          <tr key={worker._id}> 
            <td>{worker.name}</td>
            <td>{worker.identificationNumber}</td>
            <td>{worker.position}</td>
            <td>
            <button
                onClick={() => {
                  console.log('Navegando al trabajador con ID:', worker._id); // Log para depurar
                  navigate(`/workers/${worker._id}`);
                }}
              >
                Ver
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkerTable;
