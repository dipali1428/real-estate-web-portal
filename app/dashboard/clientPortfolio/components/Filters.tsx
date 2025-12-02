"use client"
import React from 'react';
import { categories } from '../utils/categories';

interface FiltersProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedSubcategory: string;
    setSelectedSubcategory: (subcategory: string) => void;
    availableSubcategories: string[];
}

const Filters: React.FC<FiltersProps> = ({
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    availableSubcategories
}) => {
    return (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Category
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-slate-600 text-sm sm:text-base"
                >
                    {Object.keys(categories).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Product
                </label>
                <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-slate-600 text-sm sm:text-base"
                >
                    {availableSubcategories.map(subcategory => (
                        <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;