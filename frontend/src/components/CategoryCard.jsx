import React from "react";

const CategoryCard = ({ image, name }) => {
  return (
    <div
      className="w-64 h-40 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="bg-black opacity-60 w-full h-full flex items-center justify-center text-white rounded-2xl text-2xl cursor-pointer hover:opacity-30 hover:bg-white hover:text-black">
        {name}
      </h1>
    </div>
  );
};

export default CategoryCard;
