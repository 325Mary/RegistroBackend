import axios from 'axios';
import API_URL  from '../../../envBackend'


const ApiUrl = API_URL.apiUrl;




export const getRegistros = () => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
    return axios.get(`${ApiUrl}/LstarRegistros`, {headers})
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching registros:', error);
        throw error;
      });
  };
export const crearRegistros = (RegistrosData) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
  return axios.post(`${ApiUrl}/crearRegistro`, RegistrosData, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Registros:', error);
      throw error;    
    });
};

export const editarRegistro = (idRegistros, RegistrosData) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
  return axios.put(`${ApiUrl}/actualizar/${idRegistros}`, RegistrosData, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Registros:', error);
      throw error;
    });
};

export const eliminarRegistro = (idRegistros) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        Authorization: `Bearer ${token}`, 
      };
  return axios.delete(`${ApiUrl}/eliminar/${idRegistros}`, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Registros:', error);
      throw error;
    });
};

