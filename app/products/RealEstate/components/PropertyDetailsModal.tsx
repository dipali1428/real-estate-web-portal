'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { properties as staticProperties } from '../data/properties';
import { MapPin, CheckCircle, Info, Layout, Shield, Dumbbell, Zap, Coffee, X, Share2, Download, Loader } from 'lucide-react';

interface RealEstatePropertyDetailsModalProps {
    propertyId: string;
    onClose: () => void;
    onInvestNow: () => void;
}

const PropertyInfographic = ({ property }: { property: any }) => {
    return (
        <div className="bg-white border-2 border-slate-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl w-full font-sans text-slate-800 mb-8 mx-auto">
            <div className="flex flex-col lg:flex-row">
                {/* Left Side: Educational Points */}
                <div className="w-full lg:w-[35%] bg-blue-50/30 p-6 sm:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-100">
                    <div className="space-y-12">
                        {[
                            { num: "1", text: "HAVE YOU HEARD OF FRACTIONAL REAL ESTATE ?" },
                            { num: "2", text: "DID YOU KNOW YOU CAN OWN A SMALL PORTION OF AN UNDER-CONSTRUCTION APARTMENT AT ALMOST 50% DISCOUNT ?" },
                            { num: "3", text: "PROFIT WHEN IT IS BOUGHT BACK BY THE DEVELOPER AT A FIXED HIGHER PRICE IN 12 MONTHS", highlight: true },
                            { num: "4", text: "AND ALL THIS DIGITALLY AND SECURELY FROM THE COMFORTS OF YOUR HOME !" },
                        ].map((point, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <span className={`text-6xl font-black ${i % 2 === 0 ? 'text-[#1CADA3]' : 'text-[#2076C7]'} leading-none`}>{point.num}</span>
                                <p className={`text-sm font-extrabold uppercase tracking-tight leading-snug ${point.highlight ? 'bg-blue-50 p-3 rounded-lg border-l-4 border-[#2076C7]' : ''}`}>
                                    {point.text.split(' ').map((word, j) => (
                                        <span key={j} className={['OWN', 'SMALL', 'PORTION', '50%', 'DISCOUNT', 'FIXED', 'HIGHER', 'PRICE', 'DIGITALLY', 'SECURELY'].includes(word.replace(/[?,!]/g, '')) ? 'text-[#1CADA3]' : ''}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Partner Logos */}
                    <div className="mt-16 pt-8 border-t border-slate-200">
                        <div className="grid grid-cols-4 gap-4 items-center">
                            {[
                                { label: 'Legal Advisor', img: '/Logos/legal_advisor.png' },
                                { label: 'Security Trustee', img: '/Logos/security_trustee.png' },
                                { label: 'KYC Partner', img: '/Logos/kyc_partner.png' },
                                { label: 'Land Record', img: '/Logos/it_partner.png' }
                            ].map((partner, i) => (
                                <div key={i} className="text-center">
                                    <div className="h-10 w-full bg-slate-50 rounded flex items-center justify-center mb-1 overflow-hidden border border-slate-100">
                                        <img src={partner.img} alt={partner.label} className="h-full w-full object-contain opacity-80" />
                                    </div>
                                    <span className="text-[7px] font-black uppercase text-slate-400 block leading-none">{partner.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 gap-4 items-center mt-6">
                            {[
                                { label: 'IT Partner', img: '/Logos/it_partner.png' },
                                { label: 'Developer Due Diligence', img: '/Logos/legal_advisor.png' },
                                { label: 'Digital Doc Partner', img: '/Logos/kyc_partner.png' },
                                { label: 'Sales Partner', img: '/Logos/security_trustee.png' }
                            ].map((partner, i) => (
                                <div key={i} className="text-center">
                                    <div className="h-10 w-full bg-slate-50 rounded flex items-center justify-center mb-1 overflow-hidden border border-slate-100">
                                        <img src={partner.img} alt={partner.label} className="h-full w-full object-contain opacity-80" />
                                    </div>
                                    <span className="text-[7px] font-black uppercase text-slate-400 block leading-none">{partner.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Property Details */}
                <div className="w-full lg:w-[65%] p-0">
                    {/* Header */}
                    <div className="p-4 bg-slate-50 flex justify-between items-center border-b-2 border-slate-200">
                        <div className="text-right flex-1">
                            <h2 className="text-xl font-black text-blue-900 leading-none">{property.title?.split('-')[0].trim()}</h2>
                            <p className="text-[10px] font-bold tracking-widest text-slate-600 mt-1 uppercase">{property.location}</p>
                        </div>
                        {/* <div className="ml-8">
                             
                            <div className="text-2xl font-black italic"><span className="text-blue-600">Quikr</span><span className="text-orange-500">PropX</span></div>
                        </div> */}
                        <div className="ml-8">
                            <img src="/logo.png" alt="Infinity Arthvishwa" className="h-12 w-auto" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row">
                        {/* Property Image */}
                        <div className="w-full sm:w-[38%] p-2">
                            <div className="rounded-xl overflow-hidden border-2 border-slate-100 h-full shadow-inner">
                                <img src={property.image} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Property Data Table */}
                        <div className="w-full sm:w-[62%] p-2">
                            <div className="space-y-4 p-2">
                                {[
                                    { label: 'NAME OF DEVELOPER', value: property.developer },
                                    { label: 'TYPE OF PROJECT', value: (property.type || 'Residential') + ' PROJECT' },
                                    { label: 'CURRENT STATUS', value: 'RCC & BRICK WORK COMPLETED, INTERNAL WORK GOING ON', highlight: true },
                                    { label: 'RERA', value: 'YES' },
                                    { label: 'SANCTIONS OBTAINED', value: property.sanctions_obtained || 'YES' },
                                    { label: 'LITIGATIONS', value: property.litigations || 'NONE' },
                                    { label: 'LAND TITLE', value: property.land_title || 'CLEAR' },
                                    { label: 'OTHER DUE DILIGENCE', value: property.other_due_diligence || 'CLEAR' },
                                ].map((row, i) => (
                                    <div key={i} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col sm:flex-row text-[10px]">
                                        <div className="p-2 font-black bg-slate-50 sm:border-r border-slate-200 sm:w-[45%] uppercase">{row.label}</div>
                                        <div className={`p-2 font-black grow ${row.highlight ? 'bg-blue-50 text-[#2076C7]' : ''}`}>{row.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary Table */}
                        <div className="p-2 text-right">
                            <div className="text-[11px] font-black underline text-blue-600 mb-2">Financial Summary</div>
                            <div className="space-y-3 text-left">
                                {[
                                    { label: 'No. OF APARTMENTS ON OFFER', value: `${property.units || 1} APARTMENTS (COMBINED AREA ${property.area || 1000} SQ. FT.)` },
                                    { label: 'MARKET PRICE (ALL INCL.)', value: `Rs. ${(property.market_price ? property.market_price / 10000000 : 1).toFixed(2)} CR. (Rs. ${(property.market_price && property.area ? Math.round(property.market_price / property.area) : 5500)} / SQ. FT.)` },
                                    { label: 'DISCOUNTED PRICE (ALL INCL.)', value: `Rs. ${(property.price / 10000000).toFixed(2)} CR. (Rs. ${Math.round(property.price / (property.area || 1000))} / SQ. FT.)`, brand: true },
                                    { label: 'BUY BACK DURATION', value: property.holding_period || '12 MONTHS' },
                                    { label: 'BUY BACK PRICE (ALL INCL.)', value: `Rs. ${(property.price * 1.2 / 10000000).toFixed(2)} CR. (Rs. ${Math.round(property.price * 1.2 / (property.area || 1000))} / SQ. FT.)`, teal: true },
                                    { label: 'MINIMUM CONTRIBUTION', value: `Rs. ${property.min_contribution?.toLocaleString('en-IN') || '8,00,000'}/-.\nYOU SHARE PROFITS PROPORTIONATE TO YOUR CONTRIBUTION`, blueText: true },
                                    { label: 'OWNERSHIP STRUCTURE', value: property.ownership_structure || 'JOINT-OWNERSHIP THROUGH LLP' },
                                    { label: 'TRUST FACTOR', value: property.trust_factor || 'Administered By MITCON CREDENTIA. Access All Due Diligence Documents Free.', highlightText: true },
                                    { label: 'LLP Name', value: property.llp_name || 'REDEVPUNE 3 LLP' },
                                ].map((row: any, i) => (
                                    <div key={i} className={`border border-slate-200 rounded-lg overflow-hidden flex flex-col sm:flex-row text-[11px] ${row.brand ? 'border-[#2076C7]' : ''}`}>
                                        <div className="p-2 font-black bg-slate-50 sm:border-r border-slate-200 sm:w-[35%] uppercase leading-tight">{row.label}</div>
                                        <div className={`p-2 font-black grow ${row.brand ? 'bg-[#2076C7] text-white' : row.teal ? 'bg-teal-50 text-[#1CADA3]' : ''} whitespace-pre-line`}>
                                            <span className={`${row.blueText ? 'text-[#2076C7]' : ''}`}>
                                                {row.highlightText ? (
                                                    <span className={`${row.brand ? 'text-white' : 'text-slate-700'}`}>All Payments Administered By A <span className="bg-blue-100 text-[#2076C7] px-1 rounded border border-blue-200">SEBI Registered</span> Debenture Trustee – <span className="bg-blue-100 text-[#2076C7] px-1 rounded border border-blue-200 font-black underline">MITCON CREDENTIA</span>.</span>
                                                ) : row.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};


const RealEstatePropertyDetailsModal = ({ propertyId, onClose, onInvestNow }: RealEstatePropertyDetailsModalProps) => {
    const router = useRouter();
    // Find property directly from static data
    const property = useMemo(() => {
        return staticProperties.find(p => String(p.id) === String(propertyId));
    }, [propertyId]);

    const loading = false; // Static data is always loaded

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

    if (!propertyId) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
            <div className="bg-slate-50 w-full max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl animate-scale-in max-h-[95vh] overflow-y-auto custom-scrollbar">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full text-slate-800 shadow-lg transition-all hover:rotate-90"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                {loading ? (
                    <div className="min-h-[600px] flex items-center justify-center">
                        <Loader className="animate-spin text-blue-600" size={40} />
                    </div>
                ) : !property ? (
                    <div className="min-h-[400px] flex items-center justify-center text-slate-500">
                        Property not found.
                    </div>
                ) : (
                    <div className="pb-12">
                        {/* Top Notice */}
                        <div className="bg-blue-600 py-3 text-center text-sm text-white font-medium sticky top-0 z-40 shadow-md">
                            One user can subscribe only once in one LLP.
                        </div>

                        <div className="p-6 md:p-10">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">{property.type}</span>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                                            <CheckCircle size={12} /> RERA Approved
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gradient">{property.title}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                                        <MapPin size={18} className="text-blue-500" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:shadow-md transition-all">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mb-12">
                                {/* Left: Image & Key Stats */}
                                <div className="space-y-6">
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] relative group">
                                        <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/80 to-transparent p-6 pt-20 text-white">
                                            <p className="font-bold text-lg mb-1">{property.developer || 'Premium Developer'}</p>
                                            <p className="text-sm opacity-80">Possession: {property.completion_date || 'Ready to Move'}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'Min Investment', value: `₹${(property.min_contribution / 100000).toFixed(1)}L` },
                                            { label: 'Target IRR', value: `${property.irr_percentage}%`, highlight: true },
                                            { label: 'Rental Yield', value: `${property.yield_percentage}%`, highlight: true },
                                            { label: 'Holding Period', value: property.holding_period || '3-5 Years' }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{stat.label}</p>
                                                <p className={`font-bold text-lg ${stat.highlight ? 'text-blue-600' : 'text-slate-800'}`}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Investment Card */}
                                <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-24">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5 mb-6 pb-6 border-b border-slate-100">
                                        <div>
                                            <p className="text-slate-500 text-sm font-bold mb-1">Total Asset Value</p>
                                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">₹{property.price?.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-slate-500 text-sm font-bold mb-1">Funded</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-full sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[100px] sm:min-w-0">
                                                    <div className="h-full bg-blue-600 w-[65%]"></div>
                                                </div>
                                                <span className="font-bold text-blue-600 text-sm whitespace-nowrap">65%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Min. Investment</span>
                                            <span className="font-bold text-slate-800">₹{property.min_contribution?.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Processing Fee</span>
                                            <span className="font-bold text-slate-800">1%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Lock-in Period</span>
                                            <span className="font-bold text-slate-800">12 Months</span>
                                        </div>
                                    </div>

                                    {property.status !== 'closed' ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Investment Amount</label>
                                                <input
                                                    type="number"
                                                    placeholder={`Min ₹${property.min_contribution}`}
                                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-800"
                                                />
                                            </div>
                                            <button 
                                                onClick={onInvestNow}
                                                className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white w-full py-4 rounded-xl text-lg uppercase tracking-tight shadow-md hover:shadow-lg transition-all flex items-center justify-center font-bold"
                                            >
                                                Invest Now
                                            </button>
                                            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                                                <Shield size={12} /> Secure transaction via Escrow
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-slate-100 p-4 rounded-xl text-center">
                                            <span className="font-bold text-slate-500">Investment Closed</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Infographic Chart Section */}
                            <div className="mb-8 mt-4 overflow-x-auto custom-scrollbar-blue pb-4">
                                <PropertyInfographic property={property} />
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-brand-gradient">
                                        <Info size={20} className="text-blue-600" /> Investment Highlights
                                    </h3>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                        <p className="text-slate-600 leading-relaxed">
                                            {property.description || "This premium asset offers a unique blend of immediate rental income and long-term capital appreciation potential. Strategically located in a high-growth corridor."}
                                        </p>
                                        <ul className="space-y-3 pt-4">
                                            {['Grade A Construction', 'High Rental Demand', 'Pre-Leased to MNC', 'Clear Capital Appreciation'].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                                    <CheckCircle size={18} className="text-green-500 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-gradient">
                                        <Layout size={20} className="text-blue-600" /> Amenities
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Shield, text: '24/7 Security' },
                                            { icon: Dumbbell, text: 'Gymnasium' },
                                            { icon: Zap, text: 'Power Backup' },
                                            { icon: Coffee, text: 'Cafeteria' }
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                                <item.icon size={20} className="text-blue-600" />
                                                <span className="text-sm font-bold text-slate-700">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleDownloadGuide} className="w-full mt-6 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                        <Download size={20} /> Download Brochure
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealEstatePropertyDetailsModal;
