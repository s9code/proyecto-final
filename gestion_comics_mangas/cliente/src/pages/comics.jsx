import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Comics = () => {
  const [ comics, setComics] = useState([]);

  useEffect(() => {
    const fetchAllComics = async () => {
      try {
        const res = await axios.get("http://localhost:3000/comics")
        console.log(res)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllComics()
  },[])

  return (
    <div>Comics</div>
  )
}

export default Comics