'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { properties as staticProperties, Property } from '../data/properties';
import {
    Filter, Search, ChevronRight, Share2, Calculator,
    Info, Target, ExternalLink, Download, PieChart, TrendingUp,
    DollarSign, Clock, Shield, MapPin, X, Star, CheckCircle, Wallet, ChevronDown, ChevronUp, HelpCircle, Plus, Minus, IndianRupee
} from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && payload[0].payload) {
        return (
            <div className="bg-white/95 border-none rounded-xl shadow-xl p-4 min-w-[220px]">
                <p className="text-slate-500 mb-3 font-extrabold text-sm">{label}</p>
                <div className="grid gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Contributed Amount</span>
                        <span className="font-bold text-slate-900">₹{payload[0].payload.Principal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Final Return</span>
                        <span className="font-extrabold text-teal-600">₹{payload[0].payload.Total.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

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
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ name: '', role: '', text: '', rating: 5 });

    // Filtered data based on static properties
    const liveProperties = useMemo(() => {
        return staticProperties.filter(p => {
            if (p.status !== 'live') return false;

            if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
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
            a: "Infinity Arthvishva partners with professional facility management firms to handle all aspects of property upkeep, tenant sourcing, and lease management, ensuring your real estate asset is well-maintained and productive."
        },
        {
            q: "What defines the 'Expected Holding Period' for each listing?",
            a: "The holding period is a strategic timeline (typically 3-5 years) calculated based on local area development, historical price trends in Pune, and projected market demand to maximize your capital appreciation."
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
            <div className="py-12 mb-8 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Real Estate Investments
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto relative z-10">
                        Tangible property investments for wealth creation. Discover our curated collection of premium properties in Pune.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8">
                {/* Section: Live Opportunities */}
                <div id="live" className="mb-12 scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                        <h2 className="text-4xl font-extrabold font-sans text-gray-700 text-brand-gradient">Live Projects</h2>

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                                            className="btn-brand px-5 py-2.5 text-xs rounded-xl shrink-0"
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

                {/* Section: Closed Opportunities */}
                <div id="closed" className="mb-16 pt-16 border-t border-slate-200">
                    <h2 className="text-4xl font-extrabold mb-12 text-center text-brand-gradient font-sans  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Closed Opportunities</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {closedProperties.map(property => (
                            <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-slate-100 opacity-90 grayscale-[0.5] hover:grayscale-0 transition-all duration-500">
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

                    {closedProperties.length === 0 && (
                        <div className="p-16 text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <h3 className="text-2xl font-bold mb-2 text-brand-gradient">No historical records found</h3>
                            <p>Our track record of successful exits will be displayed here.</p>
                        </div>
                    )}
                </div>

                {/* Section: Feedback & Calculator */}
                <div className="mb-8 pt-8 border-t border-slate-200">
                    <h2 id="calculator" className="text-4xl font-extrabold mb-12 text-center text-brand-gradient scroll-mt-32 uppercase tracking-tight font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Investment Calculator
                    </h2>
                    <div className="pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Inputs Card */}
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <label style={{ fontWeight: '700', color: 'var(--text)' }}>Investment Amount (₹)</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.2rem' }}>₹{calcData.amount.toLocaleString('en-IN')}</span>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <button onClick={() => handleIncrement('amount')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronUp size={16} color="var(--primary)" />
                                                </button>
                                                <button onClick={() => handleDecrement('amount')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronDown size={16} color="var(--primary)" />
                                                </button>
                                            </div>

                                            <div style={{ position: 'relative' }}>

                                                <select
                                                    value={calcData.amount}
                                                    onChange={(e) => setCalcData({ ...calcData, amount: parseInt(e.target.value) })}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        opacity: 0,
                                                        cursor: 'pointer',
                                                        appearance: 'none'
                                                    }}
                                                >
                                                    <option value="100000">₹1 Lakh</option>
                                                    <option value="500000">₹5 Lakhs</option>
                                                    <option value="1000000">₹10 Lakhs</option>
                                                    <option value="2500000">₹25 Lakhs</option>
                                                    <option value="5000000">₹50 Lakhs</option>
                                                    <option value="10000000">₹1 Crore</option>
                                                    <option value="50000000">₹5 Crores</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="100000"
                                        max="50000000"
                                        step="50000"
                                        value={calcData.amount}
                                        onChange={(e) => setCalcData({ ...calcData, amount: parseInt(e.target.value) })}
                                        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                        <span>₹1Lakh</span>
                                        <span>₹5Cr</span>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <label style={{ fontWeight: '700', color: 'var(--text)' }}>Loan to LLP Ratio (%)</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                                            <span style={{ color: 'var(--secondary)', fontWeight: '800', fontSize: '1.2rem' }}>{calcData.loanRatio}%</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <button onClick={() => handleIncrement('loanRatio')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronUp size={16} color="var(--secondary)" />
                                                </button>
                                                <button onClick={() => handleDecrement('loanRatio')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronDown size={16} color="var(--secondary)" />
                                                </button>
                                            </div>
                                            <div style={{ position: 'relative' }}>

                                                <select
                                                    value={calcData.loanRatio}
                                                    onChange={(e) => setCalcData({ ...calcData, loanRatio: parseInt(e.target.value) })}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        opacity: 0,
                                                        cursor: 'pointer',
                                                        appearance: 'none'
                                                    }}
                                                >
                                                    <option value="50">50%</option>
                                                    <option value="60">60%</option>
                                                    <option value="70">70%</option>
                                                    <option value="80">80%</option>
                                                    <option value="90">90%</option>
                                                    <option value="95">95%</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="95"
                                        step="5"
                                        value={calcData.loanRatio}
                                        onChange={(e) => setCalcData({ ...calcData, loanRatio: parseInt(e.target.value) })}
                                        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--secondary)' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                        <span>50%</span>
                                        <span>95% Market Trend</span>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <label style={{ fontWeight: '700', color: 'var(--text)' }}>Duration (Months)</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                                            <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.2rem' }}>{calcData.duration} Months</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <button onClick={() => handleIncrement('duration')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronUp size={16} color="var(--primary)" />
                                                </button>
                                                <button onClick={() => handleDecrement('duration')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                                                    <ChevronDown size={16} color="var(--primary)" />
                                                </button>
                                            </div>
                                            <div style={{ position: 'relative' }}>

                                                <select
                                                    value={calcData.duration}
                                                    onChange={(e) => setCalcData({ ...calcData, duration: parseInt(e.target.value) })}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        opacity: 0,
                                                        cursor: 'pointer',
                                                        appearance: 'none'
                                                    }}
                                                >
                                                    <option value="12">12 Months</option>
                                                    <option value="24">24 Months</option>
                                                    <option value="36">36 Months</option>
                                                    <option value="48">48 Months</option>
                                                    <option value="60">60 Months</option>
                                                    <option value="120">120 Months</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="3"
                                        max="120"
                                        step="1"
                                        value={calcData.duration}
                                        onChange={(e) => setCalcData({ ...calcData, duration: parseInt(e.target.value) })}
                                        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                                        <span>3 Months</span>
                                        <span>10 Years</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Card */}
                        <div className="glass-panel rounded-2xl" style={{
                            padding: '2rem',
                            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                            color: '#1e293b',
                            border: '1px solid #bae6fd',
                            boxShadow: '0 10px 25px -5px rgba(32, 118, 199, 0.1)'
                        }}>
                            <h3 style={{
                                fontSize: '1.4rem',
                                fontWeight: '800',
                                marginBottom: '1.5rem',
                                borderBottom: '1px solid #bae6fd',
                                paddingBottom: '0.8rem',
                                color: '#2076C7' // Infinity Brand Blue
                            }}>
                                Calculated Project Returns
                            </h3>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {/* Breakdown Table Style */}
                                <div style={{ background: '#fefce8', padding: '1.5rem', borderRadius: '12px', color: '#1e293b' }}>
                                    <div style={{ display: 'grid', gap: '0.8rem', fontSize: '0.95rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eab30866', paddingBottom: '0.5rem' }}>
                                            <span>Total Cost of Acquisition</span>
                                            <span style={{ fontWeight: '700' }}>₹{calcData.amount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Capital ({(100 - calcData.loanRatio)}%)</span>
                                            <span>₹{Math.round(calcData.amount * ((100 - calcData.loanRatio) / 100)).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eab30866', paddingBottom: '0.5rem' }}>
                                            <span>Loan to LLP ({calcData.loanRatio}%)</span>
                                            <span>₹{Math.round(calcData.amount * (calcData.loanRatio / 100)).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: '600' }}>
                                            <span>Interest Payable @ 8% (Post Tax)</span>
                                            <span>+₹{Math.round(calcData.amount * (calcData.loanRatio / 100) * 0.08 * (calcData.duration / 12)).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Total Capital Gain</span>
                                            <span>₹{Math.round(calcData.amount * 0.110975).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b91c1c' }}>
                                            <span>{calcData.duration > 24 ? 'Capital Gains Tax @ 20%' : 'Capital Gains Tax @ 31.2%'}</span>
                                            <span>-₹{Math.round(calcData.amount * 0.110975 * (calcData.duration > 24 ? 0.20 : 0.312)).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fef08a', padding: '0.8rem', borderRadius: '8px', marginTop: '0.5rem' }}>
                                            <span style={{ fontWeight: '800' }}>Post Tax XIRR ({calcData.duration}m)</span>
                                            <span style={{ fontWeight: '900', color: '#1e3a8a' }}>{calcData.duration > 24 ? '16.5%' : '14.84%'}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', color: '#1e3a8a', marginTop: '0.5rem' }}>
                                            <span>TOTAL IN-HAND</span>
                                            <span>₹{Math.round(calcData.amount + (calcData.amount * (calcData.loanRatio / 100) * 0.08 * (calcData.duration / 12)) + (calcData.amount * 0.110975 * (1 - (calcData.duration > 24 ? 0.20 : 0.312)))).toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                                    <div className="card-hover" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '16px', textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Buy-Back Amount</p>
                                        <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>₹{Math.round(calcData.amount * 1.182975).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div className="card-hover" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '16px', textAlign: 'center' }}>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Security Factor</p>
                                        <p style={{ fontWeight: '800', fontSize: '1.1rem', color: '#4ade80' }}>RERA Registered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal & Tax Explanation Section */}
                    <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel card-hover" style={{ padding: '2.5rem', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: '12px' }}>
                                    <Shield size={24} color="var(--primary)" />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Legal Structure (LLP)</h3>
                            </div>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1rem' }}>
                                You directly become a <b>legal partner</b> in the property. Your name is registered on the verified documents,
                                giving you legal co-ownership of the asset just like owning a share of the property itself.
                            </p>
                        </div>

                        <div className="glass-panel card-hover" style={{ padding: '2.5rem', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--accent-glow)', borderRadius: '12px' }}>
                                    <TrendingUp size={24} color="var(--accent)" />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Buy-Back Agreement</h3>
                            </div>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1rem' }}>
                                We guarantee your exit. At the end of the term, your share is <b>bought back at a higher price</b>
                                (Principal + Appreciation), ensuring your investment returns are safe and timely.
                            </p>
                        </div>

                        <div className="glass-panel card-hover" style={{ padding: '2.5rem', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.75rem', background: 'var(--secondary-glow)', borderRadius: '12px' }}>
                                    <IndianRupee size={24} color="var(--secondary)" />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Tax Knowledge</h3>
                            </div>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '1rem' }}>
                                Tax is simple. <b>10% TDS</b> is deducted on monthly interest. You get <b>90% directly in your bank</b>.
                                Capital gains tax applies only on the final profit when you exit.
                            </p>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div style={{ padding: '2rem 0 1rem 0', borderTop: '1px solid var(--surface-border)', marginTop: '4rem' }}>
                        {/* <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>
                                Trusted by 500+ Investors
                            </span>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Investor Feedback & Ratings</h2>
                            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                                Real stories from real people who have started their fractional real estate journey with us.
                            </p>
                        </div> */}

                        {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', padding: '1rem' }}>
                            {[
                                { name: "Rahul Sharma", role: "IT Professional", rating: 5, text: "Fractional ownership made it possible for me to invest in a premium commercial property in Pune with just 10 lakhs.", image: "https://i.pravatar.cc/150?u=rahul" },
                                { name: "Priya Deshmukh", role: "Business Owner", rating: 5, text: "I was looking for steady rental income without the hassle of property management. This platform provided exactly what I needed.", image: "https://i.pravatar.cc/150?u=priya" },
                                { name: "Anand Kulkarni", role: "Retired Banker", rating: 4, text: "The diversity of properties available is impressive. I've diversified my portfolio across three different projects and the returns have been consistent.", image: "https://i.pravatar.cc/150?u=anand" }
                            ].map((testimonial, idx) => (
                                <div key={idx} className="glass-panel card-hover" style={{ padding: '3rem 2rem', borderRadius: '24px', background: 'white', border: '1px solid rgba(15, 23, 42, 0.05)' }}>
                                    <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.5rem' }}>
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < testimonial.rating ? "#F59E0B" : "none"} color={i < testimonial.rating ? "#F59E0B" : "var(--text-light)"} />)}
                                    </div>
                                    <p style={{ fontStyle: 'italic', color: 'var(--text)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.05rem' }}>"{testimonial.text}"</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img src={testimonial.image} alt={testimonial.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                        <div>
                                            <h4 style={{ fontWeight: '700', fontSize: '1.1rem' }}>{testimonial.name}</h4>
                                            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="py-20 border-t border-slate-200 mt-16">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-bold text-sm mb-6">
                                <HelpCircle size={16} /> FAQ Center
                            </div>
                            <h2 className="text-4xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Common Questions</h2>
                            <p className="text-lg text-slate-500">Everything you need to know about the Infinity Arthvishwa platform.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { q: "Is my investment safe?", a: "Yes, your investment is backed by physical real estate assets. The property is registered under an LLP where you become a designated partner." },
                                { q: "What is the minimum investment?", a: "The minimum ticket size is ₹10 Lakhs, allowing you to own a fraction of premium commercial or residential real estate." },
                                { q: "Can I exit before the tenure ends?", a: "Yes, we provide a resale platform where you can list your share for sale. Additionally, we have scheduled buy-back options." },
                                { q: "How is rental income distributed?", a: "Rental income is deposited directly into your registered bank account on a monthly basis, after deducting TDS." }
                            ].map((faq, index) => (
                                <div key={index} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeFaq === index ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        className="w-full p-6 flex justify-between items-center text-left"
                                    >
                                        <span className={`text-xl font-bold ${activeFaq === index ? 'text-blue-600' : 'text-slate-800'}`}>
                                            {faq.q}
                                        </span>
                                        {activeFaq === index ? <Minus size={24} className="text-blue-600 shrink-0" /> : <Plus size={24} className="text-slate-400 shrink-0" />}
                                    </button>
                                    <div className={`px-6 text-slate-600 leading-relaxed text-lg transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {faq.a}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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



