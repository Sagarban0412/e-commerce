import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-[800px]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-6">
          {/* Text Section */}
          <div className="flex-1 text-white space-y-6 md:pr-10">
            <h1 className="font-bold text-4xl md:text-6xl leading-tight">
              Smart Devices. <br /> Smarter Living.
            </h1>
            <p className="text-lg md:text-xl max-w-lg">
              Find the latest tech products at unbeatable prices — from laptops
              to wearables, all in one place.
            </p>
            <button className="inline-block px-6 py-3 text-lg font-semibold text-indigo-600 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-300">
              Shop Now
            </button>
          </div>

          {/* Image Section */}
          <div className="flex-1 mt-5 md:mt-0 hidden md:block">
            <img
              src="/images/bg.png"
              alt="Tech background"
              className="w-full max-w-md mx-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
