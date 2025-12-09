// app/admin/support-tickets/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, RefreshCw, Ticket, ChevronDown } from 'lucide-react';
import TicketAdminCard from './TicketAdminCard';
import AdminTicketStats from './AdminTicketStats';
import { AdminService } from '@/app/services/adminService';

const AdminSupportTicketsPage = () => {
  const [allTickets, setAllTickets] = useState<any[]>([]); // Store ALL tickets
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    closed: 0,
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 items per page

  // Items per page options
  const itemsPerPageOptions = [
    { value: 5, label: '5 per page' },
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Open', label: 'Open' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Closed', label: 'Closed' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Technical Issue', label: 'Technical' },
    { value: 'Commission Related', label: 'Commission' },
    { value: 'Product Information', label: 'Product Info' },
    { value: 'Lead Management', label: 'Leads' },
    { value: 'Profile Settings', label: 'Profile' },
    { value: 'Other', label: 'Other' },
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'last30', label: 'Last 30 Days' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'High Priority' },
  ];

  // Fetch ALL tickets from API (no pagination on server side)
  const fetchAllTickets = async () => {
    setLoading(true);
    try {
      console.log("Fetching ALL tickets...");

      const response = await AdminService.getTickets({}); // Get all tickets
      console.log("Full API Response:", response);

      // Check the actual structure of the response
      let apiTickets = [];

      if (response.tickets) {
        apiTickets = response.tickets;
      } else if (Array.isArray(response.data)) {
        apiTickets = response.data;
      } else if (Array.isArray(response)) {
        apiTickets = response;
      } else if (response.data?.tickets) {
        apiTickets = response.data.tickets;
      } else if (response.data && Array.isArray(response.data)) {
        apiTickets = response.data;
      }

      console.log("Total tickets received:", apiTickets.length);

      // Transform API response
      const formattedTickets = apiTickets.map((ticket: any) => ({
        _id: ticket.id?.toString() || ticket._id || `temp_${Date.now()}`,
        ticket_id: ticket.ticket_id || ticket.ticketId || `TKT${ticket.id}`,
        name: ticket.name || 'Unknown User',
        email: ticket.email || '',
        phone: ticket.mobile || ticket.phone || '',
        subject: ticket.subject || 'No Subject',
        description: ticket.description || '',
        category: ticket.category || 'Other',
        status: ticket.status || 'Open',
        priority: ticket.priority || 'Medium',
        created_at: ticket.created_at || ticket.createdAt || new Date().toISOString(),
        updated_at: ticket.updated_at || ticket.updatedAt || new Date().toISOString(),
        assigned_to: ticket.assigned_to || ticket.assignedTo || null,
        comments: Array.isArray(ticket.comments) ? ticket.comments : [],
      }));

      console.log("Formatted tickets:", formattedTickets.length);
      setAllTickets(formattedTickets);

    } catch (error) {
      console.error('Error fetching tickets:', error);
      setAllTickets([]);
      alert('Failed to load tickets. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate filtered tickets based on all filters
  const filteredTickets = useMemo(() => {
    if (!allTickets.length) return [];

    let result = [...allTickets];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(ticket => ticket.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(ticket => ticket.category === categoryFilter);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ticket =>
        ticket.subject.toLowerCase().includes(term) ||
        ticket.ticket_id.toLowerCase().includes(term) ||
        ticket.name.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term) ||
        (ticket.phone && ticket.phone.toLowerCase().includes(term)) ||
        (ticket.email && ticket.email.toLowerCase().includes(term))
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      result = result.filter(ticket => {
        const ticketDate = new Date(ticket.created_at);

        switch (dateFilter) {
          case 'today':
            return ticketDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return ticketDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return ticketDate >= monthAgo;
          case 'last30':
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return ticketDate >= thirtyDaysAgo;
          default:
            return true;
        }
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'priority':
          const priorityOrder: { [key: string]: number } = { High: 1, Medium: 2, Low: 3 };
          return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
        default:
          return 0;
      }
    });

    return result;
  }, [allTickets, statusFilter, categoryFilter, searchTerm, dateFilter, sortBy]);

  // Calculate current page tickets based on itemsPerPage
  const currentPageTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTickets.slice(startIndex, endIndex);
  }, [filteredTickets, currentPage, itemsPerPage]);

  // Calculate total pages based on itemsPerPage
  const totalPages = useMemo(() => {
    return Math.ceil(filteredTickets.length / itemsPerPage);
  }, [filteredTickets, itemsPerPage]);

  // Calculate start and end index for display
  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage + 1;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(currentPage * itemsPerPage, filteredTickets.length);
  }, [currentPage, itemsPerPage, filteredTickets.length]);

  // Update stats whenever allTickets changes
  useEffect(() => {
    const statsData = {
      total: allTickets.length,
      open: allTickets.filter(t => t.status === 'Open').length,
      resolved: allTickets.filter(t => t.status === 'Resolved').length,
      closed: allTickets.filter(t => t.status === 'Closed').length,
    };
    setStats(statsData);
  }, [allTickets]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, categoryFilter, searchTerm, dateFilter, sortBy]);

  // Reset to page 1 when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Initial load
  useEffect(() => {
    fetchAllTickets();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (ticketId: string, newStatus: string) => {
    try {
      await AdminService.updateTicketStatus(ticketId, newStatus);

      // Update local state
      setAllTickets(prev =>
        prev.map(ticket =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      console.log(`Ticket ${ticketId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating ticket status:', error);
      alert('Failed to update ticket status');
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
  };

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1.5 rounded ${currentPage === i
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 hover:bg-gray-50'
            }`}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Support Ticket Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and resolve tickets raised by DSAs
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchAllTickets}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <AdminTicketStats stats={stats} />

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters & Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
            <div className="flex flex-wrap gap-2">
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                  <button onClick={() => setStatusFilter('all')} className="ml-1 hover:text-blue-900">
                    ×
                  </button>
                </span>
              )}
              {categoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded-full">
                  Category: {categoryOptions.find(o => o.value === categoryFilter)?.label}
                  <button onClick={() => setCategoryFilter('all')} className="ml-1 hover:text-green-900">
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded-full">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-gray-900">
                    ×
                  </button>
                </span>
              )}
              {dateFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Date: {dateOptions.find(o => o.value === dateFilter)?.label}
                  <button onClick={() => setDateFilter('all')} className="ml-1 hover:text-purple-900">
                    ×
                  </button>
                </span>
              )}
              {(statusFilter !== 'all' || categoryFilter !== 'all' || searchTerm || dateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                    setDateFilter('all');
                    setSortBy('newest');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-600 hidden md:block">
              Showing {startIndex}-{endIndex} of {filteredTickets.length} filtered tickets
              {filteredTickets.length !== allTickets.length && ` (out of ${allTickets.length} total)`}
            </div>
          </div>
        </div>

        {/* Tickets List Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto border-b border-gray-200 bg-gray-50">
              <div className="min-w-[1024px]">
                <div className="grid gap-4 p-6 text-sm font-semibold text-gray-700"
                     style={{
                       gridTemplateColumns: '130px 160px 140px minmax(150px, 1fr) 140px 100px 140px 80px'
                     }}
                >
                  <div>Ticket ID</div>
                  <div>DSA Information</div>
                  <div>Phone Number</div>
                  <div>Subject & Comments</div>
                  <div>Category</div>
                  <div>Status</div>
                  <div>Created Date</div>
                  <div className="text-right">Actions</div>
                </div>
              </div>
            </div>

            {/* Desktop Tickets List - Show only current page tickets */}
            <div className="divide-y divide-gray-200">
              {currentPageTickets.map((ticket) => (
                <TicketAdminCard
                  key={ticket._id}
                  ticket={ticket}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden">
            {currentPageTickets.map((ticket) => (
              <TicketAdminCard
                key={ticket._id}
                ticket={ticket}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading tickets...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && currentPageTickets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Ticket className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">No tickets found</h3>
              <p className="text-gray-500 mt-1">
                {allTickets.length === 0 
                  ? "No tickets have been raised yet" 
                  : "No tickets match your current filters"}
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && filteredTickets.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 border-t border-gray-200 gap-4 text-gray-700">
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="appearance-none px-3 py-1.5 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                  >
                    {itemsPerPageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Page info - Mobile */}
              <div className="text-sm text-gray-600 sm:hidden">
                {startIndex}-{endIndex} of {filteredTickets.length}
              </div>

              {/* Page info - Desktop */}
              <div className="hidden sm:block text-sm text-gray-600">
                Showing {startIndex}-{endIndex} of {filteredTickets.length} tickets
              </div>

              {/* Pagination buttons */}
              {totalPages > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-1">
                    {renderPaginationButtons()}
                  </div>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                  </button>
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