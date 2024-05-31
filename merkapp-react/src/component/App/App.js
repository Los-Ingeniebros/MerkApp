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
//import ModificarVentas from '../ModificarVentas/ModificarVentas';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modificar from '../ModificarVenta/ModificarVenta';
import Listar from '../ModificarVenta/ListarVentas';
import ConsultarProductos from '../ConsultarProductos/ConsultarProductos';
import Producto from '../Producto/Producto';
import { Navbar } from 'react-bootstrap';


function App() {
  const [user, setUser] = useState('');
  const [ventas, setVentas] = useState('');
  const [productos, setProductos] = useState('');  
  const [categorias, setCategorias] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function guardarCookie(user){
    setUser(user);
    Cookies.set('user', user);
  }

  function eliminarCookie(){  
    setUser('');
    Cookies.remove('user');
  }

  async function ingresar (name) {
    console.log(name);
    const response = await fetch('http://127.0.0.1:5000/login', {
      method:'POST',
      body: JSON.stringify(name),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.error !== undefined) {
      alert("ERROR! " + data.error);
    } else {
      alert("Usuario encontrado!");
      console.log(data['nombre'])
      var usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]      
      console.log(data['modo']);
      guardarCookie(usr);
      if(data['modo'] === 'Vendedor'){
        navigate('/vendedor');
      } else if(data['modo'] === 'Comprador'){
        navigate('/comprador');    
      }
    }
  };

  async function recuperarVentas (user) {    
    const response = await fetch('http://127.0.0.1:5000/recuperarVentas', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();    
    setVentas(data['dic']);
  };

  async function recuperarCategorias (user) {
    const response = await fetch('http://127.0.0.1:5000/recuperarCategorias', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    setCategorias(data['cat']);    
  };
  
  async function recuperarProductos () {
    const response = await fetch('http://127.0.0.1:5000/recuperarProductos');      
    const data = await response.json();    
    console.log(data);  
    setProductos(data['dic']);    
    setCategorias(data['cat']);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      var almacenadoUser = Cookies.get("user");
      if (almacenadoUser) {        
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log("Nombre de usuario recuperado:", almacenadoUser);        
        if (almacenadoUser[0] === "Vendedor") {
          navigate("/vendedor");
        } else if (almacenadoUser[0] === "Comprador") {
          navigate("/comprador");
        }
      } else {
        console.log(
          "No se encontró ningún nombre de usuario almacenado en los cookies."          
        );        
      }      
    } else if (location.pathname === '/login') {
      var almacenadoUser = Cookies.get("user");
      if (almacenadoUser) {        
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log("Nombre de usuario recuperado:", almacenadoUser);       
        if (almacenadoUser[0] === "Vendedor") {
          navigate("/vendedor");
        } else if (almacenadoUser[0] === "Comprador") {
          navigate("/comprador");
        }
      } else {
        console.log(
          "No se encontró ningún nombre de usuario almacenado en los cookies."
        );        
      }
    } else if (location.pathname === '/vendedor') {
      var almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);
        if (almacenadoUser[0] === 'Comprador'){
          navigate('/comprador');
        }
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
      console.log("Recuperado? "+ user)
    } else if (location.pathname === '/comprador') {
      var almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);
        if (almacenadoUser[0] === 'Vendedor'){
          navigate('/vendedor');
        }
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
    } else if (location.pathname === '/vendedor/eliminar') {
      var almacenadoUser = Cookies.get('user'); 
      console.log("Mi cookie: " + almacenadoUser)                 
      if (almacenadoUser !== '') {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);          
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      } 
      recuperarVentas(almacenadoUser);
    } else if (location.pathname === '/comprador/consultar') {      
      recuperarProductos();      
    } else if (location.pathname === '/vendedor/crear') {
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);        
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
      recuperarCategorias(almacenadoUser);
    } else if (location.pathname.startsWith('/vendedor/modificar/')) {
      almacenadoUser = Cookies.get('user');
      console.log("Mi cookie: " + almacenadoUser)
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);        
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
      recuperarCategorias(almacenadoUser);
    } else if (location.pathname === '/vendedor/ventas') {
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);        
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
      recuperarCategorias(almacenadoUser);     
      recuperarVentas(almacenadoUser);       
    } else if (location.pathname.startsWith('/comprador/calificacion/')) {
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);        
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }        
    }
  }, [location.pathname]);

  //<header className="App-header" id="app-header">
  //<Routes>
  
  return (
    <div>
      <div>
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
          <li>Ola</li>
        </ul>
        <div className="container">
          <div>
            <span className="logo-log">
              <a href="/">
                <img src={logo} alt="MerkApp's logo" />
            </a>            
              <Routes>
                <Route path="/" element={Home()} />
                <Route path='/register' element={<Registro /> } />              
                <Route path="/login" element={<LogInForm onSaveName={ingresar}/>} />                
                <Route path="/vendedor" element={<HomeVendedor name={user} eliminarCookie={eliminarCookie}/>} />                
                <Route path="/comprador" element={<HomeComprador name={user} eliminarCookie={eliminarCookie}/>} />                
                <Route path="/vendedor/crear" element={Crear(user, categorias)} /> 
                <Route path="/vendedor/eliminar" element={Eliminar(user, ventas)} />  
                <Route path="/comprador/consultar" element={ConsultarProductos(productos)} />
                <Route path="/comprador/producto/:key" element={<Producto />} />                
                <Route path="/comprador/calificacion/:key" element={<AgregarOpinion user = {user}/>} />                                                 
                <Route path="/vendedor/ventas" element={Listar (ventas) } />
                <Route path="/vendedor/modificar/:idProducto" element={<Modificar user={user} categorias={categorias} />} />                                 
                <Route path="/comprador/buscar" element={<EncontrarProducto />} />                                  
              </Routes>                     
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
