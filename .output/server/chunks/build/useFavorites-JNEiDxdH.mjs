import { computed, toRef, isRef } from 'vue';
import { c as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "tr", name: "Turkish", nativeName: "Turkce", flag: "\u{1F1F9}\u{1F1F7}" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" }
];
const currencies = [
  { code: "EUR", symbol: "\u20AC", name: "Euro", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1.08 },
  { code: "TRY", symbol: "\u20BA", name: "Turkish Lira", rate: 32.5 }
];
const translations = {
  en: {
    // Header
    categories: "Categories",
    cheapGames: "Cheap Games",
    randomKeys: "Random Keys",
    giftCards: "Eneba Gift Cards",
    steamGiftCards: "Steam Gift Cards",
    christmasGifts: "Christmas Gifts",
    winterSale: "Winter Sale",
    favorites: "Favorites",
    cart: "Cart",
    login: "Log In",
    register: "Sign Up",
    // Page
    pageTitle: "Games, Gift Cards, Top-ups and More | Best Deals",
    searchResults: "Found results",
    clearAll: "Clear all",
    popularity: "Popularity",
    sortBy: "Sort by",
    // Filters
    priceRange: "Price range",
    country: "Country",
    allCountries: "All countries",
    productType: "Product type",
    platform: "Platform",
    genre: "Genre",
    region: "Region",
    // Product
    addToCart: "Add to Cart",
    addToWishlist: "Add to Wishlist",
    cashback: "CASHBACK",
    global: "GLOBAL",
    // Footer
    aboutUs: "About Us",
    contact: "Contact",
    careers: "Careers",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    allRightsReserved: "All rights reserved"
  },
  tr: {
    // Header
    categories: "Kategoriler",
    cheapGames: "Ucuz Oyunlar",
    randomKeys: "Rastgele Anahtarlar",
    giftCards: "Eneba Hediye Kartlari",
    steamGiftCards: "Steam Gift Cards",
    christmasGifts: "Noel Hediyeleri",
    winterSale: "Kis Indirimi",
    favorites: "Favoriler",
    cart: "Sepet",
    login: "Oturum Acin",
    register: "Kayit Olun",
    // Page
    pageTitle: "Oyunlar, Hediye Kartlari, Kontor Yukleme ve Daha Fazlasi | En Iyi Firsatlar",
    searchResults: "Bulunan sonuclar",
    clearAll: "Hepsini temizle",
    popularity: "Populerlik",
    sortBy: "Sirala",
    // Filters
    priceRange: "Fiyat araligi",
    country: "Ulke",
    allCountries: "Tum ulkeler",
    productType: "Urun turu",
    platform: "Platform",
    genre: "Tur",
    region: "Bolge",
    // Product
    addToCart: "Sepete Ekle",
    addToWishlist: "Favorilere Ekle",
    cashback: "PARA IADESI",
    global: "GLOBAL",
    // Footer
    aboutUs: "Hakkimizda",
    contact: "Iletisim",
    careers: "Kariyer",
    termsOfService: "Hizmet Sartlari",
    privacyPolicy: "Gizlilik Politikasi",
    allRightsReserved: "Tum haklari saklidir"
  },
  de: {
    // Header
    categories: "Kategorien",
    cheapGames: "Gunstige Spiele",
    randomKeys: "Zufallsschlussel",
    giftCards: "Eneba Geschenkkarten",
    steamGiftCards: "Steam Geschenkkarten",
    christmasGifts: "Weihnachtsgeschenke",
    winterSale: "Winterschlussverkauf",
    favorites: "Favoriten",
    cart: "Warenkorb",
    login: "Anmelden",
    register: "Registrieren",
    // Page
    pageTitle: "Spiele, Geschenkkarten, Aufladungen und mehr | Beste Angebote",
    searchResults: "Gefundene Ergebnisse",
    clearAll: "Alle loschen",
    popularity: "Beliebtheit",
    sortBy: "Sortieren nach",
    // Filters
    priceRange: "Preisbereich",
    country: "Land",
    allCountries: "Alle Lander",
    productType: "Produkttyp",
    platform: "Plattform",
    genre: "Genre",
    region: "Region",
    // Product
    addToCart: "In den Warenkorb",
    addToWishlist: "Zu Favoriten hinzufugen",
    cashback: "CASHBACK",
    global: "GLOBAL",
    // Footer
    aboutUs: "Uber uns",
    contact: "Kontakt",
    careers: "Karriere",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    allRightsReserved: "Alle Rechte vorbehalten"
  }
};
const useLanguage = () => {
  const currentLanguageCode = useState("language", () => "en");
  const currentCurrencyCode = useState("currency", () => "EUR");
  const currentLanguage = computed(
    () => languages.find((l) => l.code === currentLanguageCode.value) || languages[0]
  );
  const currentCurrency = computed(
    () => currencies.find((c) => c.code === currentCurrencyCode.value) || currencies[0]
  );
  const t = (key) => {
    const translation = translations[currentLanguageCode.value];
    return translation[key] || key;
  };
  const setLanguage = (code) => {
    currentLanguageCode.value = code;
  };
  const setCurrency = (code) => {
    currentCurrencyCode.value = code;
  };
  const formatPrice = (priceInEur) => {
    const convertedPrice = priceInEur * currentCurrency.value.rate;
    return `${currentCurrency.value.symbol}${convertedPrice.toFixed(2)}`;
  };
  return {
    languages,
    currencies,
    currentLanguage,
    currentCurrency,
    currentLanguageCode,
    currentCurrencyCode,
    t,
    setLanguage,
    setCurrency,
    formatPrice
  };
};
const useCart = () => {
  const cart = useState("cart", () => ({
    items: [],
    total: 0,
    itemCount: 0
  }));
  const isCartOpen = useState("cartOpen", () => false);
  const { formatPrice } = useLanguage();
  const itemCount = computed(
    () => cart.value.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const total = computed(
    () => cart.value.items.reduce((sum, item) => sum + item.game.price * item.quantity, 0)
  );
  const addToCart = (game, quantity = 1) => {
    const existingItem = cart.value.items.find((item) => item.game.id === game.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.items.push({ game, quantity });
    }
    updateCartTotals();
  };
  const removeFromCart = (gameId) => {
    cart.value.items = cart.value.items.filter((item) => item.game.id !== gameId);
    updateCartTotals();
  };
  const updateQuantity = (gameId, quantity) => {
    const item = cart.value.items.find((item2) => item2.game.id === gameId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(gameId);
      } else {
        item.quantity = quantity;
        updateCartTotals();
      }
    }
  };
  const clearCart = () => {
    cart.value.items = [];
    updateCartTotals();
  };
  const updateCartTotals = () => {
    cart.value.itemCount = itemCount.value;
    cart.value.total = total.value;
  };
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };
  const isInCart = (gameId) => {
    return cart.value.items.some((item) => item.game.id === gameId);
  };
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
    formatPrice
  };
};
const useFavorites = () => {
  const favorites = useState("favorites", () => []);
  const favoritesCount = computed(() => favorites.value.length);
  const addToFavorites = (game) => {
    if (!isFavorite(game.id)) {
      favorites.value.push(game);
    }
  };
  const removeFromFavorites = (gameId) => {
    favorites.value = favorites.value.filter((game) => game.id !== gameId);
  };
  const toggleFavorite = (game) => {
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game);
    }
  };
  const isFavorite = (gameId) => {
    return favorites.value.some((game) => game.id === gameId);
  };
  const clearFavorites = () => {
    favorites.value = [];
  };
  return {
    favorites,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};

export { useState as a, useFavorites as b, useCart as c, useLanguage as u };
//# sourceMappingURL=useFavorites-JNEiDxdH.mjs.map
