import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUsers, faAward } from "@fortawesome/free-solid-svg-icons";

export const About = () => {
  return (
    <div className="flex-grow flex flex-col justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About ShopHub</h1>
          <p className="text-xl text-gray-600">Delivering quality products and exceptional service since 2024</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card-elevated text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faUsers} className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">To provide customers with a seamless shopping experience and access to quality products at competitive prices.</p>
          </div>

          <div className="card-elevated text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faAward} className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600">Customer satisfaction, integrity, and sustainability guide every decision we make.</p>
          </div>

          <div className="card-elevated text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Story</h3>
            <p className="text-gray-600">Founded by passionate entrepreneurs, ShopHub has grown to serve thousands of satisfied customers worldwide.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Wide selection of quality products</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Competitive pricing and regular discounts</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Fast and reliable shipping</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">24/7 customer support</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Easy returns and exchanges</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all hover:scale-105"
          >
            Start Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
};
