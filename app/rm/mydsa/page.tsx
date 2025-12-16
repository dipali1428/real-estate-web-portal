'use client';

import { useState, useEffect } from 'react';
import { RmService } from '@/app/services/rmService';

/* ===================== TYPES ===================== */
interface ReferralLead {
  id: number;
  lead_name: string;
  contact_number: string;
  email: string | null;
  department: string;
  sub_category: string;
  notes: string;
  status: 'pending' | 'contacted' | 'follow_up' | 'converted' | 'lost' | 'rejected';
  created_at: string;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  rm_id: number;
  rm_name: string;
  rm_referral_code: string;
  last_follow_up?: string;
}

interface DSA {
  id: number;
  name: string;
  adv_id: string;
  email: string;
  phone: string;
  city?: string;
  head?: string;
  category?: string;
  total_leads: number;
  converted_leads: number;
  pending_leads: number;
  joined_date: string;
  status: 'active' | 'inactive';
  performance_score?: number;
  last_meeting_date?: string;
}

interface Meeting {
  id: number;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id?: string;
  title: string;
  description: string;
  scheduled_date: string;
  scheduled_time: string;
  duration: number;
  meeting_type: 'virtual' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  platform?: string;
  location?: string;
  meeting_link?: string;
  agenda?: string;
}

/* ===================== HELPER FUNCTIONS ===================== */
const getStatusColor = (status: string): 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'indigo' | 'gray' => {
  const statusLower = status.toLowerCase();
  if (['active', 'converted', 'completed', 'approved'].includes(statusLower)) {
    return 'green';
  }
  if (['pending', 'in-progress', 'follow_up', 'scheduled'].includes(statusLower)) {
    return 'yellow';
  }
  if (['inactive', 'rejected', 'cancelled', 'lost'].includes(statusLower)) {
    return 'red';
  }
  if (['contacted'].includes(statusLower)) {
    return 'blue';
  }
  if (['follow_up'].includes(statusLower)) {
    return 'purple';
  }
  return 'gray';
};

const calculatePerformanceScore = (dsa: DSA): number => {
  if (dsa.total_leads === 0) return 0;
  return Math.round((dsa.converted_leads / dsa.total_leads) * 100);
};

/* ===================== UI COMPONENTS ===================== */
const TabButton = ({ 
  active, 
  onClick, 
  label, 
  count, 
  loading = false 
}: { 
  active: boolean; 
  onClick: () => void; 
  label: string; 
  count: number; 
  loading?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`
      py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
      flex items-center transition-colors
      ${active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }
      ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {label}
    {loading ? (
      <span className="ml-2">
        <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </span>
    ) : (
      <span className={`
        ml-2 py-0.5 px-2 rounded-full text-xs font-medium
        ${active 
          ? 'bg-blue-100 text-blue-600' 
          : 'bg-gray-100 text-gray-600'
        }
      `}>
        {count}
      </span>
    )}
  </button>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children, bold = false, className = '' }: { 
  children: React.ReactNode; 
  bold?: boolean;
  className?: string;
}) => (
  <td className={`
    px-3 py-3 md:px-6 md:py-4 text-sm
    ${bold ? 'font-medium text-gray-900' : 'text-gray-500'}
    ${className}
  `}>
    {children}
  </td>
);

const StatusBadge = ({ status }: { status: string }) => (
  <Badge color={getStatusColor(status)}>
    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
  </Badge>
);

const Badge = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color] || colorMap.gray}`}>
      {children}
    </span>
  );
};

const LoadingSpinner = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
    <p className="text-gray-600">{text}</p>
  </div>
);

const EmptyState = ({ message, actionLabel, onAction }: { message: string; actionLabel?: string; onAction?: () => void }) => (
  <div className="text-center py-12">
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No data</h3>
    <p className="mt-1 text-sm text-gray-500">{message}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

const PerformanceIndicator = ({ score }: { score: number }) => {
  let color = 'text-green-600';
  if (score < 30) color = 'text-red-600';
  else if (score < 70) color = 'text-yellow-600';
  
  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${score < 30 ? 'bg-red-500' : score < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        ></div>
      </div>
      <span className={`ml-2 text-sm font-medium ${color}`}>{score}%</span>
    </div>
  );
};

/* ===================== MAIN COMPONENT ===================== */
export default function ReferralManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'meetings' | 'leads'>('dsa');
  const [dsaList, setDsaList] = useState<DSA[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [loading, setLoading] = useState({
    dsa: true,
    meetings: true,
    leads: true
  });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dsaFilter, setDsaFilter] = useState('all');

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.allSettled([
          fetchDSAList(),
          fetchMeetings(),
          fetchLeads()
        ]);
      } catch (err) {
        console.error('Error in fetchAllData:', err);
        setError('Failed to load dashboard data');
      }
    };

    fetchAllData();
  }, []);

  const fetchLeads = async () => {
    try {
      const leadsRes = await RmService.getReferralLeads();
      if (leadsRes?.success && Array.isArray(leadsRes.leads)) {
        setLeads(leadsRes.leads);
      } else {
        setLeads([]);
      }
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(prev => ({ ...prev, leads: false }));
    }
  };

  const fetchDSAList = async () => {
    try {
      const dsaRes = await RmService.getYourDsaList();
      if (dsaRes?.success && Array.isArray(dsaRes.dsas)) {
        const formattedDSA: DSA[] = dsaRes.dsas.map((d: any) => ({
          id: d.id || 0,
          name: d.name || 'N/A',
          adv_id: d.adv_id || 'N/A',
          email: d.email || 'N/A',
          phone: d.mobile || d.phone || 'N/A',
          city: d.city,
          head: d.head,
          category: d.category,
          total_leads: d.total_leads || 0,
          converted_leads: d.converted_leads || 0,
          pending_leads: d.pending_leads || 0,
          joined_date: d.date_joined || d.joined_date || new Date().toISOString(),
          status: d.status === 'inactive' ? 'inactive' : 'active',
          performance_score: calculatePerformanceScore({
            total_leads: d.total_leads || 0,
            converted_leads: d.converted_leads || 0
          } as DSA),
          last_meeting_date: d.last_meeting_date
        }));
        setDsaList(formattedDSA);
      } else {
        setDsaList([]);
      }
    } catch (err: any) {
      console.error('Error fetching DSA list:', err);
      setError('Failed to load DSA list');
    } finally {
      setLoading(prev => ({ ...prev, dsa: false }));
    }
  };

  const fetchMeetings = async () => {
    try {
      // Mock meetings data for demonstration
      const mockMeetings: Meeting[] = [
        {
          id: 1,
          dsa_id: 101,
          dsa_name: "John Sharma",
          dsa_adv_id: "DSA001",
          title: "Weekly Performance Review",
          description: "Discuss last week's leads and conversion rates",
          scheduled_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          scheduled_time: "10:00",
          duration: 60,
          meeting_type: "virtual",
          status: "scheduled",
          platform: "Zoom",
          meeting_link: "https://zoom.us/j/123456789"
        },
        {
          id: 2,
          dsa_id: 102,
          dsa_name: "Priya Patel",
          dsa_adv_id: "DSA002",
          title: "New Product Training",
          description: "Training on new loan products",
          scheduled_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          scheduled_time: "14:00",
          duration: 90,
          meeting_type: "in-person",
          status: "scheduled",
          location: "Main Branch Conference Room"
        }
      ];
      setMeetings(mockMeetings);
    } catch (err: any) {
      console.error('Error fetching meetings:', err);
      setMeetings([]);
    } finally {
      setLoading(prev => ({ ...prev, meetings: false }));
    }
  };

  // Get unique statuses and DSAs for filters
  const leadStatuses = Array.from(new Set(leads.map(lead => lead.status))).filter(Boolean);
  const dsaOptions = Array.from(new Set(leads.map(lead => lead.dsa_name))).filter(Boolean);

  /* ===================== FILTER LOGIC ===================== */
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' ||
      lead.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_number?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.dsa_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      lead.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesDSA = dsaFilter === 'all' ||
      lead.dsa_name === dsaFilter;

    return matchesSearch && matchesStatus && matchesDSA;
  });

  const filteredMeetings = meetings.filter(meeting =>
    meeting.status === 'scheduled' || meeting.status === 'completed'
  );

  /* ===================== ACTION HANDLERS ===================== */
  const handleUpdateLeadStatus = async (leadId: number, newStatus: ReferralLead['status']) => {
    try {
      // Call API to update lead status
      // await RmService.updateLeadStatus(leadId, newStatus);
      
      // Update local state
      setLeads(leads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
      
      // Show success message
      alert(`Lead status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating lead status:', err);
      alert('Failed to update lead status');
    }
  };

  const handleScheduleMeeting = () => {
    // Implement meeting scheduling logic
    alert('Schedule Meeting functionality coming soon!');
  };

  /* ===================== RENDER FUNCTIONS ===================== */
  const renderDSAList = () => {
    if (loading.dsa) return <LoadingSpinner text="Loading DSA list..." />;
    if (dsaList.length === 0) return <EmptyState message="No DSA found" actionLabel="Add DSA" onAction={() => {}} />;

    return (
      <div>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Total DSAs</p>
            <p className="text-2xl font-bold text-blue-700">{dsaList.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600 font-medium">Active DSAs</p>
            <p className="text-2xl font-bold text-green-700">
              {dsaList.filter(d => d.status === 'active').length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-purple-600 font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-purple-700">
              {dsaList.reduce((sum, d) => sum + d.total_leads, 0)}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-orange-600 font-medium">Avg Conversion</p>
            <p className="text-2xl font-bold text-orange-700">
              {dsaList.length > 0 
                ? Math.round(dsaList.reduce((sum, d) => sum + calculatePerformanceScore(d), 0) / dsaList.length) 
                : 0}%
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>DSA Details</TableHeader>
                <TableHeader>Contact</TableHeader>
                <TableHeader>Performance</TableHeader>
                <TableHeader>Leads Stats</TableHeader>
                <TableHeader>Joined Date</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dsaList.map(dsa => (
                <tr key={dsa.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{dsa.name}</span>
                      <span className="text-xs text-gray-500 mt-1">
                        ADV ID: <span className="font-mono">{dsa.adv_id}</span>
                      </span>
                      <div className="flex gap-2 mt-1">
                        {dsa.city && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {dsa.city}
                          </span>
                        )}
                        {dsa.category && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                            {dsa.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <a href={`tel:${dsa.phone}`} className="text-blue-600 hover:text-blue-800">
                        {dsa.phone}
                      </a>
                      <a href={`mailto:${dsa.email}`} className="text-xs text-gray-500 truncate hover:text-gray-700">
                        {dsa.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PerformanceIndicator score={calculatePerformanceScore(dsa)} />
                    <p className="text-xs text-gray-500 mt-1">
                      {dsa.converted_leads} converted / {dsa.total_leads} total
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium">{dsa.total_leads}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Converted:</span>
                        <span className="font-medium text-green-600">{dsa.converted_leads}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-medium text-yellow-600">{dsa.pending_leads}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dsa.joined_date ? new Date(dsa.joined_date).toLocaleDateString('en-IN') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={dsa.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setActiveTab('meetings')}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                      >
                        Schedule Meeting
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('leads');
                          setDsaFilter(dsa.name);
                        }}
                        className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
                      >
                        View Leads
                      </button>
                    </div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMeetings = () => {
    if (loading.meetings) return <LoadingSpinner text="Loading meetings..." />;
    
    const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');
    const pastMeetings = meetings.filter(m => m.status === 'completed' || m.status === 'cancelled');

    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Meetings</h3>
          <button
            onClick={handleScheduleMeeting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Schedule New Meeting
          </button>
        </div>

        {upcomingMeetings.length === 0 && pastMeetings.length === 0 ? (
          <EmptyState 
            message="No meetings scheduled" 
            actionLabel="Schedule Your First Meeting"
            onAction={handleScheduleMeeting}
          />
        ) : (
          <>
            {/* Upcoming Meetings */}
            {upcomingMeetings.length > 0 && (
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">Upcoming Meetings ({upcomingMeetings.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingMeetings.map(meeting => (
                    <div key={meeting.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900">{meeting.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                        </div>
                        <Badge color={meeting.meeting_type === 'virtual' ? 'blue' : 'green'}>
                          {meeting.meeting_type}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {meeting.dsa_name} ({meeting.dsa_adv_id})
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(meeting.scheduled_date).toLocaleDateString('en-IN')} at {meeting.scheduled_time}
                        </div>
                        {meeting.meeting_type === 'virtual' && meeting.meeting_link && (
                          <a
                            href={meeting.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Join Meeting
                          </a>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="text-sm text-red-600 hover:text-red-800">Cancel</button>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Reschedule</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Past Meetings</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <TableHeader>DSA</TableHeader>
                        <TableHeader>Meeting</TableHeader>
                        <TableHeader>Date & Time</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Status</TableHeader>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pastMeetings.map(meeting => (
                        <tr key={meeting.id}>
                          <TableCell bold>{meeting.dsa_name}</TableCell>
                          <TableCell>{meeting.title}</TableCell>
                          <TableCell>
                            {new Date(meeting.scheduled_date).toLocaleDateString('en-IN')} at {meeting.scheduled_time}
                          </TableCell>
                          <TableCell>
                            <Badge color={meeting.meeting_type === 'virtual' ? 'blue' : 'green'}>
                              {meeting.meeting_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={meeting.status} />
                          </TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderLeads = () => {
    if (loading.leads) return <LoadingSpinner text="Loading leads..." />;
    if (leads.length === 0) return <EmptyState message="No leads found" />;

    const statusCounts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div>
        {/* Stats Summary */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Total Leads</p>
            <p className="text-2xl font-bold text-blue-700">{leads.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600 font-medium">Converted</p>
            <p className="text-2xl font-bold text-green-700">{statusCounts['converted'] || 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <p className="text-sm text-yellow-600 font-medium">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{statusCounts['pending'] || 0}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-purple-600 font-medium">Follow-up Needed</p>
            <p className="text-2xl font-bold text-purple-700">{statusCounts['follow_up'] || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Leads
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by client name, contact, email, or DSA..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {leadStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-48">
              <label htmlFor="dsa-filter" className="block text-sm font-medium text-gray-700 mb-1">
                DSA
              </label>
              <select
                id="dsa-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={dsaFilter}
                onChange={(e) => setDsaFilter(e.target.value)}
              >
                <option value="all">All DSAs</option>
                {dsaOptions.map(dsa => (
                  <option key={dsa} value={dsa}>{dsa}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing {filteredLeads.length} of {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Leads Table */}
        {filteredLeads.length === 0 ? (
          <EmptyState message="No leads match your search criteria" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Client Details</TableHeader>
                  <TableHeader>DSA</TableHeader>
                  <TableHeader>Department</TableHeader>
                  <TableHeader>Sub Category</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Created Date</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{lead.lead_name}</span>
                        <div className="mt-1 space-y-1">
                          {lead.contact_number && (
                            <a href={`tel:${lead.contact_number}`} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {lead.contact_number}
                            </a>
                          )}
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="flex items-center text-xs text-gray-600 hover:text-gray-800 truncate">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {lead.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{lead.dsa_name}</span>
                        <span className="text-xs text-gray-500">ID: {lead.dsa_adv_id}</span>
                        <button
                          onClick={() => window.location.href = `/dsa/${lead.dsa_id}`}
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                        >
                          View Profile
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>{lead.department}</TableCell>
                    <TableCell>{lead.sub_category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <StatusBadge status={lead.status} />
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as ReferralLead['status'])}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="follow_up">Follow-up</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(lead.created_at).toLocaleDateString('en-IN')}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => alert(`Add notes for ${lead.lead_name}`)}
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
                        >
                          Add Notes
                        </button>
                        <button
                          onClick={() => alert(`Schedule follow-up for ${lead.lead_name}`)}
                          className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
                        >
                          Follow-up
                        </button>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  /* ===================== MAIN RENDER ===================== */
  if (error && !loading.dsa && !loading.leads && !loading.meetings) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-red-800 hover:text-red-900 font-medium"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = loading.dsa || loading.leads || loading.meetings;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Referral Management Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Manage your DSAs, meetings, and leads in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4 md:space-x-8 -mb-px overflow-x-auto">
            <TabButton
              active={activeTab === 'dsa'}
              onClick={() => setActiveTab('dsa')}
              label="DSA List"
              count={dsaList.length}
              loading={loading.dsa}
            />
            <TabButton
              active={activeTab === 'meetings'}
              onClick={() => setActiveTab('meetings')}
              label="Meetings"
              count={filteredMeetings.length}
              loading={loading.meetings}
            />
            <TabButton
              active={activeTab === 'leads'}
              onClick={() => setActiveTab('leads')}
              label="Leads"
              count={leads.length}
              loading={loading.leads}
            />
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          {isLoading && activeTab === 'dsa' && loading.dsa ? (
            <LoadingSpinner text="Loading DSA list..." />
          ) : isLoading && activeTab === 'leads' && loading.leads ? (
            <LoadingSpinner text="Loading leads..." />
          ) : isLoading && activeTab === 'meetings' && loading.meetings ? (
            <LoadingSpinner text="Loading meetings..." />
          ) : (
            <>
              {activeTab === 'dsa' && renderDSAList()}
              {activeTab === 'meetings' && renderMeetings()}
              {activeTab === 'leads' && renderLeads()}
            </>
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Data last updated: {new Date().toLocaleString('en-IN')}</p>
          <p className="mt-1">Total DSAs: {dsaList.length} | Total Leads: {leads.length} | Upcoming Meetings: {meetings.filter(m => m.status === 'scheduled').length}</p>
        </div>
      </div>
    </div>
  );
}