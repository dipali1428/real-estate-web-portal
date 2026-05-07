"use client";
import React from 'react';
import { Shield, Flame, Building2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useModal } from '@/app/context/ModalContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function FireHero() {
  const { openLogin } = useModal();
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  const scrollToDetails = () => {
    const element = document.getElementById('insurable-properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] lg:min-h-[90vh] py-10 md:py-16 overflow-hidden bg-white font-sans">
      <div className="fixed z-50 top-20 left-4 md:top-24 md:left-8">
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg active:scale-95 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          Back to Home
        </button>
      </div>

      {/* Background Blur Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#1CADA3]/5 to-[#2076C7]/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10 relative z-10">
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
              Protect your business, warehouse, and residential properties with India&apos;s most comprehensive Fire & Special Perils insurance. Instant quotes, 100% digital process.
            </p>

            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={(e) => { e.preventDefault(); openLogin(); }}
                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer inline-block text-center"
                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
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
          <div className="relative w-full flex justify-center mt-12 lg:mt-0">
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-[3rem] p-5 shadow-2xl border border-gray-100 max-w-lg w-full">

              <Image
                src="/insurance/fire.webp"
                alt="Modern Building"
                width={600}
                height={450}
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
