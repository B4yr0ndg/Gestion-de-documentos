import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../styles.css'; // Asegúrate de tener los estilos aquí

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const success = await login(data);
      if (success) {
        navigate('/home');
      } else {
        alert('Credenciales incorrectas, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Error al iniciar sesión.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <img src="\74e3c9a9-4407-42e5-b4b4-af25be915d92.jpg" alt="Wolf Service Logo" className="logo" />
        </div>
        <h2>Inicia Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register('email', { required: true })}
              className="input-field"
            />
            {errors.email && <span className="error-message">El correo es obligatorio</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password', { required: true })}
              className="input-field"
            />
            {errors.password && <span className="error-message">La contraseña es obligatoria</span>}
          </div>
          <button type="submit" className="btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
