import React from 'react'
import { useAuth } from '../componentes/auth'
import { useNavigate } from 'react-router-dom'

function Coleccion() {

  const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/usuario')
    }
  return (
    <>
      <h1>Hola {auth.user} </h1>
      <button onClick={handleLogout}>Desconectar</button>
    </>
        
    )
}

export default Coleccion