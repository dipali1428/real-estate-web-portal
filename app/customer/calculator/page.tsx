"use client";
import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  CheckCircle2, 
  ChevronDown, 
  Zap,
  Plus,
  Minus,
  Home,
  User,
  Building2,
  LineChart,
  Loader2
} from 'lucide-react';

// Import ONLY the content version (without dropdown) from each calculator
const EMICalculator = lazy(() => import('@/app/page/emi/page').then(mod => ({ default: mod.EMICalculatorContent })));
const SIPCalculator = lazy(() => import('@/app/page/sip/page').then(mod => ({ default: mod.SIPCalculatorContent })));
const FDCalculator = lazy(() => import('@/app/page/fd/page').then(mod => ({ default: mod.FDCalculatorContent })));
const HomeLoanCalculator = lazy(() => import('@/app/page/homeloan/page').then(mod => ({ default: mod.HomeLoanCalculatorContent })));
const PersonalLoanCalculator = lazy(() => import('@/app/page/personalloan/page').then(mod => ({ default: mod.PersonalLoanCalculatorContent })));
const BusinessLoanCalculator = lazy(() => import('@/app/page/businessloan/page').then(mod => ({ default: mod.BusinessLoanCalculatorContent })));
const CompoundInterestCalculator = lazy(() => import('@/app/page/CompoundInterest/page').then(mod => ({ default: mod.CompoundInterestCalculatorContent })));
const SIPVsEMICalculator = lazy(() => import('@/app/page/sipVsEmi/page').then(mod => ({ default: mod.LoanTenureCalculatorContent })));

// Loading component
const CalculatorLoader = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl">
    <div className="text-center">
      <Loader2 className="w-10 h-10 text-[#2076C7] animate-spin mx-auto mb-4" />
      <p className="text-gray-500 text-sm">Loading calculator...</p>
    </div>
  </div>
);

// --- SUB-COMPONENTS ---
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-500 max-w-2xl mx-auto text-sm">{subtitle}</p>
  </div>
);

const FAQ = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
          <button 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-700 text-sm">{item.q}</span>
            {openIndex === i ? <Minus className="w-4 h-4 text-[#2076C7]" /> : <Plus className="w-4 h-4 text-gray-400" />}
          </button>
          {openIndex === i && (
            <div className="p-4 pt-0 text-gray-500 text-xs leading-relaxed border-t border-gray-50">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FAQS = [
  { q: 'How accurate are these calculators?', a: 'Our calculators provide highly accurate estimates based on the mathematical formulas used by most financial institutions. However, the final figures may vary slightly depending on the specific bank\'s calculation methods and processing fees.' },
  { q: 'What is EMI?', a: 'EMI stands for Equated Monthly Installment. It is a fixed amount paid by a borrower to a lender at a specified date each calendar month.' },
  { q: 'Does the interest rate remain constant?', a: 'It depends on whether you choose a fixed-rate loan or a floating-rate loan. Fixed rates remain constant, while floating rates change according to market conditions.' },
  { q: 'Can I use these for any bank?', a: 'Yes, these are general-purpose financial calculators and can be used to estimate loans and investments for any bank or financial institution in India.' }
];

const CALCULATOR_TYPES = [
  { id: 'emi', label: 'EMI Calculator', icon: CalcIcon, desc: 'Calculate your Equated Monthly Installment with precision.' },
  { id: 'sip', label: 'SIP Calculator', icon: TrendingUp, desc: 'Plan your mutual fund investments and estimate future wealth.' },
  { id: 'sip-vs-emi', label: 'SIP Vs EMI', icon: Zap, desc: 'Compare how different loan tenures affect your finances.' },
  { id: 'fd', label: 'FD Calculator', icon: PieChartIcon, desc: 'Calculate the maturity amount of your fixed deposits.' },
  { id: 'home-loan', label: 'Home Loan', icon: Home, desc: 'Estimate your home loan EMI and total interest payable.' },
  { id: 'personal-loan', label: 'Personal Loan', icon: User, desc: 'Calculate your personal loan EMI and repayment schedule.' },
  { id: 'business-loan', label: 'Business Loan', icon: Building2, desc: 'Plan your business expansion with our business loan calculator.' },
  { id: 'compound-interest', label: 'Compound Interest', icon: LineChart, desc: 'See how your money grows over time with compound interest.' },
];

export default function CalculatorPage({ type = 'emi', onNavigate }: any) {
  const [activeCalc, setActiveCalc] = useState(type);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeData = CALCULATOR_TYPES.find(c => c.id === activeCalc) || CALCULATOR_TYPES[0];

  const renderCalculator = () => {
    switch(activeCalc) {
      case 'emi':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <EMICalculator />
          </Suspense>
        );
      case 'sip':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <SIPCalculator />
          </Suspense>
        );
      case 'fd':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <FDCalculator />
          </Suspense>
        );
      case 'home-loan':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <HomeLoanCalculator />
          </Suspense>
        );
      case 'personal-loan':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <PersonalLoanCalculator />
          </Suspense>
        );
      case 'business-loan':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <BusinessLoanCalculator />
          </Suspense>
        );
      case 'compound-interest':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <CompoundInterestCalculator />
          </Suspense>
        );
      case 'sip-vs-emi':
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <SIPVsEMICalculator />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<CalculatorLoader />}>
            <EMICalculator />
          </Suspense>
        );
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-[#f8fafc] min-h-screen pb-20">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">📊 {activeData.label}</h2>
            <p className="text-sm opacity-90">{activeData.desc}</p>
          </div>
        </div>
      </motion.div>

      {/* Dropdown Selector */}
      <div className="mb-6 relative z-50">
        <div className="max-w-md mx-auto relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="w-full bg-white border-2 border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-[#2076C7]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <activeData.icon className="w-5 h-5 text-[#2076C7]" />
              </div>
              <span className="font-bold text-gray-800 text-base">{activeData.label}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                {CALCULATOR_TYPES.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => {
                      setActiveCalc(calc.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${activeCalc === calc.id ? 'bg-gray-50' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeCalc === calc.id ? 'bg-[#2076C7] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${activeCalc === calc.id ? 'text-[#2076C7]' : 'text-gray-700'}`}>
                        {calc.label}
                      </span>
                      <p className="text-xs text-gray-400 line-clamp-1">{calc.desc}</p>
                    </div>
                    {activeCalc === calc.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#2076C7] ml-auto" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Render the selected calculator (content only, no dropdown) */}
      <div className="calculator-container">
        {renderCalculator()}
      </div>
    </div>
  );
}