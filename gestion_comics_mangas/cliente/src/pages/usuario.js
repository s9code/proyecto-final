import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Usuario() {

  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

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

  axios.defaults.withCredentials = true
  const handleSubmit = (e)  => {
    e.preventDefault();
    axios.post('http://localhost:8081/usuario', {email, password})
    .then(res => {
      if(res.data.Status === 'Success') {
        navigate('/coleccion')
      }else {
        setErrorMessage(res.data.Message)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
    {
      auth ?
      <div>
       <h3>{message}</h3>
       <Link to='/comics'>Usuario ya registrado</Link>

     </div>
     :
     
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
       <button onClick={() => navigate('/')}>Regresar</button>
       {<span>{errorMessage}</span>}
     </form>
   </div>
     }
</div>
  )
}

export default Usuario