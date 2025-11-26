"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function BusinessLoanForm({ onClose }: { onClose: () => void }) {
  const [loanType, setLoanType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    location: "",
    loanAmount: "",
    deduction: "",
    companyName: "",
    companyAddress: "",
    obligation: "",
    businessStartDate: "",
    notRobot: false,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState<any>({});

  const documents = [
    "Aadhar Card",
    "PAN Card",
    "Udyam Aadhar Registration",
    "Shop Act Licence",
    "1 Year Banking Statement",
    "Address Proof",
    "ITR 3 Years",
    "Photograph",
    "Existing Loan Statement",
  ];

  // 🔹 Handle Input Change
  const handleChange = (label: string, value: string | boolean) => {
    setFormData({ ...formData, [label]: value });
  };

  // 🔹 Validation Function
  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.name) newErrors.name = "Client name is required";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.companyAddress) newErrors.companyAddress = "Company address is required";
    if (!formData.businessStartDate)
      newErrors.businessStartDate = "Business start date is required";
    if (!formData.notRobot) newErrors.notRobot = "Please confirm you are not a robot";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit Form
  const submitForm = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMsg("Form submitted successfully!");
      setErrors({});
    } else {
      setSuccessMsg("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Business Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

          <Input label="name" title="Client Name" placeholder="Enter Client Name" value={formData.name} errors={errors} onChange={handleChange} />

          {/* 🔥 Phone number with only digits allowed */}
          <Input
            label="phone"
            title="Phone Number"
            placeholder="Enter Number"
            type="tel"
            maxLength={10}
            onlyNumber
            value={formData.phone}
            errors={errors}
            onChange={handleChange}
          />

          <Input label="email" title="Email ID" placeholder="Enter Email ID" value={formData.email} errors={errors} onChange={handleChange} />
          <Input label="dob" title="Date of Birth" type="date" value={formData.dob} errors={errors} onChange={handleChange} />
          <Input label="location" title="Location" placeholder="Enter Location" value={formData.location} errors={errors} onChange={handleChange} />
          <Input label="loanAmount" title="Loan Amount" placeholder="Enter Loan Amount" value={formData.loanAmount} errors={errors} onChange={handleChange} />
          <Input label="deduction" title="Deduction Details" placeholder="Enter Deduction Details" value={formData.deduction} onChange={handleChange} />
          <Input label="companyName" title="Company Name" placeholder="Enter Company Name" value={formData.companyName} errors={errors} onChange={handleChange} />
          <Input label="companyAddress" title="Company Address" placeholder="Enter Company Address" value={formData.companyAddress} errors={errors} onChange={handleChange} />

          <Input label="obligation" title="Other Loan Obligation Details" placeholder="Enter Other Loan Obligation Details" value={formData.obligation} onChange={handleChange} />

          {/* Type of Business */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">Type of Business</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700"
              defaultValue=""
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option>Proprietorship</option>
              <option>Partnership</option>
              <option>Pvt. Ltd.</option>
            </select>
          </div>

          {/* Business Start Date */}
          <Input label="businessStartDate" title="Business Start Date" type="date" value={formData.businessStartDate} errors={errors} onChange={handleChange} />

          {/* Document Upload */}
          {documents.map((doc, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">{doc}</label>
              <input 
                type="file" 
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
              />
            </div>
          ))}

          {/* Checkbox */}
          <div className="col-span-2 flex items-center gap-2 text-gray-700">
            <input type="checkbox" checked={formData.notRobot} onChange={(e) => handleChange("notRobot", e.target.checked)} />
            <label>I am not a robot</label>
          </div>

          {errors.notRobot && (
            <p className="col-span-2 text-red-500 text-sm">{errors.notRobot}</p>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="col-span-2 text-center text-green-600 font-semibold">
              {successMsg}
            </div>
          )}

          {/* Submit Button - FIXED */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="w-50 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 rounded-md hover:from-[#1a68b0] hover:to-[#18998f] transition-colors"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */
function Input({
  label,
  title,
  type = "text",
  placeholder,
  maxLength,
  onlyNumber = false,
  value,
  errors,
  onChange,
}: any) {

  const handleValue = (e: any) => {
    let val = e.target.value;

    if (onlyNumber) {
      val = val.replace(/[^0-9]/g, ""); // allow only digits
    }

    if (maxLength) {
      val = val.slice(0, maxLength); // enforce max length (10 digits)
    }

    onChange(label, val);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={handleValue}
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700"
      />

      {errors && errors[label] && (
        <p className="text-red-500 text-sm">{errors[label]}</p>
      )}
    </div>
  );
}