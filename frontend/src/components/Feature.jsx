import React from "react";

const Feature = ({ src, name, desc }) => {
  return (
    <div className="flex items-center gap-3  bg-white w-full sm:w-auto rounded-lg shadow-md">
      <img src={src} alt={name} className="w-12 h-12" />
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">{name}</h1>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
};

export default function Features() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-10 lg:my-6 py-8"
      style={{
        backgroundImage:
          "url('url')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Feature
        name="Responsive"
        desc="Customer service available 24/7"
        src="/images/responsive.png"
      />
      <Feature
        name="Secure"
        desc="Certified marketplace since 2011"
        src="/images/secure.png"
      />
      <Feature
        name="Shipping"
        desc="Free, fast, and reliable worldwide"
        src="/images/shipping.png"
      />
      <Feature
        name="Transparent"
        desc="Hassle-free return policy"
        src="/images/transparent.png"
      />
    </div>
  );
}
