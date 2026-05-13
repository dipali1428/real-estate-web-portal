'use client';

import React, { useState, useEffect } from 'react';
import CustomerService from '@/app/services/customerService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import {
  CalendarDays,
  X,
  Video,
  Phone,
  MapPin,
  User,
  Mail,
  CheckCircle,
  MessageSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';

const TIME_SLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
];

const MEETING_TOPICS = [
  'NPS Account Opening',
  'Fund Allocation Review',
  'Tax Benefits Consultation',
  'Contribution Planning',
  'Withdrawal & Annuity Query',
  'Portfolio Rebalancing',
  'Other',
];

const ScheduleMeetingModal: React.FC<{
  onClose: () => void,
  initialData?: any
}> = ({
  onClose,
  initialData
}) => {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];

    const [step, setStep] = useState<'form' | 'success'>('form');

    const [selectedDate, setSelectedDate] = useState(initialData?.meeting_date ? new Date(initialData.meeting_date).toISOString().split('T')[0] : '');
    const [selectedTime, setSelectedTime] = useState(initialData?.meeting_time || '');

    const [meetingType, setMeetingType] = useState<
      'video' | 'phone' | 'in-person'
    >(initialData?.meeting_type || 'video');

    const [topic, setTopic] = useState(initialData?.topic || '');
    const [note, setNote] = useState(initialData?.note || '');
    const [whatsappNumber, setWhatsappNumber] = useState(initialData?.whatsapp_number || '');
    const [notifyWhatsapp, setNotifyWhatsapp] = useState(initialData?.notify_whatsapp !== undefined ? initialData.notify_whatsapp : true);
    const [fullName, setFullName] = useState(initialData?.customer_name || '');
    const [email, setEmail] = useState(initialData?.customer_email || '');

    const [loading, setLoading] = useState(false);

    const [userProfile, setUserProfile] = useState<any>(null);

    const [meetingResponse, setMeetingResponse] = useState<any>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await CustomerService.getProfile();

          let profileData = null;
          if (response.user) {
            profileData = response.user;
          } else if (response.data) {
            profileData = response.data;
          } else {
            profileData = response;
          }
          
          setUserProfile(profileData);
          if (!whatsappNumber && profileData?.mobile) {
            setWhatsappNumber(profileData.mobile);
          }
          if (!fullName && profileData?.name) {
            setFullName(profileData.name);
          }
          if (!email && profileData?.email) {
            setEmail(profileData.email);
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      };

      fetchProfile();
    }, []);

    const validate = () => {
      const e: Record<string, string> = {};

      if (!selectedDate) e.date = 'Please select a date';


      if (!selectedTime) e.time = 'Please select a time slot';

      if (!topic) e.topic = 'Please select a topic';
      
      if (!whatsappNumber) e.whatsapp = 'WhatsApp number is required';

      setErrors(e);

      return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
      if (!validate()) return;

      try {
        setLoading(true);

        const meetingData = {
          fullName: fullName,
          email: email,
          phone: whatsappNumber,
          whatsapp_number: whatsappNumber,
          notify_whatsapp: notifyWhatsapp,
          meetingType,
          selectedDate,
          selectedTime,
          topic,
          note,
        };

        console.log('Meeting Payload:', meetingData);

        let response;
        if (initialData?.id) {
          // Update mode
          const updateData = {
            meeting_date: selectedDate,
            meeting_time: selectedTime,
            topic,
            note: note || null,
            meeting_type: meetingType,
            phone: whatsappNumber,
            whatsapp_number: whatsappNumber,
            notify_whatsapp: notifyWhatsapp
          };
          response = await CustomerService.updateNPSMeeting(initialData.id, updateData);
        } else {
          // Create mode
          response = await CustomerService.scheduleNPSMeeting(meetingData);
        }

        console.log('Meeting Response:', response);

        if (response.success) {
          setMeetingResponse(response.data);

          setStep('success');

          toast.success(initialData?.id ? 'Meeting updated successfully!' : 'Meeting scheduled successfully!');

        } else {
          toast.error(
            response.message || 'Failed to process meeting'
          );
        }
      } catch (error: any) {
        console.error('Meeting Processing Error:', error);

        toast.error(
          error?.response?.data?.message ||
          error?.message ||
          'Failed to process meeting'
        );
      } finally {
        setLoading(false);
      }
    };

    const meetingTypes = [
      {
        id: 'video' as const,
        label: 'Video Call',
        icon: Video,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-300',
      },
      {
        id: 'phone' as const,
        label: 'Phone Call',
        icon: Phone,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-300',
      },
      {
        id: 'in-person' as const,
        label: 'In-Person',
        icon: MapPin,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-300',
      },
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
          }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {step === 'success' ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  delay: 0.1,
                }}
                className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-black text-gray-900 mb-1">
                {initialData?.id ? 'Meeting Rescheduled!' : 'Meeting Scheduled!'}
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Your advisor will reach out with confirmation.
              </p>

              <div className="bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 border border-[#2076C7]/10 rounded-2xl p-5 text-left space-y-3 mb-6">
                {[
                  {
                    icon: CalendarDays,
                    label: 'Date',
                    value: selectedDate
                      ? new Date(
                        selectedDate + 'T00:00:00'
                      ).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      : '',
                  },
                  {
                    icon: Clock,
                    label: 'Time',
                    value: selectedTime,
                  },
                  {
                    icon:
                      meetingTypes.find(
                        (m) => m.id === meetingType
                      )!.icon,
                    label: 'Type',
                    value:
                      meetingTypes.find(
                        (m) => m.id === meetingType
                      )!.label,
                  },
                  {
                    icon: MessageSquare,
                    label: 'Topic',
                    value: topic,
                  },
                ].map((row, i) => {
                  const Icon = row.icon;

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon
                          size={14}
                          className="text-[#2076C7]"
                        />
                      </div>

                      <div>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {row.label}
                        </p>

                        <p className="text-sm font-bold text-gray-900">
                          {row.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>



              {notifyWhatsapp && whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '').length === 10 ? '91' + whatsappNumber.replace(/\D/g, '') : whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I have scheduled an NPS consultation meeting for ${topic} on ${selectedDate} at ${selectedTime}. Meeting Link: https://meet.google.com/oio-bdwb-cxy. Please confirm.`)}`}


                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-4 inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20"
                >
                  <Phone size={18} fill="currentColor" />
                  Confirm on WhatsApp
                </a>
              )}

              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center shadow-md">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-gray-900">
                      {initialData?.id ? 'Reschedule a Meeting' : 'Schedule a Meeting'}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Book time with your NPS advisor
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Meeting Type
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {meetingTypes.map((type) => {
                      const Icon = type.icon;

                      const isSelected =
                        meetingType === type.id;

                      return (
                        <button
                          key={type.id}
                          onClick={() =>
                            setMeetingType(type.id)
                          }
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${isSelected
                            ? `${type.bg} ${type.border} shadow-sm`
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                            }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isSelected
                                ? type.color
                                : 'text-gray-400'
                            }
                          />

                          <span
                            className={`text-xs font-semibold ${isSelected
                              ? type.color
                              : 'text-gray-500'
                              }`}
                          >
                            {type.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>


                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Select Date{' '}
                    <span className="text-red-400">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      min={minDate}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);

                        setErrors((prev) => ({
                          ...prev,
                          date: '',
                        }));
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm text-gray-900 outline-none transition-all ${errors.date
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-gray-50 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10'
                        }`}
                    />
                  </div>

                  {errors.date && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Select Time{' '}
                    <span className="text-red-400">*</span>
                  </label>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedTime(slot);

                          setErrors((prev) => ({
                            ...prev,
                            time: '',
                          }));
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${selectedTime === slot
                          ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-[#2076C7] hover:text-[#2076C7] bg-white'
                          }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {errors.time && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.time}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Meeting Topic{' '}
                    <span className="text-red-400">*</span>
                  </label>

                  <select
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        topic: '',
                      }));
                    }}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-gray-900 outline-none transition-all appearance-none ${errors.topic
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-gray-50 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10'
                      }`}
                  >
                    <option value="">
                      Select a topic...
                    </option>

                    {MEETING_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  {errors.topic && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.topic}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    WhatsApp Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => {
                        setWhatsappNumber(e.target.value);
                        setErrors(prev => ({ ...prev, whatsapp: '' }));
                      }}
                      placeholder="Enter your WhatsApp number"
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm text-gray-900 outline-none transition-all ${
                        errors.whatsapp ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10'
                      }`}
                    />
                  </div>
                  {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
                </div>

                <div className="flex items-center gap-2 px-1">
                  <input
                    type="checkbox"
                    id="notifyWhatsapp"
                    checked={notifyWhatsapp}
                    onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#2076C7] focus:ring-[#2076C7]"
                  />
                  <label htmlFor="notifyWhatsapp" className="text-xs font-medium text-gray-600 cursor-pointer">
                    Get meeting updates on WhatsApp
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Additional Notes{' '}
                    <span className="text-gray-400 font-normal normal-case">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) =>
                      setNote(e.target.value)
                    }
                    placeholder="Share any specific questions or context for your advisor..."
                    className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-[#2076C7]/5 to-[#1CADA3]/5 border border-[#2076C7]/10 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User
                      size={18}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Your NPS Advisor
                    </p>

                    <p className="text-xs text-gray-500">
                      Infinity Arthvishva Financial Services
                    </p>
                  </div>

                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 ${loading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-90'
                    }`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CalendarDays size={16} />
                      {initialData?.id ? 'Confirm Reschedule' : 'Confirm Meeting'}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  };

export default ScheduleMeetingModal;