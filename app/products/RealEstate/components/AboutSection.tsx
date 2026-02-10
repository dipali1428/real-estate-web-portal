'use client';

import { MapPin, Phone, Mail, Globe } from 'lucide-react';

interface AboutSectionProps {
    onSpeakWithAdvisor: () => void;
}

const AboutSection = ({ onSpeakWithAdvisor }: AboutSectionProps) => {
    return (
        <div className="animate-fade-in bg-slate-50 py-12">
            {/* Contact Info Section */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-brand-gradient font-sans  bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Get In Touch
                        </h2>

                        <div className="grid gap-8">
                            {/* Head Office */}
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0 text-blue-400">
                                    <MapPin size={26} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-sans text-gray-700 text-xl mb-2 text-brand-gradient">Head Office</h4>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        Office No. 1001 & 1201, 7 Business Square, Ganeshkhind Road,<br />
                                        Near Datta Mandir, Model Colony, Shivajinagar,<br />
                                        Pune, Maharashtra 411016
                                    </p>
                                </div>
                            </div>

                            {/* Direct Contact */}
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0 text-teal-500">
                                    <Phone size={26} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-sans text-gray-700 text-xl mb-2 text-brand-gradient">Direct Contact</h4>
                                    <p className="text-slate-600 text-lg">Toll-Free: <b className="text-slate-700">1800-532-7600</b></p>
                                </div>
                            </div>

                            {/* Email Support */}
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0 text-pink-500">
                                    <Mail size={26} />
                                </div>
                                <div>
                                    <h4 className="font-bold font-sans text-gray-700 text-xl mb-2 text-brand-gradient">Email Support</h4>
                                    <p className="text-slate-600 text-lg">info@infinityarthvishva.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Callback Card */}
                    <div className="sticky top-24 bg-white/80 backdrop-blur-lg p-10 rounded-3xl border border-slate-100 shadow-xl transition-all hover:shadow-2xl">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-3xl font-bold font-sans text-gray-700 mb-6 text-brand-gradient">Request Callback</h3>
                        <p className="mb-10 text-lg leading-relaxed text-slate-500">
                            Interested in our financial solutions? Speak with our certified expert advisors today.
                        </p>
                        <button
                            // onClick={onSpeakWithAdvisor}
                            className="btn-brand w-full flex items-center justify-center gap-4 py-5 px-8 rounded-xl text-xl uppercase tracking-widest">
                            <Phone size={22} /> Speak with Advisor
                        </button>
                        <p className="text-center mt-6 text-sm text-slate-400">Fill Contact us Form</p>
                        <p className="text-center mt-6 text-sm text-slate-400">Available Mon-Sat: 10AM - 7PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
