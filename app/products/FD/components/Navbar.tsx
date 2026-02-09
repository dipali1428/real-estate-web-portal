"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Product', href: '/#product' },
        { name: 'About Us', href: '/#about' },
        { name: 'Events', href: '/#events' },
        { name: 'Cibil Check', href: '/#cibil' },
        { name: 'Calculator', href: '/#calculator' },
        { name: 'Contact Us', href: '/#contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-gradient-to-b from-black/40 to-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Infinity Arthvishva"
                                width={180}
                                height={64}
                                className="h-12 md:h-16 w-auto transition-all duration-300"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-secondary ${isScrolled ? 'text-gray-900' : 'text-gray-700 hover:text-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Navigation Buttons (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Link
                            href="/#login"
                            className="text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-md transform active:scale-95"
                            style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                        >
                            Login
                        </Link>
                        <Link
                            href="/#partner"
                            className="border-2 border-primary text-primary text-sm font-bold px-6 py-2.5 rounded-lg transition-all transform active:scale-95 hover:bg-primary/5"
                        >
                            Become A Partner
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-primary' : 'text-primary'
                                }`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden transition-all duration-300 overflow-hidden bg-white ${isOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 border-t border-gray-100">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-3 text-base font-bold text-gray-700 hover:text-primary hover:bg-gray-50 uppercase tracking-wider"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 flex flex-col gap-3 px-3">
                        <a href="tel:18005327600" className="flex items-center gap-3 text-primary font-bold">
                            <Phone size={20} /> 1800-532-7600
                        </a>
                        <a href="mailto:info@infinityarthvishva.com" className="flex items-center gap-3 text-primary font-bold">
                            <Mail size={20} /> info@infinityarthvishva.com
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
