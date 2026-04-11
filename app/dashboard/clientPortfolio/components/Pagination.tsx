"use client"
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    totalItems: number;
    onItemsPerPageChange?: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
    onItemsPerPageChange
}) => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 mt-4 pt-4 border-t border-slate-200">
            {/* Items per page selector */}
            {onItemsPerPageChange && (
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Show:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#2076C7] text-gray-700"
                    >
                        {[5, 10, 20, 50].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm text-slate-500">
                        of {totalItems} items
                    </span>
                </div>
            )}

            {/* Page navigation */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border text-sm ${currentPage === 1
                            ? 'text-slate-400 border-slate-300 cursor-not-allowed'
                            : 'text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                >
                    Previous
                </button>

                <div className="flex items-center space-x-1">
                    {startPage > 1 && (
                        <>
                            <button
                                onClick={() => onPageChange(1)}
                                className={`px-3 py-1 rounded text-sm ${currentPage === 1
                                        ? 'bg-[#2076C7] text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                1
                            </button>
                            {startPage > 2 && (
                                <span className="px-2 text-slate-400">...</span>
                            )}
                        </>
                    )}

                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded text-sm ${currentPage === page
                                    ? 'bg-[#2076C7] text-white'
                                    : 'text-slate-700 hover:bg-slate-100'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && (
                                <span className="px-2 text-slate-400">...</span>
                            )}
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className={`px-3 py-1 rounded text-sm ${currentPage === totalPages
                                        ? 'bg-[#2076C7] text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages
                            ? 'text-slate-400 border-slate-300 cursor-not-allowed'
                            : 'text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                >
                    Next
                </button>
            </div>

            {/* Page info */}
            <div className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;