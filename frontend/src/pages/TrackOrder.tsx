import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    // Mock order data for demonstration
    const mockOrders: Record<string, any> = {
      "ORD-123456": {
        orderNumber: "ORD-123456",
        date: "February 15, 2024",
        total: "$89.99",
        items: [
          { name: "Wireless Headphones", quantity: 1 },
          { name: "Phone Case", quantity: 2 }
        ],
        status: "shipped",
        statusStep: 3,
        steps: [
          { title: "Order Placed", date: "Feb 15", completed: true },
          { title: "Processing", date: "Feb 16", completed: true },
          { title: "Shipped", date: "Feb 17", completed: true },
          { title: "In Transit", date: "Feb 19", completed: false },
          { title: "Delivered", date: "Est. Feb 22", completed: false }
        ],
        trackingNumber: "1Z999AA10123456784",
        carrier: "FedEx",
        lastUpdate: "Currently in transit to your location"
      },
      "ORD-789012": {
        orderNumber: "ORD-789012",
        date: "February 10, 2024",
        total: "$45.50",
        items: [
          { name: "USB Cable", quantity: 3 }
        ],
        status: "delivered",
        statusStep: 5,
        steps: [
          { title: "Order Placed", date: "Feb 10", completed: true },
          { title: "Processing", date: "Feb 11", completed: true },
          { title: "Shipped", date: "Feb 12", completed: true },
          { title: "In Transit", date: "Feb 14", completed: true },
          { title: "Delivered", date: "Feb 15", completed: true }
        ],
        trackingNumber: "1Z888BB20234567891",
        carrier: "UPS",
        lastUpdate: "Delivered on February 15, 2024 at 2:30 PM"
      }
    };

    if (orderNumber.trim() === "") {
      setError("Please enter an order number");
      setOrderData(null);
      return;
    }

    const order = mockOrders[orderNumber.toUpperCase()];
    if (order) {
      setOrderData(order);
      setError("");
    } else {
      setError("Order not found. Try ORD-123456 or ORD-789012 for demo data.");
      setOrderData(null);
    }
  };

  return (
    <div className="flex-grow bg-gray-50 flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-gray-600">Enter your order number to track your shipment in real-time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter order number (e.g., ORD-123456)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors duration-300"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Track Order
            </button>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {!orderData && !error && (
            <p className="text-gray-500 text-sm">
              Try entering ORD-123456 or ORD-789012 to see sample tracking data
            </p>
          )}
        </div>

        {orderData && (
          <>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Order Number</h3>
                  <p className="text-lg font-bold text-gray-900">{orderData.orderNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Order Date</h3>
                  <p className="text-lg font-bold text-gray-900">{orderData.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Order Total</h3>
                  <p className="text-lg font-bold text-gray-900">{orderData.total}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Status</h3>
                  <p className="text-lg font-bold text-green-600 capitalize">{orderData.status}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Items</h3>
              <ul className="space-y-3 mb-8">
                {orderData.items.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Shipment Status</h3>
              
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  <strong className="text-gray-900">Last Update:</strong> {orderData.lastUpdate}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong className="text-gray-900">Tracking Number:</strong> {orderData.trackingNumber}
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Carrier:</strong> {orderData.carrier}
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>

                {/* Timeline steps */}
                <div className="space-y-6">
                  {orderData.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-4 relative z-10">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        step.completed ? "bg-green-600" : "bg-gray-300"
                      }`}>
                        {step.completed ? (
                          <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div className="flex-grow pt-2">
                        <p className={`font-semibold ${step.completed ? "text-gray-900" : "text-gray-600"}`}>
                          {step.title}
                        </p>
                        <p className={step.completed ? "text-sm text-gray-600" : "text-sm text-gray-500"}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Need Help?</h2>
              <p className="text-blue-800 mb-4">
                If you have any questions about your order or shipment, our customer support team is here to help.
              </p>
              <a href="mailto:support@shophub.com" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Contact Support
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
