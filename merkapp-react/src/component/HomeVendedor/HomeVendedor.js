import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function HomeVendedor(name){    
    const navigate = useNavigate();

    const submitHandler = (event) => {         
        Cookies.remove('user');
        navigate('/login');
        Cookies.remove('user');
    }    

    function eliminar () {
        navigate('/vendedor/eliminar');                
    };

    function modificar () {
        navigate('/vendedor/modificar');                
    };

    return (
        <form onSubmit={submitHandler}>  
            <div> 
                Hola {name[0]} {name[1]}                
                <div>
                    <button type="submit">Cerrar sesión</button>                 
                    <button onClick={() => eliminar()}>Eliminar venta(s)</button>     
                    <button onClick={() => modificar()}>Modificar venta(s)</button>                               
                </div>
            </div>
        </form>);
};

export default HomeVendedor;