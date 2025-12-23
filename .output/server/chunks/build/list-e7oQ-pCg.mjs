import { defineComponent, watch, ref, computed, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { a as useRoute, u as useHead, b as useRouter } from './server.mjs';
import { u as useLanguage, a as useState } from './useFavorites-JNEiDxdH.mjs';
import { _ as _sfc_main$a } from './ProductGrid-DEklSIZU.mjs';
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
import './nuxt-link-ZS8td75b.mjs';
import '@vue/shared';

const useFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const filters = useState("filters", () => ({
    search: "",
    minPrice: void 0,
    maxPrice: void 0,
    countries: [],
    productTypes: [],
    platforms: [],
    genres: [],
    regions: [],
    sortBy: "popularity"
  }));
  const productTypes = [
    { value: "DLC", label: "DLC", count: 248 },
    { value: "Game", label: "Game", count: 178 },
    { value: "Game Points", label: "Game points", count: 35 },
    { value: "Subscription", label: "Subscription", count: 6 },
    { value: "Software", label: "Software", count: 2 },
    { value: "eGift Card", label: "eGift Cards", count: 1 }
  ];
  const platforms = [
    { value: "Steam", label: "Steam", count: 156 },
    { value: "Xbox", label: "Xbox", count: 89 },
    { value: "PlayStation", label: "PlayStation", count: 67 },
    { value: "Nintendo", label: "Nintendo", count: 45 },
    { value: "Epic", label: "Epic Games", count: 34 },
    { value: "Origin", label: "Origin/EA", count: 23 },
    { value: "GOG", label: "GOG", count: 18 },
    { value: "Uplay", label: "Ubisoft", count: 15 }
  ];
  const genres = [
    { value: "action", label: "Action", count: 145 },
    { value: "adventure", label: "Adventure", count: 123 },
    { value: "rpg", label: "RPG", count: 98 },
    { value: "shooter", label: "Shooter", count: 87 },
    { value: "strategy", label: "Strategy", count: 76 },
    { value: "simulation", label: "Simulation", count: 65 },
    { value: "sports", label: "Sports", count: 54 },
    { value: "racing", label: "Racing", count: 43 },
    { value: "puzzle", label: "Puzzle", count: 32 },
    { value: "horror", label: "Horror", count: 28 },
    { value: "sandbox", label: "Sandbox", count: 24 },
    { value: "survival", label: "Survival", count: 21 }
  ];
  const regions = [
    { value: "GLOBAL", label: "Global" },
    { value: "EU", label: "Europe" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "TR", label: "Turkey" },
    { value: "DE", label: "Germany" },
    { value: "LATAM", label: "Latin America" },
    { value: "ASIA", label: "Asia" }
  ];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "discount", label: "Biggest Discount" }
  ];
  const countries = [
    "All countries",
    "Germany",
    "United States",
    "United Kingdom",
    "France",
    "Turkey",
    "Poland",
    "Brazil",
    "Russia",
    "Japan"
  ];
  const initFiltersFromUrl = () => {
    const query = route.query;
    filters.value = {
      search: query.search || "",
      minPrice: query.minPrice ? Number(query.minPrice) : void 0,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : void 0,
      countries: query.countries ? query.countries.split(",") : [],
      productTypes: query.types ? query.types.split(",") : [],
      platforms: query.platforms ? query.platforms.split(",") : [],
      genres: query.genres ? query.genres.split(",") : [],
      regions: query.regions ? query.regions.split(",") : [],
      sortBy: query.sort || "popularity"
    };
  };
  const updateUrlWithFilters = () => {
    var _a, _b, _c, _d, _e;
    const query = {};
    if (filters.value.search) query.search = filters.value.search;
    if (filters.value.minPrice) query.minPrice = String(filters.value.minPrice);
    if (filters.value.maxPrice) query.maxPrice = String(filters.value.maxPrice);
    if ((_a = filters.value.countries) == null ? void 0 : _a.length) query.countries = filters.value.countries.join(",");
    if ((_b = filters.value.productTypes) == null ? void 0 : _b.length) query.types = filters.value.productTypes.join(",");
    if ((_c = filters.value.platforms) == null ? void 0 : _c.length) query.platforms = filters.value.platforms.join(",");
    if ((_d = filters.value.genres) == null ? void 0 : _d.length) query.genres = filters.value.genres.join(",");
    if ((_e = filters.value.regions) == null ? void 0 : _e.length) query.regions = filters.value.regions.join(",");
    if (filters.value.sortBy && filters.value.sortBy !== "popularity") query.sort = filters.value.sortBy;
    router.push({ query });
  };
  const setSearch = (value) => {
    filters.value.search = value;
    updateUrlWithFilters();
  };
  const setPriceRange = (min, max) => {
    filters.value.minPrice = min;
    filters.value.maxPrice = max;
    updateUrlWithFilters();
  };
  const toggleProductType = (type) => {
    var _a, _b, _c;
    const index = (_b = (_a = filters.value.productTypes) == null ? void 0 : _a.indexOf(type)) != null ? _b : -1;
    if (index === -1) {
      filters.value.productTypes = [...filters.value.productTypes || [], type];
    } else {
      filters.value.productTypes = (_c = filters.value.productTypes) == null ? void 0 : _c.filter((t) => t !== type);
    }
    updateUrlWithFilters();
  };
  const togglePlatform = (platform) => {
    var _a, _b, _c;
    const index = (_b = (_a = filters.value.platforms) == null ? void 0 : _a.indexOf(platform)) != null ? _b : -1;
    if (index === -1) {
      filters.value.platforms = [...filters.value.platforms || [], platform];
    } else {
      filters.value.platforms = (_c = filters.value.platforms) == null ? void 0 : _c.filter((p) => p !== platform);
    }
    updateUrlWithFilters();
  };
  const toggleGenre = (genre) => {
    var _a, _b, _c;
    const index = (_b = (_a = filters.value.genres) == null ? void 0 : _a.indexOf(genre)) != null ? _b : -1;
    if (index === -1) {
      filters.value.genres = [...filters.value.genres || [], genre];
    } else {
      filters.value.genres = (_c = filters.value.genres) == null ? void 0 : _c.filter((g) => g !== genre);
    }
    updateUrlWithFilters();
  };
  const setSort = (sort) => {
    filters.value.sortBy = sort;
    updateUrlWithFilters();
  };
  const setCountry = (country) => {
    if (country === "All countries") {
      filters.value.countries = [];
    } else {
      filters.value.countries = [country];
    }
    updateUrlWithFilters();
  };
  const clearAllFilters = () => {
    filters.value = {
      search: "",
      minPrice: void 0,
      maxPrice: void 0,
      countries: [],
      productTypes: [],
      platforms: [],
      genres: [],
      regions: [],
      sortBy: "popularity"
    };
    router.push({ query: {} });
  };
  const hasActiveFilters = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    return !!filters.value.search || filters.value.minPrice !== void 0 || filters.value.maxPrice !== void 0 || ((_b = (_a = filters.value.countries) == null ? void 0 : _a.length) != null ? _b : 0) > 0 || ((_d = (_c = filters.value.productTypes) == null ? void 0 : _c.length) != null ? _d : 0) > 0 || ((_f = (_e = filters.value.platforms) == null ? void 0 : _e.length) != null ? _f : 0) > 0 || ((_h = (_g = filters.value.genres) == null ? void 0 : _g.length) != null ? _h : 0) > 0 || ((_j = (_i = filters.value.regions) == null ? void 0 : _i.length) != null ? _j : 0) > 0;
  });
  const activeFilterTags = computed(() => {
    var _a, _b, _c;
    const tags = [];
    if (filters.value.search) {
      tags.push({ key: "search", label: "Text", value: filters.value.search });
    }
    (_a = filters.value.productTypes) == null ? void 0 : _a.forEach((type) => {
      tags.push({ key: `type-${type}`, label: "Type", value: type });
    });
    (_b = filters.value.platforms) == null ? void 0 : _b.forEach((platform) => {
      tags.push({ key: `platform-${platform}`, label: "Platform", value: platform });
    });
    (_c = filters.value.genres) == null ? void 0 : _c.forEach((genre) => {
      tags.push({ key: `genre-${genre}`, label: "Genre", value: genre });
    });
    return tags;
  });
  const removeFilterTag = (key) => {
    var _a, _b, _c;
    if (key === "search") {
      filters.value.search = "";
    } else if (key.startsWith("type-")) {
      const type = key.replace("type-", "");
      filters.value.productTypes = (_a = filters.value.productTypes) == null ? void 0 : _a.filter((t) => t !== type);
    } else if (key.startsWith("platform-")) {
      const platform = key.replace("platform-", "");
      filters.value.platforms = (_b = filters.value.platforms) == null ? void 0 : _b.filter((p) => p !== platform);
    } else if (key.startsWith("genre-")) {
      const genre = key.replace("genre-", "");
      filters.value.genres = (_c = filters.value.genres) == null ? void 0 : _c.filter((g) => g !== genre);
    }
    updateUrlWithFilters();
  };
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
    removeFilterTag
  };
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "PriceFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters } = useFilters();
    const { t, currentCurrency } = useLanguage();
    const isExpanded = ref(true);
    const minPrice = ref("");
    const maxPrice = ref("");
    watch(
      () => filters.value,
      (newFilters) => {
        var _a, _b, _c, _d;
        minPrice.value = (_b = (_a = newFilters.minPrice) == null ? void 0 : _a.toString()) != null ? _b : "";
        maxPrice.value = (_d = (_c = newFilters.maxPrice) == null ? void 0 : _c.toString()) != null ? _d : "";
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-section" }, _attrs))}><button class="filter-title w-full px-4"><span>${ssrInterpolate(unref(t)("priceRange"))} (${ssrInterpolate(unref(currentCurrency).code)})</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !unref(isExpanded) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button>`);
      if (unref(isExpanded)) {
        _push(`<div class="px-4 pt-3"><div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(minPrice))} type="number"${ssrRenderAttr("placeholder", unref(currentCurrency).symbol)} class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40" min="0"><span class="text-muted">-</span><input${ssrRenderAttr("value", unref(maxPrice))} type="number"${ssrRenderAttr("placeholder", unref(currentCurrency).symbol)} class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40" min="0"></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/PriceFilter.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CountryFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters, countries } = useFilters();
    const { t } = useLanguage();
    const isExpanded = ref(true);
    const selectedCountry = ref("All countries");
    watch(
      () => filters.value.countries,
      (newCountries) => {
        selectedCountry.value = (newCountries == null ? void 0 : newCountries.length) ? newCountries[0] : "All countries";
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-section" }, _attrs))}><button class="filter-title w-full px-4"><span>${ssrInterpolate(unref(t)("country"))}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !unref(isExpanded) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button>`);
      if (unref(isExpanded)) {
        _push(`<div class="px-4 pt-3"><select${ssrRenderAttr("value", unref(selectedCountry))} class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"><!--[-->`);
        ssrRenderList(unref(countries), (country) => {
          _push(`<option${ssrRenderAttr("value", country)}>${ssrInterpolate(country === "All countries" ? unref(t)("allCountries") : country)}</option>`);
        });
        _push(`<!--]--></select></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/CountryFilter.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProductTypeFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters, productTypes } = useFilters();
    const { t } = useLanguage();
    const isExpanded = ref(true);
    const isSelected = (type) => {
      var _a, _b;
      return (_b = (_a = filters.value.productTypes) == null ? void 0 : _a.includes(type)) != null ? _b : false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-section" }, _attrs))}><button class="filter-title w-full px-4"><span>${ssrInterpolate(unref(t)("productType"))}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !unref(isExpanded) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button>`);
      if (unref(isExpanded)) {
        _push(`<div class="px-4 pt-3 space-y-2"><!--[-->`);
        ssrRenderList(unref(productTypes), (type) => {
          _push(`<label class="checkbox-label"><input type="checkbox"${ssrIncludeBooleanAttr(isSelected(type.value)) ? " checked" : ""} class="w-4 h-4 rounded border-white/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0"><span class="flex-1">${ssrInterpolate(type.label)}</span><span class="text-muted text-sm">${ssrInterpolate(type.count)}</span></label>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/ProductTypeFilter.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "PlatformFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters, platforms } = useFilters();
    const { t } = useLanguage();
    const isExpanded = ref(true);
    const isSelected = (platform) => {
      var _a, _b;
      return (_b = (_a = filters.value.platforms) == null ? void 0 : _a.includes(platform)) != null ? _b : false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-section" }, _attrs))}><button class="filter-title w-full px-4"><span>${ssrInterpolate(unref(t)("platform"))}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !unref(isExpanded) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button>`);
      if (unref(isExpanded)) {
        _push(`<div class="px-4 pt-3 space-y-2"><!--[-->`);
        ssrRenderList(unref(platforms), (platform) => {
          _push(`<label class="checkbox-label"><input type="checkbox"${ssrIncludeBooleanAttr(isSelected(platform.value)) ? " checked" : ""} class="w-4 h-4 rounded border-white/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0"><span class="flex-1">${ssrInterpolate(platform.label)}</span><span class="text-muted text-sm">${ssrInterpolate(platform.count)}</span></label>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/PlatformFilter.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "GenreFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters, genres } = useFilters();
    const { t } = useLanguage();
    const isExpanded = ref(true);
    const searchQuery = ref("");
    const filteredGenres = computed(() => {
      if (!searchQuery.value) return genres;
      return genres.filter(
        (genre) => genre.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const isSelected = (genre) => {
      var _a, _b;
      return (_b = (_a = filters.value.genres) == null ? void 0 : _a.includes(genre)) != null ? _b : false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "filter-section border-b-0" }, _attrs))}><button class="filter-title w-full px-4"><span>${ssrInterpolate(unref(t)("genre"))}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": !unref(isExpanded) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button>`);
      if (unref(isExpanded)) {
        _push(`<div class="px-4 pt-3"><div class="relative mb-3"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search genres..." class="w-full px-3 py-2 bg-primary-950 border border-white/20 rounded text-white text-sm placeholder-muted focus:outline-none focus:border-white/40"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><div class="space-y-2 max-h-48 overflow-y-auto scrollbar-hide"><!--[-->`);
        ssrRenderList(unref(filteredGenres), (genre) => {
          _push(`<label class="checkbox-label"><input type="checkbox"${ssrIncludeBooleanAttr(isSelected(genre.value)) ? " checked" : ""} class="w-4 h-4 rounded border-white/30 bg-transparent text-accent focus:ring-accent focus:ring-offset-0"><span class="flex-1">${ssrInterpolate(genre.label)}</span><span class="text-muted text-sm">${ssrInterpolate(genre.count)}</span></label>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/GenreFilter.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FilterSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarPriceFilter = _sfc_main$9;
      const _component_SidebarCountryFilter = _sfc_main$8;
      const _component_SidebarProductTypeFilter = _sfc_main$7;
      const _component_SidebarPlatformFilter = _sfc_main$6;
      const _component_SidebarGenreFilter = _sfc_main$5;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-[220px] shrink-0" }, _attrs))}><div class="sticky top-20 space-y-0 bg-filter rounded-lg overflow-hidden">`);
      _push(ssrRenderComponent(_component_SidebarPriceFilter, null, null, _parent));
      _push(ssrRenderComponent(_component_SidebarCountryFilter, null, null, _parent));
      _push(ssrRenderComponent(_component_SidebarProductTypeFilter, null, null, _parent));
      _push(ssrRenderComponent(_component_SidebarPlatformFilter, null, null, _parent));
      _push(ssrRenderComponent(_component_SidebarGenreFilter, null, null, _parent));
      _push(`</div></aside>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidebar/FilterSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ActiveFilters",
  __ssrInlineRender: true,
  setup(__props) {
    const { hasActiveFilters, activeFilterTags } = useFilters();
    const { t } = useLanguage();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(hasActiveFilters)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-2 mb-4" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(activeFilterTags), (tag) => {
          _push(`<div class="tag"><span class="text-muted-light">${ssrInterpolate(tag.label)}:</span><span class="text-white">${ssrInterpolate(tag.value)}</span><button class="text-muted hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        });
        _push(`<!--]--><button class="text-accent hover:text-accent-400 text-sm font-medium transition-colors">${ssrInterpolate(unref(t)("clearAll"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ActiveFilters.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SortDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const { filters, sortOptions } = useFilters();
    const { t } = useLanguage();
    const isOpen = ref(false);
    const currentSortLabel = computed(() => {
      const option = sortOptions.find((o) => o.value === filters.value.sortBy);
      return (option == null ? void 0 : option.label) || t("popularity");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sort-dropdown relative" }, _attrs))}><button class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg><span class="text-white text-sm">${ssrInterpolate(unref(t)("sortBy"))}: <span class="font-medium">${ssrInterpolate(unref(currentSortLabel))}</span></span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": unref(isOpen) }, "h-4 w-4 text-muted transition-transform"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (unref(isOpen)) {
        _push(`<div class="absolute top-full right-0 mt-2 w-48 bg-primary-950 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"><ul class="py-1"><!--[-->`);
        ssrRenderList(unref(sortOptions), (option) => {
          _push(`<li><button class="${ssrRenderClass([[
            unref(filters).sortBy === option.value ? "bg-accent/20 text-accent" : "text-white hover:bg-white/10"
          ], "w-full px-4 py-2 text-left text-sm transition-colors"])}">${ssrInterpolate(option.label)}</button></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/SortDropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    totalItems: {}
  },
  emits: ["update:currentPage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const visiblePages = computed(() => {
      const pages = [];
      const current = props.currentPage;
      const total = props.totalPages;
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (current > 3) {
          pages.push("...");
        }
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        if (current < total - 2) {
          pages.push("...");
        }
        pages.push(total);
      }
      return pages;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.totalPages > 1) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center gap-2 mt-8" }, _attrs))}><button class="${ssrRenderClass([[
          __props.currentPage === 1 ? "text-muted cursor-not-allowed" : "text-white hover:bg-white/10"
        ], "flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"])}"${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg><span class="hidden sm:inline">Previous</span></button><div class="flex items-center gap-1"><!--[-->`);
        ssrRenderList(unref(visiblePages), (page, index) => {
          _push(`<!--[-->`);
          if (page === "...") {
            _push(`<span class="px-2 text-muted"> ... </span>`);
          } else {
            _push(`<button class="${ssrRenderClass([[
              __props.currentPage === page ? "bg-accent text-primary-950" : "text-white hover:bg-white/10"
            ], "min-w-[40px] h-10 rounded-lg font-medium transition-colors"])}">${ssrInterpolate(page)}</button>`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div><button class="${ssrRenderClass([[
          __props.currentPage === __props.totalPages ? "text-muted cursor-not-allowed" : "text-white hover:bg-white/10"
        ], "flex items-center gap-1 px-3 py-2 rounded-lg transition-colors"])}"${ssrIncludeBooleanAttr(__props.currentPage === __props.totalPages) ? " disabled" : ""}><span class="hidden sm:inline">Next</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { t } = useLanguage();
    const { initFiltersFromUrl, filters } = useFilters();
    watch(
      () => route.query,
      () => {
        initFiltersFromUrl();
      }
    );
    const currentPage = ref(1);
    const queryParams = computed(() => {
      var _a, _b, _c;
      const params = {
        page: String(currentPage.value),
        perPage: "20"
      };
      if (filters.value.search) params.search = filters.value.search;
      if (filters.value.minPrice) params.minPrice = String(filters.value.minPrice);
      if (filters.value.maxPrice) params.maxPrice = String(filters.value.maxPrice);
      if ((_a = filters.value.productTypes) == null ? void 0 : _a.length) params.types = filters.value.productTypes.join(",");
      if ((_b = filters.value.platforms) == null ? void 0 : _b.length) params.platforms = filters.value.platforms.join(",");
      if ((_c = filters.value.genres) == null ? void 0 : _c.length) params.genres = filters.value.genres.join(",");
      if (filters.value.sortBy) params.sort = filters.value.sortBy;
      return params;
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/list", {
      query: queryParams,
      watch: [queryParams]
    }, "$pKipdJxnxU")), __temp = await __temp, __restore(), __temp);
    const games = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.data) || [];
    });
    const meta = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.meta) || { total: 0, page: 1, perPage: 20, lastPage: 1 };
    });
    const updatePage = (page) => {
      currentPage.value = page;
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    };
    watch(
      () => filters.value,
      () => {
        currentPage.value = 1;
      },
      { deep: true }
    );
    useHead({
      title: filters.value.search ? `Search: ${filters.value.search} - Eneba` : "Games & Gift Cards - Eneba"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarFilterSidebar = _sfc_main$4;
      const _component_ProductActiveFilters = _sfc_main$3;
      const _component_ProductSortDropdown = _sfc_main$2;
      const _component_ProductGrid = _sfc_main$a;
      const _component_UiPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8" }, _attrs))}><h1 class="text-2xl md:text-3xl font-bold text-white mb-6">${ssrInterpolate(unref(t)("pageTitle"))}</h1><div class="flex gap-6">`);
      _push(ssrRenderComponent(_component_SidebarFilterSidebar, { class: "hidden lg:block" }, null, _parent));
      _push(`<div class="flex-1 min-w-0">`);
      _push(ssrRenderComponent(_component_ProductActiveFilters, null, null, _parent));
      _push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"><p class="text-muted">${ssrInterpolate(unref(t)("searchResults"))}: <span class="text-white font-medium">${ssrInterpolate(unref(meta).total)}</span></p>`);
      _push(ssrRenderComponent(_component_ProductSortDropdown, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProductGrid, {
        games: unref(games),
        loading: unref(pending)
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiPagination, {
        "current-page": unref(currentPage),
        "total-pages": unref(meta).lastPage,
        "total-items": unref(meta).total,
        "onUpdate:currentPage": updatePage
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-e7oQ-pCg.mjs.map
