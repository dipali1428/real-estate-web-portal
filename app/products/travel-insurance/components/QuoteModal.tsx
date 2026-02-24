'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconX,
    IconChevronDown,
    IconCheck,
    IconUser,
    IconWoman,
    IconMan,
    IconInfoCircle,
    IconBrandWhatsapp,
    IconChevronUp,
    IconChevronLeft,
    IconAlertCircle
} from '@tabler/icons-react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const [whatsappUpdates, setWhatsappUpdates] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [showStep2Error, setShowStep2Error] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        dob: '',
        email: '',
        mobile: '',
        visaType: 'Tourist/Visitor Visa',
        countryCode: '+1'
    });

    // Reset form state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setGender(null);
            setSelectedCondition(null);
            setShowErrors(false);
            setShowStep2Error(false);
            setFormData({
                fullName: '',
                age: '',
                dob: '',
                email: '',
                mobile: '',
                visaType: 'Tourist/Visitor Visa',
                countryCode: '+1'
            });
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (showErrors) setShowErrors(false);
    };

    const validateStep1 = () => {
        return (
            formData.fullName.trim() !== '' &&
            gender !== null &&
            formData.age.trim() !== '' &&
            formData.dob.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.mobile.trim() !== ''
        );
    };

    const handleContinue = () => {
        if (validateStep1()) {
            setStep(2);
            setShowErrors(false);
        } else {
            setShowErrors(true);
        }
    };

    const handleViewQuotes = () => {
        if (selectedCondition) {
            setStep(3);
            setShowStep2Error(false);
        } else {
            setShowStep2Error(true);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                {step > 1 && step < 3 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                                    >
                                        <IconChevronLeft size={20} />
                                    </button>
                                )}
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-sm font-bold text-slate-400">Step {step}:</span>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-blue-600 w-4' : 'bg-slate-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">
                                        {step === 1 && "Personal details"}
                                        {step === 2 && "Medical History"}
                                        {step === 3 && "Success!"}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        {/* Alert Case */}
                                        <div className="bg-teal-50/50 border border-teal-100 p-4 rounded-xl flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                                <IconCheck size={14} stroke={3} />
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                <span className="font-bold text-teal-700">Great choice</span> — Top-rated insurers settled over <span className="font-bold text-teal-600">98%</span> of claims within <span className="font-bold">3 months last year</span>. Reliable protection for your journey.
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-blue-600 rounded-full" />
                                                    <h3 className="text-lg font-bold text-slate-800">Traveller 1</h3>
                                                </div>
                                                {showErrors && !validateStep1() && (
                                                    <div className="flex items-center gap-2 text-red-500 animate-pulse">
                                                        <IconAlertCircle size={16} />
                                                        <span className="text-xs font-bold">Please fill all required fields</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <input
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Enter full name"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.fullName ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => { setGender('male'); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${gender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !gender ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconMan size={20} />Male
                                                    </button>
                                                    <button
                                                        onClick={() => { setGender('female'); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${gender === 'female' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !gender ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconWoman size={20} />Female
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleInputChange}
                                                        type="number"
                                                        placeholder="Enter age"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.age ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Enter date of birth (DD-MM-YYYY)"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.dob ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        type="email"
                                                        placeholder="Enter email"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.email ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute top-[-10px] left-4 px-2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">Select visa type</div>
                                                    <select
                                                        name="visaType"
                                                        value={formData.visaType}
                                                        onChange={handleInputChange}
                                                        className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-slate-900 appearance-none bg-white transition-all"
                                                    >
                                                        <option>Tourist/Visitor Visa</option>
                                                        <option>Student Visa</option>
                                                        <option>Business Visa</option>
                                                    </select>
                                                    <IconChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="relative w-24">
                                                        <select
                                                            name="countryCode"
                                                            value={formData.countryCode}
                                                            onChange={handleInputChange}
                                                            className="w-full h-14 pl-4 pr-8 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-slate-900 appearance-none bg-white transition-all"
                                                        >
                                                            <option>+91</option><option>+1</option>
                                                        </select>
                                                        <IconChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                    </div>
                                                    <input
                                                        name="mobile"
                                                        value={formData.mobile}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Mobile number"
                                                        className={`flex-1 h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.mobile ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-indigo-600 justify-end">
                                                <IconInfoCircle size={16} />
                                                <span className="text-[11px] font-bold">We will share the policy copy on this number</span>
                                            </div>

                                            <div className="flex flex-col items-center gap-6 pt-4">
                                                <div className="flex items-center gap-3">
                                                    <IconBrandWhatsapp size={20} className="text-teal-600" />
                                                    <span className="text-sm font-bold text-slate-600">Get updates on WhatsApp</span>
                                                    <button onClick={() => setWhatsappUpdates(!whatsappUpdates)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${whatsappUpdates ? 'bg-blue-600' : 'bg-slate-200'}`}>
                                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${whatsappUpdates ? 'right-1' : 'left-1'}`} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={handleContinue}
                                                    className="w-full max-w-sm h-14 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-lg rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8 py-4"
                                    >
                                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold text-slate-900">Do any travellers have pre-existing medical conditions?</h3>
                                                {showStep2Error && !selectedCondition && (
                                                    <div className="flex items-center gap-2 text-red-500 animate-pulse flex-shrink-0">
                                                        <IconAlertCircle size={16} />
                                                        <span className="text-xs font-bold">Required</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">This helps us find plans that cover your specific needs.</p>

                                            <div className="grid grid-cols-1 gap-3 pt-2">
                                                {['Diabetes', 'Hypertension', 'Any Heart Ailment', 'None of these'].map((condition) => (
                                                    <button
                                                        key={condition}
                                                        onClick={() => { setSelectedCondition(condition); setShowStep2Error(false); }}
                                                        className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 transition-all group ${selectedCondition === condition ? 'border-blue-500 bg-blue-50/50' : showStep2Error && !selectedCondition ? 'border-red-100' : 'border-slate-100 hover:border-blue-500'}`}
                                                    >
                                                        <span className={`font-bold transition-colors ${selectedCondition === condition ? 'text-blue-600' : 'text-slate-700 group-hover:text-blue-600'}`}>{condition}</span>
                                                        <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${selectedCondition === condition ? 'border-blue-500 bg-blue-600' : 'border-slate-200 group-hover:border-blue-500'}`}>
                                                            {selectedCondition === condition && <IconCheck size={14} className="text-white" stroke={3} />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-4">
                                            <button
                                                onClick={handleViewQuotes}
                                                className="w-full max-w-sm h-14 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-lg rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                View Quotes
                                            </button>
                                            <button
                                                onClick={() => setStep(1)}
                                                className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
                                            >
                                                Back to Personal Details
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                            <IconCheck size={40} stroke={3} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-black text-slate-900">Success!</h3>
                                            <p className="text-lg text-slate-500 max-w-md">
                                                Your details have been submitted. Our experts will contact you with the best travel insurance quotes shortly.
                                            </p>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-lg rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Close Form
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Expandable Disclaimer */}
                            {step < 3 && (
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                                        className="flex items-center justify-between w-full text-slate-500 group"
                                    >
                                        <span className="text-sm font-bold">Disclaimer</span>
                                        {isDisclaimerOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
                                    </button>
                                    <AnimatePresence>
                                        {isDisclaimerOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="py-4 text-[11px] text-slate-400 leading-relaxed space-y-3 font-medium">
                                                    <p>*190+ Countries coverage depends on the specific plan chosen. Please refer to the policy wordings for the complete list of covered countries and exclusion list.</p>
                                                    <p>Insurance is a subject matter of solicitation. The information provided on this website is for illustrative purposes only. The terms and conditions of the insurance policy, as issued by the respective insurance provider, shall prevail. We act as a facilitator and do not guarantee the issuance of any insurance policy or the settlement of any claims. Please read the policy document carefully before making a purchase. Premium rates mentioned (e.g., ₹19-25/Day) are starting prices for individual plans and vary based on age, destination, duration, and coverage limits. Taxes as applicable. For more details on risk factors, terms and conditions, please read sales brochure carefully before concluding a sale.</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
