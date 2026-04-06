import { fetchPokemonJsonBySlug } from './pokemonApi'
import { collectEvolutionSpecies } from '../utils/evolutionChain'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('fetch')
  return res.json()
}

export async function buildEvolutionLineWithSprites(speciesUrl) {
  const species = await fetchJson(speciesUrl)
  const chainUrl = species.evolution_chain?.url
  if (!chainUrl) return []

  const evolutionChain = await fetchJson(chainUrl)
  const speciesList = collectEvolutionSpecies(evolutionChain.chain)

  const withSprites = await Promise.all(
    speciesList.map(async ({ name }) => {
      const p = await fetchPokemonJsonBySlug(name)
      return {
        name,
        sprite: p?.sprites?.front_default ?? null,
      }
    }),
  )

  return withSprites
}
