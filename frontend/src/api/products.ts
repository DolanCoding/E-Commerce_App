import client from "./client";
import type { Product } from "../types";

export interface ProductsParams {
  category?: string;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "created_at";
}

export const productsAPI = {
  getAll: async (params?: ProductsParams): Promise<Product[]> => {
    const response = await client.get("/products", { params });
    return response.data.products;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await client.get(`/products/${id}`);
    return response.data.product;
  },

  create: async (data: Omit<Product, "id" | "created_at">): Promise<Product> => {
    const response = await client.post("/products", data);
    return response.data;
  },
};
