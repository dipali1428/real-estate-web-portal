
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Handshake, 
  IndianRupee, 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Trophy, 
  Users, 
  AlertTriangle, 
  Briefcase, 
  Clock, 
  ChevronRight,
  UserMinus,
  Quote, UserRoundCheck,SquareStack,VectorSquare
} from 'lucide-react';

// --- Types & Data ---
type JobCategory = 'all' | 'advisory' | 'operations' | 'sales' | 'pune';

interface Job {
  id: number;
  title: string;
  badge?: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  categories: string[];
}

const JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Financial Advisor",
    badge: "Featured",
    location: "Pune, MH",
    type: "Full-time",
    experience: "2+ years experience",
    description: "Provide comprehensive financial advisory services to clients across loans, investments, and insurance products. Build and manage client relationships while achieving sales targets.",
    categories: ["advisory", "pune"]
  },
  {
    id: 2,
    title: "Operations Manager",
    badge: "Urgent",
    location: "Pune, MH",
    type: "Full-time",
    experience: "2+ years experience",
    description: "Oversee branch operations, ensure process efficiency, manage teams, and maintain compliance with financial regulations across multiple service verticals.",
    categories: ["operations"]
  },
  {
    id: 3,
    title: "Business Development Executive",
    location: "Pune, MH",
    type: "Full-time",
    experience: "2+ years experience",
    description: "Expand our partner network, acquire new DSAs, and drive business growth through strategic partnerships and client acquisition initiatives.",
    categories: ["sales"]
  },
  {
    id: 4,
    title: "Insurance Specialist",
    location: "Pune, MH",
    type: "Full-time",
    experience: "2+ years experience",
    description: "Specialize in insurance products (Life, Health, Motor, Corporate). Provide expert advice, manage client portfolios, and achieve insurance sales targets.",
    categories: ["advisory"]
  }
];

export default function CareersContent() {
  const [activeFilter, setActiveFilter] = useState<JobCategory>('all');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(JOBS);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredJobs(JOBS);
    } else {
      setFilteredJobs(JOBS.filter(job => job.categories.includes(activeFilter)));
    }
  }, [activeFilter]);

  return (
    <div className="bg-white text-[#333333] selection:bg-[#e8f2fc]">
      
      {/* Hero Section */}
      <section className="relative py-24 text-center overflow-hidden border-b border-gray-100">
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
       Build Your Career.<br /> Empower Financial Future.
                    </h1>
          {/* <h1 className="text-4xl md:text-6xl font-bold text-[#2076C7] mb-6 leading-tight">
            Build Your Career.<br /> Empower Financial Futures.
          </h1> */}
          <p className="text-lg md:text-xl text-[#666666] max-w-3xl mx-auto mb-10 leading-relaxed">
            Join Infinity Arthvishva—where your growth fuels the prosperity of families and businesses across India. Be part of a trusted team that's simplifying finance.
          </p> 
          
					<div className={`flex flex-col sm:flex-row justify-center gap-4 transition-opacity duration-1000 delay-300 `}>
                        <a href='#job-listings'>
                            <button className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}>

                                <span className="relative z-10">View Open Positions</span>

                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>
                        </a>
                        <a href='#why-join'>
                            <button className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg" style={{ color: '#2076C7', borderColor: '#2076C7' }}>


                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Why Join Us
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>

                            </button>
                        </a>
                    </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="why-join" className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Why Join Infinity Arthvishva?
                    </h2>
            
            <p className="text-[#666666] max-w-2xl mx-auto">We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Target size={48} />} 
              title="Purpose-Driven Impact" 
              desc="Directly contribute to financial stability and growth for families and businesses across India." 
            />
            <ValueCard 
              icon={<TrendingUp size={48} />} 
              title="Continuous Growth" 
              desc="Access ongoing training and development. Grow with a company expanding across 20+ cities." 
            />
            <ValueCard 
              icon={<Handshake size={48} />} 
              title="Culture of Trust" 
              desc="Join a team built on a strong foundation of trust, expertise, and innovation." 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Employee Benefits & Growth
                    </h2>
            
            <p className="text-[#666666]">We invest in our team's well-being and professional development.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitItem icon={<Quote size={24} />} title="Competitive Compensation" desc="Attractive, market-aligned salary structures designed to attract and retain top talent.Transparent pay practices that ensure fairness, stability, and long-term growth.." />
            <BenefitItem icon={<GraduationCap size={24} />} title="Career Growth Pathways" desc="Clear role progression with defined growth milestones.Opportunities to take on higher responsibilities and leadership roles." />
            <BenefitItem icon={<VectorSquare size={24} />} title="Supportive Work Culture" desc="A collaborative and inclusive workplace that values teamwork.Open communication and respect-driven professional environment." />
            <BenefitItem icon={<UserRoundCheck size={24} />} title="Leadership Exposure" desc="Direct interaction with experienced industry leaders and mentors.Hands-on exposure to strategic decision-making processes.wards 2025)." />
            <BenefitItem icon={<Users size={24} />} title="Employee Empowerment" desc="Autonomy to take ownership of work and drive outcomes.A culture that encourages ideas, innovation, and accountability." />
            <BenefitItem icon={<SquareStack size={24} />} title="Technology-Driven Environment" desc="Work with modern tools and digital platforms that enhance efficiency.Exposure to innovative systems supporting smarter and faster operations.." />

          </div>
        </div>
      </section>

      {/* Scam Warning Alert */}
      <div className="max-w-7xl mx-auto px-5 mb-20">
        <div className="bg-[#fff8e1] border-l-4 border-[#ff9800] p-6 rounded-r-lg shadow-sm">
          <div className="flex items-center gap-3 text-[#e65100] font-bold mb-2">
            <AlertTriangle size={20} />
            <h3>Career Opportunity Alert</h3>
          </div>
          <p className="text-[#5d4037] text-sm md:text-base leading-relaxed">
            Infinity Arthvishva conducts all recruitment directly through our official HR team. Official communication will only come from email address ending in <strong>hr@infinityarthvishva.com</strong>. We never ask for money during the recruitment process.
          </p>
        </div>
      </div>

      {/* Job Listings Section */}
      <section id="job-listings" className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
           Current Openings
                    </h2>
            <p className="text-[#666666]">Join our growing team across various domains and locations.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(['all', 'advisory', 'operations', 'sales'] as JobCategory[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-full font-semibold border transition-all text-sm ${
                  activeFilter === f 
                  ? "bg-[#2076C7] text-white border-[#2076C7]" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#2076C7] hover:text-[#2076C7]"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} {f === 'all' ? 'Positions' : ''}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#2076C7] group-hover:text-[#1CADA3] transition-colors">{job.title}</h3>
                  {job.badge && (
                    <span className="bg-[#1CADA3] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[#666666] mb-6 font-medium">
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#2076C7]"/> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase size={14} className="text-[#2076C7]"/> {job.type}</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#2076C7]"/> {job.experience}</div>
                </div>
                <p className="text-[#666666] mb-8 text-sm leading-relaxed">{job.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-gray-600">Kindly mail at</span>
                <a 
                  href="mailto:hr@infinityarthvishva.com" 
                  className="text-[#2076C7] font-bold hover:text-[#1CADA3] transition-colors flex items-center gap-1"
                >
                  hr@infinityarthvishva.com
                  <ChevronRight size={18} />
                </a>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Life at Infinity Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
       Life at Infinity Arthvishva
                    </h2>
            <p className="text-[#666666]">Join a growing network that's empowering financial futures across India.</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-sans text-center mb-16">
            <StatItem value="20+" label="Branches Across India" />
            <StatItem value="127+" label="Cities Covered" />
            <StatItem value="2,700+" label="Active DSA & Partners" />
            <StatItem value="1" label="ET Business Award 2025" />
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <GalleryImage src="\Team\Image-1.jpeg" alt="Team Collaboration" />
            <GalleryImage src="\Team\Image-6.jpeg" alt="Celebration Event" />
            <GalleryImage src="\Team\Image-2.jpeg" alt="Training Session" />
            <GalleryImage src="\Team\Image-3.jpeg" alt="Office Environment" />
            <GalleryImage src="\Team\Image-4.jpeg" alt="Celebration Event" />
            <GalleryImage src="\Team\Image-5.jpeg" alt="Celebration Event" />
          </div>
        </div>
      </section>

      {/* Hiring Process Steps */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
              Our Hiring Process
                    </h2>
            <p className="text-[#666666]">Straightforward and transparent steps to join our team.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <ProcessStep num="1" title="Application" desc="HR reviews your qualifications against role requirements." />
            <ProcessStep num="2" title="Screening" desc="A brief conversation to discuss your interest." />
            <ProcessStep num="3" title="Interviews" desc="1-2 rounds with hiring managers and general manager." />
            <ProcessStep num="4" title="Onboarding" desc="Receive an offer letter and begin your journey with us!" />
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Sub-Components ---

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-10 rounded-lg text-center shadow-sm border-t-4 border-[#2076C7] hover:border-[#1CADA3] transition-all hover:-translate-y-2">
      <div className="text-[#2076C7] flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function BenefitItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-white border-l-4 border-[#1CADA3] shadow-sm rounded-r-lg hover:shadow-md transition-shadow">
      <div className="text-[#1CADA3] mt-1 shrink-0">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-800 mb-1 text-sm md:text-base">{title}</h4>
        <p className="text-xs md:text-sm text-[#666666] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-[#2076C7] mb-2">{value}</div>
      <div className="text-[#666666] font-semibold text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="h-64 rounded-lg overflow-hidden group">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
    </div>
  );
}

function ProcessStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-[#2076C7] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-md group-hover:bg-[#1CADA3] transition-colors">
        {num}
      </div>
      <h4 className="font-bold mb-2 text-[#333333]">{title}</h4>
      <p className="text-xs text-[#666666] leading-relaxed px-4">{desc}</p>
    </div>
  );
}