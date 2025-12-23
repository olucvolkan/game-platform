import { _ as __nuxt_component_0 } from './nuxt-link-ZS8td75b.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { c as useCart, b as useFavorites, u as useLanguage } from './useFavorites-JNEiDxdH.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PlatformIcon",
  __ssrInlineRender: true,
  props: {
    platform: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.platform === "Steam") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          viewBox: "0 0 24 24",
          fill: "currentColor",
          class: "w-full h-full"
        }, _attrs))}><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>`);
      } else if (__props.platform === "Xbox") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          viewBox: "0 0 24 24",
          fill: "currentColor",
          class: "w-full h-full"
        }, _attrs))}><path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.056 17.036 24 14.62 24 12c0-5.238-3.363-9.695-8.043-11.33-.473 1.467.088 3.396 -.695 5.957zM12 4.009c1.424 0 2.398-.689 2.595-1.759C13.13.935 12.545.698 12 .698s-1.13.237-2.595 1.552C9.602 3.32 10.576 4.009 12 4.009zM2.661 19.539c-1.408-2.599 3.576-9.951 6.076-12.912-.783-2.561-.222-4.49-.695-5.957C3.363 2.305 0 6.762 0 12c0 2.62.944 5.036 2.661 7.539z"></path></svg>`);
      } else if (__props.platform === "PlayStation") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          viewBox: "0 0 24 24",
          fill: "currentColor",
          class: "w-full h-full"
        }, _attrs))}><path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.391-1.502h-.002zm4.656 16.242l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5v-2.385l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.029 5.437.661 1.848.601 2.041 1.472 1.576 2.072s-1.622 1.036-1.622 1.036l-8.544 3.107v-2.297l.02-.024zM1.348 18.611c-1.787-.597-2.084-1.835-1.269-2.545.752-.654 2.015-1.145 2.015-1.145l5.265-1.979v2.317l-3.779 1.433c-.715.258-.826.625-.246.818.586.192 1.637.139 2.357-.123l1.647-.585v2.063c-.126.027-.251.054-.379.076-1.899.309-3.936.055-5.611-.33z"></path></svg>`);
      } else if (__props.platform === "Nintendo") {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          viewBox: "0 0 24 24",
          fill: "currentColor",
          class: "w-full h-full"
        }, _attrs))}><path d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6z"></path></svg>`);
      } else {
        _push(`<svg${ssrRenderAttrs(mergeProps({
          viewBox: "0 0 24 24",
          fill: "currentColor",
          class: "w-full h-full"
        }, _attrs))}><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path></svg>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/PlatformIcon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    game: {}
  },
  setup(__props) {
    const props = __props;
    const { addToCart, isInCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { formatPrice } = useLanguage();
    const isHovered = ref(false);
    const inCart = computed(() => isInCart(props.game.id));
    const inFavorites = computed(() => isFavorite(props.game.id));
    const handleAddToCart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(props.game);
    };
    const handleToggleFavorite = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(props.game);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiPlatformIcon = _sfc_main$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/game/${__props.game.slug}`,
        class: "card group block",
        onMouseenter: ($event) => isHovered.value = true,
        onMouseleave: ($event) => isHovered.value = false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-[3/4] overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", __props.game.image)}${ssrRenderAttr("alt", __props.game.title)} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"${_scopeId}><div class="absolute top-2 left-2"${_scopeId}><span class="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded"${_scopeId}>${ssrInterpolate(__props.game.platform)}</span></div><button class="${ssrRenderClass([[
              unref(isHovered) || unref(inFavorites) ? "opacity-100" : "opacity-0",
              unref(inFavorites) ? "text-red-500" : "text-white hover:text-red-400"
            ], "absolute top-2 right-2 p-2 bg-black/50 rounded-full transition-all"])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"${ssrRenderAttr("fill", unref(inFavorites) ? "currentColor" : "none")} viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg></button>`);
            if (__props.game.hasCashback) {
              _push2(`<div class="absolute bottom-2 left-2"${_scopeId}><span class="badge badge-cashback flex items-center gap-1"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> CASHBACK </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.game.productType === "DLC") {
              _push2(`<div class="absolute bottom-2 right-2"${_scopeId}><span class="badge badge-dlc"${_scopeId}>DLC</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="p-3"${_scopeId}><div class="flex items-start gap-2 mb-2"${_scopeId}><div class="shrink-0 mt-0.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiPlatformIcon, {
              platform: __props.game.platform,
              class: "w-4 h-4 text-muted"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="text-white text-sm font-medium line-clamp-2 leading-tight"${_scopeId}>${ssrInterpolate(__props.game.title)}</h3></div><p class="text-accent text-xs font-medium mb-3"${_scopeId}>${ssrInterpolate(__props.game.region)}</p><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
            if (__props.game.discount > 0) {
              _push2(`<span class="badge badge-discount"${_scopeId}> -${ssrInterpolate(__props.game.discount)}% </span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.game.discount > 0) {
              _push2(`<span class="text-muted text-sm line-through"${_scopeId}>${ssrInterpolate(unref(formatPrice)(__props.game.originalPrice))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><span class="text-white font-bold"${_scopeId}>${ssrInterpolate(unref(formatPrice)(__props.game.price))}</span></div>`);
            if (unref(isHovered)) {
              _push2(`<button class="${ssrRenderClass([unref(inCart) ? "bg-green-500 text-white" : "btn-primary", "w-full mt-3 btn text-sm"])}"${_scopeId}>${ssrInterpolate(unref(inCart) ? "In Cart" : "Add to Cart")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative aspect-[3/4] overflow-hidden" }, [
                createVNode("img", {
                  src: __props.game.image,
                  alt: __props.game.title,
                  class: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                  loading: "lazy"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "absolute top-2 left-2" }, [
                  createVNode("span", { class: "px-2 py-1 bg-black/70 text-white text-xs font-medium rounded" }, toDisplayString(__props.game.platform), 1)
                ]),
                createVNode("button", {
                  class: ["absolute top-2 right-2 p-2 bg-black/50 rounded-full transition-all", [
                    unref(isHovered) || unref(inFavorites) ? "opacity-100" : "opacity-0",
                    unref(inFavorites) ? "text-red-500" : "text-white hover:text-red-400"
                  ]],
                  onClick: handleToggleFavorite
                }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-5 w-5",
                    fill: unref(inFavorites) ? "currentColor" : "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    })
                  ], 8, ["fill"]))
                ], 2),
                __props.game.hasCashback ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute bottom-2 left-2"
                }, [
                  createVNode("span", { class: "badge badge-cashback flex items-center gap-1" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-3 w-3",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ])),
                    createTextVNode(" CASHBACK ")
                  ])
                ])) : createCommentVNode("", true),
                __props.game.productType === "DLC" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute bottom-2 right-2"
                }, [
                  createVNode("span", { class: "badge badge-dlc" }, "DLC")
                ])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "p-3" }, [
                createVNode("div", { class: "flex items-start gap-2 mb-2" }, [
                  createVNode("div", { class: "shrink-0 mt-0.5" }, [
                    createVNode(_component_UiPlatformIcon, {
                      platform: __props.game.platform,
                      class: "w-4 h-4 text-muted"
                    }, null, 8, ["platform"])
                  ]),
                  createVNode("h3", { class: "text-white text-sm font-medium line-clamp-2 leading-tight" }, toDisplayString(__props.game.title), 1)
                ]),
                createVNode("p", { class: "text-accent text-xs font-medium mb-3" }, toDisplayString(__props.game.region), 1),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    __props.game.discount > 0 ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "badge badge-discount"
                    }, " -" + toDisplayString(__props.game.discount) + "% ", 1)) : createCommentVNode("", true),
                    __props.game.discount > 0 ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "text-muted text-sm line-through"
                    }, toDisplayString(unref(formatPrice)(__props.game.originalPrice)), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("span", { class: "text-white font-bold" }, toDisplayString(unref(formatPrice)(__props.game.price)), 1)
                ]),
                createVNode(Transition, {
                  "enter-active-class": "transition ease-out duration-200",
                  "enter-from-class": "opacity-0 translate-y-2",
                  "enter-to-class": "opacity-100 translate-y-0",
                  "leave-active-class": "transition ease-in duration-150",
                  "leave-from-class": "opacity-100 translate-y-0",
                  "leave-to-class": "opacity-0 translate-y-2"
                }, {
                  default: withCtx(() => [
                    unref(isHovered) ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: ["w-full mt-3 btn text-sm", unref(inCart) ? "bg-green-500 text-white" : "btn-primary"],
                      onClick: handleAddToCart
                    }, toDisplayString(unref(inCart) ? "In Cart" : "Add to Cart"), 3)) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const skeletonCount = 8;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductGrid",
  __ssrInlineRender: true,
  props: {
    games: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.loading) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(skeletonCount, (i) => {
          _push(`<div class="card animate-pulse"><div class="aspect-[3/4] bg-white/10"></div><div class="p-3 space-y-3"><div class="h-4 bg-white/10 rounded w-3/4"></div><div class="h-3 bg-white/10 rounded w-1/2"></div><div class="flex justify-between"><div class="h-5 bg-white/10 rounded w-16"></div><div class="h-5 bg-white/10 rounded w-20"></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.games.length === 0) {
        _push(`<div class="text-center py-16"><svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-white text-lg font-medium mb-2">No games found</h3><p class="text-muted">Try adjusting your filters or search query</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
        ssrRenderList(__props.games, (game) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: game.id,
            game
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ProductGrid-DEklSIZU.mjs.map
