"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import { 
  CheckCircle, Clock, ShieldCheck, FileText, Users, 
  TrendingUp, ArrowLeft, Home, IndianRupee, Briefcase, 
  Factory, Car, Landmark, GraduationCap, Building, 
  Globe, Heart, Shield, Banknote, Award, Zap, Star, Plane, PieChart, X,
  ArrowRight, User, Mail, Smartphone
} from 'lucide-react';

// Import services and data
import { getOfferByKey } from '@/app/data/offers';
import { AuthService } from "@/app/services/authService";

/**
 * 🔹 Define the interface for the dynamic Product Forms 
 * to ensure they can accept prefilled data.
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

const iconMap: Record<string, React.ReactNode> = {
  'Home': <Home className="w-8 h-8" />,
  'IndianRupee': <IndianRupee className="w-8 h-8" />,
  'Briefcase': <Briefcase className="w-8 h-8" />,
  'Factory': <Factory className="w-8 h-8" />,
  'Car': <Car className="w-8 h-8" />,
  'Landmark': <Landmark className="w-8 h-8" />,
  'GraduationCap': <GraduationCap className="w-8 h-8" />,
  'TrendingUp': <TrendingUp className="w-8 h-8" />,
  'Heart': <Heart className="w-8 h-8" />,
  'Shield': <Shield className="w-8 h-8" />,
  'Building': <Building className="w-8 h-8" />,
  'Globe': <Globe className="w-8 h-8" />,
  'Users': <Users className="w-8 h-8" />,
  'FileText': <FileText className="w-8 h-8" />,
  'Banknote': <Banknote className="w-8 h-8" />,
  'Award': <Award className="w-8 h-8" />,
  'Zap': <Zap className="w-8 h-8" />,
  'Star': <Star className="w-8 h-8" />,
  'Plane': <Plane className="w-8 h-8" />,
  'PieChart': <PieChart className="w-8 h-8" />,
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

  const iconComponent = iconMap[offer.icon] || <IndianRupee className="w-8 h-8" />;

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

        <main className="container mx-auto px-4 py-4 pt-24 md:pt-32">
          {/* Header Section */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
              <div className="p-4 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white">
                {iconComponent}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{offer.title}</h1>
            <div className="inline-block px-4 py-1 rounded-full bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] font-medium mb-6">{offer.category}</div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{offer.description}</p>
            
            <div className="flex justify-center">
              <button onClick={handleApply} className="group flex items-center gap-3 px-10 py-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transition-all">
                Apply for {offer.title} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </header>

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
 * Features: Manual Details Entry, 6-Digit Box OTP Step, 30s Countdown Timer
 */
function VerificationPopup({ offerTitle, onSuccess, onCancel }: any) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  
  // States for 6-digit box OTP
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

  // Logic for digit box changes
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus back on backspace if current box is empty
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
          <button onClick={onCancel} className="absolute right-4 top-4 hover:bg-white/20 rounded-full p-1 transition-colors"><X size={20}/></button>
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
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required type="email" placeholder="Email Address" 
                    className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required type="tel" maxLength={10} placeholder="10-digit Mobile Number" 
                    className="w-full border-gray-200 border rounded-xl p-2.5 pl-10 focus:ring-2 focus:ring-[#1CADA3] outline-none text-gray-700"
                    value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, "")})}
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
                <p className="text-sm text-gray-500 mb-6">Enter the code sent to <br/> <span className="text-gray-800 font-medium tracking-wide">{formData.mobile}</span></p>
                
                {/* 6 DIGIT BOXES */}
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