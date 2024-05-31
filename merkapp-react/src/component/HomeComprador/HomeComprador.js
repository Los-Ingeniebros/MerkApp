import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './HomeComprador.css';
import { useAuth } from "../Auth/AuthContext";
import logo from '../../imagenes/MerkAppSinFondo.png';

function HomeComprador({name, eliminarCookie}){
    const navigate = useNavigate();
    const {user, logout} = useAuth();

    const submitHandler = (event) => {
        logout();
    }     


    function consultar () {
        navigate('/comprador/consultar');
    }
    
    function buscar () {
        navigate('/comprador/buscar');
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                Hola {user[0]} {name[1]}
                <div>
                    <button className="boton-animado" onClick={() => consultar()}>Consultar productos</button>
                    <br></br>
                    <button className="boton-animado" onClick={() => buscar()}>Buscar productos</button>
                    <br></br>
                    <button className="boton-animado" type="submit">Cerrar sesión</button>
                </div>
            </div>
        </form>
    );
};

export default HomeComprador;
