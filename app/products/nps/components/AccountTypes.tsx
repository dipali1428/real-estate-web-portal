'use client';

export default function AccountTypes() {
    return (
        <section id="account-types" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm pb-2">
                        NPS Account Types
                    </h2>
                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                    <p className="mt-4 text-slate-800">
                        Choose the right account structure for your needs.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-2 border-blue-200 rounded-lg overflow-hidden shadow-sm">
                        <thead>
                            <tr>
                                <th className="p-4 bg-gray-50/50 text-blue-900 font-bold border-b border-gray-200 w-1/4">Feature</th>
                                <th className="p-4 bg-blue-50/50 text-blue-500 font-bold border-b border-primary w-1/3">Tier I (Pension Account)</th>
                                <th className="p-4 bg-teal-50/50 text-green-700 font-bold border-b border-gray-200  w-1/3">Tier II (Investment Account)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">Purpose</td>
                                <td className="p-4 text-slate-800">Retirement Savings (Mandatory)</td>
                                <td className="p-4 text-slate-800">Voluntary Savings (Optional)</td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">Withdrawals</td>
                                <td className="p-4 text-slate-800">Restricted (Lock-in till 60)</td>
                                <td className="p-4 text-slate-800">Unrestricted (Anytime withdrawal)</td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">Tax Benefit</td>
                                <td className="p-4 text-slate-800">Available u/s 80CCD(1) & 80CCD(1B)</td>
                                <td className="p-4 text-slate-800">No Tax Benefit*</td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">Minimum Contribution</td>
                                <td className="p-4 text-slate-800">₹500 per contribution / ₹1,000 per year</td>
                                <td className="p-4 text-slate-800">₹250 per contribution</td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">Account Status</td>
                                <td className="p-4 text-slate-800">Individual Pension Account</td>
                                <td className="p-4 text-slate-800">Add-on to Tier I</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-4 text-xs text-gray-600 text-center">*Tier II tax benefits available only for Govt employees with 3-year lock-in.</p>
                </div>
            </div>
        </section>
    );
}
