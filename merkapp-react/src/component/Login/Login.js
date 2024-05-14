import React, { useState } from "react";
import './Login.css';

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
        <div class="wrapper fadeInDown">
            <div class="container">
                <div class="form">
                    <span class="log">
                        Inicio de sesión
                    </span>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label for="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type='email'
                                value={enteredNombre}
                                onChange={nombreChangeHandler}
                            />
                        </div>
                        <div>
                            <label for="password">Password</label>
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
                        <div className="boton">
                            <button type="submit" id="submit" className='boton-animado'>Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInForm;