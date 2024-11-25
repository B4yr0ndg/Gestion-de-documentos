import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';

const LoginForm = () => {
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate('/workers'); // Redirige a la página de trabajadores
    } else {
      alert('Credenciales incorrectas'); // Muestra un mensaje si las credenciales son inválidas
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'El email es obligatorio' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          {...register('password', { required: 'La contraseña es obligatoria' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
