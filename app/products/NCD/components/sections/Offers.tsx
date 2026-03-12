'use client';

import { useState } from 'react';
import { ncdData } from '../../data/ncdData';
import { ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import Calculator from './Calculator';

interface OffersProps {
    onInvest: (id: string) => void;
    onApply: (id: string) => void;
    onViewAll: () => void;
}

const Offers = ({ onInvest, onApply, onViewAll }: OffersProps) => {
    const [filter, setFilter] = useState('All');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-[#1CADA3] text-white';
            case 'Upcoming': return 'bg-[#2076C7] text-white';
            case 'Closed': return 'bg-gray-400 text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    const filteredOffers =
        filter === 'All' ? ncdData : ncdData.filter(o => o.status === filter);

    return (
        <section className="py-12 md:py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 font-sans" id="offers">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 pt-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Active Opportunities
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium">
                        Handpicked high-yield NCDs available for subscription right now.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center mb-10">
                    <div className="flex flex-wrap justify-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto">
                        {['All', 'Open', 'Upcoming', 'Closed'].map(status => (
                            <button
                                suppressHydrationWarning={true}
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${filter === status
                                    ? 'bg-[#2076C7] text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-800'
                                    }`}>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Offers List */}
                    <div className="lg:col-span-9 space-y-5">
                        {filteredOffers.map((offer, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-5 md:p-6
                                           border border-slate-200
                                           shadow-[0_8px_24px_rgba(0,0,0,0.04)]
                                           hover:shadow-[0_14px_32px_rgba(0,0,0,0.06)]
                                           transition-shadow duration-300
                                           relative overflow-hidden">

                                <div
                                    className={`absolute top-0 left-0 w-1 md:w-0.5 h-full ${getStatusColor(offer.status)
                                        .replace('text-', 'bg-')
                                        }`}
                                />

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                    {/* Left Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span
                                                className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${getStatusColor(
                                                    offer.status
                                                )}`}>
                                                {offer.status}
                                            </span>
                                            <span className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                                                <Star className="w-3 h-3 mr-1 text-[#1CADA3] fill-[#1CADA3]" />
                                                {offer.rating}
                                            </span>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-bold text-[#0B1C2E] leading-tight font-sans">
                                            {offer.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-semibold mb-6">
                                            {offer.issuer}
                                        </p>

                                        {/* Data Grid: 2 columns on mobile, 4 on desktop */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                                            <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100/50">
                                                <div className="text-[9px] uppercase text-slate-400 font-black tracking-widest mb-1">
                                                    Returns
                                                </div>
                                                <div className="text-lg md:text-xl font-black text-[#1CADA3]">
                                                    {offer.interest}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100/50">
                                                <div className="text-[9px] uppercase text-slate-400 font-black tracking-widest mb-1">
                                                    Tenure
                                                </div>
                                                <div className="text-sm md:text-base font-bold text-slate-700">
                                                    {offer.tenure}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100/50">
                                                <div className="text-[9px] uppercase text-slate-400 font-black tracking-widest mb-1">
                                                    Min Inv.
                                                </div>
                                                <div className="text-sm md:text-base font-bold text-slate-700">
                                                    {offer.minInvest}
                                                </div>
                                            </div>
                                            <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100/50">
                                                <div className="text-[9px] uppercase text-slate-400 font-black tracking-widest mb-1">
                                                    Payout
                                                </div>
                                                <div className="text-sm md:text-base font-bold text-slate-700">
                                                    {offer.payout}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                                        {offer.status === 'Open' ? (
                                            <button
                                                suppressHydrationWarning={true}
                                                onClick={() => onApply(offer.id)}
                                                className="w-full md:w-44 py-3.5 md:py-3 bg-[#1CADA3]
                                                           text-white font-bold rounded-xl
                                                           hover:bg-[#17968c] transition
                                                           flex items-center justify-center">
                                                Apply Now
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </button>
                                        ) : (
                                            <button
                                                suppressHydrationWarning={true}
                                                className="w-full md:w-44 py-3.5 md:py-3 bg-slate-100
                                                           text-slate-400 font-bold rounded-xl
                                                           cursor-not-allowed">
                                                {offer.status === 'Closed' ? 'Closed' : 'Notify Me'}
                                            </button>
                                        )}

                                        <button
                                            suppressHydrationWarning={true}
                                            onClick={() => onInvest(offer.id)}
                                            className="w-full md:w-44 py-3.5 md:py-3 bg-white
                                                       text-[#1CADA3] font-bold rounded-xl
                                                       border border-[#1CADA3]/30
                                                       hover:bg-slate-50 transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-6">

                            {/* Active Issues */}
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-[0_6px_18px_rgba(0,0,0,0.05)] relative">
                                <div className="absolute top-0 right-0 bg-[#1CADA3] text-white text-[10px] px-2 py-1 rounded-bl-lg">
                                    Live
                                </div>
                                <h4 className="font-semibold text-slate-800 mb-4 flex items-center font-sans">
                                    <ArrowUpRight className="w-4 h-4 mr-2 text-[#2076C7]" />
                                    Active Issues
                                </h4>

                                <div className="space-y-3 mb-4">
                                    {ncdData
                                        .filter(o => o.status === 'Open')
                                        .slice(0, 3)
                                        .map((offer, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => onInvest(offer.id)}
                                                className="flex justify-between items-center py-2 px-2 rounded-md hover:bg-slate-50 cursor-pointer"
                                            >
                                                <div className="max-w-[70%]">
                                                    <div className="text-xs font-medium text-slate-800 truncate">
                                                        {offer.issuer}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400">
                                                        {offer.rating}
                                                    </div>
                                                </div>
                                                <div className="text-sm font-semibold text-[#1CADA3]">
                                                    {offer.interest}
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <button
                                    suppressHydrationWarning={true}
                                    onClick={onViewAll}
                                    className="w-full py-2.5 bg-[#2076C7] text-white text-xs font-medium rounded-lg hover:bg-[#1a65ab] transition">
                                    View All Offers
                                </button>
                            </div>

                            {/* Calculator */}
                            <Calculator isWidget={true} />

                            {/* Trust Badge */}
                            <div className="bg-[#1CADA3] p-5 rounded-xl text-white text-center shadow-lg shadow-[#1CADA3]/20">
                                <h5 className="text-xs font-semibold uppercase tracking-wide mb-1 font-sans">
                                    Trusted by 50K+ Investors
                                </h5>
                                <p className="text-[11px] text-white/90">
                                    SEBI regulated & CRISIL rated products only
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Offers;