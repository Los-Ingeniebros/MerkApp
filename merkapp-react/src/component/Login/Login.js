import { useState } from "react";
import './Login.css';

// import scrpt from './script.js';

function LogInForm (props) {
    const [enteredNombre, setNombre] = useState('');
    const [enteredContrasenia, setContrasenia] = useState('');

    const nombreChangeHandler = (event) => {
        setNombre(event.target.value);
    }

    const contraseniaChangeHandler = (event) => {
        setContrasenia(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const user = {
            nombre:enteredNombre,
            contrasenia:enteredContrasenia
        }
        props.onSaveName(user);
        setNombre('');
        setContrasenia('');
    }

    return (
        <div className="wrapper fadeInDown">
            <div className="container">
                <div className="form">
                    <span className="log">
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