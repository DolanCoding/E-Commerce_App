import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8 sm:p-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faInfoCircle} className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-6">
          Welcome to ShopHub
        </h1>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <h2 className="font-bold text-gray-900 mb-2">📋 Important Notice</h2>
            <p className="text-gray-700">
              This is a <strong>portfolio project</strong> designed to showcase frontend development skills. All data presented on this website is <strong>mock/simulated data</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">What's Simulated:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700"><strong>Products:</strong> Mock product data with sample images and pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700"><strong>User Accounts:</strong> Authentication is simulated client-side only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700"><strong>Shopping Cart:</strong> Data stored in local Redux state (lost on refresh)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700"><strong>Orders:</strong> Sample order data for demonstration purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">✓</span>
                <span className="text-gray-700"><strong>Payment:</strong> No real payment processing</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">🎯 Purpose</h3>
            <p className="text-gray-700">
              This application demonstrates expertise in React, TypeScript, Redux state management, Tailwind CSS, and responsive UI/UX design.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to="/home"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-center"
          >
            Enter Application
          </Link>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 ShopHub Portfolio Project
        </p>
      </div>
    </div>
  );
};
