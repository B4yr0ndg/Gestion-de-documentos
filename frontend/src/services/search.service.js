import axios from "./root.service";

/*export const search = async (query) => {
  try {
    const { data } = await axios.get(`/search?query=${query}`); // Sin duplicar `/api`
    return data.data;
  } catch (error) {
    console.error("Error al buscar:", error.message);
    throw error;
  }
};*/

export const search = async (query) => {
  try {
    const { data } = await axios.get(`/search`, {
      params: { query },
    });
    return data.data;
  } catch (error) {
    console.error("Error al buscar:", error.message);
    throw error;
  }
};


