import { UserCheck, Search, Wallet, TrendingUp, ArrowRight } from 'lucide-react';

const InvestorGuide = () => {
    const steps = [
        {
            id: 1,
            title: "KYC & Registration",
            desc: "Complete your one-time KYC securely using your PAN and Aadhar. It's 100% digital and takes less than 5 minutes.",
            icon: <UserCheck className="w-8 h-8 text-white" />,
            color: "bg-[#2076C7]"
        },
        {
            id: 2,
            title: "Select Investment",
            desc: "Browse our curated list of AAA-rated NCDs, Sovereign Gold Bonds, and 54EC Bonds to find the best fit for your goals.",
            icon: <Search className="w-8 h-8 text-white" />,
            color: "bg-[#1CADA3]"
        },
        {
            id: 3,
            title: "Make Payment",
            desc: "Transfer funds directly to the clearing corporation or issuer via Net Banking or UPI. No third-party wallet risks.",
            icon: <Wallet className="w-8 h-8 text-white" />,
            color: "bg-[#2076C7]"
        },
        {
            id: 4,
            title: "Track Returns",
            desc: "Receive interest payouts directly in your bank account and track your portfolio performance on our dashboard.",
            icon: <TrendingUp className="w-8 h-8 text-white" />,
            color: "bg-[#1CADA3]"
        }
    ];

    return (
        <section className="py-10 bg-[#F8FBFE]" id="investor-guide">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Start Investing in 4 Simple Steps
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-lg text-gray-600 font-medium">
                        Your journey to smarter, secured fixed-income investments is easy, digital, and transparent.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line for Desktop */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-200 -z-10 rounded-full"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center shadow-lg mb-8 ring-8 ring-white transition-transform duration-300 group-hover:scale-110`}>
                                {step.icon}
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full w-full">
                                <div className="text-sm font-black text-gray-300 mb-2 uppercase tracking-widest">Step 0{step.id}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default InvestorGuide;



