import React, { useState }from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './Registro.css'

function Registro() {
  const [enteredCorreo, setCorreo] = useState('');
  const [enteredContrasenia, setContrasenia] = useState('');
  const [enteredNombre, setNombre] = useState('');
  const [enteredApellido, setApellido] = useState('');
  const [enteredRol, setRol] = useState('');
  const [enteredNumero, setNumero] = useState('');
  const [desplegado, setDesplegado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const [advertencias,setAdvertencias] = useState({});
  const navigate = useNavigate();

  async function registrar (user) {
    console.log(user);    
    try{  
    const response = await fetch('http://127.0.0.1:5000/register', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    if (!response.ok) {
      console.error(`Error al obtener los datos: ${response.status}`);
      // console.log(typeof(response.status));
      if(response.status == 500){
        alert("Error del servidor");
      }else{
        alert("Error!" + response.status);
      }
    }
    const data = await response.json();
    console.log(response);
    console.log(data); 
    if (data.error !== undefined) {
       alert("ERROR! " + data.error);
    } else { 
      alert("Usuario registrado con éxito");
      navigate('/login');
    }
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
  }catch(error){
    console.log(error);
    // alert("Error!" + error.message);
  }
  };

  const validarCampos = () => {
    const nuevasAdvertencias = {};
    
    // Verifica cada campo
      if (!enteredApellido || enteredApellido === '') {
        nuevasAdvertencias['apellido'] = 'Este campo es obligatorio';
      }
      if (!enteredNombre || enteredNombre === '') {
        nuevasAdvertencias['nombre'] = 'Este campo es obligatorio';
      }
      if (!enteredContrasenia || enteredContrasenia === ''){
        nuevasAdvertencias['contrasenia'] = 'Este campo es obligatorio';
      }
      if (!enteredCorreo || enteredCorreo === ''){
        nuevasAdvertencias['correo'] = 'Este campo es obligatorio';
      }
      if (!enteredNumero || enteredNumero === ''){
        nuevasAdvertencias['numero'] = 'Este campo es obligatorio';
      }
      if (!enteredRol || enteredRol === ''){
        nuevasAdvertencias['rol'] = 'Debe elegir una opción';
      }
    setAdvertencias(nuevasAdvertencias);

    // Si no hay advertencias, todos los campos están llenos
    return Object.keys(nuevasAdvertencias).length === 0;
  };

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
  if (validarCampos()) {
    console.log('Todos los campos están llenos');
    const user = {
      nombre: enteredNombre,
      apellido: enteredApellido,
      rol: enteredRol,
      numero: enteredNumero,
      correo:enteredCorreo,
      contrasenia:enteredContrasenia
  }
  registrar(user);
  setCorreo('');
  setContrasenia('');
  setNombre('');
  setApellido('');
  setRol('');
  setNumero('');
  } else {
    console.log('Algunos campos están vacíos');
  }
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
                            {advertencias.nombre && <p className='advertencia'>{advertencias.nombre}</p>}
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
                            {advertencias.apellido && <small className='advertencia'>{advertencias.apellido}</small>}
                        </div>
                        
                        <div>
                          <label for="rol">Rol: </label>

                          <Dropdown onSelect={manejarClic} show={desplegado}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={() => setDesplegado(!desplegado)}>
                                  {opcionSeleccionada || 'Selecciona una opción'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item eventKey="Vendedor">Vendedor</Dropdown.Item>
                                  <Dropdown.Item eventKey="Comprador">Comprador</Dropdown.Item>
                                </Dropdown.Menu>
                          </Dropdown>
                          {advertencias.rol && <p className='advertencia'>{advertencias.rol}</p>}
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
                            {advertencias.numero && <p className='advertencia'>{advertencias.numero}</p>}
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
                            {advertencias.correo && <p className='advertencia'>{advertencias.correo}</p>}
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
                            {advertencias.contrasenia && <p className='advertencia'>{advertencias.contrasenia}</p>}
                        </div>
                        <div className="boton">
                            <button type="submit" id="submit" className='boton-animado'>Registrar</button>
                        </div>
                    </form>
        </div>
      </div>  
    </div>
  )
}

export default Registro;