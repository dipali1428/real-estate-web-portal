'use client';

import { motion } from 'framer-motion';
import { 
  IconShieldCheck, IconArrowRight, IconArrowLeft, 
  IconHeartHandshake, IconWorld 
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../context/ModalContext';

export default function HeroSection() {
    const router = useRouter();
    const { openLogin } = useModal();
    
    return (
        <section className="relative min-h-[60vh] flex items-center pt-24 md:pt-12 pb-14 overflow-hidden bg-white px-2">
            
            {/* Back Button (Non-sticky) */}
            <div className="absolute z-10 top-4 left-4 md:top-12 md:left-12">
                <button
                    onClick={() => router.push('/')}
                    aria-label="Back to Home"
                    className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                >
                    <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all" >
                        <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    </div>
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group">
                    <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                    Back to Home
                </button>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    
                    {/* Left Column (Text Content) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="lg:w-[65%] space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12">
                        {/* Animated Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-20 border text-[#2076C7] font-black uppercase tracking-widest text-[10px] mt-16 md:mt-20 lg:mt-24 mb-6 lg:mb-8 shadow-sm"
                            style={{ borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1CADA3] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2076C7]"></span>
                            </span>
                            Cattle Protection Scheme
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
                            style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Protect Your Livestock <br className="hidden md:block" /> Secure Your Income
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-gray-600 font-medium text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Safeguard your cows, buffaloes, sheep and goats against unforeseen risks. Affordable premiums, quick claims, and complete peace of mind for your farm.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center lg:justify-start items-center">
                            <button
                                onClick={openLogin}
                                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-10 py-4 rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-1 transition-all duration-300 shadow-lg active:scale-95 whitespace-nowrap">
                                Apply Now <IconArrowRight size={18} className="shrink-0" />
                            </button>
                            <a
                                href="/#contact"
                                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 border-2 border-[#2076C7]/20 bg-white text-[#2076C7] px-10 py-4 rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 shadow-lg active:scale-95 whitespace-nowrap">
                                <IconHeartHandshake size={18} className="shrink-0" /> Talk to an Expert
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column (Circular Illustration) */}
         <motion.div className="w-full lg:w-[50%] relative flex justify-center lg:justify-end items-center">

  <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[500px] xl:max-w-[560px] aspect-square flex items-center justify-center">

    {/* Glow Background */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2076C7]/10 via-transparent to-[#1CADA3]/10 blur-2xl" />

    {/* Spinning Ring */}
    <div className="absolute inset-6 sm:inset-10 lg:inset-14 rounded-full border border-dashed border-[#2076C7]/20 animate-spin-slow" />

    {/* Main Circle */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[460px] lg:h-[460px] xl:w-[520px] xl:h-[520px] rounded-full flex items-center justify-center shadow-2xl overflow-hidden bg-white"
    >

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2076C7]/5 to-[#1CADA3]/5" />

      <img
        src="/insurance/cattle insurance.jpeg"
        alt="Cattle Protection Illustration"
        className="w-full h-full object-cover object-center"
      />

    </motion.div>

    {/* Floating Badge 1 */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-0 right-0 sm:-top-4 sm:-right-2 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2 border border-[#2076C7]/10 z-20"
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-lg flex items-center justify-center text-white">
        <IconShieldCheck size={16} />
      </div>
      <div className="text-left">
        <div className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
          Protection
        </div>
        <div className="text-[10px] sm:text-[12px] font-black text-slate-800 leading-tight">
          Secure Livestock
        </div>
      </div>
    </motion.div>

    {/* Floating Badge 2 */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute bottom-0 left-0 sm:-bottom-2 sm:-left-2 bg-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-2 border border-[#2076C7]/10 z-20"
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-lg flex items-center justify-center text-white">
        <IconWorld size={16} />
      </div>
      <div className="text-left">
        <div className="text-[7px] sm:text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
          Global
        </div>
        <div className="text-[10px] sm:text-[12px] font-black text-slate-800 leading-tight">
          Full Coverage
        </div>
      </div>
    </motion.div>

  </div>

</motion.div>
        </div>
      </div>
    </section>
  );
}