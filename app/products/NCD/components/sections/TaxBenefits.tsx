import { Receipt, Calculator as CalcIcon, Percent, FileText, ArrowRight } from 'lucide-react';
import TaxGuideContent from './TaxGuideContent';

const TaxBenefits = () => {
    const taxData = [
        { type: 'Interest Income', rate: 'As per Income Slab', tenure: 'During Tenure', detail: 'TDS @ 10% applicable if interest exceeds ₹5,000 p.a. (unless Form 15G/H submitted)' },
        { type: 'Short Term Capital Gains (STCG)', rate: 'As per Income Slab', tenure: '< 12 Months', detail: 'Applicable if NCD sold on stock exchange within 1 year of allotment' },
        { type: 'Long Term Capital Gains (LTCG)', rate: '10% (Without Indexation)', tenure: '> 12 Months', detail: 'Applicable if NCD sold on stock exchange after 1 year of holding' },
    ];

    const handleDownload = () => {
        window.print();
    };

    return (
        <section className="py-24 bg-white" id="tax">
            <div className="container-custom">
                {/* Centered Heading Section */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 px-4">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                        Tax Benefits & Efficiency
                    </h2>
                    <div className="w-20 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">
                        Understanding the tax treatment of NCDs is crucial for maximizing your post-tax returns. NCDs offer attractive capital gains taxation compared to traditional FDs.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Left Section */}
                    <div className="lg:w-2/5 flex flex-col justify-between h-full">
                        <div className="space-y-6">
                            <div className="group p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#1CADA3] text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-lg shadow-[#1CADA3]/20 flex items-center justify-center">
                                        <Percent className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h4 className="font-extrabold text-[#2076C7] text-lg md:text-xl flex items-center">
                                        Tax Efficient Alternative
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    While Bank FD interest is always taxed at slab rates, NCDs sold after 1 year qualify for LTCG at a flat 10%, making them highly beneficial for investors in higher tax brackets.
                                </p>
                            </div>

                            <div className="group p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-[#2076C7] text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-lg shadow-[#2076C7]/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h4 className="font-extrabold text-[#2076C7] text-lg md:text-xl flex items-center">
                                        TDS Management
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                    Submit Form 15G (for individuals) or 15H (for senior citizens) to avoid TDS deduction if your total annual income is below the taxable limit.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-center lg:justify-start">
                            <button
                                onClick={handleDownload}
                                className="flex items-center space-x-3 pl-5 text-[#2076C7] font-extrabold group hover:text-[#1CADA3] transition-colors"
                            >
                                <span className="border-b-2 border-transparent group-hover:border-[#1CADA3]">
                                    Download Comprehensive Tax Guide
                                </span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:w-3/5 w-full flex h-full">
                        <div className="bg-gradient-to-br from-[#F8FBFE] via-white to-[#F0F7FF] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl border border-blue-50 relative overflow-hidden w-full flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1CADA3]/5 rounded-full blur-[80px] pointer-events-none" />

                            <h3 className="text-xl md:text-2xl text-slate-500 font-extrabold mb-6 md:mb-8 flex items-center">
                                <Receipt className="w-5 h-5 md:w-6 md:h-6 mr-3 text-[#2076C7]" />
                                Tax Treatment Table
                            </h3>

                            <div className="space-y-4 flex-1 flex flex-col justify-center">
                                {taxData.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                            <span className="font-extrabold text-[#2076C7] text-lg">
                                                {item.type}
                                            </span>
                                            <span className="bg-[#1CADA3] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.1em]">
                                                {item.rate}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-[#2076C7] font-black mb-3">
                                            <CalcIcon className="w-4 h-4 mr-2" />
                                            Holding Period: {item.tenure}
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-5 bg-[#2076C7]/5 border border-[#2076C7]/10 rounded-2xl">
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

            {/* Printable Tax Guide Content - Visible only during printing */}
            <div className="hidden print:block print:static print:w-full print:h-auto">
                <TaxGuideContent />
            </div>
        </section>
    );
};

export default TaxBenefits;
