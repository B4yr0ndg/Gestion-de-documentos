import { useState } from "react";
import { uploadDocument } from "../services/document.service";
import { useNavigate } from "react-router-dom";

const DocumentForm = () => {
  const navigate = useNavigate();
  const [document, setDocument] = useState({
    title: "",
    description: "",
    type: "",
    expirationDate: "",
    workerId: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        alert("Por favor, selecciona un archivo antes de continuar.");
        return;
      }

      const documentData = {
        title: document.title,
        description: document.description,
        type: document.type,
        expirationDate: document.expirationDate,
      };

      await uploadDocument(documentData, file);
      alert("Documento subido exitosamente.");
      navigate("/documents/list");
    } catch (error) {
      console.error("Error al subir el documento:", error.message);
      alert("Ocurrió un error al subir el documento. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="form-container">
      <h2>Subir Documento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={document.title}
            onChange={handleChange}
            placeholder="Título del documento"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={document.description}
            onChange={handleChange}
            placeholder="Breve descripción del documento"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input
            type="text"
            id="type"
            name="type"
            value={document.type}
            onChange={handleChange}
            placeholder="Tipo de documento (Ej: Informe, Contrato, etc.)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Fecha de Expiración</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={document.expirationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="workerId">ID del Trabajador (Opcional)</label>
          <input
            type="text"
            id="workerId"
            name="workerId"
            value={document.workerId}
            onChange={handleChange}
            placeholder="ID del trabajador asociado"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Archivo</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Subir Documento
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/documents/list")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;
