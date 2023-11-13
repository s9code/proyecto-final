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
        <p>Crea una colección</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='titulo'>Nombre de la colección</label>
            <input type='text'
            placeholder='Introduce un nombre'
            name='titulo'
            onChange={handleChange}>
            </input>
            {errors.titulo && <span>{errors.titulo}</span>}
          </div>
          <div>
            <label htmlFor='descript'>Descripcion de la colección</label>
            <input type='text'
            placeholder='Introduce una descripción'
            name='descrip'
            onChange={handleChange}>
            </input>
            {errors.descrip && <span>{errors.descrip}</span>}
          </div>
          <button>Crear colección</button>
        </form>
        <button onClick={() => navigate('/coleccion')}>volver a tu coleccion</button>
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

export default AddColeccion