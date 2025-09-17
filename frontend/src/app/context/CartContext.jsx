"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ✅ Start empty to avoid SSR/localStorage error
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load from localStorage only on client after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cartItems");
      if (saved) setCartItems(JSON.parse(saved));
    }
  }, []);

  // ✅ Save to localStorage whenever cartItems changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // 🔹 Clear cart when user logs out
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
    }
  }, [user]);

  const addToCart = (item) => {
    if (!user) {
      toast.error("You must be logged in to add items to the cart!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return; // stop here if not logged in
    }

    setCartItems((prev) => {
      // check by id
      const existingItem = prev.find((p) => p.id === item.id);
      if (existingItem) {
        // increase quantity of that product
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // add new product with quantity 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    toast.success(`${item.title} added to cart!`);
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
        );
      } else {
        return prev.filter((p) => p.id !== item.id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
