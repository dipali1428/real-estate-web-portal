"use client"
import React from 'react';

interface ProductDistributionProps {
    productDistribution: { [key: string]: number };
}

const ProductDistribution: React.FC<ProductDistributionProps> = ({ productDistribution }) => {
    return (
        <div className="mb-6 bg-white rounded-lg p-4 shadow border">
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">Product Distribution</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
                {Object.entries(productDistribution).map(([product, count]) => (
                    <div key={product} className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full text-xs sm:text-sm">
                        <span className="font-medium text-[#2076C7]">{product}</span>
                        <span className="bg-[#2076C7] text-white px-1.5 py-0.5 rounded-full text-xs">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDistribution;