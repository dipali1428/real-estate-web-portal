"use client";
import React from 'react';
import { Shield, ArrowRight, Flame, Building2, CheckCircle2 } from 'lucide-react';

export default function FireHero() {
    const scrollToDetails = () => {
        const element = document.getElementById('insurable-properties');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
       <section className="relative flex items-center justify-center min-h-[85vh] lg:min-h-[90vh] py-16 md:py-24 overflow-hidden bg-white font-sans">

  {/* Background Blur Elements */}
  <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#1CADA3]/5 to-[#2076C7]/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"></div>

  <div className="w-full max-w-7xl px-6 relative z-10">
    <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

      {/* Content Column */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f7ff] text-[#2076C7] text-xs md:text-sm font-black mb-6 uppercase tracking-wider shadow-sm border border-blue-50">
          <Flame size={18} className="text-[#1CADA3] animate-pulse" />
          Secure Your Assets Against Fire
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
          Shield Your Future From Fire
        </h1>

        {/* Paragraph */}
        <p className="text-gray-600 text-sm sm:text-base md:text-xl font-medium mb-8 md:mb-10 max-w-xl leading-relaxed">
          Protect your business, warehouse, and residential properties with India's most comprehensive Fire & Special Perils insurance. Instant quotes, 100% digital process.
        </p>

        {/* Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
          <button
            onClick={scrollToDetails}
            className="px-8 py-4 rounded-xl md:rounded-2xl bg-white text-gray-700 border-2 border-gray-100 font-bold text-sm md:text-lg hover:bg-gray-50 hover:border-gray-200 transition-all"
          >
            View Coverages
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
          {[
            { icon: CheckCircle2, label: "Instant Policy", color: "teal" },
            { icon: Shield, label: "Digital Claims", color: "blue" },
            { icon: Building2, label: "Pan-India Reach", color: "teal" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 group">
              <div className={`p-2 rounded-lg ${item.color === "teal" ? "bg-teal-50 text-[#1CADA3]" : "bg-blue-50 text-[#2076C7]"} group-hover:scale-110 transition-transform`}>
                <item.icon size={20} />
              </div>
              <span className="text-sm font-bold text-gray-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Visual Column */}
      <div className="relative w-full hidden lg:flex justify-center">
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-[3rem] p-5 shadow-2xl border border-gray-100 max-w-lg w-full">

          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Modern Building"
            className="rounded-[2.5rem] w-full h-[420px] xl:h-[500px] object-cover"
          />

          {/* Floating Stats Card */}
          <div className="absolute -left-6 xl:-left-10 bottom-12 bg-white p-5 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#1CADA3]">
                <Shield size={22} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Property Secured
                </div>
                <div className="text-lg md:text-xl font-bold text-[#2076C7]">
                  ₹5,000Cr+
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Blur Block */}
          <div className="absolute -right-6 top-16 w-28 h-28 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl opacity-20 blur-2xl"></div>

        </div>
      </div>

    </div>
  </div>
</section>
    );
}
