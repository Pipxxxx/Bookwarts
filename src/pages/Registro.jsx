
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Registro() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [personajeId, setPersonajeId] = useState('')
  const [personajes, setPersonajes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    async function cargarPersonajes() {
      const { data, error } = await supabase
        .from('personajes')
        .select('id, nombre, imagen, casas(nombre)')
        .order('nombre')

      if (error) {
        setMensaje('No se pudieron cargar los personajes.')
        return
      }

      setPersonajes(data || [])
    }

    cargarPersonajes()
  }, [])

  async function registrar(e) {
    e.preventDefault()
    setMensaje('')

    if (!personajeId) {
      setMensaje('Selecciona un personaje.')
      return
    }

    setCargando(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          personaje_id: personajeId
        }
      }
    })

    setCargando(false)

    if (error) {
      setMensaje(error.message)
      return
    }

    if (data.session) {
      navigate('/')
    } else {
      setMensaje(
        'Cuenta creada. Revisa tu correo para confirmar el registro y después inicia sesión.'
      )
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-2">BOOKWARTS</h2>
            <p className="text-center text-muted">
              Únete a la comunidad mágica
            </p>

            <form onSubmit={registrar}>
              <label className="form-label">Nombre</label>
              <input
                className="form-control mb-3"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
              />

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
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <label className="form-label">
                Selecciona tu personaje
              </label>

              <select
                className="form-select mb-3"
                value={personajeId}
                onChange={e => setPersonajeId(e.target.value)}
                required
              >
                <option value="">Seleccionar personaje</option>

                {personajes.map(personaje => (
                  <option key={personaje.id} value={personaje.id}>
                    {personaje.nombre} - {personaje.casas?.nombre || 'Sin casa'}
                  </option>
                ))}
              </select>

              {mensaje && (
                <div className="alert alert-info">{mensaje}</div>
              )}

              <button
                className="btn btn-dark w-100"
                type="submit"
                disabled={cargando}
              >
                {cargando ? 'Creando cuenta...' : 'Registrarme'}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
