
export default function Inicio() {
  return (
    <div className="container py-4">
      <h1>Bienvenido a BOOKWARTS</h1>
      <p>Comparte publicaciones con toda la comunidad mágica.</p>

      <div className="card p-3 mt-4">
        <h5>¿Qué está pasando en el mundo mágico?</h5>
        <textarea
          className="form-control mb-3"
          placeholder="Escribe una publicación..."
          rows="3"
        />
        <button className="btn btn-dark">Publicar</button>
      </div>
    </div>
  )
}
