'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Ticket Categories
const ticketCategories = [
    { id: 'mutual-funds', name: 'Mutual Funds', icon: '📈', color: 'from-blue-500 to-cyan-500' },
    { id: 'pms', name: 'PMS', icon: '🏦', color: 'from-purple-500 to-pink-500' },
    { id: 'aif', name: 'AIF', icon: '🏛️', color: 'from-yellow-500 to-orange-500' },
    { id: 'fixed-income', name: 'Fixed Income', icon: '💰', color: 'from-indigo-500 to-purple-500' },
    { id: 'nps', name: 'NPS', icon: '👴', color: 'from-red-500 to-pink-500' },
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', color: 'from-teal-500 to-green-500' },
    { id: 'unlisted', name: 'Unlisted Shares', icon: '📄', color: 'from-gray-700 to-gray-900' },
    { id: 'reports', name: 'Reports & Tax', icon: '📊', color: 'from-orange-500 to-red-500' },
    { id: 'kyc', name: 'KYC & Account', icon: '🔐', color: 'from-cyan-500 to-blue-500' },
    { id: 'technical', name: 'Technical', icon: '⚙️', color: 'from-gray-500 to-gray-700' },
];

// FAQ Data
const faqCategories = [
    {
        category: 'Mutual Funds',
        icon: '📈',
        questions: [
            { q: 'How do I start a SIP?', a: 'You can start a SIP by visiting the Mutual Funds section, selecting a fund, and clicking on "Start SIP". Minimum SIP amount is ₹500.' },
            { q: 'How to redeem mutual funds?', a: 'Go to Portfolio → Mutual Funds → Select Fund → Redeem. Redemption typically takes 2-3 business days.' },
            { q: 'What is exit load?', a: 'Exit load is a fee charged if you redeem before a certain period. Usually 1% if redeemed within 1 year for equity funds.' },
            { q: 'Tax on capital gains?', a: 'LTCG above ₹1 lakh is taxed at 10%. STCG is taxed at 15%. Debt funds are taxed as per income slab.' },
        ]
    },
    {
        category: 'PMS/AIF',
        icon: '🏦',
        questions: [
            { q: 'Minimum investment in PMS?', a: 'Minimum investment for PMS is typically ₹50 lakhs. AIF requires minimum ₹1 crore.' },
            { q: 'What is the lock-in period?', a: 'PMS usually has no lock-in, but AIF typically has 3-5 years lock-in period.' },
            { q: 'How are PMS returns taxed?', a: 'PMS is treated as business income or capital gains depending on structure. Consult your RM for details.' },
        ]
    },
    {
        category: 'Bonds/NCD',
        icon: '💰',
        questions: [
            { q: 'What is coupon rate?', a: 'Coupon rate is the annual interest rate paid by the bond issuer to the bondholder.' },
            { q: 'What is YTM?', a: 'Yield to Maturity (YTM) is the total return anticipated on a bond if held until it matures.' },
            { q: 'What if issuer defaults?', a: 'In case of default, you may lose principal. Always check credit rating before investing.' },
        ]
    },
    {
        category: 'NPS',
        icon: '👴',
        questions: [
            { q: 'Tax benefits in NPS?', a: 'Additional deduction of ₹50,000 under Section 80CCD(1B) over and above ₹1.5L 80C limit.' },
            { q: 'Partial withdrawal rules?', a: 'Partial withdrawal allowed after 3 years, up to 25% of contributions, for specific purposes.' },
        ]
    },
    {
        category: 'Real Estate',
        icon: '🏠',
        questions: [
            { q: 'What is rental yield?', a: 'Rental yield is annual rental income divided by property value. Typically 2-4% in India.' },
            { q: 'Stamp duty charges?', a: 'Stamp duty varies by state, typically 5-7% of property value.' },
        ]
    },
    {
        category: 'Unlisted Shares',
        icon: '📄',
        questions: [
            { q: 'What is lock-in period?', a: 'Lock-in period varies by company, typically 1-3 years post investment or IPO.' },
            { q: 'How is valuation done?', a: 'Valuation based on last funding round, financial performance, and market conditions.' },
            { q: 'Liquidity risk?', a: 'Unlisted shares are illiquid. Exit may take 12-36 months. High risk - invest only if long-term horizon.' },
        ]
    }
];

// Sample Tickets Data
const recentTickets = [
    { id: 'TKT001', subject: 'SIP installment failed', category: 'Mutual Funds', status: 'In Progress', priority: 'High', date: '2024-01-15', eta: '24 hours' },
    { id: 'TKT002', subject: 'PAN update request', category: 'KYC & Account', status: 'Resolved', priority: 'Medium', date: '2024-01-14', eta: 'Resolved' },
    { id: 'TKT003', subject: 'FD maturity proceeds not credited', category: 'Fixed Income', status: 'Open', priority: 'High', date: '2024-01-13', eta: '48 hours' },
    { id: 'TKT004', subject: 'Portfolio statement download', category: 'Reports & Tax', status: 'Resolved', priority: 'Low', date: '2024-01-12', eta: 'Resolved' },
];

export default function HelpSupport() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [ticketForm, setTicketForm] = useState({
        category: '',
        subject: '',
        description: '',
        priority: 'Medium',
        attachment: null
    });

    // Filter FAQs based on search
    const filteredFaqs = faqCategories.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q => 
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Resolved': return 'bg-green-100 text-green-600';
            case 'In Progress': return 'bg-blue-100 text-blue-600';
            case 'Open': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case 'High': return 'bg-red-100 text-red-600';
            case 'Medium': return 'bg-yellow-100 text-yellow-600';
            case 'Low': return 'bg-green-100 text-green-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="flex-1 p-4 sm:p-6">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            🆘 Help & Support
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            We're here to help 24/7. Get support for all your investment needs.
                        </p>
                    </div>
                    
                    {/* Live Chat Status */}
                    <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm">Live Chat Online</span>
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <button 
                        onClick={() => { setActiveTab('ticket'); setShowTicketForm(true); }}
                        className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors"
                    >
                        <div className="text-xl mb-1">📩</div>
                        <div className="text-xs font-medium">Raise Ticket</div>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors">
                        <div className="text-xl mb-1">💬</div>
                        <div className="text-xs font-medium">Live Chat</div>
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors">
                        <div className="text-xl mb-1">📞</div>
                        <div className="text-xs font-medium">Request Callback</div>
                    </button>
                    <button 
                        onClick={() => setActiveTab('faq')}
                        className="bg-white/10 hover:bg-white/20 rounded-xl p-3 text-center transition-colors"
                    >
                        <div className="text-xl mb-1">📄</div>
                        <div className="text-xs font-medium">FAQs</div>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search help articles, FAQs, or ticket ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                    />
                    <svg className="w-4 h-4 absolute left-3 top-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </motion.div>

            {/* Navigation Tabs */}
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-2 pb-2">
                    {['dashboard', 'my-tickets', 'faq', 'knowledge-center', 'documents', 'kyc-help'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                                activeTab === tab
                                    ? 'bg-[#2076C7] text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Category Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {ticketCategories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all"
                                    onClick={() => {
                                        setActiveTab('ticket');
                                        setTicketForm({...ticketForm, category: cat.id});
                                        setShowTicketForm(true);
                                    }}
                                >
                                    <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-linear-to-r ${cat.color} flex items-center justify-center text-white text-xl`}>
                                        {cat.icon}
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">{cat.name}</div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Recent Tickets */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Recent Tickets</h3>
                                <button 
                                    onClick={() => setActiveTab('my-tickets')}
                                    className="text-sm text-[#2076C7] hover:underline"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentTickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(ticket.status)}`}>
                                                    {ticket.status}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
                                                    {ticket.priority}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-800 mt-1">{ticket.subject}</div>
                                            <div className="text-xs text-gray-500 mt-1">{ticket.category} • {ticket.date}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">ETA</div>
                                            <div className="text-sm font-medium text-gray-800">{ticket.eta}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Knowledge Center Teaser */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">📚 Knowledge Center</h3>
                                    <p className="text-sm text-gray-600 mb-4">Learn about investments, tax planning, and more</p>
                                    <button 
                                        onClick={() => setActiveTab('knowledge-center')}
                                        className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]"
                                    >
                                        Explore Guides
                                    </button>
                                </div>
                                <div className="text-5xl opacity-50">📖</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Raise Ticket Form */}
                {activeTab === 'ticket' && showTicketForm && (
                    <motion.div
                        key="ticket-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">📩 Raise a Support Ticket</h3>
                            <button 
                                onClick={() => setShowTicketForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Category Selection */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Category *</label>
                                <select 
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-1 focus:ring-[#2076C7] outline-none"
                                    value={ticketForm.category}
                                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                                >
                                    <option value="">Select Category</option>
                                    {ticketCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Subject *</label>
                                <input 
                                    type="text"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-1 focus:ring-[#2076C7] outline-none"
                                    placeholder="Brief summary of your issue"
                                    value={ticketForm.subject}
                                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Description *</label>
                                <textarea 
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2076C7] focus:ring-1 focus:ring-[#2076C7] outline-none"
                                    placeholder="Describe your issue in detail"
                                    value={ticketForm.description}
                                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                                <div className="flex space-x-3">
                                    {['Low', 'Medium', 'High'].map(priority => (
                                        <button
                                            key={priority}
                                            onClick={() => setTicketForm({...ticketForm, priority})}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                                ticketForm.priority === priority
                                                    ? priority === 'High' ? 'bg-red-500 text-white' :
                                                      priority === 'Medium' ? 'bg-yellow-500 text-white' :
                                                      'bg-green-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {priority}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Attachment */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Attachment (Optional)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                                    <input type="file" className="hidden" id="file-upload" />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                                        <span className="text-xs text-gray-400 block mt-1">PDF, JPG, PNG up to 10MB</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button className="w-full bg-[#2076C7] text-white py-3 rounded-xl font-medium hover:bg-[#1a5e9e] transition-colors">
                                    Submit Ticket
                                </button>
                                <p className="text-xs text-gray-400 text-center mt-2">
                                    Our team will respond within 24-48 hours
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* My Tickets View */}
                {activeTab === 'my-tickets' && (
                    <motion.div
                        key="my-tickets"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Support Tickets</h3>
                        
                        <div className="space-y-4">
                            {recentTickets.map((ticket) => (
                                <div key={ticket.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">{ticket.date}</span>
                                    </div>
                                    <h4 className="font-medium text-gray-800 mb-2">{ticket.subject}</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">{ticket.category}</span>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-xs text-gray-400">ETA: {ticket.eta}</span>
                                            <button className="text-[#2076C7] hover:underline text-xs">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SLA Info */}
                        <div className="mt-6 bg-blue-50 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-800">SLA Commitment</h4>
                                    <p className="text-xs text-blue-600 mt-1">
                                        High priority: 24 hrs | Medium: 48 hrs | Low: 72 hrs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* FAQs View */}
                {activeTab === 'faq' && (
                    <motion.div
                        key="faq"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {filteredFaqs.map((category) => (
                            <div key={category.category} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="text-2xl">{category.icon}</span>
                                    <h3 className="text-lg font-semibold text-gray-800">{category.category}</h3>
                                </div>
                                <div className="space-y-3">
                                    {category.questions.map((item, idx) => (
                                        <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setExpandedFaq(expandedFaq === `${category.category}-${idx}` ? null : `${category.category}-${idx}`)}
                                                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                                            >
                                                <span className="text-sm font-medium text-gray-800">{item.q}</span>
                                                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === `${category.category}-${idx}` ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            <AnimatePresence>
                                                {expandedFaq === `${category.category}-${idx}` && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: 'auto' }}
                                                        exit={{ height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 pb-3 text-sm text-gray-600 bg-gray-50 pt-2">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Knowledge Center */}
                {activeTab === 'knowledge-center' && (
                    <motion.div
                        key="knowledge-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Investment Basics</h3>
                            <div className="space-y-3">
                                {['What is Mutual Fund?', 'Equity vs Debt', 'Understanding SIP', 'Power of Compounding'].map((item) => (
                                    <button key={item} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm font-medium text-gray-800">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Tax Planning</h3>
                            <div className="space-y-3">
                                {['Capital Gains Tax', 'Tax Saving Funds (ELSS)', 'NPS Tax Benefits', 'Tax on FD Interest'].map((item) => (
                                    <button key={item} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm font-medium text-gray-800">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">🏠 Retirement Planning</h3>
                            <div className="space-y-3">
                                {['NPS vs Pension Plans', 'Retirement Corpus Calculator', 'Systematic Withdrawal Plans', 'Annuity Options'].map((item) => (
                                    <button key={item} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm font-medium text-gray-800">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">⚠️ Risk Management</h3>
                            <div className="space-y-3">
                                {['Understanding Risk Profile', 'Asset Allocation', 'Portfolio Diversification', 'Risk vs Return'].map((item) => (
                                    <button key={item} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm font-medium text-gray-800">{item}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Documents Section */}
                {activeTab === 'documents' && (
                    <motion.div
                        key="documents"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">📥 Download Documents</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                'Portfolio Statement',
                                'Capital Gains Statement',
                                'Transaction History',
                                'NPS Statement',
                                'PMS Statement',
                                'Tax Report',
                                'Investment Certificate',
                                'Annual Account Statement'
                            ].map((doc) => (
                                <button key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-800">{doc}</span>
                                    </div>
                                    <svg className="w-5 h-5 text-[#2076C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* KYC Help */}
                {activeTab === 'kyc-help' && (
                    <motion.div
                        key="kyc-help"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">🔐 KYC & Account Help</h3>
                        
                        <div className="space-y-4">
                            {/* KYC Status */}
                            <div className="bg-green-50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-800">KYC Status</div>
                                        <div className="text-xs text-gray-500">Last updated: Jan 2024</div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">Verified</span>
                                </div>
                            </div>

                            {/* Action Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'Update PAN', icon: '🆔' },
                                    { name: 'Update Bank', icon: '🏦' },
                                    { name: 'Update Nominee', icon: '👥' },
                                    { name: 'Update Address', icon: '📍' },
                                    { name: 'Change Password', icon: '🔑' },
                                    { name: 'Reset 2FA', icon: '📱' },
                                ].map((action) => (
                                    <button key={action.name} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-lg">{action.icon}</span>
                                        <span className="text-sm font-medium text-gray-800">{action.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Document Upload */}
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                                <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <p className="text-sm text-gray-600 mb-1">Upload KYC Document</p>
                                <p className="text-xs text-gray-400">PAN Card, Aadhaar, Passport</p>
                                <button className="mt-3 px-4 py-2 bg-[#2076C7] text-white rounded-xl text-xs font-medium hover:bg-[#1a5e9e]">
                                    Choose File
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Request Callback Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed bottom-6 right-6 bg-[#2076C7] text-white p-4 rounded-full shadow-lg hover:bg-[#1a5e9e] transition-colors z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </motion.button>

            {/* Compliance Disclaimer */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                    By raising a ticket, you agree to our <span className="text-[#2076C7] cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#2076C7] cursor-pointer hover:underline">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}