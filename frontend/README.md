# ShopHub - E-Commerce App

A modern, fully-featured e-commerce application built with React, TypeScript, Vite, Tailwind CSS, and Redux.

## Features

- **Product Catalog** - Browse and explore a wide selection of products
- **Shopping Cart** - Add/remove items and manage quantities
- **User Authentication** - Login and register functionality
- **Checkout Process** - Complete order placement with shipping and payment info
- **Order Management** - View order history and status
- **Product Search & Filters** - Search products and filter by category
- **Product Sorting** - Sort by price, rating, and name
- **Product Details** - View detailed information about each product
- **Responsive Design** - Fully responsive mobile-first design

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 8.0.0-beta.13
- **Styling**: Tailwind CSS 4.2.0
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM 7.13.0
- **HTTP Client**: Axios 1.13.5

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── SearchFilter.tsx
│   └── Footer.tsx
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Orders.tsx
│   └── OrderConfirmation.tsx
├── store/             # Redux store configuration
│   ├── store.ts       # Redux store setup
│   ├── cartSlice.ts   # Cart state and actions
│   ├── authSlice.ts   # Auth state and actions
│   └── hooks.ts       # Custom Redux hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and mock data
│   ├── helpers.ts     # Helper functions
│   └── mockData.ts    # Mock product data
├── App.tsx            # Main App component
├── App.css            # Global styles
└── index.css          # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. Navigate to the project directory:

```bash
cd "E-Commerce App"
```

2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173/`

### Building for Production

Create a production build:

```bash
npm run build
```

### Previewing the Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## State Management (Redux)

The app uses Redux Toolkit for state management with two main slices:

### Cart Slice (`store/cartSlice.ts`)

- `addItem` - Add product to cart
- `removeItem` - Remove product from cart
- `updateQuantity` - Update product quantity
- `clearCart` - Clear entire cart

### Auth Slice (`store/authSlice.ts`)

- `loginStart/Success/Failure` - Handle login flow
- `registerStart/Success/Failure` - Handle registration flow
- `logout` - Logout user

## Custom Hooks

Two custom hooks are provided in `store/hooks.ts`:

- `useCart()` - Access cart state and dispatch cart actions
- `useAuth()` - Access auth state and dispatch auth actions

## Mock Data

The app includes mock product data in `utils/mockData.ts` with 6 sample products in Electronics and Accessories categories.

## Features Details

### Shopping Cart

- Add/remove items
- Update quantities
- Calculate totals with tax
- Free shipping

### User Authentication

- Email validation
- Password validation (6+ characters)
- Simple login/register flow
- Persistent user state via Redux

### Product Discovery

- Search products by name/description
- Filter by category
- Sort by price (ascending/descending), rating, and name
- View star ratings and product details

### Checkout

- Shipping information form
- Payment information form
- Order summary
- Order confirmation with order ID

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a portfolio project with mock data and simulated API calls
- Authentication and payment processing are simulated
- For production use, integrate with real APIs and payment processors
- Images are sourced from Unsplash and used for demonstration purposes

## License

This project is created for portfolio purposes.

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
