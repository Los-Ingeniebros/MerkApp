import React, { useState }from 'react';
import { Dropdown } from 'react-bootstrap';

async function registrar (user) {
    console.log(user);      
    const response = await fetch('http://127.0.0.1:5000/register', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data); 
    // if (data.error !== undefined) {
    //   alert("ERROR! " + data.error);
    // } else {
    //   alert("Usuario encontrado!");   
    //   console.log(data['nombre'])
    //   const usr = [data['modo'], data['nombre'], data['correo'], data['contrasenia']]
    //   setUser(usr);  
    //   console.log(data['modo']);
    //   if(data['modo'] === 'Vendedor'){
    //     navigate('/vendedor');      
    //   } else if(data['modo'] === 'Comprador'){
    //     navigate('/comprador');      
    //   }
    // }     
  };

function Registro() {
  const [enteredCorreo, setCorreo] = useState('');
  const [enteredContrasenia, setContrasenia] = useState('');
  const [enteredNombre, setNombre] = useState('');
  const [enteredApellido, setApellido] = useState('');
  const [enteredRol, setRol] = useState('');
  const [enteredNumero, setNumero] = useState('');
  const [desplegado, setDesplegado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

function manejaRol(texto){
  setRol(texto);
  console.log(texto);
}
const manejarClic = (opcion) => {
  setOpcionSeleccionada(opcion);
  setDesplegado(!desplegado);
  setRol(opcion);
  console.log(opcion);
}
const correoChangeHandler = (event) => {
    setCorreo(event.target.value);
}
const contraseniaChangeHandler = (event) => {
    setContrasenia(event.target.value);
}
const nombreChangeHandler = (event) => {
  setNombre(event.target.value);
}
const apellidoChangeHandler = (event) => {
  setApellido(event.target.value);
}
const numeroChangeHandler = (event) => {
  setNumero(event.target.value);
}

const submitHandler = (event) => {
  event.preventDefault();
  const user = {
      correo:enteredCorreo,
      contrasenia:enteredContrasenia
  }
  registrar(user);
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
                                onChange={nombreChangeHandler}
                            />
                        </div>
                        <div>
                            <label for="apellido">Apellido: </label>
                            <input
                                id="apellido"
                                name="apellido"
                                type='text'
                                value={enteredApellido}
                                onChange={apellidoChangeHandler}
                            />
                        </div>
                        {/* <div>
                            <label for="rol">Rol: </label>
                            <input
                                id="rol"
                                name="rol"
                                type='text'
                                value={enteredRol}
                                onChange={rolChangeHandler}
                            />
                        </div> */}
                          {/* <div>
                          <label for="rol">Rol: </label>
      <button onClick={manejarClic}>
        {desplegado ? '' : 'Mostrar'}
      </button>
      {desplegado && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <button onClick={manejaRol("vendedor")}>
            Botón 1
          </button>
          <button onClick={manejaRol("comprador")}>
            Botón 2
          </button>
        </div>
      )}
    </div> */}
<div>
<label for="rol">Rol: </label>
{/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Botón desplegable
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Acción 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Acción 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Acción 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}

<Dropdown onSelect={manejarClic} show={desplegado}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={() => setDesplegado(!desplegado)}>
        {opcionSeleccionada || 'Selecciona una opción'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="vendedor">vendedor</Dropdown.Item>
        <Dropdown.Item eventKey="comprador">comprador</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
</div>

                        <div>
                            <label for="numero">Numero de telefono: </label>
                            <input
                                id="numero"
                                name="numero"
                                type='text'
                                value={enteredNumero}
                                onChange={numeroChangeHandler}
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