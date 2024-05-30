import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ListarVentas (lista) {
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
        const response = await fetch('http://127.0.0.1:5000/listarVentas', {
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

    const handleModificar = (idProducto) => {
        navigate(`/vendedor/modificar/${idProducto}`);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <ul>
                    {lista && Object.entries(lista).map(([key, value]) => (
                        <li key={key} className="producto-item">
                            <div className="producto-info">
                                <h2>Identificador {key}</h2>
                                <p>Nombre: {value[0]}</p>
                                <p>Categoría: {value[1]}</p>
                                <p>Precio: {value[2]}</p>
                                <p>Inventario: {value[3]}</p>
                            </div>
                            <button className="comprar-btn" onClick={() => handleModificar(key)}>
                                Modificar
                            </button>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
};

export default ListarVentas;