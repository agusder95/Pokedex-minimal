import { useEffect, useMemo, useState } from 'react'
import { fetchPokemonByNameOrId } from '../services/pokemonApi'

const DEFAULT_PAGE_SIZE = 24

export function usePokemonByLetter(allNames, letter, page, setPage, pageSize = DEFAULT_PAGE_SIZE) {
  const safeLetter = /^[a-z]$/.test(String(letter || '').toLowerCase())
    ? String(letter).toLowerCase()
    : 'a'

  const matches = useMemo(() => {
    if (!allNames.length) return []
    return allNames.filter((n) => n.startsWith(safeLetter))
  }, [allNames, safeLetter])

  const totalPages = Math.max(1, Math.ceil(matches.length / pageSize))
  const safePage = Math.min(Math.max(0, page), totalPages - 1)

  const slice = useMemo(() => {
    const start = safePage * pageSize
    return matches.slice(start, start + pageSize)
  }, [matches, safePage, pageSize])

  const sliceKey = slice.join('\0')

  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (page !== safePage) setPage(safePage)
  }, [page, safePage, setPage])

  useEffect(() => {
    if (!slice.length) {
      setPokemon([])
      setLoading(false)
      return
    }
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const results = await Promise.all(
          slice.map(async (name) => {
            const res = await fetchPokemonByNameOrId(name)
            if (!res.ok) return null
            return res.json()
          }),
        )
        if (cancelled) return
        const items = results.filter(Boolean)
        items.sort((a, b) => a.name.localeCompare(b.name))
        setPokemon(items)
      } catch {
        if (!cancelled) setPokemon([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sliceKey acota el slice actual
  }, [sliceKey])

  const hasNext = safePage < totalPages - 1
  const hasPrev = safePage > 0

  const goNext = () => setPage(safePage + 1)
  const goPrev = () => setPage(safePage - 1)

  return {
    letter: safeLetter,
    pokemon,
    loading,
    page: safePage,
    totalPages,
    totalInLetter: matches.length,
    hasNext,
    hasPrev,
    goNext,
    goPrev,
    isEmpty: !loading && matches.length === 0,
  }
}
