import '../estilos/comics.css'
import '../estilos/componentes.css'
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

  // Este useEffect recoje dentro de la url la palabra almacenada en la segunda posición (0,1,2)
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

  // Funcion que borra la coleccion de comics creada
  const handleDelete = (id) => {
    const coleccionComicId = location.pathname.split('/')[2]
    try {
      axios.delete(`http://localhost:8081/coleccion/${coleccionComicId}/comics/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }
  
  // Función que configura axios para incluir las cookies para enviarlas y recibirlas para mantener y crear la sesion
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
              <button className='boton-comic btn' onClick={() => handleDelete(comic.id_comic)}>Borrar</button>
              <button className='boton-comic btn' onClick={() => navigate (`/update/${comic.id_comic}`)}>Actualizar</button>
            </div>
            <div>
              <button className='boton-and btn'onClick={() => handleDelete(comic.id_comic)}>Eliminar de la colección</button>
            </div>
          </div>
        </div>
        ))}
        </div>
      </div>
    :
    <div>
      <p className='inicio_sesion'>{message}</p>
      <p className='ingresa_usuario'><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
    
  </div>
      
  )
}

export default ColeccionComics;