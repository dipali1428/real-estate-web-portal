'use client';

import { AdminService } from '@/app/services/adminService'; 
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
    FileText, 
    UploadCloud, 
    Trash2, 
    FilePlus, 
    Layers, 
    Briefcase,
    Search,
    FileIcon,
    AlertCircle
} from 'lucide-react';

// Interfaces (Unchanged)
interface DownloadItem {
    id: string;
    name: string;
    type: 'pdf' | 'doc' | 'xlsx';
    category: 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate';
    docType: 'payout' | 'brochures' | 'forms';
    subCategory: string;
    month?: string;
    year?: string;
    filePath?: string;
}

export default function AdminDownloads() {
    const [files, setFiles] = useState<DownloadItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        category: 'loan' as 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate',
        docType: 'payout' as 'payout' | 'brochures' | 'forms',
        subCategory: 'Home Loan',
        year: '2026',
        file: null as File | null,
    });

    const subCategoryMap: Record<string, string[]> = {
        loan: ['Home Loan', 'Personal Loan', 'Business Loan', 'Mortgage Loan', 'SME Loan', 'Education Loan', 'Vehicle Loan', 'Loan Against Securities', 'Credit cards'],
        insurance: ['Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance', 'Fire Insurance', 'Cattle Insurance', 'Marine Insurance', 'Corporate Insurance', 'Loan Protector', 'Pet Insurance'],
        investments: ['PMS', 'AIF', 'Fixed Deposit', 'Bonds', 'NCD', 'NPS'],
        mutualfunds: ['Mutual Funds'],
        realestate: ['Real Estate']
    };

    useEffect(() => {
        fetchDocuments();
    }, []); 

    const fetchDocuments = async () => {
        try {
            const response = await AdminService.getPayoutGrids();
            const data = Array.isArray(response) ? response : (response.data || []);
            const formattedData = data.map((item: any) => ({
                id: item.id,
                name: item.payout_grid_name || item.name,
                type: item.filePath?.split('.').pop() || 'pdf',
                category: item.category,
                docType: item.main_category || item.docType,
                subCategory: item.sub_category,
                filePath: item.filePath
            }));
            setFiles(formattedData);
        } catch (error) {
            toast.error("Failed to load documents");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const newCategory = value as any;
            setFormData(prev => ({ 
                ...prev, 
                category: newCategory, 
                subCategory: subCategoryMap[newCategory]?.[0] || '' 
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                file: e.target.files![0],
                name: e.target.files![0].name
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.file) return toast.error("Please select a file");
        setIsUploading(true);
        try {
            const response = await AdminService.uploadPayoutGrid({
                payoutGridName: formData.name,
                category: formData.category,
                mainCategory: formData.docType,
                subCategory: formData.subCategory,
                file: formData.file,
            });
            const uploadedFile = response.data || response; 
            const newFile: DownloadItem = {
                id: uploadedFile.id || Math.random().toString(36).substr(2, 9),
                name: formData.name,
                type: formData.file.name.split('.').pop() as any || 'pdf',
                category: formData.category,
                docType: formData.docType,
                subCategory: formData.subCategory,
                filePath: uploadedFile.filePath || '#',
            };
            setFiles([newFile, ...files]);
            setFormData({ ...formData, file: null, name: '' });
            toast.success("File uploaded successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to upload document");
        } finally {
            setIsUploading(false);
        }
    };

    const deleteFile = async (id: string) => {
        if (confirm("Are you sure you want to delete this file?")) {
            try {
                await AdminService.deletePayoutGrid(id);
                setFiles(files.filter(f => f.id !== id));
                toast.success("Deleted successfully");
            } catch (error) {
                toast.error("Failed to delete file");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 text-slate-900 font-sans">
            <Toaster position="top-right" />
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Document Management</h1>
                        <p className="text-slate-500 mt-1">Upload and manage portal resources for agents and partners.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-md">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Files</p>
                                <p className="text-lg font-bold leading-none">{files.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                        <FilePlus className="w-5 h-5 text-[#1CADA3]" />
                        <h2 className="font-semibold text-slate-800">Upload New Document</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* File Drop Zone */}
                            <div className="md:col-span-3">
                                <label className="relative group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#1CADA3] hover:bg-teal-50/30 transition-all cursor-pointer overflow-hidden">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className={`w-8 h-8 mb-2 ${formData.file ? 'text-[#1CADA3]' : 'text-slate-400'}`} />
                                        <p className="text-sm text-slate-600">
                                            {formData.file ? (
                                                <span className="font-semibold text-[#1CADA3]">{formData.file.name}</span>
                                            ) : (
                                                <>
                                                    <span className="font-semibold text-slate-800">Click to upload</span> or drag and drop
                                                </>
                                            )}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">PDF, DOC, XLSX up to 10MB</p>
                                    </div>
                                    <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.xlsx" />
                                </label>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Display Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter document title..."
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] outline-none transition-all text-sm"
                                />
                            </div>

                            {/* Doc Type Dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 text-nowrap">Document Type</label>
                                <div className="relative">
                                    <select
                                        name="docType"
                                        value={formData.docType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg appearance-none focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] outline-none transition-all text-sm"
                                    >
                                        <option value="payout">Payout Structure</option>
                                        <option value="brochures">Product Brochure</option>
                                        <option value="forms">Application Form</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-[10px]">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {/* Business Category Dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Business Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] outline-none transition-all text-sm"
                                >
                                    <option value="loan">Loan</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="investments">Investments</option>
                                    <option value="mutualfunds">Mutual Funds</option>
                                    <option value="realestate">Real Estate</option>
                                </select>
                            </div>

                            {/* Sub Category Dropdown */}
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Specific Product (Sub-Category)</label>
                                <select
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1CADA3]/20 focus:border-[#1CADA3] outline-none transition-all text-sm"
                                >
                                    {subCategoryMap[formData.category]?.map((sub) => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className={`w-full h-[42px] flex items-center justify-center gap-2 bg-[#1CADA3] text-white font-bold rounded-lg hover:bg-[#168d85] active:scale-[0.98] transition-all shadow-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-4 h-4" />
                                            Upload Document
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-slate-400" />
                            <h2 className="font-semibold text-slate-800">Recent Uploads</h2>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#1CADA3] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search files..." 
                                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-[#1CADA3]/10 focus:border-[#1CADA3] outline-none w-full sm:w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto scrollbar-x-thin">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-500 text-[11px] uppercase font-bold tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">Document Details</th>
                                    <th className="px-6 py-4 text-center">Type</th>
                                    <th className="px-6 py-4">Categories</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {files.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center opacity-40">
                                                <AlertCircle className="w-10 h-10 mb-2" />
                                                <p className="italic text-slate-500">No documents found in the database.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    files.map((file) => (
                                        <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                        <FileIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 leading-none mb-1">{file.name}</p>
                                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                                            <span className="uppercase">{file.type}</span> • {new Date().toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                                                    ${file.docType === 'payout' ? 'bg-amber-100 text-amber-700' : 
                                                      file.docType === 'brochures' ? 'bg-blue-100 text-blue-700' : 
                                                      'bg-purple-100 text-purple-700'}`}>
                                                    {file.docType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[12px] font-bold text-slate-800">
                                                        {file.subCategory}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => deleteFile(file.id)} 
                                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete document"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Footer / Pagination Placeholder */}
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                        <p className="text-[11px] text-slate-400 text-center uppercase tracking-widest font-medium italic">
                            Authorized Access Only • Internal Portal Admin
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}