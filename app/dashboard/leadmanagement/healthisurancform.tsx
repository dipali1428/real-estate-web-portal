"use client";

import { useState } from "react";
import { X } from "lucide-react"; // ✅ Import close icon

// ✅ Accept optional onClose prop
export default function HealthInsuranceForm({ onClose }: { onClose?: () => void }) {
  const [planType, setPlanType] = useState("");
  const [employees, setEmployees] = useState<
    {
      name: string;
      designation: string;
      pan: string;
      aadhaar: string;
      branch: string;
      email: string;
      mobile: string;
      altMobile: string;
      dob: string;
      age: number | "";
      pin: string;
      disease: string;
    }[]
  >([]);

  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      {
        name: "",
        designation: "",
        pan: "",
        aadhaar: "",
        branch: "",
        email: "",
        mobile: "",
        altMobile: "",
        dob: "",
        age: "",
        pin: "",
        disease: "",
      },
    ]);
  };

  const handleRemoveEmployee = (index: number) => {
    const updated = [...employees];
    updated.splice(index, 1);
    setEmployees(updated);
  };

  const handleChangeEmployee = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...employees];
    if (field === "dob") {
      const dobDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
      updated[index]["age"] = age;
    }
     (updated[index] as any)[field] = value;
    setEmployees(updated);
  };

  const handleSubmit = () => {
    if (!planType) {
      alert("Please select a plan type.");
      return;
    }
    alert(`Form Submitted Successfully for ${planType.toUpperCase()} Plan!`);
  };

  return (
    <div className="relative w-7/12 max-w-5xl mx-auto my-10 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      {/* X Close Button (upper-right corner) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
        >
          <X size={24} /> {/* Lucide icon */}
        </button>
      )}

      <h2 className="text-center text-2xl font-semibold text-[#1CADA3] mb-6">
        Health Insurance Form
      </h2>

      {/* Plan Selection */}
      <div className="mb-6">
        <label className="font-semibold text-sm block mb-2">
          Types of Plan
        </label>
        <select
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Plan</option>
          <option value="individual">Individual</option>
          <option value="family">Family Floater</option>
          <option value="gmc">GMC (Group Mediclaim)</option>
        </select>
      </div>

      {/* Common Field */}
      <div className="mb-6">
        <label className="font-semibold text-sm block mb-2">Proposer Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter Name"
        />
      </div>

      {/* Individual Plan */}
      {planType === "individual" && (
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-sm block mb-2">Pin Code</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Pin Code"
            />
          </div>
          <div>
            <label className="font-semibold text-sm block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-sm block mb-2">
              Any Existing Disease
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Disease"
            />
          </div>
        </div>
      )}

      {/* Family Floater Plan */}
      {planType === "family" && (
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-sm block mb-2">Pin Code</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Pin Code"
            />
          </div>
          {["Male DOB", "Female DOB", "1st Child DOB", "2nd Child DOB"].map(
            (label, i) => (
              <div key={i}>
                <label className="font-semibold text-sm block mb-2">{label}</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            )
          )}
          <div>
            <label className="font-semibold text-sm block mb-2">
              Any Existing Disease
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Disease"
            />
          </div>
        </div>
      )}

      {/* GMC Plan */}
      {planType === "gmc" && (
        <div className="mt-6">
          <label className="font-semibold text-sm block mb-2">
            Number of Employees
          </label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Enter Number of Employees"
          />

          <button
            onClick={handleAddEmployee}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
          >
            + Add Employee
          </button>

          {employees.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    {[
                      "Sr. No.",
                      "Employee Name",
                      "Designation",
                      "PAN",
                      "Aadhaar",
                      "Branch",
                      "Email",
                      "Mobile",
                      "Alt Mobile",
                      "DOB",
                      "Age",
                      "Pin Code",
                      "Disease",
                      "Remove",
                    ].map((head) => (
                      <th key={head} className="p-2 border border-gray-300">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-center">{index + 1}</td>
                      {[
                        "name",
                        "designation",
                        "pan",
                        "aadhaar",
                        "branch",
                        "email",
                        "mobile",
                        "altMobile",
                      ].map((field) => (
                        <td key={field} className="border p-1">
                          <input
                            type="text"
                            value={emp[field as keyof typeof emp] as string}
                            onChange={(e) =>
                              handleChangeEmployee(index, field, e.target.value)
                            }
                            className="w-full border rounded p-1"
                          />
                        </td>
                      ))}
                      <td className="border p-1">
                        <input
                          type="date"
                          value={emp.dob}
                          onChange={(e) =>
                            handleChangeEmployee(index, "dob", e.target.value)
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          type="number"
                          value={emp.age}
                          readOnly
                          className="w-full border rounded p-1 bg-gray-100"
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          type="text"
                          value={emp.pin}
                          onChange={(e) =>
                            handleChangeEmployee(index, "pin", e.target.value)
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          type="text"
                          value={emp.disease}
                          onChange={(e) =>
                            handleChangeEmployee(index, "disease", e.target.value)
                          }
                          className="w-full border rounded p-1"
                        />
                      </td>
                      <td className="border p-1 text-center">
                        <button
                          onClick={() => handleRemoveEmployee(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        type="button"
        className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md w-25 hover:bg-[#1f376b] transition"
      >
        Submit
      </button>
    </div>
  );
}
