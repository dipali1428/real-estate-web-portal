'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconExternalLink } from '@tabler/icons-react';
import WaveDivider from './WaveDivider';
import { useModal } from '@/app/context/ModalContext';

const providers = [
    {
        name: 'Tata AIG',
        ratio: '99.01%',
        network: '7,000+',
        features: ['COVID-19 Coverage', 'No Sub-limits', 'Cruise Cover'],
        color: 'bg-[#2076C7]',
        price: '₹24.8/*',
    },
    {
        name: 'Bajaj Allianz',
        ratio: '98.48%',
        network: '8,000+',
        features: ['Missed Flight Cover', 'Home Burglary Cover', 'Student Plans'],
        color: 'bg-[#1CADA3]',
        price: '₹13/*',
    },
    {
        name: 'HDFC ERGO',
        ratio: '99.85%',
        network: '1 Lakh+',
        features: ['Cashless Worldwide', 'No Medical Check-up', 'Flight Delay'],
        color: 'bg-[#2076C7]',
        price: '₹25/*',
    },
    {
        name: 'Niva Bupa',
        ratio: '99.99%',
        network: '10,000+',
        features: ['Zero Deductible', 'Quick Claim Settlement', 'Senior Citizen Plans'],
        color: 'bg-[#1CADA3]',
        price: '₹20/*',
    },
    {
        name: 'Reliance',
        ratio: '98.65%',
        network: '8,500+',
        features: ['Auto-Extension', 'No Med Check till 80', 'Free SIM Card'],
        color: 'bg-[#2076C7]',
        price: '₹15/*',
    },
    {
        name: 'ICICI Lombard',
        ratio: '99.70%',
        network: '6,500+',
        features: ['Adventure Sports', 'Schengen Approved', 'Pre-existing Cover'],
        color: 'bg-[#1CADA3]',
        price: '₹22/*',
    },
];

export default function ProviderComparison() {
    const { openPartner } = useModal();
    return (
        <section className="py-12 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
                >
                    <span className="text-[#2076C7] font-bold tracking-widest uppercase text-xs md:text-sm">Market Analysis</span>
                     <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                              Compare Top Providers
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-taaaao-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-base md:text-lg text-slate-500 mt-4 px-4 md:px-0">
                        We analyze the best travel insurance companies in India to help you choose the right partner for your journey.
                    </p>
                </motion.div>

                <div className="overflow-x-auto pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 custom-scrollbar">
                    <table className="w-full min-w-[800px] border-separate border-spacing-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                        <thead>
                            <tr className="bg-[#1CADA3]/10 text-slate-800">
                                <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-sm md:text-base">Insurer</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Claim Ratio</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Network Hospitals</th>
                                <th className="p-4 md:p-6 text-left font-extrabold text-[#1CADA3] text-sm md:text-base">Key Features</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Starting Price</th>
                                <th className="p-4 md:p-6 text-center font-extrabold text-[#1CADA3] text-sm md:text-base">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {providers.map((provider, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${provider.color} text-white flex items-center justify-center font-bold text-base md:text-lg shadow-md flex-shrink-0`}>
                                                {provider.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900 text-base md:text-lg">{provider.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <div className="inline-block px-3 py-1 bg-[#1CADA3]/10 text-[#1CADA3] font-bold rounded-full text-xs md:text-sm border border-[#1CADA3]/20">
                                            {provider.ratio}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center font-semibold text-slate-700 text-sm md:text-base">
                                        {provider.network}
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <div className="flex flex-col gap-1.5">
                                            {provider.features.slice(0, 2).map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-600 whitespace-nowrap">
                                                    <IconCheck size={14} className="text-[#1CADA3] flex-shrink-0" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <div className="text-lg md:text-xl font-bold text-slate-900">{provider.price}</div>
                                        <div className="text-[10px] md:text-xs text-slate-400">per day</div>
                                    </td>
                                    <td className="p-4 md:p-6 text-center">
                                        <button onClick={openPartner} className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#1CADA3] hover:text-white transition-all">
                                            <IconExternalLink size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-xs text-slate-400 mt-6">Disclaimer: Comparison based on publicly available data for 2024-2025. Prices vary by destination and age.</p>
            </div>
            <WaveDivider />
        </section>
    );
}
