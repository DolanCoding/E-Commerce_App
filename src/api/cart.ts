import client from "./client";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  created_at?: string;
}

export interface AddToCartRequest {
  product_id: string;
  quantity: number;
}

export const cartAPI = {
  getCart: async (): Promise<CartItem[]> => {
    const response = await client.get("/cart");
    return response.data;
  },

  addItem: async (data: AddToCartRequest): Promise<CartItem> => {
    const response = await client.post("/cart", data);
    return response.data;
  },

  removeItem: async (cartItemId: string): Promise<{ success: boolean }> => {
    const response = await client.delete(`/cart/${cartItemId}`);
    return response.data;
  },

  clearCart: async (): Promise<{ success: boolean }> => {
    const response = await client.delete("/cart");
    return response.data;
  },
};
