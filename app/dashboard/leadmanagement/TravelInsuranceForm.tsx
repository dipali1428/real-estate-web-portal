"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface TravelInsuranceFormProps {
  onClose: () => void;
}

export default function TravelInsuranceForm({ onClose }: TravelInsuranceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    designation: "",
    duration: "",
    transport: "",
    sumAssured: "",
    companies: [] as string[],
    notRobot: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");

  // const companiesList = [
  //   "Bajaj Allianz General Insurance Company",
  //   "TATA AIG General Insurance",
  //   "ICICI Lombard General Insurance Company Limited",
  //   "Digit Insurance",
  // ];

  const handleInput = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  // const toggleCompany = (company: string) => {
  //   const updated = formData.companies.includes(company)
  //     ? formData.companies.filter((c) => c !== company)
  //     : [...formData.companies, company];

  //   setFormData({ ...formData, companies: updated });
  //   setErrors({ ...errors, companies: "" });
  // };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name) newErrors.name = "Client name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Travel Insurance Form</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submitForm}>

            {/* Name */}
            <div>
              <label className="font-medium block mb-1">Client Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter Client Name"
                value={formData.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="font-medium block mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-md"
                value={formData.dob}
                onChange={(e) => handleInput("dob", e.target.value)}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
            </div>

            {/* Designation */}
            <div>
              <label className="font-medium block mb-1">Designation</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter Designation"
                value={formData.designation}
                onChange={(e) => handleInput("designation", e.target.value)}
              />
              {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
            </div>

            {/* Duration */}
            <div>
              <label className="font-medium block mb-1">Duration Of Travel</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter Duration Of Travel"
                value={formData.duration}
                onChange={(e) => handleInput("duration", e.target.value)}
              />
              {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
            </div>

            {/* Transport */}
            <div>
              <label className="font-medium block mb-1">Mode Of Transport</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter Mode Of Transport"
                value={formData.transport}
                onChange={(e) => handleInput("transport", e.target.value)}
              />
              {errors.transport && <p className="text-red-500 text-xs">{errors.transport}</p>}
            </div>

            {/* Sum Assured */}
            <div>
              <label className="font-medium block mb-1">Sum Assured Amount</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter Sum Assured Amount"
                value={formData.sumAssured}
                onChange={(e) => handleInput("sumAssured", e.target.value)}
              />
              {errors.sumAssured && <p className="text-red-500 text-xs">{errors.sumAssured}</p>}
            </div>

            {/* Company List 
            <div className="col-span-2">
              <label className="font-medium block mb-2">Select Insurance Companies</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {companiesList.map((company, index) => (
                  <label key={index} className="flex items-center gap-2">
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
            </div>*/}

            {/* Not Robot */}
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={formData.notRobot}
                  onChange={(e) => handleInput("notRobot", e.target.checked)}
                />
                I am not Robot
              </label>
              {errors.notRobot && (
                <p className="text-red-500 text-xs">{errors.notRobot}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#1CADA3] text-white px-6 py-2 rounded-md w-50 hover:bg-[#16948d] transition"
              >
                Submit
              </button>
            </div>

            {/* Success Message */}
            {success && (
              <p className="col-span-2 text-green-600 text-center font-medium mt-2">
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
