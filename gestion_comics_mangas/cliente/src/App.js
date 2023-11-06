import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Comics from './pages/comics'
import Usuario from './pages/usuario'
import Registro from './pages/registro'
import Coleccion from './pages/coleccion'
import AddComic from './pages/addComic'
import Update from './pages/update'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registro />}></Route>
        <Route path='/usuario' element={<Usuario />}></Route>
        <Route path='/comics' element={<Comics />}></Route>
        <Route path='/addcomics' element={<AddComic />}></Route>
        <Route path='/coleccion' element={<Coleccion />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App
