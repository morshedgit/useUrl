// ProductCard.tsx
import React from "react";
import { Product } from "@/common/types";
import productImage from "@/public/p.png";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-56 object-cover object-center"
        src={product.imageUrl || productImage.src}
        alt={product.name}
      />
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{product.name}</h3>
        <span className="text-gray-500 mt-2">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
