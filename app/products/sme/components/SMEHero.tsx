"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconBuildingBank, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface SMEHeroProps {
  openLogin: () => void;
}

export const SMEHero: React.FC<SMEHeroProps> = ({ openLogin }) => {
  const router = useRouter();
  const handleBackHome = () => router.push("/");

  return (
    <section className="relative min-h-[75vh] flex items-center bg-white overflow-hidden pt-8 pb-16">

      {/* Back Button */}
      <div className="absolute z-10 top-8 left-4 md:top-12 md:left-12">
        {/* Mobile */}
        <button
          onClick={handleBackHome}
          aria-label="Back to Home"
          className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
        >
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
          </div>
        </button>

        {/* Desktop */}
        <button
          onClick={handleBackHome}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
        >
          <IconArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            strokeWidth={2}
          />
          Back to Home
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12"
          >

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mt-20"
              style={{
                color: "#2076C7",
                borderColor: "rgba(32,118,199,0.2)",
              }}
            >
              <IconBuildingBank size={12} />
              SME Loan • Infinity Arthvishva
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
              style={{
                background: "linear-gradient(to right, #2076C7, #1CADA3, #2076C7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Financing for
              <br />
              Growth-Driven SMEs
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl mb-6 text-gray-600 leading-relaxed max-w-lg">
              Fast, flexible, and secure business financing designed for your
              growth journey. Get the backup your business needs to scale.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Primary */}
              <button
                onClick={openLogin}
                className="group relative text-white px-10 py-5 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #1CADA3, #2076C7)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Enquire Online
                </span>

                <div
                  className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  style={{
                    background: "linear-gradient(to right, #189B8D, #1A68B0)",
                  }}
                />
              </button>

              {/* Secondary */}
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-white px-7 py-2 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                style={{ color: "#2076C7", borderColor: "#2076C7" }}
              >
                Explore Products
                <IconArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[620px] lg:max-w-[680px]">
              <Image
                src="/loan/sme.jpeg"
                alt="SME Loans illustration"
                width={600}
                height={500}
                className="object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};