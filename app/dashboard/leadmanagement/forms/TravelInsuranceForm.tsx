"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TravelInsuranceFormProps {
  onClose: () => void;
}

export default function TravelInsuranceForm({ onClose }: TravelInsuranceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    designation: "",
    duration: "",
    transport: "",
    sumAssured: "",
    companies: [] as string[],
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");

  const companiesList = [
    "Bajaj Allianz General Insurance Company",
    "TATA AIG General Insurance",
    "ICICI Lombard General Insurance Company Limited",
    "Digit Insurance",
  ];

  const handleInput = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const toggleCompany = (company: string) => {
    const updated = formData.companies.includes(company)
      ? formData.companies.filter((c) => c !== company)
      : [...formData.companies, company];

    setFormData({ ...formData, companies: updated });
    setErrors({ ...errors, companies: "" });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name) newErrors.name = "Client name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.duration) newErrors.duration = "Duration of travel is required";
    if (!formData.transport) newErrors.transport = "Transport mode is required";
    if (!formData.sumAssured) newErrors.sumAssured = "Sum assured is required";

    if (formData.companies.length === 0)
      newErrors.companies = "Please select at least one company";

    if (!formData.notRobot)
      newErrors.notRobot = "Please confirm you are not a robot";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess("Form submitted successfully! 🎉");
    } else {
      setSuccess("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Travel Insurance Form</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <form className="p-4 sm:p-6" onSubmit={submitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700">

              {/* Name */}
              <div className="w-full">
                <label className="font-medium block mb-1">Client Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter client name"
                  value={formData.name}
                  onChange={(e) => handleInput("name", e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="w-full">
                <label className="font-medium block mb-1">Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => handleInput("phone", e.target.value.replace(/\D/g, ""))}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="w-full">
                <label className="font-medium block mb-1">Email ID</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInput("email", e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* DOB */}
              <div className="w-full">
                <label className="font-medium block mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  value={formData.dob}
                  onChange={(e) => handleInput("dob", e.target.value)}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              {/* Location */}
              <div className="w-full">
                <label className="font-medium block mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) => handleInput("location", e.target.value)}
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Designation */}
              <div className="w-full">
                <label className="font-medium block mb-1">Designation</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={(e) => handleInput("designation", e.target.value)}
                />
                {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
              </div>

              {/* Duration */}
              <div className="w-full">
                <label className="font-medium block mb-1">Duration Of Travel</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter duration of travel"
                  value={formData.duration}
                  onChange={(e) => handleInput("duration", e.target.value)}
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
              </div>

              {/* Transport */}
              <div className="w-full">
                <label className="font-medium block mb-1">Mode Of Transport</label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  value={formData.transport}
                  onChange={(e) => handleInput("transport", e.target.value)}
                >
                  <option value="">Select transport mode</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                  <option value="Land">Land</option>
                </select>
                {errors.transport && <p className="text-red-500 text-xs mt-1">{errors.transport}</p>}
              </div>

              {/* Sum Assured */}
              <div className="w-full">
                <label className="font-medium block mb-1">Sum Assured Amount</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  placeholder="Enter sum assured amount"
                  value={formData.sumAssured}
                  onChange={(e) => handleInput("sumAssured", e.target.value)}
                />
                {errors.sumAssured && <p className="text-red-500 text-xs mt-1">{errors.sumAssured}</p>}
              </div>

              {/* Company List */}
              <div className="col-span-1 md:col-span-2">
                <label className="font-medium block mb-2">Select Insurance Companies</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {companiesList.map((company, index) => (
                    <label key={index} className="flex items-center gap-2 text-sm sm:text-base">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={formData.companies.includes(company)}
                        onChange={() => toggleCompany(company)}
                      />
                      {company}
                    </label>
                  ))}
                </div>

                {errors.companies && (
                  <p className="text-red-500 text-xs mt-1">{errors.companies}</p>
                )}
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

              {/* Success Message */}
              {success && (
                <p className="col-span-1 md:col-span-2 text-green-600 text-center font-medium mt-2 text-sm sm:text-base">
                  {success}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}