import '../estilos/sesion.css'
import '../estilos/componentes.css'
import '../estilos/editarComics.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'

function Update() {
  
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    cover: null,
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
    setComic({ ...comic, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setComic({ ...comic, cover: e.target.files[0] });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = {}
  
    if(comic.titulo === '') {
      validationErrors.titulo = 'Nombre del comic requerido'
    }
    if(comic.autor === '') {
      validationErrors.autor = 'Nombre del autor requerido'
    }
    if(!comic.cover) {
      validationErrors.cover = 'imagen requerida'
    }
    if(comic.publicacion === '') {
      validationErrors.publicacion = 'Año de publicación'
    }
  
    setErrors(validationErrors)
  
    if(Object.keys(validationErrors).length === 0) {
      const formData = new FormData()
      formData.append('titulo', comic.titulo)
      formData.append('autor', comic.autor)
      formData.append('cover', comic.cover)
      formData.append('publicacion', comic.publicacion)
      axios.put(`http://localhost:8081/comics/${comicId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/comics')
      })
      .catch((error) => {
        console.error('Error en la petición', error)
      })
    }else {
      console.log('Datos de có incorrectos')
    }
  }
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true)
        setName(res.data.name)
      } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
      .catch((error) => {
        console.error('Error en la petición', error);
      });
  }, []);

return (
  <div>
    {
    auth ?
    <div className='container-editar'>
      <h1 className='titulo-comic_editar'>Actualizar comic</h1>
      <form className='form-comic'onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label htmlFor='titulo'></label>
          <input type='text'
          className={`contenedor-comic_input ${errors.titulo ? 'input-error' : ''}`}
          placeholder='Introduce el titulo'
          name='titulo'
          onChange={handleChange}>
          </input>
          {errors.titulo && <span className='error-message'>{errors.titulo}</span>}
        </div>
        <div>
          <label htmlFor='autor'></label>
          <input 
          className={`contenedor-comic_input ${errors.autor ? 'input-error' : ''}`}
          type='text' 
          placeholder='Introduce el autor'
          name='autor'
          onChange={handleChange}>
          </input>
          {errors.autor && <span className='error-message'>{errors.autor}</span>}
        </div>
        <div>
          <label htmlFor='cover'></label>
          <input
          className={`contenedor-comic_input ${errors.cover ? 'input-error' : ''}`}
          type='file'
          placeholder='Introduce el cover'
          name='cover'
          onChange={handleFileChange}>
          </input>
          {errors.cover && <span className='error-message'>{errors.cover}</span>}
        </div>
        <div>
          <label htmlFor='publicacion'></label>
          <input
          className={`contenedor-comic_input ${errors.publicacion ? 'input-error' : ''}`}
          type='number'
          placeholder='Introduce el año'
          name='publicacion'
          onChange={handleChange}>
          </input>
          {errors.publicacion && <span className='error-message'>{errors.publicacion}</span>}
        </div>
          <button className='btn-actualizar btn' onClick={handleSubmit}>Actualizar</button>
        </form>
        <button className='btn-volver_registro btn' onClick={() => navigate('/comics')}>Volver</button>
    </div>
    :
    <div>
      <p className='inicio_sesion'>{message}</p>
      <p className='ingresa_usuario'><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
    </div>
    }
  </div>
  )
}

export default Update