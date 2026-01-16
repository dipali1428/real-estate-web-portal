'use client';
import React from 'react';
import { Megaphone } from 'lucide-react'; // Make sure to install lucide-react

export default function CopartnersPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {/* 1. Animation Wrapper */}
      <div className="relative animate-bounce-slow">
        
        {/* 2. The "3D Shadow" layer (The peacock green offset) */}
        <div className="absolute inset-0 bg-[#1CADA3] translate-x-2 translate-y-2 rounded-2xl md:rounded-3xl" />

        {/* 3. The Main Badge */}
        <div className="relative flex items-center gap-4 md:gap-8 bg-[#2076C7] px-8 py-6 md:px-12 md:py-10 rounded-2xl md:rounded-3xl border-4 border-white shadow-xl">
          
          {/* 4. Megaphone Icon with sound lines */}
          <div className="relative">
            {/* Sound lines effect */}
            <div className="absolute -top-4 -right-2 flex flex-col gap-1">
                <div className="w-4 h-1 bg-white rounded-full rotate-[30deg]"></div>
                <div className="w-6 h-1 bg-white rounded-full"></div>
            </div>
            
            <Megaphone 
              className="text-white w-16 h-16 md:w-24 md:h-24 -rotate-12 drop-shadow-lg" 
              strokeWidth={2.5}
            />
          </div>

          {/* 5. The Text */}
          <div className="flex flex-col leading-none">
            <span className="text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
              Coming
            </span>
            <span className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase">
              Soon
            </span>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Style */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}