"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function MutualFundForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    pan: "",
    nomineeName: "",
    nomineeDob: "",
    nomineeRelation: "",
    incomeRange: "",
    occupation: "",
    mutualType: "",
    amount: "",
    fundName: "",
    sipDate: "",
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
      if (!value && key !== "sipDate" && key !== "notRobot") {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.pan && formData.pan.length !== 10) {
      newErrors.pan = "PAN number must be 10 characters";
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
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Mutual Fund Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700">

              {/* Client Name */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Name</label>
                <input 
                  name="clientName"
                  type="text" 
                  placeholder="Enter client name" 
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Phone Number</label>
                <input 
                  name="phone"
                  type="tel" 
                  maxLength={10}
                  placeholder="Enter 10-digit phone number" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Email ID</label>
                <input 
                  name="email"
                  type="email" 
                  placeholder="Enter email address" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* PAN */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">PAN Number</label>
                <input 
                  name="pan"
                  type="text" 
                  placeholder="Enter PAN number" 
                  value={formData.pan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
              </div>

              {/* Nominee Name */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Nominee Name</label>
                <input 
                  name="nomineeName"
                  type="text" 
                  placeholder="Enter nominee name" 
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.nomineeName && <p className="text-red-500 text-xs mt-1">{errors.nomineeName}</p>}
              </div>

              {/* Nominee DOB */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Nominee Date of Birth</label>
                <input 
                  name="nomineeDob"
                  type="date" 
                  value={formData.nomineeDob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.nomineeDob && <p className="text-red-500 text-xs mt-1">{errors.nomineeDob}</p>}
              </div>

              {/* Nominee Relation */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Nominee Relation</label>
                <input 
                  name="nomineeRelation"
                  type="text" 
                  placeholder="Enter relation" 
                  value={formData.nomineeRelation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.nomineeRelation && <p className="text-red-500 text-xs mt-1">{errors.nomineeRelation}</p>}
              </div>

              {/* Income Range */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Income Range</label>
                <select
                  name="incomeRange"
                  value={formData.incomeRange}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select income range</option>
                  <option value="0-5L">0-5 Lakhs</option>
                  <option value="5-10L">5-10 Lakhs</option>
                  <option value="10-20L">10-20 Lakhs</option>
                  <option value="20L+">20 Lakhs+</option>
                </select>
                {errors.incomeRange && <p className="text-red-500 text-xs mt-1">{errors.incomeRange}</p>}
              </div>

              {/* Occupation */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Occupation</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select occupation</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business">Business</option>
                  <option value="Professional">Professional</option>
                  <option value="Retired">Retired</option>
                  <option value="Student">Student</option>
                </select>
                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
              </div>

              {/* Mutual Fund Type */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Type of Mutual Fund</label>
                <select
                  name="mutualType"
                  value={formData.mutualType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="sip">SIP</option>
                  <option value="lumpsum">Lumpsum</option>
                </select>
                {errors.mutualType && <p className="text-red-500 text-xs mt-1">{errors.mutualType}</p>}
              </div>

              {/* Amount */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Amount</label>
                <input 
                  name="amount"
                  type="number" 
                  placeholder="Enter amount" 
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>

              {/* Fund Name */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">Fund Name</label>
                <input 
                  name="fundName"
                  type="text" 
                  placeholder="Enter name of fund" 
                  value={formData.fundName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
                {errors.fundName && <p className="text-red-500 text-xs mt-1">{errors.fundName}</p>}
              </div>

              {/* SIP Date */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">SIP Date (if applicable)</label>
                <input 
                  name="sipDate"
                  type="date" 
                  value={formData.sipDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                />
              </div>

              {/* FILE UPLOADS */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-base sm:text-lg font-semibold text-[#1CADA3] mb-3 border-b pb-2">Upload Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Client PAN Copy",
                    "Aadhaar Card Copy",
                    "Cancelled Cheque",
                    "Nominee PAN Copy",
                  ].map((label, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="font-medium text-sm mb-1 text-gray-700">{label}</label>
                      <input
                        type="file"
                        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input 
                  name="notRobot"
                  type="checkbox" 
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-4 w-4" 
                />
                <label className="text-sm sm:text-base">I am not a robot</label>
              </div>
              {errors.notRobot && <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>}

              {/* SUBMIT */}
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