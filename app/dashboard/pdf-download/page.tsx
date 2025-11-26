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
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'insurance' | 'loan'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan'>('all');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  // Separate state for brochures section 
  const [selectedCategoryBrochures, setSelectedCategoryBrochures] = useState<'all' | 'insurance' | 'loan'>('all');
  const [selectedSubCategoryBrochures, setSelectedSubCategoryBrochures] = useState<'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan'>('all');
  const [isInsuranceOpenBrochures, setIsInsuranceOpenBrochures] = useState(false);
  const [isLoanOpenBrochures, setIsLoanOpenBrochures] = useState(false);

  // Sample data for downloads with actual file paths
  const downloadData: DownloadItem[] = [
    {
      id: '1',
      name: 'Motor_Insurance_IA_Payout_OCT.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'motor-insurance',
      filePath: '/pdfs/motorinsurancepdf/Motor_Insurance_IA_Payout_OCT.pdf'
    },

    // Insurance - Life Insurance
    {
      id: '2',
      name: 'ABSLI_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/ABSLI_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '3',
      name: 'AXIS_MAX_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/AXIS_MAX_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '4',
      name: 'BAJAJ_LIFE_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/BAJAJ_LIFE_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '5',
      name: 'DIGIT_LIFE_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/DIGIT_LIFE_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '6',
      name: 'HDFC_LIFE_GRID_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/HDFC_LIFE_GRID_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '7',
      name: 'ICICI_PRUDENTIAL_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/ICICI_PRUDENTIAL_FESTIVE_FLIGHTS_CONTEST.pdf'
    },
    {
      id: '8',
      name: 'TATA_AIA_FESTIVE_FLIGHTS_CONTEST.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-15',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'life-insurance',
      filePath: '/pdfs/lifeinsurancepdf/TATA_AIA_FESTIVE_FLIGHTS_CONTEST.pdf'
    },

    // Insurance - Health Insurance
    {
      id: '9',
      name: 'HEALTH_FINAL_PAYOUT_FESTIVE_FLIGHTS_2025.pdf',
      type: 'pdf',
      size: '2.8 MB',
      uploadDate: '2025-11-01',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'health-insurance',
      filePath: '/pdfs/healthinsurancepdf/HEALTH_FINAL_PAYOUT_FESTIVE_FLIGHTS_2025.pdf'
    },

    // Loan - Home Loan
    {
      id: '10',
      name: 'IA_Festive_Flights_Home_Loan_Payout.pdf',
      type: 'pdf',
      size: '2.2 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'home-loan',
      filePath: '/pdfs/loans/IA_Festive_Flights_Home_Loan_Payout.pdf'
    },

    // Loan - Business Loan
    {
      id: '11',
      name: 'IA_Festive_Flights_Business_Loan_Payout.pdf',
      type: 'xlsx',
      size: '1.7 MB',
      uploadDate: '2025-10-25',
      category: 'payout',
      month: 'october-2025',
      year: '2025',
      subCategory: 'business-loan',
      filePath: '/pdfs/loans/IA_Festive_Flights_Business_Loan_Payout.pdf'
    },

    // Loan - LAP Loan
    {
      id: '12',
      name: 'IA_Festive_Flights_LAP_Loan_Payout.pdf',
      type: 'xlsx',
      size: '1.7 MB',
      uploadDate: '2025-10-25',
      category: 'payout',
      month: 'october-2025',
      year: '2025',
      subCategory: 'lap-loan',
      filePath: '/pdfs/loans/IA_Festive_Flights_LAP_Loan_Payout.pdf'
    },

    // Loan - Personal Loan
    {
      id: '14',
      name: 'IA_Festive_Flights_Personal_Loan_Payout.pdf',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2025-11-05',
      category: 'payout',
      month: 'november-2025',
      year: '2025',
      subCategory: 'personal-loan',
      filePath: '/pdfs/loans/IA_Festive_Flights_Personal_Loan_Payout.pdf'
    },

    // Product Brochures
    {
      id: '15',
      name: 'HDFC_Life_Sanchay_Plus_V24_.pdf',
      type: 'pdf',
      size: '4.2 MB',
      uploadDate: '2025-11-01',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/HDFC_Life_Sanchay_Plus_V24_.pdf'
    },
    {
      id: '16',
      name: 'HDFC_Life_Click.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/HDFC_Life_Click.pdf'
    },
    {
      id: '17',
      name: 'Bajaj-Allianz-Term-Insurance-Brochure_.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/Bajaj-Allianz-Term-Insurance-Brochure_.pdf'
    },
    {
      id: '18',
      name: 'Bajaj_Etouch_Brochure.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/Bajaj_Etouch_Brochure.pdf'
    },
    {
      id: '19',
      name: 'ACE_Variants_One.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/ACE_Variants_One.pdf'
    },
    {
      id: '20',
      name: 'HDFC_Life-_Systematic_Pension_Plan.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'life-insurance',
      filePath: '/pdfs/productbroucher/HDFC_Life-_Systematic_Pension_Plan.pdf'
    },
    {
      id: '21',
      name: 'Health_insurance_Medicare_Select_One_Pager.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/health/Health_insurance_Medicare_Select_One_Pager.pdf'
    },
    {
      id: '22',
      name: 'Health_Insurance_Creative_Brief_MediCare_Select_Launch.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/health/Health_Insurance_Creative_Brief_MediCare_Select_Launch.pdf'
    },
    {
      id: '23',
      name: 'Elevate_One_Page.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/health/Elevate_One_Page.pdf'
    },
    {
      id: '24',
      name: 'Broc_New_Elevate.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/Broc_New_Elevate.pdf'
    },
    {
      id: '25',
      name: 'Fabing_One_Pager_MAX_Sept2023.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/Fabing_One_Pager_MAX_Sept2023.pdf'
    },
    {
      id: '26',
      name: 'Star_Flexi_One Pager_Preferred_R10.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/Star_Flexi_One_Pager_Preferred_R10.pdf'
    },
    {
      id: '27',
      name: 'One_pager_Super_Star_Classic_R10.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/One_pager_Super_Star_Classic_R10.pdf'
    },
    {
      id: '28',
      name: 'Star_Health_Assure_One_pager_Version_1.0.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/Star_Health_Assure_One_pager_Version_1.0.pdf'
    },
    {
      id: '29',
      name: 'Star_Women_Care_One_Pager_version_1.0.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/Star_Women_Care_One_Pager_version_1.0.pdf'
    },
    {
      id: '30',
      name: 'SBI_General_Health_Alpha_Leaflet_Alpha_Select_Alpha_Ultimate.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/SBI_General_Health_Alpha_Leaflet_Alpha_Select_Alpha_Ultimate.pdf'
    },
    {
      id: '31',
      name: 'SBI_General_Health_Alpha_Brochure.pdf',
      type: 'pdf',
      size: '3.8 MB',
      uploadDate: '2025-10-15',
      category: 'brochures',
      subCategory: 'health-insurance',
      filePath: '/pdfs/productbroucher/SBI_General_Health_Alpha_Brochure.pdf'
    },
    // Application Forms
    {
      id: '32',
      name: 'New Client Application Form.pdf',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2025-11-05',
      category: 'forms',
      filePath: '/pdfs/forms/New_Client_Application_Form.pdf'
    },
    {
      id: '33',
      name: 'Policy Renewal Form.docx',
      type: 'doc',
      size: '0.8 MB',
      uploadDate: '2025-10-25',
      category: 'forms',
      filePath: '/pdfs/forms/Policy_Renewal_Form.docx'
    }
  ];

  // Filter data based on active section and selected filters
  const filteredData = downloadData.filter(item => {
    if (activeSection === 'payout') {
      const monthMatch = selectedMonth === 'all' || item.month === selectedMonth;
      const categoryMatch = selectedCategory === 'all' ||
        (selectedCategory === 'insurance' &&
          (item.subCategory === 'motor-insurance' || item.subCategory === 'life-insurance' || item.subCategory === 'health-insurance')) ||
        (selectedCategory === 'loan' &&
          (item.subCategory === 'home-loan' || item.subCategory === 'business-loan' || item.subCategory === 'lap-loan' || item.subCategory === 'personal-loan'));
      const subCategoryMatch = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;

      return item.category === 'payout' && monthMatch && categoryMatch && subCategoryMatch;
    }
    return item.category === activeSection;
  });

  // Filter brochures data based on selected category
  const filteredBrochuresData = downloadData.filter(item => {
    if (item.category === 'brochures') {
      const categoryMatch = selectedCategoryBrochures === 'all' ||
        (selectedCategoryBrochures === 'insurance' &&
          (item.subCategory === 'motor-insurance' || item.subCategory === 'life-insurance' || item.subCategory === 'health-insurance')) ||
        (selectedCategoryBrochures === 'loan' &&
          (item.subCategory === 'home-loan' || item.subCategory === 'business-loan' || item.subCategory === 'lap-loan' || item.subCategory === 'personal-loan'));
      const subCategoryMatch = selectedSubCategoryBrochures === 'all' || item.subCategory === selectedSubCategoryBrochures;

      return categoryMatch && subCategoryMatch;
    }
    return false;
  });

  // Filter forms data
  const filteredFormsData = downloadData.filter(item =>
    item.category === 'forms'
  );

  // Generate months for dropdown
  const months = [
    { value: 'all', label: 'All Months' },
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
          <div className="w-10 h-12 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">PDF</span>
          </div>
        );
      case 'doc':
        return (
          <div className="w-10 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">DOC</span>
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-10 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">XLS</span>
          </div>
        );
      default:
        return (
          <div className="w-10 h-12 bg-gray-500 rounded-lg flex items-center justify-center shrink-0">
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

  // Handle insurance dropdown toggle for payout
  const handleInsuranceToggle = () => {
    setIsInsuranceOpen(!isInsuranceOpen);
    setIsLoanOpen(false);
  };

  // Handle loan dropdown toggle for payout
  const handleLoanToggle = () => {
    setIsLoanOpen(!isLoanOpen);
    setIsInsuranceOpen(false);
  };

  // Handle subcategory selection for payout
  const handleSubCategorySelect = (subCategory: 'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan') => {
    setSelectedSubCategory(subCategory);
    if (subCategory === 'all') {
      setSelectedCategory('all');
    } else if (subCategory === 'home-loan' || subCategory === 'business-loan' || subCategory === 'lap-loan' || subCategory === 'personal-loan') {
      setSelectedCategory('loan');
    } else {
      setSelectedCategory('insurance');
    }
    setIsInsuranceOpen(false);
    setIsLoanOpen(false);
  };

  // Handle insurance dropdown toggle for brochures
  const handleInsuranceToggleBrochures = () => {
    setIsInsuranceOpenBrochures(!isInsuranceOpenBrochures);
    setIsLoanOpenBrochures(false);
  };

  // Handle loan dropdown toggle for brochures
  const handleLoanToggleBrochures = () => {
    setIsLoanOpenBrochures(!isLoanOpenBrochures);
    setIsInsuranceOpenBrochures(false);
  };

  // Handle subcategory selection for brochures
  const handleSubCategorySelectBrochures = (subCategory: 'all' | 'motor-insurance' | 'life-insurance' | 'health-insurance' | 'home-loan' | 'business-loan' | 'lap-loan' | 'personal-loan') => {
    setSelectedSubCategoryBrochures(subCategory);
    if (subCategory === 'all') {
      setSelectedCategoryBrochures('all');
    } else if (subCategory === 'home-loan' || subCategory === 'business-loan' || subCategory === 'lap-loan' || subCategory === 'personal-loan') {
      setSelectedCategoryBrochures('loan');
    } else {
      setSelectedCategoryBrochures('insurance');
    }
    setIsInsuranceOpenBrochures(false);
    setIsLoanOpenBrochures(false);
  };

  // Get display name for subcategory
  const getSubCategoryDisplayName = (subCategory: string) => {
    const names: Record<string, string> = {
      'all': 'All Documents',
      'motor-insurance': 'Motor Insurance',
      'life-insurance': 'Life Insurance',
      'health-insurance': 'Health Insurance',
      'home-loan': 'Home Loan',
      'business-loan': 'Business Loan',
      'lap-loan': 'LAP Loan',
      'personal-loan': 'Personal Loan'
    };
    return names[subCategory] || subCategory;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-700 tracking-tight">
              Downloads
            </h1>
            <p className="text-slate-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
              A centralized repository for all documents essential for your business.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 sm:p-2">
          <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">

            {/* Payout */}
            <button
              onClick={() => setActiveSection('payout')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${activeSection === 'payout'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm sm:text-base">💸</span>
                <span className="font-semibold">Payout Structure</span>
              </div>
            </button>

            {/* Brochures */}
            <button
              onClick={() => setActiveSection('brochures')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${activeSection === 'brochures'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm sm:text-base">📄</span>
                <span className="font-semibold">Product Brochures</span>
              </div>
            </button>

            {/* Forms */}
            <button
              onClick={() => setActiveSection('forms')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${activeSection === 'forms'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm sm:text-base">📋</span>
                <span className="font-semibold">Application Forms</span>
              </div>
            </button>

          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 sm:space-y-6">

          {/* Payout Structure Section */}
          {activeSection === 'payout' && (
            <div className="space-y-6">
              {/* Month Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <label className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Select Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Navigation Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
                  {/* All Documents Button */}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubCategory('all');
                      setIsInsuranceOpen(false);
                      setIsLoanOpen(false);
                    }}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center ${selectedCategory === 'all'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}>
                    <div className="flex items-center space-x-2">

                      <span>All Documents</span>
                    </div>
                  </button>

                  {/* Insurance Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleInsuranceToggle}
                      className={`w-full py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategory === 'insurance'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}>
                      <div className="flex items-center space-x-2">

                        <span>Insurance</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 shrink-0 ${isInsuranceOpen ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Insurance Dropdown Menu */}
                    {isInsuranceOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelect('motor-insurance')}
                          className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'motor-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          <span>Motor Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('life-insurance')}
                          className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'life-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          <span>Life Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('health-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'health-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          <span>Health Insurance</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Loan Dropdown */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleLoanToggle}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategory === 'loan'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}>
                      <div className="flex items-center space-x-2">
                        <span>Loan</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 shrink-0 ${isLoanOpen ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Loan Dropdown Menu */}
                    {isLoanOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelect('home-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'home-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Home Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('business-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'business-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Business Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('lap-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'lap-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>LAP Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelect('personal-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategory === 'personal-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Personal Loan</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Files List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-2 max-[375px]:p-2 sm:p-6 border-b border-slate-200">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight">
                    {selectedCategory === 'all'
                      ? 'All Payout Documents'
                      : selectedCategory === 'insurance'
                        ? 'Insurance Documents'
                        : 'Loan Documents'}
                    {selectedSubCategory !== 'all' && ` - ${getSubCategoryDisplayName(selectedSubCategory)}`}
                    {selectedMonth !== 'all' && ` for ${months.find(m => m.value === selectedMonth)?.label}`}
                  </h3>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredData.map((file) => (
                    <div
                      key={file.id}
                      className="p-2 max-[375px]:p-2 sm:p-6 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">

                        {/* LEFT SIDE */}
                        <div className="flex items-start sm:items-center space-x-2 sm:space-x-4">
                          {getFileIcon(file.type)}

                          <div className="min-w-0 flex-1">
                            {/* File Name */}
                            <h4 className="text-xs sm:text-sm font-medium text-slate-900 wrap-break-word leading-tight">
                              {file.name}
                            </h4>

                            {/* Details */}
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-[11px] sm:text-xs text-slate-500">
                              <span>{file.size}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Uploaded {file.uploadDate}</span>

                              {file.subCategory && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] sm:text-xs">
                                    {getSubCategoryDisplayName(file.subCategory)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* DOWNLOAD BUTTON */}
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3]/90 transition-colors duration-200 font-medium w-full sm:w-auto">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Download</span>
                        </button>

                      </div>
                    </div>
                  ))}

                  {/* EMPTY STATE */}
                  {filteredData.length === 0 && (
                    <div className="p-6 sm:p-12 text-center">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                        <span className="text-lg sm:text-2xl">📁</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1">No documents found</h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                        No documents available for the selected filters.
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
              {/* Category Navigation Bar for Brochures */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <div className="flex flex-col sm:flex-row sm:space-x-1 space-y-1 sm:space-y-0">
                  {/* All Documents Button for Brochures */}
                  <button
                    onClick={() => {
                      setSelectedCategoryBrochures('all');
                      setSelectedSubCategoryBrochures('all');
                      setIsInsuranceOpenBrochures(false);
                      setIsLoanOpenBrochures(false);
                    }}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center ${selectedCategoryBrochures === 'all'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}>
                    <div className="flex items-center space-x-2">

                      <span>All Brochures</span>
                    </div>
                  </button>

                  {/* Insurance Dropdown for Brochures */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleInsuranceToggleBrochures}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategoryBrochures === 'insurance'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}>
                      <div className="flex items-center space-x-2">

                        <span>Insurance</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 shrink-0 ${isInsuranceOpenBrochures ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Insurance Dropdown Menu for Brochures */}
                    {isInsuranceOpenBrochures && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelectBrochures('motor-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'motor-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Motor Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelectBrochures('life-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'life-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Life Insurance</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelectBrochures('health-insurance')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'health-insurance'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Health Insurance</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Loan Dropdown for Brochures */}
                  <div className="relative flex-1">
                    <button
                      onClick={handleLoanToggleBrochures}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-between ${selectedCategoryBrochures === 'loan'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}>
                      <div className="flex items-center space-x-2">

                        <span>Loan</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 shrink-0 ${isLoanOpenBrochures ? 'rotate-180' : ''
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Loan Dropdown Menu for Brochures */}
                    {isLoanOpenBrochures && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleSubCategorySelectBrochures('home-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'home-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Home Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelectBrochures('business-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'business-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Business Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelectBrochures('lap-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'lap-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>LAP Loan</span>
                        </button>
                        <button
                          onClick={() => handleSubCategorySelectBrochures('personal-loan')}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${selectedSubCategoryBrochures === 'personal-loan'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}>
                          <span>Personal Loan</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Brochures Files List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {selectedCategoryBrochures === 'all' ? 'All Product Brochures' :
                      selectedCategoryBrochures === 'insurance' ? 'Insurance Brochures' : 'Loan Brochures'}
                    {selectedSubCategoryBrochures !== 'all' && ` - ${getSubCategoryDisplayName(selectedSubCategoryBrochures)}`}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">Marketing materials and product information</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {filteredBrochuresData.map((file) => (
                    <div key={file.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-[375px]:gap-2 sm:gap-0">
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                          {getFileIcon(file.type)}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-slate-900 wrap-break-word">{file.name}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs text-slate-500">
                              <span>{file.size}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Uploaded {file.uploadDate}</span>
                              {file.subCategory && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs">
                                    {getSubCategoryDisplayName(file.subCategory)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center justify-center space-x-1 max-[375px]:space-x-1 px-2 max-[375px]:px-2 sm:px-4 py-2 
                                    text-[10px] max-[375px]:text-[9px] sm:text-sm bg-[#1CADA3] text-white 
                                    rounded-lg hover:bg-[#1CADA3]/90 transition-colors duration-200 font-medium 
                                    w-full sm:w-auto">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredBrochuresData.length === 0 && (
                    <div className="p-8 sm:p-12 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <span className="text-xl sm:text-2xl">📁</span>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No brochures found</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        No brochures available for the selected filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Application Forms Section */}
          {activeSection === 'forms' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-200">
                  <h3 className="text-base sm:text-lg font-medium text-slate-900">Application Forms</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Forms for client onboarding and policy management</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {filteredFormsData.map((file) => (
                    <div key={file.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                          {getFileIcon(file.type)}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-slate-900 wrap-break-word">{file.name}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs text-slate-500">
                              <span>{file.size}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>Uploaded {file.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(file)}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#1CADA3] text-white rounded-lg hover:bg-[#1CADA3]/90 transition-colors duration-200 text-sm font-medium w-full sm:w-auto mt-2 sm:mt-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredFormsData.length === 0 && (
                    <div className="p-8 sm:p-12 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <span className="text-xl sm:text-2xl">📁</span>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No forms found</h3>
                      <p className="text-slate-600 text-sm">No application forms available at the moment.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}