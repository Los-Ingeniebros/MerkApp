import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './Login.css';

function LogInForm (props) {
    const [enteredCorreo, setCorreo] = useState('');
    const [enteredContrasenia, setContrasenia] = useState('');
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [user, setUser] = useState('');
    const opciones = ["Vendedor", "Comprador"];
    const navigate = useNavigate();

    async function ingresar (name) {
        console.log(name);
        const response = await fetch('http://127.0.0.1:5000/login', {
          method:'POST',
          body: JSON.stringify(name),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
            console.error(`Error al obtener los datos: ${response.status}`);
    
            if (response.status === 500) {
              alert("Error del servidor");
            } else {
              alert("Error!" + response.status);
            }
        }
        console.log(data);
        if (data.error !== undefined) {
          alert("ERROR! " + data.error);
        } else {
          alert("Usuario encontrado!");
          console.log(data['nombre'])
          const usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]
          setUser(usr);
          console.log(data['modo']);
          Cookies.set('user', usr);
          if(data['modo'] === 'Vendedor'){
            navigate('/vendedor');
          } else if(data['modo'] === 'Comprador'){
            navigate('/comprador');    
          }
        }
    };

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
        // props.onSaveName(user);
        ingresar(user)
        console.log("música " + user);
        setCorreo('');
        setContrasenia('');
        setOpcionSeleccionada('');
    }
    return (
        // <div className="area">
            <div className="logo-log">
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
                                        required
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
                                        required
                                    />
                                </div>
                                <ul className="opciones" style={{ listStyle: 'none', padding: 0 }}>
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
                            <div className="boton">
                                <button type="submit" className='boton-animado' onClick={() =>navigate('/register')} >¿No tiene cuenta? Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}
export default LogInForm;