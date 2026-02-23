import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "../types";
import { formatPrice } from "../utils/helpers";
import { addToCart } from "../store/cartSlice";
import type { RootState, AppDispatch } from "../store/store";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ product_id: product.id, quantity: 1 }));
  };

  return (
    <div className="card-elevated group overflow-hidden shadow-md hover:shadow-xl-premium transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block flex-shrink-0">
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition group-hover:text-blue-600 line-clamp-2 text-sm mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>

        <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-semibold">Price</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:shadow-lg-premium transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none hover:scale-105 active:scale-95"
          >
            {product.in_stock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};
