'use client';

import { useState, useEffect } from 'react';
import { ncdData } from '../../data/ncdData';
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

interface InvestmentFormViewProps {
    id: string;
    onBack: () => void;
    onSuccess: () => void;
}

export default function InvestmentFormView({ id, onBack, onSuccess }: InvestmentFormViewProps) {
    const ncd = ncdData.find(item => item.id === id);

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
        if (ncd) {
            setFormData(prev => ({ ...prev, investmentAmount: ncd.minInvest.replace('₹', '').replace(',', '') }));
        }
    }, [ncd]);

    if (!ncd) {
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
                <div className="container-custom max-w-2xl mx-auto text-center">
                    <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-green-50">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-[#1CADA3]" />
                        </div>
                        <h2 className="text-3xl font-black text-[#0B1C2E] mb-4">Application Submitted!</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Your investment application for <span className="font-bold text-[#2076C7]">{ncd.issuer}</span> has been received. Our team will verify your details and get back to you shortly.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 text-left">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Application Summary</p>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Applicant:</span>
                                    <span className="font-bold text-[#0B1C2E]">{formData.fullName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-bold text-[#1CADA3]">₹{Number(formData.investmentAmount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">PAN:</span>
                                    <span className="font-bold text-[#0B1C2E]">{formData.pan}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onSuccess}
                            className="inline-block py-4 px-10 bg-[#2076C7] text-white font-bold rounded-2xl hover:bg-[#1a65ab] transition-all shadow-lg"
                        >
                            Back to All Issues
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header Area */}
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <button onClick={onBack} className="inline-flex items-center text-gray-500 hover:text-[#2076C7] font-bold mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Details
                            </button>
                            <h1 className="text-3xl font-black text-[#0B1C2E]">Invest in <span className="heading-gradient">{ncd.issuer}</span></h1>
                            <p className="text-gray-500 font-medium">{ncd.title} • {ncd.interest} Yield</p>
                        </div>
                        <div className="hidden md:flex items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                            <Lock className="w-4 h-4 text-[#1CADA3] mr-2" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secured Application</span>
                        </div>
                    </div>

                    {/* Progress Stepper */}
                    <div className="mb-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10" />
                        <div className="flex justify-between">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-4 ${step >= num ? 'bg-[#2076C7] text-white border-blue-100' : 'bg-white text-gray-300 border-gray-50'
                                        }`}>
                                        {num}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase mt-2 tracking-widest ${step >= num ? 'text-[#2076C7]' : 'text-gray-300'}`}>
                                        {num === 1 ? 'Personal' : num === 2 ? 'Regulatory' : num === 3 ? 'Banking' : 'Demat'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-blue-50">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-blue-50 rounded-2xl mr-4">
                                        <User className="w-6 h-6 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1C2E]">Personal & Profile</h3>
                                        <p className="text-sm text-gray-500">Basic information and investor profiling.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name (As per PAN)</label>
                                        <input
                                            required
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mobile Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="you@example.com"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Occupation</label>
                                        <select
                                            name="occupation"
                                            value={formData.occupation}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                        >
                                            <option value="Salaried">Salaried</option>
                                            <option value="Self-Employed">Self-Employed</option>
                                            <option value="Business">Business</option>
                                            <option value="Professional">Professional</option>
                                            <option value="Retired">Retired</option>
                                            <option value="Student">Student</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Annual Income</label>
                                        <select
                                            name="annualIncome"
                                            value={formData.annualIncome}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                        >
                                            <option value="<5L">Up to 5 Lakhs</option>
                                            <option value="5-10L">5 - 10 Lakhs</option>
                                            <option value="10-25L">10 - 25 Lakhs</option>
                                            <option value="25L+">Above 25 Lakhs</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Marital Status</label>
                                        <select
                                            name="maritalStatus"
                                            value={formData.maritalStatus}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                        >
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full py-5 bg-[#1CADA3] text-white font-bold rounded-[1.5rem] shadow-lg hover:bg-[#168a82] hover:scale-[1.01] active:scale-95 transition-all text-lg"
                                    >
                                        Continue to Banking
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-blue-50 rounded-2xl mr-4">
                                        <ShieldCheck className="w-6 h-6 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1C2E]">Regulatory & Investment</h3>
                                        <p className="text-sm text-gray-500">Tax information and investment commitment.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">PAN Card Number</label>
                                        <input
                                            required
                                            type="text"
                                            name="pan"
                                            value={formData.pan}
                                            onChange={handleInputChange}
                                            maxLength={10}
                                            placeholder="ABCDE1234F"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold tracking-widest text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Investment Amount (₹)</label>
                                        <input
                                            required
                                            type="number"
                                            name="investmentAmount"
                                            value={formData.investmentAmount}
                                            onChange={handleInputChange}
                                            min={ncd.minInvest.replace('₹', '').replace(',', '')}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-lg text-[#1CADA3]"
                                        />
                                        <p className="text-[10px] text-[#2076C7] font-bold">Minimum: {ncd.minInvest}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-8">
                                    <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-500 font-bold rounded-[1.5rem] hover:bg-gray-100 transition-all">Back</button>
                                    <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-[#1CADA3] text-white font-bold rounded-[1.5rem] shadow-lg hover:bg-[#168a82] transition-all">Continue</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-blue-50 rounded-2xl mr-4">
                                        <Building2 className="w-6 h-6 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1C2E]">Bank Details</h3>
                                        <p className="text-sm text-gray-500">For interest payouts and redemption.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 col-span-full">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Account Number</label>
                                        <input
                                            required
                                            type="password"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter full account number"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">IFSC Code</label>
                                        <input
                                            required
                                            type="text"
                                            name="ifsc"
                                            value={formData.ifsc}
                                            onChange={handleInputChange}
                                            placeholder="SBIN0001234"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Bank Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            placeholder="e.g., State Bank of India"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-8">
                                    <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-500 font-bold rounded-[1.5rem] hover:bg-gray-100 transition-all">Back</button>
                                    <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-[#1CADA3] text-white font-bold rounded-[1.5rem] shadow-lg hover:bg-[#168a82] transition-all">Continue</button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-blue-50 rounded-2xl mr-4">
                                        <Briefcase className="w-6 h-6 text-[#2076C7]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0B1C2E]">Demat & Nominee</h3>
                                        <p className="text-sm text-gray-500">Final step to secure your investment.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">DP Type</label>
                                        <select
                                            name="dpType"
                                            value={formData.dpType}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-bold text-slate-800"
                                        >
                                            <option value="NSDL">NSDL</option>
                                            <option value="CDSL">CDSL</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">DP ID / Client ID</label>
                                        <input
                                            required
                                            type="text"
                                            name="clientId"
                                            value={formData.clientId}
                                            onChange={handleInputChange}
                                            placeholder="16 Digit ID"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-mono text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="col-span-full h-px bg-gray-100 my-4" />
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nominee Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="nomineeName"
                                            value={formData.nomineeName}
                                            onChange={handleInputChange}
                                            placeholder="Full name"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Relationship</label>
                                        <input
                                            required
                                            type="text"
                                            name="nomineeRelation"
                                            value={formData.nomineeRelation}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Spouse, Parent"
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#2076C7] focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-[#2076C7] mr-3 mt-1 flex-shrink-0" />
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        By submitting this application, I confirm that the information provided is accurate and I agree to the terms of the <span className="text-[#2076C7] font-bold">Infinity Arthvishva</span> investment platform.
                                    </p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={prevStep} className="flex-1 py-5 bg-gray-50 text-gray-500 font-bold rounded-[1.5rem] hover:bg-gray-100 transition-all">Back</button>
                                    <button type="submit" className="flex-[2] py-5 bg-[#2076C7] text-white font-bold rounded-[1.5rem] shadow-xl hover:bg-[#1a65ab] hover:scale-[1.01] active:scale-95 transition-all text-lg flex items-center justify-center">
                                        Complete Application
                                        <BadgeCheck className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-400 font-medium">
                            Secured with 256-bit SSL Encryption • SEBI Compliant Process
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
