# Pokédex Minimal

Cliente web liviano para explorar Pokémon con datos en vivo de [PokéAPI](https://pokeapi.co/). Interfaz clara, tipografía legible y pocos elementos visuales.

---

## Características

- **Listado alfabético** — Navegación por letras (A–Z); por defecto muestra Pokémon que comienzan con **A**. Letras sin resultados aparecen deshabilitadas.
- **Paginación** — Cuando hay muchas coincidencias en una letra, **Anterior** y **Siguiente** recorren la lista en bloques.
- **Búsqueda con sugerencias** — Autocompletado mientras escribes; Enter confirma o elige la sugerencia resaltada.
- **Tarjetas y detalle** — Cada Pokémon muestra sprite y nombre; el modal incluye tipos (colores pastel), altura, peso, estadísticas básicas y **línea evolutiva** horizontal con flechas; al pulsar una evolución se actualiza el detalle.

---

## Tecnologías

| Área        | Elección                          |
| ----------- | --------------------------------- |
| Interfaz    | React 19                          |
| Build       | Vite 8                            |
| Estilos     | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Datos       | Fetch API → PokéAPI v2            |
| Calidad     | ESLint                            |

Tipografía: **Inter** (Google Fonts).

---

## Requisitos

- **Node.js** 18 o superior (recomendado: la versión LTS actual)
- **npm** (incluido con Node)

---

## Instalación y uso

```bash
# Clonar o situarse en la carpeta del proyecto
cd poke-minimal

# Dependencias
npm install

# Servidor de desarrollo (recarga en caliente)
npm run dev
```

Abre la URL que indique la terminal (habitualmente `http://localhost:5173`).

```bash
# Compilación para producción
npm run build

# Vista previa del build
npm run preview

# Linter
npm run lint
```

---

## Estructura (resumen)

```
src/
├── components/   layout, búsqueda, Pokémon, navegación por letras
├── hooks/        estado y efectos reutilizables
├── services/     llamadas HTTP a PokéAPI
├── utils/        formato, tipos, cadena evolutiva
├── App.jsx
└── main.jsx
```

---

## API

Los datos provienen de **PokéAPI** (`https://pokeapi.co/api/v2/`). El uso está sujeto a sus límites y buenas prácticas; en entornos de producción conviene cachear o medir el tráfico si el volumen es alto.

---

*Proyecto de ejemplo — interfaz minimalista, sin backend propio.*
