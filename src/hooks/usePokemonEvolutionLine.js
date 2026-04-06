import { useEffect, useState } from 'react'
import { buildEvolutionLineWithSprites } from '../services/evolutionApi'

export function usePokemonEvolutionLine(speciesUrl) {
  const [steps, setSteps] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!speciesUrl) {
      setSteps([])
      setLoading(false)
      return
    }
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const line = await buildEvolutionLineWithSprites(speciesUrl)
        if (!cancelled) setSteps(line)
      } catch {
        if (!cancelled) setSteps([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [speciesUrl])

  return { steps, loading }
}
