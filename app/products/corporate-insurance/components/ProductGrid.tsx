import React, { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "./data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

interface ProductGridProps {
  openQuote: (productName?: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ openQuote }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const filters = [
    "All",
    "Accident",
    "Health",
    "Property",
    "Liability",
    "Cyber",
    "Life",
  ];

  const filteredProducts = PRODUCTS.filter(
    (product) => activeFilter === "All" || product.category === activeFilter,
  );

  return (
    <motion.section
      id="products"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Insurance Products
          </span>
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeFilter === filter
                ? "bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white shadow-md scale-105"
                : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#2076C7]/50 hover:text-[#2076C7] hover:bg-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="relative flex"
            onMouseEnter={() => setSelectedProduct(product.title)}
            onMouseLeave={() => setSelectedProduct(null)}
          >
            <motion.div
              variants={cardHover}
              className={`bg-white p-6 md:p-8 rounded-2xl border-2 ${
                selectedProduct === product.title
                  ? "border-[#1CADA3]/50"
                  : "border-slate-100"
              } h-full w-full flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300`}
              style={{
                boxShadow:
                  selectedProduct === product.title
                    ? "0 4px 12px rgba(28,173,163,0.12), 0 12px 32px rgba(28,173,163,0.18)"
                    : "0 2px 8px rgba(28,173,163,0.06), 0 8px 24px rgba(28,173,163,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${product.bg} rounded-bl-full opacity-30 transition-transform group-hover:scale-110`}
              ></div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${product.bg} mx-auto`}
              >
                <product.icon className={`w-7 h-7 ${product.color}`} />
              </div>

              <h3 className="font-bold text-2xl mb-3 text-[#1CADA3] leading-tight pr-4">
                {product.title}
              </h3>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {product.desc}
              </p>

              {/* Coverage Details */}
              <div className="space-y-3 text-base border-t border-slate-100 pt-5 mt-auto mb-6 w-full max-w-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">Coverage:</span>
                  <span className="font-semibold text-slate-800">
                    {product.coverage}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">Network:</span>
                  <span className="font-semibold text-slate-800">
                    {product.network}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">Claim Ratio:</span>
                  <span className="font-bold text-[#1CADA3]">
                    {product.claimRatio}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-500">Premium:</span>
                  <span className="font-bold text-[#1CADA3]">
                    {product.premium}
                  </span>
                </div>
              </div>

              <div className="w-full pt-2">
                <button
                  onClick={() => openQuote(product.title)}
                  className="w-full py-3 text-sm bg-slate-50 text-slate-700 hover:bg-gradient-to-r hover:from-[#1CADA3] hover:to-[#189B8D] hover:text-white border border-slate-200 hover:border-transparent rounded-xl font-bold transition-all duration-300"
                  aria-label={`Get quote for ${product.title}`}
                >
                  Get Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
