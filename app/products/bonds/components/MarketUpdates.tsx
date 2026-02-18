"use client";

import { motion } from "framer-motion";
import { Megaphone, Calendar, TrendingUp } from "lucide-react";

const updates = [
    {
        id: 1,
        title: "RBI maintains Repo Rate at 6.5%",
        desc: "Stability in rates makes current high-yield corporate bonds an attractive lock-in opportunity.",
        date: "Today",
        priority: "High"
    },
    {
        id: 2,
        title: "Corporate Bond yields hit 3-year high",
        desc: "AA+ rated bonds are now offering up to 9.5% returns, outperforming traditional FDs.",
        date: "Yesterday",
        priority: "Medium"
    },
    {
        id: 3,
        title: "New Sovereign Gold Bond Tranche Announced",
        desc: "Government announces Series IV. Subscription opens next week with ₹50/gm discount online.",
        date: "2 days ago",
        priority: "High"
    }
];

export default function MarketUpdates() {
    return (
        <section className="bg-[#fff] border-b border-gray-100 py-4 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-4">

                {/* Label */}
                <div className="flex items-center gap-2 bg-[#1CADA3]/10 text-[#1CADA3] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-[#1CADA3]/20 shadow-sm animate-pulse">
                    <Megaphone size={14} />
                    <span>MARKET INSIGHTS</span>
                </div>

                {/* Ticker / Slider */}
                <div className="flex-1 overflow-hidden relative h-8 w-full">
                    {/* Mask gradients for fading effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

                    <div className="flex items-center animate-marquee whitespace-nowrap gap-12 absolute top-1/2 -translate-y-1/2">
                        {/* Duplicated list for seamless infinite loop */}
                        {[...updates, ...updates].map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="font-bold text-[#2076C7]">{item.title}:</span>
                                <span className="text-gray-500 hidden sm:inline">{item.desc}</span>
                                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-medium ml-1 flex items-center gap-1">
                                    <Calendar size={10} /> {item.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <button className="hidden md:flex items-center gap-1 text-xs font-bold text-[#1CADA3] hover:underline whitespace-nowrap">
                    Read More Updates <TrendingUp size={12} />
                </button>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translate(0, -50%); }
                    100% { transform: translate(-50%, -50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
