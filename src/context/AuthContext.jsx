
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  async function cargarPerfil(usuario) {
    if (!usuario) {
      setPerfil(null)
      return
    }

    const { data, error } = await supabase
      .from('perfiles')
      .select(`
        id,
        nombre,
        rol,
        personaje_id,
        personajes (
          id,
          nombre,
          actor,
          imagen,
          casa_id,
          casas (
            id,
            nombre,
            imagen
          )
        )
      `)
      .eq('id', usuario.id)
      .maybeSingle()

    if (error) {
      console.error('Error cargando perfil:', error.message)
      setPerfil(null)
      return
    }

    setPerfil(data)
  }

  useEffect(() => {
    let activo = true

    async function iniciar() {
      const { data } = await supabase.auth.getSession()

      if (!activo) return

      const usuario = data.session?.user ?? null
      setUser(usuario)

      if (usuario) {
        await cargarPerfil(usuario)
      }

      if (activo) setLoading(false)
    }

    iniciar()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const usuario = session?.user ?? null
        setUser(usuario)

        if (usuario) {
          // Se consulta después de terminar el evento de autenticación.
          setTimeout(() => cargarPerfil(usuario), 0)
        } else {
          setPerfil(null)
        }
      }
    )

    return () => {
      activo = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function cerrarSesion() {
    await supabase.auth.signOut()
    setUser(null)
    setPerfil(null)
  }

  async function actualizarPerfil() {
    if (user) await cargarPerfil(user)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        perfil,
        loading,
        cerrarSesion,
        actualizarPerfil
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
