'use client';
import { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, CheckCircle, UserCheck, Building, Mail, Phone, ChevronRight } from 'lucide-react';

interface DSA {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'unassigned' | 'assigned';
  assignedRM?: string;
  joinDate: string;
  performanceScore: number;
}

interface RM {
  id: string;
  name: string;
  email: string;
  currentAssignments: number;
  maxCapacity: number;
  department: string;
}

const CATEGORY_MAP: Record<string, string[]> = {
  'Investment': [
    'Mutual Funds', 'Wealth Management', 'Pension Funds', 'Stocks and Securities',
    'Portfolio Management Services', 'Real Estate Investments', 'Unlisted Shares'
  ],
  'Protection': [
    'Life Insurance', 'Health Insurance', 'Motor Insurance', 'Travel Insurance', 'Corporate General Insurance'
  ],
  'Finance': [
    'Home Finance', 'Personal Finance', 'SME Finance', 'EMI Solution',
    'Loan Against Securities', 'Corporate Finance', 'Mortgage Finance',
    'Debt Capital Market & Loan Syndication', 'Asset Reconstruction',
    'Tax Consultancy', 'Education Loan', 'Business Loan'
  ]
};

export default function LeadManagerPage() {
  const [dsas, setDsas] = useState<DSA[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', department: 'Personal Finance', status: 'unassigned', joinDate: '2024-01-15', performanceScore: 85 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', department: 'Home Finance', status: 'unassigned', joinDate: '2024-02-10', performanceScore: 92 },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1234567892', department: 'Mutual Funds', status: 'assigned', assignedRM: 'Sarah Wilson', joinDate: '2024-01-20', performanceScore: 78 },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '+1234567893', department: 'Life Insurance', status: 'unassigned', joinDate: '2024-03-01', performanceScore: 88 },
  ]);

  const [rms, setRms] = useState<RM[]>([
    { id: 'rm1', name: 'Sarah Wilson', email: 'sarah@company.com', currentAssignments: 12, maxCapacity: 20, department: 'All' },
    { id: 'rm2', name: 'David Miller', email: 'david@company.com', currentAssignments: 8, maxCapacity: 20, department: 'Finance' },
    { id: 'rm3', name: 'Lisa Anderson', email: 'lisa@company.com', currentAssignments: 15, maxCapacity: 20, department: 'Home Loans' },
  ]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainDept, setSelectedMainDept] = useState('all');
  const [selectedSubDept, setSelectedSubDept] = useState('all');
  
  // Assignment State
  const [selectedDSA, setSelectedDSA] = useState<DSA | null>(null);
  const [selectedRM, setSelectedRM] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset sub-dept when main dept changes
  useEffect(() => {
    setSelectedSubDept('all');
  }, [selectedMainDept]);

  const filteredDSAs = dsas.filter(dsa => {
    const matchesSearch = dsa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dsa.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if dsa department belongs to the selected main category or specific subcategory
    const matchesMain = selectedMainDept === 'all' || CATEGORY_MAP[selectedMainDept]?.includes(dsa.department);
    const matchesSub = selectedSubDept === 'all' || dsa.department === selectedSubDept;
    
    return matchesSearch && matchesMain && matchesSub;
  });

  const unassignedDSAs = filteredDSAs.filter(dsa => dsa.status === 'unassigned');
  const assignedDSAs = filteredDSAs.filter(dsa => dsa.status === 'assigned');

  const handleAssignRM = () => {
    if (!selectedDSA || !selectedRM) return;
    const rm = rms.find(r => r.id === selectedRM);
    if (!rm || rm.currentAssignments >= rm.maxCapacity) {
      alert('RM has reached maximum capacity');
      return;
    }

    setDsas(dsas.map(d => d.id === selectedDSA.id ? { ...d, status: 'assigned', assignedRM: rm.name } : d));
    setRms(rms.map(r => r.id === selectedRM ? { ...r, currentAssignments: r.currentAssignments + 1 } : r));
    setShowSuccess(true);
    setSelectedDSA(null);
    setSelectedRM('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>RM assigned successfully!</span>
        </div>
      )}

      {/* Modal */}
      {selectedDSA && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Assign Relationship Manager</h3>
            <p className="text-gray-600 mb-6">Assigning RM to <span className="font-semibold">{selectedDSA.name}</span> ({selectedDSA.department})</p>
            <select
              value={selectedRM}
              onChange={(e) => setSelectedRM(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            >
              <option value="">Choose an RM</option>
              {rms.map(rm => (
                <option key={rm.id} value={rm.id}>{rm.name} ({rm.currentAssignments}/{rm.maxCapacity})</option>
              ))}
            </select>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setSelectedDSA(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleAssignRM} disabled={!selectedRM} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">Assign RM</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assign RM's</h1>
          <p className="text-gray-600 mt-2">Manage and assign Relationship Managers to DSAs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total DSAs</p><p className="text-2xl font-bold text-gray-900">{dsas.length}</p></div>
            <div className="p-3 bg-blue-100 rounded-lg"><UserCheck className="w-6 h-6 text-blue-600" /></div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Unassigned</p><p className="text-2xl font-bold text-amber-600">{dsas.filter(d => d.status === 'unassigned').length}</p></div>
            <div className="p-3 bg-amber-100 rounded-lg"><UserPlus className="w-6 h-6 text-amber-600" /></div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Available RMs</p><p className="text-2xl font-bold text-green-600">{rms.length}</p></div>
            <div className="p-3 bg-green-100 rounded-lg"><Building className="w-6 h-6 text-green-600" /></div>
          </div>
          
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search Box */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search DSAs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department Box */}
            <div className="relative">
              <select
                value={selectedMainDept}
                onChange={(e) => setSelectedMainDept(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Departments</option>
                {Object.keys(CATEGORY_MAP).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 rotate-90" />
            </div>

            {/* Subcategory Box */}
            <div className="relative">
              <select
                value={selectedSubDept}
                onChange={(e) => setSelectedSubDept(e.target.value)}
                disabled={selectedMainDept === 'all'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="all">All Subcategories</option>
                {selectedMainDept !== 'all' && CATEGORY_MAP[selectedMainDept].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Unassigned DSAs ({unassignedDSAs.length})</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {unassignedDSAs.length > 0 ? unassignedDSAs.map(dsa => (
                  <div key={dsa.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">{dsa.name[0]}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{dsa.name}</h3>
                            <p className="text-sm text-blue-600 font-medium">{dsa.department}</p>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {dsa.email}</span>
                          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {dsa.phone}</span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedDSA(dsa)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <UserPlus className="w-4 h-4" /> Assign
                      </button>
                    </div>
                  </div>
                )) : <div className="p-8 text-center text-gray-500">No DSAs found matching these filters.</div>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Available RMs</h2>
              {rms.map(rm => (
                <div key={rm.id} className="mb-4 last:mb-0 p-3 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{rm.name}</span>
                    <span className="text-xs font-bold text-blue-600">{rm.currentAssignments}/{rm.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(rm.currentAssignments/rm.maxCapacity)*100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}