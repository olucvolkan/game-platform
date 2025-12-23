import type { Game } from '~/types'

export const useFavorites = () => {
  const favorites = useState<Game[]>('favorites', () => [])

  const favoritesCount = computed(() => favorites.value.length)

  const addToFavorites = (game: Game) => {
    if (!isFavorite(game.id)) {
      favorites.value.push(game)
    }
  }

  const removeFromFavorites = (gameId: number) => {
    favorites.value = favorites.value.filter(game => game.id !== gameId)
  }

  const toggleFavorite = (game: Game) => {
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id)
    } else {
      addToFavorites(game)
    }
  }

  const isFavorite = (gameId: number): boolean => {
    return favorites.value.some(game => game.id === gameId)
  }

  const clearFavorites = () => {
    favorites.value = []
  }

  return {
    favorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
}
