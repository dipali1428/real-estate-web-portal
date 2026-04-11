"use client";
import React from 'react';
import { ShieldCheck, CloudLightning, Bomb, Plane, Bus, Wind, Trash2, Droplets, ShieldAlert } from 'lucide-react';

export default function CoverageGrid() {
  const includedPerils = [
    { label: "Fire & Lightning", icon: CloudLightning },
    { label: "Explosion / Implosion", icon: Bomb },
    { label: "Aircraft Damage", icon: Plane },
    { label: "Riot & Strike", icon: ShieldCheck },
    { label: "Malicious Damage", icon: ShieldAlert },
    { label: "Rain & Flooding", icon: Droplets },
    { label: "Storm & Cyclone", icon: Wind },
    { label: "Impact from Vehicles", icon: Bus },
    { label: "Missile Testing", icon: ShieldCheck },
    { label: "Landslide / Rockslide", icon: ShieldCheck },
    { label: "Bush Fire", icon: CloudLightning },
    { label: "Automatic Sprinkler Leakage", icon: Droplets }
  ];

  const exclusions = [
    { label: "Nuclear Perils", icon: ShieldAlert },
    { label: "War & Invasion", icon: ShieldAlert },
    { label: "Theft during Fire", icon: ShieldAlert },
    { label: "Pollution & Contamination", icon: Trash2 }
  ];

  return (
    <section className="py-10 md:py-16 bg-[#f8fbff] font-sans overflow-hidden flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10 relative">

        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1CADA3]/5 rounded-full blur-3xl -mr-40 -mt-40"></div>

        {/* Heading */}
        <div className="text-center mb-16 md:mb-20 relative z-10 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
            What's Covered Under <br className="hidden md:block" /> Fire Insurance?
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl text-sm sm:text-base md:text-lg text-center">
            From natural calamities to accidental explosions, we provide a wide shield of protection against diverse risks.
          </p>
        </div>

        {/* Included Perils Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 relative z-10 place-items-center">
          {includedPerils.map((peril, idx) => (
            <div
              key={idx}
              className="group w-full max-w-[220px] bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#2076C7]/20 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2076C7] flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <peril.icon size={24} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-[#2076C7] text-xs md:text-sm uppercase tracking-tight">
                {peril.label}
              </span>
            </div>
          ))}
        </div>

        {/* Exclusions Section */}
        <div className="bg-white rounded-2xl md:rounded-[3rem] p-8 md:p-14 border border-gray-100 shadow-2xl relative z-10 flex justify-center">

          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 text-center lg:text-left">

            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2076C7] mb-4 uppercase tracking-tight">
                Standard Exclusions
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                It's important to understand what's not covered to ensure you have the right add-ons if needed.
              </p>
            </div>

            {/* Exclusions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-3xl place-items-center">
              {exclusions.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-[#1CADA3] flex items-center justify-center mb-3">
                    <item.icon size={22} />
                  </div>
                  <span className="font-bold text-gray-700 text-xs sm:text-sm uppercase tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
