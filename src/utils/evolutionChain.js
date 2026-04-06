/**
 * Recorre recursivamente `chain` → `evolves_to` y devuelve los nombres de especie en orden (DFS).
 */
export function collectEvolutionSpecies(chainNode) {
  const out = []

  function walk(node) {
    if (!node?.species?.name) return
    out.push({ name: node.species.name })
    const next = node.evolves_to ?? []
    for (const child of next) {
      walk(child)
    }
  }

  walk(chainNode)
  return out
}
