import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Comics from './pages/comics'
import Usuario from './pages/usuario'
import Registro from './pages/registro'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registro />,
    },
    {
      path: "/usuario",
      element: <Usuario />,
    },
    {
      path: "/comics",
      element: <Comics />,
    },
  ]);

  return (
    <div className="App">
     
    <RouterProvider router={router} />

    </div>
  );
}

export default App
