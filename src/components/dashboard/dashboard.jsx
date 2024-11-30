import './dashboard.css';
import { useState, useEffect } from 'react';
import { getRegistros } from '../../services/Registros/registro'; 
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [registros, setRegistros] = useState([]); 
  const [error, setError] = useState(''); 
  const [selectedRegistro, setSelectedRegistro] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('Buenos días');
    } else if (hour < 18) {
      setTimeOfDay('Buenas tardes');
    } else {
      setTimeOfDay('Buenas noches');
    }
  }, []);

  const fetchRegistros = async () => {
    try {
      const registrosData = await getRegistros();
      console.log('Registros obtenidos:', registrosData);

      if (registrosData?.data && Array.isArray(registrosData.data)) {
        setRegistros(registrosData.data);
      } else if (Array.isArray(registrosData)) {
        setRegistros(registrosData);
      } else {
        console.warn('Formato inesperado de registrosData:', registrosData);
      }
    } catch (error) {
      setError('Error al obtener los registros. Por favor, intenta nuevamente.');
      console.error('Error al obtener registros:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al obtener los registros. Intenta nuevamente.',
      });
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const openModal = (registro) => {
    setSelectedRegistro(registro); 
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRegistro(null);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>{timeOfDay}, bienvenido al sistema de registros de contactos</h1>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="contact-summary">
  <div className="summary-box">
    <h3>Total de contactos registrados</h3>
    <p>{registros.length}</p>
  </div>
  <div className="time-icon">
    {timeOfDay === 'Buenos días' ? (
      <i className="fa-solid fa-cloud-sun"></i> 
    ) : timeOfDay === 'Buenas noches' ? (
      <i className="fa-solid fa-moon"></i> 
    ) : (
      <i className="fa-solid fa-cloud-sun"></i> 
    )}
  </div>
</div>


      <div className="contact-cards">
        {registros.map((registro, index) => (
          <div key={index} className="contact-card">
            <div className="card-content">
              <p>{registro.email}</p>
            </div>
            <div className="card-hover">
              <button className="view-btn" onClick={() => openModal(registro)}>
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedRegistro && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalles del contacto</h2>
            <p><strong>Nombre:</strong> {selectedRegistro.name}</p>
            <p><strong>Email:</strong> {selectedRegistro.email}</p>
            <p><strong>Teléfono:</strong> {selectedRegistro.phone}</p>
            <button className="close-btn" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
