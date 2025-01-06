import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../services/search.service";

const AdvancedSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ documents: [], workers: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Por favor, ingresa un término de búsqueda");
      setResults({ documents: [], workers: [] });
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const data = await search(query.trim());
      setResults(data);
    } catch (err) {
      setError("Error al realizar la búsqueda");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToWorker = (workerId) => {
    navigate(`/workers/${workerId}`);
  };

  const handleNavigateToDocument = (documentId) => {
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar trabajadores o documentos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={isLoading} className="btn-primary">
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="results">
        <h2>Resultados de Documentos</h2>
        {results.documents.length > 0 ? (
          results.documents.map((doc) => (
            <div
              key={doc._id}
              className="result-item"
              onClick={() => handleNavigateToDocument(doc._id)}
              style={{ cursor: "pointer" }}
            >
              <p>
                <strong>{doc.title}</strong>
              </p>
              <p>{doc.description}</p>
              <p>
                <em>{doc.type}</em>
              </p>
            </div>
          ))
        ) : (
          <p>No se encontraron documentos</p>
        )}
        <h2>Resultados de Trabajadores</h2>
        {results.workers.length > 0 ? (
          results.workers.map((worker) => (
            <div
              key={worker._id}
              className="result-item"
              onClick={() => handleNavigateToWorker(worker._id)}
              style={{ cursor: "pointer" }}
            >
              <p>
                <strong>{worker.name}</strong>
              </p>
              <p>{worker.position}</p>
              <p>{worker.identificationNumber}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron trabajadores</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
