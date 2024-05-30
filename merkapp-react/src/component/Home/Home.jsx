import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  console.log("!respondable")
    const navigate = useNavigate();
  return <> 
  <div>Bienvenido a nuestro sistema</div>
  <div className='col'>
    <button onClick={() =>navigate('/login')}>Iniciar Sesion</button>
    <button onClick={() =>navigate('/register')}>Registrarse</button>
  </div>
  </>
};

export default Home;