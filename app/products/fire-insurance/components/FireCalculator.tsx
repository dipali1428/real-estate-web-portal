"use client";
import React, { useState, useMemo } from 'react';
import { Calculator, Zap, Building2, Info, ArrowRight } from 'lucide-react';

interface FireCalculatorProps {
  openForm?: () => void;
}

export default function FireCalculator({ openForm }: FireCalculatorProps) {
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [propertyType, setPropertyType] = useState('commercial');
  const [tenure, setTenure] = useState(1);

  const rates = {
    residential: 0.0002, // 0.02%
    commercial: 0.0005,  // 0.05%
    industrial: 0.0008   // 0.08%
  };

  const calculatedPremium = useMemo(() => {
    const rate = rates[propertyType as keyof typeof rates] || 0.0005;
    const netPremium = propertyValue * rate * tenure;
    const gst = netPremium * 0.18;
    return {
      net: netPremium,
      gst: gst,
      total: netPremium + gst
    };
  }, [propertyValue, propertyType, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-10 md:py-16 bg-white font-sans flex justify-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20">

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#1CADA3] text-xs font-black mb-6 uppercase tracking-wider">
              <Calculator size={16} /> Premium Estimator
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
              Plan Your Protection <br className="hidden md:block" /> With Precision
            </h2>

            <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg mb-10 leading-relaxed">
              Estimate your fire insurance premium in seconds. Input your property value and type to get a realistic cost breakdown including taxes.
            </p>

            <div className="space-y-6 w-full">
              {/* Feature Card 1 */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-all">
                <div className="p-2 rounded-xl bg-blue-50 text-[#2076C7]">
                  <Building2 size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-[#2076C7] mb-1 uppercase tracking-tight">
                    Tailored for Property
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    Rates adjusted based on occupancy and risk factors.
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-teal-100 transition-all">
                <div className="p-2 rounded-xl bg-teal-50 text-[#1CADA3]">
                  <Zap size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1CADA3] mb-1 uppercase tracking-tight">
                    Instant Results
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    No waiting for agents. Get the pricing instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-xl bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100">

              {/* Inputs */}
              <div className="space-y-8 mb-10">

                {/* Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      Property Value
                    </label>
                    <span className="text-xl font-bold text-[#2076C7]">
                      {formatCurrency(propertyValue)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2076C7]"
                  />

                  <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                    <span>₹10 LAKHS</span>
                    <span>₹5 CRORES</span>
                  </div>
                </div>

                {/* Select + Tenure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
                      Property Category
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="residential">Residential Unit</option>
                      <option value="commercial">Commercial Space</option>
                      <option value="industrial">Industrial Plant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
                      Policy Term
                    </label>
                    <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                      {[1, 3, 5].map((yr) => (
                        <button
                          key={yr}
                          onClick={() => setTenure(yr)}
                          className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tenure === yr
                            ? "bg-white text-[#2076C7] shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                          {yr} Year
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-[#f8fbff] rounded-2xl md:rounded-3xl p-6 space-y-4 border border-blue-50/50">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-bold text-sm">
                    Net Premium
                  </span>
                  <span className="text-[#2076C7] font-bold">
                    {formatCurrency(calculatedPremium.net)}
                  </span>
                </div>

                <div className="flex justify-between text-[#1CADA3]">
                  <span className="font-bold text-sm flex items-center gap-1">
                    GST (18%) <Info size={14} />
                  </span>
                  <span className="font-bold">
                    +{formatCurrency(calculatedPremium.gst)}
                  </span>
                </div>

                <div className="pt-4 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-[#2076C7] font-bold text-lg uppercase tracking-tight">
                    Total Premium
                  </span>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-[#2076C7]">
                      {formatCurrency(calculatedPremium.total)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Per Policy Term
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={openForm}
                className="w-full mt-8 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Proceed with Application <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
