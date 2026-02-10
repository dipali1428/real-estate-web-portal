'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Shield, TrendingUp, Wallet, Download, CheckCircle, MapPin, X, FileText } from 'lucide-react';
import { properties as staticProperties } from '../data/properties';

interface HomeSectionProps {
    onPropertySelect?: (id: string) => void;
}

const HomeSection = ({ onPropertySelect }: HomeSectionProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applyData, setApplyData] = useState({ name: '', email: '', phone: '', amount: '' });
    const router = useRouter();

    // Featured properties from static data
    const featuredProperties = useMemo(() => {
        return staticProperties.filter(p => p.status !== 'closed').slice(0, 3);
    }, []);

    const handleDownloadGuide = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Infinity_Premium_Brochure</title>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 50px; color: #1e293b; line-height: 1.6; max-width: 900px; margin: 0 auto; font-size: 20px; background: white; }
                        .header { text-align: center; border-bottom: 5px solid #2076C7; padding-bottom: 20px; margin-bottom: 30px; }
                        h1 { background: linear-gradient(to right, #2563eb, #14b8a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; font-size: 40px; text-transform: uppercase; letter-spacing: 2px; }
                        .subtitle { color: #64748b; font-size: 24px; font-weight: 600; margin-top: 5px; }
                        .section { margin-bottom: 40px; }
                        h2 { background: linear-gradient(to right, #2563eb, #14b8a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; border-left: 6px solid #2076C7; padding-left: 20px; font-size: 28px; margin-bottom: 20px; display: inline-block; }
                        .step { margin-bottom: 20px; display: block; margin-left: 10px; }
                        .step-num { background: #2076C7; color: white; width: 35px; height: 35px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; font-size: 20px; vertical-align: middle; }
                        .step-content { display: inline-block; vertical-align: middle; width: 85%; }
                        .step-content b { display: block; font-size: 22px; color: #1e293b; margin-bottom: 5px; }
                        .step-content p { margin: 0; color: #475569; font-size: 18px; }
                        ul { padding-left: 30px; margin: 0; }
                        li { margin-bottom: 12px; font-size: 18px; color: #475569; }
                        .why-us-grid { display: block; }
                        .why-us-item { background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-bottom: 15px; }
                        .why-us-item b { color: #2076C7; display: block; margin-bottom: 5px; font-size: 20px; }
                        .why-us-item p { margin: 0; font-size: 17px; color: #64748b; line-height: 1.5; }
                        .footer { margin-top: 60px; text-align: center; font-size: 16px; color: #1e293b; border-top: 2px solid #e2e8f0; padding: 40px 0 100px 0; }
                        .social-links { margin: 20px 0; font-weight: 700; }
                        .social-links a { margin: 0 15px; text-decoration: none; color: #2076C7 !important; border-bottom: 1px solid #2076C7; }
                        .page-break { page-break-before: always; }
                    </style>
                </head>
                <body>
                    <div id="brochure-content">
                        <div class="header">
                            <h1>INFINITY ARTHVISHWA</h1>
                            <div class="subtitle">Premium Investment Portfolio Guide</div>
                        </div>

                        <div class="section">
                            <h2>1. How to Invest (Steps to Wealth)</h2>
                            <div class="step">
                                <div class="step-num">1</div>
                                <div class="step-content"><b>Choose Property</b><p>Select your ideal premium asset from our curated portfolio of institutional-grade properties.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">2</div>
                                <div class="step-content"><b>Allocate Funds</b><p>Invest based on your financial goals. We offer flexible entry barriers for premium real estate.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">3</div>
                                <div class="step-content"><b>Complete Paperwork</b><p>Secure legal ownership through our transparent and digital documentation process.</p></div>
                            </div>
                            <div class="step">
                                <div class="step-num">4</div>
                                <div class="step-content"><b>Earn Passive Income</b><p>Start receiving monthly rental distributions and benefit from long-term capital appreciation.</p></div>
                            </div>
                        </div>

                        <div class="section page-break">
                            <h2>2. Eligibility Criteria</h2>
                            <ul>
                                <li><b>Investor Types:</b> High-net-worth Individuals (HNIs), Companies, and Institutional Funds.</li>
                                <li><b>Investment Capacity:</b> Scalable options tailored to specific property asset values.</li>
                                <li><b>Strategic Location:</b> Focus on Grade-A properties in rapidly developing approved areas.</li>
                                <li><b>Legal Verification:</b> Only properties with 100% verified clear titles are listed.</li>
                                <li><b>Financing Support:</b> Direct assistance with Home Loan and leverage eligibility.</li>
                                <li><b>Residency Profile:</b> Open to all Indian Residents and Non-Resident Indians (NRIs).</li>
                            </ul>
                        </div>

                        <div class="section">
                            <h2>3. Required Documents Checklist</h2>
                            <ul>
                                <li>Primary Identity and Address Verification (Aadhaar, Passport, PAN).</li>
                                <li>Income Proof and Latest Income Tax Returns (ITR).</li>
                                <li>Detailed Property-Specific Due Diligence (Provided by us).</li>
                                <li>Comprehensive Title Audit and Legal Feasibility Reports.</li>
                                <li>Proof of Financial Capacity and Asset Declaration.</li>
                                <li>Verified Bank Statements for the last 6 months.</li>
                                <li>Authorized Bank Account Confirmation & Cancelled Cheque.</li>
                            </ul>
                        </div>

                        <div class="section page-break">
                            <h2>4. Why Choose Infinity Arthvishva?</h2>
                            <div class="why-us-grid">
                                <div class="why-us-item"><b>Asset Security</b><p>Your investments are legally backed by physical property titles and RERA-regulated assets.</p></div>
                                <div class="why-us-item"><b>Zero Management</b><p>We handle everything including tenant sourcing, building maintenance, and legal taxes.</p></div>
                                <div class="why-us-item"><b>Diversification</b><p>Spread your capital across multiple high-yield residential and commercial assets.</p></div>
                                <div class="why-us-item"><b>Expert Selection</b><p>Hand-picked opportunities by real estate experts with deep market insights in Pune.</p></div>
                                <div class="why-us-item"><b>Resale Support</b><p>Complete assistance for liquidating or reselling your share whenever you choose.</p></div>
                                <div class="why-us-item"><b>Full Transparency</b><p>Direct access to legal property audits and real-time performance tracking for all assets.</p></div>
                            </div>
                        </div>

                        <div class="footer">
                             <p style="font-weight: 700; font-size: 18px; margin-bottom: 10px;">Copyright 2026 Infinity Arthvishva | Authorized Professional Partners | Pune, Maharashtra</p>
                            <div style="margin: 15px 0; color: #2076C7; font-weight: 800; font-size: 24px;">
                                Toll Free Support: 1800-532-7600
                            </div>
                            <div class="social-links">
                                <a href="https://facebook.com/infinityarthvishwa">Facebook</a>
                                <a href="https://twitter.com/infinityarth">Twitter</a>
                                <a href="https://instagram.com/infinityarthvishwa">Instagram</a>
                            </div>
                            <p style="margin-top: 20px; font-weight: 700; color: #475569;">
                                www.infinityarthvishwa.com | contact@infinity.com
                            </p>
                        </div>
                    </div>
                    <script>
                        window.onload = function() {
                            const element = document.getElementById('brochure-content');
                            const opt = {
                                margin: [10, 10, 20, 10],
                                filename: 'How_To_Invest_Infinity_Arthvishva.pdf',
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
            {/* Hero Section - Redesigned with light theme */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full -ml-44 -mb-44" />

                <div className="container mx-auto px-4 relative z-20 pt-16 text-center">
                    <div className="max-w-7xl mx-auto">
                        <span className="block text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-10 px-4 py-2 bg-blue-50 inline-block rounded-full">
                            Infinity Arthvishva Premium Realty
                        </span>
                        <h3 className="text-4xl md:text-7xl font-sans font-bold mb-15  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Step Into Your Future with Fractional Real Estate Investment </h3>

                        {/* Navigation Links in Hero */}
                        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {[
                                { name: 'Current Opportunities', path: '/#live' },
                                { name: 'Closed Opportunities', path: '/#closed' },
                                { name: 'Calculator', path: '/#calculator' },
                                { name: 'How to Invest', onClick: handleDownloadGuide, isAction: true }
                            ].map((link) => (
                                link.isAction ? (
                                    <button
                                        key={link.name}
                                        onClick={link.onClick}
                                        className="btn-brand flex items-center gap-2 px-8 py-3 rounded-full text-sm"
                                    >
                                        <Download size={18} /> {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.path!}
                                        className="px-8 py-3 rounded-full bg-white text-slate-800 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all shadow-md border border-slate-100 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div> */}

                        <p className="text-lg md:text-xl font-sans text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed font-medium">
                            Experience the next generation of property acquisition. Immersive AR/VR tours and hand-picked high-yield assets await in India's prime growth corridors.
                        </p>

                        {/* Hero Search Bar */}
                        {/* <div className="bg-white p-2 rounded-2xl max-w-2xl mx-auto flex flex-col md:flex-row gap-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-transform hover:-translate-y-1 border border-slate-100">
                            <div className="flex-1 flex items-center gap-3 px-6 py-3">
                                <Search size={22} className="text-blue-600" />
                                <input
                                    type="text"
                                    placeholder="Where would you like to invest?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-full bg-transparent border-none outline-none text-lg font-bold text-slate-800 placeholder:text-slate-400"
                                />
                            </div>
                            <button onClick={handleSearch} className="btn-brand px-10 py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider text-sm">
                                Find Assets <ChevronRight size={18} />
                            </button>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">How We Deliver Results</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Achieving your financial goals is our true achievement. We simplify the path to wealth through a structured and transparent investment process.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: Search, title: 'Select Property', text: 'Browse our curated collection of high-yield properties.' },
                            { icon: Wallet, title: 'Invest Amount', text: 'Choose your share and invest fractions of the total value.' },
                            { icon: TrendingUp, title: 'Earn & Grow', text: 'Receive periodic rental income and capital appreciation.' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-brand-gradient">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment Benefits Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Why Fractional Investment?</h2>
                        <p className="text-lg text-slate-500 mb-12">
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
                            <h3 className="text-2xl font-bold font-sans text-gray-700 mb-8 text-brand-gradient">Platform Stats</h3>
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
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-sans font-bold mb-3  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Featured Properties</h2>
                    <p className="text-slate-500 mb-8">Explore our hand-picked selection of premium investment opportunities.</p>
                    <Link href="/#live" className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 text-blue-600 rounded-full font-semibold hover:bg-slate-200 transition-colors">
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
                                        </span>
                                    </div>
                                    {property.status !== 'closed' && (
                                        <button
                                            onClick={() => onPropertySelect && onPropertySelect(String(property.id))}
                                            className="btn-brand px-6 py-2 rounded-lg text-xs"
                                        >
                                            Details
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

            {/* Apply Modal */}
            {showApplyForm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
                    {/* Back Button */}
                    <button
                        onClick={() => setShowApplyForm(false)}
                        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-xl font-bold text-slate-700 shadow-lg hover:bg-slate-50 transition-all z-[10000]"
                    >
                        <ChevronRight size={18} className="rotate-180" /> Back
                    </button>

                    <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-fade-in relative">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowApplyForm(false)}
                                className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText size={28} />
                            </div>
                            <h2 className="text-2xl font-extrabold mb-2 text-brand-gradient">Investor Application</h2>
                            <p className="text-slate-500 text-sm">Submit your interest and our legal team will reach out with the LLP agreement drafts.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Rahul Deshmukh"
                                    value={applyData.name}
                                    onChange={(e) => setApplyData({ ...applyData, name: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="rahul@example.com"
                                        value={applyData.email}
                                        onChange={(e) => setApplyData({ ...applyData, email: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 00000-00000"
                                        value={applyData.phone}
                                        onChange={(e) => setApplyData({ ...applyData, phone: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Intent to Invest (₹)</label>
                                <select
                                    value={applyData.amount}
                                    onChange={(e) => setApplyData({ ...applyData, amount: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors cursor-pointer"
                                >
                                    <option value="">Select range</option>
                                    <option value="10-25">₹10 Lakhs - ₹25 Lakhs</option>
                                    <option value="25-50">₹25 Lakhs - ₹50 Lakhs</option>
                                    <option value="50-100">₹50 Lakhs - ₹1 Crore</option>
                                    <option value="100+">Above ₹1 Crore</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <button
                                    onClick={() => setShowApplyForm(false)}
                                    className="w-full py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Application submitted successfully! Our investment advisor will contact you within 24 hours.');
                                        setShowApplyForm(false);
                                        setApplyData({ name: '', email: '', phone: '', amount: '' });
                                    }}
                                    className="btn-brand w-full py-4 rounded-xl"
                                >
                                    Submit
                                </button>
                            </div>

                            <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                                <Shield size={12} /> Your data is protected by institutional-grade encryption.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeSection;
