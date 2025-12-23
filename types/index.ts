// Game Types
export interface Game {
  id: number
  slug: string
  title: string
  image: string
  price: number
  originalPrice: number
  discount: number
  platform: Platform
  region: Region
  productType: ProductType
  hasCashback: boolean
  cashbackPercent: number
  releaseDate?: string
  developer?: string
  publisher?: string
  genres?: string[]
  description?: string
  screenshots?: string[]
}

export type Platform = 'PC' | 'Steam' | 'Xbox' | 'PlayStation' | 'Nintendo' | 'Origin' | 'Uplay' | 'Epic' | 'GOG'

export type Region = 'GLOBAL' | 'EU' | 'US' | 'TR' | 'UK' | 'DE' | 'RU' | 'LATAM' | 'ASIA'

export type ProductType = 'Game' | 'DLC' | 'Game Points' | 'Subscription' | 'Software' | 'eGift Card'

// Filter Types
export interface Filters {
  search?: string
  minPrice?: number
  maxPrice?: number
  countries?: string[]
  productTypes?: ProductType[]
  platforms?: Platform[]
  genres?: string[]
  regions?: Region[]
  sortBy?: SortOption
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'discount'

// API Filter Parameters (for useApi composable)
export interface FilterParams {
  page?: number
  perPage?: number
  search?: string
  sort?: SortOption
  minPrice?: number
  maxPrice?: number
  types?: ProductType[]
  platforms?: Platform[]
  genres?: string[]
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  perPage: number
  lastPage: number
}

export interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[]
}

export interface AutocompleteSuggestion {
  id: number
  title: string
  slug: string
  image?: string
}

// Cart Types
export interface CartItem {
  game: Game
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// User Types
export interface User {
  id: number
  email: string
  name: string
  avatar?: string
}

// Currency Types
export type CurrencyCode = 'EUR' | 'USD' | 'TRY'

export interface Currency {
  code: CurrencyCode
  symbol: string
  name: string
  rate: number // Exchange rate relative to EUR
}

// Language Types
export type LanguageCode = 'en' | 'tr' | 'de'

export interface Language {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
}

// Filter Option Types
export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface PriceRange {
  min: number
  max: number
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
  icon?: string
  highlight?: boolean
  badge?: string
}

// Translation Types
export interface Translations {
  [key: string]: string | Translations
}
