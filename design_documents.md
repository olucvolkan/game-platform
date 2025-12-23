# Frontend Design Document: Eneba.com Clone Component

## 1. Overview
This document outlines the design and architecture of the Eneba.com clone component. The application simulates the frontend structure of the Eneba marketplace, utilizing a React-based architecture with Tailwind CSS for styling. The system is designed to replicate the visual layout and core structural elements of the original site, including the header, main product listing area, sidebar, footer, and floating widgets.

## 2. Architecture
The application follows a component-based architecture where the DOM tree is split into modular React components.

### 2.1 File Structure
- **Entry Point**: `main.jsx` initializes the React application.
- **Root Component**: `App.jsx` serves as the layout wrapper and handles global behaviors (like script injection).
- **Core Layout Components**:
  - `Component_1.jsx`: Header & Navigation
  - `Component_2.jsx`: Main Content Area (Sidebar + Listings)
  - `Component_3.jsx`: Footer
  - `Component_4.jsx`: Floating Side Widget (e.g., Feedback/Promo)
  - `Component_5.jsx`: Floating Notification/Toast (e.g., Cookie Consent)

### 2.2 Component Hierarchy
The UI is decomposed into granular sub-components (e.g., `Component_1_1`, `Component_2_1_1`) to maintain separation of concerns and manage complexity.

```
App
├── Component_1 (Header)
│   ├── Component_1_1 (Logo/Branding)
│   ├── Component_1_2 (Search Bar)
│   └── ...
├── Component_2 (Main Body)
│   ├── Component_2_1 (Sidebar/Filters)
│   ├── Component_2_2 (Product Grid/List)
│   └── ...
├── Component_3 (Footer)
├── Component_4 (Fixed Side Widget)
└── Component_5 (Fixed Bottom Widget)
```

## 3. Detailed Component Analysis

### 3.1 Global Layout (App.jsx)
- **Responsibility**: Manages the global layout container and third-party script integration.
- **Styling**: Uses a global wrapper with specific font settings (`[font-family:metropolis...]`) and background color (`bg-[#4618ac]`) to match the brand identity.
- **Script Handling**: Implements a custom `useEffect` hook to manage "delayed" scripts. This simulates the loading of non-critical resources (ads, analytics) without blocking the main render. It looks for scripts with `type="text/delayed"` and promotes them to executable scripts after the component mounts.

### 3.2 Header (Component_1)
- **Layout**: a Flexbox container centered with `max-w-[1240px]`.
- **Elements**:
  - Logo (`Component_1_1`)
  - Navigation elements.
- **Behavior**: Sticky or relative positioning depending on the scroll state (handled via CSS classes).

### 3.3 Main Content (Component_2)
- **Layout**: Uses a CSS Grid layout (`grid-cols-[220px_calc(100%_-_240px)]`) to create a fixed-width sidebar and a fluid content area.
- **Sidebar (Component_2_1)**: Contains filter categories (Games, Gift Cards, etc.).
- **Content Area**: Displays the page title and list of products.
- **Responsive Strategy**: The grid likely collapses or adjusts on smaller screens (controlled by Tailwind responsiveness markers).

### 3.4 Footer (Component_3)
- **Styling**: Dark overlay background (`bg-[rgba(0,0,0,0.7)]`).
- **Content**: Site links, legal information, and social media icons.

### 3.5 Floating Elements
- **Component_4**: A fixed widget positioned at the vertical center-left (`top-2/4`, `left-0`). It features a background image and a close button, typically used for promotions or gamification elements.
- **Component_5**: A notification popup positioned at the bottom-left. It is initialized with `opacity-0` and `pointer-events-none`, suggesting it is triggered by a user action or a specific timer (e.g., a "User bought X" notification or Cookie consent).

## 4. Key Scenarios

### 4.1 Page Initialization & Script Hydration
**Scenario**: The user loads the page.
1. `App` component mounts.
2. Static HTML structure (Header, Main, Footer) renders immediately.
3. `useEffect` in `App.jsx` triggers:
   - It scans for `<script>` tags with `type="text/delayed"`.
   - It creates new executable `<script>` elements and appends them to the document.
   - **Purpose**: To defer loading of heavy third-party scripts (like tracking or chat widgets) until the UI is interactive, improving Core Web Vitals.

### 4.2 Responsive Layout Adaptation
**Scenario**: User resizes the window or views on mobile.
- **Desktop (>1240px)**: Content is centered with a max-width. Sidebar is visible.
- **Mobile**: The `grid-cols` layout in `Component_2` will adapt (based on specific media queries in sub-components). The navigation in `Component_1` typically collapses into a hamburger menu (if implemented in `Component_1_X`).

### 4.3 Floating Widget Interaction
**Scenario**: User interacts with the side widget (`Component_4`).
- The widget is `fixed` to the viewport.
- It contains a close button (SVG icon) that, when clicked, would typically modify local state to hide the component (implementation would be in `Component_4`'s internal state).

### 4.4 Iframe Sandbox Isolation
**Scenario**: Loading external content.
- The `App.jsx` contains hidden `iframe` elements (TikTok, Reddit, Bing pixels/trackers) with `sandbox` attributes.
- **Security**: These are isolated to prevent them from accessing the main window's DOM or cookies directly, while still allowing them to execute necessary scripts (`allow-scripts`).

## 5. Technical Specifications
- **Framework**: React 18
- **Styling Engine**: Tailwind CSS (Utility-first)
- **Font Stack**: Metropolis, Arial, Helvetica, system-ui.
- **Color Palette**:
  - Primary Background: `#4618ac` (Deep Purple)
  - Text: `white` (on dark backgrounds)
  - Overlay: `rgba(0,0,0,0.7)`