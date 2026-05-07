"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { DashboardService } from "@/app/services/dashboardService";
import { toast } from 'react-hot-toast';

interface QuickStatsProps {
    // These props are now optional because we are fetching data internally
    totalClients?: number;
    totalLeads?: number;
    pendingCommission?: number;
    paidCommission?: number;
}

const QuickStats: React.FC<QuickStatsProps> = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await DashboardService.getLeads();
                
                // Handling the API response format based on your ClientDetails logic
                const rawData = response?.success ? response.data : response;
                
                if (Array.isArray(rawData)) {
                    setData(rawData);
                }
            } catch (error) {
                toast.error("Failed to fetch stats:");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate stats dynamically from the fetched data
    const stats = useMemo(() => {
        const totalLeads = data.length;
        
        // Logic for unique clients (based on lead_name)
        const uniqueClients = new Set(data.map(item => item.lead_name)).size;

        // Logic for Commission (Adjust field names 'commission_amount' and 'payment_status' 
        // to match your actual API response)
        const pending = data
            .filter(item => item.payment_status?.toUpperCase() === 'PENDING' || item.status === 'INCOMING')
            .reduce((sum, item) => sum + (Number(item.commission_amount) || 0), 0);

        const paid = data
            .filter(item => item.payment_status?.toUpperCase() === 'PAID')
            .reduce((sum, item) => sum + (Number(item.commission_amount) || 0), 0);

        return {
            totalClients: uniqueClients || totalLeads,
            totalLeads: totalLeads,
            pendingCommission: pending,
            paidCommission: paid
        };
    }, [data]);

    if (loading) {
        return (
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-slate-50 h-20 rounded-lg border"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-sans font-medium">
            {/* Total Clients */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border border-slate-100">
                <div className="text-xl sm:text-2xl font-bold text-slate-700">{stats.totalClients}</div>
                <div className="text-xs sm:text-sm text-emerald-600">Total Clients</div>
            </div>

            {/* Active Leads */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border border-slate-100">
                <div className="text-xl sm:text-2xl font-bold text-slate-700">{stats.totalLeads}</div>
                <div className="text-xs sm:text-sm text-blue-500">Active Leads</div>
            </div>

            {/* Pending Commission */}
            {/* <div className="bg-white rounded-lg p-3 sm:p-4 shadow border border-slate-100">
                <div className="text-xl sm:text-2xl font-bold text-slate-700">
                    ₹{stats.pendingCommission.toLocaleString('en-IN')}
                </div>
                <div className="text-xs sm:text-sm text-orange-500">Pending Commission</div>
            </div> */}

            {/* Paid Commission */}
            {/* <div className="bg-white rounded-lg p-3 sm:p-4 shadow border border-slate-100">
                <div className="text-xl sm:text-2xl font-bold text-slate-700">
                    ₹{stats.paidCommission.toLocaleString('en-IN')}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">Paid Commission</div>
            </div> */}
        </div>
    );
};

export default QuickStats;