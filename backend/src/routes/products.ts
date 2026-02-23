import { Router } from "express";
import { query } from "../config/database";
import { asyncHandler, AppError } from "../middleware/errorHandler";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// Get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { category, search, sortBy } = req.query;

    let sqlQuery = "SELECT * FROM products WHERE 1=1";
    const params: any[] = [];

    if (category) {
      sqlQuery += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (search) {
      sqlQuery += ` AND (name ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    // Sorting
    if (sortBy === "price-asc") {
      sqlQuery += " ORDER BY price ASC";
    } else if (sortBy === "price-desc") {
      sqlQuery += " ORDER BY price DESC";
    } else if (sortBy === "rating") {
      sqlQuery += " ORDER BY rating DESC";
    } else {
      sqlQuery += " ORDER BY created_at DESC";
    }

    const result = await query(sqlQuery, params);

    res.json({
      success: true,
      products: result.rows,
      total: result.rows.length,
    });
  })
);

// Get single product
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      throw new AppError(404, "Product not found");
    }

    res.json({
      success: true,
      product: result.rows[0],
    });
  })
);

// Create product (admin only - for now no role checking)
router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const { name, description, price, image, category, rating, reviews } = req.body;

    if (!name || !price) {
      throw new AppError(400, "Name and price are required");
    }

    const result = await query(
      "INSERT INTO products (name, description, price, image, category, rating, reviews) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, description, price, image, category, rating || 4.0, reviews || 0]
    );

    res.status(201).json({
      success: true,
      product: result.rows[0],
    });
  })
);

export default router;
