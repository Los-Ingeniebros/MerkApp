import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './HomeComprador.css';

import logo from '../../imagenes/MerkAppSinFondo.png';

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
        // <div className="fondoComprador">
            <form onSubmit={submitHandler}>
                <div>
                    <div className="logopequeno">
                        <img src={logo} alt="MerkApp's logo"/>
                        Merkapp
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    Hola {name[0]} {name[1]}
                    <div>
                        <button className="boton-animado" onClick={() => agregar()}>Agregar opinión</button>
                        <br></br>
                        <button className="boton-animado" onClick={() => buscar()}>Buscar productos</button>
                        <br></br>
                        <button className="boton-animado" type="submit">Cerrar sesión</button>
                    </div>
                </div>
            </form>
        // </div>
    );
};

export default HomeComprador;