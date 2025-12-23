
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

interface _GlobalComponents {
  'FooterAppFooter': typeof import("../../components/footer/AppFooter.vue").default
  'FooterPaymentMethods': typeof import("../../components/footer/PaymentMethods.vue").default
  'HeaderAppHeader': typeof import("../../components/header/AppHeader.vue").default
  'HeaderCartPopup': typeof import("../../components/header/CartPopup.vue").default
  'HeaderLogo': typeof import("../../components/header/Logo.vue").default
  'HeaderNavigation': typeof import("../../components/header/Navigation.vue").default
  'HeaderRegionSelector': typeof import("../../components/header/RegionSelector.vue").default
  'HeaderSearchBar': typeof import("../../components/header/SearchBar.vue").default
  'HeaderUserActions': typeof import("../../components/header/UserActions.vue").default
  'ProductActiveFilters': typeof import("../../components/product/ActiveFilters.vue").default
  'ProductCard': typeof import("../../components/product/ProductCard.vue").default
  'ProductGrid': typeof import("../../components/product/ProductGrid.vue").default
  'ProductSortDropdown': typeof import("../../components/product/SortDropdown.vue").default
  'SidebarCountryFilter': typeof import("../../components/sidebar/CountryFilter.vue").default
  'SidebarFilterSidebar': typeof import("../../components/sidebar/FilterSidebar.vue").default
  'SidebarGenreFilter': typeof import("../../components/sidebar/GenreFilter.vue").default
  'SidebarPlatformFilter': typeof import("../../components/sidebar/PlatformFilter.vue").default
  'SidebarPriceFilter': typeof import("../../components/sidebar/PriceFilter.vue").default
  'SidebarProductTypeFilter': typeof import("../../components/sidebar/ProductTypeFilter.vue").default
  'UiPagination': typeof import("../../components/ui/Pagination.vue").default
  'UiPlatformIcon': typeof import("../../components/ui/PlatformIcon.vue").default
  'UiPromoWidget': typeof import("../../components/ui/PromoWidget.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyFooterAppFooter': LazyComponent<typeof import("../../components/footer/AppFooter.vue").default>
  'LazyFooterPaymentMethods': LazyComponent<typeof import("../../components/footer/PaymentMethods.vue").default>
  'LazyHeaderAppHeader': LazyComponent<typeof import("../../components/header/AppHeader.vue").default>
  'LazyHeaderCartPopup': LazyComponent<typeof import("../../components/header/CartPopup.vue").default>
  'LazyHeaderLogo': LazyComponent<typeof import("../../components/header/Logo.vue").default>
  'LazyHeaderNavigation': LazyComponent<typeof import("../../components/header/Navigation.vue").default>
  'LazyHeaderRegionSelector': LazyComponent<typeof import("../../components/header/RegionSelector.vue").default>
  'LazyHeaderSearchBar': LazyComponent<typeof import("../../components/header/SearchBar.vue").default>
  'LazyHeaderUserActions': LazyComponent<typeof import("../../components/header/UserActions.vue").default>
  'LazyProductActiveFilters': LazyComponent<typeof import("../../components/product/ActiveFilters.vue").default>
  'LazyProductCard': LazyComponent<typeof import("../../components/product/ProductCard.vue").default>
  'LazyProductGrid': LazyComponent<typeof import("../../components/product/ProductGrid.vue").default>
  'LazyProductSortDropdown': LazyComponent<typeof import("../../components/product/SortDropdown.vue").default>
  'LazySidebarCountryFilter': LazyComponent<typeof import("../../components/sidebar/CountryFilter.vue").default>
  'LazySidebarFilterSidebar': LazyComponent<typeof import("../../components/sidebar/FilterSidebar.vue").default>
  'LazySidebarGenreFilter': LazyComponent<typeof import("../../components/sidebar/GenreFilter.vue").default>
  'LazySidebarPlatformFilter': LazyComponent<typeof import("../../components/sidebar/PlatformFilter.vue").default>
  'LazySidebarPriceFilter': LazyComponent<typeof import("../../components/sidebar/PriceFilter.vue").default>
  'LazySidebarProductTypeFilter': LazyComponent<typeof import("../../components/sidebar/ProductTypeFilter.vue").default>
  'LazyUiPagination': LazyComponent<typeof import("../../components/ui/Pagination.vue").default>
  'LazyUiPlatformIcon': LazyComponent<typeof import("../../components/ui/PlatformIcon.vue").default>
  'LazyUiPromoWidget': LazyComponent<typeof import("../../components/ui/PromoWidget.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
