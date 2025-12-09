// app/admin/support-tickets/TicketDetailsModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Send, User, Mail, Phone, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { AdminService } from '@/app/services/adminService';

const TicketDetailsModal = ({ 
  ticket, 
  onClose, 
  onStatusUpdate 
}: { 
  ticket: any;
  onClose: () => void;
  onStatusUpdate: (ticketId: string, status: string) => void;
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(ticket.comments || []);
  const [sendingComment, setSendingComment] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    dsaInfo: true,
    ticketDetails: true,
    description: true,
    comments: true,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  useEffect(() => {
    setIsMounted(true);
    formatDateTime();
  }, [ticket.created_at]);

  const formatDateTime = () => {
    if (!ticket.created_at) return;
    
    const date = new Date(ticket.created_at);
    
    // Format as DD/MM/YYYY, HH:MM AM/PM
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Format time in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    setFormattedDateTime(`${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setSendingComment(true);
    
    try {
      // Call API to add comment
      const response = await AdminService.addComment(ticket._id, newComment);
      
      // Update local comments
      const newCommentObj = {
        _id: response.id || `comment_${Date.now()}`,
        text: newComment,
        author: 'Admin User',
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    } finally {
      setSendingComment(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddComment();
    }
  };

  const formatCommentDate = (dateString: string) => {
    if (!isMounted) return '';
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  const getGridClasses = () => {
    return "grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6";
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden mx-2 sm:mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              Ticket #{ticket.ticket_id}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">
              {ticket.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          {/* Ticket Info */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('dsaInfo')}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                Ticket Information
              </h3>
              {expandedSections.dsaInfo ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.dsaInfo && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className={getGridClasses()}>
                  {/* DSA Info */}
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">DSA Information</h4>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 w-16 sm:w-auto">Name:</span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{ticket.name}</span>
                      </div>
                      {ticket.email && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm text-gray-600 w-16 sm:w-auto">Email:</span>
                          <span className="font-medium text-gray-900 text-sm sm:text-base break-all">
                            {ticket.email}
                          </span>
                        </div>
                      )}
                      {ticket.phone && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="text-xs sm:text-sm text-gray-600 w-16 sm:w-auto">Phone:</span>
                          <a 
                            href={`tel:${ticket.phone}`}
                            className="font-medium text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base break-all"
                          >
                            {ticket.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">Ticket Details</h4>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 w-20 sm:w-auto">Category:</span>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{ticket.category}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 w-20 sm:w-auto">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${
                          ticket.status === 'Open' ? 'bg-red-100 text-red-800 border-red-200' :
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 w-20 sm:w-auto">Created:</span>
                        <span className="font-medium text-gray-900 text-xs sm:text-sm">
                          {formattedDateTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 lg:space-y-4">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">Update Status</h4>
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap gap-2">
                      {['Resolved', 'Closed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            onStatusUpdate(ticket._id, status);
                            onClose();
                          }}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                            ticket.status === status
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Mark as {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('description')}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                Description
              </h3>
              {expandedSections.description ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.description && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                    {ticket.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div>
            <button
              onClick={() => toggleSection('comments')}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                  Comments ({comments.length})
                </h3>
              </div>
              {expandedSections.comments ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.comments && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {/* Comments List */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {comments.map((comment: any) => (
                    <div
                      key={comment._id}
                      className={`p-3 sm:p-4 rounded-lg ${
                        comment.role === 'admin'
                          ? 'bg-blue-50 border border-blue-100 ml-0 sm:ml-4'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{comment.author}</span>
                          <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${
                            comment.role === 'admin'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {comment.role}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatCommentDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base">{comment.text}</p>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                      No comments yet. Be the first to respond.
                    </div>
                  )}
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6 text-gray-700">
                  <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Add Comment</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your response here... (Ctrl+Enter to send)"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                      rows={3}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={sendingComment || !newComment.trim()}
                      className="self-end sm:self-start px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                    >
                      {sendingComment ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 mb-10">
                    Your comment will be visible to the DSA who raised this ticket.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar for Mobile */}
        <div className="lg:hidden border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
            {ticket.status === 'Open' && (
              <select
                onChange={(e) => {
                  onStatusUpdate(ticket._id, e.target.value);
                  onClose();
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
                defaultValue=""
              >
                <option value="" disabled>Update Status</option>
                <option value="Resolved">Mark Resolved</option>
                <option value="Closed">Mark Closed</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;