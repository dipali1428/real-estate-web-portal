// app/admin/support-tickets/TicketAdminCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Calendar, Clock, MessageCircle, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import TicketDetailsModal from './TicketDetailsModal';

const TicketAdminCard = ({ 
  ticket, 
  onStatusUpdate
}: { 
  ticket: any;
  onStatusUpdate: (ticketId: string, status: string) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTimeAgo, setFormattedTimeAgo] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState('');

  useEffect(() => {
    setIsMounted(true);
    formatDates();
    formatPhoneNumber();
  }, [ticket.created_at, ticket.phone]);

  const formatDates = () => {
    if (!ticket.created_at) return;
    
    const date = new Date(ticket.created_at);
    
    // Format date as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
    
    // Format time as HH:MM AM/PM
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    setFormattedTimeAgo(`${displayHours}:${minutes} ${ampm}`);
  };

  const formatPhoneNumber = () => {
    if (!ticket.phone) {
      setFormattedPhone('Not provided');
      return;
    }
    
    // Just show the phone number as it is, no formatting
    setFormattedPhone(ticket.phone);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isMounted) {
    return (
      <div className="lg:hidden border-b border-gray-200">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block min-w-[1024px]">
        <div className="grid gap-4 p-4 md:p-6 hover:bg-gray-50 transition-colors"
             style={{
               gridTemplateColumns: '130px 160px 140px minmax(150px, 1fr) 140px 100px 140px 80px'
             }}
        >
          {/* Ticket ID */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority || 'Medium')} flex-shrink-0`} />
              <span className="font-mono text-sm font-medium text-gray-900 truncate block" title={`#${ticket.ticket_id}`}>
                #{ticket.ticket_id}
              </span>
            </div>
          </div>

          {/* DSA Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm truncate block" title={ticket.name}>
                  {ticket.name}
                </p>
                <p className="text-xs text-gray-500 truncate block" title={ticket.email || 'No email'}>
                  {ticket.email || 'No email'}
                </p>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-gray-500 flex-shrink-0" />
              {ticket.phone ? (
                <a 
                  href={`tel:${ticket.phone}`}
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors truncate block"
                  title={ticket.phone}
                >
                  {formattedPhone}
                </a>
              ) : (
                <span className="text-sm text-gray-500 truncate block">N/A</span>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="min-w-0">
            <div className="min-w-0">
              <p className="font-medium text-gray-900 text-sm block" title={ticket.subject}>
                {ticket.subject}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MessageCircle className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 truncate">
                  {ticket.comments?.length || 0} comments
                </span>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="min-w-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 truncate block max-w-full" title={ticket.category}>
              {ticket.category}
            </span>
          </div>

          {/* Status */}
          <div className="min-w-0">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border truncate block ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          {/* Created Date */}
          <div className="min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span className="truncate block" title={formattedDate}>
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span className="truncate block" title={formattedTimeAgo}>
                  {formattedTimeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* Actions - FIXED: Direct onClick handler */}
          <div className="min-w-0">
            <div className="flex justify-end">
              <button
                onClick={() => setShowDetails(true)}  // Direct handler for desktop
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                title="View details"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden border-b border-gray-200">
        <div 
          className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority || 'Medium')}`} />
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-gray-900 truncate">
                    #{ticket.ticket_id}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm truncate" title={ticket.name}>
                    {ticket.name}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-blue-600 truncate" title={ticket.category}>
                    {ticket.category}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              className="ml-2 p-1 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          <p className="font-medium text-gray-900 text-sm mt-2 truncate" title={ticket.subject}>
            {ticket.subject}
          </p>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{ticket.comments?.length || 0}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {ticket.phone ? (
                <a 
                  href={`tel:${ticket.phone}`}
                  className="hover:text-blue-600 transition-colors text-xs truncate max-w-[120px] md:max-w-[150px] block"
                  onClick={(e) => e.stopPropagation()}
                  title={formattedPhone}
                >
                  {formattedPhone}
                </a>
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">DSA Email</p>
                  <p className="text-sm text-gray-900 break-all" title={ticket.email || 'No email'}>
                    {ticket.email || 'No email'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  {ticket.phone ? (
                    <a 
                      href={`tel:${ticket.phone}`}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors block break-all"
                      title={ticket.phone}
                    >
                      {formattedPhone}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">Not provided</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created</p>
                  <p className="text-sm text-gray-900">
                    {formattedDate}
                  </p>
                  <p className="text-xs text-gray-500">{formattedTimeAgo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Priority</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(ticket.priority || 'Medium')}`} />
                    <span className="text-sm text-gray-900 capitalize">{ticket.priority || 'Medium'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-700 line-clamp-3">
                {ticket.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setShowDetails(true);
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal - Rendered for both desktop and mobile when showDetails is true */}
      {showDetails && (
        <TicketDetailsModal
          ticket={ticket}
          onClose={() => {
            setShowDetails(false);
            setIsExpanded(false);
          }}
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </>
  );
};

export default TicketAdminCard;