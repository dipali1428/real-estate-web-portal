'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface NavLink {
    name: string;
    path?: string;
    isDropdown?: boolean;
    items?: string[];
}

interface HeaderProps {
    onHome?: () => void;
}

const Header = ({ onHome }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks: NavLink[] = [
        { name: 'Home', path: '#' },
        { name: 'Product', isDropdown: true, items: ['NCDs', 'Mutual Funds', 'Insurance', 'Loans'] },
        { name: 'About Us', path: '#' },
        { name: 'Events', path: '#' },
        { name: 'Cibil Check', path: '#' },
        { name: 'Calculator', isDropdown: true, items: ['Investment Calculator', 'SIP Calculator', 'EMI Calculator'] },
        { name: 'Contact Us', path: '#' },
    ];

    const handleHomeClick = (e: React.MouseEvent) => {
        if (onHome) {
            e.preventDefault();
            onHome();
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 bg-[#EDF9F8] border-b border-[#D6EFEF] px-4 lg:px-12 shadow-sm">
            <div className="max-w-[1700px] mx-auto">
                <div className="flex justify-between items-center h-[95px]">
                    {/* Official Logo */}
                    <button onClick={onHome} className="flex items-center min-w-max h-full py-1">
                        <img
                            src="https://www.infinityarthvishva.com/logo.png"
                            alt="Infinity Arthvishva"
                            className="h-[65px] w-auto drop-shadow-sm transition-transform duration-300 hover:scale-105"
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center space-x-9">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group/item">
                                {link.name === 'Home' ? (
                                    <button
                                        onClick={handleHomeClick}
                                        className="flex items-center text-[#0B1C2E] hover:text-[#1CADA3] font-bold text-[15.5px] transition-colors py-8 font-sans"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        href={link.path || '#'}
                                        className="flex items-center text-[#0B1C2E] hover:text-[#1CADA3] font-bold text-[15.5px] transition-colors py-8 font-sans"
                                    >
                                        {link.name}
                                        {link.isDropdown && <ChevronDown className="ml-1 w-4 h-4 opacity-50 stroke-[3px]" />}
                                    </Link>
                                )}

                                {link.isDropdown && (
                                    <div className="absolute top-[95px] left-0 w-64 bg-white shadow-2xl border-t-4 border-[#1CADA3] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 translate-y-3 group-hover/item:translate-y-0 z-[60]">
                                        <div className="py-2">
                                            {link.items?.map((item) => (
                                                <Link
                                                    key={item}
                                                    href="#"
                                                    className="block px-8 py-4 text-[15px] font-semibold text-gray-700 hover:bg-[#EDF9F8] hover:text-[#1CADA3] border-b border-gray-50 last:border-0 transition-colors"
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-6">
                        <button className="hidden lg:flex items-center justify-center px-11 py-[13px] bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white font-extrabold rounded-xl text-[16px] shadow-[0_5px_15px_rgba(32,118,199,0.3)] hover:shadow-[0_8px_20px_rgba(32,118,199,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                            Login
                        </button>
                        <button className="hidden lg:flex items-center justify-center px-9 py-[11px] bg-white border-2 border-[#1CADA3] text-[#1CADA3] font-extrabold rounded-xl text-[15.5px] hover:bg-[#1CADA3] hover:text-white shadow-sm transition-all">
                            Become A Partner
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="xl:hidden p-2 text-[#0B1C2E]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-9 h-9" /> : <Menu className="w-9 h-9" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`xl:hidden fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-10 pt-32 h-full overflow-y-auto">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <div key={link.name} className="border-b border-gray-100 pb-5">
                                <div className="flex justify-between items-center py-2 h-12">
                                    {link.name === 'Home' ? (
                                        <button onClick={handleHomeClick} className="text-2xl font-bold text-[#0B1C2E]">
                                            {link.name}
                                        </button>
                                    ) : (
                                        <Link href={link.path || '#'} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-[#0B1C2E]">
                                            {link.name}
                                        </Link>
                                    )}
                                    {link.isDropdown && <ChevronDown className="w-7 h-7 text-gray-400" />}
                                </div>
                                {link.isDropdown && (
                                    <div className="pl-6 mt-4 flex flex-col space-y-5">
                                        {link.items?.map((item) => (
                                            <Link key={item} href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-600 text-[18px] font-semibold border-l-3 border-[#D6EFEF] pl-5">{item}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-12 space-y-6">
                            <button className="w-full py-6 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white font-extrabold rounded-2xl text-2xl shadow-xl">
                                Login
                            </button>
                            <button className="w-full py-6 bg-white border-2 border-[#1CADA3] text-[#1CADA3] font-extrabold rounded-2xl text-2xl">
                                Become A Partner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
