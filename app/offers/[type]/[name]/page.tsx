"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense, useRef, cloneElement } from 'react';
import {
  CheckCircle, Clock, ShieldCheck, FileText, Users,
  TrendingUp, ArrowLeft, Home, IndianRupee, Briefcase,
  Factory, Car, Landmark, GraduationCap, Building,
  Globe, Heart, Shield, Banknote, Award, Zap, Star, Plane, PieChart, X, User, Mail, Smartphone, Wallet, Ship, Anchor,
  Flame, HardHat, Building2, Trees, Gem, Landmark as Bank, Key, ShoppingBag,
  Stethoscope, Activity, Truck, MapPin, Search, Warehouse, Coins, BadgePercent,
  PiggyBank, BarChart3, Receipt, Scale
} from 'lucide-react';

// Import services and data
import { getOfferByKey } from '@/app/data/offers';
import { AuthService } from "@/app/services/authService";

/**
 * 🔹 COMPREHENSIVE HERO GRAPHIC COMPONENT
 * Renders unique animated graphics for every single offer type.
 */
const ComprehensiveHeroGraphic = ({ slug }: { slug: string }) => {
  const getGraphicConfig = () => {
    switch (slug) {
      // LOANS
      case 'home-loan':
        return { main: <Home />, orbs: [<Key />, <Bank />, <MapPin />, <FileText />], theme: "blue", accessory: <Key />, accColor: "cyan" };
      case 'personal-loan':
        return { main: <Wallet />, orbs: [<ShoppingBag />, <Plane />, <Smartphone />, <Zap />], theme: "sky", accessory: <IndianRupee />, accColor: "gold" };
      case 'vehicle-loan':
        return { main: <Car />, orbs: [<Key />, <Shield />, <MapPin />, <Zap />], theme: "indigo", accessory: <Zap />, accColor: "orange" };
      case 'business-loan':
        return { main: <Building2 />, orbs: [<TrendingUp />, <Users />, <Briefcase />, <Banknote />], theme: "blue", accessory: <TrendingUp />, accColor: "blue" };
      case 'sme-loan':
        return { main: <Factory />, orbs: [<BarChart3 />, <Users />, <Truck />, <ShieldCheck />], theme: "slate", accessory: <Truck />, accColor: "slate" };
      case 'mortgage-loan':
        return { main: <Landmark />, orbs: [<Home />, <Scale />, <FileText />, <Key />], theme: "indigo", accessory: <Home />, accColor: "blue" };
      case 'education-loan':
        return { main: <GraduationCap />, orbs: [<Globe />, <Award />, <BookIcon />, <Zap />], theme: "violet", accessory: <Award />, accColor: "purple" };
      case 'loan-against-securities':
        return { main: <Coins />, orbs: [<PieChart />, <TrendingUp />, <Shield />, <Banknote />], theme: "emerald", accessory: <BarChart3 />, accColor: "emerald" };

      // INSURANCE
      case 'life-insurance':
        return { main: <Heart />, orbs: [<Users />, <Shield />, <Star />, <FileText />], theme: "pink", accessory: <Shield />, accColor: "rose" };
      case 'health-insurance':
        return { main: <Stethoscope />, orbs: [<Activity />, <Heart />, <ShieldCheck />, <PlusIcon />], theme: "green", accessory: <Activity />, accColor: "red" };
      case 'motor-insurance':
        return { main: <Car />, orbs: [<Shield />, <Zap />, <Truck />, <Clock />], theme: "blue", accessory: <ShieldCheck />, accColor: "indigo" };
      case 'travel-insurance':
        return { main: <Plane />, orbs: [<Globe />, <MapPin />, <Briefcase />, <Shield />], theme: "indigo", accessory: <Globe />, accColor: "cyan" };
      case 'fire-insurance':
        return { main: <Flame />, orbs: [<Home />, <Shield />, <Warehouse />, <Zap />], theme: "orange", accessory: <Shield />, accColor: "red" };
      case 'cattle-insurance':
        return { main: <Trees />, orbs: [<Heart />, <Shield />, <Activity />, <Zap />], theme: "emerald", accessory: <Heart />, accColor: "green" };
      case 'marine-insurance':
        return { main: <Ship />, orbs: [<Anchor />, <Globe />, <Shield />, <Warehouse />], theme: "blue", accessory: <Anchor />, accColor: "blue" };
      case 'corporate-insurance':
        return { main: <Building2 />, orbs: [<Briefcase />, <HardHat />, <Users />, <ShieldCheck />], theme: "slate", accessory: <Briefcase />, accColor: "slate" };
      case 'loan-protector-plan':
        return { main: <ShieldCheck />, orbs: [<Banknote />, <Home />, <Users />, <Clock />], theme: "teal", accessory: <Shield />, accColor: "teal" };

      // MUTUAL FUNDS & INVESTMENTS
      case 'mutual-fund':
        return { main: <PieChart />, orbs: [<TrendingUp />, <Coins />, <Search />, <Shield />], theme: "teal", accessory: <TrendingUp />, accColor: "emerald" };
      case 'wealth-management':
        return { main: <Gem />, orbs: [<Award />, <TrendingUp />, <BarChart3 />, <Bank />], theme: "amber", accessory: <Star />, accColor: "gold" };
      case 'pms-aif':
        return { main: <Briefcase />, orbs: [<TrendingUp />, <Gem />, <Building2 />, <Search />], theme: "purple", accessory: <Gem />, accColor: "violet" };
      case 'fixed-deposit':
        return { main: <PiggyBank />, orbs: [<Clock />, <ShieldCheck />, <Banknote />, <BadgePercent />], theme: "blue", accessory: <Clock />, accColor: "indigo" };
      case 'bonds':
        return { main: <Receipt />, orbs: [<Award />, <Landmark />, <Shield />, <Banknote />], theme: "slate", accessory: <Award />, accColor: "slate" };

      // REAL ESTATE
      case 'real-estate-investments':
        return { main: <Building />, orbs: [<Home />, <MapPin />, <Building2 />, <Key />], theme: "blue", accessory: <MapPin />, accColor: "emerald" };

      default:
        return { main: <IndianRupee />, orbs: [<Zap />, <Shield />, <Star />, <TrendingUp />], theme: "blue", accessory: <IndianRupee />, accColor: "blue" };
    }
  };

  const config = getGraphicConfig();

  const themeColors: any = {
    blue: "from-blue-500 to-blue-700", sky: "from-sky-400 to-sky-600",
    indigo: "from-indigo-500 to-indigo-700", slate: "from-slate-500 to-slate-700",
    violet: "from-violet-500 to-violet-700", emerald: "from-emerald-500 to-emerald-700",
    pink: "from-pink-400 to-pink-600", green: "from-green-500 to-green-700",
    orange: "from-orange-400 to-orange-600", teal: "from-teal-400 to-teal-600",
    amber: "from-amber-400 to-amber-600", purple: "from-purple-500 to-purple-700"
  };

  // Specific colors for the accessory circle
  const accColors: any = {
    indigo: "from-indigo-600 to-cyan-600",
    gold: "from-amber-400 to-yellow-600",
    orange: "from-orange-500 to-red-600",
    blue: "from-blue-600 to-cyan-500",
    slate: "from-slate-600 to-gray-700",
    purple: "from-purple-600 to-violet-600",
    emerald: "from-emerald-500 to-teal-600",
    rose: "from-rose-500 to-pink-600",
    red: "from-red-500 to-rose-600",
    cyan: "from-cyan-500 to-blue-500",
    green: "from-green-500 to-emerald-600",
    teal: "from-teal-500 to-cyan-600",
    violet: "from-violet-600 to-fuchsia-600"
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center select-none">
      {/* Background Pulse Glow */}
      <div className={`absolute w-64 h-64 bg-linear-to-br ${themeColors[config.theme]} opacity-10 rounded-full blur-3xl animate-pulse`}></div>

      {/* Dotted path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 500">
        <path d="M100,250 Q100,100 250,100 T400,250 T250,400 T100,250" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" className="text-gray-400" />
      </svg>

      {/* Floating Satellite Orbs */}
      {[
        { pos: "top-10 left-10 md:top-20 md:left-20", delay: "0s" },
        { pos: "top-0 right-10 md:top-10 md:right-32", delay: "1.5s" },
        { pos: "bottom-10 left-0 md:bottom-20 md:left-10", delay: "3s" },
        { pos: "bottom-0 right-10 md:bottom-10 md:right-20", delay: "4.5s" },
      ].map((style, idx) => (
        <div key={idx} className={`absolute ${style.pos} z-30 animate-float`} style={{ animationDelay: style.delay }}>
          <div className="bg-white p-4 md:p-5 rounded-full shadow-2xl border border-gray-100 flex items-center justify-center transition-transform hover:scale-110">
            <div className="text-gray-500">
              {cloneElement(config.orbs[idx] as React.ReactElement, { size: 28 } as any)}
            </div>
          </div>
        </div>
      ))}

      {/* Central Illustration Area */}
      <div className="relative z-20">
        <div className={`w-40 h-40 md:w-56 md:h-56 bg-linear-to-br ${themeColors[config.theme]} rounded-3xl shadow-2xl flex items-center justify-center text-white rotate-6 transition-transform hover:rotate-0 duration-500`}>
          <div className="-rotate-6">
            {cloneElement(config.main as React.ReactElement, { size: 80, strokeWidth: 1.5 } as any)}
          </div>
        </div>

        {/* Dynamic Accessory Circle with Unique Colors per case */}
        <div className={`absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 bg-linear-to-br ${accColors[config.accColor] || accColors.blue} rounded-full border-4 md:border-8 border-white shadow-xl flex items-center justify-center animate-bounce`}>
          {cloneElement(config.accessory as React.ReactElement, { className: "text-white", size: 40 } as any)}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// Sub-icons for graphics
const PlusIcon = () => <div className="font-bold text-xl text-green-500">+</div>;
const BookIcon = () => <FileText />;

/**
 * 🔹 Define the interface for the dynamic Product Forms 
 */
interface FormProps {
  onClose: () => void;
  prefilledData?: {
    name: string;
    email: string;
    mobile: string;
  };
}

// Mapping of offer names to form component paths
const offerToFormMap: Record<string, string> = {
  'home-loan': 'homeloanform',
  'personal-loan': 'personaloanform',
  'business-loan': 'businessloanform',
  'education-loan': 'educationloanform',
  'vehicle-loan': 'vahicleloanform',
  'mortgage-loan': 'mortgageloanform',
  'sme-loan': 'smeloanform',
  'nrp-loan': 'nrploanform',
  'loan-against-securities': 'loanagainstsecuritiesform',
  'bonds': 'bondsfrom',
  'mutual-fund': 'MutualFundForm',
  'pms-aif': 'PMSAIFForm',
  'wealth-management': 'WealthManagementForm',
  'debtcapitalmarket': 'debtcapitalmarketform',
  'home-insurance': 'fireinsuranceform',
  'motor-insurance': 'motorinsuranceform',
  'life-insurance': 'lifeinsuranceform',
  'health-insurance': 'healthisurancform',
  'travel-insurance': 'TravelInsuranceForm',
  'fire-insurance': 'fireinsuranceform',
  'corporate-insurance': 'corporateinsuranceform',
  'marine-insurance': 'marineinsuranceform',
  'cattle-insurance': 'cattleinsuranceform',
  'loan-protector-plan': 'loanprotectorform',
  'real-estate-investments': 'realestate',
  'fixed-deposit': 'fixeddeposit',
};

// Lazy load form components
const formComponents: Record<string, React.ComponentType<FormProps>> = {
  'homeloanform': lazy(() => import('@/app/component/products/forms/loan/homeloanform')),
  'personaloanform': lazy(() => import('@/app/component/products/forms/loan/personaloanform')),
  'businessloanform': lazy(() => import('@/app/component/products/forms/loan/businessloanform')),
  'educationloanform': lazy(() => import('@/app/component/products/forms/loan/educationloanform')),
  'vahicleloanform': lazy(() => import('@/app/component/products/forms/loan/vahicleloanform')),
  'mortgageloanform': lazy(() => import('@/app/component/products/forms/loan/mortgageloanform')),
  'smeloanform': lazy(() => import('@/app/component/products/forms/loan/smeloanform')),
  'nrploanform': lazy(() => import('@/app//component/products/forms/loan/nrploanform')),
  'loanagainstsecuritiesform': lazy(() => import('@/app/component/products/forms/loan/loanagainstsecuritiesform')),
  'bondsfrom': lazy(() => import('@/app/component/products/forms/investments/bondsfrom')),
  'MutualFundForm': lazy(() => import('@/app/component/products/forms/mutualFund/MutualFundForm')),
  'PMSAIFForm': lazy(() => import('@/app/component/products/forms/investments/PMSAIFForm')),
  'WealthManagementForm': lazy(() => import('@/app/component/products/forms/investments/WealthManagementForm')),
  'debtcapitalmarketform': lazy(() => import('@/app/dashboard/leadmanagement/forms/debtcapitalmarketform')),
  'fireinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/fireinsuranceform')),
  'motorinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/motorinsuranceform')),
  'lifeinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/lifeinsuranceform')),
  'healthisurancform': lazy(() => import('@/app/component/products/forms/insurance/healthisurancform')),
  'TravelInsuranceForm': lazy(() => import('@/app/component/products/forms/insurance/TravelInsuranceForm')),
  'corporateinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/corporateinsuranceform')),
  'marineinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/marineinsuranceform')),
  'cattleinsuranceform': lazy(() => import('@/app/component/products/forms/insurance/cattleinsuranceform')),
  'loanprotectorform': lazy(() => import('@/app/component/products/forms/insurance/loanprotectorform')),
  'realestate': lazy(() => import('@/app/component/products/forms/realEstate/realestate')),
  'fixeddeposit': lazy(() => import('@/app/component/products/forms/investments/fixedDeposit')),
};

function getFormComponent(offerName: string): React.ComponentType<FormProps> | null {
  const formName = offerToFormMap[offerName];
  if (formName && formComponents[formName]) return formComponents[formName];
  return null;
}

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;

  const [isVerifying, setIsVerifying] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [verifiedUserData, setVerifiedUserData] = useState({ name: "", email: "", mobile: "" });

  const foundOffer = getOfferByKey(name);

  const offer = foundOffer || {
    title: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    category: 'General',
    icon: 'DollarSign',
    description: 'Offer details coming soon',
    overview: 'Detailed information about this financial offer.',
    features: ['Customized solutions', 'Competitive rates', 'Quick processing'],
    benefits: [{ title: 'Quality Service', description: 'Professional service with dedicated support.' }],
    eligibility: ['Age 21-65 years', 'Valid documentation'],
    documents: ['Identity proof', 'Address proof', 'Income proof'],
    offerDetails: { interestRate: 'Contact for details', maxLoanAmount: 'As per eligibility', processingFee: 'Standard' }
  };

  useEffect(() => {
    const title = `${offer.title} - ${offer.category} | Financial Services`;
    document.title = title;
    const description = offer.description || `Explore ${offer.title} - ${offer.overview?.substring(0, 150)}...`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    const canonicalUrl = `https://yourdomain.com/offers/${name}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);
    else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }

    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: offer.title,
      description: description,
      provider: { '@type': 'Organization', name: 'Financial Services', url: 'https://yourdomain.com' },
      serviceType: offer.category
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => { if (script.parentNode === document.head) document.head.removeChild(script); };
  }, [offer, name]);

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yourdomain.com' },
      { '@type': 'ListItem', position: 2, name: 'Offers', item: 'https://yourdomain.com/offers' },
      { '@type': 'ListItem', position: 3, name: offer.title, item: `https://yourdomain.com/offers/${name}` },
    ],
  };

  const handleBackToOffers = () => router.push('/#services');
  const handleApply = () => setIsVerifying(true);

  const handleVerificationSuccess = (userData: { name: string, email: string, mobile: string }) => {
    setVerifiedUserData(userData);
    setIsVerifying(false);
    setIsFormOpen(true);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">

        {/* FIXED BACK BUTTON */}
        <div className="fixed z-50 top-17 left-1 md:top-23 md:left-4">
          <button onClick={handleBackToOffers} aria-label="Back to Offers" className="md:hidden group flex items-center gap-2 p-2 text-gray-500">
            <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </div>
          </button>
          <button onClick={handleBackToOffers} className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white shadow-lg">
            <ArrowLeft className="w-4 h-4" /> Back to Offers
          </button>
        </div>

        {/* TOP RIGHT APPLY BUTTON */}
        <div className="fixed z-50 top-17 right-1 md:top-23 md:right-4">
          <button onClick={handleApply} className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-bold text-white bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full md:rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
            Apply Now <Zap className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* --- MAIN HEADER SECTION (RE-DESIGNED TO MATCH IMAGE) --- */}
        <header className="relative w-full overflow-hidden pt-24 md:pt-32 pb-16 bg-linear-to-b from-[#e1f0ff] via-[#f7faff] to-white">
          <div className="container mx-auto px-6 relative z-10">

            {/* Custom Breadcrumb matching reference image style */}
            <div className="flex items-center gap-2 text-sm font-medium mb-8">
              <span className="text-gray-500">Home</span>
              <span className="text-gray-400">&gt;</span>
              <span className="text-[#1CADA3]">{offer.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Column: Text & CTA */}
              <div className="w-full lg:w-1/2 text-left space-y-8">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-700 leading-[1.1]">
                  Get Closer to Your Goals with a <span className="text-[#2076C7]">Instant {offer.title}</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
                  {offer.description || `Explore flexible ${offer.title} options tailored to meet your unique financial needs.`}
                </p>

                <div className="flex flex-wrap gap-5 pt-4">
                  <button onClick={handleApply} className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full md:rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all">
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Graphic (The floating character/icon logic) */}
              <div className="w-full lg:w-1/2">
                <ComprehensiveHeroGraphic slug={name} />
              </div>
            </div>
          </div>

          {/* Bottom Wave Transition Shape */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-full h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFFFFF"></path>
            </svg>
          </div>
        </header>

        <main className="container mx-auto px-4 py-4 pt-12">
          {/* Quick Stats */}
          <section className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(offer.offerDetails).slice(0, 3).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-lg md:text-xl font-bold text-[#2076C7] mb-1">{value as string}</div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Two Column Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100"><FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">What is {offer.title}?</h2>
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">{offer.overview}</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-2 md:space-y-3">
                {offer.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-100"><TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" /></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Benefits of {offer.title}</h2>
              </div>
              <div className="space-y-4 md:space-y-6">
                {offer.benefits.map((benefit, index) => (
                  <article key={index} className="p-4 rounded-xl bg-linear-to-r from-gray-50 to-white border border-gray-100">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Eligibility & Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-100"><ShieldCheck className="w-6 h-6 text-orange-600" /></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Eligibility Criteria</h2>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {offer.eligibility.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2076C7] font-bold text-sm">{index + 1}</div>
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-100"><FileText className="w-6 h-6 text-red-600" /></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Required Documents</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offer.documents.map((doc, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1CADA3]"></div>
                    <span className="text-gray-700 text-sm md:text-base">{doc}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Process Overview */}
          <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-100"><Clock className="w-6 h-6 text-blue-600" /></div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Process Overview</h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#2076C7] to-[#1CADA3] hidden md:block"></div>
              <div className="space-y-8">
                {[
                  'Initial consultation and requirement assessment',
                  'Document submission and verification',
                  'Approval process and terms finalization',
                  'Agreement signing and formalities',
                  'Service activation or disbursement',
                  'Ongoing support and service management'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-6">
                    <div className="relative z-10">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold md:text-xl">{index + 1}</div>
                    </div>
                    <div className="flex-1 pt-2 md:pt-4">
                      <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-1">Step {index + 1}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {['How to apply?', 'What is the processing time?', 'Are there any hidden charges?'].map((q, i) => (
                <details key={i} className="group p-4 border border-gray-200 rounded-lg cursor-pointer">
                  <summary className="flex justify-between items-center list-none font-semibold text-gray-800">{q} <span className="text-xs">▼</span></summary>
                  <p className="mt-3 text-gray-600 text-sm">Contact us or apply online for details specific to your profile.</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 text-center">
            <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">Apply now for {offer.title} and get expert guidance throughout the process.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleApply} className="px-8 py-3 bg-white text-[#2076C7] font-semibold rounded-lg hover:bg-gray-100 transition-colors">Apply Now</button>
                <a href="/#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">Contact Us</a>
              </div>
            </div>
          </section>

          <div className="mt-12 flex justify-center">
            <button onClick={handleBackToOffers} className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to All Offers
            </button>
          </div>
        </main>

        {/* VERIFICATION MODAL */}
        {isVerifying && (
          <VerificationPopup
            offerTitle={offer.title}
            onSuccess={handleVerificationSuccess}
            onCancel={() => setIsVerifying(false)}
          />
        )}

        {/* PRODUCT FORM MODAL */}
        {isFormOpen && (() => {
          const FormComponent = getFormComponent(name);
          return (
            <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
                {FormComponent ? (
                  <Suspense fallback={<div className="flex justify-center items-center py-12">Loading form...</div>}>
                    <FormComponent
                      onClose={() => setIsFormOpen(false)}
                      prefilledData={verifiedUserData}
                    />
                  </Suspense>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Form for {offer.title} is currently unavailable online.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}

/**
 * 🔹 Verification Component (Internal Modal)
 */
function VerificationPopup({ offerTitle, onSuccess, onCancel }: any) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || formData.mobile.length !== 10) {
      return setError("Please fill all details correctly.");
    }

    setIsLoading(true);
    setError("");
    try {
      await AuthService.sendLoginOtp({ identifier: formData.mobile });
      setStep("otp");
      setTimer(30);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return setError("Enter the 6-digit OTP code.");

    setIsLoading(true);
    setError("");
    try {
      await AuthService.verifyLoginOtp({ identifier: formData.mobile, otp: otpString });
      onSuccess(formData);
    } catch (err) {
      setError("Invalid OTP code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-200">

        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-6 text-center text-white relative">
          <button onClick={onCancel} className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20} /></button>
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold">Verification</h3>
          <p className="text-xs text-white/80 mt-1">Applying for: {offerTitle}</p>
        </div>

        <div className="p-6">
          {step === "details" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required type="text" placeholder="Full Name"
                    className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required type="email" placeholder="Email Address"
                    className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    required type="tel" maxLength={10} placeholder="10-digit Mobile Number"
                    className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700"
                    value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

              <button
                type="submit" disabled={isLoading}
                className="w-full bg-[#1CADA3] text-white py-3.5 rounded-xl font-bold hover:bg-[#178e86] shadow-lg disabled:opacity-50 transition-all active:scale-95"
              >
                {isLoading ? "Requesting OTP..." : "Continue to Verification"}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center animate-in slide-in-from-bottom-4 duration-300">
              <div>
                <p className="text-sm text-gray-500 mb-6">Enter the code sent to <br /> <span className="text-gray-800 font-medium tracking-wide">{formData.mobile}</span></p>
                <div className="flex justify-between gap-2 mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-14 border-2 border-gray-100 rounded-xl text-center text-2xl font-medium text-gray-700 focus:border-[#1CADA3] focus:ring-1 focus:ring-[#1CADA3] outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp} disabled={isLoading}
                  className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3.5 rounded-xl font-bold shadow-lg"
                >
                  {isLoading ? "Verifying..." : "Verify & Open Application"}
                </button>
                <div className="flex flex-col gap-2 pt-2">
                  {timer > 0 ? (
                    <p className="text-xs text-red-400 font-medium">Resend OTP in {timer}s</p>
                  ) : (
                    <button onClick={() => handleSendOtp()} className="text-xs text-[#1CADA3] hover:text-[#178e86] font-bold underline">Resend OTP</button>
                  )}
                  <button onClick={() => setStep("details")} className="text-xs text-gray-400 hover:text-gray-600 underline">Change details</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}