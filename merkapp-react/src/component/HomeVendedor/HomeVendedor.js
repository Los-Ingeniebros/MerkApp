import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './HomeVendedor.css';

import logo from '../../imagenes/MerkAppSinFondo.png';

function HomeVendedor(name){
    const navigate = useNavigate();

    const submitHandler = (event) => {
        Cookies.remove('user');
        navigate('/login');
        Cookies.remove('user');
    }

    function crear () {
        navigate('/vendedor/crear');
    };

    function eliminar () {
        navigate('/vendedor/eliminar');
    };

    function modificar () {
        navigate('/vendedor/modificar');                
    };

    return (
        // <div className="fondoVendedor">
        
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
                <div>
                    Hola {name[0]} {name[1]}
                    <div className="logo-log">
                        <button className="boton-animado" onClick={() => crear()}>Crear venta</button>
                        <br></br>
                        <button className="boton-animado" onClick={() => modificar()}>Modificar venta(s)</button>
                        <br></br>
                        <button className="boton-animado" onClick={() => eliminar()}>Eliminar venta(s)</button>
                        <br></br>
                        <button className="boton-animado" type="submit">Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </form>
        
        // </div>
    );
};

export default HomeVendedor;