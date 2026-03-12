'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconChevronRight, IconCalendar, IconDog, IconAlertCircle, 
  IconBone, IconArrowLeft, IconShieldCheck, IconWorld 
} from '@tabler/icons-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useModal } from '@/app/context/ModalContext';

export default function HeroSection() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { openLogin } = useModal();

  // Breed sub-options based on pet type
  const BREED_OPTIONS: Record<string, string[]> = {
    Dog: ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Pug', 'Beagle', 'Rottweiler', 'Rajapalayam', 'Mudhol Hound', 'Indian Spitz', 'Doberman', 'Mixed Breed', 'Other'],
    Cat: ['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Indian Domestic', 'Mixed Breed', 'Other'],
    Bird: ['Parrot', 'Cockatiel', 'Lovebird', 'Macaw', 'Budgerigar', 'Other'],
    Other: ['Rabbit', 'Guinea Pig', 'Hamster', 'Turtle', 'Other'],
  };

  // Quote Bar State
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [showError, setShowError] = useState(false);

  const handlePetTypeChange = (val: string) => {
    setPetType(val);
    setPetBreed(''); 
    if (showError) setShowError(false);
  };

  const isFormValid = petType.trim() !== '' && petAge.trim() !== '' && petBreed.trim() !== '';

  return (
    <section ref={containerRef} className="relative min-h-[60vh] flex items-center pt-24 md:pt-12 pb-14 overflow-hidden bg-white px-2">
      
      {/* Back Button (Non-sticky) */}
      <div className="absolute z-[100] top-4 left-4 md:top-12 md:left-12">
        <Link
          href="/"
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </Link>
        <Link
          href="/"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Column (Text Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-[65%] space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-20 border text-[#2076C7] text-[10px] md:text-xs font-black uppercase tracking-widest shadow-sm mt-16 md:mt-20 lg:mt-24 mb-6 lg:mb-8"
              style={{ borderColor: 'rgba(32, 118, 199, 0.2)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1CADA3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2076C7]"></span>
              </span>
              Protect Your Furry Friend
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
              style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Smart Protection for Happy Pets
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-600 font-medium text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Get comprehensive coverage for accidents, illnesses, surgeries, and routine checkups. Affordable plans designed for all companions.
            </motion.p>
          </motion.div>

          {/* Right Column (Circular Illustration) */}
          <motion.div className="lg:w-[35%] relative flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Decorative Background Rings & Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2076C7]/10 via-transparent to-[#1CADA3]/10 blur-2xl" />
              <div className="absolute inset-10 rounded-full border border-dashed border-[#2076C7]/20 animate-spin-slow" />

              {/* Main Illustration (Circular Form) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
              >
                {/* Subtle Gradient Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2076C7]/5 to-[#1CADA3]/5" />

                <img
                  src="/insurance/pet.jpeg"
                  alt="Pet Protection Illustration"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Badges */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1CADA3]/30"><IconShieldCheck size={18} /></div>
                <div className="text-left">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Protection</div>
                  <div className="text-[12px] font-black text-slate-800 leading-tight">Secure Pet</div>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-2 -left-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1CADA3] to-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2076C7]/30"><IconWorld size={18} /></div>
                <div className="text-left">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Global</div>
                  <div className="text-[12px] font-black text-slate-800 leading-tight">Full Coverage</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- Quote Widget --- */}
        <div className="relative mt-4">
          <AnimatePresence>
            {showError && !isFormValid && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-30"
              >
                <IconAlertCircle size={16} />
                <span className="text-xs font-bold">Please fill all pet details first</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-4 md:p-9 lg:p-4 rounded-[2rem] border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              
              {/* Pet Type */}
              <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !petType ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 text-[#2076C7]"><IconDog size={18} /><span className="text-sm font-medium">Pet Type</span></div>
                <select
                  value={petType}
                  onChange={(e) => handlePetTypeChange(e.target.value)}
                  className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${petType ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  <option value="">Select Pet</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird/Parrot</option>
                  <option value="Other">Exotic Pet</option>
                </select>
              </div>

              {/* Breed */}
              <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !petBreed ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 text-[#2076C7]"><IconBone size={18} /><span className="text-sm font-medium">Breed</span></div>
                <select
                  value={petBreed}
                  onChange={(e) => { setPetBreed(e.target.value); if (showError) setShowError(false); }}
                  disabled={!petType}
                  className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${petBreed ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  <option value="">{petType ? 'Select Breed' : 'Select Type First'}</option>
                  {petType && BREED_OPTIONS[petType]?.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              {/* Age */}
              <div className={`flex flex-col gap-1 p-2.5 rounded-2xl bg-white/50 border transition-all ${showError && !petAge ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 text-[#2076C7]"><IconCalendar size={18} /><span className="text-sm font-medium">Pet Age</span></div>
                <select
                  value={petAge}
                  onChange={(e) => { setPetAge(e.target.value); if (showError) setShowError(false); }}
                  className={`bg-transparent w-full text-base font-extrabold outline-none appearance-none cursor-pointer py-0.5 ${petAge ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  <option value="">Select Age</option>
                  <option value="Puppy/Kitten">Puppy/Kitten (&lt; 1 yr)</option>
                  <option value="Adult">Adult (1 - 7 yrs)</option>
                  <option value="Senior">Senior (7+ yrs)</option>
                </select>
              </div>

              {/* Button */}
              <button
                onClick={openLogin}
                className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:shadow-[0_20px_40px_-10px_rgba(32,118,199,0.3)] hover:-translate-y-1 transition-all duration-300 shadow-lg active:scale-95"
              >
                <span className="relative z-10 flex gap-3 items-center justify-center">Get Quote & Apply <IconChevronRight size={18} strokeWidth={3} /></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Redirect to Login directly */}
    </section>
  );
}
