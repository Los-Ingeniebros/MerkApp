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


function App() {
  const [user, setUser] = useState('');
  const [ventas, setVentas] = useState('');
  const [productos, setProductos] = useState('');  
  const [categorias, setCategorias] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
      const usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]
      setUser(usr);
      console.log(data['modo']);
      Cookies.set('user', user);
      if(data['modo'] === 'Vendedor'){
        navigate('/vendedor');
      } else if(data['modo'] === 'Comprador'){
        navigate('/comprador');    
      }
    }
  };

  async function recuperarVentas () {
    const response = await fetch('http://127.0.0.1:5000/recuperarVentas', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    setVentas(data['dic']);
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
      // Cookies.set('user', user);
      var almacenadoUser = Cookies.get("user");
      if (almacenadoUser) {
        //setUser(almacenadoUser);
        almacenadoUser = almacenadoUser.split(",");
        console.log("Nombre de usuario recuperado:", almacenadoUser);
        //Cookies.remove('user');
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
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
      }
      recuperarVentas();      
    } else if (location.pathname === '/comprador/consultar') {      
      recuperarProductos();      
    } else if (location.pathname === '/vendedor/crear') {
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
        console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
      }
      recuperarCategorias();
    } else if (location.pathname === '/vendedor/modificar/:idProducto') {
      recuperarCategorias();
    } else if (location.pathname === '/vendedor/ventas') {
      recuperarCategorias();     
      recuperarVentas(); 
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
                {" "}
                <img src={logo} alt="MerkApp's logo" />
              </a>
              <h1>MerkApp</h1>
              <Routes>
                <Route path="/" element={Home()} />
                <Route path="/vendedor" element={HomeVendedor(user)} />
                <Route path="/comprador" element={HomeComprador(user)} />
                <Route path="/vendedor/crear" element={Crear(user, categorias)} /> 
                <Route path="/vendedor/eliminar" element={Eliminar(ventas)} />  
                <Route path="/comprador/consultar" element={ConsultarProductos(productos)} />
                <Route path="/comprador/producto/:key" element={<Producto />} />                
                <Route path="/comprador/calificacion/:key" element={<AgregarOpinion user = {user}/>} />                                                 
                <Route path="/vendedor/ventas" element={Listar (ventas) } />
                <Route path="/vendedor/modificar/:idProducto" element={<Modificar user={user} categorias={categorias} />} />                                 
                <Route path="/comprador/buscar" element={<EncontrarProducto />} />
                <Route path="/login" element={<RequireAuth><LogInForm onSaveName={ingresar}/></RequireAuth>} />  
                <Route path='/ola' element={MiPaginaProtegida()} />
                <Route path='/register' element={<RequireAuth> <Registro /> </RequireAuth>} />
              </Routes>          
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
