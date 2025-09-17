"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/app/context/cart";
import Header from "@/components/Header";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
 const [addedToCart, setAddedToCart] = useState(false);

  // Use your existing CartContext
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [id]);

  // Check if product is already in cart
  useEffect(() => {
    if (product && cartItems) {
      const cartItem = cartItems.find((item) => item.id === product.id);
    }
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-96">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Product not found
      </div>
    );

  // Check if product has multiple images
  const hasMultipleImages = product.images && product.images.length > 1;
  const images = hasMultipleImages ? product.images : [product.image];
  const mainImage = images[selectedImage] || product.image;

  // Get current quantity in cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="md:w-1/2">
              <div className="sticky top-24">
                <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
                  {mainImage && (
                    <Image
                      src={
                        typeof mainImage === "string"
                          ? mainImage
                          : mainImage.url
                      }
                      alt={product.title || "Product"}
                      height={700}
                      width={700}
                      className="w-full h-full object-cover"
                      priority
                    />
                  )}
                </div>

                {hasMultipleImages && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden rounded-lg border-2 ${
                          selectedImage === index
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={typeof img === "string" ? img : img.url}
                          alt={`${product.title} view ${index + 1}`}
                          height={150}
                          width={150}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 py-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">(24 reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </h2>
                <p
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>
              </div>

              <div className="prose prose-lg text-gray-700 mb-8">
                <p>{product.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">Quantity</p>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                  <button
                    onClick={handleDecrement}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus/>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 text-center border-x border-gray-300 py-2 outline-none"
                  />
                  <button
                    onClick={handleIncrement}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                    aria-label="Increase quantity"
                  >
                    <Plus/>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={addedToCart ? handleRemoveFromCart : handleAddToCart}
                  className={` flex justify-center items-center gap-4 flex-1 font-medium py-3 px-6 rounded-lg transition duration-200 bg-blue-600 hover:bg-blue-700 text-white`}
                >
                  <ShoppingCart/>
                  Add to cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                  <Heart/>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Product Details
                </h3>
                <dl className="divide-y divide-gray-200">
                  <div className="py-2 grid grid-cols-3 gap-4">
                    <dt className="text-gray-500">SKU</dt>
                    <dd className="text-gray-900 col-span-2">N/A</dd>
                  </div>
                  <div className="py-2 grid grid-cols-3 gap-4">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="text-gray-900 col-span-2">N/A</dd>
                  </div>
                  <div className="py-2 grid grid-cols-3 gap-4">
                    <dt className="text-gray-500">Shipping</dt>
                    <dd className="text-gray-900 col-span-2">
                      Free shipping for orders over $50
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
