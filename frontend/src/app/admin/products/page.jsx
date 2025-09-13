"use client";
import CreateProduct from "@/app/admin/products/create/CreateProduct";
import ProductInfo from "@/components/ProductInfo";
import { CirclePlus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ children }) => {
  const [Create, setCreate] = useState(false);

  const router = useRouter();
  const handleToggle = () => {
    setCreate(true);
  };

  return (
    <>
      <div className="w-[calc(100vw-420px)] px-30 ">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl">Product Management</h1>
          <div
            className="flex justify-center items-center gap-2 p-2 rounded-3xl bg-gray-300 cursor-pointer"
            onClick={handleToggle}
          >
            <Plus size={30} className="hover:text-blue-500" />
            <h1>Create</h1>
          </div>
        </div>
        <div>
          {Create ? <CreateProduct setCreate={setCreate} /> : <ProductInfo />}
        </div>
      </div>
    </>
  );
};

export default page;
