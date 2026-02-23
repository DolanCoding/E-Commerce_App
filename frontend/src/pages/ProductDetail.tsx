import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../utils/helpers";
import { addToCart } from "../store/cartSlice";
import { productsAPI } from "../api/products";
import type { Product } from "../types";
import type { AppDispatch, RootState } from "../store/store";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await productsAPI.getById(id);
          setProduct(data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="w-16 h-16 text-blue-600 animate-spin mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Product not found</h2>
          {error && <p className="text-red-600 mb-6">{error}</p>}
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ product_id: product.id, quantity }));
    navigate("/cart");
  };

  return (
    <div className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-bold transition-all duration-300 hover:translate-x-[-4px] uppercase tracking-wide"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4 uppercase tracking-wide border border-blue-200 shadow-sm">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  {[...Array(Math.round(product.rating))].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="w-6 h-6 text-yellow-400 transition-transform hover:scale-110"
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-6">{product.description}</p>

            <div className="mb-8">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
                {formatPrice(product.price)}
              </div>
              <p className="text-gray-600 font-semibold text-lg">
                {product.in_stock ? (
                  <span className="text-green-600 flex items-center gap-2">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 flex items-center gap-2">✗ Out of Stock</span>
                )}
              </p>
            </div>

            {product.in_stock && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <label className="font-bold text-gray-900 uppercase tracking-wide">
                    Quantity:
                  </label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-400 transition-all duration-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 hover:bg-gray-100 text-gray-700 hover:text-blue-600 font-bold transition-all duration-300 active:scale-95"
                    >
                      −
                    </button>
                    <span className="px-6 py-3 font-bold text-lg text-gray-900 border-l-2 border-r-2 border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-5 py-3 hover:bg-gray-100 text-gray-700 hover:text-blue-600 font-bold transition-all duration-300 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wide"
                >
                  Add to Cart →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
