'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { DashboardService } from '@/app/services/dashboardService';

// Types
interface DownloadItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx';
  uploadDate: string;
  category: 'payout' | 'brochures' | 'forms';
  month?: string;
  year?: string;
  subCategory?: 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan';
  filePath?: string;
  mainCategory?: string; // Added for the specific download API
}

export default function Downloads() {
  const [activeSection, setActiveSection] = useState<'payout' | 'brochures' | 'forms'>('payout');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'insurance' | 'loan'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan'>('all');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  // New API States
  const [payoutData, setPayoutData] = useState<DownloadItem[]>([]);
  const [isLoadingPayouts, setIsLoadingPayouts] = useState(true);

  const [documents, setDocuments] = useState<DownloadItem[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);

  // Separate state for brochures section 
  const [selectedCategoryBrochures, setSelectedCategoryBrochures] = useState<'all' | 'insurance' | 'loan'>('all');
  const [selectedSubCategoryBrochures, setSelectedSubCategoryBrochures] = useState<'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan'>('all');
  const [isInsuranceOpenBrochures, setIsInsuranceOpenBrochures] = useState(false);
  const [isLoanOpenBrochures, setIsLoanOpenBrochures] = useState(false);

  // Fetch Payouts from API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoadingDocs(true);

        const response = await DashboardService.getDocuments();
        const dataToMap = Array.isArray(response) ? response : (response.data || []);

        const formatted: DownloadItem[] = dataToMap.map((item: any) => ({
          id: item.id?.toString(),
          name: item.payout_grid_name || 'Document',
          type: 'pdf',
          uploadDate: item.created_at
            ? new Date(item.created_at).toLocaleDateString()
            : 'Recent',

          // ✅ FIX 1: use API category
          category: item.main_category,

          subCategory: item.sub_category
            ?.toLowerCase()
            .replace(/\s+/g, '-'),

          mainCategory: item.main_category,

          filePath: item.file_url
        }));

        setDocuments(formatted);
      } catch (error) {
        toast.error('Error fetching documents:');
      } finally {
        setIsLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, []);;

  // Hardcoded Static Data (Original brochures and forms)
  const staticData: DownloadItem[] = [

  ];

  const downloadData = documents;

  // Filter logic (Exactly as original)
  const filteredData = downloadData.filter(item => {
    if (activeSection === 'payout') {
      const monthMatch = selectedMonth === 'all' || item.month === selectedMonth;
      const categoryMatch = selectedCategory === 'all' ||
        (selectedCategory === 'insurance' && (item.subCategory === 'motor-insurance' || item.subCategory === 'life-insurance' || item.subCategory === 'health-insurance')) ||
        (selectedCategory === 'loan' && (item.subCategory === 'home-loan' || item.subCategory === 'business-loan' || item.subCategory === 'lap-loan' || item.subCategory === 'personal-loan'));
      const subCategoryMatch = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
      return item.category === 'payout' && monthMatch && categoryMatch && subCategoryMatch;
    }
    return item.category === activeSection;
  });

  const filteredBrochuresData = downloadData.filter(item => {
    if (item.category === 'brochures') {
      const categoryMatch = selectedCategoryBrochures === 'all' ||
        (selectedCategoryBrochures === 'insurance' && (item.subCategory === 'motor-insurance' || item.subCategory === 'life-insurance' || item.subCategory === 'health-insurance')) ||
        (selectedCategoryBrochures === 'loan' && (item.subCategory === 'home-loan' || item.subCategory === 'business-loan' || item.subCategory === 'lap-loan' || item.subCategory === 'personal-loan'));
      const subCategoryMatch = selectedSubCategoryBrochures === 'all' || item.subCategory === selectedSubCategoryBrochures;
      return categoryMatch && subCategoryMatch;
    }
    return false;
  });

  const filteredFormsData = downloadData.filter(item => item.category === 'forms');

  // Integrated Download Handler
  const handleDownload = async (file: DownloadItem) => {
  try {
    if (!file.filePath) {
      return toast.error('File not available');
    }

    toast.loading('Downloading...', { id: 'dl' });

    const response = await fetch(file.filePath);

    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = file.name || 'download.pdf';

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success('Download Success', { id: 'dl' });
  } catch (error) {
    toast.error('Failed to download file');
    toast.error('Download error', { id: 'dl' });
  }
};

  // UI Helpers (Exactly as original)
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <div className="w-10 h-12 bg-red-500 rounded-lg flex items-center justify-center shrink-0"><span className="text-white font-bold text-xs">PDF</span></div>;
      case 'doc': return <div className="w-10 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0"><span className="text-white font-bold text-xs">DOC</span></div>;
      case 'xlsx': return <div className="w-10 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0"><span className="text-white font-bold text-xs">XLS</span></div>;
      default: return <div className="w-10 h-12 bg-gray-500 rounded-lg flex items-center justify-center shrink-0"><span className="text-white font-bold text-xs">FILE</span></div>;
    }
  };

  const getSubCategoryDisplayName = (subCategory: string) => {
    const names: Record<string, string> = {
      'all': 'All Documents', 'motor-insurance': 'Motor Insurance', 'life-insurance': 'Life Insurance', 'health-insurance': 'Health Insurance',
      'home-loan': 'Home Loan', 'business-loan': 'Business Loan', 'lap-loan': 'LAP Loan', 'personal-loan': 'Personal Loan'
    };
    return names[subCategory] || subCategory;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-700 tracking-tight">Downloads</h1>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm">A centralized repository for all documents essential for your business.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 sm:p-2">
          <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
            {['payout', 'brochures', 'forms'].map((sec) => (
              <button key={sec} onClick={() => setActiveSection(sec as any)}
                className={`flex-1 py-2 sm:py-3 px-3 font-medium rounded-lg transition-all ${activeSection === sec ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-semibold capitalize">{sec === 'payout' ? 'Payout Structure' : sec === 'brochures' ? 'Product Brochures' : 'Application Forms'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 sm:space-y-6">
          {activeSection === 'payout' && (
            <div className="space-y-6">
              {/* Payout Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
                  <button onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); setIsInsuranceOpen(false); setIsLoanOpen(false); }}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all ${selectedCategory === 'all' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                    All Documents
                  </button>
                  {/* Insurance Dropdown */}
                  <div className="relative flex-1">
                    <button onClick={() => { setIsInsuranceOpen(!isInsuranceOpen); setIsLoanOpen(false); }}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-between ${selectedCategory === 'insurance' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span>Insurance</span>
                      <svg className={`w-4 h-4 transform ${isInsuranceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isInsuranceOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        {['motor-insurance', 'life-insurance', 'health-insurance'].map(sub => (
                          <button key={sub} onClick={() => { setSelectedSubCategory(sub as any); setSelectedCategory('insurance'); setIsInsuranceOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 capitalize">{sub.replace('-', ' ')}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Loan Dropdown */}
                  <div className="relative flex-1">
                    <button onClick={() => { setIsLoanOpen(!isLoanOpen); setIsInsuranceOpen(false); }}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-between ${selectedCategory === 'loan' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span>Loan</span>
                      <svg className={`w-4 h-4 transform ${isLoanOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isLoanOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        {['home-loan', 'business-loan', 'lap-loan', 'personal-loan'].map(sub => (
                          <button key={sub} onClick={() => { setSelectedSubCategory(sub as any); setSelectedCategory('loan'); setIsLoanOpen(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 capitalize">{sub.replace('-', ' ')}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payout List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">
                    {isLoadingDocs ? 'Loading documents...' : (selectedCategory === 'all' ? 'All Payout Documents' : getSubCategoryDisplayName(selectedSubCategory))}
                  </h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {isLoadingDocs ? (
                    <div className="p-12 text-center text-slate-400">Fetching from server...</div>
                  ) : filteredData.map((file) => (
                    <div key={file.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          {getFileIcon(file.type)}
                          <div>
                            <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                              <span>Uploaded {file.uploadDate}</span>
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">{file.subCategory?.split('-')[0]}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDownload(file)} className="px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium hover:bg-[#1CADA3]/90 transition-colors flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {!isLoadingPayouts && filteredData.length === 0 && (
                    <div className="p-12 text-center text-slate-500">No payout grids available at the moment.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Brochures and Forms sections exactly as original... */}
          {activeSection === 'brochures' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
                  <button onClick={() => { setSelectedCategoryBrochures('all'); setSelectedSubCategoryBrochures('all'); setIsInsuranceOpenBrochures(false); setIsLoanOpenBrochures(false); }}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all ${selectedCategoryBrochures === 'all' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                    All Brochures
                  </button>
                  <div className="relative flex-1">
                    <button onClick={() => { setIsInsuranceOpenBrochures(!isInsuranceOpenBrochures); setIsLoanOpenBrochures(false); }}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-between ${selectedCategoryBrochures === 'insurance' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span>Insurance</span>
                      <svg className={`w-4 h-4 transform ${isInsuranceOpenBrochures ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isInsuranceOpenBrochures && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 overflow-hidden">
                        {['motor-insurance', 'life-insurance', 'health-insurance'].map(sub => (
                          <button key={sub} onClick={() => { setSelectedSubCategoryBrochures(sub as any); setSelectedCategoryBrochures('insurance'); setIsInsuranceOpenBrochures(false); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 capitalize">{sub.replace('-', ' ')}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-200">
                  {filteredBrochuresData.map((file) => (
                    <div key={file.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          {getFileIcon(file.type)}
                          <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                        </div>
                        <button onClick={() => handleDownload(file)} className="px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'forms' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="divide-y divide-slate-200">
                {filteredFormsData.map((file) => (
                  <div key={file.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                      </div>
                      <button onClick={() => handleDownload(file)} className="px-4 py-2 bg-[#1CADA3] text-white rounded-lg text-sm font-medium">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}