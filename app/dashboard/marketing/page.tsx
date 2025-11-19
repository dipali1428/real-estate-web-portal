'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import CategoryDropdown from './CategoryDropdown';
import TemplateGrid from './TemplateGrid';

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

export default function ImageTemplates() {
  const [activeCategory, setActiveCategory] = useState<'insurance' | 'loan'>('insurance');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

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
      imageUrl: '/templateimg/life-insurance.jpg'
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
      imageUrl: '/templateimg/healthInsurance.jpeg'
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
      imageUrl: '/templateimg/car-insurance.jpeg'
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
      imageUrl: '/templateimg/homeLoan.jpeg'
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
      imageUrl: '/templateimg/personalLoan.jpeg'
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
    },
  ]);

  // Filter templates based on active category and subcategory
  const filteredTemplates = allTemplates.filter(template => {
    const categoryMatch = template.category === activeCategory;
    const subCategoryMatch = activeSubCategory === 'all' || template.subCategory === activeSubCategory;
    return categoryMatch && subCategoryMatch;
  });

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

  // Quick download without positioning - adds details below image
  const quickDownload = async (template: TemplateItem) => {
    try {
      const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              width: img.naturalWidth,
              height: img.naturalHeight
            });
          };
          img.onerror = reject;
          img.src = url;
        });
      };

      const dimensions = await getImageDimensions(template.imageUrl);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Error creating image. Please try again.');
        return;
      }

      // Calculate extended canvas height (original height + space for details)
      const extendedHeight = dimensions.height + 120;
      canvas.width = dimensions.width;
      canvas.height = extendedHeight;

      // Set white background for the entire canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw the template image at the top
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = template.imageUrl;
      });

      // Draw the template image at original size at the top
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

      // Add separator line
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, dimensions.height + 20);
      ctx.lineTo(canvas.width - 50, dimensions.height + 20);
      ctx.stroke();

      // Add user details section below the image
      const detailsY = dimensions.height + 60;

      // Add background for contact info
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(40, dimensions.height + 40, canvas.width - 80, 70);

      // Add border around contact info
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, dimensions.height + 40, canvas.width - 80, 70);

      // User name
      ctx.fillStyle = '#1e293b';
      ctx.font = `bold 18px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userProfile.name, canvas.width / 2, detailsY - 10);

      // Contact number
      ctx.fillStyle = '#475569';
      ctx.font = `bold 16px Arial`;
      ctx.fillText(userProfile.contactNumber, canvas.width / 2, detailsY + 15);

      // Add call to action text
      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 14px Arial';
      ctx.fillText('Contact me for more information!', canvas.width / 2, detailsY + 40);

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
        <Header userProfile={userProfile} />
        
        {/* Navigation Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <CategoryDropdown
                type="insurance"
                isOpen={isInsuranceOpen}
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                onToggle={handleDropdownToggle}
                onSubCategorySelect={handleSubCategorySelect}
              />
              <CategoryDropdown
                type="loan"
                isOpen={isLoanOpen}
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                onToggle={handleDropdownToggle}
                onSubCategorySelect={handleSubCategorySelect}
              />
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
              {activeCategory === 'insurance' ? 'Insurance' : 'Loan'} - {activeSubCategory === 'all' ? 'All Templates' : activeSubCategory}
            </span>
          </div>
        </div>

        <TemplateGrid
          templates={filteredTemplates}
          activeSubCategory={activeSubCategory}
          onQuickDownload={quickDownload}
        />
      </div>
    </div>
  );
}