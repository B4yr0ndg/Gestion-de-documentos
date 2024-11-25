import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>¡Error!</h1>
      <p>Ha ocurrido un problema.</p>
      <p>
        <strong>
          {error.statusText || error.message || 'Error desconocido'}
        </strong>
      </p>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default ErrorPage;
