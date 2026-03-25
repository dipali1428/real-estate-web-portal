import TemplateCard from './TemplateCard';

interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  category: 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate' | 'contest'; // Added contest
  subCategory: string;
  description: string;
  imageUrl: string;
}

interface TemplateGridProps {
  templates: TemplateItem[];
  activeSubCategory: string;
  onQuickDownload: (template: TemplateItem) => void;
  onShareToWhatsApp: (template: TemplateItem, imageBlob: Blob) => void;
  generatePersonalizedImage: (template: TemplateItem) => Promise<Blob>;
}

const subCategoryLabels: Record<string, string> = {
  all: 'All',
  life: 'Life Insurance',
  health: 'Health Insurance',
  motor: 'Motor Insurance',
  home: 'Home Loan',
  business: 'Business Loan',
  lap: 'LAP Loan',
  personal: 'Personal Loan',
  educational: 'Educational Loan',
  current: 'Current Contest', // Added
  upcoming: 'Upcoming Contest', // Added
  closed: 'Closed Contest' // Added
};

export default function TemplateGrid({ 
  templates, 
  activeSubCategory, 
  onQuickDownload, 
  onShareToWhatsApp,
  generatePersonalizedImage 
}: TemplateGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">
          {subCategoryLabels[activeSubCategory] || activeSubCategory} Templates
        </h2>
        <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm text-center">
          {templates.length} template{templates.length !== 1 ? 's' : ''} available
        </span>
      </div>

      {templates.length > 0 ? (
        <div className={`custom-template-grid gap-4 sm:gap-6`}>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onQuickDownload={onQuickDownload}
              onShareToWhatsApp={onShareToWhatsApp}
              generatePersonalizedImage={generatePersonalizedImage}
            />
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

      <style jsx>{`
        .custom-template-grid { display: grid; width: 100%; }
        @media (min-width: 460px) { .custom-template-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1160px) { .custom-template-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  );
}