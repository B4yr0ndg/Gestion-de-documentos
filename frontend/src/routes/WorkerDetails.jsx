import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkerById } from "../services/worker.service";

const WorkerDetails = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const data = await getWorkerById(id);
        setWorker(data);
      } catch (error) {
        console.error("Error al obtener trabajador:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  const handleEdit = () => {
    navigate(`/workers/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este trabajador?")) {
      try {
        alert("Trabajador eliminado exitosamente.");
        navigate("/workers/list");
      } catch (error) {
        console.error("Error al eliminar trabajador:", error.message);
        alert("Error al eliminar el trabajador.");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  if (loading) return <div>Cargando...</div>;

  if (!worker) return <div>Trabajador no encontrado.</div>;

  return (
    <div className="details-container">
      <h2 className="details-header">Detalles del Trabajador</h2>
      <p><strong>Nombre:</strong> {worker.name}</p>
      <p><strong>Número de Identificación:</strong> {worker.identificationNumber}</p>
      <p><strong>Cargo:</strong> {worker.position}</p>

      <h3>Documentos Asociados</h3>
      {worker.documents && worker.documents.length > 0 ? (
        <ul>
          {worker.documents.map((doc) => (
            <li key={doc._id} style={{ marginBottom: "10px" }}>
              {doc.title} -{" "}
              <a
                href={`http://localhost:5000${doc.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#003fc7", textDecoration: "underline" }}
              >
                Ver Documento
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay documentos asociados.</p>
      )}

      <div className="details-actions">
        <button className="btn-primary" onClick={handleEdit}>
          Editar
        </button>
        <button
          className="btn-danger"
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}
        >
          Eliminar
        </button>
        <button className="btn-secondary" onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default WorkerDetails;
