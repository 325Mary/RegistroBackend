import  { useState, useEffect } from 'react';
import { getRegistros, editarRegistros, eliminarRegistros } from '../../../services/Registros/registro';
import './listar.css'

const ListarRegistros = () => {
  const [descripcionRegistro, setDescripcionRegistro] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRegistro, setEditedRegistro] = useState({ descripcionRegistro: '' });

 
    const fetchDescripcionRegistro = async () => {
      try {
        const descripcionRegistroData = await getRegistros();
        console.log('descripcionRegistro obtenidos:', descripcionRegistroData);
        if (descripcionRegistroData.data && Array.isArray(descripcionRegistroData.data) && descripcionRegistroData.data.length > 0) {
          setDescripcionRegistro(descripcionRegistroData.data[0]);
        }
      } catch (error) {
        setError('Error al obtener la lista de descripcionRegistro. Por favor, intenta nuevamente.');
        console.error('Error al obtener descripcionRegistro:', error);
    }
  };
    useEffect(() => {
    fetchDescripcionRegistro();
  }, []);
    
  const handleEditClick = (index, Registro) => {
    setEditingIndex(index);
    setEditedRegistro(Registro);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedRegistro({ descripcionRegistro: '' });
  };

  const handleSaveEdit = async (idRegistros) => {
    try {
      const updatedRegistro = await editarRegistros(idRegistros, editedRegistro);
      setDescripcionRegistro(descripcionRegistro.map(Registro =>
        Registro.idRegistros === updatedRegistro.idRegistros ? updatedRegistro : Registro
      ));
      setEditingIndex(null);
      fetchDescripcionRegistro();

    } catch (error) {
      setError('Error al editar el Registro. Por favor, intenta nuevamente.');
      console.error('Error al editar Registro:', error);
    }
  };

  const handleDelete = async (idRegistros) => {
    try {
      await eliminarRegistros(idRegistros);
      setDescripcionRegistro(descripcionRegistro.filter(Registro => Registro.idRegistros !== idRegistros));
    } catch (error) {
      setError('Error al eliminar el Registro. Por favor, intenta nuevamente.');
      console.error('Error al eliminar Registro:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Lista Registros</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {descripcionRegistro.map((Registro, index) => (
            <tr key={Registro.idRegistros}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedRegistro.descripcionRegistro}
                    onChange={(e) => setEditedRegistro({ ...editedRegistro, descripcionRegistro: e.target.value })}
                  />
                ) : (
                  Registro.descripcionRegistro
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={() => handleSaveEdit(Registro.idRegistros)}>Guardar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index, Registro)}>Editar</button>
                    <button onClick={() => handleDelete(Registro.idRegistros)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarRegistros;
