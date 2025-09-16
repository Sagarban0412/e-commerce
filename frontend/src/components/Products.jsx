"use client"
import React,{useEffect,useState} from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Products = () => {
    const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:5000/api/product");
      setProduct(res.data);
      // console.log(res.data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center font-light text-[32px]">Products</h1>
        <div className="flex gap-10">
            {
          product.map((data,index)=>{
            return(
                <div key={index}>
                    <ProductCard key={data._id} title={data.title} price={data.price} imageUrl={data.image} desc={data.description} stock={data.stock} item={{ ...data, id: data._id }} />
                </div>
            )
          })  
        }
        </div>
      </div>
    </>
  );
};

export default Products;
