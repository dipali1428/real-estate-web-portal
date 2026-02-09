'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// Lucide Icons
import {
  ArrowLeft,
  Handshake,
  LineChart,
  HandCoins,
  ArrowLeftRight,
  FileText,
  Scale,
  Eye,
  Briefcase,
  ShieldCheck,
  CheckCircle,
  Info,
  Phone,
  Download,
  X,
  User,
  Mail,
  Package,
  MessageSquare,
  ChevronRight,
  Clock,
  DollarSign
} from 'lucide-react';

// Service data structure
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  whoFor: string;
  features: string[];
  cta: string;
  startingPrice: string;
  processSteps: string[];
  deliverables: string[];
  timeline: string;
}

interface ServiceRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  companyName: string;
  quantity: string;
  investmentSize: string;
  additionalInfo: string;
  agreeTerms: boolean;
}

const ServicesContent = () => {
  const searchParams = useSearchParams();

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'process'>('overview'); // Removed deliverables type

  const [requestForm, setRequestForm] = useState<ServiceRequest>({
    name: '', email: '', phone: '', serviceType: '', companyName: '',
    quantity: '', investmentSize: '', additionalInfo: '', agreeTerms: false
  });

  useEffect(() => {
    if (showServiceModal || showRequestModal || showSuccessModal || showScheduleModal || showBrochureModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showServiceModal, showRequestModal, showSuccessModal, showScheduleModal, showBrochureModal]);

  useEffect(() => {
    const openModal = searchParams.get('openModal');
    if (openModal === 'schedule') setShowScheduleModal(true);
    if (openModal === 'brochure') setShowBrochureModal(true);
  }, [searchParams]);

  const services: Service[] = [
    {
      id: 'preipo-advisory',
      title: 'Pre-IPO Investment Advisory',
      description: 'Expert guidance on upcoming unlisted & pre-IPO opportunities with comprehensive valuation analysis and risk assessment.',
      icon: LineChart,
      whoFor: 'Investors seeking pre-IPO entry opportunities',
      features: [
        'Upcoming pre-IPO opportunity identification',
        'Company valuation & financial analysis',
        'Risk assessment & mitigation strategies',
        'Entry timing & allocation strategy',
        'Lock-in period & exit planning'
      ],
      cta: 'Request Advisory',
      startingPrice: '₹15,000 per advisory',
      processSteps: [
        'Initial consultation & risk profiling',
        'Opportunity screening & shortlisting',
        'Detailed due diligence & valuation',
        'Investment strategy development',
        'Execution & ongoing monitoring'
      ],
      deliverables: [],
      timeline: '2-4 weeks for comprehensive advisory'
    },
    {
      id: 'esop-liquidity',
      title: 'ESOP Liquidity Solutions',
      description: 'Complete solutions for monetizing employee stock options in unlisted companies with secure transaction execution.',
      icon: HandCoins,
      whoFor: 'Employees with ESOPs in unlisted companies',
      features: [
        'ESOP valuation & fair price discovery',
        'Buyback & secondary sale facilitation',
        'Employee exit planning support',
        'Tax implications guidance',
        'Secure transaction execution'
      ],
      cta: 'Check Eligibility',
      startingPrice: 'Success-based fees (1-3%)',
      processSteps: [
        'ESOP details verification',
        'Company authorization validation',
        'Buyer discovery & matching',
        'Price negotiation & agreement',
        'Secure settlement execution'
      ],
      deliverables: [],
      timeline: '3-6 weeks for complete liquidity'
    },
    {
      id: 'share-transfer',
      title: 'Share Transfer Assistance',
      description: 'Professional support for NSDL/CDSL transfers, DIS filing, and documentation handling for unlisted shares.',
      icon: ArrowLeftRight,
      whoFor: 'Investors facing transfer complexities',
      features: [
        'NSDL/CDSL transfer process guidance',
        'DIS, CMR & documentation support',
        'Corporate action handling',
        'Transfer status tracking',
        'Issue resolution & escalation'
      ],
      cta: 'Get Transfer Help',
      startingPrice: '₹5,000 per transfer',
      processSteps: [
        'Document verification & completeness',
        'Form filling & submission guidance',
        'Depository participant coordination',
        'Status tracking & follow-up',
        'Transfer completion confirmation'
      ],
      deliverables: [],
      timeline: '7-21 days for complete transfer'
    },
    {
      id: 'valuation-reports',
      title: 'Valuation & Research Reports',
      description: 'Comprehensive analysis and fair value estimation reports for informed unlisted shares investment decisions.',
      icon: FileText,
      whoFor: 'Serious investors needing detailed analysis',
      features: [
        'Company financial analysis & projections',
        'Growth potential & risk assessment',
        'Peer comparison & industry benchmarking',
        'Fair value estimation models',
        'Investment recommendation rationale'
      ],
      cta: 'View Sample Report',
      startingPrice: '₹10,000 per report',
      processSteps: [
        'Data collection & verification',
        'Financial modeling & analysis',
        'Valuation using multiple methods',
        'Risk assessment & peer comparison',
        'Report preparation & presentation'
      ],
      deliverables: [],
      timeline: '2-3 weeks for detailed report'
    },
    {
      id: 'tax-support',
      title: 'Tax & Compliance Support',
      description: 'Expert guidance on LTCG/STCG taxation, documentation, and regulatory compliance for unlisted transactions.',
      icon: Scale,
      whoFor: 'All investors in unlisted securities',
      features: [
        'Capital gains calculation (LTCG/STCG)',
        'Transaction documentation support',
        'Regulatory compliance advisory',
        'Audit-ready reports preparation',
        'SEBI-aligned process guidance'
      ],
      cta: 'Talk to Tax Expert',
      startingPrice: '₹7,500 annual support',
      processSteps: [
        'Transaction tax implications analysis',
        'Documentation checklist preparation',
        'Compliance requirement identification',
        'Tax optimization strategy',
        'Ongoing advisory & support'
      ],
      deliverables: [],
      timeline: '24-48 hours for initial consultation'
    },
    {
      id: 'portfolio-monitoring',
      title: 'Portfolio Monitoring',
      description: 'Comprehensive tracking and analysis of your unlisted investments with performance insights and exit alerts.',
      icon: Eye,
      whoFor: 'Investors with multiple unlisted holdings',
      features: [
        'Unlisted portfolio tracking dashboard',
        'Investment performance analysis',
        'Holding period & milestone tracking',
        'Exit opportunity alerts',
        'Portfolio rebalancing suggestions'
      ],
      cta: 'Monitor Portfolio',
      startingPrice: '₹12,000/year',
      processSteps: [
        'Portfolio data integration',
        'Performance tracking setup',
        'Alert configuration',
        'Regular monitoring & reporting',
        'Exit strategy planning'
      ],
      deliverables: [],
      timeline: 'Immediate setup, ongoing monitoring'
    },
    {
      id: 'institutional-services',
      title: 'Institutional & HNI Services',
      description: 'Custom solutions for bulk transactions, priority allocations, and confidential handling for large investors.',
      icon: Briefcase,
      whoFor: 'HNIs, Family Offices, Institutions',
      features: [
        'Bulk deal execution & negotiation',
        'Custom pricing & allocation priorities',
        'Dedicated relationship manager',
        'Exclusive deal flow access',
        'Confidential transaction handling'
      ],
      cta: 'Contact Relationship Manager',
      startingPrice: 'Custom pricing',
      processSteps: [
        'Requirements assessment & profiling',
        'Dedicated manager assignment',
        'Custom deal structuring',
        'Confidential execution',
        'Post-transaction support'
      ],
      deliverables: [],
      timeline: 'Ongoing dedicated support'
    },
    {
      id: 'trust-safety',
      title: 'Trust & Safety Assurance',
      description: 'Comprehensive safety framework including verification, escrow, and audit trail for secure transactions.',
      icon: ShieldCheck,
      whoFor: 'All platform users',
      features: [
        'Verified counterparties (KYC)',
        'Secure escrow mechanism',
        'Manual transaction verification',
        'End-to-end audit trail',
        'Dispute resolution support'
      ],
      cta: 'Learn About Safety',
      startingPrice: 'Included in all services',
      processSteps: [
        'KYC verification & validation',
        'Transaction screening',
        'Escrow account setup',
        'Multi-step verification',
        'Secure settlement execution'
      ],
      deliverables: [],
      timeline: 'Built into every transaction'
    }
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setActiveTab('overview');
    setShowServiceModal(true);
  };

  const handleRequestService = () => {
    if (selectedService) {
      setRequestForm({ ...requestForm, serviceType: selectedService.title });
      setShowServiceModal(false);
      setShowRequestModal(true);
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequestModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <main className="container mx-auto px-4 py-8">

        <div className="flex justify-start mb-8">
          <Link
            href="/products/unlisted"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>

        <header className="mb-12 text-center">
          {/* Icon Section */}
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <Handshake size={32} />
            </div>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Comprehensive Investment Services
          </h1>

          {/* Gradient Divider Line */}
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert advisory, portfolio management, and complete investment solutions for unlisted securities
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center mb-4 text-[#2076C7]">
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>
              <div className="space-y-2 mb-4">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-500 mt-1" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="text-lg font-bold text-[#2076C7] mb-4">{service.startingPrice}</div>
              <button
                onClick={() => handleServiceSelect(service)}
                className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Info size={18} /> View Details
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Enhance Your Investment Strategy?</h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join 1,500+ investors who trust our comprehensive services for their unlisted securities investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button onClick={() => setShowScheduleModal(true)} className="px-8 py-3 bg-white text-[#2076C7] font-bold rounded-lg flex items-center justify-center gap-2">
              <Phone size={18} /> Schedule a Call
            </button> */}
            {/* <button onClick={() => setShowBrochureModal(true)} className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg flex items-center justify-center gap-2">
              <Download size={18} /> Download Brochure
            </button> */}
          </div>
        </div>

        {/* Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8 relative">
              <button onClick={() => setShowRequestModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-black text-center">Request {requestForm.serviceType}</h2>

              <form onSubmit={handleSubmitRequest} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-bold text-black mb-1 flex items-center gap-2">
                    <User size={14} className="text-[#2076C7]" /> Full Name
                  </label>
                  <input type="text" placeholder="John Doe" required className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[#2076C7] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1 flex items-center gap-2">
                    <Mail size={14} className="text-[#2076C7]" /> Email Address
                  </label>
                  <input type="email" placeholder="john@example.com" required className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[#2076C7] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1 flex items-center gap-2">
                    <Phone size={14} className="text-[#2076C7]" /> Phone Number
                  </label>
                  <input type="tel" placeholder="+91 98765 43210" required className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[#2076C7] outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1 flex items-center gap-2">
                    <Package size={14} className="text-[#2076C7]" /> Number of Shares
                  </label>
                  <input
                    type="text"
                    placeholder="Enter quantity (e.g. 500)"
                    className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-[#2076C7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-1 flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#2076C7]" /> Additional Information
                  </label>
                  <textarea placeholder="Tell us more about your specific needs..." className="w-full border border-gray-200 p-2.5 rounded-lg text-sm h-24 resize-none outline-none focus:ring-2 focus:ring-[#2076C7]" />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input type="checkbox" required className="w-4 h-4 accent-[#2076C7]" />
                  <span className="text-xs text-black font-medium">I agree to the terms and privacy policy</span>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2">
                  Submit Request <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[2200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl text-center p-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-black">Request Received!</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">Thank you for your interest. Our representative will contact you within the next 24 working hours.</p>
              <button onClick={() => setShowSuccessModal(false)} className="w-full bg-[#2076C7] text-white py-3 rounded-lg font-bold shadow-lg">
                Great, Thank You!
              </button>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedService && showServiceModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl my-8 text-gray-900 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold truncate">{selectedService.title}</h2>
                <button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8">
                {/* TABS - Deliverables removed */}
                <div className="flex gap-8 border-b mb-8 overflow-x-auto no-scrollbar">
                  {['overview', 'process'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 text-sm font-bold tracking-wider transition-all whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-[#2076C7] text-[#2076C7]' : 'text-gray-400'}`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {activeTab === 'overview' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">{selectedService.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                          <User size={16} className="text-[#2076C7]" /> Who is this for?
                        </h4>
                        <p className="text-sm text-gray-600">{selectedService.whoFor}</p>
                      </div>
                      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                          <DollarSign size={16} className="text-[#2076C7]" /> Pricing Info
                        </h4>
                        <p className="text-sm text-[#2076C7] font-bold">{selectedService.startingPrice}</p>
                      </div>
                    </div>
                    <div className="mb-8">
                      <h4 className="font-bold text-black mb-4">Key Features & Benefits</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedService.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg text-sm text-gray-700">
                            <CheckCircle size={14} className="text-[#2076C7]" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'process' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="font-bold text-black mb-6">Service Execution Process</h4>
                    <div className="space-y-6">
                      {selectedService.processSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#2076C7] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="pt-1 border-b border-gray-100 pb-4 flex-grow">
                            <p className="text-gray-700 font-medium">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-orange-50 rounded-xl flex items-center gap-3">
                      <Clock size={20} className="text-orange-500" />
                      <p className="text-sm text-orange-700 font-medium">Estimated Timeline: {selectedService.timeline}</p>
                    </div>
                  </div>
                )}

                <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-sm text-gray-500 italic">Need more info? <button className="text-[#2076C7] font-bold underline">Talk to our experts</button></p>
                  <button
                    onClick={handleRequestService}
                    className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white px-10 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-all"
                  >
                    Request {selectedService.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default function Services() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}