'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
// import logo from "@/assets/logo.png";

const Footer = () => {
    const socialLinks = [Facebook, Twitter, Instagram, Linkedin];
    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/#about' },
        { name: 'Services', href: '/#services' }, // Assuming services section exists or will exist
        { name: 'Contact Us', href: '/contact' },
    ];

    const services = [
        'Finance & Loans',
        'Protection & Insurance',
        'Investments & Wealth',
        'Portfolio Management',
        'Mutual Funds',
        'Demat Services'
    ];

    return (
        <footer className="bg-slate-900 pt-20 pb-12 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 max-w-7xl">
                {/* About Section */}
                <div>
                    <h4 className="text-2xl font-bold mb-6 relative pb-4 text-left after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-teal-500 text-brand-gradient">
                        About
                    </h4>
                    <p className="text-gray-400 mb-8 text-[0.95rem] leading-relaxed">
                        We are a leading financial advisory firm providing comprehensive solutions across loans, insurance, and investments. Your financial success is our mission.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-bold mb-6 relative pb-4 text-left after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-teal-500 text-brand-gradient">
                        Quick Links
                    </h4>
                    <ul className="space-y-4">
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-gray-400 hover:text-teal-500 transition-colors duration-300 no-underline"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Our Services */}
                <div>
                    <h4 className="text-xl font-bold mb-6 relative pb-4 text-left after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-teal-500 text-brand-gradient">
                        Our Services
                    </h4>
                    <ul className="space-y-4">
                        {services.map((service) => (
                            <li key={service} className="text-gray-400 text-[0.95rem]">
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-xl font-bold mb-6 relative pb-4 text-left after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-gradient-to-r after:from-blue-600 after:to-teal-500">
                        Contact Info
                    </h4>
                    <ul className="space-y-6">
                        <li className="text-gray-400 text-[0.95rem] leading-relaxed flex gap-3">
                            <MapPin size={20} className="shrink-0 text-teal-500" />
                            <span>
                                1001 & 1201, 7 Business Square<br />
                                Shivajinagar, Pune, MH 411016
                            </span>
                        </li>
                        <li className="text-gray-400 text-[0.95rem] flex gap-3 items-center">
                            <Phone size={18} className="text-teal-500" />
                            <a href="tel:18005327600" className="hover:text-white transition-colors">1800-532-7600</a>
                        </li>
                        <li className="text-gray-400 text-[0.95rem] flex gap-3 items-center">
                            <Mail size={18} className="text-teal-500" />
                            <a href="mailto:info@infinityarthvishva.com" className="hover:text-white transition-colors">info@infinityarthvishva.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center pt-8 border-t border-gray-800/50">
                <p className="text-gray-500 text-sm mb-4">
                    © 2026 <span className="text-gray-400">Infinity Arthvishva</span> — All Rights Reserved.
                </p>
                <div className="flex justify-center gap-6 mb-8 text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
                    <span className="text-gray-700">|</span>
                    <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms & Conditions</a>
                </div>

                <div className="flex justify-center gap-4">
                    {socialLinks.map((Icon, i) => (
                        <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
