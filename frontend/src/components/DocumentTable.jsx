import { useState, useEffect } from "react";
import { searchDocuments, deleteDocument } from "../services/document.service";
import { useNavigate } from "react-router-dom";

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const data = await searchDocuments();
      console.log("Documentos recuperados:", data); // Verifica los datos recuperados
      const currentDate = new Date();
      const validDocuments = data
        .filter((doc) => !doc.expirationDate || new Date(doc.expirationDate) >= currentDate)
        .sort((a, b) => a.title.localeCompare(b.title));
      setDocuments(validDocuments);
      setFilteredDocuments(validDocuments);
    } catch (error) {
      console.error("Error al buscar documentos:", error.message);
    }
  };
  

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowercasedQuery) ||
        doc.type.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDocuments(filtered);
  }, [searchQuery, documents]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este documento?")) {
      try {
        await deleteDocument(id);
        alert("Documento eliminado exitosamente");
        setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        setFilteredDocuments((prev) => prev.filter((doc) => doc._id !== id));
      } catch (error) {
        console.error("Error al eliminar el documento:", error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="table-container">
      <h2>Gestión de Documentos</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por título o tipo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn-primary" onClick={() => navigate("/documents/create")}>
          Subir Documento
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Fecha de Expiración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.title}</td>
              <td>{doc.type}</td>
              <td>{doc.expirationDate ? formatDate(doc.expirationDate) : "Sin fecha"}</td>
              <td>
                <button className="btn-primary" onClick={() => navigate(`/documents/${doc._id}`)}>
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredDocuments.length === 0 && <p>No se encontraron documentos</p>}
    </div>
  );
};

export default DocumentTable;
