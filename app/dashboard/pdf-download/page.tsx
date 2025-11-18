'use client';

import { useState } from 'react';

// Types
interface DownloadItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx';
  size: string;
  uploadDate: string;
  category: 'payout' | 'brochures' | 'forms';
  month?: string;
  year?: string;
  subCategory?: 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan';
  filePath?: string;
}

export default function Downloads() {
  const [activeSection, setActiveSection] = useState<'payout' | 'brochures' | 'forms'>('payout');
  const [selectedMonth, setSelectedMonth] = useState<string>('november-2025');
  const [selectedCategory, setSelectedCategory] = useState<'insurance' | 'loan'>('insurance');
  const [selectedSubCategory, setSelectedSubCategory] = useState<'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan'>('motor-insurance');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  // Sample data for downloads with actual file paths
  const downloadData: DownloadItem[] = [
    {
      id: '1',
      name: 'Motor Insurance IA Payout OCT with logo.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'motor-insurance',
      filePath: '/pdfs/motorinsurancepdf/Motor Insurance IA Payout OCT with logo.pdf'
    },
    
    // Insurance - Life Insurance
    {
      id: '2',
      name: 'ABSLI FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/ABSLI FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '3',
      name: 'AXIS MAX FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/AXIS MAX FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '4',
      name: 'BAJAJ LIFE FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/BAJAJ LIFE FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '5',
      name: 'DIGIT LIFE FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/DIGIT LIFE FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '6',
      name: 'HDFC LIFE -GRID FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/HDFC LIFE -GRID FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '7',
      name: 'ICICI PRUDENTIAL FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/ICICI PRUDENTIAL FESTIVE FLIGHTS CONTEST.pdf'
    },
    {
      id: '8',
      name: 'TATA AIA FESTIVE FLIGHTS CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/TATA AIA FESTIVE FLIGHTS CONTEST.pdf'
    },
    
    // Insurance - Health Insurance
    {
      id: '9',
      name: 'HEALTH FINAL PAYOUT FESTIVE FLIGHTS 2025.pdf',
      type: 'pdf',
      size: '2.8 MB',
      uploadDate: '2025-11-01',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'health-insurance',
      filePath: '/pdfs/healthinsurancepdf/HEALTH FINAL PAYOUT FESTIVE FLIGHTS 2025.pdf'
    },

    // Loan - Home Loan
    {
      id: '10',
      name: 'IA Festive Flights Home Loan Payout.pdf',
      type: 'pdf',
      size: '2.2 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'home-loan',
      filePath: '/pdfs/loans/IA Festive Flights Home Loan Payout.pdf'
    },
    {
      id: '11',
      name: 'Home Loan Payout Rates 2025.xlsx',
      type: 'xlsx',
      size: '1.7 MB',
      uploadDate: '2025-10-25',
      category: 'payout',
      month: 'october-2025',
      year: '2025',
      subCategory: 'home-loan',
      filePath: '/pdfs/homeloanpdf/Home Loan Payout Rates 2025.xlsx'
    },

    // Loan - Business Loan
    {
      id: '12',
      name: 'IA Festive Flights Business Loan Payout.pdf',
      type: 'pdf',
      size: '2.5 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'business-loan',
      filePath: '/pdfs/loans/IA Festive Flights Business Loan Payout.pdf'
    },

    // Loan - LAP Loan
    {
      id: '13',
      name: 'IA Festive Flights LAP Loan Payout.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'lap-loan',
      filePath: '/pdfs/loans/IA Festive Flights LAP Loan Payout.pdf'
    },

    // Loan - Personal Loan
    {
      id: '14',
      name: 'IA Festive Flights Personal Loan Payout.pdf',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'personal-loan',
      filePath: '/pdfs/loans/IA Festive Flights Personal Loan Payout.pdf'
    },
    
    // Product Brochures
    {
      id: '15',
      name: 'Life Insurance Product Catalog.pdf',
      type: 'pdf',
      size: '4.2 MB',
      uploadDate: '2025-11-01',
      category: 'brochures',
      filePath: '/pdfs/brochures/Life Insurance Product Catalog.pdf'
    },
    {
      id: '16',
      name: 'Comprehensive Health Insurance Guide.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      filePath: '/pdfs/brochures/Comprehensive Health Insurance Guide.pdf'
    },
    
    // Application Forms
    {
      id: '17',
      name: 'New Client Application Form.pdf',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2025-11-05',
      category: 'forms',
      filePath: '/pdfs/forms/New Client Application Form.pdf'
    },
    {
      id: '18',
      name: 'Policy Renewal Form.docx',
      type: 'doc',
      size: '0.8 MB',
      uploadDate: '2025-10-25',
      category: 'forms',
      filePath: '/pdfs/forms/Policy Renewal Form.docx'
    }
  ];

  // Filter data based on active section and selected month
  const filteredData = downloadData.filter(item => {
    if (activeSection === 'payout') {
      return item.category === 'payout' && 
             item.month === selectedMonth && 
             item.subCategory === selectedSubCategory;
    }
    return item.category === activeSection;
  });

  // Generate months for dropdown
  const months = [
    { value: 'november-2025', label: 'November 2025' },
    { value: 'october-2025', label: 'October 2025' },
    { value: 'september-2025', label: 'September 2025' },
    { value: 'august-2025', label: 'August 2025' },
  ];

  // File type icons
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="w-10 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">PDF</span>
          </div>
        );
      case 'doc':
        return (
          <div className="w-10 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">DOC</span>
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-10 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">XLS</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">FILE</span>
          </div>
        );
    }
  };

  // Handle actual file download
  const handleDownload = async (file: DownloadItem) => {
    try {
      if (!file.filePath) {
        alert('File path not available');
        return;
      }

      // Create a temporary link for download
      const link = document.createElement('a');
      link.href = file.filePath;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  // Handle file upload (for admin functionality)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload to your server
      // For demo, we'll just show a success message
      alert(`File "${file.name}" uploaded successfully!`);
      event.target.value = '';
    }
  };

  // Handle insurance dropdown toggle
  const handleInsuranceToggle = () => {
    setIsInsuranceOpen(!isInsuranceOpen);
    setIsLoanOpen(false);
  };

  // Handle loan dropdown toggle
  const handleLoanToggle = () => {
    setIsLoanOpen(!isLoanOpen);
    setIsInsuranceOpen(false);
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory: 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan') => {
    setSelectedSubCategory(subCategory);
    if (subCategory === 'home-loan' || subCategory === 'business-loan' || subCategory === 'lap-loan' || subCategory === 'personal-loan') {
      setSelectedCategory('loan');
    } else {
      setSelectedCategory('insurance');
    }
    setIsInsuranceOpen(false);
    setIsLoanOpen(false);
  };

  // Calculate stats for visualization
  const payoutStats = {
    totalFiles: downloadData.filter(item => item.category === 'payout' && item.subCategory === selectedSubCategory).length,
    totalSize: '15.2 MB',
    recentUpload: '2 days ago'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-700 tracking-tight">
              Downloads
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              A centralized repository for all documents essential for your business.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveSection('payout')}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'payout'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center font-semibold  justify-center space-x-2">
                <span>💰</span>
                <span>Payout Structure</span>
              </div>
            </button>
            <button
              onClick={() => setActiveSection('brochures')}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'brochures'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center font-semibold  justify-center space-x-2">
                <span>📄</span>
                <span>Product Brochures</span>
              </div>
            </button>
            <button
              onClick={() => setActiveSection('forms')}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeSection === 'forms'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center font-semibold justify-center space-x-2">
                <span>📋</span>
                <span>Application Forms</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          
          {/* Payout Structure Section */}
          {activeSection === 'payout' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Files</p>
                      <p className="text-3xl font-bold text-slate-700 mt-2">{payoutStats.totalFiles}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Last Updated</p>
                      <p className="text-3xl font-bold text-slate-700 mt-2">{payoutStats.recentUpload}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🕒</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Month Selector and Upload */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-slate-700">Select Month:</label>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Upload Button */}
                <label className="inline-flex items-center px-4 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3] transition-colors duration-200 cursor-pointer text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Document
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Category Navigation Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <div className="flex space-x-1">
                  {/* Insurance Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleInsuranceToggle}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === 'insurance'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>🛡️</span>
                        <span>Insurance</span>
                      </div>
                      <svg 
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          isInsuranceOpen ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Insurance Dropdown Menu */}
                    {isInsuranceOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelect('motor-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'motor-insurance' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>🚗</span>
                          <span>Motor Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('life-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'life-insurance' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>👨‍👩‍👧‍👦</span>
                          <span>Life Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('health-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'health-insurance' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>🏥</span>
                          <span>Health Insurance</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Loan Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleLoanToggle}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedCategory === 'loan'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>💰</span>
                        <span>Loan</span>
                      </div>
                      <svg 
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          isLoanOpen ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Loan Dropdown Menu */}
                    {isLoanOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelect('home-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'home-loan' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>🏠</span>
                          <span>Home Loan</span>
                        </button>

                        <button
                          onClick={() => handleSubCategorySelect('business-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'business-loan' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>💼</span>
                          <span>Business Loan</span>
                        </button>

                         <button
                          onClick={() => handleSubCategorySelect('lap-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'lap-loan' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>🏘️</span>
                          <span>LAP Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('personal-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                            selectedSubCategory === 'personal-loan' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>👤</span>
                          <span>Personal Loan</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Files List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {selectedCategory === 'insurance' ? 'Insurance' : 'Loan'} - {' '}
                    {selectedSubCategory === 'motor-insurance' && '🚗 Motor Insurance'}
                    {selectedSubCategory === 'life-insurance' && '👨‍👩‍👧‍👦 Life Insurance'}
                    {selectedSubCategory === 'health-insurance' && '🏥 Health Insurance'}
                    {selectedSubCategory === 'home-loan' && '🏠 Home Loan'}
                    {selectedSubCategory === 'business-loan' && '💼 Business Loan'}
                    {selectedSubCategory === 'lap-loan' && '🏘️LAP Loan'}
                    {selectedSubCategory === 'personal-loan' && '👤 Personal Loan'}
                    {' '}Documents for {months.find(m => m.value === selectedMonth)?.label}
                  </h3>
                </div>
                <div className="divide-y divide-slate-200">
                  {filteredData.map((file) => (
                    <div key={file.id} className="p-6 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getFileIcon(file.type)}
                          <div>
                            <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>Uploaded {file.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3] transition-colors duration-200 text-sm font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredData.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📁</span>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
                      <p className="text-slate-600 text-sm">
                        No {selectedSubCategory?.replace('-', ' ')} documents available for {months.find(m => m.value === selectedMonth)?.label}.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other sections remain the same */}
          {activeSection === 'brochures' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Product Brochures</h3>
                  <p className="text-slate-600 text-sm mt-1">Marketing materials and product information</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {downloadData
                    .filter(file => file.category === 'brochures')
                    .map((file) => (
                      <div key={file.id} className="p-6 hover:bg-slate-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getFileIcon(file.type)}
                            <div>
                              <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                                <span>{file.size}</span>
                                <span>•</span>
                                <span>Uploaded {file.uploadDate}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(file)}
                            className="flex items-center space-x-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3] transition-colors duration-200 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'forms' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Application Forms</h3>
                  <p className="text-slate-600 text-sm mt-1">Forms for client onboarding and policy management</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {downloadData
                    .filter(file => file.category === 'forms')
                    .map((file) => (
                      <div key={file.id} className="p-6 hover:bg-slate-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getFileIcon(file.type)}
                            <div>
                              <h4 className="text-sm font-medium text-slate-900">{file.name}</h4>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                                <span>{file.size}</span>
                                <span>•</span>
                                <span>Uploaded {file.uploadDate}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(file)}
                            className="flex items-center space-x-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3] transition-colors duration-200 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}