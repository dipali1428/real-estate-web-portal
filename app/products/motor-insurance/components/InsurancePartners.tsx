"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

const partners = [
    { name: "Royal Sundaram", logo: "/motor-insurance/Royal_Sundaram.png" },
    { name: "Digit", logo: "/motor-insurance/digit.png" },
    { name: "Chola MS", logo: "/motor-insurance/Chola_MS.jpg" },
    { name: "Tata AIG", logo: "/motor-insurance/Tata_Aig.jpg" },
    { name: "Bajaj Allianz", logo: "/motor-insurance/Bajaj.jpg" },
    { name: "Shriram General", logo: "/motor-insurance/Shriram General.jpg" },
    { name: "Zuno", logo: "/motor-insurance/zuno.jpg" },
    { name: "IFFCO-Tokio", logo: "/motor-insurance/Iffco_tokio.png" },
    { name: "Zurich Kotak", logo: "/motor-insurance/Zurich.jpg" },
    { name: "Liberty General", logo: "/motor-insurance/Liberty_General.jpg" },
    { name: "Magma General", logo: "/motor-insurance/Magma.png" },
    { name: "National Insurance", logo: "/motor-insurance/National_Insurance.jpg" },
    { name: "Reliance General", logo: "/motor-insurance/reliance.jpg" },
    { name: "Generali Insurance", logo: "/motor-insurance/Generali.jpg" },
    { name: "SBI General", logo: "/motor-insurance/SBI.jpg" },
];

interface InsurancePartnersProps {
    scrollingSpeed?: number;
}

const InsurancePartners = ({ scrollingSpeed = 20 }: InsurancePartnersProps) => {
    return (
        <section className="py-12 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">Our Insurance Partners</h2>
                <p className="text-gray-500 mb-16 text-lg max-w-2xl mx-auto">
                    We&apos;ve partnered with India&apos;s leading insurance providers to bring you the most reliable and affordable coverage options for your vehicle.
                </p>

                {/* Scrolling Rows */}
                <div className="max-w-7xl mx-auto space-y-8 relative">
                    {/* Row 1: Scrolls Left */}
                    <div className="relative flex overflow-hidden py-4">
                        <motion.div
                            className="flex gap-8 whitespace-nowrap min-w-full"
                            animate={{
                                x: [0, -1000],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: scrollingSpeed,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...partners, ...partners].map((partner, index) => (
                                <div
                                    key={`${partner.name}-r1-${index}`}
                                    className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center min-w-[200px] h-28 p-4 group border-b-4 hover:border-b-[#1CADA3] shadow-sm hover:shadow-md transition-all duration-300"
                                >   
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={160}
                                        height={64}
                                        className="max-h-16 w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Scrolls Right */}
                    <div className="relative flex overflow-hidden py-4">
                        <motion.div
                            className="flex gap-8 whitespace-nowrap min-w-full"
                            animate={{
                                x: [-1000, 0],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: scrollingSpeed * 1.25,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...[...partners].reverse(), ...partners].map((partner, index) => (
                                <div
                                    key={`${partner.name}-r2-${index}`}
                                    className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center min-w-[200px] h-28 p-4 group border-b-4 hover:border-b-[#1CADA3] shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={100}
                                height={40}
                                className="h-10 w-auto object-contain"
                                />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Fades for smooth entry/exit */}
                    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default InsurancePartners;
