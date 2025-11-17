'use client';

import { useState } from 'react';

// Types
interface DownloadItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx';
  size: string;
  uploadDate: string;
  category: 'payout' | 'brochures' | 'forms'; // Changed to match activeSection
  month?: string;
  year?: string;
}

export default function Downloads() {
  const [activeSection, setActiveSection] = useState<'payout' | 'brochures' | 'forms'>('payout');
  const [selectedMonth, setSelectedMonth] = useState<string>('november-2025');
  
  // Sample data for downloads
  const downloadData: DownloadItem[] = [
    // Payout Structure Documents
    {
      id: '1',
      name: 'DSA Commission Structure - 2025.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025'
    },
    {
      id: '2',
      name: 'Home Loan Festive Flights Payout.pdf',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2025-11-10',
      category: 'payout',
      month: 'november-2025',
      year: '2025'
    },
    {
      id: '3',
      name: 'Q4 Bonus Structure.xlsx',
      type: 'xlsx',
      size: '3.1 MB',
      uploadDate: '2025-10-28',
      category: 'payout',
      month: 'october-2025',
      year: '2025'
    },
    {
      id: '4',
      name: 'September Commission Report.pdf',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2025-09-30',
      category: 'payout',
      month: 'september-2025',
      year: '2025'
    },
    
    // Product Brochures
    {
      id: '5',
      name: 'Life Insurance Product Catalog.pdf',
      type: 'pdf',
      size: '4.2 MB',
      uploadDate: '2025-11-01',
      category: 'brochures'
    },
    {
      id: '6',
      name: 'Comprehensive Health Insurance Guide.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures'
    },
    {
      id: '7',
      name: 'Motor Insurance Brochure.pdf',
      type: 'pdf',
      size: '2.9 MB',
      uploadDate: '2025-10-10',
      category: 'brochures'
    },
    {
      id: '8',
      name: 'Term Life Insurance Overview.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2025-09-20',
      category: 'brochures'
    },
    
    // Application Forms
    {
      id: '9',
      name: 'New Client Application Form.pdf',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2025-11-05',
      category: 'forms'
    },
    {
      id: '10',
      name: 'Policy Renewal Form.docx',
      type: 'doc',
      size: '0.8 MB',
      uploadDate: '2025-10-25',
      category: 'forms'
    },
    {
      id: '11',
      name: 'Claim Intimation Form.pdf',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2025-10-12',
      category: 'forms'
    }
  ];

  // Filter data based on active section and selected month
  const filteredData = downloadData.filter(item => {
    if (activeSection === 'payout') {
      return item.category === 'payout' && item.month === selectedMonth;
    }
    return item.category === activeSection;
  });

  // Generate months for dropdown (from November 2025 backwards)
  const months = [
    { value: 'november-2025', label: 'November 2025' },
    { value: 'october-2025', label: 'October 2025' },
    { value: 'september-2025', label: 'September 2025' },
    { value: 'august-2025', label: 'August 2025' },
    { value: 'july-2025', label: 'July 2025' },
    { value: 'june-2025', label: 'June 2025' },
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

  // Handle file download
  const handleDownload = (file: DownloadItem) => {
    // In a real application, this would download the actual file
    // For demo purposes, we'll create a mock download
    const blob = new Blob(['Mock file content for ' + file.name], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to your server
      alert(`File "${file.name}" uploaded successfully!`);
      // Reset the input
      event.target.value = '';
    }
  };

  // Calculate stats for visualization
  const payoutStats = {
    totalFiles: downloadData.filter(item => item.category === 'payout').length,
    totalSize: '15.2 MB',
    recentUpload: '2 days ago'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
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
              <div className="flex items-center justify-center space-x-2">
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
              <div className="flex items-center justify-center space-x-2">
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
              <div className="flex items-center justify-center space-x-2">
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
                      <p className="text-3xl font-bold text-slate-900 mt-2">{payoutStats.totalFiles}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Size</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{payoutStats.totalSize}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💾</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Last Updated</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{payoutStats.recentUpload}</p>
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
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm font-medium">
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

              {/* Files List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Documents for {months.find(m => m.value === selectedMonth)?.label}
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
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
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
                        No payout documents available for {months.find(m => m.value === selectedMonth)?.label}.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Product Brochures Section */}
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
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
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

          {/* Application Forms Section */}
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
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📥</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-1">Easy Access</h3>
                <p className="text-blue-800 text-sm">
                  All your business documents in one place, organized and ready to download.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">Always Updated</h3>
                <p className="text-green-800 text-sm">
                  Latest versions of all documents with regular updates and new additions.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-1">Mobile Friendly</h3>
                <p className="text-purple-800 text-sm">
                  Access and download documents on the go from any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}