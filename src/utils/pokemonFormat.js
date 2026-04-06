export function formatPokemonName(slug) {
  if (!slug) return ''
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
}

export function getStat(stats, name) {
  const s = stats?.find((x) => x.stat.name === name)
  return s?.base_stat ?? '—'
}

export function filterNameSuggestions(names, rawQuery, max = 8) {
  const q = String(rawQuery).trim().toLowerCase()
  if (!q || !names.length) return []
  const starts = []
  const includes = []
  for (const name of names) {
    if (name.startsWith(q)) starts.push(name)
    else if (name.includes(q)) includes.push(name)
  }
  starts.sort((a, b) => a.localeCompare(b))
  includes.sort((a, b) => a.localeCompare(b))
  return [...starts, ...includes].slice(0, max)
}
