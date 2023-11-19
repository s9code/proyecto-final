import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link} from 'react-router-dom';

function ColeccionComics() {

  const [coleccionComics, setColeccionComics] = useState([]);
  const location = useLocation();
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const coleccionComicId = location.pathname.split('/')[2]

    // Hacer una solicitud GET para obtener los cómics de la colección
    axios.get(`http://localhost:8081/coleccion/${coleccionComicId}/comics`)
      .then(response => {
        setColeccionComics(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los cómics de la colección:', error);
      });
  }, [location.pathname]);

  const handleDelete = (id) => {
    const coleccionComicId = location.pathname.split('/')[2]
    try {
      axios.delete(`http://localhost:8081/coleccion/${coleccionComicId}/comics/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true)
        setName(res.data.name)
      }else {
        setAuth(false)
        setMessage(res.data.Message)
      }
    })
  }, [])


  return (
    <div>
      {
        auth ?
        <div>
        <h1>Coleccion</h1>
        {coleccionComics.map(comic => (
          <div key={comic.id_comic}>
            <h3>Titulo del Comic</h3>
            <p>{comic.titulo_comic}</p>
            <h3>Autor del Comic</h3>
            <p>{comic.autor_comic}</p>
            <h3>Año de publicacion del Comic</h3>
            <p>{comic.publicacion_comic}</p>
            <button onClick={() => handleDelete(comic.id_comic)}>Eliminar de la colección</button>
          </div>
        ))}
        <button onClick={() => navigate('/comics')}>Volver a tus comics</button>
      </div>
    :
    <div>
      <h3>{message}</h3>
      <p><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
    
  </div>
      
  )
}

export default ColeccionComics;