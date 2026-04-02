// app/admin/support-tickets/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, RefreshCw, Ticket, ChevronDown } from 'lucide-react';
import TicketAdminCard from './TicketAdminCard';
import AdminTicketStats from './AdminTicketStats';
import { AdminService } from '@/app/services/adminService';

// --- Static Constants (Moved outside to prevent re-renders) ---
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100].map(v => ({ value: v, label: `${v} per page` }));
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'Open', label: 'Open' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Closed', label: 'Closed' },
];
const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technical Issue', label: 'Technical' },
  { value: 'Commission Related', label: 'Commission' },
  { value: 'Product Information', label: 'Product Info' },
  { value: 'Lead Management', label: 'Leads' },
  { value: 'Profile Settings', label: 'Profile' },
  { value: 'KYC/Verification', label: 'KYC/Verification' },
  { value: 'Other', label: 'Other' },
];
const DATE_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const AdminSupportTicketsPage = () => {
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    date: 'all',
    sort: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset page on filter change
  };

  const fetchAllTickets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AdminService.getTickets({});
      // Streamlined response check
      const apiTickets = response.tickets || response.data?.tickets || (Array.isArray(response.data) ? response.data : response) || [];

      const formatted = apiTickets.map((t: any) => ({
        ...t,
        _id: t.id?.toString() || t._id || `temp_${Date.now()}`,
        ticket_id: t.ticket_id || t.ticketId || `TKT${t.id}`,
        name: t.name || 'Unknown User',
        phone: t.mobile || t.phone || '',
        subject: t.subject || 'No Subject',
        category: t.category || 'Other',
        status: t.status || 'Open',
        created_at: t.created_at || t.createdAt || new Date().toISOString(),
      }));

      setAllTickets(formatted);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllTickets(); }, [fetchAllTickets]);

  // Derived State: Stats (Calculated on the fly)
  const stats = useMemo(() => ({
    total: allTickets.length,
    open: allTickets.filter(t => t.status === 'Open').length,
    resolved: allTickets.filter(t => t.status === 'Resolved').length,
    closed: allTickets.filter(t => t.status === 'Closed').length,
  }), [allTickets]);

  // Derived State: Filtered & Sorted Tickets
  const filteredTickets = useMemo(() => {
    let result = [...allTickets];

    if (filters.status !== 'all') result = result.filter(t => t.status === filters.status);
    if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(t =>
        [t.subject, t.ticket_id, t.name, t.description].some(field => field?.toLowerCase().includes(term))
      );
    }

    if (filters.date !== 'all') {
      const now = new Date();
      const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      if (filters.date === 'week') cutoff.setDate(cutoff.getDate() - 7);
      result = result.filter(t => new Date(t.created_at) >= cutoff);
    }

    return result.sort((a, b) => {
      const diff = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return filters.sort === 'newest' ? diff : -diff;
    });
  }, [allTickets, filters]);

  // Derived State: Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageTickets = filteredTickets.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusUpdate = async (ticketId: string, newStatus: string, solution?: string) => {
    try {
      const ticket = allTickets.find(t => t._id === ticketId);
      if (!ticket) return;

      if (['Resolved', 'Closed'].includes(newStatus)) {
        const finalSolution = solution || `Ticket marked as ${newStatus} by admin`;
        await AdminService.solveTicket(ticket.id, finalSolution);

        setAllTickets(prev => prev.map(t => t._id === ticketId ? {
          ...t,
          status: newStatus,
          admin_solution: finalSolution,
          updated_at: new Date().toISOString()
        } : t));
      }
    } catch (error) {
      alert('Failed to update ticket status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support Ticket Management</h1>
            <p className="text-gray-600 mt-2">Manage and resolve tickets raised by DSAs</p>
          </div>
          <button onClick={fetchAllTickets} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        <AdminTicketStats stats={stats} />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none text-gray-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {[
              { val: filters.status, opt: STATUS_OPTIONS, key: 'status' },
              { val: filters.category, opt: CATEGORY_OPTIONS, key: 'category' },
              { val: filters.date, opt: DATE_OPTIONS, key: 'date' },
              { val: filters.sort, opt: SORT_OPTIONS, key: 'sort' }
            ].map(f => (
              <select
                key={f.key}
                value={f.val}
                onChange={(e) => updateFilter(f.key, e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-gray-900"
              >
                {f.opt.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="hidden lg:block border-b bg-gray-50 p-6">
            <div className="grid gap-4 text-sm font-semibold text-gray-700"
              style={{ gridTemplateColumns: '130px 160px 140px 140px minmax(150px, 1fr) 100px 140px 80px' }}>
              {['Ticket ID', 'DSA Info', 'Phone', 'Category', 'Subject', 'Status', 'Created', 'Actions'].map(h => <div key={h}>{h}</div>)}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentPageTickets.map(ticket => (
              <TicketAdminCard key={ticket._id} ticket={ticket} onStatusUpdate={handleStatusUpdate} />
            ))}
          </div>

          {!loading && currentPageTickets.length === 0 && (
            <div className="py-16 text-center">
              <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">No tickets found</h3>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredTickets.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 border-t gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show:</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="appearance-none px-3 py-1.5 pr-8 border rounded-lg text-sm bg-white"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="text-sm">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length}
              </div>

              {totalPages > 1 && (
                <div className="flex gap-2">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1.5 border rounded disabled:opacity-50 text-sm">Prev</button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1.5 rounded text-sm ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border'}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1.5 border rounded disabled:opacity-50 text-sm">Next</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSupportTicketsPage;