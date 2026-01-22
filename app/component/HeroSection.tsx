"use client"
import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Your Financial Success Is Our Priority';
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem("heroVisited");

        if (hasVisited) {
            setDisplayedText(fullText);
            setIsTypingComplete(true);
            return;
        }

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                localStorage.setItem("heroVisited", "true");
            }
        }, 80);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section id='home' className="relative bg-linear-to-br from-blue-50 via-teal-50 to-emerald-50 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #79c2f7ff, #ffffffff, #e5f8e5ff)' }}>

            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(28, 202, 163, 0.3)' }}></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ backgroundColor: 'rgba(32, 118, 199, 0.3)', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: 'rgba(28, 202, 163, 0.2)', animationDelay: '2s' }}></div>
            </div>

            <div className="relative container mx-auto px-4 py-15 md:py-25 mb-5">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main heading with typing effect */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-16 md:min-h-20 leading-tight" style={{
                        background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        {displayedText}
                        <span className="inline-block w-1 h-12 md:h-16 ml-1" style={{
                            background: 'linear-gradient(to bottom, #2076C7, #1CADA3)',
                            animation: isTypingComplete ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'blink 1s infinite'
                        }}></span>
                    </h1>

                    {/* Subtitle with fade-in effect */}
                    <p className={`text-lg md:text-xl lg:text-2xl mb-10 text-gray-700 leading-relaxed transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                        At <span className="font-semibold" style={{ color: '#1CADA3' }}>Infinity Arthvishva</span>, we are dedicated to helping you navigate the complexities of finance with confidence and clarity. Let's build your path to success together.
                    </p>

                    {/* CTA Buttons with fade-in effect */}
                    <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-opacity duration-1000 delay-300 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                        <a href='#services'>
                            <button className="group relative text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}>

                                <span className="relative z-10">Our Services</span>

                                <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: 'linear-gradient(to right, #189B8D, #1A68B0)' }}></div>
                            </button>
                        </a>
                        <a href='#contact'>
                            <button className="group relative bg-white px-8 py-4 rounded-lg font-semibold text-lg border-2 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg" style={{ color: '#2076C7', borderColor: '#2076C7' }}>


                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Contact Us
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>

                            </button>
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className={`mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-600 transition-opacity duration-1000 delay-500 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: '#1CADA3' }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">2600+ Active DSA Partners</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: '#2076C7' }} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Expert Financial Guidance</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
            @keyframes blink {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
            }
            .animate-blink {
                animation: blink 1s infinite;
            }`}
            </style>
        </section>
    );
};

export default HeroSection;