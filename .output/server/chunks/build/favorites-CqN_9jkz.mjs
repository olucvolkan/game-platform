import { _ as __nuxt_component_0 } from './nuxt-link-ZS8td75b.mjs';
import { _ as _sfc_main$1 } from './ProductGrid-DEklSIZU.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { b as useFavorites, u as useLanguage } from './useFavorites-JNEiDxdH.mjs';
import { u as useHead } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const { favorites, favoritesCount } = useFavorites();
    const { t } = useLanguage();
    useHead({
      title: "My Wishlist - Eneba"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProductGrid = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl md:text-3xl font-bold text-white">${ssrInterpolate(unref(t)("favorites"))}</h1><p class="text-muted mt-1">${ssrInterpolate(unref(favoritesCount))} ${ssrInterpolate(unref(favoritesCount) === 1 ? "item" : "items")} saved </p></div>`);
      if (unref(favoritesCount) > 0) {
        _push(`<button class="btn btn-outline text-sm"> Clear All </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(favorites).length === 0) {
        _push(`<div class="text-center py-16"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg><h2 class="text-white text-xl font-medium mb-2">Your wishlist is empty</h2><p class="text-muted mb-6">Save games you&#39;re interested in to buy later</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/list",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse Games `);
            } else {
              return [
                createTextVNode(" Browse Games ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_ProductGrid, { games: unref(favorites) }, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=favorites-CqN_9jkz.mjs.map
