import type { Game, Platform, Region, ProductType } from '~/types'

const platforms: Platform[] = ['Steam', 'Xbox', 'PlayStation', 'Nintendo', 'Epic', 'Origin', 'GOG', 'Uplay']
const regions: Region[] = ['GLOBAL', 'EU', 'US', 'TR', 'UK', 'DE', 'LATAM', 'ASIA']
const productTypes: ProductType[] = ['Game', 'DLC', 'Game Points', 'Subscription']
const genres = ['Action', 'Adventure', 'RPG', 'Shooter', 'Strategy', 'Simulation', 'Sports', 'Racing', 'Puzzle', 'Horror', 'Sandbox', 'Survival']

// Base game data with real game names
const baseGames: Partial<Game>[] = [
  { title: 'Minecraft', developer: 'Mojang', publisher: 'Microsoft', genres: ['Sandbox', 'Survival'] },
  { title: 'Grand Theft Auto V', developer: 'Rockstar North', publisher: 'Rockstar Games', genres: ['Action', 'Adventure'] },
  { title: 'The Witcher 3: Wild Hunt', developer: 'CD Projekt Red', publisher: 'CD Projekt', genres: ['RPG', 'Action'] },
  { title: 'Red Dead Redemption 2', developer: 'Rockstar Games', publisher: 'Rockstar Games', genres: ['Action', 'Adventure'] },
  { title: 'Cyberpunk 2077', developer: 'CD Projekt Red', publisher: 'CD Projekt', genres: ['RPG', 'Action'] },
  { title: 'Elden Ring', developer: 'FromSoftware', publisher: 'Bandai Namco', genres: ['RPG', 'Action'] },
  { title: 'FIFA 24', developer: 'EA Sports', publisher: 'Electronic Arts', genres: ['Sports', 'Simulation'] },
  { title: 'Call of Duty: Modern Warfare III', developer: 'Sledgehammer Games', publisher: 'Activision', genres: ['Shooter', 'Action'] },
  { title: 'Hogwarts Legacy', developer: 'Avalanche Software', publisher: 'Warner Bros.', genres: ['RPG', 'Adventure'] },
  { title: 'Baldur\'s Gate 3', developer: 'Larian Studios', publisher: 'Larian Studios', genres: ['RPG', 'Strategy'] },
  { title: 'Starfield', developer: 'Bethesda', publisher: 'Bethesda', genres: ['RPG', 'Adventure'] },
  { title: 'Diablo IV', developer: 'Blizzard', publisher: 'Blizzard', genres: ['RPG', 'Action'] },
  { title: 'Resident Evil 4 Remake', developer: 'Capcom', publisher: 'Capcom', genres: ['Horror', 'Action'] },
  { title: 'The Legend of Zelda: Tears of the Kingdom', developer: 'Nintendo', publisher: 'Nintendo', genres: ['Adventure', 'Action'] },
  { title: 'God of War Ragnarok', developer: 'Santa Monica Studio', publisher: 'Sony', genres: ['Action', 'Adventure'] },
  { title: 'Spider-Man 2', developer: 'Insomniac Games', publisher: 'Sony', genres: ['Action', 'Adventure'] },
  { title: 'Forza Horizon 5', developer: 'Playground Games', publisher: 'Xbox Game Studios', genres: ['Racing', 'Simulation'] },
  { title: 'Halo Infinite', developer: '343 Industries', publisher: 'Xbox Game Studios', genres: ['Shooter', 'Action'] },
  { title: 'Assassin\'s Creed Mirage', developer: 'Ubisoft', publisher: 'Ubisoft', genres: ['Action', 'Adventure'] },
  { title: 'Dead Space Remake', developer: 'Motive Studio', publisher: 'Electronic Arts', genres: ['Horror', 'Action'] },
  { title: 'Final Fantasy XVI', developer: 'Square Enix', publisher: 'Square Enix', genres: ['RPG', 'Action'] },
  { title: 'Street Fighter 6', developer: 'Capcom', publisher: 'Capcom', genres: ['Action', 'Fighting'] },
  { title: 'Mortal Kombat 1', developer: 'NetherRealm', publisher: 'Warner Bros.', genres: ['Action', 'Fighting'] },
  { title: 'Lies of P', developer: 'Round8 Studio', publisher: 'Neowiz', genres: ['RPG', 'Action'] },
  { title: 'Sea of Stars', developer: 'Sabotage Studio', publisher: 'Sabotage Studio', genres: ['RPG', 'Adventure'] },
  { title: 'Armored Core VI', developer: 'FromSoftware', publisher: 'Bandai Namco', genres: ['Action', 'Simulation'] },
  { title: 'Alan Wake 2', developer: 'Remedy', publisher: 'Epic Games', genres: ['Horror', 'Action'] },
  { title: 'Cities: Skylines II', developer: 'Colossal Order', publisher: 'Paradox', genres: ['Simulation', 'Strategy'] },
  { title: 'Remnant 2', developer: 'Gunfire Games', publisher: 'Gearbox', genres: ['Action', 'Shooter'] },
  { title: 'Payday 3', developer: 'Starbreeze', publisher: 'Deep Silver', genres: ['Action', 'Shooter'] },
  { title: 'Lords of the Fallen', developer: 'Hexworks', publisher: 'CI Games', genres: ['RPG', 'Action'] },
  { title: 'Counter-Strike 2', developer: 'Valve', publisher: 'Valve', genres: ['Shooter', 'Action'] },
  { title: 'Valorant', developer: 'Riot Games', publisher: 'Riot Games', genres: ['Shooter', 'Action'] },
  { title: 'League of Legends', developer: 'Riot Games', publisher: 'Riot Games', genres: ['Strategy', 'Action'] },
  { title: 'Dota 2', developer: 'Valve', publisher: 'Valve', genres: ['Strategy', 'Action'] },
  { title: 'World of Warcraft', developer: 'Blizzard', publisher: 'Blizzard', genres: ['RPG', 'Adventure'] },
  { title: 'Destiny 2', developer: 'Bungie', publisher: 'Bungie', genres: ['Shooter', 'Action'] },
  { title: 'Apex Legends', developer: 'Respawn', publisher: 'Electronic Arts', genres: ['Shooter', 'Action'] },
  { title: 'Fortnite', developer: 'Epic Games', publisher: 'Epic Games', genres: ['Shooter', 'Action'] },
  { title: 'PUBG: Battlegrounds', developer: 'PUBG Corporation', publisher: 'Krafton', genres: ['Shooter', 'Action'] },
  { title: 'Overwatch 2', developer: 'Blizzard', publisher: 'Blizzard', genres: ['Shooter', 'Action'] },
  { title: 'Rainbow Six Siege', developer: 'Ubisoft', publisher: 'Ubisoft', genres: ['Shooter', 'Action'] },
  { title: 'Rocket League', developer: 'Psyonix', publisher: 'Epic Games', genres: ['Sports', 'Racing'] },
  { title: 'Terraria', developer: 'Re-Logic', publisher: 'Re-Logic', genres: ['Sandbox', 'Adventure'] },
  { title: 'Stardew Valley', developer: 'ConcernedApe', publisher: 'ConcernedApe', genres: ['Simulation', 'RPG'] },
  { title: 'Hollow Knight', developer: 'Team Cherry', publisher: 'Team Cherry', genres: ['Action', 'Adventure'] },
  { title: 'Celeste', developer: 'Maddy Makes Games', publisher: 'Maddy Makes Games', genres: ['Puzzle', 'Action'] },
  { title: 'Hades', developer: 'Supergiant Games', publisher: 'Supergiant Games', genres: ['Action', 'RPG'] },
  { title: 'Dead Cells', developer: 'Motion Twin', publisher: 'Motion Twin', genres: ['Action', 'RPG'] },
  { title: 'Slay the Spire', developer: 'MegaCrit', publisher: 'MegaCrit', genres: ['Strategy', 'RPG'] },
]

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Generate random price
const generatePrice = (): { price: number; originalPrice: number; discount: number } => {
  const originalPrice = Math.floor(Math.random() * 60) + 10 // 10-70
  const hasDiscount = Math.random() > 0.3
  const discount = hasDiscount ? Math.floor(Math.random() * 50) + 10 : 0 // 10-60% off
  const price = hasDiscount
    ? Math.round(originalPrice * (1 - discount / 100) * 100) / 100
    : originalPrice

  return { price, originalPrice, discount }
}

// Generate random image URL (placeholder)
const generateImage = (id: number, title: string): string => {
  // Using picsum for placeholder images
  return `https://picsum.photos/seed/${generateSlug(title)}/300/400`
}

// Generate full game data
export const generateGames = (): Game[] => {
  const games: Game[] = []
  let id = 1

  // Generate main games
  baseGames.forEach((baseGame) => {
    const { price, originalPrice, discount } = generatePrice()
    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    const region = regions[Math.floor(Math.random() * regions.length)]

    games.push({
      id: id++,
      slug: generateSlug(baseGame.title!),
      title: baseGame.title!,
      image: generateImage(id, baseGame.title!),
      price,
      originalPrice,
      discount,
      platform,
      region,
      productType: 'Game',
      hasCashback: Math.random() > 0.5,
      cashbackPercent: Math.floor(Math.random() * 20) + 5,
      developer: baseGame.developer,
      publisher: baseGame.publisher,
      genres: baseGame.genres,
      releaseDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      description: `${baseGame.title} is an amazing game developed by ${baseGame.developer} and published by ${baseGame.publisher}. Experience incredible gameplay and immersive storytelling.`,
    })

    // Add DLC for some games
    if (Math.random() > 0.5) {
      const dlcPrice = generatePrice()
      games.push({
        id: id++,
        slug: `${generateSlug(baseGame.title!)}-dlc`,
        title: `${baseGame.title} - Season Pass`,
        image: generateImage(id, `${baseGame.title!} DLC`),
        price: dlcPrice.price,
        originalPrice: dlcPrice.originalPrice,
        discount: dlcPrice.discount,
        platform,
        region,
        productType: 'DLC',
        hasCashback: Math.random() > 0.6,
        cashbackPercent: Math.floor(Math.random() * 15) + 5,
        developer: baseGame.developer,
        publisher: baseGame.publisher,
        genres: baseGame.genres,
      })
    }

    // Add different platform versions
    if (Math.random() > 0.6) {
      const altPlatform = platforms.filter(p => p !== platform)[Math.floor(Math.random() * (platforms.length - 1))]
      const altPrice = generatePrice()
      games.push({
        id: id++,
        slug: `${generateSlug(baseGame.title!)}-${altPlatform.toLowerCase()}`,
        title: `${baseGame.title} (${altPlatform})`,
        image: generateImage(id, baseGame.title!),
        price: altPrice.price,
        originalPrice: altPrice.originalPrice,
        discount: altPrice.discount,
        platform: altPlatform,
        region: regions[Math.floor(Math.random() * regions.length)],
        productType: 'Game',
        hasCashback: Math.random() > 0.5,
        cashbackPercent: Math.floor(Math.random() * 20) + 5,
        developer: baseGame.developer,
        publisher: baseGame.publisher,
        genres: baseGame.genres,
      })
    }
  })

  // Add gift cards
  const giftCardBrands = ['Steam', 'Xbox', 'PlayStation', 'Nintendo', 'Google Play', 'Apple', 'Amazon']
  const giftCardAmounts = [10, 20, 25, 50, 100]

  giftCardBrands.forEach(brand => {
    giftCardAmounts.forEach(amount => {
      if (Math.random() > 0.5) {
        games.push({
          id: id++,
          slug: `${brand.toLowerCase().replace(' ', '-')}-gift-card-${amount}`,
          title: `${brand} Gift Card ${amount} EUR`,
          image: generateImage(id, `${brand} Gift Card`),
          price: amount - (Math.random() * 2),
          originalPrice: amount,
          discount: Math.floor(Math.random() * 10),
          platform: brand as Platform,
          region: 'EU',
          productType: 'eGift Card',
          hasCashback: false,
          cashbackPercent: 0,
        })
      }
    })
  })

  // Add subscriptions
  const subscriptions = [
    { name: 'Xbox Game Pass Ultimate', platform: 'Xbox' as Platform, months: [1, 3, 12] },
    { name: 'PlayStation Plus Premium', platform: 'PlayStation' as Platform, months: [1, 3, 12] },
    { name: 'Nintendo Switch Online', platform: 'Nintendo' as Platform, months: [3, 12] },
    { name: 'EA Play', platform: 'Origin' as Platform, months: [1, 12] },
  ]

  subscriptions.forEach(sub => {
    sub.months.forEach(months => {
      const basePrice = months === 1 ? 15 : months === 3 ? 40 : 100
      const { price, discount } = generatePrice()
      games.push({
        id: id++,
        slug: `${generateSlug(sub.name)}-${months}-month`,
        title: `${sub.name} - ${months} Month${months > 1 ? 's' : ''}`,
        image: generateImage(id, sub.name),
        price: basePrice * 0.85,
        originalPrice: basePrice,
        discount: 15,
        platform: sub.platform,
        region: 'GLOBAL',
        productType: 'Subscription',
        hasCashback: Math.random() > 0.7,
        cashbackPercent: Math.floor(Math.random() * 10) + 5,
      })
    })
  })

  return games
}

export const games: Game[] = generateGames()

export default games
