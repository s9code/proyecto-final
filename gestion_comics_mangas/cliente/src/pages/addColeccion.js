import '../estilos/sesion.css'
import '../estilos/componentes.css'
import '../estilos/editarColecciones.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link }  from 'react-router-dom'


function AddColeccion() {
  const [coleccion, setColeccion] = useState ({
    titulo: '',
    descrip: ''
  })

  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Función que actualiza los datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColeccion({ ...coleccion, [name]: value })
  }

  // Función al pulsar el boton revise que no estan vacio los datos
  const handleSubmit = (e) => {
    e.preventDefault()

    const validationErrors = {}

    if(coleccion.titulo === '') {
      validationErrors.titulo = 'Nombre de la colección requerido'
    }
    if(coleccion.descrip === '') {
      validationErrors.descrip = 'Descripción requerida'
    }
  
    // Función que revisa que los errores estén a 0 para confirmar que el usuario este logeado para acceder a coleccion 
    setErrors(validationErrors)
    if(Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8081/addcoleccion', coleccion)
      .then(() => {
        navigate('/coleccion')
      })
      .catch((error) => {
        console.error('Error en la petición', error)
      })
    }else {
      console.log('Datos de coleccion incorrectos')
    }
  }
  // Función que configura axios para incluir las cookies para enviarlas y recibirlas para mantener y crear la sesion
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
      {auth ?
        <div className='container-editar'>
          <h1 className='titulo-coleccion_editar'>Crea una colección</h1>
          <form className='form-coleccion' onSubmit={handleSubmit}>
            <div className='container-coleccion'>
              <label htmlFor='titulo'></label>
              <input
              className={`contenedor-coleccion_input ${errors.titulo ? 'input-error' : ''}`}
              type='text'
              placeholder='Introduce un nombre'
              name='titulo'
              onChange={handleChange}>
              </input>
              {errors.titulo && <span className='error-message_coleccion'>{errors.titulo}</span>}
            </div>
            <div>
              <label htmlFor='descrip'></label>
              <input
              className={`contenedor-coleccion_input ${errors.descrip ? 'input-error' : ''}`}
              type='text'
              placeholder='Introduce una descripción'
              name='descrip'
              onChange={handleChange}>
              </input>
              {errors.descrip && <span className='error-message_coleccion'>{errors.descrip}</span>}
            </div>
            <button className='btn-crear btn'>Crear colección</button>
          </form>
          <button className='btn-volver_registro btn' onClick={() => navigate('/coleccion')}>Volver</button>
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

export default AddColeccion