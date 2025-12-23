import type { Game, PaginatedResponse, AutocompleteSuggestion, FilterParams } from '~/types'

/**
 * Composable for making API calls to the Laravel backend.
 *
 * In development, requests are proxied through Nitro to avoid CORS issues.
 * In production, set NUXT_PUBLIC_API_BASE to your deployed Laravel API URL.
 *
 * @see /api/FRONTEND_INTEGRATION.md for full API documentation
 */
export const useApi = () => {
  const config = useRuntimeConfig()

  // Use proxy in development, direct URL in production
  const apiBase = process.client && process.env.NODE_ENV === 'development'
    ? '/api'
    : config.public.apiBase

  /**
   * Fetch paginated list of games with optional filters.
   *
   * @param filters - Filter parameters (page, search, sort, etc.)
   * @returns Promise<PaginatedResponse<Game>>
   *
   * @example
   * // Fetch first page of games
   * const { data } = await fetchGames({ page: 1 })
   *
   * // Search for games with filters
   * const { data } = await fetchGames({
   *   search: 'minecraft',
   *   sort: 'price-asc',
   *   platforms: ['Steam', 'Xbox']
   * })
   */
  const fetchGames = async (filters: FilterParams = {}): Promise<PaginatedResponse<Game>> => {
    const params = new URLSearchParams()

    if (filters.page) params.set('page', String(filters.page))
    if (filters.perPage) params.set('perPage', String(filters.perPage))
    if (filters.search) params.set('search', filters.search)
    if (filters.sort) params.set('sort', filters.sort)
    if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice))
    if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice))
    if (filters.types?.length) params.set('types', filters.types.join(','))
    if (filters.platforms?.length) params.set('platforms', filters.platforms.join(','))
    if (filters.genres?.length) params.set('genres', filters.genres.join(','))

    const queryString = params.toString()
    const url = `${apiBase}/list${queryString ? `?${queryString}` : ''}`

    const response = await $fetch<PaginatedResponse<Game>>(url)
    return response
  }

  /**
   * Fetch autocomplete suggestions for search.
   *
   * @param query - Search query (minimum 2 characters)
   * @param limit - Maximum number of suggestions (default: 10)
   * @returns Promise<AutocompleteSuggestion[]>
   *
   * @example
   * const suggestions = await fetchAutocomplete('mine', 5)
   * // Returns: [{ id: 1, title: 'Minecraft', slug: 'minecraft', image: '...' }, ...]
   */
  const fetchAutocomplete = async (query: string, limit = 10): Promise<AutocompleteSuggestion[]> => {
    if (!query || query.length < 2) {
      return []
    }

    const params = new URLSearchParams({
      q: query,
      limit: String(limit),
    })

    const url = `${apiBase}/autocomplete?${params}`
    const response = await $fetch<{ suggestions: AutocompleteSuggestion[] }>(url)
    return response.suggestions
  }

  /**
   * Fetch a single game by slug.
   *
   * @param slug - Game URL slug
   * @returns Promise<Game | null>
   *
   * @example
   * const game = await fetchGameBySlug('minecraft')
   */
  const fetchGameBySlug = async (slug: string): Promise<Game | null> => {
    try {
      const url = `${apiBase}/games/${slug}`
      const response = await $fetch<Game>(url)
      return response
    } catch (error) {
      console.error('Failed to fetch game:', error)
      return null
    }
  }

  return {
    apiBase,
    fetchGames,
    fetchAutocomplete,
    fetchGameBySlug,
  }
}
