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
import AddColeccion from './pages/addColeccion'
import Update from './pages/update'
import UpdateColeccion from './pages/updateColeccion'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registro />}></Route>
        <Route path='/usuario' element={<Usuario />}></Route>
        <Route path='/comics' element={<Comics />}></Route>
        <Route path='/addcomics' element={<AddComic />}></Route>
        <Route path='/addcoleccion' element={<AddColeccion />}></Route>
        <Route path='/coleccion' element={<Coleccion />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
        <Route path='/updatecoleccion/:idCol' element={<UpdateColeccion />}></Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App
