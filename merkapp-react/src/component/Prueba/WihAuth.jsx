// import React from 'react';
// // import { withRouter } from 'react-router-dom';

// import Cookies from 'js-cookie';

// // Este es tu HOC
// const withAuth = (WrappedComponent) => {
//   const WithAuth = (props) => {
//     // Verifica si la cookie de autenticación existe
//     const isAuthenticated = Cookies.get('rol');

//     // Si no está autenticado, redirige a la página de inicio de sesión
//     if (!isAuthenticated) {
//       props.history.push('/login');
//       return null;
//     }

//     // Si está autenticado, renderiza el componente envuelto
//     return <WrappedComponent {...props} />;
//   };

//   return withRouter(WithAuth);
// };

// export default withAuth; 
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Asegúrate de instalar js-cookie o alguna librería similar

// Componente de autenticación
const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get('user'); // Reemplaza 'authCookie' con el nombre de tu cookie
  console.log(isAuthenticated)
  console.log("weee")

  if (isAuthenticated) {
    // Redirige al usuario si no está autenticado
    console.log("miedo")
    return <Navigate to="/ola" replace />;
  }

  return children; // Renderiza los hijos si el usuario está autenticado
};

export default RequireAuth;