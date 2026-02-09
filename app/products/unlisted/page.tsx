'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useModal } from "../../context/ModalContext";
import {
    Building2,
    ShoppingCart,
    HandCoins,
    Handshake,
    Search,
    Activity,
    FileText,
    X,
    Check,
    CheckCircle,
    TrendingUp,
    BarChart3,
    IndianRupee,
    Smartphone,
    Calendar,
    ArrowUp,
    LucideIcon,
    Users,
    Building,
    User,
    Mail,
    Phone,
    MessageSquare,
    Package
} from 'lucide-react';

// Preview Content Types
interface PreviewContent {
    title: string;
    icon: LucideIcon;
    description: string;
    sections: { heading: string; items: string[] }[];
    stats: { label: string; value: string; trend?: 'up' | 'down' }[];
}

type PreviewType = 'analysis' | 'buy' | 'sell' | 'services' | 'research' | 'trends';

const PREVIEW_DATA: Record<string, PreviewContent> = {
    analysis: {
        title: 'Company Details & Analysis',
        icon: Building2,
        description: 'In-depth company profiles, financial analysis, shareholding patterns, and investment risks for informed decisions.',
        sections: [
            { heading: 'Financial Analysis', items: ['Company profiles & history', 'Financial performance analysis', 'Shareholding patterns', 'Risk assessment', 'Valuation metrics'] },
            { heading: 'Key Features', items: ['150+ companies with detailed profiles', 'Real-time financial data', 'Peer comparison analysis', 'Risk scoring system'] }
        ],
        stats: [
            { label: 'Companies Analyzed', value: '200+', trend: 'up' },
            { label: 'Update Frequency', value: 'Daily', trend: 'down' }
        ]
    },
    "buy-shares": {
        title: 'Buy Unlisted Shares',
        icon: ShoppingCart,
        description: 'Browse and purchase unlisted shares from 150+ companies with transparent pricing and secure transactions.',
        sections: [
            { heading: 'Available Features', items: ['150+ companies listed', 'Transparent pricing', 'Secure transactions', 'Advanced filters', 'Portfolio tracking'] },
            { heading: 'How It Works', items: ['Browse companies by sector', 'View detailed pricing', 'Complete KYC verification', 'Secure payment processing', 'Demat transfer'] }
        ],
        stats: [
            { label: 'Active Listings', value: '150+', trend: 'up' },
            { label: 'Success Rate', value: '98.7%', trend: 'up' }
        ]
    },
    "sell-shares": {
        title: 'Sell Unlisted Shares',
        icon: HandCoins,
        description: 'Liquidity solutions for your unlisted shareholdings with competitive pricing and verified buyers network.',
        sections: [
            { heading: 'Selling Features', items: ['Instant liquidity', 'Competitive pricing', 'Verified buyers', 'Quick settlement', 'Tax guidance'] },
            { heading: 'Sell Process', items: ['List your shares anonymously', 'Receive competitive bids', 'Complete documentation', 'Fast T+2 settlement'] }
        ],
        stats: [
            { label: 'Exit Speed', value: '48 Hrs' },
            { label: 'Verified Buyers', value: '450+' }
        ]
    },
    services: {
        title: 'Comprehensive Services',
        icon: Handshake,
        description: 'End-to-end investment services including portfolio management, IPO applications, and startup funding.',
        sections: [
            { heading: 'Service Offerings', items: ['Portfolio management', 'IPO applications', 'Startup funding', 'Demat services', 'Tax consultation'] },
            { heading: 'Premium Features', items: ['Dedicated relationship manager', 'Priority access to deals', 'Personalized investment strategy', 'Regular portfolio reviews'] }
        ],
        stats: [
            { label: 'Client Satisfaction', value: '94%' },
            { label: 'Services Offered', value: '25+' }
        ]
    },
    research: {
        title: 'Investment Research',
        icon: BarChart3,
        description: 'In-depth market analysis, company research reports, and investment tools for informed decision making.',
        sections: [
            { heading: 'Research Tools', items: ['Market analysis', 'Company research', 'Industry reports', 'Investment tools', 'Expert insights'] },
            { heading: 'Premium Reports', items: ['Monthly market updates', 'Sector deep dives', 'IPO analysis reports', 'Valuation models', 'Risk assessment tools'] }
        ],
        stats: [
            { label: 'Reports Published', value: '50+/month' },
            { label: 'Analyst Coverage', value: '15+' }
        ]
    },
    "live-trends": {
        title: 'Live Market Trends',
        icon: Activity,
        description: 'Real-time market data, price trends, volume analysis, and market insights for informed investment decisions.',
        sections: [
            { heading: 'Market Intelligence', items: ['Real-time price tracking', 'Market indices', 'Volume analysis', 'Top gainers/losers', 'Sector trends'] },
            { heading: 'Advanced Features', items: ['Interactive charts', 'Historical data', 'Comparative analysis', 'Price alerts', 'Market sentiment'] }
        ],
        stats: [
            { label: 'Companies Tracked', value: '200+', trend: 'up' },
            { label: 'Update Frequency', value: 'Real-time', trend: 'up' }
        ]
    }
};

const PreviewModal: React.FC<{ content: PreviewContent | null; onClose: () => void }> = ({ content, onClose }) => {
    if (!content) return null;
    const Icon = content.icon;

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-8 max-h-[90vh] flex flex-col border border-gray-100 text-gray-900 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
                            <Icon size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">{content.title}</h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Intelligence</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-8">
                        <p className="text-lg leading-relaxed pl-6 border-l-4 border-[#1CADA3] text-gray-700 italic">{content.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {content.stats.map((stat, idx) => (
                            <div key={idx} className="bg-white border-2 border-[#1CADA3] p-4 rounded-2xl shadow-sm">
                                <div className="text-[10px] uppercase font-black mb-1 tracking-widest text-[#1CADA3]">{stat.label}</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-gray-800">{stat.value}</span>
                                    {stat.trend && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                            <ArrowUp size={10} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                                            {stat.trend.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-10">
                        {content.sections.map((section, idx) => (
                            <div key={idx}>
                                <h4 className="text-sm font-black mb-6 flex items-center uppercase tracking-widest text-gray-800">
                                    <div className="w-2 h-5 mr-3 rounded-full bg-gradient-to-b from-[#2076C7] to-[#1CADA3]"></div>
                                    {section.heading}
                                </h4>
                                <ul className="grid grid-cols-1 gap-3">
                                    {section.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-center text-sm gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-300">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-sm">
                                                <Check size={12} />
                                            </div>
                                            <span className="text-gray-700 font-semibold">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <button onClick={onClose} className="px-8 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">Close Preview</button>
                </div>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showBrochureModal, setShowBrochureModal] = useState(false);
    const [activePreview, setActivePreview] = useState<PreviewType | null>(null);
    const { openPartner } = useModal();


    // Enquiry Form States (From Buy Shares Page)
    const [enquiryCompany, setEnquiryCompany] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        quantity: '5000',
        message: ''
    });

    return (
        <div className="min-h-screen text-gray-900" style={{ background: 'linear-gradient(to bottom right, #b5d9f3ff, #ffffffff, #ecf5ecff)' }}>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-20 px-6 text-center">
                <div className="container mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r min-h-16 md:min-h-20 leading-tight from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        India's Premier Platform for Unlisted Shares <br className="hidden md:block" /> & Pre-IPO Investments
                    </h1>
                    <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-8"></div>
                    <p className="text-xl max-w-4xl mx-auto mb-12 text-gray-700 font-medium leading-relaxed">
                        Access exclusive investment opportunities in unlisted companies, startup funding, and portfolio management services with expert research and trading tools.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                        <Link href="/products/unlisted/buy-shares" className="group px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <ShoppingCart size={20} /> Buy Shares
                        </Link>
                        <Link href="/products/unlisted/sell-shares" className="group px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <HandCoins size={20} /> Sell Shares
                        </Link>
                        <Link href="/products/unlisted/live-trends" className="group px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <Activity size={20} /> Live Trends
                        </Link>
                        <Link href="/products/unlisted/research" className="group px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <BarChart3 size={20} /> Research
                        </Link>
                        <Link href="/products/unlisted/services" className="group px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                            <Handshake size={20} /> Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dashboard Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Platform Dashboard</h3>
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(PREVIEW_DATA).map(([key, data]) => {
                        const Icon = data.icon;
                        return (
                            <div key={key} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white mb-8 shadow-lg">
                                    <Icon size={32} />
                                </div>
                                <h4 className="text-xl font-black text-gray-800 mb-4">{data.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">{data.description}</p>
                                <div className="space-y-3 mb-8">
                                    {data.sections[0].items.slice(0, 4).map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-xs font-bold text-gray-700">
                                            <CheckCircle className="w-4 h-4 text-[#1CADA3]" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 pt-6 border-t border-gray-50">
                                    <Link href={`/products/unlisted/${key === 'analysis' ? 'company' : key}`} className="flex-1 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-xl text-center text-sm shadow-md hover:shadow-lg transition-all uppercase tracking-tight">Open Dashboard</Link>
                                    <button onClick={() => setActivePreview(key as PreviewType)} className="px-5 py-3.5 border-2 border-gray-100 text-gray-400 font-black rounded-xl hover:border-[#2076C7] hover:text-[#2076C7] transition-all text-sm">Preview</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Featured Companies */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">Featured Opportunities</h3>
                    <div className="w-16 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { id: 1, name: 'Boat (Imagine Marketing)', sector: 'Consumer Electronics', price: 1195, lot: 5000, img: '/Logos/Boat Unlisted Shares (Image Marketing).jpg' },
                        { id: 2, name: 'HDFC Securities', sector: 'Financial Services', price: 9250, lot: 10, img: '/Logos/HDFC Securities Limited Unlisted Shares.jpg' },
                        { id: 3, name: 'NSE India', sector: 'Financial Services', price: 1925, lot: 100, img: '/Logos/NSE.avif' },
                    ].map((co, idx) => (
                        <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-50">
                            <div className="h-56 bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
                                <img src={co.img} alt={co.name} className="max-h-full max-w-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-[#2076C7] shadow-sm border border-blue-50">{co.sector}</div>
                            </div>
                            <div className="p-8">
                                <h4 className="text-xl font-black text-gray-800 mb-6">{co.name}</h4>
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price Per Share</div>
                                        <div className="text-3xl font-black text-[#2076C7]">₹{co.price.toLocaleString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Min. Lot</div>
                                        <div className="font-bold text-gray-700">{co.lot} Shares</div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {/* Changed "Buy Now" to enquiry form logic */}
                                    <button
                                        onClick={() => { setEnquiryCompany(co); setFormData(prev => ({ ...prev, quantity: co.lot.toString() })); }}
                                        className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all">
                                        Enquire Now
                                    </button>
                                    <Link href="/products/unlisted/research" className="w-14 h-14 border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#2076C7] hover:border-[#2076C7] rounded-2xl transition-all">
                                        <BarChart3 size={24} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-10 md:p-20 text-white text-center shadow-2xl relative overflow-hidden">
                    <h3 className="text-3xl md:text-5xl font-black mb-8 relative z-10">Ready to Start Your Unlisted Shares Journey?</h3>
                    <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90 relative z-10 font-medium">Join 8,450+ investors who trust UnlistedShares for secure, transparent, and profitable unlisted securities trading.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <button onClick={openPartner} className="px-10 py-4 bg-white text-[#2076C7] font-black rounded-2xl shadow-xl hover:scale-105 transition-all">Create Free Account</button>
                        <Link href="/#contact" className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/20 transition-all">Schedule Consultation</Link>
                        {/* <button onClick={() => setShowBrochureModal(true)} className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white/20 transition-all">Download Brochure</button> */}
                    </div>
                </div>
            </section>

            {/* ENQUIRY MODAL (FROM BUY SHARES PAGE) */}
            {enquiryCompany && (
                <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl my-8">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black">Enquire for Shares</h2>
                                <p className="text-xs font-bold opacity-90 mt-1 uppercase tracking-widest">{enquiryCompany.name}</p>
                            </div>
                            <button onClick={() => setEnquiryCompany(null)} className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form
                            className="p-8 space-y-5"
                            onSubmit={(e) => {
                                e.preventDefault();

                                // Validation check for 10 digits
                                if (formData.phone.length !== 10) {
                                    alert("Please enter a valid 10-digit mobile number");
                                    return;
                                }

                                setIsSubmitting(true);
                                setTimeout(() => {
                                    setIsSubmitting(false);
                                    setEnquiryCompany(null);
                                    setShowSuccess(true);
                                    // Reset form
                                    setFormData({ fullName: '', email: '', phone: '', quantity: '5000', message: '' });
                                }, 1500);
                            }}>
                            <div>
                                <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input required type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none transition-all" placeholder="John Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input required type="email" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none transition-all" placeholder="john@email.com" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        required
                                        type="tel"
                                        // Only allow numbers, and limit to 10 characters
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, ''); // Remove any non-numeric characters
                                            if (val.length <= 10) {
                                                setFormData({ ...formData, phone: val });
                                            }
                                        }}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none transition-all"
                                        placeholder="9876543210"
                                    />
                                </div>
                                {/* Visual helper for the user */}
                                {formData.phone.length > 0 && formData.phone.length < 10 && (
                                    <p className="text-[10px] text-rose-500 mt-1 font-bold">Must be 10 digits</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest">Investment Quantity *</label>
                                <div className="relative">
                                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2076C7] outline-none transition-all" />
                                </div>
                            </div>

                            <button disabled={isSubmitting} className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:opacity-95 transform active:scale-95 transition-all">
                                {isSubmitting ? 'Processing Request...' : 'Confirm Interest'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* SUCCESS MODAL */}
            {showSuccess && (
                <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-10 text-center shadow-2xl border border-gray-100">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Request Submitted</h2>
                        <p className="text-gray-600 mb-8 font-medium">Our relationship manager will contact you shortly with the latest quotes and procedure.</p>
                        <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition-all">
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            <PreviewModal content={activePreview ? PREVIEW_DATA[activePreview] : null} onClose={() => setActivePreview(null)} />

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 text-gray-900">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-8 text-white flex justify-between items-center">
                            <h2 className="text-2xl font-black text-white">Schedule Consultation</h2>
                            <button onClick={() => setShowScheduleModal(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Request Received!'); setShowScheduleModal(false); }} className="p-8 space-y-4">
                            <input required type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#2076C7] transition-all" />
                            <input required type="email" placeholder="Email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#2076C7] transition-all" />
                            <button type="submit" className="w-full py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-xl shadow-lg mt-4 flex items-center justify-center gap-2">
                                <Calendar size={20} /> Request Call
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Brochure Modal */}
            {showBrochureModal && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm text-gray-900">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-10 text-white text-center">
                            <FileText size={64} className="mx-auto mb-6 opacity-80" />
                            <h2 className="text-3xl font-black text-white mb-2">Service Brochure 2024</h2>
                            <p className="font-medium opacity-80">Get all the details about our unlisted marketplace services.</p>
                        </div>
                        {/* <div className="p-10 text-center">
                            <button onClick={() => { alert('Brochure Downloading...'); setShowBrochureModal(false); }} className="px-12 py-5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-lg flex items-center gap-2 mx-auto">
                                <FileText size={20} /> Download PDF Now
                            </button>
                            <button onClick={() => setShowBrochureModal(false)} className="block w-full mt-6 text-gray-400 font-bold hover:text-gray-600 transition-colors">Close</button>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;