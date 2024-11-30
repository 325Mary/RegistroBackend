import { useState, useEffect } from 'react';
import './Landig.css';
import { iniciarSesion } from "../../services/Usuarios/Login";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/Usuarios/receptor'; 

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await iniciarSesion(email, password);
      login(token);
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registro'); 
  };

  useEffect(() => {
    const elementsLeft = document.querySelectorAll('.animate-left');
    const elementsRight = document.querySelectorAll('.animate-right');
    const card = document.querySelector('.card');

    elementsLeft.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible-left');
      }, index * 500);  
    });

    elementsRight.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible-right');
      }, index * 500); 
    });

    setTimeout(() => {
      card.classList.add('visible-card');
    }, 1500);  
  }, []);

  return (
    <div className="landing-page">
      <div className="content">
      <div className="info-text animate-left">Bienvenido a tu gestor de contactos.</div>
      <div className="info-text animate-right">Administra y organiza tus contactos de manera fácil y segura.</div>
      <div className="info-text animate-left">Crea tu cuenta o inicia sesión para comenzar a gestionar tus contactos.</div>
      </div>

      <div className="card">
        <h3>Iniciar Sesión</h3>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Ingresar</button>
          </form>

          <ul className="navigation-list">
            <li onClick={handleRegisterRedirect}>
              <a href="#" className="register-link">¿No tienes cuenta? Crear una cuenta</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
