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
      imageUrl: '/templateimg/health-insurance.jpg'
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
      imageUrl: '/templateimg/home-loan.jpg'
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

  // Open position modal
  const openPositionModal = (template: TemplateItem) => {
    setCurrentTemplate(template);
    setUserPosition({ x: 50, y: 85 }); // Reset to bottom center
    setFontSize({ name: 18, number: 16 }); // Reset font sizes
    setShowPositionModal(true);
  };

  // Quick download without positioning
  const quickDownload = async (template: TemplateItem) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      alert('Error creating image. Please try again.');
      return;
    }

    try {
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Load and draw the template image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = template.imageUrl;
      });

      // Draw the template image to fill canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Add user details at bottom center with MEDIUM size
      const userX = canvas.width / 2;
      const userY = canvas.height - 40;

      // Calculate box size based on text
      ctx.font = `bold 18px Arial`;
      const nameWidth = ctx.measureText(userProfile.name).width;
      ctx.font = `bold 16px Arial`;
      const numberWidth = ctx.measureText(userProfile.contactNumber).width;
      const maxWidth = Math.max(nameWidth, numberWidth);
      
      const boxWidth = maxWidth + 60; // Padding
      const boxHeight = 60;

      // Add semi-transparent background for user details
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(userX - boxWidth/2, userY - boxHeight/2, boxWidth, boxHeight);

      // Add border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(userX - boxWidth/2, userY - boxHeight/2, boxWidth, boxHeight);

      // User name - MEDIUM size
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userProfile.name, userX, userY - 10);

      // Contact number - MEDIUM size
      ctx.font = 'bold 16px Arial';
      ctx.fillText(userProfile.contactNumber, userX, userY + 10);

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

  // Create personalized image with draggable user details
  const createPersonalizedImage = async (template: TemplateItem, action: 'download' | 'share' = 'download') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      alert('Error creating image. Please try again.');
      return;
    }

    try {
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Load and draw the template image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = template.imageUrl;
      });

      // Draw the template image to fill canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Calculate position for user details based on percentage
      const userX = (userPosition.x / 100) * canvas.width;
      const userY = (userPosition.y / 100) * canvas.height;

      // Calculate box size based on current font sizes
      ctx.font = `bold ${fontSize.name}px Arial`;
      const nameWidth = ctx.measureText(userProfile.name).width;
      ctx.font = `bold ${fontSize.number}px Arial`;
      const numberWidth = ctx.measureText(userProfile.contactNumber).width;
      const maxWidth = Math.max(nameWidth, numberWidth);
      
      const boxWidth = maxWidth + 80; // Extra padding
      const boxHeight = 70;

      // Add semi-transparent background for user details
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(userX - boxWidth/2, userY - boxHeight/2, boxWidth, boxHeight);

      // Add border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(userX - boxWidth/2, userY - boxHeight/2, boxWidth, boxHeight);

      // User name - with adjustable size
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${fontSize.name}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userProfile.name, userX, userY - 15);

      // Contact number - with adjustable size
      ctx.font = `bold ${fontSize.number}px Arial`;
      ctx.fillText(userProfile.contactNumber, userX, userY + 15);

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
              Download personalized templates with adjustable text size
            </p>
          </div>
        </div>

        {/* User Profile Info */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Personalized Marketing Templates</h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Adjust text size and position before downloading
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

        {/* Position Adjustment Modal */}
        {showPositionModal && currentTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Customize Your Template</h3>
                <button
                  onClick={() => setShowPositionModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 p-4 sm:p-6 overflow-auto">
                {/* Font Size Controls */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3">Adjust Text Size</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name Size: {fontSize.name}px
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="30"
                        value={fontSize.name}
                        onChange={(e) => handleFontSizeChange('name', parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Number Size: {fontSize.number}px
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="30"
                        value={fontSize.number}
                        onChange={(e) => handleFontSizeChange('number', parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-slate-600 text-sm sm:text-base mb-2">
                    Drag the contact box to your preferred position
                  </p>
                  <div className="text-xs sm:text-sm text-slate-500">
                    Position: {Math.round(userPosition.x)}%, {Math.round(userPosition.y)}%
                  </div>
                </div>

                <div 
                  ref={containerRef}
                  className="relative border-2 border-slate-300 rounded-lg overflow-hidden bg-slate-100 mx-auto max-w-2xl"
                  style={{ aspectRatio: '4/3' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={currentTemplate.imageUrl}
                    alt={currentTemplate.name}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Draggable element overlay with adjustable font size */}
                  <div
                    className="absolute cursor-move select-none touch-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${userPosition.x}%`,
                      top: `${userPosition.y}%`,
                    }}
                  >
                    <div 
                      className="bg-black bg-opacity-80 text-white px-4 py-3 rounded-lg border-2 border-white shadow-lg text-center transition-all duration-200"
                      style={{
                        minWidth: '200px',
                        fontSize: `${Math.max(fontSize.name, fontSize.number)}px`
                      }}
                    >
                      <div 
                        className="font-semibold whitespace-nowrap mb-1"
                        style={{ fontSize: `${fontSize.name}px` }}
                      >
                        {userProfile.name}
                      </div>
                      <div 
                        className="font-semibold whitespace-nowrap"
                        style={{ fontSize: `${fontSize.number}px` }}
                      >
                        {userProfile.contactNumber}
                      </div>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-70 px-3 py-1 rounded-full border border-white">
                      🎯 Drag to move
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setShowPositionModal(false)}
                    className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors border-2 border-slate-300 rounded-lg text-sm font-semibold w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => currentTemplate && createPersonalizedImage(currentTemplate, 'download')}
                    className={`px-6 py-3 text-white rounded-lg transition-colors text-sm font-semibold w-full sm:w-auto ${
                      currentTemplate.category === 'insurance'
                        ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-700'
                        : 'bg-green-600 hover:bg-green-700 border-2 border-green-700'
                    }`}
                  >
                    Download
                  </button>
                  <button
                    onClick={() => currentTemplate && createPersonalizedImage(currentTemplate, 'share')}
                    className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-semibold border-2 border-slate-800 w-full sm:w-auto"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Share Template</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-slate-600 text-sm mb-4">Share your personalized template</p>
                
                {currentSharedImage && (
                  <div className="mb-4">
                    <img 
                      src={currentSharedImage} 
                      alt="Share preview" 
                      className="mx-auto max-h-24 rounded-lg border border-slate-200"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                >
                  <div className="w-6 h-6 mb-1 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">WA</span>
                  </div>
                  <span className="text-xs font-medium text-slate-700">WhatsApp</span>
                </button>

                <button
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  <div className="w-6 h-6 mb-1 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">FB</span>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Facebook</span>
                </button>

                <button
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="flex flex-col items-center justify-center p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors border border-sky-200"
                >
                  <div className="w-6 h-6 mb-1 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">X</span>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Twitter</span>
                </button>

                <button
                  onClick={() => shareOnSocialMedia('linkedin')}
                  className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  <div className="w-6 h-6 mb-1 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">IN</span>
                  </div>
                  <span className="text-xs font-medium text-slate-700">LinkedIn</span>
                </button>

                <button
                  onClick={() => shareOnSocialMedia('instagram')}
                  className="flex flex-col items-center justify-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-200"
                >
                  <div className="w-6 h-6 mb-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">IG</span>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Instagram</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="w-6 h-6 mb-1 bg-slate-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Copy</span>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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

                      <button
                        onClick={() => openPositionModal(template)}
                        className="flex items-center justify-center space-x-1 px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 text-xs font-semibold"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        <span>Customize</span>
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