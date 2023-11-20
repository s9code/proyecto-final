import '../estilos/navbar.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Navbar() {

  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

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

  const handleLogout = () => {
    axios.get('http://localhost:8081/usuario/logout')
    .then(res => {
        window.location.reload()
        navigate('/usuario')
    }).catch(err => console.log(err))
  }

  return (
    <div>
      {
        auth ?
        <nav className='navbar'>
        <div className='navbar-name'>
          <h1>Biblioteca de Comics</h1>
        </div>
        <ul className='navbar-list'>
          <li>
            <Link to='/coleccion'>Colecciones</Link>
          </li>
          <li>
            <Link to='/comics'>Comics</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Desconectar</Link>
          </li>
        </ul>
      </nav>
      
    :
    <div>

    </div>
    }
    
  </div>
  )
}

export default Navbar
