import { FC } from "react";

export interface ProductCardProps {
  title: string;
  description: string;
  onClick: () => void;
  activeLeads?: number;
  converted?: number;
}

const ProductCard: FC<ProductCardProps> = ({ 
  title, 
  description, 
  onClick, 
  activeLeads = 0, 
  converted = 0 
}) => (
  <div className="bg-white text-black rounded-lg shadow-lg p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-blue-200 min-h-[220px]">
    <div className="flex-1">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="flex items-center justify-between my-2 sm:my-4 space-x-2">
      <div className="text-center flex-1">
        <span className="text-lg sm:text-xl font-bold text-blue-600">{activeLeads}</span>
        <p className="text-xs text-gray-600 mt-1">Active Leads</p>
      </div>
      <div className="text-center flex-1">
        <span className="text-lg sm:text-xl font-bold text-blue-600">{converted}</span>
        <p className="text-xs text-gray-600 mt-1">Converted</p>
      </div>
    </div>
    <button 
      onClick={onClick}
      className="w-full bg-linear-to-t from-[#2076C7] to-[#1CADA3] text-white py-2 px-3 rounded text-sm hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
    >
      Click to Add New
    </button>
  </div>
);

export default ProductCard;