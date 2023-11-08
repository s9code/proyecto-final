import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Coleccion() {

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
        navigate('/usuario')
    }).catch(err => console.log(err))
  }


  return (
    <div>
      {
        auth ?
      <div>
        <h1>Crea tu coleccion {name}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      :
      <div>
        <h3>{message}</h3>
        <p><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
      </div>
      }
      
    </div>
        
    )
}

export default Coleccion