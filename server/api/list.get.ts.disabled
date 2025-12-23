import Fuse from 'fuse.js'
import { games } from '~/data/games'
import type { Game, PaginatedResponse, SortOption, ProductType, Platform } from '~/types'

export default defineEventHandler((event): PaginatedResponse<Game> => {
  const query = getQuery(event)

  // Parse query parameters
  const page = parseInt(query.page as string) || 1
  const perPage = parseInt(query.perPage as string) || 20
  const search = query.search as string || ''
  const sortBy = (query.sort as SortOption) || 'popularity'
  const minPrice = query.minPrice ? parseFloat(query.minPrice as string) : undefined
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice as string) : undefined
  const productTypes = query.types ? (query.types as string).split(',') as ProductType[] : []
  const platforms = query.platforms ? (query.platforms as string).split(',') as Platform[] : []
  const genres = query.genres ? (query.genres as string).split(',') : []

  let filteredGames = [...games]

  // Apply search with Fuse.js
  if (search && search.length >= 2) {
    const fuse = new Fuse(filteredGames, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'developer', weight: 0.15 },
        { name: 'publisher', weight: 0.1 },
        { name: 'genres', weight: 0.05 },
      ],
      threshold: 0.4,
      distance: 100,
      includeScore: true,
    })

    const results = fuse.search(search)
    filteredGames = results.map(result => result.item)
  }

  // Apply price filter
  if (minPrice !== undefined) {
    filteredGames = filteredGames.filter(game => game.price >= minPrice)
  }
  if (maxPrice !== undefined) {
    filteredGames = filteredGames.filter(game => game.price <= maxPrice)
  }

  // Apply product type filter
  if (productTypes.length > 0) {
    filteredGames = filteredGames.filter(game => productTypes.includes(game.productType))
  }

  // Apply platform filter
  if (platforms.length > 0) {
    filteredGames = filteredGames.filter(game => platforms.includes(game.platform))
  }

  // Apply genre filter
  if (genres.length > 0) {
    filteredGames = filteredGames.filter(game =>
      game.genres?.some(genre => genres.includes(genre.toLowerCase()))
    )
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      filteredGames.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filteredGames.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filteredGames.sort((a, b) => {
        if (!a.releaseDate || !b.releaseDate) return 0
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      })
      break
    case 'discount':
      filteredGames.sort((a, b) => b.discount - a.discount)
      break
    case 'popularity':
    default:
      // Keep original order (already sorted by popularity in data)
      break
  }

  // Calculate pagination
  const total = filteredGames.length
  const lastPage = Math.ceil(total / perPage)
  const offset = (page - 1) * perPage
  const paginatedGames = filteredGames.slice(offset, offset + perPage)

  return {
    data: paginatedGames,
    meta: {
      total,
      page,
      perPage,
      lastPage,
    },
  }
})
