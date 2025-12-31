"use client"
import React, { FC, useState, useEffect, useMemo } from 'react';
import ClientAvatar from './ClientAvatar';
import Pagination from './Pagination';
import { Client } from '../types';
import { DashboardService } from "@/app/services/dashboardService";

interface ClientDetailsProps {
    clients: Client[];
    pagination: {
        data: any[];
        totalPages: number;
        totalItems: number;
    };
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (items: number) => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({
    pagination,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage
}) => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);
                const response = await DashboardService.getLeads();
                console.log("Fetched leads:", response);
                // Use the data array from your API format
                const rawData = response?.success ? response.data : response;
                if (Array.isArray(rawData)) {
                    setLeads(rawData);
                }
            } catch (error) {
                console.error("Failed to fetch leads:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const displayData = leads.length > 0 ? leads : pagination.data;

    // Summary counts based on your new fields
    const stats = useMemo(() => ({
        total: displayData.length,
        incoming: displayData.filter(item => item.status === "INCOMING").length,
        unlisted: displayData.filter(item => item.department === "Unlisted").length,
    }), [displayData]);

    
    return (
        <div className="p-4 sm:p-6">
            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Records</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-blue-500">Incoming Status</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.incoming}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-[#1CADA3]">Unlisted Dept</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.unlisted}</p>
                </div>
            </div> */}

            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">Client Portfolio Details</h2>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Details</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dept / Sub-Cat</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-10 text-slate-500">Loading...</td></tr>
                        ) : displayData.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                                    {item.id}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <ClientAvatar name={item.lead_name} size="sm" />
                                        <span className="ml-3 text-sm font-semibold text-slate-900">{item.lead_name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900">{item.contact_number}</div>
                                    <div className="text-xs text-slate-500">{item.email}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900">{item.department}</div>
                                    <div className="text-xs text-slate-400">{item.sub_category}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        item.status === 'INCOMING' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500">
                                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={pagination.totalItems}
                onItemsPerPageChange={setItemsPerPage}
            />
        </div>
    );
};

export default ClientDetails;