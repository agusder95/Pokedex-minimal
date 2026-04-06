import { formatPokemonName } from '../../utils/pokemonFormat'
import { usePokemonEvolutionLine } from '../../hooks/usePokemonEvolutionLine'

function ArrowSeparator() {
  return (
    <span
      className="shrink-0 px-1 text-lg font-light text-stone-300 select-none"
      aria-hidden
    >
      →
    </span>
  )
}

export function PokemonEvolutionLine({ speciesUrl, activeSlug, onSelect }) {
  const { steps, loading } = usePokemonEvolutionLine(speciesUrl)

  if (!speciesUrl) return null

  return (
    <div className="mt-8 border-t border-stone-100 pt-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-stone-400">
        Línea evolutiva
      </p>
      {loading && (
        <p className="text-center text-[13px] text-stone-400">Cargando cadena…</p>
      )}
      {!loading && steps.length === 0 && (
        <p className="text-center text-[13px] text-stone-400">Sin datos de evolución.</p>
      )}
      {!loading && steps.length > 0 && (
        <div className="-mx-1 flex items-center justify-center gap-0 overflow-x-auto pb-1">
          {steps.map((step, i) => {
            const isActive = step.name === activeSlug
            return (
              <div key={`${step.name}-${i}`} className="flex shrink-0 items-center">
                {i > 0 && <ArrowSeparator />}
                <button
                  type="button"
                  onClick={() => onSelect?.(step.name)}
                  className={`flex min-w-[4.5rem] flex-col items-center rounded-2xl px-2 py-2 transition ${
                    isActive
                      ? 'bg-stone-100 ring-1 ring-stone-300/80'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  {step.sprite ? (
                    <img
                      src={step.sprite}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center text-xs text-stone-300">
                      —
                    </div>
                  )}
                  <span className="mt-1 max-w-[5.5rem] truncate text-center text-[11px] font-medium text-stone-700">
                    {formatPokemonName(step.name)}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
