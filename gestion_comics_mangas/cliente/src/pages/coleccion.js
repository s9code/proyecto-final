import '../estilos/coleccion.css'
import '../estilos/sesion.css'
import '../estilos/componentes.css'
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

  // Muestra las colecciones
  useEffect(() => {
    axios.get('http://localhost:8081/coleccion')
    .then(res => {
      setColeccion(res.data)
    })
  })

  // Muestra los comics almacenados en las colecciones
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

  // Funcion que borra la coleccion creada
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
        <button className='boton_coleccion btn' onClick={() => navigate('/addcoleccion')}>Crear nueva colección</button>
        <div className='contenedor-coleccion'>
          {coleccion.map((coleccion) => (
            <div className='coleccion_comics' key={coleccion.id_coleccion}>
              <p className='coleccion_nombre'>{coleccion.nombre_coleccion}</p>
              <p>{coleccion.descrip_coleccion}</p>
              <div className='coleccion_botones'>
                <button className='boton-coleccion_comic btn' onClick={() => handleVerColeccion(coleccion.id_coleccion)}>Ver colección</button>
                <button className='boton-coleccion_comic btn' onClick={() => handleDelete(coleccion.id_coleccion)}>Borrar</button>
                <button className='boton-coleccion_comic btn' onClick={() => navigate (`/updatecoleccion/${coleccion.id_coleccion}`)}>Actualizar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    :
    <div className='contenedor_sesion'>
      <p className='inicio_sesion'>{message}</p>
      <p className='ingresa_usuario'><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
    
  </div>
      
  )
}

export default Coleccion