import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
//import axios from "axios";
import './App.css';
import LogInForm from '../Login/Login';
import HomeVendedor from '../HomeVendedor/HomeVendedor';
import HomeComprador from '../HomeComprador/HomeComprador';
import Crear from '../CrearVenta/CrearVenta';
import Eliminar from '../EliminarVentas/EliminarVentas';
import AgregarOpinion from '../AgregarOpinion/AgregarOpinion';
import BuscarProducto from '../BuscarProducto/BuscarProducto';
import EncontrarProducto from '../BuscarProducto/EncontrarProducto';
import logo from '../../imagenes/MerkAppSinFondo.png';
import RequireAuth from '../Prueba/WihAuth';
import MiPaginaProtegida from '../Prueba/P1';
import Registro from '../Registrarse/Registro';
import Home from '../Home/Home';
import Modificar from '../ModificarVenta/ModificarVenta';
import Listar from '../ModificarVenta/ListarVentas';

function App() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState('');
  const [categorias, setCategorias] = useState('');
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

  async function recuperarCategorias () {
    const response = await fetch('http://127.0.0.1:5000/recuperarCategorias', {
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
    setCategorias(data['cat']);
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
    } else if (location.pathname === '/vendedor/crear') {
      recuperarCategorias();
    } else if (location.pathname === '/vendedor/modificar/:idProducto') {
      recuperarCategorias();
    } else if (location.pathname === '/vendedor/ventas') {
      recuperarCategorias();
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
        <li></li>
      </ul>
      <div className='container'>
          <header className="App-header" id="app-header">
              <Routes>
                <Route path="/" element={Home()} />
                <Route path="/vendedor" element={HomeVendedor(user)} />
                <Route path="/comprador" element={HomeComprador(user)} />
                <Route path="/vendedor/crear" element={Crear(user, categorias)} />
                <Route path="/vendedor/eliminar" element={Eliminar(users)} />
                
                <Route path="/vendedor/ventas" element={Listar (users) } />
                
                
                <Route path="/vendedor/modificar/:idProducto" element={<Modificar user={user} categorias={categorias} />} />

                <Route path="/comprador/agregar" element={AgregarOpinion(user)} />  
                <Route path="/comprador/buscar" element={<EncontrarProducto />} />
                <Route path="/login" element={<RequireAuth><LogInForm onSaveName={ingresar}/></RequireAuth>} />  
                <Route path='/ola' element={MiPaginaProtegida()} />
                <Route path='/register' element={Registro()} />
              </Routes>
          </header>
      </div>
    </div >
  </div>
  );
}

export default App;

// <Modificar user={user} categorias={categorias || {}} />
// <Route path="/vendedor/modificar" element={Modificar(user, categorias)} />
// <Route path="/vendedor/modificar/:idProducto" element={Modificar (user, categorias)} />