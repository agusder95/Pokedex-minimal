import { useEffect, useState } from 'react'
import { fetchAllPokemonNames } from '../services/pokemonApi'

export function usePokemonNamesIndex() {
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const list = await fetchAllPokemonNames()
        if (cancelled) return
        list.sort((a, b) => a.localeCompare(b))
        setNames(list)
      } catch {
        if (!cancelled) setNames([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { names, loading }
}
