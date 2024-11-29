import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  const login = (authToken) => {
    setToken(authToken);
    setIsLoggedIn(true);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
