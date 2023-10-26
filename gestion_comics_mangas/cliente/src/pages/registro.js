import React, { useState } from 'react'
import axios from 'axios'


function Registro() {
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setValues({...values, [e.target.name]:[e.target.value]})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/registro', values)
    .then(res => console.log('Usuario Registrado'))
    .catch(err => console.log(err))
  }

return (
  <div>
    <h2>Registrate</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email:</label>
        <input 
        type='email' 
        placeholder='Introduce el Email'
        name='email'
        onChange={handleChange}>
        </input>
      </div>
      <div>
        <label htmlFor='name'>Nombre de Usuario:</label>
        <input type='text'
        placeholder='Introduce el nombre'
        name='name'
        onChange={handleChange}>
        </input>
      </div>
      <div>
        <label htmlFor='password'>Contraseña:</label>
        <input
        type='password'
        placeholder='Introduce la Contraseña'
        name='password'
        onChange={handleChange}></input>
      </div>
        <button>Crear usuario</button>
      </form>
      <p>¿Ya tienes una cuenta?</p>
      <button >Ingresar</button>
  </div>
  )
}

export default Registro;