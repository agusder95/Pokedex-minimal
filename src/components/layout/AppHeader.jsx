import { SearchBar } from '../search/SearchBar'

export function AppHeader({ searchValue, onSearchChange, onSearchSubmit, nameIndex }) {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-2 pt-12 sm:px-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Pokédex Minimal
      </h1>
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSubmitQuery={onSearchSubmit}
        allNames={nameIndex}
      />
    </header>
  )
}
