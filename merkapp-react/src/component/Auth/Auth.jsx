import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    var almacenadoUser = Cookies.get('user');
    var almacenado = almacenadoUser.split(",");

    setUser(almacenado[1]);
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
