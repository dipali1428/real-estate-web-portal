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
        color: 'bg-blue-600',
        price: '₹24.8/*',
    },
    {
        name: 'Bajaj Allianz',
        ratio: '98.48%',
        network: '8,000+',
        features: ['Missed Flight Cover', 'Home Burglary Cover', 'Student Plans'],
        color: 'bg-blue-400',
        price: '₹13/*',
    },
    {
        name: 'HDFC ERGO',
        ratio: '99.85%',
        network: '1 Lakh+',
        features: ['Cashless Worldwide', 'No Medical Check-up', 'Flight Delay'],
        color: 'bg-blue-700',
        price: '₹25/*',
    },
    {
        name: 'Niva Bupa',
        ratio: '99.99%',
        network: '10,000+',
        features: ['Zero Deductible', 'Quick Claim Settlement', 'Senior Citizen Plans'],
        color: 'bg-blue-500',
        price: '₹20/*',
    },
    {
        name: 'Reliance',
        ratio: '98.65%',
        network: '8,500+',
        features: ['Auto-Extension', 'No Med Check till 80', 'Free SIM Card'],
        color: 'bg-blue-800',
        price: '₹15/*',
    },
    {
        name: 'ICICI Lombard',
        ratio: '99.70%',
        network: '6,500+',
        features: ['Adventure Sports', 'Schengen Approved', 'Pre-existing Cover'],
        color: 'bg-blue-900',
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
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <span className="text-primary-blue font-bold tracking-widest uppercase text-sm">Market Analysis</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-3">
                        Compare Top Providers
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mt-4 mb-4" />
                    <p className="text-lg text-slate-500 mt-4">
                        We analyze the best travel insurance companies in India to help you choose the right partner for your journey.
                    </p>
                </motion.div>

                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[900px] border-collapse bg-white rounded-2xl shadow-xl overflow-hidden">
                        <thead>
                            <tr className="bg-teal-50 text-slate-800">
                                <th className="p-6 text-left font-extrabold text-teal-900">Insurer</th>
                                <th className="p-6 text-center font-extrabold text-teal-900">Claim Ratio</th>
                                <th className="p-6 text-center font-extrabold text-teal-900">Network Hospitals</th>
                                <th className="p-6 text-left font-extrabold text-teal-900">Key Features</th>
                                <th className="p-6 text-center font-extrabold text-teal-900">Starting Price</th>
                                <th className="p-6 text-center font-extrabold text-teal-900">Action</th>
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
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${provider.color} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                                                {provider.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900 text-lg">{provider.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <div className="inline-block px-3 py-1 bg-teal-50 text-secondary-teal font-bold rounded-full text-sm border border-teal-100">
                                            {provider.ratio}
                                        </div>
                                    </td>
                                    <td className="p-6 text-center font-semibold text-slate-700">
                                        {provider.network}
                                    </td>
                                    <td className="p-6">
                                        <div className="grid grid-cols-1 gap-2">
                                            {provider.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <IconCheck size={16} className="text-secondary-teal" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <div className="text-xl font-bold text-slate-900">{provider.price}</div>
                                        <div className="text-xs text-slate-400">per day</div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <button onClick={openPartner} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-secondary-teal hover:text-white transition-all">
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
