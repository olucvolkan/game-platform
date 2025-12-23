import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import Fuse from 'fuse.js';
import { g as games } from '../../_/games.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const list_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const perPage = parseInt(query.perPage) || 20;
  const search = query.search || "";
  const sortBy = query.sort || "popularity";
  const minPrice = query.minPrice ? parseFloat(query.minPrice) : void 0;
  const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : void 0;
  const productTypes = query.types ? query.types.split(",") : [];
  const platforms = query.platforms ? query.platforms.split(",") : [];
  const genres = query.genres ? query.genres.split(",") : [];
  let filteredGames = [...games];
  if (search && search.length >= 2) {
    const fuse = new Fuse(filteredGames, {
      keys: [
        { name: "title", weight: 0.7 },
        { name: "developer", weight: 0.15 },
        { name: "publisher", weight: 0.1 },
        { name: "genres", weight: 0.05 }
      ],
      threshold: 0.4,
      distance: 100,
      includeScore: true
    });
    const results = fuse.search(search);
    filteredGames = results.map((result) => result.item);
  }
  if (minPrice !== void 0) {
    filteredGames = filteredGames.filter((game) => game.price >= minPrice);
  }
  if (maxPrice !== void 0) {
    filteredGames = filteredGames.filter((game) => game.price <= maxPrice);
  }
  if (productTypes.length > 0) {
    filteredGames = filteredGames.filter((game) => productTypes.includes(game.productType));
  }
  if (platforms.length > 0) {
    filteredGames = filteredGames.filter((game) => platforms.includes(game.platform));
  }
  if (genres.length > 0) {
    filteredGames = filteredGames.filter(
      (game) => {
        var _a;
        return (_a = game.genres) == null ? void 0 : _a.some((genre) => genres.includes(genre.toLowerCase()));
      }
    );
  }
  switch (sortBy) {
    case "price-asc":
      filteredGames.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredGames.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filteredGames.sort((a, b) => {
        if (!a.releaseDate || !b.releaseDate) return 0;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });
      break;
    case "discount":
      filteredGames.sort((a, b) => b.discount - a.discount);
      break;
  }
  const total = filteredGames.length;
  const lastPage = Math.ceil(total / perPage);
  const offset = (page - 1) * perPage;
  const paginatedGames = filteredGames.slice(offset, offset + perPage);
  return {
    data: paginatedGames,
    meta: {
      total,
      page,
      perPage,
      lastPage
    }
  };
});

export { list_get as default };
//# sourceMappingURL=list.get.mjs.map
