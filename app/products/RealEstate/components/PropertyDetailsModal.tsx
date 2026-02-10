'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { properties as staticProperties } from '../data/properties';
import { MapPin, ArrowLeft, Heart, Loader, CheckCircle, Info, Layout, Shield, Dumbbell, Box, Map, Zap, Coffee, Users, Home as HomeIcon, X, Share2, Download } from 'lucide-react';

interface PropertyDetailsModalProps {
    propertyId: string;
    onClose: () => void;
}

const PropertyInfographic = ({ property }: { property: any }) => {
    return (
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xl min-w-[1000px] font-sans text-slate-800 mb-8 mx-auto">
            <div className="flex">
                {/* Left Side: Educational Points */}
                <div className="w-[35%] bg-blue-50/30 p-8 border-r-2 border-slate-100">
                    <div className="space-y-12">
                        {[
                            { num: "1", text: "HAVE YOU HEARD OF FRACTIONAL REAL ESTATE ?" },
                            { num: "2", text: "DID YOU KNOW YOU CAN OWN A SMALL PORTION OF AN UNDER-CONSTRUCTION APARTMENT AT ALMOST 50% DISCOUNT ?" },
                            { num: "3", text: "PROFIT WHEN IT IS BOUGHT BACK BY THE DEVELOPER AT A FIXED HIGHER PRICE IN 12 MONTHS", highlight: true },
                            { num: "4", text: "AND ALL THIS DIGITALLY AND SECURELY FROM THE COMFORTS OF YOUR HOME !" },
                        ].map((point, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <span className={`text-6xl font-black ${i % 2 === 0 ? 'text-orange-500' : 'text-blue-600'} leading-none`}>{point.num}</span>
                                <p className={`text-sm font-extrabold uppercase tracking-tight leading-snug ${point.highlight ? 'bg-blue-100 p-3 rounded-lg border-l-4 border-blue-500' : ''}`}>
                                    {point.text.split(' ').map((word, j) => (
                                        <span key={j} className={['OWN', 'SMALL', 'PORTION', '50%', 'DISCOUNT', 'FIXED', 'HIGHER', 'PRICE', 'DIGITALLY', 'SECURELY'].includes(word.replace(/[?,!]/g, '')) ? 'text-orange-600' : ''}>
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
                            {['Legal Advisor', 'Security Trustee', 'KYC Partner', 'Land Record'].map((label, i) => (
                                <div key={i} className="text-center">
                                    <div className="h-10 w-full bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-slate-400 mb-1 leading-tight">LOGO</div>
                                    <span className="text-[7px] font-black uppercase text-slate-400 block leading-none">{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 gap-4 items-center mt-6">
                            {['IT Partner', 'Developer Due Diligence', 'Digital Doc Partner', 'Sales Partner'].map((label, i) => (
                                <div key={i} className="text-center">
                                    <div className="h-10 w-full bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-slate-400 mb-1 leading-tight">LOGO</div>
                                    <span className="text-[7px] font-black uppercase text-slate-400 block leading-none">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Property Details */}
                <div className="w-[65%] p-0">
                    {/* Header */}
                    <div className="p-4 bg-slate-50 flex justify-between items-center border-b-2 border-slate-200">
                        <div className="text-right flex-1">
                            <h2 className="text-xl font-black text-blue-900 leading-none">{property.title?.split('-')[0].trim()}</h2>
                            <p className="text-[10px] font-bold tracking-widest text-slate-600 mt-1 uppercase">{property.location}</p>
                        </div>
                        <div className="ml-8">
                            <div className="text-2xl font-black italic"><span className="text-blue-600">Quikr</span><span className="text-orange-500">PropX</span></div>
                        </div>
                    </div>

                    <div className="flex">
                        {/* Property Image */}
                        <div className="w-[38%] p-2">
                            <div className="rounded-xl overflow-hidden border-2 border-slate-100 h-full shadow-inner">
                                <img src={property.image} className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Property Data Table */}
                        <div className="w-[62%] p-2">
                            <table className="w-full text-[10px] border-collapse border border-slate-300">
                                <tbody>
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
                                        <tr key={i} className="border-b border-slate-300">
                                            <td className="p-2 font-black bg-slate-50 border-r border-slate-300 w-[45%] uppercase">{row.label}</td>
                                            <td className={`p-2 font-black ${row.highlight ? 'bg-yellow-200' : ''}`}>{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Financial Summary Table */}
                    <div className="p-2 text-right">
                        <div className="text-[11px] font-black underline text-blue-600 mb-1">Financial Summary</div>
                        <table className="w-full text-[11px] border-collapse border border-slate-300 text-left">
                            <tbody>
                                {[
                                    { label: 'No. OF APARTMENTS ON OFFER', value: `${property.units || 1} APARTMENTS (COMBINED AREA ${property.area || 1000} SQ. FT.)` },
                                    { label: 'MARKET PRICE (ALL INCL.)', value: `Rs. ${(property.market_price ? property.market_price / 10000000 : 1).toFixed(2)} CR. (Rs. ${(property.market_price && property.area ? Math.round(property.market_price / property.area) : 5500)} / SQ. FT.)` },
                                    { label: 'DISCOUNTED PRICE (ALL INCL.)', value: `Rs. ${(property.price / 10000000).toFixed(2)} CR. (Rs. ${Math.round(property.price / (property.area || 1000))} / SQ. FT.)`, red: true },
                                    { label: 'BUY BACK DURATION', value: property.holding_period || '12 MONTHS' },
                                    { label: 'BUY BACK PRICE (ALL INCL.)', value: `Rs. ${(property.price * 1.2 / 10000000).toFixed(2)} CR. (Rs. ${Math.round(property.price * 1.2 / (property.area || 1000))} / SQ. FT.)`, orange: true },
                                    { label: 'MINIMUM CONTRIBUTION', value: `Rs. ${property.min_contribution?.toLocaleString('en-IN') || '8,00,000'}/-.\nYOU SHARE PROFITS PROPORTIONATE TO YOUR CONTRIBUTION`, redText: true },
                                    { label: 'OWNERSHIP STRUCTURE', value: property.ownership_structure || 'JOINT-OWNERSHIP THROUGH LLP' },
                                    { label: 'TRUST FACTOR', value: property.trust_factor || 'Administered By MITCON CREDENTIA. Access All Due Diligence Documents Free.', highlightText: true },
                                    { label: 'LLP Name', value: property.llp_name || 'REDEVPUNE 3 LLP' },
                                ].map((row: any, i) => (
                                    <tr key={i} className="border-b border-slate-300">
                                        <td className="p-2 font-black bg-slate-50 border-r border-slate-300 w-[35%] uppercase leading-tight">{row.label}</td>
                                        <td className={`p-2 font-black border-slate-300 ${row.red ? 'bg-orange-600 text-white' : row.orange ? 'bg-orange-100 text-orange-800' : ''} whitespace-pre-line`}>
                                            <span className={`${row.redText ? 'text-red-500' : ''}`}>
                                                {row.highlightText ? (
                                                    <span className="text-slate-700">All Payments Administered By A <span className="bg-yellow-200">SEBI Registered</span> Debenture Trustee – <span className="bg-yellow-200 font-black underline">MITCON CREDENTIA</span>. Access All Due Diligence Documents Free.</span>
                                                ) : row.value}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-right text-[8px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">*Rounded off to nearest lakh</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const PropertyDetailsModal = ({ propertyId, onClose }: PropertyDetailsModalProps) => {
    // Find property directly from static data
    const property = useMemo(() => {
        return staticProperties.find(p => String(p.id) === String(propertyId));
    }, [propertyId]);

    const loading = false; // Static data is always loaded
    const isFavorite = false; // Favorites removed for standalone mode
    const detailsRef = useRef<HTMLDivElement>(null);

    const handleDownloadGuide = () => {
        alert("Brochure download simulation started...");
        // In a real scenario, this would trigger the PDF download logic
    };

    if (!propertyId) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-slate-50 w-full max-w-6xl rounded-3xl overflow-hidden relative shadow-2xl animate-scale-in max-h-[95vh] overflow-y-auto custom-scrollbar">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full text-slate-800 shadow-lg transition-all hover:rotate-90"
                >
                    <X size={24} />
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
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit sticky top-24">
                                    <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                                        <div>
                                            <p className="text-slate-500 text-sm font-bold mb-1">Total Asset Value</p>
                                            <p className="text-3xl font-extrabold text-slate-900">₹{property.price?.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 text-sm font-bold mb-1">Funded</p>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 w-[65%]"></div>
                                                </div>
                                                <span className="font-bold text-blue-600 text-sm">65%</span>
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
                                            <button className="btn-brand w-full py-4 rounded-xl text-lg uppercase tracking-tight">
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

export default PropertyDetailsModal;
