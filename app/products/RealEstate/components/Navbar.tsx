'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, MessageCircle, Facebook, Twitter, Instagram, Globe, Heart, User, LogOut } from 'lucide-react';

interface NavbarProps {
    user?: any;
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
    onLogout?: () => void;
    onFavoritesClick?: () => void;
}

const Navbar = ({ user, onLoginClick, onRegisterClick, onLogout, onFavoritesClick }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isTransparentPage = ['/', '/login', '/register'].includes(pathname);

    return (
        <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300`}>
            {/* Top Bar */}
            <div className="bg-[#1e293b] text-white py-2.5 text-sm border-b border-white/5">
                <div className="w-full px-4 md:px-12 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href="tel:18005327600" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                            <Phone size={14} className="text-blue-400" /> 1800-532-7600
                        </a>
                        <a href="https://wa.me/9118005327600" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                            <MessageCircle size={14} className="text-green-400" /> WhatsApp Support
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-3">
                            <Facebook size={14} className="cursor-pointer hover:text-blue-500 transition-colors" />
                            <Twitter size={14} className="cursor-pointer hover:text-sky-500 transition-colors" />
                            <Instagram size={14} className="cursor-pointer hover:text-pink-500 transition-colors" />
                            <Globe size={14} className="cursor-pointer hover:text-blue-400 transition-colors" />
                        </div>
                        <Link href="/#live" className="btn-brand px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all">
                            Current Opportunities
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`
        transition-all duration-300
        ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : (isTransparentPage ? 'bg-transparent py-5' : 'bg-white py-5')}
      `}>
                <div className="w-full px-4 md:px-12 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/assets/logo.png" alt="Infinity Arthvishva" className="h-[50px] w-auto" />
                    </Link>

                    <div className="flex items-center gap-8">
                        {/* Auth buttons removed as requested */}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

