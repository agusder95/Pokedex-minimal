import { AlphabetNav } from './AlphabetNav'
import { PokemonGrid } from '../pokemon/PokemonGrid'

export function LetterBrowseSection({
  names,
  namesLoading,
  activeLetter,
  onSelectLetter,
  pokemon,
  gridLoading,
  onSelectPokemon,
  page,
  totalPages,
  totalInLetter,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  isEmpty,
}) {
  if (namesLoading) {
    return (
      <p className="py-16 text-center text-[15px] text-stone-500">
        Cargando índice…
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <AlphabetNav
        names={names}
        activeLetter={activeLetter}
        onSelectLetter={onSelectLetter}
      />

      {isEmpty ? (
        <p className="py-12 text-center text-[15px] text-stone-500">
          No hay Pokémon que empiecen con &ldquo;{activeLetter.toUpperCase()}&rdquo;.
        </p>
      ) : (
        <>
          <p className="text-center text-xs font-medium uppercase tracking-wider text-stone-400">
            {totalInLetter} Pokémon · página {page + 1} de {totalPages}
          </p>
          <PokemonGrid
            pokemon={pokemon}
            loading={gridLoading}
            onSelectPokemon={onSelectPokemon}
            emptyMessage="Sin resultados en esta página."
          />
          {(hasPrev || hasNext) && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {hasPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="rounded-full border border-stone-200 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Anterior
                </button>
              )}
              {hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="rounded-full border border-stone-200 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Siguiente
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
