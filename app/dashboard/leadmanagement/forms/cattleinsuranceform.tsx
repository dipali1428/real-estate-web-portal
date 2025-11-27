"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CattleInsuranceFormProps {
  onClose: () => void;
}

export default function CattleInsuranceForm({ onClose }: CattleInsuranceFormProps) {
  // ----------------- STATE -----------------
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    farmName: "",
    liveStock: "",
    breed: "",
    gender: "",
    age: "",
    color: "",
    tagNo: "",
    financer: "",
    location: "",
    lossRatio: "",
    prevPolicy: null as File | null,
    notRobot: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // ---------- HANDLE INPUT CHANGE ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as any;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" && name === "notRobot"
        ? checked
        : type === "file"
        ? files[0]
        : value,
    }));
  };

  // ---------- VALIDATION ----------
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        if (key === "prevPolicy") return; // optional field
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

  // ---------- SUBMIT ----------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Cattle Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              {/* Basic Information */}
              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Client Name</label>
                <input
                  name="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.clientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                )}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Email ID</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              {/* Farm & Livestock Information */}
              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Farm / Company Name</label>
                <input
                  name="farmName"
                  type="text"
                  value={formData.farmName}
                  onChange={handleChange}
                  placeholder="Enter farm or company name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.farmName && (
                  <p className="text-red-500 text-xs mt-1">{errors.farmName}</p>
                )}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Name of Live Stock</label>
                <input
                  name="liveStock"
                  type="text"
                  value={formData.liveStock}
                  onChange={handleChange}
                  placeholder="Enter livestock name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.liveStock && (
                  <p className="text-red-500 text-xs mt-1">{errors.liveStock}</p>
                )}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Breed of Goat / Sheep</label>
                <input
                  name="breed"
                  type="text"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Enter breed"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Age</label>
                <input
                  name="age"
                  type="text"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Color</label>
                <input
                  name="color"
                  type="text"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Enter color"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Tag Number</label>
                <input
                  name="tagNo"
                  type="text"
                  value={formData.tagNo}
                  onChange={handleChange}
                  placeholder="Enter tag number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.tagNo && <p className="text-red-500 text-xs mt-1">{errors.tagNo}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Financer Bank Name</label>
                <input
                  name="financer"
                  type="text"
                  value={formData.financer}
                  onChange={handleChange}
                  placeholder="Enter financer bank name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.financer && <p className="text-red-500 text-xs mt-1">{errors.financer}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Location</label>
                <input
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              <div className="w-full">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Loss Ratio Details</label>
                <input
                  name="lossRatio"
                  type="text"
                  value={formData.lossRatio}
                  onChange={handleChange}
                  placeholder="Enter loss ratio details"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                />
                {errors.lossRatio && <p className="text-red-500 text-xs mt-1">{errors.lossRatio}</p>}
              </div>

              {/* Prev Policy File */}
              <div className="col-span-1 md:col-span-2">
                <label className="block font-medium mb-1 text-gray-700 text-sm sm:text-base">Prev. Year Policy (Optional)</label>
                <input
                  type="file"
                  name="prevPolicy"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm cursor-pointer"
                />
              </div>

              {/* Not Robot */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 mt-4 text-gray-700">
                <input
                  type="checkbox"
                  name="notRobot"
                  checked={formData.notRobot}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="text-sm sm:text-base">I am not a Robot</span>
              </div>
              {errors.notRobot && (
                <p className="col-span-1 md:col-span-2 text-red-500 text-xs mt-1">{errors.notRobot}</p>
              )}

              {/* Submit */}
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