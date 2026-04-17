'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconX,
    IconChevronDown,
    IconCheck,
    IconBrandWhatsapp,
    IconChevronUp,
    IconChevronLeft,
    IconAlertCircle,
    IconDog,
    IconCat,
    IconHeart,
    IconFeather,
    IconPaw
} from '@tabler/icons-react';

const BREED_OPTIONS: Record<string, string[]> = {
    dog: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Pug', 'Beagle', 'Rottweiler', 'Rajapalayam', 'Mudhol Hound', 'Indian Spitz', 'Doberman', 'Mixed Breed', 'Other'],
    cat: ['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Indian Domestic', 'Mixed Breed', 'Other'],
    bird: ['Parrot', 'Cockatiel', 'Lovebird', 'Macaw', 'Budgerigar', 'Other'],
    exotic: ['Rabbit', 'Guinea Pig', 'Hamster', 'Turtle', 'Other'],
};

interface PetQuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PetQuoteModal({ isOpen, onClose }: PetQuoteModalProps) {
    const [step, setStep] = useState(1);
    const [petType, setPetType] = useState<'dog' | 'cat' | 'bird' | 'exotic' | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const [whatsappUpdates, setWhatsappUpdates] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [showStep2Error, setShowStep2Error] = useState(false);

    const [formData, setFormData] = useState({
        ownerName: '',
        petName: '',
        petBreed: '',
        petAge: '',
        email: '',
        mobile: '',
        city: '',
    });

    // Reset form state when modal opens
    useEffect(() => {
        if (isOpen) {
            // Use setTimeout to move the state updates to the next tick of the event loop.
            // This prevents the "cascading renders" error by ensuring the updates 
            // happen after the initial render of the open modal.
            const timer = setTimeout(() => {
                setStep(1);
                setPetType(null);
                setSelectedCondition(null);
                setShowErrors(false);
                setShowStep2Error(false);
                setFormData({
                    ownerName: '',
                    petName: '',
                    petBreed: '',
                    petAge: '',
                    email: '',
                    mobile: '',
                    city: '',
                });
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (showErrors) setShowErrors(false);
    };

    const validateStep1 = () => {
        return (
            formData.ownerName.trim() !== '' &&
            formData.petName.trim() !== '' &&
            petType !== null &&
            formData.petAge.trim() !== '' &&
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
                                        {step === 1 && "Pet & Owner details"}
                                        {step === 2 && "Pet Health History"}
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
                                        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                                <IconHeart size={14} stroke={3} />
                                            </div>
                                            <p className="text-sm text-slate-700 leading-relaxed">
                                                <span className="font-bold text-blue-700">Pawsitively Protected</span> — Join over <span className="font-bold text-blue-600">50,000+</span> pet parents who trust us for their pet&apos;s health and happiness.
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-blue-600 rounded-full" />
                                                    <h3 className="text-lg font-bold text-slate-800">Pet Information</h3>
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
                                                        name="petName"
                                                        value={formData.petName}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Enter pet's name"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.petName ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => { setPetType('dog'); setFormData(prev => ({ ...prev, petBreed: '' })); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${petType === 'dog' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !petType ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconDog size={20} />Dog
                                                    </button>
                                                    <button
                                                        onClick={() => { setPetType('cat'); setFormData(prev => ({ ...prev, petBreed: '' })); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${petType === 'cat' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !petType ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconCat size={20} />Cat
                                                    </button>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => { setPetType('bird'); setFormData(prev => ({ ...prev, petBreed: '' })); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${petType === 'bird' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !petType ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconFeather size={20} />Bird/Parrot
                                                    </button>
                                                    <button
                                                        onClick={() => { setPetType('exotic'); setFormData(prev => ({ ...prev, petBreed: '' })); if (showErrors) setShowErrors(false); }}
                                                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all ${petType === 'exotic' ? 'border-blue-500 bg-blue-50 text-blue-600' : showErrors && !petType ? 'border-red-100 bg-red-50/30 text-slate-500' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        <IconPaw size={20} />Exotic
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    <select
                                                        name="petBreed"
                                                        value={formData.petBreed}
                                                        onChange={handleInputChange}
                                                        disabled={!petType}
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 appearance-none bg-white transition-all ${!petType ? 'opacity-50 cursor-not-allowed border-slate-100' : 'border-slate-100 focus:border-blue-500 cursor-pointer'}`}
                                                    >
                                                        <option value="">{petType ? 'Select breed / sub-type' : 'Select pet type first'}</option>
                                                        {petType && BREED_OPTIONS[petType]?.map((breed) => (
                                                            <option key={breed} value={breed}>{breed}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <select
                                                        name="petAge"
                                                        value={formData.petAge}
                                                        onChange={handleInputChange}
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 appearance-none bg-white transition-all ${showErrors && !formData.petAge ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}>
                                                        <option value="">Select pet&apos;s age</option>
                                                        <option value="Puppy/Kitten">Puppy/Kitten (&lt; 1 yr)</option>
                                                        <option value="Adult">Adult (1 - 7 yrs)</option>
                                                        <option value="Senior">Senior (7+ yrs)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        name="ownerName"
                                                        value={formData.ownerName}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Owner's full name"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.ownerName ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <input
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        type="email"
                                                        placeholder="Owner's email address"
                                                        className={`w-full h-14 px-5 rounded-2xl border-2 outline-none font-bold text-slate-900 placeholder:text-slate-400 transition-all ${showErrors && !formData.email ? 'border-red-100 bg-red-50/30' : 'border-slate-100 focus:border-blue-500'}`}
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="relative w-24">
                                                        <div className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 flex items-center font-bold text-slate-900 bg-slate-50 uppercase">+91</div>
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
                                                <div className="space-y-2">
                                                    <input
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="City"
                                                        className="w-full h-14 px-5 rounded-2xl border-2 border-slate-100 outline-none font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                                                    />
                                                </div>
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
                                                <h3 className="text-xl font-bold text-slate-900">Does your pet have any pre-existing health conditions?</h3>
                                                {showStep2Error && !selectedCondition && (
                                                    <div className="flex items-center gap-2 text-red-500 animate-pulse flex-shrink-0">
                                                        <IconAlertCircle size={16} />
                                                        <span className="text-xs font-bold">Required</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">This helps us tailor the best coverage for your pet&apos;s needs.</p>

                                            <div className="grid grid-cols-1 gap-3 pt-2">
                                                {['Chronic Conditions', 'Recent Injuries', 'Genetic Disorders', 'No pre-existing conditions'].map((condition) => (
                                                    <button
                                                        key={condition}
                                                        onClick={() => { setSelectedCondition(condition); setShowStep2Error(false); }}
                                                        className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 transition-all group ${selectedCondition === condition ? 'border-blue-500 bg-blue-50/50' : showStep2Error && !selectedCondition ? 'border-red-100' : 'border-slate-100 hover:border-blue-500'}`}>
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
                                                Back to Pet Details
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
                                        <div className="w-full max-w-[240px] aspect-video rounded-3xl overflow-hidden relative mb-4">
                                            <img
                                                src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1974&auto=format&fit=crop"
                                                alt="Success Illustration"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-teal-500/10 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-teal-600 shadow-lg">
                                                    <IconCheck size={32} stroke={3} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-3xl font-black text-slate-900">Paw-some!</h3>
                                            <p className="text-lg text-slate-500 max-w-md">
                                                Your pet&apos;s details have been submitted. Our experts will contact you with the best pet insurance quotes shortly.
                                            </p>
                                        </div>
                                        <button
                                            onClick={onClose}
                                            className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-lg rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
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
                                                    <p>*Coverage for pre-existing conditions depends on the specific plan and waiting periods. Please refer to the policy wordings for full details.</p>
                                                    <p>Insurance is a subject matter of solicitation. The information provided is for illustrative purposes only. Terms and conditions of the insurance policy issued by the provider shall prevail. We act as a facilitator and do not guarantee issuance or settlement. Please read all policy documents carefully before purchase. Premium rates vary based on pet age, breed, and health history.</p>
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
