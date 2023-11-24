import '../estilos/coleccion.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Coleccion() {

  const [coleccion, setColeccion] = useState([])
  const [coleccionComics, setColeccionComics] = useState([]);
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  // MOSTRAR LAS COLECCIONES
  useEffect(() => {
    axios.get('http://localhost:8081/coleccion')
    .then(res => {
      setColeccion(res.data)
    })
  })

  // MOSTRAR LOS COMICS ALMACENADOS EN LAS COLECCIONES
  const handleVerColeccion = (coleccionId) => {
    axios.get(`http://localhost:8081/coleccion/${coleccionId}/comics`)
      .then(res => {
        setColeccionComics(res.data);
        // Navegar a la página que muestra los cómics asociados a la colección
        navigate(`/coleccion/${coleccionId}/comics`)
      })
      .catch(error => {
        console.error('Error al obtener los cómics de la colección:', error);
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
      axios.delete(`http://localhost:8081/coleccion/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      {
        auth ?
      <div className='contenedor-general_coleccion'>
        <h1 className='titulo_coleccion'>Tus colecciones</h1>
        <button className='boton_coleccion' onClick={() => navigate('/addcoleccion')}>Crear Colección</button>
        <div className='contenedor-coleccion'>
          {coleccion.map((coleccion) => (
            <div className='coleccion_comics' key={coleccion.id_coleccion}>
              <p className='coleccion_nombre'>{coleccion.nombre_coleccion}</p>
              <p>descripción</p>
              <p>{coleccion.descrip_coleccion}</p>
              <div className='coleccion_botones'>
                <button className='boton-coleccion_comic' onClick={() => handleDelete(coleccion.id_coleccion)}>Borrar</button>
                <button className='boton-coleccion_comic' onClick={() => navigate (`/updatecoleccion/${coleccion.id_coleccion}`)}>Actualizar</button>
                <button className='boton-coleccion_comic' onClick={() => handleVerColeccion(coleccion.id_coleccion)}>Ver colección</button>
              </div>
            </div>
          ))}
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

export default Coleccion