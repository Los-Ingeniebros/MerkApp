import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './HomeVendedor.css';
import { AuthContext, useAuth } from "../Auth/AuthContext";
import logo from '../../imagenes/MerkAppSinFondo.png';

function HomeVendedor({name, eliminarCookie}){
  
    const navigate = useNavigate();
    const {user, logout ,login } = useAuth();
    
    const submitHandler = (event) => {

        logout();
    }

    function crear () {
        navigate('/vendedor/crear');
    };

    function eliminar () {
        navigate('/vendedor/eliminar');
    };

    function modificar () {
        navigate('/vendedor/ventas');
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
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
    );
};

export default HomeVendedor;