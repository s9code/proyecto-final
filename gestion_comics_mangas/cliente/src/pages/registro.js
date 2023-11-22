import '../estilos/registro.css'
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
      validationErrors.email = 'Formato de email inválido'
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
  <div className='contenedor-general_registro'>
    <div className='contenedor-texto_registro'>
      <p>Crea y gestiona tu colección de Comics y Mangas</p>
    </div>
    <div className='contenedor-titulo_registro'>
      <p>Regístrate</p>
    </div>
    <div className='contenedor-registro'>
    <form className='contenedor-registro_form' onSubmit={handleSubmit}>
      <div className='contenedor-registro_campo'>
        <label htmlFor='name'></label>
        <input
          className={`contenedor-registro_input ${errors.name ? 'input-error' : ''}`}
          type='text'
          placeholder='Introduce el nombre'
          name='name'
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className='error-message'>{errors.name}</span>}
      </div>
      <div className='contenedor-registro_campo'>
        <label htmlFor='email'></label>
        <input
          className={`contenedor-registro_input ${errors.email ? 'input-error' : ''}`}
          type='email'
          placeholder='Introduce el Email'
          name='email'
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className='error-message'>{errors.email}</span>}
      </div>
      <div className='contenedor-registro_campo'>
        <label htmlFor='password'></label>
        <input
          className={`contenedor-registro_input ${errors.password ? 'input-error' : ''}`}
          type='password'
          placeholder='Introduce la Contraseña'
          name='password'
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span className='error-message'>{errors.password}</span>}
      </div>
      <button className='registro_usuario'>Crear usuario</button>
    </form>
      <p className='registro_cuenta'>¿Ya tienes una cuenta?</p>
      <button className='registro_usuario' onClick={() => navigate('/usuario')}>Ingresar</button>
      </div>
  </div>
  )
}

export default Registro;