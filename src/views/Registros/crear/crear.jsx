
import  { useState } from 'react';
import { crearRegistros } from '../../../services/Registros/registro';
import { useNavigate } from 'react-router-dom';
const CrearRegistros = () =>{
        

  const [descripcionRegistro, setDescripcionRegistro] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 
  const CrearRegistro = async (e) => {
    e.preventDefault();

    try {
      const RegistrosData = await crearRegistros({
        descripcionRegistro,
        
      });
      console.log('creado:', RegistrosData);
      navigate('/listaRegistros');

    } catch (error) {
      setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="registro">
      <div className="card"> 
        <h3>Crear Registros</h3>
        <div className="card-body">
          <form onSubmit={CrearRegistro}>
            <div className="form-group">
              <label htmlFor="descripcionRegistro">descripcion de Registro:</label>
              <input
                type="text"
                id="descripcionRegistro"
                value={descripcionRegistro}
                onChange={(e) => setDescripcionRegistro(e.target.value)}
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

export default CrearRegistros

