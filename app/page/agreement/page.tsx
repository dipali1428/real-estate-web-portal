"use client"
import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Something Great is Coming';
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, 80);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" 
                 style={{ background: 'linear-gradient(to bottom right, #79c2f7ff, #ffffffff, #e5f8e5ff)' }}>

            {/* Animated background shapes from your theme */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" 
                     style={{ backgroundColor: 'rgba(28, 202, 163, 0.3)' }}></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" 
                     style={{ backgroundColor: 'rgba(32, 118, 199, 0.3)', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" 
                     style={{ backgroundColor: 'rgba(28, 202, 163, 0.2)', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Brand Logo/Name */}
                <div className={`mb-8 transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-sm font-bold tracking-[0.3em] uppercase" style={{ color: '#1CADA3' }}>
                        Infinity Arthvishva
                    </span>
                </div>

                {/* Main heading with your theme's typing effect */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 min-h-20 leading-tight" style={{
                    background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    {displayedText}
                    <span className="inline-block w-1 h-12 md:h-20 ml-1" style={{
                        background: 'linear-gradient(to bottom, #2076C7, #1CADA3)',
                        animation: isTypingComplete ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'blink 1s infinite'
                    }}></span>
                </h1>

                {/* Subtitle */}
                <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed transition-opacity duration-1000 delay-300 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
                    We are crafting a new digital experience to help you navigate your 
                    <span className="font-semibold" style={{ color: '#2076C7' }}> financial journey </span> 
                    with expert guidance. Stay tuned!
                </p>

                {/* Simple Accent Line */}
                <div className={`mt-12 transition-all duration-1000 delay-500 transform ${isTypingComplete ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
                    <div className="h-1.5 w-24 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}></div>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="absolute bottom-10 w-full text-center text-gray-400 text-xs font-medium uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Infinity Arthvishva. All Rights Reserved.
            </footer>

            <style jsx>{`
                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </section>
    );
};

export default ComingSoon;