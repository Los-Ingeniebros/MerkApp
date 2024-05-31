import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './HomeComprador.css';
import { useAuth } from "../Auth/AuthContext";

function HomeComprador(name){
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
        // <div className="fondoComprador">
            <form onSubmit={submitHandler}>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    Hola {user[0]} {user[1]}
                    <div>
                        <button className="boton-animado" onClick={() => consultar()}>Consultar productos</button>                        
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
