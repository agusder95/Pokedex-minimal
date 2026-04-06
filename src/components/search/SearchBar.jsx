import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { filterNameSuggestions, formatPokemonName } from '../../utils/pokemonFormat'

export function SearchBar({ value, onChange, onSubmitQuery, allNames }) {
  const listId = useId()
  const containerRef = useRef(null)
  const blurTimeout = useRef(null)
  const [focused, setFocused] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const suggestions = useMemo(
    () => filterNameSuggestions(allNames, value, 8),
    [allNames, value],
  )

  const showList = focused && value.trim().length > 0 && suggestions.length > 0

  const clearBlurTimeout = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current)
      blurTimeout.current = null
    }
  }

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setFocused(false), 120)
  }

  const pick = useCallback(
    (slug) => {
      clearBlurTimeout()
      onChange(formatPokemonName(slug))
      setFocused(false)
      onSubmitQuery(slug)
    },
    [onChange, onSubmitQuery],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (highlight >= 0 && suggestions[highlight]) {
      pick(suggestions[highlight])
      return
    }
    onSubmitQuery(value)
  }

  const handleKeyDown = (e) => {
    if (!showList) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Escape') {
      setFocused(false)
    }
  }

  useEffect(() => {
    return () => clearBlurTimeout()
  }, [])

  useEffect(() => {
    const onDoc = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto mt-10 max-w-md">
      <label htmlFor="search" className="sr-only">
        Buscar Pokémon
      </label>
      <div ref={containerRef} className="relative">
        <input
          id="search"
          type="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={showList}
          aria-controls={showList ? listId : undefined}
          aria-autocomplete="list"
          value={value}
          onChange={(e) => {
            setHighlight(-1)
            onChange(e.target.value)
          }}
          onFocus={() => {
            clearBlurTimeout()
            setHighlight(-1)
            setFocused(true)
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Nombre o ID — sugerencias al escribir"
          className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-3.5 text-[15px] text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-200/80"
        />
        {showList && (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 top-full z-40 mt-2 max-h-64 overflow-auto rounded-2xl border border-stone-200 bg-white py-1 shadow-lg"
          >
            {suggestions.map((slug, i) => (
              <li key={slug} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={i === highlight}
                  className={`flex w-full px-4 py-2.5 text-left text-[15px] transition ${
                    i === highlight ? 'bg-stone-100 text-stone-900' : 'text-stone-700'
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(slug)}
                  onMouseEnter={() => setHighlight(i)}
                >
                  {formatPokemonName(slug)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  )
}
