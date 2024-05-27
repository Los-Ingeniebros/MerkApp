import React, { useState } from 'react';
import BuscarProducto from './BuscarProducto';
import './EncontrarProducto.css';

const EncontrarProducto = () => {
  const [productos, setProductos] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(`http://127.0.0.1:5000/buscar?query=${query}`);
    const data = await response.json();
    setProductos(data);
  };

  const handleCompra = (idProducto) => {
    alert(`Compraste el producto con ID: ${idProducto}`);
  };

  return (
    <div>
      <h1></h1>
      <BuscarProducto onSearch={handleSearch} />
      <div className="resultados">
        {productos.length > 0 ? (
          <ul>
            {productos.map((producto) => (
              <li key={producto.idProducto} className="producto-item">
                <div className="producto-info">
                  <h2>{producto.nombre}</h2>
                  <p>{producto.descripcion}</p>
                  <p>Precio: {producto.precio}</p>
                  <p>Stock: {producto.stock}</p>
                </div>
                <button className="comprar-btn" onClick={() => handleCompra(producto.idProducto)}>
                  Comprar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default EncontrarProducto;
