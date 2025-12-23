import type { Filters, SortOption, ProductType, Platform, Region } from '~/types'

export const useFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const filters = useState<Filters>('filters', () => ({
    search: '',
    minPrice: undefined,
    maxPrice: undefined,
    countries: [],
    productTypes: [],
    platforms: [],
    genres: [],
    regions: [],
    sortBy: 'popularity',
  }))

  // Filter options
  const productTypes: { value: ProductType; label: string; count: number }[] = [
    { value: 'DLC', label: 'DLC', count: 248 },
    { value: 'Game', label: 'Game', count: 178 },
    { value: 'Game Points', label: 'Game points', count: 35 },
    { value: 'Subscription', label: 'Subscription', count: 6 },
    { value: 'Software', label: 'Software', count: 2 },
    { value: 'eGift Card', label: 'eGift Cards', count: 1 },
  ]

  const platforms: { value: Platform; label: string; count: number }[] = [
    { value: 'Steam', label: 'Steam', count: 156 },
    { value: 'Xbox', label: 'Xbox', count: 89 },
    { value: 'PlayStation', label: 'PlayStation', count: 67 },
    { value: 'Nintendo', label: 'Nintendo', count: 45 },
    { value: 'Epic', label: 'Epic Games', count: 34 },
    { value: 'Origin', label: 'Origin/EA', count: 23 },
    { value: 'GOG', label: 'GOG', count: 18 },
    { value: 'Uplay', label: 'Ubisoft', count: 15 },
  ]

  const genres: { value: string; label: string; count: number }[] = [
    { value: 'action', label: 'Action', count: 145 },
    { value: 'adventure', label: 'Adventure', count: 123 },
    { value: 'rpg', label: 'RPG', count: 98 },
    { value: 'shooter', label: 'Shooter', count: 87 },
    { value: 'strategy', label: 'Strategy', count: 76 },
    { value: 'simulation', label: 'Simulation', count: 65 },
    { value: 'sports', label: 'Sports', count: 54 },
    { value: 'racing', label: 'Racing', count: 43 },
    { value: 'puzzle', label: 'Puzzle', count: 32 },
    { value: 'horror', label: 'Horror', count: 28 },
    { value: 'sandbox', label: 'Sandbox', count: 24 },
    { value: 'survival', label: 'Survival', count: 21 },
  ]

  const regions: { value: Region; label: string }[] = [
    { value: 'GLOBAL', label: 'Global' },
    { value: 'EU', label: 'Europe' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'TR', label: 'Turkey' },
    { value: 'DE', label: 'Germany' },
    { value: 'LATAM', label: 'Latin America' },
    { value: 'ASIA', label: 'Asia' },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'discount', label: 'Biggest Discount' },
  ]

  const countries = [
    'All countries',
    'Germany',
    'United States',
    'United Kingdom',
    'France',
    'Turkey',
    'Poland',
    'Brazil',
    'Russia',
    'Japan',
  ]

  // Initialize filters from URL
  const initFiltersFromUrl = () => {
    const query = route.query

    filters.value = {
      search: (query.search as string) || '',
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      countries: query.countries ? (query.countries as string).split(',') : [],
      productTypes: query.types ? ((query.types as string).split(',') as ProductType[]) : [],
      platforms: query.platforms ? ((query.platforms as string).split(',') as Platform[]) : [],
      genres: query.genres ? (query.genres as string).split(',') : [],
      regions: query.regions ? ((query.regions as string).split(',') as Region[]) : [],
      sortBy: (query.sort as SortOption) || 'popularity',
    }
  }

  // Update URL with current filters
  const updateUrlWithFilters = () => {
    const query: Record<string, string> = {}

    if (filters.value.search) query.search = filters.value.search
    if (filters.value.minPrice) query.minPrice = String(filters.value.minPrice)
    if (filters.value.maxPrice) query.maxPrice = String(filters.value.maxPrice)
    if (filters.value.countries?.length) query.countries = filters.value.countries.join(',')
    if (filters.value.productTypes?.length) query.types = filters.value.productTypes.join(',')
    if (filters.value.platforms?.length) query.platforms = filters.value.platforms.join(',')
    if (filters.value.genres?.length) query.genres = filters.value.genres.join(',')
    if (filters.value.regions?.length) query.regions = filters.value.regions.join(',')
    if (filters.value.sortBy && filters.value.sortBy !== 'popularity') query.sort = filters.value.sortBy

    router.push({ query })
  }

  // Filter setters
  const setSearch = (value: string) => {
    filters.value.search = value
    updateUrlWithFilters()
  }

  const setPriceRange = (min?: number, max?: number) => {
    filters.value.minPrice = min
    filters.value.maxPrice = max
    updateUrlWithFilters()
  }

  const toggleProductType = (type: ProductType) => {
    const index = filters.value.productTypes?.indexOf(type) ?? -1
    if (index === -1) {
      filters.value.productTypes = [...(filters.value.productTypes || []), type]
    } else {
      filters.value.productTypes = filters.value.productTypes?.filter(t => t !== type)
    }
    updateUrlWithFilters()
  }

  const togglePlatform = (platform: Platform) => {
    const index = filters.value.platforms?.indexOf(platform) ?? -1
    if (index === -1) {
      filters.value.platforms = [...(filters.value.platforms || []), platform]
    } else {
      filters.value.platforms = filters.value.platforms?.filter(p => p !== platform)
    }
    updateUrlWithFilters()
  }

  const toggleGenre = (genre: string) => {
    const index = filters.value.genres?.indexOf(genre) ?? -1
    if (index === -1) {
      filters.value.genres = [...(filters.value.genres || []), genre]
    } else {
      filters.value.genres = filters.value.genres?.filter(g => g !== genre)
    }
    updateUrlWithFilters()
  }

  const setSort = (sort: SortOption) => {
    filters.value.sortBy = sort
    updateUrlWithFilters()
  }

  const setCountry = (country: string) => {
    if (country === 'All countries') {
      filters.value.countries = []
    } else {
      filters.value.countries = [country]
    }
    updateUrlWithFilters()
  }

  const clearAllFilters = () => {
    filters.value = {
      search: '',
      minPrice: undefined,
      maxPrice: undefined,
      countries: [],
      productTypes: [],
      platforms: [],
      genres: [],
      regions: [],
      sortBy: 'popularity',
    }
    router.push({ query: {} })
  }

  const hasActiveFilters = computed(() => {
    return (
      !!filters.value.search ||
      filters.value.minPrice !== undefined ||
      filters.value.maxPrice !== undefined ||
      (filters.value.countries?.length ?? 0) > 0 ||
      (filters.value.productTypes?.length ?? 0) > 0 ||
      (filters.value.platforms?.length ?? 0) > 0 ||
      (filters.value.genres?.length ?? 0) > 0 ||
      (filters.value.regions?.length ?? 0) > 0
    )
  })

  const activeFilterTags = computed(() => {
    const tags: { key: string; label: string; value: string }[] = []

    if (filters.value.search) {
      tags.push({ key: 'search', label: 'Text', value: filters.value.search })
    }

    filters.value.productTypes?.forEach(type => {
      tags.push({ key: `type-${type}`, label: 'Type', value: type })
    })

    filters.value.platforms?.forEach(platform => {
      tags.push({ key: `platform-${platform}`, label: 'Platform', value: platform })
    })

    filters.value.genres?.forEach(genre => {
      tags.push({ key: `genre-${genre}`, label: 'Genre', value: genre })
    })

    return tags
  })

  const removeFilterTag = (key: string) => {
    if (key === 'search') {
      filters.value.search = ''
    } else if (key.startsWith('type-')) {
      const type = key.replace('type-', '') as ProductType
      filters.value.productTypes = filters.value.productTypes?.filter(t => t !== type)
    } else if (key.startsWith('platform-')) {
      const platform = key.replace('platform-', '') as Platform
      filters.value.platforms = filters.value.platforms?.filter(p => p !== platform)
    } else if (key.startsWith('genre-')) {
      const genre = key.replace('genre-', '')
      filters.value.genres = filters.value.genres?.filter(g => g !== genre)
    }
    updateUrlWithFilters()
  }

  return {
    filters,
    productTypes,
    platforms,
    genres,
    regions,
    sortOptions,
    countries,
    initFiltersFromUrl,
    setSearch,
    setPriceRange,
    toggleProductType,
    togglePlatform,
    toggleGenre,
    setSort,
    setCountry,
    clearAllFilters,
    hasActiveFilters,
    activeFilterTags,
    removeFilterTag,
  }
}
