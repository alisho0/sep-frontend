import React, { useEffect, useState } from 'react'
import { getAlumnos } from '../apis/alumnosApi'

export const useAlumnos = (token) => {
  const [alumnos, setAlumnos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarAlumnos = async () => {
      const data = await getAlumnos(token)
      setAlumnos(data)
      setLoading(false)
    }

    cargarAlumnos()
  }, [token])

  return { alumnos, loading }
}
