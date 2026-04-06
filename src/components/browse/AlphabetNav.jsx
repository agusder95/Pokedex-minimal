import { useMemo } from 'react'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function AlphabetNav({ names, activeLetter, onSelectLetter }) {
  const available = useMemo(() => {
    const s = new Set()
    for (const n of names) {
      const c = n.charAt(0)
      if (c >= 'a' && c <= 'z') s.add(c)
    }
    return s
  }, [names])

  return (
    <nav
      className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
      aria-label="Filtrar por letra inicial"
    >
      {LETTERS.map((L) => {
        const lower = L
        const has = available.has(lower)
        const active = activeLetter === lower
        return (
          <button
            key={L}
            type="button"
            disabled={!has}
            onClick={() => onSelectLetter(lower)}
            className={`min-h-9 min-w-9 rounded-xl text-sm font-medium transition sm:min-h-10 sm:min-w-10 ${
              active
                ? 'bg-stone-800 text-white shadow-sm'
                : has
                  ? 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                  : 'cursor-not-allowed border border-transparent bg-stone-100/60 text-stone-300'
            }`}
            aria-current={active ? 'true' : undefined}
            aria-label={`Letra ${L.toUpperCase()}${!has ? ', sin Pokémon' : ''}`}
          >
            {L.toUpperCase()}
          </button>
        )
      })}
    </nav>
  )
}
