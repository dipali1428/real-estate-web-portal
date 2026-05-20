'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { realEstateAPI, RealEstateInvestment } from '../../../services/realestateAPI';
import { MapPin, CheckCircle, Info, Shield, X, Share2, Download, Loader, Calculator, FileText } from 'lucide-react';
import Image from 'next/image';
import InvestmentCalculator, { calculateInvestmentData } from './InvestmentCalculator';
import { properties as staticProperties } from '../data/properties';

interface RealEstatePropertyDetailsModalProps {
    propertyId: string;
    onClose: () => void;
    onInvestNow: (propertyTitle: string) => void;
}

// Transform API property to match the expected format for Infographic
const transformPropertyForInfographic = (property: RealEstateInvestment) => {
    const minContribution = parseInt(property.min_investment) || 800000;
    const totalValue = property.total_asset_value ? parseInt(property.total_asset_value) : minContribution * 10;
    const area = property.total_area || 500;

    return {
        id: property.id,
        title: property.project_name,
        developer: property.developer_name,
        type: property.project_type,
        location: property.location,
        price: totalValue,
        min_contribution: minContribution,
        yield_percentage: parseFloat(property.yield_percentage),
        irr_percentage: property.irr_percentage ? parseFloat(property.irr_percentage) : parseFloat(property.yield_percentage) * 1.2,
        holding_period: `${property.lockin_period_months || 12} MONTHS`,
        area: area,
        units: property.total_units || 1,
        rera_reg_no: property.rera_id || 'RERA-Pending',
        market_price: property.market_price ? parseInt(property.market_price) : totalValue * 1.8,
        sanctions_obtained: property.sanctions ? 'YES' : 'PENDING',
        litigations: property.litigations || 'NONE',
        land_title: property.land_title || 'CLEAR',
        other_due_diligence: property.due_diligence || 'CLEAR',
        ownership_structure: property.ownership_structure || 'JOINT-OWNERSHIP THROUGH LLP',
        trust_factor: property.trustee_name || 'Administered By MITCON CREDENTIA',
        llp_name: property.llp_name || 'INFRA LLP',
        completion_date: '30/06/2028',
        map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb145f7%3A0x7d8c2b9b8c9b8c9b!2sNew%20York!5e0!3m2!1sen!2sus!4v1644262078186!5m2!1sen!2sus',
        image: property.image_url || staticProperties.find(p => p.id === property.id)?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(property.project_name)}&size=800&background=2076C7&color=fff&bold=true`,
        status: property.status === 'ACTIVE' ? 'live' : 'closed',
        description: `${property.project_name} is a premium ${property.project_type} project located in ${property.location}. ${property.current_status || 'Well-positioned for high returns with RERA approval and clear titles.'}`
    };
};

const PropertyInfographic = ({ property }: { property: any }) => {
    const calcData = calculateInvestmentData(
        property.price,
        property.irr_percentage || 12.5,
        property.yield_percentage || 8,
        property.holding_period
    );

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

                    {/* Required Documents Section */}
                    <div className="mt-16 pt-10 border-t-2 border-slate-100">
                        <div className="flex items-center gap-4 mb-10 group">
                            <div className="text-[#1CADA3] drop-shadow-sm">
                                <FileText size={22} strokeWidth={3} />
                            </div>
                            <span className="text-[16px] font-black text-[#2076C7] tracking-wider uppercase">DOCUMENTS REQUIRED TO INVEST</span>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            {[
                                "PAN CARD COPY",
                                "AADHAAR NUMBER WITH ADDRESS",
                                "EMAIL ID",
                                "MOBILE NUMBER LINKED WITH AADHAAR",
                                "PHOTO"
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center gap-4 py-1 transition-all">
                                    <div className="text-[#2076C7]">
                                        <CheckCircle size={18} strokeWidth={3} />
                                    </div>
                                    <span className="text-[13px] font-black text-slate-700 tracking-wide uppercase leading-none">{doc}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 text-[12px] font-bold text-slate-500 italic flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Info size={16} className="text-[#2076C7]" />
                            </div>
                            Digital documents are accepted
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
                        <div className="ml-8">
                            <Image src="/logo.png" alt="Infinity Arthvishwa" className="h-12 w-auto" width={100} height={50} />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row">
                        {/* Property Data Table */}
                        <div className="w-full p-2">
                            <div className="space-y-4 p-2">
                                {[
                                    { label: 'NAME OF DEVELOPER', value: property.developer },
                                    { label: 'TYPE OF PROJECT', value: property.type?.toUpperCase().includes('PROJECT') ? property.type : (property.type || 'Residential') + ' PROJECT' },
                                    { label: 'CURRENT STATUS', value: property.current_status || 'RCC & BRICK WORK COMPLETED, INTERNAL WORK GOING ON', highlight: true },
                                    { label: 'RERA', value: property.rera_reg_no === 'RERA-Pending' ? 'PENDING' : 'YES' },
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
                                { label: 'BUY BACK PRICE (ALL INCL.)', value: `Rs. ${(calcData.buyBack / 10000000).toFixed(2)} CR. (Rs. ${Math.round(calcData.buyBack / (property.area || 1000))} / SQ. FT.)`, teal: true },
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
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch property from API or fallback to static data
    useEffect(() => {
        const fetchProperty = async () => {
            if (!propertyId) return;
            try {
                setLoading(true);
                setError(null);
                
                const parsedId = parseInt(propertyId);
                const staticProp = staticProperties.find(p => p.id === parsedId);

                let transformedProperty;
                try {
                    // ✅ Updated to use getPropertyById instead of getInvestmentById
                    const response = await realEstateAPI.getPropertyById(parsedId);
                    if (response.data && response.data.project_name) {
                        transformedProperty = transformPropertyForInfographic(response.data);
                    } else {
                        throw new Error("Empty API data");
                    }
                } catch (apiError) {
                    // Fallback to static property entirely if API fails or is empty
                    if (staticProp) {
                        transformedProperty = {
                            id: staticProp.id,
                            title: staticProp.title,
                            developer: staticProp.developer,
                            type: staticProp.type,
                            location: staticProp.location,
                            price: staticProp.price,
                            min_contribution: staticProp.min_contribution,
                            yield_percentage: staticProp.yield_percentage,
                            irr_percentage: staticProp.irr_percentage,
                            holding_period: staticProp.holding_period,
                            area: staticProp.area,
                            units: staticProp.units,
                            rera_reg_no: staticProp.rera_reg_no,
                            market_price: staticProp.market_price || staticProp.price * 1.8,
                            sanctions_obtained: staticProp.sanctions_obtained || 'PENDING',
                            litigations: staticProp.litigations || 'NONE',
                            land_title: staticProp.land_title || 'CLEAR',
                            other_due_diligence: staticProp.other_due_diligence || 'CLEAR',
                            ownership_structure: staticProp.ownership_structure || 'JOINT-OWNERSHIP THROUGH LLP',
                            trust_factor: staticProp.trust_factor || 'Administered By MITCON CREDENTIA',
                            llp_name: staticProp.llp_name || 'INFRA LLP',
                            completion_date: staticProp.completion_date || '30/06/2028',
                            map_url: staticProp.map_url || '',
                            image: staticProp.image,
                            status: staticProp.status,
                            description: staticProp.description
                        };
                    } else {
                        throw new Error("Property not found in API or static data");
                    }
                }
                
                setProperty(transformedProperty);
            } catch (err) {
                setError('Failed to load property details');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [propertyId]);

    const handleDownloadGuide = async () => {
        if (!property) return;
        
        let finalImageSrc = '';
        if (property.image?.startsWith('http')) {
            try {
                // Fetch via robust CORS proxy and convert to base64 immediately
                const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(property.image)}`);
                if (res.ok) {
                    const blob = await res.blob();
                    finalImageSrc = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                }
            } catch (err) {
            }
        }
        
        if (!finalImageSrc) {
            finalImageSrc = property.image?.startsWith('http') ? property.image : window.location.origin + property.image;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const content = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Infinity_Institutional_Report_${property.title?.replace(/\s+/g, '_')}</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
                    <style>
                        :root {
                            --brand-blue: #2076C7;
                            --deep-navy: #0f172a;
                            --teal-accent: #1CADA3;
                            --slate-light: #f8fafc;
                            --border-color: #e2e8f0;
                        }
                        body { 
                            font-family: 'Inter', system-ui, -apple-system, sans-serif; 
                            padding: 40px 60px; 
                            color: var(--deep-navy); 
                            line-height: 1.5; 
                            max-width: 1000px; 
                            margin: 0 auto; 
                            background: white; 
                            -webkit-print-color-adjust: exact;
                        }
                        .header { 
                            display: flex; 
                            justify-content: space-between; 
                            align-items: center; 
                            border-bottom: 2px solid var(--border-color); 
                            padding-bottom: 20px; 
                            margin-bottom: 30px; 
                        }
                        .brand-logo { 
                            font-size: 24px; 
                            font-weight: 900; 
                            letter-spacing: -1px; 
                        }
                        .brand-quikr { color: var(--brand-blue); }
                        .brand-propx { color: #f97316; }
                        
                        .report-meta { 
                            text-align: right; 
                            font-size: 11px; 
                            text-transform: uppercase; 
                            font-weight: 700; 
                            color: #64748b; 
                        }

                        h1 { 
                            font-size: 32px; 
                            font-weight: 800; 
                            color: var(--deep-navy); 
                            margin: 0 0 5px 0; 
                            letter-spacing: -0.5px;
                        }
                        .property-id { 
                            font-size: 14px; 
                            font-weight: 600; 
                            color: var(--brand-blue); 
                            text-transform: uppercase; 
                            margin-bottom: 30px; 
                        }

                        .section-title { 
                            font-size: 10px; 
                            font-weight: 900; 
                            text-transform: uppercase; 
                            letter-spacing: 1px; 
                            color: #64748b; 
                            margin-bottom: 12px; 
                            border-bottom: 1px solid var(--border-color);
                            padding-bottom: 6px;
                        }

                        .asset-card { 
                            display: grid; 
                            grid-template-columns: 1.2fr 1fr; 
                            gap: 40px; 
                            margin-bottom: 40px; 
                        }
                        .asset-image { 
                            width: 100%; 
                            height: 320px; 
                            object-fit: cover; 
                            border-radius: 12px; 
                            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); 
                        }
                        
                        .data-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
                        .data-item { display: flex; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9; }
                        .data-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }
                        .data-value { font-size: 14px; font-weight: 700; color: var(--deep-navy); }

                        .scorecard { 
                            display: grid; 
                            grid-template-columns: repeat(4, 1fr); 
                            gap: 20px; 
                            margin-bottom: 40px; 
                        }
                        .score-item { 
                            background: var(--slate-light); 
                            padding: 20px; 
                            border-radius: 16px; 
                            border: 1px solid var(--border-color); 
                            text-align: center; 
                        }
                        .score-label { font-size: 9px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 8px; }
                        .score-value { font-size: 20px; font-weight: 900; color: var(--brand-blue); }

                        .trust-bar { 
                            display: flex; 
                            justify-content: space-around; 
                            background: #f0fdf4; 
                            border: 1px solid #bcf0da; 
                            border-radius: 12px; 
                            padding: 15px; 
                            margin-bottom: 30px; 
                        }
                        .trust-item { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; color: #065f46; }

                        .description-box { 
                            background: white; 
                            border-left: 4px solid var(--brand-blue); 
                            padding: 20px; 
                            margin-bottom: 40px; 
                            font-size: 14px; 
                            color: #475569; 
                            font-style: italic;
                        }

                        .footer { 
                            margin-top: 60px; 
                            border-top: 2px solid var(--deep-navy); 
                            padding-top: 30px; 
                            display: flex; 
                            justify-content: space-between; 
                            font-size: 10px; 
                            color: #64748b; 
                        }
                        .legal-note { max-width: 60%; line-height: 1.4; }
                        
                        .page-break { page-break-before: always; }
                    </style>
                </head>
                <body>
                    <div id="brochure-content">
                        <div class="header">
                            <div class="brand-logo">
                                <img src="${window.location.origin}/logo.png" alt="Infinity Arthvishwa" style="height: 48px; object-fit: contain;" crossorigin="anonymous" />
                            </div>
                            <div class="report-meta">
                                Institutional Grade Investment Summary<br>
                                Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                        </div>

                        <div class="section-title">Investment Profile</div>
                        <h1>${property.title}</h1>
                        <div class="property-id">Asset Node: ${property.llp_name || 'REDEVPUNE 3'}</div>

                        <div class="asset-card">
                            <img src="${finalImageSrc}" class="asset-image" crossorigin="anonymous" />
                            <div class="data-grid">
                                <div class="data-item">
                                    <div class="data-label">Developer</div>
                                    <div class="data-value">${property.developer}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">Location</div>
                                    <div class="data-value">${property.location}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">RERA Registration</div>
                                    <div class="data-value">${property.rera_reg_no || 'P52100077901'}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">Completion Date</div>
                                    <div class="data-value">${property.completion_date || 'Q4 2027'}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">Total Asset Value</div>
                                    <div class="data-value">₹ ${property.price?.toLocaleString('en-IN')}</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-label">Minimum Contribution</div>
                                    <div class="data-value">₹ ${property.min_contribution?.toLocaleString('en-IN')}</div>
                                </div>
                            </div>
                        </div>

                        <div class="section-title">Performance Scorecard</div>
                        <div class="scorecard">
                            <div class="score-item">
                                <div class="score-label">Target IRR</div>
                                <div class="score-value">${property.irr_percentage}%</div>
                            </div>
                            <div class="score-item">
                                <div class="score-label">Current Yield</div>
                                <div class="score-value">${property.yield_percentage}%</div>
                            </div>
                            <div class="score-item">
                                <div class="score-label">Holding Period</div>
                                <div class="score-value">${property.holding_period}</div>
                            </div>
                            <div class="score-item">
                                <div class="score-label">Asset Class</div>
                                <div class="score-value">Residential</div>
                            </div>
                        </div>

                        <div class="section-title">Compliance & Rigour</div>
                        <div class="trust-bar">
                            <div class="trust-item">✓ CLEAR TITLE</div>
                            <div class="trust-item">✓ LITIGATION FREE</div>
                            <div class="trust-item">✓ RERA REGISTERED</div>
                            <div class="trust-item">✓ SANCTIONS OBTAINED</div>
                        </div>

                        <div class="section-title">Asset Commentary</div>
                        <div class="description-box">
                            "${property.description}"
                        </div>

                        <div class="footer">
                            <div class="legal-note">
                                <b>Disclaimer:</b> This report is generated strictly for informational purposes. Real estate investments involve risks. Past performance is not indicative of future results. All transactions are subject to legal verification and due diligence.
                            </div>
                            <div style="text-align: right;">
                                <b>INFINITY ARTHVISHWA PREMIUM REALTY</b><br>
                                baner, Pune - 411045<br>
                                contact@infinityarthvishwa.com
                            </div>
                        </div>
                    </div>

                    <script>
                        window.onload = function() {
                            const element = document.getElementById('brochure-content');
                            const opt = {
                                margin: 0,
                                filename: 'Infinity_Report_${property.title?.replace(/\s+/g, '_')}.pdf',
                                image: { type: 'jpeg', quality: 1 },
                                html2canvas: { scale: 3, useCORS: true, letterRendering: true },
                                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                            };
                            
                            function generatePDF() {
                                html2pdf().set(opt).from(element).save();
                            }

                            // Wait for all images to fully load before capturing
                            const images = Array.from(document.images);
                            let loadedCount = 0;
                            
                            if (images.length === 0) {
                                generatePDF();
                            } else {
                                images.forEach((img) => {
                                    if (img.complete) {
                                        loadedCount++;
                                        if (loadedCount === images.length) generatePDF();
                                    } else {
                                        img.addEventListener('load', () => {
                                            loadedCount++;
                                            if (loadedCount === images.length) generatePDF();
                                        });
                                        img.addEventListener('error', () => {
                                            loadedCount++;
                                            if (loadedCount === images.length) generatePDF();
                                        });
                                    }
                                });
                                // Fallback timeout in case images hang
                                setTimeout(generatePDF, 5000);
                            }
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
            <div className="bg-slate-50 w-full max-w-6xl rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl animate-scale-in max-h-[95vh] overflow-y-auto custom-scrollbar font-sans">

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
                ) : error || !property ? (
                    <div className="min-h-[400px] flex items-center justify-center text-slate-500">
                        {error || 'Property not found.'}
                    </div>
                ) : (
                    <div className="pb-12">
                        {/* Top Notice */}
                        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] py-3 text-center text-sm text-white font-medium sticky top-0 z-40 shadow-md">
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
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">{property.title}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 mt-2 font-medium">
                                        <MapPin size={18} className="text-blue-500" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => document.getElementById('investment-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-2 group"
                                        >
                                            <Calculator size={16} className="group-hover:rotate-12 transition-transform" />
                                            View Calculations
                                        </button>
                                        <button className="p-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:shadow-md transition-all">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mb-12">
                                {/* Left: Image & Key Stats */}
                                <div className="space-y-6">
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] relative group">
                                        <Image src={property.image} alt={property.title} fill className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" width={400} height={400} />
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
                                                onClick={() => onInvestNow(property.title || 'Fractional Real Estate')}
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

                            {/* Trust Badges Row */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 py-4 bg-white/50 rounded-2xl border border-slate-100 shadow-sm">
                                {[
                                    "Clear Title",
                                    "Litigation Free",
                                    "RERA Registered",
                                    "Sanctions Obtained"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="bg-green-100 p-1 rounded-full text-green-600">
                                            <CheckCircle size={16} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-extrabold text-[#1e293b] whitespace-nowrap">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Investment Calculator Section */}
                            <div className="lg:col-span-2 mb-4" id="investment-calculator">
                                <InvestmentCalculator property={property} />
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
                                        <MapPin size={20} className="text-blue-600" /> Project Location
                                    </h3>
                                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[300px]">
                                        <iframe
                                            src={property.map_url}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
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