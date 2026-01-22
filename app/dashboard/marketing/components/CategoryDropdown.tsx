interface CategoryDropdownProps {
  type: 'insurance' | 'loan' | 'contest'; // Added contest
  isOpen: boolean;
  activeCategory: 'insurance' | 'loan' | 'contest'; // Added contest
  activeSubCategory: string;
  onToggle: (type: 'insurance' | 'loan' | 'contest', event: React.MouseEvent) => void;
  onSubCategorySelect: (subCategory: string, event: React.MouseEvent) => void;
}

const subCategoryLabels: Record<string, string> = {
  all: 'All Templates',
  life: 'Life Insurance',
  health: 'Health Insurance',
  motor: 'Motor Insurance',
  home: 'Home Loan',
  business: 'Business Loan',
  lap: 'LAP Loan',
  personal: 'Personal Loan',
  educational: 'Educational Loan',
  current: 'Current Contests', // Added
  upcoming: 'Upcoming Contests', // Added
  closed: 'Closed Contests' // Added
};

export default function CategoryDropdown({
  type,
  isOpen,
  activeCategory,
  activeSubCategory,
  onToggle,
  onSubCategorySelect
}: CategoryDropdownProps) {
  const isActive = activeCategory === type;
  
  // Define colors based on type
  const colorConfig = {
    insurance: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
    loan: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
    contest: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' }
  };

  const currentColors = colorConfig[type];

  const getSubCategories = () => {
    if (type === 'insurance') {
      return ['all', 'life', 'health', 'motor'];
    } else if (type === 'loan') {
      return ['all', 'home', 'business', 'lap', 'personal', 'educational'];
    } else {
      return ['all', 'current', 'upcoming',]; // Contest subcategories
    }
  };

  return (
    <div className="relative dropdown-container">
      <button
        onClick={(e) => onToggle(type, e)}
        className={`flex items-center justify-between w-full sm:w-auto space-x-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-200 font-semibold ${
          isActive 
            ? `${currentColors.bg} ${currentColors.text} border-2 ${currentColors.border} shadow-sm` 
            : 'text-slate-700 hover:text-[#2076C7] hover:bg-slate-50 border-2 border-transparent'
        }`}
      >
        <span className="text-base sm:text-lg capitalize">{type}</span>
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-auto sm:w-64 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-20">
          <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100">
            {type} Types
          </div>
          {getSubCategories().map((subCategory) => (
            <button
              key={subCategory}
              onClick={(e) => onSubCategorySelect(subCategory, e)}
              className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
            >
              <div className="font-medium">{subCategoryLabels[subCategory] || subCategory}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}