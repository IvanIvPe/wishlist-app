# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and commands

This is a TypeScript Next.js app-router project located under `src/app`, managed with npm (a `package-lock.json` is present).

### Install dependencies

- `npm install`

### Run the dev server

- `npm run dev`
  - Starts `next dev` with the default configuration.

### Build and run in production mode

- `npm run build`
  - Runs `next build` to generate the production build.
- `npm start`
  - Runs `next start` to serve the production build.

### Linting

- `npm run lint`
  - Invokes `eslint` using the Next.js ESLint configuration.
- Example: lint a single file directly with ESLint
  - `npx eslint src/app/wishlist/WishlistPage.tsx`

### Tests

- There is currently no test script or test framework configured in `package.json`.

## High-level architecture

### Framework and entrypoints

- The app uses the Next.js **app router**, with all routes and layouts under `src/app`.
- `src/app/layout.tsx` defines `RootLayout`, which:
  - Imports global styles from `src/app/globals.css`.
  - Wraps all pages with a shared `Navbar`, `Footer`, and `ToastProvider` (`react-hot-toast` integration).
  - Renders the active page in a central `<main>` element.
- `src/app/page.tsx` implements the `/` (home) route and is styled via `src/app/page.module.css`.

### Routing structure

All top-level routes are directories under `src/app`, each with:
- A route-level `page.tsx` file (the Next.js entrypoint).
- A separate `*Page.tsx` component and CSS module colocated in the same folder for layout and styling.

Key routes:
- `/` (home): `src/app/page.tsx` — simple marketing/landing content for the Wishlist app.
- `/wishlist`: `src/app/wishlist/page.tsx` + `WishlistPage.tsx` — main wishlist functionality.
- `/about`: `src/app/about/page.tsx` + `AboutPage.tsx` — static information about the app.
- `/contact`: `src/app/contact/page.tsx` + `ContactPage.tsx` — contact form UI.
- Not-found handling: `src/app/not-found.tsx` and `not-found.module.css`, with a dedicated `components/errors/NotFoundView`.

When adding new pages, follow this pattern by creating a new directory under `src/app/<route>` containing a `page.tsx`, a main page component, and a CSS module.

### Wishlist feature

- Implemented in `src/app/wishlist/WishlistPage.tsx` as a **client component** (`"use client"`).
- Core data model: a `Wish` interface with `id`, `name`, `description`, and `completed` fields.
- State and persistence:
  - Uses `useState` to track the list of wishes and the current input value.
  - Uses `useEffect` to read from `localStorage` on first render and to persist changes back to `localStorage` once the initial load flag (`isLoaded`) is set.
- User actions:
  - Add wish: validates non-empty input, appends a new `Wish` with `Date.now()` as the id, resets the input, and shows a success toast.
  - Delete wish: opens a `ConfirmDeleteToast`; on confirm, filters the wish from state and shows a success toast.
  - Edit wish: opens an `EditWishToast` with the current name; on save, updates the matching wish and shows a success toast.
  - Toggle completion: toggles the `completed` flag for a wish and shows a status toast.
- Rendering behavior:
  - While `isLoaded` is false, the component returns `null` to avoid mismatches between server and client regarding `localStorage`.
  - Renders an empty-state message when the list is empty.

### Shared UI components

Located under `src/app/components`:

- `Navbar/Navbar.tsx`
  - Uses `next/link` for navigation.
  - Provides links to `/`, `/wishlist`, `/about`, and `/contact`.
  - Displays a logo image (`/listlogo.png`) and title text.
- `Footer/Footer.tsx`
  - Shared footer markup/styles used in `RootLayout`.
- `Toast/`
  - `Toast.tsx` wraps `react-hot-toast` and provides the application-wide toast provider (`ToastProvider`), included in `RootLayout`.
  - `ConfirmDeleteToast.tsx` and `EditWishToast.tsx` are specialized toast content components used by the wishlist feature for delete confirmation and inline editing.
- `Map/Map.tsx`
  - Encapsulates an embedded Google Maps `<iframe>` and styling.
  - Intended for use on information or contact pages.
- `errors/NotFoundView.tsx`
  - Centralized 404/not-found view, used by the Next.js `not-found.tsx` route handler.
- `ui/`
  - `buttons/SendMessage/SendMessage.tsx` and associated CSS implement a reusable “send message” button component.
  - `inputs/Email/EmailForm.tsx`, `inputs/Message/MessageForm.tsx`, `inputs/Username/UsernameForm.tsx`, and `InputGroup.module.css` form a small set of reusable input/form components used primarily on the contact page.

### Styling

- Styling is handled via CSS Modules (`*.module.css`) colocated with their corresponding components/pages.
- Global styles and resets live in `src/app/globals.css`, which are imported once in `RootLayout`.

### README and metadata

- `README.md` currently just indicates that this is a "Wish List - Test Project - Next.js"; there are no additional documented workflows or conventions beyond what is described above.
