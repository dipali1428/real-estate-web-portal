"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Landmark, Coins, ArrowRight, Sparkles, UserCheck, Activity } from "lucide-react";

const collections = [
    {
        id: "private",
        sectionId: "private-section",
        title: "Private Corporate",
        description: "Higher returns from top-rated private entities like HDFC, PNB, and Muthoot.",
        icon: <TrendingUp size={32} />,
        color: "text-rose-600",
        bg: "bg-rose-50",
        badge: "High Growth",
        yield: "8.5% - 11.5%",
        minInvest: "₹1,00,00,000"
    },
    {
        id: "tax-free",
        sectionId: "tax-free-section",
        title: "Tax-Free Bonds",
        description: "100% Tax exemption on interest. Best for investors in the 30% tax bracket.",
        icon: <ShieldCheck size={32} />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        badge: "Tax Free",
        yield: "7.0% - 7.5%",
        minInvest: "₹1,000"
    },
    {
        id: "psu",
        sectionId: "psu-section",
        title: "PSU Bonds",
        description: "Bonds issued by Public Sector Undertakings. High safety with stable returns.",
        icon: <Landmark size={32} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
        badge: "Highest Safety",
        yield: "7.5% - 8.5%",
        minInvest: "₹1,000"
    },
    {
        id: "sgb",
        sectionId: "sgb-section",
        title: "Sovereign Gold",
        description: "RBI issued gold bonds. Market linked gold returns + 2.5% fixed interest.",
        icon: <Coins size={32} />,
        color: "text-amber-600",
        bg: "bg-amber-50",
        badge: "RBI Backed",
        yield: "2.5% + Gold Gain",
        minInvest: "1 gram"
    },
    {
        id: "state-guaranteed",
        sectionId: "state-section",
        title: "State Guaranteed",
        description: "Bonds backed by State Government guarantees. Very low default risk.",
        icon: <UserCheck size={32} />,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        badge: "Govt Backed",
        yield: "7.8% - 8.5%",
        minInvest: "₹10,000"
    },
    {
        id: "g-sec",
        sectionId: "gsec-section",
        title: "G-Sec / SDL",
        description: "Direct Government debt instruments. The gold standard of safety in India.",
        icon: <Activity size={32} />,
        color: "text-teal-600",
        bg: "bg-teal-50",
        badge: "Zero Risk",
        yield: "7.0% - 7.5%",
        minInvest: "₹10,000"
    }
];

export default function FeaturedCollections() {

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Header offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="featured-collections" className="py-20 bg-slate-50 relative overflow-hidden font-sans px-4 sm:px-6 lg:px-8">
            {/* Subtle background flair */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1CADA3]/5 skew-x-[-12deg] origin-top translate-x-1/2 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="relative flex items-center justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2076C7]/10 text-[#2076C7] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <Sparkles size={12} className="animate-pulse" />
                            <span>Premium Opportunity</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-[#2076C7] to-[#1CADA3] tracking-tight leading-[1.2]">
                            Explore Our Top Bond Collections
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                            Meticulously curated selections designed for your specific financial goals—from ultra-safe tax-free income to maximum growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => handleScroll(collection.sectionId)}
                            className="bg-white rounded-[2.5rem] p-10 border border-slate-100/60 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 group cursor-pointer flex flex-col relative overflow-hidden"
                        >
                            {/* Card Background Subtle Pattern */}
                            <div className="absolute -right-8 -top-8 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-10" />

                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${collection.bg} ${collection.color} flex items-center justify-center shadow-lg shadow-blue-900/5 group-hover:scale-110 transition-transform duration-500`}>
                                    {collection.icon}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${collection.bg} ${collection.color} border border-white`}>
                                    {collection.badge}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-[#2076C7] transition-colors">
                                {collection.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
                                {collection.description}
                            </p>

                            {/* Metadata Badges */}
                            <div className="flex gap-4 mb-8">
                                <div className="flex-1">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Target Yield</div>
                                    <div className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{collection.yield}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Starting At</div>
                                    <div className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{collection.minInvest}</div>
                                </div>
                            </div>

                            <div className="flex items-center text-[#2076C7] font-black text-xs group-hover:gap-2 transition-all mt-auto pt-4 uppercase tracking-[0.2em] border-t border-slate-50">
                                <span>Explore Collection</span>
                                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all stroke-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
