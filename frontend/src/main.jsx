import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import WorkersPage from './routes/WorkersPage.jsx';
import WorkerForm from './components/WorkerForm.jsx';
import WorkerTable from './components/WorkerTable.jsx';
import WorkerDetails from './routes/WorkerDetails.jsx';
import { AuthProvider } from './context/AuthContext'; 
import HomePage from './routes/HomePage.jsx';
import DocumentForm from './components/DocumentForm.jsx';
import DocumentTable from './components/DocumentTable';
import LinkDocument from './components/LinkDocument.jsx'; // Nuevo componente para ligar documentos
import DocumentDetails from './components/DocumentDetails.jsx'; // Nuevo componente para detalles de documentos

// Configuración de rutas con React Router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/home', element: <HomePage /> }, // Página principal
      { path: '/workers', element: <WorkersPage /> }, // Página de gestión
      { path: '/workers/create', element: <WorkerForm /> },
      { path: '/workers/list', element: <WorkerTable /> },
      { path: '/workers/:id', element: <WorkerDetails /> }, // Ruta para ver detalles de trabajadores
      { path: '/workers/update/:id', element: <WorkerForm /> }, // Ruta para actualizar trabajadores
      { path: '/documents/list', element: <DocumentTable /> }, // Listado de documentos
      { path: '/documents/create', element: <DocumentForm /> }, // Crear documentos
      { path: '/documents/update/:id', element: <DocumentForm /> }, // Editar documentos
      { path: '/documents/link/:id', element: <LinkDocument /> }, // Ligar documentos
      { path: '/documents/:id', element: <DocumentDetails /> }, // Detalles de un documento específico
    ],
  },
  { path: '/auth', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
