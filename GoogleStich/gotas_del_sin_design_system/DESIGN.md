---
name: Gotas del Sinú Design System
colors:
  surface: '#f7f9ff'
  surface-dim: '#bbdeff'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf4ff'
  surface-container: '#e2efff'
  surface-container-high: '#d7eaff'
  surface-container-highest: '#cce5ff'
  on-surface: '#001e31'
  on-surface-variant: '#3f4851'
  inverse-surface: '#003351'
  inverse-on-surface: '#e7f2ff'
  outline: '#6f7882'
  outline-variant: '#bec7d2'
  surface-tint: '#006496'
  primary: '#006496'
  on-primary: '#ffffff'
  primary-container: '#129fea'
  on-primary-container: '#00324f'
  inverse-primary: '#91cdff'
  secondary: '#3d6a00'
  on-secondary: '#ffffff'
  secondary-container: '#aff763'
  on-secondary-container: '#417000'
  tertiary: '#795900'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf8f00'
  on-tertiary-container: '#3e2c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#91cdff'
  on-primary-fixed: '#001e31'
  on-primary-fixed-variant: '#004b72'
  secondary-fixed: '#aff763'
  secondary-fixed-dim: '#95d949'
  on-secondary-fixed: '#0f2000'
  on-secondary-fixed-variant: '#2c5000'
  tertiary-fixed: '#ffdf9e'
  tertiary-fixed-dim: '#f9bd14'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#f7f9ff'
  on-background: '#001e31'
  surface-variant: '#cce5ff'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an energetic, high-fidelity EdTech ecosystem that fuses pedagogical clarity with playful gamification mechanics. Grounded in the landscape, vibrant flora, and alluvial waters of Córdoba, the visual language communicates clarity, achievement, and natural vitality.

The aesthetic blends **Modern Tactile/Playful UI** with **Crisp Neomorphic Depth**:
- **Playful yet Purposeful:** Surfaces feature tactile feedback, vibrant milestone badges, and clear reward metrics without devolving into visual chaos.
- **Atmospheric Clarity:** Clean white backdrops allow natural river greens, deep waters, and celebratory sunlit golds to guide learner progression naturally.
- **Target Audience:** K-12 and tertiary students, educators, and lifelong learners navigating structured micro-curricula and quest-driven education.
- **Emotional Impact:** Confidence, curiosity, and continuous accomplishment. Every interaction reinforces a sensation of flow, achievement, and intellectual growth.

## Colors

The palette directly translates the geographic energy of the Sinú region into functional digital roles:

- **Primary (`#129FEA` - Azul Agua):** Represents focus, river currents, and interactive momentum. Used for primary calls-to-action, active step indicators, and interactive links.
- **Secondary (`#76B82A` - Verde Naturaleza):** Symbolizes growth, vitality, and successful completions. Serves as the principal color for completed states, quest progression paths, and success confirmations.
- **Tertiary (`#FFC21C` - Oro Sol):** Reserved exclusively for gamified incentives—XP indicators, reward stars, daily streaks, unlocked trophies, and tier crowns.
- **Deep Neutral / Structural Anchor (`#0A5A87` - Azul Profundo):** Anchors typographical hierarchy, dominant navigation bars, focused card borders, and primary headings.
- **Supporting Accents:**
  - **Verde Bosque (`#00563F`):** Provides dense typographic contrast on light green indicators, supporting high-contrast accessible states and advanced level badges.
  - **Canvas & Surface Base:** Pure White (`#FFFFFF`) with subtle water-tinted neutral surface containers (`#F3F9FD` and `#E7F3FA`) for section delineation.

## Typography

Typography unifies contemporary geometric warmth with technical precision. 

- **Primary Headings & Body (`Plus Jakarta Sans`):** Selected for its friendly curvature, balanced counters, and exceptional legibility across dense educational content and interactive questions.
- **Labels, Metrics, & Badges (`Space Grotesk`):** Provides a clean, technical counterweight. Used on numbers, level counters, XP multipliers, timers, and gamified pill tags to impart an authentic dashboard and challenge feel.
- **Hierarchy Handling:** Large headers maintain tight vertical metrics with expressive tracking (`-0.02em`). Numeric stats pair with bold uppercase labels using extended letter-spacing (`0.04em`) to maximize scanning efficiency.

## Layout & Spacing

The layout employs a responsive 12-column fluid grid structure configured to balance high-focus learning modules with auxiliary analytics sidebars:

- **Desktop (>=1280px):** 12-column grid, `margin: 2.5rem`, `gutter: 1.5rem`. Maximum content container constrained to `1440px`. Gamified progression trackers and user stats anchor persistently in a 3-column sticky right rail.
- **Tablet (768px - 1279px):** 8-column layout, `margin: 1.5rem`, `gutter: 1rem`. Ancillary sidebars collapse into responsive top summary ribbons or swipeable drawer panels.
- **Mobile (<768px):** 4-column layout, `margin-sm: 1rem`, `gutter-sm: 1rem`. All learning modules prioritize single-column vertical stacking, with quest actions anchored to fixed bottom action sheets.
- **Component Rhythms:** Cards utilize `space-lg` inner padding for spacious reading comfort, while badge clusters, tag rails, and answer choices maintain a strict `space-sm` or `space-md` modular separation.

## Elevation & Depth

Visual hierarchy uses **Tinted Ambient Elevation** alongside **Layered Water Surfaces**, creating an inviting and touch-responsive atmosphere:

- **Level 0 (Flat / Track Base):** Pure White (`#FFFFFF`) or subtle water canvas (`#F3F9FD`). No shadow, surrounded by soft 1px border (`#E1EDF5`).
- **Level 1 (Card Default):** Resting cards utilize a diffused aquatic shadow:
  - `box-shadow: 0 4px 18px -2px rgba(10, 90, 135, 0.07), 0 2px 6px -1px rgba(10, 90, 135, 0.04);`
- **Level 2 (Hover / Interactive Lift):** Elevated state applied on interactive challenge tiles and hovered cards:
  - `box-shadow: 0 10px 25px -4px rgba(18, 159, 234, 0.16), 0 4px 10px -2px rgba(10, 90, 135, 0.06);`
  - Subtle vertical transform: `translateY(-2px)`.
- **Level 3 (Modal / Floating Rewards):** Overlay dialogs and celebration banners:
  - `box-shadow: 0 20px 40px -6px rgba(10, 90, 135, 0.22);`
- **Gamified "Press" Effect:** Interactive buttons and clickable options feature a tactile 3D bottom bevel (`border-bottom: 3px solid rgba(0, 0, 0, 0.15)`) that depresses cleanly on active click (`translateY(2px)` with reduced bottom border), delivering immediate physical satisfaction.

## Shapes

The design system implements a **Rounded (Level 2)** shape identity to communicate warmth, accessibility, and playful fluidity:

- **Standard Elements (0.5rem / 8px):** Input fields, inline status tags, and compact table cells.
- **Containers & Cards (`rounded-lg`, 1rem / 16px):** Core question containers, analytical widgets, module cards, and modal dialogs.
- **Interactive Buttons & Badges (`rounded-xl`, 1.5rem / 24px up to full pill):** Milestone chips, XP badges, interactive avatar frames, and gamified progress indicators leverage rounded contours to convey organic flow inspired by river pebbles.

## Components

### Buttons
- **Primary Action (Azul Agua):** Background `#129FEA`, text `#FFFFFF`, font `Space Grotesk`, bold. Features a 3px darker inset bottom border (`#0D7EBA`). Hover brightens background slightly; active state translates down 2px.
- **Success / Claim Reward (Verde Naturaleza):** Background `#76B82A`, text `#FFFFFF`, with bottom border `#588D1D`. Reserved for challenge submission, quest completion, and XP claiming.
- **Tertiary / Trophy (Oro Sol):** Background `#FFC21C`, text `#4D3A00`, designed for streak boosts and unlock buttons.

### Chips & Gamification Badges
- **XP / Coin Pill:** Pill-shaped badge with a soft Oro Sol background (`#FFF8E6`), a 1px border (`#FFE699`), an animated gold icon, and numerical indicators set in `Space Grotesk 700`.
- **Level Ribbon:** Slanted or rounded pill featuring Deep Blue (`#0A5A87`) fill with white contrast text, showing current user rank (e.g., `LVL 14 - Guardián del Río`).

### Progress Trackers & XP Meters
- **Liquid XP Bar:** Container with `#E1EDF5` background, height 14px, rounded-full. The active fill uses a horizontal gradient transitioning from `#129FEA` to `#76B82A`, overlaid with a subtle shimmer animation on level gain.
- **Milestone Nodes:** Circular checkpoints spaced across learning paths with three distinct states: completed (solid green with checkmark), active (pulsing blue ring with current icon), and locked (muted grey `#CFDEE7`).

### Cards & Module Containers
- Built with a `#FFFFFF` base, Level 1 shadow, and a 1.5px border (`#E4F0F7`).
- Hover transitions bring an active border accent in `#129FEA` and Level 2 elevation.
- Internal headers group challenge metadata with right-aligned XP payout values.

### Input Fields
- White background with 1.5px border in `#D2E4F0`, text in `#0A5A87`.
- Focus state switches border to `#129FEA` accompanied by an ambient glow ring: `0 0 0 3px rgba(18, 159, 234, 0.2)`.

### Checkboxes & Quiz Selection Tiles
- **Selectable Choice Cards:** Large rounded tiles that act as radio/checkbox inputs. In default state, they maintain neutral borders; upon selection, they shift to `#129FEA` background tint (`#F0F8FD`), a 2px `#129FEA` border, and an animated check icon.

### Custom Avatars & Progression Widgets
- **Learner Avatars:** Circular portrait frames enclosed by customizable status rings (bronze, silver, gold `#FFC21C`, or radiant river blue). An attached floating pill at the bottom edge displays current streak multipliers (e.g., `🔥 5 Días`).
- **Vuetify 3 / Tailwind Analytical Widgets:** Clean card-based metric grids showing weekly study minutes, accuracy curves, and Sinú ecosystem mastery levels using smooth SVG sparklines in `#129FEA` and `#76B82A`.