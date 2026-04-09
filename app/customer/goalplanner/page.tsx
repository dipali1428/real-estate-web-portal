'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Target, Plus, TrendingUp, Calendar, Wallet, CheckCircle2, AlertCircle,
    Home, GraduationCap, Car, Plane, Briefcase,
    Sparkles, IndianRupee, X, Save, Edit2, 
    Trash2, Loader2, LayoutDashboard, ListChecks,
    CheckCircle, ArrowLeft, Eye,
    Info, RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomerService from '../../services/customerService';
import { motion } from 'framer-motion';

// --- Types ---
interface Goal {
    id: number;
    user_id: number;
    goal_name: string;
    target_amount: string;
    target_years: number;
    expected_return: string;
    current_savings: string;
    created_at: string;
    updated_at: string;
}

interface GoalCalculation {
    monthly_investment_required: number;
    future_value_of_current_savings: number;
    remaining_amount: number;
}

// --- Toast Component ---
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    }[type];

    const icon = {
        success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    }[type];

    return (
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} animate-in slide-in-from-top-2 fade-in duration-300`}>
            {icon}
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="ml-2 hover:opacity-70">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

// --- Helper Functions ---
const getTokenFromCookie = (): string | null => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const authCookie = cookies.find(row => row.startsWith('authToken='));
    return authCookie ? authCookie.split('=')[1] : null;
};

const removeTokenCookie = () => {
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
};

export default function GoalPlanner() {
    const router = useRouter();
    
    // State management
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [customerName, setCustomerName] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);
    const [calculating, setCalculating] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'dashboard' | 'active' | 'completed' | 'create'>('dashboard');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    
    const [goalForm, setGoalForm] = useState<any>({
        goal_name: '',
        target_amount: 0,
        target_years: 0,
        expected_return: 0,
        current_savings: 0
    });

    const [calculations, setCalculations] = useState<Record<number, GoalCalculation>>({});
    const [progress, setProgress] = useState<Record<number, number>>({});
    const [calculationPreview, setCalculationPreview] = useState<GoalCalculation | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [showGoalDetails, setShowGoalDetails] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    // --- Memoized Stats ---
    const stats = useMemo(() => {
        const totalTarget = goals.reduce((sum, g) => sum + parseFloat(g.target_amount), 0);
        const totalCurrent = goals.reduce((sum, g) => sum + parseFloat(g.current_savings), 0);
        const avgReturn = goals.length ? (goals.reduce((sum, g) => sum + parseFloat(g.expected_return), 0) / goals.length).toFixed(1) : '0';
        const activeCount = goals.filter(goal => (progress[goal.id] || 0) < 100).length;
        const completedCount = goals.filter(goal => (progress[goal.id] || 0) >= 100).length;
        return { totalTarget, totalCurrent, avgReturn, activeCount, completedCount };
    }, [goals, progress]);

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    }, []);

    const fetchGoals = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = getTokenFromCookie();
            if (!token) {
                router.push('/');
                return;
            }
            localStorage.setItem('token', token);
            
            try {
                const profileRes = await CustomerService.getProfile();
                const userData = profileRes.user || profileRes;
                if (userData?.name) {
                    const firstName = userData.name.split(' ')[0];
                    setCustomerName(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
                }
            } catch (err) {}

            const response = await CustomerService.getMyGoals();
            if (response.success) {
                setGoals(response.data);
                response.data.forEach((goal: Goal) => {
                    fetchGoalProgress(goal.id);
                    fetchGoalCalculation(goal);
                });
            } else {
                setError('Failed to load goals');
                showToast('Failed to load goals', 'error');
            }
        } catch (err: any) {
            if (err.response?.status === 401) {
                removeTokenCookie();
                localStorage.removeItem('token');
                router.push('/');
                showToast('Session expired. Please login again.', 'error');
            } else {
                const errorMessage = err.response?.data?.message || 'Failed to load goals';
                setError(errorMessage);
                showToast(errorMessage, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchGoalProgress = async (goalId: number) => {
        try {
            const response = await CustomerService.getGoalProgress(goalId);
            if (response.success && response.progress_percentage !== undefined) {
                setProgress(prev => ({ ...prev, [goalId]: response.progress_percentage }));
            }
        } catch (error) {}
    };

    const fetchGoalCalculation = async (goal: Goal) => {
        try {
            const response = await CustomerService.calculateGoal({
                target_amount: parseFloat(goal.target_amount),
                target_years: goal.target_years,
                expected_return: parseFloat(goal.expected_return),
                current_savings: parseFloat(goal.current_savings)
            });
            if (response.success) {
                setCalculations(prev => ({ ...prev, [goal.id]: response.data }));
            }
        } catch (error) {}
    };

    const calculatePreview = async () => {
        if (!Number(goalForm.target_amount) || !Number(goalForm.target_years) || !Number(goalForm.expected_return)) return;
        setCalculating(true);
        try {
            const response = await CustomerService.calculateGoal({
                target_amount: Number(goalForm.target_amount),
                target_years: Number(goalForm.target_years),
                expected_return: Number(goalForm.expected_return),
                current_savings: Number(goalForm.current_savings)
            });
            if (response.success) {
                setCalculationPreview(response.data);
            }
        } catch (error) {} finally {
            setCalculating(false);
        }
    };

    const handleFormAction = async (isUpdate: boolean) => {
        if (!goalForm.goal_name.trim()) return showToast('Please enter a goal name', 'error');
        setLoading(true);
        try {
            const submissionData = {
                ...goalForm,
                target_amount: Number(goalForm.target_amount),
                target_years: Number(goalForm.target_years),
                expected_return: Number(goalForm.expected_return),
                current_savings: Number(goalForm.current_savings)
            };
            const response = isUpdate 
                ? await CustomerService.updateGoal(editingGoal!.id, submissionData)
                : await CustomerService.createGoal(submissionData);

            if (response.success) {
                showToast(`Goal ${isUpdate ? 'updated' : 'created'} successfully!`, 'success');
                setShowGoalModal(false);
                resetForm();
                await fetchGoals();
                if (!isUpdate) setSelectedTab('dashboard');
            } else {
                showToast(response.message || 'Action failed', 'error');
            }
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Action failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!goalToDelete) return;
        setDeleting(true);
        try {
            const response = await CustomerService.deleteGoal(goalToDelete);
            if (response.success) {
                showToast('Goal deleted successfully', 'success');
                await fetchGoals();
            } else {
                showToast(response.message || 'Failed to delete goal', 'error');
            }
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to delete goal', 'error');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
            setGoalToDelete(null);
        }
    };

    const resetForm = () => {
        setGoalForm({ goal_name: '', target_amount: 0, target_years: 0, expected_return: 0, current_savings: 0 });
        setCalculationPreview(null);
        setEditingGoal(null);
    };

    // --- Utility formatting (Exactly same as your logic) ---
    const formatCurrency = (amount: number | string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    const formatLargeCurrency = (amount: number | string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
        if (num >= 1000) return `₹${(num / 1000).toFixed(2)} K`;
        return `₹${num}`;
    };

    const getGoalIcon = (goalName: string) => {
        const name = goalName.toLowerCase();
        if (name.includes('house') || name.includes('home')) return Home;
        if (name.includes('education') || name.includes('study') || name.includes('college')) return GraduationCap;
        if (name.includes('retire') || name.includes('pension')) return Briefcase;
        if (name.includes('travel') || name.includes('vacation') || name.includes('trip')) return Plane;
        if (name.includes('car') || name.includes('vehicle')) return Car;
        return Target;
    };

    useEffect(() => { fetchGoals(); }, []);

    useEffect(() => {
        if (showGoalModal || selectedTab === 'create') {
            const timer = setTimeout(() => calculatePreview(), 800);
            return () => clearTimeout(timer);
        }
    }, [goalForm, showGoalModal, selectedTab]);

    if (loading && !goals.length) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-4 font-medium">Loading your goals...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-red-100">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Goals</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <RefreshCw size={18} /> Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
                
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                <h2 className="text-xl sm:text-2xl font-bold pr-20">Goal Planner</h2>
                            </div>
                            <p className="text-sm sm:text-base text-white/80">Plan, track, and achieve your financial goals with ease.</p>
                        </div>
                        <button onClick={() => { resetForm(); setSelectedTab('create'); }} className="px-4 py-2.5 bg-white text-[#2076C7] rounded-xl text-sm font-bold flex items-center gap-2 transition-all hover:bg-opacity-90 shadow-md">
                            <Plus className="w-4 h-4" /> New Goal
                        </button>
                    </div>
                </motion.div>

                <div className="w-full">
                    <div className="flex mb-8 justify-center">
                        <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-full flex items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0">
                            {[
                                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                                { id: 'active', label: 'My Goals', icon: ListChecks, count: stats.activeCount },
                                { id: 'completed', label: 'Completed', icon: CheckCircle, count: stats.completedCount }
                            ].map(tab => (
                                <button key={tab.id} onClick={() => setSelectedTab(tab.id as any)} className={`relative px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 z-10 flex items-center gap-1.5 shrink-0 ${selectedTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                                    {selectedTab === tab.id && <motion.div layoutId="activeTabGoalPlanner" className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full -z-10 shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                                    <tab.icon size={14} />
                                    {tab.label}
                                    {tab.count !== undefined && tab.count > 0 && (
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedTab === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedTab === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3"><Target className="w-6 h-6 text-blue-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Goals</p>
                                    <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                                    <p className="text-xs text-gray-400 mt-2">{stats.activeCount} active • {stats.completedCount} completed</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3"><IndianRupee className="w-6 h-6 text-emerald-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Target</p>
                                    <p className="text-2xl font-bold text-emerald-600">{formatLargeCurrency(stats.totalTarget)}</p>
                                    <p className="text-xs text-gray-400 mt-2">Combined goal amount</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3"><Wallet className="w-6 h-6 text-amber-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Current Savings</p>
                                    <p className="text-2xl font-bold text-amber-600">{formatLargeCurrency(stats.totalCurrent)}</p>
                                    <p className="text-xs text-gray-400 mt-2">Already saved</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3"><TrendingUp className="w-6 h-6 text-purple-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Avg. Return</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.avgReturn}%</p>
                                    <p className="text-xs text-gray-400 mt-2">Expected p.a.</p>
                                </div>
                            </div>

                            {goals.length === 0 ? (
                                <div className="bg-white rounded-3xl p-16 text-center border border-gray-200">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><Target className="w-12 h-12 text-blue-600" /></div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Goals Yet</h3>
                                    <button onClick={() => setSelectedTab('create')} className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">Create Your First Goal</button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <tr>
                                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Goal</th>
                                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Target</th>
                                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Current</th>
                                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Returns</th>
                                                <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                                <th className="py-4 px-6 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {goals.map((goal) => {
                                                const Icon = getGoalIcon(goal.goal_name);
                                                const goalProgress = progress[goal.id] || 0;
                                                return (
                                                    <tr key={goal.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center"><Icon className="w-5 h-5 text-blue-600" /></div>
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{goal.goal_name}</div>
                                                                    <div className="text-xs text-gray-500">Created {new Date(goal.created_at).toLocaleDateString('en-IN')}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6"><div className="font-bold text-gray-900">{formatLargeCurrency(goal.target_amount)}</div><div className="text-xs text-gray-500">{goal.target_years} years</div></td>
                                                        <td className="py-4 px-6">
                                                            <div className="font-bold text-blue-600">{formatLargeCurrency(goal.current_savings)}</div>
                                                            <div className="w-24 mt-1"><div className="h-1.5 bg-gray-200 rounded-full overflow-hidden"><div style={{ width: `${goalProgress}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div></div>
                                                        </td>
                                                        <td className="py-4 px-6"><span className="font-bold text-emerald-600">{goal.expected_return}%</span></td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${goalProgress >= 100 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                                {goalProgress >= 100 ? <CheckCircle className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />} {goalProgress >= 100 ? 'Completed' : 'In Progress'}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button onClick={() => { setSelectedGoal(goal); setShowGoalDetails(true); }} className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-500" title="View Details"><Eye size={16} /></button>
                                                                <button onClick={() => { setEditingGoal(goal); setGoalForm({ goal_name: goal.goal_name, target_amount: parseFloat(goal.target_amount), target_years: goal.target_years, expected_return: parseFloat(goal.expected_return), current_savings: parseFloat(goal.current_savings) }); setShowGoalModal(true); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"><Edit2 size={16} /></button>
                                                                <button onClick={() => { setGoalToDelete(goal.id); setShowDeleteModal(true); }} className="p-2 hover:bg-red-100 rounded-lg transition-colors text-gray-500 hover:text-red-600" title="Delete Goal"><Trash2 size={16} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {/* Tab views (Active/Completed) - logic remains same as requested */}
                    {(selectedTab === 'active' || selectedTab === 'completed') && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                            <div className="p-6 border-b border-gray-200"><h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">{selectedTab === 'active' ? <ListChecks className="w-5 h-5 text-[#2076C7]" /> : <CheckCircle className="w-5 h-5 text-[#2076C7]" />}{selectedTab === 'active' ? 'My Goals' : 'Completed Goals'}</h2></div>
                            <div className="divide-y divide-gray-200">
                                {goals.filter(goal => selectedTab === 'active' ? (progress[goal.id] || 0) < 100 : (progress[goal.id] || 0) >= 100).map(goal => (
                                    <div key={goal.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">{React.createElement(getGoalIcon(goal.goal_name), { className: "w-6 h-6 text-blue-600" })}</div>
                                            <div><h3 className="font-bold text-gray-900">{goal.goal_name}</h3><p className="text-sm text-gray-500">Target: {formatLargeCurrency(goal.target_amount)} {selectedTab === 'active' && `• ${goal.target_years} years`}</p></div>
                                        </div>
                                        {selectedTab === 'active' ? (
                                            <div className="w-48">
                                                <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Progress</span><span className="font-bold">{(progress[goal.id] || 0).toFixed(1)}%</span></div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div style={{ width: `${progress[goal.id] || 0}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div>
                                            </div>
                                        ) : (
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Completed</span>
                                        )}
                                    </div>
                                ))}
                                {((selectedTab === 'active' && stats.activeCount === 0) || (selectedTab === 'completed' && stats.completedCount === 0)) && (
                                    <div className="p-12 text-center"><p className="text-gray-500">No goals found</p></div>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'create' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 max-w-3xl mx-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <button onClick={() => setSelectedTab('dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-500" /></button>
                                <h2 className="text-2xl font-bold text-gray-900">Create New Goal</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                                    <input type="text" value={goalForm.goal_name} onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" placeholder="e.g., Buy a House" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
                                        <div className="relative"><IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="number" value={goalForm.target_amount} onChange={(e) => setGoalForm({...goalForm, target_amount: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" min={0} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Years to Goal</label>
                                        <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="number" value={goalForm.target_years} onChange={(e) => setGoalForm({...goalForm, target_years: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" min={0} /></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                                        <div className="relative"><TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="number" value={goalForm.expected_return} onChange={(e) => setGoalForm({...goalForm, expected_return: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" min={0} /></div>
                                    </div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Current Savings (₹)</label>
                                        <div className="relative"><Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="number" value={goalForm.current_savings} onChange={(e) => setGoalForm({...goalForm, current_savings: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" min={0} /></div>
                                    </div>
                                </div>
                                {calculating ? (
                                    <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center"><Loader2 className="w-6 h-6 text-[#2076C7] animate-spin" /></div>
                                ) : calculationPreview && (
                                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-center gap-2 mb-4"><Sparkles size={18} className="text-[#2076C7]" /><h4 className="font-medium text-gray-900">Goal Preview</h4></div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div><p className="text-xs text-gray-500">Monthly SIP</p><p className="text-xl font-bold text-emerald-600">{formatCurrency(calculationPreview.monthly_investment_required)}</p></div>
                                            <div><p className="text-xs text-gray-500">Future Value</p><p className="text-lg font-bold text-blue-600">{formatCurrency(calculationPreview.future_value_of_current_savings)}</p></div>
                                            <div><p className="text-xs text-gray-500">Remaining</p><p className={`text-lg font-bold ${calculationPreview.remaining_amount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{formatCurrency(calculationPreview.remaining_amount)}</p></div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => { resetForm(); setSelectedTab('dashboard'); }} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">Cancel</button>
                                    <button onClick={() => handleFormAction(false)} disabled={loading || !goalForm.goal_name} className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus size={18} />} Create Goal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals - (Details, Create/Edit, Delete) - Keeping identical styling */}
                {showGoalDetails && selectedGoal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl sticky top-0 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-xl">{React.createElement(getGoalIcon(selectedGoal.goal_name), { size: 24 })}</div>
                                    <div><h3 className="text-xl font-bold">{selectedGoal.goal_name}</h3><p className="text-white/80 text-sm">Goal Details</p></div>
                                </div>
                                <button onClick={() => setShowGoalDetails(false)} className="p-2 hover:bg-white/20 rounded-xl"><X size={20} /></button>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-blue-50 p-3 rounded-lg"><div className="text-blue-600 text-[10px] font-medium mb-1 uppercase tracking-wider">Goal ID</div><p className="text-lg font-bold text-gray-900">#{selectedGoal.id}</p></div>
                                    <div className="bg-emerald-50 p-3 rounded-lg"><div className="text-emerald-600 text-[10px] font-medium mb-1 uppercase tracking-wider">User ID</div><p className="text-lg font-bold text-gray-900">#{selectedGoal.user_id}</p></div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-1.5"><Info size={14} className="text-[#2076C7]" />Goal Information</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><p className="text-[10px] text-gray-500">Target Amount</p><p className="text-sm font-bold text-gray-900">{formatCurrency(selectedGoal.target_amount)}</p></div>
                                        <div><p className="text-[10px] text-gray-500">Current Savings</p><p className="text-sm font-bold text-blue-600">{formatCurrency(selectedGoal.current_savings)}</p></div>
                                        <div><p className="text-[10px] text-gray-500">Time Horizon</p><p className="text-sm font-bold text-gray-900">{selectedGoal.target_years} years</p></div>
                                        <div><p className="text-[10px] text-gray-500">Expected Return</p><p className="text-sm font-bold text-emerald-600">{selectedGoal.expected_return}% p.a.</p></div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Progress</h4>
                                    <div className="flex justify-between text-xs mb-1"><span>Completion</span><span className="font-bold">{(progress[selectedGoal.id] || 0).toFixed(1)}%</span></div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3"><div style={{ width: `${progress[selectedGoal.id] || 0}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div>
                                    {calculations[selectedGoal.id] && <p className="text-[11px] font-medium text-gray-700">Monthly Investment: <span className="text-emerald-600 font-bold">{formatCurrency(calculations[selectedGoal.id].monthly_investment_required)}</span></p>}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button onClick={() => { setShowGoalDetails(false); setEditingGoal(selectedGoal); setGoalForm({ goal_name: selectedGoal.goal_name, target_amount: parseFloat(selectedGoal.target_amount), target_years: selectedGoal.target_years, expected_return: parseFloat(selectedGoal.expected_return), current_savings: parseFloat(selectedGoal.current_savings) }); setShowGoalModal(true); }} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">Edit Goal</button>
                                    <button onClick={() => setShowGoalDetails(false)} className="flex-1 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg text-sm font-medium">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showGoalModal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center sticky top-0">
                                <div className="flex items-center gap-3">{editingGoal ? <Edit2 size={24} /> : <Target size={24} />}<h3 className="text-xl font-bold">{editingGoal ? 'Edit Goal' : 'Create New Goal'}</h3></div>
                                <button onClick={() => { setShowGoalModal(false); resetForm(); }} className="p-2 hover:bg-white/20 rounded-xl transition-colors"><X size={20} /></button>
                            </div>
                            <div className="p-8 space-y-6">
                                <div><label className="text-sm font-medium text-gray-700 mb-2 block">Goal Name</label><input type="text" value={goalForm.goal_name} onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all" /></div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">Target Amount (₹)</label><input type="number" value={goalForm.target_amount} onChange={(e) => setGoalForm({...goalForm, target_amount: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7]" /></div>
                                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">Years to Goal</label><input type="number" value={goalForm.target_years} onChange={(e) => setGoalForm({...goalForm, target_years: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7]" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">Expected Return (%)</label><input type="number" value={goalForm.expected_return} onChange={(e) => setGoalForm({...goalForm, expected_return: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7]" /></div>
                                    <div><label className="text-sm font-medium text-gray-700 mb-2 block">Current Savings (₹)</label><input type="number" value={goalForm.current_savings} onChange={(e) => setGoalForm({...goalForm, current_savings: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7]" /></div>
                                </div>
                                {calculationPreview && (
                                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 grid grid-cols-3 gap-4">
                                        <div><p className="text-xs text-gray-500">Monthly SIP</p><p className="text-lg font-bold text-emerald-600">{formatCurrency(calculationPreview.monthly_investment_required)}</p></div>
                                        <div><p className="text-xs text-gray-500">Future Value</p><p className="text-lg font-bold text-blue-600">{formatCurrency(calculationPreview.future_value_of_current_savings)}</p></div>
                                        <div><p className="text-xs text-gray-500">Remaining</p><p className="text-lg font-bold text-amber-600">{formatCurrency(calculationPreview.remaining_amount)}</p></div>
                                    </div>
                                )}
                                <div className="flex gap-4 pt-4">
                                    <button onClick={() => { setShowGoalModal(false); resetForm(); }} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
                                    <button onClick={() => handleFormAction(true)} disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />} {editingGoal ? 'Update Goal' : 'Create Goal'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-8 h-8 text-red-600" /></div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Goal</h3><p className="text-gray-500 mb-6">Are you sure you want to delete this goal? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
                                <button onClick={handleConfirmDelete} disabled={deleting} className="flex-1 py-3 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2">{deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 size={16} />} Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}