import React from "react";
import { motion } from "framer-motion";
import { User, IndianRupee, Clock, Users } from "lucide-react";

export function Eligibility() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-6 sm:py-8 border-y border-slate-100 bg-white/50 relative overflow-hidden"
    >
      {/* Background glow for eligibility */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-50/50 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Eligibility Criteria
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal">
            Who can apply for our Loan Protector insurance plans?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              label: "Entry Age",
              value: "18 - 70 Years",
              sub: "At time of policy inception",
              icon: User,
            },
            {
              label: "Loan Amount",
              value: "₹1 Lakh - ₹10 Cr",
              sub: "Flexible limit per borrower",
              icon: IndianRupee,
            },
            {
              label: "Loan Tenure",
              value: "1 - 30 Years",
              sub: "Matches your loan term",
              icon: Clock,
            },
            {
              label: "Borrower Type",
              value: "Individual / Joint",
              sub: "Co-borrowers & Groups allowed",
              icon: Users,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-blue-50 text-[#2076C7] rounded-full flex items-center justify-center mb-2">
                <item.icon size={24} />
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {item.label}
              </h4>

              <p className="text-xl font-extrabold text-[#2076C7]">
                {item.value}
              </p>

              <p className="text-[10px] text-slate-500 font-medium">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
