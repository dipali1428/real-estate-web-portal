'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowRight, 
    Ship, 
    Box, 
    Anchor, 
    Scale, 
    Truck, 
    Shield, 
    CheckCircle2,
    Bookmark
} from 'lucide-react';
import MarineInsuranceForm from '@/app/dashboard/leadmanagement/forms/marineinsuranceform';

interface PlanProps {
    name: string;
    carrier: string;
    bestFor: string;
    coverageType: string;
    coverageScope: string;
    sumInsured: string;
    keyBenefits?: string[];
    features?: string[];
    color: string;
    onApply?: (planName: string) => void;
}

const MarineInsurancePlanCard: React.FC<PlanProps> = ({
    name,
    carrier,
    bestFor,
    coverageType,
    coverageScope,
    sumInsured,
    keyBenefits,
    features,
    color,
    onApply
}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const benefits = keyBenefits || features || [];

    const getIcon = (name: string) => {
        const iconClass = "text-white w-7 h-7";
        if (name.includes('Cargo')) return <Ship className={iconClass} strokeWidth={1.8} />;
        if (name.includes('Hull')) return <Anchor className={iconClass} strokeWidth={1.8} />;
        if (name.includes('Transit')) return <Box className={iconClass} strokeWidth={1.8} />;
        if (name.includes('Freight')) return <Truck className={iconClass} strokeWidth={1.8} />;
        if (name.includes('Liability')) return <Scale className={iconClass} strokeWidth={1.8} />;
        return <Shield className={iconClass} strokeWidth={1.8} />;
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-[2rem] border border-blue-50 bg-white p-6 md:p-8 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group shadow-lg shadow-blue-900/5"
            >
                {/* Bookmark Section */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsBookmarked(!isBookmarked);
                    }}
                    className={`absolute top-6 right-6 p-2 rounded-xl backdrop-blur-md transition-all duration-300 shadow-sm border ${
                        isBookmarked
                            ? 'bg-[#2076C7] text-white border-[#2076C7] scale-110'
                            : 'bg-white/90 text-slate-400 border-slate-200 hover:text-[#2076C7] hover:border-[#2076C7] hover:bg-white'
                    }`}
                >
                    <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} strokeWidth={2} />
                </button>

                {/* Center Header */}
                <div className="flex flex-col items-center text-center">
                    <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform"
                        style={{ background: color }}
                    >
                        {getIcon(name)}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{carrier}</div>
                    <h3 className="text-xl font-extrabold text-gray-700 mb-4 tracking-tight">{name}</h3>
                </div>

                {/* Detailed Specs Stacks */}
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm font-bold text-slate-400 uppercase">Best For</span>
                        <span className="text-sm font-extrabold text-slate-700 truncate max-w-[140px] text-right" title={bestFor}>{bestFor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm font-bold text-slate-400 uppercase">Type</span>
                        <span className="text-sm font-extrabold text-[#2076C7] truncate max-w-[140px] text-right" title={coverageType}>{coverageType}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-black/5">
                        <span className="text-sm font-bold text-slate-400 uppercase">Scope</span>
                        <span className="text-sm font-extrabold text-slate-700 truncate max-w-[140px] text-right" title={coverageScope}>{coverageScope}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-bold text-slate-400 uppercase">Sum Insured</span>
                        <span className="text-sm font-extrabold text-slate-700 truncate max-w-[140px] text-right" title={sumInsured}>{sumInsured}</span>
                    </div>
                </div>

                {/* Benefits List */}
                <ul className="space-y-2 mb-8 flex-1">
                    {benefits.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-600">
                            <CheckCircle2 size={14} className="text-teal-500 shrink-0 mt-0.5" strokeWidth={3} />
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Apply Now Button */}
                <div className="mt-auto flex justify-center">
                    <button
                        onClick={() => {
                            onApply?.(name);
                            setShowForm(true);
                        }}
                        className="relative inline-flex items-center gap-2 px-10 py-3.5 rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group/btn whitespace-nowrap"
                        style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-1">
                            Secure Cover
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
                        </span>
                        <div className="absolute inset-0 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 z-0" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                    </button>
                </div>
            </motion.div>
            
            {showForm && (
                <MarineInsuranceForm onClose={() => setShowForm(false)} />
            )}
        </>
    );
};

export default MarineInsurancePlanCard;