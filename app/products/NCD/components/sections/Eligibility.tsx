'use client';

import { Users, Building2, UserCheck, Briefcase, FileText, CheckCircle2, CreditCard, PlayCircle } from 'lucide-react';

const Eligibility = () => {
    const groups = [
        { name: "Individuals", icon: <Users className="w-5 h-5" />, desc: "Indian residents and minors (through guardians)" },
        { name: "HUFs", icon: <Building2 className="w-5 h-5" />, desc: "Hindu Undivided Families registered in India" },
        { name: "NRIs", icon: <UserCheck className="w-5 h-5" />, desc: "Non-Resident Indians on a non-repatriation basis" },
        { name: "Companies", icon: <Briefcase className="w-5 h-5" />, desc: "Registered corporate bodies & institutions" },
    ];

    const steps = [
        { title: "KYC Registration", desc: "Complete your one-time KYC with PAN, Aadhaar and Bank details.", icon: <UserCheck className="w-6 h-6" /> },
        { title: "Select NCD Issue", desc: "Browse open offers and choose the one that fits your goals.", icon: <PlayCircle className="w-6 h-6" /> },
        { title: "Application & Payment", desc: "Submit application via ASBA or UPI through our secure portal.", icon: <CreditCard className="w-6 h-6" /> },
        { title: "Allotment & Tracking", desc: "Units are credited to your Demat. Track performance in real-time.", icon: <CheckCircle2 className="w-6 h-6" /> },
    ];

    return (
        <section className="py-24 bg-gray-50" id="eligibility">
            <div className="container-custom">
                {/* Section 1: Who Can Invest */}
                <div className="mb-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Who Can Invest
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                            NCDs are open to a wide range of investors. Whether you are an individual looking for monthly income or a company seeking better yield for surplus funds, there's an NCD for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {groups.map((group, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${idx % 2 === 0 ? 'bg-[#2076C7]/10 text-[#2076C7]' : 'bg-[#1CADA3]/10 text-[#1CADA3]'}`}>
                                    {group.icon}
                                </div>
                                <h4 className="font-extrabold text-[#0B1C2E] mb-2 text-xl">{group.name}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{group.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-24">
                    <div className="bg-gradient-to-br from-[#F8FBFE] via-white to-[#F0F7FF] p-6 sm:p-10 md:p-12 lg:p-16 rounded-3xl md:rounded-[3rem] shadow-xl border border-blue-50 relative overflow-hidden">
                        {/* Abstract Background Design */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1CADA3]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2076C7]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="text-center mb-10 relative z-10">
                            <span className="text-[#2076C7] font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Quick Preparation</span>
                            <h3 className="text-2xl md:text-4xl font-bold flex flex-col sm:flex-row items-center justify-center gap-4">
                                <span className="bg-[#2076C7] p-2.5 rounded-xl shadow-lg shadow-[#2076C7]/20">
                                    <FileText className="w-6 h-6 text-white" />
                                </span>
                                <span className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Documents Required</span>
                            </h3>
                            <p className="text-gray-500 font-medium mt-4 max-w-xl mx-auto italic text-sm">
                                Keep these documents ready in digital format for a smooth, paperless verification process.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                            {[
                                { label: "Identity Proof", detail: "PAN Card (Mandatory)", desc: "Original digital scan or photo", icon: <UserCheck className="w-5 h-5" /> },
                                { label: "Address Proof", detail: "Aadhaar / Voter ID", desc: "For address verification", icon: <Building2 className="w-5 h-5" /> },
                                { label: "Bank Account", detail: "Cancelled Cheque", desc: "With your name pre-printed", icon: <CreditCard className="w-5 h-5" /> },
                                { label: "Demat Account", detail: "CMR / Statement", desc: "To credit your NCD units", icon: <Briefcase className="w-5 h-5" /> },
                            ].map((doc, idx) => (
                                <div key={idx} className="bg-white border border-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${idx % 2 === 0 ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'} text-white shadow-lg ${idx % 2 === 0 ? 'shadow-[#2076C7]/20' : 'shadow-[#1CADA3]/20'}`}>
                                        {doc.icon}
                                    </div>
                                    <h5 className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest mb-1">{doc.label}</h5>
                                    <h4 className="text-base font-extrabold text-[#0B1C2E] mb-2">{doc.detail}</h4>
                                    <p className="text-[11px] text-gray-400 font-medium">{doc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Process Visualization */}
                <div className="text-center mb-16">
                    <span className="text-[#2076C7] font-black text-xs uppercase tracking-[0.4em] mb-4 block">Simple Flow</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        4-Step Application Process
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-gray-600 font-medium max-w-xl mx-auto">Getting started with NCDs is simple, fast, and 100% digital with our hand-held support.</p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#2076C7]/20 via-[#1CADA3]/20 to-[#2076C7]/20 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                {/* Number Ring */}
                                <div className="relative mb-6 lg:mb-10">
                                    <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl ring-[6px] md:ring-[10px] md:ring-[12px] ring-white z-10 ${idx % 2 === 0 ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'}`}>
                                        <div className="text-white transform group-hover:rotate-12 transition-transform duration-500">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 font-black text-[#0B1C2E] text-[10px]">
                                        0{idx + 1}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h4 className="font-extrabold text-[#0B1C2E] mb-3 text-xl group-hover:text-[#2076C7] transition-colors">{step.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Eligibility;



