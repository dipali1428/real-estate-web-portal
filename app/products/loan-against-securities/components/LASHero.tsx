"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconArrowLeft,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
interface LASHeroProps {
  openLogin: () => void;
}
export const LASHero: React.FC<LASHeroProps> = ({ openLogin }) => {
  const router = useRouter();
  const handleBackHome = () => router.push("/");
  return (
    <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-12 pb-16 font-sans">
      {" "}
      {/* Back Button */}{" "}
      <div className="absolute z-10 top-8 left-4 md:top-12 md:left-12">
        {" "}
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
        >
          {" "}
          <IconArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            strokeWidth={2}
          />{" "}
          Back to Home{" "}
        </button>{" "}
      </div>{" "}
      <div className="max-w-[1440px] mx-auto px-6 w-full">
        {" "}
        {/* Changed items-center to items-start for better alignment control */}{" "}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {" "}
          {/* Left: Content - Spans 7 cols */}{" "}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12 pt-16 lg:pt-20"
          >
            {" "}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
              style={{
                color: "#2076C7",
                borderColor: "rgba(32, 118, 199, 0.2)",
              }}
            >
              {" "}
              <IconShieldCheck size={12} /> Loan Against Securities • Infinity
              Arthvishva{" "}
            </div>{" "}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.1]"
              style={{
                background:
                  "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}
              Unlock Liquidity <br /> From Your Assets{" "}
            </h1>{" "}
            <p className="text-lg sm:text-xl mb-6 text-gray-600 leading-relaxed max-w-lg">
              {" "}
              Get instant funds against your shares, mutual funds, and bonds
              without selling them. Interest rates starting at{" "}
              <span className="font-bold text-[#2076C7]">8.5% p.a.</span>{" "}
            </p>{" "}
            {/* CTAs */}{" "}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              {" "}
              <button
                onClick={openLogin}
                className="group relative text-white px-10 py-5 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #1CADA3, #2076C7)",
                }}
              >
                {" "}
                <span className="relative z-10">Enquire Now</span>{" "}
                <div
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{
                    background: "linear-gradient(to right, #189B8D, #1A68B0)",
                  }}
                ></div>{" "}
              </button>{" "}
              <a
                href="#products"
                className="group relative bg-white px-10 py-5 rounded-lg font-bold text-xl border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                style={{ color: "#2076C7", borderColor: "#2076C7" }}
              >
                {" "}
                View Products{" "}
                <IconArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
              </a>{" "}
            </div>{" "}
          </motion.div>{" "}
          {/* Right: Illustration - Spans 5 cols */}{" "}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            {" "}
            <div className="relative w-full max-w-[520px] lg:max-w-[540px]">
              {" "}
              {/* Decorative background glow to frame the image */}{" "}

              <img
                src="/loan/las.jpeg"
                alt="LAS Illustration"
                className="w-full h-auto object-contain lg:scale-[0.95] translate-y-12"
              />{" "}
            </div>{" "}
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
