"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateProduct from "@/app/admin/products/create/CreateProduct";

const ProductInfo = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:5000/api/product/");
      console.log(res.data);
      setProducts(res.data);
    };
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete/${id}`);
      // remove from state
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleUpdate = async (id) => {
    router.push(`/admin/products/update/${id}`)
  };
  return (
    <>
      <div className="p-4">
        <table className="w-full ">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, index) => {
              return (
                <tr key={data._id}>
                  <th className="px-4 py-2">{index + 1}</th>
                  <th className="px-4 py-2">{data.title}</th>
                  <th className="px-4 py-2">{data.price}</th>
                  <th className="px-4 py-2">{data.stock}</th>
                  <th className="px-4 py-2">
                    <button
                      className="px-4 py-2 rounded-xl bg-green-300 mr-3 cursor-pointer"
                      onClick={() => handleUpdate(data._id)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 rounded-xl bg-red-300 mr-3 cursor-pointer"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default ProductInfo;
