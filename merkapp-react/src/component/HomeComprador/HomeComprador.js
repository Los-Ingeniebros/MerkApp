import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Eliminar from './EliminarVentas';
import setListaHandler from "./EliminarVentas";

import Cookies from 'js-cookie';
import salirSesion from './App';
import AgregarOpinion from "./AgregarOpinion";

function HomeComprador(name){    
    //const [user, setUser] = useState(name);
    const navigate = useNavigate();

    //const location = useLocation();  

    //setUser(name);
    //Cookies.set('user', name);

    /*
    useEffect(() => {    
        //Cookies.set('user', user);
        const almacenadoUser = Cookies.get('user');
        if (almacenadoUser) {
            setUser(almacenadoUser);
            console.log('Nombre de usuario recuperado:', almacenadoUser);
            navigate('/home');
        } else {
            Cookies.set('user', name);
            console.log('No se encontró ningún nombre de usuario almacenado en los cookies.');
        }        
      }, []);

    */

    const submitHandler = (event) => {         
        Cookies.remove('user');
        navigate('/login');
        Cookies.remove('user');
    } 

    function agregar () {
        navigate('/comprador/agregar');                
    };

    // <button type="submit">Cerrar sesión</button>

    return (
        <form onSubmit={submitHandler}>  
            <div> 
                Hola {name[0]} {name[1]}                
                <div>
                    <button type="submit">Cerrar sesión</button>                 
                    <button onClick={() => agregar()}>Agregar opinión</button>                 
                </div>
            </div>
        </form>);
};

export default HomeComprador;