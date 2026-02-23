import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBox, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const ShippingInfo = () => {
  return (
    <div className="flex-grow bg-gray-50" style={{ maxHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-600">Fast, reliable delivery to your doorstep</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faBox} className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Standard Shipping</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Delivery Time:</strong> 5-7 business days</li>
              <li><strong>Cost:</strong> $5.99 (Free over $50)</li>
              <li><strong>Tracking:</strong> Real-time updates</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faTruck} className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Express Shipping</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Delivery Time:</strong> 2-3 business days</li>
              <li><strong>Cost:</strong> $14.99</li>
              <li><strong>Tracking:</strong> Real-time updates</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Overnight Shipping</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Delivery Time:</strong> Next business day</li>
              <li><strong>Cost:</strong> $24.99</li>
              <li><strong>Tracking:</strong> Real-time updates</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Regions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Domestic (USA & Canada)</h3>
              <p className="text-gray-700 mb-4">
                We ship to all 50 US states and Canadian provinces. Orders are typically processed within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">International</h3>
              <p className="text-gray-700 mb-4">
                We ship to select countries in Europe and Asia. International shipping costs vary. Check during checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you ship to PO boxes?</h3>
              <p className="text-gray-700">No, we only ship to street addresses in the United States and Canada.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Can I change my shipping address after ordering?</h3>
              <p className="text-gray-700">Yes, if you contact us within 2 hours of placing your order.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">What if my package is lost or damaged?</h3>
              <p className="text-gray-700">We'll investigate and either reship the item or provide a full refund.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Do you offer signature confirmation?</h3>
              <p className="text-gray-700">Yes, available for an additional $3.99 fee upon request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
