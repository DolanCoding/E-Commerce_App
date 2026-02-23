import { useParams, Link } from "react-router-dom";

export const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-md">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed!</h1>

        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-gray-600 mb-8">Your order has been successfully placed.</p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-sm text-gray-600 mb-2">Order ID:</p>
          <p className="text-xl font-bold text-indigo-600">{orderId}</p>
        </div>

        <p className="text-gray-600 mb-8">
          We'll send you an email confirmation with tracking information shortly. You can also check
          your orders anytime.
        </p>

        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            View My Orders
          </Link>
          <Link
            to="/products"
            className="block w-full px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
