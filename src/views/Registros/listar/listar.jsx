import { useState, useEffect } from 'react';
import { getRegistros, editarRegistro, eliminarRegistro } from '../../../services/Registros/registro';
import './listar.css';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredRegistros = Registros.filter((registro) => {
    if (searchQuery.length < 3) return true; 
    return (
      registro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registro.phone.includes(searchQuery)
    );
  });

  const sortedRegistros = filteredRegistros.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="cards-container">
      <h1>LISTA DE CONTACTOS</h1>
      {error && <p>Error: {error}</p>}

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o teléfono..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="cards">
        {sortedRegistros.length > 0 ? (
          sortedRegistros.map((Registro, index) => (
            <div className="cardContac" key={Registro.id}>
              {editingIndex === index ? (
                <div className="card-content">
                  <div className="card-info">
                    <input
                      type="text"
                      name="name"
                      value={editRegistro.name}
                      onChange={handleChange}
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={editRegistro.phone}
                      onChange={handleChange}
                      placeholder="Teléfono"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editRegistro.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleUpdate(Registro.id)}>Actualizar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="card-content">
                  <div className="card-info">
                    <h3>Nombre: {Registro.name}</h3>
                    <p>Tel: {Registro.phone}</p>
                    <p>Email: {Registro.email}</p>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(index)}>Editar</button>
                    <button onClick={() => handleDelete(Registro.id)}>Eliminar</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay registros para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default ListarRegistros;
