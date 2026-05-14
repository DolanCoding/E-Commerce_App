import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

// Support both DATABASE_URL (production) and individual env vars (development)
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME || "ecommerce_db",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD,
    });

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export const getClient = async () => {
  return pool.connect();
};

export async function initializeDatabase() {
  try {
    // Test connection
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database at:", result.rows[0].now);

    // Create tables if they don't exist
    await createTables();

    // Auto-seed database if products table is empty
    await autoSeedIfEmpty();
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

async function autoSeedIfEmpty() {
  try {
    const forceSeed = process.env.FORCE_SEED_DATABASE === "true";

    // Check if products table has any data
    const countResult = await pool.query("SELECT COUNT(*) FROM products");
    const productCount = parseInt(countResult.rows[0].count, 10);

    // Check if users table has any data
    const usersResult = await pool.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(usersResult.rows[0].count, 10);

    if (forceSeed) {
      console.log("FORCE_SEED_DATABASE is enabled. Clearing and reseeding...");
      await pool.query("DELETE FROM products");
      await pool.query("DELETE FROM users");
      await seedDatabase();
      await seedUsers();
    } else {
      if (productCount === 0) {
        console.log("No products found. Auto-seeding products...");
        await seedDatabase();
      } else {
        console.log(`Database already has ${productCount} products.`);
      }

      if (userCount === 0) {
        console.log("No users found. Auto-seeding test users...");
        await seedUsers();
      } else {
        console.log(`Database already has ${userCount} users.`);
      }
    }
  } catch (error) {
    console.error("Auto-seed check error:", error);
    // Don't throw - let server continue even if seed fails
  }
}

async function seedDatabase() {
  try {
    console.log("Fetching products from Fake Store API...");

    const response = await fetch("https://fakestoreapi.com/products");
    const fakeStoreProducts = (await response.json()) as any[];

    const products = fakeStoreProducts.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating.rate,
      reviews: product.rating.count,
      in_stock: Math.random() > 0.2,
    }));

    console.log(`Fetched ${products.length} products. Inserting into database...`);

    for (const product of products) {
      await pool.query(
        "INSERT INTO products (name, description, price, image, category, rating, reviews, in_stock) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          product.name,
          product.description,
          product.price,
          product.image,
          product.category,
          product.rating,
          product.reviews,
          product.in_stock,
        ]
      );
    }

    console.log("✓ Database seeded successfully with products");
  } catch (error) {
    console.error("Database seeding error:", error);
    // Don't throw - server should still start
  }
}

async function seedUsers() {
  try {
    console.log("Seeding test users...");

    const testUsers = [
      {
        email: "demo@example.com",
        password: "demo123456",
        name: "Demo User",
      },
      {
        email: "test@example.com",
        password: "test123456",
        name: "Test User",
      },
      {
        email: "john@example.com",
        password: "john123456",
        name: "John Doe",
      },
    ];

    for (const user of testUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await pool.query(
        "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING",
        [user.email, hashedPassword, user.name]
      );
    }

    console.log(`✓ Created ${testUsers.length} test users`);
    console.log("   Test login credentials:");
    testUsers.forEach((user) => {
      console.log(`   • Email: ${user.email} | Password: ${user.password}`);
    });
  } catch (error) {
    console.error("User seeding error:", error);
  }
}

async function createTables() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(100),
        rating DECIMAL(3, 1) DEFAULT 4.0,
        reviews INT DEFAULT 0,
        in_stock BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create cart_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
    `);

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create order_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `);

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

export default pool;
