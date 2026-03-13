'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Client {
    id: number;
    name: string;
    email: string;
    mobile: string;
    riskProfile: string;
    aum: number;
    lastContact: string;
    kycStatus: 'Verified' | 'Pending' | 'Expired';
    goals: number;
    investmentTypes: string[];
    avatar?: string;
}

interface Lead {
    id: number;
    name: string;
    source: string;
    status: 'New' | 'Warm' | 'Hot' | 'Converted' | 'Lost';
    probability: number;
    expectedAmount: number;
    followUpDate: string;
    notes: string;
}

interface Task {
    id: number;
    type: 'Follow-up' | 'Meeting' | 'Call' | 'Document' | 'Reminder';
    clientName: string;
    description: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    completed: boolean;
}

// RM Performance Metrics - ALL ZERO
const rmMetrics = {
    totalClients: 0,
    activeClients: 0,
    newLeads: 0,
    aum: 0,
    monthlyRevenue: 0,
    commissionEarned: 0,
    sipBookValue: 0,
    pendingTasks: 0,
    openTickets: 0,
    conversionRate: 0,
    avgAUMperClient: 0,
    retentionRate: 0,
    satisfactionScore: 0
};

// EMPTY ARRAYS - No dummy data
const assignedClients: Client[] = [];
const leads: Lead[] = [];
const tasks: Task[] = [];

export default function RMPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [rmName, setRmName] = useState('RM');
    const [rmId, setRmId] = useState('');
    const [lastLogin, setLastLogin] = useState('');

    // Fetch RM details on component mount
    useEffect(() => {
        // This would be replaced with actual API call
        // Example: fetch('/api/rm/profile').then(res => res.json()).then(data => { ... })
        
        // For now, using localStorage or session data
        const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setRmName(user.name || 'RM');
                setRmId(user.employeeId || '');
            } catch (e) {
                // If no user data, use default
                setRmName('RM');
            }
        } else {
            // Default if no user found
            setRmName('Relationship Manager');
        }

        // Set last login time
        const loginTime = localStorage.getItem('lastLogin');
        if (loginTime) {
            setLastLogin(loginTime);
        } else {
            const now = new Date();
            setLastLogin(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' Today');
        }
    }, []);

    // Filter clients based on search
    const filteredClients = assignedClients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRiskProfileColor = (profile: string) => {
        switch(profile) {
            case 'Conservative': return 'bg-green-100 text-green-600';
            case 'Moderate': return 'bg-yellow-100 text-yellow-600';
            case 'Aggressive': return 'bg-orange-100 text-orange-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getKYCBadge = (status: string) => {
        switch(status) {
            case 'Verified': return 'bg-green-100 text-green-600';
            case 'Pending': return 'bg-yellow-100 text-yellow-600';
            case 'Expired': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getLeadStatusColor = (status: string) => {
        switch(status) {
            case 'Hot': return 'bg-red-100 text-red-600';
            case 'Warm': return 'bg-yellow-100 text-yellow-600';
            case 'New': return 'bg-blue-100 text-blue-600';
            case 'Converted': return 'bg-green-100 text-green-600';
            case 'Lost': return 'bg-gray-100 text-gray-600';
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

    const formatCurrency = (amount: number) => {
        if (amount === 0) return '₹0';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            👨‍💼 Relationship Manager Panel
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            Welcome back, {rmName} • Last login: {lastLogin}
                        </p>
                    </div>
                    
                    {/* RM Status */}
                    <div className="bg-white/20 px-4 py-2 rounded-xl flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm">Online</span>
                        </div>
                        <div className="h-4 w-px bg-white/30"></div>
                        <div className="text-sm">
                            <span className="opacity-70">Employee ID:</span> {rmId || 'RM001'}
                        </div>
                    </div>
                </div>

                {/* Quick Stats - ALL ZERO */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold">{rmMetrics.totalClients}</div>
                        <div className="text-xs opacity-80">Total Clients</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold">{rmMetrics.activeClients}</div>
                        <div className="text-xs opacity-80">Active Clients</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold">₹0</div>
                        <div className="text-xs opacity-80">Total AUM</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-2xl font-bold">{rmMetrics.pendingTasks}</div>
                        <div className="text-xs opacity-80">Pending Tasks</div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search clients, leads, or tasks..."
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
                    {[
                        'dashboard', 'clients', 'leads', 'recommendations',
                        'portfolio-monitoring', 'revenue', 'tasks', 'documents',
                        'communication', 'analytics'
                    ].map((tab) => (
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
                        {/* KPI Cards - ALL ZERO */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">AUM Growth</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">0%</div>
                                        <div className="text-xs text-gray-400 mt-1">No data available</div>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xl">
                                        📈
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Monthly Revenue</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">₹0</div>
                                        <div className="text-xs text-gray-400 mt-1">No data available</div>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xl">
                                        💰
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Conversion Rate</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">0%</div>
                                        <div className="text-xs text-gray-400 mt-1">No data available</div>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xl">
                                        🎯
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Client Satisfaction</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">--/5</div>
                                        <div className="text-xs text-gray-400 mt-1">No ratings yet</div>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xl">
                                        ⭐
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section - Placeholders */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">AUM Growth Trend</h3>
                                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-gray-400 text-sm">No AUM data available</div>
                                        <p className="text-xs text-gray-300 mt-2">Connect to backend to see AUM growth chart</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation Distribution</h3>
                                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-gray-400 text-sm">No allocation data available</div>
                                        <p className="text-xs text-gray-300 mt-2">Add clients to see portfolio distribution</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Clients & Tasks - Empty States */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Clients - Empty */}
                            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Recent Clients</h3>
                                    <button 
                                        onClick={() => setActiveTab('clients')}
                                        className="text-sm text-[#2076C7] hover:underline"
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-800 mb-1">No clients yet</h4>
                                    <p className="text-xs text-gray-400">Your assigned clients will appear here</p>
                                </div>
                            </div>

                            {/* Pending Tasks - Empty */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                        0 due
                                    </span>
                                </div>
                                <div className="text-center py-6">
                                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <p className="text-xs text-gray-400">No pending tasks</p>
                                </div>
                            </div>
                        </div>

                        {/* Lead Pipeline Preview - Empty */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Lead Pipeline</h3>
                                <button 
                                    onClick={() => setActiveTab('leads')}
                                    className="text-sm text-[#2076C7] hover:underline"
                                >
                                    Manage Leads
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {['New', 'Warm', 'Hot', 'Converted'].map((stage) => (
                                    <div key={stage} className="text-center">
                                        <div className="text-lg font-bold text-gray-400">0</div>
                                        <div className="text-xs text-gray-400">{stage} Leads</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Clients View - Empty */}
                {activeTab === 'clients' && (
                    <motion.div
                        key="clients"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Client Management</h3>
                                <div className="flex items-center space-x-3">
                                    <button 
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#2076C7] text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#2076C7] text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Empty State */}
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-4xl">👥</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">No clients assigned</h3>
                                <p className="text-sm text-gray-400 mb-4 max-w-sm mx-auto">
                                    You don't have any clients assigned yet. They will appear here once assigned by your admin.
                                </p>
                                <button className="px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Leads View - Empty */}
                {activeTab === 'leads' && (
                    <motion.div
                        key="leads"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">Lead Management</h3>
                            <button className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                                + Add New Lead
                            </button>
                        </div>

                        {/* Empty Kanban Board */}
                        <div className="grid grid-cols-4 gap-4">
                            {['New', 'Warm', 'Hot', 'Converted'].map((stage) => (
                                <div key={stage} className="bg-gray-50 rounded-xl p-4 min-h-[200px]">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-700">{stage}</h4>
                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                                            0
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-lg">
                                        <p className="text-xs text-gray-400">No leads</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lead Stats - Zero */}
                        <div className="mt-6 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-sm text-gray-500">Total Leads</div>
                                <div className="text-xl font-bold text-gray-800">0</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Hot Leads</div>
                                <div className="text-xl font-bold text-gray-400">0</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Expected Value</div>
                                <div className="text-xl font-bold text-gray-800">₹0</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Conversion Rate</div>
                                <div className="text-xl font-bold text-gray-400">0%</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tasks View - Empty */}
                {activeTab === 'tasks' && (
                    <motion.div
                        key="tasks"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">Task & Follow-up Manager</h3>
                            <button className="px-4 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                                + New Task
                            </button>
                        </div>

                        {/* Empty State */}
                        <div className="text-center py-12">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-3xl">✓</span>
                            </div>
                            <h4 className="text-base font-medium text-gray-800 mb-2">No tasks pending</h4>
                            <p className="text-sm text-gray-400 mb-4">All caught up! Create a new task to get started.</p>
                            <button className="px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                                Create First Task
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Revenue View - Zero */}
                {activeTab === 'revenue' && (
                    <motion.div
                        key="revenue"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-500">Total Commission</div>
                                <div className="text-2xl font-bold text-gray-800 mt-2">₹0</div>
                                <div className="text-xs text-gray-400 mt-1">No commission earned yet</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-500">Trail Commission (MF)</div>
                                <div className="text-2xl font-bold text-gray-800 mt-2">₹0</div>
                                <div className="text-xs text-gray-400 mt-1">No trail income</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-500">Upcoming Payouts</div>
                                <div className="text-2xl font-bold text-gray-800 mt-2">₹0</div>
                                <div className="text-xs text-gray-400 mt-1">No payouts scheduled</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Commission Breakdown</h3>
                            <div className="text-center py-8 text-gray-400">
                                No commission data available
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Analytics View - Zero */}
                {activeTab === 'analytics' && (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Conversion Rate</span>
                                        <span className="font-semibold text-gray-800">0%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Retention Rate</span>
                                        <span className="font-semibold text-gray-800">0%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Client Satisfaction</span>
                                        <span className="font-semibold text-gray-800">--/5</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Targets</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">AUM Target</span>
                                        <span className="font-semibold text-gray-800">₹0 / 0%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Revenue Target</span>
                                        <span className="font-semibold text-gray-800">₹0 / 0%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">New Clients Target</span>
                                        <span className="font-semibold text-gray-800">0 / 0%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-gray-300 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Placeholder for other tabs */}
                {['recommendations', 'portfolio-monitoring', 'documents', 'communication'].includes(activeTab) && (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">
                                {activeTab === 'recommendations' && '💡'}
                                {activeTab === 'portfolio-monitoring' && '📊'}
                                {activeTab === 'documents' && '📄'}
                                {activeTab === 'communication' && '💬'}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                            {activeTab.replace('-', ' ')} Module
                        </h3>
                        <p className="text-sm text-gray-400 max-w-md mx-auto">
                            {activeTab === 'recommendations' && 'No recommendations available. Add client data to get AI-powered recommendations.'}
                            {activeTab === 'portfolio-monitoring' && 'No portfolios to monitor. Assign clients to see their portfolio performance.'}
                            {activeTab === 'documents' && 'No documents available. Upload documents to manage client records.'}
                            {activeTab === 'communication' && 'No communication history. Start conversations with your clients.'}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Action Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed bottom-6 right-6 bg-[#2076C7] text-white p-4 rounded-full shadow-lg hover:bg-[#1a5e9e] transition-colors z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </motion.button>
        </div>
    );
}