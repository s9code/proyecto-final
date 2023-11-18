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

  const handleLogout = () => {
    axios.get('http://localhost:8081/usuario/logout')
    .then(res => {
        navigate('/usuario')
    }).catch(err => console.log(err))
  }

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
      <div>
        <h1>Tus colecciones {name}</h1>
        <button onClick={handleLogout}>Logout</button>
        <div>
        {coleccion.map((coleccion) => (
          <div key={coleccion.id_coleccion}>
            <h3>Titulo de la Colección</h3>
            <p>{coleccion.nombre_coleccion}</p>
            <h3>descripción</h3>
            <p>{coleccion.descrip_coleccion}</p>
            <button onClick={() => handleDelete(coleccion.id_coleccion)}>Borrar</button>
            <button ><Link to={`/updatecoleccion/${coleccion.id_coleccion}`}>Modificar</Link></button>
            <button onClick={() => handleVerColeccion(coleccion.id_coleccion)}>Ver colección</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/addcoleccion')}>Crear Colección</button>
      <button onClick={() => navigate('/comics')}>ir a tus comics</button>
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