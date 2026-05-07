"use client";
import React from 'react';
import { Target, HeartHandshake, BadgeCheck, Lightbulb, TrendingUp, Headphones } from 'lucide-react';

export default function FireBenefits() {
  const benefits = [
    {
      title: "Agreed Value Basis",
      description: "Option to insure assets on an agreed value basis, ensuring full recovery without depreciation disputes.",
      icon: Target,
      color: "text-[#2076C7]"
    },
    {
      title: "Expert Risk Audit",
      description: "Free risk inspection and safety audit by certified engineers for high-value industrial properties.",
      icon: Lightbulb,
      color: "text-[#1CADA3]"
    },
    {
      title: "Flexible Add-ons",
      description: "Customize your policy with riders like STFI (Storm, Tempest, Flood & Inundation) and Terrorism cover.",
      icon: BadgeCheck,
      color: "text-[#2076C7]"
    },
    {
      title: "High Claim Limit",
      description: "Ability to handle high-value claims with a dedicated team of surveyors across India.",
      icon: TrendingUp,
      color: "text-[#1CADA3]"
    },
    {
      title: "Digital Claims Desk",
      description: "100% paperless claim intimation and tracking via our premium mobile portal.",
      icon: HeartHandshake,
      color: "text-[#2076C7]"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock emergency assistance for fire incidents and rapid coordination with authorities.",
      icon: Headphones,
      color: "text-[#1CADA3]"
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-gray-50/50 font-sans border-y border-gray-100 flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
            Why Choose Infinity <br className="hidden md:block" /> Fire Insurance?
          </h2>

          <p className="text-gray-600 font-medium max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
            We don&apos;t just provide a policy; we offer a strategic partnership to safeguard your most valuable investments.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 place-items-center">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="w-full max-w-md flex gap-6 group"
            >
              <div className="shrink-0">
                <div
                  className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center ${benefit.color} group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg`}
                >
                  <benefit.icon size={26} strokeWidth={1.5} />
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#2076C7] mb-2 uppercase tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Bottom Bar */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <div className="w-full max-w-5xl p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-white border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

            {/* Left Section */}
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-[#1CADA3]">
                <BadgeCheck size={28} />
              </div>

              <div>
                <div className="text-lg md:text-xl font-bold text-[#2076C7] uppercase tracking-tight">
                  IRDAI Certified Partners
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  Global Reinsurance Standards
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 md:gap-14 justify-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#2076C7]">
                  98.5%
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Claim Ratio
                </div>
              </div>

              <div className="w-[1px] h-10 bg-gray-100 hidden md:block"></div>

              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#1CADA3]">
                  15 Min
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Quote Time
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
