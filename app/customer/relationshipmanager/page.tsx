'use client';

import { useState } from 'react';
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

// Sample Data
const assignedClients: Client[] = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.k@email.com',
        mobile: '+91 98765 43210',
        riskProfile: 'Moderate',
        aum: 4500000,
        lastContact: '2024-01-15',
        kycStatus: 'Verified',
        goals: 3,
        investmentTypes: ['MF', 'PMS', 'FD']
    },
    {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.s@email.com',
        mobile: '+91 87654 32109',
        riskProfile: 'Aggressive',
        aum: 7800000,
        lastContact: '2024-01-14',
        kycStatus: 'Verified',
        goals: 2,
        investmentTypes: ['MF', 'AIF', 'Unlisted']
    },
    {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.p@email.com',
        mobile: '+91 76543 21098',
        riskProfile: 'Conservative',
        aum: 2300000,
        lastContact: '2024-01-10',
        kycStatus: 'Pending',
        goals: 2,
        investmentTypes: ['FD', 'Bonds', 'NPS']
    },
    {
        id: 4,
        name: 'Neha Gupta',
        email: 'neha.g@email.com',
        mobile: '+91 65432 10987',
        riskProfile: 'Moderate',
        aum: 6200000,
        lastContact: '2024-01-12',
        kycStatus: 'Verified',
        goals: 4,
        investmentTypes: ['MF', 'PMS', 'Real Estate']
    },
];

const leads: Lead[] = [
    { id: 1, name: 'Vikram Singh', source: 'Website', status: 'Hot', probability: 80, expectedAmount: 2500000, followUpDate: '2024-01-16', notes: 'Interested in PMS' },
    { id: 2, name: 'Anjali Mehta', source: 'Referral', status: 'Warm', probability: 60, expectedAmount: 1000000, followUpDate: '2024-01-17', notes: 'Looking for tax saving' },
    { id: 3, name: 'Suresh Reddy', source: 'Campaign', status: 'New', probability: 30, expectedAmount: 500000, followUpDate: '2024-01-18', notes: 'FD enquiry' },
    { id: 4, name: 'Pooja Desai', source: 'B2B Partner', status: 'Hot', probability: 90, expectedAmount: 5000000, followUpDate: '2024-01-15', notes: 'AIF interested' },
];

const tasks: Task[] = [
    { id: 1, type: 'Follow-up', clientName: 'Rajesh Kumar', description: 'Discuss portfolio rebalancing', dueDate: '2024-01-16', priority: 'High', completed: false },
    { id: 2, type: 'Call', clientName: 'Priya Sharma', description: 'AIF performance review', dueDate: '2024-01-16', priority: 'Medium', completed: false },
    { id: 3, type: 'Document', clientName: 'Amit Patel', description: 'KYC documents pending', dueDate: '2024-01-17', priority: 'High', completed: false },
    { id: 4, type: 'Meeting', clientName: 'Neha Gupta', description: 'Real estate site visit', dueDate: '2024-01-18', priority: 'Low', completed: true },
];

// RM Performance Metrics
const rmMetrics = {
    totalClients: 47,
    activeClients: 42,
    newLeads: 8,
    aum: 185000000,
    monthlyRevenue: 425000,
    commissionEarned: 185000,
    sipBookValue: 4500000,
    pendingTasks: 12,
    openTickets: 3,
    conversionRate: 68,
    avgAUMperClient: 3936170,
    retentionRate: 94,
    satisfactionScore: 4.8
};

export default function RMPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

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
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
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
                            👨‍💼 Relationship Manager Panel
                        </h2>
                        <p className="text-sm sm:text-base opacity-90">
                            Welcome back, Prasad Mali • Last login: Today 9:30 AM
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
                            <span className="opacity-70">Employee ID:</span> RM001
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
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
                        <div className="text-2xl font-bold">{formatCurrency(rmMetrics.aum / 10000000)}Cr</div>
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
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">AUM Growth</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">+12.5%</div>
                                        <div className="text-xs text-green-500 mt-1">↑ 8.2% vs last month</div>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                                        📈
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Monthly Revenue</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(rmMetrics.monthlyRevenue)}</div>
                                        <div className="text-xs text-green-500 mt-1">↑ 15% vs target</div>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-xl">
                                        💰
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Conversion Rate</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">{rmMetrics.conversionRate}%</div>
                                        <div className="text-xs text-green-500 mt-1">↑ 5% vs last month</div>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-xl">
                                        🎯
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-500">Client Satisfaction</div>
                                        <div className="text-2xl font-bold text-gray-800 mt-1">{rmMetrics.satisfactionScore}/5</div>
                                        <div className="text-xs text-green-500 mt-1">↑ 0.3 vs last month</div>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 text-xl">
                                        ⭐
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">AUM Growth Trend</h3>
                                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-48 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg"></div>
                                        <p className="text-sm text-gray-400 mt-2">Chart: AUM Growth (Last 12 Months)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation Distribution</h3>
                                <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 opacity-50"></div>
                                        <p className="text-sm text-gray-400 mt-2">Chart: Portfolio Allocation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Clients & Tasks */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Recent Clients */}
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
                                <div className="space-y-3">
                                    {assignedClients.slice(0, 3).map((client) => (
                                        <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                             onClick={() => setSelectedClient(client)}>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">{client.name}</div>
                                                    <div className="text-xs text-gray-500">{client.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-800">{formatCurrency(client.aum)}</div>
                                                <div className="text-xs text-gray-500">AUM</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pending Tasks */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                        {tasks.filter(t => !t.completed).length} due
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {tasks.filter(t => !t.completed).slice(0, 4).map((task) => (
                                        <div key={task.id} className="flex items-start space-x-3 p-2">
                                            <input type="checkbox" className="mt-1 w-4 h-4 text-[#2076C7] rounded border-gray-300" />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{task.type}</span>
                                                </div>
                                                <div className="text-sm font-medium text-gray-800 mt-1">{task.clientName}</div>
                                                <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                                                <div className="text-xs text-gray-400 mt-1">Due: {task.dueDate}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 text-center text-sm text-[#2076C7] hover:underline">
                                    View All Tasks
                                </button>
                            </div>
                        </div>

                        {/* Lead Pipeline Preview */}
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
                                        <div className={`text-lg font-bold ${
                                            stage === 'Hot' ? 'text-red-500' :
                                            stage === 'Warm' ? 'text-yellow-500' :
                                            stage === 'New' ? 'text-blue-500' : 'text-green-500'
                                        }`}>
                                            {leads.filter(l => l.status === stage).length}
                                        </div>
                                        <div className="text-xs text-gray-500">{stage} Leads</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Clients View */}
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

                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredClients.map((client) => (
                                        <motion.div
                                            key={client.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                            onClick={() => setSelectedClient(client)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {client.name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800">{client.name}</h4>
                                                    <p className="text-xs text-gray-500">{client.email}</p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskProfileColor(client.riskProfile)}`}>
                                                            {client.riskProfile}
                                                        </span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getKYCBadge(client.kycStatus)}`}>
                                                            {client.kycStatus}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">AUM</span>
                                                    <span className="font-semibold text-gray-800">{formatCurrency(client.aum)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mt-1">
                                                    <span className="text-gray-500">Last Contact</span>
                                                    <span className="text-gray-600">{client.lastContact}</span>
                                                </div>
                                                <div className="flex mt-2 space-x-1">
                                                    {client.investmentTypes.map(type => (
                                                        <span key={type} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                                                            {type}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">Client</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">Risk Profile</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">AUM</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">KYC</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">Last Contact</th>
                                                <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClients.map((client) => (
                                                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => setSelectedClient(client)}>
                                                    <td className="py-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                                {client.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-800">{client.name}</div>
                                                                <div className="text-xs text-gray-500">{client.mobile}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getRiskProfileColor(client.riskProfile)}`}>
                                                            {client.riskProfile}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-sm font-medium text-gray-800">{formatCurrency(client.aum)}</td>
                                                    <td className="py-3">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getKYCBadge(client.kycStatus)}`}>
                                                            {client.kycStatus}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 text-sm text-gray-600">{client.lastContact}</td>
                                                    <td className="py-3">
                                                        <button className="text-[#2076C7] text-sm hover:underline">View Profile</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Client 360° View Modal */}
                        <AnimatePresence>
                            {selectedClient && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                                    onClick={() => setSelectedClient(null)}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                        {selectedClient.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800">{selectedClient.name}</h3>
                                                        <p className="text-sm text-gray-500">{selectedClient.email} • {selectedClient.mobile}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => setSelectedClient(null)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* Client 360° Stats */}
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(selectedClient.aum)}</div>
                                                    <div className="text-xs text-blue-600 mt-1">Total AUM</div>
                                                </div>
                                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                                    <div className="text-2xl font-bold text-green-600">{selectedClient.goals}</div>
                                                    <div className="text-xs text-green-600 mt-1">Active Goals</div>
                                                </div>
                                                <div className="bg-purple-50 rounded-xl p-4 text-center">
                                                    <div className="text-2xl font-bold text-purple-600">{selectedClient.investmentTypes.length}</div>
                                                    <div className="text-xs text-purple-600 mt-1">Products Held</div>
                                                </div>
                                            </div>

                                            {/* Tabs inside modal */}
                                            <div className="border-b border-gray-200 mb-4">
                                                <div className="flex space-x-4">
                                                    {['Portfolio', 'Goals', 'Wishlist', 'Support History', 'Notes', 'Communication'].map((tab) => (
                                                        <button key={tab} className="px-4 py-2 text-sm font-medium text-[#2076C7] border-b-2 border-[#2076C7]">
                                                            {tab}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sample Portfolio View */}
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Asset Allocation</h4>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <div className="flex justify-between text-xs">
                                                                    <span>Mutual Funds</span>
                                                                    <span>45%</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-gray-200 rounded-full">
                                                                    <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-xs">
                                                                    <span>PMS</span>
                                                                    <span>20%</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-gray-200 rounded-full">
                                                                    <div className="h-1.5 bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-xs">
                                                                    <span>Fixed Income</span>
                                                                    <span>25%</span>
                                                                </div>
                                                                <div className="w-full h-1.5 bg-gray-200 rounded-full">
                                                                    <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-4">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
                                                        <div className="space-y-2">
                                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                                                                📤 Send Portfolio Report
                                                            </button>
                                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                                                                💬 Send Message
                                                            </button>
                                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                                                                📅 Schedule Meeting
                                                            </button>
                                                            <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                                                                💰 Recommend Investment
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Leads View */}
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

                        {/* Kanban Board */}
                        <div className="grid grid-cols-4 gap-4">
                            {['New', 'Warm', 'Hot', 'Converted'].map((stage) => (
                                <div key={stage} className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-gray-700">{stage}</h4>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            stage === 'Hot' ? 'bg-red-100 text-red-600' :
                                            stage === 'Warm' ? 'bg-yellow-100 text-yellow-600' :
                                            stage === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                            {leads.filter(l => l.status === stage).length}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {leads.filter(l => l.status === stage).map((lead) => (
                                            <div key={lead.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                                <div className="font-medium text-gray-800 text-sm">{lead.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{lead.source}</div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs text-gray-500">{lead.probability}%</span>
                                                    <span className="text-xs font-semibold text-gray-800">{formatCurrency(lead.expectedAmount)}</span>
                                                </div>
                                                <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
                                                    <div 
                                                        className={`h-1 rounded-full ${
                                                            lead.probability >= 70 ? 'bg-green-500' :
                                                            lead.probability >= 40 ? 'bg-yellow-500' : 'bg-blue-500'
                                                        }`}
                                                        style={{ width: `${lead.probability}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex items-center justify-between mt-2 text-xs">
                                                    <span className="text-gray-400">Follow-up: {lead.followUpDate}</span>
                                                    <button className="text-[#2076C7] hover:underline">Edit</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lead Stats */}
                        <div className="mt-6 grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-sm text-gray-500">Total Leads</div>
                                <div className="text-xl font-bold text-gray-800">{leads.length}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Hot Leads</div>
                                <div className="text-xl font-bold text-red-600">{leads.filter(l => l.status === 'Hot').length}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Expected Value</div>
                                <div className="text-xl font-bold text-gray-800">{formatCurrency(leads.reduce((sum, l) => sum + l.expectedAmount, 0))}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Conversion Rate</div>
                                <div className="text-xl font-bold text-green-600">68%</div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tasks View */}
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

                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed}
                                            className="w-5 h-5 text-[#2076C7] rounded border-gray-300"
                                            readOnly
                                        />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                <span className="text-xs text-gray-500">{task.type}</span>
                                            </div>
                                            <h4 className="font-medium text-gray-800 mt-1">{task.clientName}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                                                <span>Due: {task.dueDate}</span>
                                                <button className="text-[#2076C7] hover:underline">Add Note</button>
                                                <button className="text-[#2076C7] hover:underline">Reschedule</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-2 bg-white rounded-lg text-gray-600 hover:bg-gray-100">
                                            ✏️
                                        </button>
                                        <button className="p-2 bg-white rounded-lg text-gray-600 hover:bg-gray-100">
                                            ✓
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Calendar View Placeholder */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Upcoming Schedule</h4>
                            <div className="grid grid-cols-7 gap-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                    <div key={day} className="text-center text-xs text-gray-500 py-2">{day}</div>
                                ))}
                                {Array.from({ length: 31 }, (_, i) => (
                                    <div key={i} className="aspect-square bg-gray-50 rounded-lg p-2 text-xs">
                                        <span className="text-gray-600">{i + 1}</span>
                                        {i === 15 && <div className="w-1.5 h-1.5 bg-red-500 rounded-full mx-auto mt-1"></div>}
                                        {i === 16 && <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mx-auto mt-1"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Revenue View */}
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
                                <div className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(rmMetrics.commissionEarned)}</div>
                                <div className="text-xs text-green-500 mt-1">↑ 12% vs last month</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-500">Trail Commission (MF)</div>
                                <div className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(85000)}</div>
                                <div className="text-xs text-green-500 mt-1">Monthly recurring</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-500">Upcoming Payouts</div>
                                <div className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(125000)}</div>
                                <div className="text-xs text-gray-400 mt-1">Next 30 days</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Commission Breakdown</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Mutual Funds</span>
                                        <span className="font-medium">₹ 85,000</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>PMS</span>
                                        <span className="font-medium">₹ 42,000</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '22%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>AIF</span>
                                        <span className="font-medium">₹ 28,000</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Bonds/NCD</span>
                                        <span className="font-medium">₹ 18,000</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Real Estate</span>
                                        <span className="font-medium">₹ 12,000</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-orange-500 rounded-full" style={{ width: '8%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Analytics View */}
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
                                        <span className="font-semibold text-gray-800">{rmMetrics.conversionRate}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-green-500 rounded-full" style={{ width: `${rmMetrics.conversionRate}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Retention Rate</span>
                                        <span className="font-semibold text-gray-800">{rmMetrics.retentionRate}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${rmMetrics.retentionRate}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Client Satisfaction</span>
                                        <span className="font-semibold text-gray-800">{rmMetrics.satisfactionScore}/5</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(rmMetrics.satisfactionScore/5)*100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Targets</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">AUM Target (₹8Cr)</span>
                                        <span className="font-semibold text-gray-800">₹6.2Cr / 78%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Revenue Target (₹5L)</span>
                                        <span className="font-semibold text-gray-800">₹3.8L / 76%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '76%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">New Clients Target (8)</span>
                                        <span className="font-semibold text-gray-800">5 / 63%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '63%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">RM Leaderboard</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Ravi Verma', aum: '₹18.5Cr', clients: 47, revenue: '₹4.2L', rank: 1 },
                                    { name: 'Priya Singh', aum: '₹15.2Cr', clients: 42, revenue: '₹3.8L', rank: 2 },
                                    { name: 'Amit Kumar', aum: '₹12.8Cr', clients: 38, revenue: '₹3.1L', rank: 3 },
                                    { name: 'Neha Shah', aum: '₹10.5Cr', clients: 35, revenue: '₹2.9L', rank: 4 },
                                ].map((rm) => (
                                    <div key={rm.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                                        rm.rank === 1 ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-50'
                                    }`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                rm.rank === 1 ? 'bg-yellow-500 text-white' :
                                                rm.rank === 2 ? 'bg-gray-400 text-white' :
                                                rm.rank === 3 ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                                            }`}>
                                                #{rm.rank}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">{rm.name}</div>
                                                <div className="text-xs text-gray-500">{rm.clients} clients</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-800">{rm.aum}</div>
                                                <div className="text-xs text-gray-500">AUM</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-800">{rm.revenue}</div>
                                                <div className="text-xs text-gray-500">Revenue</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                            {activeTab === 'recommendations' && 'Suggest investments based on client risk profile and goals'}
                            {activeTab === 'portfolio-monitoring' && 'Monitor client portfolios, track alerts and performance'}
                            {activeTab === 'documents' && 'Manage KYC documents, investment forms, and compliance records'}
                            {activeTab === 'communication' && 'Send portfolio reports, proposals, and reminders to clients'}
                        </p>
                        <button className="mt-4 px-6 py-2 bg-[#2076C7] text-white rounded-xl text-sm font-medium hover:bg-[#1a5e9e]">
                            Open {activeTab.replace('-', ' ')}
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