import React, { useState } from "react";
import './Login.css';

import logo from '../../imagenes/MerkAppSinFondo.png';

// import scrpt from './script.js';

function LogInForm (props) {
    const [enteredCorreo, setCorreo] = useState('');
    const [enteredContrasenia, setContrasenia] = useState('');
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const opciones = ["Vendedor", "Comprador"];

    const correoChangeHandler = (event) => {
        setCorreo(event.target.value);
    }

    const contraseniaChangeHandler = (event) => {
        setContrasenia(event.target.value);
    }

    const opcionChangeHandler = (elemento) => {
        setOpcionSeleccionada(elemento);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            correo:enteredCorreo,
            contrasenia:enteredContrasenia,
            modo:opcionSeleccionada
        }
        props.onSaveName(user);
        setCorreo('');
        setContrasenia('');
        setOpcionSeleccionada('');
    }

    return (
        // <div className="area">
            <span className="logo-log">
                <img src={logo} alt="MerkApp's logo"/>
                <h1>MerkApp</h1>
                <div className="wrapper fadeInDown">
                    <div className="container">
                        <div className="form">
                            <span className="log">
                                Inicio de sesión
                            </span>
                            <form onSubmit={submitHandler}>
                                <div>
                                    <label for="email">Correo electrónico: </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type='email'
                                        value={enteredCorreo}
                                        onChange={correoChangeHandler}
                                    />
                                </div>
                                <div>
                                    <label for="password">Contraseña: </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type='password'
                                        value={enteredContrasenia}
                                        onChange={contraseniaChangeHandler}
                                    />
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {opciones.map((opcion, indice) => (
                                    <li key={indice} onClick={() => opcionChangeHandler(opcion)} style={{ cursor: 'pointer', border: opcion === opcionSeleccionada ? '2px solid blue' : 'none', padding: '5px', marginBottom: '5px', borderRadius: '5px'}}>
                                        {opcion}
                                    </li>
                                    ))}
                                </ul>
                                <div>
                                    <button type="submit" id="submit" className="boton-animado">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </span>
        // </div>
    )
}

export default LogInForm;