
useEffect(() => {
  async function cargarPersonajes() {
    const { data, error } = await supabase
      .from('personajes')
      .select(`
        id,
        nombre,
        imagen,
        casa_id,
        casas (
          id,
          nombre
        )
      `)
      .order('nombre')

    if (error) {
      console.error('ERROR SUPABASE:', error)
      setMensaje(error.message)
      return
    }

    console.log('PERSONAJES CARGADOS:', data)

    setPersonajes(data || [])
  }

  cargarPersonajes()
}, [])
