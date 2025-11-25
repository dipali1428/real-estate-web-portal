"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function HealthInsuranceForm({ onClose }: { onClose?: () => void }) {
  const [planType, setPlanType] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    proposer: "",
    pin: "",
    dob: "",
    disease: "",
    FirstAdultDob: "",
    SecondAdultDob: "",
    child1Dob: "",
    child2Dob: "",
  });

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

  const updateField = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

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

  const handleChangeEmployee = (index: number, field: string, value: string) => {
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

  // ---------- VALIDATION ----------
  const validateForm = () => {
    if (!planType || !form.proposer) return false;

    if (planType === "individual") {
      return form.pin && form.dob && form.disease;
    }

    if (planType === "family") {
      return (
        form.pin &&
        form.FirstAdultDob &&
        form.SecondAdultDob &&
        form.child1Dob &&
        form.child2Dob &&
        form.disease
      );
    }

    if (planType === "gmc") {
      if (employees.length === 0) return false;

      return employees.every(
        (emp) =>
          emp.name &&
          emp.designation &&
          emp.pan &&
          emp.aadhaar &&
          emp.branch &&
          emp.email &&
          emp.mobile &&
          emp.dob &&
          emp.age &&
          emp.pin &&
          emp.disease
      );
    }

    return true;
  };

  // SUBMIT
  const handleSubmit = () => {
    if (!validateForm()) {
      setError(true);
      setSuccess(false);
      return;
    }

    // SUCCESS
    setError(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose?.();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-6 py-4 text-gray-700">
          <h2 className="text-xl font-semibold text-[#1CADA3]">Health Insurance Form</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={22} />
          </button>
        </div>

        <div className="p-6">

          {/* PLAN TYPE */}
          <label className="font-semibold text-sm block mb-2">Types of Plan</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-6"
          >
            <option value="">Select Plan</option>
            <option value="individual">Individual</option>
            <option value="family">Family Floater</option>
            <option value="gmc">GMC (Group Mediclaim)</option>
          </select>

          {/* PROPOSER NAME */}
          <Input
            label="Proposer Name"
            type="text"
            value={form.proposer}
            onChange={(v) => updateField("proposer", v)}
          />

          {/* INDIVIDUAL */}
          {planType === "individual" && (
            <div className="space-y-4">
              <Input label="Pin Code" type="text" value={form.pin} onChange={(v) => updateField("pin", v)} />
              <Input label="Date of Birth" type="date" value={form.dob} onChange={(v) => updateField("dob", v)} />
              <Input label="Any Existing Disease" type="text" value={form.disease} onChange={(v) => updateField("disease", v)} />
            </div>
          )}

          {/* FAMILY */}
          {planType === "family" && (
            <div className="space-y-4">
              <Input label="Pin Code" type="text" value={form.pin} onChange={(v) => updateField("pin", v)} />

              {[
                { label: " DOB of First Adult Member", field: "FirstAdultDob" },
                { label: "DOB of Second Adult Member", field: "SecondAdultDob" },
                { label: "DOB of 1st Child", field: "child1Dob" },
                { label: "DOB of 2nd Child", field: "child2Dob" },
              ].map((item) => (
                <Input
                  key={item.field}
                  label={item.label}
                  type="date"
                  value={(form as any)[item.field]}
                  onChange={(v) => updateField(item.field, v)}
                />
              ))}

              <Input label="Pre Existing Disease" type="text" value={form.disease} onChange={(v) => updateField("disease", v)} />
            </div>
          )}

          {/* GMC */}
          {planType === "gmc" && (
            <div className="mt-6">
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
                          "Sr",
                          "Name",
                          "Designation",
                          "PAN",
                          "Aadhar",
                          "Branch",
                          "Email",
                          "Mobile",
                          "Alt Mobile",
                          "DOB",
                          "Age",
                          "Pin",
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

          {/* ERROR */}
          {error && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              ⚠ Please fill all required fields.
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              ✔ Form submitted successfully!
            </div>
          )}

          {/* SUBMIT */}
          <div className="col-span-2 mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#1CADA3] text-white px-6 py-2 rounded-md hover:bg-[#16948d]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="font-semibold text-sm block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
}
