import '../estilos/navbar.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Navbar() {
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();


  // Tokken de Cookie para acceder con usuario registrado
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

  // Función para Deslogearte de la aplicacion
  const handleLogout = () => {
    axios.get('http://localhost:8081/usuario/logout')
    .then(res => {
        window.location.reload()
        navigate('/usuario')
    }).catch(err => console.log(err))
  }

  // Funciones para hacer aparecer y desaparecer el navbar
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <div>
      {
        auth ?
        <div className='contenedor-general_navbar'>
        <div className='hamburger-menu' onClick={toggleMenu}>
          <div className='hamburger-icon'></div>
        </div>
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <div className='navbar-name'>
          <h1>Biblioteca de Comics</h1>
        </div>
        <ul className='navbar-list'>
          <li>
            <Link to='/coleccion' onClick={closeMenu}>Colecciones</Link>
          </li>
          <li>
            <Link to='/comics' onClick={closeMenu}>Comics</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Desconectar</Link>
          </li>
        </ul>
      </nav>
      </div>
      
    :
    <div>

    </div>
    }
    
  </div>
  )
}

export default Navbar
