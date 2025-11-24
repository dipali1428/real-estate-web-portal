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

interface TemplateCardProps {
  template: TemplateItem;
  onQuickDownload: (template: TemplateItem) => void;
}

const subCategoryLabels: Record<string, string> = {
  life: 'Life Insurance',
  health: 'Health Insurance',
  motor: 'Motor Insurance',
  home: 'Home Loan',
  business: 'Business Loan',
  lap: 'LAP Loan',
  personal: 'Personal Loan'
};

export default function TemplateCard({ template, onQuickDownload }: TemplateCardProps) {
  const isInsurance = template.category === 'insurance';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group flex flex-col">
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
      </div>
      
      {/* Template Info - Fixed height content area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1 flex-1 pr-2">
            {template.name}
          </h4>
          <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
            isInsurance
              ? 'bg-blue-100 text-[#2076C7]' 
              : 'bg-green-100 text-green-700'
          }`}>
            {subCategoryLabels[template.subCategory]}
          </span>
        </div>
        
        <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2 flex-1">
          {template.description}
        </p>

        {/* Button container - will always be at bottom */}
        <div className="flex space-x-2 mt-auto">
          <button
            onClick={() => onQuickDownload(template)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-white rounded-lg transition-all duration-200 text-xs font-semibold ${
              isInsurance
                ? 'bg-[#2076C7] hover:bg-[#2076C7]'
                : 'bg-[#1CADA3] hover:bg-green-700'
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
  );
}