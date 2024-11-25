import axios from './root.service';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    const { accessToken } = response.data.data;

    // Guardar el token en localStorage
    localStorage.setItem('token', accessToken);

    return true; // Indica que el inicio de sesión fue exitoso
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
    return false; // Indica un error en el inicio de sesión
  }
};

export const logout = () => {
  localStorage.removeItem('token'); // Eliminar el token al cerrar sesión
};
