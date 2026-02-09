import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-[#1CADA3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* About Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-primary">Infinity</span>
                            <span className="text-secondary">Arthvishva</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            We are a leading financial advisory firm providing comprehensive solutions across loans, insurance, and investments. Your financial success is our mission.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Facebook size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Twitter size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white transition-all"><Instagram size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white transition-all"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/" className="hover:text-primary flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-secondary" /> Home</Link></li>
                            <li><Link href="/#about" className="hover:text-primary flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-secondary" /> About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-primary flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-secondary" /> Services</Link></li>
                            <li><Link href="/#contact" className="hover:text-primary flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-secondary" /> Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary">Our Services</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Finance & Loans</li>
                            <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Protection & Insurance</li>
                            <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Investments & Wealth</li>
                            <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Portfolio Management</li>
                            <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Mutual Funds</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary">Contact Info</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                                    <MapPin size={20} />
                                </div>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=7+Business+Square+Shivajinagar+Pune+MH+411016"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 text-sm leading-relaxed hover:text-primary transition-colors"
                                >
                                    1001 & 1201, 7 Business Square, Shivajinagar, Pune, MH 411016
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <a href="tel:18005327600" className="text-gray-400 hover:text-secondary transition-colors font-bold tracking-tight">
                                    1800-532-7600
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <a href="mailto:info@infinityarthvishva.com" className="text-gray-400 hover:text-primary transition-colors font-bold tracking-tight truncate">
                                    info@infinityarthvishva.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Infinity Arthvishva — All Rights Reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

