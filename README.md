# ShopHub - E-Commerce App

A modern, fully-featured e-commerce application with a React frontend and Node.js/Express backend with PostgreSQL database.

## Features

### Frontend

- **Product Catalog** - Browse and explore a wide selection of products
- **Shopping Cart** - Add/remove items and manage quantities
- **User Authentication** - Login and register functionality
- **Checkout Process** - Complete order placement with shipping and payment info
- **Order Management** - View order history and status
- **Product Search & Filters** - Search products and filter by category
- **Product Sorting** - Sort by price, rating, and name
- **Product Details** - View detailed information about each product
- **Responsive Design** - Fully responsive mobile-first design

### Backend

- **RESTful API** - Complete API for all e-commerce functionality
- **User Authentication** - JWT-based authentication with secure password hashing
- **Product Management** - Create, read, update functionality
- **Shopping Cart Management** - Add, remove, and manage cart items
- **Order Processing** - Create and track orders with status updates
- **User Profiles** - Manage user information and passwords
- **Database** - PostgreSQL database with proper relationships and constraints

## Tech Stack

### Frontend

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 8.0.0-beta.13
- **Styling**: Tailwind CSS 4.2.0
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM 7.13.0

### Backend

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT with bcryptjs
- **Additional**: CORS, dotenv for configuration

## Project Structure

```
E-Commerce App/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── types/           # TypeScript definitions
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
├── backend/                 # Node.js/Express backend API
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Utility scripts
│   │   ├── types/           # TypeScript definitions
│   │   └── server.ts        # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- PostgreSQL >= 12.0.0

### Installation

#### 1. Backend Setup

First, set up the backend API:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=ecommerce_db
# DB_USER=postgres
# DB_PASSWORD=your_password
# PORT=5000
# JWT_SECRET=your_secret_key_here
```

Create the PostgreSQL database:

```bash
createdb ecommerce_db
```

Start the backend server:

```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

The server will automatically create all necessary database tables on first run.

(Optional) Seed the database with sample products:

```bash
npm run db:seed
```

#### 2. Frontend Setup

In a new terminal, set up the frontend:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will open at `http://localhost:5173/`

### Running the Application

You need two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Both applications will run concurrently.

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## API Documentation

The backend provides a complete RESTful API for the e-commerce application. Here are the main endpoints:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products (with filtering and sorting)
- `GET /api/products/:id` - Get single product details

### Cart

- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:cartItemId` - Remove item from cart

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `POST /api/orders` - Create new order

### Users

- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password

For complete API documentation, see [backend/README.md](backend/README.md)

## State Management (Redux)

The frontend uses Redux Toolkit for state management:

### Cart Slice

- `addItem` - Add product to cart
- `removeItem` - Remove product from cart
- `updateQuantity` - Update product quantity
- `clearCart` - Clear entire cart

### Auth Slice

- `loginStart/Success/Failure` - Handle login flow
- `registerStart/Success/Failure` - Handle registration flow
- `logout` - Logout user

### Custom Hooks

- `useCart()` - Access cart state and dispatch cart actions
- `useAuth()` - Access auth state and dispatch auth actions

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

- This is a full-stack e-commerce application with both frontend and backend
- Backend uses PostgreSQL for persistent data storage
- Authentication is handled via JWT tokens
- The application architecture is scalable and follows industry best practices
- All data is real and stored in the database (no mock data)
- Images are sourced from Unsplash for demonstration purposes
- For production deployment, ensure to:
  - Use environment variables for all sensitive information
  - Set up HTTPS/TLS for secure communications
  - Configure proper database backups
  - Implement rate limiting and security headers
  - Set up monitoring and logging

## License

This project is created for portfolio purposes.
