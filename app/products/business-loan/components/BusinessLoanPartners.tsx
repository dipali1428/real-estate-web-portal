"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Landmark, Building2 } from "lucide-react";

interface Partner {
    name: string;
}

const partners: Partner[] = [
    { name: "Aditya Birla Capital Limited" },
    { name: "Ambit Finvest Pvt. Ltd." },
    { name: "ARKA FINCAP LIMITED" },
    { name: "Axis Bank Limited" },
    { name: "Axis Finance Ltd" },
    { name: "Bajaj Finance Limited" },
    { name: "Cholamandalam Investment And Finance Company Limited" },
    { name: "Clix Capital Services Private Limited" },
    { name: "Credit Saison (Kisetu Saison Finance India Pvt Ltd)" },
    { name: "Deutsche Bank AG" },
    { name: "Godrej Capital" },
    { name: "Growth Source Financial Technologies Private Limited (Protium)" },
    { name: "HDFC Bank Limited" },
    { name: "Hero Fincorp Limited" },
    { name: "ICICI Bank Limited" },
    { name: "IDFC First Bank Limited" },
    { name: "Indifi Technologies Pvt Ltd" },
    { name: "Indusind Bank Limited" },
    { name: "Kotak Mahindra Bank Limited" },
    { name: "Krazybee Services Private Limited" },
    { name: "L&T Finance Limited" },
    { name: "Lendingkart Finance Limited" },
    { name: "Muthoot Finance Ltd" },
    { name: "Piramal Capital & Housing Finance Ltd" },
    { name: "Poonawalla Fincorp Limited" },
    { name: "Shriram Finance Limited" },
    { name: "SMFG India Credit Company Limited (Sumitomo Mitsui Financial Group)" },
    { name: "Standard Chartered Bank" },
    { name: "Svakarma Finance" },
    { name: "Tata Capital Limited" },
    { name: "U Gro Capital Ltd" },
    { name: "Yes Bank Limited" },
];

const itemsPerPage = 8;
const totalPages = Math.ceil(partners.length / itemsPerPage);

// Predefined palette applied by grid index to simulate colored icons
const iconColors = [
    'bg-blue-50 text-blue-500',      // 0
    'bg-emerald-50 text-emerald-500',// 1
    'bg-red-50 text-red-500',        // 2
    'bg-orange-50 text-orange-500',  // 3
    'bg-indigo-50 text-indigo-500',  // 4
    'bg-slate-100 text-slate-500',   // 5
    'bg-cyan-50 text-cyan-500',      // 6
    'bg-fuchsia-50 text-fuchsia-500' // 7
];

const BusinessLoanPartners = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const next = () => setCurrentPage((p) => (p + 1) % totalPages);
    const prev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

    const visiblePartners = showAll
        ? partners
        : partners.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <section className="py-0 bg-gray-50/50 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl relative">

                {/* Section Header - Centered Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs mb-6 uppercase tracking-widest">
                        <Building2 size={14} />
                        Our Network
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3]">
                        Our Lending Partners
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        Widest network for the most competitive rates. We've collaborated with India's premier financial institutions to provider you with the most competitive interest rates.
                    </p>
                </motion.div>

                {/* Main Card Container */}
                <div className="bg-white rounded-[40px] p-6 py-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-300 relative">

                    {/* View All Button Toggle */}
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 bg-[#F3F8FF] text-[#2076C7] px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider hover:bg-blue-100 transition-colors"
                        >
                            {showAll ? 'Show Pages' : `View All ${partners.length} Partners`}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Navigation Arrows (only show if paginated and multiple pages exist) */}
                    {!showAll && totalPages > 1 && (
                        <>
                            <button
                                onClick={prev}
                                aria-label="Previous Page"
                                className="absolute left-0 top-1/2 md:top-[60%] -translate-y-1/2 -translate-x-3 sm:-translate-x-4 md:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 hover:bg-gray-500 text-white rounded-full hidden sm:flex items-center justify-center z-10 transition-colors shadow-lg"
                            >
                                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
                            </button>

                            <button
                                onClick={next}
                                aria-label="Next Page"
                                className="absolute right-0 top-1/2 md:top-[60%] -translate-y-1/2 translate-x-3 sm:translate-x-4 md:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 hover:bg-gray-400 text-white rounded-full hidden sm:flex items-center justify-center z-10 transition-colors shadow-lg"
                            >
                                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                            </button>
                        </>
                    )}

                    {/* Partners Grid Container */}
                    <div className="px-2 md:px-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={showAll ? 'all' : currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
                            >
                                {visiblePartners.map((partner, index) => {
                                    // Calculate global index to keep colors stable when "show all" is active
                                    const globalIndex = showAll ? index : (currentPage * itemsPerPage) + index;
                                    const colorClass = iconColors[globalIndex % iconColors.length];

                                    return (
                                        <div
                                            key={partner.name}
                                            className="group flex flex-row items-center gap-4 bg-white p-4 lg:p-5 rounded-[24px] border border-gray-300 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300"
                                        >
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
                                                <Landmark className="w-6 h-6" strokeWidth={2} />
                                            </div>
                                            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-snug pr-2 group-hover:text-gray-900 transition-colors">
                                                {partner.name}
                                            </h3>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Indicators */}
                    {!showAll && totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx)}
                                    aria-label={`Go to page ${idx + 1}`}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'bg-[#2076C7] w-6' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default BusinessLoanPartners;
