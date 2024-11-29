import { Link } from 'react-router-dom';
import { useAuth } from '../../services/Usuarios/receptor';
import { useCerrarSesion } from '../../services/Usuarios/Login';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const { isLoggedIn, token, logout } = useAuth();
  const { cerrarSesion } = useCerrarSesion();

  // Estados para controlar el despliegue de los menús
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);
  const [showContactosMenu, setShowContactosMenu] = useState(false);

  if (isLoggedIn === null) {
    return null;
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          {isLoggedIn && token && (
            <>
              <li>
                {/* Menú desplegable para Usuarios */}
                <div
                  className="dropdown"
                  onMouseEnter={() => setShowUsuariosMenu(true)}
                  onMouseLeave={() => setShowUsuariosMenu(false)}
                >
                  <span className="dropdown-title">Usuarios</span>
                  {showUsuariosMenu && (
                    <ul className="dropdown-menu">
                      <li><Link to="/registro">Registro</Link></li>
                      <li><Link to="/listaUsuarios">Lista de Usuarios</Link></li>
                    </ul>
                  )}
                </div>
              </li>

              <li>
                {/* Menú desplegable para Contactos */}
                <div
                  className="dropdown"
                  onMouseEnter={() => setShowContactosMenu(true)}
                  onMouseLeave={() => setShowContactosMenu(false)}
                >
                  <span className="dropdown-title">Contactos</span>
                  {showContactosMenu && (
                    <ul className="dropdown-menu">
                      <li><Link to="/CrearRegistro">Crear Registros</Link></li>
                      <li><Link to="/ListarRegistros">Listar Registros</Link></li>
                    </ul>
                  )}
                </div>
              </li>

              <li>
                <button className="btn" onClick={handleCerrarSesion}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
