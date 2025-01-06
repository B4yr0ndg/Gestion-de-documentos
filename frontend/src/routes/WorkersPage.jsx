import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkers, getWorkerById, deleteWorker } from "../services/worker.service";

const WorkersPage = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [workerDetails, setWorkerDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  // Fetch all workers for the table
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkers();
        const formattedWorkers = data
          .map((worker) => ({
            id: worker._id,
            name: worker.name,
            identificationNumber: worker.identificationNumber,
            position: worker.position,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setWorkers(formattedWorkers);
        setFilteredWorkers(formattedWorkers);
      } catch (error) {
        console.error("Error al obtener trabajadores:", error.message);
      }
    };
    fetchWorkers();
  }, []);

  // Filter workers based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = workers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(lowercasedQuery) ||
        worker.identificationNumber.toLowerCase().includes(lowercasedQuery) ||
        worker.position.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredWorkers(filtered);
  }, [searchQuery, workers]);

  // Fetch worker details by ID
  const fetchWorkerDetails = async (id) => {
    setLoadingDetails(true);
    try {
      const data = await getWorkerById(id);
      setWorkerDetails(data);
    } catch (error) {
      console.error("Error al obtener detalles del trabajador:", error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Delete a worker
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este trabajador?")) {
      try {
        await deleteWorker(id);
        alert("Trabajador eliminado exitosamente");
        setWorkers((prev) => prev.filter((worker) => worker.id !== id));
        setFilteredWorkers((prev) => prev.filter((worker) => worker.id !== id));
        setWorkerDetails(null);
      } catch (error) {
        console.error("Error al eliminar el trabajador:", error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const WorkerDetails = () => {
    if (loadingDetails) return <div className="loading">Cargando...</div>;
    if (!workerDetails) return null;

    return (
      <div className="details-container">
        <h2>Detalles del Trabajador</h2>
        <p><strong>Nombre:</strong> {workerDetails.name}</p>
        <p><strong>Número de Identificación:</strong> {workerDetails.identificationNumber}</p>
        <p><strong>Cargo:</strong> {workerDetails.position}</p>

        <h3>Documentos Asociados</h3>
        <ul>
          {workerDetails.documents && workerDetails.documents.length > 0 ? (
            workerDetails.documents.map((doc) => (
              <li key={doc._id}>
                {doc.title} -{" "}
                <a
                  href={`http://localhost:5000${doc.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Documento
                </a>
              </li>
            ))
          ) : (
            <p>No hay documentos asociados.</p>
          )}
        </ul>

        <div className="details-actions">
          <button className="btn-primary" onClick={() => navigate(`/workers/update/${workerDetails._id}`)}>
            Editar
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleDelete(workerDetails._id)}
          >
            Eliminar
          </button>
          <button className="btn-secondary" onClick={() => setWorkerDetails(null)}>
            Volver
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="table-container">
      <h1>Gestión de Trabajadores</h1>
      {!workerDetails ? (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre, identificación o cargo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn-primary" onClick={() => navigate("/workers/create")}>
              Crear Trabajador
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Número de Identificación</th>
                <th>Cargo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.name}</td>
                  <td>{worker.identificationNumber}</td>
                  <td>{worker.position}</td>
                  <td>
                    <button
                      className="btn-primary"
                      onClick={() => fetchWorkerDetails(worker.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredWorkers.length === 0 && <p>No se encontraron trabajadores</p>}
        </>
      ) : (
        <WorkerDetails />
      )}
    </div>
  );
};

export default WorkersPage;
