import { formatPokemonName } from '../../utils/pokemonFormat'

export function PokemonCard({ pokemon, onSelect }) {
  const label = formatPokemonName(pokemon.name)
  return (
    <button
      type="button"
      onClick={() => onSelect?.(pokemon.name)}
      className="group flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-5 shadow-sm transition hover:border-stone-300 hover:shadow-md"
    >
      {pokemon.sprites?.front_default ? (
        <img
          src={pokemon.sprites.front_default}
          alt=""
          width={96}
          height={96}
          className="h-24 w-24 object-contain transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center text-sm text-stone-400">
          —
        </div>
      )}
      <span className="mt-2 text-center text-[15px] font-medium tracking-tight text-stone-800">
        {label}
      </span>
    </button>
  )
}
