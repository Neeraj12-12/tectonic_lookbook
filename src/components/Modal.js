import React from "react";

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <div className="text-xl font-semibold">{product.name}</div>
        <img
          src={product.image}
          alt={product.name}
          className="mt-4 w-full h-48 object-cover rounded-lg"
        />
        <p className="mt-2 text-lg">{product.price}</p>
        <p className="mt-2">{product.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
