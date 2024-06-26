import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
//import axios from "axios";
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
import Modificar from '../ModificarVenta/ModificarVenta';
import Listar from '../ModificarVenta/ListarVentas';
import ConsultarProductos from '../ConsultarProductos/ConsultarProductos';
import Producto from '../Producto/Producto';

import NavBar from '../NavBar/NavBar';
import AuthProvider from '../Auth/Auth';
// import AuthProvider from '../Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [user, setUser] = useState(() => {
    const valorGuardado = Cookies.get('user');
    return valorGuardado ? valorGuardado : '';
  });
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
    } else if (location.pathname.startsWith('/comprador/producto/')) {
      almacenadoUser = Cookies.get('user');
      if (almacenadoUser) {
        almacenadoUser = almacenadoUser.split(",");
        guardarCookie(almacenadoUser);
        console.log('Nombre de usuario recuperado:', almacenadoUser);
      } else {
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        navigate('/');
      }
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
  
  return (
    <>
    {/* <AuthProvider><NavBar></NavBar></AuthProvider> */}
    <AuthProvider>
    <NavBar></NavBar>

    <div>  
      <div>
        <ul className="circles">
          <li>Javier</li>
          <li></li>
          <li></li>
          <li>Jorge</li>
          <li></li>
          <li>Axel</li>
          <li>Eduardo</li>
          <li></li>
          <li></li>
          <li>Marcos</li>
          <li>Ola</li>
        </ul>
        <div className="container">
          <header className="App-header" id="app-header">
            <span className="logo-log">
              {/* <a onClick={() =>navigate('/')}>
                <img src={logo} alt="MerkApp's logo" />
                <h1>MerkApp</h1>
              </a> */}
              <Routes>
                <Route path="/" element={Home()} />
                <Route path="/vendedor" element={<HomeVendedor name={user} eliminarCookie={eliminarCookie}/>} />
                <Route path="/comprador" element={<HomeComprador name={user} eliminarCookie={eliminarCookie}></HomeComprador>} />
                <Route path="/vendedor/crear" element={Crear(user, categorias)} />
                <Route path="/vendedor/eliminar" element={Eliminar(user, ventas)} />
                <Route path="/comprador/consultar" element={ConsultarProductos(productos)} />
                <Route path="/comprador/producto/:key" element={<Producto user={user}/>} />
                <Route path="/comprador/calificacion/:key" element={<AgregarOpinion user = {user}/>} />
                <Route path="/vendedor/ventas" element={Listar (ventas) } />
                <Route path="/vendedor/modificar/:idProducto" element={<Modificar user={user} categorias={categorias} />} />
                <Route path="/comprador/buscar" element={<EncontrarProducto />} />
                <Route path="/login" element={<RequireAuth><LogInForm/></RequireAuth>} />
                <Route path='/ola' element={MiPaginaProtegida()} />
                <Route path='/register' element={<RequireAuth> <Registro /> </RequireAuth>} />
              </Routes>
            </span>
          </header>
        </div>
      </div>
    </div>
    </AuthProvider>
    </>
  );
}

export default App;