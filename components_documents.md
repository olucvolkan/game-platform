# Page Component Breakdown & Implementation Guide

This document provides a detailed breakdown of the components required to implement the Eneba clone page. It analyzes the existing structure to help you understand how to recreate or modify it.

## 1. Global Structure (`App.jsx`)
The application is wrapped in a main layout that handles global styles (font family `Metropolis`, background color `#4618ac`) and delayed script execution for performance.

- **Main Container**: `<div id="app">` - Holds the Header, Main Content, and Footer.
- **Floating Elements**:
  - `Component_4`: Fixed side widget (e.g., "Spin the Wheel" or promo).
  - `Component_5`: Bottom-left notification (e.g., Cookie consent).

---

## 2. Header Section (`Component_1`)
Located at the top, sticky or static depending on scroll.
**Path**: `src/components/Component_1.jsx`

### Core Elements:
1.  **Logo**: Directly embedded `<img>` in `Component_1` pointing to `logoFull.svg`.
2.  **Search Bar (`Component_1_1`)**:
    -   **Function**: Main game search input.
    -   **UI**: Flex container with a search icon (SVG), text input, and clear button.
    -   **Visuals**: Transparent background, white text/border.
3.  **Region/Language Selector (`Component_1_2`)**:
    -   **Function**: Button to switch currency and language.
    -   **UI**: Displays a flag (e.g., Germany/Turkey), Language Name ("Türkçe"), and Currency ("EUR").
4.  **User Actions (`Component_1`)**:
    -   **Wishlist Icon**: SVG Heart icon.
    -   **Cart Icon**: SVG Basket icon with badge support.
5.  **Authentication (`Component_1_3`)**:
    -   **Function**: Login / Register links.
    -   **Sub-component**: `Component_1_3_1` (likely User Menu/Avatar if logged in).
6.  **Navigation Menu (`Component_1_4`)**:
    -   **Function**: Main categorization links.
    -   **Items**: "Kategoriler", "Ucuz Oyunlar", "Hediye Kartları", "Surfshark", etc.
    -   **Style**: Darker purple background (`bg-[rgba(0,0,0,0.25)]`), horizontal list.

---

## 3. Main Content (`Component_2`)
The core page area displaying the product listing.
**Path**: `src/components/Component_2.jsx`

### Layout:
-   **Grid Layout**: Split into Sidebar (220px) and Content (Fluid).
-   **Header**: Page Title ("Oyunlar, Hediye Kartları...").

### 3.1 Sidebar & Filters (`Component_2_1`)
**Path**: `src/components/Component_2_1.jsx`
-   **Container**: Deep purple background (`#4618ac`).
-   **Filter Sections**: Collapsible accordions for various attributes.
    -   **Price Range**: Min/Max input fields.
    -   **Country (`Component_2_1_8`...)**: List of countries with checkboxes.
    -   **Product Type**: Game, Gift Card, DLC, etc.
    -   **Operating System**: Windows, Mac, Linux.
    -   **Platforms**: Steam, Xbox, PSN, etc.
    -   **Genres**: Action, Adventure, RPG, etc. (Includes a mini-search bar for genres).
    -   **Regions**: Global, Europe, etc.

### 3.2 Active Filters (`Component_2_2`)
**Path**: `src/components/Component_2_2.jsx`
-   Displays currently selected filters (tags).
-   **"Clear All"** button.
-   **Visuals**: Tags are rounded, purple background (`#2c0e6c`).

### 3.3 Product Grid (`Component_2_3`)
**Path**: `src/components/Component_2_3.jsx`
-   **Controls**: "Results found" count and "Sort By" dropdown (Popularity).
-   **Grid**: 4-column layout (`grid-cols-[repeat(4,1fr)]`).
-   **Product Cards (`Component_2_3_2` to `Component_2_3_9`)**:
    -   Each card displays: Image, Title, Price, Discount badge.
    -   **Hover Effect**: "Add to Wishlist" heart icon appears on hover (`opacity-0` -> `opacity-100`).

### 3.4 Pagination (`Component_2_4`)
**Path**: `src/components/Component_2_4.jsx`
-   Standard pagination controls: Prev, Page Numbers (1, 2, 3...), Next.
-   **Style**: Minimalist, white text.

---

## 4. Footer Section (`Component_3`)
**Path**: `src/components/Component_3.jsx`

### 4.1 Payment Methods (`Component_3_1`)
-   **Style**: White background strip.
-   **Content**: Logos of Visa, Mastercard, PayPal, Google Pay, Crypto, etc.

### 4.2 Main Footer (`Component_3_2`)
-   **Background**: Dark overlay (`bg-[rgba(0,0,0,0.7)]`).
-   **Columns**:
    -   **Internal Links**: About Us, Contact, Careers.
    -   **Social Media**: Icons for Discord, Facebook, Twitter, Instagram.
    -   **Legal**: Terms of Service, Privacy Policy.

---

## 5. Implementation Notes for "Exact Clone"

To implement this exactly:
1.  **Tailwind Config**: Ensure you use the specific colors:
    -   Background: `#4618ac` (Deep Purple)
    -   Filter Background: `#5825cc`
    -   Accent Yellow: `#fad318` (Buttons/Highlights)
    -   Text: White (`#ffffff`) and Muted Purple (`#b3aac9`).
2.  **Icons**: The current implementation uses inline SVGs. You can replace these with `lucide-react` icons for easier maintenance, or keep the SVGs for exact visual matching.
3.  **Fonts**: The site uses `Metropolis`. You may need to import this font or use a similar sans-serif alternative like `Inter`.
4.  **Responsive Design**:
    -   The Sidebar (`Component_2_1`) is likely hidden or becomes an off-canvas drawer on mobile.
    -   The Product Grid (`Component_2_3`) should switch from 4 columns to 2 or 1 on smaller screens.