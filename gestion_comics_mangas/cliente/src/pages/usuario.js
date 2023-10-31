import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Usuario() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  const handleSubmit = (e)  => {
    e.preventDefault();
    axios.post('http://localhost:8081/usuario', {email, password})
    .then(res => {
      if(res.data.Status === 'Success') {
        navigate('/coleccion')
      }else {
        alert(res.data.Message)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Inicio de Sesion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input 
          type='email' 
          placeholder='Introduce el Email'
          value={email}
          autoComplete='off'
          onChange={e => setEmail(e.target.value)}>
          </input>
        </div>
        <div>
          <label htmlFor='password'>Contraseña:</label>
          <input 
          type='password' 
          placeholder='Introduce la Contraseña'
          value={password}
          autoComplete='off'
          onChange={e => setPassword(e.target.value)}>
          </input>
        </div>
        <button>Acceder</button>
        <button>Regresar</button>
      </form>
    </div>
  )
}

export default Usuario