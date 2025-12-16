// app/admin/leads/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, User, Mail, Phone, MapPin, 
  Calendar, Users, Briefcase, CheckCircle, 
  MoreVertical, Eye, Edit, Trash2, UserPlus,
  Building, Shield, TrendingUp, Home, FileText
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  subCategory: string;
  assignedTo: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  date: string;
  source: string;
  notes: string;
}

interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  department: string;
  expertise: string[];
  currentLeads: number;
  maxLeads: number;
}

interface Department {
  value: string;
  label: string;
  icon: React.ReactNode;
  subCategories: string[];
}

export default function AdminLeadPanel() {
  // Departments with subcategories
  const departments: Department[] = [
    {
      value: 'loans',
      label: 'Loans',
      icon: <FileText className="w-4 h-4" />,
      subCategories: [
        'Home Loan',
        'Personal Loan',
        'Business Loan',
        'Mortgage Loan',
        'SME Loan',
        'Education Loan',
        'NRP Loan',
        'Vehicle Loan',
        'Loan Against Securities'
      ]
    },
    {
      value: 'insurance',
      label: 'Insurance',
      icon: <Shield className="w-4 h-4" />,
      subCategories: [
        'Life Insurance',
        'Health Insurance',
        'Motor Insurance',
        'Travel Insurance',
        'Property Insurance',
        'Cattle Insurance',
        'Marine Insurance'
      ]
    },
    {
      value: 'mutual_funds',
      label: 'Mutual Funds',
      icon: <TrendingUp className="w-4 h-4" />,
      subCategories: [
        'Equity Funds',
        'Debt Funds',
        'Hybrid Funds',
        'Solution Oriented Funds',
        'Other Funds',
        'Index Funds',
        'ETF',
        'Fund of Funds',
        'International Funds'
      ]
    },
    {
      value: 'investments',
      label: 'Investments',
      icon: <Briefcase className="w-4 h-4" />,
      subCategories: [
        'Wealth Management',
        'PMS/AIF',
        'Fixed Deposit',
        'Bonds'
      ]
    },
    {
      value: 'real_estate',
      label: 'Real Estate',
      icon: <Home className="w-4 h-4" />,
      subCategories: ['Residential', 'Commercial', 'Industrial', 'Land', 'REITs']
    },
    {
      value: 'unlisted',
      label: 'Unlisted',
      icon: <Building className="w-4 h-4" />,
      subCategories: [
        'Pre-IPO',
        'Startup Equity',
        'Private Equity',
        'Venture Capital',
        'Angel Investments'
      ]
    }
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Kochi', 'Nagpur', 'Indore', 'Coimbatore'
  ];

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      department: 'loans',
      subCategory: 'Home Loan',
      assignedTo: 'Priya Sharma',
      status: 'contacted',
      date: '2024-01-15',
      source: 'Website',
      notes: 'Looking for home loan for new flat'
    },
    {
      id: '2',
      name: 'Anjali Patel',
      email: 'anjali@example.com',
      phone: '+91 87654 32109',
      city: 'Delhi',
      department: 'insurance',
      subCategory: 'Health Insurance',
      assignedTo: null,
      status: 'new',
      date: '2024-01-16',
      source: 'Referral',
      notes: 'Family health insurance required'
    },
    {
      id: '3',
      name: 'Suresh Menon',
      email: 'suresh@example.com',
      phone: '+91 76543 21098',
      city: 'Bangalore',
      department: 'mutual_funds',
      subCategory: 'Equity Funds',
      assignedTo: 'Amit Verma',
      status: 'qualified',
      date: '2024-01-14',
      source: 'Event',
      notes: 'Interested in long-term equity investment'
    },
    {
      id: '4',
      name: 'Meena Singh',
      email: 'meena@example.com',
      phone: '+91 65432 10987',
      city: 'Hyderabad',
      department: 'investments',
      subCategory: 'Wealth Management',
      assignedTo: null,
      status: 'new',
      date: '2024-01-17',
      source: 'Social Media',
      notes: 'High net worth individual'
    },
    {
      id: '5',
      name: 'Vikram Reddy',
      email: 'vikram@example.com',
      phone: '+91 94321 09876',
      city: 'Chennai',
      department: 'real_estate',
      subCategory: 'Commercial',
      assignedTo: 'Rahul Gupta',
      status: 'converted',
      date: '2024-01-13',
      source: 'Website',
      notes: 'Office space purchase'
    },
    {
      id: '6',
      name: 'Neha Kapoor',
      email: 'neha@example.com',
      phone: '+91 83210 98765',
      city: 'Mumbai',
      department: 'unlisted',
      subCategory: 'Pre-IPO',
      assignedTo: 'Sandeep Malhotra',
      status: 'contacted',
      date: '2024-01-12',
      source: 'Referral',
      notes: 'Interested in pre-IPO opportunities'
    },
    {
      id: '7',
      name: 'Arun Desai',
      email: 'arun@example.com',
      phone: '+91 72109 87654',
      city: 'Delhi',
      department: 'loans',
      subCategory: 'Business Loan',
      assignedTo: null,
      status: 'new',
      date: '2024-01-18',
      source: 'Direct',
      notes: 'Startup funding required'
    },
    {
      id: '8',
      name: 'Priyanka Joshi',
      email: 'priyanka@example.com',
      phone: '+91 61098 76543',
      city: 'Pune',
      department: 'insurance',
      subCategory: 'Motor Insurance',
      assignedTo: null,
      status: 'new',
      date: '2024-01-17',
      source: 'Website',
      notes: 'New car insurance needed'
    }
  ]);

  const [rms, setRms] = useState<RelationshipManager[]>([
    { 
      id: '1', 
      name: 'Priya Sharma', 
      email: 'priya@finance.com', 
      department: 'loans',
      expertise: ['Home Loan', 'Personal Loan', 'Business Loan'],
      currentLeads: 8, 
      maxLeads: 15 
    },
    { 
      id: '2', 
      name: 'Amit Verma', 
      email: 'amit@finance.com', 
      department: 'mutual_funds',
      expertise: ['Equity Funds', 'Debt Funds', 'Hybrid Funds'],
      currentLeads: 12, 
      maxLeads: 15 
    },
    { 
      id: '3', 
      name: 'Rahul Gupta', 
      email: 'rahul@finance.com', 
      department: 'real_estate',
      expertise: ['Residential', 'Commercial'],
      currentLeads: 5, 
      maxLeads: 10 
    },
    { 
      id: '4', 
      name: 'Sandeep Malhotra', 
      email: 'sandeep@finance.com', 
      department: 'unlisted',
      expertise: ['Pre-IPO', 'Private Equity'],
      currentLeads: 3, 
      maxLeads: 8 
    },
    { 
      id: '5', 
      name: 'Anjali Mehta', 
      email: 'anjali@finance.com', 
      department: 'insurance',
      expertise: ['Health Insurance', 'Life Insurance'],
      currentLeads: 6, 
      maxLeads: 12 
    },
    { 
      id: '6', 
      name: 'Rajeev Nair', 
      email: 'rajeev@finance.com', 
      department: 'investments',
      expertise: ['Wealth Management', 'PMS/AIF'],
      currentLeads: 4, 
      maxLeads: 10 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    subCategory: '',
    city: '',
    status: ''
  });
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedRM, setSelectedRM] = useState('');
  const [activeTab, setActiveTab] = useState<'assigned' | 'unassigned'>('unassigned');

  const statuses = ['All', 'new', 'contacted', 'qualified', 'converted'];

  // Get current department's subcategories
  const currentDepartment = departments.find(dept => dept.value === filters.department);
  const availableSubCategories = currentDepartment 
    ? ['All', ...currentDepartment.subCategories]
    : ['All'];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    const matchesDepartment = !filters.department || filters.department === 'All' || lead.department === filters.department;
    const matchesSubCategory = !filters.subCategory || filters.subCategory === 'All' || lead.subCategory === filters.subCategory;
    const matchesCity = !filters.city || filters.city === 'All' || lead.city === filters.city;
    const matchesStatus = !filters.status || filters.status === 'All' || lead.status === filters.status;
    const matchesAssignment = activeTab === 'assigned' ? lead.assignedTo !== null : lead.assignedTo === null;

    return matchesSearch && matchesDepartment && matchesSubCategory && matchesCity && matchesStatus && matchesAssignment;
  });

  const assignedLeads = leads.filter(lead => lead.assignedTo !== null);
  const unassignedLeads = leads.filter(lead => lead.assignedTo === null);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      if (key === 'department' && value !== prev.department) {
        // Reset subcategory when department changes
        return { ...prev, [key]: value, subCategory: '' };
      }
      return { ...prev, [key]: value };
    });
  };

  const getDepartmentLabel = (value: string) => {
    const dept = departments.find(d => d.value === value);
    return dept ? dept.label : value;
  };

  const getDepartmentIcon = (value: string) => {
    const dept = departments.find(d => d.value === value);
    return dept ? dept.icon : <Briefcase className="w-4 h-4" />;
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleBulkAssign = () => {
    if (selectedRM && selectedLeads.length > 0) {
      const rm = rms.find(r => r.id === selectedRM);
      if (rm) {
        const updatedLeads = leads.map(lead => 
          selectedLeads.includes(lead.id) 
            ? { ...lead, assignedTo: rm.name }
            : lead
        );
        setLeads(updatedLeads);
        
        setRms(prev => prev.map(r => 
          r.id === selectedRM 
            ? { ...r, currentLeads: r.currentLeads + selectedLeads.length }
            : r
        ));
        
        setSelectedLeads([]);
        setShowAssignModal(false);
        setSelectedRM('');
      }
    }
  };

  const handleSingleAssign = (leadId: string, rmId: string) => {
    const rm = rms.find(r => r.id === rmId);
    if (rm) {
      const updatedLeads = leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, assignedTo: rm.name }
          : lead
      );
      setLeads(updatedLeads);
      
      setRms(prev => prev.map(r => 
        r.id === rmId 
          ? { ...r, currentLeads: r.currentLeads + 1 }
          : r
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter RMs by department expertise
  const getFilteredRMs = (department: string, subCategory: string = '') => {
    if (!department) return rms;
    
    return rms.filter(rm => {
      const matchesDepartment = rm.department === department;
      const matchesExpertise = !subCategory || rm.expertise.includes(subCategory);
      return matchesDepartment && matchesExpertise;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Lead Panel</h1>
              <p className="text-gray-600 mt-2">Manage and assign leads to relationship managers</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Import Leads
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{leads.length}</p>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Assigned</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{assignedLeads.length}</p>
              </div>
              <div className="bg-green-100 p-2 md:p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unassigned</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{unassignedLeads.length}</p>
              </div>
              <div className="bg-yellow-100 p-2 md:p-3 rounded-lg">
                <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {((leads.filter(l => l.status === 'converted').length / leads.length) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-100 p-2 md:p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('unassigned')}
                className={`px-4 md:px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'unassigned'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Unassigned Leads
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {unassignedLeads.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('assigned')}
                className={`px-4 md:px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'assigned'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Assigned Leads
                <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {assignedLeads.length}
                </span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or phone..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value} className="flex items-center gap-2">
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub-category</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.subCategory}
                    onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                    disabled={!filters.department}
                  >
                    <option value="">All Sub-categories</option>
                    {availableSubCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ department: '', subCategory: '', city: '', status: '' })}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
                
                {filters.department && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {getDepartmentLabel(filters.department)}
                  </span>
                )}
                {filters.subCategory && filters.subCategory !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {filters.subCategory}
                  </span>
                )}
                {filters.city && filters.city !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    {filters.city}
                  </span>
                )}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedLeads.length > 0 && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-blue-50 rounded-lg gap-3">
                <div>
                  <p className="text-blue-800 font-medium">
                    {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                  </p>
                  <p className="text-blue-600 text-sm">
                    {leads.filter(l => selectedLeads.includes(l.id)).map(l => l.name).join(', ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Selected
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads(filteredLeads.map(lead => lead.id));
                        } else {
                          setSelectedLeads([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Details</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleLeadSelect(lead.id)}
                      />
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {lead.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">
                          {getDepartmentIcon(lead.department)}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getDepartmentLabel(lead.department)}
                          </div>
                          <div className="text-sm text-gray-500">{lead.subCategory}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {lead.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      {lead.assignedTo ? (
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{lead.assignedTo}</div>
                            <div className="text-xs text-gray-500">Relationship Manager</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        {!lead.assignedTo ? (
                          <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                            onChange={(e) => handleSingleAssign(lead.id, e.target.value)}
                            value=""
                          >
                            <option value="">Assign to RM</option>
                            {getFilteredRMs(lead.department, lead.subCategory)
                              .filter(rm => rm.currentLeads < rm.maxLeads)
                              .map(rm => (
                                <option key={rm.id} value={rm.id}>
                                  {rm.name} ({rm.currentLeads}/{rm.maxLeads})
                                </option>
                              ))}
                          </select>
                        ) : null}
                        <div className="flex gap-1">
                          <button className="text-blue-600 hover:text-blue-900 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500">No leads found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ department: '', subCategory: '', city: '', status: '' });
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Relationship Managers */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Available Relationship Managers</h2>
            <div className="flex gap-2">
              {departments.map(dept => (
                <button
                  key={dept.value}
                  onClick={() => handleFilterChange('department', dept.value)}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 ${
                    filters.department === dept.value
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept.icon}
                  {dept.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredRMs(filters.department, filters.subCategory).map(rm => (
              <div key={rm.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{rm.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        {getDepartmentIcon(rm.department)}
                        {getDepartmentLabel(rm.department)}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    rm.currentLeads < rm.maxLeads * 0.7
                      ? 'bg-green-100 text-green-800' 
                      : rm.currentLeads < rm.maxLeads * 0.9
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rm.currentLeads}/{rm.maxLeads}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <Mail className="w-3 h-3 inline mr-1" />
                  {rm.email}
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Expertise</div>
                  <div className="flex flex-wrap gap-1">
                    {rm.expertise.map(skill => (
                      <span key={skill} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      rm.currentLeads / rm.maxLeads < 0.7 
                        ? 'bg-green-500' 
                        : rm.currentLeads / rm.maxLeads < 0.9 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(rm.currentLeads / rm.maxLeads) * 100}%` }}
                  ></div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  {rm.currentLeads < rm.maxLeads 
                    ? `${rm.maxLeads - rm.currentLeads} leads available`
                    : 'At full capacity'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Assign {selectedLeads.length} Lead{selectedLeads.length > 1 ? 's' : ''}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Relationship Manager
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedRM}
                  onChange={(e) => setSelectedRM(e.target.value)}
                >
                  <option value="">Choose an RM...</option>
                  {getFilteredRMs(
                    leads.find(l => selectedLeads.includes(l.id))?.department || '',
                    leads.find(l => selectedLeads.includes(l.id))?.subCategory || ''
                  )
                    .filter(rm => rm.currentLeads + selectedLeads.length <= rm.maxLeads)
                    .map(rm => (
                      <option key={rm.id} value={rm.id}>
                        {rm.name} ({getDepartmentLabel(rm.department)}) - {rm.currentLeads}/{rm.maxLeads} leads
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Leads ({selectedLeads.length})
                </label>
                <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                  {leads
                    .filter(lead => selectedLeads.includes(lead.id))
                    .map(lead => (
                      <div key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                          <div className="text-xs text-gray-500">
                            {getDepartmentLabel(lead.department)} - {lead.subCategory}
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedRM('');
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAssign}
                disabled={!selectedRM}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Leads
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}