'use client';

import { useState, useEffect } from 'react';
import { ncdData } from '../../data/ncdData';
import { Search } from 'lucide-react';

interface ActiveIssuesViewProps {
    onInvest: (id: string) => void;
    onApply: (id: string) => void;
}

export default function ActiveIssuesView({ onInvest, onApply }: ActiveIssuesViewProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredData = ncdData.filter(item => {
        const matchesSearch = item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-[#1CADA3] text-[#1CADA3] bg-opacity-10';
            case 'Upcoming': return 'bg-[#2076C7] text-[#2076C7] bg-opacity-10';
            case 'Closed': return 'bg-gray-500 text-gray-500 bg-opacity-10';
            default: return 'bg-gray-500 text-gray-500 bg-opacity-10';
        }
    };

    return (
        <div className="py-12">
            <div className="container-custom">
                {/* Page Header */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1C2E] mb-6">
                        All Active <span className="heading-gradient">NCD Issues</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Explore our comprehensive list of high-yield Non-Convertible Debentures.
                        Filter by status, search by issuer, and find the perfect investment for your portfolio.
                    </p>
                </div>

                {/* Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by Issuer or NCD Title..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#2076C7] font-medium text-[#0B1C2E]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl">
                        {['All', 'Open', 'Upcoming', 'Closed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterStatus === status
                                    ? 'bg-[#1CADA3] text-white shadow-md'
                                    : 'text-gray-500 hover:text-[#0B1C2E]'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.length > 0 ? (
                        filteredData.map((ncd, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(ncd.status)}`}>
                                        {ncd.status}
                                    </div>
                                    <div className="bg-gray-50 px-2 py-1 rounded-md text-xs font-bold text-gray-500 flex items-center">
                                        <span className="text-[#1CADA3] mr-1">₹˜…</span> {ncd.rating}
                                    </div>
                                </div>

                                <div className="mb-6 flex-grow">
                                    <h3 className="text-xl font-bold text-[#0B1C2E] mb-2 line-clamp-2">{ncd.title}</h3>
                                    <p className="text-[#2076C7] font-bold text-sm mb-4">{ncd.issuer}</p>

                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Yield</p>
                                            <p className="text-lg font-black text-[#1CADA3]">{ncd.interest}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Min Inv.</p>
                                            <p className="text-base font-bold text-[#0B1C2E]">{ncd.minInvest}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => onInvest(ncd.id)}
                                        className="flex-1 py-3 border border-[#2076C7]/10 text-[#2076C7] font-bold rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors text-sm"
                                    >
                                        Invest Now
                                    </button>
                                    {ncd.status === 'Open' ? (
                                        <button
                                            onClick={() => onApply(ncd.id)}
                                            className="flex-[2] py-3 bg-[#1CADA3] text-white font-bold rounded-xl flex items-center justify-center group-hover:bg-[#2076C7] transition-all shadow-md hover:shadow-lg text-sm"
                                        >
                                            Apply Now
                                        </button>
                                    ) : (
                                        <button className="flex-[2] py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed text-sm">
                                            {ncd.status === 'Closed' ? 'Closed' : 'Notify Me'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0B1C2E] mb-2">No NCDs Found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                                className="mt-6 text-[#2076C7] font-bold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
