"use client";

import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Users, CheckCircle2, ArrowRight, Play, Star } from "lucide-react";
import Magnetic from "./Magnetic";
import { useMousePosition } from "../../../hooks/useMousePosition";
import React, { useState, useEffect } from "react";
import { useModal } from '@/app/context/ModalContext';


export default function Hero() {
  const { openLogin } = useModal();
  const { x, y } = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Physics-based movement for orbs
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 30 });

  const orbX = useTransform(mouseXSpring, [0, 2000], [-30, 30]);
  const orbY = useTransform(mouseYSpring, [0, 1200], [-30, 30]);

  return (
    <section className="relative min-h-[70vh] flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-r from-blue-50 to-white font-sans">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#2076C70A_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#1CADA30A_0%,transparent_60%)]" />
      </div>

      <div className="container-custom relative z-10 px-6 md:px-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="text-center lg:text-left py-10 lg:py-20 mx-auto lg:mx-0 max-w-2xl">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-4 px-5 py-3 rounded-full bg-white/60 border border-[#2076C7]/10 mb-10 backdrop-blur-xl shadow-lg mx-auto lg:mx-0">
              <span className="text-xs font-black text-[#2076C7]/80 uppercase tracking-widest">
                Trusted by 50,000+ Indian Families
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              Securing Lives, <br />
              Building Legacies.
            </h1>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-sans">
              Sophisticated life insurance solutions for absolute financial peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={(e) => { e.preventDefault(); openLogin(); }}
                className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer inline-block text-center"
                style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
              </button>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-10 pt-10 border-t border-slate-100">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900">99.8%</div>
                <div className="text-xs text-gray-500 uppercase font-black tracking-widest">
                  Claim Settlement
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900">25+</div>
                <div className="text-xs text-gray-500 uppercase font-black tracking-widest">
                  Trusted Partners
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-500 uppercase font-black tracking-widest">
                  Secure Operations
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (IMAGE) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <div className="rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="/insurance/life-insurance-hero-minimalist.png"
                  alt="Secure Family Future"
                  className="w-full h-[240px] sm:h-[320px] lg:h-[450px] object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#2076C7] to-transparent" />
        <span className="text-[10px] font-black text-[#2076C7] uppercase tracking-[0.4em]">
          Discover
        </span>
      </div>
    </section>
  );
}

function Heart({ size, className, weight, ...props }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={weight === 'fill' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
