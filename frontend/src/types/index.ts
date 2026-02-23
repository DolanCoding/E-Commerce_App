export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  created_at?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated?: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  items?: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    name?: string;
    image?: string;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}
