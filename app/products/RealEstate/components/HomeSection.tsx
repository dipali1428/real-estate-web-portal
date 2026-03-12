'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Shield, TrendingUp, Wallet, Download, CheckCircle, MapPin } from 'lucide-react';
import { IconArrowLeft, IconBuildingSkyscraper, IconStar, IconCheck } from '@tabler/icons-react';
import heroIllustration from '../../../../public/realestate/realestate.jpeg';
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

    const handleDownloadGuide = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Infinity_Premium_Brochure_2026</title>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 50px; color: #1e293b; line-height: 1.6; max-width: 950px; margin: 0 auto; font-size: 18px; background: white; }
                        .header { text-align: center; border-bottom: 5px solid #2076C7; padding-bottom: 30px; margin-bottom: 40px; position: relative; }
                        .header::after { content: ''; position: absolute; bottom: -5px; right: 0; width: 50%; height: 5px; background: #1CADA3; }
                        h1 { background: linear-gradient(to right, #2076C7, #1CADA3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; font-size: 48px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900; }
                        .subtitle { color: #64748b; font-size: 26px; font-weight: 600; margin-top: 10px; letter-spacing: 1px; }
                        .section { margin-bottom: 50px; }
                        h2 { background: linear-gradient(to right, #2076C7, #1CADA3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; border-left: 8px solid #2076C7; padding-left: 20px; font-size: 30px; margin-bottom: 25px; display: inline-block; font-weight: 800; }
                        .market-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 30px; margin-bottom: 30px; display: grid; grid-template-cols: 1fr 1fr; gap: 20px; }
                        .market-stat { text-align: center; padding: 15px; background: white; border-radius: 15px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
                        .market-stat b { display: block; font-size: 28px; color: #2076C7; margin-bottom: 5px; }
                        .market-stat p { margin: 0; font-size: 14px; text-transform: uppercase; font-weight: 700; color: #64748b; }
                        .step { margin-bottom: 25px; display: flex; align-items: flex-start; }
                        .step-num { background: linear-gradient(135deg, #2076C7, #1CADA3); color: white; min-width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; margin-right: 20px; font-size: 20px; flex-shrink: 0; }
                        .step-content b { display: block; font-size: 22px; color: #1e293b; margin-bottom: 8px; }
                        .step-content p { margin: 0; color: #475569; font-size: 17px; }
                        ul { padding-left: 25px; margin: 0; }
                        li { margin-bottom: 15px; font-size: 17px; color: #475569; }
                        li b { color: #1e293b; }
                        .why-us-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; }
                        .why-us-item { background: #fff; border: 1px solid #e2e8f0; padding: 25px; border-radius: 15px; height: 100%; transition: all 0.3s; }
                        .why-us-item b { color: #2076C7; display: block; margin-bottom: 10px; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
                        .why-us-item p { margin: 0; font-size: 16px; color: #64748b; line-height: 1.6; }
                        .footer { margin-top: 80px; text-align: center; font-size: 16px; color: #1e293b; border-top: 3px solid #f1f5f9; padding: 50px 0 100px 0; background: #fafafa; border-radius: 30px 30px 0 0; }
                        .social-links { margin: 25px 0; font-weight: 700; }
                        .social-links a { margin: 0 20px; text-decoration: none; color: #2076C7 !important; border-bottom: 2px solid #1CADA3; padding-bottom: 2px; }
                        .page-break { page-break-before: always; }
                    </style>
                </head>
                <body>
                    <div id="brochure-content">
                        <div class="header">
                            <h1>INFINITY ARTHVISHWA</h1>
                            <div class="subtitle">Real Estate Portfolio Insights • 2026 Edition</div>
                        </div>

                        <div class="section">
                            <h2>2026 Market Analysis: Pune Growth Corridor</h2>
                            <p style="margin-bottom: 25px; color: #475569;">The Pune real estate market has shown a resilient <b>11.5% YoY growth</b> in premium residential and commercial sectors. Our data-driven approach identifies micro-markets with high absorption rates.</p>
                            <div class="market-box">
                                <div class="market-stat"><b>12.8%</b><p>Avg. Capital Appreciation</p></div>
                                <div class="market-stat"><b>8.4%</b><p>Commercial Rental Yield</p></div>
                                <div class="market-stat"><b>₹2,500 Cr+</b><p>Managed Assets</p></div>
                                <div class="market-stat"><b>98.5%</b><p>Occupancy Rate</p></div>
                            </div>
                        </div>

                        <div class="section">
                            <h2>1. Strategic Investment Roadmap</h2>
                            <div class="step">
                                <div class="step-num">1</div>
                                <div class="step-content"><b>Institutional Grade Selection</b><p>We filter Grade-A properties from top-tier developers, ensuring only high-liquidity assets enter our portfolio.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">2</div>
                                <div class="step-content"><b>Fractional Allocation</b><p>Invest in premium assets starting from ₹5 Lakh. Perfect for diversifying across multiple micro-markets.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">3</div>
                                <div class="step-content"><b>SPV Governance</b><p>Secure ownership via a Special Purpose Vehicle (SPV), providing a bulletproof legal framework and tax efficiency.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">4</div>
                                <div class="step-content"><b>Wealth Generation</b><p>Monthly rental credits directly to your bank account with long-term capital gains on asset disposal.</p></div>
                            </div>
                        </div>

                        <div class="section page-break">
                            <h2>2. Fractional Advantage & Eligibility</h2>
                            <ul>
                                <li><b>HNI & NRI Focus:</b> Custom structures for Resident Indians and NRI/OCI investors via NRE/NRO routes.</li>
                                <li><b>Title Verification:</b> 100% cloud-accessible legal due diligence for every listed asset.</li>
                                <li><b>Market Liquidity:</b> First-of-its-kind resale window and secondary market for fractional exits.</li>
                                <li><b>Portfolio Diversification:</b> Spread capital across IT Parks, Luxury Retail, and Premium Residential.</li>
                                <li><b>Tax Optimization:</b> Structured as LLPs for flow-through taxation benefits for investors.</li>
                            </ul>
                        </div>

                        <div class="section">
                            <h2>3. Why Choose Infinity Arthvishwa?</h2>
                            <div class="why-us-grid">
                                <div class="why-us-item"><b>Curated Selection</b><p>Only the top 1% of Pune's real estate deals pass our proprietary 50-point checklist.</p></div>
                                <div class="why-us-item"><b>Digital First</b><p>Track performance, documents, and yields via our state-of-the-art investor dashboard.</p></div>
                                <div class="why-us-item"><b>Full Stack Management</b><p>From facility management to legal compliance, we handle the dirty work.</p></div>
                                <div class="why-us-item"><b>High Liquidity</b><p>Pre-planned exit strategies at the end of the holding period with professional resale support.</p></div>
                            </div>
                        </div>

                        <div class="footer">
                             <p style="font-weight: 800; font-size: 20px; color: #2076C7; margin-bottom: 15px;">INFINITY ARTHVISHWA PREMIUM REALTY</p>
                            <div style="margin: 20px 0; color: #1e293b; font-weight: 800; font-size: 26px;">
                                <span style="color: #64748b; font-size: 16px;">TOLL FREE:</span> 1800-532-7600
                            </div>
                            <div class="social-links">
                                <a href="#">LinkedIn</a>
                                <a href="#">Instagram</a>
                                <a href="#">Facebook</a>
                            </div>
                            <p style="margin-top: 30px; font-weight: 700; color: #64748b; font-size: 14px;">
                                Head Office: Prime Square, Baner, Pune - 411045<br>
                                www.infinityarthvishwa.com | contact@infinity.com
                            </p>
                        </div>
                    </div>
                    <script>
                        window.onload = function() {
                            const element = document.getElementById('brochure-content');
                            const opt = {
                                margin: [10, 10, 20, 10],
                                filename: 'Infinity_Arthvishwa_Market_Report_2026.pdf',
                                image: { type: 'jpeg', quality: 0.98 },
                                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                            };
                            
                            setTimeout(() => {
                                html2pdf().set(opt).from(element).save().then(() => {
                                    // Optional: window.close() after download
                                });
                            }, 800);
                        }
                    </script>
                </body>
            </html>
        `;
        printWindow.document.write(content);
        printWindow.document.close();
    };

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
        <div className="animate-fade-in">
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
                                Fractional Real Estate • Infinity Arthvishwa
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
                                Experience the next generation of property acquisition. Immersive high-yield assets await in India's prime growth corridors. Start investing from ₹5 Lakh.
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
                                <button
                                    onClick={handleDownloadGuide}
                                    className="group relative bg-white px-6 md:px-7 py-3.5 md:py-1.5 rounded-lg font-semibold text-base md:text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                                    style={{ color: '#2076C7', borderColor: '#2076C7' }}
                                >
                                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                                    How to Invest
                                </button>
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
                                { icon: CheckCircle, title: 'Low Entry Barrier', text: 'Start investing with amounts as low as ₹1 Lakh.' },
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
                                <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    {property.type}
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
