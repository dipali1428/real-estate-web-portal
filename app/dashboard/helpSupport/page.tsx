'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DashboardService } from "@/app/services/dashboardService";
import toast from 'react-hot-toast';

// TicketSummaryCard component (moved outside HelpSupportPage)
const TicketSummaryCard = ({ ticket }: { ticket: any }) => {
    const createdDate = new Date(ticket.created_at).toLocaleString([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const statusColor = ticket.status.toLowerCase() === "open"
        ? "bg-green-100 text-green-700 border-green-300"
        : ticket.status.toLowerCase() === "resolved"
        ? "bg-blue-100 text-blue-700 border-blue-300"
        : "bg-gray-100 text-gray-700 border-gray-300";

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 lg:p-8 border border-blue-100 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-sans bg-blue-500 text-transparent bg-clip-text">
                    🎫 Ticket Raised
                </h2>

                <div className="flex flex-col font-sans items-start sm:items-end w-full sm:w-auto">
                    <span className="text-sm sm:text-base font-medium text-slate-800">
                        <span className="text-blue-500">Ticket ID: </span> #{ticket.ticket_id}
                    </span>

                    <span
                        className={`mt-1 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusColor}`}>
                        {ticket.status}
                    </span>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-slate-500">Name</span>
                    <span className="font-semibold text-slate-800 wrap-break-word text-sm sm:text-base">
                        {ticket.name}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-slate-500">Category</span>
                    <span className="font-semibold text-slate-800 wrap-break-word text-sm sm:text-base">
                        {ticket.category}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-slate-500">Subject</span>
                    <span className="font-semibold text-slate-800 wrap-break-word text-sm sm:text-base">
                        {ticket.subject}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm text-slate-500">Created At</span>
                    <span className="font-semibold text-slate-800 wrap-break-word text-sm sm:text-base">
                        {createdDate}
                    </span>
                </div>
            </div>

            {/* Description */}
            <div className="mt-6">
                <p className="text-sm sm:text-base font-medium text-slate-600 mb-2">
                    Description
                </p>

                <p className="bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-lg text-slate-700 text-sm sm:text-base leading-relaxed break-words">
                    {ticket.description}
                </p>
            </div>

            {/* Admin Solution if exists */}
            {ticket.admin_solution && (
                <div className="mt-6">
                    <p className="text-sm sm:text-base font-medium text-green-600 mb-2">
                        Admin Response
                    </p>
                    <p className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-lg text-green-700 text-sm sm:text-base leading-relaxed break-words">
                        {ticket.admin_solution}
                    </p>
                </div>
            )}
        </div>
    );
};

// Main HelpSupportPage Component
const HelpSupportPage: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    description: ''
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [activeTab, setActiveTab] = useState<'open' | 'resolved' | 'closed'>('open');

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTickets = async () => {
      try {
        const result = await DashboardService.getMyTickets();
        console.log('🔍 Fetched tickets:', result.tickets);
        
        if (result.tickets && result.tickets.length > 0) {
          // Log detailed ticket info including solved_at
          console.log('Ticket details:');
          result.tickets.forEach((ticket: any, index: number) => {
            console.log(`Ticket ${index}:`, {
              id: ticket.id,
              ticket_id: ticket.ticket_id,
              status: ticket.status,
              subject: ticket.subject,
              solved_at: ticket.solved_at,
              created_at: ticket.created_at,
              updated_at: ticket.updated_at,
              admin_solution: ticket.admin_solution
            });
          });
        }
        
        setTickets(result.tickets || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTickets();
  }, []);

  // Function to get ticket status (normalized to lowercase)
  const getTicketStatus = (ticket: any): string => {
    if (!ticket || !ticket.status) return '';
    return ticket.status.toLowerCase().trim();
  };

  // Function to check if ticket is open
  const isTicketOpen = (ticket: any): boolean => {
    const status = getTicketStatus(ticket);
    return status === 'open' || status === 'pending' || status === 'in-progress' || status === 'new' || status === 'assigned';
  };

  // Function to check if ticket is resolved
  const isTicketResolved = (ticket: any): boolean => {
    const status = getTicketStatus(ticket);
    return status === 'resolved' || status === 'solved' || status === 'completed';
  };

  // Function to check if ticket is closed
  const isTicketClosed = (ticket: any): boolean => {
    const status = getTicketStatus(ticket);
    return status === 'closed';
  };

  // Function to format date properly
  const formatDate = (dateValue: any): string => {
    if (!dateValue) return 'N/A';
    
    try {
      let date: Date;
      
      if (typeof dateValue === 'string') {
        if (/^\d+$/.test(dateValue)) {
          date = new Date(parseInt(dateValue));
        } else {
          date = new Date(dateValue);
        }
      } else if (typeof dateValue === 'number') {
        date = new Date(dateValue);
      } else if (dateValue instanceof Date) {
        date = dateValue;
      } else {
        return 'Invalid Date';
      }
      
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', dateValue, error);
      return 'Invalid Date';
    }
  };

  // Function to check if date exists and is valid
  const isValidDateValue = (dateValue: any): boolean => {
    if (!dateValue) return false;
    if (dateValue === null || dateValue === undefined) return false;
    if (typeof dateValue === 'string' && dateValue.trim() === '') return false;
    
    try {
      const date = new Date(dateValue);
      return !isNaN(date.getTime());
    } catch (error) {
      return false;
    }
  };

  // Function to get response text - updated for new structure
  const getTicketResponse = (ticket: any): string => {
    if (!ticket) return '';
    
    // Check admin_solution field from new structure
    if (ticket.admin_solution && ticket.admin_solution.toString().trim() !== '') {
      return String(ticket.admin_solution);
    }
    
    return '';
  };

  // Function to get created date
  const getCreatedDate = (ticket: any): any => {
    return ticket?.created_at || null;
  };

  // Function to get updated date
  const getUpdatedDate = (ticket: any): any => {
    return ticket?.updated_at || null;
  };

  // Function to get solved date
  const getSolvedDate = (ticket: any): any => {
    return ticket?.solved_at || null;
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus === 'open' || normalizedStatus === 'pending') {
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    } else if (normalizedStatus === 'in-progress' || normalizedStatus === 'processing' || normalizedStatus === 'assigned') {
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    } else if (normalizedStatus === 'resolved' || normalizedStatus === 'solved' || normalizedStatus === 'completed') {
      return 'bg-green-100 text-green-800 border border-green-200';
    } else if (normalizedStatus === 'closed') {
      return 'bg-gray-100 text-gray-800 border border-gray-200';
    } else {
      return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const faqs = [
    {
      question: "How do I update my contact information?",
      answer: "You can update your contact information in the 'My Profile' section. Go to Profile > Personal Details and edit your information."
    },
    // ... (keep all your existing FAQ items)
  ];

  const categories = [
    "Technical Issue",
    "Commission Related",
    "Product Information",
    "Lead Management",
    "Profile Settings",
    "Other"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let processedValue = value;

    if (name === "subject") {
      processedValue = processedValue.replace(/[0-9]/g, "");
      processedValue = processedValue.charAt(0).toUpperCase() + processedValue.slice(1).toLowerCase();
    }

    if (name === "description") {
      processedValue = ticketData.description === ""
        ? processedValue.charAt(0).toUpperCase() + processedValue.slice(1)
        : processedValue;
    }

    setTicketData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketPayload = {
      category: ticketData.category,
      subject: ticketData.subject,
      description: ticketData.description,
    };

    try {
      const result = await DashboardService.createTicket(ticketPayload);
      toast.success("Ticket raised successfully!");

      // Add new ticket to the beginning of the list
      setTickets(prev => [result.ticket, ...prev]);
      
      // Switch to open tab to show the new ticket
      setActiveTab('open');
    } catch (error: any) {
      console.error("Error submitting ticket:", error);

      if (error.response) {
        alert("Failed to submit ticket: " + (error.response.data?.message || "Please try again."));
      } else {
        alert("Failed to submit ticket. Please check your connection.");
      }
    }

    // Reset form
    setTicketData({
      subject: "",
      category: "",
      description: "",
    });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Count tickets by status
  const openTicketsCount = tickets.filter(ticket => isTicketOpen(ticket)).length;
  const resolvedTicketsCount = tickets.filter(ticket => isTicketResolved(ticket)).length;
  const closedTicketsCount = tickets.filter(ticket => isTicketClosed(ticket)).length;

  // Filter tickets based on active tab
  const filteredTickets = activeTab === 'open' 
    ? tickets.filter(ticket => isTicketOpen(ticket))
    : activeTab === 'resolved' 
      ? tickets.filter(ticket => isTicketResolved(ticket))
      : tickets.filter(ticket => isTicketClosed(ticket));

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 lg:p-8 xl:p-12 rounded-lg">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700 mb-3 sm:mb-4">Help & Support</h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2 sm:px-0">
            Find answers to frequently asked questions or raise a ticket for dedicated support.
          </p>
        </div>

        {/* Support Ticket Section */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 mb-10 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 sm:mb-0">Support Tickets</h2>
            
            {/* Status Summary */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-slate-600">Open: {openTicketsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-600">Resolved: {resolvedTicketsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span className="text-slate-600">Closed: {closedTicketsCount}</span>
              </div>
            </div>
          </div>
          
          {/* Status Tabs */}
          <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('open')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'open'
                  ? 'bg-white text-yellow-700 shadow-sm border border-yellow-100'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Open</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                  {openTicketsCount}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('resolved')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'resolved'
                  ? 'bg-white text-green-700 shadow-sm border border-green-100'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Resolved</span>
                <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                  {resolvedTicketsCount}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('closed')}
              className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'closed'
                  ? 'bg-white text-gray-700 shadow-sm border border-gray-100'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Closed</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">
                  {closedTicketsCount}
                </span>
              </div>
            </button>
          </div>

          {loadingTickets ? (
            <div className="flex justify-center items-center py-10 sm:py-16 lg:py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-slate-500 text-sm sm:text-base">Loading tickets...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Open Tickets Tab */}
              {activeTab === 'open' && (
                <>
                  {openTicketsCount > 0 ? (
                    <div className="space-y-4">
                      {filteredTickets.map((ticket, index) => (
                        <TicketSummaryCard key={index} ticket={ticket} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-700 mb-2">No Open Tickets</h3>
                      <p className="text-slate-500 text-sm mb-6">You don't have any open support tickets at the moment.</p>
                    </div>
                  )}
                </>
              )}

              {/* Resolved Tickets Tab */}
              {activeTab === 'resolved' && (
                <>
                  {resolvedTicketsCount > 0 ? (
                    <div className="space-y-4">
                      {filteredTickets.map((ticket, index) => {
                        const response = getTicketResponse(ticket);
                        const createdDate = getCreatedDate(ticket);
                        const updatedDate = getUpdatedDate(ticket);
                        const solvedDate = getSolvedDate(ticket);
                        const hasCreatedDate = isValidDateValue(createdDate);
                        const hasUpdatedDate = isValidDateValue(updatedDate);
                        const hasSolvedDate = isValidDateValue(solvedDate);
                        
                        console.log('Resolved ticket dates:', {
                          subject: ticket.subject,
                          created_at: createdDate,
                          updated_at: updatedDate,
                          solved_at: solvedDate,
                          hasCreatedDate,
                          hasUpdatedDate,
                          hasSolvedDate
                        });
                        
                        return (
                          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-gradient-to-r from-white to-green-50/30">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-slate-900">{ticket.subject || 'No Subject'}</span>
                                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                                    {ticket.status || 'Unknown'}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">Ticket ID:</span>
                                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                                      {ticket.ticket_id || 'N/A'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Category:</span>{' '}
                                    <span className="text-slate-700">{ticket.category || 'Uncategorized'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-slate-500">
                                <div className="flex flex-col items-end gap-1">
                                  {/* Always show Created date if available */}
                                  {hasCreatedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-slate-600 text-xs">Created:</div>
                                      <div className="text-slate-700">{formatDate(createdDate)}</div>
                                    </div>
                                  )}
                                  
                                  {/* Always show Updated date if available */}
                                  {hasUpdatedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-green-600 text-xs">Updated:</div>
                                      <div className="text-green-700 font-medium">{formatDate(updatedDate)}</div>
                                    </div>
                                  )}
                                  
                                  {/* Always show Solved date if available */}
                                  {hasSolvedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-green-800 text-xs">Resolved:</div>
                                      <div className="text-green-900 font-medium">{formatDate(solvedDate)}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-1">Your Query:</p>
                                <div className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-100 whitespace-pre-wrap">
                                  {ticket.description || 'No description provided'}
                                </div>
                              </div>
                              
                              {response ? (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium text-slate-700">Support Response:</p>
                                    <div className="flex items-center gap-2">
                                      {hasSolvedDate ? (
                                        <span className="text-xs text-green-600 font-medium">
                                          Resolved: {formatDate(solvedDate)}
                                        </span>
                                      ) : hasUpdatedDate ? (
                                        <span className="text-xs text-slate-500">
                                          Updated: {formatDate(updatedDate)}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="text-slate-700 bg-green-50 p-3 rounded-lg border border-green-200 whitespace-pre-wrap shadow-sm">
                                    <div className="flex items-start gap-2">
                                      {/* <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg> */}
                                      <div>{response}</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-4 border border-dashed border-slate-300 rounded bg-slate-50">
                                  <p className="text-slate-500 text-sm">No response received</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-700 mb-2">No Resolved Tickets</h3>
                      <p className="text-slate-500 text-sm mb-6">You don't have any resolved tickets yet.</p>
                    </div>
                  )}
                </>
              )}

              {/* Closed Tickets Tab */}
              {activeTab === 'closed' && (
                <>
                  {closedTicketsCount > 0 ? (
                    <div className="space-y-4">
                      {filteredTickets.map((ticket, index) => {
                        const response = getTicketResponse(ticket);
                        const createdDate = getCreatedDate(ticket);
                        const updatedDate = getUpdatedDate(ticket);
                        const solvedDate = getSolvedDate(ticket);
                        const hasCreatedDate = isValidDateValue(createdDate);
                        const hasUpdatedDate = isValidDateValue(updatedDate);
                        const hasSolvedDate = isValidDateValue(solvedDate);
                        
                        console.log('Closed ticket dates:', {
                          subject: ticket.subject,
                          created_at: createdDate,
                          updated_at: updatedDate,
                          solved_at: solvedDate,
                          hasCreatedDate,
                          hasUpdatedDate,
                          hasSolvedDate
                        });
                        
                        return (
                          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-gradient-to-r from-white to-gray-50/30">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-slate-900">{ticket.subject || 'No Subject'}</span>
                                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                                    {ticket.status || 'Unknown'}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">Ticket ID:</span>
                                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                                      {ticket.ticket_id || 'N/A'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Category:</span>{' '}
                                    <span className="text-slate-700">{ticket.category || 'Uncategorized'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-slate-500">
                                <div className="flex flex-col items-end gap-1">
                                  {/* Always show Created date if available */}
                                  {hasCreatedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-slate-600 text-xs">Created:</div>
                                      <div className="text-slate-700">{formatDate(createdDate)}</div>
                                    </div>
                                  )}
                                  
                                  {/* Always show Updated date if available */}
                                  {hasUpdatedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-gray-600 text-xs">Updated:</div>
                                      <div className="text-gray-700 font-medium">{formatDate(updatedDate)}</div>
                                    </div>
                                  )}
                                  
                                  {/* Always show Solved date if available */}
                                  {hasSolvedDate && (
                                    <div className="text-right">
                                      <div className="font-medium text-gray-800 text-xs">Closed:</div>
                                      <div className="text-gray-900 font-medium">{formatDate(solvedDate)}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-slate-700 mb-1">Your Query:</p>
                                <div className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-100 whitespace-pre-wrap">
                                  {ticket.description || 'No description provided'}
                                </div>
                              </div>
                              
                              {response ? (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium text-slate-700">Support Response:</p>
                                    <div className="flex items-center gap-2">
                                      {hasSolvedDate ? (
                                        <span className="text-xs text-gray-600 font-medium">
                                          Closed: {formatDate(solvedDate)}
                                        </span>
                                      ) : hasUpdatedDate ? (
                                        <span className="text-xs text-slate-500">
                                          Updated: {formatDate(updatedDate)}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="text-slate-700 bg-gray-50 p-3 rounded-lg border border-gray-200 whitespace-pre-wrap shadow-sm">
                                    <div className="flex items-start gap-2">
                                      {/* <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg> */}
                                      <div>{response}</div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-4 border border-dashed border-slate-300 rounded bg-slate-50">
                                  <p className="text-slate-500 text-sm">No response received</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-700 mb-2">No Closed Tickets</h3>
                      <p className="text-slate-500 text-sm mb-6">You don't have any closed tickets.</p>
                    </div>
                  )}
                </>
              )}

              {/* If no tickets exist at all */}
              {tickets.length === 0 && !loadingTickets && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">No Support Tickets Yet</h3>
                  <p className="text-slate-500 text-sm mb-6">Submit your first ticket to get started with support.</p>
                </div>
              )}
            </div>
          )}

          {/* Create New Ticket Form - Always shown except when loading */}
          {!loadingTickets && (
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-700">Create New Ticket</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Category Field */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={ticketData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-700 outline-none text-sm sm:text-base"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={ticketData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-700 outline-none text-sm sm:text-base"
                      placeholder="Enter the subject of your issue"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={ticketData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-slate-700 outline-none text-sm sm:text-base"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base shadow-sm hover:shadow-md"
                  >
                    Submit New Ticket
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-6 sm:mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center outline-none select-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base sm:text-lg font-medium text-slate-900 pr-3 sm:pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 mt-0.5 ${openFaqIndex === index ? 'transform rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2 border-t border-slate-100">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <p className="text-slate-600 text-sm sm:text-base">
            Need immediate assistance? Contact us at{" "}
            <a href="mailto:info@infinityarthvishva.com" className="text-blue-600 hover:text-blue-700 font-medium wrap-break-word">
              info@infinityarthvishva.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;