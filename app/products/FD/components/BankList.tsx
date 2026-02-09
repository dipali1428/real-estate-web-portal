"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { bankData, BankCategory, Bank } from '../data/mockData';

const BankList = () => {
    const [openCategory, setOpenCategory] = useState<string | null>(bankData[0].category);
    const [activeTenure, setActiveTenure] = useState<keyof Bank['tenures']>('medium');
    const isFirstMount = useRef(true);
    const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (openCategory && categoryRefs.current[openCategory]) {
            setTimeout(() => {
                const element = categoryRefs.current[openCategory];
                if (element) {
                    const offset = 100; // Height of fixed navbar + some padding
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 150);
        }
    }, [openCategory]);

    const tenureBuckets: { id: keyof Bank['tenures']; label: string }[] = [
        { id: 'short', label: '< 1 Year' },
        { id: 'medium', label: '1 - 3 Years' },
        { id: 'long', label: '3 - 5 Years' },
        { id: 'mega', label: '5+ Years' },
    ];

    return (
        <div className="w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Compare FD Rates Across Banks
                </h2>
                <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                <p className="text-gray-600">Select your preferred tenure to see the most accurate interest rates.</p>
            </div>

            {/* Tenure Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {tenureBuckets.map((tenure) => (
                    <button
                        key={tenure.id as string}
                        onClick={() => setActiveTenure(tenure.id)}
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 border-2 ${activeTenure === tenure.id
                            ? 'text-white shadow-lg scale-105 border-transparent'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-gray-50'
                            }`}
                        style={activeTenure === tenure.id ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                    >
                        {tenure.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                {bankData.map((section: BankCategory, idx: number) => (
                    <div
                        key={idx}
                        ref={(el) => { categoryRefs.current[section.category] = el; }}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <button
                            onClick={() => toggleCategory(section.category)}
                            className={`w-full px-8 py-5 flex justify-between items-center transition-all ${openCategory === section.category
                                ? ''
                                : 'bg-white text-slate-700 hover:bg-gray-50'
                                }`}
                            style={openCategory === section.category ? { background: 'linear-gradient(to right, #2076C7, #1CADA3)', color: 'white' } : {}}
                        >
                            <h4 className="text-xl font-bold flex items-center gap-3" style={openCategory === section.category ? { color: 'white' } : {}}>
                                {section.category}
                            </h4>
                            {openCategory === section.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {openCategory === section.category && (
                            <div className="p-6 md:p-8 overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 text-left">
                                            <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Bank Name</th>
                                            <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Regular Rate</th>
                                            <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Senior Citizen</th>
                                            <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider">Special Offer</th>
                                            <th className="py-4 px-4 text-slate-500 font-bold uppercase text-xs tracking-wider text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {section.banks.map((bank: Bank, bIdx: number) => (
                                            <tr key={bIdx} className="group hover:bg-primary/5 transition-colors animate-fade-in">
                                                <td className="py-5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-gray-700 text-xs flex-shrink-0">
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                        <div className="font-bold text-slate-700 group-hover:text-primary transition-colors text-lg tracking-tight">{bank.name}</div>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-4 text-slate-800 font-bold text-lg tracking-tight">
                                                    {bank.tenures?.[activeTenure]?.rate || '-'}
                                                </td>
                                                <td className="py-5 px-4">
                                                    <span className="text-slate-800 font-bold text-lg tracking-tight">{bank.tenures?.[activeTenure]?.senior || '-'}</span>
                                                </td>
                                                <td className="py-5 px-4">
                                                    {bank.specialRate ? (
                                                        <span className="text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg text-xs border border-green-100 block w-fit shadow-sm">
                                                            {bank.specialRate}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    <button className="text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}>
                                                        Apply Now
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BankList;
