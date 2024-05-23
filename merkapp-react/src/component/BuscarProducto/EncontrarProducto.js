import React, { useState } from 'react';
import BuscarProducto from './BuscarProducto';

const EncontrarProducto = () => {
  const [productos, setProductos] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(`http://127.0.0.1:5000/buscar?query=${query}`);
    const data = await response.json();
    setProductos(data);
  };

  return (
    <div>
      <h1>Buscar Productos</h1>
      <BuscarProducto onSearch={handleSearch} />
      <div className="resultados">
        {productos.length > 0 ? (
          <ul>
            {productos.map((producto) => (
              <li key={producto.idProducto}>
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p>Precio: {producto.precio}</p>
                <p>Stock: {producto.stock}</p>
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