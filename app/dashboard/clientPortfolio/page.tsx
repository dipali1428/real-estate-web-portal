"use client"
import React, { useState, useMemo } from 'react';
import {
    clients,
    leads,
    applications,
    documents,
    commissions
} from '../data/clientData';

// Define categories and subcategories
export const categories = {
    'All': ['All'],
    'Loan': ['Personal Loan', 'Home Loan', 'Business Loan', 'Car Loan', 'Education Loan', 'Mortgage Loan', 'SME Loan', 'Balance Transfer Loan', 'Vehicle Loan', 'Loan Against Securities', 'Debt Capital Market (DCM)'],
    'Insurance': ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance', 'Property Insurance', 'Cattle Insurance', 'Marine Insurance'],
    'Investment': ['Mutual Funds', 'Stocks', 'Fixed Deposits', 'Bonds', 'Real Estate', 'Wealth Management', 'PMS / AIF']
};

// Utility functions for initials and colors
const generateInitials = (name: string): string => {
    if (!name) return '?';

    // Remove extra spaces and split into words
    const words = name.trim().split(/\s+/);

    if (words.length === 0) return '?';

    if (words.length === 1) {
        // Single word - take first 2 characters
        return words[0].substring(0, 2).toUpperCase();
    }

    // Multiple words - take first character of first two words
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const generateColorFromName = (name: string): string => {
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-teal-500',
        'bg-orange-500', 'bg-cyan-500', 'bg-blue-600', 'bg-green-600',
        'bg-purple-600', 'bg-pink-600', 'bg-red-600'
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

// Avatar Component
interface ClientAvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({
    name,
    size = 'md',
    className = ''
}) => {
    const initials = generateInitials(name);
    const colorClass = generateColorFromName(name);

    const sizeClasses = {
        sm: 'w-6 h-6 text-xs md:w-8 md:h-8',
        md: 'w-8 h-8 text-sm md:w-10 md:h-10',
        lg: 'w-10 h-10 text-base md:w-12 md:h-12'
    };

    return (
        <div className={`
            ${sizeClasses[size]} 
            ${colorClass}
            rounded-full flex items-center justify-center text-white font-semibold
            shadow-sm ${className}
        `}>
            {initials}
        </div>
    );
};

const ClientPortfolio: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'clients' | 'leads' | 'applications' | 'documents' | 'earnings'>('clients');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

    // Get available subcategories based on selected category
    const availableSubcategories = useMemo(() => {
        if (selectedCategory === 'All') return ['All'];
        return ['All', ...categories[selectedCategory as keyof typeof categories]];
    }, [selectedCategory]);

    // Reset subcategory when category changes
    React.useEffect(() => {
        setSelectedSubcategory('All');
    }, [selectedCategory]);

    // Map products to categories for filtering
    const productCategoryMap: { [key: string]: string } = {
        'Personal Loan': 'Loan',
        'Home Loan': 'Loan',
        'Business Loan': 'Loan',
        'Car Loan': 'Loan',
        'Education Loan': 'Loan',
        'Mortgage Loan': 'Loan',
        'SME Loan': 'Loan',
        'Balance Transfer Loan': 'Loan',
        'Vehicle Loan': 'Loan',
        'Loan Against Securities': 'Loan',
        'Debt Capital Market (DCM)': 'Loan',
        'Insurance': 'Insurance',
        'Life Insurance': 'Insurance',
        'Health Insurance': 'Insurance',
        'Motor Insurance': 'Insurance',
        'Travel Insurance': 'Insurance',
        'Property Insurance': 'Insurance',
        'Cattle Insurance': 'Insurance',
        'Marine Insurance': 'Insurance',
        'Mutual Funds': 'Investment',
        'Credit Card': 'Credit',
        'Investment': 'Investment',
        'Stocks': 'Investment',
        'Fixed Deposits': 'Investment',
        'Bonds': 'Investment',
        'Real Estate': 'Investment',
        'Wealth Management': 'Investment',
        'PMS / AIF': 'Investment',
        'Credit Line': 'Credit',
    };

    // Filter data based on selected category and subcategory
    const filteredClients = useMemo(() => {
        if (selectedCategory === 'All') return clients;

        let filtered = clients.filter(client => {
            const clientCategory = productCategoryMap[client.product];
            return clientCategory === selectedCategory;
        });

        if (selectedSubcategory !== 'All') {
            filtered = filtered.filter(client =>
                client.product.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
                selectedSubcategory.toLowerCase().includes(client.product.toLowerCase())
            );
        }

        return filtered;
    }, [selectedCategory, selectedSubcategory]);

    const filteredLeads = useMemo(() => {
        if (selectedCategory === 'All') return leads;
        const clientIds = filteredClients.map(client => client.id);
        return leads.filter(lead => clientIds.includes(lead.clientId));
    }, [selectedCategory, filteredClients]);

    const filteredApplications = useMemo(() => {
        if (selectedCategory === 'All') return applications;
        const clientIds = filteredClients.map(client => client.id);
        return applications.filter(app => clientIds.includes(app.clientId));
    }, [selectedCategory, filteredClients]);

    const filteredDocuments = useMemo(() => {
        if (selectedCategory === 'All') return documents;
        const clientIds = filteredClients.map(client => client.id);
        return documents.filter(doc => clientIds.includes(doc.clientId));
    }, [selectedCategory, filteredClients]);

    const filteredCommissions = useMemo(() => {
        if (selectedCategory === 'All') return commissions;
        const clientIds = filteredClients.map(client => client.id);
        return commissions.filter(commission => clientIds.includes(commission.clientId));
    }, [selectedCategory, filteredClients]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New':
            case 'New Lead':
                return 'bg-blue-100 text-[#2076C7]';
            case 'In-Progress':
            case 'Under Processing':
            case 'Underwriting':
                return 'bg-yellow-100 text-yellow-800';
            case 'Closed':
            case 'Sanctioned':
            case 'Disbursed':
            case 'Verified':
                return 'bg-green-100 text-green-800';
            case 'Not Interested':
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Document Pending':
                return 'bg-orange-100 text-orange-800';
            case 'Hot':
                return 'bg-red-100 text-red-800';
            case 'Warm':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cold':
                return 'bg-blue-100 text-[#2076C7]';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    // Get counts for tabs based on filtered data
    const tabCounts = {
        clients: filteredClients.length,
        leads: filteredLeads.length,
        applications: filteredApplications.length,
        documents: filteredDocuments.length,
        earnings: filteredCommissions.length
    };

    // Get product distribution for current filter
    const productDistribution = useMemo(() => {
        const distribution: { [key: string]: number } = {};
        filteredClients.forEach(client => {
            distribution[client.product] = (distribution[client.product] || 0) + 1;
        });
        return distribution;
    }, [filteredClients]);

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">My Client Portfolio</h1>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Centralized management of all clients, leads, and applications</p>
                </div>

                {/* Category and Subcategory Filters */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-slate-600 text-sm sm:text-base"
                        >
                            {Object.keys(categories).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                            Product
                        </label>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-slate-600 text-sm sm:text-base"
                        >
                            {availableSubcategories.map(subcategory => (
                                <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-sans font-medium">
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                        <div className="text-xl sm:text-2xl text-slate-700">{filteredClients.length}</div>
                        <div className="text-xs sm:text-sm text-emerald-600">Total Clients</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                        <div className="text-xl sm:text-2xl text-slate-700">{filteredLeads.length}</div>
                        <div className="text-xs sm:text-sm text-blue-500">Active Leads</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                        <div className="text-xl sm:text-2xl text-slate-700">
                            ₹{filteredCommissions.reduce((sum, comm) => sum + comm.pendingCommission, 0).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs sm:text-sm text-green-600">Pending Commission</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                        <div className="text-xl sm:text-2xl text-slate-700">
                            ₹{filteredCommissions.reduce((sum, comm) => sum + comm.paidCommission, 0).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500">Paid Commission</div>
                    </div>
                </div>

                {/* Product Distribution */}
                {selectedCategory !== 'All' && (
                    <div className="mb-6 bg-white rounded-lg p-4 shadow border">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-3">Product Distribution</h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {Object.entries(productDistribution).map(([product, count]) => (
                                <div key={product} className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full text-xs sm:text-sm">
                                    <span className="font-medium text-[#2076C7]">{product}</span>
                                    <span className="bg-[#2076C7] text-white px-1.5 py-0.5 rounded-full text-xs">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'clients' as const, name: 'Clients' },
                            { id: 'leads' as const, name: 'Leads' },
                            { id: 'applications' as const, name: 'Applications' },
                            { id: 'documents' as const, name: 'Documents' },
                            { id: 'earnings' as const, name: 'Earnings' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-2 px-4 rounded-full font-medium text-sm flex items-center border transition-colors ${activeTab === tab.id
                                    ? 'bg-[#2076C7] text-white border-[#2076C7]'
                                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                    }`}
                            >
                                {tab.name}
                                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === tab.id ? 'bg-white text-[#2076C7]' : 'bg-slate-100 text-slate-700'
                                    }`}>
                                    {tabCounts[tab.id]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Client Details */}
                    {activeTab === 'clients' && (
                        <div className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">All Client Details</h2>
                            {filteredClients.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No clients found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <div className="min-w-full max-w-30 inline-block align-middle">
                                        <div className="overflow-hidden">
                                            {/* Mobile Cards View */}
                                            <div className="sm:hidden space-y-4 max-h-96 overflow-y-auto pr-2">
                                                {filteredClients.map(client => (
                                                    <div key={client.id} className="border border-slate-200 rounded-lg p-4">
                                                        <div className="flex items-start space-x-3">
                                                            <ClientAvatar name={client.name} size="sm" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <div className="text-sm font-medium text-slate-900 truncate">{client.name}</div>
                                                                        <div className="text-xs text-slate-500 mt-1">{client.mobile}</div>
                                                                        <div className="text-xs text-slate-500">{client.email}</div>
                                                                    </div>
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#2076C7] ml-2 truncate max-w-[100px] sm:max-w-[150px]">
                                                                        {client.product}
                                                                    </span>
                                                                </div>
                                                                <div className="mt-2 text-xs text-slate-500">
                                                                    {productCategoryMap[client.product] || 'Other'} • {client.relationshipManager || 'Not Assigned'}
                                                                </div>
                                                                <div className="mt-1 text-xs text-slate-400 truncate">{client.address}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Desktop Table View */}
                                            <div className="hidden sm:block max-h-96 overflow-y-auto">
                                                <table className="min-w-full divide-y divide-slate-200">
                                                    <thead className="bg-[#1CADA3] sticky top-0">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Client
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Contact
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Product
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Category
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                RM
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-slate-200">
                                                        {filteredClients.map(client => (
                                                            <tr key={client.id} className="hover:bg-slate-50">
                                                                <td className="px-4 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <ClientAvatar name={client.name} size="sm" />
                                                                        <div className="ml-3">
                                                                            <div className="text-sm font-medium text-slate-900">{client.name}</div>
                                                                            <div className="text-sm text-slate-500">{client.address}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-slate-900 font-sans font-medium">{client.mobile}</div>
                                                                    <div className="text-sm text-slate-500">{client.email}</div>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap">
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#2076C7]">
                                                                        {client.product}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                                                    {productCategoryMap[client.product] || 'Other'}
                                                                </td>
                                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                                                    {client.relationshipManager || 'Not Assigned'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Lead Management */}
                    {activeTab === 'leads' && (
                        <div className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Lead Details</h2>
                            {filteredLeads.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No leads found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="max-h-96 overflow-y-auto pr-2">
                                    <div className="grid gap-3 sm:gap-4">
                                        {filteredLeads.map(lead => {
                                            const client = clients.find(c => c.id === lead.clientId);
                                            return (
                                                <div key={lead.id} className="border border-slate-200 rounded-lg p-4">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                        <div className="flex items-start space-x-3">
                                                            <ClientAvatar name={client?.name || ''} size="md" />
                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="text-base sm:text-lg font-medium text-slate-900 truncate">{client?.name}</h3>
                                                                <p className="text-slate-600 text-sm">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.priority)}`}>
                                                                {lead.priority}
                                                            </span>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                                {lead.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm text-slate-600">
                                                        <div className="flex items-center">
                                                            <span className="font-medium mr-2">Source:</span>
                                                            <span className="truncate">{lead.source}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="font-medium mr-2">Next Follow-up:</span>
                                                            <span>{lead.nextFollowUpDate}</span>
                                                        </div>
                                                        <div className="flex items-center sm:col-span-2 lg:col-span-1">
                                                            <span className="font-medium mr-2">Activity:</span>
                                                            <span className="truncate">{lead.followUpActivity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-sm text-slate-600">
                                                        <span className="font-medium">Notes:</span>
                                                        <span className="ml-1 line-clamp-2">{lead.notes}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Application Status */}
                    {activeTab === 'applications' && (
                        <div className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Application Status Tracking</h2>
                            {filteredApplications.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No applications found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="max-h-96 overflow-y-auto pr-2">
                                    <div className="space-y-3 sm:space-y-4">
                                        {filteredApplications.map(app => {
                                            const client = clients.find(c => c.id === app.clientId);
                                            return (
                                                <div key={app.clientId} className="border border-slate-200 rounded-lg p-4">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                        <div className="flex items-center space-x-3">
                                                            <ClientAvatar name={client?.name || ''} size="sm" />
                                                            <div className="min-w-0">
                                                                <h3 className="text-base sm:text-lg font-medium text-slate-900 truncate">{client?.name}</h3>
                                                                <p className="text-slate-600 text-sm">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)} self-start sm:self-auto`}>
                                                            {app.status}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 text-sm text-slate-600">
                                                        Last Updated: {app.lastUpdated}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Documents */}
                    {activeTab === 'documents' && (
                        <div className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">Uploaded Document Records</h2>
                            {filteredDocuments.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No documents found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto -mx-4 sm:mx-0">
                                    <div className="min-w-full max-w-30 inline-block align-middle">
                                        <div className="overflow-hidden">
                                            {/* Mobile Cards View */}
                                            <div className="sm:hidden space-y-4 max-h-96 overflow-y-auto pr-2">
                                                {filteredDocuments.map((doc, index) => {
                                                    const client = clients.find(c => c.id === doc.clientId);
                                                    return (
                                                        <div key={`${doc.clientId}-${doc.type}-${index}`} className="border border-slate-200 rounded-lg p-4">
                                                            <div className="flex items-start space-x-3">
                                                                <ClientAvatar name={client?.name || ''} size="sm" />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between">
                                                                        <div>
                                                                            <div className="text-sm font-medium text-slate-900 truncate">{client?.name}</div>
                                                                            <div className="text-xs text-slate-500 mt-1">{doc.type}</div>
                                                                            <div className="text-xs text-slate-500">{doc.name}</div>
                                                                        </div>
                                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)} ml-2 truncate max-w-[100px] sm:max-w-[150px]`}>
                                                                            {doc.status}
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-1 text-xs text-slate-400">{doc.uploadedDate}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Desktop Table View */}
                                            <div className="hidden sm:block max-h-96 overflow-y-auto">
                                                <table className="min-w-full divide-y divide-slate-200">
                                                    <thead className="bg-[#1CADA3] sticky top-0">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Client
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Document Type
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                File Name
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                                Upload Date
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-slate-200">
                                                        {filteredDocuments.map((doc, index) => {
                                                            const client = clients.find(c => c.id === doc.clientId);
                                                            return (
                                                                <tr key={`${doc.clientId}-${doc.type}-${index}`} className="hover:bg-slate-50">
                                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <ClientAvatar name={client?.name || ''} size="sm" />
                                                                            <div className="ml-3">
                                                                                <div className="text-sm font-medium text-slate-900">{client?.name}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                                                        {doc.type}
                                                                    </td>
                                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                                                        {doc.name}
                                                                    </td>
                                                                    <td className="px-4 py-4 whitespace-nowrap">
                                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                                                            {doc.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">
                                                                        {doc.uploadedDate}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Earnings */}
                    {activeTab === 'earnings' && (
                        <div className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Earnings & Commission Mapping</h2>
                            {filteredCommissions.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No commission records found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="max-h-96 overflow-y-auto pr-2">
                                    <div className="grid gap-3 sm:gap-4">
                                        {filteredCommissions.map(commission => {
                                            const client = clients.find(c => c.id === commission.clientId);
                                            return (
                                                <div key={commission.clientId} className="border border-slate-200 rounded-lg p-4">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                                                        <div className="flex items-center space-x-3">
                                                            <ClientAvatar name={client?.name || ''} size="md" />
                                                            <div className="min-w-0">
                                                                <h3 className="text-base sm:text-lg font-medium text-slate-900 truncate">{client?.name}</h3>
                                                                <p className="text-slate-600 text-sm">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                                        <div className="text-center">
                                                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#2076C7]">₹{commission.expectedPayout.toLocaleString()}</div>
                                                            <div className="text-xs sm:text-sm text-slate-500">Expected Payout</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#1CADA3]">₹{commission.approvedPayout.toLocaleString()}</div>
                                                            <div className="text-xs sm:text-sm text-slate-500">Approved Payout</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#2076C7]">₹{commission.paidCommission.toLocaleString()}</div>
                                                            <div className="text-xs sm:text-sm text-slate-500">Paid Commission</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#1CADA3]">₹{commission.pendingCommission.toLocaleString()}</div>
                                                            <div className="text-xs sm:text-sm text-slate-500">Pending Commission</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className="mt-6 sm:mt-8 bg-blue-50 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-[#2076C7] mb-3 sm:mb-4">Why My Client Portfolio Is Useful for DSAs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {[
                            'Centralized record of all clients and leads',
                            'Helps improve follow-up and conversions',
                            'Saves time and avoids manual tracking',
                            'Gives a full view of monthly and yearly business',
                            'Shows which leads require urgent attention',
                            'Strengthens customer relationship management'
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start">
                                <div className="shrink-0">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2076C7] rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="ml-2 sm:ml-3 text-xs sm:text-sm text-[#2076C7]">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPortfolio;
