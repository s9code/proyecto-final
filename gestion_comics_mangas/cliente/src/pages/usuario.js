import React, { useState } from 'react'
import axios from 'axios'

function Usuario() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/usuario', {email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h2>Inicio de Sesion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
          type='email' 
          placeholder='Introduce el Email'
          value={email}
          onChange={e => setEmail(e.target.value)}>
          </input>
        </div>
        <div>
        <label>Contraseña:</label>
          <input 
          type='password' 
          placeholder='Introduce la Contraseña'
          value={password}
          onChange={e => setPassword(e.target.value)}>
          </input>
          
        </div>
        <button>Acceder</button>
      </form>
    </div>
  )
}

export default Usuario;