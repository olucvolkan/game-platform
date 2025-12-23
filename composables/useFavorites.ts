import type { Game, FavoriteGame } from '~/types'

export const useFavorites = () => {
  const favorites = useState<Game[]>('favorites', () => [])
  const { isAuthenticated, authenticatedFetch } = useAuth()
  const { apiBase } = useApi()

  const favoritesCount = computed(() => favorites.value.length)

  /**
   * Load favorites from API (if authenticated) or localStorage (if not)
   */
  const loadFavorites = async () => {
    if (isAuthenticated.value) {
      try {
        const response = await authenticatedFetch<{ data: Game[] }>(`${apiBase}/favorites`)
        favorites.value = response.data
      } catch (error) {
        console.error('Failed to load favorites from API:', error)
        // Fallback to localStorage
        loadFromLocalStorage()
      }
    } else {
      loadFromLocalStorage()
    }
  }

  /**
   * Load favorites from localStorage
   */
  const loadFromLocalStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        try {
          favorites.value = JSON.parse(stored)
        } catch (error) {
          console.error('Failed to parse favorites from localStorage:', error)
          favorites.value = []
        }
      }
    }
  }

  /**
   * Save favorites to localStorage
   */
  const saveToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  /**
   * Add game to favorites
   */
  const addToFavorites = async (game: Game) => {
    if (isFavorite(game.id)) {
      return
    }

    // Optimistically add to local state
    favorites.value.push(game)

    if (isAuthenticated.value) {
      try {
        await authenticatedFetch(`${apiBase}/favorites/${game.id}`, {
          method: 'POST',
        })
      } catch (error) {
        console.error('Failed to add favorite to API:', error)
        // Revert on error
        favorites.value = favorites.value.filter(g => g.id !== game.id)
        throw error
      }
    } else {
      saveToLocalStorage()
    }
  }

  /**
   * Remove game from favorites
   */
  const removeFromFavorites = async (gameId: number) => {
    // Store the game in case we need to revert
    const removedGame = favorites.value.find(g => g.id === gameId)

    // Optimistically remove from local state
    favorites.value = favorites.value.filter(game => game.id !== gameId)

    if (isAuthenticated.value) {
      try {
        await authenticatedFetch(`${apiBase}/favorites/${gameId}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.error('Failed to remove favorite from API:', error)
        // Revert on error
        if (removedGame) {
          favorites.value.push(removedGame)
        }
        throw error
      }
    } else {
      saveToLocalStorage()
    }
  }

  /**
   * Toggle favorite status
   */
  const toggleFavorite = async (game: Game) => {
    if (!isAuthenticated.value) {
      // Show login prompt instead of toggling
      return { requiresAuth: true }
    }

    try {
      if (isFavorite(game.id)) {
        await removeFromFavorites(game.id)
      } else {
        await addToFavorites(game)
      }
      return { requiresAuth: false }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      throw error
    }
  }

  /**
   * Check if a game is in favorites
   */
  const isFavorite = (gameId: number): boolean => {
    return favorites.value.some(game => game.id === gameId)
  }

  /**
   * Clear all favorites
   */
  const clearFavorites = async () => {
    // Store current favorites in case we need to revert
    const currentFavorites = [...favorites.value]

    // Clear local state
    favorites.value = []

    if (isAuthenticated.value) {
      try {
        // Delete all favorites from API
        await Promise.all(
          currentFavorites.map(game =>
            authenticatedFetch(`${apiBase}/favorites/${game.id}`, {
              method: 'DELETE',
            })
          )
        )
      } catch (error) {
        console.error('Failed to clear favorites from API:', error)
        // Revert on error
        favorites.value = currentFavorites
        throw error
      }
    } else {
      saveToLocalStorage()
    }
  }

  /**
   * Sync local favorites to API after login
   */
  const syncFavoritesToApi = async () => {
    if (!isAuthenticated.value) {
      return
    }

    const localFavorites = [...favorites.value]

    try {
      // Load favorites from API
      await loadFavorites()

      // Sync any local favorites that aren't on the server
      for (const game of localFavorites) {
        if (!isFavorite(game.id)) {
          try {
            await authenticatedFetch(`${apiBase}/favorites/${game.id}`, {
              method: 'POST',
            })
            favorites.value.push(game)
          } catch (error) {
            console.error('Failed to sync favorite to API:', error)
          }
        }
      }
    } catch (error) {
      console.error('Failed to sync favorites to API:', error)
    }
  }

  // Initialize favorites on client-side
  if (process.client && favorites.value.length === 0) {
    loadFavorites()
  }

  return {
    favorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    loadFavorites,
    syncFavoritesToApi,
  }
}
