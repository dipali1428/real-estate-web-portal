"use client";

import { useState } from "react";
import { X } from "lucide-react";

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
    notRobot: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (formData.pincode && formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
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
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">PMS / AIF Form</h2>
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
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Name</label>
                <input 
                  name="clientName"
                  type="text" 
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter Client Name" 
                />
                {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Phone No</label>
                <input 
                  name="phone"
                  type="tel" 
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter Client Phone No" 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Email ID</label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter Client Email ID" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Date of Birth</label>
                <input 
                  name="dob"
                  type="date" 
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              {/* Location */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Location</label>
                <input 
                  name="location"
                  type="text" 
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter location" 
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Pincode */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Pincode</label>
                <input 
                  name="pincode"
                  type="text" 
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter pincode" 
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>

              {/* Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input 
                  name="notRobot"
                  type="checkbox" 
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <span className="text-sm sm:text-base">I am not a Robot</span>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>}

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