import { AlertTriangle } from "lucide-react";

export default function RiskSection() {
    const risks = [
        {
            title: "Credit Risk",
            description: "The issuer may defaulted and fail to pay interest or principal. We mitigate this by curating highly-rated bonds."
        },
        {
            title: "Interest Rate Risk",
            description: "Bond prices normally fall when interest rates rise. However, if held to maturity, you still receive the full principal."
        },
        {
            title: "Liquidity Risk",
            description: "While bonds can be sold on exchanges, finding a buyer immediately at the desired price may not always be possible."
        },
        {
            title: "Market Risk",
            description: "The market value of bonds may fluctuate due to changes in economic conditions or issuer performance."
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 justify-center mb-12">
                        <AlertTriangle className="text-[#1CADA3]" size={28} />
                        <h2 className="text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2076C7] to-[#1CADA3]">Risk Factors</h2>
                    </div>

                    <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100/50">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                            {risks.map((risk, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">• {risk.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {risk.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-blue-100 text-xs text-gray-500 italic leading-relaxed">
                            Disclaimer: Bond investments are subject to market risks. Please read the offer document carefully before investing. Infinity Arthvishva does not guarantee returns on corporate bonds.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
