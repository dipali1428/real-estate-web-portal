"use client"
import React from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client } from '../types';
import { productCategoryMap } from '../utils/categories';

interface ClientDetailsProps {
    clients: Client[];
    pagination: {
        data: Client[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({
    clients,
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => {
    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">All Client Details</h2>
            {clients.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500">No clients found for the selected category filter.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-full max-w-30 inline-block align-middle">
                            <div className="overflow-hidden">
                                {/* Mobile Cards View */}
                                <div className="sm:hidden space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {pagination.data.map(client => (
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
                                <div className="hidden sm:block">
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
                                            {pagination.data.map(client => (
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

export default ClientDetails;