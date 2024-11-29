import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCerrarSesion } from '../../services/Usuarios/Login';
import { useTokenValidator } from '../../services/Usuarios/validador';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [perfil, setPerfil] = useState('');
  const navigate = useNavigate();
  const { cerrarSesion } = useCerrarSesion();
  const isLoggedInFromToken = useTokenValidator();

  useEffect(() => {
    setIsLoggedIn(isLoggedInFromToken);

    const obtenerPerfil = () => {
      const perfilGuardado = localStorage.getItem('idPerfil');
      setPerfil(perfilGuardado);
    };

    obtenerPerfil(); 
  }, [isLoggedInFromToken]);

  const handleCerrarSesion = async () => {
    await cerrarSesion();
    setIsLoggedIn(false);
    setPerfil('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          {isLoggedIn && (
            <>
              {perfil === '1' && (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/registro">Registro</Link></li>
                  <li><Link to="/listaUsuarios">Lista de Usuarios</Link></li>
                  <li><Link to="/CrearRegistros">Crear Registros</Link></li>
                  <li><Link to="/listaRegistros">Listar Registros</Link></li>
                </>
              )}
              {perfil === '2' && (
                <>
                  <li><Link to="/listaRegistros">Listar Registros</Link></li>
                  <li><Link to="/RegistrosAsignados">Gestión de Registros</Link></li>
                </>
              )}
              {perfil === '3' && (
                <>
                  <li><Link to="/ListRegistrosAsignados">Registros Asignados</Link></li>
                </>
              )}
              <li><Link className='btn' onClick={handleCerrarSesion}>Cerrar Sesión</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
