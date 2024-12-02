import { Link } from 'react-router-dom';
import { useAuth } from '../../services/Usuarios/receptor';
import { useCerrarSesion } from '../../services/Usuarios/Login';
import './navbar.css';
import { useState } from 'react';

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
    setMenuOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  
  };

  return (
    <nav className="navbar">
      <div className="container">
        {isLoggedIn && token && (
          <div className="hamburger" onClick={toggleMenu}>
            &#9776;
          </div>
        )}

        {isLoggedIn && token ? (
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/registrarUser" onClick={() => setMenuOpen(false)}>Registro</Link></li>
            <li><Link to="/listaUsuarios" onClick={() => setMenuOpen(false)}>Lista de Usuarios</Link></li>
            <li><Link to="/CrearRegistro" onClick={() => setMenuOpen(false)}>Crear Registros</Link></li>
            <li><Link to="/ListarRegistros" onClick={() => setMenuOpen(false)}>Listar Registros</Link></li>
            <li>
              <button className="btn" onClick={handleCerrarSesion}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        ) : (
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
