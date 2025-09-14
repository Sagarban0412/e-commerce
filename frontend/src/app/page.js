import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Product from "@/components/Products";

const page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Product/>
    </>
  );
};

export default page;
