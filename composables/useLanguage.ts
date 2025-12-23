import type { Language, Currency, LanguageCode, CurrencyCode, Translations } from '~/types'

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Turkish', nativeName: 'Turkce', flag: '🇹🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
]

const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.08 },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 32.5 },
]

const translations: Record<LanguageCode, Translations> = {
  en: {
    // Header
    categories: 'Categories',
    cheapGames: 'Cheap Games',
    randomKeys: 'Random Keys',
    giftCards: 'Eneba Gift Cards',
    steamGiftCards: 'Steam Gift Cards',
    christmasGifts: 'Christmas Gifts',
    winterSale: 'Winter Sale',
    favorites: 'Favorites',
    cart: 'Cart',
    login: 'Log In',
    register: 'Sign Up',
    logout: 'Log Out',

    // Auth
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    namePlaceholder: 'Enter your name',
    confirmPasswordPlaceholder: 'Confirm your password',
    loading: 'Loading...',
    loginToSaveFavorites: 'Log in to save your favorites',
    loginToSaveFavoritesDescription: 'Create an account to save your favorite games across all your devices',
    emptyFavorites: 'Your wishlist is empty',
    emptyFavoritesDescription: 'Save games you\'re interested in to buy later',
    browseGames: 'Browse Games',
    confirmClearFavorites: 'Are you sure you want to clear all favorites?',

    // Page
    pageTitle: 'Games, Gift Cards, Top-ups and More | Best Deals',
    searchResults: 'Found results',
    clearAll: 'Clear all',
    popularity: 'Popularity',
    sortBy: 'Sort by',

    // Filters
    priceRange: 'Price range',
    country: 'Country',
    allCountries: 'All countries',
    productType: 'Product type',
    platform: 'Platform',
    genre: 'Genre',
    region: 'Region',

    // Product
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    cashback: 'CASHBACK',
    global: 'GLOBAL',

    // Footer
    aboutUs: 'About Us',
    contact: 'Contact',
    careers: 'Careers',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    allRightsReserved: 'All rights reserved',
  },
  tr: {
    // Header
    categories: 'Kategoriler',
    cheapGames: 'Ucuz Oyunlar',
    randomKeys: 'Rastgele Anahtarlar',
    giftCards: 'Eneba Hediye Kartlari',
    steamGiftCards: 'Steam Gift Cards',
    christmasGifts: 'Noel Hediyeleri',
    winterSale: 'Kis Indirimi',
    favorites: 'Favoriler',
    cart: 'Sepet',
    login: 'Oturum Acin',
    register: 'Kayit Olun',
    logout: 'Cikis Yap',

    // Auth
    email: 'E-posta',
    password: 'Sifre',
    name: 'Isim',
    confirmPassword: 'Sifreyi Onayla',
    emailPlaceholder: 'E-postanizi girin',
    passwordPlaceholder: 'Sifrenizi girin',
    namePlaceholder: 'Isminizi girin',
    confirmPasswordPlaceholder: 'Sifrenizi onaylayin',
    loading: 'Yukleniyor...',
    loginToSaveFavorites: 'Favorilerinizi kaydetmek icin giris yapin',
    loginToSaveFavoritesDescription: 'Favori oyunlarinizi tum cihazlarinizda kaydetmek icin bir hesap olusturun',
    emptyFavorites: 'Istek listeniz bos',
    emptyFavoritesDescription: 'Ilgilendiginiz oyunlari daha sonra satin almak icin kaydedin',
    browseGames: 'Oyunlara Goz At',
    confirmClearFavorites: 'Tum favorileri temizlemek istediginizden emin misiniz?',

    // Page
    pageTitle: 'Oyunlar, Hediye Kartlari, Kontor Yukleme ve Daha Fazlasi | En Iyi Firsatlar',
    searchResults: 'Bulunan sonuclar',
    clearAll: 'Hepsini temizle',
    popularity: 'Populerlik',
    sortBy: 'Sirala',

    // Filters
    priceRange: 'Fiyat araligi',
    country: 'Ulke',
    allCountries: 'Tum ulkeler',
    productType: 'Urun turu',
    platform: 'Platform',
    genre: 'Tur',
    region: 'Bolge',

    // Product
    addToCart: 'Sepete Ekle',
    addToWishlist: 'Favorilere Ekle',
    cashback: 'PARA IADESI',
    global: 'GLOBAL',

    // Footer
    aboutUs: 'Hakkimizda',
    contact: 'Iletisim',
    careers: 'Kariyer',
    termsOfService: 'Hizmet Sartlari',
    privacyPolicy: 'Gizlilik Politikasi',
    allRightsReserved: 'Tum haklari saklidir',
  },
  de: {
    // Header
    categories: 'Kategorien',
    cheapGames: 'Gunstige Spiele',
    randomKeys: 'Zufallsschlussel',
    giftCards: 'Eneba Geschenkkarten',
    steamGiftCards: 'Steam Geschenkkarten',
    christmasGifts: 'Weihnachtsgeschenke',
    winterSale: 'Winterschlussverkauf',
    favorites: 'Favoriten',
    cart: 'Warenkorb',
    login: 'Anmelden',
    register: 'Registrieren',
    logout: 'Abmelden',

    // Auth
    email: 'E-Mail',
    password: 'Passwort',
    name: 'Name',
    confirmPassword: 'Passwort bestatigen',
    emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
    passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
    namePlaceholder: 'Geben Sie Ihren Namen ein',
    confirmPasswordPlaceholder: 'Bestatigen Sie Ihr Passwort',
    loading: 'Laden...',
    loginToSaveFavorites: 'Melden Sie sich an, um Favoriten zu speichern',
    loginToSaveFavoritesDescription: 'Erstellen Sie ein Konto, um Ihre Lieblingsspiele auf allen Geraten zu speichern',
    emptyFavorites: 'Ihre Wunschliste ist leer',
    emptyFavoritesDescription: 'Speichern Sie Spiele, die Sie spater kaufen mochten',
    browseGames: 'Spiele durchsuchen',
    confirmClearFavorites: 'Sind Sie sicher, dass Sie alle Favoriten loschen mochten?',

    // Page
    pageTitle: 'Spiele, Geschenkkarten, Aufladungen und mehr | Beste Angebote',
    searchResults: 'Gefundene Ergebnisse',
    clearAll: 'Alle loschen',
    popularity: 'Beliebtheit',
    sortBy: 'Sortieren nach',

    // Filters
    priceRange: 'Preisbereich',
    country: 'Land',
    allCountries: 'Alle Lander',
    productType: 'Produkttyp',
    platform: 'Plattform',
    genre: 'Genre',
    region: 'Region',

    // Product
    addToCart: 'In den Warenkorb',
    addToWishlist: 'Zu Favoriten hinzufugen',
    cashback: 'CASHBACK',
    global: 'GLOBAL',

    // Footer
    aboutUs: 'Uber uns',
    contact: 'Kontakt',
    careers: 'Karriere',
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    allRightsReserved: 'Alle Rechte vorbehalten',
  },
}

export const useLanguage = () => {
  const currentLanguageCode = useState<LanguageCode>('language', () => 'en')
  const currentCurrencyCode = useState<CurrencyCode>('currency', () => 'EUR')

  const currentLanguage = computed(() =>
    languages.find(l => l.code === currentLanguageCode.value) || languages[0]
  )

  const currentCurrency = computed(() =>
    currencies.find(c => c.code === currentCurrencyCode.value) || currencies[0]
  )

  const t = (key: string): string => {
    const translation = translations[currentLanguageCode.value]
    return (translation[key] as string) || key
  }

  const setLanguage = (code: LanguageCode) => {
    currentLanguageCode.value = code
  }

  const setCurrency = (code: CurrencyCode) => {
    currentCurrencyCode.value = code
  }

  const formatPrice = (priceInEur: number): string => {
    const convertedPrice = priceInEur * currentCurrency.value.rate
    return `${currentCurrency.value.symbol}${convertedPrice.toFixed(2)}`
  }

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
    formatPrice,
  }
}
