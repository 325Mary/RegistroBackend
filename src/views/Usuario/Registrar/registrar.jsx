import  { useState } from 'react';
import { createUsuario } from "../../../services/Usuarios/Login";
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [apellidoUsuario, setApellidoUsuario] = useState('');
  const [IdentificacionUsuario, setIdentificacionUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const userData = await createUsuario({
        nombreUsuario,
        apellidoUsuario,
        IdentificacionUsuario,
        emailUsuario
      });
      console.log('Usuario creado:', userData);
      navigate('/listaUsuarios');

    } catch (error) {
      setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="registro-usuario">
      <div className="card"> 
        <h3>Registro de Usuario</h3>
        <div className="card-body">
          <form onSubmit={handleRegistro}>
            <div className="form-group">
              <label htmlFor="nombreUsuario">Nombre:</label>
              <input
                type="text"
                id="nombreUsuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidoUsuario">Apellido:</label>
              <input
                type="text"
                id="apellidoUsuario"
                value={apellidoUsuario}
                onChange={(e) => setApellidoUsuario(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="IdentificacionUsuario">Identificación:</label>
              <input
                type="text"
                id="IdentificacionUsuario"
                value={IdentificacionUsuario}
                onChange={(e) => setIdentificacionUsuario(e.target.value)}
                required
              />
            </div>

           

            <div className="form-group">
              <label htmlFor="emailUsuario">Email:</label>
              <input
                type="email"
                id="emailUsuario"
                value={emailUsuario}
                onChange={(e) => setEmailUsuario(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
