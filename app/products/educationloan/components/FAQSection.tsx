'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconChevronDown, IconHelpCircle } from '@tabler/icons-react';

const faqs = [
    {
        q: 'What is the maximum loan amount I can get for studying abroad?',
        a: 'You can get up to ₹1.5 Crore for overseas education. For studies in India, the limit is ₹75 Lakh through select NBFCs and banks. The final amount depends on course fees, institution, and co-applicant income.',
    },
    {
        q: 'Is collateral required for an education loan?',
        a: 'For loans up to ₹7.5 Lakh (domestic) and ₹40 Lakh (abroad), no collateral is required. For higher amounts, residential/commercial property, FD, LIC policy, or NSC are accepted as security.',
    },
    {
        q: 'When does EMI repayment start?',
        a: 'There is a moratorium period equal to your course duration + 6 months to 1 year. During this time, only simple interest may be payable (varies by lender). EMI repayment starts after the moratorium period.',
    },
    {
        q: 'Can I get a tax benefit on education loan interest?',
        a: 'Yes. Under Section 80E of the Income Tax Act, the entire interest paid on an education loan is deductible from taxable income for up to 8 consecutive years from the year repayment begins.',
    },
    {
        q: 'What types of courses are covered?',
        a: 'All UG, PG, diploma, professional, and skill development courses at recognized institutions are covered — including engineering, medicine, MBA, law, and arts. STEM courses abroad may qualify for higher loan amounts.',
    },
    {
        q: 'Does a low CIBIL score affect my education loan application?',
        a: 'Student\'s CIBIL score is not always considered since most students are first-time borrowers. The co-applicant\'s credit score (750+ preferred) plays a crucial role in determining approval and interest rate.',
    },
    {
        q: 'What expenses are covered under the education loan?',
        a: 'Tuition fees, hostel/accommodation, travel expenses, books/equipment, study tours, and laptop costs are all covered. Some lenders also cover health insurance premiums for the duration of the course.',
    },
    {
        q: 'How long does loan approval take?',
        a: 'With complete documentation, approval typically takes 5–7 working days. For pre-approved or fast-track cases, sanction letters can be issued within 24–48 hours to support visa applications.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [showAll, setShowAll] = useState(false);

    const displayedFaqs = showAll ? faqs : faqs.slice(0, 4);

    return (
        <section className="py-12 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <span className="inline-flex items-center gap-2 text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4">
                        <IconHelpCircle size={14} />
                        FAQs
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium text-base">
                        Everything you need to know about education loans — answered by our experts.
                    </p>
                </motion.div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {displayedFaqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.04 }}
                                className={`bg-white rounded-[1.5rem] border transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-blue-200 shadow-lg shadow-blue-500/5' : 'border-slate-100 hover:border-blue-100 shadow-sm'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                >
                                    <span className={`font-extrabold text-sm leading-snug transition-colors ${openIndex === i ? 'text-[#2076C7]' : 'text-slate-700 group-hover:text-[#2076C7]'}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${openIndex === i ? 'bg-blue-100 rotate-180' : 'bg-slate-50'}`}>
                                        <IconChevronDown size={16} className={openIndex === i ? 'text-[#2076C7]' : 'text-slate-400'} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-5">
                                                <div className="h-px bg-blue-50 mb-4" />
                                                <p className="text-sm text-slate-500 font-bold leading-relaxed">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!showAll && faqs.length > 4 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center"
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 bg-blue-50 text-[#2076C7] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#2076C7] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        >
                            Read More FAQs
                        </button>
                    </motion.div>
                )}

                {showAll && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center"
                    >
                        <button
                            onClick={() => setShowAll(false)}
                            className="text-slate-400 font-bold text-sm hover:text-[#2076C7] transition-colors flex items-center gap-2 mx-auto"
                        >
                            Show Less
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
