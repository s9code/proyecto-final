import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Registro() {
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name , value } = e.target;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {}

    if(values.name === '') {
      validationErrors.name = 'Nombre de usuario requerido'
    }
    if(values.email === '') {
      validationErrors.email = 'Email requerido'
    }else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = 'El email no es valido'
    }
    if(values.password === '') {
      validationErrors.password = 'Contraseña requerida'
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      console.log('usuario registrado')
      axios.post('http://localhost:8081/registro', values)
      .then(() => {
        navigate('/coleccion')
      })
      .catch((error) => {
        console.error('Error en la peticion', error)
      })
    }else {
      console.log('Datos de usuario incorrectos')
    }

  }

return (
  <div>
    <h2>Registrate</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='name'>Nombre de Usuario:</label>
        <input type='text'
        placeholder='Introduce el nombre'
        name='name'
        onChange={handleChange}>
        </input>
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor='email'>Email:</label>
        <input 
        type='email' 
        placeholder='Introduce el Email'
        name='email'
        onChange={handleChange}>
        </input>
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor='password'>Contraseña:</label>
        <input
        type='password'
        placeholder='Introduce la Contraseña'
        name='password'
        onChange={handleChange}>
        </input>
        {errors.password && <span>{errors.password}</span>}
      </div>
        <button>Crear usuario</button>
      </form>
      <p>¿Ya tienes una cuenta?</p>
      <button onClick={() => navigate('/usuario')}>Ingresar</button>
  </div>
  )
}

export default Registro;