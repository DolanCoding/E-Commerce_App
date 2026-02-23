import { Router } from "express";
import { query } from "../config/database";
import { asyncHandler, AppError } from "../middleware/errorHandler";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";
import bcrypt from "bcryptjs";

const router = Router();

// Get current user profile
router.get(
  "/profile",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    const result = await query(
      "SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      throw new AppError(404, "User not found");
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  })
);

// Update user profile
router.patch(
  "/profile",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { name, email } = req.body;

    if (!name && !email) {
      throw new AppError(400, "Name or email is required");
    }

    let sqlQuery = "UPDATE users SET ";
    const params: any[] = [];
    const updates: string[] = [];

    if (name) {
      updates.push(`name = $${params.length + 1}`);
      params.push(name);
    }

    if (email) {
      // Check if email is already taken
      const emailCheck = await query("SELECT * FROM users WHERE email = $1 AND id != $2", [
        email,
        userId,
      ]);

      if (emailCheck.rows.length > 0) {
        throw new AppError(400, "Email already in use");
      }

      updates.push(`email = $${params.length + 1}`);
      params.push(email);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    sqlQuery += updates.join(", ");
    sqlQuery += ` WHERE id = $${params.length + 1} RETURNING id, email, name, created_at, updated_at`;
    params.push(userId);

    const result = await query(sqlQuery, params);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  })
);

// Change password
router.post(
  "/change-password",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError(400, "Current and new password are required");
    }

    const userResult = await query("SELECT * FROM users WHERE id = $1", [userId]);

    if (userResult.rows.length === 0) {
      throw new AppError(404, "User not found");
    }

    const user = userResult.rows[0];

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError(401, "Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query(
      "UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
      [hashedPassword, userId]
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  })
);

export default router;
