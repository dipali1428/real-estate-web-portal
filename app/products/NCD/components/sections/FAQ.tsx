'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            category: 'General',
            question: "What is a Non-Convertible Debenture (NCD)?",
            answer: "An NCD is a fixed-income instrument issued by a company to raise capital from the public. Unlike convertible debentures, NCDs cannot be converted into equity shares at maturity. In return, they offer higher interest rates compared to FD and bonds."
        },
        {
            category: 'Investment',
            question: "What is the minimum investment required for NCDs?",
            answer: "Generally, the minimum investment is ₹10,000 (usually 10 units of ₹1,000 each). This makes NCDs accessible for retail investors seeking higher fixed income."
        },
        {
            category: 'Tax',
            question: "Is TDS deducted on NCD interest?",
            answer: "Yes, TDS @ 10% is deducted if the interest exceeds ₹5,000 in a financial year. However, if the NCDs are held in Demat form and listed on local stock exchanges, usually no TDS is deducted at source."
        },
        {
            category: 'Safety',
            question: "How safe are NCDs?",
            answer: "The safety depends on the credit rating and security. 'Secured' NCDs are backed by company assets. Always check for ratings like 'AAA' or 'AA+' from agencies like CRISIL, ICRA, or CARE before investing."
        },
        {
            category: 'Process',
            question: "Can I sell my NCD before maturity?",
            answer: "Yes, you can sell listed NCDs on the stock exchange (NSE/BSE) through your Demat account, similar to trading stocks. However, the price you get will depend on the market demand and prevailing interest rates."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-16 bg-[#F8FBFE]" id="faq">
            <div className="container-custom">
                {/* Centered Header Area */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Got Questions?
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-lg text-gray-600 font-medium mb-10">
                        Everything you need to know about NCDs, SGBs, and secure fixed-income investments in one place.
                    </p>

                    {/* Centered Search */}
                    <div className="relative max-w-xl mx-auto mb-8 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2076C7] transition-scale duration-300 group-focus-within:scale-110" />
                        <input
                            type="text"
                            placeholder="Search your queries here..."
                            className="w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent rounded-[2rem] text-lg font-medium text-[#2076C7] placeholder-gray-400 focus:border-[#2076C7] outline-none transition-all shadow-[0_15px_35px_rgba(0,0,0,0.05)] focus:shadow-[0_20px_50px_rgba(32,118,199,0.1)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`group overflow-hidden transition-all duration-500 rounded-[2.5rem] bg-white border-2 ${openIndex === idx
                                    ? 'border-[#2076C7] shadow-[0_25px_60px_rgba(32,118,199,0.12)] -translate-y-1'
                                    : 'border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:border-[#EDF9F8]'
                                    }`}>
                                <button
                                    className="w-full px-5 md:px-10 py-6 md:py-8 text-left flex justify-between items-center bg-white"
                                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}>
                                    <div className="flex flex-col items-start gap-4">
                                        <span className={`text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] transition-all duration-300 ${openIndex === idx ? 'bg-[#2076C7] text-white' : 'bg-[#EDF9F8] text-[#1CADA3]'
                                            }`}>
                                            {faq.category}
                                        </span>
                                        <h3 className={`text-xl md:text-2xl font-extrabold transition-colors duration-300 ${openIndex === idx ? 'text-[#2076C7]' : 'text-slate-600'
                                            }`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 scale-110 ${openIndex === idx
                                        ? 'bg-[#2076C7] text-white rotate-180'
                                        : 'bg-[#F8FBFE] text-gray-400 group-hover:bg-[#1CADA3] group-hover:text-white'
                                        }`}>
                                        <ChevronDown className="w-6 h-6" />
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-5 md:px-10 pb-6 md:pb-10 pt-2">
                                        <div className="border-t border-gray-100 pt-8">
                                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[3rem] border-4 border-dashed border-[#EDF9F8] shadow-inner">
                            <div className="w-24 h-24 bg-[#EDF9F8] rounded-full flex items-center justify-center mx-auto mb-8">
                                <HelpCircle className="w-12 h-12 text-[#1CADA3]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#2076C7] mb-4">No matching queries found</h3>
                            <p className="text-gray-500 font-medium max-w-sm mx-auto">
                                We couldn't find an answer to your specific keyword. Please try a different term or contact our experts.
                            </p>
                        </div>
                    )}
                </div>


            </div>
        </section>
    );
};

export default FAQ;



