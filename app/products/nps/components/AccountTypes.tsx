'use client';

export default function AccountTypes() {
    return (
        <section id="account-types" className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-1">
                        NPS Account Types
                    </h2>
                    <p className="mt-4 text-slate-800">
                        Choose the right account structure for your needs.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl shadow-xl border-2 border-gray-100">
                    <table className="w-full text-left border-collapse border border-gray-200 overflow-hidden">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-200">
                                <th className="p-5 text-gray-900 font-extrabold uppercase tracking-wider text-xs w-1/4">Feature</th>
                                <th className="p-5 text-[#1CADA3] font-extrabold uppercase tracking-wider text-xs w-1/3">Tier I (Pension Account)</th>
                                <th className="p-5 text-[#1CADA3] font-extrabold uppercase tracking-wider text-xs w-1/3">Tier II (Investment Account)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-5 font-bold text-gray-800">Purpose</td>
                                <td className="p-5 text-gray-600 font-medium">Retirement Savings (Mandatory)</td>
                                <td className="p-5 text-gray-600 font-medium">Voluntary Savings (Optional)</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-5 font-bold text-gray-800">Withdrawals</td>
                                <td className="p-5 text-gray-600 font-medium">Restricted (Lock-in till 60)</td>
                                <td className="p-5 text-gray-600 font-medium">Unrestricted (Anytime withdrawal)</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-5 font-bold text-gray-800">Tax Benefit</td>
                                <td className="p-5 text-gray-600 font-medium">Available u/s 80CCD(1) & 80CCD(1B)</td>
                                <td className="p-5 text-gray-600 font-medium">No Tax Benefit*</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-5 font-bold text-gray-800">Minimum Contribution</td>
                                <td className="p-5 text-gray-600 font-medium">₹500 per contribution / ₹1,000 per year</td>
                                <td className="p-5 text-gray-600 font-medium">₹250 per contribution</td>
                            </tr>
                            <tr className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-5 font-bold text-gray-800">Account Status</td>
                                <td className="p-5 text-gray-600 font-medium">Individual Pension Account</td>
                                <td className="p-5 text-gray-600 font-medium">Add-on to Tier I</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-gray-600 text-center">*Tier II tax benefits available only for Govt employees with 3-year lock-in.</p>
                </div>
            </div>
        </section>
    );
}
