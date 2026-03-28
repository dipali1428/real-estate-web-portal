'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconCheck, IconX, IconCreditCard, IconCash,
    IconCurrencyRupee, IconShieldCheck, IconGift, IconPlane,
    IconShoppingBag, IconFilter, IconStar,
    IconSearch, IconChevronDown, IconChevronUp
} from '@tabler/icons-react';

import CompareModal from './CompareModal';
import ContactModal from '../../../component/ContactModal';

import { 
    banks, categories, cardTypes, 
    KOTAK_ELIGIBILITY, KOTAK_DOCS, 
    INDUSIND_ELIGIBILITY, INDUSIND_DOCS, 
    UNION_ELIGIBILITY, UNION_DOCS, 
    GENERIC_ELIGIBILITY, GENERIC_DOCS 
} from '../data/cards';
export default function CardTypesSection({ onApplyClick, onContactClick }: { onApplyClick: (title: string) => void; onContactClick: () => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [activeDetailsTab, setActiveDetailsTab] = useState<Record<number, 'features' | 'eligibility' | 'docs'>>({});
    const [selectedCompare, setSelectedCompare] = useState<number[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    // Scroll to section top when showAll changes (especially on View Less)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!showAll && scrollerRef.current && typeof window !== 'undefined') {
            // Scroll the window to the top of the cards section with some offset
            const offset = 80; // Offset for sticky headers/padding
            const element = scrollerRef.current;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [showAll]);

    const filteredCards = useMemo(() => {
        return cardTypes.filter(card => {
            const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBank = selectedBanks.length === 0 || selectedBanks.includes(card.bank);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(catId => {
                if (card.category === catId) return true;
                
                const searchStr = `${card.tags.join(' ')} ${card.highlights.join(' ')} ${card.detailedFeatures.join(' ')}`.toLowerCase();
                const c = catId.toLowerCase();
                
                if (c === 'movies' && (searchStr.includes('movie') || searchStr.includes('bookmyshow') || searchStr.includes('inox') || searchStr.includes('pvr'))) return true;
                if (c === 'lounge' && (searchStr.includes('lounge') || searchStr.includes('priority pass') || searchStr.includes('dreamfolks'))) return true;
                if (c === 'dining' && (searchStr.includes('dining') || searchStr.includes('restaurant') || searchStr.includes('swiggy') || searchStr.includes('zomato') || searchStr.includes('eazydiner'))) return true;
                if (c === 'fuel' && (searchStr.includes('fuel') || searchStr.includes('petrol') || searchStr.includes('hpcl') || searchStr.includes('indian oil'))) return true;
                if (c === 'travel' && (searchStr.includes('travel') || searchStr.includes('flight') || searchStr.includes('airport') || searchStr.includes('air miles') || searchStr.includes('hotel'))) return true;
                if (c === 'rewards' && (searchStr.includes('reward') || searchStr.includes('points') || searchStr.includes('neucoins') || searchStr.includes('cashpoints'))) return true;
                if (c === 'cashback' && searchStr.includes('cashback')) return true;
                if (c === 'shopping' && (searchStr.includes('shopping') || searchStr.includes('myntra') || searchStr.includes('amazon') || searchStr.includes('flipkart') || searchStr.includes('apparel') || searchStr.includes('grocery'))) return true;
                if (c === 'online' && (searchStr.includes('online') || searchStr.includes('amazon') || searchStr.includes('flipkart') || searchStr.includes('swiggy'))) return true;
                if (c === 'premium' && (searchStr.includes('premium') || searchStr.includes('luxury') || searchStr.includes('elite') || searchStr.includes('golf'))) return true;
                if (c === 'priority_pass' && searchStr.includes('priority pass')) return true;
                if (c === 'elite_status' && (searchStr.includes('elite') || searchStr.includes('status') || searchStr.includes('tier') || searchStr.includes('privilege'))) return true;
                if (c === 'health' && (searchStr.includes('health') || searchStr.includes('wellness') || searchStr.includes('apollo') || searchStr.includes('pharmacy') || searchStr.includes('chemist') || searchStr.includes('fitpass'))) return true;
                if (c === 'flights' && (searchStr.includes('flight') || searchStr.includes('indigo') || searchStr.includes('krisflyer') || searchStr.includes('miles') || searchStr.includes('air miles'))) return true;
                if (c === 'golf' && searchStr.includes('golf')) return true;
                if (c === 'sports' && (searchStr.includes('sports') || searchStr.includes('manchester') || searchStr.includes('football'))) return true;
                
                return card.tags.some(tag => tag.toLowerCase().includes(c) || c.includes(tag.toLowerCase()));
            });
            return matchesSearch && matchesBank && matchesCategory;
        });
    }, [searchQuery, selectedBanks, selectedCategories]);

    // Quick scroll to results on mobile when searching
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024 && searchQuery.trim().length > 0) {
            const timer = setTimeout(() => {
                scrollerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600); // 600ms debounce to allow typing
            return () => clearTimeout(timer);
        }
    }, [searchQuery]);

    const toggleBank = (bank: string) => {
        setSelectedBanks(prev => {
            const next = prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank];
            
            // Quick-scroll when selecting bank
            if (typeof window !== 'undefined') {
               setTimeout(() => {
                scrollerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }, 10);
            }
            return next;
        });
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev => {
            const next = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat];
            
            // Quick-scroll when selecting category
            if (typeof window !== 'undefined') {
               setTimeout(() => {
                scrollerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }, 10);
            }
            return next;
        });
    };

    const toggleCompare = (id: number) => {
        setSelectedCompare(prev => {
            if (prev.includes(id)) {
                return prev.filter(i => i !== id);
            }
            if (prev.length >= 3) {
                // Limit to 3 cards for comparison
                return prev;
            }
            return [...prev, id];
        });
    };

    const selectedCardsForCompare = useMemo(() => {
        return cardTypes.filter(card => selectedCompare.includes(card.id));
    }, [selectedCompare]);

    // Show all cards when showAll is true, otherwise show first 3
    const visibleCards = showAll ? filteredCards : filteredCards.slice(0, 3);

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-6">

                {/* Header & Horizontal Categories */}
                <div className="mb-12">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                            Popular Credit Card Offers
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed mb-10">
                            Scout through some of the best hand-picked credit card offers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-black text-slate-800 mb-6 uppercase tracking-wider text-left">Categories</h3>
                        
                        {/* Desktop View: Grid of buttons */}
                        <div className="hidden lg:flex flex-wrap justify-center gap-3 w-full">
                            {categories.map(cat => {
                                const isSelected = selectedCategories.includes(cat.id);
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`flex items-center gap-3 px-5 py-2.5 border rounded-2xl bg-white transition-all ${isSelected ? 'border-[#1CADA3] shadow-md shadow-[#1CADA3]/10' : 'border-slate-200 hover:border-[#1CADA3] hover:shadow-sm'}`}
                                    >
                                        <span className={`${isSelected ? 'text-[#1CADA3]' : 'text-slate-600'}`}>{cat.icon}</span>
                                        <span className={`text-sm font-bold ${isSelected ? 'text-[#1CADA3]' : 'text-slate-700'}`}>{cat.title}</span>
                                        <div className={`w-4 h-4 rounded-full border-2 ml-1 flex items-center justify-center transition-all ${isSelected ? 'border-4 border-[#1CADA3]' : 'border-slate-200'}`}>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Mobile View: Custom Dropdown */}
                        <div className="lg:hidden relative">
                            <button
                                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                                className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <IconFilter size={18} className="text-[#1CADA3]" />
                                    <span className="text-sm font-bold text-slate-700">
                                        {selectedCategories.length === 1 
                                            ? categories.find(c => c.id === selectedCategories[0])?.title 
                                            : selectedCategories.length > 1
                                                ? `${selectedCategories.length} Categories` 
                                                : "Filter by Category"}
                                    </span>
                                </div>
                                {isCatDropdownOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
                            </button>

                            <AnimatePresence>
                                {isCatDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden"
                                    >
                                        <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                                            {categories.map(cat => {
                                                const isSelected = selectedCategories.includes(cat.id);
                                                return (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => {
                                                            toggleCategory(cat.id);
                                                            setIsCatDropdownOpen(false); 
                                                        }}
                                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isSelected ? 'bg-[#1CADA3]/10 text-[#1CADA3]' : 'hover:bg-slate-50 text-slate-600'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span>{cat.icon}</span>
                                                            <span className="text-sm font-bold">{cat.title}</span>
                                                        </div>
                                                        {isSelected && <IconCheck size={16} strokeWidth={3} />}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        {selectedCategories.length > 0 && (
                                            <div className="p-2 border-t border-slate-50">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategories([]);
                                                        setIsCatDropdownOpen(false);
                                                    }}
                                                    className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-[#2076C7] hover:bg-slate-50 rounded-lg transition-all"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-72 shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                                <IconFilter size={20} className="text-[#2076C7]" />
                                Filters
                            </h3>

                            {/* Search */}
                            <div className="relative mb-8">
                                <input
                                    type="text"
                                    placeholder="Search card name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20 transition-all font-bold shadow-sm"
                                />
                                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            </div>

                            {/* Banks Filter */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Banks</span>
                                    <button className="text-[10px] font-black text-[#2076C7] uppercase" onClick={() => setSelectedBanks([])}>Clear</button>
                                </div>
                                <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-2">
                                    {banks.map(bank => (
                                        <label key={bank.name} className="flex items-center gap-3 group cursor-pointer">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBanks.includes(bank.name)}
                                                    onChange={() => toggleBank(bank.name)}
                                                    className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-200 checked:bg-[#2076C7] checked:border-[#2076C7] transition-all"
                                                />
                                                <IconCheck size={12} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform" strokeWidth={4} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 group-hover:text-[#2076C7] transition-colors">{bank.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Categories Filter removed in favor of top categories layout */}
                        </div>

                        {/* Banner for Support */}
                        <div className="bg-linear-to-br from-[#2076C7] to-[#1CADA3] p-6 rounded-3xl text-white relative overflow-hidden group border border-slate-100 shadow-sm">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
                            <h4 className="text-lg font-black mb-2 relative z-10">Need Help?</h4>
                            <p className="text-xs font-bold text-white/80 mb-4 relative z-10">Talk to our experts for personalized card advice.</p>
                            <button
                                onClick={onContactClick}
                                className="w-full py-3 bg-white text-[#2076C7] rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
                            >
                                Call Me Back
                            </button>
                        </div>
                    </div>

                    {/* Main Card List */}
                    {/* Main Card List with Stable Scroller */}
                    <div className="flex-grow flex flex-col">
                        <div
                            ref={scrollerRef}
                            className={`space-y-6 transition-all duration-700 ease-in-out ${showAll
                                ? 'lg:max-h-[900px] lg:overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent scroll-smooth'
                                : 'max-h-none overflow-visible'
                                }`}
                        >
                            <AnimatePresence mode='popLayout'>
                                {visibleCards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden group"
                                    >
                                        <div className="flex flex-col lg:flex-row items-stretch">
                                            {/* Left Image Fully Filling the Area */}
                                            <div className="w-full lg:w-[18rem] shrink-0 relative bg-white overflow-hidden p-4 flex items-center justify-center">
                                                {card.featured && (
                                                    <div className="absolute top-4 left-4 bg-amber-400 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm z-20">Featured</div>
                                                )}
                                                {card.image ? (
                                                    <img
                                                        src={card.image}
                                                        alt={card.title}
                                                        className="w-full h-full object-contain select-none group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                                                    />
                                                ) : (
                                                    <div className="w-full h-40 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                                        <IconCreditCard size={48} className="text-slate-200" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Content */}
                                            <div className="flex-grow flex flex-col xl:flex-row gap-5 xl:gap-6 w-full p-5 md:p-6">
                                                <div className="flex-grow space-y-4">
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{card.title}</h3>

                                                    {/* Tags row */}
                                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                                        {card.tags.map(tag => (
                                                            <div key={tag} className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 border border-slate-200 rounded-full text-[11px] md:text-xs font-bold text-slate-600 bg-white">
                                                                {tag.toLowerCase().includes('reward') || tag.toLowerCase().includes('bogo') ? <IconGift size={14} /> :
                                                                    tag.toLowerCase().includes('free') || tag.toLowerCase().includes('cash') ? <IconCash size={14} /> :
                                                                        tag.toLowerCase().includes('lounge') || tag.toLowerCase().includes('pass') ? <IconPlane size={14} /> :
                                                                            tag.toLowerCase().includes('shopping') || tag.toLowerCase().includes('neu') ? <IconShoppingBag size={14} /> :
                                                                                <IconStar size={14} />}
                                                                {tag}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Fees row */}
                                                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm py-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                                                                <IconCurrencyRupee size={12} className="text-amber-600" strokeWidth={3} />
                                                            </div>
                                                            <span className="text-slate-600 font-medium text-xs">Joining Fee: <strong className="text-slate-800 font-black">{card.joiningFee}</strong></span>
                                                        </div>
                                                        <div className="w-px h-4 bg-slate-200 hidden md:block"></div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                                                                <IconCurrencyRupee size={12} className="text-amber-600" strokeWidth={3} />
                                                            </div>
                                                            <span className="text-slate-600 font-medium text-xs">Annual/Renewal Fee: <strong className="text-slate-800 font-black">{card.annualFee}</strong></span>
                                                        </div>
                                                    </div>

                                                    {/* Highlights */}
                                                    <ul className="space-y-2.5">
                                                        {card.highlights.map((h, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-600 leading-snug">
                                                                <div className="bg-slate-800 text-white rounded-full p-0.5 mt-0.5 shrink-0">
                                                                    <IconCheck size={10} strokeWidth={4} />
                                                                </div>
                                                                {h}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Buttons Section */}
                                                <div className="xl:w-48 shrink-0 flex flex-col gap-3 justify-center pt-2">
                                                    <div className="flex items-center gap-2 mb-1 px-1">
                                                        <label className="flex items-center gap-3 group cursor-pointer">
                                                            <div className="relative flex items-center justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedCompare.includes(card.id)}
                                                                    onChange={() => toggleCompare(card.id)}
                                                                    disabled={!selectedCompare.includes(card.id) && selectedCompare.length >= 3}
                                                                    className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-200 checked:bg-[#2076C7] checked:border-[#2076C7] transition-all disabled:opacity-50"
                                                                />
                                                                <IconCheck size={12} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform" strokeWidth={4} />
                                                            </div>
                                                            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Compare</span>
                                                        </label>
                                                    </div>
                                                    <button
                                                        onClick={() => onApplyClick(card.title)}
                                                        className="w-full py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                                    >
                                                        ENQUIRE TODAY
                                                    </button>
                                                    <button
                                                        onClick={() => setExpandedCardId(expandedCardId === card.id ? null : card.id)}
                                                        className="w-full py-3 border-2 border-slate-100 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer"
                                                    >
                                                        {expandedCardId === card.id ? 'Hide Details' : 'Details'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Details Section */}
                                        <AnimatePresence>
                                            {expandedCardId === card.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                                                >
                                                    <div className="p-4 md:p-8">
                                                        {/* Tab Buttons */}
                                                        <div className="flex gap-4 md:gap-8 mb-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
                                                            {(['features', 'eligibility', 'docs'] as const).map((tab) => {
                                                                const isActive = (activeDetailsTab[card.id] || 'features') === tab;
                                                                return (
                                                                    <button
                                                                        key={tab}
                                                                        onClick={() => setActiveDetailsTab(prev => ({ ...prev, [card.id]: tab }))}
                                                                        className={`pb-3 text-xs md:text-sm font-black uppercase tracking-widest transition-all relative ${isActive ? 'text-[#2076C7]' : 'text-slate-400 hover:text-slate-600'}`}
                                                                    >
                                                                        {tab}
                                                                        {isActive && (
                                                                            <motion.div layoutId={`tab-underline-${card.id}`} className="absolute bottom-0 left-0 right-0 h-1 bg-[#2076C7] rounded-full" />
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Tab Content */}
                                                        <div>
                                                            {(activeDetailsTab[card.id] || 'features') === 'features' && (
                                                                <div className="space-y-4">
                                                                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                                        <IconStar size={16} className="text-amber-400" /> Key Features & Benefits
                                                                    </h4>
                                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                                                        {card.detailedFeatures.map((feature, idx) => (
                                                                            <li key={idx} className="flex items-start gap-3 text-sm font-bold text-slate-600 leading-snug">
                                                                                <IconCheck size={16} className="text-[#1CADA3] shrink-0 mt-0.5" strokeWidth={3} />
                                                                                {feature}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {(activeDetailsTab[card.id] || 'features') === 'eligibility' && (
                                                                <div className="space-y-4">
                                                                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                                        <IconCheck size={16} className="text-emerald-500" /> Eligibility Criteria
                                                                    </h4>
                                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                                                        {(card.bank === 'Kotak Bank' ? KOTAK_ELIGIBILITY :
                                                                          card.bank === 'IndusInd Bank' ? INDUSIND_ELIGIBILITY :
                                                                          card.bank === 'Union Bank of India' ? UNION_ELIGIBILITY : GENERIC_ELIGIBILITY).map((item, idx) => (
                                                                            <li key={idx} className="flex items-start gap-3 text-sm font-bold text-slate-600 leading-snug">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] mt-2 shrink-0" />
                                                                                {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {(activeDetailsTab[card.id] || 'features') === 'docs' && (
                                                                <div className="space-y-4">
                                                                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                                                        <IconShieldCheck size={16} className="text-[#2076C7]" /> Required Documents
                                                                    </h4>
                                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                                                        {(card.bank === 'Kotak Bank' ? KOTAK_DOCS :
                                                                          card.bank === 'IndusInd Bank' ? INDUSIND_DOCS :
                                                                          card.bank === 'Union Bank of India' ? UNION_DOCS : GENERIC_DOCS).map((item, idx) => (
                                                                            <li key={idx} className="flex items-start gap-3 text-sm font-bold text-slate-600 leading-snug">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#2076C7] mt-2 shrink-0" />
                                                                                {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="pt-6 border-t border-slate-100 mt-6">
                                                            <p className="text-[10px] sm:text-xs font-medium text-slate-400 italic">
                                                                * Credit card details are for informational purposes only. Please verify eligibility and documentation with the bank before applying.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredCards.length > 3 && (
                            <div className="flex flex-col items-center gap-3 mt-10">
                                {/* Dynamic Card Count Info */}
                                <div className="text-sm font-bold text-slate-500 text-center">
                                    {selectedBanks.length === 1 ? (
                                        <span>
                                            <span className="text-[#2076C7] font-extrabold">{selectedBanks[0]}</span>
                                            {' — '}
                                            <span className="text-slate-700 font-extrabold">{filteredCards.length} cards</span>
                                            {' available'}
                                        </span>
                                    ) : selectedBanks.length > 1 ? (
                                        <span>
                                            <span className="text-slate-700 font-extrabold">{filteredCards.length} cards</span>
                                            {' matching selected banks'}
                                        </span>
                                    ) : (
                                        <span>
                                            <span className="text-slate-700 font-extrabold">{filteredCards.length} cards</span>
                                            {' available in total'}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="px-8 py-3 bg-white border-[1.5px] border-slate-200 text-slate-700 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:border-[#2076C7] hover:text-[#2076C7] transition-all duration-300 flex items-center gap-3"
                                >
                                    {showAll ? (
                                        <>View Less <IconChevronUp size={14} /></>
                                    ) : (
                                        <>View All Cards <IconChevronDown size={14} /></>
                                    )}
                                </button>
                            </div>
                        )}

                        {filteredCards.length === 0 && (
                            <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <IconSearch size={32} className="text-slate-300" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-2">No cards found</h3>
                                <p className="text-slate-500 font-medium">Try adjusting your filters or search terms.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedBanks([]); setSelectedCategories([]); }}
                                    className="mt-6 px-8 py-3 bg-[#2076C7]/10 text-[#2076C7] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2076C7] hover:text-white transition-all"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Compare Bar */}
                <AnimatePresence>
                    {selectedCompare.length > 0 && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] w-[90%] max-w-4xl"
                        >
                            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-grow flex items-center justify-center md:justify-start gap-3 md:gap-5">
                                    {selectedCompare.map(id => {
                                        const card = cardTypes.find(c => c.id === id);
                                        return (
                                            <div key={id} className="relative group">
                                                <div className="w-16 h-10 md:w-20 md:h-12 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center p-1">
                                                    <img src={card?.image} alt={card?.title} className="max-h-full object-contain" />
                                                </div>
                                                <button
                                                    onClick={() => toggleCompare(id)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg z-10"
                                                >
                                                    <IconX size={12} strokeWidth={3} />
                                                </button>
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">{card?.title}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {selectedCompare.length < 3 && (
                                        <div className="w-16 h-10 md:w-20 md:h-12 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center px-1">Add Card</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="hidden md:block text-right">
                                        <div className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Selected {selectedCompare.length}/3</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-0.5">Compare for best offers</div>
                                    </div>
                                    <button
                                        onClick={() => setIsCompareOpen(true)}
                                        disabled={selectedCompare.length < 2}
                                        className="flex-grow md:flex-none px-8 md:px-12 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:translate-y-0"
                                    >
                                        Compare Now
                                    </button>
                                    <button
                                        onClick={() => setSelectedCompare([])}
                                        className="p-4 border-2 border-slate-100 text-slate-400 rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all"
                                    >
                                        <IconX size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Compare Modal */}
                <CompareModal
                    isOpen={isCompareOpen}
                    onClose={() => setIsCompareOpen(false)}
                    cards={selectedCardsForCompare}
                    onApply={onApplyClick}
                />
            </div>
        </section>
    );
}