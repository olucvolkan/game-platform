import Fuse from 'fuse.js'
import type { Game, AutocompleteSuggestion } from '~/types'

export const useSearch = () => {
  const searchQuery = useState<string>('searchQuery', () => '')
  const searchResults = useState<Game[]>('searchResults', () => [])
  const isSearching = useState<boolean>('isSearching', () => false)

  // Fuse.js options for fuzzy search
  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'developer', weight: 0.15 },
      { name: 'publisher', weight: 0.1 },
      { name: 'genres', weight: 0.05 },
    ],
    threshold: 0.4, // Lower = more strict matching
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2,
  }

  let fuseInstance: Fuse<Game> | null = null

  const initializeFuse = (games: Game[]) => {
    fuseInstance = new Fuse(games, fuseOptions)
  }

  const search = (query: string, games: Game[]): Game[] => {
    if (!query || query.length < 2) {
      return games
    }

    if (!fuseInstance) {
      initializeFuse(games)
    }

    const results = fuseInstance!.search(query)
    return results.map(result => result.item)
  }

  const getAutocomplete = (query: string, games: Game[], limit = 10): AutocompleteSuggestion[] => {
    if (!query || query.length < 2) {
      return []
    }

    if (!fuseInstance) {
      initializeFuse(games)
    }

    const results = fuseInstance!.search(query, { limit })
    return results.map(result => ({
      id: result.item.id,
      title: result.item.title,
      slug: result.item.slug,
      image: result.item.image,
    }))
  }

  // Synonym mapping for better search
  const synonyms: Record<string, string[]> = {
    'gta': ['grand theft auto'],
    'gta 5': ['gta v', 'grand theft auto 5', 'grand theft auto v'],
    'cod': ['call of duty'],
    'fifa': ['ea fc', 'ea sports fc'],
    'pubg': ['playerunknown\'s battlegrounds'],
    'lol': ['league of legends'],
    'cs': ['counter-strike', 'csgo', 'cs2', 'counter strike'],
    'wow': ['world of warcraft'],
    'mc': ['minecraft'],
    'rdr': ['red dead redemption'],
    'ac': ['assassin\'s creed', 'assassins creed'],
  }

  const expandQueryWithSynonyms = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    const queries = [query]

    for (const [key, values] of Object.entries(synonyms)) {
      if (lowerQuery.includes(key)) {
        values.forEach(synonym => {
          queries.push(query.replace(new RegExp(key, 'gi'), synonym))
        })
      }
      values.forEach(synonym => {
        if (lowerQuery.includes(synonym)) {
          queries.push(query.replace(new RegExp(synonym, 'gi'), key))
        }
      })
    }

    return [...new Set(queries)]
  }

  const searchWithSynonyms = (query: string, games: Game[]): Game[] => {
    const expandedQueries = expandQueryWithSynonyms(query)
    const allResults: Game[] = []
    const seenIds = new Set<number>()

    for (const q of expandedQueries) {
      const results = search(q, games)
      for (const game of results) {
        if (!seenIds.has(game.id)) {
          seenIds.add(game.id)
          allResults.push(game)
        }
      }
    }

    return allResults
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    search,
    searchWithSynonyms,
    getAutocomplete,
    initializeFuse,
  }
}
