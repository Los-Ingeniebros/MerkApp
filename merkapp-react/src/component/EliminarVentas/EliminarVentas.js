import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EliminarVentas (lista) {
    const navigate = useNavigate();
    const [elementosSeleccionados, setElementosSeleccionados] = useState([]); 
    /*   
    const dictionary = {
        apple: 'Manzana',
        banana: 'Plátano',
        orange: 'Naranja',
    };
    */    
    /*
    const [lista, setLista] = useState('');

    function setListaHandler(lista){
        setLista(lista);
    };
    */
    /*
    const listaChangeHandler = (event) => {
        //setLista(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const lista = {
            listaDeItems:lista
        }
        //props.onSaveName(lista);
        //setLista('');        
    }
    */

    /*
    return (                
        <div>
            <ul>
                {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
            </ul>
        </div> 
    );
    */
    /*
    return (                
        <form onSubmit={submitHandler}>                            
            <p>Usuarios</p>                      
            <button type="submit">EliminarVentas</button>
        </form>
    );
    */

    const elementosSeleccionadosHandler = (key) => {
        if (elementosSeleccionados.includes(key)) {
            setElementosSeleccionados(elementosSeleccionados.filter(idUsuario => idUsuario !== key));
        } else {
            setElementosSeleccionados([...elementosSeleccionados, key]);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        //console.log(elementosSeleccionados);
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
        navigate('/vendedor');
        setElementosSeleccionados('');
    };

    // <label>Identificador {key} : Nombre = {value[0]}, Contraseña = {value[1]}</label>
    // <label>Identificador {key} : <div> - Nombre = {value[0]}</div> <div> - Contraseña = {value[1]}</div></label>
    // <p>Elementos seleccionados: {elementosSeleccionados.join(', ')}</p>
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
                        <label>Identificador {key} : <div> - Nombre = {value[0]}</div> <div> - Contraseña = {value[1]}</div></label>
                    </div>
                ))}
            </ul>
            <button type="submit">Eliminar</button>
            
            </div>
        </form>
    );
};

export default EliminarVentas;