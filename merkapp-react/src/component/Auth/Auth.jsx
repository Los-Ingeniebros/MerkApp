import React, { useState,useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



function AuthProvider ({ children }){
  const [user, setUser] =  useState(() => {
    const valorGuardado = Cookies.get('user');
    return valorGuardado ? valorGuardado.split(",") : '';
  });
  const navigate = useNavigate();


  useEffect(() => {
    var almacenadoUser = Cookies.get('user');
    if(almacenadoUser !== '' && almacenadoUser){
        var almacenado = almacenadoUser.split(",");
        setUser(almacenado)
    }
  },[user]);

  async function login(name) {
    console.log(name);
        const response = await fetch('http://127.0.0.1:5000/login', {
          method:'POST',
          body: JSON.stringify(name),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
            console.error(`Error al obtener los datos: ${response.status}`);
    
            if (response.status === 500) {
              alert("Error del servidor");
            } else {
              alert("Error!" + response.status);
            }
        }
        console.log(data);
        if (data.error !== undefined) {
          alert("ERROR! " + data.error);
        } else {
          alert("Usuario encontrado!");
          console.log(data['nombre'])
          const usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]
          setUser(usr);
          console.log(data['modo']);
          Cookies.set('user', usr);
          if(data['modo'] === 'Vendedor'){
            navigate('/vendedor');
          } else if(data['modo'] === 'Comprador'){
            navigate('/comprador');    
          }
        }
    console.log("abc de :"+ user)
    // var almacenadoUser = Cookies.get('user');
    // var almacenado = almacenadoUser.split(",");

    // setUser(almacenado[1]);
  };

  function logout(){
    Cookies.remove('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
