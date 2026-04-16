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
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} animate-in slide-in-from-top-2 fade-in duration-300 max-w-[calc(100vw-2rem)]`}>
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
            setCustomerName(
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
            );
        } else {
            setCustomerName('Customer');
        }
        } catch {
        setCustomerName('Customer');
        }

        const response = await CustomerService.getMyGoals();

        if (response?.success && response?.data) {
        setGoals(response.data);

        await Promise.all(
            response.data.map(async (goal: Goal) => {
            await fetchGoalProgress(goal.id);
            await fetchGoalCalculation(goal);
            })
        );
        } else {
        showToast('Failed to load goals', 'error');
        }

    } catch (err: any) {
        if (err.response?.status === 401) {
        removeTokenCookie();
        localStorage.removeItem('token');
        showToast('Session expired. Please login again.', 'error');
        router.push('/');
        } else {
        const errorMessage =
            err.response?.data?.message || 'Failed to load goals';

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
            <AnimatePresence>
              {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>

            <div className="flex-1 p-3 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
                
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                <h2 className="text-xl sm:text-2xl font-bold pr-10 md:pr-20">Goal Planner</h2>
                            </div>
                            <p className="text-sm sm:text-base text-white/80">Plan, track, and achieve your financial goals with ease.</p>
                        </div>
                        <button onClick={() => { resetForm(); setSelectedTab('create'); }} className="w-full md:w-auto px-4 py-2.5 bg-white text-[#2076C7] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-opacity-90 shadow-md">
                            <Plus className="w-4 h-4" /> New Goal
                        </button>
                    </div>
                </motion.div>

                <div className="w-full">
                    <div className="flex mb-8 justify-center overflow-x-auto hide-scrollbar">
                        <div className="p-1 bg-slate-100/80 backdrop-blur-sm rounded-xl md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-1 relative shadow-inner border border-slate-200/50 shrink-0 min-w-full md:min-w-0">
                            {[
                                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                                { id: 'active', label: 'My Goals', icon: ListChecks, count: stats.activeCount },
                                { id: 'completed', label: 'Completed', icon: CheckCircle, count: stats.completedCount }
                            ].map(tab => (
                                <button key={tab.id} onClick={() => setSelectedTab(tab.id as any)} className={`relative px-4 md:px-5 py-2 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 flex items-center justify-center md:justify-start gap-1.5 shrink-0 ${selectedTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                                    {selectedTab === tab.id && <motion.div layoutId="activeTabGoalPlanner" className="absolute inset-0 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg md:rounded-full -z-10 shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                                    <tab.icon size={14} />
                                    {tab.label}
                                    {tab.count !== undefined && tab.count > 0 && (
                                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${selectedTab === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedTab === 'dashboard' && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3"><Target className="w-6 h-6 text-blue-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Goals</p>
                                    <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase">{stats.activeCount} active • {stats.completedCount} completed</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3"><IndianRupee className="w-6 h-6 text-emerald-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Total Target</p>
                                    <p className="text-2xl font-bold text-emerald-600">{formatLargeCurrency(stats.totalTarget)}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-tighter">Combined goal amount</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3"><Wallet className="w-6 h-6 text-amber-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Current Savings</p>
                                    <p className="text-2xl font-bold text-amber-600">{formatLargeCurrency(stats.totalCurrent)}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-tighter">Already saved</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3"><TrendingUp className="w-6 h-6 text-purple-600" /></div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Avg. Return</p>
                                    <p className="text-2xl font-bold text-purple-600">{stats.avgReturn}%</p>
                                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-tighter">Expected p.a.</p>
                                </div>
                            </div>

                            {goals.length === 0 ? (
                                <div className="bg-white rounded-3xl p-12 md:p-16 text-center border border-gray-200">
                                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><Target className="w-12 h-12 text-blue-600" /></div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Goals Yet</h3>
                                    <button onClick={() => setSelectedTab('create')} className="px-8 py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:opacity-90 transition-all">Create First Goal</button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    {/* Desktop Table - Hidden on small screens */}
                                    <div className="hidden md:block overflow-x-auto">
                                      <table className="w-full">
                                          <thead className="bg-gray-50">
                                              <tr>
                                                  <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Goal</th>
                                                  <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Target</th>
                                                  <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Current</th>
                                                  <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Returns</th>
                                                  <th className="py-4 px-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                                  <th className="py-4 px-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                              </tr>
                                          </thead>
                                          <tbody className="divide-y divide-gray-100">
                                              {goals.map((goal) => {
                                                  const Icon = getGoalIcon(goal.goal_name);
                                                  const goalProgress = progress[goal.id] || 0;
                                                  return (
                                                      <tr key={goal.id} className="hover:bg-gray-50/50 transition-colors group">
                                                          <td className="py-4 px-6">
                                                              <div className="flex items-center gap-3">
                                                                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Icon size={20} /></div>
                                                                  <div>
                                                                      <div className="font-bold text-gray-900">{goal.goal_name}</div>
                                                                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Est. {new Date(goal.created_at).toLocaleDateString('en-IN')}</div>
                                                                  </div>
                                                              </div>
                                                          </td>
                                                          <td className="py-4 px-6">
                                                            <div className="font-black text-gray-900">{formatLargeCurrency(goal.target_amount)}</div>
                                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{goal.target_years} years</div>
                                                          </td>
                                                          <td className="py-4 px-6">
                                                              <div className="font-black text-blue-600">{formatLargeCurrency(goal.current_savings)}</div>
                                                              <div className="w-24 mt-1"><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div style={{ width: `${Math.min(goalProgress, 100)}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div></div>
                                                          </td>
                                                          <td className="py-4 px-6"><span className="font-black text-emerald-600">{goal.expected_return}%</span></td>
                                                          <td className="py-4 px-6">
                                                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${goalProgress >= 100 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                                  {goalProgress >= 100 ? <CheckCircle size={10} /> : <TrendingUp size={10} />} {goalProgress >= 100 ? 'Completed' : 'Active'}
                                                              </span>
                                                          </td>
                                                          <td className="py-4 px-6">
                                                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                  <button onClick={() => { setSelectedGoal(goal); setShowGoalDetails(true); }} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500" title="View"><Eye size={16} /></button>
                                                                  <button onClick={() => { setEditingGoal(goal); setGoalForm({ goal_name: goal.goal_name, target_amount: parseFloat(goal.target_amount), target_years: goal.target_years, expected_return: parseFloat(goal.expected_return), current_savings: parseFloat(goal.current_savings) }); setShowGoalModal(true); }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Edit2 size={16} /></button>
                                                                  <button onClick={() => { setGoalToDelete(goal.id); setShowDeleteModal(true); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Delete"><Trash2 size={16} /></button>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  );
                                              })}
                                          </tbody>
                                      </table>
                                    </div>

                                    {/* Mobile Cards - Hidden on desktop */}
                                    <div className="md:hidden divide-y divide-gray-100">
                                      {goals.map((goal) => {
                                        const Icon = getGoalIcon(goal.goal_name);
                                        const goalProgress = progress[goal.id] || 0;
                                        return (
                                          <div key={goal.id} className="p-4 space-y-4">
                                            <div className="flex justify-between items-start">
                                              <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><Icon size={20} /></div>
                                                <div><p className="font-bold text-gray-900 leading-tight">{goal.goal_name}</p><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Goal #{goal.id}</p></div>
                                              </div>
                                              <div className="flex gap-2">
                                                <button onClick={() => { setSelectedGoal(goal); setShowGoalDetails(true); }} className="p-2 text-blue-500"><Eye size={18} /></button>
                                                <button onClick={() => { setGoalToDelete(goal.id); setShowDeleteModal(true); }} className="p-2 text-red-500"><Trash2 size={18} /></button>
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                                              <div><p className="text-[9px] font-bold text-gray-400 uppercase">Target</p><p className="text-sm font-black text-gray-900">{formatLargeCurrency(goal.target_amount)}</p></div>
                                              <div><p className="text-[9px] font-bold text-gray-400 uppercase">Current</p><p className="text-sm font-black text-blue-600">{formatLargeCurrency(goal.current_savings)}</p></div>
                                            </div>
                                            <div className="space-y-1.5">
                                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-gray-400">Progress</span>
                                                <span className="text-blue-600">{goalProgress.toFixed(1)}%</span>
                                              </div>
                                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner"><div style={{ width: `${Math.min(goalProgress, 100)}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {(selectedTab === 'active' || selectedTab === 'completed') && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-5 border-b border-gray-100"><h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">{selectedTab === 'active' ? <ListChecks className="w-5 h-5 text-blue-600" /> : <CheckCircle className="w-5 h-5 text-emerald-500" />}{selectedTab === 'active' ? 'My Active Goals' : 'Completed Milestones'}</h2></div>
                            <div className="divide-y divide-gray-100">
                                {goals.filter(goal => selectedTab === 'active' ? (progress[goal.id] || 0) < 100 : (progress[goal.id] || 0) >= 100).map(goal => (
                                    <div key={goal.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">{React.createElement(getGoalIcon(goal.goal_name), { className: "w-6 h-6" })}</div>
                                            <div><h3 className="font-bold text-gray-900">{goal.goal_name}</h3><p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Target: {formatLargeCurrency(goal.target_amount)} {selectedTab === 'active' && `• ${goal.target_years} years`}</p></div>
                                        </div>
                                        {selectedTab === 'active' ? (
                                            <div className="w-full sm:w-48 space-y-1.5">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest"><span className="text-gray-400">Completion</span><span className="text-blue-600">{(progress[goal.id] || 0).toFixed(1)}%</span></div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner"><div style={{ width: `${progress[goal.id] || 0}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" /></div>
                                            </div>
                                        ) : (
                                            <span className="w-fit px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Success</span>
                                        )}
                                    </div>
                                ))}
                                {((selectedTab === 'active' && stats.activeCount === 0) || (selectedTab === 'completed' && stats.completedCount === 0)) && (
                                    <div className="p-12 text-center text-gray-400 font-medium">No results matching this category</div>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedTab === 'create' && (
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 md:p-10 max-w-3xl mx-auto overflow-hidden">
                            <div className="flex items-center gap-4 mb-8">
                                <button onClick={() => setSelectedTab('dashboard')} className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><ArrowLeft size={20} className="text-slate-400" /></button>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Create Financial Goal</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Goal Description</label>
                                    <input type="text" value={goalForm.goal_name} onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="e.g., Family Vacation" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Target Amount (₹)</label>
                                        <div className="relative"><IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} /><input type="number" value={goalForm.target_amount} onChange={(e) => setGoalForm({...goalForm, target_amount: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold outline-none" min={0} /></div>
                                    </div>
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Horizon (Years)</label>
                                        <div className="relative"><Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} /><input type="number" value={goalForm.target_years} onChange={(e) => setGoalForm({...goalForm, target_years: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold outline-none" min={0} /></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Exp. Return (%)</label>
                                        <input type="number" value={goalForm.expected_return} onChange={(e) => setGoalForm({...goalForm, expected_return: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold outline-none" min={0} />
                                    </div>
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Current Balance (₹)</label>
                                        <input type="number" value={goalForm.current_savings} onChange={(e) => setGoalForm({...goalForm, current_savings: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold outline-none" min={0} />
                                    </div>
                                </div>
                                {calculating ? (
                                    <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>
                                ) : calculationPreview && (
                                    <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-6 text-white shadow-lg">
                                        <div className="flex items-center gap-2 mb-6"><Sparkles size={16} /><h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Investment Projection</h4></div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center border-r border-white/20 px-1"><p className="text-[8px] md:text-[10px] font-bold opacity-60 mb-2">MONTHLY SIP</p><p className="text-xs md:text-xl font-black truncate">{formatCurrency(calculationPreview.monthly_investment_required)}</p></div>
                                            <div className="text-center border-r border-white/20 px-1"><p className="text-[8px] md:text-[10px] font-bold opacity-60 mb-2">FUTURE VAL</p><p className="text-xs md:text-xl font-black truncate">{formatCurrency(calculationPreview.future_value_of_current_savings)}</p></div>
                                            <div className="text-center px-1"><p className="text-[8px] md:text-[10px] font-bold opacity-60 mb-2">REMAINING</p><p className="text-xs md:text-xl font-black truncate">{formatCurrency(calculationPreview.remaining_amount)}</p></div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button onClick={() => { resetForm(); setSelectedTab('dashboard'); }} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-200">Cancel</button>
                                    <button onClick={() => handleFormAction(false)} disabled={loading || !goalForm.goal_name} className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus size={18} />} Create Goal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals - Responsive Structure */}
                {showGoalDetails && selectedGoal && (
                    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} className="bg-white rounded-t-[2.5rem] sm:rounded-[2rem] max-w-lg w-full max-h-[92vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white sticky top-0 flex justify-between items-center z-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/20 rounded-2xl shadow-inner">{React.createElement(getGoalIcon(selectedGoal.goal_name), { size: 24 })}</div>
                                    <div><h3 className="text-xl font-black">{selectedGoal.goal_name}</h3><p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Detail Summary</p></div>
                                </div>
                                <button onClick={() => setShowGoalDetails(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Target Capital</p><p className="text-lg font-black text-slate-900">{formatCurrency(selectedGoal.target_amount)}</p></div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Current Balance</p><p className="text-lg font-black text-blue-600">{formatCurrency(selectedGoal.current_savings)}</p></div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Years Horizon</p><p className="text-lg font-black text-slate-900">{selectedGoal.target_years} Yrs</p></div>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Expected ROI</p><p className="text-lg font-black text-emerald-600">{selectedGoal.expected_return}%</p></div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl p-6 border border-blue-50 shadow-sm">
                                    <h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-3">Live Progress</h4>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-slate-500 font-bold">Goal Completion</span><span className="font-black text-blue-600">{(progress[selectedGoal.id] || 0).toFixed(1)}%</span></div>
                                    <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner mb-4"><div style={{ width: `${Math.min(progress[selectedGoal.id] || 0, 100)}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] shadow-md transition-all duration-1000" /></div>
                                    {calculations[selectedGoal.id] && <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-white"><p className="text-[10px] font-bold text-slate-500 uppercase">Monthly Needed</p><p className="text-base font-black text-emerald-600">{formatCurrency(calculations[selectedGoal.id].monthly_investment_required)}</p></div>}
                                </div>
                                
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => { setShowGoalDetails(false); setEditingGoal(selectedGoal); setGoalForm({ goal_name: selectedGoal.goal_name, target_amount: parseFloat(selectedGoal.target_amount), target_years: selectedGoal.target_years, expected_return: parseFloat(selectedGoal.expected_return), current_savings: parseFloat(selectedGoal.current_savings) }); setShowGoalModal(true); }} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all">Modify Goal</button>
                                    <button onClick={() => setShowGoalDetails(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Close</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showGoalModal && (
                    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white rounded-t-[2.5rem] sm:rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-center sticky top-0 z-10 shadow-sm">
                                <div className="flex items-center gap-3">{editingGoal ? <Edit2 size={24} /> : <Target size={24} />}<h3 className="text-xl font-bold uppercase tracking-tight">{editingGoal ? 'Update Milestone' : 'New Milestone'}</h3></div>
                                <button onClick={() => { setShowGoalModal(false); resetForm(); }} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                            <div className="p-6 md:p-10 space-y-6">
                                <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Milestone Identifier</label><input type="text" value={goalForm.goal_name} onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-800 font-bold focus:ring-2 focus:ring-blue-100 outline-none" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Target (₹)</label><input type="number" value={goalForm.target_amount} onChange={(e) => setGoalForm({...goalForm, target_amount: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" /></div>
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Years</label><input type="number" value={goalForm.target_years} onChange={(e) => setGoalForm({...goalForm, target_years: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Returns (%)</label><input type="number" value={goalForm.expected_return} onChange={(e) => setGoalForm({...goalForm, expected_return: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" /></div>
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Current (₹)</label><input type="number" value={goalForm.current_savings} onChange={(e) => setGoalForm({...goalForm, current_savings: e.target.value === '' ? '' : Number(e.target.value)})} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold outline-none" /></div>
                                </div>
                                {calculationPreview && (
                                    <div className="bg-slate-900 rounded-[2rem] p-6 text-white grid grid-cols-3 gap-2 shadow-xl border border-slate-800">
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-2">Monthly SIP</p><p className="text-xs md:text-sm font-black truncate">{formatCurrency(calculationPreview.monthly_investment_required)}</p></div>
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-2">Target Val</p><p className="text-xs md:text-sm font-black truncate">{formatCurrency(calculationPreview.future_value_of_current_savings)}</p></div>
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-2">Deficit</p><p className="text-xs md:text-sm font-black truncate text-amber-500">{formatCurrency(calculationPreview.remaining_amount)}</p></div>
                                    </div>
                                )}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button onClick={() => { setShowGoalModal(false); resetForm(); }} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-slate-200">Discard</button>
                                    <button onClick={() => handleFormAction(!!editingGoal)} disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]">
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />} {editingGoal ? 'Update Milestone' : 'Confirm Goal'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] max-w-sm w-full p-8 text-center shadow-2xl">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle className="w-10 h-10 text-red-500" /></div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Erase Milestone?</h3><p className="text-slate-500 text-sm mb-8 leading-relaxed">This action is permanent and will remove all tracking data for this specific financial goal.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3.5 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Keep Goal</button>
                                <button onClick={handleConfirmDelete} disabled={deleting} className="flex-1 py-3.5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200 flex items-center justify-center gap-2">{deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Delete'}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
            
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}