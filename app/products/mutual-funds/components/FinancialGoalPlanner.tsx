"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Retirement", icon: "👴" },
  { name: "Education", icon: "🎓" },
  { name: "Home", icon: "🏠" },
  { name: "Car", icon: "🚗" },
  { name: "Vacation", icon: "✈️" },
  { name: "Emergency Fund", icon: "🚨" },
  { name: "Other", icon: "🎯" },
];

const categoryGoalNames: Record<string, string> = {
  Retirement: "Retirement Planning",
  Education: "Daughter's Education",
  Home: "Dream Home",
  Car: "New Car",
  Vacation: "Dream Vacation",
  "Emergency Fund": "Emergency Fund",
  Other: "",
};

export default function FinancialGoalPlanner() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Retirement",
    targetAmount: "",
    targetDate: "",
  });

  const [goals, setGoals] = useState<any[]>([]);

  const handleSave = () => {
    if (!formData.name || !formData.targetAmount || !formData.targetDate)
      return;

    const newGoal = {
      ...formData,
      id: Date.now(),
    };

    setGoals((prev) => [...prev, newGoal]);

    setFormData({
      name: "",
      category: "Retirement",
      targetAmount: "",
      targetDate: "",
    });
  };

  return (
    <section
      className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-100/80 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* HEADING - Inside Card */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Financial Goal Planner
          </span>
        </h2>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What are you saving for?
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Daughter's Higher Studies"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#1CADA3]"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Choose a Category
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        category: cat.name,
                        name: categoryGoalNames[cat.name] || "",
                      })
                    }
                    className={`p-3 rounded-2xl flex flex-col items-center gap-2 border transition-all ${
                      formData.category === cat.name
                        ? "bg-white border-[#1CADA3] shadow-md scale-105"
                        : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>

                    <span className="text-[10px] font-bold uppercase text-gray-500">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Amount (₹)
              </label>

              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({ ...formData, targetAmount: e.target.value })
                }
                placeholder="e.g. 5000000"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#1CADA3]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Date
              </label>

              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) =>
                  setFormData({ ...formData, targetDate: e.target.value })
                }
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#1CADA3]"
              />
            </div>

            {/* BUTTONS */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: "",
                    category: "Retirement",
                    targetAmount: "",
                    targetDate: "",
                  })
                }
                className="flex-1 px-6 py-4 border-2 border-gray-100 text-gray-500 rounded-2xl hover:bg-gray-50"
              >
                Reset
              </button>

              <button
                onClick={handleSave}
                className="group relative flex-1 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #1CADA3, #2076C7)",
                }}
              >
                <span className="relative z-10">Save & Plan Goal</span>
                <div
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{
                    background: "linear-gradient(to right, #189B8D, #1A68B0)",
                  }}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* GOALS DISPLAY */}
      {goals.length > 0 && (
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {goal.name}
              </h3>

              <p className="text-sm text-slate-500">
                Category: {goal.category}
              </p>

              <p className="text-sm text-slate-500">
                Target: ₹{Number(goal.targetAmount).toLocaleString("en-IN")}
              </p>

              <p className="text-sm text-slate-500">
                Target Date: {goal.targetDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
