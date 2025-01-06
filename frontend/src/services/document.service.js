import axios from './root.service';

export const uploadDocument = async (documentData, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    Object.entries(documentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { data } = await axios.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  } catch (error) {
    console.error("Error al subir el documento:", error.response?.data?.message || error.message);
    throw error;
  }
};


export const getDocumentById = async (id) => {
  try {
    const { data } = await axios.get(`/documents/${id}`);
    return data.data;
  } catch (error) {
    console.error('Error al obtener documento:', error.message);
    throw error;
  }
};

export const updateDocument = async (id, documentData) => {
  try {
    const { data } = await axios.put(`/documents/${id}`, documentData);
    return data.data;
  } catch (error) {
    console.error('Error al actualizar documento:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const searchDocuments = async (query) => {
  try {
    const { data } = await axios.get('/documents/search', { params: query });
    return data.data;
  } catch (error) {
    console.error('Error al buscar documentos:', error.message);
    throw error;
  }
};

export const linkDocumentToWorker = async (workerId, documentId) => {
  try {
    const { data } = await axios.post('/workers/link-document', {
      workerId,
      documentId,
    });
    return data.data;
  } catch (error) {
    console.error('Error al ligar documento al trabajador:', error.message);
    throw error;
  }
};

export const getWorkersWithoutDocument = async (documentId) => {
  try {
    const { data } = await axios.get(`/workers/without-document/${documentId}`);
    return data.data;
  } catch (error) {
    console.error("Error al obtener trabajadores sin documento:", error.message);
    throw error;
  }
};

// Nueva función para eliminar documentos
export const deleteDocument = async (id) => {
  try {
    const { data } = await axios.delete(`/documents/${id}`);
    return data.data;
  } catch (error) {
    console.error('Error al eliminar el documento:', error.response?.data?.message || error.message);
    throw error;
  }
};



