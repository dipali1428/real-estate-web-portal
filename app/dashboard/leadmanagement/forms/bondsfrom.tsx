"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function BondsForm({
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
    depositAmount: "",
    monthlyIncome: "",
    safetyType: "",
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

  // Handle Number Input Change (for phone, deposit amount, and monthly income)
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

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.dob = "Date of birth must be in the past";
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.depositAmount.trim()) {
      newErrors.depositAmount = "Deposit amount is required";
    } else if (parseInt(formData.depositAmount) <= 0) {
      newErrors.depositAmount = "Deposit amount must be greater than 0";
    }

    if (!formData.monthlyIncome.trim()) {
      newErrors.monthlyIncome = "Monthly income is required";
    } else if (parseInt(formData.monthlyIncome) <= 0) {
      newErrors.monthlyIncome = "Monthly income must be greater than 0";
    }

    if (!formData.safetyType) {
      newErrors.safetyType = "Safety type is required";
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
    // Here you would typically send the data to your backend
    // For example: await submitForm(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Bonds Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              {/* Client Name */}
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

              {/* Phone Number */}
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

              {/* Email */}
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

              {/* Date of Birth */}
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

              {/* Location */}
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

              {/* Lumpsum Deposit Amount */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Lumpsum Deposit Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    name="depositAmount"
                    type="text" 
                    value={formData.depositAmount}
                    onChange={handleNumberChange}
                    className="w-full border border-gray-300 rounded-md p-2 pl-8 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter Lumpsum Deposit Amount" 
                    required
                  />
                </div>
                {errors.depositAmount && <p className="text-red-500 text-xs mt-1">{errors.depositAmount}</p>}
              </div>

              {/* Total Monthly Income */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Total Monthly Income <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input 
                    name="monthlyIncome"
                    type="text" 
                    value={formData.monthlyIncome}
                    onChange={handleNumberChange}
                    className="w-full border border-gray-300 rounded-md p-2 pl-8 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                    placeholder="Enter Total Monthly Income" 
                    required
                  />
                </div>
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>

              {/* Safety Type */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Safety Type <span className="text-red-500">*</span>
                </label>
                <select 
                  name="safetyType"
                  value={formData.safetyType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  required
                >
                  <option value="">Select Safety Type</option>
                  <option value="Corporate Bonds">Corporate Bonds</option>
                  <option value="Sovereign Gold Bonds">Sovereign Gold Bonds</option>
                  <option value="Government Bonds">Government Bonds</option>
                  <option value="Municipal Bonds">Municipal Bonds</option>
                </select>
                {errors.safetyType && <p className="text-red-500 text-xs mt-1">{errors.safetyType}</p>}
              </div>

              {/* Submit Button */}
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