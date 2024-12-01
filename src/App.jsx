// import React from 'react';
import LandingPage from './components/Landing/Landing';
import Dashboard from './components/dashboard/dashboard'
import Navbar from './components/navbar/navbar';
import RegistroUsuario from './views/Usuario/Registrar/registrar';
import ListarUsuarios from './views/Usuario/Listar/listar';
import CrearRegistros from './views/Registros/crear/crear'; 
import ListarRegistros from './views/Registros/listar/listar';
import Footer from './components/footer/footer';
import './App.css';

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  return (
   
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/registrarUser' element={<RegistroUsuario />} />
      <Route path='/listaUsuarios' element={<ListarUsuarios />} />
      <Route path='/ListarRegistros' element={<ListarRegistros />} />
      <Route path='/CrearRegistro' element={<CrearRegistros />} />
      <Route path='**' element={<found/>}/>
    </Routes>
    <Footer />
  </Router> 
  );
}

export default App;
