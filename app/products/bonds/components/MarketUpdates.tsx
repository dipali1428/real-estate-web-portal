"use client";

import { useEffect, useState } from "react";
import { Megaphone, Calendar, ArrowRight, Loader2 } from "lucide-react";

interface NewsItem {
    title: string;
    desc: string;
    date: string;
}

export default function MarketUpdates() {
    const [updates, setUpdates] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bond-news")
            .then((res) => res.json())
            .then((data) => {
                if (data.items?.length) setUpdates(data.items);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleExplore = () => {
        const el = document.getElementById("featured-collections");
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    if (loading) {
        return (
            <section className="bg-white py-4 border-b border-gray-50 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap">
                        <Megaphone size={14} className="animate-bounce" />
                        <span className="tracking-[0.2em]">INSIGHTS</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Fetching live bond market news...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (!updates.length) return null;

    return (
        <section className="bg-white py-4 overflow-hidden relative font-sans border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4 md:gap-8">

                {/* Label */}
                <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black whitespace-nowrap shadow-lg shadow-slate-200">
                    <Megaphone size={14} className="animate-bounce" />
                    <span className="tracking-[0.2em]">LIVE</span>
                </div>

                {/* Ticker */}
                <div className="flex-1 overflow-hidden relative h-8 w-full group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 hidden md:block" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 hidden md:block" />

                    <div className="flex items-center animate-marquee whitespace-nowrap gap-16 absolute top-1/2 -translate-y-1/2 cursor-pointer">
                        {[...updates, ...updates].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                                <span className="font-black text-[#2076C7] tracking-tight">{item.title}</span>
                                <span className="text-slate-400 font-medium hidden sm:inline">— {item.desc}</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 text-slate-400 text-[10px] font-bold">
                                    <Calendar size={12} /> {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handleExplore}
                    className="hidden lg:flex items-center gap-2 text-xs font-black text-[#1CADA3] hover:text-[#2076C7] transition-colors whitespace-nowrap tracking-widest group"
                >
                    EXPLORE BONDS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translate(0, -50%); }
                    100% { transform: translate(-50%, -50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
