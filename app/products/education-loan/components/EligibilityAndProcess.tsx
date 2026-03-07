'use client';

import { motion } from 'framer-motion';
import { IconCheck, IconFileText, IconUserCheck, IconBriefcase, IconClock, IconArrowRight, IconInfoCircle } from '@tabler/icons-react';

const steps = [
    { icon: IconFileText, step: '01', title: 'Fill Application', desc: 'Provide basic details about yourself, your course, institution, and desired loan amount.', color: 'bg-blue-100 text-blue-600' },
    { icon: IconUserCheck, step: '02', title: 'Document Submission', desc: 'Upload student documents and co-applicant financial documents via our secure portal.', color: 'bg-indigo-100 text-indigo-600' },
    { icon: IconBriefcase, step: '03', title: 'Credit Assessment', desc: 'Our team evaluates your profile, course, institution ranking, and co-applicant income.', color: 'bg-teal-100 text-teal-600' },
    { icon: IconClock, step: '04', title: 'Approval & Disbursal', desc: 'Receive sanction letter within 7 days. Funds disbursed directly to institution.', color: 'bg-sky-100 text-sky-600' },
];

const eligibility = {
    student: [
        'Indian citizen between 16–35 years',
        'Admission confirmed at recognized institution',
        'Academic merit: 50%+ in last qualifying exam',
        'Valid offer/admission letter',
        'Co-applicant must be Indian resident',
    ],
    abroad: [
        'Admission to foreign university / college',
        'Valid student visa or I-20 / CAS letter',
        'IELTS / TOEFL / GRE / GMAT score (preferred)',
        'Financial proof for visa application supported',
        'WES evaluation accepted for Canadian courses',
    ],
};

const documentRequirements = [
    {
        title: 'Applicant (Student)',
        docs: ['Aadhaar & PAN Card', 'Class 10, 12 & Degree Marksheets', 'Admission / Offer Letter', 'Fee Structure', 'Entrance Exam Score (IELTS/GRE)'],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Co-Applicant (Financial)',
        docs: ['Aadhar Card & PAN Card', '3-6 Months Salary Slips', '6-12 Months Bank Statement', '2-3 Years ITR / Form 16', 'Profit/Loss & Balance Sheet (Business)'],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Collateral Assets',
        docs: ['Property Title Deed', 'Valuation Report', 'Fixed Deposit Receipts', 'Insurance Policies', 'Encumbrance Certificate'],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Overseas Specific',
        docs: ['Passport (Student)', 'I-20 Form (USA) / CAS Letter (UK)', 'Visa Copy', 'Proof of Funds (Visa Requirement)', 'University Accreditation Docs'],
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
    },
];

export default function EligibilityAndProcess() {
    return (
        <>
            {/* ── How It Works ──────────────────────────────────────────── */}
            <section className="py-6 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-3"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">Simple Process</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            How to Apply in 4 Steps
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-xl md:text-1xl leading-relaxed">
                            Our streamlined process ensures you get your education loan without unnecessary delays or paperwork.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connector line */}
                        <div className="hidden md:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-20" />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {steps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={step.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.15 }}
                                        className="flex flex-col items-center text-center group"
                                    >
                                        <div className="relative mb-4">
                                            <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                                <Icon size={26} strokeWidth={1.8} />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center">
                                                <span className="text-[8px] font-black text-[#2076C7]">{step.step}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-700 mb-2 tracking-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-xs font-bold leading-relaxed">{step.desc}</p>
                                        {i < steps.length - 1 && (
                                            <IconArrowRight className="md:hidden mt-4 text-blue-300" size={20} />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Eligibility Section ────────────────────────────────────── */}
            <section id="eligibility" className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <span className="text-[#2076C7] font-black tracking-widest uppercase text-xs mb-4 block">Who Can Apply</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Eligibility Criteria
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto font-medium text-xl md:text-1xl leading-relaxed">
                            Open to all Indian students pursuing higher education — check if you meet the requirements below.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                        {/* Student Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2rem] p-8 border border-blue-100 shadow-lg"
                        >
                            <h3 className="text-xl font-extrabold text-gray-700 mb-6 flex items-center gap-3">
                                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <IconUserCheck size={20} className="text-blue-600" />
                                </div>
                                General Student Criteria
                            </h3>
                            <ul className="space-y-3">
                                {eligibility.student.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            <IconCheck size={12} className="text-teal-600" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Abroad Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[2rem] p-8 text-white shadow-xl"
                        >
                            <h3 className="text-lg font-extrabold mb-6 flex items-center gap-3">
                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                    <IconCheck size={20} className="text-white" />
                                </div>
                                Additional for Abroad Studies
                            </h3>
                            <ul className="space-y-3">
                                {eligibility.abroad.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            <IconCheck size={12} className="text-white" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-bold text-white/90 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Document Requirements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <h3 className="text-2xl font-extrabold text-gray-700 mb-8 text-center uppercase tracking-tight">
                            Document Requirements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {documentRequirements.map((type, i) => (
                                <motion.div
                                    key={type.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`rounded-[1.5rem] border p-4 sm:p-5 ${type.color}`}
                                >
                                    <h4 className={`font-extrabold text-sm mb-3 sm:mb-4 ${type.iconColor}`}>{type.title}</h4>
                                    <ul className="space-y-2">
                                        {type.docs.map((doc) => (
                                            <li key={doc} className="flex items-start gap-2 text-[11px] font-bold text-slate-600">
                                                <IconCheck size={12} className={`${type.iconColor} shrink-0 mt-0.5`} strokeWidth={3} />
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info note */}
                    <div className="flex items-start gap-3 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm">
                        <IconInfoCircle size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-bold text-slate-500 leading-relaxed">
                            <strong className="text-slate-800">Note:</strong> Student documents include: Aadhaar, PAN, Passport/DL, Resident Proof, Academic Documents, Offer Letter, Fee Structure, Visa/I-20 (for abroad), and Entrance Exam Scorecard.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
