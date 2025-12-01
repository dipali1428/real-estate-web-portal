'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryDropdown from './components/CategoryDropdown';
import TemplateGrid from './components/TemplateGrid';
import { DashboardService } from "@/app/services/dashboardService";

// Types
interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
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

interface ApiProfile {
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  password: string;
}

export default function ImageTemplates() {
  const [activeCategory, setActiveCategory] = useState<'insurance' | 'loan'>('insurance');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile data from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await DashboardService.getProfile();
        const profileData: ApiProfile = response.user;
    
        // Function to capitalize each word in the name
        const capitalizeFullName = (name: string): string => {
          if (!name || name.trim() === '') return 'User';
          
          return name
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 0) // Remove empty strings
            .map(word => {
              // Handle hyphenated names (e.g., "Smith-Jones")
              if (word.includes('-')) {
                return word
                  .split('-')
                  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                  .join('-');
              }
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
        };
    
        setUserProfile({
          name: capitalizeFullName(profileData.name),
          contactNumber: profileData.mobile || 'Not provided'
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to default values if API fails
        setUserProfile({
          name: 'User',
          contactNumber: 'Not available'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // All Templates - Embedded images
  const [allTemplates] = useState<TemplateItem[]>([
    {
      id: '1',
      name: 'Life Insurance Plan',
      type: 'image',
      uploadDate: '2024-01-15',
      category: 'insurance',
      subCategory: 'life',
      description: 'Comprehensive life insurance coverage for you and your family',
      imageUrl: '/templateimg/LifeInsurance.jpg'
    },
    {
      id: '2',
      name: 'Health Insurance',
      type: 'image',
      uploadDate: '2024-01-10',
      category: 'insurance',
      subCategory: 'health',
      description: 'Complete health insurance protection for medical emergencies',
      imageUrl: '/templateimg/HealthInsurance.jpg'
    },
    {
      id: '3',
      name: 'Motor Insurance',
      type: 'image',
      uploadDate: '2024-01-08',
      category: 'insurance',
      subCategory: 'motor',
      description: 'Best car insurance policies with great benefits',
      imageUrl: '/templateimg/MotorInsurance.jpg'
    },
    {
      id: '4',
      name: 'Home Loan Offer',
      type: 'image',
      uploadDate: '2024-01-12',
      category: 'loan',
      subCategory: 'home',
      description: 'Affordable home loans with low interest rates',
      imageUrl: '/templateimg/HomeLoan.jpg'
    },
    {
      id: '5',
      name: 'Personal Loan',
      type: 'image',
      uploadDate: '2024-01-05',
      category: 'loan',
      subCategory: 'personal',
      description: 'Quick personal loans for all your needs',
      imageUrl: '/templateimg/PersonalLoan.jpg'
    },
    {
      id: '6',
      name: 'Business Loan',
      type: 'image',
      uploadDate: '2024-01-03',
      category: 'loan',
      subCategory: 'business',
      description: 'Business loans to grow your enterprise',
      imageUrl: '/templateimg/BusinessLoan.jpg'
    },
    {
      id: '7',
      name: 'Educational Loan',
      type: 'image',
      uploadDate: '2024-01-03',
      category: 'loan',
      subCategory: 'educational',
      description: 'Business loans to grow your enterprise',
      imageUrl: '/templateimg/EducationLoan.jpg'
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

  // Function to generate personalized image with better width-based scaling
  const generatePersonalizedImage = async (template: TemplateItem): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
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
          reject(new Error('Error creating canvas context'));
          return;
        }
  
        // Simple linear scaling based on image width
        // 400px width = 24px font
        // 1200px width = 48px font
        // 2400px width = 64px font
        const minWidth = 400;
        const maxWidth = 2400;
        const minFont = 24;
        const maxFont = 64;
        
        let fontSize;
        if (dimensions.width <= minWidth) {
          fontSize = minFont;
        } else if (dimensions.width >= maxWidth) {
          fontSize = maxFont;
        } else {
          // Linear interpolation
          const scale = (dimensions.width - minWidth) / (maxWidth - minWidth);
          fontSize = minFont + (maxFont - minFont) * scale;
        }
        
        // Round to nearest even number
        fontSize = Math.round(fontSize / 2) * 2;
  
        // Calculate other sizes
        const iconSize = fontSize * 1.3;
        const spacing = fontSize * 0.6;
        const lineSpacing = fontSize;
        const lineWidth = Math.max(2, fontSize * 0.03);
  
        // Add white space at bottom for text
        const textAreaHeight = fontSize * 3.5;
        const extendedHeight = dimensions.height + textAreaHeight;
        canvas.width = dimensions.width;
        canvas.height = extendedHeight;
  
        // Set white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        // Load and draw template image
        const img = new Image();
        img.crossOrigin = 'anonymous';
  
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = template.imageUrl;
        });
  
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  
        // SVG Icons (same as before)
        const userIconSVG = `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#1d283a"/>
            <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#1d283a"/>
          </svg>
        `)}`;
  
        const phoneIconSVG = `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="#1d283a"/>
          </svg>
        `)}`;
  
        const loadIcon = (svgData: string): Promise<HTMLImageElement> => {
          return new Promise((resolve, reject) => {
            const iconImg = new Image();
            iconImg.onload = () => resolve(iconImg);
            iconImg.onerror = reject;
            iconImg.src = svgData;
          });
        };
  
        const [userIcon, phoneIcon] = await Promise.all([
          loadIcon(userIconSVG),
          loadIcon(phoneIconSVG)
        ]);
  
        // Calculate text measurements
        ctx.fillStyle = '#1e293b';
        ctx.font = `bold ${fontSize}px Arial`;
        const userName = userProfile.name;
        const contactNumber = userProfile.contactNumber;
  
        const userNameWidth = ctx.measureText(userName).width;
        const contactNumberWidth = ctx.measureText(contactNumber).width;
  
        // Calculate total width
        const totalWidthWithIcons = userNameWidth + contactNumberWidth + (iconSize * 2) + (spacing * 3) + lineSpacing;
  
        // Center the entire block
        const startX = Math.max(0, (canvas.width - totalWidthWithIcons) / 2);
  
        // Calculate vertical position
        const detailsY = dimensions.height + (textAreaHeight / 2);
  
        // Scale and draw icons
        const iconScale = iconSize / 24;
        const drawScaledIcon = (icon: HTMLImageElement, x: number, y: number) => {
          ctx.save();
          ctx.translate(x, y - iconSize / 2);
          ctx.scale(iconScale, iconScale);
          ctx.drawImage(icon, 0, 0);
          ctx.restore();
        };
  
        // Draw user icon and name
        const userIconX = startX;
        const userNameX = userIconX + iconSize + spacing;
  
        drawScaledIcon(userIcon, userIconX, detailsY);
  
        ctx.fillStyle = '#1e293b';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(userName, userNameX, detailsY);
  
        // Draw vertical line separator
        const lineX = userNameX + userNameWidth + (lineSpacing / 2);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(lineX, detailsY - (fontSize * 0.7));
        ctx.lineTo(lineX, detailsY + (fontSize * 0.7));
        ctx.stroke();
  
        // Draw phone icon and contact number
        const phoneIconX = lineX + (lineSpacing / 2);
        const contactNumberX = phoneIconX + iconSize + spacing;
  
        drawScaledIcon(phoneIcon, phoneIconX, detailsY);
  
        ctx.fillStyle = '#1e293b';
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(contactNumber, contactNumberX, detailsY);
  
        // Convert to blob and resolve
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Error creating image blob'));
          }
        }, 'image/png');
  
      } catch (error) {
        reject(error);
      }
    });
  };

  // Quick download function
  const quickDownload = async (template: TemplateItem) => {
    try {
      const blob = await generatePersonalizedImage(template);

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error creating personalized image:', error);
      alert('Error creating personalized image. Please try again.');
    }
  };

  // WhatsApp share function
  // Enhanced WhatsApp share function
  const shareToWhatsApp = async (template: TemplateItem, imageBlob: Blob) => {
    try {
      // Create a File object from the blob
      const file = new File([imageBlob], `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`, {
        type: 'image/png'
      });

      // Check if Web Share API is available (works on mobile devices and some desktop browsers)
      if (navigator.share && navigator.canShare) {
        try {
          // Check if files can be shared
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: template.name,
              text: `Check out this ${template.name} template!`,
              files: [file]
            });
            return;
          }
        } catch (shareError) {
          console.log('Web Share API failed, falling back to download method:', shareError);
        }
      }

      // Fallback for desktop and browsers that don't support Web Share API
      // Create download link first
      const url = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Open WhatsApp with the message
      const message = `Check out this ${template.name} template! I've downloaded the personalized image. Please check your downloads folder.`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Show user instruction
      setTimeout(() => {
        alert('Image downloaded! Please attach the downloaded image from your downloads folder to share on WhatsApp.');
      }, 1000);

      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);

      // Ultimate fallback: just download the image
      const url = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `personalized-${template.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Image downloaded to your device. Please share it manually via WhatsApp.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2076C7] mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

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
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${activeCategory === 'insurance'
                ? 'bg-blue-100 text-[#2076C7]'
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
          onShareToWhatsApp={shareToWhatsApp}
          generatePersonalizedImage={generatePersonalizedImage}
        />
      </div>
    </div>
  );
}