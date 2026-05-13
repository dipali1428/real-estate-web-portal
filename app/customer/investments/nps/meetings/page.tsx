'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  Edit3, 
  Calendar,
} from 'lucide-react';
import CustomerService from '@/app/services/customerService';
import { toast } from 'react-hot-toast';
import ScheduleMeetingModal from '../ScheduleMeetingModal';
import MeetingDetailsModal from './components/MeetingDetailsModal';

interface Meeting {
  id: number;
  meeting_date: string;
  meeting_time: string;
  topic: string;
  meeting_type: string;
  status: string;
  meeting_link?: string;
  note?: string;
  whatsapp_number?: string;
  notify_whatsapp?: boolean;
  customer_name?: string;
  customer_email?: string;
}

const NPSMeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [viewingMeeting, setViewingMeeting] = useState<Meeting | null>(null);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await CustomerService.getMyNPSMeetings();
      if (response.success) {
        setMeetings(response.data);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'COMPLETE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'INCOMPLETE': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMeetingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video size={16} />;
      case 'phone': return <Phone size={16} />;
      case 'in-person': return <MapPin size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#2076C7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (meetings.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-16 text-center border border-slate-100 shadow-sm overflow-hidden relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-blue-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-[1.2rem] sm:rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 transition-transform duration-500">
          <CalendarDays className="text-white w-7 h-7 sm:w-9 sm:h-9" />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">No consultations yet</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Ready to optimize your retirement? Schedule a meeting with our certified NPS advisors to review your portfolio.
        </p>
        
        <button
          onClick={() => (window as any).dispatchEvent(new CustomEvent('openScheduleModal'))}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl sm:rounded-2xl hover:opacity-90 transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Schedule Now
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <h3 className="text-lg sm:text-xl font-black text-[#1a2b4b]">Your Scheduled Meetings</h3>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#2076C7] text-[10px] sm:text-xs font-bold">
            {meetings.length}
          </span>
        </div>

        <button
          onClick={() => (window as any).dispatchEvent(new CustomEvent('openScheduleModal'))}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-blue-500/20 hover:opacity-90 transition-all active:scale-95"
        >
          <CalendarDays size={14} className="text-white" />
          Schedule Meeting
        </button>
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {meetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setViewingMeeting(meeting)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 relative flex items-start gap-3 sm:gap-4 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group"
            >
              {/* Left Icon Box */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#2076C7] group-hover:bg-blue-50 transition-colors flex-shrink-0">
                {getMeetingIcon(meeting.meeting_type)}
              </div>

              {/* Middle Content */}
              <div className="flex-1 min-w-0 pr-16 sm:pr-20">
                <h4 className="text-sm sm:text-base font-black text-[#1a2b4b] mb-1 truncate sm:whitespace-normal line-clamp-1">{meeting.topic}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-bold">
                    <Calendar size={12} className="text-[#2076C7]" />
                    {new Date(meeting.meeting_date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 font-bold">
                    <Clock size={12} className="text-[#2076C7]" />
                    {meeting.meeting_time}
                  </div>
                </div>
              </div>

              {/* Top Right Status */}
              <div className="absolute top-4 right-4">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 bg-gray-100 text-[#1a2b4b] rounded-full border border-gray-200 whitespace-nowrap">
                  {meeting.status}
                </span>
              </div>

              {/* Bottom Right Actions */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingMeeting(meeting);
                  }}
                  className="p-1.5 text-slate-300 hover:text-[#2076C7] hover:bg-blue-50 rounded-lg transition-all"
                  title="Reschedule"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {viewingMeeting && (
        <MeetingDetailsModal 
          meeting={viewingMeeting} 
          onClose={() => setViewingMeeting(null)} 
        />
      )}

      {editingMeeting && (
        <ScheduleMeetingModal 
          onClose={() => {
            setEditingMeeting(null);
            fetchMeetings();
          }} 
          initialData={editingMeeting}
        />
      )}
    </div>
  );
};

export default NPSMeetingsPage;
