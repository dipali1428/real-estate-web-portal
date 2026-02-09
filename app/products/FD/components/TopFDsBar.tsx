import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, ChevronRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { bankData } from '../data/mockData';

const TopFDsBar = () => {
    // Extract top rates dynamically
    const topFDs = bankData.flatMap(cat =>
        cat.banks.map(bank => {
            const rates = [
                parseFloat(bank.tenures.medium.senior),
                parseFloat(bank.tenures.long.senior),
                parseFloat(bank.specialRate?.match(/(\d+\.\d+)/)?.[1] || "0")
            ].filter(r => !isNaN(r));

            return {
                name: bank.name.replace('Small Finance Bank', 'SFB').replace('Small Finance', 'SFB'),
                rate: Math.max(...rates).toFixed(2) + "%",
                type: cat.category === "NBFCs" ? "NBFC" : "SFB",
                safety: cat.category === "NBFCs" ? "AAA Rated" : "RBI Regulated"
            };
        })
    )
        .sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate))
        .slice(0, 5);

    return (
        <div className="bg-white py-10 border-y border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative z-30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row items-center gap-10 xl:gap-16">
                    {/* Header Section */}
                    <div className="flex items-center gap-5 flex-shrink-0 mb-6 xl:mb-0">
                        <motion.div
                            initial={{ rotate: -10, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-secondary to-orange-400 flex items-center justify-center text-white shadow-xl shadow-secondary/20"
                        >
                            <Award size={32} />
                        </motion.div>
                        <div className="text-left">
                            <span className="block text-xs font-black uppercase text-secondary tracking-[0.3em] leading-none mb-2">Market Leaders</span>
                            <h3 className="text-3xl font-black text-[#002B5B] uppercase tracking-tighter leading-none">Top 5 Returns</h3>
                            <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">Real-time Rates Transpariency</p>
                        </div>
                    </div>

                    {/* FDs List */}
                    <div className="flex-grow w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {topFDs.map((fd, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative bg-white border border-gray-100 p-5 rounded-[32px] shadow-sm group-hover:shadow-2xl group-hover:border-primary/20 transition-all duration-500 h-full overflow-hidden">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <TrendingUp size={16} />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${fd.type === 'NBFC' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                                                    {fd.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest line-clamp-1">{fd.name}</h4>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-[#002B5B] tracking-tight">{fd.rate}</span>
                                                <span className="text-[10px] font-black text-secondary uppercase tracking-tight">p.a*</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold text-gray-400">
                                            <div className="flex items-center gap-1 group-hover:text-green-600 transition-colors">
                                                <ShieldCheck size={12} />
                                                <span>{fd.safety}</span>
                                            </div>
                                            <Star size={10} className="text-secondary fill-secondary" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.a
                        href="#compare"
                        whileHover={{ x: 5 }}
                        className="flex-shrink-0 flex items-center gap-3 bg-[#002B5B] text-white px-8 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-primary/10 group"
                    >
                        Explore All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>
            </div>

            {/* Decorative BG element */}
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default TopFDsBar;
