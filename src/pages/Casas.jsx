
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Casas() {
  const [casas, setCasas] = useState([])

  useEffect(() => {
    async function cargarCasas() {
      const { data, error } = await supabase
        .from('casas')
        .select('*')
        .order('id')

      if (error) {
        console.error(error.message)
        return
      }

      setCasas(data || [])
    }

    cargarCasas()
  }, [])

  return (
    <div className="container py-4">
      <h1>Las casas de Hogwarts</h1>

      <div className="row mt-4">
        {casas.map(casa => (
          <div className="col-md-6 col-lg-3 mb-3" key={casa.id}>
            <div className="card h-100 shadow-sm">
              {casa.imagen && (
                <img
                  src={casa.imagen}
                  className="card-img-top"
                  alt={casa.nombre}
                  style={{ height: 160, objectFit: 'cover' }}
                />
              )}

              <div className="card-body">
                <h5>{casa.nombre}</h5>
                <p>{casa.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
