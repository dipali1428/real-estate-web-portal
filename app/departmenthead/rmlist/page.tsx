'use client';

import { useState, useEffect, ReactNode } from 'react';
import { Search, Filter, Users, ChevronDown, ChevronUp, Download, BarChart3, Shield, CreditCard, FileText } from 'lucide-react';

// Type definitions
interface LeadDetail {
  date: string;
  customer: string;
  amount: string;
  product: string;
  status: 'Converted' | 'Pending' | 'Rejected';
}

interface RelationshipManager {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: 'Investment' | 'Protection' | 'Finance';
  subcategory: string;
  totalLeads: number;
  convertedLeads: number;
  pendingLeads: number;
  rejectedLeads: number;
  leadDetails: LeadDetail[];
}

interface Category {
  id: number;
  name: string;
  icon: ReactNode;
  color: string;
  subcategories: string[];
}

interface DepartmentStats extends Category {
  rmCount: number;
  totalLeads: number;
  convertedLeads: number;
  conversionRate: string;
}

interface Totals {
  totalLeads: number;
  convertedLeads: number;
  pendingLeads: number;
  rejectedLeads: number;
}

export default function DepartmentHeadPanel() {
  // Categories and Subcategories data
  const categories: Category[] = [
    {
      id: 1,
      name: 'Investment',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'bg-blue-500',
      subcategories: [
        'Mutual Funds',
        'Wealth Management',
        'Pension Funds',
        'Stocks and Securities',
        'Portfolio Management Services',
        'Real Estate Investments',
        'Unlisted Shares'
      ]
    },
    {
      id: 2,
      name: 'Protection',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-green-500',
      subcategories: [
        'Life Insurance',
        'Health Insurance',
        'Motor Insurance',
        'Travel Insurance',
        'Corporate General Insurance'
      ]
    },
    {
      id: 3,
      name: 'Finance',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'bg-purple-500',
      subcategories: [
        'Home Finance',
        'Personal Finance',
        'SME Finance',
        'EMI Solution',
        'Loan Against Securities',
        'Corporate Finance',
        'Mortgage Finance',
        'Debt Capital Market & Loan Syndication',
        'Asset Reconstruction',
        'Tax Consultancy',
        'Education Loan',
        'Business Loan'
      ]
    }
  ];

  // Sample Relationship Managers data
  const [relationshipManagers, setRelationshipManagers] = useState<RelationshipManager[]>([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      phone: '+91 9876543210',
      department: 'Investment',
      subcategory: 'Mutual Funds',
      totalLeads: 56,
      convertedLeads: 18,
      pendingLeads: 25,
      rejectedLeads: 13,
      leadDetails: [
        { date: '2024-01-15', customer: 'Amit Sharma', amount: '₹15,00,000', product: 'Equity Mutual Fund', status: 'Converted' },
        { date: '2024-01-14', customer: 'Priya Singh', amount: '₹8,50,000', product: 'Debt Mutual Fund', status: 'Pending' },
        { date: '2024-01-13', customer: 'Rohan Verma', amount: '₹25,00,000', product: 'Hybrid Mutual Fund', status: 'Rejected' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      phone: '+91 9876543211',
      department: 'Protection',
      subcategory: 'Health Insurance',
      totalLeads: 42,
      convertedLeads: 22,
      pendingLeads: 15,
      rejectedLeads: 5,
      leadDetails: [
        { date: '2024-01-16', customer: 'Sunil Mehta', amount: '₹85,000', product: 'Family Health Plan', status: 'Converted' },
        { date: '2024-01-15', customer: 'Neha Gupta', amount: '₹45,000', product: 'Individual Health Plan', status: 'Pending' }
      ]
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@company.com',
      phone: '+91 9876543212',
      department: 'Finance',
      subcategory: 'Home Finance',
      totalLeads: 38,
      convertedLeads: 15,
      pendingLeads: 18,
      rejectedLeads: 5,
      leadDetails: [
        { date: '2024-01-17', customer: 'Suresh Nair', amount: '₹75,00,000', product: 'Home Loan', status: 'Converted' },
        { date: '2024-01-16', customer: 'Ravi Deshmukh', amount: '₹50,00,000', product: 'Home Loan', status: 'Pending' }
      ]
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@company.com',
      phone: '+91 9876543213',
      department: 'Investment',
      subcategory: 'Wealth Management',
      totalLeads: 65,
      convertedLeads: 28,
      pendingLeads: 30,
      rejectedLeads: 7,
      leadDetails: [
        { date: '2024-01-18', customer: 'Kiran Desai', amount: '₹2,50,00,000', product: 'Wealth Portfolio', status: 'Converted' },
        { date: '2024-01-17', customer: 'Raj Malhotra', amount: '₹1,50,00,000', product: 'Wealth Portfolio', status: 'Pending' }
      ]
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@company.com',
      phone: '+91 9876543214',
      department: 'Finance',
      subcategory: 'Business Loan',
      totalLeads: 47,
      convertedLeads: 20,
      pendingLeads: 22,
      rejectedLeads: 5,
      leadDetails: [
        { date: '2024-01-19', customer: 'Tech Solutions Pvt Ltd', amount: '₹1,50,00,000', product: 'Business Loan', status: 'Converted' },
        { date: '2024-01-18', customer: 'Startup Innovations', amount: '₹75,00,000', product: 'Business Loan', status: 'Pending' }
      ]
    },
    {
      id: 6,
      name: 'Anjali Mehta',
      email: 'anjali.mehta@company.com',
      phone: '+91 9876543215',
      department: 'Protection',
      subcategory: 'Life Insurance',
      totalLeads: 39,
      convertedLeads: 16,
      pendingLeads: 18,
      rejectedLeads: 5,
      leadDetails: [
        { date: '2024-01-20', customer: 'Sanjay Verma', amount: '₹1,20,000', product: 'Term Life Insurance', status: 'Converted' },
        { date: '2024-01-19', customer: 'Preeti Joshi', amount: '₹95,000', product: 'Whole Life Insurance', status: 'Pending' }
      ]
    },
    {
      id: 7,
      name: 'Rahul Joshi',
      email: 'rahul.joshi@company.com',
      phone: '+91 9876543216',
      department: 'Investment',
      subcategory: 'Stocks and Securities',
      totalLeads: 52,
      convertedLeads: 25,
      pendingLeads: 20,
      rejectedLeads: 7,
      leadDetails: [
        { date: '2024-01-21', customer: 'Corporate Holdings', amount: '₹3,00,00,000', product: 'Equity Investment', status: 'Converted' },
        { date: '2024-01-20', customer: 'Investment Group', amount: '₹2,00,00,000', product: 'Bond Investment', status: 'Pending' }
      ]
    },
    {
      id: 8,
      name: 'Meera Nair',
      email: 'meera.nair@company.com',
      phone: '+91 9876543217',
      department: 'Finance',
      subcategory: 'Personal Finance',
      totalLeads: 44,
      convertedLeads: 18,
      pendingLeads: 21,
      rejectedLeads: 5,
      leadDetails: [
        { date: '2024-01-22', customer: 'Arun Kumar', amount: '₹15,00,000', product: 'Personal Loan', status: 'Converted' },
        { date: '2024-01-21', customer: 'Swati Rao', amount: '₹8,00,000', product: 'Personal Loan', status: 'Pending' }
      ]
    }
  ]);

  // State variables with proper typing
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [expandedRM, setExpandedRM] = useState<number | null>(null);
  const [filteredManagers, setFilteredManagers] = useState<RelationshipManager[]>(relationshipManagers);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>('all');

  // Get available subcategories based on selected department
  const availableSubcategories = selectedDepartment === 'All' 
    ? ['All']
    : ['All', ...(categories.find(cat => cat.name === selectedDepartment)?.subcategories || [])];

  // Filter RMs based on search, department, and subcategory
  useEffect(() => {
    let filtered = [...relationshipManagers];

    if (searchTerm) {
      filtered = filtered.filter(rm =>
        rm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rm.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rm.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(rm => rm.department === selectedDepartment);
    }

    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter(rm => rm.subcategory === selectedSubcategory);
    }

    // Date range filter (simplified for demo)
    if (dateRange !== 'all') {
      // In real implementation, you would filter by actual dates
      // This is just for demonstration
      filtered = filtered.slice(0, Math.max(3, Math.floor(filtered.length / 2)));
    }

    setFilteredManagers(filtered);
  }, [searchTerm, selectedDepartment, selectedSubcategory, dateRange, relationshipManagers]);

  // Toggle RM details with proper typing
  const toggleRMDetails = (rmId: number): void => {
    setExpandedRM(expandedRM === rmId ? null : rmId);
  };

  // Calculate totals with proper return type
  const calculateTotals = (): Totals => {
    return filteredManagers.reduce((acc: Totals, rm: RelationshipManager) => ({
      totalLeads: acc.totalLeads + rm.totalLeads,
      convertedLeads: acc.convertedLeads + rm.convertedLeads,
      pendingLeads: acc.pendingLeads + rm.pendingLeads,
      rejectedLeads: acc.rejectedLeads + rm.rejectedLeads
    }), { totalLeads: 0, convertedLeads: 0, pendingLeads: 0, rejectedLeads: 0 });
  };

  const totals: Totals = calculateTotals();

  // Export data function
  const exportToCSV = (): void => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Department', 'Subcategory', 'Total Leads', 'Converted', 'Pending', 'Rejected', 'Conversion Rate'],
      ...filteredManagers.map((rm: RelationshipManager) => [
        rm.name,
        rm.email,
        rm.phone,
        rm.department,
        rm.subcategory,
        rm.totalLeads.toString(),
        rm.convertedLeads.toString(),
        rm.pendingLeads.toString(),
        rm.rejectedLeads.toString(),
        `${((rm.convertedLeads / rm.totalLeads) * 100).toFixed(1)}%`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relationship_managers_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Department-wise statistics with proper typing
  const departmentStats: DepartmentStats[] = categories.map((category: Category) => {
    const deptRMs: RelationshipManager[] = relationshipManagers.filter((rm: RelationshipManager) => rm.department === category.name);
    const deptTotals = deptRMs.reduce((acc, rm: RelationshipManager) => ({
      totalLeads: acc.totalLeads + rm.totalLeads,
      convertedLeads: acc.convertedLeads + rm.convertedLeads
    }), { totalLeads: 0, convertedLeads: 0 });

    return {
      ...category,
      rmCount: deptRMs.length,
      totalLeads: deptTotals.totalLeads,
      convertedLeads: deptTotals.convertedLeads,
      conversionRate: deptTotals.totalLeads > 0 ? (deptTotals.convertedLeads / deptTotals.totalLeads * 100).toFixed(1) : '0'
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All RM's List</h1>
            <p className="text-gray-600 mt-2">Manage and monitor Relationship Managers</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>Last Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>
 {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6 transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total RMs</p>
              <p className="text-2xl font-bold text-gray-800">{filteredManagers.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total DSA Leads</p>
              <p className="text-2xl font-bold text-gray-800">{totals.totalLeads}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <div className="h-6 w-6 text-green-600 text-xl font-bold">✓</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Converted Leads</p>
              <p className="text-2xl font-bold text-green-600">{totals.convertedLeads}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <div className="h-6 w-6 text-green-600 text-xl font-bold">↑</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overall Conversion</p>
              <p className="text-2xl font-bold text-purple-600">
                {totals.totalLeads > 0 ? ((totals.convertedLeads / totals.totalLeads) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <div className="h-6 w-6 text-purple-600 text-xl font-bold">%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search RMs, email, department, or subcategory..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Range Filter */}
          <div className="w-full lg:w-auto">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={dateRange}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          {/* Filter Button for Mobile */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            <Filter className="h-5 w-5" />
            Filters
            {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition shadow hover:shadow-lg"
          >
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </div>

        {/* Filters - Visible on desktop, toggleable on mobile */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block mt-6 lg:mt-4`}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Department Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={selectedDepartment}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedSubcategory('All');
                }}
              >
                <option value="All">All Departments</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={selectedSubcategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubcategory(e.target.value)}
                disabled={selectedDepartment === 'All'}
              >
                {availableSubcategories.map((subcat: string, index: number) => (
                  <option key={index} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedDepartment('All');
                  setSelectedSubcategory('All');
                  setSearchTerm('');
                  setDateRange('all');
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition w-full"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Relationship Managers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Relationship Managers Performance</h2>
            <div className="text-sm text-gray-500">
              Showing <span className="font-semibold">{filteredManagers.length}</span> of <span className="font-semibold">{relationshipManagers.length}</span> RMs
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Relationship Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DSA Leads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Converted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rejected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredManagers.length > 0 ? (
                filteredManagers.map((rm: RelationshipManager) => (
                  <>
                    <tr key={rm.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="font-semibold text-blue-600">
                                {rm.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{rm.name}</p>
                              <p className="text-sm text-gray-500">{rm.email}</p>
                              <p className="text-xs text-gray-400">{rm.phone}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          rm.department === 'Investment' ? 'bg-blue-100 text-blue-800' :
                          rm.department === 'Protection' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {rm.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {rm.subcategory}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="font-bold text-gray-900 text-lg">{rm.totalLeads}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-green-600">{rm.convertedLeads}</span>
                          <span className="text-xs text-gray-500">
                            {((rm.convertedLeads / rm.totalLeads) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-yellow-600">{rm.pendingLeads}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-red-600">{rm.rejectedLeads}</span>
                      </td>
                      <td className="px-6 py-4">
                       <button
                          onClick={() => toggleRMDetails(rm.id)}
                          className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-md transition-all shadow-sm"
                        >
                          <span>{expandedRM === rm.id ? 'Hide' : 'View'}</span>
                          {expandedRM === rm.id ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {/* Expanded Row with Lead Details */}
                    {expandedRM === rm.id && (
                      <tr className="bg-gradient-to-r from-blue-50 to-white">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900">DSA Lead Details - {rm.name}</h4>
                              <div className="text-sm text-gray-500">
                                Total Leads Value: ₹{rm.leadDetails.reduce((acc: number, lead: LeadDetail) => {
                                  const value = parseInt(lead.amount.replace(/[^0-9]/g, ''));
                                  return acc + (isNaN(value) ? 0 : value);
                                }, 0).toLocaleString('en-IN')}
                              </div>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rm.leadDetails.map((lead: LeadDetail, index: number) => (
                                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                      <td className="px-4 py-3 text-sm">{lead.date}</td>
                                      <td className="px-4 py-3 text-sm font-medium">{lead.customer}</td>
                                      <td className="px-4 py-3 text-sm text-gray-600">{lead.product}</td>
                                      <td className="px-4 py-3 text-sm font-medium">{lead.amount}</td>
                                      <td className="px-4 py-3">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                          lead.status === 'Converted'
                                            ? 'bg-green-100 text-green-800'
                                            : lead.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                          {lead.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Search className="h-12 w-12 mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No relationship managers found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}