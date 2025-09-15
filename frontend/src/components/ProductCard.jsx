import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ title, price, imageUrl, stock, user }) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-[400px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 bg-white">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Stock indicator badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            stock <= 10 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}>
            {stock} left
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{title}</h3>
        
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-blue-600">Rs. {price.toLocaleString()}</p>
          
          {stock <= 3 && (
            <span className="text-xs text-red-500 font-medium">Low stock!</span>
          )}
        </div>
        
        <div className="pt-2">
          <button 
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart/>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;