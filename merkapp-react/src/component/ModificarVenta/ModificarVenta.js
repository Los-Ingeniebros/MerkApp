import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function ModificarVenta({ user, categorias }) {
    const { idProducto } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [enteredNombre, setNombre] = useState('');
    const [enteredCategoria, setCategoria] = useState('');
    const [enteredDescripcion, setDescripcion] = useState('');
    const [enteredPrecio, setPrecio] = useState('');
    const [enteredStock, setStock] = useState('');
    const [venta, setVenta] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            const response = await fetch(`http://127.0.0.1:5000/modificarVenta`);
            const data = await response.json();
            setProducto(data);
            setNombre(data.nombre || '');
            setCategoria(data.idCategoria || '');
            setDescripcion(data.descripcion || '');
            setPrecio(data.precio || '');
            setStock(data.stock || '');
        };
        fetchProducto();
    }, [idProducto]);

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
        const updatedProducto = {
            idProducto,
            nombre: enteredNombre,
            idCategoria: enteredCategoria,
            descripcion: enteredDescripcion,
            precio: enteredPrecio,
            stock: enteredStock
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/modificarVenta', {
                method: 'PUT',
                body: JSON.stringify(updatedProducto),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
    
            // Mostrar alerta después de la modificación exitosa
            alert("Producto modificado con éxito");
    
            navigate('/vendedor');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al modificar el producto');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            Modificar Producto
            <div>
                <label>Nombre: </label>
                <input
                    id="nombre"
                    name="nombre"
                    type='text'
                    value={enteredNombre}
                    onChange={nombreChangeHandler}
                    required />
            </div>
            <div>
                <label>Categoría:
                    <p>
                        {Object.entries(categorias).map(([key, value]) => (
                            <label key={key}>
                                <input
                                    type="radio"
                                    name="myRadio"
                                    value={key}
                                    checked={enteredCategoria === key}
                                    onChange={() => categoriaChangeHandler(key)}
                                    required />
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
                    required />
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
                    required />
            </div>
            <div>
                <label>Cantidad de ejemplares: </label>
                <input
                    id="stock"
                    name="stock"
                    type='number'
                    min="1"
                    value={enteredStock}
                    onChange={stockChangeHandler}
                    required />
            </div>
            <button type="submit">Modificar</button>
        </form>
    );
}

export default ModificarVenta;
