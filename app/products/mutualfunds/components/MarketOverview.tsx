"use client";

import React from 'react';
import { useMarketIndices } from '../../../hooks/useInvestmentData';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function MarketOverview() {
    const { data: marketIndices, isLoading } = useMarketIndices();

    // Filter out Gold as per user request
    const filteredIndices = Array.isArray(marketIndices) ? marketIndices.filter((index: any) =>
        index && index.name && !index.name.toLowerCase().includes('gold')
    ) : [];

    const isBullish = filteredIndices.length > 0 && filteredIndices.some((i: any) => i.trend === 'up');

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-xl">
                        <Activity className="text-[#2076C7] w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
                        <p className="text-sm text-gray-500">Live performance of major Indian indices</p>
                    </div>
                </div>

                {!isLoading && filteredIndices.length > 0 && (
                    <div className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-2 ${isBullish
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                        : 'bg-rose-50 border-rose-100 text-rose-700'
                        }`}>
                        <span>{isBullish ? '🚀' : '📉'} Market Sentiment:</span>
                        <strong className="uppercase">{isBullish ? 'Bullish' : 'Bearish'}</strong>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-28 bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
                    ))
                ) : filteredIndices.length > 0 ? (
                    filteredIndices.map((index: any, idx: number) => (
                        <div
                            key={idx}
                            className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-blue-100 hover:shadow-md transition-all group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{index.name}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${index.trend === 'up'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-rose-100 text-rose-700'
                                    }`}>
                                    {index.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(Number(index.changePercent))}%
                                </span>
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="text-2xl font-black text-gray-900 font-sans">
                                    {Number(index.price).toLocaleString('en-IN')}
                                </div>
                                <div className={`text-sm font-bold ${Number(index.change) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {Number(index.change) >= 0 ? '+' : ''}{index.change}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center">
                        <p className="text-gray-400 font-medium">Market data temporarily unavailable</p>
                    </div>
                )}
            </div>
        </div>
    );
}
