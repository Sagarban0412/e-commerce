"use client";
import React, { useEffect, useContext } from "react";
import { CartContext } from "@/app/context/cart";

const SuccessPage = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // clear the cart when user lands here
    clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
      <p className="text-lg mb-6">Thank you for your purchase!</p>
      <a
        href="/"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Go to Home
      </a>
    </div>
  );
};

export default SuccessPage;
