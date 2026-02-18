import { CheckCircle2, TrendingDown, LayoutGrid, Shield, Target } from "lucide-react";

export default function BondBenefits() {
    const benefits = [
        {
            title: "Fixed & Predictable Income",
            description: "Receive regular interest payments (coupons) throughout the tenure of the bond.",
            icon: <CheckCircle2 className="text-[#1CADA3]" size={24} />
        },
        {
            title: "Lower Volatility",
            description: "Bonds generally experience less price fluctuation compared to the equity markets.",
            icon: <TrendingDown className="text-[#2076C7]" size={24} />
        },
        {
            title: "Portfolio Diversification",
            description: "Reduce overall portfolio risk by adding fixed-income assets that behave differently from stocks.",
            icon: <LayoutGrid className="text-orange-500" size={24} />
        },
        {
            title: "Capital Protection",
            description: "Secured bonds are backed by assets, providing an added layer of security for your principal.",
            icon: <Shield className="text-purple-500" size={24} />
        }
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-16">
                    <Target className="text-[#1CADA3]" size={36} />
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">
                        Why Invest in Bonds?
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
                            <div className="mb-6 p-3 bg-gray-50 rounded-2xl w-fit">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
