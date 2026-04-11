'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type PaymentFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'semimonthly'
  | 'monthly'
  | 'bimonthly'
  | 'quarterly'
  | 'semiannually'
  | 'annually'
  | 'continuous';

const frequencyMap: Record<PaymentFrequency, number> = {
  daily: 365,
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  bimonthly: 6,
  quarterly: 4,
  semiannually: 2,
  annually: 1,
  continuous: 0
};

const frequencyOptions: { value: PaymentFrequency; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-Weekly' },
  { value: 'semimonthly', label: 'Semi-Monthly' },
  { value: 'monthly', label: 'Monthly (APR)' },
  { value: 'bimonthly', label: 'Bi-Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'semiannually', label: 'Semi-Annually' },
  { value: 'annually', label: 'Annually' },
];

// Format currency for display
const formatCurrency = (value: number): string => {
    if (isNaN(value) || value === 0) return '₹0';
    return '₹' + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BusinessLoanCalculator: React.FC = () => {
    // State for loan parameters
    const [loanAmount, setLoanAmount] = useState<number>(500000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
    const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');

    // Calculated values
    const [paymentAmount, setPaymentAmount] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [effectiveAnnualRate, setEffectiveAnnualRate] = useState<number>(0);

    // Errors
    // const [errors, setErrors] = useState({
    //     loanAmount: '',
    //     interestRate: '',
    //     loanTermMonths: ''
    // });

    // Chart reference
    const chartRef = useRef<Chart<'doughnut'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Calculation logic
    const calculateLoan = () => {
        if (!loanAmount || loanAmount < 10000 || !interestRate || interestRate < 0.1 || !loanTermMonths || loanTermMonths < 1) {
            return;
        }

        const paymentsPerYear = frequencyMap[paymentFrequency];
        const annualRateDecimal = interestRate / 100;
        const loanTermYears = loanTermMonths / 12;

        let calculatedPaymentAmount: number;

        // Standard periodic payments calculation
        const totalPayments = Math.ceil(loanTermYears * paymentsPerYear);
        const periodicInterestRate = annualRateDecimal / paymentsPerYear;

        if (periodicInterestRate === 0) {
            calculatedPaymentAmount = loanAmount / totalPayments;
        } else {
            const rateFactor = Math.pow(1 + periodicInterestRate, totalPayments);
            calculatedPaymentAmount = (loanAmount * periodicInterestRate * rateFactor) / (rateFactor - 1);
        }

        const calculatedTotalPayment = calculatedPaymentAmount * totalPayments;
        const calculatedTotalInterest = calculatedTotalPayment - loanAmount;
        const calculatedEffectiveAnnualRate = (Math.pow(1 + periodicInterestRate, paymentsPerYear) - 1) * 100;

        setPaymentAmount(calculatedPaymentAmount);
        setTotalInterest(calculatedTotalInterest);
        setTotalPayment(calculatedTotalPayment);
        setEffectiveAnnualRate(calculatedEffectiveAnnualRate);
    };

    // Helper to calculate theoretical interest with changed parameters
    const calculateHypotheticalInterest = (p: number, r: number, t_months: number, freq: PaymentFrequency) => {
        if (p <= 0 || r <= 0 || t_months <= 0) return 0;
        const pperyear = frequencyMap[freq];
        const r_dec = r / 100;
        const t_yrs = t_months / 12;
        const total_p = Math.ceil(t_yrs * pperyear);
        const periodic_r = r_dec / pperyear;
        
        if (periodic_r === 0) return 0;
        const r_fact = Math.pow(1 + periodic_r, total_p);
        const emi = (p * periodic_r * r_fact) / (r_fact - 1);
        return (emi * total_p) - p;
    };

    // Derived Insights
    const interestPercentage = loanAmount > 0 ? (totalInterest / loanAmount) * 100 : 0;
    const interestPer100 = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;
    const principalPer100 = 100 - interestPer100;
    
    // Potential savings calculations
    const tenureReducedInterest = calculateHypotheticalInterest(loanAmount, interestRate, Math.max(12, loanTermMonths - 12), paymentFrequency);
    const tenureSavings = loanTermMonths > 12 ? (totalInterest - tenureReducedInterest) : 0;
    
    const rateReducedInterest = calculateHypotheticalInterest(loanAmount, Math.max(0.1, interestRate - 2), loanTermMonths, paymentFrequency);
    const rateSavings = interestRate > 2 ? (totalInterest - rateReducedInterest) : 0;
    
    const taxSavings = totalInterest * 0.30; // Estimated 30% business tax bracket
    const quarterlyExtraSavings = totalInterest * 0.15; // Rough estimate of 15% interest reduction with quarterly extra payments

    useEffect(() => {
        calculateLoan();
    }, [loanAmount, interestRate, loanTermMonths, paymentFrequency]);

    // Chart initialization
    useEffect(() => {
        if (!canvasRef.current) return;

        if (!chartRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                chartRef.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Loan Amount', 'Total Interest'],
                        datasets: [{
                            data: [loanAmount, totalInterest],
                            backgroundColor: ['#009B91', '#E5E7EB'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '80%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (label) label += ': ';
                                        if (context.parsed !== null) label += formatCurrency(context.parsed);
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        } else {
            chartRef.current.data.datasets[0].data = [loanAmount, totalInterest];
            chartRef.current.update();
        }
    }, [loanAmount, totalInterest]);

    // Handle input changes
    const handleSliderChange = (field: string, value: number) => {
        switch (field) {
            case 'loanAmount': setLoanAmount(value); break;
            case 'interestRate': setInterestRate(value); break;
            case 'loanTermMonths': setLoanTermMonths(value); break;
        }
    };

    const handleInputChange = (field: string, value: string) => {
        if (value === '') {
            switch (field) {
                case 'loanAmount': setLoanAmount(0); break;
                case 'interestRate': setInterestRate(0); break;
                case 'loanTermMonths': setLoanTermMonths(0); break;
            }
            return;
        }

        const cleanValue = value.replace(/[^\d.]/g, '');
        const numValue = parseFloat(cleanValue);
        if (!isNaN(numValue)) {
            switch (field) {
                case 'loanAmount': setLoanAmount(numValue); break;
                case 'interestRate': setInterestRate(numValue); break;
                case 'loanTermMonths': setLoanTermMonths(numValue); break;
            }
        }
    };

    const handleReset = () => {
        setLoanAmount(500000);
        setInterestRate(8.5);
        setLoanTermMonths(60);
        setPaymentFrequency('monthly');
    };

    const formatLoanTerm = (months: number) => {
        if (months === 0) return '0 months';
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (years > 0) {
            return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
        }
        return `${months} month${months !== 1 ? 's' : ''}`;
    };

    return (
        <div className="w-full">
            <div className="container mx-auto px-4 py-2 md:py-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
                    <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 px-4 sm:px-8 text-center">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-white">Business Loan Calculator</h1>
                        <p className="text-blue-100 text-xs sm:text-sm">Calculate your Loan EMI and Repayment Schedule</p>
                    </div>

                    <div className="flex flex-col lg:flex-row p-2 lg:p-3 font-sans">
                        {/* Input Section */}
                        <div className="flex-1 min-w-0 lg:pr-4 lg:border-r border-gray-200">
                            
                            {/* Loan Amount */}
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-[#2076C7] font-semibold mb-1.5 text-sm">Loan Amount (₹)</label>
                                <div className="slider-container mb-3">
                                    <input
                                        type="range"
                                        min="10000"
                                        max="10000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={(e) => handleSliderChange('loanAmount', Number(e.target.value))}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((loanAmount - 10000) / (10000000 - 10000)) * 100}%, #e5e7eb ${((loanAmount - 10000) / (10000000 - 10000)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[9px] sm:text-xs text-gray-600 mt-1">
                                        <span>₹10,000</span>
                                        <span>₹1,00,00,000</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={loanAmount === 0 ? '' : loanAmount}
                                        onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-12 text-gray-800 text-sm"
                                        placeholder="e.g., 500000"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium font-sans">₹</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-[#2076C7] font-semibold mb-1.5 text-sm">Interest Rate (% p.a.)</label>
                                <div className="slider-container mb-3">
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="30"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => handleSliderChange('interestRate', Number(e.target.value))}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((interestRate - 0.1) / (30 - 0.1)) * 100}%, #e5e7eb ${((interestRate - 0.1) / (30 - 0.1)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[9px] sm:text-xs text-gray-600 mt-1">
                                        <span>0.1%</span>
                                        <span>30%</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={interestRate === 0 ? '' : interestRate}
                                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-12 text-gray-800 text-sm"
                                        placeholder="e.g., 8.5"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium font-sans">%</span>
                                </div>
                            </div>

                            {/* Tenure */}
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-[#2076C7] font-semibold mb-1.5 text-sm">Loan Tenure (Months)</label>
                                <div className="slider-container mb-3">
                                    <input
                                        type="range"
                                        min="1"
                                        max="120"
                                        step="1"
                                        value={loanTermMonths}
                                        onChange={(e) => handleSliderChange('loanTermMonths', Number(e.target.value))}
                                        className="w-full h-1.5 sm:h-2 rounded-lg cursor-pointer accent-teal-600"
                                        style={{ background: `linear-gradient(to right, #1CADA3 0%, #1CADA3 ${((loanTermMonths - 1) / (120 - 1)) * 100}%, #e5e7eb ${((loanTermMonths - 1) / (120 - 1)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[9px] sm:text-xs text-gray-600 mt-1">
                                        <span>1 Month</span>
                                        <span>120 Months</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={loanTermMonths === 0 ? '' : loanTermMonths}
                                        onChange={(e) => handleInputChange('loanTermMonths', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-xl border-gray-300 focus:outline-none focus:border-[#1CADA3] bg-gray-100 focus:bg-white transition-colors pr-24 text-gray-800 text-sm"
                                        placeholder="e.g., 60"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium font-sans text-sm">Months</span>
                                </div>
                            </div>

                            {/* Payment Frequency */}
                            <div className="mb-4">
                                <label className="block text-[#2076C7] font-semibold mb-1.5 text-xs sm:text-sm">Payment Frequency</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                    {frequencyOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPaymentFrequency(option.value)}
                                            className={`py-2 px-1 rounded-xl sm:rounded-lg border transition-all ${paymentFrequency === option.value ? 'border-[#1CADA3] bg-teal-50 text-[#1CADA3]' : 'border-gray-300 hover:border-gray-400 text-gray-700'}`}
                                        >
                                            <div className="text-[12px] sm:text-[13px] font-bold">{option.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleReset}
                                className="w-full mb-4 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-bold border border-gray-200 text-xs"
                            >
                                Reset to Default Values
                            </button>

                            {/* Results Box */}
                            <div className="bg-teal-50/30 p-3 rounded-2xl border-l-4 border-[#1CADA3] mb-4 lg:mb-0">
                                <div className="text-center mb-6">
                                    <div className="text-[10px] sm:text-xs text-[#2076C7] font-bold mb-0.5 uppercase tracking-wider">MONTHLY PAYMENT (EMI)</div>
                                    <div className="text-2xl font-extrabold text-[#1CADA3] font-sans">
                                        {formatCurrency(paymentAmount)}
                                    </div>
                                </div>
                                <div className="flex justify-between items-start divide-x divide-teal-100">
                                    <div className="text-center flex-1 px-2">
                                        <div className="text-xs sm:text-sm font-bold font-sans text-slate-700">
                                            {formatCurrency(totalInterest)}
                                        </div>
                                        <div className="text-[9px] sm:text-[11px] text-[#1CADA3] mt-0.5 font-bold uppercase">Total Interest</div>
                                    </div>
                                    <div className="text-center flex-1 px-2">
                                        <div className="text-xs sm:text-sm font-bold font-sans text-slate-700">
                                            {formatCurrency(totalPayment)}
                                        </div>
                                        <div className="text-[9px] sm:text-[11px] text-[#1CADA3] mt-0.5 font-bold uppercase">Total Payable</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visualization Section */}
                        <div className="flex-1 min-w-0 lg:pl-4 mt-8 lg:mt-0">
                            <div className="chart-container h-44 sm:h-56 mb-3 relative flex items-center justify-center">
                                <canvas ref={canvasRef}></canvas>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5 text-center">
                                        MONTHLY EMI
                                    </div>
                                    <div className="text-lg sm:text-2xl font-extrabold text-[#009B91] font-sans">
                                        {formatCurrency(paymentAmount)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-8 mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#009B91]"></div>
                                    <span className="text-xs font-bold text-gray-700 font-sans">Loan Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-[#E5E7EB]"></div>
                                    <span className="text-xs font-bold text-gray-700 font-sans">Total Interest</span>
                                </div>
                            </div>

                            <div className="bg-white p-2 sm:p-3 rounded-2xl shadow-sm border border-gray-100 mb-3">
                                <h5 className="font-bold mb-3 text-sm sm:text-base bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">Loan Summary</h5>
                                <div className="space-y-2.5">
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Loan Amount</span>
                                        <span className="text-xs sm:text-sm font-bold font-sans text-slate-700">
                                            {formatCurrency(loanAmount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Interest Rate</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700">
                                            {interestRate.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Tenure</span>
                                        <span className="text-sm sm:text-base font-bold font-sans text-slate-700">
                                            {formatLoanTerm(loanTermMonths)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100 items-baseline">
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium">Frequency</span>
                                        <span className="text-xs sm:text-sm font-bold font-sans text-slate-700 capitalize">
                                            {paymentFrequency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 items-baseline">
                                        <span className="text-xs sm:text-sm text-slate-800 font-bold">Total Interest</span>
                                        <span className="text-sm sm:text-base font-extrabold font-sans text-[#1CADA3]">
                                            {formatCurrency(totalInterest)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                                <p className="text-[11px] sm:text-sm text-blue-800 mb-2 leading-relaxed font-sans">
                                    <span className="font-bold">Note:</span> This calculator provides an estimate of your monthly payments based on the inputs. Actual values may vary based on lender policies and taxes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* KEY INSIGHTS SECTION */}
                    <div className="border-t border-gray-100 p-3 lg:p-4 bg-gray-50/30">
                        <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#2076C7] flex items-center gap-2">
                            Key Insights
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mb-6">
                            {/* Column 1 */}
                            <ul className="space-y-3 list-none pl-0">
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        Your business will pay{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {formatCurrency(paymentAmount)}
                                        </span>{' '}
                                        monthly for {formatLoanTerm(loanTermMonths)}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        For every ₹100 repaid,{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            ₹{Math.round(interestPer100)}
                                        </span>{' '}
                                        goes towards interest and{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            ₹{Math.round(principalPer100)}
                                        </span>{' '}
                                        reduces principal
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2"></div>
                                    <span>
                                        Interest payments may be tax deductible, potentially saving your business 
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1 leading-none inline-block">
                                            {formatCurrency(taxSavings)}
                                        </span> in taxes
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        Making quarterly extra payments could reduce interest by 
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {formatCurrency(quarterlyExtraSavings)}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2"></div>
                                    <span>
                                        Business loans often have{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            flexible repayment options
                                        </span>{' '}
                                        like EMI holidays during lean seasons
                                    </span>
                                </li>
                            </ul>

                            {/* Column 2 */}
                            <ul className="space-y-3 list-none pl-0">
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        Total interest cost for your business will be{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {formatCurrency(totalInterest)}
                                        </span>{' '}
                                        which is{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {interestPercentage.toFixed(1)}%
                                        </span>{' '}
                                        of the loan amount
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        Reducing tenure by 1 year could save your business{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {formatCurrency(tenureSavings)}
                                        </span>{' '}
                                        in interest
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        A 2% lower interest rate could save{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {formatCurrency(rateSavings)}
                                        </span>{' '}
                                        in financing costs
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700 font-sans">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        Effective annual borrowing cost is{' '}
                                        <span className="bg-blue-50 px-1.5 py-0.5 rounded font-bold text-gray-800 font-sans mx-1">
                                            {effectiveAnnualRate.toFixed(2)}%
                                        </span>{' '}
                                        (considers monthly compounding)
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Tip Boxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="p-3 bg-yellow-50/70 border border-yellow-100 rounded-2xl">
                                <h3 className="flex items-center gap-2 text-[#856404] font-bold mb-3">
                                    <i className="fas fa-lightbulb text-yellow-500"></i>
                                    Business Strategy Tip:
                                </h3>
                                <p className="text-[#856404] text-xs leading-relaxed font-medium">
                                    Match your loan repayment schedule with your business cash flow cycles. 
                                    Interest is often tax deductible - consult your accountant.
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl">
                                <h3 className="flex items-center gap-2 text-[#2076C7] font-bold mb-3">
                                    Note for Businesses:
                                </h3>
                                <p className="text-[#2076C7] text-xs leading-relaxed font-medium">
                                    Business loans typically require collateral, business plans, and financial statements. 
                                    Rates vary based on vintage and creditworthiness.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessLoanCalculator;
