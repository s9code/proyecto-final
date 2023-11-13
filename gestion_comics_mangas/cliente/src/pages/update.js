import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'

function Update() {
  
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    cover: '',
    publicacion: '',
  })
    
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const comicId = location.pathname.split('/')[2]
  
  const handleChange = (e) => {
    const {name , value } = e.target;
    setComic({...comic, [name]: value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = {}
  
    if(comic.titulo === '') {
      validationErrors.titulo = 'Nombre del comic requerido'
    }
    if(comic.autor === '') {
      validationErrors.autor = 'Nombre del autor requerido'
    }
    if(comic.cover === '') {
      validationErrors.cover = 'imagen requerida'
    }
    if(comic.publicacion === '') {
      validationErrors.publicacion = 'Año de publicación'
    }
  
    setErrors(validationErrors)
  
    if(Object.keys(validationErrors).length === 0) {
      axios.put(`http://localhost:8081/comics/${comicId}`, comic)
      .then(() => {
        navigate('/comics')
      })
      .catch((error) => {
        console.error('Error en la peticion', error)
      })
    }else {
      console.log('Datos de comic incorrectos')
    }
  
  }

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

return (
  <div>
    {
    auth ?
    <div>
      <h2>Actualizar comic</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='titulo'>Actualizar Titulo:</label>
          <input type='text'
          placeholder='Introduce el titulo'
          name='titulo'
          onChange={handleChange}>
          </input>
          {errors.titulo && <span>{errors.titulo}</span>}
        </div>
        <div>
          <label htmlFor='autor'>Actualizar Autor:</label>
          <input 
          type='text' 
          placeholder='Introduce el autor'
          name='autor'
          onChange={handleChange}>
          </input>
          {errors.autor && <span>{errors.autor}</span>}
        </div>
        <div>
          <label htmlFor='cover'>Actualizar el cover:</label>
          <input
          type='text'
          placeholder='Introduce el cover'
          name='cover'
          onChange={handleChange}>
          </input>
          {errors.cover && <span>{errors.cover}</span>}
        </div>
        <div>
          <label htmlFor='publicacion'>Publicacion:</label>
          <input
          type='number'
          placeholder='Introduce el año'
          name='publicacion'
          onChange={handleChange}>
          </input>
          {errors.publicacion && <span>{errors.publicacion}</span>}
        </div>
          <button onClick={handleSubmit}>Actualizar</button>
        </form>
        <button onClick={() => navigate('/comics')}>Volver</button>
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

export default Update