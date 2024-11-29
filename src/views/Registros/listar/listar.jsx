import { useState, useEffect } from 'react';
import { getRegistros, editarRegistro, eliminarRegistro } from '../../../services/Registros/registro';
import './Listar.css';
import Swal from 'sweetalert2';

const ListarRegistros = () => {
  const [Registros, setRegistros] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editRegistro, setEditRegistro] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const fetchRegistros = async () => {
    try {
      const RegistrosData = await getRegistros();
      console.log('Registros obtenidos:', RegistrosData);
  
      if (RegistrosData?.data && Array.isArray(RegistrosData.data)) {
        setRegistros(RegistrosData.data);
      } else if (Array.isArray(RegistrosData)) {
        setRegistros(RegistrosData); 
      } else {
        console.warn('Formato inesperado de RegistrosData:', RegistrosData);
      }
    } catch (error) {
      setError('Error al obtener la lista de Registros. Por favor, intenta nuevamente.');
      console.error('Error al obtener Registros:', error);
    }
  };
  
  
  
  useEffect(() => {
    fetchRegistros();
  }, []);

 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditRegistro({ ...Registros[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRegistro((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    const sanitizedData = {
      name: editRegistro.name || '',
      phone: editRegistro.phone || null,
      email: editRegistro.email || ''
    };
  
    try {
      console.log('Datos antes de enviar:', sanitizedData);
      const response = await editarRegistro(id, sanitizedData);
      console.log('Respuesta del servidor:', response);
  
      await fetchRegistros();
      setEditingIndex(-1);
      Swal.fire('Éxito', 'Registro actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar Registro:', error.response?.data || error);
      Swal.fire('Error', 'No se pudo actualizar el Registro', 'error');
    }
  };
  

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    });

    if (result.isConfirmed) {
      try {
        await eliminarRegistro(id);
        await fetchRegistros();
        Swal.fire('Eliminado', 'El Registro ha sido eliminado', 'success');
      } catch (error) {
        console.error('Error al eliminar Registro:', error);
        Swal.fire('Error', 'No se pudo eliminar el Registro', 'error');
      }
    }
  };

  return (
    <div className="table-container">
      <h1>Lista de Registros</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {Registros.length > 0 ? (
    Registros.map((Registro, index) => (
      <tr key={Registro.id}>
        {editingIndex === index ? (
          <>
            <td><input type="text" name="name" value={editRegistro.name} onChange={handleChange} /></td>
            <td><input type="text" name="phone" value={editRegistro.phone} onChange={handleChange} /></td>
            <td><input type="email" name="email" value={editRegistro.email} onChange={handleChange} /></td>
            <td>
              <button onClick={() => handleUpdate(Registro.id)}>Actualizar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </td>
          </>
        ) : (
          <>
            <td>{Registro.name}</td>
            <td>{Registro.phone}</td>
            <td>{Registro.email}</td>
            <td>
              <button onClick={() => handleEdit(index)}>Editar</button>
              <button onClick={() => handleDelete(Registro.id)}>Eliminar</button>
            </td>
          </>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No hay Registros para mostrar</td>
    </tr>
  )}
</tbody>


      </table>
    </div>
  );
};

export default ListarRegistros;
