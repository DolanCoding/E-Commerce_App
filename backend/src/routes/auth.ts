import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/database";
import { asyncHandler, AppError } from "../middleware/errorHandler";
import { User, AuthRequest } from "../types";

const router = Router();

// Register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, name }: AuthRequest & { name: string } = req.body;

    // Validation
    if (!email || !password || !name) {
      throw new AppError(400, "Email, password, and name are required");
    }

    // Check if user exists
    const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      throw new AppError(400, "User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at",
      [email, hashedPassword, name]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      (process.env.JWT_SECRET || "secret") as string,
      { expiresIn: process.env.JWT_EXPIRE || "7d" } as any
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  })
);

// Login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password }: AuthRequest = req.body;

    // Validation
    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    // Find user
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      throw new AppError(401, "Invalid email or password");
    }

    const user = result.rows[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError(401, "Invalid email or password");
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      (process.env.JWT_SECRET || "secret") as string,
      { expiresIn: process.env.JWT_EXPIRE || "7d" } as any
    );

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  })
);

export default router;
