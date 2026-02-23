import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart, useAuth } from "../store/hooks";
import { clearCartAPI } from "../store/cartSlice";
import { formatPrice } from "../utils/helpers";
import { ordersAPI } from "../api/orders";
import type { AppDispatch } from "../store/store";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, getTotalPrice } = useCart();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (items.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Your cart is empty</h2>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Please login to checkout</h2>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order with cart items
      const cartItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));

      const order = await ordersAPI.createOrder(cartItems);
      await dispatch(clearCartAPI());
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-2 text-gray-900">Checkout</h1>
        <p className="text-lg text-gray-600 mb-10 font-medium">Complete your purchase</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 uppercase tracking-wide">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-6 px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full mt-6 px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                />

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                </div>

                <input
                  type="text"
                  name="zipcode"
                  placeholder="ZIP Code"
                  value={formData.zipcode}
                  onChange={handleChange}
                  required
                  className="w-full mt-6 px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                />
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 uppercase tracking-wide">
                  Payment Information
                </h2>

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                />

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={formData.cvc}
                    onChange={handleChange}
                    required
                    className="px-5 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {loading ? "Processing Payment..." : "Complete Purchase →"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8 sticky top-8 border-l-4 border-green-600">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 uppercase tracking-wide">
                Order Summary
              </h2>

              <div className="space-y-4 border-b-2 pb-8 mb-8 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm font-medium text-gray-800 hover:bg-gray-50 p-2 rounded transition-all"
                  >
                    <span className="text-gray-700">
                      {item.product.name} <br />
                      <span className="text-xs text-gray-500 font-normal">x{item.quantity}</span>
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-gray-800 font-medium">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span>Subtotal:</span>
                  <span className="font-bold">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span>Shipping:</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span>Tax (10%):</span>
                  <span className="font-bold">{formatPrice(getTotalPrice() * 0.1)}</span>
                </div>
              </div>

              <div className="border-t-2 pt-6 mt-6 flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-4 rounded-lg">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(getTotalPrice() * 1.1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
