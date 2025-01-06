import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { getWorkers } from '../services/worker.service';

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers(); // Llama al servicio para obtener los trabajadores
        // Mapear los datos para que coincidan con los campos requeridos por DataGrid
        const formattedWorkers = data.map((worker) => ({
          id: worker._id, // Asegúrate de que cada fila tenga una clave 'id'
          name: worker.name,
          identificationNumber: worker.identificationNumber,
          position: worker.position,
        }));
        setWorkers(formattedWorkers); // Establece los trabajadores formateados
      } catch (error) {
        console.error('Error al obtener trabajadores:', error.message);
      }
    };
    fetchWorkers();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'identificationNumber', headerName: 'Número de Identificación', width: 200 },
    { field: 'position', headerName: 'Cargo', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => navigate(`/workers/${params.row.id}`)}>Ver Detalles</button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={workers} columns={columns} />
    </div>
  );
};

export default WorkerTable;

