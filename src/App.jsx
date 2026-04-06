import { usePokemonDetail } from './hooks/usePokemonDetail'
import { usePokemonByLetter } from './hooks/usePokemonByLetter'
import { usePokemonNamesIndex } from './hooks/usePokemonNamesIndex'
import { AppHeader } from './components/layout/AppHeader'
import { LetterBrowseSection } from './components/browse/LetterBrowseSection'
import { PokemonDetailModal } from './components/pokemon/PokemonDetailModal'
import { useCallback, useState } from 'react'

export default function App() {
  const { names: nameIndex, loading: namesLoading } = usePokemonNamesIndex()
  const [letter, setLetter] = useState('a')
  const [gridPage, setGridPage] = useState(0)

  const selectLetter = useCallback((L) => {
    setLetter(L)
    setGridPage(0)
  }, [])

  const {
    letter: activeLetter,
    pokemon,
    loading: gridLoading,
    page,
    totalPages,
    totalInLetter,
    hasNext,
    hasPrev,
    goNext,
    goPrev,
    isEmpty,
  } = usePokemonByLetter(nameIndex, letter, gridPage, setGridPage)

  const { open, pokemon: detail, loading, notFound, openDetail, closeDetail } =
    usePokemonDetail()
  const [search, setSearch] = useState('')

  const handleSearchSubmit = useCallback(
    (query) => {
      openDetail(query)
    },
    [openDetail],
  )

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <AppHeader
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={handleSearchSubmit}
        nameIndex={nameIndex}
      />

      <main className="mx-auto max-w-5xl px-5 pb-20 pt-6 sm:px-8">
        <LetterBrowseSection
          names={nameIndex}
          namesLoading={namesLoading}
          activeLetter={activeLetter}
          onSelectLetter={selectLetter}
          pokemon={pokemon}
          gridLoading={gridLoading}
          onSelectPokemon={openDetail}
          page={page}
          totalPages={totalPages}
          totalInLetter={totalInLetter}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNext={goNext}
          onPrev={goPrev}
          isEmpty={isEmpty}
        />
      </main>

      {open && (
        <PokemonDetailModal
          pokemon={detail}
          loading={loading}
          notFound={notFound}
          onClose={closeDetail}
          onSelectEvolution={openDetail}
        />
      )}
    </div>
  )
}
