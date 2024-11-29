import axios from 'axios';
import API_URL  from '../../../envBackend'


const ApiUrl = API_URL.apiUrl;



export const getRegistros = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
console.log(userId);
  if (!userId || !token) {
    const error = new Error('UserId o token no encontrados en localStorage');
    console.error(error);
    return Promise.reject(error);
  }

  return axios.get(`${ApiUrl}/listRegistros/${userId}`, {
    headers: {
      Authorization: token,
    },
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Registros p:', error);
      throw error;
    });
};

export const crearRegistros = (RegistrosData) => {
  return axios.post(`${ApiUrl}/crearRegistros`, RegistrosData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating Registros:', error);
      throw error;    
    });
};

export const editarRegistros = (idRegistros, RegistrosData) => {
  return axios.put(`${ApiUrl}/editRegistros/${idRegistros}`, RegistrosData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing Registros:', error);
      throw error;
    });
};

export const eliminarRegistros = (idRegistros) => {
  return axios.delete(`${ApiUrl}/EliminarRegistros/${idRegistros}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting Registros:', error);
      throw error;
    });
};

