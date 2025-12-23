import { _ as __nuxt_component_0 } from './nuxt-link-ZS8td75b.mjs';
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, ref, createBlock, openBlock, createVNode, createCommentVNode, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import Fuse from 'fuse.js';
import { u as useLanguage, b as useFavorites, c as useCart, a as useState } from './useFavorites-JNEiDxdH.mjs';
import { b as useRouter } from './server.mjs';
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

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Logo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: "/",
        class: "flex items-center shrink-0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 112 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-auto"${_scopeId}><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="#4ADE80"${_scopeId}></path><path d="M12 8h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" fill="#22C55E"${_scopeId}></path><path d="M14 12h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" fill="#16A34A"${_scopeId}></path><text x="40" y="22" fill="white" font-family="Metropolis, Inter, sans-serif" font-size="18" font-weight="600"${_scopeId}> eneba </text></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 112 32",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-8 w-auto"
              }, [
                createVNode("path", {
                  d: "M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z",
                  fill: "#4ADE80"
                }),
                createVNode("path", {
                  d: "M12 8h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z",
                  fill: "#22C55E"
                }),
                createVNode("path", {
                  d: "M14 12h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z",
                  fill: "#16A34A"
                }),
                createVNode("text", {
                  x: "40",
                  y: "22",
                  fill: "white",
                  "font-family": "Metropolis, Inter, sans-serif",
                  "font-size": "18",
                  "font-weight": "600"
                }, " eneba ")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/Logo.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const useSearch = () => {
  const searchQuery = useState("searchQuery", () => "");
  const searchResults = useState("searchResults", () => []);
  const isSearching = useState("isSearching", () => false);
  const fuseOptions = {
    keys: [
      { name: "title", weight: 0.7 },
      { name: "developer", weight: 0.15 },
      { name: "publisher", weight: 0.1 },
      { name: "genres", weight: 0.05 }
    ],
    threshold: 0.4,
    // Lower = more strict matching
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2
  };
  let fuseInstance = null;
  const initializeFuse = (games) => {
    fuseInstance = new Fuse(games, fuseOptions);
  };
  const search = (query, games) => {
    if (!query || query.length < 2) {
      return games;
    }
    if (!fuseInstance) {
      initializeFuse(games);
    }
    const results = fuseInstance.search(query);
    return results.map((result) => result.item);
  };
  const getAutocomplete = (query, games, limit = 10) => {
    if (!query || query.length < 2) {
      return [];
    }
    if (!fuseInstance) {
      initializeFuse(games);
    }
    const results = fuseInstance.search(query, { limit });
    return results.map((result) => ({
      id: result.item.id,
      title: result.item.title,
      slug: result.item.slug,
      image: result.item.image
    }));
  };
  const synonyms = {
    "gta": ["grand theft auto"],
    "gta 5": ["gta v", "grand theft auto 5", "grand theft auto v"],
    "cod": ["call of duty"],
    "fifa": ["ea fc", "ea sports fc"],
    "pubg": ["playerunknown's battlegrounds"],
    "lol": ["league of legends"],
    "cs": ["counter-strike", "csgo", "cs2", "counter strike"],
    "wow": ["world of warcraft"],
    "mc": ["minecraft"],
    "rdr": ["red dead redemption"],
    "ac": ["assassin's creed", "assassins creed"]
  };
  const expandQueryWithSynonyms = (query) => {
    const lowerQuery = query.toLowerCase();
    const queries = [query];
    for (const [key, values] of Object.entries(synonyms)) {
      if (lowerQuery.includes(key)) {
        values.forEach((synonym) => {
          queries.push(query.replace(new RegExp(key, "gi"), synonym));
        });
      }
      values.forEach((synonym) => {
        if (lowerQuery.includes(synonym)) {
          queries.push(query.replace(new RegExp(synonym, "gi"), key));
        }
      });
    }
    return [...new Set(queries)];
  };
  const searchWithSynonyms = (query, games) => {
    const expandedQueries = expandQueryWithSynonyms(query);
    const allResults = [];
    const seenIds = /* @__PURE__ */ new Set();
    for (const q of expandedQueries) {
      const results = search(q, games);
      for (const game of results) {
        if (!seenIds.has(game.id)) {
          seenIds.add(game.id);
          allResults.push(game);
        }
      }
    }
    return allResults;
  };
  return {
    searchQuery,
    searchResults,
    isSearching,
    search,
    searchWithSynonyms,
    getAutocomplete,
    initializeFuse
  };
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const isOpen = ref(false);
    const suggestions = ref([]);
    const isLoading = ref(false);
    ref(null);
    useSearch();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-container relative" }, _attrs))}><div class="relative flex items-center"><div class="absolute left-3 text-muted pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search games, gift cards..." class="w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all">`);
      if (unref(searchQuery)) {
        _push(`<button class="absolute right-3 text-muted hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoading)) {
        _push(`<div class="absolute right-3 text-muted"><svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isOpen) && unref(suggestions).length > 0) {
        _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"><ul class="py-2"><!--[-->`);
        ssrRenderList(unref(suggestions), (suggestion) => {
          _push(`<li class="px-4 py-2 hover:bg-white/10 cursor-pointer transition-colors"><div class="flex items-center gap-3">`);
          if (suggestion.image) {
            _push(`<img${ssrRenderAttr("src", suggestion.image)}${ssrRenderAttr("alt", suggestion.title)} class="w-10 h-10 object-cover rounded">`);
          } else {
            _push(`<div class="w-10 h-10 bg-white/10 rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`);
          }
          _push(`<span class="text-white">${ssrInterpolate(suggestion.title)}</span></div></li>`);
        });
        _push(`<!--]--></ul><div class="border-t border-white/10 px-4 py-3"><button class="w-full text-center text-accent hover:text-accent-400 text-sm font-medium transition-colors"> View all results for &quot;${ssrInterpolate(unref(searchQuery))}&quot; </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/SearchBar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "RegionSelector",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentLanguage, currentCurrency, languages, currencies } = useLanguage();
    const isOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "region-selector relative" }, _attrs))}><button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"><span class="text-lg">${ssrInterpolate(unref(currentLanguage).flag)}</span><span class="text-sm text-white">${ssrInterpolate(unref(currentLanguage).name)} | ${ssrInterpolate(unref(currentCurrency).code)}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": unref(isOpen) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (unref(isOpen)) {
        _push(`<div class="absolute top-full right-0 mt-2 w-64 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"><div class="p-4 border-b border-white/10"><h3 class="text-sm font-medium text-muted mb-3">Language</h3><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(languages), (lang) => {
          _push(`<button class="${ssrRenderClass([[
            unref(currentLanguage).code === lang.code ? "bg-accent/20 text-accent" : "hover:bg-white/10 text-white"
          ], "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"])}"><span class="text-lg">${ssrInterpolate(lang.flag)}</span><span>${ssrInterpolate(lang.nativeName)}</span>`);
          if (unref(currentLanguage).code === lang.code) {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div><div class="p-4"><h3 class="text-sm font-medium text-muted mb-3">Currency</h3><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(currencies), (curr) => {
          _push(`<button class="${ssrRenderClass([[
            unref(currentCurrency).code === curr.code ? "bg-accent/20 text-accent" : "hover:bg-white/10 text-white"
          ], "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"])}"><span class="font-medium">${ssrInterpolate(curr.symbol)}</span><span>${ssrInterpolate(curr.name)}</span>`);
          if (unref(currentCurrency).code === curr.code) {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/RegionSelector.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "CartPopup",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart, isCartOpen, total, itemCount, formatPrice } = useCart();
    useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(isCartOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "cart-popup-container absolute top-full right-0 mt-2 w-80 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50" }, _attrs))}><div class="p-4 border-b border-white/10"><h3 class="text-white font-medium"> Shopping Cart <span class="text-muted text-sm">(${ssrInterpolate(unref(itemCount))} items)</span></h3></div>`);
        if (unref(cart).items.length === 0) {
          _push(`<div class="p-8 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><p class="text-muted">Your cart is empty</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/list",
            class: "inline-block mt-4 btn btn-primary text-sm"
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
          _push(`<div class="max-h-64 overflow-y-auto scrollbar-hide"><!--[-->`);
          ssrRenderList(unref(cart).items, (item) => {
            _push(`<div class="p-4 border-b border-white/5 hover:bg-white/5 transition-colors"><div class="flex gap-3"><img${ssrRenderAttr("src", item.game.image)}${ssrRenderAttr("alt", item.game.title)} class="w-16 h-16 object-cover rounded"><div class="flex-1 min-w-0"><h4 class="text-white text-sm font-medium truncate">${ssrInterpolate(item.game.title)}</h4><p class="text-muted text-xs mt-1">${ssrInterpolate(item.game.platform)} - ${ssrInterpolate(item.game.region)}</p><div class="flex items-center justify-between mt-2"><span class="text-accent font-medium">${ssrInterpolate(unref(formatPrice)(item.game.price))}</span><button class="text-muted hover:text-red-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        if (unref(cart).items.length > 0) {
          _push(`<div class="p-4 bg-primary-950/50"><div class="flex items-center justify-between mb-4"><span class="text-muted">Total:</span><span class="text-white text-lg font-bold">${ssrInterpolate(unref(formatPrice)(unref(total)))}</span></div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/checkout",
            class: "block w-full btn btn-primary text-center",
            onClick: ($event) => isCartOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Proceed to Checkout `);
              } else {
                return [
                  createTextVNode(" Proceed to Checkout ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/CartPopup.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "UserActions",
  __ssrInlineRender: true,
  setup(__props) {
    const { favoritesCount } = useFavorites();
    const { itemCount } = useCart();
    const { t } = useLanguage();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_HeaderCartPopup = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favorites",
        class: "relative p-2 rounded-lg hover:bg-white/10 transition-colors",
        title: unref(t)("favorites")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg>`);
            if (unref(favoritesCount) > 0) {
              _push2(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center justify-center"${_scopeId}>${ssrInterpolate(unref(favoritesCount) > 99 ? "99+" : unref(favoritesCount))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-6 w-6 text-white",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                })
              ])),
              unref(favoritesCount) > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center justify-center"
              }, toDisplayString(unref(favoritesCount) > 99 ? "99+" : unref(favoritesCount)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative"><button class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"${ssrRenderAttr("title", unref(t)("cart"))}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`);
      if (unref(itemCount) > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-950 text-xs font-bold rounded-full flex items-center justify-center">${ssrInterpolate(unref(itemCount) > 99 ? "99+" : unref(itemCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_HeaderCartPopup, null, null, _parent));
      _push(`</div><div class="flex items-center gap-2 ml-2 pl-2 border-l border-white/20"><button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span class="hidden sm:inline">${ssrInterpolate(unref(t)("login"))} | ${ssrInterpolate(unref(t)("register"))}</span></button></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/UserActions.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLanguage();
    const navItems = computed(() => [
      { label: t("categories"), href: "#", icon: "menu" },
      { label: t("cheapGames"), href: "/list?sort=price-asc" },
      { label: t("randomKeys"), href: "/list?type=random", highlight: true },
      { label: t("giftCards"), href: "/list?type=gift-card" },
      { label: "Surfshark", href: "/surfshark" },
      { label: t("steamGiftCards"), href: "/list?platform=steam&type=gift-card" },
      { label: t("christmasGifts"), href: "/christmas" },
      { label: t("winterSale"), href: "/winter-sale", highlight: true, badge: "HOT" }
    ]);
    const isMobileMenuOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-black/25" }, _attrs))}><div class="max-w-container mx-auto px-4"><div class="flex items-center h-12"><button class="lg:hidden p-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><ul class="hidden lg:flex items-center gap-1"><!--[-->`);
      ssrRenderList(unref(navItems), (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.href,
          class: ["flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors", [
            item.highlight ? "bg-accent text-primary-950 hover:bg-accent-400" : "text-white hover:bg-white/10"
          ]]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.icon === "menu") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"${_scopeId}></path></svg>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(item.label)} `);
              if (item.badge) {
                _push2(`<span class="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                item.icon === "menu" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "h-4 w-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 6h16M4 12h16M4 18h16"
                  })
                ])) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(item.label) + " ", 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
      if (unref(isMobileMenuOpen)) {
        _push(`<div class="lg:hidden pb-4"><ul class="space-y-1"><!--[-->`);
        ssrRenderList(unref(navItems), (item) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.href,
            class: ["flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-colors", [
              item.highlight ? "bg-accent text-primary-950" : "text-white hover:bg-white/10"
            ]],
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.label)} `);
                if (item.badge) {
                  _push2(`<span class="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
              } else {
                return [
                  createTextVNode(toDisplayString(item.label) + " ", 1),
                  item.badge ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "px-1.5 py-0.5 bg-red-500 text-white text-xs rounded"
                  }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/Navigation.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderLogo = _sfc_main$a;
      const _component_HeaderSearchBar = _sfc_main$9;
      const _component_HeaderRegionSelector = _sfc_main$8;
      const _component_HeaderUserActions = _sfc_main$6;
      const _component_HeaderNavigation = _sfc_main$5;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50 bg-primary" }, _attrs))}><div class="border-b border-white/10"><div class="max-w-container mx-auto px-4"><div class="flex items-center justify-between h-16 gap-4">`);
      _push(ssrRenderComponent(_component_HeaderLogo, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderSearchBar, { class: "flex-1 max-w-2xl" }, null, _parent));
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_HeaderRegionSelector, null, null, _parent));
      _push(ssrRenderComponent(_component_HeaderUserActions, null, null, _parent));
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_HeaderNavigation, null, null, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/header/AppHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethods",
  __ssrInlineRender: true,
  setup(__props) {
    const paymentMethods = [
      { name: "Visa", icon: "visa" },
      { name: "Mastercard", icon: "mastercard" },
      { name: "PayPal", icon: "paypal" },
      { name: "Apple Pay", icon: "apple-pay" },
      { name: "Google Pay", icon: "google-pay" },
      { name: "Crypto", icon: "crypto" },
      { name: "Klarna", icon: "klarna" },
      { name: "Skrill", icon: "skrill" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white py-4" }, _attrs))}><div class="max-w-container mx-auto px-4"><div class="flex items-center justify-center gap-6 flex-wrap"><!--[-->`);
      ssrRenderList(paymentMethods, (method) => {
        _push(`<div class="h-8 flex items-center">`);
        if (method.icon === "visa") {
          _push(`<svg class="h-6" viewBox="0 0 48 16" fill="none"><path d="M17.5 1L14 15H10.5L14 1H17.5Z" fill="#1A1F71"></path><path d="M30.5 1.5C29.5 1 28 1 26.5 1H21L17.5 15H21L22 11H26C28 11 29.5 10.5 30.5 9L33 1.5H30.5Z" fill="#1A1F71"></path><path d="M10 1L6 10.5L5.5 8L4 2C4 1.5 3.5 1 3 1H0V1.5C2 2 3.5 2.5 5 3.5L8 15H12L17.5 1H10Z" fill="#1A1F71"></path><path d="M35 1L38.5 15H42L45 1H41L39 10L37 1H35Z" fill="#1A1F71"></path></svg>`);
        } else if (method.icon === "mastercard") {
          _push(`<svg class="h-6" viewBox="0 0 32 20" fill="none"><circle cx="12" cy="10" r="8" fill="#EB001B"></circle><circle cx="20" cy="10" r="8" fill="#F79E1B"></circle><path d="M16 4C17.5 5.5 18.5 7.5 18.5 10C18.5 12.5 17.5 14.5 16 16C14.5 14.5 13.5 12.5 13.5 10C13.5 7.5 14.5 5.5 16 4Z" fill="#FF5F00"></path></svg>`);
        } else if (method.icon === "paypal") {
          _push(`<svg class="h-6" viewBox="0 0 48 16" fill="none"><path d="M8 1C12 1 14 2.5 14 5.5C14 9 11 11 7 11H5L4 16H1L4 1H8Z" fill="#003087"></path><path d="M18 1C22 1 24 2.5 24 5.5C24 9 21 11 17 11H15L14 16H11L14 1H18Z" fill="#009CDE"></path></svg>`);
        } else if (method.icon === "apple-pay") {
          _push(`<svg class="h-6" viewBox="0 0 48 20" fill="none"><path d="M10 4C9 4 8 5 8 6.5C8 8 9 9 10 9C11 9 12 8 12 6.5C12 5 11 4 10 4ZM10 10C7 10 5 8.5 5 6.5C5 4.5 7 3 10 3C13 3 15 4.5 15 6.5C15 8.5 13 10 10 10Z" fill="black"></path><text x="20" y="12" fill="black" font-size="8" font-weight="600">Pay</text></svg>`);
        } else if (method.icon === "google-pay") {
          _push(`<svg class="h-6" viewBox="0 0 48 20" fill="none"><path d="M8 10C8 7 10 5 13 5H16V7H13C11 7 10 8 10 10C10 12 11 13 13 13H16V15H13C10 15 8 13 8 10Z" fill="#4285F4"></path><text x="20" y="12" fill="#5F6368" font-size="7" font-weight="500">Pay</text></svg>`);
        } else if (method.icon === "crypto") {
          _push(`<svg class="h-6" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#F7931A"></circle><path d="M15 9C15 7 13.5 6 11 6V4H9V6C6.5 6 5 7.5 5 9.5C5 11.5 6.5 13 9 13V17C7.5 17 6.5 16 6.5 14.5H4.5C4.5 17 6.5 19 9 19V21H11V19C13.5 19 15 17.5 15 15.5C15 13.5 13.5 12 11 12V8C12.5 8 13 8.5 13 9.5H15V9Z" fill="white"></path></svg>`);
        } else if (method.icon === "klarna") {
          _push(`<div class="text-pink-500 font-bold text-sm"> Klarna </div>`);
        } else if (method.icon === "skrill") {
          _push(`<div class="text-purple-600 font-bold text-sm"> Skrill </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/PaymentMethods.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FooterPaymentMethods = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_FooterPaymentMethods, null, null, _parent));
      _push(`<div class="bg-overlay py-12"><div class="max-w-container mx-auto px-4"><div class="grid grid-cols-2 md:grid-cols-4 gap-8"><div><h3 class="text-white font-semibold mb-4">Company</h3><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("aboutUs"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("aboutUs")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/careers",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("careers"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("careers")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/press",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Press `);
          } else {
            return [
              createTextVNode(" Press ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h3 class="text-white font-semibold mb-4">Help</h3><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/faq",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` FAQ `);
          } else {
            return [
              createTextVNode(" FAQ ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/support",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Support Center `);
          } else {
            return [
              createTextVNode(" Support Center ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/how-to-redeem",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` How to Redeem `);
          } else {
            return [
              createTextVNode(" How to Redeem ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/refunds",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Refund Policy `);
          } else {
            return [
              createTextVNode(" Refund Policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h3 class="text-white font-semibold mb-4">Legal</h3><ul class="space-y-2"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("termsOfService"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("termsOfService")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("privacyPolicy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("privacyPolicy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cookies",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cookie Policy `);
          } else {
            return [
              createTextVNode(" Cookie Policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/legal",
        class: "text-muted hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Legal Notice `);
          } else {
            return [
              createTextVNode(" Legal Notice ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h3 class="text-white font-semibold mb-4">Follow Us</h3><div class="flex gap-3"><a href="https://discord.gg/eneba" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/20 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg></a><a href="https://facebook.com/eneba" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/20 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a><a href="https://twitter.com/eneba" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/20 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a><a href="https://instagram.com/eneba" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-white/20 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg></a></div></div></div><div class="mt-12 pt-8 border-t border-white/10"><div class="flex flex-col md:flex-row items-center justify-between gap-4"><p class="text-muted text-sm"> 2024 Eneba Clone. ${ssrInterpolate(unref(t)("allRightsReserved"))}. </p><div class="flex items-center gap-4"><span class="text-muted text-sm">Made with Vue.js + Nuxt 3</span></div></div></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PromoWidget",
  __ssrInlineRender: true,
  setup(__props) {
    const isVisible = ref(true);
    const countdown = ref({
      days: 5,
      hours: 10,
      minutes: 25,
      seconds: 33
    });
    const formatNumber = (num) => {
      return num.toString().padStart(2, "0");
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed left-0 top-1/2 -translate-y-1/2 z-40" }, _attrs))}><div class="relative bg-gradient-to-br from-accent to-accent-600 rounded-r-lg p-4 shadow-xl max-w-[140px]"><button class="absolute -top-2 -right-2 w-6 h-6 bg-primary-950 rounded-full flex items-center justify-center text-white hover:bg-primary-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="text-primary-950"><p class="text-xs font-bold leading-tight"> UP TO 25% </p><p class="text-lg font-bold leading-tight"> CASHBACK!* </p><p class="text-[10px] mt-2 opacity-80"> ENDS IN: </p><div class="flex gap-1 mt-1"><div class="bg-primary-950 text-white text-center rounded px-1 py-0.5"><div class="text-sm font-bold">${ssrInterpolate(formatNumber(unref(countdown).days))}</div><div class="text-[8px] opacity-70">DAYS</div></div><div class="bg-primary-950 text-white text-center rounded px-1 py-0.5"><div class="text-sm font-bold">${ssrInterpolate(formatNumber(unref(countdown).hours))}</div><div class="text-[8px] opacity-70">HRS</div></div><div class="bg-primary-950 text-white text-center rounded px-1 py-0.5"><div class="text-sm font-bold">${ssrInterpolate(formatNumber(unref(countdown).minutes))}</div><div class="text-[8px] opacity-70">MIN</div></div><div class="bg-primary-950 text-white text-center rounded px-1 py-0.5"><div class="text-sm font-bold">${ssrInterpolate(formatNumber(unref(countdown).seconds))}</div><div class="text-[8px] opacity-70">SEC</div></div></div><button class="w-full mt-3 bg-primary-950 text-accent text-xs font-bold py-2 rounded hover:bg-primary-800 transition-colors"> See Offers </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/PromoWidget.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderAppHeader = _sfc_main$4;
      const _component_FooterAppFooter = _sfc_main$2;
      const _component_UiPromoWidget = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-primary" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeaderAppHeader, null, null, _parent));
      _push(`<main class="flex-1"><div class="max-w-container mx-auto px-4">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      _push(ssrRenderComponent(_component_FooterAppFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_UiPromoWidget, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Bgp-OIFj.mjs.map
