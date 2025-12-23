
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AuthModal: typeof import("../components/auth/AuthModal.vue").default
export const FooterAppFooter: typeof import("../components/footer/AppFooter.vue").default
export const FooterPaymentMethods: typeof import("../components/footer/PaymentMethods.vue").default
export const HeaderAppHeader: typeof import("../components/header/AppHeader.vue").default
export const HeaderCartPopup: typeof import("../components/header/CartPopup.vue").default
export const HeaderLogo: typeof import("../components/header/Logo.vue").default
export const HeaderRegionSelector: typeof import("../components/header/RegionSelector.vue").default
export const HeaderSearchBar: typeof import("../components/header/SearchBar.vue").default
export const HeaderUserActions: typeof import("../components/header/UserActions.vue").default
export const ProductActiveFilters: typeof import("../components/product/ActiveFilters.vue").default
export const ProductCard: typeof import("../components/product/ProductCard.vue").default
export const ProductGrid: typeof import("../components/product/ProductGrid.vue").default
export const ProductSortDropdown: typeof import("../components/product/SortDropdown.vue").default
export const SidebarCountryFilter: typeof import("../components/sidebar/CountryFilter.vue").default
export const SidebarFilterSidebar: typeof import("../components/sidebar/FilterSidebar.vue").default
export const SidebarGenreFilter: typeof import("../components/sidebar/GenreFilter.vue").default
export const SidebarPlatformFilter: typeof import("../components/sidebar/PlatformFilter.vue").default
export const SidebarPriceFilter: typeof import("../components/sidebar/PriceFilter.vue").default
export const SidebarProductTypeFilter: typeof import("../components/sidebar/ProductTypeFilter.vue").default
export const UiPagination: typeof import("../components/ui/Pagination.vue").default
export const UiPlatformIcon: typeof import("../components/ui/PlatformIcon.vue").default
export const UiPromoWidget: typeof import("../components/ui/PromoWidget.vue").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyAuthModal: LazyComponent<typeof import("../components/auth/AuthModal.vue").default>
export const LazyFooterAppFooter: LazyComponent<typeof import("../components/footer/AppFooter.vue").default>
export const LazyFooterPaymentMethods: LazyComponent<typeof import("../components/footer/PaymentMethods.vue").default>
export const LazyHeaderAppHeader: LazyComponent<typeof import("../components/header/AppHeader.vue").default>
export const LazyHeaderCartPopup: LazyComponent<typeof import("../components/header/CartPopup.vue").default>
export const LazyHeaderLogo: LazyComponent<typeof import("../components/header/Logo.vue").default>
export const LazyHeaderRegionSelector: LazyComponent<typeof import("../components/header/RegionSelector.vue").default>
export const LazyHeaderSearchBar: LazyComponent<typeof import("../components/header/SearchBar.vue").default>
export const LazyHeaderUserActions: LazyComponent<typeof import("../components/header/UserActions.vue").default>
export const LazyProductActiveFilters: LazyComponent<typeof import("../components/product/ActiveFilters.vue").default>
export const LazyProductCard: LazyComponent<typeof import("../components/product/ProductCard.vue").default>
export const LazyProductGrid: LazyComponent<typeof import("../components/product/ProductGrid.vue").default>
export const LazyProductSortDropdown: LazyComponent<typeof import("../components/product/SortDropdown.vue").default>
export const LazySidebarCountryFilter: LazyComponent<typeof import("../components/sidebar/CountryFilter.vue").default>
export const LazySidebarFilterSidebar: LazyComponent<typeof import("../components/sidebar/FilterSidebar.vue").default>
export const LazySidebarGenreFilter: LazyComponent<typeof import("../components/sidebar/GenreFilter.vue").default>
export const LazySidebarPlatformFilter: LazyComponent<typeof import("../components/sidebar/PlatformFilter.vue").default>
export const LazySidebarPriceFilter: LazyComponent<typeof import("../components/sidebar/PriceFilter.vue").default>
export const LazySidebarProductTypeFilter: LazyComponent<typeof import("../components/sidebar/ProductTypeFilter.vue").default>
export const LazyUiPagination: LazyComponent<typeof import("../components/ui/Pagination.vue").default>
export const LazyUiPlatformIcon: LazyComponent<typeof import("../components/ui/PlatformIcon.vue").default>
export const LazyUiPromoWidget: LazyComponent<typeof import("../components/ui/PromoWidget.vue").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
