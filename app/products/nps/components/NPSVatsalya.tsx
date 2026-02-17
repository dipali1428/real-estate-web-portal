'use client';

import { Baby, MoveRight, CalendarClock, Coins, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
// import RegistrationModal from './RegistrationModal';

export default function NPSVatsalya() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section id="nps-vatsalya" className="relative py-12 bg-white overflow-hidden">
            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50/50 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/40 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100/50 to-blue-100/50 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white shadow-md shadow-purple-500/5 mb-8">
                        <span className="bg-blue-500 text-white px-2.5 py-0.5 rounded-full text-[10px] tracking-widest uppercase font-black">Limited</span>
                        <span className="text-blue-700">New Government Initiative</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow drop-shadow-sm tracking-tight pb-2">
                        NPS Vatsalya
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4 shadow-md shadow-blue-500/10"></div>
                    <p className="max-w-2xl mx-auto text-slate-700 font-medium text-lg leading-relaxed">
                        Gifting your child a foundation for lifelong financial security and the gift of compounding from day one.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Power of Compounding - Left Column */}
                    <div className="order-1 h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-full"
                        >
                            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/20 via-blue-500/10 to-teal-500/10 rounded-[4rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                            <div className="relative bg-white/40 backdrop-blur-[50px] rounded-[3rem] p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/60 text-center group h-full flex flex-col justify-between">
                                <div>
                                    <h4 className="text-2xl font-black text-slate-700 mb-8 tracking-tight">Power of Compounding</h4>

                                    <div className="mb-8 relative group-hover:scale-[1.02] transition-transform duration-500">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2rem] opacity-20 blur-md" />
                                        <img
                                            src="/nps/vatsalyaimage.png"
                                            alt="NPS Vatsalya Attributes"
                                            className="relative w-full h-64 object-cover rounded-[1.8rem] shadow-lg"
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
                                        <div className="text-center group/age">
                                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 leading-none">Start</p>
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black text-blue-500 shadow-inner group-hover/age:scale-110 transition-transform duration-500">
                                                05
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200 mb-1" />
                                            <MoveRight className="text-gray-300 w-6 h-6" />
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Growth</span>
                                        </div>
                                        <div className="text-center group/age">
                                            <p className="text-[10px] font-black text-[#2076C7] uppercase tracking-widest mb-2 leading-none">Retire</p>
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black text-[#2076C7] shadow-inner group-hover/age:scale-110 transition-transform duration-500">
                                                60
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-lg shadow-purple-500/5 relative overflow-hidden mt-auto"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500" />
                                    <p className="text-slate-700 font-extrabold italic text-sm leading-relaxed relative z-10">
                                        "The eighth wonder of the world is compounding. Give your child the advantage of time."
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Features List - Right Column */}
                    <div className="order-2 h-full">
                        <div className="relative bg-white/40 backdrop-blur-[50px] rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-white/60 h-full flex flex-col justify-between">
                            <div className="space-y-10">
                                {[
                                    { icon: Baby, title: "For Minors (0-18 Years)", desc: "Empower your child's future by starting their pension journey as early as birth.", color: "purple", gradient: "from-purple-500 to-indigo-500" },
                                    { icon: Coins, title: "Flexible Contribution", desc: "Start with as little as ₹1,000 per year. Scale up as your dreams for them grow.", color: "blue", gradient: "from-blue-500 to-cyan-500" },
                                    { icon: RefreshCw, title: "Seamless Transition", desc: "A frictionless transition to a regular NPS account once they celebrate their 18th birthday.", color: "teal", gradient: "from-teal-500 to-emerald-500" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                        whileHover={{ x: 10 }}
                                        className="group flex items-start items-center gap-8 transition-all duration-500"
                                    >
                                        <div className={`shrink-0 relative z-10 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ring-4 ring-white/60`}>
                                            <item.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-slate-700 tracking-tight">{item.title}</h4>
                                            <p className="text-slate-500 font-medium text-base leading-relaxed max-w-lg">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 space-y-8">
                                <div className="pt-8 border-t border-slate-100/50 flex justify-center lg:justify-start">
                                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/40 rounded-full border border-white/50">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Trusted by 2M+ Parents</span>
                                    </div>
                                </div>

                                <button onClick={() => setIsModalOpen(true)} className="w-full px-8 py-5 rounded-[1.5rem] bg-gradient-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] bg-[length:200%_auto] animate-gradient-flow text-white font-black text-xl shadow-[0_15px_40px_rgba(32,118,199,0.2)] hover:shadow-[0_25px_60px_rgba(32,118,199,0.3)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 cursor-pointer group/btn mx-auto">
                                    Plan Child's Future
                                    <MoveRight className="group-hover/btn:translate-x-2 transition-transform" size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <RegistrationModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} /> */}
        </section>
    );
}
