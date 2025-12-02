"use client"
import React from 'react';

interface SearchFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    availableStatuses?: string[];
    placeholder?: string;
    showStatusFilter?: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    availableStatuses = [],
    placeholder = "Search...",
    showStatusFilter = true
}) => {
    return (
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7]"
                        placeholder={placeholder}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg className="h-5 w-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Status Filter */}
            {showStatusFilter && availableStatuses.length > 0 && (
                <div className="w-full sm:w-48">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2076C7] focus:border-[#2076C7]"
                    >
                        <option value="All">All Status</option>
                        {availableStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default SearchFilter;