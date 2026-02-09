"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { UserCheck, FileText, TrendingUp, CheckCircle2, ChevronRight, Award } from 'lucide-react';

const InvestmentGuide = () => {
    const [activeTab, setActiveTab] = useState<'benefits' | 'documents' | 'process'>('benefits');

    const tabs = [
        { id: 'benefits', label: 'Benefits', icon: Award },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'process', label: 'Process', icon: TrendingUp },
    ];

    const content: Record<string, { title: string; description: string; steps: { title: string; desc: string }[]; image: string }> = {
        benefits: {
            title: "Why Invest in Fixed Deposits?",
            description: "Fixed Deposits are one of the safest and most reliable investment avenues in India.",
            steps: [
                { title: "Guaranteed Returns", desc: "Your principal and interest are 100% safe, unaffected by market volatility." },
                { title: "Higher Interest", desc: "Earn significantly more than a standard savings account." },
                { title: "Flexible Payouts", desc: "Choose to receive interest monthly, quarterly, or at maturity." },
                { title: "Senior Citizen Perks", desc: "Special additional interest rates for our senior investors." }
            ],
            image: "/FD/benefits.jpg"
        },
        documents: {
            title: "Required Documents",
            description: "Go paperless with our swift digital onboarding process.",
            steps: [
                { title: "Identity Proof", desc: "Aadhaar Card, Passport, or Voter ID for verification." },
                { title: "Address Proof", desc: "Utility bills or Aadhaar to confirm residency." },
                { title: "PAN Card", desc: "Mandatory for all depositors to ensure compliance." },
                { title: "Photograph", desc: "Recent passport-sized digital photograph." }
            ],
            image: "/FD/documents.jpg"
        },
        process: {
            title: "Process Overview",
            description: "Start growing your savings in minutes with our seamless digital process.",
            steps: [
                { title: "Compare & Select", desc: "Compare interest rates and choose the best bank or NBFC for you." },
                { title: "Fill Details", desc: "Enter your investment amount, tenure, and nominee information." },
                { title: "Instant KYC", desc: "Complete your identity verification via Video KYC or Aadhaar." },
                { title: "Payment", desc: "Transfer funds instantly through UPI, Net Banking, or RTGS." }
            ],
            image: "/FD/process.jpg"
        }
    };

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start investing in Minutes</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}></div>
                    <p className="text-gray-600">Everything you need to know to start your wealth creation journey.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px] animate-fade-in-up delay-100 border border-gray-100">
                    {/* Sidebar / Tabs */}
                    <div className="lg:w-1/3 bg-blue-50 p-8 text-gray-900 flex flex-col justify-center border-r border-gray-100">
                        <div className="space-y-4">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as 'benefits' | 'documents' | 'process')}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${activeTab === tab.id
                                            ? 'text-white shadow-lg transform translate-x-2 border-transparent'
                                            : 'hover:bg-primary/5 text-gray-600'
                                            }`}
                                        style={activeTab === tab.id ? { background: 'linear-gradient(to right, #1CADA3, #2076C7)' } : {}}
                                    >
                                        <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-lg font-semibold">{tab.label}</span>
                                        {activeTab === tab.id && <ChevronRight className="ml-auto" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:w-2/3 p-8 lg:p-12 relative flex items-center bg-white">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-0"></div>

                        <div className="relative z-10 w-full animate-fade-in">
                            <h3 className="text-3xl font-black text-slate-800 mb-2">{content[activeTab].title}</h3>
                            <p className="text-gray-600 mb-10 text-lg">{content[activeTab].description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="space-y-6">
                                        {content[activeTab].steps.map((step: any, idx: number) => (
                                            <div key={idx} className="flex gap-5 group transition-all duration-300">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                                    {idx + 1}
                                                </div>
                                                <div className="pt-1">
                                                    <h4 className="font-bold text-slate-700 mb-1 group-hover:text-primary transition-colors">{step.title}</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden md:block sticky top-0 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-700 aspect-[4/5] animate-fade-in-left relative">
                                    <Image
                                        src={content[activeTab].image}
                                        alt={content[activeTab].title}
                                        fill
                                        className="object-cover relative z-10 w-full rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvestmentGuide;

