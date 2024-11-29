import axios from 'axios';
import API_URL  from '../../../envBackend'


const ApiUrl = API_URL.apiUrl;




export const getRegistros = () => {
    return axios.get(`${ApiUrl}/LstarRegistros`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching registros:', error);
        throw error;
      });
  };
export const crearRegistros = (RegistrosData) => {
  return axios.post(`${ApiUrl}/crearRegistro`, RegistrosData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Registros:', error);
      throw error;    
    });
};

export const editarRegistro = (idRegistros, RegistrosData) => {
  return axios.put(`${ApiUrl}/actualizar/${idRegistros}`, RegistrosData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Registros:', error);
      throw error;
    });
};

export const eliminarRegistro = (idRegistros) => {
  return axios.delete(`${ApiUrl}/eliminar/${idRegistros}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Registros:', error);
      throw error;
    });
};

