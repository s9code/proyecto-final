import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddComic() {
  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    cover: null,
    publicacion: '',
  });

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComic({ ...comic, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setComic({ ...comic, cover: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
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

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('titulo', comic.titulo);
      formData.append('autor', comic.autor);
      formData.append('cover', comic.cover);
      formData.append('publicacion', comic.publicacion);

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
  };

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
        <div>
          <h2>Introduce un comic</h2>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <label htmlFor='titulo'>Titulo:</label>
              <input type='text' name='titulo' onChange={handleChange} />
              {errors.titulo && <span>{errors.titulo}</span>}
            </div>
            <div>
              <label htmlFor='autor'>Autor:</label>
              <input type='text' name='autor' onChange={handleChange} />
              {errors.autor && <span>{errors.autor}</span>}
            </div>
            <div>
              <label htmlFor='cover'>Cover:</label>
              <input type='file' name='cover' onChange={handleFileChange} />
              {errors.cover && <span>{errors.cover}</span>}
            </div>
            <div>
              <label htmlFor='publicacion'>Publicacion:</label>
              <input type='number' name='publicacion' onChange={handleChange} />
              {errors.publicacion && <span>{errors.publicacion}</span>}
            </div>
            <button type='submit'>Crear comic</button>
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
  );
}

export default AddComic;