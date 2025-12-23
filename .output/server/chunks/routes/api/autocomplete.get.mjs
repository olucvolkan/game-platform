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

const autocomplete_get = defineEventHandler((event) => {
  const query = getQuery(event);
  const q = query.q || "";
  const limit = parseInt(query.limit) || 10;
  if (!q || q.length < 2) {
    return { suggestions: [] };
  }
  const fuse = new Fuse(games, {
    keys: [
      { name: "title", weight: 0.8 },
      { name: "developer", weight: 0.1 },
      { name: "publisher", weight: 0.1 }
    ],
    threshold: 0.4,
    distance: 100,
    includeScore: true
  });
  const results = fuse.search(q, { limit });
  const suggestions = results.map((result) => ({
    id: result.item.id,
    title: result.item.title,
    slug: result.item.slug,
    image: result.item.image
  }));
  return { suggestions };
});

export { autocomplete_get as default };
//# sourceMappingURL=autocomplete.get.mjs.map
