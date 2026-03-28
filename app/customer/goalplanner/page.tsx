'use client';

import React, { useState, useEffect } from 'react';
import { 
    Target, Plus, TrendingUp, Calendar, Wallet, CheckCircle2, AlertCircle,
    Home, GraduationCap, Car, Plane, Briefcase,
    Sparkles, Clock, IndianRupee, X, Save, Edit2, 
    Trash2, Loader2, LayoutDashboard, ListChecks,
    CheckCircle, ArrowLeft, Eye,
    Info, CalendarDays, Percent, PiggyBank,
    RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomerService from '../../services/customerService';

// Types
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

// Toast Component
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

// ==================== HELPER FUNCTIONS ====================

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
    const [error, setError] = useState<string | null>(null);
    const [calculating, setCalculating] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'dashboard' | 'active' | 'completed' | 'create'>('dashboard');
    
    // Toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    
    // Goal form state
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const [goalForm, setGoalForm] = useState({
        goal_name: '',
        target_amount: 1000000,
        target_years: 10,
        expected_return: 12,
        current_savings: 0
    });

    // Calculation state
    const [calculations, setCalculations] = useState<Record<number, GoalCalculation>>({});
    const [progress, setProgress] = useState<Record<number, number>>({});
    const [calculationPreview, setCalculationPreview] = useState<GoalCalculation | null>(null);
    
    // Goal details state
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [showGoalDetails, setShowGoalDetails] = useState(false);
    const [loadingGoalDetails, setLoadingGoalDetails] = useState(false);
    
    // Delete confirmation modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    // ========== TOAST HELPER ==========
    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };

    // ========== FETCH ALL GOALS ==========
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
            
            const response = await CustomerService.getMyGoals();
            
            if (response.success) {
                setGoals(response.data);
                
                // Fetch progress and calculations for each goal
                response.data.forEach((goal: Goal) => {
                    fetchGoalProgress(goal.id);
                    fetchGoalCalculation(goal.id);
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

    // ========== FETCH GOAL PROGRESS ==========
    const fetchGoalProgress = async (goalId: number) => {
        try {
            const response = await CustomerService.getGoalProgress(goalId);
            if (response.success && response.progress_percentage !== undefined) {
                setProgress(prev => ({ ...prev, [goalId]: response.progress_percentage }));
            }
        } catch (error) {
            showToast('Failed to fetch goal progress', 'error');
        }
    };

    // ========== FETCH GOAL CALCULATION ==========
    const fetchGoalCalculation = async (goalId: number) => {
        try {
            const goal = goals.find(g => g.id === goalId);
            if (!goal) return;

            const response = await CustomerService.calculateGoal({
                target_amount: parseFloat(goal.target_amount),
                target_years: goal.target_years,
                expected_return: parseFloat(goal.expected_return),
                current_savings: parseFloat(goal.current_savings)
            });

            if (response.success) {
                setCalculations(prev => ({ ...prev, [goalId]: response.data }));
            }
        } catch (error) {
            // Silent fail for calculations - don't show toast for every calculation error
        }
    };

    // ========== FETCH SINGLE GOAL DETAILS ==========
    const fetchGoalDetails = async (goalId: number) => {
        setLoadingGoalDetails(true);
        try {
            const response = await CustomerService.getGoalById(goalId);
            if (response.success) {
                setSelectedGoal(response.data);
                setShowGoalDetails(true);
            } else {
                showToast('Failed to load goal details', 'error');
            }
        } catch (error) {
            showToast('Failed to load goal details', 'error');
        } finally {
            setLoadingGoalDetails(false);
        }
    };

    // ========== CALCULATE PREVIEW ==========
    const calculatePreview = async () => {
        if (!goalForm.target_amount || !goalForm.target_years || !goalForm.expected_return) return;

        setCalculating(true);
        try {
            const response = await CustomerService.calculateGoal({
                target_amount: goalForm.target_amount,
                target_years: goalForm.target_years,
                expected_return: goalForm.expected_return,
                current_savings: goalForm.current_savings
            });
            
            if (response.success) {
                setCalculationPreview(response.data);
            }
        } catch (error) {
            // Silent fail for preview calculation
        } finally {
            setCalculating(false);
        }
    };

    // ========== CREATE GOAL ==========
    const handleCreateGoal = async () => {
        if (!goalForm.goal_name.trim()) {
            showToast('Please enter a goal name', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await CustomerService.createGoal(goalForm);
            if (response.success) {
                showToast('Goal created successfully!', 'success');
                setShowGoalModal(false);
                resetForm();
                await fetchGoals();
                setSelectedTab('dashboard');
            } else {
                showToast(response.message || 'Failed to create goal', 'error');
            }
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to create goal', 'error');
        } finally {
            setLoading(false);
        }
    };

    // ========== UPDATE GOAL ==========
    const handleUpdateGoal = async () => {
        if (!editingGoal) return;

        setLoading(true);
        try {
            const response = await CustomerService.updateGoal(editingGoal.id, goalForm);
            if (response.success) {
                showToast('Goal updated successfully!', 'success');
                setShowGoalModal(false);
                setEditingGoal(null);
                resetForm();
                await fetchGoals();
            } else {
                showToast(response.message || 'Failed to update goal', 'error');
            }
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to update goal', 'error');
        } finally {
            setLoading(false);
        }
    };

    // ========== DELETE GOAL - Updated with custom modal ==========
    const handleDeleteClick = (goalId: number) => {
        setGoalToDelete(goalId);
        setShowDeleteModal(true);
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

    // ========== HANDLE EDIT ==========
    const handleEditGoal = (goal: Goal) => {
        setEditingGoal(goal);
        setGoalForm({
            goal_name: goal.goal_name,
            target_amount: parseFloat(goal.target_amount),
            target_years: goal.target_years,
            expected_return: parseFloat(goal.expected_return),
            current_savings: parseFloat(goal.current_savings)
        });
        setShowGoalModal(true);
    };

    // ========== HANDLE VIEW DETAILS ==========
    const handleViewDetails = (goal: Goal) => {
        fetchGoalDetails(goal.id);
    };

    // ========== RESET FORM ==========
    const resetForm = () => {
        setGoalForm({
            goal_name: '',
            target_amount: 1000000,
            target_years: 10,
            expected_return: 12,
            current_savings: 0
        });
        setCalculationPreview(null);
        setEditingGoal(null);
    };

    // ========== FORMATTERS ==========
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // ========== GET GOAL ICON ==========
    const getGoalIcon = (goalName: string) => {
        const name = goalName.toLowerCase();
        if (name.includes('house') || name.includes('home')) return Home;
        if (name.includes('education') || name.includes('study') || name.includes('college')) return GraduationCap;
        if (name.includes('retire') || name.includes('pension')) return Briefcase;
        if (name.includes('travel') || name.includes('vacation') || name.includes('trip')) return Plane;
        if (name.includes('car') || name.includes('vehicle')) return Car;
        return Target;
    };

    // ========== STATUS BADGE ==========
    const StatusBadge = ({ progress }: { progress: number }) => {
        if (progress >= 100) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Completed
                </span>
            );
        } else if (progress > 0) {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <TrendingUp className="w-3.5 h-3.5" />
                    In Progress
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    Not Started
                </span>
            );
        }
    };

    // ========== CALCULATE STATS ==========
    const totalTarget = goals.reduce((sum, g) => sum + parseFloat(g.target_amount), 0);
    const totalCurrent = goals.reduce((sum, g) => sum + parseFloat(g.current_savings), 0);
    const avgReturn = goals.length 
        ? (goals.reduce((sum, g) => sum + parseFloat(g.expected_return), 0) / goals.length).toFixed(1)
        : '0';
    const activeCount = goals.filter(goal => (progress[goal.id] || 0) < 100).length;
    const completedCount = goals.filter(goal => (progress[goal.id] || 0) >= 100).length;

    // ========== EFFECTS ==========
    useEffect(() => {
        fetchGoals();
    }, []);

    useEffect(() => {
        if (showGoalModal) {
            const timer = setTimeout(() => {
                calculatePreview();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [goalForm, showGoalModal]);

    // ========== LOADING STATE ==========
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

    // ========== ERROR STATE ==========
    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-red-100">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Goals</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    // ========== MAIN RENDER ==========
    return (
        <>
            {/* Toast Notifications */}
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Target className="w-8 h-8 text-[#2076C7]" />
                                Goal Planner
                            </h1>
                        </div>
                        <p className="text-gray-600">Plan, track, and achieve your financial goals</p>
                    </div>
                    
                    <button 
                        onClick={() => {
                            resetForm();
                            setSelectedTab('create');
                        }}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all hover:opacity-90"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Goal
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 flex flex-wrap gap-2 mb-8">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'active', label: 'My Goals', icon: ListChecks, count: activeCount },
                        { id: 'completed', label: 'Completed', icon: CheckCircle, count: completedCount }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id as any)}
                            className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                                selectedTab === tab.id
                                    ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    selectedTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Dashboard View */}
                {selectedTab === 'dashboard' && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            
                            {/* Total Goals */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Goals</p>
                                <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {activeCount} active • {completedCount} completed
                                </p>
                            </div>
                            
                            {/* Total Target */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                                    <IndianRupee className="w-6 h-6 text-emerald-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Target</p>
                                <p className="text-2xl font-bold text-emerald-600">{formatLargeCurrency(totalTarget)}</p>
                                <p className="text-xs text-gray-400 mt-2">Combined goal amount</p>
                            </div>
                            
                            {/* Current Savings */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                                    <Wallet className="w-6 h-6 text-amber-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Current Savings</p>
                                <p className="text-2xl font-bold text-amber-600">{formatLargeCurrency(totalCurrent)}</p>
                                <p className="text-xs text-gray-400 mt-2">Already saved</p>
                            </div>
                            
                            {/* Average Return */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Avg. Return</p>
                                <p className="text-2xl font-bold text-purple-600">{avgReturn}%</p>
                                <p className="text-xs text-gray-400 mt-2">Expected p.a.</p>
                            </div>
                        </div>

                        {/* Goals List */}
                        {goals.length === 0 ? (
                            <div className="bg-white rounded-3xl p-16 text-center border border-gray-200">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Target className="w-12 h-12 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Goals Yet</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                    Start planning your financial future by creating your first goal.
                                </p>
                                <button
                                    onClick={() => setSelectedTab('create')}
                                    className="px-8 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    Create Your First Goal
                                </button>
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
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-emerald-100 flex items-center justify-center">
                                                                <Icon className="w-5 h-5 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">{goal.goal_name}</div>
                                                                <div className="text-xs text-gray-500">Created {formatDate(goal.created_at)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="font-bold text-gray-900">{formatLargeCurrency(goal.target_amount)}</div>
                                                        <div className="text-xs text-gray-500">{goal.target_years} years</div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="font-bold text-blue-600">{formatLargeCurrency(goal.current_savings)}</div>
                                                        <div className="w-24 mt-1">
                                                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                                <div 
                                                                    style={{ width: `${goalProgress}%` }}
                                                                    className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className="font-bold text-emerald-600">{goal.expected_return}%</span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <StatusBadge progress={goalProgress} />
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleViewDetails(goal)}
                                                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                                                                title="View Details"
                                                            >
                                                                <Eye size={16} className="text-blue-500 group-hover:text-blue-600" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditGoal(goal)}
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit2 size={16} className="text-gray-500" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(goal.id)}
                                                                className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                                                                title="Delete Goal"
                                                            >
                                                                <Trash2 size={16} className="text-gray-500 group-hover:text-red-600" />
                                                            </button>
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

                {/* My Goals (Active) View */}
                {selectedTab === 'active' && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <ListChecks className="w-5 h-5 text-[#2076C7]" />
                                My Goals
                            </h2>
                        </div>
                        {activeCount === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-8 h-8 text-blue-600" />
                                </div>
                                <p className="text-gray-500">No active goals</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {goals
                                    .filter(goal => (progress[goal.id] || 0) < 100)
                                    .map(goal => {
                                        const Icon = getGoalIcon(goal.goal_name);
                                        const goalProgress = progress[goal.id] || 0;
                                        
                                        return (
                                            <div key={goal.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                        <Icon className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{goal.goal_name}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Target: {formatLargeCurrency(goal.target_amount)} • {goal.target_years} years
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-48">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-500">Progress</span>
                                                        <span className="font-bold">{goalProgress.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            style={{ width: `${goalProgress}%` }}
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
                )}

                {/* Completed Goals View */}
                {selectedTab === 'completed' && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#2076C7]" />
                                Completed Goals
                            </h2>
                        </div>
                        {completedCount === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <p className="text-gray-500">No completed goals yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {goals
                                    .filter(goal => (progress[goal.id] || 0) >= 100)
                                    .map(goal => (
                                        <div key={goal.id} className="p-6 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{goal.goal_name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Target: {formatLargeCurrency(goal.target_amount)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                                Completed
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Create Goal View */}
                {selectedTab === 'create' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <button
                                onClick={() => setSelectedTab('dashboard')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} className="text-gray-500" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900">Create New Goal</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Goal Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Goal Name
                                </label>
                                <input
                                    type="text"
                                    value={goalForm.goal_name}
                                    onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                    placeholder="e.g., Buy a House, Child Education, Retirement"
                                />
                            </div>

                            {/* Target Amount & Years */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Target Amount (₹)
                                    </label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.target_amount}
                                            onChange={(e) => setGoalForm({...goalForm, target_amount: Number(e.target.value)})}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1000}
                                            step={1000}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Years to Goal
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.target_years}
                                            onChange={(e) => setGoalForm({...goalForm, target_years: Number(e.target.value)})}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1}
                                            max={30}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expected Return & Current Savings */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expected Return (% p.a.)
                                    </label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.expected_return}
                                            onChange={(e) => setGoalForm({...goalForm, expected_return: Number(e.target.value)})}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1}
                                            max={30}
                                            step={0.1}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Savings (₹)
                                    </label>
                                    <div className="relative">
                                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            value={goalForm.current_savings}
                                            onChange={(e) => setGoalForm({...goalForm, current_savings: Number(e.target.value)})}
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={0}
                                            step={1000}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Calculation Preview */}
                            {calculating ? (
                                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-[#2076C7] animate-spin" />
                                </div>
                            ) : calculationPreview && (
                                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles size={18} className="text-[#2076C7]" />
                                        <h4 className="font-medium text-gray-900">Goal Preview</h4>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Monthly Investment</p>
                                            <p className="text-xl font-bold text-emerald-600">
                                                {formatCurrency(calculationPreview.monthly_investment_required)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Future Value (Current)</p>
                                            <p className="text-lg font-bold text-blue-600">
                                                {formatCurrency(calculationPreview.future_value_of_current_savings)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Remaining Amount</p>
                                            <p className={`text-lg font-bold ${calculationPreview.remaining_amount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                {formatCurrency(calculationPreview.remaining_amount)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setSelectedTab('dashboard');
                                    }}
                                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateGoal}
                                    disabled={loading || !goalForm.goal_name}
                                    className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus size={18} />}
                                    Create Goal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Goal Details Modal */}
                {showGoalDetails && selectedGoal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl sticky top-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-xl">
                                            {(() => {
                                                const Icon = getGoalIcon(selectedGoal.goal_name);
                                                return <Icon size={24} />;
                                            })()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedGoal.goal_name}</h3>
                                            <p className="text-white/80 text-sm">Goal Details</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setShowGoalDetails(false)} 
                                        className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Content */}
                            {loadingGoalDetails ? (
                                <div className="p-12 flex justify-center">
                                    <Loader2 className="w-8 h-8 text-[#2076C7] animate-spin" />
                                </div>
                            ) : (
                            <div className="p-5 space-y-4">
                                {/* Quick Stats - Compact */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                                            <Target size={12} />
                                            <span className="text-[10px] font-medium">GOAL ID</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">#{selectedGoal.id}</p>
                                    </div>
                                    <div className="bg-emerald-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                                            <PiggyBank size={12} />
                                            <span className="text-[10px] font-medium">USER ID</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">#{selectedGoal.user_id}</p>
                                    </div>
                                </div>

                                {/* Main Details - Compact */}
                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                                        <Info size={14} className="text-[#2076C7]" />
                                        Goal Information
                                    </h4>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-0.5">Target Amount</p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {formatCurrency(selectedGoal.target_amount)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-0.5">Current Savings</p>
                                            <p className="text-sm font-bold text-blue-600">
                                                {formatCurrency(selectedGoal.current_savings)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-0.5">Time Horizon</p>
                                            <div className="flex items-center gap-1">
                                                <CalendarDays size={12} className="text-gray-400" />
                                                <p className="text-sm font-bold text-gray-900">{selectedGoal.target_years} years</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-0.5">Expected Return</p>
                                            <div className="flex items-center gap-1">
                                                <Percent size={12} className="text-gray-400" />
                                                <p className="text-sm font-bold text-emerald-600">{selectedGoal.expected_return}% p.a.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Section - Compact */}
                                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Progress Tracking</h4>
                                    <div className="mb-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-600">Completion</span>
                                            <span className="font-bold text-gray-900 text-xs">
                                                {progress[selectedGoal.id]?.toFixed(1) || 0}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                style={{ width: `${progress[selectedGoal.id] || 0}%` }}
                                                className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]"
                                            />
                                        </div>
                                    </div>
                                    
                                    {calculations[selectedGoal.id] && (
                                        <div className="mt-3 pt-3 border-t border-blue-200">
                                            <p className="text-[11px] font-medium text-gray-700 mb-1">Monthly Investment Required</p>
                                            <p className="text-xl font-bold text-emerald-600">
                                                {formatCurrency(calculations[selectedGoal.id].monthly_investment_required)}
                                                <span className="text-[10px] font-normal text-gray-500 ml-1">/month</span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Timestamps - Compact */}
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-[10px] text-gray-500">
                                        <div>
                                            <span className="font-medium">Created:</span> {formatDateTime(selectedGoal.created_at)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Updated:</span> {formatDateTime(selectedGoal.updated_at)}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Compact */}
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => {
                                            setShowGoalDetails(false);
                                            handleEditGoal(selectedGoal);
                                        }}
                                        className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5"
                                    >
                                        <Edit2 size={14} />
                                        Edit Goal
                                    </button>
                                    <button
                                        onClick={() => setShowGoalDetails(false)}
                                        className="flex-1 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Create/Edit Modal */}
                {showGoalModal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center sticky top-0">
                                <div className="flex items-center gap-3">
                                    {editingGoal ? <Edit2 size={24} /> : <Target size={24} />}
                                    <h3 className="text-xl font-bold">
                                        {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => {
                                        setShowGoalModal(false);
                                        resetForm();
                                    }} 
                                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-8 space-y-6">
                                {/* Goal Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Goal Name
                                    </label>
                                    <input
                                        type="text"
                                        value={goalForm.goal_name}
                                        onChange={(e) => setGoalForm({ ...goalForm, goal_name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                        placeholder="e.g., Buy a House, Child Education"
                                    />
                                </div>

                                {/* Target Amount & Years */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Target Amount (₹)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={goalForm.target_amount}
                                            onChange={(e) => setGoalForm({...goalForm, target_amount: Number(e.target.value)})}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1000}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Years to Goal
                                        </label>
                                        <input 
                                            type="number" 
                                            value={goalForm.target_years}
                                            onChange={(e) => setGoalForm({...goalForm, target_years: Number(e.target.value)})}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1}
                                        />
                                    </div>
                                </div>

                                {/* Expected Return & Current Savings */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Expected Return (%)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={goalForm.expected_return}
                                            onChange={(e) => setGoalForm({...goalForm, expected_return: Number(e.target.value)})}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={1}
                                            max={30}
                                            step={0.1}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Current Savings (₹)
                                        </label>
                                        <input 
                                            type="number" 
                                            value={goalForm.current_savings}
                                            onChange={(e) => setGoalForm({...goalForm, current_savings: Number(e.target.value)})}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all"
                                            min={0}
                                        />
                                    </div>
                                </div>

                                {/* Calculation Preview */}
                                {calculating ? (
                                    <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-[#2076C7] animate-spin" />
                                    </div>
                                ) : calculationPreview && (
                                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                                        <h4 className="text-sm font-medium text-gray-900 mb-4">Calculation Preview</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Monthly SIP</p>
                                                <p className="text-lg font-bold text-emerald-600">
                                                    {formatCurrency(calculationPreview.monthly_investment_required)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Future Value</p>
                                                <p className="text-lg font-bold text-blue-600">
                                                    {formatCurrency(calculationPreview.future_value_of_current_savings)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Remaining</p>
                                                <p className="text-lg font-bold text-amber-600">
                                                    {formatCurrency(calculationPreview.remaining_amount)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => {
                                            setShowGoalModal(false);
                                            resetForm();
                                        }}
                                        className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={editingGoal ? handleUpdateGoal : handleCreateGoal}
                                        disabled={loading || !goalForm.goal_name}
                                        className="flex-1 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingGoal ? <Save size={18} /> : <Plus size={18} />}
                                        {editingGoal ? 'Update Goal' : 'Create Goal'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="p-6">
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                    Delete Goal
                                </h3>
                                
                                {/* Message */}
                                <p className="text-gray-500 text-center mb-6">
                                    Are you sure you want to delete this goal? This action cannot be undone.
                                </p>
                                
                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setGoalToDelete(null);
                                        }}
                                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                        disabled={deleting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        disabled={deleting}
                                        className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {deleting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}