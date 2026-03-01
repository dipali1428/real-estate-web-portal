"use client";

import { CheckCircle2, FileText, CreditCard, UserCheck, Car } from "lucide-react";

const requirements = [
    {
        title: "Registration Certificate (RC)",
        description: "Vehicle engine number & chassis number details.",
        icon: <Car className="w-5 h-5 text-blue-600" />,
    },
    {
        title: "Previous Policy Details",
        description: "Policy number and expiry date of previous insurance.",
        icon: <FileText className="w-5 h-5 text-blue-600" />,
    },
    {
        title: "Driving License",
        description: "Valid driving license of the vehicle owner.",
        icon: <UserCheck className="w-5 h-5 text-blue-600" />,
    },
    {
        title: "Aadhaar Card",
        description: "For identity and address verification (KYC).",
        icon: <CreditCard className="w-5 h-5 text-blue-600" />,
    },
    {
        title: "PAN Card",
        description: "Mandatory for financial transactions and KYC.",
        icon: <CreditCard className="w-5 h-5 text-blue-600" />,
    },
    {
        title: "Vehicle Purchase Invoice",
        description: "Required specifically for new vehicle insurance.",
        icon: <FileText className="w-5 h-5 text-blue-600" />,
    },
];

export default function Documents() {
    return (
        <section id="documents" className="py-10 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] text-transparent bg-clip-text inline-block">
                        Hassle-Free
                        Digital Documentation
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Buying motor insurance is now paperless and instant. Keep these details handy for a seamless experience.
                    </p>

                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                    <div className="lg:w-[60%] w-full max-w-2xl mx-auto lg:mx-0 lg:-mt-22">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-video group">
                            <img
                                src="/motor-insurance/documents.jpg"
                                alt="Motor insurance documentation and registration"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-tr from-[#2076C7]/20 to-transparent" />
                        </div>
                    </div>

                    <div className="lg:w-[40%] w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {requirements.map((req, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-start gap-4"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        {req.icon}
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-800 block mb-1">{req.title}</span>
                                        <p className="text-xs text-gray-500 leading-tight">{req.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                <CheckCircle2 className="text-blue-600" />
                            </div>
                            <p className="text-sm text-blue-800 font-medium">
                                Soft copies of these documents are perfectly fine for our lightning-fast online verification.
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}
