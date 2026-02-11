'use client';

import { useState } from 'react';
import { AlertTriangle, ShieldCheck, TrendingDown, RefreshCcw, Info, CheckCircle2 } from 'lucide-react';

const Risks = () => {
    const [activeRisk, setActiveRisk] = useState(0);

    const risks = [
        {
            title: "Credit Risk",
            description: "The risk that the issuer may fail to pay interest or principal on time.",
            mitigation: "Invest in NCDs rated AA or above (AAA is safest). Diversify across multiple issuers and sectors.",
            level: "High",
            icon: <AlertTriangle className="w-8 h-8 text-[#2076C7]" />,
            color: "border-[#2076C7]",
            bg: "bg-[#2076C7]/5",
        },
        {
            title: "Interest Rate Risk",
            description: "The risk that rising market interest rates could lead to a fall in NCD price on the exchange.",
            mitigation: "Hold NCDs until maturity to avoid price fluctuations. Ladder your investments across different tenures.",
            level: "Medium",
            icon: <TrendingDown className="w-8 h-8 text-[#1CADA3]" />,
            color: "border-[#1CADA3]",
            bg: "bg-[#1CADA3]/5",
        },
        {
            title: "Liquidity Risk",
            description: "The risk that you might not find a buyer on the stock exchange if you want to sell early.",
            mitigation: "Choose widely-held public issues with high trading volumes. Keep some funds in liquid instruments.",
            level: "Medium",
            icon: <RefreshCcw className="w-8 h-8 text-[#2076C7]" />,
            color: "border-[#2076C7]",
            bg: "bg-[#2076C7]/5",
        },
        {
            title: "Reinvestment Risk",
            description: "The risk that you may have to reinvest maturity proceeds at a lower rate than the current NCD.",
            mitigation: "Lock in higher rates for longer tenures when rates are high. Use cumulative options for long-term growth.",
            level: "Low",
            icon: <ShieldCheck className="w-8 h-8 text-[#1CADA3]" />,
            color: "border-[#1CADA3]",
            bg: "bg-[#1CADA3]/5",
        }
    ];

    return (
        <section className="py-16 bg-white" id="risks">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Risk Assessment & Mitigation
                    </h2>
                    <div className="w-20 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-gray-600 text-sm md:text-lg font-medium">
                        Every investment carries some risk. Our goal is to help you identify, understand, and mitigate them effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Risk Selectors */}
                    <div className="lg:col-span-5 space-y-4">
                        {risks.map((risk, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveRisk(idx)}
                                className={`w-full p-5 md:p-6 bg-white rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${activeRisk === idx ? risk.color + ' shadow-lg translate-x-0 md:translate-x-4' : 'border-transparent hover:border-gray-100 shadow-sm'}`}>
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-xl ${activeRisk === idx ? risk.bg : 'bg-gray-100'}`}>
                                        {risk.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#2076C7]">{risk.title}</h3>
                                        <span className={`text-[10px] uppercase font-black tracking-widest ${activeRisk === idx ? 'text-[#2076C7]' : 'text-gray-400'}`}>
                                            Severity: {risk.level}
                                        </span>
                                    </div>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black transition-colors ${activeRisk === idx ? 'bg-[#2076C7] text-white' : 'bg-gray-50 text-gray-300'}`}>
                                    {idx + 1}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Risk Detail */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[auto] lg:min-h-[450px] flex flex-col border border-gray-100">
                            <div className="h-2 md:h-3 w-full bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] opacity-20"></div>
                            <div className="p-6 md:p-10 flex-grow">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8 md:mb-10 text-center sm:text-left">
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shrink-0 ${risks[activeRisk].bg}`}>
                                        {risks[activeRisk].icon}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl md:text-3xl font-extrabold text-[#2076C7]">{risks[activeRisk].title}</h4>
                                        <p className="text-xs md:text-sm font-bold text-[#1CADA3] uppercase tracking-wider mt-1">Impact Analysis</p>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-4">The Challenge</label>
                                        <p className="text-gray-600 text-lg leading-relaxed font-medium">{risks[activeRisk].description}</p>
                                    </div>

                                    <div className={`p-6 md:p-8 rounded-3xl border-2 border-dashed ${risks[activeRisk].color} bg-white relative mt-10 md:mt-12`}>
                                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 px-5 py-2 rounded-full text-[10px] md:text-xs font-black text-white bg-gradient-to-r from-[#2076C7] to-[#1CADA3] shadow-lg flex items-center space-x-2 whitespace-nowrap`}>
                                            <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                                            <span>MITIGATION STRATEGY</span>
                                        </div>
                                        <p className="text-[#0B1C2E] mt-6 sm:mt-4 leading-relaxed font-bold text-base md:text-lg">
                                            {risks[activeRisk].mitigation}
                                        </p>
                                        <ul className="mt-8 space-y-4">
                                            <li className="flex items-center text-sm text-gray-500 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-[#1CADA3] mr-3"></div>
                                                Independent credit rating check before every offer
                                            </li>
                                            <li className="flex items-center text-sm text-gray-500 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-[#2076C7] mr-3"></div>
                                                Real-time market monitoring and portfolio alerts
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#0B1C2E]/2 p-6 flex flex-col items-center justify-center border-t border-gray-100">
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Securing Your Capital with Intelligence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Risks;



