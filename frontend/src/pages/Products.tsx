import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ProductCard } from "../components/ProductCard";
import { SearchFilter } from "../components/SearchFilter";
import { fetchProducts } from "../store/productsSlice";
import { filterProducts, sortProducts } from "../utils/helpers";
import type { RootState, AppDispatch } from "../store/store";

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, searchTerm, selectedCategory);
    result = sortProducts(result, sortBy);
    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
          {loading ? (
            <p className="text-xl text-gray-600 font-medium flex items-center gap-2">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Loading products...
            </p>
          ) : (
            <p className="text-xl text-gray-600 font-medium">
              {searchTerm || selectedCategory
                ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`
                : `Browse our ${products.length} premium products`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <SearchFilter
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
              categories={categories}
            />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="card-elevated text-center py-24 px-8 shadow-lg">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="w-16 h-16 text-blue-600 mx-auto animate-spin mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading products...</h3>
                <p className="text-gray-600">Please wait while we fetch your products</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="mt-16 p-10 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-lg border-2 border-blue-200 shadow-md text-center">
                  <p className="text-gray-800 font-semibold text-lg">
                    ✨ Showing{" "}
                    <span className="font-bold text-blue-600">{filteredProducts.length}</span> of{" "}
                    <span className="font-bold text-blue-600">{products.length}</span> products
                  </p>
                </div>
              </div>
            ) : (
              <div className="card-elevated text-center py-24 px-8 shadow-lg">
                <div className="animate-bounce mb-8">
                  <FontAwesomeIcon
                    icon={faFaceSmile}
                    className="w-32 h-32 text-gray-300 mx-auto opacity-80"
                  />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                  Try adjusting your filters or search terms to find what you're looking for
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                    setSortBy("default");
                  }}
                  className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95 uppercase tracking-wide"
                >
                  Reset Filters →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
