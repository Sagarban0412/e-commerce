import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCard = ({ title, price, imageUrl, desc, stock }) => {
  return (
    <>
      <div className="px-10">
        <div className="w-[400px] rounded-xl  shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-2 space-y-1">
            <h1 className="font-semibold text-xl">{title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-md">RS. {price}</p>
              <p className="text-md">{stock} left</p>
            </div>
            <p className="line-clamp-1 text-md">{desc}</p>
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
              <Button asChild>
                <Link href="/">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
