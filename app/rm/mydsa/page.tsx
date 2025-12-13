// app/rm/dsa/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Define types directly in the file
interface DSA {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalLeads: number;
  convertedLeads: number;
  pendingLeads: number;
  rejectedLeads: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  performanceScore?: number;
}

interface Meeting {
  id: string;
  dsaName: string;
  dsaId: string;
  date: string;
  time: string;
  type: 'performance-review' | 'training' | 'one-on-one' | 'group';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  agenda: string;
  notes?: string;
}

export default function DSAManagementPage() {
  const [activeTab, setActiveTab] = useState<'dsa-list' | 'meetings' | 'lead-status'>('dsa-list');
  const [dsaList, setDsaList] = useState<DSA[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Mock DSA data
    const mockDSA: DSA[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91 9876543210',
        location: 'Delhi',
        totalLeads: 45,
        convertedLeads: 28,
        pendingLeads: 12,
        rejectedLeads: 5,
        status: 'active',
        joinDate: '2023-01-15',
        performanceScore: 85
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        location: 'Mumbai',
        totalLeads: 32,
        convertedLeads: 20,
        pendingLeads: 8,
        rejectedLeads: 4,
        status: 'active',
        joinDate: '2023-03-20',
        performanceScore: 78
      },
      {
        id: '3',
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+91 9876543212',
        location: 'Ahmedabad',
        totalLeads: 28,
        convertedLeads: 15,
        pendingLeads: 10,
        rejectedLeads: 3,
        status: 'pending',
        joinDate: '2023-05-10',
        performanceScore: 65
      },
      {
        id: '4',
        name: 'Sneha Reddy',
        email: 'sneha@example.com',
        phone: '+91 9876543213',
        location: 'Hyderabad',
        totalLeads: 52,
        convertedLeads: 35,
        pendingLeads: 14,
        rejectedLeads: 3,
        status: 'active',
        joinDate: '2022-11-05',
        performanceScore: 92
      }
    ];
    
    // Mock meetings data
    const mockMeetings: Meeting[] = [
      {
        id: '1',
        dsaName: 'Rajesh Kumar',
        dsaId: '1',
        date: '2024-01-20',
        time: '14:30',
        type: 'performance-review',
        status: 'scheduled',
        agenda: 'Monthly performance review and target setting'
      },
      {
        id: '2',
        dsaName: 'Priya Sharma',
        dsaId: '2',
        date: '2024-01-21',
        time: '11:00',
        type: 'one-on-one',
        status: 'scheduled',
        agenda: 'New product training and discussion'
      },
      {
        id: '3',
        dsaName: 'Amit Patel',
        dsaId: '3',
        date: '2024-01-19',
        time: '16:00',
        type: 'training',
        status: 'completed',
        agenda: 'Sales process training session'
      }
    ];
    
    setDsaList(mockDSA);
    setMeetings(mockMeetings);
    setLoading(false);
  };

  // Stats Component
  const DSAStats = () => {
    const totalDSAs = dsaList.length;
    const activeDSAs = dsaList.filter(dsa => dsa.status === 'active').length;
    const totalLeads = dsaList.reduce((sum, dsa) => sum + dsa.totalLeads, 0);
    const convertedLeads = dsaList.reduce((sum, dsa) => sum + dsa.convertedLeads, 0);
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    const stats = [
      { label: 'Total DSAs', value: totalDSAs, icon: '👥', color: 'bg-blue-50 text-blue-600' },
      { label: 'Active DSAs', value: activeDSAs, icon: '✅', color: 'bg-green-50 text-green-600' },
      { label: 'Total Leads', value: totalLeads, icon: '📊', color: 'bg-purple-50 text-purple-600' },
      { label: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, icon: '📈', color: 'bg-orange-50 text-orange-600' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // DSA Table Component
  const DSATable = () => {
    const [expandedDSA, setExpandedDSA] = useState<string | null>(null);

    interface Lead {
      id: string;
      dsaId: string;
      customerName: string;
      productType: string;
      amount: number;
      status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
      createdDate: string;
      closedDate?: string;
    }

    const [dsaLeads, setDsaLeads] = useState<Record<string, Lead[]>>({});

    const toggleExpand = (dsaId: string) => {
      if (expandedDSA === dsaId) {
        setExpandedDSA(null);
      } else {
        setExpandedDSA(dsaId);
        
        // Mock leads data for each DSA
        if (!dsaLeads[dsaId]) {
          const mockLeads: Lead[] = [
            {
              id: '1',
              dsaId: dsaId,
              customerName: 'Amit Sharma',
              productType: 'Personal Loan',
              amount: 500000,
              status: 'closed',
              createdDate: '2024-01-10',
              closedDate: '2024-01-18'
            },
            {
              id: '2',
              dsaId: dsaId,
              customerName: 'Priya Patel',
              productType: 'Home Loan',
              amount: 3500000,
              status: 'negotiation',
              createdDate: '2024-01-12'
            },
            {
              id: '3',
              dsaId: dsaId,
              customerName: 'Rohan Verma',
              productType: 'Business Loan',
              amount: 2000000,
              status: 'qualified',
              createdDate: '2024-01-15'
            },
          ];
          
          setDsaLeads(prev => ({ ...prev, [dsaId]: mockLeads }));
        }
      }
    };

    const getStatusBadgeColor = (status: DSA['status']) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getLeadStatusColor = (status: Lead['status']) => {
      switch (status) {
        case 'closed': return 'bg-green-100 text-green-800';
        case 'lost': return 'bg-red-100 text-red-800';
        case 'new': return 'bg-blue-100 text-blue-800';
        default: return 'bg-yellow-100 text-yellow-800';
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">DSA Directory</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <span>+ Add New DSA</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DSA Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads Summary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dsaList.map((dsa) => (
                <>
                  <tr key={dsa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{dsa.name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span>{dsa.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>{dsa.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span>{dsa.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Leads</p>
                          <p className="font-semibold">{dsa.totalLeads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Converted</p>
                          <p className="font-semibold text-green-600">{dsa.convertedLeads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pending</p>
                          <p className="font-semibold text-yellow-600">{dsa.pendingLeads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rejected</p>
                          <p className="font-semibold text-red-600">{dsa.rejectedLeads}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(dsa.status)}`}>
                        {dsa.status.charAt(0).toUpperCase() + dsa.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(dsa.id)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <span className="text-lg">👁️</span>
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                  
                  {expandedDSA === dsa.id && (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 bg-gray-50">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                                <h4 className="font-semibold text-lg mb-4 text-gray-800">{dsa.name}'s Profile</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500">📅</span>
                                    <div>
                                      <p className="text-sm text-gray-600">Join Date</p>
                                      <p className="font-medium">{dsa.joinDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500">📈</span>
                                    <div>
                                      <p className="text-sm text-gray-600">Performance Score</p>
                                      <p className="font-medium text-green-600">
                                        {dsa.performanceScore || '85'}/100
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500">📍</span>
                                    <div>
                                      <p className="text-sm text-gray-600">Location</p>
                                      <p className="font-medium">{dsa.location}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2">
                              <h4 className="font-semibold text-lg mb-4 text-gray-800">Recent Leads</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead>
                                    <tr>
                                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Customer</th>
                                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product</th>
                                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {dsaLeads[dsa.id]?.map((lead) => (
                                      <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">{lead.customerName}</td>
                                        <td className="px-4 py-3 text-sm">{lead.productType}</td>
                                        <td className="px-4 py-3 text-sm font-medium">
                                          ₹{lead.amount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                          <span className={`px-2 py-1 rounded-full text-xs ${getLeadStatusColor(lead.status)}`}>
                                            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                          {lead.createdDate}
                                        </td>
                                      </tr>
                                    )) || (
                                      <tr>
                                        <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                                          Loading leads...
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Meetings Component
  const DSAMeetings = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [selectedType, setSelectedType] = useState<string>('all');

    const meetingTypes = [
      { id: 'all', label: 'All Meetings' },
      { id: 'scheduled', label: 'Scheduled' },
      { id: 'completed', label: 'Completed' },
    ];

    const filteredMeetings = selectedType === 'all' 
      ? meetings 
      : meetings.filter(m => m.status === selectedType);

    const getMeetingTypeIcon = (type: Meeting['type']) => {
      switch (type) {
        case 'performance-review': return '📊';
        case 'training': return '🎓';
        case 'one-on-one': return '👤';
        case 'group': return '👥';
        default: return '📅';
      }
    };

    const getStatusIcon = (status: Meeting['status']) => {
      switch (status) {
        case 'scheduled': return '⏰';
        case 'completed': return '✅';
        case 'cancelled': return '❌';
        default: return '📅';
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Scheduled Meetings</h2>
          <div className="flex gap-4">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                Calendar View
              </button>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              + Schedule Meeting
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {meetingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === type.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">{getMeetingTypeIcon(meeting.type)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{meeting.dsaName}</h3>
                    <p className="text-sm text-gray-600 capitalize">{meeting.type.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{getStatusIcon(meeting.status)}</span>
                  <span className="text-sm text-gray-600 capitalize">{meeting.status}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📅</span>
                  <span className="text-sm">{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">🕒</span>
                  <span className="text-sm">{meeting.time}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Agenda</p>
                <p className="text-gray-800 text-sm line-clamp-2">{meeting.agenda}</p>
              </div>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-gray-600">📹</span>
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No meetings found</h3>
            <p className="text-gray-500">Schedule your first meeting with a DSA</p>
          </div>
        )}
      </div>
    );
  };

  // Lead Status Component
  const LeadStatusOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');

    const periods = [
      { id: 'weekly', label: 'Weekly' },
      { id: 'monthly', label: 'Monthly' },
      { id: 'quarterly', label: 'Quarterly' },
    ];

    // Calculate overview data
    const overviewData = dsaList.map(dsa => ({
      dsaId: dsa.id,
      dsaName: dsa.name,
      totalLeads: dsa.totalLeads,
      converted: dsa.convertedLeads,
      pending: dsa.pendingLeads,
      rejected: dsa.rejectedLeads,
      conversionRate: dsa.totalLeads > 0 ? (dsa.convertedLeads / dsa.totalLeads) * 100 : 0
    }));

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Lead Status Overview</h2>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`px-4 py-2 text-sm ${
                  selectedPeriod === period.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Leads</p>
                <p className="text-2xl font-bold text-blue-800 mt-2">
                  {overviewData.reduce((sum, item) => sum + item.totalLeads, 0)}
                </p>
              </div>
              <span className="text-3xl text-blue-600">👥</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Converted Leads</p>
                <p className="text-2xl font-bold text-green-800 mt-2">
                  {overviewData.reduce((sum, item) => sum + item.converted, 0)}
                </p>
              </div>
              <span className="text-3xl text-green-600">📈</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending Leads</p>
                <p className="text-2xl font-bold text-yellow-800 mt-2">
                  {overviewData.reduce((sum, item) => sum + item.pending, 0)}
                </p>
              </div>
              <span className="text-3xl text-yellow-600">🎯</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Avg Conversion</p>
                <p className="text-2xl font-bold text-purple-800 mt-2">
                  {overviewData.length > 0 
                    ? `${(overviewData.reduce((sum, item) => sum + item.conversionRate, 0) / overviewData.length).toFixed(1)}%`
                    : '0%'
                  }
                </p>
              </div>
              <span className="text-3xl text-purple-600">📊</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DSA Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Converted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejected</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overviewData.map((item) => (
                <tr key={item.dsaId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.dsaName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold">{item.totalLeads}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(item.converted / item.totalLeads) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-green-600">{item.converted}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-yellow-600">{item.pending}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-red-600">{item.rejected}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`font-semibold mr-2 ${
                        item.conversionRate >= 50 ? 'text-green-600' : 
                        item.conversionRate >= 30 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.conversionRate.toFixed(1)}%
                      </span>
                      <span className={`text-lg ${
                        item.conversionRate >= 50 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {item.conversionRate >= 50 ? '📈' : '📉'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.conversionRate >= 50 ? 'bg-green-100 text-green-800' :
                      item.conversionRate >= 30 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.conversionRate >= 50 ? 'Excellent' : 
                       item.conversionRate >= 30 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My DSAs</h1>
        <p className="text-gray-600 mt-2"></p>
      </div>

      <DSAStats />

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dsa-list')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'dsa-list'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            DSA List
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'meetings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Meetings
          </button>
          <button
            onClick={() => setActiveTab('lead-status')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'lead-status'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Lead Status
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dsa-list' && <DSATable />}
            {activeTab === 'meetings' && <DSAMeetings />}
            {activeTab === 'lead-status' && <LeadStatusOverview />}
          </>
        )}
      </div>
    </div>
  );
}