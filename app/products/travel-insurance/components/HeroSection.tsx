'use client';

import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { IconChevronRight, IconCalendar, IconMapPin, IconWorld, IconShieldCheck, IconPlaneDeparture, IconAlertCircle } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import QuoteModal from './QuoteModal';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effects for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);
  // Modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Quote Bar State
  const [destination, setDestination] = useState('');
  const [residingIn, setResidingIn] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [showError, setShowError] = useState(false);

  const isFormValid = destination.trim() !== '' && residingIn.trim() !== '' && departureDate.trim() !== '';

  const handleGetFreeQuote = () => {
    if (isFormValid) {
      setShowQuoteModal(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[75vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-[#fafcfe]">

      {/* --- Premium Background Elements --- */}

      {/* Animated Mesh Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-teal-50/50 rounded-full blur-[140px]"
        />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[100px]" />
      </div>

      {/* Hero Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232076c7' fill-opacity='1'%3E%3Cpath d='M36 34v2H20v-2h16zm0-8v2H20v-2h16zm-16 16v2h16v-2H20zm16-24v2H20v-2h16zM24 24h4v4h-4v-4zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zm8-16h4v4h-4v-4zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zM40 40v4H24v-4h16zm0-8v4H24v-4h16zm-16 16v4h16v-4H24zm16-24v4H24v-4h16z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      {/* Floating Decorative Icons */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-[15%] right-[15%] text-blue-200/40 hidden lg:block">
        <IconPlaneDeparture size={120} stroke={1} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-[25%] left-[10%] text-teal-200/40 hidden lg:block">
        <IconShieldCheck size={100} stroke={1} />
      </motion.div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[70%] text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md border border-blue-100 shadow-sm text-blue-700 text-xs font-bold tracking-widest mb-8 uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Travel Fearlessly
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1] gradient-text py-2"
            >
              Explore Your
              <br className="hidden md:block" />
              Boundaries with
              <br className="md:hidden" />
              <span className="inline-block lg:block"> Travel Insurance.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl font-medium leading-relaxed mx-auto lg:mx-0 lg:text-left"
            >
              Comprehensive coverage for domestic and international travel. Get affordable plans with global medical coverage, trip protection & instant issuance.
            </motion.p>
          </motion.div>

          {/* Right Column: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-[30%] relative flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">

              {/* Dashed Orbit Circle */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-200/60 -z-0" />

              {/* Main Circular Image */}
              <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl z-10 border-4 border-white">
                <img
                  src="/travel insurance/heroo.jpg"
                  alt="Travel Protection Illustration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>

              {/* Floating Icon: Globe (Top-Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-6 z-20"
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100">
                  <IconWorld size={22} className="text-slate-400" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* 190+ Countries Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg flex items-center gap-1.5 border border-blue-50 z-20"
              >
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white">
                  <IconWorld size={12} />
                </div>
                <div className="text-left">
                  <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Coverage</div>
                  <div className="text-[10px] font-black text-slate-800 leading-tight">190+ Countries</div>
                </div>
              </motion.div>

              {/* Floating Icon: Plane (Bottom-Left) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 left-2 z-20"
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100">
                  <IconPlaneDeparture size={22} className="text-slate-400" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Floating Icon: Shield (Bottom-Right) */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute bottom-2 right-0 z-20"
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100">
                  <IconShieldCheck size={22} className="text-slate-400" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Floating Teal Globe Badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute bottom-16 -right-2 z-30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                  <IconWorld size={28} className="text-white" strokeWidth={1.8} />
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* --- Glassmorphism Quote Widget --- */}
        <div className="relative mt-4">
          {/* Validation Alert */}
          <AnimatePresence>
            {
              showError && !isFormValid && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-30"
                >
                  <IconAlertCircle size={16} />
                  <span className="text-xs font-bold">Please fill all travel details first</span>
                </motion.div>
              )
            }
          </AnimatePresence>

          {/* Animated Glowing Aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl p-3 md:p-4 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(32,118,199,0.12)] border border-white/80 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">

              {/* Destination Input */}
              <div className="relative">
                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all duration-300 group/input ${showError && !destination ? 'border-red-200 bg-red-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'}`}>
                  <div className="flex items-center gap-2 text-blue-600">
                    <IconMapPin size={18} stroke={2} />
                    <span className="text-sm font-medium">Travel Destination</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Country or City"
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value); if (showError) setShowError(false); }}
                    className="bg-transparent w-full text-base text-slate-400 font-extrabold outline-none placeholder:text-slate-400 py-0.5"
                  />
                </div>
              </div>

              {/* Residence Select */}
              <div className="relative">
                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all duration-300 group/input ${showError && !residingIn ? 'border-red-200 bg-red-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'}`}>
                  <div className="flex items-center gap-2 text-blue-600">
                    <IconWorld size={18} stroke={2} />
                    <span className="text-sm font-medium">Residing In</span>
                  </div>
                  <select
                    value={residingIn}
                    onChange={(e) => { setResidingIn(e.target.value); if (showError) setShowError(false); }}
                    className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${residingIn ? 'text-slate-400' : 'text-slate-400'}`}
                  >
                    <option value="">Select Region</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Date Input */}
              <div className="relative">
                <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all duration-300 group/input ${showError && !departureDate ? 'border-red-200 bg-red-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'}`}>
                  <div className="flex items-center gap-2 text-blue-600">
                    <IconCalendar size={18} stroke={2} />
                    <span className="text-sm font-medium">Departure Date</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Select Dates"
                    value={departureDate}
                    onChange={(e) => { setDepartureDate(e.target.value); if (showError) setShowError(false); }}
                    className="bg-transparent w-full text-base text-slate-400 font-extrabold outline-none placeholder:text-slate-400 py-0.5"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                  />
                </div>
              </div>

              {/* Animated Button */}
              <button
                onClick={handleGetFreeQuote}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-500 text-white font-black text-lg rounded-2xl shadow-[0_10px_30px_-10px_rgba(32,118,199,0.4)] hover:shadow-[0_20px_50px_-12px_rgba(32,118,199,0.5)] transition-all duration-300 group/btn h-full py-3 lg:py-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex gap-3 items-center justify-center">
                  Get Free Quote
                  <IconChevronRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1s_infinite]" />
              </button>

            </div>

            {/* Bottom Info Bar */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden ring-2 ring-blue-50/50">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xl">+12k</div>
                </div>
                <p className="text-sm font-bold text-slate-500">
                  <span className="text-blue-600 font-black">12,400+</span> travelers insured last 6 months
                </p>
              </div>
            </div>

          </div>
        </div >
      </div >

      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => {
          setShowQuoteModal(false);
          setDestination('');
          setResidingIn('');
          setDepartureDate('');
          setShowError(false);
        }}
      />
    </section >
  );
}
