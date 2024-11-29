import { useState, useEffect } from 'react';
import { getUsuarios, editarUsuario, eliminarUsuario } from '../../../services/Usuarios/Login';
import './Listar.css';
import Swal from 'sweetalert2';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editUsuario, setEditUsuario] = useState({
    name: '',
    identificacion: '',
    email: ''
  });
  const fetchUsuarios = async () => {
    try {
      const usuariosData = await getUsuarios();
      console.log('Usuarios obtenidos:', usuariosData);
  
      if (usuariosData?.data && Array.isArray(usuariosData.data)) {
        setUsuarios(usuariosData.data);
      } else if (Array.isArray(usuariosData)) {
        setUsuarios(usuariosData); 
      } else {
        console.warn('Formato inesperado de usuariosData:', usuariosData);
      }
    } catch (error) {
      setError('Error al obtener la lista de usuarios. Por favor, intenta nuevamente.');
      console.error('Error al obtener usuarios:', error);
    }
  };
  
  
  
  useEffect(() => {
    fetchUsuarios();
  }, []);

 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditUsuario({ ...usuarios[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    const sanitizedData = {
      name: editUsuario.name || '',
      identificacion: editUsuario.identificacion || null,
      email: editUsuario.email || ''
    };
  
    try {
      console.log('Datos antes de enviar:', sanitizedData);
      const response = await editarUsuario(id, sanitizedData);
      console.log('Respuesta del servidor:', response);
  
      await fetchUsuarios();
      setEditingIndex(-1);
      Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response?.data || error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
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
        await eliminarUsuario(id);
        await fetchUsuarios();
        Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
      }
    }
  };

  return (
    <div className="table-container">
      <h1>Lista de Usuarios</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {usuarios.length > 0 ? (
    usuarios.map((usuario, index) => (
      <tr key={usuario.id}>
        {editingIndex === index ? (
          <>
            <td><input type="text" name="name" value={editUsuario.name} onChange={handleChange} /></td>
            <td><input type="text" name="identificacion" value={editUsuario.identificacion} onChange={handleChange} /></td>
            <td><input type="email" name="email" value={editUsuario.email} onChange={handleChange} /></td>
            <td>
              <button onClick={() => handleUpdate(usuario.id)}>Actualizar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </td>
          </>
        ) : (
          <>
            <td>{usuario.name}</td>
            <td>{usuario.identificacion}</td>
            <td>{usuario.email}</td>
            <td>
              <button onClick={() => handleEdit(index)}>Editar</button>
              <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
            </td>
          </>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No hay usuarios para mostrar</td>
    </tr>
  )}
</tbody>


      </table>
    </div>
  );
};

export default ListarUsuarios;
