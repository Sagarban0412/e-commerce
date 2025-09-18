"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import { useRouter } from "next/navigation";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:5000/api/product");
      setProduct(res.data);
    };

    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
      console.log(res.data);
    };
    fetchProduct();
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate to /products with category query
    router.push(`/products?category=${categoryId}`);
  };
  
  return (
    <>
      <div>
        <h1 className="text-center font-light text-[32px]">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          {product.slice(0, 5).map((data, index) => {
            return (
              <div key={index}>
                <ProductCard
                  key={data._id}
                  title={data.title}
                  price={data.price}
                  imageUrl={data.image}
                  desc={data.description}
                  stock={data.stock}
                  item={{ ...data, id: data._id }}
                />
              </div>
            );
          })}
        </div>
        <h1 className="text-center font-light text-[32px]">Category</h1>
        <div className="flex justify-center gap-5 my-5 py-5">
          {categories.map((data) => {
            return (
              <div key={data._id}
              onClick={()=>handleCategoryClick(data._id)}
              >
                <CategoryCard image={data.image} name={data.name} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
