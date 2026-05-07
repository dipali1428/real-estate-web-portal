'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Shield, TrendingUp, CheckCircle, MapPin } from 'lucide-react';
import { IconArrowLeft, IconBuildingSkyscraper, IconStar, IconCheck } from '@tabler/icons-react';
import heroIllustration from '../assets/real_estate_hero.png';
import { properties as staticProperties } from '../data/properties';

interface RealEstateHomeSectionProps {
    onPropertySelect?: (id: string) => void;
}

const RealEstateHomeSection = ({ onPropertySelect }: RealEstateHomeSectionProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Featured properties from static data
    const featuredProperties = useMemo(() => {
        return staticProperties.filter((p: any) => p.status !== 'closed').slice(0, 3);
    }, []);

    const handleSearch = (e: any) => {
        if (e && e.key && e.key !== 'Enter') return;

        const query = searchQuery.trim();
        const path = query
            ? `/?search=${encodeURIComponent(query)}#live`
            : '/#live';
        router.push(path);

        // Explicitly scroll if the element exists (handles same-page updates)
        setTimeout(() => {
            const liveSection = document.getElementById('live');
            if (liveSection) {
                liveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <div className="animate-fade-in font-sans">
            {/* Hero Section - Redesigned to match Education Loan style */}
            <section className="relative min-h-[70vh] lg:min-h-[75vh] flex items-center bg-white overflow-hidden pt-12 md:pt-8 pb-16">
                {/* Back Button (Non-sticky) */}
                <div className="absolute z-10 top-8 left-4 md:top-12 md:left-12">
                    <button
                        onClick={() => router.push('/')}
                        aria-label="Back to Home"
                        className="md:hidden group flex items-center gap-2 p-2 text-gray-500"
                    >
                        <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all" >
                            <IconArrowLeft className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-md rounded-lg border border-[#2076C7]/20 shadow-[0_4px_16px_rgba(32,118,199,0.1)] hover:bg-white hover:border-[#2076C7]/40 active:scale-95 transition-all group"
                    >
                        <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                        Back to Home
                    </button>
                </div>

                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-12 md:pt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12 w-full"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-20 border rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm mt-16 md:mt-24" style={{ color: '#2076C7', borderColor: 'rgba(32, 118, 199, 0.2)' }}>
                                <IconBuildingSkyscraper size={12} />
                                Fractional Real Estate • Infinity Arthvishva
                            </div>
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-[1.1] sm:leading-tight" style={{
                                background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Fractional Real Estate
                                <br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>
                                Investments
                            </h1>
                            <p className="text-lg sm:text-xl mb-6 text-gray-600 leading-relaxed max-w-lg">
                                Experience the next generation of property acquisition. Immersive high-yield assets await in India&apos;s prime growth corridors. Start investing from ₹5 Lakh.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="#properties"
                                    className="group relative text-white px-8 md:px-10 py-4 md:py-5 rounded-lg font-bold text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-center" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-1">
                                        View Opportunities 
                                    </span>
                                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right: Illustration */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative flex justify-center lg:justify-center items-center"
                        >
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
                                        src={heroIllustration.src}
                                        alt="Real Estate Investment illustration"
                                        className="w-full h-full object-cover drop-shadow-lg transition-transform duration-700 scale-110"
                                    />
                                </motion.div>

                                {/* Floating Badges */}
                                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                                    <div className="w-8 h-8 bg-[#1CADA3] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1CADA3]/30"><IconStar size={18} /></div>
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Investors</div>
                                        <div className="text-[12px] font-black text-slate-800 leading-tight">15,000+ Active</div>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="absolute -bottom-4 -left-2 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#2076C7]/10 z-20">
                                    <div className="w-8 h-8 bg-[#2076C7] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2076C7]/30"><IconCheck size={18} /></div>
                                    <div className="text-left">
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Managed</div>
                                        <div className="text-[12px] font-black text-slate-800 leading-tight">₹2,500 Cr+ Assets</div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Investment Benefits Section */}
            <section className="py-8 md:py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                         Why Fractional Investment?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed mb-10">
                        Unlock premium real estate opportunities that were once reserved for high-net-worth individuals.
                    </p>
                        <div className="space-y-8">
                            {[
                                { icon: Shield, title: 'Asset Backed Security', text: 'Your investments are secured by physical real estate assets.' },
                                { icon: CheckCircle, title: 'Low Entry Barrier', text: 'Start investing with amounts as low as ₹5 Lakh.' },
                                { icon: TrendingUp, title: 'Predictable Returns', text: 'Benefit from stable rental yields and long-term growth.' }
                            ].map((item, index) => (
                                <div key={index} className="flex gap-6 items-start">
                                    <div className="text-teal-500 pt-1">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 text-brand-gradient">{item.title}</h4>
                                        <p className="text-slate-600">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-xl p-12 rounded-3xl border border-slate-100 relative overflow-hidden shadow-2xl transition-all hover:-translate-y-2 hover:shadow-3xl">
                        <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-teal-500/10 blur-[100px] -z-10" />
                        <div className="text-center">
                            <h3 className="text-2xl font-bold font-sans text-gray-700 mb-8 text-brand-gradient"> Platform Current Status</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-4xl font-extrabold text-blue-600 mb-2">15k+</p>
                                    <p className="text-slate-500 font-medium">Active Investors</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-teal-500 mb-2">₹2500 Cr+</p>
                                    <p className="text-slate-500 font-medium">Assets Managed</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-blue-400 mb-2">12.4%</p>
                                    <p className="text-slate-500 font-medium">Avg. Rental Yield</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-extrabold text-blue-400 mb-2">100%</p>
                                    <p className="text-slate-500 font-medium">Transparent Process</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties (Existing) */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm tracking-tight leading-tight">
                        Featured Properties
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
                        Explore our hand-picked selection of premium investment opportunities.
                    </p>
                    <Link href="#live" className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 text-blue-600 rounded-full font-semibold hover:bg-slate-200 transition-colors">
                        View all properties <ChevronRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProperties.map((property: any) => (
                        <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                            <div className="relative h-56 overflow-hidden">
                                <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
                                    {property.type.split(' ')[0]}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-brand-gradient">{property.title}</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Price</span>
                                        <span className="text-lg font-bold text-teal-600">
                                            ₹{property.price.toLocaleString('en-IN')}
                                            {property.price && (
                                                <span className="text-black font-bold text-sm leading-none shrink-0 cursor-help pt-1" title="Star Marked — Potential for future value appreciation">*</span>
                                            )}
                                        </span>
                                    </div>
                                    {property.status !== 'closed' && (
                                        <button
                                            onClick={() => onPropertySelect && onPropertySelect(String(property.id))}
                                            className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-6 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all">
                                            View Details
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <MapPin size={16} />
                                    <span>{property.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RealEstateHomeSection;
