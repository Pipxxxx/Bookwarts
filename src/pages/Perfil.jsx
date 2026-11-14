
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { user, perfil } = useAuth()

  return (
    <div className="container py-4">
      <h1>Mi perfil</h1>

      <div className="card p-4 mt-4">
        <h3>{perfil?.nombre || 'Usuario'}</h3>

        <p>
          <strong>Correo:</strong> {user?.email}
        </p>

        <p>
          <strong>Personaje:</strong>{' '}
          {perfil?.personajes?.nombre || 'Sin personaje asignado'}
        </p>

        <p>
          <strong>Casa:</strong>{' '}
          {perfil?.personajes?.casas?.nombre || 'Sin casa'}
        </p>

        <p>
          <strong>Rol:</strong> {perfil?.rol}
        </p>
      </div>
    </div>
  )
}
