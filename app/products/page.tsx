"use client";
import React, { useState, useEffect } from "react";
import useUrl from "@/common/hooks/useUrl"; // import your useUrl hook here
import { Product, dummyProducts } from "@/common/data"; // path to your dummy products data
import productImage from "@/public/p.png";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [queryParams, setQueryParam] = useUrl();

  // Destructuring the current filter and sort order from the URL query parameters
  const { search, filter, sort } = queryParams;

  useEffect(() => {
    // Function to filter and sort products based on the URL query parameters
    function filterAndSortProducts() {
      let updatedProducts = dummyProducts;

      // Filter by search query
      if (search) {
        updatedProducts = updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Further filter by category if needed
      if (filter) {
        updatedProducts = updatedProducts.filter(
          (product) => product.category === filter
        );
      }

      // Sort products if needed
      if (sort) {
        updatedProducts = updatedProducts.sort((a, b) => {
          if (sort === "price-asc") {
            return a.price - b.price;
          } else if (sort === "price-desc") {
            return b.price - a.price;
          }
          return 0; // default case or implement other sorting
        });
      }

      setProducts(updatedProducts);
    }

    filterAndSortProducts();
  }, [search, filter, sort]);

  // Handlers to update the URL query parameters
  const handleSearch = (term: string) => {
    setQueryParam("search", term);
  };

  const handleFilter = (category: string) => {
    setQueryParam("filter", category);
  };

  const handleSort = (sortOrder: string) => {
    setQueryParam("sort", sortOrder);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search, Filter, and Sort UI */}
      <SearchFilterSort
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />

      {/* Products listing */}
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-semibold mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

// ProductCard.tsx
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-56 object-cover object-center"
        src={product.imageUrl || productImage.src}
        alt={product.name}
      />
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{product.name}</h3>
        <span className="text-gray-500 mt-2">${product.price}</span>
      </div>
    </div>
  );
};

// Search and Filter component
const SearchFilterSort: React.FC<{
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
  onSort: (sortOrder: string) => void;
}> = ({ onSearch, onFilter, onSort }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
        <div className="flex items-center border-b border-gray-200 py-2 mr-4">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="text-gray-500">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* SVG path for search icon */}
            </svg>
          </button>
        </div>
        <div>
          <button
            className="text-sm rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 px-4 py-1"
            onClick={() => onFilter("Electronics")}
          >
            Electronics
          </button>
          <button
            className="text-sm rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 px-4 py-1 ml-2"
            onClick={() => onFilter("Home")}
          >
            Home
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="sort" className="text-gray-700 mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          className="rounded border border-gray-300"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
