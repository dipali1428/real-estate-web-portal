'use client';

import { ShieldCheck, TrendingUp, Landmark, Calendar, Banknote, ArrowRight } from 'lucide-react';

const Bonds = () => {
    const bondTypes = [
        {
            title: "Sovereign Gold Bonds (SGBs)",
            subtitle: "Digital Gold with 2.5% Extra Interest",
            description: "The safest way to invest in gold. Issued by RBI on behalf of the Govt. of India, offering capital appreciation plus fixed annual interest.",
            features: [
                { icon: <ShieldCheck className="w-5 h-5 text-[#1CADA3]" />, text: "Sovereign Guarantee" },
                { icon: <TrendingUp className="w-5 h-5 text-[#2076C7]" />, text: "2.5% Fixed Interest" },
                { icon: <Banknote className="w-5 h-5 text-[#0B1C2E]" />, text: "Tax-Free Maturity" },
            ],
            details: [
                "Tenure: 8 Years (Exit option after 5th year)",
                "Taxation: No Capital Gains Tax if held till maturity",
                "Liquidity: Tradeable on Stock Exchanges"
            ],
            cta: "Invest in SGB",
            borderColor: "border-blue-100",
            hoverShadow: "hover:shadow-blue-100"
        },
        {
            title: "54EC Capital Gain Bonds",
            subtitle: "Save Tax on Property Sale",
            description: "Exemption from Long Term Capital Gains Tax under Section 54EC. AAA-rated bonds from REC, PFC, and IRFC.",
            features: [
                { icon: <ShieldCheck className="w-5 h-5 text-[#1CADA3]" />, text: "AAA Rated Safety" },
                { icon: <Banknote className="w-5 h-5 text-[#2076C7]" />, text: "100% Tax Exemption" },
                { icon: <Calendar className="w-5 h-5 text-[#0B1C2E]" />, text: "5 Year Lock-in" },
            ],
            details: [
                "Limit: Max investment of ₹50 Lakhs in a FY",
                "Taxation: Exempt from LTCG Tax u/s 54EC",
                "Interest: 5.25% p.a. payable annually (Taxable)"
            ],
            cta: "Save Capital Gains Tax",
            borderColor: "border-[#1CADA3]/30",
            hoverShadow: "hover:shadow-[#1CADA3]/20"
        }
    ];

    return (
        <section className="py-12 bg-white" id="bonds">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        More Ways to  Grow Your Wealth
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-lg text-gray-600 font-medium">
                        Diversify your portfolio with government-backed securities and tax-saving instruments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {bondTypes.map((bond, idx) => (
                        <div key={idx} className={`rounded-[2.5rem] p-10 border ${bond.borderColor} bg-white shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}>
                            {/* Subtle Brand Gradient Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2076C7]/5 to-transparent rounded-bl-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <div className="text-xs font-black text-[#1CADA3] uppercase tracking-wider mb-2 bg-[#1CADA3]/10 px-3 py-1 rounded-full inline-block">{bond.subtitle}</div>
                                        <h3 className="text-3xl font-extrabold text-[#2076C7] mb-3">{bond.title}</h3>
                                    </div>
                                    <div className="w-14 h-14 bg-[#F8FBFE] rounded-2xl border border-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Landmark className="w-7 h-7 text-[#2076C7]" />
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium">
                                    {bond.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {bond.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="bg-[#F8FBFE] p-4 rounded-2xl flex flex-col items-center text-center gap-3 border border-blue-50/50">
                                            {feature.icon}
                                            <span className="text-xs font-bold text-[#2076C7]">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                                    <ul className="space-y-3">
                                        {bond.details.map((detail, dIdx) => (
                                            <li key={dIdx} className="flex items-start text-sm text-gray-700 font-bold">
                                                <span className="mr-3 text-[#2076C7] mt-[2px]">₹</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="w-full py-4 bg-white text-[#1CADA3] font-extrabold rounded-2xl border-2 border-[#1CADA3]/20 flex items-center justify-center space-x-2 hover:bg-[#1CADA3] hover:text-white hover:border-[#1CADA3] transition-all duration-300">
                                    <span>{bond.cta}</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Bonds;



