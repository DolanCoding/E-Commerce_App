import { Router } from "express";
import { query, getClient } from "../config/database";
import { asyncHandler, AppError } from "../middleware/errorHandler";
import { authenticate, AuthenticatedRequest } from "../middleware/authenticate";

const router = Router();

// Get user orders
router.get(
  "/",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;

    // Get orders
    const ordersResult = await query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    // Get items for all orders
    const ordersWithItems = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const itemsResult = await query(
          "SELECT oi.*, p.name, p.image FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1",
          [order.id]
        );
        return {
          ...order,
          items: itemsResult.rows,
        };
      })
    );

    res.json({
      success: true,
      orders: ordersWithItems,
      total: ordersWithItems.length,
    });
  })
);

// Get single order with items
router.get(
  "/:orderId",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { orderId } = req.params;

    const orderResult = await query("SELECT * FROM orders WHERE id = $1 AND user_id = $2", [
      orderId,
      userId,
    ]);

    if (orderResult.rows.length === 0) {
      throw new AppError(404, "Order not found");
    }

    const itemsResult = await query(
      "SELECT oi.*, p.name, p.image FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1",
      [orderId]
    );

    res.json({
      success: true,
      order: {
        ...orderResult.rows[0],
        items: itemsResult.rows,
      },
    });
  })
);

// Create order
router.post(
  "/",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId;
    const { items } = req.body;

    if (!items || items.length === 0) {
      throw new AppError(400, "Order must contain at least one item");
    }

    const client = await getClient();

    try {
      await client.query("BEGIN");

      // Calculate total
      let total = 0;
      for (const item of items) {
        const id = item.product_id || item.productId;
        const productResult = await client.query("SELECT price FROM products WHERE id = $1", [
          id,
        ]);

        if (productResult.rows.length === 0) {
          throw new AppError(404, `Product ${id} not found`);
        }

        total += productResult.rows[0].price * item.quantity;
      }

      // Create order
      const orderResult = await client.query(
        "INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *",
        [userId, total, "pending"]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of items) {
        const id = item.product_id || item.productId;
        const productResult = await client.query("SELECT price FROM products WHERE id = $1", [
          id,
        ]);

        await client.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
          [order.id, id, item.quantity, productResult.rows[0].price]
        );

        // Clear cart item
        await client.query("DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2", [
          userId,
          id,
        ]);
      }

      await client.query("COMMIT");

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  })
);

// Update order status (admin only)
router.patch(
  "/:orderId",
  authenticate,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      throw new AppError(400, "Status is required");
    }

    const result = await query(
      "UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, orderId]
    );

    if (result.rows.length === 0) {
      throw new AppError(404, "Order not found");
    }

    res.json({
      success: true,
      order: result.rows[0],
    });
  })
);

export default router;
