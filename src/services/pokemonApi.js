export const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemonIndex(limit) {
  const res = await fetch(`${POKEMON_API}?limit=${limit}`)
  if (!res.ok) throw new Error('index')
  return res.json()
}

export async function fetchPokemonByUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('pokemon')
  return res.json()
}

export async function fetchAllPokemonNames() {
  const res = await fetch(`${POKEMON_API}?limit=2500`)
  if (!res.ok) throw new Error('names')
  const data = await res.json()
  return data.results.map((r) => r.name)
}

export async function fetchPokemonByNameOrId(query) {
  const q = encodeURIComponent(String(query).trim().toLowerCase())
  return fetch(`${POKEMON_API}/${q}`)
}

export async function fetchPokemonJsonBySlug(slug) {
  const res = await fetchPokemonByNameOrId(slug)
  if (!res.ok) return null
  return res.json()
}
