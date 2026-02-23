import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchFilterProps {
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sort: string) => void;
  categories: string[];
}

export const SearchFilter = ({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  categories,
}: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState("default");

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, onSearchChange]);

  return (
    <div className="card-elevated">
      <h3 className="text-lg font-bold text-gray-900 mb-6"># Filters & Search</h3>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Search Products</label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find a product..."
              className="flex-1 min-w-0 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300"
            />
            <button
              className="flex-shrink-0 p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg-premium transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                onCategoryChange(null);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-premium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  onCategoryChange(category);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-premium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
          <select
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
              onSortChange(e.target.value);
            }}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 font-medium transition"
          >
            <option value="default">Most Relevant</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">⭐ Top Rated</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || searchTerm) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
              onSearchChange("");
              onCategoryChange(null);
            }}
            className="w-full px-4 py-2.5 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
