import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDocumentById,
  linkDocumentToWorker,
  getWorkersWithoutDocument,
  deleteDocument,
} from "../services/document.service";

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await getDocumentById(id);
        setDocument(data);
        await fetchWorkersWithoutDocument(id);
      } catch (error) {
        console.error("Error al obtener documento:", error);
        setError("Error al cargar los detalles del documento");
      } finally {
        setLoading(false);
      }
    };

    const fetchWorkersWithoutDocument = async (documentId) => {
      try {
        const data = await getWorkersWithoutDocument(documentId);
        setWorkers(data);
      } catch (error) {
        console.error("Error al cargar trabajadores:", error);
        setError("Error al cargar trabajadores disponibles");
      }
    };

    fetchDocument();
  }, [id]);

  const handleLinkWorker = async () => {
    if (!selectedWorker) {
      alert("Por favor selecciona un trabajador");
      return;
    }

    try {
      await linkDocumentToWorker(selectedWorker, id);
      alert("Documento asociado exitosamente");
      navigate(0); // Recargar la página
    } catch (error) {
      console.error("Error al asociar trabajador:", error);
      setError("Error al asociar el documento con el trabajador");
    }
  };

  const handleEdit = () => {
    navigate(`/documents/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este documento?")) {
      try {
        await deleteDocument(id);
        alert("Documento eliminado exitosamente");
        navigate("/documents/list");
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
        setError("Error al eliminar el documento");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  if (!document) return <div className="error">Documento no encontrado</div>;

  return (
    <div className="details-container">
      <h2>Detalles del Documento</h2>
      {error && <p className="error">{error}</p>}
      <div className="details-content">
        <p><strong>Título:</strong> {document.title}</p>
        <p><strong>Descripción:</strong> {document.description}</p>
        <p><strong>Tipo:</strong> {document.type}</p>
        <p><strong>Fecha de Expiración:</strong> {formatDate(document.expirationDate)}</p>
        <p>
          <strong>Archivo:</strong>{" "}
          {document.fileUrl ? (
            <a href={`http://localhost:5000${document.fileUrl}`} target="_blank" rel="noopener noreferrer">
              Ver Documento
            </a>
          ) : (
            "No hay archivo asociado"
          )}
        </p>
        {document.worker ? (
          <p>
            <strong>Trabajador Asociado:</strong> {`${document.worker.name} (${document.worker.position})`}
          </p>
        ) : (
          <div>
            <h4>Asociar Trabajador</h4>
            <select
              className="details-select"
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
            >
              <option value="">Selecciona un trabajador</option>
              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} ({worker.position})
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={handleLinkWorker}>Asociar</button>
          </div>
        )}
      </div>
      <div className="details-actions">
        <button className="btn-primary" onClick={handleEdit}>Editar</button>
        <button className="btn-secondary" onClick={handleDelete}>Eliminar</button>
        <button className="btn-secondary" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};

export default DocumentDetails;
