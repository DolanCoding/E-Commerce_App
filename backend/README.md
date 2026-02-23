# E-Commerce Backend API

A fully functional Node.js/Express/TypeScript backend API for the e-commerce application with PostgreSQL database.

## Features

- User authentication with JWT
- Product listing and management
- Shopping cart functionality
- Order management
- User profile management
- Password hashing with bcryptjs
- TypeScript support
- PostgreSQL database

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
JWT_SECRET=your_secret_key_here
```

## Database Setup

1. Create PostgreSQL database:

```bash
createdb ecommerce_db
```

2. The tables will be created automatically when the server starts for the first time.

3. (Optional) Seed the database with sample products:

```bash
npm run db:seed
```

## Running the Server

### Development mode (with hot reload):

```bash
npm run dev
```

### Production mode:

```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products (with filtering and sorting)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (authenticated)

### Cart

- `GET /api/cart` - Get cart items (authenticated)
- `POST /api/cart` - Add to cart (authenticated)
- `DELETE /api/cart/:cartItemId` - Remove from cart (authenticated)

### Orders

- `GET /api/orders` - Get user orders (authenticated)
- `GET /api/orders/:orderId` - Get order details (authenticated)
- `POST /api/orders` - Create order (authenticated)
- `PATCH /api/orders/:orderId` - Update order status (authenticated)

### Users

- `GET /api/users/profile` - Get user profile (authenticated)
- `PATCH /api/users/profile` - Update profile (authenticated)
- `POST /api/users/change-password` - Change password (authenticated)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # PostgreSQL connection & table creation
│   ├── middleware/
│   │   ├── authenticate.ts   # JWT authentication middleware
│   │   └── errorHandler.ts   # Global error handling
│   ├── routes/
│   │   ├── auth.ts          # Authentication endpoints
│   │   ├── products.ts      # Product endpoints
│   │   ├── cart.ts          # Cart endpoints
│   │   ├── orders.ts        # Order endpoints
│   │   └── users.ts         # User profile endpoints
│   ├── scripts/
│   │   └── seed.ts          # Database seeding script
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── server.ts            # Main server entry point
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

- `DB_HOST` - PostgreSQL host (default: localhost)
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name (default: ecommerce_db)
- `DB_USER` - PostgreSQL username (default: postgres)
- `DB_PASSWORD` - PostgreSQL password
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time (default: 7d)

## Technologies

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "statusCode": 400
}
```

## Next Steps

1. Connect the frontend to these API endpoints
2. Implement role-based access control (RBAC) for admin features
3. Add email verification for user registration
4. Implement payment processing (Stripe, PayPal, etc.)
5. Add order tracking and notifications
6. Implement search and advanced filtering
7. Add product reviews and ratings
8. Set up automated testing with Jest

## License

MIT
