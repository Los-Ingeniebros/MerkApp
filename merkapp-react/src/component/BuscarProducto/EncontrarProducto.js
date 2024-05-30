import React, { useState } from 'react';
import BuscarProducto from './BuscarProducto';
import './EncontrarProducto.css';

const EncontrarProducto = () => {
  const [productos, setProductos] = useState([]);

  const handleSearch = async (query) => {
    if (!query) {
      setProductos([]);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/buscar?query=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductos([]); // Clear the product list if there's an error
    }
  };

  const handleCompra = (idProducto) => {
    alert(`Compraste el producto con ID: ${idProducto}`);
  };

  return (
    <div>
      <h5>Ingresa ID, nombre o categoría que desees buscar:</h5>
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
                <button className="boton-animado" onClick={() => handleCompra(producto.idProducto)}>
                  Más detalles
                </button>
              </li>
            ))}
          </ul>
        ) : ( 
          <p className=".no-resultados-msg" > No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default EncontrarProducto;
