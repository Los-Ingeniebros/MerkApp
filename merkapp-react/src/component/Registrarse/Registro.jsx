import React, { useState }from 'react';

const Registro = (props) => {
  const [enteredCorreo, setCorreo] = useState('');
  const [enteredContrasenia, setContrasenia] = useState('');
  const [enteredNombre, setNombre] = useState('');
  const [enteredApellido, setApellido] = useState('');
  const [enteredRol, setRol] = useState('');
  const [enteredNumero, setNumero] = useState('');
  
const correoChangeHandler = (event) => {
    setCorreo(event.target.value);
}
const contraseniaChangeHandler = (event) => {
    setContrasenia(event.target.value);
}

const submitHandler = (event) => {
  event.preventDefault();
  const user = {
      correo:enteredCorreo,
      contrasenia:enteredContrasenia,
  }
  props.onSaveName(user);
  setCorreo('');
  setContrasenia('');
}
  return (
    <div className="">
      <div className='container'>
        <div className='form'>
          <span className="log">
            Registro            
          </span>
          <form onSubmit={submitHandler}>
                        <div>
                            <label for="nombre">Nombre: </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type='text'
                                value={enteredNombre}
                                onChange={correoChangeHandler}
                            />
                        </div>
                        <div>
                            <label for="apellido">Apellido: </label>
                            <input
                                id="apellido"
                                name="apellido"
                                type='text'
                                value={enteredApellido}
                                onChange={correoChangeHandler}
                            />
                        </div>
                        <div>
                            <label for="rol">Rol: </label>
                            <input
                                id="rol"
                                name="rol"
                                type='text'
                                value={enteredRol}
                                onChange={correoChangeHandler}
                            />
                        </div>
                        <div>
                            <label for="numero">Numero de telefono: </label>
                            <input
                                id="numero"
                                name="numero"
                                type='text'
                                value={enteredNumero}
                                onChange={correoChangeHandler}
                            />
                        </div>
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
                        <div className="boton">
                            <button type="submit" id="submit" className='boton-animado'>Registrar</button>
                        </div>
                    </form>
        </div>
      </div>  
    </div>
  ); 
};

export default Registro;