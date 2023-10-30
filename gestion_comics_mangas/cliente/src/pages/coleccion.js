import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from '../componentes/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/navbar'
import { Navigate } from 'react-router-dom'

function Coleccion() {

  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:3000')
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true)
        setName(res.data.name)
      }else {
        setAuth(false)
        setMessage(res.data.Message)
      }
    })
  })

  const user = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        user.logout()
        navigate('/usuario')
    }

    

  return (
    <>
      <Navbar />
      <h1>Hola {name}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h3>{message}</h3>
      <h1>Login</h1>
      <button onClick={Navigate('/usuario')}>Login</button>
    </>
        
    )
}

export default Coleccion