import { useState } from 'react';
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
      console.log(login);
      
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="landing-page">
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
