"use client";
import CreateProduct from "@/components/CreateProduct";
import ProductInfo from "@/components/ProductInfo";
import { CirclePlus, Plus } from "lucide-react";
import React, { useState } from "react";

const page = ({ children }) => {
  const [Create, setCreate] = useState(false);

  const handleToggle = () => {
    setCreate(true);
  };

  return (
    <>
      <div className="w-[calc(100vw-420px)] px-30 pt-10">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl">Product Management</h1>
          <CirclePlus
            size={40}
            className="cursor-pointer hover:text-blue-500"
            onClick={handleToggle}
          />
        </div>
        <div>{Create ? <CreateProduct setCreate={setCreate} /> : <ProductInfo />}</div>
      </div>
    </>
  );
};

export default page;
