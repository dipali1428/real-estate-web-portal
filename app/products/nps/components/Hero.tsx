'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
// import RegistrationModal from './RegistrationModal';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative overflow-hidden bg-white pt-20 pb-12 lg:pt-32 lg:pb-16">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                
                {/* Subtle Grid Pattern */}
                {/* <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" /> */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[15%] -left-[10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[160px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -40, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[30%] -right-[15%] w-[50%] h-[70%] bg-teal-400/10 rounded-full blur-[140px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl lg:text-6xl font-black leading-[1.1] mb-8 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow tracking-tight pb-2">
                            Your Retirement Journey Starts Here
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-slate-700 mb-12 max-w-xl leading-relaxed font-medium drop-shadow-sm">
                            The most trusted government-backed retirement scheme. Grow your wealth systematically and enjoy a worry-free life post-retirement.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6 mb-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-8 py-4 rounded-[1.5rem] font-bold text-base hover:shadow-[0_15px_40px_rgba(32,118,199,0.3)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group cursor-pointer">
                                Open NPS Account
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                            <button
                                onClick={() => document.getElementById('about-nps')?.scrollIntoView({ behavior: 'smooth' })}
                                className="relative px-8 py-4 rounded-[1.5rem] font-bold text-base text-slate-700 hover:text-[#2076C7] bg-white/50 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 border-2 border-transparent bg-clip-padding"
                                style={{
                                    backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #2076C7, #1CADA3)',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'padding-box, border-box'
                                }}>
                                Learn More
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-10 py-6 border-t border-slate-100/80">
                            <div>
                                <p className="text-[#2076C7] font-black text-3xl mb-1 tabular-nums animate-pulse [animation-duration:3s]">9.5%+</p>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Hist. Returns</p>
                            </div>
                            <div>
                                <p className="text-[#1CADA3] font-black text-3xl mb-1 tabular-nums">₹2L</p>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Tax Savings</p>
                            </div>
                            <div>
                                <p className="text-blue-500 font-black text-3xl mb-1 tabular-nums">ZERO</p>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Tax on Exit</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative">
                        {/* Interactive Floating Card */}
                        <motion.div
                            className="relative group p-4"
                            animate={{
                                y: [0, -25, 0],
                                rotateZ: [0, 1, 0, -1, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}>
                            <div className="absolute -inset-8 bg-gradient-to-tr from-[#2076C7]/30 via-[#1CADA3]/30 to-[#4F46E5]/30 rounded-[4rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                            <div className="relative bg-white/30 backdrop-blur-[40px] p-2 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-white/60">
                                <motion.img
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    src="/nps/heroimage.png"
                                    alt="retirement image"
                                    className="rounded-[3rem] w-full h-[450px] object-cover relative z-10 brightness-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-15" />
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* <RegistrationModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} /> */}
        </section>
    );
}
