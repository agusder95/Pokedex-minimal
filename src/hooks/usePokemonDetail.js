import { useCallback, useRef, useState } from 'react'
import { fetchPokemonByNameOrId } from '../services/pokemonApi'

export function usePokemonDetail() {
  const [open, setOpen] = useState(false)
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const requestId = useRef(0)

  const openDetail = useCallback(async (query) => {
    const q = String(query)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
    if (!q) return
    const id = ++requestId.current
    setOpen(true)
    setLoading(true)
    setPokemon(null)
    setNotFound(false)
    try {
      const res = await fetchPokemonByNameOrId(q)
      if (id !== requestId.current) return
      if (res.status === 404) {
        setNotFound(true)
        return
      }
      if (!res.ok) throw new Error('fetch')
      const data = await res.json()
      if (id !== requestId.current) return
      setPokemon(data)
    } catch {
      if (id !== requestId.current) return
      setNotFound(true)
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }, [])

  const closeDetail = useCallback(() => {
    requestId.current += 1
    setOpen(false)
    setPokemon(null)
    setNotFound(false)
    setLoading(false)
  }, [])

  return { open, pokemon, loading, notFound, openDetail, closeDetail }
}
