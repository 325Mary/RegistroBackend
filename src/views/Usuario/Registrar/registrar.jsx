import  { useState } from 'react';
import { createUsuario } from "../../../services/Usuarios/Login";
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const [name, setname] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const userData = await createUsuario({
        name,
        identificacion,
        email,
        password : identificacion
      });
      console.log('Usuario creado:', userData);
      navigate('/listaUsuarios');

    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error);
          }  else {
            setError('Error al registrar usuario. Por favor, intenta nuevamente.');
        }      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="registro-usuario">
      <div className="card"> 
        <h3>Registro de Usuario</h3>
        <div className="card-body">
          <form onSubmit={handleRegistro}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>

           

            <div className="form-group">
              <label htmlFor="Identificacion">Identificación:</label>
              <input
                type="text"
                id="Identificacion"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                required
              />
            </div>

           

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button className='buttons' type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
