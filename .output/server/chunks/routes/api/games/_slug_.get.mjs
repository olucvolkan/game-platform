import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
import { g as games } from '../../../_/games.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _slug__get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required"
    });
  }
  const game = games.find((g) => g.slug === slug);
  if (!game) {
    throw createError({
      statusCode: 404,
      statusMessage: "Game not found"
    });
  }
  return {
    ...game,
    description: game.description || `${game.title} is an incredible game that offers hours of entertainment. Developed by ${game.developer || "Unknown"} and published by ${game.publisher || "Unknown"}.`,
    screenshots: [
      `https://picsum.photos/seed/${game.slug}-1/800/450`,
      `https://picsum.photos/seed/${game.slug}-2/800/450`,
      `https://picsum.photos/seed/${game.slug}-3/800/450`,
      `https://picsum.photos/seed/${game.slug}-4/800/450`
    ]
  };
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
