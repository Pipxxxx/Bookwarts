
export default function Dashboard() {
  return (
    <div className="container py-4">
      <h1>Dashboard administrativo</h1>
      <p>Panel de administración de BOOKWARTS.</p>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5>Usuarios</h5>
            <p>Administrar cuentas y perfiles.</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5>Personajes</h5>
            <p>Administrar personajes.</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-3">
            <h5>Casas</h5>
            <p>Administrar las casas de Hogwarts.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
