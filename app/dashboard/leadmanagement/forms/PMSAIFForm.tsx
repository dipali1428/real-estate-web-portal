"use client";
import { useState, useEffect, useMemo } from "react";
import { X, CheckCircle, Calendar, Clock, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const STYLES = {
  input: (err: boolean) => `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all placeholder-gray-400 appearance-none ${err ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"}`,
  label: "block text-sm font-medium mb-1 text-gray-700",
  btn: "w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  err: "text-red-500 text-xs mt-1"
};

export default function PMSAIFForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<any>({
    clientName: "", phone: "", email: "", dob: "", location: "",
    pincode: "", appointmentDate: "", appointmentTime: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- ORIGINAL LOGIC HELPERS ---
  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayLocal = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      direction === 'prev' ? newDate.setMonth(prev.getMonth() - 1) : newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // --- CALENDAR & TIME GENERATION ---
  const calendar = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = getTodayLocal();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isDisabled: date < today,
        isToday: formatDateLocal(date) === formatDateLocal(today),
        isSelected: form.appointmentDate === formatDateLocal(date)
      });
    }
    return { days, startingDay: firstDay };
  }, [currentMonth, form.appointmentDate]);

  useEffect(() => {
    const slots = [];
    const now = new Date();
    const todayLocal = formatDateLocal(now);
    for (let hour = 10; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        let isDisabled = false;
        if (form.appointmentDate === todayLocal) {
          const slotTime = new Date();
          slotTime.setHours(hour, minute, 0, 0);
          if (slotTime < now) isDisabled = true;
        }
        slots.push({ value: time, display: displayTime, isDisabled });
      }
    }
    setAvailableTimeSlots(slots);
  }, [form.appointmentDate]);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    const req = (f: string, msg: string) => { if (!form[f]?.trim()) errs[f] = msg; };
    req("clientName", "Name is required");
    req("dob", "DOB is required");
    req("location", "Location is required");
    req("appointmentDate", "Appointment date is required");
    req("appointmentTime", "Appointment time is required");
    if (!form.phone || form.phone.length !== 10) errs.phone = "10-digit phone required";
    if (!form.pincode || form.pincode.length !== 6) errs.pincode = "6-digit pincode required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 text-gray-700 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto my-auto flex flex-col relative max-h-[90vh]">
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 shrink-0 bg-white rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">PMS / AIF Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><X size={20} className="sm:w-6 sm:h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Field label="Client Name" placeholder="Enter Client Name" {...fieldProps("clientName")} required />
              <Field label="Client Phone No" placeholder="Enter Client Phone No" onlyNumber maxLength={10} {...fieldProps("phone")} required />
              <Field label="Client Email ID" type="email" placeholder="Enter Client Email ID" {...fieldProps("email")} required />
              <Field label="Client Date of Birth" type="date" {...fieldProps("dob")} required />
              <Field label="Location" placeholder="Enter location" {...fieldProps("location")} required />
              <Field label="Pincode" placeholder="Enter pincode" onlyNumber maxLength={6} {...fieldProps("pincode")} required />
            </div>

            {/* --- ORIGINAL APPOINTMENT SECTION --- */}
            <div className="border-t pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mb-3 flex items-center gap-2">
                <Calendar size={18} /> Book an Appointment <span className="text-red-500">*</span>
              </h3>
              
              <div className="space-y-4">
                {/* Summary Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Selected Date:</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {form.appointmentDate ? formatDisplayDate(form.appointmentDate) : <span className="text-red-400">Please select a date</span>}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-300 mx-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 text-gray-700">
                        <Clock size={14} className="text-gray-500" />
                        <span className="text-sm font-medium">Selected Time:</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {form.appointmentTime ? availableTimeSlots.find(s => s.value === form.appointmentTime)?.display : <span className="text-red-400">Please select a time</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Calendar Column */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <button type="button" onClick={() => navigateMonth('prev')} className="p-1 hover:bg-gray-100 rounded-md"><ChevronLeft size={18} /></button>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h4>
                      <button type="button" onClick={() => navigateMonth('next')} className="p-1 hover:bg-gray-100 rounded-md"><ChevronRight size={18} /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <div key={i} className="text-center text-xs font-medium text-gray-500 py-0.5">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5">
                      {Array.from({ length: calendar.startingDay }).map((_, i) => <div key={i} className="h-7"></div>)}
                      {calendar.days.map((day, i) => (
                        <button
                          key={i} type="button" disabled={day.isDisabled}
                          onClick={() => handleInputChange("appointmentDate", formatDateLocal(day.date))}
                          className={`h-7 rounded text-xs flex items-center justify-center 
                            ${day.isSelected ? 'bg-[#1CADA3] text-white font-medium' : day.isToday ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'} 
                            ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {day.date.getDate()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots Column */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <label className="font-medium mb-3 text-gray-700 text-sm flex items-center gap-2"><Clock size={16} /> Select Time Slot <span className="text-red-500">*</span></label>
                    <div className="overflow-y-auto max-h-[200px] pr-1">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableTimeSlots.map((slot, i) => (
                          <button
                            key={i} type="button" disabled={slot.isDisabled}
                            onClick={() => handleInputChange("appointmentTime", slot.value)}
                            className={`py-2 px-2 rounded border text-sm font-medium transition-colors whitespace-nowrap 
                              ${form.appointmentTime === slot.value ? 'bg-[#1CADA3] text-white border-[#1CADA3]' : slot.isDisabled ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500 space-y-0.5">
                      <p>Available slots: 10:00 AM - 5:00 PM</p>
                      <p>30-minute intervals</p>
                      {form.appointmentDate === formatDateLocal(new Date()) && <p className="text-amber-600">Past time slots are disabled for today</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 pb-2">
              <button type="submit" disabled={isSubmitting} className={STYLES.btn}>{isSubmitting ? "Submitting..." : "Submit Form"}</button>
            </div>
          </form>
        </div>
        {showSuccess && <SuccessModal onClose={onClose} />}
      </div>
    </div>
  );

  function fieldProps(name: string) {
    return { value: form[name], onChange: (v: string) => handleInputChange(name, v), error: errors[name] };
  }
}

function Field({ label, value, onChange, type = "text", options, required, placeholder, onlyNumber, maxLength, error }: any) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onlyNumber && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key) && !/^[0-9]$/.test(e.key)) e.preventDefault();
  };
  return (
    <div className="w-full relative">
      <label className={STYLES.label}>{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        {type === "select" ? (
          <>
            <select value={value} onChange={e => onChange(e.target.value)} className={`${STYLES.input(!!error)} cursor-pointer`}>
              <option value="">Select {label}</option>
              {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
          </>
        ) : (
          <input type={type} value={value} onChange={e => onChange(e.target.value)} onKeyDown={handleKeyDown} maxLength={maxLength} placeholder={placeholder} className={STYLES.input(!!error)} />
        )}
      </div>
      {error && <p className={STYLES.err}>{error}</p>}
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-xl animate-in fade-in zoom-in duration-200">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center max-w-sm w-[90%]">
        <CheckCircle className="w-16 h-16 text-[#1CADA3] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">Your appointment request has been submitted successfully.</p>
        <button onClick={onClose} className="w-full bg-[#1CADA3] text-white py-2.5 rounded-lg hover:bg-[#178e86] font-medium transition-colors">Okay, Got it</button>
      </div>
    </div>
  );
}