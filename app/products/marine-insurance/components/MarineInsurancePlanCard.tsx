'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Ship, Box, Anchor, Scale, Truck, Shield } from 'lucide-react';

interface PlanProps {
    name: string;
    carrier: string;
    bestFor: string;
    coverageType: string;
    coverageScope: string;
    sumInsured: string;
    keyBenefits: string[];
    color: string;
    onApply: (planName: string) => void;
    onGetQuote: () => void;
    onTalkToAdvisor: () => void;
}

const MarineInsurancePlanCard: React.FC<PlanProps> = ({
    name,
    carrier,
    bestFor,
    coverageType,
    coverageScope,
    sumInsured,
    keyBenefits,
    color,
    onApply,
    onGetQuote,
    onTalkToAdvisor
}) => {
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
            <div className="p-6 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0"
                            style={{ backgroundColor: color }}
                        >
                            {getIcon(name)}
                        </div>
                        <div className="pt-1">
                            <h3 className="text-lg font-bold text-blue-900 leading-tight">
                                {name}
                            </h3>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1.5">
                                {carrier}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-3 mb-6 text-left">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Best For: <span className="text-[12px] text-gray-800 normal-case">{bestFor}</span></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type: <span className="text-[12px] text-gray-800 normal-case">{coverageType}</span></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scope: <span className="text-[12px] text-gray-800 normal-case">{coverageScope}</span></span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sum Insured: <span className="text-[12px] text-gray-800 normal-case">{sumInsured}</span></span>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="flex-grow">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Key Benefits</p>
                    <div className="space-y-2.5 mb-6">
                        {keyBenefits.map((feature, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <CheckCircle2 size={16} className="text-[#1CADA3] shrink-0" strokeWidth={2.5} />
                                <span className="text-[12px] font-bold text-gray-600 leading-snug">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Section */}
                <div className="mt-auto flex flex-col items-start gap-3 pt-6 border-t border-gray-50">
                    <button
                        onClick={onGetQuote}
                        className="w-48 py-3.5 text-white rounded-lg font-bold tracking-widest text-[11px] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase"
                        style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                    >
                        Get Free Quote
                        <ArrowRight size={14} />
                    </button>
                    <button
                        onClick={onTalkToAdvisor}
                        className="w-48 py-3.5 bg-white text-blue-900 rounded-lg font-bold tracking-widest text-[11px] border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-center gap-2 uppercase shadow-sm"
                    >
                        Talk to Advisor
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MarineInsurancePlanCard;

