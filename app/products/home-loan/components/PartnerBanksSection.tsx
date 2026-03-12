"use client";

import { Landmark as Bank } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { CATEGORIES } from '../loanConstants';

interface PartnerBank {
    name: string;
    color: string;
}

interface PartnerBanksSectionProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    filteredPartners: PartnerBank[];
}

export default function PartnerBanksSection({ activeCategory, setActiveCategory, filteredPartners }: PartnerBanksSectionProps) {
    return (
        <section id="products-section" className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-inner border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#2076C7]/5 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 mb-12">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-extrabold font-sans mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Our Partner Banks</h2>
                            <p className="text-gray-500 font-medium">Top-rated financial institutions supporting your {activeCategory.toLowerCase()} needs</p>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mb-10 relative z-10">
                        <div className="flex flex-nowrap items-center gap-2 md:gap-4 p-2 bg-white rounded-2xl border border-gray-100 w-full overflow-x-auto no-scrollbar justify-start lg:justify-center">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${activeCategory === category
                                        ? 'bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-white shadow-md'
                                        : 'text-gray-500 hover:bg-white hover:text-[#2076C7]'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
                        <AnimatePresence mode="popLayout">
                            {filteredPartners.length > 0 ? (
                                filteredPartners.map((bank, index) => (
                                    <div key={bank.name}>
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 group cursor-pointer h-full"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${bank.color}10` }}
                                            >
                                                <Bank className="w-6 h-6" style={{ color: bank.color }} />
                                            </div>
                                            <span className="text-[11px] font-bold font-sans text-gray-700 leading-tight group-hover:text-[#2076C7] transition-colors uppercase">
                                                {bank.name}
                                            </span>
                                        </motion.div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-gray-400 font-medium italic">
                                    Exploring tailored partners for this category...
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
