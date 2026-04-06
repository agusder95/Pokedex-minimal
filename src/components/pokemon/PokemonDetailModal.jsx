import { formatPokemonName, getStat } from '../../utils/pokemonFormat'
import { TypeBadge } from './TypeBadge'
import { PokemonEvolutionLine } from './PokemonEvolutionLine'

export function PokemonDetailModal({ pokemon, loading, notFound, onClose, onSelectEvolution }) {
  if (!loading && !notFound && !pokemon) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/25 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-stone-200/90 bg-white p-8 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        {loading && (
          <p className="py-12 text-center text-[15px] text-stone-500">Cargando…</p>
        )}
        {notFound && !loading && (
          <div className="py-8 text-center">
            <p className="text-[15px] text-stone-600">Pokémon no encontrado</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full border border-stone-200 px-5 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Cerrar
            </button>
          </div>
        )}
        {pokemon && !loading && (
          <>
            <div className="flex flex-col items-center">
              {pokemon.sprites?.front_default && (
                <img
                  src={pokemon.sprites.front_default}
                  alt=""
                  width={160}
                  height={160}
                  className="h-40 w-40 object-contain"
                />
              )}
              <h2
                id="detail-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-stone-900"
              >
                {formatPokemonName(pokemon.name)}
              </h2>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {pokemon.types?.map((t) => (
                  <TypeBadge key={t.slot} typeName={t.type.name} />
                ))}
              </div>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <dt className="text-stone-500">Altura</dt>
                <dd className="font-medium text-stone-800">
                  {(pokemon.height / 10).toFixed(1)} m
                </dd>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <dt className="text-stone-500">Peso</dt>
                <dd className="font-medium text-stone-800">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-400">
                Estadísticas
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="text-stone-600">HP</span>
                  <span className="font-semibold text-stone-900">
                    {getStat(pokemon.stats, 'hp')}
                  </span>
                </li>
                <li className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="text-stone-600">Attack</span>
                  <span className="font-semibold text-stone-900">
                    {getStat(pokemon.stats, 'attack')}
                  </span>
                </li>
                <li className="flex justify-between rounded-xl bg-stone-50 px-4 py-2.5">
                  <span className="text-stone-600">Defense</span>
                  <span className="font-semibold text-stone-900">
                    {getStat(pokemon.stats, 'defense')}
                  </span>
                </li>
              </ul>
            </div>
            {pokemon.species?.url && (
              <PokemonEvolutionLine
                speciesUrl={pokemon.species.url}
                activeSlug={pokemon.name}
                onSelect={onSelectEvolution}
              />
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-8 w-full rounded-full border border-stone-200 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
