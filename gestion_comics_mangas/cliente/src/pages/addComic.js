import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

/* const AddComic = () => {
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    cover: '',
    publicacion: ''
  })

  const [error, setError] = useState(false)
  
  const navigate = useNavigate()
    
  const handleChange = (e) => {
    const {titulo , value } = e.target;
    setComic({...comic, [titulo]: value})
  }

  const handleClick = e => {
    e.preventDefault()
    try {
      axios.post('http://localhost:8081/comics', comic) 
      navigate('/comics')  
    }catch(err) {
      console.log(err)
      setError(true)
    }
  } */

  function AddComic() {
  
    const [comic, setComic] = useState({
      titulo: '',
      autor: '',
      cover: '',
      publicacion: '',
    })
    
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      //setValues({...values, [e.target.name]:[e.target.value]})
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
        validationErrors.cover = 'imagen  requerida'
      }
      if(comic.publicacion === '') {
        validationErrors.publicacion = 'Año de publicacion'
      }
  
      setErrors(validationErrors)
  
      if(Object.keys(validationErrors).length === 0) {
        console.log('comic registrado')
        axios.post('http://localhost:8081/addcomics', comic)
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
  

  return (
    <div>
      <h2>Introduce un comic</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='titulo'>Titulo:</label>
          <input type='text'
          placeholder='Introduce el titulo'
          name='titulo'
          onChange={handleChange}>
          </input>
          {errors.titulo && <span>{errors.titulo}</span>}
        </div>
        <div>
          <label htmlFor='autor'>Autor:</label>
          <input 
          type='text' 
          placeholder='Introduce el autor'
          name='autor'
          onChange={handleChange}>
          </input>
          {errors.autor && <span>{errors.autor}</span>}
        </div>
        <div>
          <label htmlFor='cover'>cover:</label>
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
          <button>Crear comic</button>
        </form>
    </div>
    )
}

export default AddComic