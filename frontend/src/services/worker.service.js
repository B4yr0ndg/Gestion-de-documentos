import axios from './root.service';

export const getWorkers = async () => {
  try {
    const { data } = await axios.get('/workers');
    console.log('Datos recibidos del backend:', data.data); // Log para confirmar los datos
    return data.data; // Retorna la lista de trabajadores
  } catch (error) {
    console.error('Error al obtener trabajadores:', error.response?.data?.message || error.message);
    return [];
  }
};

export const getWorkerById = async (id) => {
  try {
    const { data } = await axios.get(`/workers/${id}`);
    console.log("Datos del trabajador:", data.data); // Asegúrate de que incluya documentos
    return data.data;
  } catch (error) {
    console.error("Error al obtener trabajador:", error.message);
    throw error;
  }
};

export const createWorker = async (workerData) => {
  try {
    console.log('Creando nuevo trabajador:', workerData);
    const { data } = await axios.post('/workers', workerData);
    return data;
  } catch (error) {
    console.error('Error al crear trabajador:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear el trabajador');
  }
};

export const updateWorker = async (id, workerData) => {
  try {
    console.log('Actualizando trabajador con ID:', id, workerData);
    const { data } = await axios.put(`/workers/${id}`, workerData);
    return data;
  } catch (error) {
    console.error('Error al actualizar trabajador:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error al actualizar el trabajador');
  }
};


export const deleteWorker = async (id) => {
  try {
    console.log('Eliminando trabajador con ID:', id); // Log para depuración
    const { data } = await axios.delete(`/workers/${id}`);
    return data;
  } catch (error) {
    console.error('Error al eliminar trabajador:', error.response?.data?.message || error.message);
    throw error;
  }
};


