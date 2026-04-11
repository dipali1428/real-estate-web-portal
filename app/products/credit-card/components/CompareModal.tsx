'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCheck } from '@tabler/icons-react';

interface Card {
    id: number;
    bank: string;
    title: string;
    image: string;
    joiningFee: string;
    annualFee: string;
    bestFor: string;
    highlights: string[];
    detailedFeatures: string[];
    tags: string[];
}

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    cards: Card[];
    onApply: (title: string) => void;
}

const comparisonRows = [
    { label: 'Joining Fee', key: 'joiningFee' },
    { label: 'Annual Fee', key: 'annualFee' },
    { label: 'Annual Fee Wave off Criteria', key: 'waveOff', default: 'Spend based waiver' },
    { label: 'Interest Rate', key: 'interestRate', default: '3.5% per month' },
    { label: 'Best Suited For', key: 'bestFor' },
    { label: 'Card Type', key: 'cardType', getValue: (card: Card) => card.tags[0] || 'Visa/Mastercard' },
    { label: 'Interest Free Period', key: 'interestFree', default: 'Up to 50 days' },
    { label: 'Welcome Benefits', key: 'welcome', getValue: (card: Card) => card.highlights[1] || 'Welcome Vouchers' },
    { label: 'Features', key: 'features', getValue: (card: Card) => (
        <ul className="space-y-2">
            {card.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="text-[11px] leading-tight flex items-start gap-1">
                    <span className="text-teal-500 mt-1">•</span> {h}
                </li>
            ))}
        </ul>
    )},
    { label: 'Lounge access', key: 'lounge', getValue: (card: Card) => (card.tags.some(t => t.toLowerCase().includes('lounge')) ? 'Yes' : 'Nil') },
    { label: 'Rewards Point value', key: 'rewardValue', default: '1 Reward Point = ₹0.25' },
    { label: 'Minimum credit score required', key: 'creditScore', default: '750+' },
    { label: 'Milestone benefits', key: 'milestones', getValue: (card: Card) => card.detailedFeatures[2] || 'Vouchers on milestone spends' }
];

export default function CompareModal({ isOpen, onClose, cards, onApply }: CompareModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex-grow text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-800">Compare your Credit Card</h2>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <IconX size={24} className="text-slate-400" />
                        </button>
                    </div>

                    {/* Comparison Table */}
                    <div className="flex-grow overflow-auto">
                        <div className="min-w-[800px]">
                            {/* Card Headers */}
                            <div className="grid grid-cols-[200px_1fr_1fr_1fr] bg-slate-50/50">
                                <div className="p-6 border-r border-b border-slate-100 flex flex-col justify-end">
                                    <div className="flex flex-wrap gap-1 text-[10px] font-bold text-[#2076C7]">
                                        {cards.map((c, i) => (
                                            <span key={c.id}>
                                                {c.title}{i < cards.length - 1 ? ' vs ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {[0, 1, 2].map((idx) => {
                                    const card = cards[idx];
                                    return (
                                        <div key={idx} className={`p-6 border-b border-slate-100 flex flex-col items-center text-center relative ${idx < 2 ? 'border-r' : ''}`}>
                                            {idx > 0 && <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-[10px] font-black text-slate-400 px-1 z-10">VS</span>}
                                            {card ? (
                                                <>
                                                    <div className="h-24 w-full flex items-center justify-center mb-4">
                                                        <img src={card.image} alt={card.title} className="max-h-full object-contain drop-shadow-lg" />
                                                    </div>
                                                    <h3 className="text-sm font-black text-slate-800 mb-4 line-clamp-1">{card.title}</h3>
                                                    <button 
                                                        onClick={() => onApply(card.title)}
                                                        className="w-full py-2 bg-[#1CADA3] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#189991] transition-all"
                                                    >
                                                        Apply
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center py-10">
                                                    <div className="w-16 h-10 border-2 border-dashed border-slate-200 rounded-lg mb-3 flex items-center justify-center">
                                                        <IconCheck size={20} className="text-slate-100" />
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-400">Select Compare Checkbox Above.</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Comparison Body */}
                            <div className="divide-y divide-slate-100">
                                {/* Basic Details Header */}
                                <div className="bg-blue-50/50 py-2 px-6 text-center text-[10px] font-black uppercase tracking-widest text-[#2076C7]">
                                    Basic Details
                                </div>

                                {comparisonRows.map((row, rowIndex) => (
                                    <div key={row.key}>
                                        {/* Row Category Headers */}
                                        {row.key === 'welcome' && (
                                            <div className="bg-blue-50/50 py-2 px-6 text-center text-[10px] font-black uppercase tracking-widest text-[#2076C7]">
                                                Benefits & Rewards
                                            </div>
                                        )}
                                        <div className="grid grid-cols-[200px_1fr_1fr_1fr] hover:bg-slate-50 transition-colors">
                                            <div className="p-4 md:p-6 border-r border-slate-100 flex items-center">
                                                <span className="text-xs font-black text-slate-700">{row.label}</span>
                                            </div>
                                            {[0, 1, 2].map((idx) => {
                                                const card = cards[idx];
                                                return (
                                                    <div key={idx} className={`p-4 md:p-6 flex items-center justify-center text-center ${idx < 2 ? 'border-r' : ''} border-slate-100`}>
                                                        {card ? (
                                                            <div className="text-xs font-bold text-slate-600">
                                                                {row.getValue ? row.getValue(card) : (card as any)[row.key] || row.default || 'N/A'}
                                                            </div>
                                                        ) : (
                                                            <span className="text-slate-200">—</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
