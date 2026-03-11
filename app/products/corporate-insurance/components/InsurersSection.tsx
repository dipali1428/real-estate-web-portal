import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { TOP_INSURERS } from "./data";

interface InsurersSectionProps {
  openQuote: () => void;
}

export const InsurersSection: React.FC<InsurersSectionProps> = ({
  openQuote,
}) => {
  return (
    <motion.section
      id="insurers"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 font-sans leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
            Leading Commercial & Corporate Insurers in India
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal">
          We partner with IRDAI-approved insurers rated on Claim Settlement
          Ratio, Network Hospitals, and Financial Stability.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TOP_INSURERS.map((insurer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100/80 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center h-full shadow-[0_4px_20px_rgba(32,118,199,0.08)] hover:shadow-[0_8px_30px_rgba(28,173,163,0.2)]"
          >
            <div className="flex flex-col items-center mb-6">
              <div>
                {insurer.image && (
                  <div className="h-10 w-28 relative mb-3 mx-auto">
                    <Image
                      src={insurer.image}
                      alt={insurer.name}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                )}
                <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
                  {insurer.name}
                </h3>
              </div>
            </div>

            <div className="space-y-3 mb-6 w-full max-w-xs">
              <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                <span className="text-slate-600">Claim Ratio</span>
                <span className="font-bold text-[#1CADA3]">
                  {insurer.claimRatio}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                <span className="text-slate-600">Network</span>
                <span className="font-semibold text-slate-800">
                  {insurer.network}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Market Cap</span>
                <span className="font-semibold text-slate-800">
                  {insurer.marketCap}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mb-6 leading-relaxed line-clamp-2">
              {insurer.specialty}
            </p>

            <div className="mt-auto w-full pt-4 border-t border-black/5">
              <button
                onClick={() => openQuote()}
                className="w-full py-2.5 bg-white rounded-lg text-sm text-[#2076C7] font-semibold border border-[#2076C7]/20 hover:border-[#2076C7] hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                aria-label={`Get quote from ${insurer.name}`}
              >
                Get Quote
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
