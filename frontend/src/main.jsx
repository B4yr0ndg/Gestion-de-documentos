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
// Importa el AuthProvider

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
      { path: '/workers/:id', element: <WorkerDetails /> }, // Ruta para ver detalles
      { path: '/workers/update/:id', element: <WorkerForm /> }, // Ruta para actualizar
    ],
  },
  { path: '/auth', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
