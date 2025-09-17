import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Product from "@/components/Products";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000} // 1 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Header />
      <HeroSection />
      <Product />
    </>
  );
};

export default page;
