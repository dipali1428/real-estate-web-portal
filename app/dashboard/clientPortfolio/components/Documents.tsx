"use client"
import React from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client, Document } from '../types';
import { getStatusColor } from '../utils/helpers';

interface DocumentsProps {
    documents: Document[];
    clients: Client[];
    pagination: {
        data: Document[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const Documents: React.FC<DocumentsProps> = ({
    documents,
    clients,
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => {
    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">Uploaded Document Records</h2>
            {documents.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500">No documents found for the selected category filter.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-full max-w-30 inline-block align-middle">
                            <div className="overflow-hidden">
                                {/* Mobile Cards View */}
                                <div className="sm:hidden space-y-4 pr-2">
                                    {pagination.data.map((doc, index) => {
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
                                <div className="hidden sm:block">
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
                                            {pagination.data.map((doc, index) => {
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

export default Documents;