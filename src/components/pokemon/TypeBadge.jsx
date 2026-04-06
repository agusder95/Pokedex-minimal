import { typePastelClasses } from '../../utils/pokemonTypes'

export function TypeBadge({ typeName }) {
  const slug = typeName?.toLowerCase?.() ?? ''
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${typePastelClasses(slug)}`}
    >
      {typeName}
    </span>
  )
}
