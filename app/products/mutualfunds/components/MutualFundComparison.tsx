'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Plus, X, Search, Sparkles, TrendingUp, TrendingDown, Info, Scale, LineChart as LineChartIcon } from 'lucide-react'
import { searchMutualFunds, fetchFundDetails } from '../services/mfApi'
import { Line } from 'react-chartjs-2'
import { motion, AnimatePresence } from 'framer-motion'

const SUGGESTED_FUNDS = [
    { name: " SBI Large Cap FUND-DIRECT PLAN -GROWTH", code: 119598 },
    { name: "HDFC Mid Cap Fund - Growth Option", code: 118989 },
    { name: "Aditya Birla Sun Life Banking & PSU Debt Fund", code: 119551 },
    { name: "Mirae Asset Large Cap", code: 118834 },
    { name: " Axis Large Cap Fund - Direct Plan - Growth", code: 120465 }
]

// Parse MFAPI date format: DD-MM-YYYY
const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null
    const [dd, mm, yyyy] = dateStr.split('-').map(Number)
    if (!dd || !mm || !yyyy) return null
    const d = new Date(yyyy, mm - 1, dd)
    return isNaN(d.getTime()) ? null : d
}

export default function MutualFundComparison() {
    const [selectedFunds, setSelectedFunds] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [loadingFund, setLoadingFund] = useState<number | null>(null)

    // Search logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsSearching(true)
                try {
                    const results = await searchMutualFunds(searchQuery)
                    setSearchResults(results.slice(0, 5))
                } catch (error) {
                    console.error('Search failed', error)
                    setSearchResults([])
                } finally {
                    setIsSearching(false)
                }
            } else {
                setSearchResults([])
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    const addFund = async (code: number) => {
        if (selectedFunds.some(f => f.id === code)) {
            setSearchQuery('')
            setSearchResults([])
            return
        }
        if (selectedFunds.length >= 3) {
            alert('You can compare a maximum of 3 funds')
            return
        }

        setLoadingFund(code)
        try {
            const details = await fetchFundDetails(code)

            // Normalize Historical Data
            const history = details.data
                .map((d: any) => ({
                    date: parseDate(d.date),
                    nav: parseFloat(d.nav)
                }))
                .filter((d: any) => d.date !== null)
                .sort((a: any, b: any) => a.date - b.date)

            if (history.length === 0) throw new Error("No historical data")

            // Calculate 1Y Return
            const latestNav = history[history.length - 1].nav
            const yearAgoDate = new Date()
            yearAgoDate.setFullYear(yearAgoDate.getFullYear() - 1)
            const yearAgoPoint = history.find((p: any) => p.date >= yearAgoDate) || history[0]
            const return1Y = ((latestNav - yearAgoPoint.nav) / yearAgoPoint.nav) * 100

            const newFund = {
                id: details.meta.scheme_code,
                name: details.meta.scheme_name,
                category: details.meta.scheme_category || 'N/A',
                nav: latestNav.toFixed(2),
                return1Y: return1Y.toFixed(1),
                risk: details.meta.scheme_category?.includes('Debt') ? 'Low' : 'High',
                fundHouse: details.meta.fund_house,
                history: history.slice(-365) // Last 1 year for chart
            }

            setSelectedFunds([...selectedFunds, newFund])
            setSearchQuery('')
            setSearchResults([])
        } catch (error) {
            console.error('Failed to add fund', error)
            alert('Could not fetch fund details')
        } finally {
            setLoadingFund(null)
        }
    }

    const removeFund = (id: number) => {
        setSelectedFunds(selectedFunds.filter(f => f.id !== id))
    }

    // Chart Data Preparation (Indexed NAV)
    const chartData = useMemo(() => {
        if (selectedFunds.length === 0) return null

        // Find the date range common to all or just use the last 365 days of the first one
        const labels = selectedFunds[0].history.map((h: any) =>
            h.date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' })
        )

        const colors = ['#2076C7', '#1CADA3', '#F59E0B']

        return {
            labels,
            datasets: selectedFunds.map((fund, idx) => {
                const baseNav = fund.history[0].nav
                return {
                    label: fund.name,
                    data: fund.history.map((h: any) => ((h.nav / baseNav) * 100).toFixed(2)),
                    borderColor: colors[idx],
                    backgroundColor: colors[idx] + '20', // Add transparency
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: false
                }
            })
        }
    }, [selectedFunds])

    return (
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-12">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-4">
                    Compare Funds & Performance
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
                    Select up to 3 funds to see how they perform side-by-side.
                </p>
            </div>

            {/* Selection Area */}
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Suggested Funds */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm font-medium text-slate-500 mr-2">Top Choices:</span>
                    {SUGGESTED_FUNDS.map((fund) => (
                        <button
                            key={fund.code}
                            onClick={() => addFund(fund.code)}
                            disabled={selectedFunds.some(f => f.id === fund.code) || loadingFund !== null}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedFunds.some(f => f.id === fund.code)
                                ? 'bg-blue-50 border-blue-200 text-blue-600'
                                : 'bg-white border-gray-200 text-slate-600 hover:border-[#1CADA3] hover:text-[#1CADA3]'
                                } ${loadingFund === fund.code ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loadingFund === fund.code ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                                    Loading...
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <Plus size={14} />
                                    {fund.name}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search another fund to compare..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 text-black border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent transition-all"
                    />
                    {isSearching && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-[#1CADA3]"></div>
                        </div>
                    )}

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {searchResults.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                            >
                                {searchResults.map((fund) => (
                                    <button
                                        key={fund.schemeCode}
                                        onClick={() => addFund(fund.schemeCode)}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-none flex justify-between items-center transition-colors group"
                                    >
                                        <div>
                                            <div className="font-medium text-slate-900 text-sm group-hover:text-[#2076C7]">{fund.name}</div>
                                            <div className="text-xs text-slate-500">Code: {fund.schemeCode}</div>
                                        </div>
                                        <Plus size={16} className="text-[#1CADA3]" />
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Comparison Content */}
            {selectedFunds.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Comparison Table */}
                    <div className="lg:col-span-12 xl:col-span-5 bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Metric</th>
                                        {selectedFunds.map((fund) => (
                                            <th key={fund.id} className="p-4 text-left min-w-[150px]">
                                                <div className="flex justify-between items-start gap-2">
                                                    <span className="text-slate-950 font-bold text-sm line-clamp-2">{fund.name}</span>
                                                    <button onClick={() => removeFund(fund.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-100">
                                        <td className="p-4 font-medium text-slate-600">NAV</td>
                                        {selectedFunds.map(fund => (
                                            <td key={fund.id} className="p-4 font-bold text-slate-900">₹{fund.nav}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-4 font-medium text-slate-600">1Y Return</td>
                                        {selectedFunds.map(fund => (
                                            <td key={fund.id} className="p-4">
                                                <div className={`flex items-center gap-1 font-bold ${parseFloat(fund.return1Y) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                    {parseFloat(fund.return1Y) >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                    {fund.return1Y}%
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="p-4 font-medium text-slate-600">Category</td>
                                        {selectedFunds.map(fund => (
                                            <td key={fund.id} className="p-4 font-medium text-slate-700">{fund.category}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-slate-600">Risk Profile</td>
                                        {selectedFunds.map(fund => (
                                            <td key={fund.id} className="p-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${fund.risk === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    }`}>
                                                    {fund.risk}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <LineChartIcon className="w-5 h-5 text-[#2076C7]" />
                                Performance (Last 1 Year)
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                <Info size={14} /> Indexed to 100 for fair comparison
                            </div>
                        </div>
                        <div className="h-[350px] w-full bg-white p-4 rounded-3xl border border-gray-100 shadow-sm relative">
                            {chartData && (
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                align: 'end',
                                                labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } }
                                            },
                                            tooltip: {
                                                mode: 'index',
                                                intersect: false,
                                                backgroundColor: '#fff',
                                                titleColor: '#000',
                                                bodyColor: '#64748b',
                                                borderColor: '#e2e8f0',
                                                borderWidth: 1,
                                                padding: 10,
                                                bodyFont: { size: 11 }
                                            }
                                        },
                                        scales: {
                                            x: { display: true, grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6 } },
                                            y: { display: true, grid: { color: '#f1f5f9' }, min: 80 }
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Scale size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Funds Selected</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-light">
                        Select a popular fund from above or use the search box to start comparing performance.
                    </p>
                </div>
            )}
        </section>
    )
}
