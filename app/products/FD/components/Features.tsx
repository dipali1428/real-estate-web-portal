import React from 'react';
import { ShieldCheck, TrendingUp, Users, Clock, Percent, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            icon: <ShieldCheck />,
            title: "100% Reliable & Protected",
            desc: "Your investments are backed by DICGC insurance up to ₹5 Lakhs on scheduled banks."
        },
        {
            icon: <TrendingUp />,
            title: "High Returns",
            desc: "Get industry-best interest rates up to 9.10% with senior citizen benefits."
        },
        {
            icon: <Clock />,
            title: "Flexible Tenure",
            desc: "Choose from 7 days to 10 years based on your financial goals."
        },
        {
            icon: <Percent />,
            title: "Paperless KYC",
            desc: "Complete your video KYC in minutes from the comfort of your home."
        },
        {
            icon: <Users />,
            title: "Dedicated Support",
            desc: "Expert financial advisors available to guide you at every step."
        },
        {
            icon: <Award />,
            title: "Premature Withdrawal",
            desc: "Easy liquidity options available when you need funds urgently."
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-white relative overflow-hidden font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                {/* Heading */}
                <div className="max-w-3xl mx-auto mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Why Choose Our Fixed Deposits?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        We partner with India&apos;s top banks and NBFCs to bring you the safest and highest yielding fixed deposit options.
                    </motion.p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            <div className="relative p-7 rounded-[2.25rem] bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-[#2076C7]/15 transition-all duration-500 overflow-hidden flex flex-col items-center text-center h-full">

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-all duration-500 shadow-md">
                                    {React.cloneElement(feature.icon as any, {
                                        size: 28,
                                        className: "text-white",
                                    })}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-[#2076C7] transition-colors relative z-10">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 font-medium leading-relaxed text-sm relative z-10 group-hover:text-gray-600 mb-5">
                                    {feature.desc}
                                </p>

                                {/* Learn More */}
                                <div className="mt-auto flex items-center gap-2 text-xs font-bold text-[#2076C7] group-hover:text-[#1CADA3] transition-all duration-300 relative z-10">
                                    Learn More
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#2076C7]/0 via-transparent to-[#1CADA3]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Features;
