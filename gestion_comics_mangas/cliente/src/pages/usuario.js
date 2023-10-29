import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Usuario() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(null)

  
  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/usuario', {email, password})
    .then((res) => {
        console.log((res))
        if (res.data.authenticated){
          
          navigate('/coleccion')
        }else {
          setLoginError('Credenciales incorrectas')
        }
        
    })
    .catch((error) => {
        console.error('Error en la peticion', error)
        
    })
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
          onChange={e => setEmail(e.target.value)}>
          </input>
        </div>
        <div>
        <label htmlFor='password'>Contraseña:</label>
          <input 
          type='password' 
          placeholder='Introduce la Contraseña'
          value={password}
          onChange={e => setPassword(e.target.value)}>
          </input>
        </div>
        {loginError && <p>{loginError}</p>}
        <button>Acceder</button>
        <button onClick={() => navigate('/')}>Regresar</button>
      </form>
    </div>
  )
}

export default Usuario