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
  pan_number?: string;
  city?: string;
}
interface DSA {
  id: number;
  name: string;
  adv_id: string;
  email: string;
  phone: string;
  mobile: string;
  city?: string;
  head?: string;
  category?: string;
  pan_number?: string;
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
  title: string;
  description: string;
  meeting_date: string;
  meeting_time: string;
  duration: number;
  meeting_type: 'in-person' | 'virtual' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled' | 'postponed';
  location?: string;
  virtual_link?: string;
  attendees: string[];
  dsa_id: number;
  dsa_name: string;
  rm_id: number;
  rm_name: string;
  agenda_items: string[];
  notes?: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}
/* ===================== CATEGORIES & SUBCATEGORIES ===================== */
const CATEGORIES = {
  Finance: [
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
  ],
  Protection: [
    'Life Insurance',
    'Health Insurance',
    'Motor Insurance',
    'Travel Insurance',
    'Corporate General Insurance'
  ],
  Investments: [
    'Mutual Funds',
    'Wealth Management',
    'Pension Funds',
    'Stocks and Securities',
    'Portfolio Management Services',
    'Real Estate Investments',
    'Unlisted Shares'
  ]
};
const CATEGORY_COLORS: Record<string, string> = {
  'Finance': 'bg-blue-100 text-blue-800 border-blue-200',
  'Protection': 'bg-green-100 text-green-800 border-green-200',
  'Investments': 'bg-purple-100 text-purple-800 border-purple-200'
};
const MEETING_TYPE_COLORS: Record<string, string> = {
  'in-person': 'bg-blue-100 text-blue-800',
  'virtual': 'bg-purple-100 text-purple-800',
  'phone': 'bg-green-100 text-green-800'
};
const MEETING_STATUS_COLORS: Record<string, string> = {
  'scheduled': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'postponed': 'bg-gray-100 text-gray-800'
};
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

const getCategoryColor = (category: string): string => {
  return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const formatTime = (timeString: string): string => {
  return timeString; // Assuming time is already in proper format
};

const getUpcomingMeetings = (meetings: Meeting[]): Meeting[] => {
  const now = new Date();
  return meetings
    .filter(meeting => meeting.status === 'scheduled')
    .sort((a, b) => {
      const dateA = new Date(`${a.meeting_date}T${a.meeting_time}`);
      const dateB = new Date(`${b.meeting_date}T${b.meeting_time}`);
      return dateA.getTime() - dateB.getTime();
    });
};

const getPastMeetings = (meetings: Meeting[]): Meeting[] => {
  const now = new Date();
  return meetings
    .filter(meeting => meeting.status === 'completed')
    .sort((a, b) => {
      const dateA = new Date(`${a.meeting_date}T${a.meeting_time}`);
      const dateB = new Date(`${b.meeting_date}T${b.meeting_time}`);
      return dateB.getTime() - dateA.getTime();
    });
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

const CategoryBadge = ({ category }: { category: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
    {category}
  </span>
);

const SubCategoryBadge = ({ subCategory, category }: { subCategory: string; category: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${getCategoryColor(category)}`}>
    {subCategory}
  </span>
);

const MeetingTypeBadge = ({ type }: { type: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${MEETING_TYPE_COLORS[type] || 'bg-gray-100 text-gray-800'}`}>
    {type.charAt(0).toUpperCase() + type.slice(1)}
  </span>
);

const MeetingStatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${MEETING_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
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

const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
  const meetingDateTime = new Date(`${meeting.meeting_date}T${meeting.meeting_time}`);
  const isToday = new Date().toDateString() === meetingDateTime.toDateString();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{meeting.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <MeetingTypeBadge type={meeting.meeting_type} />
            <MeetingStatusBadge status={meeting.status} />
            {isToday && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Today
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {formatDate(meeting.meeting_date)}
          </div>
          <div className="text-sm text-gray-500">
            {formatTime(meeting.meeting_time)} • {meeting.duration} min
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 line-clamp-2">{meeting.description}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">{meeting.dsa_name}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {meeting.meeting_type === 'virtual' && meeting.virtual_link && (
            <a
              href={meeting.virtual_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
            >
              Join
            </a>
          )}
          {meeting.follow_up_required && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-yellow-100 text-yellow-800">
              Follow-up
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===================== MAIN COMPONENT ===================== */
export default function ReferralManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'leads' | 'meetings'>('dsa');
  const [dsaList, setDsaList] = useState<DSA[]>([]);
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState({
    dsa: true,
    leads: true,
    meetings: true
  });
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [meetingTypeFilter, setMeetingTypeFilter] = useState('all');
  const [meetingStatusFilter, setMeetingStatusFilter] = useState('all');
  const [meetingView, setMeetingView] = useState<'upcoming' | 'past'>('upcoming');

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.allSettled([
          fetchDSAList(),
          fetchLeads(),
          fetchMeetings()
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
        const formattedLeads = leadsRes.leads.map((lead: any) => ({
          ...lead,
          department: lead.department || getCategoryFromSubCategory(lead.sub_category),
          sub_category: lead.sub_category || 'Other'
        }));
        setLeads(formattedLeads);
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
          phone: d.phone || 'N/A',
          mobile: d.mobile || d.phone || 'N/A',
          city: d.city,
          head: d.head,
          category: d.category,
          pan_number: d.pan_number,
          total_leads: d.total_leads || 0,
          converted_leads: d.converted_leads || 0,
          pending_leads: d.pending_leads || 0,
          joined_date: d.date_joined || d.joined_date || new Date().toISOString(),
          status: d.status === 'inactive' ? 'inactive' : 'active',
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
      // This would be your actual API call
      // const meetingsRes = await RmService.getMeetings();
      // For now, using mock data
      const mockMeetings: Meeting[] = [
        {
          id: 1,
          title: 'Monthly Performance Review',
          description: 'Review monthly performance and discuss new leads',
          meeting_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          meeting_time: '10:30',
          duration: 60,
          meeting_type: 'virtual',
          status: 'scheduled',
          virtual_link: 'https://meet.google.com/abc-defg-hij',
          attendees: ['John Doe', 'Jane Smith'],
          dsa_id: 101,
          dsa_name: 'Rajesh Kumar',
          rm_id: 201,
          rm_name: 'Amit Sharma',
          agenda_items: ['Performance Review', 'New Leads Discussion', 'Target Setting'],
          notes: '',
          follow_up_required: true,
          follow_up_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Product Training Session',
          description: 'Training on new investment products',
          meeting_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          meeting_time: '14:00',
          duration: 90,
          meeting_type: 'in-person',
          status: 'scheduled',
          location: 'Office Conference Room',
          attendees: ['Rajesh Kumar', 'Amit Sharma', 'Training Team'],
          dsa_id: 102,
          dsa_name: 'Priya Singh',
          rm_id: 201,
          rm_name: 'Amit Sharma',
          agenda_items: ['Product Overview', 'Sales Pitch Practice', 'Q&A Session'],
          notes: 'Bring laptop and product brochures',
          follow_up_required: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Weekly Catch-up',
          description: 'Weekly progress update and issue resolution',
          meeting_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          meeting_time: '11:00',
          duration: 30,
          meeting_type: 'phone',
          status: 'completed',
          attendees: ['Sanjay Verma'],
          dsa_id: 103,
          dsa_name: 'Sanjay Verma',
          rm_id: 201,
          rm_name: 'Amit Sharma',
          agenda_items: ['Progress Update', 'Issue Discussion', 'Action Items'],
          notes: 'Client follow-up needed for pending loan approval',
          follow_up_required: true,
          follow_up_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setMeetings(mockMeetings);
    } catch (err: any) {
      console.error('Error fetching meetings:', err);
      setError('Failed to load meetings');
    } finally {
      setLoading(prev => ({ ...prev, meetings: false }));
    }
  };

  // Helper function to infer category from sub-category
  const getCategoryFromSubCategory = (subCategory: string): string => {
    const subCatLower = subCategory?.toLowerCase() || '';
    
    if (CATEGORIES.Finance.some(sc => subCatLower.includes(sc.toLowerCase().replace(/[^a-z]/g, '')))) {
      return 'Finance';
    }
    if (CATEGORIES.Protection.some(sc => subCatLower.includes(sc.toLowerCase().replace(/[^a-z]/g, '')))) {
      return 'Protection';
    }
    if (CATEGORIES.Investments.some(sc => subCatLower.includes(sc.toLowerCase().replace(/[^a-z]/g, '')))) {
      return 'Investments';
    }
    
    return 'Other';
  };

  /* ===================== FILTER LOGIC ===================== */
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' ||
      lead.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_number?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.pan_number?.includes(searchTerm) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.sub_category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      lead.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesCategory = categoryFilter === 'all' ||
      lead.department?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSubCategory = subCategoryFilter === 'all' ||
      lead.sub_category?.toLowerCase() === subCategoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory && matchesSubCategory;
  });

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = searchTerm === '' ||
      meeting.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.dsa_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = meetingTypeFilter === 'all' ||
      meeting.meeting_type === meetingTypeFilter;

    const matchesStatus = meetingStatusFilter === 'all' ||
      meeting.status === meetingStatusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const upcomingMeetings = getUpcomingMeetings(filteredMeetings);
  const pastMeetings = getPastMeetings(filteredMeetings);
  const displayedMeetings = meetingView === 'upcoming' ? upcomingMeetings : pastMeetings;

  /* ===================== RENDER FUNCTIONS ===================== */
  const renderDSAList = () => {
    if (loading.dsa) return <LoadingSpinner text="Loading DSA list..." />;
    if (dsaList.length === 0) return <EmptyState message="No DSA found" />;

    return (
      <div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search DSAs by name, email, mobile, city, PAN..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {/* DSA Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Mobile</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>PAN Number</TableHeader>
                <TableHeader>City</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dsaList
                .filter(dsa => 
                  searchTerm === '' ||
                  dsa.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  dsa.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  dsa.mobile?.includes(searchTerm) ||
                  dsa.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  dsa.pan_number?.includes(searchTerm)
                )
                .map(dsa => (
                <tr key={dsa.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell bold>
                    <div className="flex flex-col">
                      <span>{dsa.name}</span>
                      <span className="text-xs text-gray-500">ID: {dsa.adv_id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={`mailto:${dsa.email}`} 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {dsa.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={`tel:${dsa.mobile}`}
                      className="text-gray-900 hover:text-blue-600"
                    >
                      {dsa.mobile}
                    </a>
                  </TableCell>
                  <TableCell>
                    {dsa.phone ? (
                      <a 
                        href={`tel:${dsa.phone}`}
                        className="text-gray-900 hover:text-blue-600"
                      >
                        {dsa.phone}
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {dsa.pan_number ? (
                      <span className="font-mono">{dsa.pan_number}</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>{dsa.city || 'N/A'}</TableCell>
                  <TableCell>
                    {dsa.category ? (
                      <CategoryBadge category={dsa.category} />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={dsa.status} />
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLeads = () => {
    if (loading.leads) return <LoadingSpinner text="Loading leads..." />;
    if (leads.length === 0) return <EmptyState message="No leads found" />;

    return (
      <div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads by client name, contact, email, PAN, city, category..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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
                  <TableHeader>Client Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Mobile</TableHeader>
                  <TableHeader>Phone</TableHeader>
                  <TableHeader>PAN Number</TableHeader>
                  <TableHeader>City</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Sub Category</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>DSA</TableHeader>
                  <TableHeader>Created Date</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell bold>{lead.lead_name}</TableCell>
                    <TableCell>
                      {lead.email ? (
                        <a 
                          href={`mailto:${lead.email}`} 
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {lead.email}
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`tel:${lead.contact_number}`}
                        className="text-gray-900 hover:text-blue-600"
                      >
                        {lead.contact_number}
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-900">{lead.contact_number}</span>
                    </TableCell>
                    <TableCell>
                      {lead.pan_number ? (
                        <span className="font-mono bg-gray-50 px-2 py-1 rounded border">{lead.pan_number}</span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-50 rounded text-sm">{lead.city || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <CategoryBadge category={lead.department || 'Other'} />
                    </TableCell>
                    <TableCell>
                      <SubCategoryBadge 
                        subCategory={lead.sub_category} 
                        category={lead.department || 'Other'} 
                      />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{lead.dsa_name}</span>
                        <span className="text-xs text-gray-500">ID: {lead.dsa_adv_id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{new Date(lead.created_at).toLocaleDateString('en-IN')}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
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

  const renderMeetings = () => {
    if (loading.meetings) return <LoadingSpinner text="Loading meetings..." />;
    if (meetings.length === 0) return <EmptyState message="No meetings found" />;

    return (
      <div>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search meetings by title, description, DSA name..."
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
{/* Filters and Stats */}
<div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* View Toggle Buttons */}
  <div className="md:col-span-2 flex space-x-2">
    <button
      onClick={() => setMeetingView('upcoming')}
      /* Forced bg-gray-100 text-gray-700 for inactive state to prevent fading */
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${
        meetingView === 'upcoming'
          ? 'bg-blue-600 text-white shadow-blue-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      Upcoming ({upcomingMeetings.length})
    </button>
    <button
      onClick={() => setMeetingView('past')}
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm ${
        meetingView === 'past'
          ? 'bg-blue-600 text-white shadow-blue-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
      }`}
    >
      Past ({pastMeetings.length})
    </button>
  </div>
  
  {/* Meeting Type Dropdown */}
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Meeting Type
    </label>
    <select
      /* Added bg-white text-gray-900 and explicitly styled options */
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 cursor-pointer"
      value={meetingTypeFilter}
      onChange={(e) => setMeetingTypeFilter(e.target.value)}
    >
      <option value="all" className="bg-white text-gray-900">All Types</option>
      <option value="in-person" className="bg-white text-gray-900">In-Person</option>
      <option value="virtual" className="bg-white text-gray-900">Virtual</option>
      <option value="phone" className="bg-white text-gray-900">Phone</option>
    </select>
  </div>
  
  {/* Status Dropdown */}
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-1">
      Status
    </label>
    <select
      /* Added bg-white text-gray-900 */
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 cursor-pointer"
      value={meetingStatusFilter}
      onChange={(e) => setMeetingStatusFilter(e.target.value)}
    >
      <option value="all" className="bg-white text-gray-900">All Status</option>
      <option value="scheduled" className="bg-white text-gray-900">Scheduled</option>
      <option value="completed" className="bg-white text-gray-900">Completed</option>
      <option value="cancelled" className="bg-white text-gray-900">Cancelled</option>
      <option value="postponed" className="bg-white text-gray-900">Postponed</option>
    </select>
  </div>
</div>
 {/* Meetings List */}
        {displayedMeetings.length === 0 ? (
          <EmptyState 
            message={`No ${meetingView} meetings found`}
            actionLabel="Schedule New Meeting"
            onAction={() => {/* Add meeting scheduling logic */}}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedMeetings.map(meeting => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
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
            Manage your DSAs, leads, and meetings efficiently
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4 md:space-x-8 -mb-px overflow-x-auto">
            <TabButton
              active={activeTab === 'dsa'}
              onClick={() => setActiveTab('dsa')}
              label="My DSA List"
              count={dsaList.length}
              loading={loading.dsa}
            />
            <TabButton
              active={activeTab === 'leads'}
              onClick={() => setActiveTab('leads')}
              label="My Referral Leads"
              count={leads.length}
              loading={loading.leads}
            />
            <TabButton
              active={activeTab === 'meetings'}
              onClick={() => setActiveTab('meetings')}
              label="Meetings"
              count={meetings.length}
              loading={loading.meetings}
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
              {activeTab === 'leads' && renderLeads()}
              {activeTab === 'meetings' && renderMeetings()}
            </>
          )}
        </div>
{/* Footer Stats */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>Data last updated: {new Date().toLocaleString('en-IN')}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <span>Total DSAs: {dsaList.length}</span>
            <span>•</span>
            <span>Total Leads: {leads.length}</span>
            <span>•</span>
            <span>Total Meetings: {meetings.length}</span>
            <span>•</span>
            <span>Upcoming: {upcomingMeetings.length}</span>
            <span>•</span>
            <span>Completed: {pastMeetings.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}