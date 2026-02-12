'use client';

import { useState, Suspense } from 'react';
import HomeSection from './components/HomeSection';
import PropertiesSection from './components/PropertiesSection';
import AboutSection from './components/AboutSection';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import BackButton from './components/BackButton';
import { X, FileText, Shield } from 'lucide-react';

export default function Home() {
  // Property Details Modal State
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Inquiry Modal State (Existing)
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', phone: '', email: '', message: '' });

  // --- Handlers ---
  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our advisor will contact you shortly.');
    setShowInquiryModal(false);
    setInquiryData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen relative flex flex-col font-sans text-slate-800 bg-slate-50">
      <div className="grow">
        <section id="home" className="pt-0 mt-0">
          <HomeSection onPropertySelect={handlePropertySelect} />
        </section>


        <section id="properties" className="bg-slate-50 scroll-mt-24">
          <Suspense fallback={<div className="py-20 text-center">Loading properties...</div>}>
            <PropertiesSection
              onPropertySelect={handlePropertySelect}
            />
          </Suspense>
        </section>

        <section id="about" className="bg-white scroll-mt-24">
          <AboutSection onSpeakWithAdvisor={() => setShowInquiryModal(true)} />
        </section>
 {/* Disclaimer Section */}
        <section className="bg-slate-100 border-t border-slate-200">
          <div className="max-w-[1600px] mx-auto px-6 py-8">
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-800">Disclaimer:</strong>The information provided on this website is for general informational purposes only. Details related to the developer, associated entities, and their past experience are indicative in nature and subject to change without prior notice. References to completed, ongoing, or upcoming projects do not constitute any assurance of future performance. Any information regarding connectivity, infrastructure, surroundings, or development potential is based on current understanding and publicly available sources and may vary over time. Such statements should not be construed as guarantees of future growth or returns. This content does not constitute a legal offer, financial advice, or commitment of any kind. Prospective buyers are advised to independently verify all information with relevant authorities before making any decision. </p>
              </div>
</section>
      </div>
      
      {/* <BackButton /> */}

      {/* Property Details Modal */}
      {selectedPropertyId && (
        <PropertyDetailsModal
          propertyId={selectedPropertyId}
          onClose={() => setSelectedPropertyId(null)}
        />
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowInquiryModal(false)}>
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg relative shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}>

            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <FileText size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-brand-gradient">Speak with an Advisor</h2>
              <p className="text-slate-500 text-sm">Fill in your details and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Deshmukh"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={inquiryData.email}
                  onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="How can our experts help you today?"
                  value={inquiryData.message}
                  onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <button type="submit" className="btn-brand w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4">
                Send Inquiry
              </button>
            </form>

            <p className="textAlign-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-1">
              <Shield size={12} /> Your data is secure and confidential.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
