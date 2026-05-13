'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, BadgeCheck, Copy, Share2, Landmark } from 'lucide-react';

interface PRANCardProps {
  pran: string;
  name: string;
  status: string;
  manager: string;
}

const PRANCard: React.FC<PRANCardProps> = ({ pran, name, status, manager }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 group hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2076C7]/5 to-[#1CADA3]/5 rounded-full -mr-16 -mt-16 blur-2xl" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
          <CreditCard size={16} className="text-[#2076C7]" />
          Digital PRAN Card
        </h2>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-[#2076C7] transition-all">
            <Copy size={14} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-[#2076C7] transition-all">
            <Share2 size={14} />
          </button>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative aspect-[2.8/1] w-full rounded-xl bg-gradient-to-br from-[#2076C7] via-[#1a5ca1] to-[#1CADA3] p-3 text-white shadow-lg shadow-blue-500/15 overflow-hidden cursor-pointer"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 uppercase tracking-widest text-[9px] font-black opacity-80 backdrop-blur-sm bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              <Landmark size={10} /> NPS
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-wider">
              {status}
              <div className="w-1.5 h-1.5 rounded-full bg-[#1CADA3] shadow-[0_0_8px_rgba(28,173,163,0.8)]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-0.5">
              <p className="text-[9px] uppercase font-bold tracking-widest text-white/60">PRAN</p>
              <p className="text-sm sm:text-lg font-black tracking-[0.15em] font-mono leading-none drop-shadow-sm">
                {pran.slice(0, 4)} {pran.slice(4, 8)} {pran.slice(8, 12)}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <p className="text-[9px] uppercase font-bold tracking-widest text-white/60">Holder</p>
                <p className="text-xs font-bold tracking-wide uppercase leading-none">{name}</p>
              </div>
              <div className="w-10 h-7 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/40 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <FileText size={13} className="text-[#2076C7]" /> CRA Statement
          </div>
          <span className="text-[9px] font-black text-white px-2 py-0.5 bg-[#2076C7] rounded-full">Protean (NSDL)</span>
        </div>
        <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <BadgeCheck size={13} className="text-[#2076C7]" /> Fund Manager
          </div>
          <p className="text-[10px] font-bold text-gray-500">{manager}</p>
        </div>
      </div>
    </div>
  );
};

export default PRANCard;
