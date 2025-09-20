"use client"

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const page = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  
  return (
    <>
      <h1>This is the order page</h1>
      <h1>{cartItems.title}</h1>
    </>
  );
};

export default page;
