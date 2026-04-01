'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { properties as staticProperties, Property } from '../data/properties';
import { useModal } from "../../../context/ModalContext";
import { useWishlist } from "@/app/context/WishlistContext";
import toast from 'react-hot-toast';
import {
    Filter, Search, ShoppingCart, ChevronRight, Share2, Calculator,
    Info, Target, ExternalLink, Download, TrendingUp,
    Clock, Shield, MapPin, X, Star, CheckCircle, Wallet, ChevronDown, ChevronUp, HelpCircle, Plus, Minus, IndianRupee, MinusSquare, PlusSquare, ChevronLeft, Layout, Zap, Bookmark
} from 'lucide-react';



interface PropertiesSectionProps {
    onPropertySelect?: (id: string) => void;
    showOnlyLive?: boolean;
}
const PropertiesSection = ({ onPropertySelect, showOnlyLive = false }: PropertiesSectionProps) => {
    const { openApplyNow } = useModal();
    const { toggleWishlist, isInWishlist } = useWishlist();
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


    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


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


    const fractionalBenefits = [
        {
            title: "High Rental Yields",
            description: "Earn stable passive income with institutional-grade commercial and residential assets.",
            icon: TrendingUp,
            color: "blue"
        },
        {
            title: "Capital Appreciation",
            description: "Benefit from the rising property values in India's top growth corridors.",
            icon: Zap,
            color: "teal"
        },
        {
            title: "Low Entry Barrier",
            description: "Access premium real estate with investments starting as low as ₹1 Lakh.",
            icon: Wallet,
            color: "indigo"
        },
        {
            title: "Portfolio Diversification",
            description: "Reduce risk by spreading your investment across multiple premium properties.",
            icon: Layout,
            color: "purple"
        },
        {
            title: "Professional Management",
            description: "Hassle-free ownership with end-to-end property and tenant management.",
            icon: Shield,
            color: "emerald"
        },
        {
            title: "RERA Registered",
            description: "Every project undergoes a 3-tier legal audit and is RERA-compliant.",
            icon: CheckCircle,
            color: "cyan"
        }
    ];

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleToggleWishlist = (property: Property) => {
        toggleWishlist({
            id: property.id,
            category: 'real-estate',
            name: property.title,
            logo: property.image,
            addedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            keyMetrics: {
                price: property.price,
                location: property.location,
                expectedAppreciation: property.irr_percentage,
                rentalYield: property.yield_percentage,
                risk: 'Moderate',
                developer: 'Infinity Arth',
            }
        });
        if (!isInWishlist(property.id)) {
            toast.success("Added to saved properties");
        }
    };

    const clearFilters = () => {
        setFilters({ search: '', type: '', minPrice: '', maxPrice: '' });
    };

    return (
        <div id="properties" className="animate-fade-in font-sans">
            {!showOnlyLive && (
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
            )}

            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Section: Live Opportunities */}
                <div id="live" className="mb-12 scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                        <h2 className="text-4xl md:text-4xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Live Projects</h2>

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
                                        {property.type.split(' ')[0]}
                                    </div>
                                    {showOnlyLive && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleWishlist(property);
                                            }}
                                            className={`absolute top-4 right-4 p-1.5 rounded-lg backdrop-blur-md transition-all duration-300 shadow-sm border ${
                                                isInWishlist(property.id)
                                                ? 'bg-[#2076C7] text-white border-[#2076C7] scale-110'
                                                : 'bg-white/90 text-slate-400 border-slate-200 hover:text-[#2076C7] hover:border-[#2076C7] hover:bg-white'
                                            }`}
                                        >
                                            <Bookmark size={16} fill={isInWishlist(property.id) ? "currentColor" : "none"} strokeWidth={2} />
                                        </button>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-lg font-black mb-1 line-clamp-1 text-slate-900 uppercase tracking-tight">{property.title}</h3>
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

                                    <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-4">
                                        <div className="flex justify-between items-center gap-2">
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
                                                className="border-2 border-[#2076C7] text-[#2076C7] px-4 py-2 text-xs rounded-xl shrink-0 font-bold hover:bg-blue-50 transition-all"
                                            >
                                                Details
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => openApplyNow(property.title)}
                                            className="w-full py-3 text-xs font-black rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md hover:shadow-lg transition-all"
                                        >
                                            Apply Now
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


{!showOnlyLive && (
                    <>
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

                        {/* Dynamic Count Badge */}
                        {closedProperties.length > 0 && (
                            <div className="mt-8 flex justify-end pr-2">
                                <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-[0_10px_30px_-10px_rgba(32,118,199,0.1)] flex items-center gap-4 animate-fade-in group hover:border-blue-300 transition-all duration-300">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] leading-none mb-1 group-hover:text-blue-500 transition-colors">Success Rate</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-slate-800 leading-none">
                                                {String(closedProperties.length).padStart(2, '0')}
                                            </span>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assets Closed</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2076C7] shadow-inner">
                                        <CheckCircle size={22} strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {closedProperties.length === 0 && (
                        <div className="p-16 text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <h3 className="text-2xl font-bold mb-2 text-brand-gradient">No historical records found</h3>
                            <p>Our track record of successful exits will be displayed here.</p>
                        </div>
                    )}
                </div>

                {/* Section: Fractional Real Estate Benefits Carousel */}
                <div className="mb-20 pt-12 border-t border-slate-200">
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Fractional Real Estate Benefits
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">
            Experience the advantages of modern property investment simplified for everyone.
        </p>
    </div>

    {/* Scroll Container */}
    <div className="px-6 sm:px-10 lg:px-8">
        <div
            className="flex gap-8 overflow-x-auto scroll-smooth pb-4 px-2 custom-scrollbar"
        >
            {fractionalBenefits.map((benefit, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-[1.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 min-w-[150px] sm:min-w-[250px] max-w-[250px] shrink-0 group hover:-translate-y-3 text-center"
                >
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2076C7] mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner mx-auto">
                        <benefit.icon size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-700">
                        {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-lg">
                        {benefit.description}
                    </p>
                </div>
            ))}
        </div>
    </div>
</div>
                {/* Section: Investment Comparison */}
                <div className="mb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                Traditional vs Fractional
                            </h2>
                            <p className="text-gray-500 font-medium text-lg md:text-xl">
                                Why smart investors are switching to fractional ownership.
                            </p>
                        </div>

                        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-0 items-center">
                            {/* Traditional Column */}
                            <div className="w-full lg:w-1/2 bg-white rounded-[3rem] lg:rounded-r-none p-8 md:p-12 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] lg:border-r-0 relative z-0">
                                <div className="text-center mb-10">
                                    <span className="px-5 py-2 bg-slate-100 rounded-full text-slate-500 font-bold text-xs uppercase tracking-widest">Traditional Way</span>
                                    <h3 className="text-2xl font-black text-slate-600 mt-4 leading-tight">Single Property<br/>Investment</h3>
                                    <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-4">
                                        Achieving your financial goals is our true achievement. We simplify the path to wealth through a structured and transparent investment process.
                                    </p>
                                </div>
                                
                              <div className="space-y-10">
                   {[
                        { label: 'Min. Investment', value: '₹1 Cr - ₹10 Cr+', icon: Wallet },
                        { label: 'Management', value: 'High Effort (Self)', icon: Shield },
                        { label: 'Returns', value: 'Lower (2-3% Yield)', icon: TrendingUp },
                        { label: 'Liquidity', value: 'Very Slow (Months)', icon: Zap },
                        { label: 'Risk', value: 'High (Single Asset)', icon: Layout }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-8 group">
            
                           {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-400 transition-colors">
                                    <item.icon size={26} />
                                </div>

                             {/* Text */}
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        {item.label}
                                    </p>
                                    <p className="text-lg md:text-xl font-semibold text-gray-700 leading-relaxed">
                    {item.value}
                </p>
            </div>
        </div>
    ))}
</div>
                            </div>

                            {/* VS Badge */}
                            <div className="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-20 flex items-center justify-center">
                                <div className="hidden lg:block absolute h-[110%] w-px bg-slate-100 left-1/2 -translate-x-1/2 -top-[5%]"></div>
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-[0_10px_40px_rgba(32,118,199,0.2)] border-2 border-slate-50 flex items-center justify-center relative z-10">
                                    <span className="text-2xl md:text-3xl font-black bg-linear-to-br from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">VS</span>
                                </div>
                            </div>

                            {/* Fractional Column */}
                           <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 rounded-[3rem] lg:rounded-l-none p-8 md:p-12 border-2 border-[#1CADA3]/20 shadow-[0_30px_70px_rgba(28,173,163,0.1)] relative z-10 lg:-ml-0.5 scale-100 lg:scale-105">
    
    {/* Header */}
    <div className="text-center mb-8">
        <span className="px-6 py-2 bg-teal-50 text-[#1CADA3] rounded-full font-bold text-sm uppercase tracking-widest border border-teal-100">
            Smart Choice
        </span>

        <h3 className="text-3xl md:text-4xl font-black text-[#1CADA3] mt-4 leading-tight">
            Fractional<br/>Ownership
        </h3>

        <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed mt-3 max-w-md mx-auto">
            Achieving your financial goals is our true achievement. We simplify the path to wealth through a structured & transparent investment process.
        </p>
    </div>

    {/* Features */}
    <div className="space-y-6">
        {[
            { label: 'Min. Investment', value: 'Starts at ₹8 Lakh', icon: Wallet },
            { label: 'Management', value: 'Zero Effort (Experts)', icon: Shield },
            { label: 'Returns', value: 'High (8-10% Yield)', icon: TrendingUp },
            { label: 'Liquidity', value: 'Fast (Marketplace)', icon: Zap },
            { label: 'Risk', value: 'Low (Diversified)', icon: Layout }
        ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 group">
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center text-[#1CADA3] group-hover:bg-[#1CADA3] group-hover:text-white transition-all duration-300 shadow-inner">
                    <item.icon size={26} />
                </div>

                {/* Text */}
                <div>
                    <p className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
                        {item.label}
                    </p>
                    <p className="text-xl md:text-2xl font-black text-slate-600 leading-snug">
                        {item.value}
                    </p>
                </div>
            </div>
        ))}
    </div>
    
    {/* CTA */}
    <div className="mt-8 pt-6 border-t border-blue-100 text-center">
        <button
            onClick={() => {
                const el = document.getElementById('live');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#2076C7] font-bold text-base uppercase tracking-[0.2em] hover:tracking-[0.25em] transition-all flex items-center justify-center gap-3 mx-auto group"
        >
            Check Opportunities
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <Plus size={16} />
            </div>
        </button>
    </div>

</div>
                        </div>
                    </div>
                </div>

                {/* Legal & Tax Explanation Section */}
                    <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        <div className="group relative bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 p-10 rounded-[3rem] border border-blue-100/50 shadow-[0_20px_60px_-15px_rgba(32,118,199,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(32,118,199,0.15)] hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-200/40 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-50">
                                    <Shield size={36} className="text-[#2076C7]" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Legal Structure (LLP)</h3>
                                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                    You directly become a <b className="text-[#2076C7]">legal partner</b> in the property. Your name is registered on the verified documents,
                                    giving you legal co-ownership of the asset just like owning a share of the property itself.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 p-10 rounded-[3rem] border border-teal-100/50 shadow-[0_20px_60px_-15px_rgba(28,173,163,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(28,173,163,0.15)] hover:border-teal-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-teal-200/40 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-teal-50">
                                    <TrendingUp size={36} className="text-[#1CADA3]" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Buy-Back Agreement</h3>
                                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                    We guarantee your exit. At the end of the term, your share is <b className="text-[#1CADA3]">bought back at a higher price</b>
                                    (Principal + Appreciation), ensuring your investment returns are safe and timely.
                                </p>
                            </div>
                        </div>

                        <div className="group relative bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/30 p-10 rounded-[3rem] border border-indigo-100/50 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:border-indigo-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-200/40 transition-colors"></div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-indigo-50">
                                    <IndianRupee size={36} className="text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Tax Knowledge</h3>
                                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                    Tax is simple. <b className="text-indigo-600">10% TDS</b> is deducted on monthly interest. You get <b>90% directly in your bank</b>.
                                    Capital gains tax applies only on the final profit when you exit.
                                </p>
                            </div>
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
                    </>
                )}
            </div>

            {/* Feedback Form Modal */}
            {showFeedbackForm && (
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
            )}
        </div>
    );
};

export default PropertiesSection;