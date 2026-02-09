'use client';

import { useState } from 'react';
import { Coins, Building2, Landmark, ShieldCheck, ArrowUpRight, TrendingUp, Info } from 'lucide-react';

const InvestmentUniverse = () => {
    const [activeTab, setActiveTab] = useState<keyof typeof products>('NCDs');

    const productCategories = [
        { id: 'NCDs', name: 'NCDs', icon: <Landmark className="w-5 h-5" /> },
        { id: 'SGBs', name: 'Sovereign Gold Bonds', icon: <Coins className="w-5 h-5" /> },
        { id: '54EC', name: '54EC Bonds', icon: <Building2 className="w-5 h-5" /> },
    ];

    const products = {
        NCDs: [
            { issuer: 'Muthoot Finance', rating: 'AA+/AAA', returns: '9.25% - 11%', tenure: '24-60 Months', safety: 'High', type: 'Offers' },
            { issuer: 'Edelweiss Financial', rating: 'AA/AA+', returns: '10.50%', tenure: '36 Months', safety: 'Moderate', type: 'Offers' },
            { issuer: 'Ugro Capital', rating: 'A/A+', returns: '10.50%', tenure: '18-27 Months', safety: 'High Yield', type: 'Offers' },
        ],
        SGBs: [
            { issuer: 'Govt. of India', rating: 'Sovereign', returns: '2.5% + Gold Appreciation', tenure: '8 Years', safety: 'Highest', type: 'Bonds' },
            { issuer: 'RBI Issued', rating: 'Sovereign', returns: 'Tax Free Maturity', tenure: '5 Year Lock-in', safety: 'Highest', type: 'Bonds' },
            { issuer: 'Secondary Market', rating: 'Sovereign', returns: 'Market Linked', tenure: 'Tradable', safety: 'Highest', type: 'Bonds' },
        ],
        '54EC': [
            { issuer: 'REC Limited', rating: 'AAA Rated', returns: 'Tax Exemption', tenure: '5 Years', safety: 'Highest', type: 'Bonds' },
            { issuer: 'PFC Limited', rating: 'AAA Rated', returns: '5.25% Interest', tenure: '5 Years', safety: 'Highest', type: 'Bonds' },
            { issuer: 'IRFC Limited', rating: 'AAA Rated', returns: '100% Capital Safe', tenure: '5 Years', safety: 'Highest', type: 'Bonds' },
        ]
    };

    const handleLearnMore = (type: string) => {
        const sectionId = type === 'Offers' ? 'offers' : 'bonds';
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-12" id="investment-universe">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Explore Our Investment Universe
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-lg text-gray-600 font-medium">
                        A curated selection of the most trusted, high-yield financial instruments available in the Indian market today.
                    </p>
                </div>

                {/* Tabbed Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {productCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id as keyof typeof products)}
                            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === cat.id
                                ? 'bg-[#2076C7] text-white shadow-xl shadow-[#2076C7]/20 scale-105'
                                : 'bg-white text-gray-500 hover:bg-[#EDF9F8] hover:text-[#1CADA3] shadow-sm'
                                }`}>
                            {cat.icon}
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Product Area */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products[activeTab].map((product, idx) => (
                            <div
                                key={idx}
                                className="relative bg-white
                       p-6 sm:p-7
                       rounded-3xl
                       border border-gray-100
                       shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                       hover:shadow-[0_18px_45px_rgba(32,118,199,0.12)]
                       hover:-translate-y-1
                       transition-all duration-300
                       overflow-hidden group">

                                {/* Subtle Corner Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24
                            bg-linear-to-br from-[#2076C7]/8 to-transparent
                            rounded-bl-full pointer-events-none" />

                                {/* Header */}
                                <div className="mb-6">
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em]
                                 text-[#1CADA3]
                                 bg-[#1CADA3]/10
                                 px-3 py-1 rounded-full mb-3">
                                        {product.safety} Safety
                                    </span>

                                    <h4 className="text-lg font-extrabold text-[#0B1C2E] leading-snug line-clamp-1">
                                        {product.issuer}
                                    </h4>

                                    <div className="text-sm font-semibold text-[#2076C7]">
                                        Rating: {product.rating}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-5 mb-8">
                                    <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                                            Returns
                                        </span>
                                        <span className="text-xl font-black text-[#2076C7]">
                                            {product.returns}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                            Tenure
                                        </span>
                                        <span className="font-bold text-[#0B1C2E]">
                                            {product.tenure}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => handleLearnMore(product.type)}
                                    className="w-full py-3 rounded-xl
                           flex items-center justify-center gap-2
                           font-bold text-sm
                           text-[#2076C7]
                           bg-[#F4FAFF]
                           hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3]
                           hover:text-white
                           transition-all duration-300">
                                    <span>Learn More</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>


                    {/* Trust Footer */}
                    <div className="mt-12 p-8 bg-[#2076C7]/5 rounded-[3rem] border border-[#2076C7]/10 flex flex-col md:flex-row items-center justify-center text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-[#1CADA3]" />
                            </div>
                            <div>
                                <h5 className="text-xl font-extrabold text-[#0B1C2E]">Safety-First Approach</h5>
                                <p className="text-gray-600 font-medium max-w-lg">All instruments are handpicked based on rigorous credit analysis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvestmentUniverse;



