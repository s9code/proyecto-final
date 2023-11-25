import '../estilos/sesion.css'
import '../estilos/componentes.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'

function UpdateColeccion() {
  
  const [coleccion, setColeccion] = useState ({
    titulo: '',
    descrip: '',
  })
    
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const coleccionId = location.pathname.split('/')[2]
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColeccion({ ...coleccion, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = {}

    if(coleccion.titulo === '') {
      validationErrors.titulo = 'Nombre de la colección requerido'
    }
    if(coleccion.descrip === '') {
      validationErrors.descrip = 'Descripción requerida'
    }
    
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      axios.put(`http://localhost:8081/coleccion/${coleccionId}`, coleccion)
      .then(() => {
        navigate('/coleccion')
      })
      .catch((error) => {
        console.error('Error en la petición', error)
      })
    }else {
      console.log('Datos de la colección incorrectos')
    }
  
  }

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true)
        setName(res.data)
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
      <h2>Actualiza la colección</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='titulo'>Actualizar el titulo:</label>
        <input
        type='text'
        placeholder='Introduce el titulo'
        name='titulo'
        onChange={handleChange}>
        </input>
        {errors.titulo && <span>{errors.titulo}</span>}
      </div>
      <div>
        <label htmlFor='descrip'>Actualiza la descripcion:</label>
        <input
        type='text'
        placeholder='Introduce la descripcion'
        name='descrip'
        onChange={handleChange}>
        </input>
        {errors.descrip && <span>{errors.descrip}</span>}
      </div>
        <button className='btn' onClick={handleSubmit}>Actualizar</button>
      </form>
      <button className='btn' onClick={() => navigate('/coleccion')}>Volver</button>
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
  
  export default UpdateColeccion