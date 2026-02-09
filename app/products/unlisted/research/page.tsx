"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText, Users, TrendingUp, ArrowLeft,
  Search, Filter, Download, X, ChevronRight,
  BarChart3, PieChart, Globe, Building,
  Calendar, User, Award, CheckCircle, Clock, Mail,
  Phone, Video, MessageSquare, Clock3, AlertCircle,
  Check
} from 'lucide-react';

interface ResearchReport {
  id: number;
  title: string;
  type: string;
  date: string;
  author: string;
  excerpt: string;
  valuation: string;
  rating: string;
  target: string;
  current: string;
  upside: string;
}

interface AnalystProfile {
  name: string;
  role: string;
  specialization: string;
  initial: string;
  experience: string;
  education: string;
  certifications: string[];
  sebiRegNo: string;
  bio: string;
  performance?: {
    accuracy: string;
    avgHoldingPeriod: string;
    sectorReturns: Array<{ sector: string; return: string }>;
  };
  coverageUniverse: Array<{
    sector: string;
    percentage: number;
    companies: string[];
  }>;
  contact: {
    email: string;
    linkedIn?: string;
    scheduleCall: boolean;
  };
}

// Add interface for call schedule form
interface CallScheduleForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  callType: 'video' | 'phone';
  agenda: string;
}

const RESEARCH_REPORTS: ResearchReport[] = [
  { id: 1, title: "Boat (Imagine Marketing) - Deep Dive Analysis", type: "company", date: "Oct 15, 2023", author: "Satyen Mehta", excerpt: "Comprehensive analysis of Boat's market position, financials, and growth prospects in the competitive consumer electronics space.", valuation: "₹7,500 Cr", rating: "Buy", target: "₹1,450", current: "₹1,195", upside: "21.3%" },
  { id: 2, title: "Indian Fintech Unlisted Market Outlook 2023", type: "industry", date: "Oct 10, 2023", author: "Vinayak shivsharan", excerpt: "Analysis of the fintech sector's growth trajectory, key players, and investment opportunities in unlisted companies.", valuation: "N/A", rating: "Positive", target: "N/A", current: "N/A", upside: "N/A" },
  { id: 3, title: "Q3 2023 Unlisted Market Performance Report", type: "market", date: "Oct 5, 2023", author: "Research Team", excerpt: "Quarterly review of unlisted market performance, sector trends, and investor sentiment analysis.", valuation: "N/A", rating: "Neutral", target: "N/A", current: "N/A", upside: "N/A" },
  { id: 4, title: "Upcoming IPO Pipeline Analysis", type: "ipo", date: "Sep 28, 2023", author: "Deepesh Singh", excerpt: "Detailed analysis of companies planning IPOs in 2024 and pre-IPO investment opportunities.", valuation: "N/A", rating: "Buy", target: "N/A", current: "N/A", upside: "N/A" },
  { id: 5, title: "HDFC Securities Valuation Update", type: "company", date: "Sep 20, 2023", author: "Satyen Mehta", excerpt: "Updated valuation analysis of HDFC Securities following recent regulatory changes and market developments.", valuation: "₹18,500 Cr", rating: "Hold", target: "₹9,500", current: "₹9,250", upside: "2.7%" },
  { id: 6, title: "Healthcare Unlisted Companies Quarterly", type: "quarterly", date: "Sep 15, 2023", author: "Vinayak shivsharan", excerpt: "Quarterly update on unlisted healthcare companies including PharmEasy, Practo, and other key players.", valuation: "N/A", rating: "Neutral", target: "N/A", current: "N/A", upside: "N/A" },
  { id: 7, title: "ESOP Liquidity Market Study", type: "market", date: "Sep 10, 2023", author: "Research Team", excerpt: "Comprehensive study of the ESOP secondary market, pricing trends, and liquidity solutions.", valuation: "N/A", rating: "Positive", target: "N/A", current: "N/A", upside: "N/A" },
  { id: 8, title: "NSE India Strategic Analysis", type: "company", date: "Sep 5, 2023", author: "Satyen Mehta", excerpt: "Strategic analysis of NSE India's market position, growth drivers, and regulatory environment.", valuation: "₹48,125 Cr", rating: "Buy", target: "₹2,150", current: "₹1,925", upside: "11.7%" }
];

const ANALYST_PROFILES: Record<string, AnalystProfile> = {
  'Satyen Mehta': {
    name: 'Satyen Mehta',
    role: 'Head of Research',
    specialization: 'Financial Services & Technology',
    initial: 'S',
    experience: '12+ years',
    education: 'MBA (Finance), CFA Charterholder',
    certifications: ['SEBI Research Analyst', 'CFA', 'NISM'],
    sebiRegNo: 'INH200001234',
    bio: 'Former equity research head at leading investment bank. Specializes in financial services and technology sectors with focus on pre-IPO opportunities.',
    performance: {
      accuracy: '72%',
      avgHoldingPeriod: '18 months',
      sectorReturns: [
        { sector: 'Technology', return: '+45%' },
        { sector: 'Financial Services', return: '+32%' },
        { sector: 'Consumer', return: '+28%' }
      ]
    },
    coverageUniverse: [
      {
        sector: 'Financial Services',
        percentage: 40,
        companies: ['HDFC Securities', 'NSE India', 'Leading NBFCs', 'Brokerage firms']
      },
      {
        sector: 'Technology',
        percentage: 35,
        companies: ['SaaS companies', 'Fintech platforms', 'Edtech leaders']
      },
      {
        sector: 'Consumer',
        percentage: 15,
        companies: ['D2C brands', 'Retail tech', 'Consumer electronics']
      },
      {
        sector: 'Others',
        percentage: 10,
        companies: ['Infrastructure', 'Manufacturing']
      }
    ],
    contact: {
      email: 'satyan.mehta@unlistedplatform.com',
      linkedIn: 'linkedin.com/in/satyenmehta',
      scheduleCall: true
    }
  },
  'Vinayak shivsharan': {
    name: 'Vinayak shivsharan',
    role: 'Senior Analyst',
    specialization: 'Healthcare & Consumer',
    initial: 'R',
    experience: '8+ years',
    education: 'MD (Medicine), MBA (Healthcare Management)',
    certifications: ['SEBI Research Analyst', 'Healthcare Specialist'],
    sebiRegNo: 'INH200001235',
    bio: 'Medical doctor turned investment analyst. Deep expertise in healthcare sector with focus on digital health and pharmaceutical services.',
    coverageUniverse: [
      {
        sector: 'Healthcare',
        percentage: 60,
        companies: ['PharmEasy', 'Practo', 'Diagnostic chains', 'Hospital networks']
      },
      {
        sector: 'Consumer',
        percentage: 30,
        companies: ['FMCG', 'Retail', 'Consumer durables']
      },
      {
        sector: 'Pharmaceuticals',
        percentage: 10,
        companies: ['API manufacturers', 'Generic pharma']
      }
    ],
    contact: {
      email: 'vinayak.shivsharan@unlistedplatform.com',
      scheduleCall: true
    }
  },
  'Deepesh Singh': {
    name: 'Deepesh Singh',
    role: 'IPO Specialist',
    specialization: 'Pre-IPO & Listing',
    initial: 'A',
    experience: '15+ years',
    education: 'CA, CS, LLB',
    certifications: ['SEBI Research Analyst', 'Company Secretary', 'Chartered Accountant'],
    sebiRegNo: 'INH200001236',
    bio: 'Expert in IPO readiness assessment and listing process. Former investment banker with extensive experience in public market transitions.',
    coverageUniverse: [
      {
        sector: 'IPO Readiness',
        percentage: 100,
        companies: ['All pre-IPO companies', 'DRHP filing advisory', 'Listing process']
      }
    ],
    contact: {
      email: 'deepesh.singh@unlistedplatform.com',
      linkedIn: 'linkedin.com/in/deepeshsingh',
      scheduleCall: true
    }
  },
  'Research Team': {
    name: 'Research Team',
    role: 'Market Research',
    specialization: 'Market Trends & Analysis',
    initial: 'RT',
    experience: 'Collective 25+ years',
    education: 'Various specializations',
    certifications: ['SEBI Research Analyst Team'],
    sebiRegNo: 'INH200001237',
    bio: 'Dedicated team focusing on market trends, liquidity studies, and sector-wide analysis for unlisted shares.',
    coverageUniverse: [
      {
        sector: 'Market Research',
        percentage: 100,
        companies: ['Market trends', 'Liquidity studies', 'Sector analysis']
      }
    ],
    contact: {
      email: 'research@unlistedplatform.com',
      scheduleCall: false
    }
  }
};

// Time slots for scheduling
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

// Timezone options
const TIMEZONES = [
  'IST (India Standard Time)',
  'GMT (Greenwich Mean Time)',
  'EST (Eastern Standard Time)',
  'PST (Pacific Standard Time)',
  'CET (Central European Time)'
];

const Research: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedReport, setSelectedReport] = useState<ResearchReport | null>(null);
  const [selectedAnalyst, setSelectedAnalyst] = useState<AnalystProfile | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState<CallScheduleForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    purpose: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'IST (India Standard Time)',
    callType: 'video',
    agenda: ''
  });

  // Filtered reports
  const filteredReports = useMemo(() => {
    if (activeCategory === 'all') return RESEARCH_REPORTS;
    return RESEARCH_REPORTS.filter(r => r.type === activeCategory);
  }, [activeCategory]);

  // Open full report modal
  const openFullReport = (report: ResearchReport) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  // Open analyst profile modal
  const openAnalystProfile = (analystName: string) => {
    const analyst = ANALYST_PROFILES[analystName];
    if (analyst) {
      setSelectedAnalyst(analyst);
      setIsAnalystModalOpen(true);
      setActiveTab('profile');
    }
  };

  // Open schedule modal
  const openScheduleModal = () => {
    setIsScheduleModalOpen(true);
    // Pre-fill analyst name in purpose if available
    if (selectedAnalyst) {
      setScheduleForm(prev => ({
        ...prev,
        purpose: `Discussion with ${selectedAnalyst.name} - ${selectedAnalyst.specialization}`
      }));
    }
  };

  // Close modals
  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
  };

  const closeAnalystModal = () => {
    setIsAnalystModalOpen(false);
    setSelectedAnalyst(null);
    setActiveTab('profile');
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setScheduleSuccess(false);
    // Reset form
    setScheduleForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      purpose: '',
      preferredDate: '',
      preferredTime: '',
      timezone: 'IST (India Standard Time)',
      callType: 'video',
      agenda: ''
    });
  };

  // Handle schedule form input changes
  const handleScheduleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle call type change
  const handleCallTypeChange = (type: 'video' | 'phone') => {
    setScheduleForm(prev => ({ ...prev, callType: type }));
  };

  // Handle schedule submission
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!scheduleForm.name || !scheduleForm.email || !scheduleForm.phone || !scheduleForm.preferredDate || !scheduleForm.preferredTime) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Scheduling call with:', {
      analyst: selectedAnalyst?.name,
      ...scheduleForm
    });

    // Show success message
    setScheduleSuccess(true);

    // In a real application, you would send this data to your backend
    // For now, we'll just show a success message
  };

  // Alert Handlers for other buttons
  const downloadReport = (title: string) => alert(`Downloading: ${title}\n\nThe PDF report will begin downloading shortly.`);
  const downloadFile = (name: string) => alert(`Downloading: ${name}\n\nSecure file link initialized.`);

  // Get reports by analyst
  const getAnalystReports = (analystName: string) => {
    return RESEARCH_REPORTS.filter(r => r.author === analystName);
  };

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isReportModalOpen) closeReportModal();
        if (isAnalystModalOpen) closeAnalystModal();
        if (isScheduleModalOpen) closeScheduleModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isReportModalOpen, isAnalystModalOpen, isScheduleModalOpen]);

  // Get detailed content for report
  const getReportDetails = (report: ResearchReport) => {
    const details: Record<number, { sections: Array<{ title: string; content: string }> }> = {
      1: {
        sections: [
          {
            title: "Executive Summary",
            content: "Boat (Imagine Marketing) has emerged as a market leader in consumer electronics with strong brand recognition among India's youth."
          },
          {
            title: "Business Overview",
            content: "Founded in 2015, Boat operates primarily in D2C space with products including wireless earphones, smartwatches, and accessories."
          },
          {
            title: "Financial Performance",
            content: `Revenue grew from ₹1,500 Cr (2021) to ₹4,200 Cr (2023) - 65% CAGR. EBITDA margins stable at 11-12%.`
          }
        ]
      },
      5: {
        sections: [
          {
            title: "Executive Summary",
            content: "HDFC Securities maintains strong position in Indian brokerage industry with focus on full-service offerings."
          }
        ]
      },
      8: {
        sections: [
          {
            title: "Executive Summary",
            content: "NSE dominates Indian equity derivatives market with over 90% market share and strong network effects."
          }
        ]
      }
    };

    return details[report.id] || {
      sections: [
        {
          title: "Full Report",
          content: "This report contains detailed analysis, financial insights, competitive positioning, and risk assessment for informed decision making."
        }
      ]
    };
  };

  // Helper function for coverage chart colors
  const getSectorColor = (index: number): string => {
    const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
    return colors[index % colors.length];
  };

  return (
    <>
      <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
        <main className="container mx-auto px-4 py-4 pt-4 md:pt-8">
          <div className="flex justify-start mb-8">
            <a
              href="/products/unlisted"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </a>
          </div>
          {/* Header Section */}
          <header className="mb-12 text-center">
            {/* Icon Section */}
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
                <BarChart3 className="w-8 h-8" />
              </div>
            </div>

            {/* Main Heading with Gradient Text */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Investment Research
            </h1>

            {/* Gradient Divider Line */}
            <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

            {/* Subtitle / Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              In-depth analysis and insights for informed investment decisions in unlisted markets
            </p>
          </header>

          {/* Categories */}
          <section className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'All Research', icon: <Globe className="w-4 h-4" /> },
                { id: 'company', label: 'Company Reports', icon: <Building className="w-4 h-4" /> },
                { id: 'industry', label: 'Industry Analysis', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'market', label: 'Market Trends', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'ipo', label: 'IPO Research', icon: <Award className="w-4 h-4" /> },
                { id: 'quarterly', label: 'Quarterly Updates', icon: <Calendar className="w-4 h-4" /> }
              ].map(cat => (
                <button
                  key={cat.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 ${activeCategory === cat.id
                      ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white border-transparent'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#2076C7] hover:text-[#2076C7]'
                    }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon}
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Reports Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#2076C7]" />
              Research Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map(report => (
                <div key={report.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6 border-b border-gray-100">
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-xs font-bold rounded-full mb-3">
                      {report.type.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{report.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {report.author}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{report.excerpt}</p>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {report.valuation !== 'N/A' && (
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-[#2F3D88]">{report.valuation}</div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mt-1">VALUATION</div>
                        </div>
                      )}
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className={`text-lg font-bold ${report.rating === 'Buy' || report.rating === 'Positive'
                            ? 'text-green-600'
                            : report.rating === 'Sell'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`}>
                          {report.rating}
                        </div>
                        <div className="text-xs text-gray-500 font-semibold uppercase mt-1">RATING</div>
                      </div>
                      {report.target !== 'N/A' && (
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-[#2076C7]">{report.target}</div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mt-1">TARGET PRICE</div>
                        </div>
                      )}
                      {report.upside !== 'N/A' && (
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-600">{report.upside}</div>
                          <div className="text-xs text-gray-500 font-semibold uppercase mt-1">UPSIDE</div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        onClick={() => openFullReport(report)}
                      >
                        <FileText className="w-4 h-4" /> Read Full
                      </button>
                      {/* <button
                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm flex items-center gap-2 hover:border-gray-400 transition-colors"
                        onClick={() => downloadReport(report.title)}
                      >
                        <Download className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Market Insights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#2076C7]" />
              Market Insights & Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#2F3D88] mb-3">Unlisted Market Performance Q3 2023</h3>
                <p className="text-gray-600 text-sm leading-relaxed">The unlisted market index gained 8.2% in Q3 2023, outperforming the Nifty 50 which gained 5.7%. Financial services and technology led the gains.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#2F3D88] mb-3">Rising Interest in Pre-IPO Investments</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Investor interest in pre-IPO opportunities has increased by 45% year-over-year, with average holding periods decreasing from 18 to 12 months.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#2F3D88] mb-3">ESOP Liquidity Trends</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Secondary market transactions for ESOPs have reached record levels, with ₹850 Cr traded in H1 2023 compared to ₹520 Cr in H1 2022.</p>
              </div>
            </div>
          </section>

          {/* Analysts Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#2076C7]" />
              Our Research Analysts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Satyen Mehta', role: 'Head of Research', spec: 'Financial Services & Tech', initial: 'S' },
                { name: 'Vinayak shivsharan', role: 'Senior Analyst', spec: 'Healthcare & Consumer', initial: 'R' },
                { name: 'Deepesh Singh', role: 'IPO Specialist', spec: 'Pre-IPO & Listing', initial: 'A' }
              ].map((a, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {a.initial}
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{a.name}</div>
                  <div className="text-sm text-gray-400 mb-3">{a.role}</div>
                  <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-6">
                    {a.spec}
                  </div>
                  <button
                    className="w-full py-3 border border-[#2076C7] text-[#2076C7] rounded-lg font-semibold text-sm hover:bg-[#2076C7] hover:text-white transition-all duration-200"
                    onClick={() => openAnalystProfile(a.name)}
                  >
                    View Reports
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Downloads Section */}
          {/* <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Download className="w-6 h-6 text-green-600" />
              Research Downloads
            </h2>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Unlisted Market Handbook 2023', size: 'PDF • 8.2 MB', icon: <FileText className="w-5 h-5" /> },
                  { name: 'Valuation Models Template', size: 'Excel • 4.5 MB', icon: <PieChart className="w-5 h-5" /> },
                  { name: 'Investor Presentation Template', size: 'PPT • 6.1 MB', icon: <BarChart3 className="w-5 h-5" /> },
                  { name: 'Due Diligence Checklist', size: 'PDF • 3.2 MB', icon: <CheckCircle className="w-5 h-5" /> }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg flex items-center justify-center text-white">
                      {f.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{f.name}</div>
                      <div className="text-xs text-gray-400 font-medium">{f.size}</div>
                    </div>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      onClick={() => downloadFile(f.name)}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section> */}
        </main>
      </div>

      {/* Full Report Modal */}
      {isReportModalOpen && selectedReport && (
        <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
            <button onClick={closeReportModal} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-xs font-bold rounded-full">
                  {selectedReport.type.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {selectedReport.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedReport.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{selectedReport.excerpt}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{selectedReport.author}</div>
                <div className="text-sm text-gray-500">Research Analyst</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {selectedReport.valuation !== 'N/A' && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-lg font-bold text-[#2F3D88]">{selectedReport.valuation}</div>
                  <div className="text-sm text-gray-500 mt-1">Valuation</div>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <div className={`text-lg font-bold ${selectedReport.rating === 'Buy' || selectedReport.rating === 'Positive'
                    ? 'text-green-600'
                    : selectedReport.rating === 'Sell'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}>
                  {selectedReport.rating}
                </div>
                <div className="text-sm text-gray-500 mt-1">Rating</div>
              </div>
              {selectedReport.target !== 'N/A' && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-lg font-bold text-[#2076C7]">{selectedReport.target}</div>
                  <div className="text-sm text-gray-500 mt-1">Target</div>
                </div>
              )}
              {selectedReport.upside !== 'N/A' && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-lg font-bold text-green-600">{selectedReport.upside}</div>
                  <div className="text-sm text-gray-500 mt-1">Upside</div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {getReportDetails(selectedReport).sections.map((section, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-[#2076C7]">{index + 1}.</span> {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-500">Report ID: RS{selectedReport.id.toString().padStart(3, '0')}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  5 min read
                </div>
              </div>
              <div className="flex gap-3">
                {/* <button
                  className="px-6 py-2.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                  onClick={() => downloadReport(selectedReport.title)}
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button> */}
                <button
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                  onClick={closeReportModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analyst Profile Modal */}
      {isAnalystModalOpen && selectedAnalyst && (
        <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
            <button onClick={closeAnalystModal} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                {selectedAnalyst.initial}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedAnalyst.name}</h2>
                <div className="text-lg text-gray-600 mb-1">{selectedAnalyst.role}</div>
                <div className="text-sm text-gray-500 mb-4">{selectedAnalyst.specialization}</div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    SEBI: {selectedAnalyst.sebiRegNo}
                  </span>
                  <span className="text-sm text-gray-500">{selectedAnalyst.experience} experience</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-6 py-3 text-sm font-semibold ${activeTab === 'profile' ? 'text-gray-700 border-b-2 border-[#2076C7]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`px-6 py-3 text-sm font-semibold ${activeTab === 'reports' ? 'text-gray-700 border-b-2 border-[#2076C7]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('reports')}
              >
                Reports ({getAnalystReports(selectedAnalyst.name).length})
              </button>
              <button
                className={`px-6 py-3 text-sm font-semibold ${activeTab === 'performance' ? 'text-gray-700 border-b-2 border-[#2076C7]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('performance')}
              >
                Performance
              </button>
              <button
                className={`px-6 py-3 text-sm font-semibold ${activeTab === 'contact' ? 'text-gray-700 border-b-2 border-[#2076C7]' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                {/* Bio & Education */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Background</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedAnalyst.bio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Education</div>
                      <div className="text-gray-900 font-medium">{selectedAnalyst.education}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Certifications</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedAnalyst.certifications.map((cert, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coverage Universe */}
                {selectedAnalyst.coverageUniverse && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Coverage Universe</h3>
                    <div className="space-y-4">
                      {selectedAnalyst.coverageUniverse.map((sector, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{sector.sector}</span>
                            <span className="text-sm text-gray-500">{sector.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] h-2 rounded-full"
                              style={{ width: `${sector.percentage}%` }}
                            ></div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {sector.companies.slice(0, 3).map((company, cIdx) => (
                              <span key={cIdx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {company}
                              </span>
                            ))}
                            {sector.companies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                +{sector.companies.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  {getAnalystReports(selectedAnalyst.name).slice(0, 5).map((report, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                          {report.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">{report.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{report.excerpt}</p>
                      <div className="flex gap-4">
                        {report.valuation !== 'N/A' && (
                          <span className="text-sm text-gray-500">Valuation: {report.valuation}</span>
                        )}
                        {report.rating !== 'N/A' && (
                          <span className={`text-sm font-semibold ${report.rating === 'Buy' || report.rating === 'Positive'
                              ? 'text-green-600'
                              : report.rating === 'Sell'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                            }`}>
                            Rating: {report.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && selectedAnalyst.performance && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-2">Accuracy Rate</div>
                    <div className="text-2xl font-bold text-blue-700">{selectedAnalyst.performance.accuracy}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="text-xs text-green-500 uppercase font-semibold mb-2">Avg Holding Period</div>
                    <div className="text-2xl font-bold text-green-700">{selectedAnalyst.performance.avgHoldingPeriod}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="text-xs text-purple-500 uppercase font-semibold mb-2">Sector Coverage</div>
                    <div className="text-2xl font-bold text-purple-700">{selectedAnalyst.coverageUniverse.length}</div>
                  </div>
                </div>
                {selectedAnalyst.performance.sectorReturns && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Sector Returns</h4>
                    <div className="space-y-3">
                      {selectedAnalyst.performance.sectorReturns.map((sector, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{sector.sector}</span>
                          <span className={`font-bold ${sector.return.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {sector.return}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg flex items-center justify-center text-white">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase font-semibold">Email</div>
                      <div className="text-gray-900 font-medium">{selectedAnalyst.contact.email}</div>
                    </div>
                  </div>
                  {selectedAnalyst.contact.linkedIn && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-semibold">LinkedIn</div>
                        <div className="text-blue-600 font-medium">{selectedAnalyst.contact.linkedIn}</div>
                      </div>
                    </div>
                  )}
                </div>
                {selectedAnalyst.contact.scheduleCall && (
                  <button
                    className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    onClick={openScheduleModal}
                  >
                    <Calendar className="w-5 h-5" /> Schedule a Call
                  </button>
                )}
              </div>
            )}

            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Total Reports: <span className="font-semibold text-[#2076C7]">{getAnalystReports(selectedAnalyst.name).length}</span>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-6 py-2.5 border border-[#2076C7] text-[#2076C7] rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                  onClick={() => window.location.href = `mailto:${selectedAnalyst.contact.email}`}
                >
                  <Mail className="w-4 h-4" /> Send Email
                </button>
                <button
                  className="px-6 py-2.5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  onClick={closeAnalystModal}
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule a Call Modal */}
      {isScheduleModalOpen && selectedAnalyst && (
        <div className="fixed inset-0 z-[1001] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <button onClick={closeScheduleModal} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>

            {!scheduleSuccess ? (
              <div className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Call</h2>
                  <p className="text-gray-600">Book a consultation with <span className="font-semibold text-[#2076C7]">{selectedAnalyst.name}</span></p>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mt-2">
                    {selectedAnalyst.role}
                  </div>
                </div>

                {/* Analyst Info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-lg flex items-center justify-center text-white text-lg font-bold">
                      {selectedAnalyst.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{selectedAnalyst.name}</div>
                      <div className="text-sm text-gray-600">{selectedAnalyst.specialization}</div>
                    </div>
                  </div>
                </div>

                {/* Schedule Form */}
                <form onSubmit={handleScheduleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={scheduleForm.name}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={scheduleForm.email}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={scheduleForm.phone}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={scheduleForm.company}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Call Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Call *
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      value={scheduleForm.purpose}
                      onChange={handleScheduleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Briefly describe what you'd like to discuss"
                      required
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={scheduleForm.preferredDate}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={scheduleForm.preferredTime}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      >
                        <option value="">Select a time</option>
                        {TIME_SLOTS.map((time, idx) => (
                          <option key={idx} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone *
                      </label>
                      <select
                        name="timezone"
                        value={scheduleForm.timezone}
                        onChange={handleScheduleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      >
                        {TIMEZONES.map((tz, idx) => (
                          <option key={idx} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Agenda */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agenda/Topics to Discuss
                    </label>
                    <textarea
                      name="agenda"
                      value={scheduleForm.agenda}
                      onChange={handleScheduleInputChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="List specific topics or questions you'd like to discuss"
                    />
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800">
                          By scheduling this call, you agree to receive a confirmation email and follow-up communication from our team.
                          Our analysts' time is valuable, please ensure you're prepared for the discussion.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Schedule Call
                    </button>
                    <button
                      type="button"
                      onClick={closeScheduleModal}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Message */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Scheduled Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Your call with <span className="font-semibold text-[#2076C7]">{selectedAnalyst.name}</span> has been scheduled.
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Analyst:</span>
                      <span className="font-semibold text-gray-900">{selectedAnalyst.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-semibold text-gray-900">{scheduleForm.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-semibold text-gray-900">{scheduleForm.preferredTime} ({scheduleForm.timezone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Call Type:</span>
                      <span className="font-semibold text-gray-900">{scheduleForm.callType === 'video' ? 'Video Call' : 'Phone Call'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm text-blue-800 font-medium mb-1">What happens next?</p>
                      <p className="text-sm text-blue-700">
                        You'll receive a confirmation email within 15 minutes with calendar invitation and call details.
                        Our team may reach out for additional information if needed.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeScheduleModal}
                  className="w-full py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS for line clamping */}
      <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </>
  );
};

export default Research;