import { useState } from 'react';
import { getUsuarios, editarUsuario, eliminarUsuario } from '../../../services/Usuarios/Login';
import './Listar.css';
import Swal from 'sweetalert2';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editUsuario, setEditUsuario] = useState({
    nombreUsuario: '',
    apellidoUsuario: '',
    IdentificacionUsuario: '',
    idPerfil: '',
    emailUsuario: ''
  });

  const fetchUsuarios = async () => {
    try {
      const usuariosData = await getUsuarios();
      console.log('Usuarios obtenidos:', usuariosData);
      if (usuariosData.data && Array.isArray(usuariosData.data) && usuariosData.data.length > 0) {
        setUsuarios(usuariosData.data[0]);
      }
    } catch (error) {
      setError('Error al obtener la lista de usuarios. Por favor, intenta nuevamente.');
      console.error('Error al obtener usuarios:', error);
    }
  };

 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditUsuario({ ...usuarios[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (idUsuario) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { Perfil, ...usuarioSinPerfil } = editUsuario;
      await editarUsuario(idUsuario, usuarioSinPerfil);
      await fetchUsuarios(); // Recargar la lista de usuarios
      setEditingIndex(-1);
      Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleDelete = async (idUsuario) => {
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
        await eliminarUsuario(idUsuario);
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
            <th>Apellido</th>
            <th>Identificación</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.idUsuario}>
              {editingIndex === index ? (
                <>
                  <td><input type="text" name="nombreUsuario" value={editUsuario.nombreUsuario} onChange={handleChange} /></td>
                  <td><input type="text" name="apellidoUsuario" value={editUsuario.apellidoUsuario} onChange={handleChange} /></td>
                  <td><input type="text" name="IdentificacionUsuario" value={editUsuario.IdentificacionUsuario} onChange={handleChange} /></td>
                  
                  <td><input type="email" name="emailUsuario" value={editUsuario.emailUsuario} onChange={handleChange} /></td>
                  <td>
                    <button onClick={() => handleUpdate(usuario.idUsuario)}>Actualizar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.apellidoUsuario}</td>
                  <td>{usuario.IdentificacionUsuario}</td>
                  <td>{usuario.Perfil}</td>
                  <td>{usuario.emailUsuario}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Editar</button>
                    <button onClick={() => handleDelete(usuario.idUsuario)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
