import '../estilos/comics.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link} from 'react-router-dom';

function ColeccionComics() {

  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const [coleccionComics, setColeccionComics] = useState([]);


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
      <div className='container-comics'>
        <h1 className='titulo-comic'>Coleccion</h1>
        <div className='comics-wrap'>
        {coleccionComics.map(comic => (
          <div key={comic.id_comic} className="comic-card">
          <div className='container-comic_imagen'>
            {comic.cover_comic && (
              <img
                src={`http://localhost:8081/${comic.cover_comic}`}
                alt='Cover'
                className='comic-imagen'>
              </img>
            )}
            </div>
            <div className='container-comic_texto'>
              <p className='comic-texto'>{comic.titulo_comic}</p>
              <p className='comic-texto texto_autor'>{comic.autor_comic}</p>
              <p className='comic-texto texto_publi'>{comic.publicacion_comic}</p>
            </div>
          <div className='container-comic_boton'>
            <div className='boton-crud'>
              <button className='boton-comic' onClick={() => handleDelete(comic.id_comic)}>Borrar</button>
              <button className='boton-comic' onClick={() => navigate (`/update/${comic.id_comic}`)}>Actualizar</button>
            </div>
            <div>
              <button className='boton-and'onClick={() => handleDelete(comic.id_comic)}>Eliminar de la colección</button>
            </div>
          </div>
        </div>
        ))}
        <button onClick={() => navigate('/comics')}>Volver a tus comics</button>
        </div>
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