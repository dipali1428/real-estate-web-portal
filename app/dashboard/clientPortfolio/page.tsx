"use client"
import React, { useState, useMemo } from 'react';
import {
    clients,
    leads,
    applications,
    documents,
    commissions
} from '../../data/clientData';

// Define categories and subcategories
export const categories = {
    'All': ['All'],
    'Loan': ['Personal Loan', 'Home Loan', 'Business Loan', 'Car Loan', 'Education Loan', 'Mortgage Loan', 'SME Loan','Balance Transfer Loan', 'Vehicle Loan','Loan Against Securities', 'Debt Capital Market (DCM)'],
    'Insurance': ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance','Property Insurance','Cattle Insurance','Marine Insurance'],
    'Investment': ['Mutual Funds', 'Stocks', 'Fixed Deposits', 'Bonds', 'Real Estate','Wealth Management','PMS / AIF']
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
        'Mortgage Loan' : 'Loan',
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
                return 'bg-gray-100 text-gray-800';
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-600">My Client Portfolio</h1>
                    <p className="text-gray-500 mt-2">Centralized management of all clients, leads, and applications</p>
                </div>

                {/* Category and Subcategory Filters */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-gray-600"
                        >
                            {Object.keys(categories).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Product
                        </label>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7] text-gray-600"
                        >
                            {availableSubcategories.map(subcategory => (
                                <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#2076C7] rounded-lg p-4 shadow border">
                        <div className="text-2xl font-bold text-white">{filteredClients.length}</div>
                        <div className="text-sm text-white">Total Clients</div>
                    </div>
                    <div className="bg-[#2076C7] rounded-lg p-4 shadow border">
                        <div className="text-2xl font-bold text-white">{filteredLeads.length}</div>
                        <div className="text-sm text-white">Active Leads</div>
                    </div>
                    <div className="bg-[#2076C7] rounded-lg p-4 shadow border">
                        <div className="text-2xl font-bold text-white">
                            ₹{filteredCommissions.reduce((sum, comm) => sum + comm.pendingCommission, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-white">Pending Commission</div>
                    </div>
                    <div className="bg-[#2076C7] rounded-lg p-4 shadow border">
                        <div className="text-2xl font-bold text-white]">
                            ₹{filteredCommissions.reduce((sum, comm) => sum + comm.paidCommission, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-white">Paid Commission</div>
                    </div>
                </div>

                {/* Product Distribution */}
                {selectedCategory !== 'All' && (
                    <div className="mb-6 bg-white rounded-lg p-4 shadow border">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Distribution</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(productDistribution).map(([product, count]) => (
                                <div key={product} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                                    <span className="text-sm font-medium text-[#2076C7]">{product}</span>
                                    <span className="bg-[#2076C7] text-white text-xs px-2 py-0.5 rounded-full">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="mb-6">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'clients' as const, name: 'Client Details' },
                            { id: 'leads' as const, name: 'Lead Management' },
                            { id: 'applications' as const, name: 'Application Status' },
                            { id: 'documents' as const, name: 'Documents' },
                            { id: 'earnings' as const, name: 'Earnings' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-[#2076C7] text-[#2076C7]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.name}
                                <span className="ml-2 bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                                    {tabCounts[tab.id]}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-lg shadow">
                    {/* Client Details */}
                    {activeTab === 'clients' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">All Client Details</h2>
                            {filteredClients.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No clients found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-[#1CADA3]">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Client
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Contact
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    RM
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredClients.map(client => (
                                                <tr key={client.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                                        <div className="text-sm text-gray-500">{client.address}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{client.mobile}</div>
                                                        <div className="text-sm text-gray-500">{client.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-[#2076C7]">
                                                            {client.product}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {productCategoryMap[client.product] || 'Other'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {client.relationshipManager || 'Not Assigned'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Lead Management */}
                    {activeTab === 'leads' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lead Details</h2>
                            {filteredLeads.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No leads found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredLeads.map(lead => {
                                        const client = clients.find(c => c.id === lead.clientId);
                                        return (
                                            <div key={lead.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{client?.name}</h3>
                                                        <p className="text-gray-600">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.priority)}`}>
                                                            {lead.priority}
                                                        </span>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                            {lead.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Source:</span> {lead.source}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Next Follow-up:</span> {lead.nextFollowUpDate}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Activity:</span> {lead.followUpActivity}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    <span className="font-medium">Notes:</span> {lead.notes}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Application Status */}
                    {activeTab === 'applications' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Status Tracking</h2>
                            {filteredApplications.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No applications found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredApplications.map(app => {
                                        const client = clients.find(c => c.id === app.clientId);
                                        return (
                                            <div key={app.clientId} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{client?.name}</h3>
                                                        <p className="text-gray-600">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                    </div>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                                <div className="mt-3 text-sm text-gray-600">
                                                    Last Updated: {app.lastUpdated}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Documents */}
                    {activeTab === 'documents' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Document Records</h2>
                            {filteredDocuments.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No documents found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-[#1CADA3]">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Client
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Document Type
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    File Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                    Upload Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredDocuments.map((doc, index) => {
                                                const client = clients.find(c => c.id === doc.clientId);
                                                return (
                                                    <tr key={`${doc.clientId}-${doc.type}-${index}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {client?.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {doc.type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {doc.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                                                {doc.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {doc.uploadedDate}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Earnings */}
                    {activeTab === 'earnings' && (
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Earnings & Commission Mapping</h2>
                            {filteredCommissions.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No commission records found for the selected category filter.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {filteredCommissions.map(commission => {
                                        const client = clients.find(c => c.id === commission.clientId);
                                        return (
                                            <div key={commission.clientId} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900">{client?.name}</h3>
                                                        <p className="text-gray-600">{client?.product} • {productCategoryMap[client?.product || '']}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[#2076C7]">₹{commission.expectedPayout.toLocaleString()}</div>
                                                        <div className="text-sm text-gray-500">Expected Payout</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[#1CADA3]">₹{commission.approvedPayout.toLocaleString()}</div>
                                                        <div className="text-sm text-gray-500">Approved Payout</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[#2076C7]">₹{commission.paidCommission.toLocaleString()}</div>
                                                        <div className="text-sm text-gray-500">Paid Commission</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[#1CADA3]">₹{commission.pendingCommission.toLocaleString()}</div>
                                                        <div className="text-sm text-gray-500">Pending Commission</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#2076C7] mb-4">Why My Client Portfolio Is Useful for DSAs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                    <div className="w-6 h-6 bg-[#2076C7] rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="ml-3 text-sm text-[#2076C7]">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPortfolio;