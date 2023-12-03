import '../estilos/usuario.css'
import '../estilos/componentes.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Usuario() {

  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // Navigate se usa para dirigir a una ventena de la aplicación elegida
  const navigate = useNavigate()
  // verifica que el usuario este registrado
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
  // Si los datos están correctos, te dirige a coleccion
  axios.defaults.withCredentials = true
  const handleSubmit = (e)  => {
    e.preventDefault();
    axios.post('http://localhost:8081/usuario', {email, password})
    .then(res => {
      if(res.data.Status === 'Success') {
        navigate('/coleccion')
        window.location.reload()
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
    <div className='contenedor-general_usuario'>
      <div className='contenedor-titulo_usuario'>
        <p>Inicio de sesión</p>
      </div>
      <div className='contenedor-usuario'>
        <form className='contenedor-usuario_form' onSubmit={handleSubmit}>
          <div className='contenedor-usuario_campo'>
            <label htmlFor='email'></label>
            <input
              className={`contenedor-usuario_input ${errorMessage && 'input-error'}`}
              type='email'
              placeholder='Introduce el Email'
              value={email}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='contenedor-usuario_campo'>
            <label htmlFor='password'></label>
            <input
              className={`contenedor-usuario_input ${errorMessage && 'input-error'}`}
              type='password'
              placeholder='Introduce la Contraseña'
              value={password}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <span className='error-message'>{errorMessage}</span>}
          </div>
          <button className='registro_sesion btn'>Acceder</button>
        </form>
        <button className='regresar_sesion btn'onClick={() => navigate('/')}>Regresar</button>
      </div>
    </div>
     }
  </div>
  )
}

export default Usuario