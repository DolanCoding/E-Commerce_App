import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faClock, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const Returns = () => {
  return (
    <div className="flex-grow bg-gray-50 flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
          <p className="text-xl text-gray-600">We stand behind our products with a 30-day return guarantee</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Return Policy</h2>
          <p className="text-gray-700 mb-6">
            We want you to be 100% satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of purchase for a full refund or exchange.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100">
                  <FontAwesomeIcon icon={faClock} className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">30-Day Return Window</h3>
                <p className="text-gray-700 mt-2">All items must be returned within 30 days of the original purchase date. Returns received after this period will not be accepted.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100">
                  <FontAwesomeIcon icon={faBox} className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Return Condition</h3>
                <p className="text-gray-700 mt-2">Items must be unused, unwashed, and in original condition with all tags attached. Used items may be rejected or subject to a restocking fee.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Return Shipping</h3>
                <p className="text-gray-700 mt-2">For orders over $100, we'll provide a prepaid shipping label. For orders under $100, customers cover return shipping costs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Return an Item</h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">1</span>
              <span><strong>Contact Support:</strong> Email us at returns@shophub.com with your order number and reason for return.</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">2</span>
              <span><strong>Receive Authorization:</strong> We'll provide you with a return authorization number and shipping instructions.</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">3</span>
              <span><strong>Ship Your Item:</strong> Package the item securely and send it to our returns address with your authorization number.</span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">4</span>
              <span><strong>Receive Refund:</strong> Once we receive and inspect your return, you'll get a refund within 5-7 business days.</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
