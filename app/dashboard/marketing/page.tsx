'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryDropdown from './components/CategoryDropdown';
import TemplateGrid from './components/TemplateGrid';
import { DashboardService } from "@/app/services/dashboardService";
import toast from 'react-hot-toast';

// Types
interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  category: 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate' | 'contest';
  subCategory: string;
  description: string;
  imageUrl: string; // This will store the Pre-signed S3 URL
}

interface UserProfile {
  name: string;
  contactNumber: string;
}

export default function ImageTemplates() {
  const [activeCategory, setActiveCategory] = useState<'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate' | 'contest'>('insurance');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [allTemplates, setAllTemplates] = useState<TemplateItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', contactNumber: '' });

  const [dropdowns, setDropdowns] = useState({
    insurance: false, loan: false, investments: false, mutualfunds: false, realestate: false, contest: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, campaignsRes] = await Promise.allSettled([
          DashboardService.getProfile(),
          DashboardService.getCampaigns()
        ]);

        if (profileRes.status === 'fulfilled') {
          const user = profileRes.value.user;
          setUserProfile({
            name: user.name.split(' ').map((n: string) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' '),
            contactNumber: user.mobile || 'Not provided'
          });
        }

        if (campaignsRes.status === 'fulfilled') {
          const rawData = Array.isArray(campaignsRes.value) ? campaignsRes.value : [];
          const mapped: TemplateItem[] = rawData.map((item: any) => ({
            id: item.id.toString(),
            name: item.template_name || 'Untitled',
            type: 'image' as const,
            category: (item.category?.toLowerCase() || 'insurance') as any,
            subCategory: (item.sub_category?.toLowerCase() || 'all').replace(' insurance', '').replace(' loan', '').trim(),
            description: item.description || '',
            imageUrl: item.image_url, // Using the S3 Pre-signed URL here
          }));
          setAllTemplates(mapped);
        }
      } catch (error) {
        toast.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generatePersonalizedImage = async (template: TemplateItem): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        // 1. Fetch the image directly from the S3 Signed URL
        // We use fetch() to get a Blob to bypass Canvas CORS 'tainting'
        const cacheBustedUrl = `${template.imageUrl}${template.imageUrl.includes('?') ? '&' : '?'}_=${Date.now()}`;
        const response = await fetch(cacheBustedUrl, {
          mode: 'cors',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch image from S3. Status: ${response.status}`);
        }

        const imageBlob = await response.blob();
        const objectUrl = URL.createObjectURL(imageBlob);

        const img = new Image();
        img.crossOrigin = "anonymous"; // Important for security

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error("Canvas failure"));

          // Calculate Dynamic Font and Spacing
          const fontSize = Math.max(24, Math.min(64, img.width / 30));
          const textAreaHeight = fontSize * 3.5;
          canvas.width = img.width;
          canvas.height = img.height + textAreaHeight;

          // Background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Template Image
          ctx.drawImage(img, 0, 0);

          // User details at the bottom
          ctx.fillStyle = '#1e293b';
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const infoText = `${userProfile.name}  |  ${userProfile.contactNumber}`;
          ctx.fillText(infoText, canvas.width / 2, img.height + (textAreaHeight / 2));

          URL.revokeObjectURL(objectUrl);
          canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Blob conversion failed")), 'image/png');
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("Could not load image file."));
        };

        img.src = objectUrl;
      } catch (err: any) {
        toast.error("Failed to generate personalized image.");
        reject(new Error("Error accessing the image URL. Please check S3 CORS settings."));
      }
    });
  };

  const quickDownload = async (template: TemplateItem) => {
    try {
      const blob = await generatePersonalizedImage(template);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e: any) {
    }
  };

  const shareToWhatsApp = async (template: TemplateItem, blob: Blob) => {
    try {
      const file = new File([blob], 'image.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        quickDownload(template);
      }
    } catch (e) {
      quickDownload(template);
    }
  };

  // UI Helper
  const filteredTemplates = allTemplates.filter(t =>
    t.category === activeCategory && (activeSubCategory === 'all' || t.subCategory === activeSubCategory)
  );

  const handleDropdownToggle = (type: keyof typeof dropdowns, event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdowns({ insurance: false, loan: false, investments: false, mutualfunds: false, realestate: false, contest: false, [type]: !dropdowns[type] });
    setActiveCategory(type as any);
    setActiveSubCategory('all');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header userProfile={userProfile} />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex flex-wrap gap-4">
            {(['insurance', 'loan', 'investments', 'mutualfunds', 'realestate', 'contest'] as const).map((cat) => (
              <CategoryDropdown
                key={cat}
                type={cat}
                isOpen={dropdowns[cat]}
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                subCategories={cat === 'insurance' ? ['all', 'life', 'health', 'motor', 'marine', 'general'] : cat === 'loan' ? ['all', 'home', 'personal', 'business', 'educational', 'vehicle'] : ['all', cat]}
                onToggle={(type, e) => handleDropdownToggle(type as any, e)}
                onSubCategorySelect={(sub, e) => { e.stopPropagation(); setActiveSubCategory(sub); setDropdowns({ ...dropdowns, [cat]: false }); }}
              />
            ))}
          </div>
          <div className="mt-4 text-sm font-medium text-slate-600">
            Showing: <span className="capitalize px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{activeCategory} - {activeSubCategory}</span>
          </div>
        </div>

        {filteredTemplates.length > 0 ? (
          <TemplateGrid
            templates={filteredTemplates}
            activeSubCategory={activeSubCategory}
            onQuickDownload={quickDownload}
            onShareToWhatsApp={shareToWhatsApp}
            generatePersonalizedImage={generatePersonalizedImage}
          />
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
            No templates available.
          </div>
        )}
      </div>
    </div>
  );
}