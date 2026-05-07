"use client";
import React from 'react';
import { Home, Factory, Store, Warehouse, Building, ShoppingBag } from 'lucide-react';

export default function InsurableProperties() {
  const properties = [
    {
      title: "Industrial Plants",
      description: "Coverage for large manufacturing units, factories, and processing plants including machinery.",
      icon: Factory,
      color: "bg-blue-50 text-[#2076C7]",
      delay: "0s"
    },
    {
      title: "Godowns & Warehouses",
      description: "Secure your high-value stock, raw materials, and storage facilities against fire and theft.",
      icon: Warehouse,
      color: "bg-teal-50 text-[#1CADA3]",
      delay: "0.1s"
    },
    {
      title: "Commercial Offices",
      description: "Protection for office buildings, IT parks, and corporate spaces including interiors and equipment.",
      icon: Building,
      color: "bg-blue-50 text-[#2076C7]",
      delay: "0.2s"
    },
    {
      title: "Retail Shops",
      description: "Comprehensive shield for retail outlets, showrooms, and shopping malls against accidental damage.",
      icon: Store,
      color: "bg-teal-50 text-[#1CADA3]",
      delay: "0.3s"
    },
    {
      title: "Residential Units",
      description: "Secure your home, villas, and apartments from unforeseen fire accidents and natural perils.",
      icon: Home,
      color: "bg-blue-50 text-[#2076C7]",
      delay: "0.4s"
    },
    {
      title: "Educational Institutes",
      description: "Specialized coverage for schools, colleges, and training centers protecting assets and infrastructure.",
      icon: ShoppingBag,
      color: "bg-teal-50 text-[#1CADA3]",
      delay: "0.5s"
    }
  ];

  return (
    <section
      className="py-10 md:py-16 bg-white font-sans flex justify-center"
      id="insurable-properties"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 text-center md:text-left">

          <div className="max-w-2xl">
            <div className="text-[#1CADA3] font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
              Diverse Protection Portfolio
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
              Comprehensive Coverage for <br className="hidden md:block" />
              Every Property Type
            </h2>
          </div>

          <p className="text-gray-600 font-medium max-w-md text-sm sm:text-base">
            Whether it&apos;s a small shop or a massive industrial plant, we provide
            tailored insurance solutions for all your assets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 place-items-center">

          {properties.map((prop, idx) => (
            <div
              key={idx}
              className="w-full max-w-md group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#1CADA3]/20 hover:-translate-y-1 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${prop.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <prop.icon size={26} />
              </div>

              <h3 className="text-lg md:text-xl font-bold text-[#2076C7] mb-4 uppercase tracking-tight">
                {prop.title}
              </h3>

              <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
