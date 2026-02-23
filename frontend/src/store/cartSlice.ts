import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../types";
import { cartAPI } from "../api/cart";
import type { AddToCartRequest } from "../api/cart";

interface CartItemState {
  id: string;
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItemState[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const items = await cartAPI.getCart();
    return items.map((item) => ({
      id: item.id,
      product: {
        id: item.product?.id || item.product_id,
        name: item.product?.name || "",
        price: item.product?.price || 0,
        image: item.product?.image || "",
        description: item.product?.description || "",
        category: item.product?.category || "",
        rating: item.product?.rating || 0,
        reviews: item.product?.reviews || 0,
        in_stock: item.product?.in_stock ?? true,
      } as Product,
      quantity: item.quantity,
    }));
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data: AddToCartRequest, { rejectWithValue }) => {
    try {
      const item = await cartAPI.addItem(data);
      return {
        id: item.id,
        product: {
          id: item.product?.id || item.product_id,
          name: item.product?.name || "",
          price: item.product?.price || 0,
          image: item.product?.image || "",
          description: item.product?.description || "",
          category: item.product?.category || "",
          rating: item.product?.rating || 0,
          reviews: item.product?.reviews || 0,
          in_stock: item.product?.in_stock ?? true,
        } as Product,
        quantity: item.quantity,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      await cartAPI.removeItem(cartItemId);
      return cartItemId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCartAPI = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    await cartAPI.clearCart();
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Remove from cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Clear cart
    builder
      .addCase(clearCartAPI.pending, (state) => {
        state.error = null;
      })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearCartAPI.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
