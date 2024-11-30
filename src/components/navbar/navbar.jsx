import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/Usuarios/receptor';
import { useCerrarSesion } from '../../services/Usuarios/Login';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, token, logout } = useAuth();
  const { cerrarSesion } = useCerrarSesion();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoggedIn === null) {
    return null;
  }

  const handleCerrarSesion = () => {
    cerrarSesion();
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>

        {isLoggedIn && token ? (
          <>
            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/registro">Registro</Link></li>
              <li><Link to="/listaUsuarios">Lista de Usuarios</Link></li>
              <li><Link to="/CrearRegistro">Crear Registros</Link></li>
              <li><Link to="/ListarRegistros">Listar Registros</Link></li>
              <li>
                <button className="btn" onClick={handleCerrarSesion}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </>
        ) : (
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {/* <li><Link to="/">Inicio</Link></li> */}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
