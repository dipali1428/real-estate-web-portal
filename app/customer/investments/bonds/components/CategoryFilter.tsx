'use client';

import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide shrink-0 font-sans">
      <div className="flex items-center gap-2 text-slate-500 font-semibold mr-2 border-r border-slate-200 pr-4">
        <Filter className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider font-black">Filters</span>
      </div>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
            selectedCategory === cat 
              ? 'bg-[#2076C7] text-white shadow-md' 
              : 'bg-white text-slate-500 border border-slate-100 hover:border-[#2076C7]/30'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}