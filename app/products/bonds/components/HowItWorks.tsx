import { ListChecks } from "lucide-react";

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
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <ListChecks className="text-[#1CADA3]" size={36} />
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                            How It Works
                        </h2>
                    </div>
                    <p className="mt-4 text-gray-600">Invest in premium bonds in four simple steps</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connector lines (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative">
                            <div className="w-16 h-16 bg-white border-2 border-[#1CADA3] text-[#1CADA3] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-sm">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
