import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { fetchCart, removeFromCart, clearCartAPI } from "../store/cartSlice";
import { formatPrice } from "../utils/helpers";
import type { RootState, AppDispatch } from "../store/store";

export const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.cart);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxAmount = getTotalPrice() * 0.1;
  const totalWithTax = getTotalPrice() * 1.1;
  const savingsAmount = items.reduce(
    (acc, item) => acc + item.product.price * 0.1 * item.quantity,
    0
  );

  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 animate-bounce">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-24 h-24 text-gray-300 mx-auto opacity-80"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            You need to be logged in to view your cart
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Sign In →
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 text-blue-600 animate-spin mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Loading cart...</h2>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 animate-bounce">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-24 h-24 text-gray-300 mx-auto opacity-80"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Discover amazing products and add them to your cart!
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {items.length} item{items.length !== 1 ? "s" : ""} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card-elevated overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 flex gap-6 hover:bg-blue-50/30 transition-colors ${
                    index !== items.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-lg shadow-md hover:shadow-lg transition"
                    />
                  </Link>

                  <div className="flex-grow">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-bold text-gray-900 hover:text-blue-600 transition text-lg">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Line total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <div className="text-right text-sm text-gray-600">
                      Qty: <span className="font-bold text-gray-900">{item.quantity}</span>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => dispatch(clearCartAPI())}
                className="px-6 py-3 text-red-600 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
              <Link
                to="/products"
                className="px-6 py-3 text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-elevated sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-200">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-bold text-gray-900">{formatPrice(taxAmount)}</span>
                </div>
                {savingsAmount > 0 && (
                  <div className="flex justify-between items-center bg-green-50 -mx-6 -mb-3 px-6 py-3 rounded-b-lg">
                    <span className="text-green-700 font-semibold">You save</span>
                    <span className="font-bold text-green-700">{formatPrice(savingsAmount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8 bg-blue-50 -mx-6 -mb-6 px-6 py-4 rounded-lg">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {formatPrice(totalWithTax)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold rounded-lg hover:shadow-lg-premium transition-all mb-3 hover:scale-105"
              >
                Proceed to Checkout
              </Link>

              <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600 mt-8 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-lg mb-1">📦</div>
                  <div>Free Shipping</div>
                </div>
                <div>
                  <div className="text-lg mb-1">🔒</div>
                  <div>Secure Check</div>
                </div>
                <div>
                  <div className="text-lg mb-1">↩️</div>
                  <div>Easy Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
