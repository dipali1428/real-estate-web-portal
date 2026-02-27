'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Target, Plus, TrendingUp, Calendar, Wallet, 
    ShieldAlert, Info, ArrowRight, PieChart, 
    ChevronRight, CheckCircle2, AlertCircle,
    Building2, BarChart4, Landmark, Briefcase,
    Award, Layers, Home, GraduationCap, Car,
    Plane, Heart, Sparkles, Clock, IndianRupee,
    Users, Scale, Shield, Download, Printer,
    Share2, X, Save, Edit2, Trash2
} from 'lucide-react';

// --- TYPES ---
type GoalType = 'Short' | 'Medium' | 'Long';
type RiskProfile = 'Conservative' | 'Balanced' | 'Aggressive';
type GoalCategory = 'education' | 'retirement' | 'house' | 'wealth' | 'travel' | 'vehicle' | 'other';

interface GoalInput {
    id?: string;
    name: string;
    category: GoalCategory;
    type: GoalType;
    targetAmount: number;
    targetYears: number;
    currentSavings: number;
    monthlyCapacity: number;
    riskProfile: RiskProfile;
    inflation: number;
    createdAt?: string;
    priority: 'high' | 'medium' | 'low';
}

interface CalculationResult {
    futureValue: number;
    gap: number;
    requiredMonthlySIP: number;
    expectedReturn: number;
    progress: number;
    shortfall: number;
}

interface ProductAllocation {
    name: string;
    allocation: number;
    icon: any;
    color: string;
    suitability: string;
    expectedReturn: number;
    risk: 'low' | 'moderate' | 'high';
    lockIn?: string;
}

export default function GoalPlanner() {
    const [goals, setGoals] = useState<GoalInput[]>([]);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'active' | 'completed'>('dashboard');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<GoalInput | null>(null);
    const [calculations, setCalculations] = useState<Record<string, CalculationResult>>({});
    const [allocations, setAllocations] = useState<Record<string, ProductAllocation[]>>({});
    const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);
    const [riskScore, setRiskScore] = useState<number>(65);
    const [riskCategory, setRiskCategory] = useState<RiskProfile>('Balanced');
    const [showRiskQuiz, setShowRiskQuiz] = useState(false);
    
    // Form state
    const [goalForm, setGoalForm] = useState<GoalInput>({
        name: '',
        category: 'wealth',
        type: 'Long',
        targetAmount: 1000000,
        targetYears: 10,
        currentSavings: 0,
        monthlyCapacity: 10000,
        riskProfile: 'Balanced',
        inflation: 6,
        priority: 'medium'
    });

    // Risk quiz questions
    const riskQuestions = [
        {
            question: "How would you react if your investment lost 10% in a month?",
            options: [
                { text: "Sell everything immediately", score: 10 },
                { text: "Sell partially", score: 30 },
                { text: "Wait and watch", score: 60 },
                { text: "Buy more at lower price", score: 90 }
            ]
        },
        {
            question: "What is your investment horizon?",
            options: [
                { text: "Less than 1 year", score: 20 },
                { text: "1-3 years", score: 40 },
                { text: "3-7 years", score: 70 },
                { text: "7+ years", score: 90 }
            ]
        },
        {
            question: "Which statement describes you best?",
            options: [
                { text: "I can't accept any losses", score: 15 },
                { text: "I can accept small temporary losses", score: 45 },
                { text: "I can accept moderate volatility", score: 75 },
                { text: "I can accept high risk for high returns", score: 95 }
            ]
        }
    ];

    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

    // --- HELPER FUNCTIONS ---
    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    };

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const formatLargeCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(2)} K`;
        return `₹${amount}`;
    };

    const getGoalIcon = (category: GoalCategory) => {
        switch(category) {
            case 'education': return GraduationCap;
            case 'retirement': return Briefcase;
            case 'house': return Home;
            case 'wealth': return TrendingUp;
            case 'travel': return Plane;
            case 'vehicle': return Car;
            default: return Target;
        }
    };

    const getRiskColor = (risk: RiskProfile) => {
        switch(risk) {
            case 'Conservative': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Balanced': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Aggressive': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case 'high': return 'bg-rose-100 text-rose-700';
            case 'medium': return 'bg-amber-100 text-amber-700';
            case 'low': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // --- CALCULATION ENGINE ---
    useEffect(() => {
        const calculateGoal = () => {
            const n = goalForm.targetYears;
            const inflationDec = goalForm.inflation / 100;
            
            // 1. Calculate Inflation Adjusted Future Value
            const fv = goalForm.targetAmount * Math.pow(1 + inflationDec, n);
            
            // 2. Set Expected Returns based on Risk & Duration
            let expectedReturn = 12;
            if (goalForm.riskProfile === 'Conservative') expectedReturn = 8;
            else if (goalForm.riskProfile === 'Aggressive') expectedReturn = 15;
            
            // Duration adjustment
            if (goalForm.type === 'Short') expectedReturn -= 2;
            if (goalForm.type === 'Long') expectedReturn += 1;

            const r = expectedReturn / 100 / 12; // Monthly return rate
            const months = n * 12;

            // 3. SIP Formula
            const growthFactor = Math.pow(1 + r, months);
            const currentSavingsGrowth = goalForm.currentSavings * growthFactor;
            const remainingFV = Math.max(0, fv - currentSavingsGrowth);
            
            const annuityFactor = ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
            const sipRequired = remainingFV / annuityFactor;

            // 4. Calculate progress
            const currentProgress = (goalForm.currentSavings / fv) * 100;
            
            // 5. Calculate shortfall
            const shortfall = Math.max(0, fv - (goalForm.currentSavings * Math.pow(1 + expectedReturn/100, n)));

            setCalculations({
                'current': {
                    futureValue: fv,
                    gap: remainingFV,
                    requiredMonthlySIP: Math.max(0, sipRequired),
                    expectedReturn,
                    progress: currentProgress,
                    shortfall
                }
            });
        };

        calculateGoal();
    }, [goalForm]);

    // --- PRODUCT MAPPING ENGINE ---
    const getProductAllocations = (duration: GoalType, risk: RiskProfile, monthlySIP: number): ProductAllocation[] => {
        const annualAmount = monthlySIP * 12;
        
        if (duration === 'Short') {
            return [
                { 
                    name: 'Fixed Deposits', allocation: 40, icon: Landmark, color: 'bg-blue-500', 
                    suitability: 'Capital Safety', expectedReturn: 7.5, risk: 'low' 
                },
                { 
                    name: 'Debt Funds', allocation: 35, icon: ShieldAlert, color: 'bg-indigo-500', 
                    suitability: 'Stable Returns', expectedReturn: 8.2, risk: 'low' 
                },
                { 
                    name: 'Bonds/NCD', allocation: 25, icon: BarChart4, color: 'bg-emerald-500', 
                    suitability: 'Fixed Income', expectedReturn: 9.0, risk: 'low' 
                },
            ];
        }
        
        if (duration === 'Medium') {
            return [
                { 
                    name: 'Hybrid MF', allocation: 40, icon: TrendingUp, color: 'bg-cyan-500', 
                    suitability: 'Growth + Safety', expectedReturn: 10.5, risk: 'moderate' 
                },
                { 
                    name: 'Conservative PMS', allocation: 30, icon: Briefcase, color: 'bg-blue-600', 
                    suitability: 'Expert Management', expectedReturn: 12.0, risk: 'moderate' 
                },
                { 
                    name: 'NPS (Tier II)', allocation: 20, icon: Shield, color: 'bg-orange-500', 
                    suitability: 'Retirement/Tax', expectedReturn: 10.0, risk: 'moderate' 
                },
                { 
                    name: 'Corporate Bonds', allocation: 10, icon: BarChart4, color: 'bg-emerald-600', 
                    suitability: 'Fixed Returns', expectedReturn: 9.5, risk: 'low' 
                },
            ];
        }

        // Long Term Allocation (Includes High Risk Assets)
        const longTermBase: ProductAllocation[] = [
            { 
                name: 'Equity Mutual Funds', allocation: 35, icon: TrendingUp, color: 'bg-indigo-600', 
                suitability: 'Wealth Creation', expectedReturn: 14.0, risk: 'high' 
            },
            { 
                name: 'PMS / AIF', allocation: 20, icon: Award, color: 'bg-purple-600', 
                suitability: 'Alpha Generation', expectedReturn: 16.0, risk: 'high', lockIn: '3 years' 
            },
            { 
                name: 'Unlisted Shares', allocation: 15, icon: Layers, color: 'bg-amber-500', 
                suitability: 'High-Growth Multiplier', expectedReturn: 18.0, risk: 'high', lockIn: '5+ years' 
            },
            { 
                name: 'Real Estate / REITs', allocation: 15, icon: Building2, color: 'bg-emerald-600', 
                suitability: 'Asset Appreciation', expectedReturn: 12.0, risk: 'moderate', lockIn: 'Long term' 
            },
            { 
                name: 'NPS', allocation: 15, icon: Shield, color: 'bg-orange-600', 
                suitability: 'Retirement Focus', expectedReturn: 10.0, risk: 'moderate' 
            },
        ];

        if (risk === 'Aggressive') {
            longTermBase[0].allocation = 30;
            longTermBase[2].allocation = 25; // Increase Unlisted
            longTermBase[1].allocation = 20;
            longTermBase[3].allocation = 15;
            longTermBase[4].allocation = 10;
        }

        return longTermBase;
    };

    // --- HANDLE CREATE GOAL ---
    const handleCreateGoal = () => {
        if (!goalForm.name) {
            showNotification('Please enter a goal name', 'error');
            return;
        }

        const newGoal: GoalInput = {
            ...goalForm,
            id: `goal-${Date.now()}`,
            createdAt: new Date().toISOString()
        };

        const calc = calculations['current'];
        const alloc = getProductAllocations(newGoal.type, newGoal.riskProfile, calc.requiredMonthlySIP);

        setGoals(prev => [newGoal, ...prev]);
        setCalculations(prev => ({ ...prev, [newGoal.id!]: calc }));
        setAllocations(prev => ({ ...prev, [newGoal.id!]: alloc }));
        
        setShowCreateModal(false);
        showNotification('Goal created successfully!', 'success');
    };

    // --- HANDLE RISK QUIZ ---
    const handleRiskQuizSubmit = () => {
        if (quizAnswers.length < riskQuestions.length) {
            showNotification('Please answer all questions', 'error');
            return;
        }

        const totalScore = quizAnswers.reduce((a, b) => a + b, 0);
        const avgScore = totalScore / riskQuestions.length;
        
        setRiskScore(avgScore);
        
        if (avgScore < 35) {
            setRiskCategory('Conservative');
            setGoalForm(prev => ({ ...prev, riskProfile: 'Conservative' }));
        } else if (avgScore < 65) {
            setRiskCategory('Balanced');
            setGoalForm(prev => ({ ...prev, riskProfile: 'Balanced' }));
        } else {
            setRiskCategory('Aggressive');
            setGoalForm(prev => ({ ...prev, riskProfile: 'Aggressive' }));
        }
        
        setShowRiskQuiz(false);
        showNotification(`Risk profile: ${riskCategory}`, 'success');
    };

    // --- RENDER ---
    return (
        <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen relative">
            
            {/* Notifications */}
            <div className="fixed top-20 right-5 z-50 flex flex-col gap-3">
                {notifications.map(n => (
                    <div
                        key={n.id}
                        className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border ${
                            n.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            n.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                            'bg-blue-50 text-blue-800 border-blue-200'
                        }`}
                    >
                        {n.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                        {n.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        {n.type === 'info' && <Info className="w-5 h-5" />}
                        <span className="text-sm font-bold">{n.message}</span>
                    </div>
                ))}
            </div>

            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-3xl p-8 mb-8 text-white shadow-xl overflow-hidden"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Target size={24} />
                        </div>
                        <h1 className="text-2xl font-bold">Infinity Goal Planner</h1>
                    </div>
                    <p className="text-white/80 max-w-xl">
                        Map your life aspirations to professional investment products. 
                        Adjust the parameters to see your personalized wealth roadmap.
                    </p>
                    
                    {/* Risk Score Badge */}
                    <div className="mt-6 flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Risk Score</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black">{riskScore}</span>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                                    riskCategory === 'Conservative' ? 'bg-emerald-500/30 text-emerald-100' :
                                    riskCategory === 'Balanced' ? 'bg-amber-500/30 text-amber-100' :
                                    'bg-rose-500/30 text-rose-100'
                                }`}>
                                    {riskCategory}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowRiskQuiz(true)}
                            className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-bold"
                        >
                            Re-evaluate Risk
                        </button>
                    </div>
                </div>
                <PieChart className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
                    { id: 'create', label: 'Create Goal', icon: Plus },
                    { id: 'active', label: 'Active Goals', icon: Target },
                    { id: 'completed', label: 'Completed', icon: CheckCircle2 }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all ${
                            activeTab === tab.id
                                ? 'border-[#2076C7] text-[#2076C7]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
                <div className="space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Total Goals</p>
                            <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                                <IndianRupee className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Target Amount</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {formatLargeCurrency(goals.reduce((sum, g) => sum + g.targetAmount, 0))}
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-amber-600" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Monthly SIP</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {formatCurrency(Object.values(calculations).reduce((sum, c) => sum + c.requiredMonthlySIP, 0))}
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Avg. Horizon</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {goals.length ? Math.round(goals.reduce((sum, g) => sum + g.targetYears, 0) / goals.length) : 0} yrs
                            </p>
                        </div>
                    </div>

                    {/* Goals List */}
                    {goals.length === 0 ? (
                        <div className="bg-white rounded-3xl p-16 text-center border border-gray-200">
                            <div className="w-24 h-24 bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="w-12 h-12 text-[#2076C7]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Goals Yet</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Start planning your financial future by creating your first goal.
                            </p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                Create Your First Goal
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {goals.map(goal => {
                                const Icon = getGoalIcon(goal.category);
                                const calc = calculations[goal.id!];
                                const alloc = allocations[goal.id!] || [];
                                const isExpanded = expandedGoal === goal.id;
                                const progress = calc?.progress || 0;
                                
                                return (
                                    <motion.div 
                                        key={goal.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                        goal.riskProfile === 'Conservative' ? 'bg-emerald-100' :
                                                        goal.riskProfile === 'Balanced' ? 'bg-amber-100' : 'bg-rose-100'
                                                    }`}>
                                                        <Icon className={`w-6 h-6 ${
                                                            goal.riskProfile === 'Conservative' ? 'text-emerald-600' :
                                                            goal.riskProfile === 'Balanced' ? 'text-amber-600' : 'text-rose-600'
                                                        }`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityColor(goal.priority)}`}>
                                                                {goal.priority} priority
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {goal.targetYears} years left
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setExpandedGoal(isExpanded ? null : goal.id!)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <ChevronRight size={20} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                </button>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="font-medium text-gray-500">Progress</span>
                                                    <span className="font-bold text-gray-700">{progress.toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
                                                    />
                                                </div>
                                            </div>

                                            {/* Key Numbers */}
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase">Target</p>
                                                    <p className="text-lg font-bold text-gray-900">{formatLargeCurrency(goal.targetAmount)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase">Future Value</p>
                                                    <p className="text-lg font-bold text-[#2076C7]">{calc ? formatLargeCurrency(calc.futureValue) : '...'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase">Monthly SIP</p>
                                                    <p className="text-lg font-bold text-emerald-600">{calc ? formatCurrency(calc.requiredMonthlySIP) : '...'}</p>
                                                </div>
                                            </div>

                                            {/* Shortfall Alert */}
                                            {calc && calc.shortfall > 0 && (
                                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 mb-4">
                                                    <AlertCircle size={16} className="text-amber-600" />
                                                    <p className="text-xs text-amber-700">
                                                        Shortfall of {formatCurrency(calc.shortfall)}. Consider increasing SIP.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Expanded Content - Product Allocations */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-gray-200 bg-gray-50"
                                                >
                                                    <div className="p-6 space-y-4">
                                                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                            <Landmark size={16} className="text-[#1CADA3]" />
                                                            Recommended Asset Allocation
                                                        </h4>
                                                        
                                                        {alloc.map((prod, idx) => (
                                                            <motion.div 
                                                                key={idx}
                                                                whileHover={{ x: 5 }}
                                                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between group cursor-pointer"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`w-10 h-10 rounded-xl ${prod.color} flex items-center justify-center text-white`}>
                                                                        <prod.icon size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-bold text-gray-800">{prod.name}</p>
                                                                        <p className="text-[10px] text-gray-500 font-medium">{prod.suitability}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-lg font-black text-gray-800">{prod.allocation}%</p>
                                                                    <p className="text-[10px] text-gray-500">{prod.expectedReturn}% returns</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}

                                                        <button className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all">
                                                            Start Investing
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Create Goal View */}
            {activeTab === 'create' && (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Goal</h2>
                        <p className="text-gray-500 mb-8">Define your financial goal and get personalized recommendations</p>

                        <div className="space-y-6">
                            {/* Goal Name */}
                            <div>
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                    Goal Name
                                </label>
                                <input
                                    type="text"
                                    value={goalForm.name}
                                    onChange={(e) => setGoalForm({ ...goalForm, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#1CADA3] transition-all"
                                    placeholder="e.g., Child Education, Retirement, Buy House"
                                />
                            </div>

                            {/* Goal Category */}
                            <div>
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                    Goal Category
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { id: 'education', icon: GraduationCap, label: 'Education' },
                                        { id: 'retirement', icon: Briefcase, label: 'Retirement' },
                                        { id: 'house', icon: Home, label: 'House' },
                                        { id: 'wealth', icon: TrendingUp, label: 'Wealth' },
                                        { id: 'travel', icon: Plane, label: 'Travel' },
                                        { id: 'vehicle', icon: Car, label: 'Vehicle' },
                                        { id: 'other', icon: Target, label: 'Other' }
                                    ].map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setGoalForm({ ...goalForm, category: cat.id as GoalCategory })}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                                                goalForm.category === cat.id
                                                    ? 'border-[#1CADA3] bg-emerald-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <cat.icon size={24} className={goalForm.category === cat.id ? 'text-[#1CADA3]' : 'text-gray-400'} />
                                            <span className={`text-xs font-bold ${goalForm.category === cat.id ? 'text-[#1CADA3]' : 'text-gray-500'}`}>
                                                {cat.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Duration & Risk */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Duration Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['Short', 'Medium', 'Long'] as GoalType[]).map((t) => (
                                            <button 
                                                key={t}
                                                onClick={() => setGoalForm({
                                                    ...goalForm, 
                                                    type: t, 
                                                    targetYears: t === 'Short' ? 2 : t === 'Medium' ? 5 : 10
                                                })}
                                                className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all ${
                                                    goalForm.type === t ? 'bg-[#2076C7] text-white' : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Risk Profile
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['Conservative', 'Balanced', 'Aggressive'] as RiskProfile[]).map((r) => (
                                            <button 
                                                key={r}
                                                onClick={() => setGoalForm({...goalForm, riskProfile: r})}
                                                className={`py-2 rounded-xl text-[10px] font-bold transition-all ${
                                                    goalForm.riskProfile === r 
                                                        ? r === 'Conservative' ? 'bg-emerald-500 text-white' :
                                                          r === 'Balanced' ? 'bg-amber-500 text-white' :
                                                          'bg-rose-500 text-white'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Target Amount & Years */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Target Amount (₹)
                                    </label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.targetAmount}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#1CADA3] transition-all"
                                            onChange={(e) => setGoalForm({...goalForm, targetAmount: Number(e.target.value)})}
                                            min={1000}
                                            step={1000}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Years to Goal
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.targetYears}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#1CADA3] transition-all"
                                            onChange={(e) => setGoalForm({...goalForm, targetYears: Number(e.target.value)})}
                                            min={1}
                                            max={30}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Current Savings & Monthly Capacity */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Current Savings (₹)
                                    </label>
                                    <div className="relative">
                                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.currentSavings}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#1CADA3] transition-all"
                                            onChange={(e) => setGoalForm({...goalForm, currentSavings: Number(e.target.value)})}
                                            min={0}
                                            step={1000}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                        Monthly SIP Capacity (₹)
                                    </label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.monthlyCapacity}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-[#1CADA3] transition-all"
                                            onChange={(e) => setGoalForm({...goalForm, monthlyCapacity: Number(e.target.value)})}
                                            min={500}
                                            step={500}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Inflation */}
                            <div>
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                    Inflation Rate (%)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="2"
                                        max="10"
                                        step="0.5"
                                        value={goalForm.inflation}
                                        onChange={(e) => setGoalForm({ ...goalForm, inflation: parseFloat(e.target.value) })}
                                        className="flex-1"
                                    />
                                    <span className="text-lg font-bold text-[#2076C7] w-16">{goalForm.inflation}%</span>
                                </div>
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-2 block">
                                    Priority
                                </label>
                                <div className="flex gap-3">
                                    {(['high', 'medium', 'low'] as const).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setGoalForm({ ...goalForm, priority: p })}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                                                goalForm.priority === p
                                                    ? p === 'high' ? 'bg-rose-500 text-white' :
                                                      p === 'medium' ? 'bg-amber-500 text-white' :
                                                      'bg-emerald-500 text-white'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Calculation Preview */}
                            {calculations['current'] && (
                                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles size={16} className="text-[#2076C7]" />
                                        Goal Preview
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase">Future Value</p>
                                            <p className="text-xl font-black text-gray-900">{formatLargeCurrency(calculations['current'].futureValue)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase">Monthly SIP</p>
                                            <p className="text-xl font-black text-emerald-600">{formatCurrency(calculations['current'].requiredMonthlySIP)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase">Expected Returns</p>
                                            <p className="text-lg font-bold text-[#2076C7]">{calculations['current'].expectedReturn}% p.a.</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase">Shortfall</p>
                                            <p className={`text-lg font-bold ${calculations['current'].shortfall > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                {formatCurrency(calculations['current'].shortfall)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateGoal}
                                    className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} />
                                    Create Goal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Goals View */}
            {activeTab === 'active' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Active Goals</h3>
                        {goals.filter(g => calculations[g.id!]?.progress < 100).length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No active goals</p>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {goals.filter(g => calculations[g.id!]?.progress < 100).map(goal => {
                                    const Icon = getGoalIcon(goal.category);
                                    const calc = calculations[goal.id!];
                                    const progress = calc?.progress || 0;
                                    
                                    return (
                                        <div key={goal.id} className="py-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                    goal.riskProfile === 'Conservative' ? 'bg-emerald-100' :
                                                    goal.riskProfile === 'Balanced' ? 'bg-amber-100' : 'bg-rose-100'
                                                }`}>
                                                    <Icon className={`w-6 h-6 ${
                                                        goal.riskProfile === 'Conservative' ? 'text-emerald-600' :
                                                        goal.riskProfile === 'Balanced' ? 'text-amber-600' : 'text-rose-600'
                                                    }`} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{goal.name}</h4>
                                                    <p className="text-xs text-gray-500">Target: {formatLargeCurrency(goal.targetAmount)} in {goal.targetYears} years</p>
                                                </div>
                                            </div>
                                            <div className="w-48">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Progress</span>
                                                    <span className="font-bold">{progress.toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Completed Goals View */}
            {activeTab === 'completed' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Completed Goals</h3>
                        {goals.filter(g => calculations[g.id!]?.progress >= 100).length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No completed goals yet</p>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {goals.filter(g => calculations[g.id!]?.progress >= 100).map(goal => {
                                    const Icon = getGoalIcon(goal.category);
                                    
                                    return (
                                        <div key={goal.id} className="py-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{goal.name}</h4>
                                                    <p className="text-xs text-gray-500">Achieved: {formatLargeCurrency(goal.targetAmount)}</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                                Completed
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Risk Quiz Modal */}
            {showRiskQuiz && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Shield size={24} />
                                <h3 className="text-xl font-bold">Risk Profile Assessment</h3>
                            </div>
                            <button onClick={() => setShowRiskQuiz(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            {riskQuestions.map((q, idx) => (
                                <div key={idx} className="space-y-3">
                                    <p className="font-bold text-gray-900">{idx + 1}. {q.question}</p>
                                    <div className="space-y-2">
                                        {q.options.map((opt, optIdx) => (
                                            <label
                                                key={optIdx}
                                                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                                    quizAnswers[idx] === opt.score
                                                        ? 'border-[#1CADA3] bg-emerald-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`q${idx}`}
                                                    value={opt.score}
                                                    checked={quizAnswers[idx] === opt.score}
                                                    onChange={() => {
                                                        const newAnswers = [...quizAnswers];
                                                        newAnswers[idx] = opt.score;
                                                        setQuizAnswers(newAnswers);
                                                    }}
                                                    className="mr-3"
                                                />
                                                <span className="text-sm text-gray-700">{opt.text}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setShowRiskQuiz(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRiskQuizSubmit}
                                    className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-bold"
                                >
                                    Calculate Risk Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setShowCreateModal(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all"
            >
                <Plus size={24} />
            </button>
        </div>
    );
}