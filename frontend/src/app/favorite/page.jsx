"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

const Page = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let fav = JSON.parse(localStorage.getItem("favorite"));

    if (!fav) {
      fav = [];
    } else if (!Array.isArray(fav)) {
      fav = [fav];
    }

    setProduct(fav);
  }, []);

  return (
    <>
      <Header />
      {product.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No favorites yet</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-10">
        {product.map((data) => (
        <ProductCard
          key={data._id}
          title={data.title}
          price={data.price}
          imageUrl={data.image}
          desc={data.description}
          stock={data.stock}
          item={{ ...data, id: data._id }}
        />
      ))}
      </div>
    </>
  );
};

export default Page;
