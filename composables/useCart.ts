import type { Game, Cart, CartItem } from '~/types'

export const useCart = () => {
  const cart = useState<Cart>('cart', () => ({
    items: [],
    total: 0,
    itemCount: 0,
  }))

  const isCartOpen = useState<boolean>('cartOpen', () => false)

  const { formatPrice } = useLanguage()

  const itemCount = computed(() =>
    cart.value.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  const total = computed(() =>
    cart.value.items.reduce((sum, item) => sum + item.game.price * item.quantity, 0)
  )

  const addToCart = (game: Game, quantity = 1) => {
    const existingItem = cart.value.items.find(item => item.game.id === game.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.value.items.push({ game, quantity })
    }

    updateCartTotals()
  }

  const removeFromCart = (gameId: number) => {
    cart.value.items = cart.value.items.filter(item => item.game.id !== gameId)
    updateCartTotals()
  }

  const updateQuantity = (gameId: number, quantity: number) => {
    const item = cart.value.items.find(item => item.game.id === gameId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(gameId)
      } else {
        item.quantity = quantity
        updateCartTotals()
      }
    }
  }

  const clearCart = () => {
    cart.value.items = []
    updateCartTotals()
  }

  const updateCartTotals = () => {
    cart.value.itemCount = itemCount.value
    cart.value.total = total.value
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const isInCart = (gameId: number): boolean => {
    return cart.value.items.some(item => item.game.id === gameId)
  }

  return {
    cart,
    isCartOpen,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    isInCart,
    formatPrice,
  }
}
