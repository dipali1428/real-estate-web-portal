"use client";

import { useState, useEffect } from 'react';
import { bondsData } from '../../data/bondsData';
import {
    ArrowLeft,
    ShieldCheck,
    User,
    CreditCard,
    Building2,
    Briefcase,
    CheckCircle2,
    Lock,
    BadgeCheck
} from 'lucide-react';

interface Props {
    id: number;
    onBack: () => void;
    onSuccess: () => void;
}

export default function BondInvestmentFormView({ id, onBack, onSuccess }: Props) {
    const bond = bondsData.find(item => item.id === id);

    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        occupation: 'Salaried',
        maritalStatus: 'Single',
        annualIncome: '5-10L',
        pan: '',
        investmentAmount: '',
        accountNumber: '',
        ifsc: '',
        bankName: '',
        dpType: 'NSDL',
        dpId: '',
        clientId: '',
        nomineeName: '',
        nomineeRelation: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (bond) {
            // Remove ₹ and commas for numerical input
            const numericAmount = bond.minInvestment.replace(/[^\d]/g, '');
            setFormData(prev => ({ ...prev, investmentAmount: numericAmount }));
        }
    }, [bond]);

    if (!bond) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <button onClick={onBack} className="text-[#2076C7] font-bold hover:underline">Back to Details</button>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'pan' ? value.toUpperCase() : value
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="py-20">
                <div className="max-w-2xl mx-auto text-center px-4">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-teal-50">
                        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-[#1CADA3]" />
                        </div>
                        <h2 className="text-3xl font-black text-[#0B1C2E] mb-4">Application Received!</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Your application for <span className="font-bold text-[#2076C7]">{bond.company}</span> has been successfully submitted. Our team will verify your details and contact you within 24 hours.
                        </p>
                        <div className="bg-gray-50 p-8 rounded-3xl mb-8 border border-gray-100 text-left">
                            <p className="text-[10px] font-black text-gray-400 gap-2 uppercase mb-4 tracking-[0.2em] flex items-center">
                                <BadgeCheck size={14} className="text-[#1CADA3]" /> Application Summary
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500 text-sm font-medium">Applicant:</span>
                                    <span className="font-bold text-[#0B1C2E] uppercase text-sm">{formData.fullName}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-gray-500 text-sm font-medium">Investment:</span>
                                    <span className="font-bold text-[#1CADA3] text-sm italic">₹{Number(formData.investmentAmount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm font-medium">Reference:</span>
                                    <span className="font-bold text-[#0B1C2E] font-mono text-sm leading-none">INV-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onSuccess}
                            className="w-full py-5 bg-[#1CADA3] text-white font-black rounded-2xl hover:bg-[#168a82] transition-all shadow-lg active:scale-95"
                        >
                            Return to Bonds Hub
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-16 bg-gray-50/50 min-h-screen font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <button onClick={onBack} className="inline-flex items-center text-[#2076C7] hover:gap-2 font-bold mb-4 transition-all group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1" />
                            Back to Bond Details
                        </button>
                        <h1 className="text-3xl font-black text-[#0B1C2E]">Invest in <span className="text-[#2076C7]">{bond.company}</span></h1>
                        <p className="text-gray-500 font-medium">Security: {bond.type} • Target: {bond.yield}</p>
                    </div>
                    <div className="inline-flex items-center self-start bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                        <Lock className="w-4 h-4 text-[#1CADA3] mr-2" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End-to-End Encrypted</span>
                    </div>
                </div>

                {/* Progress Stepper */}
                <div className="mb-12 relative px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 -z-10" />
                    <div className="flex justify-between">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-4 ${step >= num ? 'bg-[#2076C7] text-white border-blue-100 scale-110 shadow-lg' : 'bg-white text-gray-300 border-gray-100'
                                    }`}>
                                    {num}
                                </div>
                                <span className={`text-[9px] font-black uppercase mt-3 tracking-widest transition-colors ${step >= num ? 'text-[#2076C7]' : 'text-gray-300'}`}>
                                    {num === 1 ? 'Personal' : num === 2 ? 'Investment' : num === 3 ? 'Payouts' : 'Settlement'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-gray-50 relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#2076C7]/5 rounded-bl-full pointer-events-none" />

                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center mb-6">
                                <div className="p-4 bg-blue-50 rounded-2xl mr-4 shadow-inner">
                                    <User className="w-6 h-6 text-[#2076C7]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1C2E]">Personal Information</h3>
                                    <p className="text-sm text-gray-400 font-medium italic">We need your basic details as per PAN records.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Legal Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Mobile Number</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email ID</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Occupation Type</label>
                                    <select
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-black text-slate-800"
                                    >
                                        <option value="Salaried">Salaried Professional</option>
                                        <option value="Self-Employed">Self-Employed</option>
                                        <option value="Business">Business Owner</option>
                                        <option value="Professional">Licensed Professional</option>
                                        <option value="Retired">Retired</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-8">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1a65ab] text-white font-black rounded-2xl shadow-xl hover:shadow-blue-200/50 hover:scale-[1.01] active:scale-95 transition-all text-lg"
                                >
                                    Proceed to Investment Data
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center mb-6">
                                <div className="p-4 bg-teal-50 rounded-2xl mr-4 shadow-inner">
                                    <CreditCard className="w-6 h-6 text-[#1CADA3]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1C2E]">Investment Details</h3>
                                    <p className="text-sm text-gray-400 font-medium italic">Commitment amount and tax residency.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">PAN Number</label>
                                    <input
                                        required
                                        type="text"
                                        name="pan"
                                        value={formData.pan}
                                        onChange={handleInputChange}
                                        maxLength={10}
                                        placeholder="ABCDE1234F"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#1CADA3] focus:bg-white transition-all font-black tracking-widest text-[#0B1C2E]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Commitment Amount (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        name="investmentAmount"
                                        value={formData.investmentAmount}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-teal-50/30 border border-teal-100 rounded-2xl focus:outline-none focus:border-[#1CADA3] focus:bg-white transition-all font-black text-xl text-[#1CADA3]"
                                    />
                                    <p className="text-[10px] text-[#1CADA3] font-black italic">Minimum: {bond.minInvestment}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-8">
                                <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all">Back</button>
                                <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-[#1CADA3] text-white font-black rounded-2xl shadow-lg hover:bg-[#168a82] transition-all">Review & Payouts</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center mb-6">
                                <div className="p-4 bg-blue-50 rounded-2xl mr-4 shadow-inner">
                                    <Building2 className="w-6 h-6 text-[#2076C7]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1C2E]">Banking (Payout Account)</h3>
                                    <p className="text-sm text-gray-400 font-medium italic">Interest and redemption will be credited here.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Account Number</label>
                                    <input
                                        required
                                        type="password"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleInputChange}
                                        placeholder="···· ···· ···· ····"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-mono text-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">IFSC Code</label>
                                    <input
                                        required
                                        type="text"
                                        name="ifsc"
                                        value={formData.ifsc}
                                        onChange={handleInputChange}
                                        placeholder="SBIN0001234"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-black text-[#0B1C2E] uppercase"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Bank Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="bankName"
                                        value={formData.bankName}
                                        onChange={handleInputChange}
                                        placeholder="HDFC Bank, ICICI, etc."
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-8">
                                <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all">Prev</button>
                                <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-[#2076C7] text-white font-black rounded-2xl shadow-lg hover:bg-[#1a65ab] transition-all">Last Step</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center mb-6">
                                <div className="p-4 bg-purple-50 rounded-2xl mr-4 shadow-inner">
                                    <Briefcase className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0B1C2E]">Settlement Details</h3>
                                    <p className="text-sm text-gray-400 font-medium italic">Demat account and nominee setup.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">DP Platform</label>
                                    <select
                                        name="dpType"
                                        value={formData.dpType}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-black text-slate-800"
                                    >
                                        <option value="NSDL">NSDL (Standard)</option>
                                        <option value="CDSL">CDSL (Zerodha, Upstox, etc.)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">DP ID / Client ID</label>
                                    <input
                                        required
                                        type="text"
                                        name="clientId"
                                        value={formData.clientId}
                                        onChange={handleInputChange}
                                        placeholder="16-Digit Demat Number"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-mono text-slate-800"
                                    />
                                </div>
                                <div className="col-span-full h-px bg-gray-100 my-4" />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nominee (Legal Heir)</label>
                                    <input
                                        required
                                        type="text"
                                        name="nomineeName"
                                        value={formData.nomineeName}
                                        onChange={handleInputChange}
                                        placeholder="Full Name"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Relationship</label>
                                    <input
                                        required
                                        type="text"
                                        name="nomineeRelation"
                                        value={formData.nomineeRelation}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mother, Spouse, Son"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-bold text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                                <CheckCircle2 className="w-6 h-6 text-[#2076C7] flex-shrink-0 mt-1" />
                                <p className="text-[10px] text-gray-500 leading-relaxed font-bold italic">
                                    I hereby confirm that all details provided are correct to the best of my knowledge. I authorize <span className="text-[#2076C7]">Infinity Arthvishva</span> to initiate the investment process on my behalf as per SEBI regulations.
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all">Back</button>
                                <button type="submit" className="flex-[3] py-5 bg-gradient-to-r from-[#1CADA3] to-[#148079] text-white font-black rounded-3xl shadow-2xl hover:shadow-teal-200/50 hover:scale-[1.01] active:scale-95 transition-all text-xl flex items-center justify-center gap-3">
                                    Submit Application
                                    <BadgeCheck className="w-6 h-6 text-white" />
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">
                        Standard SEBI Compliant Investment Process
                    </p>
                </div>
            </div>
        </div>
    );
}
