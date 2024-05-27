/* import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function BuscarProducto (lista) {
    const navigate = useNavigate();
    const [elementosSeleccionados, setElementosSeleccionados] = useState([]); 

    const elementosSeleccionadosHandler = (key) => {
        if (elementosSeleccionados.includes(key)) {
            setElementosSeleccionados(elementosSeleccionados.filter(idUsuario => idUsuario !== key));
        } else {
            setElementosSeleccionados([...elementosSeleccionados, key]);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/buscarProducto', {
            method:'POST',
            body: JSON.stringify(elementosSeleccionados),
            headers: {
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        const data = await response.json();    
        console.log(data);
        navigate('/vendedor');
        setElementosSeleccionados('');
    };

    return ( 
        <form onSubmit={submitHandler}>
            <div>
            <ul>
                {Object.entries(lista).map(([key, value]) => (                
                    <div>
                        <input 
                        type="checkbox" 
                        id={key}
                        checked={elementosSeleccionados.includes(key)}
                        onChange={() => elementosSeleccionadosHandler(key)}/>
                        <label> Identificador {key} : 
                            <div> - Nombre = {value[0]}</div> 
                            <div> - Categoría = {value[1]}</div>
                            <div> - Precio = {value[2]}</div>
                            <div> - Inventario = {value[3]}</div>
                        </label>
                    </div>
                ))}
            </ul>
            <button type="submit">Buscar</button>
            
            </div>
        </form>
    );
};

export default BuscarProducto; */

import React, { useState } from 'react';

const BuscarProducto = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default BuscarProducto;