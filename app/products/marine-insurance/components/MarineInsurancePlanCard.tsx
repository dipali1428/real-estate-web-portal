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
    onApply
}) => {
    const getIcon = (name: string) => {
        const iconClass = "text-white w-7 h-7";
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
            <div className="p-8 flex flex-col h-full">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-4">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-blue-600 shrink-0"
                            style={{ backgroundColor: '#1d4ed8' }} // Solid blue as seen in image
                        >
                            {getIcon(name)}
                        </div>
                        <div className="pt-1">
                            <h3 className="text-xl font-bold text-blue-900 leading-tight">
                                {name}
                            </h3>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1.5">
                                {carrier}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-4 mb-10 text-left">
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
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5">Key Benefits</p>
                    <div className="space-y-4 mb-10">
                        {keyBenefits.map((feature, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" strokeWidth={2.5} />
                                <span className="text-[13px] font-bold text-gray-600 leading-snug">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Section */}
                <div className="mt-auto space-y-3 pt-6 border-t border-gray-50">
                    <button
                        onClick={() => onApply(name)}
                        className="w-full py-5 text-white rounded-lg font-bold tracking-widest text-[11px] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase"
                        style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)' }}
                    >
                        Get Free Quote
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => onApply(name)}
                        className="w-full py-5 bg-white text-blue-900 rounded-lg font-bold tracking-widest text-[11px] border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-center gap-2 uppercase shadow-sm"
                    >
                        Talk to Advisor
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MarineInsurancePlanCard;

