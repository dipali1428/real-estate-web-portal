'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { realEstateAPI, RealEstateInvestment } from '../../../services/realestateAPI';
import { properties as staticProperties } from '../data/properties';
import { useModal } from "@/app/context/ModalContext";
import {
    Filter, Search, ChevronRight, TrendingUp, Shield, MapPin, X, Star, CheckCircle, Wallet,
    ChevronLeft, Layout, Zap, Info, Plus, Minus, IndianRupee
} from 'lucide-react';

import InvestmentGrowth from '../../../customer/real-estate/components/InvestmentGrowth';

interface PropertiesSectionProps {
    onPropertySelect?: (id: string) => void;
    showOnlyLive?: boolean;
    isDashboard?: boolean;
}

interface TransformedProperty {
    id: number; title: string; developer_name: string; location: string; type: string;
    price: number; area: number; rera_reg_no: string; min_contribution: number;
    yield_percentage: number; irr_percentage: number; image: string; status: string;
    description?: string;
}

const PropertiesSection = ({ onPropertySelect, showOnlyLive = false, isDashboard = false }: PropertiesSectionProps) => {
    const { openLogin } = useModal();
    const benefitsScrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeTab, setActiveTab] = useState<'properties' | 'growth'>('properties');

    const [apiProperties, setApiProperties] = useState<RealEstateInvestment[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ search: '', type: '', minPrice: '', maxPrice: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [showAllFaqs, setShowAllFaqs] = useState(false);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ name: '', role: '', text: '', rating: 5 });

    const fetchProperties = async () => {
        try {
            setLoading(true);
            setFetchError(null);
            // ✅ Changed from getAllInvestments to getAllProperties
            const response = await realEstateAPI.getAllProperties();
            setApiProperties(response.data);
        } catch (error) {
            setFetchError('Failed to load properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // ✅ New function to fetch single property by ID
    const fetchPropertyById = async (id: string | number) => {
        try {
            const response = await realEstateAPI.getPropertyById(id);
            return response.data;
        } catch (error) {
            return null;
        }
    };

    useEffect(() => { fetchProperties(); }, []);

    const transformedProperties: TransformedProperty[] = useMemo(() => {
        const apiTransformed = apiProperties.map(prop => ({
            id: prop.id, 
            title: prop.project_name, 
            developer_name: prop.developer_name, 
            location: prop.location,
            type: prop.project_type || 'Residential',
            price: prop.total_asset_value ? parseInt(prop.total_asset_value) : parseInt(prop.min_investment) * 10,
            area: prop.total_area || 500, 
            rera_reg_no: prop.rera_id || 'RERA-Pending',
            min_contribution: parseInt(prop.min_investment), 
            yield_percentage: parseFloat(prop.yield_percentage),
            irr_percentage: prop.irr_percentage ? parseFloat(prop.irr_percentage) : parseFloat(prop.yield_percentage) * 1.2,
            image: prop.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(prop.project_name)}&size=400&background=2076C7&color=fff&bold=true`, 
            status: prop.status === 'ACTIVE' ? 'live' : 'closed'
        }));

        // Convert static properties to match TransformedProperty interface
        const staticTransformed = staticProperties.map(p => ({
            id: p.id, 
            title: p.title, 
            developer_name: p.developer, 
            location: p.location,
            type: p.type, 
            price: p.price, 
            area: p.area, 
            rera_reg_no: p.rera_reg_no,
            min_contribution: p.min_contribution, 
            yield_percentage: p.yield_percentage,
            irr_percentage: p.irr_percentage, 
            image: p.image, 
            status: p.status,
            description: p.description
        }));

        // Combine both, avoiding duplicates by title/id if necessary
        return [...apiTransformed, ...staticTransformed.filter(sp => !apiTransformed.some(ap => ap.title === sp.title))];
    }, [apiProperties]);

    // Handle property selection with detailed fetch
    const handlePropertySelect = async (propertyId: string) => {
        if (onPropertySelect) {
            // ✅ Fetch full property details before passing to parent
            const detailedProperty = await fetchPropertyById(propertyId);
            if (detailedProperty) {
                onPropertySelect(propertyId);
            } else {
                onPropertySelect(propertyId);
            }
        }
    };

    // Auto-scroll logic for benefits
    useEffect(() => {
        if (!benefitsScrollRef.current || isHovered) return;

        const scrollContainer = benefitsScrollRef.current;
        const interval = setInterval(() => {
            scrollContainer.scrollLeft += 1.5;

            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isHovered]);

    const liveProperties = useMemo(() => transformedProperties.filter(p => {
        if (p.status !== 'live') return false;
        const searchLower = filters.search.toLowerCase();
        if (filters.search && !(p.title.toLowerCase().includes(searchLower) || p.location.toLowerCase().includes(searchLower) || p.type.toLowerCase().includes(searchLower))) return false;
        if (filters.type && !p.type.toLowerCase().includes(filters.type.toLowerCase())) return false;
        if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
        if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
        return true;
    }), [filters, transformedProperties]);

    const closedProperties = useMemo(() => transformedProperties.filter(p => p.status === 'closed'), [transformedProperties]);

    const faqs = [
        { q: "What types of real estate assets are available?", a: "Our portfolio specifically covers institutional-grade real estate including Luxury Villas, Grade-A Commercial Spaces, Residential Apartment Complexes, and Industrial Warehousing in prime Pune locations." },
        { q: "How do you verify the legal status of the properties?", a: "Every property undergoes a rigorous 3-tier legal audit. We only list RERA-approved projects and provide direct access to sanction letters, title deeds, and RERA registration documents on the property details page." },
        { q: "Can I schedule a physical site visit before investing?", a: "Absolutely. While we provide immersive 360° virtual tours for convenience, we encourage physical inspections. You can click 'Contact Support' on any listing to schedule a guided site visit with our Pune advisory team." },
        { q: "Who handles the maintenance and tenancy of the properties?", a: "Infinity Arthvishwa partners with professional facility management firms to handle all aspects of property upkeep, tenant sourcing, and lease management, ensuring your real estate asset is well-maintained and productive." },
        { q: "What defines the 'Expected Holding Period' for each listing?", a: "The holding period is a strategic timeline (typically 3-5 years) calculated based on local area development, historical price trends in Pune, and projected market demand to maximize your capital appreciation." },
        { q: "How is fractional ownership different from REITs?", a: "Unlike REITs where you own shares in a company that owns properties, fractional ownership gives you direct legal co-ownership of a specific physical asset registered in your name via an LLP." },
        { q: "What are the exit options if I need liquidity earlier?", a: "While we recommend the full holding period, we provide secondary market support where you can list your fractional share for sale to other verified investors on our platform." },
        { q: "Are these properties RERA registered?", a: "Yes, we exclusively partner with RERA-registered developers and projects. All legal documentation, including RERA certificates, is available for verification before any investment." },
        { q: "Is there a management fee for the property?", a: "We charge a nominal asset management fee which is already factored into the 'Net Yield' displayed. This covers property taxes, maintenance, insurance, and professional tenancy management." },
        { q: "Can NRIs invest in fractional real estate?", a: "Yes, NRIs can invest in commercial and residential fractional real estate in India through NRO/NRE accounts, following standard FEMA regulations which our legal team helps facilitate." }
    ];

    const fractionalBenefits = [
        { title: "High Rental Yields", description: "Earn stable passive income with institutional-grade commercial and residential assets.", icon: TrendingUp },
        { title: "Capital Appreciation", description: "Benefit from the rising property values in India's top growth corridors.", icon: Zap },
        { title: "Low Entry Barrier", description: "Access premium real estate with investments starting as low as ₹1 Lakh.", icon: Wallet },
        { title: "Portfolio Diversification", description: "Reduce risk by spreading your investment across multiple premium properties.", icon: Layout },
        { title: "Professional Management", description: "Hassle-free ownership with end-to-end property and tenant management.", icon: Shield },
        { title: "RERA Registered", description: "Every project undergoes a 3-tier legal audit and is RERA-compliant.", icon: CheckCircle }
    ];

    const handleFilterChange = (field: string, value: string) => setFilters(prev => ({ ...prev, [field]: value }));
    const clearFilters = () => setFilters({ search: '', type: '', minPrice: '', maxPrice: '' });

    if (loading) return <div className="flex justify-center items-center min-h-[400px]"><div className="text-center"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div><p className="text-gray-600">Loading properties...</p></div></div>;
    if (fetchError) return <div className="text-center py-16"><p className="text-red-600 mb-4">{fetchError}</p><button onClick={fetchProperties} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Try Again</button></div>;

    return (
        <div id="properties" className="animate-fade-in font-sans">

            <div className={isDashboard ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>

                {/* NAVIGATION HEADER */}
                {isDashboard && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-100/60"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                                    {activeTab === 'growth' ? (
                                        <TrendingUp size={24} />
                                    ) : (
                                        <Layout size={24} />
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                            {activeTab === 'properties'
                                                ? 'Premium Properties'
                                                : 'Portfolio Analysis'}
                                        </h2>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2">
                                        <span>
                                            {activeTab === 'properties'
                                                ? 'Browse and invest in institutional-grade real estate'
                                                : 'Track your returns and investment growth projections'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Tab Buttons - Refined Grid Switcher for Mobile, Pill for Desktop */}
                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                                <div className="grid grid-cols-2 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl sm:rounded-full gap-1.5 relative shadow-inner border border-slate-200/50">
                                    {[
                                        { id: 'properties', label: 'Projects', icon: Layout },
                                        { id: 'growth', label: 'Growth', icon: TrendingUp },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`relative px-4 md:px-6 py-3 sm:py-2 rounded-xl sm:rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTabRE"
                                                    className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl sm:rounded-full -z-10 shadow-sm"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <tab.icon size={16} className="sm:size-[14px] transition-all duration-300" />
                                            <span className="leading-none">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {activeTab === 'properties' ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            id="live"
                            className={isDashboard ? 'flex-1' : 'flex-1 p-4 sm:p-6'}
                        >
                            {!isDashboard && (
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Live Projects</h2>
                                    <p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">
                                        Explore our hand-picked selection of premium investment opportunities currently available in prime locations.
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-6">
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto max-w-xl justify-end">
                                    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 flex items-center px-4 flex-1 md:w-80"><Search size={18} className="text-slate-400" /><input type="text" placeholder="Search properties..." value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} className="bg-transparent border-none text-slate-700 py-3 px-3 w-full outline-none placeholder:text-slate-400 font-medium" /></div>
                                    <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border ${showFilters ? 'btn-brand border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}><Filter size={20} /> Filters</button>
                                    <button onClick={fetchProperties} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border bg-green-50 text-green-700 border-green-200 hover:bg-green-100" title="Refresh properties"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Refresh</button>
                                </div>
                            </div>

                            {showFilters && (
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                    <div><label className="block mb-2 text-xs font-bold text-slate-700 uppercase tracking-wider">Property Type</label><select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none"><option value="">All Types</option><option value="Villa">Villa</option><option value="Apartment">Apartment</option><option value="Mixed-Use">Mixed-Use</option><option value="Commercial">Commercial</option><option value="Retail/Commercial">Retail/Commercial</option><option value="Residential">Residential</option><option value="Cottage">Cottage</option></select></div>
                                    <div><label className="block mb-2 text-sm font-bold text-slate-700">Min Price (₹)</label><input type="number" placeholder="No Min" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none" /></div>
                                    <div><label className="block mb-2 text-sm font-bold text-slate-700">Max Price (₹)</label><input type="number" placeholder="No Max" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} className="w-full bg-white text-slate-700 p-3 rounded-lg border-2 border-slate-200 font-semibold focus:border-blue-500 outline-none" /></div>
                                    <div className="flex items-end"><button onClick={clearFilters} className="text-pink-500 font-bold flex items-center gap-2 hover:text-pink-600 transition-colors"><X size={18} /> Clear All</button></div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {liveProperties.map((property, idx) => (
                                    <div key={`${property.status}-${property.id}-${idx}`} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-slate-100 group">
                                        <div className="relative">
                                            <img src={property.image} alt={property.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider text-teal-600 border border-teal-100">
                                                {property.type.split(' ')[0]}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-black mb-1 line-clamp-1 text-slate-900 uppercase tracking-tight">{property.title}</h3>
                                                <div className="flex items-center gap-1 text-slate-500 text-xs"><MapPin size={12} /><span className="line-clamp-1">{property.location}</span></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-slate-50 rounded-xl">
                                                <div><p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Total Area</p><p className="text-sm font-semibold text-slate-800">{property.area} sq.ft</p></div>
                                                <div><p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">RERA ID</p><p className="text-xs font-semibold text-slate-800 truncate">{property.rera_reg_no}</p></div>
                                                <div><p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Start From</p><p className="text-sm font-bold text-teal-600">₹{(property.min_contribution / 100000).toLocaleString('en-IN')} Lakhs</p></div>
                                                <div><p className="text-[10px] text-slate-400 mb-0.5 uppercase tracking-wide">Yield</p><p className="text-sm font-bold text-blue-600">{property.yield_percentage}%</p></div>
                                            </div>
                                            <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-4">
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-0.5">Total Value</p>
                                                    <span className="text-base font-black text-[#2076C7] leading-tight">₹{property.price.toLocaleString('en-IN')}{property.price && <span className="text-black font-bold text-sm cursor-help ml-0.5" title="Star Marked — Potential for future value appreciation">*</span>}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openLogin()} className="flex-1 py-2.5 text-xs font-black rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md hover:shadow-lg transition-all">Apply Now</button>
                                                    <button onClick={() => handlePropertySelect(String(property.id))} className="border-2 border-[#2076C7] text-[#2076C7] px-4 py-2.5 text-xs rounded-xl shrink-0 font-extrabold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95">Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {liveProperties.length === 0 && !loading && <div className="p-16 text-center text-slate-500 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200"><h3 className="text-2xl font-bold mb-2 text-brand-gradient">No active properties found</h3><p>We are currently curating new high-yield opportunities. Stay tuned!</p><button onClick={fetchProperties} className="mt-4 text-blue-600 underline">Refresh</button></div>}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="growth"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex-1"
                        >
                            <div className={isDashboard ? '' : 'p-4 sm:p-6'}>
                                <InvestmentGrowth />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Rest of the component remains the same - FAQ, Benefits, etc. */}
                {!isDashboard && (
                    <>
                        <section className="py-12 md:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-slate-50 rounded-[3rem] mb-12">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">How We Deliver Results</h2>
                                    <p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">Achieving your financial goals is our true achievement. We simplify the path to wealth through a structured and transparent investment process.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">{[{ icon: Search, title: 'Select Property', text: 'Browse our curated collection of high-yield properties.' }, { icon: Wallet, title: 'Invest Amount', text: 'Choose your share and invest fractions of the total value.' }, { icon: TrendingUp, title: 'Earn & Grow', text: 'Receive periodic rental income and capital appreciation.' }].map((item, index) => (<div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center group border border-slate-100"><div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 transition-transform"><item.icon size={32} /></div><h3 className="text-xl font-bold mb-4 text-brand-gradient">{item.title}</h3><p className="text-slate-600 leading-relaxed font-medium">{item.text}</p></div>))}</div></div>
                        </section>

                        <div id="closed" className="mb-12 pt-10 border-t border-slate-200">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Closed Opportunities</h2>
                                <p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">
                                    Explore our track record of successfully exited and matured property investments.
                                </p>
                            </div>
                            <div className="relative px-1 sm:px-4">
                                <button onClick={() => { const container = document.getElementById('closed-scroll'); if (container) container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' }); }} className="absolute left-0 top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-all"><ChevronLeft size={20} /></button>
                                <button onClick={() => { const container = document.getElementById('closed-scroll'); if (container) container.scrollBy({ left: container.clientWidth, behavior: 'smooth' }); }} className="absolute right-0 top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-all"><ChevronRight size={20} /></button>
                                <div id="closed-scroll" className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {closedProperties.map((property, idx) => (
                                        <div key={`${property.status}-${property.id}-${idx}`} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-slate-100 opacity-90 grayscale-[0.5] hover:grayscale-0 transition-all duration-500 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-0.75rem)] shrink-0">
                                            <div className="relative"><img src={property.image} alt={property.title} className="w-full h-40 sm:h-48 object-cover" /><div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/90 backdrop-blur bg-opacity-90 rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">SUCCESSFULLY CLOSED</div></div>
                                            <div className="p-5 flex-1 flex flex-col"><h3 className="text-lg font-bold mb-1 text-brand-gradient">{property.title}</h3><div className="flex items-center gap-1 text-slate-500 text-xs mb-4"><MapPin size={12} /><span>{property.location}</span></div><div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl mt-auto"><div><p className="text-[10px] text-slate-400 mb-0.5">Returns Delivered</p><p className="text-sm font-bold text-teal-600">{property.yield_percentage}% Yield</p></div><div><p className="text-[10px] text-slate-400 mb-0.5">Exit IRR</p><p className="text-sm font-bold text-blue-600">{property.irr_percentage}%</p></div></div></div>
                                        </div>
                                    ))}
                                </div>
                                {closedProperties.length > 0 && <div className="mt-8 flex justify-end pr-2"><div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-[0_10px_30px_-10px_rgba(32,118,199,0.1)] flex items-center gap-4"><div className="flex flex-col items-end"><span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] leading-none mb-1">Success Rate</span><div className="flex items-baseline gap-1"><span className="text-2xl font-black text-slate-800 leading-none">{String(closedProperties.length).padStart(2, '0')}</span><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assets Closed</span></div></div><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2076C7] shadow-inner"><CheckCircle size={22} strokeWidth={2.5} /></div></div></div>}
                            </div>
                        </div>

                        <div className="mb-20 pt-12 border-t border-slate-200">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .no-scrollbar::-webkit-scrollbar { display: none; }
                                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                            `}} />
                            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Fractional Real Estate Benefits</h2><p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">Experience the advantages of modern property investment simplified for everyone.</p></div>
                            <div className="px-6 sm:px-10 lg:px-8">
                                <div
                                    ref={benefitsScrollRef}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="flex gap-8 overflow-x-auto scroll-smooth pb-4 px-2 no-scrollbar"
                                >
                                    {[...fractionalBenefits, ...fractionalBenefits].map((benefit, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-[1.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 min-w-[220px] max-w-[220px] sm:min-w-[250px] sm:max-w-[250px] shrink-0 group hover:-translate-y-3 text-center">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2076C7] mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner mx-auto">
                                                <benefit.icon size={32} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 text-gray-700">{benefit.title}</h3>
                                            <p className="text-slate-600 leading-relaxed font-medium text-lg">{benefit.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-24 px-2 sm:px-6 lg:px-8 relative overflow-hidden">
                            <div className="max-w-6xl mx-auto">
                                <div className="text-center mb-12 md:mb-16">
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-brand-gradient bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Traditional vs Fractional</h2>
                                    <p className="text-gray-600 max-w-4xl mx-auto font-medium text-lg">Which path leads to your financial freedom?</p>
                                </div>

                                <div className="flex flex-col lg:flex-row items-stretch gap-8 relative">
                                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white shadow-xl border-4 border-slate-50 items-center justify-center">
                                        <span className="text-xl font-black bg-linear-to-br from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">VS</span>
                                    </div>

                                    <motion.div whileHover={{ y: -5 }} className="flex-1 bg-white rounded-[2rem] p-5 md:p-8 border border-slate-200 relative overflow-hidden group">
                                        <div className="relative z-10">
                                            <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full font-black text-[8px] uppercase tracking-widest">The Old Way</span>
                                            <h3 className="text-xl font-black text-slate-800 mt-4 mb-5 underline decoration-slate-300 decoration-4 underline-offset-8">Traditional Realty</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Min. Investment', value: '₹1 Cr - ₹10 Cr+', icon: Wallet },
                                                    { label: 'Management', value: 'High Effort (Self)', icon: Shield },
                                                    { label: 'Liquidity', value: 'Months to Sell', icon: Zap },
                                                    { label: 'Compliance', value: 'Manual Verification', icon: CheckCircle },
                                                    { label: 'Asset Access', value: 'Limited & Local', icon: Layout },
                                                    { label: 'Transparency', value: 'Opaque & Paper-based', icon: Info }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                                                            <item.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                                            <p className="text-sm font-bold text-slate-500 line-through decoration-slate-300">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div whileHover={{ y: -10 }} className="flex-1 bg-blue-50/50 rounded-[2rem] p-5 md:p-8 border-2 border-[#1CADA3]/20 shadow-[0_30px_70px_rgba(32,118,199,0.08)] relative overflow-hidden group">
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start">
                                                <span className="px-3 py-1 bg-teal-50 text-[#1CADA3] rounded-full font-black text-[8px] uppercase tracking-widest border border-teal-100">Smart Choice</span>
                                                <div className="w-7 h-7 bg-teal-50 rounded-full flex items-center justify-center text-[#1CADA3] animate-pulse">
                                                    <CheckCircle size={16} />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mt-4 mb-5">Fractional Assets</h3>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Min. Investment', value: 'Starts at ₹8 Lakh', icon: Wallet },
                                                    { label: 'Management', value: 'Zero Effort (Experts)', icon: Shield },
                                                    { label: 'Liquidity', value: 'Instant (Marketplace)', icon: Zap },
                                                    { label: 'Compliance', value: '3-Tier Legal Audit', icon: CheckCircle },
                                                    { label: 'Asset Access', value: 'Pan-India Prime', icon: Layout },
                                                    { label: 'Transparency', value: 'Digital & Real-time', icon: Info }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 group/item">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7] group-hover/item:bg-[#2076C7] group-hover/item:text-white transition-all duration-300 shadow-inner">
                                                            <item.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                                            <p className="text-base md:text-lg font-black text-slate-800">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                                                <button onClick={() => document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] shadow-lg hover:shadow-[#2076C7]/20 transition-all flex items-center justify-center gap-3 group">
                                                    Start Investing <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"><div className="group relative bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 p-10 rounded-[3rem] border border-blue-100/50 shadow-[0_20px_60px_-15px_rgba(32,118,199,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(32,118,199,0.15)] hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center"><div className="relative z-10"><div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-50"><Shield size={36} className="text-[#2076C7]" /></div><h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Legal Structure (LLP)</h3><p className="text-slate-600 leading-relaxed text-lg font-medium">You directly become a <b className="text-[#2076C7]">legal partner</b> in the property. Your name is registered on the verified documents, giving you legal co-ownership of the asset just like owning a share of the property itself.</p></div></div>
                            <div className="group relative bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 p-10 rounded-[3rem] border border-teal-100/50 shadow-[0_20px_60px_-15px_rgba(28,173,163,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(28,173,163,0.15)] hover:border-teal-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center"><div className="relative z-10"><div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-teal-50"><TrendingUp size={36} className="text-[#1CADA3]" /></div><h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Buy-Back Agreement</h3><p className="text-slate-600 leading-relaxed text-lg font-medium">We guarantee your exit. At the end of the term, your share is <b className="text-[#1CADA3]">bought back at a higher price</b> (Principal + Appreciation), ensuring your investment returns are safe and timely.</p></div></div>
                            <div className="group relative bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/30 p-10 rounded-[3rem] border border-indigo-100/50 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:border-indigo-300 hover:-translate-y-2 transition-all duration-500 overflow-hidden text-center"><div className="relative z-10"><div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500 border border-indigo-50"><IndianRupee size={36} className="text-indigo-600" /></div><h3 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Tax Knowledge</h3><p className="text-slate-600 leading-relaxed text-lg font-medium">Tax is simple. <b className="text-indigo-600">10% TDS</b> is deducted on monthly interest. You get <b>90% directly in your bank</b>. Capital gains tax applies only on the final profit when you exit.</p></div></div></div>

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"><div className="p-6 bg-yellow-50/80 border border-yellow-200/60 rounded-2xl text-sm md:text-base font-medium leading-relaxed text-slate-600 shadow-sm flex items-start gap-4"><div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0 mt-0.5"><Info size={20} strokeWidth={2.5} /></div><p><span className="font-bold text-yellow-800">Disclaimer:</span> The projected returns shown in the calculator are indicative. Actual returns are subject to market changes, property appreciation over the chosen term, and the prevailing tax rates at the time of your exit via the Buy-Back Agreement.</p></div></div>

                        <section id="faq" className="py-6 mt-10 border-t border-slate-200 pt-10"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Frequently Asked Questions</h2><p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed mt-2">Got questions about our real estate investments? We&apos;ve got answers for you.</p></div><div className="space-y-4">{faqs.slice(0, showAllFaqs ? faqs.length : 5).map((faq, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2076C7]/30 hover:shadow-md"><button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 bg-slate-50/50 hover:bg-blue-50/50 transition-colors"><span className="font-extrabold text-gray-700 text-base sm:text-lg pr-2 group-hover:text-[#2076C7] transition-colors leading-snug">{faq.q}</span><div className={`p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm transition-transform duration-300 shrink-0 ${activeFaq === idx ? 'rotate-180 bg-[#2076C7] text-white border-[#2076C7]' : ''}`}>{activeFaq === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}</div></button><AnimatePresence>{activeFaq === idx && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-6 py-5 bg-white text-slate-500 text-base font-medium leading-relaxed border-t border-gray-100">{faq.a}</div></motion.div>)}</AnimatePresence></motion.div>))}</div><div className="mt-12 text-center"><button onClick={() => setShowAllFaqs(!showAllFaqs)} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-50 text-[#2076C7] font-black uppercase tracking-widest text-[10px] hover:bg-blue-100 transition-all shadow-sm active:scale-95">{showAllFaqs ? "View Less" : "View More FAQs"}<Plus size={16} strokeWidth={3} className={`transition-transform duration-300 ${showAllFaqs ? 'rotate-45' : ''}`} /></button></div></div></section>
                    </>
                )}
            </div>

            {showFeedbackForm && (<div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" onClick={() => setShowFeedbackForm(false)}><div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-fade-in" onClick={e => e.stopPropagation()}><button onClick={() => setShowFeedbackForm(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"><X size={20} /></button><h3 className="text-3xl font-extrabold mb-2 text-brand-gradient">Share Feedback</h3><p className="text-slate-500 mb-8">We value your input! Tell us about your investment experience.</p><form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your valuable feedback! It will be listed after moderation."); setShowFeedbackForm(false); setNewFeedback({ name: '', role: '', text: '', rating: 5 }); }} className="space-y-6"><div><label className="block font-bold text-slate-800 mb-2">Full Name</label><input type="text" required placeholder="Enter your name" value={newFeedback.name} onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" /></div><div><label className="block font-bold text-slate-800 mb-2">Professional Role</label><input type="text" required placeholder="e.g. Software Engineer" value={newFeedback.role} onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors" /></div><div><label className="block font-bold text-slate-800 mb-2">Rating</label><div className="flex gap-2">{[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setNewFeedback({ ...newFeedback, rating: star })} className="focus:outline-none transition-transform hover:scale-110"><Star size={32} fill={star <= newFeedback.rating ? "#F59E0B" : "none"} color={star <= newFeedback.rating ? "#F59E0B" : "#cbd5e1"} /></button>))}</div></div><div><label className="block font-bold text-slate-800 mb-2">Your Review</label><textarea required rows={4} placeholder="Share your thoughts..." value={newFeedback.text} onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"></textarea></div><button type="submit" className="btn-brand w-full py-4 rounded-xl text-base">Submit Feedback</button></form></div></div>)}
        </div>
    );
};

export default PropertiesSection;