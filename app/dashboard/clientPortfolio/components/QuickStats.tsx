"use client"
import React from 'react';

interface QuickStatsProps {
    totalClients: number;
    totalLeads: number;
    pendingCommission: number;
    paidCommission: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
    totalClients,
    totalLeads,
    pendingCommission,
    paidCommission
}) => {
    return (
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-sans font-medium">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                <div className="text-xl sm:text-2xl text-slate-700">{totalClients}</div>
                <div className="text-xs sm:text-sm text-emerald-600">Total Clients</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                <div className="text-xl sm:text-2xl text-slate-700">{totalLeads}</div>
                <div className="text-xs sm:text-sm text-blue-500">Active Leads</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                <div className="text-xl sm:text-2xl text-slate-700">
                    ₹{pendingCommission.toLocaleString('en-IN')}
                </div>
                <div className="text-xs sm:text-sm text-green-600">Pending Commission</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow border">
                <div className="text-xl sm:text-2xl text-slate-700">
                    ₹{paidCommission.toLocaleString('en-IN')}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">Paid Commission</div>
            </div>
        </div>
    );
};

export default QuickStats;