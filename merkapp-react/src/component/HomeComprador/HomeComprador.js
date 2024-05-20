import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function HomeComprador(name){    
    const navigate = useNavigate();

    const submitHandler = (event) => {         
        Cookies.remove('user');
        navigate('/login');
        Cookies.remove('user');
    } 

    function agregar () {
        navigate('/comprador/agregar');                
    };

    function buscar () {
        navigate('/comprador/buscar');                
    };

    return (
        <form onSubmit={submitHandler}>  
            <div> 
                Hola {name[0]} {name[1]}                
                <div>                
                    <button onClick={() => agregar()}>Agregar opinión</button>
                    <button onClick={() => buscar()}>Buscar productos</button>
                    <button type="submit">Cerrar sesión</button>
                </div>
            </div>
        </form>);
};

export default HomeComprador;