import { useState, useEffect } from "react";
import { getWorkersWithoutDocument, linkDocumentToWorker } from "../services/document.service";
import { useParams, useNavigate } from "react-router-dom";

const LinkDocument = () => {
  const { id: documentId } = useParams(); // Obtenemos el ID del documento
  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const navigate = useNavigate();

  // Obtener los trabajadores sin este documento
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkersWithoutDocument(documentId);
        setWorkers(data);
      } catch (error) {
        console.error("Error al obtener trabajadores:", error.message);
      }
    };

    fetchWorkers();
  }, [documentId]);

  // Lógica para ligar el documento al trabajador
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await linkDocumentToWorker(selectedWorkerId, documentId);
      alert("Documento ligado al trabajador exitosamente.");
      navigate("/documents/list");
    } catch (error) {
      alert("Error al ligar el documento al trabajador.");
    }
  };

  return (
    <div>
      <h2>Ligar Documento a un Trabajador</h2>
      <form onSubmit={handleSubmit}>
        <label>Seleccionar Trabajador:</label>
        <select
          value={selectedWorkerId}
          onChange={(e) => setSelectedWorkerId(e.target.value)}
          required
        >
          <option value="">Seleccione un trabajador</option>
          {workers.map((worker) => (
            <option key={worker._id} value={worker._id}>
              {worker.name} - {worker.position}
            </option>
          ))}
        </select>
        <button type="submit">Ligar Documento</button>
      </form>
    </div>
  );
};

export default LinkDocument;
