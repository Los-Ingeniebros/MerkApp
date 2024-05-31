import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Producto (user) {
    const { key } = useParams();
    const [producto, setProducto] = useState('');
    const [comprar, setComprar] = useState(false);
    const [comentario, setComentario] = useState(false);
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

    async function efectuarCompra () {
        alert("¿Confirmar de compra?");
        var usuario = Object.entries(user)
        var lista = [key, usuario]
        const response = await fetch('http://127.0.0.1:5000/comprarProducto', {
        method:'POST',
        body: JSON.stringify(lista),
        headers: {
            'Content-Type':'application/json'
        }
        });
        const data = await response.json();
        console.log(data.error);
            if (data.error !== undefined) {
                alert("ERROR! " + data.error);
            } else {
                alert("Compra efectuada con éxito\nPonte en contacto con el vendedor para acordar la entrega de tu pedido");
                setComentario(true);
            }
        navigate('/comprador/');
    }

    const comprarChangeHandler = (event) => {
        efectuarCompra();
        setComprar(true);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(comentario);
        console.log(comprar);
        if (comprar && comentario) {
            navigate('/comprador/calificacion/'+key);
            setProducto('');
        }
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
                            <div>
                                <label> Vendido por: {value[5]} {value[6]} </label>
                                <div> - Teléfono: {value[8]} </div>
                                <div> - Correo electrónico: {value[7]} </div>
                            </div>
                        </label>
                        <br></br>
                        <div>
                            {comprar && <button className="boton-animado" type="submit">Añadir comentario</button>}
                        </div>
                        <div>
                            {!comprar && <button className="boton-animado" onClick={comprarChangeHandler}>Comprar</button>}
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default Producto;