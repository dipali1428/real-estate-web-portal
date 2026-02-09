import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#0B1C2E] text-[#B0BCC8] pt-16 pb-8 font-sans tracking-tight">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* About Column */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <img
                                src="https://www.infinityarthvishva.com/logo.png"
                                alt="Infinity Arthvishva"
                                className="h-[55px] w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            We are a leading financial advisory firm providing comprehensive solutions across loans, insurance, and investments. Your financial success is our mission.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-2 inline-block relative">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-16 h-[3px] bg-[#1CADA3]"></div>
                        </h3>
                        <ul className="mt-8 space-y-4 text-[13px]">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Our Services Column */}
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-2 inline-block relative">
                            Our Services
                            <div className="absolute -bottom-2 left-0 w-16 h-[3px] bg-[#1CADA3]"></div>
                        </h3>
                        <ul className="mt-8 space-y-4 text-[13px]">
                            <li><Link href="#" className="hover:text-white transition-colors">Finance & Loans</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Protection & Insurance</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Investments & Wealth</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Portfolio Management</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Mutual Funds</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Demat Services</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-2 inline-block relative">
                            Contact Info
                            <div className="absolute -bottom-2 left-0 w-16 h-[3px] bg-[#1CADA3]"></div>
                        </h3>
                        <ul className="mt-8 space-y-4 text-[13px]">
                            <li className="flex items-start">
                                <span>1001 & 1201, 7 Business Square</span>
                            </li>
                            <li className="flex items-start">
                                <span>Shivajinagar, Pune, MH 411016</span>
                            </li>
                            <li className="flex items-start">
                                <a href="tel:18005327600" className="hover:text-white transition-colors">1800-532-7600</a>
                            </li>
                            <li className="flex items-start">
                                <a href="mailto:info@infinityarthvishva.com" className="hover:text-white transition-colors">info@infinityarthvishva.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800/50 mb-10 pt-10">
                    <div className="flex flex-col items-center">
                        <p className="text-[13px] mb-4">
                            ₹© 2026 Infinity Arthvishva ₹€” All Rights Reserved.
                        </p>
                        <div className="flex items-center space-x-4 text-[13px] mb-10">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <span className="text-gray-700">|</span>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-6">
                            <a href="#" className="w-9 h-9 rounded-full bg-[#0B1C2E] flex items-center justify-center text-gray-400 hover:bg-[#1CADA3] hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#0B1C2E] flex items-center justify-center text-gray-400 hover:bg-[#1CADA3] hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-[#0B1C2E] flex items-center justify-center text-gray-400 hover:bg-[#1CADA3] hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

