import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCheckCircle,
  faLock,
  faPhone,
  faCheck,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "calc(40vh - 120px)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
            <circle cx="200" cy="150" r="200" fill="white" />
            <circle cx="1000" cy="500" r="300" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="text-center">
            <div className="badge badge-primary mb-4 bg-blue-400/30 text-blue-100 border border-blue-300/50 inline-block">
              Welcome to ShopHub
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Discover Products That <span className="text-yellow-300">Inspire</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100 leading-relaxed text-center">
              Shop electronics, accessories, and more from premium brands. Get free shipping on
              orders over $50 and enjoy hassle-free returns.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:shadow-xl-premium transition-all hover:scale-105"
            >
              Explore Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 min-h-[25vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center hover:bg-blue-50 p-4 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md transition-transform hover:scale-110 mb-4">
                <FontAwesomeIcon icon={faTruck} className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">$50+ Free Shipping</h3>
                <p className="text-sm text-gray-600">On all orders nationwide</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center hover:bg-green-50 p-4 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md transition-transform hover:scale-110 mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">30-Day Returns</h3>
                <p className="text-sm text-gray-600">Hassle-free refunds</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center hover:bg-purple-50 p-4 rounded-lg transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md transition-transform hover:scale-110 mb-4">
                <FontAwesomeIcon icon={faLock} className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Checkout</h3>
                <p className="text-sm text-gray-600">256-bit SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-[25vh] bg-gray-50 flex flex-col justify-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ShopHub?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering an exceptional shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-elevated text-center hover-lift transition-all hover:shadow-xl-premium">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 shadow-md">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="w-10 h-10 text-blue-600 transition-transform hover:rotate-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our customer support team is always ready to help you with any questions or
                concerns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-elevated text-center hover-lift transition-all hover:shadow-xl-premium">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 shadow-md">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="w-10 h-10 text-green-600 transition-transform hover:rotate-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">
                All products are verified and sourced from trusted brands to ensure maximum quality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-elevated text-center hover-lift transition-all hover:shadow-xl-premium">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 shadow-md">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="w-10 h-10 text-orange-600 transition-transform hover:rotate-12"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Great Prices</h3>
              <p className="text-gray-600">
                Get unbeatable prices on premium products with exclusive discounts and offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Start Shopping Today</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog and find exactly what you're looking for
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:shadow-xl-premium transition-all hover:scale-105"
          >
            View All Products →
          </Link>
        </div>
      </section>
    </div>
  );
};
