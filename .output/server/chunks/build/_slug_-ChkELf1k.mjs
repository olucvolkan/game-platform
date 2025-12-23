import { _ as __nuxt_component_0 } from './nuxt-link-ZS8td75b.mjs';
import { defineComponent, computed, withAsyncContext, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { a as useRoute, u as useHead } from './server.mjs';
import { u as useLanguage, c as useCart, b as useFavorites } from './useFavorites-JNEiDxdH.mjs';
import { u as useFetch } from './fetch-DCkgsUEy.mjs';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { formatPrice } = useLanguage();
    const { isInCart } = useCart();
    const { isFavorite } = useFavorites();
    const slug = computed(() => route.params.slug);
    const { data: game, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/games/${slug.value}`, "$m1kpQZQexn")), __temp = await __temp, __restore(), __temp);
    const inCart = computed(() => game.value ? isInCart(game.value.id) : false);
    const inFavorites = computed(() => game.value ? isFavorite(game.value.id) : false);
    const selectedScreenshot = ref(0);
    useHead({
      title: computed(() => game.value ? `${game.value.title} - Eneba` : "Loading...")
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="flex items-center justify-center min-h-[50vh]"><div class="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div></div>`);
      } else if (unref(error) || !unref(game)) {
        _push(`<div class="text-center py-16"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h2 class="text-white text-xl font-medium mb-2">Game Not Found</h2><p class="text-muted mb-6">The game you&#39;re looking for doesn&#39;t exist.</p>`);
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
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4"><div class="relative aspect-video rounded-lg overflow-hidden bg-card"><img${ssrRenderAttr("src", ((_a = unref(game).screenshots) == null ? void 0 : _a[unref(selectedScreenshot)]) || unref(game).image)}${ssrRenderAttr("alt", unref(game).title)} class="w-full h-full object-cover"><div class="absolute top-4 left-4 flex gap-2">`);
        if (unref(game).discount > 0) {
          _push(`<span class="badge badge-discount text-sm"> -${ssrInterpolate(unref(game).discount)}% </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(game).hasCashback) {
          _push(`<span class="badge badge-cashback text-sm">${ssrInterpolate(unref(game).cashbackPercent)}% Cashback </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if ((_b = unref(game).screenshots) == null ? void 0 : _b.length) {
          _push(`<div class="flex gap-2 overflow-x-auto scrollbar-hide"><!--[-->`);
          ssrRenderList(unref(game).screenshots, (screenshot, index) => {
            _push(`<button class="${ssrRenderClass([unref(selectedScreenshot) === index ? "border-accent" : "border-transparent opacity-70 hover:opacity-100", "shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all"])}"><img${ssrRenderAttr("src", screenshot)}${ssrRenderAttr("alt", `Screenshot ${index + 1}`)} class="w-full h-full object-cover"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-card rounded-lg p-6"><h2 class="text-white text-lg font-medium mb-4">About this game</h2><p class="text-muted leading-relaxed">${ssrInterpolate(unref(game).description)}</p></div><div class="bg-card rounded-lg p-6"><h2 class="text-white text-lg font-medium mb-4">Game Details</h2><dl class="grid grid-cols-2 gap-4"><div><dt class="text-muted text-sm">Developer</dt><dd class="text-white">${ssrInterpolate(unref(game).developer || "Unknown")}</dd></div><div><dt class="text-muted text-sm">Publisher</dt><dd class="text-white">${ssrInterpolate(unref(game).publisher || "Unknown")}</dd></div><div><dt class="text-muted text-sm">Release Date</dt><dd class="text-white">${ssrInterpolate(unref(game).releaseDate || "Unknown")}</dd></div><div><dt class="text-muted text-sm">Platform</dt><dd class="text-white">${ssrInterpolate(unref(game).platform)}</dd></div><div><dt class="text-muted text-sm">Region</dt><dd class="text-accent">${ssrInterpolate(unref(game).region)}</dd></div><div><dt class="text-muted text-sm">Type</dt><dd class="text-white">${ssrInterpolate(unref(game).productType)}</dd></div></dl>`);
        if ((_c = unref(game).genres) == null ? void 0 : _c.length) {
          _push(`<div class="mt-4"><dt class="text-muted text-sm mb-2">Genres</dt><dd class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(game).genres, (genre) => {
            _push(`<span class="tag">${ssrInterpolate(genre)}</span>`);
          });
          _push(`<!--]--></dd></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="lg:col-span-1"><div class="sticky top-24 bg-card rounded-lg p-6 space-y-6"><div><h1 class="text-white text-xl font-bold mb-2">${ssrInterpolate(unref(game).title)}</h1><div class="flex items-center gap-2 text-sm"><span class="text-muted">${ssrInterpolate(unref(game).platform)}</span><span class="text-muted">|</span><span class="text-accent">${ssrInterpolate(unref(game).region)}</span></div></div><div class="flex items-end gap-3"><span class="text-white text-3xl font-bold">${ssrInterpolate(unref(formatPrice)(unref(game).price))}</span>`);
        if (unref(game).discount > 0) {
          _push(`<span class="text-muted text-lg line-through">${ssrInterpolate(unref(formatPrice)(unref(game).originalPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(game).hasCashback) {
          _push(`<div class="bg-accent/10 border border-accent/30 rounded-lg p-4"><div class="flex items-center gap-2 text-accent"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="font-medium">Up to ${ssrInterpolate(unref(game).cashbackPercent)}% Cashback</span></div><p class="text-muted text-sm mt-1"> Get up to ${ssrInterpolate(unref(formatPrice)(unref(game).price * unref(game).cashbackPercent / 100))} back! </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-3"><button class="${ssrRenderClass([unref(inCart) ? "bg-green-500 text-white" : "btn-primary", "w-full btn text-lg py-3"])}">${ssrInterpolate(unref(inCart) ? "Added to Cart" : "Add to Cart")}</button><button class="w-full btn btn-outline flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg"${ssrRenderAttr("fill", unref(inFavorites) ? "currentColor" : "none")} class="${ssrRenderClass([unref(inFavorites) ? "text-red-500" : "", "h-5 w-5"])}" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> ${ssrInterpolate(unref(inFavorites) ? "Remove from Wishlist" : "Add to Wishlist")}</button></div><div class="border-t border-white/10 pt-6 space-y-3"><div class="flex items-center gap-3 text-muted text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span>Secure Payment</span></div><div class="flex items-center gap-3 text-muted text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span>Instant Delivery</span></div><div class="flex items-center gap-3 text-muted text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span>24/7 Support</span></div></div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/game/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-ChkELf1k.mjs.map
