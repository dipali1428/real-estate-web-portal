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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-auto h-[95vh] sm:h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Business Loan Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={submitForm} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              <Input label="name" title="Client Name" placeholder="Enter client name" value={formData.name} errors={errors} onChange={handleChange} />

              {/* 🔥 Phone number with only digits allowed */}
              <Input
                label="phone"
                title="Phone Number"
                placeholder="Enter 10-digit phone number"
                type="tel"
                maxLength={10}
                onlyNumber
                value={formData.phone}
                errors={errors}
                onChange={handleChange}
              />

              <Input label="email" title="Email ID" placeholder="Enter email address" value={formData.email} errors={errors} onChange={handleChange} />
              <Input label="dob" title="Date of Birth" type="date" value={formData.dob} errors={errors} onChange={handleChange} />
              <Input label="location" title="Location" placeholder="Enter your location" value={formData.location} errors={errors} onChange={handleChange} />
              <Input label="loanAmount" title="Loan Amount" placeholder="Enter loan amount" value={formData.loanAmount} errors={errors} onChange={handleChange} />
              <Input label="deduction" title="Deduction Details" placeholder="Enter deduction details" value={formData.deduction} onChange={handleChange} />
              <Input label="companyName" title="Company Name" placeholder="Enter company name" value={formData.companyName} errors={errors} onChange={handleChange} />
              <Input label="companyAddress" title="Company Address" placeholder="Enter company address" value={formData.companyAddress} errors={errors} onChange={handleChange} />

              <Input label="obligation" title="Other Loan Obligation Details" placeholder="Enter other loan details" value={formData.obligation} onChange={handleChange} />

              {/* Type of Business */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">Type of Business</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base"
                  defaultValue=""
                  onChange={(e) => setLoanType(e.target.value)}
                >
                  <option value="">Select business type</option>
                  <option>Proprietorship</option>
                  <option>Partnership</option>
                  <option>Pvt. Ltd.</option>
                </select>
              </div>

              {/* Business Start Date */}
              <Input label="businessStartDate" title="Business Start Date" type="date" value={formData.businessStartDate} errors={errors} onChange={handleChange} />

              {/* Document Upload - Full width section */}
              <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">{doc}</label>
                      <input 
                        type="file" 
                        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-gray-700 mt-4">
                <input 
                  type="checkbox" 
                  checked={formData.notRobot} 
                  onChange={(e) => handleChange("notRobot", e.target.checked)} 
                  className="w-4 h-4"
                />
                <label className="text-sm sm:text-base">I am not a robot</label>
              </div>

              {errors.notRobot && (
                <p className="col-span-1 md:col-span-2 text-red-500 text-sm mt-1">{errors.notRobot}</p>
              )}

              {/* Success Message */}
              {successMsg && (
                <div className="col-span-1 md:col-span-2 text-center text-green-600 font-semibold text-sm sm:text-base py-2">
                  {successMsg}
                </div>
              )}

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
        className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base placeholder-gray-400 focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
      />

      {errors && errors[label] && (
        <p className="text-red-500 text-sm mt-1">{errors[label]}</p>
      )}
    </div>
  );
}