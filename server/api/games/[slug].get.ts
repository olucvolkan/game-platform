import { games } from '~/data/games'
import type { Game } from '~/types'

export default defineEventHandler((event): Game | { error: string } => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is required',
    })
  }

  const game = games.find(g => g.slug === slug)

  if (!game) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Game not found',
    })
  }

  // Add additional details for single game view
  return {
    ...game,
    description: game.description || `${game.title} is an incredible game that offers hours of entertainment. Developed by ${game.developer || 'Unknown'} and published by ${game.publisher || 'Unknown'}.`,
    screenshots: [
      `https://picsum.photos/seed/${game.slug}-1/800/450`,
      `https://picsum.photos/seed/${game.slug}-2/800/450`,
      `https://picsum.photos/seed/${game.slug}-3/800/450`,
      `https://picsum.photos/seed/${game.slug}-4/800/450`,
    ],
  }
})
