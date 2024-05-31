import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EliminarVentas (user, lista) {
    const navigate = useNavigate();
    const [elementosSeleccionados, setElementosSeleccionados] = useState([]);

    const elementosSeleccionadosHandler = (key) => {
        if (elementosSeleccionados.includes(key)) {
            setElementosSeleccionados(elementosSeleccionados.filter(idUsuario => idUsuario !== key));
        } else {
            setElementosSeleccionados([...elementosSeleccionados, key]);
        }
    };

    function Regresar(){
        navigate('/vendedor');
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/eliminarVentas', {
            method:'POST',
            body: JSON.stringify(elementosSeleccionados),
            headers: {
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        alert("Los productos se eliminaron correctamente");
        navigate('/vendedor');
        setElementosSeleccionados('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
            <h2>Productos en venta: {lista && Object.entries(lista).length > 0 ? Object.entries(lista).length : 0}</h2>
            {Object.entries(lista).length > 0 ? <h1>Selecciona los productos que quieres eliminar:</h1> : <h1>No tienes ningun producto en venta</h1>}
            <ul>
                {lista && Object.entries(lista).map(([key, value]) => (
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
            {elementosSeleccionados.length > 0 ? <button type="submit">Eliminar</button> : <button onClick={() => Regresar()}>Regresar</button>}
            
            </div>
        </form>
    );
};

export default EliminarVentas;