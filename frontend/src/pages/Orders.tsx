import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faBox, faTruck, faHome } from "@fortawesome/free-solid-svg-icons";
import { fetchOrders } from "../store/ordersSlice";
import { formatPrice } from "../utils/helpers";
import type { RootState, AppDispatch } from "../store/store";

const orderStatusSteps = ["pending", "processing", "shipped", "delivered"];

export const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { items: orders, loading } = useSelector((state: RootState) => state.orders);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <FontAwesomeIcon icon={faBox} className="w-24 h-24 text-gray-300 mx-auto opacity-80" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            You need to be logged in to view your orders
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
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin"
          />
          <p className="text-lg text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-xl text-gray-600 font-medium">
            {orders.length} order{orders.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order) => {
              const isTracking = trackingOrderId === order.id;
              const currentStepIndex = orderStatusSteps.indexOf(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg-premium transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{order.id}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Order Date:{" "}
                          {new Date(order.created_at || "").toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                          {formatPrice(order.total)}
                        </p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-bold mt-3 ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="px-6 py-6 border-b border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 text-lg">Items:</h4>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg"
                          >
                            <span className="text-gray-700">
                              <span className="font-semibold">{item.name || item.product_id}</span>{" "}
                              (x
                              {item.quantity})
                            </span>
                            <span className="font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tracking Button */}
                  <div className="px-6 py-4 bg-gray-50 flex gap-3">
                    <button
                      onClick={() => setTrackingOrderId(isTracking ? null : order.id)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {isTracking ? "Hide Tracking" : "Track Order"}
                    </button>
                  </div>

                  {/* Order Tracking Timeline */}
                  {isTracking && (
                    <div className="px-6 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-8 text-lg">
                        Order Status Timeline
                      </h5>
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600" />

                        {/* Timeline steps */}
                        <div className="space-y-8">
                          {orderStatusSteps.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            const stepNames: Record<string, string> = {
                              pending: "Order Placed",
                              processing: "Processing",
                              shipped: "Shipped",
                              delivered: "Delivered",
                            };
                            const stepIcons: Record<string, any> = {
                              pending: faBox,
                              processing: faSpinner,
                              shipped: faTruck,
                              delivered: faHome,
                            };

                            return (
                              <div key={step} className="flex items-start">
                                {/* Step circle */}
                                <div
                                  className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full font-bold text-white transition-all duration-300 ${
                                    isCompleted
                                      ? isCurrent
                                        ? "bg-gradient-to-br from-blue-500 to-blue-700 ring-4 ring-blue-200 scale-110"
                                        : "bg-gradient-to-br from-green-500 to-green-600"
                                      : "bg-gradient-to-br from-gray-300 to-gray-400"
                                  }`}
                                >
                                  <FontAwesomeIcon
                                    icon={stepIcons[step]}
                                    className={`w-6 h-6 ${isCurrent ? "animate-spin" : ""}`}
                                  />
                                </div>

                                {/* Step content */}
                                <div className="ml-6 flex-1 pt-1">
                                  <p
                                    className={`font-bold text-lg ${isCompleted ? "text-gray-900" : "text-gray-500"}`}
                                  >
                                    {stepNames[step]}
                                  </p>
                                  <p
                                    className={`text-sm mt-1 ${isCompleted ? "text-gray-600" : "text-gray-400"}`}
                                  >
                                    {isCurrent
                                      ? "Your order is currently in this status"
                                      : isCompleted
                                        ? "Completed"
                                        : "Pending"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <FontAwesomeIcon icon={faBox} className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Start Shopping →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
