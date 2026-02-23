import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCart, useAuth } from "../store/hooks";
import { logout } from "../store/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { getItemCount } = useCart();
  const { user, isLoggedIn } = useAuth();
  const cartItemCount = getItemCount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <Link
            to="/home"
            className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent hover:opacity-80 transition flex-shrink-0"
          >
            ShopHub
          </Link>

          <nav className="hidden md:flex gap-10 items-center absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/home"
              className="text-gray-700 font-medium hover:text-blue-600 transition-premium relative group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/products"
              className="text-gray-700 font-medium hover:text-blue-600 transition-premium relative group"
            >
              Products
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/orders"
              className="text-gray-700 font-medium hover:text-blue-600 transition-premium relative group"
            >
              Orders
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/cart" className="relative group transition-all duration-300 hover:scale-110">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg-premium animate-pulse hover:animate-none">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              {isLoggedIn && user ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-premium font-medium"
                  >
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg-premium border border-gray-100 py-2 z-10">
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-premium"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-premium font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-premium font-medium text-sm sm:text-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg-premium transition-premium font-medium text-sm sm:text-base"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
