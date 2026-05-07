"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Zap, Heart,
  GraduationCap, Anchor, Gem, ArrowRight, Shield, Star,
  Briefcase, Landmark, X, CheckCircle2, Info
} from "lucide-react";

import { useModal } from "../../../context/ModalContext";

const products = [
  {
    title: "Retirement Plans",
    tag: "Pension for Life",
    desc: "Secure your golden years with guaranteed lifelong monthly income.",
    insight: "Strategic for professionals seeking a hedge against inflation. These plans offer compounded bonuses and a 'Joint Life' option to secure your spouse's future too.",
    benefits: ["Guaranteed Lifelong Income", "Tax-Free Maturity", "Spouse Coverage Included"],
    icon: Anchor,
    color: "#2076C7",
    isPopular: true
  },
  {
    title: "Term Insurance",
    tag: "Pure Protection",
    desc: "High life cover at the lowest premium. Foundation of security.",
    insight: "The most cost-effective way to secure your family's lifestyle. We recommend a cover of 20x your annual income for complete peace of mind.",
    benefits: ["Large Sum Assured", "Lowest Premium Rates", "Critical Illness Riders"],
    icon: ShieldCheck,
    color: "#1CADA3"
  },
  {
    title: "1 Crore Term Plan",
    tag: "High Value",
    desc: "Standard high-value coverage for your family's big dreams.",
    insight: "Specifically designed for young parents. It covers home loans, education costs, and daily expenses in one comprehensive umbrella.",
    benefits: ["High-Value Security", "Fixed Premium Rates", "Paperless Processing"],
    icon: Star,
    color: "#2076C7",
    isTrending: true
  },
  {
    title: "Zero Cost Term",
    tag: "TROP Benefit",
    desc: "Get 100% of your premiums back if you survive the term.",
    insight: "Strategic for those who want protection but feel premiums are a 'lost' cost. At maturity, you get every penny back, effectively making the cover free.",
    benefits: ["Full Premium Refund", "Surrender Options", "Survival Benefits"],
    icon: Zap,
    color: "#1CADA3"
  },
  {
    title: "Whole Life Insurance",
    tag: "Cover till 100",
    desc: "Lifetime protection that leaves a massive legacy for children.",
    insight: "A powerful estate planning tool. It creates a guaranteed tax-free inheritance for the next generation while providing cash value access.",
    benefits: ["Coverage till Age 100", "Cash Value Accumulation", "Legacy Planning Tool"],
    icon: Gem,
    color: "#2076C7"
  },
  {
    title: "Child Future Plans",
    tag: "Education Fund",
    desc: "Ensure your child's milestones are funded even in your absence.",
    insight: "Includes a 'Waiver of Premium' feature. If something happens to you, the insurer pays all future premiums and the child still gets the fund.",
    benefits: ["Waiver of Premium", "Market-Linked Growth", "Educational Milestones"],
    icon: GraduationCap,
    color: "#1CADA3"
  },
  {
    title: "Money Back Plan",
    tag: "Liquidity Plus",
    desc: "Regular payouts every few years while your cover stays active.",
    insight: "Best for short-term goals like car upgrades or home renovation every 4-5 years, without compromising on the long-term life cover.",
    benefits: ["Periodic Payouts", "Guaranteed Additions", "High Liquidity"],
    icon: Landmark,
    color: "#2076C7"
  },
  {
    title: "Saral Jeevan Bima",
    tag: "Standard Plan",
    desc: "Simple and standardized term plan as per IRDAI guidelines.",
    insight: "Perfect for first-time buyers. No hidden clauses, standardized wording across all companies, making it easy to understand and trust.",
    benefits: ["Transparent Clauses", "Easy Claim Process", "Government-backed Format"],
    icon: Shield,
    color: "#1CADA3"
  },
  {
    title: "Term Plan (Salaried)",
    tag: "Exclusive Rates",
    desc: "Special discounted rates and easy KYC for salaried professionals.",
    insight: "Leverage your corporate profile for lower rates. Salaried individuals usually get faster processing and higher sum assured limits.",
    benefits: ["Corporate Discounts", "Fast-track Issuance", "Minimal Documentation"],
    icon: Briefcase,
    color: "#2076C7"
  },
  {
    title: "Women Term Life",
    tag: "Special Benefits",
    desc: "Lower premium rates and wellness benefits exclusively for women.",
    insight: "Includes specific riders for female-related critical illnesses. Premiums are scientifically lower due to higher life expectancy.",
    benefits: ["Lower Premiums", "Cancer-specific Riders", "Free Health Checkups"],
    icon: Heart,
    color: "#1CADA3"
  }
];

const LifeProductGrid = () => {
  const { openLogin } = useModal();
  const pathname = usePathname();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDevMessage, setShowDevMessage] = useState(false);

  const isCustomer = pathname?.includes("/customer");

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleProceed = () => {
    if (isCustomer) {
      setSelectedProduct(null);
      setShowDevMessage(true);
      setTimeout(() => setShowDevMessage(false), 3000); // Auto hide after 3s
    } else {
      setSelectedProduct(null);
      openLogin();
    }
  };

  return (
    <section
      className="py-0 relative overflow-hidden text-gray-700 font-sans"
      id="products"
    >
      <div className="container-custom relative z-10 px-6 md:px-10 mx-auto max-w-7xl">

        {/* Grid Container with Vertical Scrollbar */}
        <div className="max-h-[650px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 p-1">

            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => handleProductClick(product)}
                className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#2076C7]/20 transition-all flex flex-col items-center text-center cursor-pointer"
              >
                {/* Badge */}
                {product.isPopular && (
                  <div className="absolute top-3 right-3 bg-[#2076C7] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Popular
                  </div>
                )}
                {product.isTrending && (
                  <div className="absolute top-3 right-3 bg-[#1CADA3] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Trending
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-[#2076C7] transition-colors duration-500"
                  style={{ color: product.color }}
                >
                  <product.icon className="w-6 h-6 group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Tag */}
                <span className="text-[9px] font-black text-[#1CADA3] uppercase tracking-widest mb-2">
                  {product.tag}
                </span>

                {/* Title */}
                <h3 className="font-sans text-[13px] md:text-base font-black text-[#2076C7] mb-3 leading-tight group-hover:text-[#1CADA3] transition-colors">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-[10px] md:text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {product.desc}
                </p>

                {/* Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight className="w-4 h-4 text-[#2076C7]" />
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>

      {/* Strategic Insight Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all z-10"
              >
                <X size={18} />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${selectedProduct.color}15`, color: selectedProduct.color }}>
                    <selectedProduct.icon size={32} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#1CADA3] uppercase tracking-[0.2em]">{selectedProduct.tag}</span>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800">{selectedProduct.title}</h2>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                  <div className="flex items-start gap-3 mb-4">
                    <Info size={16} className="text-[#2076C7] mt-1 shrink-0" />
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Strategic Insight</p>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                        "{selectedProduct.insight}"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Key Strategic Benefits</p>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedProduct.benefits?.map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-3 p-3 bg-white border border-slate-50 rounded-xl shadow-sm">
                        <CheckCircle2 size={16} className="text-[#1CADA3]" />
                        <span className="text-xs font-bold text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
                >
                  Got it, Proceed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Development Message Toast */}
      <AnimatePresence>
        {showDevMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: -40, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-0 left-1/2 z-[9999] bg-blue-50 border border-blue-200 px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
               <Zap size={20} className="text-[#2076C7] animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.2em] mb-0.5">Development Insight</p>
              <p className="text-[12px] font-bold text-slate-700 leading-tight">
                Module currently under strategic refinement
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Blurs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#2076C7]/5 rounded-full blur-[100px] translate-x-1/2" />
    </section>
  );
};

export default LifeProductGrid;