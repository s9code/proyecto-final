import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Comics = () => {
  const [ comics, setComics] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8081/comics")
    .then(res => {
      setComics(res.data)
    })
    .catch((error) => {
      console.error(error)
    })
  },[])

  const handleDelete = (id) => {
    try {
      axios.delete(`http://localhost:8081/comics/${id}`)
      window.location.reload()
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Coleccion de Comics</h1>
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
  )
}

export default Comics