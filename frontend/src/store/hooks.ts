import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Cart hooks
export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    dispatch,
    getTotalPrice,
    getItemCount,
  };
};

// Auth hooks
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loading = useSelector((state: RootState) => state.auth.loading);

  return {
    user,
    isLoggedIn,
    loading,
    dispatch,
  };
};
