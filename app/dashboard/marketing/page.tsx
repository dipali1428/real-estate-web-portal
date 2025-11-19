'use client';

import { useState, useEffect, useRef } from 'react';

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

interface DraggablePosition {
  x: number;
  y: number;
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [currentSharedImage, setCurrentSharedImage] = useState<string>('');
  const [currentTemplate, setCurrentTemplate] = useState<TemplateItem | null>(null);
  const [userPosition, setUserPosition] = useState<DraggablePosition>({ x: 50, y: 85 });
  const [isDragging, setIsDragging] = useState(false);
  const [fontSize, setFontSize] = useState<FontSizeSettings>({
    name: 18,
    number: 16
  });
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  
  const containerRef = useRef<HTMLDivElement>(null);

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
      imageUrl: '/templateimg/healthinsurance.jpg'
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
      imageUrl: '/templateimg/homeloan.jpeg'
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
      imageUrl: '/templateimg/personalloan.jpeg'
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

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateTouchPosition(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    updateTouchPosition(e);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updatePosition = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Keep within bounds (5-95%)
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));
    
    setUserPosition({ x: boundedX, y: boundedY });
  };

  const updateTouchPosition = (e: React.TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    // Keep within bounds (5-95%)
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));
    
    setUserPosition({ x: boundedX, y: boundedY });
  };

  // Handle font size changes
  const handleFontSizeChange = (type: 'name' | 'number', value: number) => {
    setFontSize(prev => ({
      ...prev,
      [type]: Math.max(10, Math.min(30, value)) // Limit between 10-30px
    }));
  };

  // Get original image dimensions
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

  // Open position modal
  const openPositionModal = async (template: TemplateItem) => {
    setCurrentTemplate(template);
    setUserPosition({ x: 50, y: 85 }); // Reset to bottom center
    setFontSize({ name: 18, number: 16 }); // Reset font sizes
    
    try {
      const dimensions = await getImageDimensions(template.imageUrl);
      setImageDimensions(dimensions);
      setShowPositionModal(true);
    } catch (error) {
      console.error('Error loading image dimensions:', error);
      // Fallback dimensions
      setImageDimensions({ width: 800, height: 600 });
      setShowPositionModal(true);
    }
  };

  // Quick download without positioning - adds details below image
  const quickDownload = async (template: TemplateItem) => {
    try {
      const dimensions = await getImageDimensions(template.imageUrl);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Error creating image. Please try again.');
        return;
      }

      // Calculate extended canvas height (original height + space for details)
      const extendedHeight = dimensions.height + 120; // Add 120px for details section
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
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userProfile.name, canvas.width / 2, detailsY - 10);

      // Contact number
      ctx.fillStyle = '#475569';
      ctx.font = `bold ${fontSize.number}px Arial`;
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

  // Create personalized image with details below the image
  const createPersonalizedImage = async (template: TemplateItem, action: 'download' | 'share' = 'download') => {
    try {
      const dimensions = await getImageDimensions(template.imageUrl);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Error creating image. Please try again.');
        return;
      }

      // Calculate extended canvas height (original height + space for details)
      const extendedHeight = dimensions.height + 120; // Add 120px for details section
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
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userProfile.name, canvas.width / 2, detailsY - 10);

      // Contact number
      ctx.fillStyle = '#475569';
      ctx.font = `bold ${fontSize.number}px Arial`;
      ctx.fillText(userProfile.contactNumber, canvas.width / 2, detailsY + 15);

      // Add call to action text
      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 14px Arial';
      ctx.fillText('Contact me for more information!', canvas.width / 2, detailsY + 40);

      // Convert to image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          
          if (action === 'download') {
            // Download the image
            const link = document.createElement('a');
            link.href = url;
            link.download = `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setShowPositionModal(false);
          } else if (action === 'share') {
            // Set the image for sharing
            setCurrentSharedImage(url);
            setShowShareModal(true);
            setShowPositionModal(false);
          }
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error creating personalized image:', error);
      alert('Error creating personalized image. Please try again.');
    }
  };

  // Share on social media
  const shareOnSocialMedia = (platform: string) => {
    if (!currentSharedImage) return;

    const text = `Check out this ${activeCategory} template personalized for you! Contact ${userProfile.name} at ${userProfile.contactNumber} for more details.`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentSharedImage)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentSharedImage)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentSharedImage)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        alert('For Instagram, please save the image and share it directly from your gallery.');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Copy image to clipboard
  const copyToClipboard = async () => {
    try {
      if (!currentSharedImage) return;
      
      const response = await fetch(currentSharedImage);
      const blob = await response.blob();
      
      if (navigator.clipboard && navigator.clipboard.write) {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        alert('Image copied to clipboard!');
      } else {
        const link = document.createElement('a');
        link.href = currentSharedImage;
        link.download = 'personalized-template.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert('Image download started. You can share the downloaded image.');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Unable to copy image. Please try downloading and sharing manually.');
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
              Download personalized templates with contact details below the image
            </p>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Personalized Marketing Templates</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Contact details will be added below the template image
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="font-semibold text-base sm:text-lg">{userProfile.name}</p>
              <p className="text-blue-200 text-sm sm:text-base">{userProfile.contactNumber}</p>
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
                  <div className="h-40 sm:h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img 
                      src={template.imageUrl} 
                      alt={template.name}
                      className="max-w-full max-h-full object-contain"
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

                    <div className="flex space-x-2">
                      <button
                        onClick={() => quickDownload(template)}
                        className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-white rounded-lg transition-all duration-200 text-xs font-semibold ${
                          template.category === 'insurance'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Quick Download</span>
                      </button>
                    </div>
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