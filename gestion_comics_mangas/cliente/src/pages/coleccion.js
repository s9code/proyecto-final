import React from 'react'
import { useAuth } from '../componentes/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/navbar'

function Coleccion() {

  const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/usuario')
    }
  return (
    <>
      <Navbar />
      <h1>Hola {auth.user} </h1>
      <button onClick={handleLogout}>Desconectar</button>
    </>
        
    )
}

export default Coleccion