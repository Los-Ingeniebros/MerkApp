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