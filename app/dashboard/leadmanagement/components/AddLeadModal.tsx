"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddLeadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    leadName: "",
    contactNumber: "",
    emailAddress: "",
    product: "",
    subProduct: "",
    additionalNotes: "",
  });

  const subProductOptions: Record<string, string[]> = {
    finance: ["Loans", "Credit Cards", "EMI Plans"],
    protection: ["Life Insurance", "Health Insurance"],
    investments: ["Mutual Funds", "Fixed Deposits", "Stocks"],
    real_estate: ["Apartments", "Commercial", "Land"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    console.log("Lead Saved:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-700">Add New Lead</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 text-gray-700">
          <div>
            <label htmlFor="leadName" className="block text-sm font-medium text-gray-700">
              Client Name *
            </label>
            <input
              id="leadName"
              type="text"
              required
              value={form.leadName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number *
            </label>
            <input
              id="contactNumber"
              type="text"
              required
              value={form.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="emailAddress"
              type="email"
              value={form.emailAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">
              Product
            </label>
            <select
              id="product"
              value={form.product}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Product</option>
              <option value="finance">Finance</option>
              <option value="protection">Protection</option>
              <option value="investments">Investments</option>
              <option value="real_estate">Real Estate</option>
            </select>
          </div>

          {form.product && (
            <div>
              <label htmlFor="subProduct" className="block text-sm font-medium text-gray-700">
                Sub Product
              </label>
              <select
                id="subProduct"
                value={form.subProduct}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Sub Product</option>
                {subProductOptions[form.product]?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              rows={3}
              value={form.additionalNotes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Lead
          </button>
        </div>
      </div>
      <style jsx>{`
           @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }`}
      </style>
    </div>
  );
}
