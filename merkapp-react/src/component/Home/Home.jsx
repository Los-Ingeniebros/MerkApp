import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return <> 
  <div className="logo-log">Bienvenid@ a nuestro sistema</div>
  <br></br>
  <div className="logo-log">
    <button className='boton-animado' onClick={() =>navigate('/login')}>Iniciar Sesion</button>
    <br></br>
    <button className='boton-animado' onClick={() =>navigate('/register')}>Registrarse</button>
  </div>
  </>
};

export default Home;