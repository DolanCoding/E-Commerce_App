import { Router } from "express";
import { query } from "../config/database";
import { asyncHandler, AppError } from "../middleware/errorHandler";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";

const router = Router();

// Get cart items
router.get(
  "/",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    const result = await query(
      "SELECT ci.id, ci.user_id, ci.product_id, ci.quantity, ci.created_at, ci.updated_at, p.name, p.description, p.price, p.image, p.category, p.rating, p.reviews, p.in_stock FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = $1",
      [userId]
    );

    // Transform flat response to nested structure
    const cartItems = result.rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      product_id: row.product_id,
      quantity: row.quantity,
      created_at: row.created_at,
      updated_at: row.updated_at,
      product: {
        id: row.product_id,
        name: row.name,
        description: row.description,
        price: row.price,
        image: row.image,
        category: row.category,
        rating: row.rating,
        reviews: row.reviews,
        in_stock: row.in_stock,
      },
    }));

    res.json({
      success: true,
      cartItems,
      total: cartItems.length,
    });
  })
);

// Add to cart
router.post(
  "/",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { product_id, productId, quantity } = req.body;
    const id = product_id || productId;

    if (!id || !quantity) {
      throw new AppError(400, "Product ID and quantity are required");
    }

    // Check if product exists
    const productResult = await query("SELECT * FROM products WHERE id = $1", [id]);

    if (productResult.rows.length === 0) {
      throw new AppError(404, "Product not found");
    }

    // Check if item already in cart
    const existingResult = await query(
      "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
      [userId, id]
    );

    if (existingResult.rows.length > 0) {
      // Update quantity
      const updatedResult = await query(
        "UPDATE cart_items SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [quantity, userId, id]
      );

      const product = productResult.rows[0];
      const cartItem = {
        id: updatedResult.rows[0].id,
        user_id: updatedResult.rows[0].user_id,
        product_id: updatedResult.rows[0].product_id,
        quantity: updatedResult.rows[0].quantity,
        created_at: updatedResult.rows[0].created_at,
        updated_at: updatedResult.rows[0].updated_at,
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
          reviews: product.reviews,
          in_stock: product.in_stock,
        },
      };

      return res.json({
        success: true,
        message: "Cart item updated",
        cartItem,
      });
    }

    // Insert new item
    const insertResult = await query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, id, quantity]
    );

    const product = productResult.rows[0];
    const cartItem = {
      id: insertResult.rows[0].id,
      user_id: insertResult.rows[0].user_id,
      product_id: insertResult.rows[0].product_id,
      quantity: insertResult.rows[0].quantity,
      created_at: insertResult.rows[0].created_at,
      updated_at: insertResult.rows[0].updated_at,
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        in_stock: product.in_stock,
      },
    };

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem,
    });
  })
);

// Remove from cart
router.delete(
  "/:cartItemId",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { cartItemId } = req.params;

    // Check ownership
    const result = await query(
      "DELETE FROM cart_items WHERE id = $1 AND user_id = $2 RETURNING *",
      [cartItemId, userId]
    );

    if (result.rows.length === 0) {
      throw new AppError(404, "Cart item not found");
    }

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  })
);

// Clear cart
router.delete(
  "/",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    await query("DELETE FROM cart_items WHERE user_id = $1", [userId]);

    res.json({
      success: true,
      message: "Cart cleared",
    });
  })
);

export default router;
