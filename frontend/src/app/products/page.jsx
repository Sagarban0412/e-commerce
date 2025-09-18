"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromURL = searchParams.get("category");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState(categoryFromURL || "All");

  // price filter states
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);

  // sort order: "none" | "lowToHigh" | "highToLow"
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategory();
    fetchProduct();
  }, []);

  // Whenever user clicks a category, update state and URL
  const handleCategoryClick = (categoryId) => {
    setMenu(categoryId);
    if (categoryId === "All") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${categoryId}`, { scroll: false });
    }
  };

  // Filter by category and price
  let filteredProducts = products.filter((p) => {
    const categoryMatch = menu === "All" || p.category === menu;
    const priceMatch =
      Number(p.price) >= minPrice && Number(p.price) <= maxPrice;
    return categoryMatch && priceMatch;
  });

  // Sort filtered products
  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  return (
    <>
      <Header />
      <div className="flex">
        {/* LEFT SIDEBAR */}
        <div className="w-64 h-screen sticky top-[88px] shadow-xl p-4 bg-white">
          <h1 className="text-center text-2xl font-serif mb-6">Category</h1>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`px-4 py-2 rounded-3xl ${
                menu === "All"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              All
            </button>

            {categories.map((data) => (
              <button
                key={data._id}
                onClick={() => handleCategoryClick(data._id)}
                className={`px-4 py-2 rounded-3xl ${
                  menu === data._id
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {data.name}
              </button>
            ))}
          </div>

          {/* PRICE FILTER */}
          <div className="mt-10">
            <h2 className="text-center text-xl font-serif mb-4">Filter by Price</h2>
            <div className="flex flex-col space-y-2">
              <label className="text-sm">Min Price: {minPrice}</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="10"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <label className="text-sm">Max Price: {maxPrice}</label>
              <input
                type="range"
                min="0"
                max="300000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 pl-10 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Products</h1>

            {/* SORT DROPDOWN */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="none">Sort by</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((data) => (
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
        </div>
      </div>
    </>
  );
};

export default Page;
