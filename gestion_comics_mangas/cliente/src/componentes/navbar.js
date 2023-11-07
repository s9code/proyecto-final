import { NavLink } from 'react-router-dom'
import { useAuth } from './auth'


function Navbar() {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'underline',
      }
  }

  const auth = useAuth()

  return (
    <nav className='primary-nav'>
      <NavLink style={navLinkStyles} to='/'>
        Home
      </NavLink>
      <NavLink style={navLinkStyles} to='/about'>
        About
      </NavLink>
      <NavLink style={navLinkStyles} to='/products'>
        Products
      </NavLink>
      <NavLink style={navLinkStyles} to='/coleccion'>
        Coleccion
      </NavLink>
      {!auth.user && (
        <NavLink style={navLinkStyles} to='/usuario'>
          Usuario
        </NavLink>
      )}
    </nav>
  )
}

export default Navbar