import React from 'react';
import {
  ShieldCheck,
  Car,
  Users,
  CheckCircle2,
  Info,
} from 'lucide-react';

const MotorPolicies: React.FC = () => {
  const policies = [
    {
      id: 'comprehensive',
      title: 'Comprehensive',
      icon: ShieldCheck,
      badge: 'MOST POPULAR',
      desc: 'Extensive coverage against third-party liabilities and damages to your own vehicle.',
      features: [
        'Accidents, theft & natural disasters',
        'Third-party liability included',
        'Eligible for Zero Depreciation',
        'Owner-driver accident cover'
      ]
    },
    {
      id: 'od',
      title: 'Own Damage (OD)',
      icon: Car,
      badge: 'STANDALONE',
      desc: 'Specifically covers damages to your own vehicle. Best if you have an active third-party policy.',
      features: [
        'Coverage for accidental damages',
        'Protection from fire & theft',
        'Natural & man-made calamities',
        'Requires an active 3rd-party policy'
      ]
    },
    {
      id: 'third-party',
      title: 'Third Party',
      icon: Users,
      badge: 'MANDATORY',
      desc: 'Basic legal compliance plan covering liabilities arising from damages to third parties.',
      features: [
        'Mandatory under Motor Vehicles Act',
        'Third-party property damages',
        'Third-party injury or death',
        'No coverage for own vehicle'
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-12 font-sans animate-in fade-in duration-500">

      {/* Define SVG Gradient once for all icons to use */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#2076C7" offset="0%" />
            <stop stopColor="#1CADA3" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Overview Header */}
      <div className="mb-0 text-center">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Understanding Insurance Plans</h2>
        <p className="text-sm text-slate-500 font-medium mt-2">Choose the right coverage level for your vehicle.</p>
      </div>

      {/* Grid of Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {policies.map((pol) => {
          const Icon = pol.icon;
          return (
            <div
              key={pol.id}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 hover:border-slate-200 transition-all flex flex-col relative h-full mt-4"
            >
              {/* Badge intersecting top border exactly in middle */}
              {pol.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-2 border-white whitespace-nowrap">
                    {pol.badge}
                  </span>
                </div>
              )}

              {/* Icon centered with website gradient stroke */}
              <div className="mb-6 flex w-full justify-center">
                <Icon size={56} strokeWidth={1.5} style={{ stroke: "url(#icon-gradient)" }} className="drop-shadow-sm" />
              </div>

              {/* Title & Desc (Centered) */}
              <h3 className="text-xl font-black text-slate-800 mb-3 text-center w-full tracking-tight">{pol.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 text-center w-full min-h-[60px]">
                {pol.desc}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100 mb-8" />

              {/* Features (Left aligned for clean reading) */}
              <ul className="space-y-4 mb-10 min-h-[140px] w-full flex-1">
                {pol.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-4 text-left w-full">
                    <CheckCircle2 size={18} strokeWidth={2} style={{ stroke: "url(#icon-gradient)" }} className="shrink-0 drop-shadow-sm mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700 leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button (Identical for all) */}
              <button className="w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white hover:opacity-90 shadow-lg shadow-blue-500/20 active:scale-95">
                Select Plan
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 sm:p-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 mx-auto md:mx-0">
            <Info size={32} className="text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white mb-1">Need help deciding?</h3>
            <p className="text-sm text-blue-50 font-medium">Connect with our insurance experts to find the perfect coverage for your needs.</p>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0">
          <button className="w-full md:w-auto px-8 py-4 bg-white text-[#2076C7] text-xs font-black rounded-xl hover:bg-slate-50 transition-all active:scale-95 uppercase tracking-widest whitespace-nowrap shadow-lg">
            Talk to Expert
          </button>
        </div>
      </div>

    </div>
  );
};

export default MotorPolicies;
