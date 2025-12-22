"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function PMSAIFForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    pincode: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Handle Number Input Change (for phone and pincode)
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Allow only numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: numericValue,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Helper function to format date as YYYY-MM-DD in local timezone
  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper function to get today's date in local timezone
  const getTodayLocal = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  // Handle Date Selection from Calendar
  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDateLocal(date);
    
    setFormData(prev => ({
      ...prev,
      appointmentDate: formattedDate,
      appointmentTime: "" // Reset time when date changes
    }));
    
    setErrors(prev => ({ ...prev, appointmentDate: "" }));
  };

  // Generate calendar for current month (compact version)
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    
    // Calculate starting day (0 = Sunday, 1 = Monday, etc.)
    const startingDay = firstDay.getDay();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Current month days only (no previous/next month)
    const today = getTodayLocal();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isPastDate = date < today;
      
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled: isPastDate,
        isToday: formatDateLocal(date) === formatDateLocal(today),
        isSelected: formData.appointmentDate === formatDateLocal(date)
      });
    }
    
    return { days, startingDay };
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Generate time slots with disabled past times - STARTING FROM 10:00 AM
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const todayLocal = formatDateLocal(now);
    const selectedDate = formData.appointmentDate;
    
    // Start from 10:00 AM instead of 9:00 AM
    for (let hour = 10; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // End at 5:00 PM
        
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        
        // Check if this time slot is in the past
        let isDisabled = false;
        
        if (selectedDate === todayLocal) {
          // For today's date, disable past times
          const slotTime = new Date();
          slotTime.setHours(hour, minute, 0, 0);
          
          if (slotTime < now) {
            isDisabled = true;
          }
        }
        
        slots.push({
          value: time,
          display: displayTime,
          hour: hour,
          minute: minute,
          period: hour >= 12 ? 'PM' : 'AM',
          isDisabled: isDisabled
        });
      }
    }
    return slots;
  };

  // Update available time slots when date changes
  useEffect(() => {
    const slots = generateTimeSlots();
    setAvailableTimeSlots(slots);
    
    // If the currently selected time is now disabled, clear it
    if (formData.appointmentTime) {
      const selectedSlot = slots.find(slot => slot.value === formData.appointmentTime);
      if (selectedSlot && selectedSlot.isDisabled) {
        setFormData(prev => ({ ...prev, appointmentTime: "" }));
      }
    }
  }, [formData.appointmentDate]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Check all required fields
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client Name is required";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      // Validate that dob is not a future date
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate > today) {
        newErrors.dob = "Date of Birth cannot be in the future";
      }
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    
    // MAKE DATE AND TIME MANDATORY
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    }
    
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = "Appointment time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    alert("Form Submitted Successfully!");
    console.log("Form Data:", formData);
  };

  const { days: calendarDays, startingDay } = generateCalendar();
  const timeSlots = availableTimeSlots;
  // Use full weekday names to avoid duplicate keys, but display only first letter
  const weekDays = [
    { key: 'Sun', display: 'S' },
    { key: 'Mon', display: 'M' },
    { key: 'Tue', display: 'T' },
    { key: 'Wed', display: 'W' },
    { key: 'Thu', display: 'T' },
    { key: 'Fri', display: 'F' },
    { key: 'Sat', display: 'S' }
  ];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">PMS / AIF Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Client Name - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="clientName"
                    type="text" 
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter Client Name" 
                    required
                  />
                  {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
                </div>

                {/* Phone Number - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Client Phone No <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="phone"
                    type="tel" 
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleNumberChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter Client Phone No" 
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Client Email ID <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter Client Email ID" 
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Date of Birth - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Client Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="dob"
                    type="date" 
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    required
                  />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>

                {/* Location - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="location"
                    type="text" 
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter location" 
                    required
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                {/* Pincode - Required */}
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="pincode"
                    type="text" 
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleNumberChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter pincode" 
                    required
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Appointment Section - Compact at Bottom */}
              <div className="border-t pt-4 sm:pt-6 mt-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mb-3 flex items-center gap-2">
                  <Calendar size={18} />
                  Book an Appointment <span className="text-red-500">*</span>
                </h3>
                
                <div className="space-y-4">
                  {/* Selected Date & Time Display */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={14} className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Selected Date:</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {formData.appointmentDate 
                            ? formatDisplayDate(formData.appointmentDate)
                            : <span className="text-red-400">Please select a date</span>}
                        </div>
                      </div>
                      
                      <div className="h-8 w-px bg-gray-300 mx-2"></div>
                      
                      <div className="flex-1 text-gray-500">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Selected Time:</span>
                        </div>
                        <div className="text-sm">
                          {formData.appointmentTime 
                            ? (() => {
                                const [hour, minute] = formData.appointmentTime.split(':');
                                const hourNum = parseInt(hour);
                                const ampm = hourNum >= 12 ? 'PM' : 'AM';
                                const displayHour = hourNum > 12 ? hourNum - 12 : hourNum;
                                return `${displayHour}:${minute} ${ampm}`;
                              })()
                            : <span className="text-red-400">Please select a time</span>}
                        </div>
                      </div>
                    </div>
                    {(errors.appointmentDate || errors.appointmentTime) && (
                      <div className="mt-2 flex gap-2">
                        {errors.appointmentDate && <p className="text-red-500 text-xs">{errors.appointmentDate}</p>}
                        {errors.appointmentTime && <p className="text-red-500 text-xs">{errors.appointmentTime}</p>}
                      </div>
                    )}
                  </div>

                  {/* Calendar and Time Slots Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left Column: Calendar */}
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          type="button"
                          onClick={() => navigateMonth('prev')}
                          className="p-1 hover:bg-gray-100 rounded-md"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h4>
                        <button
                          type="button"
                          onClick={() => navigateMonth('next')}
                          className="p-1 hover:bg-gray-100 rounded-md"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Week Days Header - Fixed with unique keys */}
                      <div className="grid grid-cols-7 gap-0.5 mb-2">
                        {weekDays.map(day => (
                          <div key={day.key} className="text-center text-xs font-medium text-gray-500 py-0.5">
                            {day.display}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days - Compact */}
                      <div className="grid grid-cols-7 gap-0.5">
                        {/* Empty cells for days before the 1st of the month */}
                        {Array.from({ length: startingDay }).map((_, index) => (
                          <div key={`empty-${index}`} className="h-7"></div>
                        ))}
                        
                        {/* Days of the current month */}
                        {calendarDays.map((day, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                            disabled={day.isDisabled}
                            className={`
                              h-7 rounded text-xs flex items-center justify-center
                              ${day.isSelected 
                                ? 'bg-[#1CADA3] text-white font-medium' 
                                : day.isToday 
                                  ? 'bg-blue-50 text-blue-600 font-medium'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }
                              ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            title={day.date.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          >
                            {day.date.getDate()}
                          </button>
                        ))}
                      </div>
                      {errors.appointmentDate && (
                        <p className="text-red-500 text-xs mt-2 text-center">{errors.appointmentDate}</p>
                      )}
                    </div>

                    {/* Right Column: Time Slots */}
                    <div className="border border-gray-200 rounded-lg p-3">
                      <label className="font-medium mb-3 text-gray-700 text-sm flex items-center gap-2">
                        <Clock size={16} />
                        Select Time Slot <span className="text-red-500">*</span>
                      </label>
                      <div className="overflow-y-auto max-h-[200px] pr-1">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {timeSlots.map((slot, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => !slot.isDisabled && setFormData(prev => ({ ...prev, appointmentTime: slot.value }))}
                              disabled={slot.isDisabled}
                              className={`
                                py-2 px-2 rounded border text-sm font-medium transition-colors whitespace-nowrap
                                ${formData.appointmentTime === slot.value
                                  ? 'bg-[#1CADA3] text-white border-[#1CADA3]'
                                  : slot.isDisabled
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }
                              `}
                              title={slot.isDisabled ? "This time slot has passed" : `Select ${slot.display}`}
                            >
                              {slot.display}
                              {slot.isDisabled && (
                                <span className="text-xs ml-1 opacity-70"></span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        <p>Available slots: 10:00 AM - 5:00 PM</p>
                        <p>30-minute intervals</p>
                        {formData.appointmentDate && formData.appointmentDate === formatDateLocal(new Date()) && (
                          <p className="text-amber-600">Past time slots are disabled for today</p>
                        )}
                      </div>
                      {errors.appointmentTime && (
                        <p className="text-red-500 text-xs mt-2">{errors.appointmentTime}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Full width at the very bottom */}
              <div className="md:col-span-2 flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-[#1CADA3] text-white px-8 py-3 rounded-md font-medium hover:bg-[#16948d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
                >Submit Form
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}