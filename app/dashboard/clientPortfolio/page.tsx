"use client"
import React, { useState, useMemo, useEffect } from 'react';
import {
    clients,
    // leads,
    applications,
    documents
    // commissions
} from '../data/clientData';

// Components
import Filters from './components/Filters';
import QuickStats from './components/QuickStats';
import ProductDistribution from './components/ProductDistribution';
import NavigationTabs from './components/NavigationTabs';
import ClientDetails from './components/ClientDetails';
// import LeadManagement from './components/LeadManagement';
import ApplicationStatus from './components/ApplicationStatus';
import Documents from './components/Documents';
// import Earnings from './components/Earnings';
import BenefitsSection from './components/BenefitsSection';

// Utils & Types
import { categories, productCategoryMap } from './utils/categories';
import { getPaginatedData } from './utils/helpers';
import { ActiveTab } from './types';

const ClientPortfolio: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('clients');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
    
    // Pagination states
    const [clientsPage, setClientsPage] = useState(1);
    const [leadsPage, setLeadsPage] = useState(1);
    const [applicationsPage, setApplicationsPage] = useState(1);
    const [documentsPage, setDocumentsPage] = useState(1);
    const [earningsPage, setEarningsPage] = useState(1);
    
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Reset pagination when filters or tabs change
    useEffect(() => {
        setClientsPage(1);
        setLeadsPage(1);
        setApplicationsPage(1);
        setDocumentsPage(1);
        setEarningsPage(1);
    }, [selectedCategory, selectedSubcategory, activeTab]);

    // Get available subcategories
    const availableSubcategories = useMemo(() => {
        if (selectedCategory === 'All') return ['All'];
        return ['All', ...categories[selectedCategory as keyof typeof categories]];
    }, [selectedCategory]);

    // Reset subcategory when category changes
    useEffect(() => {
        setSelectedSubcategory('All');
    }, [selectedCategory]);

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

    // const filteredLeads = useMemo(() => {
    //     if (selectedCategory === 'All') return leads;
    //     const clientIds = filteredClients.map(client => client.id);
    //     return leads.filter(lead => clientIds.includes(lead.clientId));
    // }, [selectedCategory, filteredClients]);

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

   

    // Get paginated data for each tab
    const clientsPagination = getPaginatedData(filteredClients, clientsPage, itemsPerPage);
    // const leadsPagination = getPaginatedData(filteredLeads, leadsPage, itemsPerPage);
    const applicationsPagination = getPaginatedData(filteredApplications, applicationsPage, itemsPerPage);
    const documentsPagination = getPaginatedData(filteredDocuments, documentsPage, itemsPerPage);
    // const earningsPagination = getPaginatedData(filteredCommissions, earningsPage, itemsPerPage);

    // Get product distribution
    const productDistribution = useMemo(() => {
        const distribution: { [key: string]: number } = {};
        filteredClients.forEach(client => {
            distribution[client.product] = (distribution[client.product] || 0) + 1;
        });
        return distribution;
    }, [filteredClients]);

    // Get tab counts
    const tabCounts = {
        clients: filteredClients.length,
        applications: filteredApplications.length,
        documents: filteredDocuments.length
    };

    // Calculate commission totals
 

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">My Client Portfolio</h1>
                    <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Centralized management of all clients, leads, and applications</p>
                </div>

                {/* Filters */}
                <Filters
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    setSelectedSubcategory={setSelectedSubcategory}
                    availableSubcategories={availableSubcategories}
                />

                {/* Quick Stats */}
                

                {/* Product Distribution */}
                {selectedCategory !== 'All' && (
                    <ProductDistribution productDistribution={productDistribution} />
                )}

                {/* Navigation Tabs */}
                <NavigationTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabCounts={tabCounts}
                />

                {/* Content Sections */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Client Details */}
                    {activeTab === 'clients' && (
                        <ClientDetails
                            clients={filteredClients}
                            pagination={clientsPagination}
                            currentPage={clientsPage}
                            setCurrentPage={setClientsPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    )}

                    {/* Lead Management */}
                    {/* {activeTab === 'leads' && (
                        <LeadManagement
                            leads={filteredLeads}
                            clients={clients}
                            pagination={leadsPagination}
                            currentPage={leadsPage}
                            setCurrentPage={setLeadsPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    )} */}

                    {/* Application Status */}
                    {activeTab === 'applications' && (
                        <ApplicationStatus
                            applications={filteredApplications}
                            clients={clients}
                            pagination={applicationsPagination}
                            currentPage={applicationsPage}
                            setCurrentPage={setApplicationsPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    )}

                    {/* Documents */}
                    {activeTab === 'documents' && (
                        <Documents
                            documents={filteredDocuments}
                            clients={clients}
                            pagination={documentsPagination}
                            currentPage={documentsPage}
                            setCurrentPage={setDocumentsPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    )}

                    {/* Earnings */}
                    {/* {activeTab === 'earnings' && (
                        <Earnings
                            commissions={filteredCommissions}
                            clients={clients}
                            pagination={earningsPagination}
                            currentPage={earningsPage}
                            setCurrentPage={setEarningsPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    )} */}
                </div>

                {/* Benefits Section */}
                <BenefitsSection />
            </div>
        </div>
    );
};

export default ClientPortfolio;