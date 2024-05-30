import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Producto () {
    const { key } = useParams();
    const [producto, setProducto] = useState('');  
    const navigate = useNavigate();    

    async function recuperarProducto(){
        const response = await fetch('http://127.0.0.1:5000/recuperarProducto', {
        method:'POST',
        body: JSON.stringify(key),
        headers: {
            'Content-Type':'application/json'
        }
        });
        const data = await response.json();
        console.log(data); 
        setProducto(data['producto']);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        navigate('/comprador/calificacion/'+key);
        setProducto('');
    };

    useEffect(() => {
        recuperarProducto();
    }, []);    

    return (
        <form onSubmit={submitHandler}>
            <div>
                {Object.entries(producto).map(([key, value]) => (                                
                    <div>                    
                        <label> Identificador {key} : 
                            <div> - Nombre = {value[0]}</div> 
                            <div> - Categoría = {value[1]}</div>
                            <div> - Precio = {value[2]}</div>
                            <div> - Inventario = {value[3]}</div>
                            <label>Comentarios</label>
                            <ul>
                                {value[4].map((comentario, index) => (
                                <li key={index}>{comentario[0]} {comentario[1]} {comentario[2]}</li>
                                ))}
                            </ul>
                            <button type="submit">Añadir comentario</button>
                            <div/>
                            <button>Comprar</button>                   
                        </label>                         
                    </div>                
                ))}            
            </div>
        </form> 
    );
};

export default Producto;