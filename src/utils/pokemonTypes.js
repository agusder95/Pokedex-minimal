const PASTEL_BY_TYPE = {
  normal: 'bg-stone-200/90 text-stone-700',
  fire: 'bg-red-100 text-red-800',
  water: 'bg-sky-100 text-sky-800',
  electric: 'bg-amber-100 text-amber-900',
  grass: 'bg-emerald-100 text-emerald-800',
  ice: 'bg-cyan-100 text-cyan-800',
  fighting: 'bg-orange-100 text-orange-900',
  poison: 'bg-purple-100 text-purple-800',
  ground: 'bg-amber-50 text-amber-900 border border-amber-200/80',
  flying: 'bg-indigo-100 text-indigo-800',
  psychic: 'bg-fuchsia-100 text-fuchsia-800',
  bug: 'bg-lime-100 text-lime-900',
  rock: 'bg-yellow-100 text-yellow-900',
  ghost: 'bg-violet-100 text-violet-800',
  dragon: 'bg-indigo-50 text-indigo-900 border border-indigo-200/70',
  dark: 'bg-stone-300/80 text-stone-900',
  steel: 'bg-slate-200 text-slate-800',
  fairy: 'bg-pink-100 text-pink-800',
  stellar: 'bg-violet-50 text-violet-900 border border-violet-200/70',
}

export function typePastelClasses(typeSlug) {
  const key = String(typeSlug || '').toLowerCase()
  return PASTEL_BY_TYPE[key] ?? 'bg-stone-100 text-stone-600'
}
