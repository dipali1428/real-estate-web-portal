'use client';

import { Users, Building2, UserCheck, Briefcase, CheckCircle2, CreditCard, PlayCircle } from 'lucide-react';

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
        // Added px-4 to ensure side margins on mobile
        <section className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans" id="eligibility">
            <div className="container-custom mx-auto max-w-7xl">
                {/* Side-by-Side: Who Can Invest & Documents Required */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-24">
                    
                    {/* Column 1: Who Can Invest */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5">
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Who Can Invest
                            </h2>
                            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                                Indian residents, HUFs, NRIs (non-repatriation) and registered corporate bodies are eligible to invest in NCDs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groups.map((group, idx) => (
                                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col items-start transition-all duration-300 hover:shadow-md group">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${idx % 2 === 0 ? 'bg-[#2076C7] text-white' : 'bg-[#1CADA3] text-white'}`}>
                                        {group.icon}
                                    </div>
                                    <h4 className="font-extrabold text-[#0B1C2E] mb-1 text-base font-sans">{group.name}</h4>
                                    <p className="text-[11px] text-gray-500 font-medium leading-tight">{group.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Documents Required */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1CADA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="mb-10 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Documents Required
                            </h2>
                            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                                Keep these digital copies ready for a seamless paperless verification and allotment process.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                            {[
                                { label: "Identity", detail: "PAN Card", desc: "Mandatory for all", icon: <UserCheck className="w-5 h-5" /> },
                                { label: "Address", detail: "Aadhaar / Voter ID", desc: "For verification", icon: <Building2 className="w-5 h-5" /> },
                                { label: "Bank", detail: "Cancelled Cheque", desc: "Pre-printed name", icon: <CreditCard className="w-5 h-5" /> },
                                { label: "Investment", detail: "Demat Details", desc: "For unit credit", icon: <Briefcase className="w-5 h-5" /> },
                            ].map((doc, idx) => (
                                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-blue-50/50 flex flex-col items-start hover:shadow-md transition-all group">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${idx % 2 === 0 ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'} text-white`}>
                                        {doc.icon}
                                    </div>
                                    <h4 className="text-base font-extrabold text-[#0B1C2E] mb-1 font-sans">{doc.detail}</h4>
                                    <p className="text-[11px] text-gray-400 font-medium">{doc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Process Visualization */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-[#2076C7] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 block">Simple Flow</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        4-Step Application Process
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-xl leading-relaxed">Getting started with NCDs is simple, fast, and 100% digital with our hand-held support.</p>
                </div>

                <div className="relative max-w-6xl mx-auto mb-10">
                    {/* Connector Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#2076C7]/20 via-[#1CADA3]/20 to-[#2076C7]/20 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                {/* Number Ring */}
                                <div className="relative mb-6 lg:mb-10">
                                    <div className={`w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl ring-8 lg:ring-[12px] ring-white z-10 ${idx % 2 === 0 ? 'bg-[#2076C7]' : 'bg-[#1CADA3]'}`}>
                                        <div className="text-white transform group-hover:rotate-12 transition-transform duration-500 scale-90 lg:scale-100">
                                            {step.icon}
                                        </div>
                                    </div>

                                </div>

                                <div className="text-center max-w-[250px] md:max-w-none">
                                    <h4 className="font-extrabold text-[#0B1C2E] mb-3 text-lg md:text-xl group-hover:text-[#2076C7] transition-colors font-sans">{step.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed px-2 md:px-4">{step.desc}</p>
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