import React, { useState } from 'react';
import './BuscarProducto.css';

const BuscarProducto = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [categorias, setCategorias] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default BuscarProducto;