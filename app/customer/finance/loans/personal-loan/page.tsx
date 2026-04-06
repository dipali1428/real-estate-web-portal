// "use client";

// import React, { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   Plus,
//   ShieldCheck,
//   Zap,
//   X,
//   Landmark,
//   CheckCircle2,
//   ArrowRight,
//   Percent,
//   IndianRupee,
//   Calendar,
//   Clock,
//   Star,
// } from "lucide-react";

// import PayoutStructure from "../../../products/personal-loan/components/PayoutStructure";
// import PersonalLoanForm from "../../../products/personal-loan/components/personaloanform";
// import PlanDetailDrawer, { getPlansForBank, PlanInfo } from "./components/PlanDetailDrawer";

// export default function PersonalLoanDashboard() {
//   const [showForm, setShowForm] = useState(false);
//   const [formBank, setFormBank] = useState<string | undefined>(undefined);
//   const [selectedBank, setSelectedBank] = useState<string | null>(null);
//   const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);
//   const [drawerBank, setDrawerBank] = useState<string>("");
//   const plansRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const handlePlansClick = (bankName: string) => {
//     setSelectedBank(bankName);
//     setTimeout(() => {
//       plansRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 100);
//   };

//   const openPlanDetail = (plan: PlanInfo, bankName: string) => {
//     setSelectedPlan(plan);
//     setDrawerBank(bankName);
//   };

//   const closePlanDetail = () => {
//     setSelectedPlan(null);
//   };

//   const handleApply = (bankName: string, _planKey: string) => {
//     setSelectedPlan(null);
//     setFormBank(bankName);
//     setShowForm(true);
//   };

//   const openFormDirect = (bankName?: string) => {
//     setFormBank(bankName ?? undefined);
//     setShowForm(true);
//   };

//   const activePlans = selectedBank ? getPlansForBank(selectedBank) : null;

//   // Pre-approved offers data (static/illustrative)
//   const preApprovedOffers = [
//     { bank: "HDFC BANK", rate: "9.99%", amount: "₹25,00,000" },
//     { bank: "ICICI BANK", rate: "9.99%", amount: "₹20,00,000" },
//     { bank: "KOTAK MAHINDRA", rate: "9.99%", amount: "₹35,00,000" },
//   ];

//   return (
//     <div className="flex-1 p-4 md:p-10 bg-slate-50 font-sans min-h-screen">

//       {/* ─── Header ─── */}
//       <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 pb-6 border-b border-slate-200">
//         <div>
//           <div className="flex items-center gap-2 text-[10px] text-[#2076C7] font-black uppercase tracking-[0.2em] mb-3 bg-blue-50/50 w-fit px-3 py-1 rounded-md border border-blue-100">
//             <Zap size={12} className="animate-pulse" /> Strategic Lending
//           </div>
//           <h1 className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] font-sans">
//             Personal Loan Dashboard
//           </h1>
//           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
//             Explore plans, compare rates, and apply seamlessly
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => router.push("/customer/loans/personal-loan/applications")}
//             className="bg-white border-2 border-[#2076C7] text-[#2076C7] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2076C7] hover:text-white transition-all flex items-center gap-2"
//           >
//             <Clock size={14} strokeWidth={3} /> My Applications
//           </button>
//           <button
//             onClick={() => openFormDirect()}
//             className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-xl"
//           >
//             <Plus size={14} strokeWidth={3} /> Quick Application
//           </button>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto space-y-8">

//         {/* ─── P1: Pre-Approved Offers Banner ─── */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-5 md:p-6 text-white overflow-hidden relative"
//         >
//           <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
//           <div className="absolute bottom-0 left-20 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
//           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                 <Star size={22} className="text-yellow-300" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70 mb-1">Pre-Approved For You</p>
//                 <h3 className="text-lg md:text-xl font-black">
//                   {preApprovedOffers.length} offers starting at <span className="text-yellow-300">10.25% p.a.</span>
//                 </h3>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               {preApprovedOffers.map((o) => (
//                 <div key={o.bank} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 hidden sm:block">
//                   <p className="text-[8px] font-black text-white/60 uppercase tracking-widest">{o.bank}</p>
//                   <p className="text-xs font-black text-white">{o.rate} • up to {o.amount}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* ─── P1: Application Tracker ─── */}
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 md:p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
//               <Clock size={16} className="text-[#2076C7]" /> Application Status
//             </h3>
//             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
//               No Active Applications
//             </span>
//           </div>
//           <div className="flex items-center gap-3 text-center">
//             {["Applied", "Under Review", "Approved", "Disbursed"].map((step, i) => (
//               <React.Fragment key={step}>
//                 <div className="flex-1">
//                   <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-[10px] font-black ${
//                     i === 0 ? "bg-slate-100 text-slate-400 border-2 border-dashed border-slate-200" : "bg-slate-50 text-slate-300"
//                   }`}>
//                     {i + 1}
//                   </div>
//                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{step}</p>
//                 </div>
//                 {i < 3 && <div className="flex-1 h-[2px] bg-slate-100 rounded-full -mt-5" />}
//               </React.Fragment>
//             ))}
//           </div>
//           <p className="text-[10px] text-slate-400 font-medium text-center mt-4 italic">
//             Your application status will appear here once you submit a loan request.
//           </p>
//         </div>

//         {/* ─── Bank Grid ─── */}
//         <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 md:p-10">
//           <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
//             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
//               <ShieldCheck className="text-[#1CADA3]" size={22} />
//               Verified Partners
//             </h2>
//             <div className="text-[10px] font-black text-[#1CADA3] uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
//               Click &quot;Plans&quot; → View Products
//             </div>
//           </div>
//           <PayoutStructure hideHeader={true} onPlansClick={handlePlansClick} disableBankClick={true} />
//         </div>

//         {/* ─── P0: Enhanced Plan Cards Panel ─── */}
//         <AnimatePresence>
//           {selectedBank && activePlans && (
//             <motion.div
//               ref={plansRef}
//               key={selectedBank}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.35, ease: "easeOut" }}
//               className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
//             >
//               {/* Panel Header */}
//               <div className="p-6 md:px-10 md:py-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex justify-between items-center">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center shadow-sm">
//                     <Landmark size={22} className="text-[#1CADA3]" />
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Loan Plans For</p>
//                     <h2 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#2076C7] to-[#1CADA3] uppercase tracking-tight">
//                       {selectedBank}
//                     </h2>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="hidden sm:inline text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
//                     {activePlans.length} Plans
//                   </span>
//                   <button
//                     onClick={() => setSelectedBank(null)}
//                     className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-400 transition-colors text-slate-400"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               </div>

//               {/* Enhanced Plan Cards */}
//               <div className="p-6 md:p-10">
//                 <div className={`grid grid-cols-1 sm:grid-cols-2 ${activePlans.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-5`}>
//                   {activePlans.map((plan, idx) => (
//                     <motion.div
//                       key={plan.key}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.08 }}
//                       className="group border border-slate-100 rounded-[1.75rem] p-5 hover:shadow-xl hover:border-blue-100 transition-all flex flex-col bg-white"
//                     >
//                       {/* Icon + Badge */}
//                       <div className="flex items-start justify-between mb-4">
//                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.color} shadow-sm group-hover:scale-110 transition-transform`}>
//                           <plan.icon size={18} />
//                         </div>
//                         <span className="text-[8px] font-black uppercase tracking-widest bg-blue-50 text-[#2076C7] px-2 py-1 rounded-md border border-blue-100">
//                           {plan.badge}
//                         </span>
//                       </div>

//                       {/* Title */}
//                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-3">{plan.title}</h3>

//                       {/* Key Metrics */}
//                       <div className="space-y-2 mb-4 flex-1">
//                         <div className="flex items-center gap-2">
//                           <Percent size={11} className="text-slate-400 shrink-0" />
//                           <p className="text-[10px] font-bold text-slate-500">
//                             Rate: <span className="text-[#2076C7] font-black">{plan.rateRange}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <IndianRupee size={11} className="text-slate-400 shrink-0" />
//                           <p className="text-[10px] font-bold text-slate-500">
//                             Amount: <span className="text-slate-800 font-black">{plan.amountRange}</span>
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar size={11} className="text-slate-400 shrink-0" />
//                           <p className="text-[10px] font-bold text-slate-500">
//                             Tenure: <span className="text-slate-800 font-black">{plan.tenureRange}</span>
//                           </p>
//                         </div>
//                       </div>

//                       {/* Key Benefit */}
//                       <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-5 border-t border-slate-50 pt-3">
//                         {plan.keyBenefit}
//                       </p>

//                       {/* View Details CTA */}
//                       <button
//                         onClick={() => openPlanDetail(plan, selectedBank)}
//                         className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-90 hover:shadow-lg text-white text-[10px] font-black uppercase tracking-[0.15em] py-3 rounded-xl transition-all flex items-center justify-center gap-2"
//                       >
//                         View Full Details <ArrowRight size={13} />
//                       </button>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Trust Footer */}
//                 <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap items-center gap-6">
//                   {["RBI Regulated", "Zero Hidden Charges", "Paperless Process"].map((tag) => (
//                     <div key={tag} className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-wide">
//                       <CheckCircle2 size={13} />
//                       {tag}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Footer */}
//         <div className="pt-4 pb-8 text-center">
//           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
//             Institutional Grade Lending • Secure Infrastructure
//           </p>
//         </div>
//       </div>

//       {/* ─── P0: Plan Detail Drawer ─── */}
//       <AnimatePresence>
//         {selectedPlan && (
//           <PlanDetailDrawer
//             plan={selectedPlan}
//             bankName={drawerBank}
//             onClose={closePlanDetail}
//             onApply={handleApply}
//           />
//         )}
//       </AnimatePresence>

//       {/* ─── Application Form Modal ─── */}
//       {showForm && (
//         <PersonalLoanForm
//           onClose={() => setShowForm(false)}
//           selectedBank={formBank}
//         />
//       )}
//     </div>
//   );
// }
