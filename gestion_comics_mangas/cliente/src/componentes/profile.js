import React from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/usuario')
    }
  return ( 
    <div>Welcome {auth.user} 
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile