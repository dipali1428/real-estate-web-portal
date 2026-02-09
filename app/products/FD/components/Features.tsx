import React from 'react';
import { ShieldCheck, TrendingUp, Users, Clock, Percent, Award } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <ShieldCheck size={32} />,
            title: "100% Reliable & Protected",
            desc: "Your investments are backed by DICGC insurance up to ₹5 Lakhs on scheduled banks."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "High Returns",
            desc: "Get industry-best interest rates up to 9.10% with senior citizen benefits."
        },
        {
            icon: <Clock size={32} />,
            title: "Flexible Tenure",
            desc: "Choose from 7 days to 10 years based on your financial goals."
        },
        {
            icon: <Percent size={32} />,
            title: "Paperless KYC",
            desc: "Complete your video KYC in minutes from the comfort of your home."
        },
        {
            icon: <Users size={32} />,
            title: "Dedicated Support",
            desc: "Expert financial advisors available to guide you at every step."
        },
        {
            icon: <Award size={32} />,
            title: "Premature Withdrawal",
            desc: "Easy liquidity options available when you need funds urgently."
        }
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-clip-text text-transparent drop-shadow-sm" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Why Choose Us?</h2>
                    <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: 'linear-gradient(to right, #2076C7, #1CADA3, #2076C7)' }}></div>
                    <p className="text-gray-600">
                        We partner with India's top banks and NBFCs to bring you the safest and highest yielding fixed deposit options.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden animate-fade-in-up flex flex-col items-center text-center"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            {/* Centered Decorative Background Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-32 h-32 bg-primary/5 rounded-full group-hover:scale-[1.8] group-hover:bg-primary/10 transition-all duration-1000 ease-out -z-0"></div>

                            <div className="relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center text-white group-hover:rotate-[360deg] transition-all duration-700 mb-8 shadow-xl" style={{ background: 'linear-gradient(to bottom right, #2076C7, #1CADA3)' }}>
                                {item.icon}
                            </div>

                            <h3 className="relative z-10 text-2xl font-extrabold text-gray-600 mb-4 group-hover:text-primary transition-colors tracking-tight">
                                {item.title}
                            </h3>

                            <p className="relative z-10 text-gray-500 leading-relaxed font-medium">
                                {item.desc}
                            </p>

                            {/* Center Bottom Accent Bar */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-secondary group-hover:w-1/2 rounded-t-full transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
