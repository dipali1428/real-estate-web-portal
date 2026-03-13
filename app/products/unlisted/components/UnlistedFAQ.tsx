'use client';

import React, { useState } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    { 
        q: 'What exactly are unlisted shares?', 
        a: 'Unlisted shares are equity shares of companies that are not listed on any recognized stock exchange like NSE or BSE. These shares are traded privately between buyers and sellers through authorized intermediaries.'
    },
    { 
        q: 'Are unlisted shares legal in India?', 
        a: 'Yes, buying and selling unlisted shares is completely legal in India through off-market transactions. All transactions are conducted through SEBI-registered intermediaries with proper documentation, including transfer deeds and Demat account transfers.'
    },
    { 
        q: 'Do I need a Demat account to buy unlisted shares?', 
        a: 'Yes, a valid Demat account is mandatory to hold unlisted shares. The shares are transferred via off-market transfer from the seller\'s Demat account to your Demat account.'
    },
    { 
        q: 'What is the minimum investment amount?', 
        a: 'The minimum investment varies by company and depends on the lot size. Our platform clearly displays the minimum lot size and the corresponding minimum investment amount for each opportunity.'
    },
    { 
        q: 'How is the price of unlisted shares determined?', 
        a: 'Prices are determined by financials, growth trajectory, demand-supply dynamics, and peer company valuations. Prices are updated regularly based on market conditions.'
    },
    { 
        q: 'Are unlisted shares risky?', 
        a: 'Yes, they carry higher risk including lower liquidity and limited financial disclosures. These are suitable for investors with a high-risk appetite and long-term horizon.'
    },
    { 
        q: 'What is the tax treatment for unlisted shares?', 
        a: 'STCG (held < 24 months) are taxed at slab rates. LTCG (held > 24 months) are taxed at 20% with indexation benefits.'
    },
    { 
        q: 'What happens if the company launches an IPO?', 
        a: 'Your unlisted shares will be converted into listed shares after the IPO. Usually, there is a 6-month lock-in period post-listing for pre-IPO shareholders.'
    }
];

export default function UnlistedFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-[1440px] mx-auto px-6">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[#2076C7] font-black tracking-widest uppercase text-[10px] mb-4 block">
                        Knowledge Base
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full opacity-30 mb-6" />
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                        Everything you need to know about investing in unlisted shares, legalities, and taxation.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto space-y-5">
                    {(showAllFaqs ? faqs : faqs.slice(0, 5)).map((faq, idx) => (
                        <motion.div 
                            key={idx}
                            layout
                            className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(32,118,199,0.06)] transition-all duration-500"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full px-6 sm:px-10 py-6 sm:py-7 text-left flex justify-between items-center gap-6 focus:outline-none cursor-pointer group"
                            >
                                <span className="font-extrabold text-slate-700 text-base sm:text-xl pr-2 group-hover:text-[#2076C7] transition-colors leading-snug">
                                    {faq.q}
                                </span>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${activeIndex === idx ? 'bg-[#2076C7] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2076C7]'}`}>
                                    {activeIndex === idx ? <IconMinus size={20} strokeWidth={3} /> : <IconPlus size={20} strokeWidth={3} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 sm:px-10 pb-8 text-slate-500 font-medium text-base md:text-lg leading-relaxed border-t border-slate-50 pt-5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Action Button */}
                {faqs.length > 5 && (
                    <motion.div layout className="text-center mt-14">
                        <button
                            onClick={() => setShowAllFaqs(!showAllFaqs)}
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#2076C7] font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-100/50 border border-slate-100 hover:bg-[#2076C7] hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
                        >
                            {showAllFaqs ? 'Show Less' : 'View All Questions'}
                            <IconPlus size={16} strokeWidth={3} className={`transition-transform duration-500 ${showAllFaqs ? 'rotate-45' : ''}`} />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}