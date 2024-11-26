/* import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import '../styles.css'; // Asegúrate de importar tus estilos

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const success = await login(data); // Llama al servicio de login
      if (success) {
        navigate('/'); // Redirige tras iniciar sesión correctamente
      } else {
        alert('Credenciales incorrectas, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Error al iniciar sesión.');
    }
  };

  return (
    <div className="login-container">
      <h2>Inicia Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <span>El correo es obligatorio</span>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register('password', { required: true })}
        />
        {errors.password && <span>La contraseña es obligatoria</span>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login; */

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
    <div className="login-container">
      <div className="logo-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img src="\74e3c9a9-4407-42e5-b4b4-af25be915d92.jpg" alt="Wolf Service Logo" className="logo" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
      </div>
      <h2>Inicia Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <span>El correo es obligatorio</span>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register('password', { required: true })}
        />
        {errors.password && <span>La contraseña es obligatoria</span>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;

