'use client';

import { useState } from 'react';

interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  category: 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate' | 'contest'; // Added contest
  subCategory: string;
  description: string;
  imageUrl: string;
}

interface TemplateCardProps {
  template: TemplateItem;
  onQuickDownload: (template: TemplateItem) => void;
  onShareToWhatsApp: (template: TemplateItem, imageBlob: Blob) => void;
  generatePersonalizedImage: (template: TemplateItem) => Promise<Blob>;
}

const subCategoryLabels: Record<string, string> = {
  life: 'Life Insurance',
  health: 'Health Insurance',
  motor: 'Motor Insurance',
  home: 'Home Loan',
  business: 'Business Loan',
  lap: 'LAP Loan',
  personal: 'Personal Loan',
  educational: 'Educational Loan',
  current: 'Current Contest',
  upcoming: 'Upcoming Contest',
  closed: 'Closed Contest'
};

export default function TemplateCard({ template, onQuickDownload, onShareToWhatsApp, generatePersonalizedImage }: TemplateCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Determine badge styles
  const getBadgeStyle = () => {
    if (template.category === 'insurance') return 'bg-blue-100 text-[#2076C7]';
    if (template.category === 'loan') return 'bg-green-100 text-green-700';
    return 'bg-purple-100 text-purple-700'; // Contest
  };

  const handleWhatsAppShare = async () => {
    setIsGenerating(true);
    try {
      const imageBlob = await generatePersonalizedImage(template);
      onShareToWhatsApp(template, imageBlob);
    } catch (error) {
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await onQuickDownload(template);
    } catch (error) {
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group flex flex-col">
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
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500"><p class="text-sm">Template Image</p></div>`;
            }
          }}
        />
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-base sm:text-lg font-semibold text-slate-900 flex-1 pr-2">
            {template.name}
          </h4>
          <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${getBadgeStyle()}`}>
            {subCategoryLabels[template.subCategory] || template.subCategory}
          </span>
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed flex-1">
          {template.description}
        </p>

        <div className="flex space-x-2 mt-auto">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-white rounded-lg transition-all duration-200 text-xs font-semibold ${
              isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#2076C7] hover:bg-[#1a5e9a]'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleWhatsAppShare}
            disabled={isGenerating}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-semibold ${
              isGenerating ? 'bg-slate-300 text-slate-500' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
                </svg>
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}