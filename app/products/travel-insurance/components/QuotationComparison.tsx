'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconChevronRight, IconChevronLeft, IconSortAscending,
    IconDownload, IconShoppingCart, IconShieldCheck, IconInfoCircle,
    IconUsers, IconMapPin, IconCalendarEvent, IconCheck, IconStar,
    IconStethoscope, IconPlaneDeparture, IconAlertCircle, IconActivity,
    IconSmoking, IconBolt, IconTrash,
    IconLoader
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import TravelInsurance from '@/app/dashboard/leadmanagement/forms/TravelInsuranceForm';
import { generateQuotePDF } from '../../../utils/generateQuotePDF';
import { travelInsuranceAddons } from '@/app/products/travel-insurance/data';
import {
    Traveler, Quotation, INSURERS, DESTINATIONS, TRIP_PURPOSES, SUM_INSURED_OPTIONS, ADDONS, BASE_DAILY_RATES, getInsurerBenefits, fmt
} from './travel-insurance-data';


export default function QuotationComparison() {
    const [view, setView] = useState<'form' | 'results' | 'details' | 'compare'>('form');
    const [showTravelInsuranceForm, setShowTravelInsuranceForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const mainContainer = document.querySelector('main');
            if (mainContainer) {
                mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 350);
        return () => clearTimeout(timer);
    }, [view, showTravelInsuranceForm]);

    const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

    // Refs for date inputs
    const startPickerRef = useRef<HTMLInputElement | null>(null);
    const endPickerRef = useRef<HTMLInputElement | null>(null);

    // Form State
    const [destination, setDestination] = useState(DESTINATIONS[2]);
    const [activeTab, setActiveTab] = useState('Plan Details');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [travelers, setTravelers] = useState<Traveler[]>([{ id: 1, age: '' }]);
    const [sumInsured, setSumInsured] = useState(SUM_INSURED_OPTIONS[1]);
    const [hasPreExistingDisease, setHasPreExistingDisease] = useState(false);
    const [isSmoker, setIsSmoker] = useState(false);
    const [planType, setPlanType] = useState<'Individual' | 'Family Floater'>('Individual');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [tripPurpose, setTripPurpose] = useState(TRIP_PURPOSES[0]);
    const [mobileNumber, setMobileNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    // Results State
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [sortBy, setSortBy] = useState<'price' | 'ratio' | 'rating'>('price');
    const [filterInsurer, setFilterInsurer] = useState<string[]>([]);
    const [isComparing, setIsComparing] = useState(false);
    const [compareList, setCompareList] = useState<string[]>([]);

    // Helper: Calculate Duration
    const getDuration = () => {
        if (!startDate || !endDate || startDate.length < 8 || endDate.length < 8) return 0;

        const parseDate = (str: string) => {
            const [d, m, y] = str.split('/').map(Number);
            // Assuming 20xx for YY
            return new Date(2000 + y, m - 1, d);
        };

        const start = parseDate(startDate);
        const end = parseDate(endDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return diff > 0 ? diff : 0;
    };

    const [downloading, setDownloading] = useState<string | null>(null);
    const [previewQuote, setPreviewQuote] = useState<Quotation | null>(null);

    const handleDownloadQuote = async (quote: Quotation) => {
        if (!quote) return;
        setDownloading(quote.id);
        try {
            await generateQuotePDF({
                productType: 'travel',
                insurerName: quote.insurer,
                planTitle: 'Travel Insurance Quote',
                planTagline: `${selectedCountry || destination.label} · ${getDuration()} Days (${startDate} to ${endDate})`,
                price: `₹${fmt(quote.finalPremium)}`,
                duration: `for ${getDuration()} days (Sum Insured: ${sumInsured.label})`,
                features: [
                    ...quote.benefits,
                    `Base Premium: Rs. ${fmt(quote.basePremium)}`,
                    `Add-ons Selected: Rs. ${fmt(quote.addOnsCost)}`,
                    `Discount Applied: Rs. -${fmt(quote.discount)}`,
                    `GST (18%): Rs. ${fmt(quote.gst)}`,
                ],
                claimRatio: quote.csr,
                network: quote.hospitals,
                addons: travelInsuranceAddons,
            });
            toast.success('Quote PDF downloaded successfully!');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error generating PDF:', error);
            toast.error('Failed to download Quote PDF');
        } finally {
            setDownloading(null);
        }
    };

    const handleShareWhatsApp = (quote: Quotation) => {
        if (!quote) return;
        const duration = getDuration();
        const text = encodeURIComponent(
            `*Infinity Insurance - Travel Insurance Quote*\n\n` +
            `Here are the travel insurance quote details for your upcoming trip to *${selectedCountry || destination.label}*:\n\n` +
            `• *Insurer:* ${quote.insurer}\n` +
            `• *Sum Insured:* ${sumInsured.label}\n` +
            `• *Trip Duration:* ${duration} Days (${startDate} to ${endDate})\n` +
            `• *Network Hospitals:* ${quote.hospitals}\n` +
            `• *Claim Settlement Ratio:* ${quote.csr}\n` +
            `• *Total Premium:* Rs. ${fmt(quote.finalPremium)} (Inclusive of 18% GST)\n\n` +
            `*Key Benefits included:*\n` +
            quote.benefits.slice(0, 5).map(b => `  - ${b}`).join('\n') + `\n\n` +
            `Check it out now: ${window.location.origin}/customer/insurance/travel-insurance`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    };

    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y.slice(2)}`;
    };

    // Helper: Calculate Quotations
    const generateQuotes = () => {
        const duration = getDuration();
        if (duration <= 0) {
            toast.error('Please select valid travel dates');
            return;
        }

        const hasMissingAge = travelers.some(t => !t.age || isNaN(Number(t.age)) || Number(t.age) <= 0);
        if (hasMissingAge || travelers.length === 0) {
            toast.error('Please enter a valid age for all travelers');
            return;
        }

        if (!mobileNumber || mobileNumber.length < 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }
        if (!selectedCountry) {
            toast.error('Please select a specific country');
            return;
        }

        const newQuotes = INSURERS.map((insurer): Quotation => {
            const baseDailyRate = BASE_DAILY_RATES[insurer.name] || 100;

            // Age Multipliers (Industry Standard Bands)
            const ages = travelers.map(t => Number(t.age));
            const maxAge = Math.max(...ages);

            let ageMultiplier = 1;
            if (maxAge > 80) ageMultiplier = 6.5;
            else if (maxAge > 70) ageMultiplier = 4.2;
            else if (maxAge > 60) ageMultiplier = 2.8;
            else if (maxAge > 50) ageMultiplier = 1.8;
            else if (maxAge > 40) ageMultiplier = 1.4;
            else if (maxAge < 18) ageMultiplier = 0.8;

            // Destination Multipliers
            let destinationMultiplier = 1;
            if (destination.label.includes('USA')) destinationMultiplier = 3.5;
            else if (destination.label.includes('Schengen')) destinationMultiplier = 2.0;
            else if (destination.label.includes('Worldwide')) destinationMultiplier = 2.8;
            else if (destination.label.includes('Middle East')) destinationMultiplier = 1.2;

            // Sum Insured Multipliers (diminishing increase)
            let siMultiplier = 1;
            const siValue = sumInsured.value;
            if (siValue >= 50000000) siMultiplier = 3.2; // 5 Cr
            else if (siValue >= 20000000) siMultiplier = 2.5; // 2 Cr
            else if (siValue >= 10000000) siMultiplier = 1.9; // 1 Cr
            else if (siValue >= 7500000) siMultiplier = 1.6; // 75 L
            else if (siValue >= 5000000) siMultiplier = 1.3; // 50 L
            else if (siValue <= 1000000) siMultiplier = 0.7; // 10 L

            // Risk Loadings
            const diseaseLoading = hasPreExistingDisease ? 1.5 : 1;
            const smokerLoading = isSmoker ? 1.2 : 1;
            const planMultiplier = planType === 'Family Floater' ? 1.7 : travelers.length;

            // Base Premium Calculation
            const basePremium = Math.round(
                baseDailyRate * duration * destinationMultiplier *
                siMultiplier * ageMultiplier *
                diseaseLoading * smokerLoading * planMultiplier * tripPurpose.multiplier
            );

            const addOnsCost = selectedAddons.reduce((sum, addonId) => {
                const addon = ADDONS.find(a => a.id === addonId);
                return sum + (addon ? addon.price : 0);
            }, 0);

            const discount = Math.round(basePremium * 0.12); // 12% web discount
            const taxableAmount = basePremium + addOnsCost - discount;
            const gst = Math.round(taxableAmount * 0.18); // 18% GST
            const finalPremium = taxableAmount + gst;

            return {
                id: Math.random().toString(36).substr(2, 9),
                insurer: insurer.name,
                logo: insurer.logo,
                csr: insurer.csr,
                hospitals: insurer.hospitals,
                rating: insurer.rating,
                basePremium,
                addOnsCost,
                discount,
                gst,
                finalPremium,
                pricePerDay: Math.round(finalPremium / duration),
                benefits: getInsurerBenefits(insurer.name)
            };
        });

        // Apply Smart Tags
        const sortedByPrice = [...newQuotes].sort((a, b) => a.finalPremium - b.finalPremium);
        sortedByPrice[0].tag = 'Lowest Price';

        const sortedByRating = [...newQuotes].sort((a, b) => b.rating - a.rating);
        sortedByRating[0].tag = sortedByRating[0].tag ? sortedByRating[0].tag : 'Most Trusted';

        const bestValue = newQuotes.find(q => q.insurer === 'HDFC ERGO' || q.insurer === 'Niva Bupa');
        if (bestValue && !bestValue.tag) bestValue.tag = 'Best Value';

        setQuotations(newQuotes);
        setView('results');
    };

    const handleSort = (type: 'price' | 'ratio' | 'rating') => {
        setSortBy(type);
        const sorted = [...quotations].sort((a, b) => {
            if (type === 'price') return a.finalPremium - b.finalPremium;
            if (type === 'ratio') return parseFloat(b.csr) - parseFloat(a.csr);
            if (type === 'rating') return b.rating - a.rating;
            return 0;
        });
        setQuotations(sorted);
    };

    const toggleCompare = (id: string) => {
        if (compareList.includes(id)) {
            setCompareList(compareList.filter(i => i !== id));
        } else {
            if (compareList.length >= 3) {
                toast.error('You can compare max 3 plans');
                return;
            }
            setCompareList([...compareList, id]);
        }
    };

    return (
        <div className="w-full font-sans overflow-x-hidden">
  {showTravelInsuranceForm && <TravelInsurance onClose={() => setShowTravelInsuranceForm(false)} />}
            <AnimatePresence mode="wait">
                {view === 'form' ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        <div className="p-5 sm:p-8 md:p-12">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-8 sm:mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white shadow-lg">
                                    <IconPlaneDeparture size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-800">Travel Quotation Details</h2>
                                    <p className="text-slate-500 font-medium">Provide your travel info to get accurate quotes</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Left Side: Primary Info */}
                                <div className="space-y-8">
                                    {/* Destination */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconMapPin size={18} /> Region & Country
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                            {DESTINATIONS.map((d, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setDestination(d);
                                                        setSelectedCountry('');
                                                    }}
                                                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${destination.label === d.label ? 'border-[#1CADA3] bg-teal-50/50 shadow-md ring-4 ring-teal-50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'}`}
                                                >
                                                    <p className={`font-bold text-sm ${destination.label === d.label ? 'text-[#1CADA3]' : 'text-slate-600'}`}>{d.label}</p>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specific Country</p>
                                            <select
                                                value={selectedCountry}
                                                onChange={(e) => setSelectedCountry(e.target.value)}
                                                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#2076C7] focus:bg-white outline-none font-bold text-slate-700 transition-all appearance-none"
                                            >
                                                <option value="">Select a country...</option>
                                                {destination.countries.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconCalendarEvent size={18} /> Travel Dates
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5 relative">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date (DD/MM/YY)</p>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="DD/MM/YY"
                                                        value={startDate}
                                                        onChange={(e) => {
                                                            let val = e.target.value.replace(/\D/g, '');
                                                            if (val.length > 6) val = val.slice(0, 6);
                                                            let formatted = val;
                                                            if (val.length > 2) formatted = val.slice(0, 2) + '/' + val.slice(2);
                                                            if (val.length > 4) formatted = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4);
                                                            setStartDate(formatted);
                                                        }}
                                                        className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#2076C7] focus:bg-white outline-none font-bold text-slate-700 transition-all"
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        <button
                                                            type="button"
                                                            onClick={() => startPickerRef.current?.showPicker()}
                                                            className="text-slate-400 hover:text-[#2076C7] p-2 transition-colors"
                                                        >
                                                            <IconCalendarEvent size={20} />
                                                        </button>
                                                        <input
                                                            ref={startPickerRef}
                                                            type="date"
                                                            className="absolute opacity-0 pointer-events-none"
                                                            onChange={(e) => setStartDate(formatDateForInput(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 relative">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date (DD/MM/YY)</p>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="DD/MM/YY"
                                                        value={endDate}
                                                        onChange={(e) => {
                                                            let val = e.target.value.replace(/\D/g, '');
                                                            if (val.length > 6) val = val.slice(0, 6);
                                                            let formatted = val;
                                                            if (val.length > 2) formatted = val.slice(0, 2) + '/' + val.slice(2);
                                                            if (val.length > 4) formatted = val.slice(0, 2) + '/' + val.slice(2, 4) + '/' + val.slice(4);
                                                            setEndDate(formatted);
                                                        }}
                                                        className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#2076C7] focus:bg-white outline-none font-bold text-slate-700 transition-all"
                                                    />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        <button
                                                            type="button"
                                                            onClick={() => endPickerRef.current?.showPicker()}
                                                            className="text-slate-400 hover:text-[#2076C7] p-2 transition-colors"
                                                        >
                                                            <IconCalendarEvent size={20} />
                                                        </button>
                                                        <input
                                                            ref={endPickerRef}
                                                            type="date"
                                                            className="absolute opacity-0 pointer-events-none"
                                                            onChange={(e) => setEndDate(formatDateForInput(e.target.value))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {getDuration() > 0 && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2076C7] rounded-full text-xs font-black uppercase tracking-widest">
                                                Duration: {getDuration()} Days
                                            </div>
                                        )}
                                    </div>

                                    {/* Travelers */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                                <IconUsers size={18} /> Travelers
                                            </label>
                                            <button
                                                onClick={() => setTravelers([...travelers, { id: Date.now(), age: 20 }])}
                                                className="text-xs font-black text-[#1CADA3] hover:underline uppercase tracking-widest"
                                            >
                                                + Add Member
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {travelers.map((t, index) => (
                                                <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#2076C7] font-black">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Traveler {index + 1} (Age)</span>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Age"
                                                                value={t.age}
                                                                onChange={(e) => {
                                                                    const val = e.target.value.replace(/\D/g, '');
                                                                    setTravelers(travelers.map(m => m.id === t.id ? { ...m, age: val } : m));
                                                                }}
                                                                className="bg-transparent w-full font-bold text-slate-700 outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    {travelers.length > 1 && (
                                                        <button
                                                            onClick={() => setTravelers(travelers.filter(m => m.id !== t.id))}
                                                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                        >
                                                            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                                                                <IconTrash size={16} />
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconCheck size={18} /> Contact Info
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</div>
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                placeholder="Mobile Number for KYC"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                                                className="w-full p-4 pl-14 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#2076C7] outline-none font-bold text-slate-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Risk & Add-ons */}
                                <div className="space-y-8">
                                    {/* Trip Purpose */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconActivity size={18} /> Trip Purpose
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {TRIP_PURPOSES.map((p, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setTripPurpose(p)}
                                                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${tripPurpose.label === p.label ? 'border-[#1CADA3] bg-teal-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'}`}
                                                >
                                                    <p className={`font-black text-[10px] uppercase tracking-widest ${tripPurpose.label === p.label ? 'text-[#1CADA3]' : 'text-slate-500'}`}>{p.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Sum Insured */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconShieldCheck size={18} /> Sum Insured
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {SUM_INSURED_OPTIONS.map((o, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSumInsured(o)}
                                                    className={`p-4 rounded-2xl border-2 transition-all duration-300 relative ${sumInsured.value === o.value ? 'border-[#1CADA3] bg-teal-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'}`}
                                                >
                                                    {o.recommended && (
                                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1CADA3] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                                                            Recommended
                                                        </div>
                                                    )}
                                                    <p className={`font-black text-base ${sumInsured.value === o.value ? 'text-[#1CADA3]' : 'text-slate-600'}`}>{o.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Risk Factors */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div
                                            onClick={() => setHasPreExistingDisease(!hasPreExistingDisease)}
                                            className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all ${hasPreExistingDisease ? 'border-orange-200 bg-orange-50/50' : 'border-slate-100 bg-slate-50/30'}`}
                                        >
                                            <IconStethoscope className={`mb-3 ${hasPreExistingDisease ? 'text-orange-500' : 'text-slate-300'}`} size={28} />
                                            <p className="font-black text-sm text-slate-700">Pre-existing Disease?</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Adds 40% Loading</p>
                                        </div>
                                        <div
                                            onClick={() => setIsSmoker(!isSmoker)}
                                            className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all ${isSmoker ? 'border-indigo-200 bg-indigo-50/50' : 'border-slate-100 bg-slate-50/30'}`}
                                        >
                                            <IconSmoking className={`mb-3 ${isSmoker ? 'text-indigo-500' : 'text-slate-300'}`} size={28} />
                                            <p className="font-black text-sm text-slate-700">Smoking Habit?</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Adds 20% Loading</p>
                                        </div>
                                    </div>

                                    {/* Add-ons Dropdown */}
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm font-black text-[#2076C7] uppercase tracking-wider">
                                            <IconActivity size={18} /> Optional Add-ons
                                        </label>
                                        <div className="relative group">
                                            <select
                                                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#2076C7] focus:bg-white outline-none font-bold text-slate-700 transition-all appearance-none cursor-pointer"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val && !selectedAddons.includes(val)) {
                                                        setSelectedAddons([...selectedAddons, val]);
                                                    }
                                                }}
                                                value=""
                                            >
                                                <option value="" disabled>Select Add-ons to add...</option>
                                                {ADDONS.filter(a => !selectedAddons.includes(a.id)).map((addon) => (
                                                    <option key={addon.id} value={addon.id}>
                                                        {addon.label} - ₹{addon.price}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <IconBolt size={20} />
                                            </div>
                                        </div>

                                        {selectedAddons.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {selectedAddons.map(id => {
                                                    const addon = ADDONS.find(a => a.id === id);
                                                    return (
                                                        <div key={id} className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-[#1CADA3] rounded-full text-xs font-black border border-teal-100">
                                                            {addon?.label}
                                                            <button
                                                                onClick={() => setSelectedAddons(selectedAddons.filter(i => i !== id))}
                                                                className="hover:text-red-500"
                                                            >
                                                                <IconTrash size={14} />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center">
                                <button
                                    onClick={generateQuotes}
                                    className="w-full sm:max-w-md py-4 sm:py-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs sm:text-sm shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(32,118,199,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    Generate Quotes <IconChevronRight size={20} />
                                </button>
                                <p className="text-slate-400 text-xs font-bold mt-6 flex items-center gap-2 uppercase tracking-widest">
                                    <IconShieldCheck size={14} className="text-[#1CADA3]" /> Instant results from 5+ insurance partners
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : view === 'details' && selectedQuote ? (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                <IconCheck size={14} strokeWidth={4} />
                            </div>
                            <p className="text-sm font-bold text-emerald-700">{"Great Choice! You're viewing one of the best plans for your trip."}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Plan Content */}
                            <div className="lg:col-span-2 flex flex-col md:flex-row items-start gap-6">
                                {/* Navigation */}
                                <button
                                    onClick={() => setView('results')}
                                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-[#2076C7] transition-all duration-300 shrink-0 mt-4 sticky top-8"
                                >
                                    <div className="p-1.5 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white group-hover:scale-110 transition-transform">
                                        <IconChevronLeft size={20} strokeWidth={4} />
                                    </div>
                                </button>

                                <div className="space-y-8 flex-grow w-full">
                                    {/* Insurer Overview Section */}
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden w-full">
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${INSURERS.find(i => i.name === selectedQuote.insurer)?.color} flex items-center justify-center text-white text-3xl font-black shadow-lg`}>
                                                {selectedQuote.logo}
                                            </div>
                                            <div className="flex-grow text-center md:text-left">
                                                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                                                    <h2 className="text-3xl font-black text-slate-800">{selectedQuote.insurer}</h2>
                                                    {selectedQuote.tag && (
                                                        <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-wider">
                                                            {selectedQuote.tag}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                                                    <div className="flex items-center gap-1 text-orange-400">
                                                        <IconStar size={16} fill="currentColor" />
                                                        <span className="text-sm font-black text-slate-700">{selectedQuote.rating}</span>
                                                        <span className="text-xs font-bold text-slate-400 ml-1">(12.3K Reviews)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IconShieldCheck size={18} className="text-[#2076C7]" />
                                                        <span className="text-sm font-black text-slate-700">{selectedQuote.csr}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Claim Ratio</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IconStethoscope size={18} className="text-[#2076C7]" />
                                                        <span className="text-sm font-black text-slate-700">{selectedQuote.hospitals}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospitals</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tabs */}
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-slate-100 mt-10 pb-2">
                                            {['Plan Details', 'Coverage', 'Exclusions', 'Policy Terms', 'Reviews'].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-[#2076C7]' : 'text-slate-400 hover:text-slate-600'}`}
                                                >
                                                    {tab}
                                                    {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#2076C7] rounded-full" />}
                                                </button>
                                            ))}
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {activeTab === 'Plan Details' && (
                                                <motion.div
                                                    key="plan-details"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="mt-10"
                                                >
                                                    <h3 className="text-lg font-black text-slate-800 mb-6">Plan Highlights</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {[
                                                            { label: 'Cashless Treatment', desc: 'Across the Globe', icon: IconActivity },
                                                            { label: 'No Medical Check-up', desc: 'For up to 55 Years', icon: IconUsers },
                                                            { label: '24x7 Assistance', desc: 'Worldwide Support', icon: IconActivity },
                                                            { label: 'COVID-19 Coverage', desc: 'Included', icon: IconShieldCheck },
                                                            { label: 'Instant Policy', desc: 'In 2 Minutes', icon: IconActivity },
                                                            { label: 'Paperless Process', desc: '100% Digital', icon: IconDownload },
                                                        ].map((h, i) => (
                                                            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#2076C7]">
                                                                    <h.icon size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-black text-slate-800">{h.label}</p>
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.desc}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100">
                                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">About the Insurer</h4>
                                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                                            {selectedQuote.insurer} is one of India&apos;s leading private general insurance companies. With a vast network of 10,000+ hospitals across the globe, they provide seamless cashless treatment and 24x7 claim assistance.
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeTab === 'Coverage' && (
                                                <motion.div
                                                    key="coverage"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="mt-10"
                                                >
                                                    <h3 className="text-lg font-black text-slate-800 mb-6">Coverage Benefits</h3>
                                                    <div className="overflow-hidden border border-slate-100 rounded-2xl">
                                                        <table className="w-full text-left">
                                                            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                                <tr>
                                                                    <th className="p-4">Coverage</th>
                                                                    <th className="p-4 text-right">Sum Insured (INR)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-50 text-sm">
                                                                {[
                                                                    { label: 'Emergency Medical Expenses', value: sumInsured.label },
                                                                    { label: 'Hospitalization Expenses', value: sumInsured.label },
                                                                    { label: 'COVID-19 Treatment', value: sumInsured.label },
                                                                    { label: 'Emergency Medical Evacuation', value: sumInsured.label },
                                                                    { label: 'Personal Accident', value: '₹10 Lakhs' },
                                                                    { label: 'Trip Delay (6 hours)', value: '₹10,000' },
                                                                    { label: 'Baggage Loss', value: '₹40,000' },
                                                                    { label: 'Passport Loss', value: '₹12,000' },
                                                                ].map((b, i) => (
                                                                    <tr key={i} className="hover:bg-slate-50/50">
                                                                        <td className="p-4 font-bold text-slate-600">{b.label}</td>
                                                                        <td className="p-4 text-right font-black text-slate-800">{b.value}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeTab === 'Exclusions' && (
                                                <motion.div
                                                    key="exclusions"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="mt-10"
                                                >
                                                    <h3 className="text-lg font-black text-slate-800 mb-6">{"What's Not Covered"}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {[
                                                            'Pre-existing diseases (unless declared)',
                                                            'War, invasion, acts of foreign enemies',
                                                            'Treatment for mental or nervous disorders',
                                                            'Participation in adventure sports',
                                                            'Self-inflicted injuries or attempted suicide',
                                                            'Alcohol or drug abuse',
                                                            'Cosmetic or plastic surgery',
                                                            'Treatment not related to an accident/emergency'
                                                        ].map((e, i) => (
                                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-rose-50/30 border border-rose-100/50">
                                                                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mt-0.5">
                                                                    <IconAlertCircle size={14} strokeWidth={3} />
                                                                </div>
                                                                <p className="text-sm font-bold text-slate-600">{e}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                            {activeTab === 'Policy Terms' && (
                                                <motion.div
                                                    key="terms"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="mt-10 space-y-6"
                                                >
                                                    <h3 className="text-lg font-black text-slate-800">Policy Terms & Conditions</h3>
                                                    <div className="space-y-4">
                                                        {[
                                                            { title: 'Grace Period', text: 'A grace period of 30 days is allowed for renewal of the policy.' },
                                                            { title: 'Free Look Period', text: 'You have a 15-day free look period to review the policy terms.' },
                                                            { title: 'Claim Notification', text: 'Claims must be notified within 24 hours of hospitalization.' },
                                                            { title: 'Sub-limits', text: 'Specific sub-limits apply to room rent and diagnostic tests.' }
                                                        ].map((item, i) => (
                                                            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                                <p className="text-xs font-black text-[#2076C7] uppercase tracking-widest mb-1">{item.title}</p>
                                                                <p className="text-sm text-slate-600 font-medium">{item.text}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeTab === 'Reviews' && (
                                                <motion.div
                                                    key="reviews"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="mt-10 space-y-6"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-black text-slate-800">Customer Reviews</h3>
                                                        <div className="flex items-center gap-2 text-orange-400">
                                                            <IconStar size={20} fill="currentColor" />
                                                            <span className="text-xl font-black text-slate-800">{selectedQuote.rating}</span>
                                                            <span className="text-xs font-bold text-slate-400">/ 5.0</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {[
                                                            { user: 'Amit K.', rating: 5, comment: 'Very smooth process. The cashless claim was settled within 2 hours in Dubai.' },
                                                            { user: 'Sneha M.', rating: 4, comment: 'Affordable premium and great customer support. Highly recommended for students.' },
                                                            { user: 'Rajesh V.', rating: 5, comment: 'Best travel insurance I have used so far. The documentation is very clear.' }
                                                        ].map((review, i) => (
                                                            <div key={i} className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                                                                <div className="flex justify-between items-center mb-3">
                                                                    <p className="font-black text-slate-800">{review.user}</p>
                                                                    <div className="flex gap-0.5 text-orange-400">
                                                                        {[...Array(review.rating)].map((_, i) => <IconStar key={i} size={14} fill="currentColor" />)}
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm text-slate-500 font-medium italic">&ldquo;{review.comment}&rdquo;</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Why Choose This Plan Card */}
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mt-10">
                                        <h3 className="text-lg font-black text-slate-800 mb-6">Why Choose This Plan?</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { title: 'Zero Deductibles', text: 'No out-of-pocket expenses for medical claims.' },
                                                { title: 'Global Coverage', text: 'Seamless cashless treatment in 150+ countries.' },
                                                { title: 'Trusted Support', text: 'Direct access to local emergency assistance.' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2076C7] shrink-0">
                                                        <IconShieldCheck size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-800">{item.title}</p>
                                                        <p className="text-sm text-slate-500">{item.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Sticky Sidebar */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-[2.5rem] p-5 sm:p-8 shadow-xl border border-slate-100 sticky top-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black text-slate-800">Your Trip Summary</h3>
                                        <button onClick={() => setView('form')} className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest hover:underline">Edit</button>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        {[
                                            { label: 'Traveller Age', value: `${travelers[0].age} Years`, icon: IconUsers },
                                            { label: 'Destination', value: `${selectedCountry} (${destination.label})`, icon: IconMapPin },
                                            { label: 'Trip Purpose', value: tripPurpose.label, icon: IconActivity },
                                            { label: 'Trip Dates', value: `${startDate} - ${endDate}`, icon: IconCalendarEvent },
                                            { label: 'Trip Duration', value: `${getDuration()} Days`, icon: IconActivity },
                                            { label: 'Plan Type', value: planType, icon: IconActivity },
                                            { label: 'Sum Insured', value: sumInsured.label, icon: IconShieldCheck },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start justify-between gap-4 text-xs">
                                                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest shrink-0">
                                                    <item.icon size={14} className="shrink-0" /> {item.label}
                                                </div>
                                                <span className="font-black text-slate-700 text-right break-words max-w-[50%] sm:max-w-none">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-emerald-50 rounded-2xl p-4 mb-8 flex justify-between items-center">
                                        <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Special Discount Applied!</p>
                                        <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg">10% OFF</span>
                                    </div>

                                    <div className="space-y-3 mb-8 pt-6 border-t border-slate-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-slate-500">Base Premium</span>
                                            <span className="font-black text-slate-800">₹{fmt(selectedQuote.basePremium)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-slate-500">Add-ons</span>
                                            <span className="font-black text-slate-800">₹{fmt(selectedQuote.addOnsCost)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-emerald-600">
                                            <span className="font-bold">Discount</span>
                                            <span className="font-black">- ₹{fmt(selectedQuote.discount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm pt-3 border-t border-slate-50">
                                            <span className="font-bold text-slate-500">Sub Total</span>
                                            <span className="font-black text-slate-800">₹{fmt(selectedQuote.basePremium + selectedQuote.addOnsCost - selectedQuote.discount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-slate-500">GST (18%)</span>
                                            <span className="font-black text-slate-800">₹{fmt(selectedQuote.gst)}</span>
                                        </div>
                                        <div className="flex justify-between text-xl pt-4 border-t border-slate-100">
                                            <span className="font-black text-slate-800 uppercase tracking-tight">Total Premium</span>
                                            <span className="font-black text-[#2076C7]">₹{fmt(selectedQuote.finalPremium)}</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 rounded-2xl p-4 mb-6 text-center">
                                        <h4 className="text-2xl font-black text-[#2076C7]">₹{selectedQuote.pricePerDay} / day</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">(For {getDuration()} Days)</p>
                                    </div>

                                    <button
                                        onClick={() => setShowTravelInsuranceForm(true)}
                                        className="w-full py-5 bg-[#2076C7] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(32,118,199,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mb-4"
                                    >
                                        Insure Now
                                    </button>
                                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Instant policy in 2 minutes</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleDownloadQuote(selectedQuote)}
                                            disabled={downloading === selectedQuote.id}
                                            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] transition-all disabled:opacity-60"
                                        >
                                            {downloading === selectedQuote.id ? (
                                                <IconLoader size={14} className="animate-spin" />
                                            ) : (
                                                <IconDownload size={14} />
                                            )}
                                            {downloading === selectedQuote.id ? 'Generating...' : 'Download Quote'}
                                        </button>
                                        <button
                                            onClick={() => handleShareWhatsApp(selectedQuote)}
                                            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] transition-all"
                                        >
                                            <IconActivity size={14} /> Share Plan
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Details View Footer Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-t border-slate-100 mt-12">
                            {[
                                { label: '100% Secure', desc: 'Your data is safe with us', icon: IconShieldCheck },
                                { label: 'No Hidden Charges', desc: 'What you see is what you pay', icon: IconActivity },
                                { label: 'Instant Policy', desc: 'Get policy in just 2 mins', icon: IconActivity },
                                { label: '24/7 Support', desc: "We're always here to help", icon: IconActivity },
                            ].map((b, i) => (
                                <div key={i} className="flex flex-col items-center text-center px-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#2076C7] mb-4">
                                        <b.icon size={24} />
                                    </div>
                                    <h5 className="text-sm font-black text-slate-800 mb-1">{b.label}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : view === 'compare' ? (
                    <motion.div
                        key="compare"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Header Section */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <button
                                onClick={() => setView('results')}
                                className="flex items-center gap-2 text-[#2076C7] hover:opacity-80 font-black text-sm uppercase tracking-widest transition-all bg-blue-50 px-6 py-3 rounded-full border-2 border-blue-100 shadow-sm"
                            >
                                <IconChevronLeft size={20} strokeWidth={3} /> Back to Results
                            </button>
                            <div className="text-center md:text-right">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-800 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Quotation Comparison</h2>
                                <p className="text-slate-500 font-medium font-sans">Compare plans side by side to make the best choice</p>
                            </div>
                        </div>

                        {/* Comparison Table Grid */}
                        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-slate-100 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                                {/* Desktop Features Label Column */}
                                <div className="hidden md:flex flex-col space-y-6 pt-[180px]">
                                    <div className="h-16 flex items-center border-b border-slate-100">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Insurer & Rating</span>
                                    </div>
                                    <div className="h-16 flex items-center border-b border-slate-100">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Claim Settlement Ratio</span>
                                    </div>
                                    <div className="h-16 flex items-center border-b border-slate-100">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Network Hospitals</span>
                                    </div>
                                    <div className="h-16 flex items-center border-b border-slate-100">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Daily Premium</span>
                                    </div>
                                    <div className="h-20 flex items-center border-b border-slate-100">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-black">Total Premium</span>
                                    </div>
                                    
                                    {/* Coverages */}
                                    <div className="space-y-4 pt-4">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Benefits</span>
                                        <div className="h-10 flex items-center"><span className="text-xs font-extrabold text-slate-600">Cashless Global Treatment</span></div>
                                        <div className="h-10 flex items-center"><span className="text-xs font-extrabold text-slate-600">COVID-19 Hospitalization Cover</span></div>
                                        <div className="h-10 flex items-center"><span className="text-xs font-extrabold text-slate-600">No Medical Check-up</span></div>
                                        <div className="h-10 flex items-center"><span className="text-xs font-extrabold text-slate-600">Loss of Passport Cover</span></div>
                                        <div className="h-10 flex items-center"><span className="text-xs font-extrabold text-slate-600">Trip Delay / Interruption</span></div>
                                    </div>
                                </div>

                                {/* Columns for compared plans */}
                                {quotations.filter(q => compareList.includes(q.id)).map((quote) => {
                                    const insurerColor = INSURERS.find(i => i.name === quote.insurer)?.color;
                                    return (
                                        <div key={quote.id} className="flex flex-col space-y-6 border border-slate-100 rounded-3xl p-6 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:border-[#1CADA3]/30 transition-all duration-500 relative">
                                            {quote.tag && (
                                                <div className={`absolute top-0 right-6 px-4 py-1.5 rounded-b-xl text-[8px] font-black uppercase tracking-widest text-white shadow-md ${quote.tag === 'Best Value' ? 'bg-orange-500' : quote.tag === 'Lowest Price' ? 'bg-emerald-500' : 'bg-[#2076C7]'}`}>
                                                    {quote.tag}
                                                </div>
                                            )}

                                            {/* Insurer Header Card */}
                                            <div className="h-[156px] flex flex-col items-center justify-center text-center pb-4 border-b border-slate-100">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${insurerColor} text-white flex items-center justify-center font-black text-xl shadow-lg mb-3`}>
                                                    {quote.logo}
                                                </div>
                                                <h4 className="text-base font-black text-slate-800">{quote.insurer}</h4>
                                                <div className="flex items-center gap-1 text-orange-400 mt-1">
                                                    <IconStar size={12} fill="currentColor" />
                                                    <span className="text-xs font-black text-slate-700">{quote.rating}</span>
                                                </div>
                                            </div>

                                            {/* Insurer Rating (Mobile only, or extra details) */}
                                            <div className="h-16 flex flex-col justify-center items-center border-b border-slate-100 text-center">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</span>
                                                <div className="flex items-center gap-1 text-orange-400 justify-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <IconStar key={i} size={14} fill={i < Math.floor(quote.rating) ? 'currentColor' : 'none'} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Claim Ratio */}
                                            <div className="h-16 flex flex-col justify-center items-center border-b border-slate-100 text-center">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Claim Settlement Ratio</span>
                                                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 font-black text-xs rounded-xl border border-emerald-100 shadow-sm">
                                                    {quote.csr}
                                                </span>
                                            </div>

                                            {/* Network Hospitals */}
                                            <div className="h-16 flex flex-col justify-center items-center border-b border-slate-100 text-center">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Hospitals</span>
                                                <span className="font-black text-slate-700 text-sm">{quote.hospitals}</span>
                                            </div>

                                            {/* Daily Price */}
                                            <div className="h-16 flex flex-col justify-center items-center border-b border-slate-100 text-center">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Daily Price</span>
                                                <span className="font-black text-[#2076C7] text-sm">₹{quote.pricePerDay} <span className="text-[10px] text-slate-400">/ day</span></span>
                                            </div>

                                            {/* Total Premium */}
                                            <div className="h-20 flex flex-col justify-center items-center border-b border-slate-100 text-center bg-blue-50/30 rounded-2xl p-2">
                                                <span className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Premium</span>
                                                <span className="font-black text-lg md:text-xl text-[#2076C7]">₹{fmt(quote.finalPremium)}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">(Inc. 18% GST)</span>
                                            </div>

                                            {/* Coverage checkmarks */}
                                            <div className="space-y-4 pt-4 text-center">
                                                <span className="md:hidden text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Coverage Details</span>
                                                
                                                {/* Cashless Global Treatment */}
                                                <div className="h-10 flex flex-col md:flex-row items-center justify-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-500">Cashless Global Treatment:</span>
                                                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                                                        <IconCheck size={14} strokeWidth={4} />
                                                    </div>
                                                </div>

                                                {/* COVID-19 Hospitalization Cover */}
                                                <div className="h-10 flex flex-col md:flex-row items-center justify-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-500">COVID-19 Cover:</span>
                                                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                                                        <IconCheck size={14} strokeWidth={4} />
                                                    </div>
                                                </div>

                                                {/* No Medical Check-up */}
                                                <div className="h-10 flex flex-col md:flex-row items-center justify-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-500">No Medical Check-up:</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-sm ${quote.benefits.includes('No Medical Check-up up to 70 years') ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                        {quote.benefits.includes('No Medical Check-up up to 70 years') ? <IconCheck size={14} strokeWidth={4} /> : <span className="text-[10px] font-bold">-</span>}
                                                    </div>
                                                </div>

                                                {/* Loss of Passport Cover */}
                                                <div className="h-10 flex flex-col md:flex-row items-center justify-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-500">Loss of Passport Cover:</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-sm ${quote.benefits.some(b => b.toLowerCase().includes('passport')) ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                        {quote.benefits.some(b => b.toLowerCase().includes('passport')) ? <IconCheck size={14} strokeWidth={4} /> : <span className="text-[10px] font-bold">-</span>}
                                                    </div>
                                                </div>

                                                {/* Trip Delay */}
                                                <div className="h-10 flex flex-col md:flex-row items-center justify-center gap-2">
                                                    <span className="md:hidden text-xs font-bold text-slate-500">Trip Delay / Interruption:</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-sm ${quote.benefits.some(b => b.toLowerCase().includes('delay') || b.toLowerCase().includes('interruption')) ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                        {quote.benefits.some(b => b.toLowerCase().includes('delay') || b.toLowerCase().includes('interruption')) ? <IconCheck size={14} strokeWidth={4} /> : <span className="text-[10px] font-bold">-</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Purchase Footer */}
                                            <div className="pt-6 border-t border-slate-100 space-y-3">
                                                <button
                                                    onClick={() => setShowTravelInsuranceForm(true)}
                                                    className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    Insure Now <IconShoppingCart size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedQuote(quote);
                                                        setView('details');
                                                    }}
                                                    className="w-full text-center text-xs font-black text-[#2076C7] uppercase tracking-widest border border-[#2076C7]/30 py-3 rounded-2xl hover:bg-blue-50/50 transition-all duration-300"
                                                >
                                                    Full Details
                                                </button>
                                                <button
                                                    onClick={() => toggleCompare(quote.id)}
                                                    className="w-full text-center text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline pt-2"
                                                >
                                                    Remove from Compare
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Results Toolbar */}
                        <div className="bg-white rounded-[2rem] p-4 md:p-6 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <button
                                onClick={() => setView('form')}
                                className="flex items-center gap-2 text-[#2076C7] hover:opacity-80 font-black text-sm uppercase tracking-widest transition-all bg-blue-50 px-6 py-3 rounded-full border-2 border-blue-100 shadow-sm"
                            >
                                <IconChevronLeft size={20} strokeWidth={3} /> Modify Search
                            </button>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                                    <IconSortAscending size={16} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                                    <select
                                        className="bg-transparent text-xs font-black text-slate-700 outline-none cursor-pointer"
                                        onChange={(e) => handleSort(e.target.value as any)}
                                        value={sortBy}
                                    >
                                        <option value="price">Premium (Low to High)</option>
                                        <option value="ratio">Claim Ratio (High to Low)</option>
                                        <option value="rating">Rating (High to Low)</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => setIsComparing(!isComparing)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${isComparing ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
                                >
                                    {isComparing ? `Comparing ${compareList.length} Plans` : 'Compare Plans'}
                                </button>
                            </div>

                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                <IconShieldCheck size={14} strokeWidth={4} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Verified Quotes</span>
                            </div>
                        </div>

                        {/* Quotation Cards */}
                        <div className="space-y-6">
                            {quotations.map((quote) => (
                                <motion.div
                                    key={quote.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`relative bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${compareList.includes(quote.id) ? 'border-[#2076C7] shadow-2xl' : 'border-slate-50 hover:border-slate-100 shadow-xl'}`}
                                >
                                    {quote.tag && (
                                        <div className={`absolute top-0 right-12 px-6 py-1.5 rounded-b-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg ${quote.tag === 'Best Value' ? 'bg-orange-500' : quote.tag === 'Lowest Price' ? 'bg-emerald-500' : 'bg-[#2076C7]'}`}>
                                            {quote.tag}
                                        </div>
                                    )}
                                    <div className="p-4 md:p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                                            {/* Insurer Info */}
                                            <div className="flex flex-col items-center lg:items-start gap-4">
                                                <div className={`w-16 h-16 rounded-[1.5rem] bg-gradient-to-br ${INSURERS.find(i => i.name === quote.insurer)?.color} flex items-center justify-center text-white text-2xl font-black shadow-lg relative`}>
                                                    {quote.logo}
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm" title="Trusted Provider">
                                                        <IconCheck size={12} strokeWidth={4} />
                                                    </div>
                                                </div>
                                                <div className="text-center lg:text-left">
                                                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                                                        <h3 className="text-xl font-black text-slate-800">{quote.insurer}</h3>
                                                        <IconShieldCheck size={14} className="text-emerald-500" />
                                                    </div>
                                                    <div className="flex items-center gap-1 text-orange-400 mt-1 justify-center lg:justify-start">
                                                        {[...Array(5)].map((_, i) => (
                                                            <IconStar key={i} size={14} fill={i < Math.floor(quote.rating) ? 'currentColor' : 'none'} />
                                                        ))}
                                                        <span className="text-xs font-black text-slate-400 ml-1">{quote.rating}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Stats */}
                                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3 border-x border-slate-50 px-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Claim Ratio</p>
                                                    <p className="text-lg font-black text-emerald-600">{quote.csr}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Network Hospitals</p>
                                                    <p className="text-lg font-black text-[#2076C7]">{quote.hospitals}</p>
                                                </div>
                                            </div>

                                            {/* Coverage Benefits */}
                                            <div className="space-y-1.5">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Key Coverage</p>
                                                {quote.benefits.slice(0, 4).map((benefit, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                        <IconCheck size={14} className="text-emerald-500" strokeWidth={4} />
                                                        {benefit}
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        setSelectedQuote(quote);
                                                        setView('details');
                                                    }}
                                                    className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest hover:underline"
                                                >
                                                    + {quote.benefits.length - 4} More Benefits
                                                </button>
                                            </div>
                                            
                                            {/* Pricing & CTA */}
                                            <div className="bg-slate-50/50 rounded-[1.5rem] p-4 text-center lg:text-right">
                                                <div className="mb-2">
                                                    <div className="flex items-center justify-center lg:justify-end gap-2 mb-1">
                                                        <span className="text-xs font-bold text-slate-400 line-through">₹{fmt(quote.finalPremium + quote.discount)}</span>
                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-md" title="10% web discount applied on base premium (online only)">Web Discount 10%</span>
                                                    </div>
                                                    <h4 className="text-3xl font-black text-[#2076C7]">₹{fmt(quote.finalPremium)}</h4>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Premium</p>
                                                    <p className="text-[9px] text-slate-500 mt-1">* 10% discount applied for online purchase only.</p>
                                                </div>
                                                <div className="space-y-3">
                                                    <button
                                                        onClick={() => setShowTravelInsuranceForm(true)}
                                                        className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        Insure Now <IconShoppingCart size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedQuote(quote);
                                                            setView('details');
                                                        }}
                                                        className="w-full text-center text-xs font-black text-[#2076C7] uppercase tracking-[0.1em] border-2 border-[#2076C7] py-3 rounded-2xl mt-2 transition-all duration-300 shadow-sm hover:shadow-md"
                                                    >
                                                        View Details
                                                    </button>
                                                    {isComparing && (
                                                        <button
                                                            onClick={() => toggleCompare(quote.id)}
                                                            className={`w-full py-2 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border-2 ${compareList.includes(quote.id) ? 'bg-white text-[#2076C7] border-[#2076C7]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                                                        >
                                                            {compareList.includes(quote.id) ? 'Selected' : 'Add to Compare'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Breakdown */}
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
                                                <div className="flex items-center gap-2">
                                                    <IconInfoCircle size={14} className="text-slate-300" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base: ₹{fmt(quote.basePremium)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add-ons: ₹{fmt(quote.addOnsCost)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GST (18%): ₹{fmt(quote.gst)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                                                <button
                                                    onClick={() => setPreviewQuote(quote)}
                                                    className="flex items-center gap-2 text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] hover:bg-blue-50 px-4 py-2 rounded-full transition-all border border-[#2076C7]/20"
                                                >
                                                    <IconInfoCircle size={14} />
                                                    View Quote
                                                </button>
                                                <button
                                                    onClick={() => handleDownloadQuote(quote)}
                                                    disabled={downloading === quote.id}
                                                    className="flex items-center gap-2 text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em] hover:bg-teal-50 px-4 py-2 rounded-full transition-all disabled:opacity-60"
                                                >
                                                    {downloading === quote.id ? (
                                                        <IconLoader size={14} className="animate-spin" />
                                                    ) : (
                                                        <IconDownload size={14} />
                                                    )}
                                                    {downloading === quote.id ? 'Generating...' : 'Download Quote'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quote Preview Modal */}
            <AnimatePresence>
                {previewQuote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setPreviewQuote(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Accent Bar */}
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 rounded-t-[2rem] text-white relative">
                                <button
                                    onClick={() => setPreviewQuote(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                                >
                                    ✕
                                </button>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-1">Official Commercial Quote</p>
                                <h3 className="text-xl font-black">Travel Insurance Quote</h3>
                                <p className="text-xs text-white/80 mt-1">
                                    {selectedCountry || destination.label} · {getDuration()} Days ({startDate} to {endDate})
                                </p>
                                <p className="text-[10px] text-white/60 mt-2">
                                    Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}  |  Valid for 30 days
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Insurer & Premium Row */}
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest mb-1">Insurer Details</p>
                                        <h4 className="text-xl font-black text-slate-800">{previewQuote.insurer}</h4>
                                        <p className="text-sm text-slate-500 mt-1">Claim Settlement Ratio: <span className="font-bold text-slate-700">{previewQuote.csr}</span></p>
                                        <p className="text-sm text-slate-500">Cashless Network: <span className="font-bold text-slate-700">{previewQuote.hospitals}</span></p>
                                    </div>
                                    <div className="bg-[#2076C7] rounded-2xl px-6 py-4 text-center text-white min-w-[140px]">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Total Premium</p>
                                        <p className="text-2xl font-black mt-1">₹{fmt(previewQuote.finalPremium)}</p>
                                        <p className="text-[10px] text-white/70">for {getDuration()} days</p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-slate-100" />

                                {/* Plan Title */}
                                <div>
                                    <p className="text-sm font-black text-slate-800 uppercase tracking-wider">Travel Insurance Quote</p>
                                    <p className="text-xs text-slate-400 italic mt-1">{selectedCountry || destination.label} · {getDuration()} Days ({startDate} to {endDate})</p>
                                </div>

                                {/* Key Benefits */}
                                <div>
                                    <div className="bg-slate-50 rounded-xl px-4 py-2 mb-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Inclusions & Benefits</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                        {previewQuote.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-[#1CADA3] flex items-center justify-center text-white shrink-0">
                                                    <IconCheck size={10} strokeWidth={4} />
                                                </div>
                                                <span className="text-xs text-slate-600">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pricing Breakdown */}
                                <div>
                                    <div className="bg-slate-50 rounded-xl px-4 py-2 mb-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Premium Breakdown</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Base Premium</span>
                                            <span className="font-bold text-slate-800">₹{fmt(previewQuote.basePremium)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Add-ons Selected</span>
                                            <span className="font-bold text-slate-800">₹{fmt(previewQuote.addOnsCost)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-emerald-600">
                                            <span>Discount Applied</span>
                                            <span className="font-bold">- ₹{fmt(previewQuote.discount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">GST (18%)</span>
                                            <span className="font-bold text-slate-800">₹{fmt(previewQuote.gst)}</span>
                                        </div>
                                        <div className="flex justify-between text-base pt-3 border-t border-slate-100">
                                            <span className="font-black text-slate-800">Total Premium</span>
                                            <span className="font-black text-[#2076C7]">₹{fmt(previewQuote.finalPremium)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Add-ons */}
                                {selectedAddons.length > 0 && (
                                    <div>
                                        <div className="bg-slate-50 rounded-xl px-4 py-2 mb-4">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Add-ons (Optional)</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                            {selectedAddons.map((addon, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <span className="text-[#2076C7] font-bold">+</span>
                                                    <span className="text-xs text-slate-600">{addon}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Disclaimer */}
                                <div className="border-t border-slate-100 pt-4">
                                    <p className="text-[10px] text-slate-400 italic leading-relaxed">
                                        Disclaimer: This document is a quotation only and does not imply binding insurance cover. The premium and terms are subject to final underwriting approval by the respective insurer.
                                    </p>
                                    <div className="mt-3">
                                        <p className="text-xs font-black text-slate-700">Infinity Arthvishva Insurance Broker Pvt. Ltd.</p>
                                        <p className="text-[10px] text-slate-400">IRDA Reg. No. CB-### | www.infinityarthvishva.com</p>
                                    </div>
                                </div>

                                {/* Modal Action Buttons */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        onClick={() => {
                                            handleDownloadQuote(previewQuote);
                                        }}
                                        disabled={downloading === previewQuote.id}
                                        className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60"
                                    >
                                        {downloading === previewQuote.id ? (
                                            <IconLoader size={14} className="animate-spin" />
                                        ) : (
                                            <IconDownload size={14} />
                                        )}
                                        {downloading === previewQuote.id ? 'Generating...' : 'Download PDF'}
                                    </button>
                                    <button
                                        onClick={() => setPreviewQuote(null)}
                                        className="flex-1 py-3 border-2 border-slate-100 text-slate-500 rounded-xl font-black uppercase tracking-widest text-xs hover:border-slate-200 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Comparison Overlay */}
            <AnimatePresence>
                {compareList.length > 0 && view !== 'compare' && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
                    >
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-6 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-8">
                            <div className="flex items-center gap-4">
                                {compareList.map(id => (
                                    <div key={id} className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white font-black backdrop-blur-sm shadow-inner">
                                        {quotations.find(q => q.id === id)?.logo}
                                    </div>
                                ))}
                                {compareList.length < 3 && (
                                    <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center text-white/30">
                                        +
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setCompareList([])}
                                    className="text-white/80 hover:text-white font-black text-xs uppercase tracking-widest transition-all"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => {
                                        if (compareList.length < 2) {
                                            toast.error('Please select at least 2 plans to compare');
                                            return;
                                        }
                                        setView('compare');
                                    }}
                                    className="px-4 py-3 sm:px-8 sm:py-4 bg-white text-[#2076C7] rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:shadow-xl transition-all shadow-lg active:scale-95"
                                >
                                    Compare Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}