export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password_hash">;
  token: string;
}
