import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Comics from './pages/comics';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Comics />,
    },
  ]);
  return (
    <div className="App">
     
    <RouterProvider router={router} />

    </div>
  );
}

export default App;
