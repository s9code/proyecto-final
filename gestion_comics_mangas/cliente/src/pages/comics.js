import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Comics = () => {
  const [auth, setAuth] = useState(false)
  const [ comics, setComics] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:8081/comics")
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true)
        setComics(res.data.comics)
      }else {
        setAuth(false)
        setMessage(res.data.Message)
      }
    })
  }, [])

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8081/comics/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }

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
      <h1>Coleccion de Comics</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {comics.map((comics) => (
          <div key={comics.id_comic}>
            {comics.cover && <img src={comics.cover_comic} alt='' />}
            <h3>Titulo del Comic</h3>
            <p>{comics.titulo_comic}</p>
            <h3>Autor del Comic</h3>
            <p>{comics.autor_comic}</p>
            <h3>Año de publicacion del Comic</h3>
            <p>{comics.publicacion_comic}</p>
            <button onClick={() => handleDelete(comics.id_comic)}>Borrar</button>
            <button ><Link to={`/update/${comics.id_comic}`}>Modificar</Link></button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/addcomics')}>Añade un nuevo comic</button>
    </div>
    :
    <div>
      <h3>Tienes que iniciar sesión</h3>
      <p><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
    
  </div>
      
  )
}

export default Comics