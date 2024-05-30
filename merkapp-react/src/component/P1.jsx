import React, { useEffect, useState } from 'react';

const MiComponente = () => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('https://mi-api.com/datos');
        if (!respuesta.ok) {
          throw new Error('Hubo un error al obtener los datos');
        }
        const datos = await respuesta.json();
        setDatos(datos);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerDatos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return datos ? <div>{JSON.stringify(datos)}</div> : <div>Cargando...</div>;
};

export default MiComponente;
