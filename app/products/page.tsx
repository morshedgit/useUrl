"use client";

import { useProducts } from "@/common/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { SearchFilterSort } from "@/components/SearchFilterSort";

const ProductPage: React.FC = () => {
  const { filteredProducts } = useProducts();
  return (
    <div className="container mx-auto p-4">
      <SearchFilterSort />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
