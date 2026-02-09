"use client";

import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PortfolioHealthMonitor() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <ShieldCheck className="text-blue-600" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Portfolio Health</h3>
                    <p className="text-sm text-gray-600">Risk & Compliance Monitoring</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <span className="text-sm font-medium text-green-900">Volatility Score</span>
                    </div>
                    <span className="text-sm font-bold text-green-700">OPTIMAL</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" size={20} />
                        <span className="text-sm font-medium text-green-900">Diversification Index</span>
                    </div>
                    <span className="text-sm font-bold text-green-700">HEALTHY</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="text-yellow-600" size={20} />
                        <span className="text-sm font-medium text-yellow-900">Cash Exposure</span>
                    </div>
                    <span className="text-sm font-bold text-yellow-700">WATCHLIST</span>
                </div>
            </div>
        </div>
    );
}
