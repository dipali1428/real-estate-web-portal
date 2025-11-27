"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function RealEstateForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    capitalAvailable: "",
    appointmentDate: "",
    realestateType: "",
    notRobot: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "notRobot") {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.notRobot) {
      newErrors.notRobot = "Please confirm you are not a robot";
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

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Real Estate Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input 
                label="Client Name" 
                name="clientName"
                placeholder="Enter Client Name" 
                value={formData.clientName}
                onChange={handleChange}
                error={errors.clientName}
              />

              <Input 
                label="Client Phone No" 
                name="phone"
                placeholder="Enter Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                maxLength={10}
              />

              <Input 
                label="Client Email ID" 
                name="email"
                placeholder="Enter Email" 
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* Date Input - handled separately */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent mt-1"
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              <Input 
                label="Location" 
                name="location"
                placeholder="Enter Location" 
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
              />

              <Input 
                label="Capital Available" 
                name="capitalAvailable"
                placeholder="Enter Capital Available" 
                value={formData.capitalAvailable}
                onChange={handleChange}
                error={errors.capitalAvailable}
              />

              {/* Appointment Date - handled separately */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700 mb-1">Take an Appointment</label>
                <input
                  name="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent mt-1"
                />
                {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
              </div>

              {/* REAL ESTATE TYPE DROPDOWN */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Type of Real Estate</label>
                <select
                  name="realestateType"
                  value={formData.realestateType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="investment">Investment</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
                {errors.realestateType && <p className="text-red-500 text-xs mt-1">{errors.realestateType}</p>}
              </div>

              {/* CHECKBOX */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4">
                <input 
                  name="notRobot"
                  type="checkbox" 
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <label className="text-gray-700 text-sm sm:text-base">I am not a Robot</label>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>}

              {/* SUBMIT BUTTON */}
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  maxLength,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent mt-1"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}