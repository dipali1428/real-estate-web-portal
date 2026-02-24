'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModal } from "../../context/ModalContext";
import {
    ShoppingCart, HandCoins, Activity,
    X, CheckCircle, ArrowUp, User, Mail, 
    Phone, Package, TrendingUp, Shield,
    Building, Scale, Clock, Award, HelpCircle,
    ChevronDown, ChevronUp, Loader2,
    Newspaper
} from 'lucide-react';
import { createEnquiry, EnquiryPayload, fetchAllShares } from '../../services/unlistedservices';

interface Company {
    id: number;
    name: string;
    sector: string;
    price: number;
    min_lot_size: number;
    available_shares: number;
    logo_url?: string;
    depository_applicable?: string;
}

const safeNumber = (val: any, def = 0) => 
    val === null || val === undefined ? def : 
    typeof val === 'number' ? val : 
    isNaN(parseFloat(val)) ? def : parseFloat(val);

const formatPrice = (price: number) => 
    price ? `₹${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'N/A';

const getSector = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('tech')) return 'Technology';
    if (n.includes('finance') || n.includes('bank') || n.includes('securities')) return 'Financial Services';
    if (n.includes('health') || n.includes('hospital')) return 'Healthcare';
    if (n.includes('auto') || n.includes('motor')) return 'Automotive';
    if (n.includes('food') || n.includes('beverage')) return 'Food & Beverage';
    if (n.includes('energy') || n.includes('power')) return 'Energy';
    if (n.includes('consumer') || n.includes('electronics')) return 'Consumer Goods';
    if (n.includes('exchange') || n.includes('nse')) return 'Stock Exchange';
    return 'General';
};

const getLotSize = (price: number) => {
    if (price >= 10000) return 1;
    if (price >= 5000) return 2;
    if (price >= 1000) return 5;
    if (price >= 500) return 10;
    if (price >= 100) return 50;
    if (price >= 50) return 100;
    if (price >= 10) return 500;
    return 1000;
};

const Home = () => {
    const { openPartner } = useModal();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enquiryCompany, setEnquiryCompany] = useState<Company | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [enquiryError, setEnquiryError] = useState<string | null>(null);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', quantity: '', message: '' });
    
    // NEW: Scroll to top state
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Typing animation states
    const [displayedText, setDisplayedText] = useState('');
    const fullHeading = "India's Premier Platform for Unlisted Shares & Pre-IPO Investments";
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Typing animation effect
    useEffect(() => {
        const hasVisited = localStorage.getItem("homeHeroVisited");

        if (hasVisited) {
            setDisplayedText(fullHeading);
            setIsTypingComplete(true);
            return;
        }

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullHeading.length) {
                setDisplayedText(fullHeading.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                localStorage.setItem("homeHeroVisited", "true");
                clearInterval(typingInterval);
            }
        }, 60);

        return () => clearInterval(typingInterval);
    }, []);

    //Scroll to Top button
    useEffect(() => {
        const handleScroll = () => {
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                const faqPosition = faqSection.offsetTop;
                // Show button when user scrolls near the FAQ section
                if (window.scrollY > faqPosition - 400) {
                    setShowScrollTop(true);
                } else {
                    setShowScrollTop(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                setLoading(true);
                const res = await fetchAllShares();
                const data = Array.isArray(res) ? res : res?.data || res?.shares || [];
                
                const sortedData = [...data].sort((a, b) => {
                    const idA = safeNumber(a.id || a.share_id);
                    const idB = safeNumber(b.id || b.share_id);
                    return idA - idB;
                });
                
                const mapped = sortedData.slice(0, 3).map((item: any) => {
                    const price = safeNumber(item.price);
                    return {
                        id: safeNumber(item.id || item.share_id),
                        name: item.shares_name || item.name || 'Unnamed Company',
                        sector: getSector(item.shares_name || item.name || ''),
                        price,
                        min_lot_size: getLotSize(price),
                        available_shares: 10000,
                        logo_url: item.logo_url,
                        depository_applicable: item.depository_applicable
                    };
                }).filter((c: Company) => c.id > 0 && c.name !== 'Unnamed Company' && c.price > 0);
                
                setCompanies(mapped);
                if (!mapped.length) setError('No companies available');
            } catch {
                setError('Failed to load companies');
            } finally {
                setLoading(false);
            }
        };
        loadCompanies();
    }, []);

    const handleEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length !== 10) return setEnquiryError('Enter 10-digit mobile number');
        if (!enquiryCompany) return;
        
        setIsSubmitting(true);
        try {
            await createEnquiry({
                company_id: enquiryCompany.id,
                company_name: enquiryCompany.name,
                enquiry_type: 'buy',
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                quantity: parseInt(formData.quantity) || enquiryCompany.min_lot_size,
                message: formData.message || `Enquiry for ${enquiryCompany.name}`
            });
            setShowSuccess(true);
            setEnquiryCompany(null);
            setFormData({ fullName: '', email: '', phone: '', quantity: '', message: '' });
        } catch {
            setEnquiryError('Failed to submit. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqs = [
        { 
            q: 'What exactly are unlisted shares?', 
            a: 'Unlisted shares are equity shares of companies that are not listed on any recognized stock exchange like NSE or BSE. These shares are traded privately between buyers and sellers through authorized intermediaries.'
        },
        { 
            q: 'Are unlisted shares legal in India?', 
            a: 'Yes, buying and selling unlisted shares is completely legal in India through off-market transactions. All transactions are conducted through SEBI-registered intermediaries with proper documentation, including transfer deeds and Demat account transfers.'
        },
        { 
            q: 'Do I need a Demat account to buy unlisted shares?', 
            a: 'Yes, a valid Demat account is mandatory to hold unlisted shares. The shares are transferred via off-market transfer from the seller\'s Demat account to your Demat account. If you don\'t have a Demat account, we can help you open one.'
        },
        { 
            q: 'What is the minimum investment amount?', 
            a: 'The minimum investment varies by company and depends on the lot size. Some shares have minimum lot requirements ranging from 10 to 5,000 shares. Our platform clearly displays the minimum lot size and the corresponding minimum investment amount for each opportunity.'
        },
        { 
            q: 'How is the price of unlisted shares determined?', 
            a: 'Prices are determined by multiple factors including: company financials and growth trajectory, recent private transaction values, demand and supply dynamics, IPO expectations and market sentiment, and peer company valuations. Prices are updated regularly based on market conditions.'
        },
        { 
            q: 'Are unlisted shares risky?', 
            a: 'Yes, they carry higher risk compared to listed shares. Key risks include: lower liquidity (may take time to find buyers), limited financial disclosures, price volatility, and no guaranteed exit timeline. These are suitable for investors with high-risk appetite and long-term investment horizon.'
        },
        { 
            q: 'What is the tax treatment for unlisted shares?', 
            a: 'For short-term capital gains (STCG) - sold within 24 months, gains are taxed as per your income tax slab. For long-term capital gains (LTCG) - held for over 24 months, gains are taxed at 20% with indexation benefits. Always consult your tax advisor for personalized advice.'
        },
        { 
            q: 'What happens if the company launches an IPO?', 
            a: 'Your unlisted shares will be converted into listed shares after the IPO listing. However, pre-IPO shareholders typically have a 6-month lock-in period post-listing before they can sell their shares. This can potentially lead to significant gains if the IPO prices higher.'
        },
        { 
            q: 'How long does the share transfer take?', 
            a: 'The off-market transfer typically takes 24-72 working hours after payment confirmation. Once transferred, the shares will reflect in your Demat account. You will receive email and SMS updates at each stage of the process.'
        },
        { 
            q: 'Is KYC verification required?', 
            a: 'Yes, PAN card, Aadhaar, and Demat account details are mandatory for compliance with SEBI regulations. We follow strict KYC norms to ensure secure transactions and prevent fraud. The verification process usually takes 24 hours.'
        },
        { 
            q: 'Can I sell my unlisted shares anytime?', 
            a: 'You can sell your unlisted shares through our platform, but liquidity depends on finding a buyer. Unlike listed shares, you cannot sell instantly. We maintain a network of verified buyers to help facilitate transactions when you want to exit.'
        },
        { 
            q: 'What documents are needed for buying?', 
            a: 'You need: 1) PAN Card, 2) Aadhaar Card proof, 3) Demat account details, 4) Bank account proof for payment, 5) Recent photograph. All documents are uploaded securely on our platform.'
        },
        { 
            q: 'How is my money protected?', 
            a: 'We use secure payment channels and follow a verified process. Funds are transferred only after all documentation is complete. All transactions are recorded and can be tracked. We also provide a clear audit trail for every transaction.'
        }
    ];

    const benefits = [
        { icon: TrendingUp, title: 'High Return Potential', desc: 'Higher returns vs listed equities, especially post-IPO.' },
        { icon: Shield, title: 'Early Entry Advantage', desc: 'Invest before public listing at lower valuations.' },
        { icon: Building, title: 'Access to Unicorns', desc: 'Exclusive access to fast-growing pre-IPO companies.' },
        { icon: Scale, title: 'Portfolio Diversification', desc: 'Low correlation with public markets.' },
        { icon: Clock, title: 'Long-term Wealth', desc: 'Participate in growth stories of emerging leaders.' },
        { icon: Award, title: 'Pre-IPO Allocation', desc: 'Secure allocation before public issue.' }
    ];

    return (
        <div className="min-h-screen text-gray-900 bg-gradient-to-br from-[#b5d9f3] via-white to-[#ecf5ec]">
            
            {/* Scroll to Top Arrow */}
            {showScrollTop && (
                <button 
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-[100] p-2 bg-[#2076C7] text-white rounded-full shadow-lg hover:bg-[#1a5fa1] transition-all duration-300 flex items-center justify-center animate-in fade-in zoom-in"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} strokeWidth={3} />
                </button>
            )}

            {/* Hero Section with Typing Animation */}
            <section className="pt-24 pb-20 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 min-h-[120px] md:min-h-[160px] flex items-center justify-center leading-tight">
                    <span className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        {displayedText}
                    </span>
                    <span 
                        className="inline-block w-1 h-12 md:h-16 ml-1"
                        style={{
                            background: 'linear-gradient(to bottom, #2076C7, #1CADA3)',
                            animation: isTypingComplete ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'blink 1s infinite'
                        }}
                    ></span>
                </h1>
                
                <style jsx>{`
                    @keyframes blink {
                        0%, 49% { opacity: 1; }
                        50%, 100% { opacity: 0; }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.3; }
                    }
                `}</style>
                
                <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-8" />
                <p className="text-xl max-w-4xl mx-auto mb-12 text-gray-700">
                    Access exclusive investment opportunities in unlisted companies with expert research and trading tools.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        { href: '/products/unlisted/buy-shares', icon: ShoppingCart, label: 'Buy Shares' },
                        { href: '/products/unlisted/sell-shares', icon: HandCoins, label: 'Sell Shares' },
                        { href: '/products/unlisted/live-trends', icon: Activity, label: 'Live Trends' },
                        { href: '/products/unlisted/presspage', icon: Newspaper, label: 'Press & Media' }
                    ].map(({ href, icon: Icon, label }) => (
                        <Link key={href} href={href} className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <Icon size={20} /> {label}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Companies */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Featured Opportunities
                    </h3>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 size={48} className="text-[#2076C7] animate-spin" /></div>
                ) : error || !companies.length ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 max-w-2xl mx-auto text-center">
                        <p className="text-amber-700">{error || 'No companies available'}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-3 bg-amber-600 text-white rounded-xl font-bold">Refresh</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {companies.map((c) => {
                            const price = safeNumber(c.price);
                            const lot = safeNumber(c.min_lot_size, getLotSize(price));
                            return (
                                <div key={c.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-gray-50">
                                    <div className="h-56 bg-gray-50 flex items-center justify-center p-8 relative">
                                        <img 
                                            src={c.logo_url || `https://placehold.co/200x150/2076C7/white?text=${c.name.split(' ')[0]}`}
                                            alt={c.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                                            onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/200x150/1CADA3/white?text=Company'}
                                        />
                                        <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-[10px] font-black text-[#2076C7]">
                                            {c.sector}
                                        </span>
                                        {c.depository_applicable?.includes('NSDL') && (
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black">
                                                NSDL
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <h4 className="text-xl font-black text-gray-800 mb-6">{c.name}</h4>
                                        <div className="flex justify-between items-end mb-8">
                                            <div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Price/Share</div>
                                                <div className="text-3xl font-black text-[#2076C7]">{formatPrice(price)}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Min. Lot</div>
                                                <div className="font-bold text-gray-700">{lot.toLocaleString()} Shares</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-xs text-gray-500">
                                                <span className="font-bold text-gray-700">10,000+</span> available
                                            </span>
                                            <span className="text-xs font-bold text-[#1CADA3] bg-emerald-50 px-3 py-1 rounded-full">
                                                Min: ₹{(price * lot).toLocaleString()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEnquiryCompany(c);
                                                setFormData(prev => ({ ...prev, quantity: lot.toString() }));
                                            }}
                                            className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Enquire Now
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="text-center mt-12">
                    <Link href="/products/unlisted/buy-shares" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2076C7] font-bold rounded-2xl shadow-lg border-2 border-[#2076C7]/20 hover:border-[#2076C7]/40 group">
                        View All 150+ Companies <ArrowUp size={18} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                        Why Invest in Unlisted Shares?
                    </h3>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-50 group cursor-pointer" onClick={() => setActiveBenefit(activeBenefit === i ? null : i)}>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon size={32} className="text-[#2076C7]" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{b.title}</h4>
                                <p className="text-gray-600">{b.desc}</p>
                                {activeBenefit === i && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Link href="/products/unlisted/buy-shares" className="text-[#1CADA3] font-semibold flex items-center gap-1 text-sm group">
                                            Explore <ArrowUp size={14} className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* FAQ - Enhanced with more detailed answers */}
            <section id="faq" className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <HelpCircle size={40} className="text-[#2076C7] mx-auto mb-4" />
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full" />
                        <p className="text-gray-600 mt-4">Everything you need to know about investing in unlisted shares</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                                <div className="flex justify-between items-center p-6 cursor-pointer" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                                    <h3 className="text-lg font-bold text-gray-800 pr-8">{faq.q}</h3>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                        activeFaq === i ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>
                                {activeFaq === i && (
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-10 md:p-20 text-white text-center shadow-2xl relative overflow-hidden">
                    <h3 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Ready to Start Your Unlisted Shares Journey?</h3>
                    <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">Join 8,450+ investors who trust UnlistedShares.</p>
                    <button onClick={openPartner} className="px-10 py-4 bg-white text-[#2076C7] font-black rounded-2xl shadow-xl hover:scale-105 transition-all">
                        Create Free Account
                    </button>
                </div>
            </section>

            {/* Enquiry Modal */}
            {enquiryCompany && (
                <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between">
                            <div>
                                <h2 className="text-2xl font-black">Enquire for Shares</h2>
                                <p className="text-xs font-bold opacity-90 mt-1 uppercase">{enquiryCompany.name}</p>
                            </div>
                            <button onClick={() => setEnquiryCompany(null)}><X size={24} /></button>
                        </div>
                        {enquiryError && (
                            <div className="mx-8 mt-6 p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-xs text-red-600 font-medium flex items-center gap-2"><X size={14} /> {enquiryError}</p>
                            </div>
                        )}
                        <form onSubmit={handleEnquiry} className="p-8 space-y-5">
                            {['fullName', 'email', 'phone'].map((field) => (
                                <div key={field}>
                                    <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">
                                        {field === 'fullName' ? 'Full Name' : field === 'email' ? 'Email' : 'Phone'} *
                                    </label>
                                    <div className="relative">
                                        {field === 'fullName' && <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                                        {field === 'email' && <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                                        {field === 'phone' && <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                                        <input
                                            required
                                            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                            value={formData[field as keyof typeof formData]}
                                            onChange={(e) => {
                                                let val = e.target.value;
                                                if (field === 'phone') val = val.replace(/\D/g, '').slice(0, 10);
                                                setFormData({ ...formData, [field]: val });
                                            }}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none"
                                            placeholder={field === 'fullName' ? 'John Doe' : field === 'email' ? 'john@email.com' : '9876543210'}
                                        />
                                    </div>
                                    {field === 'phone' && formData.phone.length > 0 && formData.phone.length < 10 && (
                                        <p className="text-[10px] text-rose-500 mt-1 font-bold">Must be 10 digits</p>
                                    )}
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">Quantity *</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none"
                                        min={enquiryCompany.min_lot_size}
                                        step={enquiryCompany.min_lot_size}
                                        required
                                    />
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1">Min lot: {enquiryCompany.min_lot_size.toLocaleString()} shares</p>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:opacity-95 disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : 'Confirm Interest'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-10 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Request Submitted</h2>
                        <p className="text-gray-600 mb-8">Our relationship manager will contact you shortly.</p>
                        <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black">
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;