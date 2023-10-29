import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { AuthProvider } from './componentes/auth'
import Comics from './pages/comics'
import Usuario from './pages/usuario'
import Registro from './pages/registro'
import Coleccion from './pages/coleccion'
import Navbar from './componentes/navbar'
//import UserDetails from './componentes/Users'
import Profile from './componentes/profile'
import RequireAuth from './componentes/requireAuth'



function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Registro/>,
    },
    {
      path: "/usuario",
      element: <Usuario />,
    },
    {
      path: "/comics",
      element: <Comics />,
    },
    {
      path: "/coleccion",
      element: <Coleccion />,
    },
    {
      path: "/profile",
      element: <RequireAuth> <Coleccion /> </RequireAuth>,
    },
  ]);


  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
   
  );
}

export default App
