"use client";

import { MoveLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    cat: "",
    stock: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState([]);

  // ✅ Fetch all categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category");
        setCategory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, []);

  // ✅ Fetch product details by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        const product = res.data;
        setFormData({
          title: product.title,
          price: product.price,
          desc: product.description,
          cat: product.category,
          stock: product.stock,
          image: null,
        });
        setPreview(product.image); // if image URL saved in DB
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.desc); // must match backend field name
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.cat);
    if (formData.image) data.append("image", formData.image); // ✅ only add if new image chosen

    try {
      await axios.put(`http://localhost:5000/api/product/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // alert("Product updated successfully");
      router.push("/admin/products")
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex flex-col items-center h-[calc(100vh-100px)] w-[calc(100vw-500px)] px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-center w-full max-w-2xl mb-6">
        <h1 className="text-2xl font-semibold text-center">Update Product</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl flex flex-col gap-5"
      >
        <input
          type="text"
          name="title"
          placeholder="Product title"
          className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          className="h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="desc"
          rows="4"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the Description"
          value={formData.desc}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4">
          <select
            name="cat"
            value={formData.cat}
            onChange={handleChange}
            className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          <label
            htmlFor="image"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Upload Image
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Page;
