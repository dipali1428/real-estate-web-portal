'use client';
import { useState, useEffect } from 'react';
import { RmService } from '@/app/services/rmService';
import * as XLSX from 'xlsx';
import { Pencil, FileUp, FileText, Calendar, Clock, Video, MapPin, Plus, X, ArrowRight, Share2, UserCheck, ClipboardList, Inbox, ExternalLink } from "lucide-react";

interface DSA {
  id: string;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  date_joined: string;
  status: 'Active' | 'Inactive' | 'Pending';
  total_leads?: number;
  converted_leads?: number;
  pending_leads?: number;
}

interface ReferralLead {
  id: number;
  lead_name: string;
  contact_number: string;
  email: string | null;
  department: string;
  sub_category: string;
  notes: string;
  status: 'pending' | 'contacted' | 'follow_up' | 'converted' | 'lost' | 'rejected' | 'new' | 'closed';
  created_at: string;
  dsa_id: number;
  dsa_name: string;
  dsa_adv_id: string;
  assigned_rm_department: string;
  assigned_rm_name: string;
  ref_id: string;
  last_follow_up?: string;
  documents?: { name: string; url: string }[];
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

const mapApiDataToDSA = (apiData: any[]): DSA[] => {
  return apiData.map(item => ({
    id: item.id?.toString() || '',
    adv_id: item.adv_id || '',
    name: item.name || '',
    email: item.email || '',
    mobile: item.mobile || '',
    pan: item.pan || '',
    city: item.city || '',
    head: item.head || '',
    category: item.category || '',
    date_joined: item.date_joined || '',
    status: 'Active',
    total_leads: item.total_leads || 0,
    converted_leads: item.converted_leads || 0,
    pending_leads: item.pending_leads || 0
  }));
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};
const formatTime = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return '';
  }
};
export default function ReferralManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'leads' | 'outgoing-leads' | 'incoming-leads' | 'meetings'>('dsa');
  const [dsaList, setDsaList] = useState<DSA[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [incomingLeads, setIncomingLeads] = useState<ReferralLead[]>([]);
  const [outgoingLeads, setOutgoingLeads] = useState<ReferralLead[]>([]);
  const [loading, setLoading] = useState({
    dsa: true,
    meetings: true,
    leads: true,
    incomingLeads: true,
    outgoingLeads: true
  });
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    dsa_id: '',
    title: '',
    description: '',
    scheduled_date: '',
    scheduled_time: '',
    duration: 30,
    meeting_type: 'virtual' as 'virtual' | 'in-person',
    platform: 'Google Meet',
    location: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.allSettled([
          fetchDSAList(),
          fetchMeetings(),
          fetchLeads(),
          fetchIncomingLeads(),
          fetchOutgoingLeads()
         
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

  const fetchIncomingLeads = async () => {
    try {

      const res = await RmService.getIncomingAssignedLeads();
      console.log('Incoming Leads Response:', res);
      if (res?.success && Array.isArray(res.leads)) {
        setIncomingLeads(res.leads);
      } else {
        setIncomingLeads([]);
      }
    } catch (err: any) {
      console.error('Error fetching incoming leads:', err);
    } finally {
      setLoading(prev => ({ ...prev, incomingLeads: false }));
    }
  };

  const fetchDSAList = async () => {
    try {
      const dsaRes = await RmService.getYourDsaList();

      if (dsaRes?.success && Array.isArray(dsaRes.dsas)) {
        const mappedDSAs = mapApiDataToDSA(dsaRes.dsas);
        setDsaList(mappedDSAs);
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
const fetchOutgoingLeads = async () => {
    try {
      const res = await RmService. getoutgoingLeadsToRm();
      if (res?.success && Array.isArray(res.leads)) {
        setOutgoingLeads(res.leads);
      } else {
        setOutgoingLeads([]);
      }
    } catch (err: any) {
      console.error('Error fetching outgoing leads:', err);
    } finally {
      // Ensure this key matches exactly what is in your useState loading object
      setLoading(prev => ({ ...prev, outgoingLeads: false })); 
    }
  };
  const fetchMeetings = async () => {
    try {
      const mockMeetings: Meeting[] = [
        // {
        //   id: 1,
        //   dsa_id: 101,
        //   dsa_name: "John Sharma",
        //   dsa_adv_id: "DSA001",
        //   title: "Weekly Performance Review",
        //   description: "Discuss last week's leads and conversion rates",
        //   scheduled_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        //   scheduled_time: "10:00",
        //   duration: 60,
        //   meeting_type: "virtual",
        //   status: "scheduled",
        //   platform: "Zoom",
        //   meeting_link: "https://zoom.us/j/123456789"
        // }
      ];
      setMeetings(mockMeetings);
    } catch (err: any) {
      console.error('Error fetching meetings:', err);
      setMeetings([]);
    } finally {
      setLoading(prev => ({ ...prev, meetings: false }));
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDsa = dsaList.find(d => d.id === newMeeting.dsa_id);

    const meetingToAdd: Meeting = {
      id: Date.now(),
      dsa_id: Number(newMeeting.dsa_id),
      dsa_name: selectedDsa?.name || 'Unknown DSA',
      dsa_adv_id: selectedDsa?.adv_id,
      title: newMeeting.title,
      description: newMeeting.description,
      scheduled_date: newMeeting.scheduled_date,
      scheduled_time: newMeeting.scheduled_time,
      duration: newMeeting.duration,
      meeting_type: newMeeting.meeting_type,
      status: 'scheduled',
      platform: newMeeting.platform,
      location: newMeeting.location,
    };

    setMeetings([meetingToAdd, ...meetings]);
    setIsModalOpen(false);
    setNewMeeting({
      dsa_id: '', title: '', description: '', scheduled_date: '',
      scheduled_time: '', duration: 30, meeting_type: 'virtual',
      platform: 'Google Meet', location: ''
    });
  };

  const normalize = (str: string) =>
    str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  const filteredDSAs = dsaList.filter((dsa) => {
    const query = normalize(searchTerm);
    return (
      normalize(dsa.adv_id).includes(query) ||
      normalize(dsa.name).includes(query) ||
      normalize(dsa.email).includes(query) ||
      normalize(dsa.mobile).includes(query)
    );
  });

  const getCurrentPageDSAs = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredDSAs.slice(indexOfFirstItem, indexOfLastItem);
  };

  const getTotalPages = () => Math.ceil(filteredDSAs.length / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pageNumbers;
  };

  const downloadExcel = () => {
    const excelData = dsaList.map(dsa => ({
      'ID': dsa.id, 'Adv ID': dsa.adv_id, 'Name': dsa.name, 'Email': dsa.email,
      'Mobile': dsa.mobile, 'PAN': dsa.pan, 'City': dsa.city, 'Head': dsa.head,
      'Category': dsa.category, 'Date Joined': dsa.date_joined, 'Status': dsa.status,
      'Total Leads': dsa.total_leads || 0, 'Converted Leads': dsa.converted_leads || 0,
      'Pending Leads': dsa.pending_leads || 0,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DSAs');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `DSA_Report_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const myReferralLeads = leads.filter(lead => {
    const query = normalize(searchTerm);
    return (
      normalize(lead.lead_name).includes(query) ||
      normalize(lead.contact_number).includes(query) ||
      normalize(lead.dsa_name).includes(query) ||
      normalize(lead.sub_category).includes(query)
    );
  });

  const filteredIncomingLeads = incomingLeads.filter(lead => {
    const query = normalize(searchTerm);
    return (
      normalize(lead.lead_name).includes(query) ||
      normalize(lead.contact_number).includes(query) ||
      normalize(lead.dsa_name).includes(query)
    );
  });

  const renderDSAList = () => {
    if (loading.dsa) return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading DSA list...</p>
      </div>
    );

    return (
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="relative w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by adv_id, name, email or mobile"
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={dsaList.length === 0}>
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {getCurrentPageDSAs().length === 0 ? (
            <div className="text-center py-12">
              <p className="mt-4 text-gray-500">No DSAs found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adv ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Leads</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Converted Leads</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Leads</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentPageDSAs().map((dsa) => (
                  <tr key={dsa.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{dsa.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.adv_id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{dsa.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.mobile}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.pan}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.city}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.head}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(dsa.date_joined)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dsa.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {dsa.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.total_leads || 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.converted_leads || 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{dsa.pending_leads || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  const renderMeetings = () => {
    if (loading.meetings) return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading meetings...</p>
      </div>
    );

    const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');

    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Meeting Schedules</h3>
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Schedule with DSA
          </button>
        </div>
        {upcomingMeetings.map(meeting => (
          <div key={meeting.id} className="border rounded-lg p-4 mb-4 bg-white">
            <h5 className="font-semibold text-gray-900">{meeting.title}</h5>
            <p className="text-sm text-gray-600">DSA: {meeting.dsa_name}</p>
            <p className="text-sm text-gray-600">Date: {formatDate(meeting.scheduled_date)} at {meeting.scheduled_time}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderLeads = () => {
    if (loading.leads) return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading leads...</p>
      </div>
    );
    return (
      <div>
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="relative w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by adv_id, name, email or mobile"
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={dsaList.length === 0}>
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DSA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Additional Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myReferralLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{lead.dsa_name}</span>
                      <span className="text-xs text-gray-500">{lead.dsa_adv_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{lead.lead_name}</span>
                      <span className="text-blue-600">{lead.contact_number}</span>
                      <span className="text-blue-600">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.sub_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{lead.notes}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{lead.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}
                    <div> <span className="text-xs text-gray-400">{formatTime(lead.created_at)}</span></div></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderoutgoingLeads = () => {
    if (loading.outgoingLeads) return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading outgoing leads...</p>
      </div>
    );

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="relative w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by adv_id, name, email or mobile"
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={dsaList.length === 0}>
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
          <p className="text-sm text-blue-600 font-medium flex items-center">
            <ClipboardList className="w-4 h-4 mr-2" />
            Leads specifically assigned to you from the department team.
          </p>
        </div>
        {outgoingLeads.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No leads assigned</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DSA Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned RM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {outgoingLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{lead.dsa_name}</span>
                        <span className="text-xs text-gray-500">{lead.dsa_adv_id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{lead.lead_name}</span>
                        <span className="text-blue-600 font-medium">{lead.contact_number}</span>
                        <span className="text-gray-600 font-medium">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.status}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-blue-600 font-semibold">{lead.assigned_rm_name || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderIncomingLeads = () => {
    if (loading.incomingLeads) return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading incoming leads...</p>
      </div>
    );



    return (
      <div>
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="relative w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by adv_id, name, email or mobile"
                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm bg-white">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={dsaList.length === 0}>
              <FileUp className="w-5 h-5 mr-2" />
              Download Excel
            </button>
          </div>
        </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DSA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncomingLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{lead.dsa_name}</span>
                      <span className="text-xs text-gray-500">{lead.dsa_adv_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-600">{lead.ref_id}</span>

                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{lead.lead_name}</span>
                      <span className="text-blue-600">{lead.contact_number}</span>
                      <span className="text-gray-600">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.department}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{lead.sub_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{lead.notes || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-col space-y-2">
                      <span className={`inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                          lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {lead.status}
                      </span>

                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.created_at)}
                    <div> <span className="text-xs text-gray-400">{formatTime(lead.created_at)}</span></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const isLoading = loading.dsa || loading.leads || loading.meetings || loading.outgoingLeads || loading.incomingLeads;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Referral Management Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Manage your DSAs, meetings, and leads in one place</p>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4 md:space-x-8 -mb-px overflow-x-auto">
            <button onClick={() => setActiveTab('dsa')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'dsa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              My DSA List <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{dsaList.length}</span>
            </button>
            <button onClick={() => setActiveTab('leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              My Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{myReferralLeads.length}</span>
            </button>
            <button onClick={() => setActiveTab('incoming-leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'incoming-leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Incoming Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{incomingLeads.length}</span>
            </button>
             <button onClick={() => setActiveTab('outgoing-leads')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'outgoing-leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
             Outgoing Referral Leads <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{outgoingLeads.length}</span>
            </button> 
            <button onClick={() => setActiveTab('meetings')} className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${activeTab === 'meetings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              DSA Meetings <span className="ml-2 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100">{meetings.length}</span>
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dsa' && renderDSAList()}
              {activeTab === 'leads' && renderLeads()}
              {activeTab === 'outgoing-leads' && renderoutgoingLeads()}
              {activeTab === 'incoming-leads' && renderIncomingLeads()}
              {activeTab === 'meetings' && renderMeetings()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}