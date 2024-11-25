import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el contexto
const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/auth'); // Redirige al login si no hay token
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/auth'); // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
