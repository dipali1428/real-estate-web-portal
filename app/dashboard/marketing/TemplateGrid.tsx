import TemplateCard from './TemplateCard';

interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  // size: string;
  uploadDate: string;
  category: 'insurance' | 'loan';
  subCategory: string;
  description: string;
  imageUrl: string;
}

interface TemplateGridProps {
  templates: TemplateItem[];
  activeSubCategory: string;
  onQuickDownload: (template: TemplateItem) => void;
}

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

export default function TemplateGrid({ templates, activeSubCategory, onQuickDownload }: TemplateGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left">
          {subCategoryLabels[activeSubCategory]} Templates
        </h2>
        <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm text-center">
          {templates.length} templates available
        </span>
      </div>

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onQuickDownload={onQuickDownload}
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
    </div>
  );
}