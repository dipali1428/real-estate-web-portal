'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowRight, 
    CheckCircle2, 
    Ship, 
    Box, 
    Anchor, 
    Scale, 
    Truck, 
    Shield, 
    Target, 
    ClipboardList, 
    Globe, 
    ShieldCheck 
} from 'lucide-react';

interface PlanProps {
    name: string;
    carrier: string;
    bestFor: string;
    coverageType: string;
    coverageScope: string;
    sumInsured: string;
    keyBenefits?: string[];
    features?: string[]; // Handle both naming conventions
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
    const benefits = keyBenefits || features || [];

    const getIcon = (name: string) => {
        const iconClass = "text-white w-6 h-6";
        if (name.includes('Cargo')) return <Ship className={iconClass} />;
        if (name.includes('Hull')) return <Anchor className={iconClass} />;
        if (name.includes('Transit')) return <Box className={iconClass} />;
        if (name.includes('Freight')) return <Truck className={iconClass} />;
        if (name.includes('Liability')) return <Scale className={iconClass} />;
        return <Shield className={iconClass} />;
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden text-left flex flex-col h-full"
        >
            {/* Design Gradient overlay */}
            <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-[0.05] pointer-events-none"
                style={{ backgroundColor: color }}
            />

            <div className="p-6 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                            style={{ backgroundColor: color }}
                        >
                            {getIcon(name)}
                        </div>
                        <div className="pt-1">
                            <h3 className="text-lg font-black text-slate-800 leading-tight">
                                {name}
                            </h3>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-[0.2em] mt-2">
                                {carrier}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Section - NEAT 2x2 GRID */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                        { label: "Best For", value: bestFor, icon: Target, color: "text-[#2076C7]", bg: "bg-blue-50/50" },
                        { label: "Type", value: coverageType, icon: ClipboardList, color: "text-[#1CADA3]", bg: "bg-purple-50/50" },
                        { label: "Scope", value: coverageScope, icon: Globe, color: "text-[#2076C7]", bg: "bg-emerald-50/50" },
                        { label: "Sum Insured", value: sumInsured, icon: ShieldCheck, color: "text-[#1CADA3]", bg: "bg-amber-50/50" }
                    ].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-2xl border border-gray-100 ${item.bg} flex flex-col gap-1.5 transition-all hover:bg-white hover:shadow-sm`}>
                            <div className="flex items-center gap-1.5">
                                <item.icon size={12} className={item.color} />
                                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none pt-0.5">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-800 leading-tight truncate px-0.5" title={item.value}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="flex-grow space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-0.5 w-6 bg-[#1CADA3] rounded-full" />
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Key Coverage</p>
                    </div>
                    <div className="space-y-2.5 mb-6">
                        {benefits.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1CADA3] shrink-0" />
                                <span className="text-[11px] font-bold text-gray-600 leading-tight">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Section */}
                <div className="mt-auto flex flex-col items-start gap-3 pt-6 border-t border-gray-50">
                    <button
                        onClick={() => onApply?.(name)}
                        className="w-full py-4 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:shadow-[#2076C7]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
                        style={{ background: 'linear-gradient(135deg, #2076C7, #1CADA3)' }}
                    >
                        Secure Cover
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MarineInsurancePlanCard;