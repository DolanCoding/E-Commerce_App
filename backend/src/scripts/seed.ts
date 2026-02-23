import { query } from "../config/database";
import dotenv from "dotenv";

dotenv.config();

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const seedProducts = async () => {
  try {
    console.log("Fetching products from Fake Store API...");

    // Fetch from Fake Store API
    const response = await fetch("https://fakestoreapi.com/products");
    const fakeStoreProducts = (await response.json()) as FakeStoreProduct[];

    // Transform the data to match our schema
    const products = fakeStoreProducts.map((product) => ({
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating.rate,
      reviews: product.rating.count,
      in_stock: Math.random() > 0.2, // 80% in stock
    }));

    console.log(`Fetched ${products.length} products from Fake Store API`);

    // Clear existing products
    await query("DELETE FROM products");
    console.log("Cleared existing products");

    // Insert products
    for (const product of products) {
      await query(
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

    console.log(`✅ Successfully seeded ${products.length} products!`);
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

const seedTestUsers = async () => {
  try {
    console.log("Seeding test users...");

    // Clear existing users and related data
    await query("DELETE FROM orders");
    await query("DELETE FROM cart_items");
    await query("DELETE FROM users");

    const bcrypt = require("bcryptjs");

    // Create test users
    const testUsers = [
      {
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
      },
      {
        email: "demo@example.com",
        password: "demo123",
        name: "Jane Smith",
      },
    ];

    for (const user of testUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await query("INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)", [
        user.email,
        hashedPassword,
        user.name,
      ]);
    }

    console.log(`✅ Successfully seeded ${testUsers.length} test users!`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

const main = async () => {
  try {
    await seedProducts();
    await seedTestUsers();
    console.log("\n✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
};

main();
