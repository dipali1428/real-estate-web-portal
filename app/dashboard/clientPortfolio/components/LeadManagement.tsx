"use client"
import React from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client, Lead } from '../types';
import { getStatusColor } from '../utils/helpers';
import { productCategoryMap } from '../utils/categories';

interface LeadManagementProps {
    leads: Lead[];
    clients: Client[];
    pagination: {
        data: Lead[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const LeadManagement: React.FC<LeadManagementProps> = ({
    leads,
    clients,
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => {
    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Lead Details</h2>
            {leads.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500">No leads found for the selected category filter.</p>
                </div>
            ) : (
                <>
                    <div className="pr-2">
                        <div className="grid gap-3 sm:gap-4">
                            {pagination.data.map(lead => {
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
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={pagination.totalItems}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </>
            )}
        </div>
    );
};

export default LeadManagement;