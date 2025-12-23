# Fix: Game Card Height Bug

## Status
- Created: 2025-12-23 12:00
- Started: 2025-12-23 12:05
- Completed: 2025-12-23 12:10

## Issue Type
- [x] UI Bug
- [ ] API Contract Mismatch
- [ ] Backend Logic Bug
- [ ] Architecture Violation
- [ ] Best Practice Issue

## Affected Area
- [x] Frontend
- [ ] Backend
- [ ] API
- [ ] Documentation

## Problem Statement
Game cards were displaying with excessive height. The card image container's aspect ratio wasn't being properly enforced, causing images (especially platform placeholder images) to display at their natural height instead of being constrained to the 3:4 aspect ratio.

## Root Cause
The `<img>` element inside the aspect-ratio container was using `w-full h-full object-cover` but without absolute positioning. When the parent uses `aspect-ratio`, the child elements need to be absolutely positioned within it to properly fill and be clipped by the container. The `overflow-hidden` on the parent was not effective because the image was part of the normal document flow.

## Proposed Solution
1. Add `absolute inset-0` to the image to position it absolutely within the aspect-ratio container
2. Add `bg-primary-900` as a fallback background for loading states or missing images

## Implementation Details
Changed ProductCard.vue image container:
- Before: `<img class="w-full h-full object-cover ...">`
- After: `<img class="absolute inset-0 w-full h-full object-cover ...">`
- Added `bg-primary-900` to the container div for fallback background

## Files Affected
- `/frontend/components/product/ProductCard.vue`

## Assigned Agents
- [x] @vue-nuxt-expert

## Follow-up Recommendations
- Consider adding an `@error` handler to display a fallback placeholder when images fail to load
- May want to add loading skeleton animation while images load
