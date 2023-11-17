import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ColeccionComics() {
  const [coleccionComics, setColeccionComics] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Obtener el ID de la colección desde la URL
    const coleccionId = location.pathname.split('/')[2];

    // Obtener los cómics asociados a la colección
    axios.get(`http://localhost:8081/coleccion/${coleccionId}/comics`)
      .then(res => {
        setColeccionComics(res.data);
      })
      .catch(error => {
        console.error('Error al obtener los cómics de la colección:', error);
      });
  }, [location.pathname]);

  return (
    <div>
      <h1>Cómics de la colección</h1>
      {coleccionComics.map(comic => (
        <div key={comic.id_comic}>
          <h3>Titulo del Comic</h3>
          <p>{comic.titulo_comic}</p>
          <h3>Autor del Comic</h3>
          <p>{comic.autor_comic}</p>
          <h3>Año de publicacion del Comic</h3>
          <p>{comic.publicacion_comic}</p>
          {/* Mostrar más detalles del cómic si es necesario */}
        </div>
      ))}
    </div>
  );
}

export default ColeccionComics;