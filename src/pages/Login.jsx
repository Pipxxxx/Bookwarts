
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  async function iniciarSesion(e) {
    e.preventDefault()
    setCargando(true)
    setMensaje('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setCargando(false)

    if (error) {
      setMensaje('Correo o contraseña incorrectos.')
      return
    }

    navigate('/')
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow p-4">
            <h2 className="text-center">BOOKWARTS</h2>
            <p className="text-center text-muted">
              Inicia sesión en tu cuenta
            </p>

            <form onSubmit={iniciarSesion}>
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control mb-3"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control mb-3"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              {mensaje && (
                <div className="alert alert-danger">{mensaje}</div>
              )}

              <button
                className="btn btn-dark w-100"
                type="submit"
                disabled={cargando}
              >
                {cargando ? 'Ingresando...' : 'Iniciar sesión'}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
