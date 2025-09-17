"use client";
import React, { useContext } from "react";
import { CartContext } from "@/app/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const page = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  // console.log(cartItems);

  const makePayment = async () => {
    console.log(cartItems);

    const stripe = await loadStripe(
      "pk_test_51S8M5QP0DRUWvT9AlMG8qQc7naAlQwUcVpY6kfzTwoFQXVg6ssVPHEi3kQ3fCFT6XWTYwr5NqEyyEaQdXKr31zDb0034dUVWkz"
    );

    const body = { products: cartItems };
    const headers = { "Content-Type": "application/json" };

    try {
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        body,
        { headers }
      );

      const session = response.data; // contains {id: session.id}

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error.message);
      }
      clearCart()
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm mb-10">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center" key={item._id}>
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-md h-24"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                clearCart();
              }}
            >
              Clear cart
            </button>
            <button
              className="mt-5 px-4 py-2 bg-green-700 w-full rounded-xl cursor-pointer text-md font-bold text-white"
              onClick={() => makePayment()}
            >
              CheckOut
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
      </div>
    </>
  );
};

export default page;
