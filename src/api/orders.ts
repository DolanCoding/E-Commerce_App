import client from "./client";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items?: OrderItem[];
  created_at?: string;
}

export interface CreateOrderRequest {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}

export const ordersAPI = {
  getOrders: async (): Promise<Order[]> => {
    const response = await client.get("/orders");
    return response.data;
  },

  getOrder: async (orderId: string): Promise<Order> => {
    const response = await client.get(`/orders/${orderId}`);
    return response.data;
  },

  createOrder: async (): Promise<Order> => {
    const response = await client.post("/orders");
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: Order["status"]): Promise<Order> => {
    const response = await client.patch(`/orders/${orderId}`, { status });
    return response.data;
  },
};
