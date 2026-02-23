import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faTwitter, faPaypal } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="text-center flex flex-col items-center">
            <Link
              to="/home"
              onClick={() => window.scrollTo(0, 0)}
              className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-4 block"
            >
              ShopHub
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your premier destination for quality products and exceptional shopping experiences.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-125 transition-all duration-300 hover:shadow-lg-premium rounded-full p-2">
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-125 transition-all duration-300 hover:shadow-lg-premium rounded-full p-2">
                <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-125 transition-all duration-300 hover:shadow-lg-premium rounded-full p-2">
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center">
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-6">
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
          <div className="flex gap-8">
            <FontAwesomeIcon icon={faPaypal} className="w-10 h-10 hover:text-blue-400 transition-all duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
};
