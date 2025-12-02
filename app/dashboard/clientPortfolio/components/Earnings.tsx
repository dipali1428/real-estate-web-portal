"use client"
import React from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client, Commission } from '../types';
import { productCategoryMap } from '../utils/categories';

interface EarningsProps {
    commissions: Commission[];
    clients: Client[];
    pagination: {
        data: Commission[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const Earnings: React.FC<EarningsProps> = ({
    commissions,
    clients,
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => {
    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Earnings & Commission Mapping</h2>
            {commissions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500">No commission records found for the selected category filter.</p>
                </div>
            ) : (
                <>
                    <div className="pr-2">
                        <div className="grid gap-3 sm:gap-4">
                            {pagination.data.map(commission => {
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

export default Earnings;