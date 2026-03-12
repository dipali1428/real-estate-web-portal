import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { INSURANCE_PARTNER_TYPES } from "./data";
import { useModal } from "../../../context/ModalContext";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function Insurers() {
  const { openLogin } = useModal();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-8 md:py-12"
    >
      <div className="text-center mb-16 md:mb-20">
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans mb-4 leading-tight text-center">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Types of Insurance Partners
          </span>
        </motion.h2>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
          We connect you with a wide network of trusted insurance providers
          across India. Partner allocation depends on specific protection needs
          and coverage requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {INSURANCE_PARTNER_TYPES.map((type, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`${type.color} p-6 sm:p-8 rounded-3xl border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
            style={{
              boxShadow:
                "0 2px 4px rgba(32,118,199,0.04), 0 8px 24px rgba(32,118,199,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Decorative background */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors"></div>

            <div className="relative z-10 flex-grow">
              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                <type.icon className={`w-7 h-7 ${type.textColor}`} />
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-[#0056D2] text-xl mb-6 text-center">
                {type.name}
              </h3>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {type.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-3 justify-start"
                  >
                    <div className="mt-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${type.textColor}`}
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <div className="relative z-10 mt-auto pt-4 border-t border-black/5">
              <button
                onClick={openLogin}
                className={`w-full py-3.5 bg-white rounded-xl text-sm ${type.textColor} font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn cursor-pointer`}
              >
                Enquire Now
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}