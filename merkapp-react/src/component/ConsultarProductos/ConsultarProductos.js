import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ConsultarProductos (lista) {
    const navigate = useNavigate();
    const [elementoSeleccionado, setElementoSeleccionado] = useState(null);

    const elementoSeleccionadoHandler = (key) => {
        setElementoSeleccionado(key);
        navigate('/comprador/producto/'+key);
    };
    
    return (
        <ul>
            {lista && Object.entries(lista).map(([key, value]) => (
                <div key={key}>
                    <label
                        type="submit" 
                        onClick={() => elementoSeleccionadoHandler(key)}
                        style={{ cursor: 'pointer' }}> 
                        Identificador {key} : 
                        <div> - Nombre = {value[0]}</div> 
                        <div> - Categoría = {value[1]}</div>
                        <div> - Precio = {value[2]}</div>
                        <div> - Inventario = {value[3]}</div>
                    </label>
                </div>
            ))}
        </ul>
    );
};

export default ConsultarProductos;
