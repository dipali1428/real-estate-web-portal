'use client';

import React from 'react';
import { motion} from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Mail,
} from 'lucide-react';

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

interface Props {
  meeting: Meeting;
  onClose: () => void;
}

const MeetingDetailsModal: React.FC<Props> = ({ meeting, onClose }) => {
  const getMeetingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video size={20} />;
      case 'phone': return <Phone size={20} />;
      case 'in-person': return <MapPin size={20} />;
      default: return <Calendar size={20} />;
    }
  };

  const isMeetingToday = () => {
    if (!meeting.meeting_date) return false;
    const meetingDate = new Date(meeting.meeting_date);
    const today = new Date();
    return (
      meetingDate.getDate() === today.getDate() &&
      meetingDate.getMonth() === today.getMonth() &&
      meetingDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              {getMeetingIcon(meeting.meeting_type)}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-0.5 block">Meeting Details</span>
              <h3 className="text-lg font-bold">{meeting.topic}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-wider border border-white/20">
              {meeting.status}
            </span>
            <span className="px-2.5 py-0.5 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-wider border border-white/20">
              {meeting.meeting_type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Customer Section */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Customer Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-[#2076C7]">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Name</p>
                  <p className="text-sm font-bold text-slate-800">{meeting.customer_name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7]">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Email</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{meeting.customer_email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Schedule Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#1CADA3]">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Date</p>
                  <p className="text-sm font-bold text-slate-800">
                    {new Date(meeting.meeting_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-[#1CADA3]">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Time Slot</p>
                  <p className="text-sm font-bold text-slate-800">{meeting.meeting_time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Section */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Communication Preferences</h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <Phone size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">WhatsApp Number</p>
                  <p className="text-sm font-bold text-slate-800">{meeting.whatsapp_number || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center self-start sm:self-auto gap-2 px-3 py-1.5 bg-white rounded-full border border-emerald-100">
                <div className={`w-2 h-2 rounded-full ${meeting.notify_whatsapp ? 'bg-[#1CADA3]' : 'bg-slate-300'}`} />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                  {meeting.notify_whatsapp ? 'WhatsApp Active' : 'WhatsApp Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Location Section (In-Person only) */}
          {meeting.meeting_type?.toLowerCase() === 'in-person' && (
            <div className="space-y-3">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Meeting Location</h4>
              <div className="flex items-start gap-3 p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div className="w-8 h-8 shrink-0 rounded-xl bg-indigo-100/50 flex items-center justify-center text-indigo-600">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Office Address</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    1001 & 1201, 7 Business Square<br />
                    Shivajinagar, Pune, MH 411016
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes Section */}
          {meeting.note && (
            <div className="space-y-3">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Additional Notes</h4>
              <div className="p-3.5 bg-blue-50/30 rounded-2xl border border-blue-100/50">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{meeting.note}"
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 pt-0 flex flex-col gap-2.5">
          {meeting.meeting_link && meeting.status !== 'CANCELLED' && meeting.meeting_type?.toLowerCase() !== 'in-person' && (
            <a
              href={isMeetingToday() ? meeting.meeting_link : '#'}
              target={isMeetingToday() ? "_blank" : undefined}
              rel={isMeetingToday() ? "noopener noreferrer" : undefined}
              className={`w-full flex items-center justify-center gap-2 py-3.5 bg-white text-[#2076C7] border-2 border-[#2076C7]/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isMeetingToday() ? 'hover:border-[#2076C7] hover:bg-blue-50' : 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => {
                if (!isMeetingToday()) {
                  e.preventDefault();
                  // alert("You can only join the meeting on the scheduled date.");
                }
              }}
            >
              <Video size={16} />
              {isMeetingToday() ? "Join Google Meet" : "Link active on meeting day"}
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MeetingDetailsModal;
