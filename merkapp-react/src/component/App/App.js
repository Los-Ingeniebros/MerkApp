import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import LogInForm from '../Login/Login';
import HomeVendedor from '../HomeVendedor/HomeVendedor';
import HomeComprador from '../HomeComprador/HomeComprador';
import Eliminar from '../EliminarVentas/EliminarVentas';
import AgregarOpinion from '../AgregarOpinion/AgregarOpinion';

import logo from '../../imagenes/MerkAppSinFondo.png';

function App() {

  const [user, setUser] = useState('');
  const [users, setUsers] = useState('');  
  const navigate = useNavigate();
  const location = useLocation();

  async function ingresar (name) {
    console.log(name);        
    const response = await fetch('http://127.0.0.1:5000/login', {
      method:'POST',
      body: JSON.stringify(name),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data); 
    if (data.error !== undefined) {
      alert("ERROR! " + data.error);
    } else {
      alert("Usuario encontrado!");   
      console.log(data['nombre'])
      const usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]
      setUser(usr);  
      console.log(data['modo']);
      if(data['modo'] === 'Vendedor'){
        navigate('/vendedor');      
      } else if(data['modo'] === 'Comprador'){
        navigate('/comprador');      
      }
    }     
  };

  async function recuperar () {
    const response = await fetch('http://127.0.0.1:5000/recuperar', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });      
    const data = await response.json();    
    console.log(data);
    //console.log(typeof data['dic']);
    //console.log(data['dic']);
    //const usuarios = JSON.parse(data['lista']);
    //console.log(usuarios);
    //setUsers(usuarios);    
    setUsers(data['dic']);    
  };  

  useEffect(() => {            
    if (location.pathname === '/') {            
      Cookies.set('user', user);
      var almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        //setUser(almacenadoUser);
        almacenadoUser = almacenadoUser.split(",");           
        console.log('Nombre de usuario recuperado:', almacenadoUser);
        //Cookies.remove('user');
        if (almacenadoUser[0] === 'Vendedor'){
          navigate('/vendedor');
        } else if (almacenadoUser[0] === 'Comprador'){
          navigate('/comprador');
        }         
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
      }      
      //navigate('/home');
    } else if (location.pathname === '/vendedor') {            
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {     
        almacenadoUser = almacenadoUser.split(",");   
        setUser(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);  
        if (almacenadoUser[0] === 'Comprador'){
          navigate('/comprador');
        }       
      } else {        
        Cookies.set('user', user);
        //Cookies.remove('user');
        //navigate('/');        
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
      }
    } else if (location.pathname === '/comprador') {            
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {     
        almacenadoUser = almacenadoUser.split(",");   
        setUser(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser); 
        if (almacenadoUser[0] === 'Vendedor'){
          navigate('/vendedor');
        }        
      } else {        
        Cookies.set('user', user);
        //Cookies.remove('user');
        //navigate('/');        
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
      }
    } else if (location.pathname === '/login') {            
      Cookies.remove('user');
    } else if (location.pathname === '/vendedor/eliminar') {
      recuperar();      
    }
  }, [location.pathname]);

  return (
    <div className='login'>
    <div className="area" >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className='container'>
        {/* <h1 id={greeting}>Hola, mamon</h1> */}
        {/* 
        <p>Esto es un ejemplo de como escribir las cosas en React</p>
        <ul>
          {
            emojis.map(emoji => (

              <li key={emoji.name}>
              
              <button
              
              onClick={displayEmojiName} 
              >
              
              <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
              
              </button>
              
              </li>
              
              ))
          }
        </ul> */}
        <header className="App-header" id="app-header">
          <span className="logo-log">
            <img src={logo} alt="MerkApp's logo"/>
            <h1>MerkApp</h1>            
              <Routes>
                <Route path="/" element={<LogInForm onSaveName={ingresar}/>} />  
                <Route path="/vendedor" element={HomeVendedor(user)} />
                <Route path="/comprador" element={HomeComprador(user)} />
                <Route path="/vendedor/eliminar" element={Eliminar(users)} />  
                <Route path="/comprador/agregar" element={AgregarOpinion(user)} />  
                <Route path="/login" element={<LogInForm onSaveName={ingresar}/>} />  
              </Routes>            
          </span>
        </header>
      </div>
    </div >
  </div>
  );
}

export default App;