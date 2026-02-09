'use client';

import { useState } from 'react';
import {
    Target,
    PieChart as ChartIcon,
    Zap,
    Shield,
    TrendingUp,
    Download
} from 'lucide-react';

const Portfolio = () => {
    const [activeStrategy, setActiveStrategy] =
        useState<keyof typeof strategies>('ladder');

    const strategies = {
        ladder: {
            title: "NCD Ladder Strategy",
            desc: "Invest in NCDs across different maturity dates (e.g., 2, 3, 4, 5 years). As each matures, reinvest the proceeds into a new longer-term NCD.",
            benefits: ["Manages Interest Rate Risk", "Ensures Regular Liquidity", "Consistent Cash Flow"],
            icon: <TrendingUp className="w-12 h-12" />,
            color: "text-[#2076C7]"
        },
        barbell: {
            title: "Barbell Strategy",
            desc: "Focus on very short-term and very long-term NCDs, skipping intermediate tenures. Offers liquidity and high yield simultaneously.",
            benefits: ["High Liquidity Control", "Capitalizes on Yield Curve", "Dynamic Balancing"],
            icon: <Zap className="w-12 h-12" />,
            color: "text-[#1CADA3]"
        },
        bullet: {
            title: "Bullet Strategy",
            desc: "Invest all funds in NCDs maturing at exactly the same time. Ideal for funding a specific future goal like a child's education or a house.",
            benefits: ["Target Date Precision", "Concentrated Interest Payout", "Goal-Based Investing"],
            icon: <Target className="w-12 h-12" />,
            color: "text-[#2076C7]"
        }
    };

    const profiles = [
        {
            name: "Conservative",
            age: "50+",
            allocation: "60% NCD, 20% FD, 20% Debt MF",
            desc: "Focus on capital protection and monthly income.",
            color: "bg-[#1CADA3]"
        },
        {
            name: "Moderate",
            age: "35-50",
            allocation: "40% NCD, 40% Equity, 20% Gold",
            desc: "Balance between regular income and growth.",
            color: "bg-[#2076C7]"
        },
        {
            name: "Aggressive",
            age: "< 35",
            allocation: "20% NCD, 70% Equity, 10% Gold",
            desc: "Maximizing growth with a fixed income cushion.",
            color: "bg-[#0B1C2E]"
        }
    ];

    return (
        <section className="py-20 bg-white" id="portfolio">
            <div className="container-custom max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Portfolio Building Strategies
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-slate-600">
                        Don't just invest blindly. Use proven strategies to manage risk and meet your financial milestones.
                    </p>
                </div>

                {/* Strategy Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-14 text-slate-600">
                    {Object.entries(strategies).map(([id]) => (
                        <button
                            key={id}
                            onClick={() => setActiveStrategy(id as keyof typeof strategies)}
                            className={`
                                px-7 py-3 rounded-xl
                                text-sm font-semibold uppercase tracking-wider
                                transition-all duration-300
                                border min-w-[140px]
                                ${activeStrategy === id
                                    ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-lg'
                                    : 'bg-white text-slate-600 border-gray-300 hover:border-gray-400 hover:text-slate-800'
                                }`}
                        >
                            {id}
                        </button>
                    ))}
                </div>

                {/* Strategy Card */}
                <div className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                        {/* Left */}
                        <div className="order-2 lg:order-1">
                            <div className={`${strategies[activeStrategy].color} mb-6`}>
                                {strategies[activeStrategy].icon}
                            </div>

                            <h3 className="text-3xl font-bold mb-6 text-slate-800">
                                {strategies[activeStrategy].title}
                            </h3>

                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {strategies[activeStrategy].desc}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {strategies[activeStrategy].benefits.map((benefit, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-[#1CADA3]/15 text-[#1CADA3] flex items-center justify-center flex-shrink-0">
                                            <Shield className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="order-1 lg:order-2 flex justify-center p-6">
                            <div className="relative w-full max-w-[360px]">
                                <div className="absolute inset-0 bg-[#2076C7]/5 rounded-full blur-3xl"></div>

                                <div className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
                                    <div className="flex flex-col items-center gap-4 py-6">
                                        <ChartIcon className="w-32 h-32 text-slate-100 absolute opacity-60" />
                                        <div className="h-4 w-48 bg-slate-200 rounded-full"></div>
                                        <div className="h-4 w-32 bg-slate-200 rounded-full"></div>

                                        <div className="grid grid-cols-1 w-full gap-2 mt-6">
                                            <div className="h-12 bg-[#1CADA3]/20 rounded-xl border border-[#1CADA3]/30 flex items-center px-4">
                                                <span className="text-xs font-bold text-[#1CADA3]">
                                                    High Yield NCD A
                                                </span>
                                            </div>
                                            <div className="h-12 bg-[#2076C7]/20 rounded-xl border border-[#2076C7]/30 flex items-center px-4">
                                                <span className="text-xs font-bold text-[#2076C7]">
                                                    Secured NCD B
                                                </span>
                                            </div>
                                            <div className="h-12 bg-[#2076C7]/10 rounded-xl border border-[#2076C7]/20 flex items-center px-4">
                                                <span className="text-xs font-bold text-[#2076C7]">
                                                    Short term NCD C
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Recommended Allocations */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold mb-3 text-[#2076C7]">
                        Recommended <span className="heading-gradient">Asset Allocation</span>
                    </h3>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-slate-500">
                        Based on investor age and risk profile
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {profiles.map((p, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                            <div className={`${p.color} w-3 h-3 rounded-full mb-4`} />

                            <h4 className="text-xl font-bold mb-2 text-slate-800">
                                {p.name}
                            </h4>

                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block mb-4">
                                Target Age: {p.age}
                            </span>

                            <p className="text-sm text-slate-600 mb-6 italic">
                                "{p.desc}"
                            </p>

                            <div className="bg-slate-50 p-4 rounded-xl mb-6">
                                <span className="text-xs text-slate-500 block mb-1">
                                    Ideal Mix:
                                </span>
                                <span className="font-bold text-slate-800">
                                    {p.allocation}
                                </span>
                            </div>

                            <button className="mt-auto flex items-center gap-2 text-[#2076C7] font-semibold text-sm hover:translate-x-1 transition-transform">
                                <span>View Full Strategy</span>
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Portfolio;
