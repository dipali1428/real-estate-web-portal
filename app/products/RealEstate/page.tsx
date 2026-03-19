'use client';

import { useState, Suspense } from 'react';
import RealEstateHomeSection from './components/HomeSection';
import RealEstatePropertiesSection from './components/PropertiesSection';
import RealEstatePropertyDetailsModal from './components/PropertyDetailsModal';
import Login from '../../auth/login/page';
import CTASection from '../../component/CTASection';
import ScrollToTop from '../../component/ScrollToTop';

export default function Home() {
  // Property Details Modal State
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // --- Handlers ---
  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
  };

  return (
    <main className="min-h-screen relative flex flex-col font-sans text-slate-800 bg-slate-50 overflow-x-hidden">
      <div className="grow">
        <section id="home" className="pt-0">
          <RealEstateHomeSection onPropertySelect={handlePropertySelect} />
        </section>


        <section id="properties" className="scroll-mt-32">
          <Suspense fallback={<div className="py-20 text-center text-slate-500 font-medium">Loading properties...</div>}>
            <RealEstatePropertiesSection
              onPropertySelect={handlePropertySelect}
            />
          </Suspense>
        </section>
      </div>

      {selectedPropertyId && (
        <RealEstatePropertyDetailsModal
          propertyId={selectedPropertyId}
          onClose={() => setSelectedPropertyId(null)}
          onInvestNow={() => setIsLoginOpen(true)}
        />
      )}

      {/* Login Modal */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      <CTASection 
        title="Find Your Dream Property Today"
        description="Whether you're looking for a luxury home or a high-yield commercial investment, our experts are here to guide you. Discover our exclusive portfolio and start your real estate journey today."
        buttonText="Browse Properties"
        buttonLink="#properties"
        // secondaryButtonText="Contact Us"
        // secondaryButtonLink="/#contact"
      />
      <ScrollToTop />
    </main>
  );
}
