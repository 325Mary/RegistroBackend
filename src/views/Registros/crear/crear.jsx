import { useState } from 'react';
import { crearRegistros } from '../../../services/Registros/registro'; 
import { useNavigate } from 'react-router-dom';

const CrearRegistros = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCrearRegistro = async (e) => {
    e.preventDefault();

    try {
      const RegistrosData = await crearRegistros({
        name,
        phone,
        email,
      });

      console.log('Registro creado:', RegistrosData);
      navigate('/ListarRegistros'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        }  else {
          setError('Error al registrar Contacto. Por favor, intenta nuevamente.');
      }      console.error('Error al registrar Contacto:', error);
  }
  };

  return (
    <div className="registro">
      <div className="tarjet">
        <h3>FORMULARIO DE REGISTRO</h3>
        <div className="tarjet-body">
          <form onSubmit={handleCrearRegistro}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            <button className='buttons' type="submit">GUARDAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearRegistros;
