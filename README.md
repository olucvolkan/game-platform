# Eneba Clone - Frontend

A Nuxt.js frontend for the Eneba game marketplace clone.

## Production

**Live App:** https://game-platform-production-9b92.up.railway.app/list

**API Backend:** https://game-platform-backend-master-mlenvd.laravel.cloud/

## Tech Stack

- **Framework:** Nuxt.js 3 (Vue 3)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Pinia / useState / useAsyncData
- **Font:** Inter (Google Fonts)

## Features

- Game listing with pagination
- Search with autocomplete
- Platform, type, and price filters
- Sorting (price, discount, newest)
- Game detail pages
- User authentication (register/login)
- Favorites/wishlist

## Design System

| Element | Value |
|---------|-------|
| Primary Color | `#4618ac` |
| Accent Color | `#fad318` |
| Filter Background | `#5825cc` |
| Font Family | Inter |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

```env
# API Base URL
NUXT_PUBLIC_API_BASE=http://localhost:8000
```

## Project Structure

```
frontend/
├── assets/
│   └── css/main.css        # Global styles & fonts
├── components/
│   ├── header/             # Navigation components
│   ├── sidebar/            # Filter sidebar
│   ├── product/            # Game cards & lists
│   ├── footer/             # Footer component
│   └── ui/                 # Reusable UI components
├── composables/            # Vue composables
│   ├── useGames.ts         # Game data fetching
│   ├── useFavorites.ts     # Favorites management
│   └── useAuth.ts          # Authentication
├── layouts/                # Page layouts
├── pages/                  # File-based routing
│   ├── index.vue           # Home page
│   ├── list.vue            # Game listing
│   └── game/[slug].vue     # Game details
└── public/                 # Static assets
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/list` | Game listing with filters |
| `/game/{slug}` | Game detail page |

## License

MIT
