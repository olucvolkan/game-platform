import Fuse from 'fuse.js'
import { games } from '~/data/games'
import type { AutocompleteResponse, AutocompleteSuggestion } from '~/types'

export default defineEventHandler((event): AutocompleteResponse => {
  const query = getQuery(event)
  const q = (query.q as string) || ''
  const limit = parseInt(query.limit as string) || 10

  if (!q || q.length < 2) {
    return { suggestions: [] }
  }

  const fuse = new Fuse(games, {
    keys: [
      { name: 'title', weight: 0.8 },
      { name: 'developer', weight: 0.1 },
      { name: 'publisher', weight: 0.1 },
    ],
    threshold: 0.4,
    distance: 100,
    includeScore: true,
  })

  const results = fuse.search(q, { limit })

  const suggestions: AutocompleteSuggestion[] = results.map(result => ({
    id: result.item.id,
    title: result.item.title,
    slug: result.item.slug,
    image: result.item.image,
  }))

  return { suggestions }
})
