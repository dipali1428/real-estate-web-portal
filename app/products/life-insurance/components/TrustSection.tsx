"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Landmark, BadgePercent, Star } from "lucide-react";

export default function TrustSection() {
  const stats = [
    { label: "Claim Settlement", value: "99.8%", icon: BadgePercent, sub: "Industry Leading" },
    { label: "Trusted Partners", value: "25+", icon: Landmark, sub: "Leading Insurers" },
    { label: "Secure Operations", value: "100%", icon: ShieldCheck, sub: "Enterprise-grade Privacy" },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-[#F8FAFC] text-[#2076C7] overflow-hidden relative font-sans"
      id="trust"
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#2076C7]/5 rounded-full blur-[140px] -z-0 pointer-events-none" />

      <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left w-full mx-auto lg:mx-0"
          >
            <div className="flex items-center justify-start gap-2 mb-6">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-[#1CADA3] fill-[#1CADA3]" />
              <span className="text-[#1CADA3] font-black uppercase text-[10px] md:text-sm tracking-widest">
                WHY FAMILIES TRUST US
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6 leading-tight">
              Supported by India's Trusted Insurers
            </h2>

            <p className="text-gray-500 text-lg md:text-xl font-light mb-10 leading-relaxed">
              Partnering with India's most respected insurers to ensure your
              family's future stays safe and secure.
            </p>

            <div className="space-y-5 max-w-md mx-auto lg:mx-0">
              {[
                "IRDAI Regulated Security",
                "Dedicated Claims Concierge",
                "Paperless Processing",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-start gap-4 text-base md:text-lg group"
                >
                  <div className="p-2 rounded-full bg-teal-50 group-hover:bg-[#1CADA3] transition-colors">
                    <CheckCircle2 className="text-[#1CADA3] group-hover:text-white w-5 h-5" />
                  </div>
                  <span className="text-gray-600 font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-gray-100 hover:bg-white hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex items-center gap-6 text-center sm:text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2076C7]/5 group-hover:bg-[#2076C7] flex items-center justify-center text-[#2076C7] group-hover:text-white transition-all duration-500 shrink-0 mx-auto sm:mx-0">
                  <stat.icon className="w-7 h-7" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <div className="text-[#1CADA3] font-black text-xs uppercase tracking-widest">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-[10px] mt-1 font-semibold">
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
