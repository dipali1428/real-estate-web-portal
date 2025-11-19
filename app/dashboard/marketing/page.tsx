'use client';

import { useState, useEffect } from 'react';

// Types
interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  size: string;
  uploadDate: string;
  category: 'insurance' | 'loan';
  subCategory: string;
  description: string;
  imageUrl: string;
}

interface UserProfile {
  name: string;
  contactNumber: string;
}

interface FontSizeSettings {
  name: number;
  number: number;
}

export default function ImageTemplates() {
  const [activeCategory, setActiveCategory] = useState<'insurance' | 'loan'>('insurance');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSizeSettings>({
    name: 20,
    number: 18
  });
  
  // Mock user profile data
  const userProfile: UserProfile = {
    name: 'Rajesh Kumar',
    contactNumber: '+91-9876543210'
  };

  // All Templates - Embedded images
  const [allTemplates] = useState<TemplateItem[]>([
    {
      id: '1',
      name: 'Life Insurance Plan',
      type: 'image',
      size: '1.2 MB',
      uploadDate: '2024-01-15',
      category: 'insurance',
      subCategory: 'life',
      description: 'Comprehensive life insurance coverage for you and your family',
      imageUrl: '/templateimg/healthinsurance.jpeg'
    },
    {
      id: '2',
      name: 'Health Insurance',
      type: 'image',
      size: '1.5 MB',
      uploadDate: '2024-01-10',
      category: 'insurance',
      subCategory: 'health',
      description: 'Complete health insurance protection for medical emergencies',
      imageUrl: '/templateimg/healthinsurance.jpeg'
    },
    {
      id: '3',
      name: 'Car Insurance',
      type: 'image',
      size: '1.3 MB',
      uploadDate: '2024-01-08',
      category: 'insurance',
      subCategory: 'motor',
      description: 'Best car insurance policies with great benefits',
      imageUrl: '/templateimg/car-insurance.jpg'
    },
    {
      id: '4',
      name: 'Home Loan Offer',
      type: 'image',
      size: '1.4 MB',
      uploadDate: '2024-01-12',
      category: 'loan',
      subCategory: 'home',
      description: 'Affordable home loans with low interest rates',
      imageUrl: '/templateimg/homeloanimg.jpeg'
    },
    {
      id: '5',
      name: 'Personal Loan',
      type: 'image',
      size: '1.6 MB',
      uploadDate: '2024-01-05',
      category: 'loan',
      subCategory: 'personal',
      description: 'Quick personal loans for all your needs',
      imageUrl: '/templateimg/homeloanimg.jpeg'
    },
    {
      id: '6',
      name: 'Business Loan',
      type: 'image',
      size: '1.7 MB',
      uploadDate: '2024-01-03',
      category: 'loan',
      subCategory: 'business',
      description: 'Business loans to grow your enterprise',
      imageUrl: '/templateimg/business-loan.jpg'
    }
  ]);

  // Filter templates based on active category and subcategory
  const filteredTemplates = allTemplates.filter(template => {
    const categoryMatch = template.category === activeCategory;
    const subCategoryMatch = activeSubCategory === 'all' || template.subCategory === activeSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  // Subcategory labels
  const subCategoryLabels: Record<string, string> = {
    all: 'All Templates',
    life: 'Life Insurance',
    health: 'Health Insurance',
    motor: 'Motor Insurance',
    home: 'Home Loan',
    business: 'Business Loan',
    lap: 'LAP Loan',
    personal: 'Personal Loan'
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsInsuranceOpen(false);
        setIsLoanOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSubCategory(subCategory);
    setIsInsuranceOpen(false);
    setIsLoanOpen(false);
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (type: 'insurance' | 'loan', event: React.MouseEvent) => {
    event.stopPropagation();
    if (type === 'insurance') {
      setIsInsuranceOpen(!isInsuranceOpen);
      setIsLoanOpen(false);
      setActiveCategory('insurance');
    } else {
      setIsLoanOpen(!isLoanOpen);
      setIsInsuranceOpen(false);
      setActiveCategory('loan');
    }
  };

  // Handle font size changes
  const handleFontSizeChange = (type: 'name' | 'number', value: number) => {
    setFontSize(prev => ({
      ...prev,
      [type]: Math.max(12, Math.min(36, value)) // Limit between 12-36px
    }));
  };

  // Quick download with white background and name+number in single line
  const quickDownload = async (template: TemplateItem) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      alert('Error creating image. Please try again.');
      return;
    }

    try {
      // Set canvas size
      const canvasWidth = 800;
      const canvasHeight = 600;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Load the template image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = template.imageUrl;
      });

      // Calculate dimensions to fit image within canvas while maintaining aspect ratio
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspectRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        // Image is taller than canvas
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspectRatio;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      // Draw the template image centered on white background
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Add user details in single line at bottom center
      const userText = `${userProfile.name} • ${userProfile.contactNumber}`;
      const userX = canvasWidth / 2;
      const userY = canvasHeight - 30;

      // Calculate text width for background
      ctx.font = `bold ${fontSize.name}px Arial`;
      const textWidth = ctx.measureText(userText).width;
      const boxWidth = textWidth + 40;
      const boxHeight = fontSize.name + 16;

      // Add semi-transparent background for better text visibility
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      
      // Draw rounded rectangle background
      ctx.beginPath();
      ctx.roundRect(userX - boxWidth/2, userY - boxHeight/2, boxWidth, boxHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // User details in single line
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userText, userX, userY);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Download the image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error creating personalized image:', error);
      alert('Error creating personalized image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Professional Templates
            </h1>
            <p className="text-slate-600 mt-2 text-base sm:text-lg">
              Download personalized templates with your contact information
            </p>
          </div>
        </div>

        {/* User Profile Info with Text Size Settings */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Personalized Marketing Templates</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Your contact details will be added automatically at the bottom
              </p>
            </div>
            <div className="text-center sm:text-right">
              <div className="mb-2">
                <p className="font-semibold text-base sm:text-lg">{userProfile.name}</p>
                <p className="text-blue-200 text-sm sm:text-base">{userProfile.contactNumber}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 border border-white border-opacity-30">
                <p className="text-xs text-blue-100 mb-1">Text Size Settings</p>
                <div className="flex flex-col sm:flex-row gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-100">Name:</span>
                    <input
                      type="number"
                      min="12"
                      max="36"
                      value={fontSize.name}
                      onChange={(e) => handleFontSizeChange('name', parseInt(e.target.value) || 20)}
                      className="w-12 px-1 py-1 rounded text-slate-900 text-center text-xs"
                    />
                    <span className="text-blue-100">px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-100">Number:</span>
                    <input
                      type="number"
                      min="12"
                      max="36"
                      value={fontSize.number}
                      onChange={(e) => handleFontSizeChange('number', parseInt(e.target.value) || 18)}
                      className="w-12 px-1 py-1 rounded text-slate-900 text-center text-xs"
                    />
                    <span className="text-blue-100">px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              {/* Insurance Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => handleDropdownToggle('insurance', e)}
                  className={`flex items-center justify-between w-full sm:w-auto space-x-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    activeCategory === 'insurance' 
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300 shadow-sm' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-base sm:text-lg">Insurance</span>
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isInsuranceOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Insurance Dropdown Menu */}
                {isInsuranceOpen && (
                  <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:w-64 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-20">
                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100">
                      Insurance Types
                    </div>
                    <button
                      onClick={(e) => handleSubCategorySelect('all', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">All Insurance Templates</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('life', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">Life Insurance</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('health', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">Health Insurance</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('motor', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <div className="font-medium">Motor Insurance</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Loan Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => handleDropdownToggle('loan', e)}
                  className={`flex items-center justify-between w-full sm:w-auto space-x-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-200 font-semibold ${
                    activeCategory === 'loan' 
                      ? 'bg-green-100 text-green-700 border-2 border-green-300 shadow-sm' 
                      : 'text-slate-700 hover:text-green-600 hover:bg-slate-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-base sm:text-lg">Loan</span>
                  <svg 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isLoanOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Loan Dropdown Menu */}
                {isLoanOpen && (
                  <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:w-64 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-20">
                    <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100">
                      Loan Types
                    </div>
                    <button
                      onClick={(e) => handleSubCategorySelect('all', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">All Loan Templates</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('home', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">Home Loan</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('business', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">Business Loan</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('lap', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-slate-100"
                    >
                      <div className="font-medium">LAP Loan</div>
                    </button>
                    <button
                      onClick={(e) => handleSubCategorySelect('personal', e)}
                      className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                    >
                      <div className="font-medium">Personal Loan</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Subcategory Display */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <span className="text-sm font-medium text-slate-600">Showing:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              activeCategory === 'insurance' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {subCategoryLabels[activeSubCategory]}
            </span>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">
              {subCategoryLabels[activeSubCategory]} Templates
            </h2>
            <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm text-center">
              {filteredTemplates.length} templates available
            </span>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
                  {/* Template Preview */}
                  <div className="h-40 sm:h-48 relative overflow-hidden bg-slate-100">
                    <img 
                      src={template.imageUrl} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-slate-200">
                              <div class="text-center text-slate-500">
                                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="text-sm">Template Image</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {template.size}
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1">{template.name}</h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                        template.category === 'insurance' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {subCategoryLabels[template.subCategory]}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>

                    {/* Single Download Button */}
                    <button
                      onClick={() => quickDownload(template)}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 text-white rounded-lg transition-all duration-200 text-sm font-semibold ${
                        template.category === 'insurance'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download with Contact Info</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl border border-slate-200">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">📁</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">No templates found</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                No templates available for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}