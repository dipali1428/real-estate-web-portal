"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  CheckCircle, Clock, ShieldCheck, FileText, Users, 
  TrendingUp, ArrowLeft, Home, DollarSign, Briefcase, 
  Factory, Car, Landmark, GraduationCap, Building, 
  Globe, Heart, Shield, Banknote, Award, Zap, Star, Plane, PieChart
} from 'lucide-react';

// Import from the data file
import { getOfferByKey } from '@/app/data/offers';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  'Home': <Home className="w-8 h-8" />,
  'DollarSign': <DollarSign className="w-8 h-8" />,
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

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;

  // Get the offer using the helper function
  const foundOffer = getOfferByKey(name);
  
  // Fallback offer if not found
  const offer = foundOffer || {
    title: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    category: 'General',
    icon: 'DollarSign',
    description: 'Offer details coming soon',
    overview: 'Detailed information about this financial offer.',
    features: ['Customized solutions', 'Competitive rates', 'Quick processing'],
    benefits: [
      {
        title: 'Quality Service',
        description: 'Professional service with dedicated support.'
      }
    ],
    eligibility: ['Age 21-65 years', 'Valid documentation'],
    documents: ['Identity proof', 'Address proof', 'Income proof'],
    offerDetails: {
      interestRate: 'Contact for details',
      maxLoanAmount: 'As per eligibility',
      processingFee: 'Standard charges apply'
    }
  };

  // Get the icon component
  const iconComponent = iconMap[offer.icon] || <DollarSign className="w-8 h-8" />;

  // SEO Metadata
  useEffect(() => {
    // Generate title
    const title = `${offer.title} - ${offer.category} | Financial Services`;
    document.title = title;

    // Generate description
    const description = offer.description || `Explore ${offer.title} - ${offer.overview?.substring(0, 150)}...`;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update or create canonical URL
    const canonicalUrl = `https://yourdomain.com/offers/${name}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: `https://yourdomain.com/api/og?title=${encodeURIComponent(offer.title)}&category=${offer.category}` }
    ];

    ogTags.forEach(tag => {
      let meta = document.querySelector(`meta[property="${tag.property}"]`);
      if (meta) {
        meta.setAttribute('content', tag.content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `https://yourdomain.com/api/og?title=${encodeURIComponent(offer.title)}&category=${offer.category}` }
    ];

    twitterTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (meta) {
        meta.setAttribute('content', tag.content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    // Add structured data for SEO - Safe version
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: offer.title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'Financial Services',
        url: 'https://yourdomain.com'
      },
      serviceType: offer.category
    };

    // Only add offer details if they exist
    if (offer.offerDetails && typeof offer.offerDetails === 'object') {
      // Get the first available offer detail
      const entries = Object.entries(offer.offerDetails);
      if (entries.length > 0) {
        const [key, value] = entries[0];
        structuredData.offers = {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceCurrency: 'INR',
            description: `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`
          }
        };
      }
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Clean up script tag on unmount
      if (script.parentNode === document.head) {
        document.head.removeChild(script);
      }
    };
  }, [offer, name]);

  // Breadcrumb structured data (still included for SEO, but not displayed)
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Offers',
        item: 'https://yourdomain.com/offers',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: offer.title,
        item: `https://yourdomain.com/offers/${name}`,
      },
    ],
  };

  const handleBackToOffers = () => {
    router.push('/#services');
  };

  return (
    <>
      {/* Add structured data for breadcrumbs (hidden for SEO only) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Fixed Back to Offers Button */}
        <div className="fixed z-50 
/* Mobile position */
top-17 left-1 
/* Desktop position */
md:top-23 md:left-4"
        >
          {/* MOBILE VIEW: Icon-only circular button (Hidden on desktop) */}
          <button
            onClick={handleBackToOffers}
            aria-label="Back to Offers"
            className="md:hidden group flex items-center gap-2 p-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 active:scale-80 transition-all">
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </div>
          </button>

          {/* DESKTOP VIEW: Full label button (Hidden on mobile) */}
          <button
            onClick={handleBackToOffers}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-300 hover:bg-white hover:text-gray-900 transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Offers
          </button>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4 pt-16">
          {/* Offer Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6" role="img" aria-label={`${offer.title} icon`}>
              <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white">
                {iconComponent}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {offer.title}
            </h1>
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 text-[#2076C7] font-medium mb-6">
              <span className="sr-only">Category: </span>
              {offer.category}
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {offer.description}
            </p>
          </header>

          {/* Quick Stats */}
          <section aria-labelledby="quick-stats-heading" className="mb-12">
            <h2 id="quick-stats-heading" className="sr-only">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(offer.offerDetails).slice(0, 3).map(([key, value], index) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <div className="text-lg md:text-xl font-bold text-[#2076C7] mb-1">
                    {value as string}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - What is [Service]? */}
            <section aria-labelledby="what-is-heading" className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100" aria-hidden="true">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <h2 id="what-is-heading" className="text-xl md:text-2xl font-bold text-gray-800">
                  What is {offer.title}?
                </h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                  {offer.overview}
                </p>
                
                <div className="mt-6 md:mt-8">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Right Column - Benefits */}
            <section aria-labelledby="benefits-heading" className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-100" aria-hidden="true">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h2 id="benefits-heading" className="text-xl md:text-2xl font-bold text-gray-800">
                  Benefits of {offer.title}
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {offer.benefits.map((benefit, index) => (
                  <article key={index} className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {benefit.description}
                    </p>
                  </article>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-100" aria-hidden="true">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">Who Should Consider?</h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  This offer is ideal for {offer.category === 'Finance' ? 'individuals or businesses seeking financing solutions' : 
                  offer.category === 'Protection' ? 'those looking to secure their assets and future' : 
                  'investors aiming to grow their wealth'} with professional guidance and competitive terms.
                </p>
              </div>
            </section>
          </div>

          {/* Eligibility & Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Eligibility */}
            <section aria-labelledby="eligibility-heading" className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-100" aria-hidden="true">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <h2 id="eligibility-heading" className="text-xl md:text-2xl font-bold text-gray-800">Eligibility Criteria</h2>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {offer.eligibility.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center">
                      <span className="text-[#2076C7] font-bold text-xs md:text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Required Documents */}
            <section aria-labelledby="documents-heading" className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-100" aria-hidden="true">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <h2 id="documents-heading" className="text-xl md:text-2xl font-bold text-gray-800">Required Documents</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {offer.documents.map((doc, index) => (
                  <div key={index} className="p-2 md:p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1CADA3]"></div>
                      <span className="text-gray-700 text-xs md:text-sm">{doc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Application Process */}
          <section aria-labelledby="process-heading" className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-100" aria-hidden="true">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <h2 id="process-heading" className="text-xl md:text-2xl font-bold text-gray-800">Process Overview</h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2076C7] to-[#1CADA3] md:block hidden" aria-hidden="true"></div>
              <div className="space-y-4 md:space-y-8">
                {[
                  'Initial consultation and requirement assessment',
                  'Document submission and verification',
                  'Approval process and terms finalization',
                  'Agreement signing and formalities',
                  'Service activation or disbursement',
                  'Ongoing support and service management'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-6">
                    <div className="relative z-10" aria-hidden="true">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold text-sm md:text-xl">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-2 md:pt-4">
                      <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Step {index + 1}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section for better SEO */}
          <section aria-labelledby="faq-heading" className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group p-4 border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-800">How to apply for {offer.title}?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600">
                  You can apply through our online portal, visit our branch, or contact our customer service team for assistance.
                </p>
              </details>
              <details className="group p-4 border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-800">What is the processing time?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600">
                  Processing time varies based on the product and completeness of documentation. Typically takes 24-72 hours.
                </p>
              </details>
              <details className="group p-4 border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-800">Are there any hidden charges?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600">
                  All charges are clearly mentioned in the offer details. We maintain complete transparency in our pricing structure.
                </p>
              </details>
              <details className="group p-4 border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-semibold text-gray-800">Can I get pre-approved?</span>
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600">
                  Yes, we offer pre-approval for eligible customers. Contact us with your basic details for a preliminary assessment.
                </p>
              </details>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Apply now for {offer.title} and get expert guidance throughout the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="px-8 py-3 bg-white text-[#2076C7] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>

          {/* Bottom Back Button - Still kept for convenience */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleBackToOffers}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Offers
            </button>
          </div>
        </main>
      </div>
    </>
  );
}