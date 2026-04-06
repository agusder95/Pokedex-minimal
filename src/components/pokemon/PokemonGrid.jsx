import { PokemonCard } from './PokemonCard'

export function PokemonGrid({ pokemon, loading, onSelectPokemon, emptyMessage }) {
  if (loading) {
    return (
      <p className="py-16 text-center text-[15px] text-stone-500">Cargando…</p>
    )
  }
  if (!pokemon.length) {
    return (
      <p className="py-12 text-center text-[15px] text-stone-500">
        {emptyMessage ?? 'Sin Pokémon para mostrar.'}
      </p>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onSelect={onSelectPokemon} />
      ))}
    </div>
  )
}
