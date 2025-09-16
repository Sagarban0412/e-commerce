"use client";
import React from "react";
import Cart from "./Cart";
import { X } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          <Cart />
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
