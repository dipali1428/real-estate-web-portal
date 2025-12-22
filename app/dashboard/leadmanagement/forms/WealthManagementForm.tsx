"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

// Interface for dependent data
interface Dependent {
  id: number;
  name: string;
  dob: string;
  relationship: string;
}

export default function WealthManagementForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    dob: "",
    totalDependents: "",
    incomeType: "",
    monthlyIncome: "",
    rentalLiability: "",
    loanLiability: "",
    insuranceLiability: "",
    investmentLiability: "",
  });

  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [nextId, setNextId] = useState(1);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dependentErrors, setDependentErrors] = useState<Record<number, Record<string, string>>>({});

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

    // If total dependents changes, update dependents array
    if (name === "totalDependents") {
      const numDependents = parseInt(value) || 0;
      updateDependents(numDependents);
    }
  };

  // Handle Number Input Change (for phone number)
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

  // Handle dependent field changes
  const handleDependentChange = (id: number, field: keyof Dependent, value: string) => {
    setDependents(prev => 
      prev.map(dep => 
        dep.id === id ? { ...dep, [field]: value } : dep
      )
    );

    // Clear error for this field
    setDependentErrors(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: ""
      }
    }));
  };

  // Update dependents array based on total dependents count
  const updateDependents = (count: number) => {
    const currentCount = dependents.length;
    
    // Limit dependents to maximum 9
    const limitedCount = Math.min(count, 9);
    
    if (limitedCount > currentCount) {
      // Add new dependents
      const newDependents = [...dependents];
      for (let i = currentCount + 1; i <= limitedCount; i++) {
        newDependents.push({ 
          id: nextId + i - currentCount - 1, 
          name: "", 
          dob: "", 
          relationship: "" 
        });
      }
      setDependents(newDependents);
      setNextId(prev => prev + (limitedCount - currentCount));
    } else if (limitedCount < currentCount) {
      // Remove extra dependents
      const newDependents = dependents.slice(0, limitedCount);
      setDependents(newDependents);
      
      // Also clean up errors for removed dependents
      const newErrors = { ...dependentErrors };
      for (let i = limitedCount; i < currentCount; i++) {
        delete newErrors[dependents[i].id];
      }
      setDependentErrors(newErrors);
    }
    
    // Update the formData to reflect the limited count
    if (count > 9) {
      setFormData(prev => ({
        ...prev,
        totalDependents: "9"
      }));
    }
  };

  // Manually add a dependent
  const addDependent = () => {
    // Check if we've reached the maximum limit
    if (dependents.length >= 9) {
      alert("Maximum limit of 9 dependents reached");
      return;
    }
    
    const newDependent = { 
      id: nextId, 
      name: "", 
      dob: "", 
      relationship: "" 
    };
    
    setDependents(prev => [...prev, newDependent]);
    setNextId(prev => prev + 1);
    
    // UPDATE the totalDependents field when manually adding
    setFormData(prev => ({
      ...prev,
      totalDependents: ((parseInt(prev.totalDependents) || 0) + 1).toString()
    }));
  };

  // Manually remove a dependent
  const removeDependent = (id: number) => {
    if (dependents.length <= 0) return;
    
    setDependents(prev => prev.filter(dep => dep.id !== id));
    
    // UPDATE the totalDependents field when manually removing
    setFormData(prev => ({
      ...prev,
      totalDependents: Math.max(0, (parseInt(prev.totalDependents) || 1) - 1).toString()
    }));
    
    // Clean up errors for removed dependent
    const newErrors = { ...dependentErrors };
    delete newErrors[id];
    setDependentErrors(newErrors);
  };

  // Validation - Only required fields are mandatory
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const newDependentErrors: Record<number, Record<string, string>> = {};

    // Define which fields are mandatory
    const mandatoryFields = [
      'clientName',
      'phone',
      'email',
      'dob',
      'totalDependents',
      'incomeType',
      'monthlyIncome'
    ];

    // Validate mandatory fields only
    mandatoryFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validation for specific fields
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate dependents (if there are any)
    dependents.forEach((dependent) => {
      const depErrors: Record<string, string> = {};
      
      // Only validate dependents if totalDependents > 0
      if (formData.totalDependents && parseInt(formData.totalDependents) > 0) {
        if (!dependent.name.trim()) {
          depErrors.name = "Dependent name is required";
        }
        
        if (!dependent.dob) {
          depErrors.dob = "Date of birth is required";
        }
        
        if (!dependent.relationship.trim()) {
          depErrors.relationship = "Relationship is required";
        }
      }
      
      if (Object.keys(depErrors).length > 0) {
        newDependentErrors[dependent.id] = depErrors;
      }
    });

    setErrors(newErrors);
    setDependentErrors(newDependentErrors);
    
    return Object.keys(newErrors).length === 0 && Object.keys(newDependentErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formPayload = {
      ...formData,
      dependents: dependents
    };

    alert("Form Submitted Successfully!");
    console.log("Form Data:", formPayload);
  };

  // Helper function to check if we should show dependents section
  const shouldShowDependentsSection = () => {
    const totalDeps = formData.totalDependents;
    const hasValidTotalDeps = totalDeps && totalDeps !== "0";
    return dependents.length > 0 || hasValidTotalDeps;
  };

  // Check if we've reached the maximum dependent limit
  const isMaxDependentsReached = dependents.length >= 9;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden flex flex-col h-[95vh] sm:h-[90vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#1CADA3]">Wealth Management Form</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

              {/* Client Name - REQUIRED */}
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
                  placeholder="Enter client name" 
                  required
                />
                {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
              </div>

              {/* Phone Number - REQUIRED */}
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
                  placeholder="Enter 10-digit phone number" 
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email - REQUIRED */}
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
                  placeholder="Enter email address" 
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Client DOB - REQUIRED */}
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

              {/* Income Type - REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Income Type <span className="text-red-500">*</span>
                </label>
                <select 
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                  required
                >
                  <option value="">Select Income Type</option>
                  <option value="Salary Income">Salary Income</option>
                  <option value="Incentives / Commission">Incentives / Commission</option>
                  <option value="Business Income">Business Income</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Pension Income">Pension Income</option>
                  <option value="Other Income">Other Income</option>
                </select>
                {errors.incomeType && <p className="text-red-500 text-xs mt-1">{errors.incomeType}</p>}
              </div>

              {/* Monthly Income - REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Monthly Income (₹) <span className="text-red-500">*</span>
                </label>
                <input 
                  name="monthlyIncome"
                  type="number" 
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter monthly income" 
                  required
                />
                {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
              </div>

              {/* Total Dependents - REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Total No. of Dependents <span className="text-red-500">*</span>
                </label>
                <input 
                  name="totalDependents"
                  type="number" 
                  min="0"
                  max="9"
                  value={formData.totalDependents}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter number of dependents" 
                  required
                />
                {errors.totalDependents && <p className="text-red-500 text-xs mt-1">{errors.totalDependents}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Enter number (0-9) or use "Add Dependent" button below. Max limit: 9 dependents.
                </p>
              </div>

              {/* DEPENDENTS SECTION */}
              {shouldShowDependentsSection() && (
                <div className="col-span-1 md:col-span-2 mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                      Dependents Details 
                      {dependents.length > 0 && ` (${dependents.length} dependent${dependents.length > 1 ? 's' : ''})`}
                      {isMaxDependentsReached && <span className="text-red-500 ml-2">(Max limit reached)</span>}
                    </h3>
                    <button
                      type="button"
                      onClick={addDependent}
                      disabled={isMaxDependentsReached}
                      className={`flex items-center gap-1 text-sm ${isMaxDependentsReached ? 'text-gray-400 cursor-not-allowed' : 'text-[#1CADA3] hover:text-[#18998f]'}`}
                    >
                      <Plus size={16} />
                      Add Dependent
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {dependents.map((dependent, index) => (
                      <div key={dependent.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-700">Dependent {index + 1} <span className="text-red-500">*</span></h4>
                          <button
                            type="button"
                            onClick={() => removeDependent(dependent.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove dependent"
                          >
                            <Minus size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Dependent Name - REQUIRED */}
                          <div className="flex flex-col">
                            <label className="font-medium mb-1 text-gray-700 text-xs sm:text-sm">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="text" 
                              value={dependent.name}
                              onChange={(e) => handleDependentChange(dependent.id, 'name', e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                              placeholder="Enter dependent name" 
                              required
                            />
                            {dependentErrors[dependent.id]?.name && (
                              <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].name}</p>
                            )}
                          </div>

                          {/* Dependent DOB - REQUIRED */}
                          <div className="flex flex-col">
                            <label className="font-medium mb-1 text-gray-700 text-xs sm:text-sm">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input 
                              type="date" 
                              value={dependent.dob}
                              onChange={(e) => handleDependentChange(dependent.id, 'dob', e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                              required
                            />
                            {dependentErrors[dependent.id]?.dob && (
                              <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].dob}</p>
                            )}
                          </div>

                          {/* Dependent Relationship - REQUIRED */}
                          <div className="flex flex-col">
                            <label className="font-medium mb-1 text-gray-700 text-xs sm:text-sm">
                              Relationship <span className="text-red-500">*</span>
                            </label>
                            <select 
                              value={dependent.relationship}
                              onChange={(e) => handleDependentChange(dependent.id, 'relationship', e.target.value)}
                              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent"
                              required
                            >
                              <option value="">Select Relationship</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Child">Child</option>
                              <option value="Parent">Parent</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Other">Other</option>
                            </select>
                            {dependentErrors[dependent.id]?.relationship && (
                              <p className="text-red-500 text-xs mt-1">{dependentErrors[dependent.id].relationship}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rental Liability - NOT REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Rental Liability
                </label>
                <input 
                  name="rentalLiability"
                  type="number" 
                  value={formData.rentalLiability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter rental liability (optional)" 
                />
              </div>

              {/* Loan Liability - NOT REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Loan Liability
                </label>
                <input 
                  name="loanLiability"
                  type="number" 
                  value={formData.loanLiability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter loan liability (optional)" 
                />
              </div>

              {/* Insurance Liability - NOT REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Insurance Liability
                </label>
                <input 
                  name="insuranceLiability"
                  type="number" 
                  value={formData.insuranceLiability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter insurance liability (optional)" 
                />
              </div>

              {/* Investment Liability - NOT REQUIRED */}
              <div className="flex flex-col w-full">
                <label className="font-medium mb-1 text-gray-700 text-sm sm:text-base">
                  Investment Liability
                </label>
                <input 
                  name="investmentLiability"
                  type="number" 
                  value={formData.investmentLiability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-700 text-sm sm:text-base focus:ring-2 focus:ring-[#1CADA3] focus:border-transparent" 
                  placeholder="Enter investment liability (optional)" 
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 mt-6 flex justify-center">
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