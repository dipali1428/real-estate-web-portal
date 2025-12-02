"use client"
import React from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client, Application } from '../types';
import { getStatusColor } from '../utils/helpers';
import { productCategoryMap } from '../utils/categories';

interface ApplicationStatusProps {
    applications: Application[];
    clients: Client[];
    pagination: {
        data: Application[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
    applications,
    clients,
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => (
    <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Application Status Tracking</h2>
        {applications.length === 0 ? (
            <div className="text-center py-8">
                <p className="text-slate-500">No applications found for the selected category filter.</p>
            </div>
        ) : (
            <>
                <div className="pr-2">
                    <div className="space-y-3 sm:space-y-4">
                        {pagination.data.map(app => {
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={pagination.totalItems}
                    onItemsPerPageChange={setItemsPerPage} />
            </>
        )}
    </div>
);

export default ApplicationStatus;