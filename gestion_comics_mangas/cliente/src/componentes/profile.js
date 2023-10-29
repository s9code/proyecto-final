import React from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/navbar'

function Profile() {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/usuario')
    }
  return ( 
    <div>Welcome {auth.user} 
    <Navbar /> 
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile