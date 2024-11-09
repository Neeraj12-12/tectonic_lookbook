import React from "react";

const ProductSlider = ({ products, selectedProduct, onProductClick }) => {
  return (
    <div className="absolute bottom-10 left-0 right-0 overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 px-4 pb-2 snap-x snap-mandatory">
        {products.map((product) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            className={`flex h-28 w-80 bg-white p-2 rounded-lg snap-center ${
              selectedProduct?.id === product.id ? "ring-2 ring-white" : ""
            }`}
            onClick={() => onProductClick(product)}
          >
            <div className="relative aspect-[2/3] mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="text-black text-xs pl-2">
              <p className="font-bold text-xl truncate">{product.name}</p>
              <p className="font-semibold text-xl truncate text-left">{product.price}</p>
            </div>
            <div className="flex justify-center items-center px-4">
              <button className="py-2 px-4 rounded-lg bg-blue-600 text-white">
                Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
