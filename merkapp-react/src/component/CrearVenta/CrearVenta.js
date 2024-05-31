import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import logo from '../../imagenes/MerkAppSinFondo.png';

function CrearVenta (user, categorias) {    
    const navigate = useNavigate();

    const [enteredNombre, setNombre] = useState('');
    const [enteredCategoria, setCategoria] = useState('');
    const [enteredDescripcion, setDescripcion] = useState('');
    const [enteredPrecio, setPrecio] = useState('');
    const [enteredStock, setStock] = useState('');
    // TODO: Implementar fotografia  -->  const [fotografia, setFotografia] = useState('');
    const [venta, setVenta] = useState('');

    const nombreChangeHandler = (event) => {
        setNombre(event.target.value);
    };

    const categoriaChangeHandler = (key) => {
        setCategoria(enteredCategoria === key ? enteredCategoria : key);
    };

    const descripcionChangeHandler = (event) => {
        setDescripcion(event.target.value);
    };

    const precioChangeHandler = (event) => {
        setPrecio(event.target.value);
    };

    const stockChangeHandler = (event) => {
        setStock(event.target.value);
    };

    const ventaChangeHandler = (event) => {
        setVenta([enteredNombre, enteredCategoria, enteredDescripcion, enteredPrecio, enteredStock]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(venta);
        var lista = [user, venta];
        const response = await fetch('http://127.0.0.1:5000/crearVenta', {
            method:'POST',
            body: JSON.stringify(lista),
            headers: {
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        
        alert("Producto modificado con éxito");
        
        navigate('/vendedor');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        // setFotografia('');
        setVenta('');
    };    

    return (
        <form onSubmit={submitHandler}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            Producto nuevo
            <div>
                <label>Nombre: </label>
                <input
                    id="nombre"
                    name="nombre"
                    type='text'
                    value={enteredNombre}
                    onChange={nombreChangeHandler}
                    required/>
            </div>
            <div>
                <label>Categoría:
                    <p>
                        {categorias && Object.entries(categorias).map(([key, value]) => (
                            <label>
                                <input
                                type="radio"
                                name="myRadio"
                                value={key}
                                onChange={() => categoriaChangeHandler(key)} required/>
                                {value}                                
                            </label>
                        ))}
                    </p>
                </label>
            </div>
            <br></br>
            <div>
                <label>Descripción: </label>
                <input
                    id="descripcion"
                    name="descripcion"
                    type='text'
                    value={enteredDescripcion}
                    onChange={descripcionChangeHandler}
                    required/>
            </div>
            <div>
                <label>Precio (MXN): </label>
                <input
                    id="precio"
                    name="precio"
                    type='number'
                    min="1"
                    value={enteredPrecio}
                    onChange={precioChangeHandler}
                    required/>
            </div>
            <div>
                <label>Cantidad de ejemplares inicial: </label>
                <input
                    id="comentario"
                    name="comentario"
                    type='number'
                    min="1"
                    value={enteredStock}
                    onChange={stockChangeHandler}
                    required/>
            </div>
            {/* <div>
                <label>Fotografía: </label>
            </div> */}
            <div className="logo-log">
                <button type="submit" className="boton-animado" onClick={ventaChangeHandler}>Agregar</button>
            </div>
        </form>
    );
};

export default CrearVenta;