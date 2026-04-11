"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../../context/ModalContext";
import { Trash2, Calendar, Target, ArrowRight, IndianRupee } from "lucide-react";

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
  const { openLogin } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    category: "Retirement",
    targetAmount: "",
    targetDate: "",
  });
  const [goals, setGoals] = useState<any[]>([]);

  const handleSave = () => {
    if (!formData.name || !formData.targetAmount || !formData.targetDate) return;
    
    const newGoal = {
      ...formData,
      id: Date.now(),
    };
    
    setGoals((prev) => [newGoal, ...prev]);
    setFormData({
      name: "",
      category: "Retirement",
      targetAmount: "",
      targetDate: "",
    });
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <section
      className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-100/80 overflow-hidden"
      style={{
        boxShadow: "0 10px 40px -10px rgba(32,118,199,0.08)",
      }}
    >
      {/* HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Plan Your Future
          </span>
        </h2>
        <p className="text-gray-500 font-medium">Create personalized financial goals and start your journey.</p>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-4xl mx-auto mb-16 bg-gray-50/50 p-6 md:p-10 rounded-[2.5rem] border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">What&apos;s the goal?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. World Tour"
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 outline-none transition-all font-bold text-gray-900 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.name, name: categoryGoalNames[cat.name] || "" })}
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      formData.category === cat.name
                        ? "bg-[#2076C7] border-[#2076C7] shadow-lg scale-105 text-white"
                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className={`text-[8px] font-bold uppercase truncate w-full ${formData.category === cat.name ? "text-white" : "text-gray-500"}`}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Target Amount</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 outline-none font-bold text-gray-900 shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Target Date</label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 outline-none font-bold text-gray-900 shadow-sm"
              />
            </div>
            <button 
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Add to My Goals
            </button>
          </div>
        </div>
      </div>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all group overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50/50 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-3xl border border-white shadow-sm">
                    {categories.find(c => c.name === goal.category)?.icon}
                  </div>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{goal.name}</h3>
                <span className="px-3 py-1 bg-emerald-50 text-[#1CADA3] text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  {goal.category}
                </span>

                <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Target size={12} /> Target
                    </p>
                    <p className="text-base font-bold text-[#2076C7]">
                      ₹{Number(goal.targetAmount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Calendar size={12} /> Date
                    </p>
                    <p className="text-base font-bold text-gray-700">
                      {new Date(goal.targetDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>

                {/* UPDATED START INVESTING BUTTON - Emerald/Blue Gradient */}
                <button
                  onClick={openLogin}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all active:scale-95"
                >
                  Start Investing
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {goals.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border-4 border-dashed border-gray-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Target className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Your Goal List is Empty</p>
        </div>
      )}
    </section>
  );
}