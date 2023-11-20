import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Navbar from './componentes/navbar'
import Comics from './pages/comics'
import Usuario from './pages/usuario'
import Registro from './pages/registro'
import Coleccion from './pages/coleccion'
import AddComic from './pages/addComic'
import AddColeccion from './pages/addColeccion'
import Update from './pages/update'
import UpdateColeccion from './pages/updateColeccion'
import ColeccionComics from './pages/coleccionComics'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Registro />}></Route>
          <Route path='/usuario' element={<Usuario />}></Route>
          <Route path='/comics' element={<Comics />}></Route>
          <Route path='/addcomics' element={<AddComic />}></Route>
          <Route path='/addcoleccion' element={<AddColeccion />}></Route>
          <Route path='/coleccion' element={<Coleccion />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
          <Route path='/updatecoleccion/:idCol' element={<UpdateColeccion />}></Route>
          <Route path='/coleccion/:id_coleccion/comics' element={<ColeccionComics />}></Route>
        </Routes>
      </div>
    </Router>
   
  );
}

export default App
