'use client';

import { motion } from 'framer-motion';
import { IconShieldCheck, IconGift, IconClock, IconBuildingBank, IconWorld, IconChevronLeft, IconChevronRight, IconCreditCard, IconLock, IconPlane, IconShoppingBag, IconBriefcase, IconDeviceMobile } from '@tabler/icons-react';
import { useRef } from 'react';

const benefits = [
    { icon: IconGift, title: 'Generous Reward Points', desc: 'Earn points on every rupee spent. Redeem for flights, hotels, or direct statement credit.' },
    { icon: IconPlane, title: 'Global Lounge Access', desc: 'Travel in style with complimentary access to 1,000+ luxury airport lounges worldwide.' },
    { icon: IconShieldCheck, title: 'Zero Lost Card Liability', desc: '100% protection against fraudulent transactions if your card is lost or stolen.' },
    { icon: IconLock, title: 'Safe & Secure Payments', desc: 'Advanced EMV chip technology and 2FA for all online and offline transactions.' },
    { icon: IconCreditCard, title: 'Instant Fund Access', desc: 'Meet immediate expenses when you are low on cash flow. Access funds based on your credit limit instantly.' },
    { icon: IconClock, title: 'Interest-Free Window', desc: 'Enjoy up to 55 days of interest-free credit depending on your billing cycle and repayment discipline.' },
    { icon: IconBuildingBank, title: 'Cash Advance Facility', desc: 'Avail cash advance on an urgent basis from ATMs worldwide (cash advance limit and interest applies).' },
    { icon: IconShoppingBag, title: 'Exclusive Dining Perks', desc: 'Get up to 20% discount at 4,000+ partner restaurants across India.' },
    { icon: IconBriefcase, title: 'Complimentary Insurance', desc: 'Select cards offer travel insurance, air accident cover, and purchase protection.' },
    { icon: IconWorld, title: 'Zero Forex Options', desc: 'Save big on international spending with cards offering zero foreign markup fees.' },
    { icon: IconDeviceMobile, title: 'UPI on Credit Card', desc: 'Link your RuPay card to any UPI app and pay merchants directly from your credit limit.' },
];

export default function BenefitsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                         <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                             Features & Benefits of Our Credit Cards 
                        </h2>
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-1xl">
                            Experience a seamless financial journey with benefits designed for every lifestyle. From zero liability to global access, we've got you covered.
                        </p>
                    </motion.div>
                </div>

                <div className="relative group/carousel">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer md:flex hidden"
                    >
                        <IconChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-[#1CADA3] to-[#2076C7] text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer md:flex hidden"
                    >
                        <IconChevronRight size={24} strokeWidth={2.5} />
                    </button>

                    {/* Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-8 no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 px-4"
                    >
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <motion.div 
                                    key={b.title} 
                                    initial={{ opacity: 0, y: 30 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ duration: 0.4, delay: i * 0.05 }} 
                                    className="flex-none w-[300px] md:w-[320px] snap-center group p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-200 hover:bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-[#2076C7] mb-6 shadow-sm group-hover:bg-[#2076C7] group-hover:text-white transition-all duration-500 border border-slate-200 mx-auto">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-[#2076C7] mb-4 tracking-tight leading-snug">{b.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-bold">{b.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                
            </div>
        </section>
    );
}
