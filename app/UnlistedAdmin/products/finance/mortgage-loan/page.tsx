'use client';

import { useState, useEffect, useRef } from 'react';
import { MortgageLoanService, MortgageLoanPlan } from '../../../../services/mortgageLoanService';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, X, Zap, Loader2, Database, Download, CheckCircle, AlertCircle, RefreshCw, Landmark, Package, Edit3, Trash2, Search } from "lucide-react";
import { toast } from 'react-hot-toast';
const MortgageLoanImportAdmin: React.FC = () => {
    // States for Import
    const [file, setFile] = useState<File | null>(null);
    const [isImporting, setIsImporting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState({ percent: 0, status: 'Waiting...' });
    const [, setLogs] = useState<string[]>([]);
    const [, setImportResult] = useState<{
        processed?: number;
        skipped?: number;
    } | null>(null);

    // States for Plan Management
    const [plans, setPlans] = useState<MortgageLoanPlan[]>([]);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingPlan, setEditingPlan] = useState<MortgageLoanPlan | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsClient(true);
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setIsLoadingPlans(true);
        try {
            const data = await MortgageLoanService.getAllMortgageLoanPlans();
            setPlans(data);
        } catch (err: any) {
            toast.error(`Failed to fetch plans: ${err.message}`);
        } finally {
            setIsLoadingPlans(false);
        }
    };

    // --- IMPORT MORTGAGE LOAN PLANS ---
    const startImport = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        setIsImporting(true);
        setProgress({ percent: 30, status: 'Processing...' });
        toast.loading(`Importing Mortgage Loan plan data...`, { duration: 3000 });
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting Mortgage Loan import of ${file.name}...`]);
        setImportResult(null);

        try {
            const response = await MortgageLoanService.uploadMortgageLoanPlans(file);

            setProgress({ percent: 100, status: 'Completed' });
            setImportResult({
                processed: response.processed,
                skipped: response.skipped
            });
            const successMsg = `✓ Mortgage Loan Plans imported successfully (${response.processed} rows processed, ${response.skipped} skipped)`;
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${successMsg}`]);
            toast.success(successMsg);
            // Refresh list
            fetchPlans();

            setTimeout(() => {
                setFile(null);
                setProgress({ percent: 0, status: 'Waiting...' });
            }, 3000);
        } catch (err: any) {
            const errorMsg = `✗ Import failed: ${err.response?.data?.message || err.message}`;
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${errorMsg}`]);
            setProgress({ percent: 0, status: 'Failed' });
            toast.error(errorMsg);
        } finally {
            setIsImporting(false);
        }
    };

    // --- DELETE PLAN ---
    const handleDelete = async (id: number, name: string) => {
        if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
        try {
            await MortgageLoanService.deleteMortgageLoanPlan(id);
            toast.success(`${name} deleted successfully`);
            setPlans(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            toast.error('Failed to delete plan');
        }
    };

    // --- UPDATE PLAN ---
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPlan) return;
        setIsUpdating(true);
        try {
            await MortgageLoanService.updateMortgageLoanPlan(editingPlan.id, editingPlan);
            toast.success(`${editingPlan.bank_name} updated successfully`);
            setPlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p));
            setEditingPlan(null);
        } catch (err) {
            toast.error('Failed to update plan');
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredPlans = plans.filter(p =>
        p.bank_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isClient) return null;

    return (
        <div className="flex-1 space-y-6 animate-fade-in pb-10 px-4 sm:px-6 text-slate-800">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 text-white shadow-md flex justify-between items-center"
            >
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                            <Landmark className="w-6 h-6" /> Mortgage Loan Portal
                        </h2>
                        <p className="text-sm opacity-90 text-white">Import & manage Mortgage Loan bank plan data</p>
                    </div>
                </div>
            </motion.div>
            {/* react-hot-toast will handle toast rendering globally */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT COLUMN - IMPORT SECTION */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-[#2076C7]" />
                            Import Mortgage Loan Plans
                        </h3>
                    </div>

                    <div className="p-6 space-y-6 text-slate-800">
                        {!file ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-[#1CADA3] transition-all group"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 transition-transform group-hover:text-[#2076C7]">
                                    <FileSpreadsheet className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-700 mb-1">Click to upload</h4>
                                <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
                                <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".xlsx, .xls" hidden />
                            </div>
                        ) : (
                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                        <FileSpreadsheet className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <button onClick={() => setFile(null)} className="p-1.5 hover:bg-emerald-200 rounded-lg transition-colors" disabled={isImporting}>
                                    <X className="w-4 h-4 text-emerald-600" />
                                </button>
                            </div>
                        )}

                        {progress.percent > 0 && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium text-gray-600">{progress.status}</span>
                                    <span className="font-bold text-[#2076C7]">{progress.percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress.percent}%` }} className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={startImport}
                            disabled={!file || isImporting}
                            className="w-full py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black uppercase text-xs tracking-widest rounded-xl disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
                        >
                            {isImporting ? <><Loader2 className="animate-spin w-4 h-4" /> Importing...</> : <><Zap className="w-4 h-4" /> Import Plans</>}
                        </button>
                    </div>
                </motion.div>
                {/* RIGHT COLUMN - DOWNLOAD SAMPLE */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Download className="w-5 h-5 text-emerald-600" />
                            Download Template
                        </h3>
                    </div>

                    <div className="p-6">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 text-center text-slate-800">
                            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                <Package className="w-10 h-10" />
                            </div>

                            <h4 className="text-xl font-bold text-gray-800 mb-2">Mortgage Loan Template</h4>
                            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                                Download the sample Excel template with correct headers (Bank Name, Category, Interest Rate, Processing Fee, Benefits, Color).
                            </p>

                            <button
                                disabled={isExporting}
                                onClick={async () => {
                                    setIsExporting(true);
                                    try {
                                        const headers = ['Bank Name', 'Category', 'Interest Rate', 'Processing Fee', 'Benefits', 'Color'];
                                        const sampleRows = [
                                            ['LIC Housing Finance', 'Property Purchase', '8.50% p.a.', '₹5,000 + GST', 'Low EMI, Long tenure, Easy documentation', 'blue'],
                                            ['ICICI Bank', 'Loan Against Property', '9.20% p.a.', '1% of loan amount', 'High loan value, Doorstep service', 'blue']
                                        ];
                                        const csvRows = [headers.join(',')];
                                        sampleRows.forEach(row => csvRows.push(row.map(cell => `"${cell}"`).join(',')));
                                        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', `mortgage_loan_template.csv`);
                                        document.body.appendChild(link);
                                        link.click();
                                        link.remove();
                                        window.URL.revokeObjectURL(url);
                                    } catch (err: any) {
                                        toast.error(`✗ Export failed: ${err.message}`);
                                    } finally {
                                        setIsExporting(false);
                                    }
                                }}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-50"
                            >
                                <Download className="w-4 h-4" /> Download Template
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* EXISTING PLANS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col"
            >
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#2076C7]" />
                        Existing Bank Plans
                        <span className="bg-blue-100 text-[#2076C7] text-[10px] px-2 py-0.5 rounded-full ml-1">
                            {plans.length}
                        </span>
                    </h3>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search banks or categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-100 focus:border-[#2076C7] transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto text-slate-800">
                    {isLoadingPlans ? (
                        <div className="flex flex-col items-center justify-center p-20 gap-4 text-gray-400">
                            <Loader2 className="w-10 h-10 animate-spin" />
                            <p className="text-sm font-medium">Fetching plan data...</p>
                        </div>
                    ) : filteredPlans.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-20 text-gray-400 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Database className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm font-bold text-gray-600 mb-1">No plans found</p>
                            <p className="text-xs text-slate-500">Import a new file to get started.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold tracking-wider border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 whitespace-nowrap">Bank Name</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Category</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Interest Rate</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Processing Fee</th>
                                    <th className="px-4 py-3 whitespace-nowrap text-center sticky right-0 bg-gray-50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredPlans.map((plan) => (
                                    <tr key={plan.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                                    <Landmark className="w-4 h-4 text-blue-500" />
                                                </div>
                                                <span className="font-bold text-gray-800 text-xs">{plan.bank_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{plan.category}</span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-blue-600">
                                            {plan.interest_rate}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">
                                            {plan.processing_fee || '—'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-center sticky right-0 bg-white border-l border-gray-100">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => setEditingPlan({ ...plan })}
                                                    className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-all"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(plan.id, plan.bank_name)}
                                                    className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-500 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {editingPlan && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingPlan(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white shrink-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white">Edit Bank Plan</h3>
                                        <p className="text-xs opacity-80 text-white">Modify bank rates and features</p>
                                    </div>
                                    <button onClick={() => setEditingPlan(null)} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white">
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto p-8 space-y-6 text-slate-800">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4 sm:col-span-2">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Basic Information</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 ml-1">Bank Name</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.bank_name || ''}
                                                    onChange={e => setEditingPlan({ ...editingPlan, bank_name: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 ml-1">Category</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.category || ''}
                                                    onChange={e => setEditingPlan({ ...editingPlan, category: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Rate & Fees</h4>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 ml-1">Interest Rate</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.interest_rate || ''}
                                                    onChange={e => setEditingPlan({ ...editingPlan, interest_rate: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 ml-1">Processing Fee</label>
                                                <input
                                                    type="text"
                                                    value={editingPlan.processing_fee || ''}
                                                    onChange={e => setEditingPlan({ ...editingPlan, processing_fee: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Status & UI</h4>
                                        <div className="space-y-4 text-slate-800">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-gray-500 ml-1">Theme Color</label>
                                                <select
                                                    value={editingPlan.color}
                                                    onChange={e => setEditingPlan({ ...editingPlan, color: e.target.value })}
                                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                                                >
                                                    <option value="blue">Blue</option>
                                                    <option value="peacock-green">Green</option>
                                                    <option value="gold">Gold</option>
                                                    <option value="amber">Amber</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 pt-4">
                                                <input
                                                    type="checkbox"
                                                    id="is_active"
                                                    checked={editingPlan.is_active}
                                                    onChange={e => setEditingPlan({ ...editingPlan, is_active: e.target.checked })}
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is Active</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:col-span-2">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Benefits (Comma Separated)</h4>
                                        <textarea
                                            rows={3}
                                            value={editingPlan.benefits?.join(', ') || ''}
                                            onChange={e => setEditingPlan({ ...editingPlan, benefits: e.target.value.split(',').map(b => b.trim()) })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 shrink-0">
                                    <button type="button" onClick={() => setEditingPlan(null)} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl">Cancel</button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-[2] py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                                    >
                                        {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Database className="w-4 h-4 text-white" />}
                                        <span className="text-white">Update Plan</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MortgageLoanImportAdmin;
