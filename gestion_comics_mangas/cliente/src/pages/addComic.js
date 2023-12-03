import '../estilos/sesion.css'
import '../estilos/componentes.css'
import '../estilos/editarComics.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddComic() {
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    cover: null,
    publicacion: '',
  })

  // Función useState que actualiza los datos
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
 
  // Función que actualiza los datos
  const handleChange = (e) => {
    setComic({ ...comic, [e.target.name]: e.target.value })
  };
  // Función que actualiza los datos de la imagen
  const handleFileChange = (e) => {
    setComic({ ...comic, cover: e.target.files[0] });
  };

  // Función al pulsar el boton revise que no estan vacio los datos
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {}

    if (comic.titulo === '') {
      validationErrors.titulo = 'Nombre del comic requerido';
    }
    if (comic.autor === '') {
      validationErrors.autor = 'Nombre del autor requerido';
    }
    if (!comic.cover) {
      validationErrors.cover = 'Imagen requerida';
    }
    if (comic.publicacion === '') {
      validationErrors.publicacion = 'Año de publicación requerido';
    }
  // Función que revisa que los errores estén a 0 para confirmar que el usuario este logeado para acceder a coleccion 
  setErrors(validationErrors);
    // Recoge los datos de la solicitud para agregar información, recoge pares clave/valor
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData()
      formData.append('titulo', comic.titulo)
      formData.append('autor', comic.autor)
      formData.append('cover', comic.cover)
      formData.append('publicacion', comic.publicacion)
      // el multipart/form-data hace posible insertar y que se muestre las imagenes del comic
      axios.post('http://localhost:8081/addcomics', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          navigate('/comics');
        })
        .catch((error) => {
          console.error('Error en la petición', error);
        });
    } else {
      console.log('Datos del cómic incorrectos');
    }
  }
  // Función que configura axios para incluir las cookies para enviarlas y recibirlas para mantener y crear la sesion
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
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
      {auth ?
        <div className='container-editar'>
          <h1 className='titulo-comic_editar'>Introduce un comic</h1>
          <form className='form-comic' onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <label htmlFor='titulo'></label>
              <input
              className={`contenedor-comic_input ${errors.titulo ? 'input-error' : ''}`}
              type='text'
              name='titulo'
              placeholder='Introduce el titulo'
              onChange={handleChange}
              />
              {errors.titulo && <span className='error-message_comic'>{errors.titulo}</span>}
            </div>
            <div>
              <label htmlFor='autor'></label>
              <input
              className={`contenedor-comic_input ${errors.autor ? 'input-error' : ''}`}
              type='text'
              name='autor'
              placeholder='Introduce el autor'
              onChange={handleChange}
              />
              {errors.autor && <span className='error-message_comic'>{errors.autor}</span>}
            </div>
            <div>
              <label htmlFor='cover'></label>
              <input
              className={`contenedor-comic_input ${errors.cover ? 'input-error' : ''}`}
              type='file'
              name='cover'
              onChange={handleFileChange}
              />
              {errors.cover && <span className='error-message_comic'>{errors.cover}</span>}
            </div>
            <div>
              <label htmlFor='publicacion'></label>
              <input
              className={`contenedor-comic_input ${errors.publicacion ? 'input-error' : ''}`}
              type='number'
              name='publicacion'
              placeholder='Introduce el año'
              onChange={handleChange}
              />
              {errors.publicacion && <span className='error-message_comic'>{errors.publicacion}</span>}
            </div>
            <button className='btn-crear btn' type='submit'>Crear comic</button>
          </form>
          <button className='btn-volver_registro btn' onClick={() => navigate('/comics')}>Volver</button>
        </div>
        :
        <div className='contenedor_sesion'>
          <p className='inicio_sesion'>{message}</p>
          <p className='ingresa_usuario'><Link to='/usuario'>Ingresa con tu usuario</Link> o <Link to='/'>Crea una cuenta</Link></p>
        </div>
      }
    </div>
  );
}

export default AddComic;