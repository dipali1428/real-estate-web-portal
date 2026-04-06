'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconCheck, IconX, IconCreditCard, IconCash,
    IconCurrencyRupee, IconShieldCheck, IconGift, IconPlane,
    IconShoppingBag, IconFilter, IconStar,
    IconSearch, IconChevronDown, IconChevronUp,
    IconBookmark, IconFileText
} from '@tabler/icons-react';
import {
    CreditCard,
    Wallet,
    Ban,
    Shield,
    FileText,
    Gift,
    Phone,
    Eye,
    EyeOff,
    Info,
    CheckCircle2,
    ShoppingBag,
    Utensils,
    Zap,
    Plane,
    Fuel,
    Wifi,
    ChevronRight,
    X,
} from 'lucide-react';
import { useWishlist } from '@/app/context/WishlistContext';
import { useModal } from '@/app/context/ModalContext';
import toast from 'react-hot-toast';

import CompareModal from './CompareModal';

import { 
    banks, categories, cardTypes, 
    KOTAK_ELIGIBILITY, KOTAK_DOCS, 
    INDUSIND_ELIGIBILITY, INDUSIND_DOCS, 
    UNION_ELIGIBILITY, UNION_DOCS, 
    GENERIC_ELIGIBILITY, GENERIC_DOCS 
} from '../data/cards';

// -- TYPES --
interface Transaction {
    id: number;
    merchant: string;
    category: string;
    categoryIcon: React.ReactNode;
    amount: number;
    date: string;
    type: 'debit' | 'credit';
    status: 'completed' | 'pending' | 'failed';
}

// -- MOCK DATA --
const mockCard = {
    cardNumber: '4539 •••• •••• 7821',
    cardHolder: 'Rahul Sharma',
    expiryDate: '09/28',
    network: 'VISA',
    cardType: 'Gold Rewards',
    creditLimit: 200000,
    usedLimit: 67850,
    availableLimit: 132150,
    rewardPoints: 8420,
};

const mockBill = {
    totalDue: 67850,
    minimumDue: 3393,
    dueDate: '2026-04-10',
    lastPaymentAmount: 45000,
    lastPaymentDate: '2026-03-05',
    statementDate: '2026-03-25',
};

const mockTransactions: Transaction[] = [
    { id: 1, merchant: 'Swiggy', category: 'Food & Dining', categoryIcon: <Utensils size={14} />, amount: 680, date: '2026-03-27', type: 'debit', status: 'completed' },
    { id: 2, merchant: 'Amazon India', category: 'Shopping', categoryIcon: <ShoppingBag size={14} />, amount: 4299, date: '2026-03-26', type: 'debit', status: 'completed' },
    { id: 3, merchant: 'Reward Cashback', category: 'Rewards', categoryIcon: <Gift size={14} />, amount: 210, date: '2026-03-25', type: 'credit', status: 'completed' },
    { id: 4, merchant: 'BPCL Fuel Station', category: 'Fuel', categoryIcon: <Fuel size={14} />, amount: 3400, date: '2026-03-24', type: 'debit', status: 'completed' },
    { id: 5, merchant: 'Netflix', category: 'Entertainment', categoryIcon: <Wifi size={14} />, amount: 649, date: '2026-03-23', type: 'debit', status: 'completed' },
    { id: 6, merchant: 'IndiGo Airlines', category: 'Travel', categoryIcon: <Plane size={14} />, amount: 12450, date: '2026-03-22', type: 'debit', status: 'pending' },
    { id: 7, merchant: 'Electricity Bill', category: 'Utilities', categoryIcon: <Zap size={14} />, amount: 1870, date: '2026-03-21', type: 'debit', status: 'completed' },
    { id: 8, merchant: 'Payment Received', category: 'Payment', categoryIcon: <CheckCircle2 size={14} />, amount: 45000, date: '2026-03-05', type: 'credit', status: 'completed' },
];

const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const daysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

// -- CREDIT CARD VISUAL --
function CreditCardVisual({ masked }: { masked: boolean }) {
    const usedPercent = (mockCard.usedLimit / mockCard.creditLimit) * 100;
    return (
        <div
            className="relative w-full max-w-sm mx-auto rounded-3xl p-5 md:p-6 overflow-hidden shadow-2xl"
            style={{
                background: 'linear-gradient(135deg, #1a3a6b 0%, #2076C7 45%, #1CADA3 100%)',
                minHeight: '170px',
            }}
        >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/5" />

            {/* Network & Type */}
            <div className="relative flex justify-between items-start">
                <div>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em]">{mockCard.cardType}</p>
                    <p className="text-white/90 text-[10px] font-semibold mt-0.5">Infinity Arth</p>
                </div>
                <p className="text-white font-black text-lg italic">{mockCard.network}</p>
            </div>

            {/* Chip */}
            <div className="mt-5 mb-4">
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-200/30 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5 w-5">
                        <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                        <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                        <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                        <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                    </div>
                </div>
            </div>

            {/* Card Number */}
            <p className="text-white font-mono tracking-widest text-sm font-semibold mb-3">
                {masked ? mockCard.cardNumber : '4539 2184 7619 7821'}
            </p>

            {/* Holder & Expiry */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">Card Holder</p>
                    <p className="text-white text-xs font-bold uppercase tracking-wide">{mockCard.cardHolder}</p>
                </div>
                <div className="text-right">
                    <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">Expires</p>
                    <p className="text-white text-xs font-bold">{mockCard.expiryDate}</p>
                </div>
            </div>

            {/* Utilization bar */}
            <div className="mt-4">
                <div className="h-0.5 w-full bg-white/10 rounded-full">
                    <div
                        className="h-0.5 rounded-full bg-white/60"
                        style={{ width: `${usedPercent}%` }}
                    />
                </div>
                <p className="text-white/50 text-[8px] font-bold uppercase tracking-widest mt-1">
                    {usedPercent.toFixed(0)}% utilized
                </p>
            </div>
        </div>
    );
}

export default function CardTypesSection({ 
    onApplyClick, 
    onContactClick,
    topContent,
    isDashboard = false,
    showOnlyLive = false
}: { 
    onApplyClick?: (title: string) => void; 
    onContactClick?: () => void;
    topContent?: React.ReactNode; 
    isDashboard?: boolean;
    showOnlyLive?: boolean;
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [activeDetailsTab, setActiveDetailsTab] = useState<Record<number, 'features' | 'eligibility' | 'docs'>>({});
    const [selectedCompare, setSelectedCompare] = useState<number[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'default' | 'fee-asc' | 'fee-desc' | 'name-asc' | 'name-desc'>('default');
    const scrollerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    // Dashboard-specific state
    const [activeTab, setActiveTab] = useState<'cards' | 'summary'>('cards');
    const [maskedCard, setMaskedCard] = useState(true);
    const [hasActiveCard, setHasActiveCard] = useState(false); // New state for dynamic data

    const { toggleWishlist, isInWishlist } = useWishlist();
    const { openLogin, openApplyNow } = useModal();

    // -- DYNAMIC DATA --
    const currentCard = hasActiveCard ? mockCard : {
        cardNumber: '•••• •••• •••• ••••',
        cardHolder: 'YOUR NAME',
        expiryDate: 'MM/YY',
        network: 'NETWORK',
        cardType: 'Inactive Card',
        creditLimit: 0,
        usedLimit: 0,
        availableLimit: 0,
        rewardPoints: 0,
    };

    const currentBill = hasActiveCard ? mockBill : {
        totalDue: 0,
        minimumDue: 0,
        dueDate: '-',
        lastPaymentAmount: 0,
        lastPaymentDate: '-',
        statementDate: '-',
    };

    const currentTransactions = hasActiveCard ? mockTransactions : [];

    const handleToggleWishlist = (card: any) => {
        const wishlistId = `cc-${card.id}`;
        toggleWishlist({
            id: wishlistId,
            category: 'credit-card',
            name: card.title,
            logo: card.image || '',
            addedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            keyMetrics: {
                amount: card.joiningFee,
                rate: card.annualFee,
                tenure: card.bank,
                risk: 'Low'
            }
        });
        if (!isInWishlist(wishlistId)) {
            toast.success("Added to saved cards");
        }
    };

    // addToCart logic removed in favor of Apply Now flow

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

    // Helper to parse fee strings like '₹499', '₹12,500', 'Zero', 'Nil', 'Lifetime Free'
    const parseFee = (fee: string): number => {
        if (!fee || /zero|nil|free|lifetime/i.test(fee)) return 0;
        const num = parseInt(fee.replace(/[^0-9]/g, ''), 10);
        return isNaN(num) ? 0 : num;
    };

    const filteredCards = useMemo(() => {
        const filtered = cardTypes.filter(card => {
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
                if (c === 'metal' && (searchStr.includes('metal') || card.title.toLowerCase().includes('metal') || card.tags.some(t => t.toLowerCase() === 'metal'))) return true;
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

        // Apply sorting
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'fee-asc': return parseFee(a.joiningFee) - parseFee(b.joiningFee);
                case 'fee-desc': return parseFee(b.joiningFee) - parseFee(a.joiningFee);
                case 'name-asc': return a.title.localeCompare(b.title);
                case 'name-desc': return b.title.localeCompare(a.title);
                default: return 0;
            }
        });
    }, [searchQuery, selectedBanks, selectedCategories, sortBy]);

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

    const handleContactClick = () => {
        if (onContactClick) {
            onContactClick();
        } else {
            openApplyNow('Credit Card Support', isDashboard);
        }
    };

    const handleApplyClick = (title: string) => {
        if (onApplyClick) {
            onApplyClick(title);
        } else {
            openApplyNow(title, isDashboard);
        }
    };

    // -- QUICK ACTIONS (Summary Tab) --
    const quickActions = [
        { label: 'Pay Bill', icon: <Wallet size={18} />, color: 'bg-[#2076C7] text-white', action: () => {} },
        { label: 'Block Card', icon: <Ban size={18} />, color: 'bg-red-50 text-red-600 border border-red-100', action: () => {} },
        { label: 'Set Limit', icon: <Shield size={18} />, color: 'bg-slate-50 text-slate-600 border border-slate-100', action: () => {} },
        { label: 'Statements', icon: <FileText size={18} />, color: 'bg-slate-50 text-slate-600 border border-slate-100', action: () => {} },
        { label: 'Rewards', icon: <Gift size={18} />, color: 'bg-blue-50 text-blue-600 border border-blue-100', action: () => {} },
        { label: 'Support', icon: <Phone size={18} />, color: 'bg-slate-50 text-slate-600 border border-slate-100', action: () => { openApplyNow('Credit Card Support', isDashboard); } },
    ];

    const daysLeft = daysUntil(mockBill.dueDate);
    const usedPercent = (mockCard.usedLimit / mockCard.creditLimit) * 100;

    return (
        <section className={` rounded-tl-[2rem] rounded-tr-[2rem] md:rounded-none ${isDashboard ? 'py-2' : topContent ? 'py-16 lg:py-24 pt-8 lg:pt-12' : 'py-16 lg:py-24'}`}>
                <div className="flex-1 p-4 sm:p-6">
                
                {topContent}

                {/* Header — dynamic per tab (Dashboard only) */}
                {isDashboard && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100/60"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                                            {activeTab === 'cards' ? 'Popular Credit Cards' : 'Your Card Dashboard'}
                                        </h2>
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 whitespace-nowrap">
                                            {cardTypes.length} Cards
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 flex items-center gap-2">
                                        <FileText size={14} className="text-[#2076C7]" />
                                        {activeTab === 'cards' ? 'Scout through some of the best hand-picked credit card offers' : 'View your card details and recent transactions'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex pb-2 md:pb-0 w-full sm:w-auto mt-2 sm:mt-0 overflow-x-auto hide-scrollbar sm:overflow-visible">
                                <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                                    <button
                                        onClick={() => setActiveTab('cards')}
                                        className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'cards' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {activeTab === 'cards' && (
                                            <motion.div
                                                layoutId="ccActiveTab"
                                                className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <CreditCard size={14} />
                                        Cards
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('summary')}
                                        className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${activeTab === 'summary' ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {activeTab === 'summary' && (
                                            <motion.div
                                                layoutId="ccActiveTab"
                                                className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <Info size={14} />
                                        Summary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                {(!isDashboard || activeTab === 'cards') && (
                <motion.div
                    key="cards-tab"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >

                {/* Header & Horizontal Categories */}
                <div className="mb-12">
                    {/* Header only visible for non-dashboard (public page) */}
                    {!isDashboard && (
                        <div className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                                Popular Credit Card Offers
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed mb-10">
                                Scout through some of the best hand-picked credit card offers.
                            </p>
                        </div>
                    )}
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
                                className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white border border-slate-200 rounded-2xl shadow-sm"
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

                {/* Sort By Row */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 mb-6 flex items-center gap-3 w-fit ml-auto">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Sort By:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="appearance-none bg-white border border-blue-200 text-slate-700 text-xs font-black rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/20 focus:border-[#2076C7] transition-all shadow-sm cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232076C7' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                    >
                        <option value="default">Default</option>
                        <option value="fee-asc">Fee: Low → High</option>
                        <option value="fee-desc">Fee: High → Low</option>
                        <option value="name-asc">Name: A → Z</option>
                        <option value="name-desc">Name: Z → A</option>
                    </select>
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
                                onClick={handleContactClick}
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
                                        className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden group"
                                    >
                                        <div className="flex flex-col lg:flex-row items-stretch">
                                            {/* Left Image Fully Filling the Area */}
                                            <div className="w-full lg:w-[18rem] shrink-0 relative bg-white overflow-hidden p-3 md:p-4 flex items-center justify-center">
                                                {card.featured && (
                                                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm z-20">Featured</div>
                                                )}
                                                {isDashboard && (
                                                    <button 
                                                        onClick={() => handleToggleWishlist(card)}
                                                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all z-20 text-slate-400 hover:text-red-500"
                                                    >
                                                        <IconBookmark size={18} className={isInWishlist(`cc-${card.id}`) ? 'fill-red-500 text-red-500' : ''} />
                                                    </button>
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
                                                        onClick={() => handleApplyClick(card.title)}
                                                        className="w-full py-3 md:py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                                    >
                                                        APPLY NOW
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
                    onApply={handleApplyClick}
                />

                </motion.div>
                )}

                {/* ====== SUMMARY TAB (Dashboard Only) ====== */}
                {(isDashboard && activeTab === 'summary') && (
                    <motion.div
                        key="summary-tab"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!hasActiveCard && (
                            <div className="mb-8 p-5 md:p-8 bg-blue-50 border border-blue-100 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 hidden md:block">
                                    <CreditCard size={120} />
                                </div>
                                <div className="relative z-10 text-center md:text-left">
                                    <h4 className="text-lg md:text-xl font-black text-blue-900 mb-2">Ready to start spending?</h4>
                                    <p className="text-[11px] md:text-sm font-bold text-blue-700 max-w-md">Apply for a credit card today and enjoy premium rewards, cashback, and exclusive lounge access.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
                                    <button 
                                        onClick={() => setActiveTab('cards')}
                                        className="px-8 py-3.5 md:py-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:from-[#1a65ac] hover:to-[#17968e] transition-all active:scale-95"
                                    >
                                        Explore Cards
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                            {/* LEFT COLUMN — Card + Quick Actions */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Card Visual */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                    <div
                                        className="relative w-full max-w-sm mx-auto rounded-3xl p-5 md:p-6 overflow-hidden shadow-2xl transition-all duration-500"
                                        style={{
                                            background: hasActiveCard 
                                                ? 'linear-gradient(135deg, #1a3a6b 0%, #2076C7 45%, #1CADA3 100%)'
                                                : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                                            minHeight: '170px',
                                        }}
                                    >
                                        {/* Decorative circles */}
                                        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                                        <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/10" />

                                        {/* Network & Type */}
                                        <div className="relative flex justify-between items-start">
                                            <div>
                                                <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${hasActiveCard ? 'text-white/60' : 'text-slate-400'}`}>{currentCard.cardType}</p>
                                                <p className={`text-[10px] font-semibold mt-0.5 ${hasActiveCard ? 'text-white/90' : 'text-slate-500'}`}>Infinity Arth</p>
                                            </div>
                                            <p className={`font-black text-lg italic ${hasActiveCard ? 'text-white' : 'text-slate-300'}`}>{currentCard.network}</p>
                                        </div>

                                        {/* Chip */}
                                        <div className="mt-5 mb-4 opacity-50 grayscale">
                                            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-200/30 flex items-center justify-center">
                                                <div className="grid grid-cols-2 gap-0.5 w-5">
                                                    <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                                                    <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                                                    <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                                                    <div className="h-1.5 bg-yellow-700/40 rounded-sm" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Number */}
                                        <p className={`font-mono tracking-widest text-sm font-semibold mb-3 ${hasActiveCard ? 'text-white' : 'text-slate-400'}`}>
                                            {maskedCard ? currentCard.cardNumber : (hasActiveCard ? '4539 2184 7619 7821' : '•••• •••• •••• ••••')}
                                        </p>

                                        {/* Holder & Expiry */}
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className={`text-[9px] uppercase tracking-widest font-bold ${hasActiveCard ? 'text-white/50' : 'text-slate-400'}`}>Card Holder</p>
                                                <p className={`text-xs font-bold uppercase tracking-wide ${hasActiveCard ? 'text-white' : 'text-slate-600'}`}>{currentCard.cardHolder}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-[9px] uppercase tracking-widest font-bold ${hasActiveCard ? 'text-white/50' : 'text-slate-400'}`}>Expires</p>
                                                <p className={`text-xs font-bold ${hasActiveCard ? 'text-white' : 'text-slate-600'}`}>{currentCard.expiryDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {hasActiveCard && (
                                        <button
                                            onClick={() => setMaskedCard(!maskedCard)}
                                            className="w-full mt-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                        >
                                            {maskedCard ? <Eye size={12} /> : <EyeOff size={12} />}
                                            {maskedCard ? 'Show Card Number' : 'Hide Card Number'}
                                        </button>
                                    )}
                                </motion.div>

                                {/* Credit Utilization */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                                >
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Credit Utilization</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium text-xs">Total Limit</span>
                                            <span className="font-black text-slate-800">{formatCurrency(currentCard.creditLimit)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium text-xs">Used</span>
                                            <span className="font-black text-red-500">{formatCurrency(currentCard.usedLimit)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium text-xs">Available</span>
                                            <span className="font-black text-emerald-600">{formatCurrency(currentCard.availableLimit)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                                            <span>Utilization</span>
                                            <span className={usedPercent > 70 ? 'text-red-500' : 'text-emerald-600'}>
                                                {hasActiveCard ? `${usedPercent.toFixed(0)}%` : '0%'}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: hasActiveCard ? `${usedPercent}%` : 0 }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                className={`h-2 rounded-full ${usedPercent > 70 ? 'bg-red-400' : usedPercent > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Quick Actions */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
                                >
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {quickActions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={hasActiveCard ? action.action : () => toast.error("Please link your card first")}
                                                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl text-center transition-all hover:scale-105 active:scale-95 cursor-pointer 
                                                    ${hasActiveCard ? action.color : 'bg-slate-50 text-slate-300 border border-slate-100'}`}
                                            >
                                                {action.icon}
                                                <span className="text-[9px] font-black uppercase tracking-widest leading-tight">{action.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* RIGHT COLUMN — Bill + Transactions */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Bill Summary */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                                >
                                    <div className="px-5 md:px-6 py-4 md:py-5 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 border-b border-slate-100">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Bill Summary</h3>
                                    </div>
                                    <div className="p-5 md:p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Due</p>
                                                <p className="text-xl font-black text-slate-800">{formatCurrency(currentBill.totalDue)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Minimum Due</p>
                                                <p className="text-xl font-black text-[#2076C7]">{formatCurrency(currentBill.minimumDue)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Due Date</p>
                                                <p className="text-lg font-black text-slate-800">{hasActiveCard ? formatDate(currentBill.dueDate) : '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Statement Date</p>
                                                <p className="text-lg font-black text-slate-800">{hasActiveCard ? formatDate(currentBill.statementDate) : '-'}</p>
                                            </div>
                                        </div>

                                        {hasActiveCard ? (
                                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                                                <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs font-black text-emerald-800">Last payment of {formatCurrency(currentBill.lastPaymentAmount)} received on {formatDate(currentBill.lastPaymentDate)}</p>
                                                    <p className="text-[9px] text-emerald-600 font-bold mt-0.5 uppercase tracking-widest">No overdue amount</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                                                <Info size={18} className="text-slate-400 flex-shrink-0" />
                                                <p className="text-xs font-bold text-slate-500 italic">No billing history available.</p>
                                            </div>
                                        )}

                                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                            <button 
                                                disabled={!hasActiveCard}
                                                className={`flex-1 py-3 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-opacity shadow-md cursor-pointer 
                                                    ${hasActiveCard ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90' : 'bg-slate-300 cursor-not-allowed opacity-50'}`}
                                            >
                                                Pay Total Due
                                            </button>
                                            <button 
                                                disabled={!hasActiveCard}
                                                className={`flex-1 py-3 border text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer 
                                                    ${hasActiveCard ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : 'bg-white border-slate-100 text-slate-200 cursor-not-allowed'}`}
                                            >
                                                Pay Minimum
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Transaction History */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                                >
                                    <div className="px-5 md:px-6 py-4 md:py-5 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Transactions</h3>
                                        {hasActiveCard && (
                                            <button className="text-[9px] font-black text-[#2076C7] uppercase tracking-widest flex items-center gap-1 hover:opacity-75 transition-opacity cursor-pointer">
                                                View All <ChevronRight size={10} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="divide-y divide-slate-50 min-h-[200px] flex flex-col">
                                        {currentTransactions.length > 0 ? (
                                            currentTransactions.map((txn, i) => (
                                                <motion.div
                                                    key={txn.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.05 * i }}
                                                    className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-4 hover:bg-slate-50/50 transition-colors"
                                                >
                                                    {/* Icon */}
                                                    <div className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-white font-bold
                                                        ${txn.type === 'credit' ? 'bg-emerald-500' : txn.category === 'Travel' ? 'bg-[#2076C7]' : txn.category === 'Food & Dining' ? 'bg-orange-400' : txn.category === 'Fuel' ? 'bg-amber-500' : txn.category === 'Entertainment' ? 'bg-purple-500' : 'bg-slate-400'}`}
                                                    >
                                                        {txn.categoryIcon}
                                                    </div>
                                                    {/* Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-black text-slate-800 truncate">{txn.merchant}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{txn.category}</p>
                                                            {txn.status === 'pending' && (
                                                                <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">Pending</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Amount + Date */}
                                                    <div className="text-right flex-shrink-0">
                                                        <p className={`text-sm font-black ${txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                            {txn.type === 'credit' ? '+' : '−'} {formatCurrency(txn.amount)}
                                                        </p>
                                                        <p className="text-[9px] font-bold text-slate-400 mt-0.5">
                                                            {new Date(txn.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                    <ShoppingBag size={24} className="text-slate-300" />
                                                </div>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">No Transactions</p>
                                                <p className="text-[10px] font-bold text-slate-300 max-w-[150px]">Your transactions will appear here once you start using your card.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>



            </div>
        </section>
    );
}