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


  const handleLogout = () => {
    axios.get('http://localhost:8081/usuario/logout')
    .then(res => {
        navigate('/usuario')
    }).catch(err => console.log(err))
  }

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
        <div>
          <h1>Comics</h1>
          {/* MOSTRAR LOS COMICS */}
          <div>
            {comics.map((comic) => (
              <div key={comic.id_comic}>
                {comic.cover && <img src={comic.cover_comic} alt='' />}
                <h3>Titulo del Comic</h3>
                <p>{comic.titulo_comic}</p>
                <h3>Autor del Comic</h3>
                <p>{comic.autor_comic}</p>
                <h3>Año de publicacion del Comic</h3>
                <p>{comic.publicacion_comic}</p>
                <button onClick={() => handleDelete(comic.id_comic)}>Borrar</button>
                <button>
                  <Link to={`/update/${comic.id_comic}`}>Modificar</Link>
                </button>
                <button onClick={() => setSelectedComic(comic.id_comic)}>Añadir a colección</button>
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