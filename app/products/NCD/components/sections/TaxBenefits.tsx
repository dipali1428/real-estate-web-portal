import { Receipt, Calculator as CalcIcon, Percent, FileText } from 'lucide-react';

const TaxBenefits = () => {
    const taxData = [
        { type: 'Interest Income', rate: 'As per Income Slab', tenure: 'During Tenure', detail: 'TDS @ 10% applicable if interest exceeds ₹5,000 p.a. (unless Form 15G/H submitted)' },
        { type: 'Short Term Capital Gains (STCG)', rate: 'As per Income Slab', tenure: '< 12 Months', detail: 'Applicable if NCD sold on stock exchange within 1 year of allotment' },
        { type: 'Long Term Capital Gains (LTCG)', rate: '10% (Without Indexation)', tenure: '> 12 Months', detail: 'Applicable if NCD sold on stock exchange after 1 year of holding' },
    ];



    return (
        <section className="py-12 md:py-16 bg-white font-sans px-4 sm:px-6 lg:px-8" id="tax">
            <div className="container-custom mx-auto max-w-7xl">

                {/* Centered Heading Section */}
                <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Tax Benefit & Efficiency
                    </h2>

                    <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        Understand how NCDs can help you optimize your post-tax returns through smart investment planning.
                    </p>
                </div>

                {/* Main Content Grid: Stacks on mobile (flex-col), side-by-side on large (lg:flex-row) */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

                    {/* Left Section */}
                    <div className="lg:w-2/5 flex flex-col justify-between space-y-6">
                        <div className="space-y-6">
                            <div className="group p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#1CADA3] text-white p-3 rounded-xl md:rounded-2xl shadow-lg shadow-[#1CADA3]/20 flex items-center justify-center shrink-0">
                                        <Percent className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h4 className="font-extrabold text-[#2076C7] text-lg md:text-xl font-sans">
                                        Tax Efficient Alternative
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    While Bank FD interest is always taxed at slab rates, NCDs sold after 1 year qualify for LTCG at a flat 10%, making them highly beneficial for investors in higher tax brackets.
                                </p>
                            </div>

                            <div className="group p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#2076C7] text-white p-3 rounded-xl md:rounded-2xl shadow-lg shadow-[#2076C7]/20 flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h4 className="font-extrabold text-[#2076C7] text-lg md:text-xl font-sans">
                                        TDS Management
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    Submit Form 15G (for individuals) or 15H (for senior citizens) to avoid TDS deduction if your total annual income is below the taxable limit.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Section */}
                    <div className="lg:w-3/5 w-full">
                        <div className="h-full bg-gradient-to-br from-[#F8FBFE] via-white to-[#F0F7FF] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl border border-blue-50 relative overflow-hidden flex flex-col">
                            {/* Background decoration - hidden on very small screens for clarity */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[80px] pointer-events-none" />

                            <h3 className="text-xl md:text-2xl text-slate-500 font-extrabold mb-6 md:mb-8 flex items-center relative z-10 font-sans">
                                <Receipt className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#2076C7]" />
                                Tax Treatment Table
                            </h3>

                            <div className="space-y-4 flex-1 relative z-10">
                                {taxData.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-blue-50 p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                            <span className="font-extrabold text-[#2076C7] text-base md:text-lg">
                                                {item.type}
                                            </span>
                                            <span className="bg-[#1CADA3] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em] whitespace-nowrap">
                                                {item.rate}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-[11px] md:text-xs text-[#2076C7] font-black mb-3 uppercase">
                                            <CalcIcon className="w-4 h-4 mr-2" />
                                            Holding Period: {item.tenure}
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-5 bg-[#2076C7]/5 border border-[#2076C7]/10 rounded-2xl relative z-10">
                                <p className="text-[11px] text-[#2076C7] leading-relaxed font-bold">
                                    <span className="text-[#0B1C2E] uppercase tracking-wider mr-2">
                                        Disclaimer:
                                    </span>
                                    Tax laws are subject to change. Investors are advised to consult their tax consultant before making any investment decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default TaxBenefits;