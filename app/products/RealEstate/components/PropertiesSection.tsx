'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { properties as staticProperties, Property } from '../data/properties';
import {
    Filter, Search, ChevronRight, Share2, Calculator,
    Info, Target, ExternalLink, Download, TrendingUp,
    Clock, Shield, MapPin, X, Star, CheckCircle, Wallet, ChevronDown, ChevronUp, HelpCircle, Plus, Minus, IndianRupee, MinusSquare, PlusSquare, ChevronLeft
} from 'lucide-react';



interface PropertiesSectionProps {
    onPropertySelect?: (id: string) => void;
}

const PropertiesSection = ({ onPropertySelect }: PropertiesSectionProps) => {
    const [filters, setFilters] = useState({
        search: '',
        type: '',
        minPrice: '',
        maxPrice: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showAllFaqs, setShowAllFaqs] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ name: '', role: '', text: '', rating: 5 });

    // Filtered data based on static properties
    const liveProperties = useMemo(() => {
        return staticProperties.filter(p => {
            if (p.status !== 'live') return false;

            const searchLower = filters.search.toLowerCase();
            if (filters.search && !(
                p.title.toLowerCase().includes(searchLower) ||
                p.location.toLowerCase().includes(searchLower) ||
                p.type.toLowerCase().includes(searchLower)
            )) return false;
            
            if (filters.type && p.type !== filters.type) return false;
            if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
            if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;

            return true;
        });
    }, [filters]);

    const closedProperties = useMemo(() => {
        return staticProperties.filter(p => p.status === 'closed');
    }, []);

    // Calculator State
    const [calcData, setCalcData] = useState({
        amount: 800000,
        duration: 12,
        loanRatio: 90, // Default 90%
        yield: 8,
        appreciation: 11.0975
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleIncrement = (field: 'amount' | 'loanRatio' | 'duration') => {
        setCalcData(prev => {
            if (field === 'amount') return { ...prev, amount: Math.min(prev.amount + 50000, 50000000) };
            if (field === 'loanRatio') return { ...prev, loanRatio: Math.min(prev.loanRatio + 5, 95) };
            if (field === 'duration') return { ...prev, duration: Math.min(prev.duration + 1, 120) };
            return prev;
        });
    };

    const handleDecrement = (field: 'amount' | 'loanRatio' | 'duration') => {
        setCalcData(prev => {
            if (field === 'amount') return { ...prev, amount: Math.max(prev.amount - 50000, 100000) };
            if (field === 'loanRatio') return { ...prev, loanRatio: Math.max(prev.loanRatio - 5, 50) };
            if (field === 'duration') return { ...prev, duration: Math.max(prev.duration - 1, 3) };
            return prev;
        });
    };

    const faqs = [
        {
            q: "What types of real estate assets are available?",
            a: "Our portfolio specifically covers institutional-grade real estate including Luxury Villas, Grade-A Commercial Spaces, Residential Apartment Complexes, and Industrial Warehousing in prime Pune locations."
        },
        {
            q: "How do you verify the legal status of the properties?",
            a: "Every property undergoes a rigorous 3-tier legal audit. We only list RERA-approved projects and provide direct access to sanction letters, title deeds, and RERA registration documents on the property details page."
        },
        {
            q: "Can I schedule a physical site visit before investing?",
            a: "Absolutely. While we provide immersive 360° virtual tours for convenience, we encourage physical inspections. You can click 'Contact Support' on any listing to schedule a guided site visit with our Pune advisory team."
        },
        {
            q: "Who handles the maintenance and tenancy of the properties?",
            a: "Infinity Arthvishwa partners with professional facility management firms to handle all aspects of property upkeep, tenant sourcing, and lease management, ensuring your real estate asset is well-maintained and productive."
        },
        {
            q: "What defines the 'Expected Holding Period' for each listing?",
            a: "The holding period is a strategic timeline (typically 3-5 years) calculated based on local area development, historical price trends in Pune, and projected market demand to maximize your capital appreciation."
        },
        {
            q: "How is fractional ownership different from REITs?",
            a: "Unlike REITs where you own shares in a company that owns properties, fractional ownership gives you direct legal co-ownership of a specific physical asset registered in your name via an LLP."
        },
        {
            q: "What are the exit options if I need liquidity earlier?",
            a: "While we recommend the full holding period, we provide secondary market support where you can list your fractional share for sale to other verified investors on our platform."
        },
        {
            q: "Are these properties RERA registered?",
            a: "Yes, we exclusively partner with RERA-registered developers and projects. All legal documentation, including RERA certificates, is available for verification before any investment."
        },
        {
            q: "Is there a management fee for the property?",
            a: "We charge a nominal asset management fee which is already factored into the 'Net Yield' displayed. This covers property taxes, maintenance, insurance, and professional tenancy management."
        },
        {
            q: "Can NRIs invest in fractional real estate?",
            a: "Yes, NRIs can invest in commercial and residential fractional real estate in India through NRO/NRE accounts, following standard FEMA regulations which our legal team helps facilitate."
        }
    ];

    // Calculate graph data for investment projection
    const graphData = useMemo(() => {
        const data = [];
        const principal = calcData.amount;
        const monthlyYield = (calcData.yield / 100) / 12;
        const appreciationRate = calcData.appreciation / 100;

        // Duration in months
        const totalMonths = calcData.duration;
        const step = totalMonths <= 12 ? 1 : totalMonths <= 24 ? 3 : 12; // Monthly, Quarterly or Yearly steps

        for (let m = 0; m <= totalMonths; m += step) {
            const timeInYears = m / 12;
            const totalValue = principal * Math.pow(1 + appreciationRate, timeInYears);
            const appreciation = totalValue - principal;
            const cumulativeRental = principal * (monthlyYield * m);

            let label = '';
            if (m === 0) label = 'Start';
            else if (totalMonths <= 24) label = `${m}M`;
            else label = `Yr ${Math.floor(m / 12)}`;

            data.push({
                year: label,
                Principal: Math.round(principal),
                Appreciation: Math.round(appreciation),
                'Rental Income': Math.round(cumulativeRental),
                Total: Math.round(totalValue + cumulativeRental)
            });

            // Ensure we hit the final month
            if (m < totalMonths && m + step > totalMonths) {
                const finalY = totalMonths / 12;
                const finalVal = principal * Math.pow(1 + appreciationRate, finalY);
                data.push({
                    year: `${totalMonths}M`,
                    Principal: Math.round(principal),
                    Appreciation: Math.round(finalVal - principal),
                    'Rental Income': Math.round(principal * (monthlyYield * totalMonths)),
                    Total: Math.round(finalVal + (principal * (monthlyYield * totalMonths)))
                });
            }
        }
        return data;
    }, [calcData]);

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const clearFilters = () => {
        setFilters({ search: '', type: '', minPrice: '', maxPrice: '' });
    };


    return (
        <div id="properties" className="animate-fade-in">
            <div className="py-8 md:py-12 mb-6 md:mb-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Real Estate Investments
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto relative z-10">
                        Tangible property investments for wealth creation. Discover our curated collection of premium properties in Pune.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Section: Live Opportunities */}
                <div id="live" className="mb-12 scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                        <h2 className="text-4xl font-extrabold font-sans text-blue-600 text-brand-gradient">Live Projects</h2>

                        <div className="flex gap-4 w-full md:w-auto max-w-xl justify-end">
                            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 flex items-center px-4 flex-1 md:w-80 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="bg-transparent border-none text-slate-700 py-3 px-3 w-full outline-none placeholder:text-slate-400 font-medium"
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border ${showFilters ? 'btn-brand border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                                <Filter size={20} /> Filters
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
                            <div>
                                <label className="block mb-2 text-sm font-bold text-slate-700">Property Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none">
                                    <option value="">All Types</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Mixed-Use">Mixed-Use</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Cottage">Cottage</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-slate-700">Min Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="No Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-slate-700">Max Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="No Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex items-end">
                                <button onClick={clearFilters} className="text-pink-500 font-bold flex items-center gap-2 hover:text-pink-600 transition-colors">
                                    <X size={18} /> Clear All
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {liveProperties.map(property => (
                            <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100 group">
                                <div className="relative">
                                    <img src={property.image} alt={property.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider text-teal-600 border border-teal-100">
                                        {property.type}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-bold mb-1 line-clamp-1 text-brand-gradient">{property.title}</h3>
                                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                                            <MapPin size={12} />
                                            <span className="line-clamp-1">{property.location}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Total Area</p>
                                            <p className="text-sm font-semibold text-slate-800">{property.area} sq.ft</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">RERA ID</p>
                                            <p className="text-xs font-semibold text-slate-800 truncate" title={property.rera_reg_no}>{property.rera_reg_no}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Start From</p>
                                            <p className="text-sm font-bold text-teal-600">
                                                ₹{(property.min_contribution / 100000).toLocaleString('en-IN')} Lakhs
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Yield</p>
                                            <p className="text-sm font-bold text-blue-600">{property.yield_percentage}%</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center border-t border-slate-100 pt-4 gap-2">
                                        <div className="flex flex-col">
                                            <p className="text-[10px] text-slate-400">Total Value</p>
                                            <span className="text-lg font-extrabold text-slate-800">
                                                ₹{property.price.toLocaleString('en-IN')}
                                                {property.price && (
                                                    <span className="text-black font-bold text-sm leading-none shrink-0 cursor-help pt-1" title="Star Marked — Potential for future value appreciation">*</span>
                                                )}
                                            </span>

                                        </div>
                                        <button
                                            onClick={() => onPropertySelect && onPropertySelect(String(property.id))}
                                            className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-5 py-2.5 text-xs rounded-xl shrink-0 font-semibold shadow-md hover:shadow-lg transition-all"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {liveProperties.length === 0 && (
                        <div className="p-16 text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <h3 className="text-2xl font-bold mb-2 text-brand-gradient">No active properties found</h3>
                            <p>We are currently curating new high-yield opportunities. Stay tuned!</p>
                        </div>
                    )}
                </div>


                {/* Section: How We Deliver Results */}
                <section className="py-12 md:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-slate-50 rounded-[3rem] mb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                How We Deliver Results
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                                Achieving your financial goals is our true achievement. We simplify the path to wealth through a structured and transparent investment process.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { icon: Search, title: 'Select Property', text: 'Browse our curated collection of high-yield properties.' },
                                { icon: Wallet, title: 'Invest Amount', text: 'Choose your share and invest fractions of the total value.' },
                                { icon: TrendingUp, title: 'Earn & Grow', text: 'Receive periodic rental income and capital appreciation.' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center group border border-slate-100">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-brand-gradient">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Closed Opportunities */}
                <div id="closed" className="mb-12 pt-10 border-t border-slate-200">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient font-sans  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Closed Opportunities</h2>

                    <div className="relative px-10 sm:px-14 lg:px-16">
                        {/* Left Arrow */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('closed-scroll');
                                if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
                            }}
                            className="absolute left-1 sm:left-2 lg:left-4 top-[55%] -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={() => {
                                const container = document.getElementById('closed-scroll');
                                if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
                            }}
                            className="absolute right-1 sm:right-2 lg:right-4 top-[55%] -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-105 transition-all duration-200"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            id="closed-scroll"
                            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {closedProperties.map(property => (
                                <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-slate-100 opacity-90 grayscale-[0.5] hover:grayscale-0 transition-all duration-500 min-w-[320px] max-w-[320px] shrink-0">
                                    <div className="relative">
                                        <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/90 backdrop-blur bg-opacity-90 rounded text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                                            SUCCESSFULLY CLOSED
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold mb-1 text-brand-gradient">{property.title}</h3>
                                        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
                                            <MapPin size={12} />
                                            <span>{property.location}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl mt-auto">
                                            <div>
                                                <p className="text-[10px] text-slate-400 mb-0.5">Returns Delivered</p>
                                                <p className="text-sm font-bold text-teal-600">{property.yield_percentage}% Yield</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 mb-0.5">Exit IRR</p>
                                                <p className="text-sm font-bold text-blue-600">{property.irr_percentage}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {closedProperties.length === 0 && (
                        <div className="p-16 text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <h3 className="text-2xl font-bold mb-2 text-brand-gradient">No historical records found</h3>
                            <p>Our track record of successful exits will be displayed here.</p>
                        </div>
                    )}
                </div>

                {/* Section: Feedback & Calculator */}
                <section id="calculator" className="py-8 md:py-12 bg-slate-50 relative overflow-hidden md:-mx-8 px-4 md:px-8 mb-8 md:mb-12 rounded-[2rem] md:rounded-[3rem]">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">

                            {/* Header */}
                            <div className="bg-white border-b border-slate-50 py-8 sm:py-10 px-4 sm:px-6 text-center">
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                        Investment Calculator
                                    </h2>
                                    <div className="w-24 h-1 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] mx-auto rounded-full mb-6 opacity-30" />
                                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                                        Calculate your potential returns and track your projected growth.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                                    {/* Left Column: Controls */}
                                    <div className="space-y-8 lg:pr-8 lg:border-r border-slate-100 flex flex-col justify-center">
                                        <div className="space-y-12">
                                            {/* Investment Amount */}
                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2">
                                                    <label className="block text-lg md:text-xl font-extrabold text-gray-700">Investment Amount (₹)</label>
                                                    <div className="flex items-center text-[#1CADA3] font-black text-xl sm:text-2xl md:text-3xl border border-slate-200 rounded-xl px-3 py-1.5 bg-white shadow-sm focus-within:border-[#2076C7] focus-within:ring-2 focus-within:ring-[#2076C7]/20 transition-all w-full sm:w-auto">
                                                        <span>₹</span>
                                                        <input 
                                                            type="text" 
                                                            value={calcData.amount.toLocaleString('en-IN')}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                                setCalcData({ ...calcData, amount: val ? parseInt(val) : 0 });
                                                            }}
                                                            className="bg-transparent outline-none text-right w-full sm:w-[140px] md:w-[180px] appearance-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button onClick={() => handleDecrement('amount')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Minus size={16} strokeWidth={3} />
                                                    </button>
                                                    <div className="flex-grow">
                                                        <input
                                                            type="range"
                                                            min="100000"
                                                            max="50000000"
                                                            step="50000"
                                                            value={calcData.amount}
                                                            onChange={(e) => setCalcData({ ...calcData, amount: parseInt(e.target.value) })}
                                                            className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#2076C7] hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                                            style={{
                                                                background: `linear-gradient(to right, #2076C7 ${Math.min(100, Math.max(0, ((calcData.amount - 100000) / (50000000 - 100000)) * 100))}%, #e2e8f0 ${Math.min(100, Math.max(0, ((calcData.amount - 100000) / (50000000 - 100000)) * 100))}%, #e2e8f0 100%)`
                                                            }}
                                                        />
                                                    </div>
                                                    <button onClick={() => handleIncrement('amount')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Plus size={16} strokeWidth={3} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-slate-400 px-12">
                                                    <span>₹1 Lakh</span>
                                                    <span>₹5 Cr</span>
                                                </div>
                                            </div>

                                            {/* Loan to LLP Ratio */}
                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2">
                                                    <label className="block text-lg md:text-xl font-extrabold text-gray-700">Loan to LLP Ratio (%)</label>
                                                    <div className="flex items-center text-[#1CADA3] font-black text-xl sm:text-2xl md:text-3xl border border-slate-200 rounded-xl px-3 py-1.5 bg-white shadow-sm focus-within:border-[#2076C7] focus-within:ring-2 focus-within:ring-[#2076C7]/20 transition-all w-full sm:w-auto">
                                                        <input 
                                                            type="text" 
                                                            value={calcData.loanRatio}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                                setCalcData({ ...calcData, loanRatio: val ? parseInt(val) : 0 });
                                                            }}
                                                            className="bg-transparent outline-none text-right w-full sm:w-[60px] md:w-[80px] appearance-none"
                                                        />
                                                        <span>%</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button onClick={() => handleDecrement('loanRatio')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Minus size={16} strokeWidth={3} />
                                                    </button>
                                                    <div className="flex-grow">
                                                        <input
                                                            type="range"
                                                            min="50"
                                                            max="95"
                                                            step="5"
                                                            value={calcData.loanRatio}
                                                            onChange={(e) => setCalcData({ ...calcData, loanRatio: parseInt(e.target.value) })}
                                                            className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#2076C7] hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                                            style={{
                                                                background: `linear-gradient(to right, #2076C7 ${Math.min(100, Math.max(0, ((calcData.loanRatio - 50) / (95 - 50)) * 100))}%, #e2e8f0 ${Math.min(100, Math.max(0, ((calcData.loanRatio - 50) / (95 - 50)) * 100))}%, #e2e8f0 100%)`
                                                            }}
                                                        />
                                                    </div>
                                                    <button onClick={() => handleIncrement('loanRatio')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Plus size={16} strokeWidth={3} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-slate-400 px-12">
                                                    <span>50%</span>
                                                    <span>95% Trend</span>
                                                </div>
                                            </div>

                                            {/* Duration */}
                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2">
                                                    <label className="block text-lg md:text-xl font-extrabold text-gray-700">Duration</label>
                                                    <div className="flex items-center text-[#1CADA3] font-black text-xl sm:text-2xl md:text-3xl border border-slate-200 rounded-xl px-3 py-1.5 bg-white shadow-sm focus-within:border-[#2076C7] focus-within:ring-2 focus-within:ring-[#2076C7]/20 transition-all w-full sm:w-auto">
                                                        <input 
                                                            type="text" 
                                                            value={calcData.duration}
                                                            onChange={(e) => {
                                                                const val = e.target.value.replace(/[^0-9]/g, '');
                                                                setCalcData({ ...calcData, duration: val ? parseInt(val) : 0 });
                                                            }}
                                                            className="bg-transparent outline-none text-right w-full sm:w-[60px] md:w-[80px] appearance-none"
                                                        />
                                                        <span className="ml-2 text-lg sm:text-xl md:text-2xl mt-1">Months</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button onClick={() => handleDecrement('duration')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Minus size={16} strokeWidth={3} />
                                                    </button>
                                                    <div className="flex-grow">
                                                        <input
                                                            type="range"
                                                            min="3"
                                                            max="120"
                                                            step="1"
                                                            value={calcData.duration}
                                                            onChange={(e) => setCalcData({ ...calcData, duration: parseInt(e.target.value) })}
                                                            className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#2076C7] hover:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                                                            style={{
                                                                background: `linear-gradient(to right, #2076C7 ${Math.min(100, Math.max(0, ((calcData.duration - 3) / (120 - 3)) * 100))}%, #e2e8f0 ${Math.min(100, Math.max(0, ((calcData.duration - 3) / (120 - 3)) * 100))}%, #e2e8f0 100%)`
                                                            }}
                                                        />
                                                    </div>
                                                    <button onClick={() => handleIncrement('duration')} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#2076C7] transition-colors shrink-0 shadow-sm">
                                                        <Plus size={16} strokeWidth={3} />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-slate-400 px-12">
                                                    <span>3 Months</span>
                                                    <span>10 Years</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Visuals & Summary */}
                                    <div className="flex flex-col">
                                        {/* Summary Box */}
                                        <div className="rounded-[1.5rem] sm:rounded-[2.5rem] border p-5 sm:p-8 flex-grow flex flex-col bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] border-[#bae6fd] shadow-[0_10px_25px_-5px_rgba(32,118,199,0.1)]">
                                            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 border-l-4 border-[#2076C7] pl-4 sm:pl-5">
                                                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2076C7] tracking-tight">Projected Returns</h3>
                                            </div>
                                            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Total Cost</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-[#1e293b]">₹{calcData.amount.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Capital</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-[#1e293b]">₹{Math.round(calcData.amount * ((100 - calcData.loanRatio) / 100)).toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Loan ({calcData.loanRatio}%)</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-[#1e293b]">₹{Math.round(calcData.amount * (calcData.loanRatio / 100)).toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Interest</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-green-600">+₹{Math.round(calcData.amount * (calcData.loanRatio / 100) * 0.08 * (calcData.duration / 12)).toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Cap. Gain</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-[#1e293b]">₹{Math.round(calcData.amount * 0.110975).toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                                    <span className="text-sm sm:text-base font-bold text-slate-600">Tax</span>
                                                    <span className="text-base sm:text-lg font-extrabold text-red-500">-₹{Math.round(calcData.amount * 0.110975 * (calcData.duration > 24 ? 0.20 : 0.312)).toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 bg-yellow-100/80 rounded-xl px-4 mt-2">
                                                    <span className="text-sm sm:text-base font-black text-slate-800">Post Tax XIRR</span>
                                                    <span className="text-lg sm:text-xl md:text-2xl font-black text-[#1e3a8a]">{calcData.duration > 24 ? '16.5%' : '14.84%'}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-4 mt-4 border-t-2 border-blue-200">
                                                    <span className="text-base sm:text-lg font-black text-slate-700 uppercase">Total In-Hand</span>
                                                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#2076C7]">₹{Math.round(calcData.amount + (calcData.amount * (calcData.loanRatio / 100) * 0.08 * (calcData.duration / 12)) + (calcData.amount * 0.110975 * (1 - (calcData.duration > 24 ? 0.20 : 0.312)))).toLocaleString('en-IN')}</span>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                    {/* Legal & Tax Explanation Section */}
                    <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] hover:border-blue-300 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-50/50 rounded-2xl">
                                    <Shield size={28} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Legal Structure (LLP)</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                                You directly become a <b className="text-blue-600">legal partner</b> in the property. Your name is registered on the verified documents,
                                giving you legal co-ownership of the asset just like owning a share of the property itself.
                            </p>
                        </div>

                        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] hover:border-teal-300 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-teal-50/50 rounded-2xl">
                                    <TrendingUp size={28} className="text-teal-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Buy-Back Agreement</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                                We guarantee your exit. At the end of the term, your share is <b className="text-teal-600">bought back at a higher price</b>
                                (Principal + Appreciation), ensuring your investment returns are safe and timely.
                            </p>
                        </div>

                        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] hover:border-indigo-300 hover:-translate-y-1 cursor-pointer transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-indigo-50/50 rounded-2xl">
                                    <IndianRupee size={28} className="text-indigo-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Tax Knowledge</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                                Tax is simple. <b className="text-indigo-600">10% TDS</b> is deducted on monthly interest. You get <b>90% directly in your bank</b>.
                                Capital gains tax applies only on the final profit when you exit.
                            </p>
                        </div>
                    </div>

                {/* Disclaimer */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="p-6 bg-yellow-50/80 border border-yellow-200/60 rounded-2xl text-sm md:text-base font-medium leading-relaxed text-slate-600 shadow-sm flex items-start gap-4">
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0 mt-0.5">
                            <Info size={20} strokeWidth={2.5} />
                        </div>
                        <p>
                            <span className="font-bold text-yellow-800">Disclaimer:</span> The projected returns shown in the calculator are indicative. Actual returns are subject to market changes, property appreciation over the chosen term, and the prevailing tax rates at the time of your exit via the Buy-Back Agreement.
                        </p>
                    </div>
                </div>

                {/* FAQ Section */}
                <section id="faq" className="py-6 mt-10 border-t border-slate-200 pt-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                    Frequently Asked Questions
                                </h2>

                                <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-2">
                                    Got questions about our real estate investments? We&apos;ve got answers for you.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {faqs.slice(0, showAllFaqs ? faqs.length : 5).map((faq, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"
                                    >
                                        <button
                                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                            className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 bg-slate-50/50 hover:bg-blue-50/50 transition-colors focus:outline-none group"
                                        >
                                            <span className="font-extrabold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors leading-snug">
                                                {faq.q}
                                            </span>
                                            <div className={`p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180 bg-[#2076C7] text-white border-[#2076C7]' : ''}`}>
                                                {activeFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {activeFaq === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 py-5 bg-white text-slate-500 text-base font-medium leading-relaxed border-t border-gray-100">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            {/* View More Button */}
                            <div className="mt-12 text-center">
                                <button
                                    onClick={() => setShowAllFaqs(!showAllFaqs)}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-black uppercase tracking-widest text-[10px] hover:bg-blue-100 transition-all shadow-sm active:scale-95"
                                >
                                    {showAllFaqs ? "View Less" : "View More FAQs"}
                                    <Plus size={16} strokeWidth={3} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} />
                                </button>
                            </div>
                    </div>
                </section>
            </div>

            {/* Feedback Form Modal */}
            {
                showFeedbackForm && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" onClick={() => setShowFeedbackForm(false)}>
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-fade-in" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowFeedbackForm(false)}
                                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-3xl font-extrabold mb-2 text-brand-gradient">Share Feedback</h3>
                            <p className="text-slate-500 mb-8">We value your input! Tell us about your investment experience.</p>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thank you for your valuable feedback! It will be listed after moderation.");
                                setShowFeedbackForm(false);
                                setNewFeedback({ name: '', role: '', text: '', rating: 5 });
                            }} className="space-y-6">
                                <div>
                                    <label className="block font-bold text-slate-800 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        value={newFeedback.name}
                                        onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-800 mb-2">Professional Role</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Software Engineer"
                                        value={newFeedback.role}
                                        onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-800 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={32}
                                                    fill={star <= newFeedback.rating ? "#F59E0B" : "none"}
                                                    color={star <= newFeedback.rating ? "#F59E0B" : "#cbd5e1"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-bold text-slate-800 mb-2">Your Review</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Share your thoughts..."
                                        value={newFeedback.text}
                                        onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-brand w-full py-4 rounded-xl text-base">
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default PropertiesSection;



