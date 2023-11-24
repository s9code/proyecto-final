import '../estilos/comics.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Comics() {

  const [auth, setAuth] = useState(false)
  const [comics, setComics] = useState([])
  const [coleccion, setColeccion] = useState([])
  const [selectedComic, setSelectedComic] = useState('')
  const [selectedColeccion, setSelectedColeccion] = useState('');
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // OBTENER LA LISTA DE COMICS
  useEffect(() => {
    axios.get('http://localhost:8081/comics')
    .then(response => setComics(response.data))
      .catch(error => console.error('Error al obtener colecciones:', error));
  }, []);

  // OBTENER LA LISTA DE COLECCIONES
  useEffect(() => {
    axios.get('http://localhost:8081/coleccion')
    .then(response => setColeccion(response.data))
    .catch(error => console.error('Error al obtener colecciones:', error));
  }, []);

  const handleAsociarComicColeccion = (comicId) => {
    if (!selectedComic || !selectedColeccion) {
      console.error('Selecciona una coleccion al comic')
      return
  }


    // ASOCIAR UN COMIC A UNA COLECCION
    axios.post(`http://localhost:8081/comics/${selectedComic}/coleccion/${selectedColeccion}`)
      .then(response => {
        console.log(response.data);
        navigate(`/coleccion/${selectedColeccion}/comics`)
      })
      .catch(error => {
        console.error('Error al asociar cómic a colección:', error);
        
      })
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

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8081/comics/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      {auth ? (
        <div className='container-comics'>
          <h1 className='titulo-comic'>Comics</h1>
          {/* MOSTRAR LOS COMICS */}
          <div className='comics-wrap'>
          {comics.map((comic) => (
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
                  <p className='comic-texto'>{comic.autor_comic}</p>
                  <p className='comic-texto'>{comic.publicacion_comic}</p>
                </div>
              <div className='container-comic_boton'>
                <div className='boton-crud'>
                <button className='boton-comic' onClick={() => handleDelete(comic.id_comic)}>Borrar</button>
                <button className='boton-comic' onClick={() => navigate (`/update/${comic.id_comic}`)}>Actualizar</button>
                </div>
                <div className='boton-and'>
                <button className='boton-comic' onClick={() => setSelectedComic(comic.id_comic)}>Añadir a colección</button>
                </div>
              </div>
            </div>
            ))}
          </div>
  
          {/* SELECCIONADOR DE COLECCIONES */}
          <div>
            <label>
              Seleccionar colección:
              <select onChange={(e) => setSelectedColeccion(e.target.value)}>
                <option value=''>Selecciona una colección</option>
                {coleccion.map((coleccionItem) => (
                  <option
                    key={coleccionItem.id_coleccion}
                    value={coleccionItem.id_coleccion}
                  >
                    {coleccionItem.nombre_coleccion}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleAsociarComicColeccion}>Asociar a colección</button>
          </div>
          {/* --------------------------- */}
  
          <button onClick={() => navigate('/addcomics')}>Añade un nuevo comic</button>
          <button onClick={() => navigate('/coleccion')}>Ir a colección</button>
        </div>
      ):
    <div>
      <h3>{message}</h3>
      <p><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
    
  </div>
      
  )
}

export default Comics