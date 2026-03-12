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
        <section className="py-16 md:py-24 bg-[#F8FBFE]" id="investor-guide">
            {/* Added px-6 for mobile side margins and mx-auto for centering */}
            <div className="container-custom mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent leading-tight">
                        Start Investing in 4 Simple Steps
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

                    <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                        Your journey to smarter, secured fixed-income investments is easy, digital, and transparent.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 relative">
                    
                    {/* Connecting Line for Desktop - hidden on mobile/tablet */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-200 -z-0 rounded-full"></div>

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center group">
                            
                            {/* Step Icon Circle */}
                            <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full ${step.color} flex items-center justify-center shadow-lg mb-6 md:mb-8 ring-8 ring-white transition-transform duration-300 group-hover:scale-110`}>
                                {step.icon}
                            </div>

                            {/* Step Card */}
                            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full w-full flex flex-col items-center">
                                <div className="text-xs md:text-sm font-black text-gray-300 mb-2 uppercase tracking-[0.2em]">
                                    Step 0{step.id}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {step.title}
                                </h3>
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