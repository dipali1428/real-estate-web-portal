
import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Select a Bond",
            description: "Browse through our curated list of corporate bonds and select one that fits your risk profile."
        },
        {
            number: "02",
            title: "Complete KYC",
            description: "Finish the quick digital KYC process to enable your investment account."
        },
        {
            number: "03",
            title: "Invest Online",
            description: "Transfer funds securely through net banking or UPI to complete your purchase."
        },
        {
            number: "04",
            title: "Manage & Earn",
            description: "Track your bond performance and receive interest directly into your bank account."
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-white relative overflow-hidden font-sans px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        How It Works
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg mt-6 font-medium leading-relaxed px-4 md:px-0">
                        Invest in premium bonds in four simple steps. Our secure process ensures your wealth grows steadily with minimum effort.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] opacity-20" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-4">
                                    <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform font-bold text-xl">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="text-lg md:text-xl font-extrabold text-[#2076C7] mb-2 tracking-tight">{step.title}</h3>
                                <p className="text-slate-500 text-sm md:text-lg font-bold md:font-medium leading-relaxed px-4">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
