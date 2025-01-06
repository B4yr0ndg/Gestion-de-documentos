import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkerById, createWorker, updateWorker } from "../services/worker.service";

const WorkerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState({ name: "", identificationNumber: "", position: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchWorker = async () => {
      if (id) {
        try {
          const data = await getWorkerById(id);
          setWorker(data);
          setIsEditing(true);
        } catch (error) {
          console.error("Error al obtener trabajador:", error.message);
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
        await updateWorker(id, worker);
        alert("Trabajador actualizado exitosamente.");
      } else {
        await createWorker(worker);
        alert("Trabajador creado exitosamente.");
      }
      navigate("/workers/list");
    } catch (error) {
      console.error("Error al guardar trabajador:", error.message);
      alert("Ocurrió un error al guardar el trabajador.");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? "Actualizar Trabajador" : "Crear Trabajador"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={worker.name}
            onChange={handleChange}
            placeholder="Ingresa el nombre del trabajador"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="identificationNumber">Número de Identificación</label>
          <input
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            value={worker.identificationNumber}
            onChange={handleChange}
            placeholder="Ingresa el número de identificación"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Cargo</label>
          <input
            type="text"
            id="position"
            name="position"
            value={worker.position}
            onChange={handleChange}
            placeholder="Ingresa el cargo del trabajador"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/workers")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkerForm;
