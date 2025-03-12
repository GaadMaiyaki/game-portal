# Game Portal Application

## Overview

This project is a scalable, modular **Game Portal Application** built using **Next.js + React** in a **monorepo** setup. The monorepo hosts multiple packages:

- `app`: The main application, containing **CasinoA** and **CasinoB**, along with shared components, helpers, and assets.
- `constants`: A package containing project-wide constants.
- `types`: A package containing shared TypeScript types.

The application supports **multiple markets** and brand-specific configurations while maintaining strong **type safety**, **state management**, and **testing**.

---

## Tech Stack

- **Frontend Framework**: Next.js (v15.2.1)
- **Programming Languages**: TypeScript, JavaScript
- **Styling**: Tailwind CSS, ShadCN UI Components
- **State Management**: Redux Toolkit, TanStack React Query
- **Form Handling**: React Hook Form, Zod Validation
- **Testing**: Jest, React Testing Library
- **Package Management**: Lerna (Monorepo), Nx
- **API Development**: Next.js API Routes
- **Linting & Formatting**: ESLint, Prettier
- **Code Quality & Automation**: Husky (Git hooks)

---

## Features

### Multi-Market & Brand Support
- Supports **two markets** (`/en` and `/ca`).
- Users **cannot switch markets** after login (enforced via middleware).

### Authentication & Profile Management
- Users authenticate using a **JSON-based** user credential file.
- Profile settings (name & surname) are editable after login.

### Casino Lobby & Game Stages
- `/casino` displays a **game list**.
- Clicking a game navigates to `/casino/{slugname}`.
- Game view:
  - **"Play for Free"** (logged-out users)
  - **"Play for Real"** (logged-in users)

### Brand-Specific Configuration
- Each casino brand has **its own build script**.
- Configuration files define **brand-specific UI layouts** and settings.

### Theming & Styling
- Multi-theme support via **CSS variables**.
- Uses **Tailwind CSS** and **ShadCN UI components** for rapid UI development.

### API Handling & State Management
- Uses **TanStack React Query** for API requests.
- **Redux Toolkit** is used for global state management.

### Best Practices & Testing
- **Strong TypeScript enforcement**.
- **ESLint & Prettier** ensure code consistency.
- **Jest & React Testing Library** for unit and integration tests.
---

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/GaadMaiyaki/game-portal.git
cd game-portal
```

### Install Dependencies
```sh
npm install
```

## Run Development Server

```sh
npx lerna run dev
```

## Accessing the Application

After starting the development server, the application will be available at:

**Local Development:**
```
http://localhost:4290
```

To change the port, modify `package.json` dev script with:

```sh
--port=<preferred_port> or -p=<preferred_port>
```

## Build Commands

### Build CasinoA

```sh
npx lerna run build:CasinoA
```

### Build CasinoB

```sh
npx lerna run build:CasinoB
```

### Default Build

```sh
npx lerna run build
```

---

## Test Commands

### Run all tests

```sh
npx lerna run test
```

### Run tests in watch mode

```sh
npx lerna run test:watch
```

### Run coverage report

```sh
npx lerna run test:coverage
```
___


You can also modify the **brand settings** at **`/src/lib/configs`** (in the app project) as you want . The following properties can be updated:

#### General Settings
- **`brandName`** – Update the name of the casino brand.
- **`theme`** – Choose between `"light"` or `"dark"` themes.
- **`description`** – Updated the brand’s description.

#### Navigation Menu
- **`menu.position`** – Set the menu position (`"left"` or `"right"`).
- **`menu.items`** – Update navigation labels (e.g., Home, Casino, Profile).

#### Game Lobby Display
- **`gameLobbyDisplay.columns`** – Define how many games should appear per row (between 1 -12).

#### Footer
- **`footer.text`** – Modify the footer text.


#### Market-Specific Settings
Each brand supports multiple **markets** (e.g., `en` for English, `ca` for Canada). You can customize:
- **`markets.{market}.title`** – Market-specific title.
- **`markets.{market}.description`** – Description for each market.
- **`markets.{market}.flag`** – URL to the country’s flag.
- **`markets.{market}.features`** – Enable or disable features like:
  - `newUserBonus` – New user bonus availability.
  - `earlyAccess` – Early access to games.
  - `premiumSupport` – Priority customer support.

---

## Styling Choices

- **Tailwind CSS**: Chosen for its **utility-first approach**, enabling rapid development and scalability.
- **ShadCN UI**: Provides **pre-styled, customizable components**, allowing developers to focus on core application logic rather than UI implementation.
- **Theming**: Managed via **CSS variables**, ensuring flexibility for future casino brand expansions.

---

## Resources & References

During the development of this project, the following resources were used:

- [Emojipedia](https://emojipedia.org/) - Reference for Unicode emoji characters.
- [Next.js Documentation](https://nextjs.org/docs) - Official documentation for Next.js framework.
- [Lerna (Monorepo Management)](https://lerna.js.org/docs/getting-started)  
- [ShadCN UI (For pre-built components)](https://ui.shadcn.com/docs/installation) 
- [Favicon.io (Emoji Favicons)](https://favicon.io/emoji-favicons) – Used for generating favicons.  
