'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
    IconShieldCheck, IconInfoCircle, IconCurrencyDollar, 
    IconClock, IconWorld, IconUserCheck, IconCreditCard,
    IconChevronDown, IconChevronUp
} from '@tabler/icons-react';

const coverageData = [
  { name: 'Hospitalisation Expenses for Injury and Illness', basis: 'Indemnity', coverage: 'USD 5,00,000', deductible: 'USD 100' },
  { name: 'Outpatient Treatment for Illness and Injury', basis: 'Indemnity', coverage: 'USD 50,000', deductible: 'USD 100' },
  { name: 'Medical Evacuation', basis: 'Indemnity', coverage: 'USD 50,000', deductible: 'USD 100' },
  { name: 'Repatriation of Remains', basis: 'Indemnity', coverage: 'USD 50,000', deductible: 'USD 100' },
  { name: 'Dental Treatment', basis: 'Indemnity', coverage: 'USD 500', deductible: 'USD 50' },
  { name: 'Loss of Checked-in Baggage', basis: 'Indemnity', coverage: 'USD 500', deductible: 'USD 0' },
  { name: 'Delay of Checked-in Baggage', basis: 'Benefit', coverage: 'USD 100', deductible: '3 Hrs' },
  { name: 'Personal Accident', basis: 'Benefit', coverage: 'USD 10,000', deductible: 'USD 0' },
  { name: 'Trip Cancellation', basis: 'Indemnity', coverage: 'USD 1,000', deductible: 'USD 0' },
  { name: 'Common Carrier Delay', basis: 'Benefit', coverage: 'USD 200', deductible: '6 Hrs' },
  { name: 'Loss of Passport and International Driving License', basis: 'Benefit', coverage: 'USD 300', deductible: 'USD 0' },
  { name: 'Personal Liability', basis: 'Indemnity', coverage: 'USD 50,000', deductible: '5 % of actuals' },
  { name: 'Political Risk And Catastrophe Evacuation', basis: 'Indemnity', coverage: 'USD 5,000', deductible: 'USD 100' },
  { name: 'Upgradation to Business Class', basis: 'Indemnity', coverage: 'USD 1,500', deductible: 'USD 0' },
  { name: 'KIDNAP DISTRESS ALLOWANCE', basis: 'Benefit', coverage: 'USD 250', deductible: 'USD 0' },
  { name: 'Medical Aid Cover in case of Illness and Injury', basis: 'Indemnity', coverage: 'USD 300', deductible: 'USD 100' },
  { name: 'REIMBURSEMENT OF GREEN FEES', basis: 'Indemnity', coverage: 'USD 50', deductible: 'USD 10' },
  { name: 'Physiotherapy', basis: 'Indemnity', coverage: 'USD 500', deductible: 'USD 100' },
  { name: 'Daily Allowance in case of Hospitalization', basis: 'Benefit', coverage: 'USD 50', deductible: '3 Days' },
  { name: 'Credit Card Secure', basis: 'Indemnity', coverage: 'USD 2,000', deductible: 'USD 100' },
  { name: 'QUARANTINE COVER', basis: 'Indemnity', coverage: 'USD 250', deductible: '50 % Copay' },
  { name: 'Pre-existing disease: life-threatening condition for Insured member 1', basis: 'Indemnity', coverage: 'USD 10,000', deductible: 'USD 100' },
  { name: 'Pre-existing disease: life-threatening condition for Insured member 2', basis: 'Indemnity', coverage: 'USD 10,000', deductible: 'USD 100' },
];

export default function DashboardView() {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? coverageData : coverageData.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
        
        <div className="mb-8">
            <h3 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-3 mb-2">
                <IconShieldCheck className="text-[#2076C7]" size={24} />
                Policy Summary & Details
            </h3>
            <p className="text-slate-500 text-sm font-medium">
                Kindly find below the details you have provided for your travel insurance protection.
            </p>
        </div>

        {/* --- Customer & Sum Insured Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
                { label: 'No. of members', value: '2', icon: IconUserCheck },
                { label: 'Age of Insured 1', value: '70 Years', icon: IconInfoCircle },
                { label: 'Age of Insured 2', value: '69 Years', icon: IconInfoCircle },
                { label: 'Preferred Sum Insured', value: 'USD 500,000', icon: IconCurrencyDollar },
            ].map((item, i) => (
                <div key={i} className="flex overflow-hidden rounded-xl border border-slate-100 group hover:border-[#1CADA3]/30 transition-colors">
                    <div className="w-1/2 bg-slate-50 p-4 border-r border-slate-100 flex items-center gap-3">
                        <item.icon size={18} className="text-[#2076C7]" />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                    </div>
                    <div className="w-1/2 p-4 bg-white flex items-center justify-center">
                        <span className="text-sm md:text-base font-black text-slate-800">{item.value}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* --- Journey & Premium Details --- */}
        <div className="mb-4">
            <h4 className="text-xs font-black text-[#2076C7] uppercase tracking-[0.2em] mb-4 border-b border-slate-50 pb-2">Journey & Premium Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: 'Duration of Travel', value: '60 Days', icon: IconClock },
                    { label: 'Geographical Scope', value: 'Worldwide (Excluding USA/Canada)', icon: IconWorld },
                    { label: 'Total Premium', value: 'INR 18,684/-', icon: IconCreditCard, color: 'text-emerald-600' },
                ].map((item, i) => (
                    <div key={i} className={`flex overflow-hidden rounded-xl border border-slate-100 transition-all ${i === 2 ? 'md:col-span-2' : ''}`}>
                        <div className="w-1/2 bg-blue-50 p-4 border-r border-blue-100/50 flex items-center gap-3 text-[#2076C7]">
                            <item.icon size={18} />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80">{item.label}</span>
                        </div>
                        <div className="w-1/2 p-4 bg-white flex items-center justify-center">
                            <span className={`text-sm md:text-base font-black ${item.color || 'text-slate-800'}`}>{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- Summary of Coverage Table --- */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
            <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
                Summary of Coverage
            </h3>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">Detailed benefit breakdown</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50">
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Cover Name</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-b border-slate-100">Payment Basis</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-b border-slate-100">Coverage</th>
                        <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-b border-slate-100">Deductible</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence initial={false}>
                        {displayedData.map((row, idx) => (
                            <motion.tr 
                                key={idx}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="hover:bg-slate-50 transition-colors group"
                            >
                                <td className="p-5 border-b border-slate-50">
                                    <span className="text-[13px] md:text-sm font-bold text-slate-700 leading-tight block pr-4">{row.name}</span>
                                </td>
                                <td className="p-5 border-b border-slate-50 text-center">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-[#2076C7] bg-blue-50 px-3 py-1 rounded-full">{row.basis}</span>
                                </td>
                                <td className="p-5 border-b border-slate-50 text-center">
                                    <span className="text-[13px] md:text-sm font-black text-slate-900">{row.coverage}</span>
                                </td>
                                <td className="p-5 border-b border-slate-50 text-center">
                                    <span className="text-[11px] md:text-xs font-black text-rose-500 uppercase tracking-widest">{row.deductible}</span>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
        
        {/* --- View More Toggle --- */}
        <div className="p-4 bg-slate-50/50 flex justify-center border-t border-slate-100">
            <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2076C7] hover:bg-[#2076C7] hover:text-white transition-all shadow-sm"
            >
                {showAll ? (
                    <>Show Less <IconChevronUp size={14} /></>
                ) : (
                    <>View More ({coverageData.length - 5} others) <IconChevronDown size={14} /></>
                )}
            </button>
        </div>

        <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
                🔒 Secured by Infinity Arthvishva • IRDA-Approved Policy Details
            </p>
        </div>
      </div>
    </motion.div>
  );
}