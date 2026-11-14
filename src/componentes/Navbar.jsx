
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { perfil, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  async function salir() {
    await cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand fw-bold" to="/">
        BOOKWARTS
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/">
            Inicio
          </NavLink>

          <NavLink className="nav-link" to="/casas">
            Las casas
          </NavLink>

          <NavLink className="nav-link" to="/chats">
            Chats
          </NavLink>

          <NavLink className="nav-link" to="/perfil">
            Perfil
          </NavLink>

          {perfil?.rol === 'admin' && (
            <NavLink className="nav-link" to="/dashboard">
              Dashboard administrativo
            </NavLink>
          )}

          <button className="btn btn-outline-light ms-lg-3" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
