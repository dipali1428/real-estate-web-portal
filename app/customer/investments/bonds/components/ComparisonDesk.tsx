'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bond } from '../../../../products/bonds/data/bondsData';

interface ComparisonDeskProps {
    selectedCompareIds: number[];
    setSelectedCompareIds: React.Dispatch<React.SetStateAction<number[]>>;
    bondsData: Bond[];
    onExplore: () => void;
}

export default function ComparisonDesk({ selectedCompareIds, setSelectedCompareIds, bondsData, onExplore }: ComparisonDeskProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddBond = (id: number) => {
        if (selectedCompareIds.length < 3) {
            setSelectedCompareIds(prev => [...prev, id]);
            setSearchQuery('');
        }
    };

    return (
        <div className="space-y-10 font-sans">
            <header className="max-w-2xl">
                <h2 className="text-lg font-black text-[#2076C7] mb-2 font-sans tracking-tight uppercase">Technical Assessment Suite</h2>
                <p className="text-slate-500 text-sm font-bold font-sans">Cross-evaluate up to 3 instruments for yield alpha and coupon matrices.</p>
            </header>

            {/* Selection Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[0, 1, 2].map((idx) => {
                    const bond = bondsData.find(b => b.id === selectedCompareIds[idx]);
                    return (
                        <div 
                            key={idx}
                            className={`relative h-56 rounded-[2.5rem] border-2 border-dashed transition-all p-6 flex flex-col justify-center items-center text-center ${
                                bond ? 'border-[#2076C7] bg-white shadow-xl shadow-blue-50/30' : 'border-slate-200 bg-slate-50/30'
                            }`}
                        >
                            {bond ? (
                                <>
                                    <button 
                                        onClick={() => setSelectedCompareIds(prev => prev.filter(id => id !== bond.id))}
                                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors bg-slate-100 p-1.5 rounded-full"
                                    >
                                        <Plus className="w-4 h-4 rotate-45" />
                                    </button>
                                    <span className="bg-[#1CADA3]/10 text-[#1CADA3] text-[9px] font-black px-2.5 py-1 rounded-lg uppercase mb-2 tracking-widest font-sans">{bond.category}</span>
                                    <h4 className="font-extrabold text-slate-900 text-sm line-clamp-2 px-1 leading-tight font-sans">{bond.company}</h4>
                                    <div className="mt-4 flex gap-4 text-[10px] font-black font-sans">
                                        <div><p className="text-slate-400 uppercase tracking-tighter font-sans">Yield</p><p className="text-[#1CADA3] font-sans">{bond.yield}</p></div>
                                        <div><p className="text-slate-400 uppercase tracking-tighter font-sans">Rating</p><p className="text-[#2076C7] font-sans">{bond.rating}</p></div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full px-4 relative group">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Search and Add..."
                                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-[11px] font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 bg-white shadow-sm placeholder:text-slate-300 transition-all font-sans"
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={(e) => (e.target as any).select()}
                                        />
                                    </div>
                                    
                                    {/* 🔷 Professional Search Dropdown */}
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 max-h-[220px] overflow-y-auto p-2 opacity-0 group-focus-within:opacity-100 pointer-events-none group-focus-within:pointer-events-auto transition-all scale-95 group-focus-within:scale-100 origin-top">
                                        {bondsData
                                            .filter(b => !selectedCompareIds.includes(b.id) && 
                                                    (b.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                     b.category.toLowerCase().includes(searchQuery.toLowerCase())))
                                            .slice(0, 10)
                                            .map(b => (
                                                <button 
                                                    key={b.id}
                                                    onMouseDown={() => handleAddBond(b.id)}
                                                    className="w-full text-left p-3 hover:bg-slate-50 rounded-xl flex items-center justify-between group/item transition-colors"
                                                >
                                                    <div className="flex flex-col font-sans">
                                                        <span className="text-[8px] font-black text-[#1CADA3] uppercase mb-0.5 tracking-widest font-sans">{b.category}</span>
                                                        <span className="text-[10px] font-bold text-slate-800 line-clamp-1 font-sans">{b.company}</span>
                                                    </div>
                                                    <Plus className="w-3 h-3 text-slate-300 group-hover/item:text-[#2076C7]" />
                                                </button>
                                            ))}
                                        {bondsData.filter(b => !selectedCompareIds.includes(b.id) && 
                                                    (b.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                     b.category.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                                            <p className="p-4 text-[9px] font-black text-slate-400 text-center uppercase tracking-widest font-sans">No matching assets</p>
                                        )}
                                    </div>
                                    <p className="mt-3 text-[9px] font-black text-slate-300 uppercase tracking-widest animate-pulse font-sans">Slot {idx + 1}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedCompareIds.length > 0 && (
                <div className="space-y-10">
                    {/* Yield Mapping Chart */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 relative z-10 flex items-center gap-2 font-sans">
                            <BarChart3 className="w-4 h-4 text-[#2076C7]" /> Yield Alpha Projection Matrix
                        </h4>
                        <div className="h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={selectedCompareIds.map(id => {
                                    const b = bondsData.find(x => x.id === id);
                                    return {
                                        name: b?.company.slice(0, 10) + '...',
                                        Yield: parseFloat(b?.yield?.replace('%', '') || '0'),
                                        Coupon: parseFloat(b?.coupon?.replace('%', '') || '0')
                                    }
                                })}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: '900' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94A3B8', fontWeight: '900' }} tickFormatter={(v) => `${v}%`} />
                                    <Tooltip 
                                        cursor={{ fill: '#F8FAFC' }}
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui' }}
                                        itemStyle={{ fontSize: '11px', fontWeight: '900', fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui' }}
                                    />
                                    <Bar dataKey="Yield" fill="#2076C7" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="Coupon" fill="#1CADA3" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* 🔷 Comparison Details Table */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="grid grid-cols-4 bg-slate-50/50 border-b border-slate-100">
                            <div className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">Assessment Matrix</div>
                            {selectedCompareIds.map(id => (
                                <div key={id} className="p-6 text-center text-[11px] font-black text-slate-900 border-l border-slate-100 truncate flex items-center justify-center font-sans">
                                    {bondsData.find(b => b.id === id)?.company}
                                </div>
                            ))}
                        </div>
                        {[
                            { label: 'Category Unit', key: 'category' },
                            { label: 'Credit Rating', key: 'rating' },
                            { label: 'Alpha Yield (%)', key: 'yield' },
                            { label: 'Coupon Rate', key: 'coupon' },
                            { label: 'Min. Investment', key: 'minInvestment' },
                            { label: 'Maturity Span', key: 'maturity' }
                        ].map((row, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-4 border-b border-slate-100 group hover:bg-blue-50/20 transition-all font-sans">
                                <div className="p-6 text-xs font-black text-slate-500 uppercase tracking-tighter font-sans">{row.label}</div>
                                {selectedCompareIds.map(id => {
                                    const b = bondsData.find(x => x.id === id) as any;
                                    return (
                                        <div key={id} className="p-6 border-l border-slate-100 text-center text-xs font-bold text-slate-900 font-sans">
                                            {b?.[row.key] || 'N/A'}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
