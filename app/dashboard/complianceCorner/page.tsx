'use client'; // Add this at the top

import React from 'react';

const ComplianceCorner = () => {
    const complianceDocuments = [
        { 
            name: 'Code of Conduct',
            filename: 'ABSLI FESTIVE FLIGHTS CONTEST.pdf'
        },
        { 
            name: 'Anti-Money Laundering (AML) Policy',
            filename: 'AXIS MAX FESTIVE FLIGHTS CONTEST.pdf'
        },
        { 
            name: 'Know Your Customer (KYC) Guidelines',
            filename: 'BAJAJ LIFE FESTIVE FLIGHTS CONTEST.pdf'
        },
        { 
            name: 'Latest IRDAI Circulars (Summary)',
            filename: 'DIGIT LIFE FESTIVE FLIGHTS CONTEST.pdf'
        }
    ];

    const complianceUpdates = [
        {
            title: 'Policies & SOPs',
            content: [
                'Loan sourcing guidelines',
                'Do\'s & Don\'ts for DSAs',
                'Mis-selling prevention policy',
                'Anti-fraud policy',
                'Data privacy & security policy',
                'Complaint handling procedure',
                'Documentation standard operating procedures',
                'Sourcing eligibility matrix for each product'
            ],
            date: 'Posted: October 10, 2023'
        },
        {
            title: 'Mandatory Disclosures',
            content: [
                'Interest rate slabs & processing fee matrix',
                'Product-wise criteria (Home loan / Personal loan / Business loan etc.)',
                'Payout structure & rules',
                'Pre-approved & restricted categories',
                'NBFC/Banks empaneled list',
                'Digital lending norms',
                'DSA Code of Conduct'
            ],
            date: 'Posted: September 25, 2023'
        },
        {
            title: 'Legal & Agreements',
            content: [
                'DSA Agreement (downloadable)',
                'Addendum / policy changes',
                'Commission terms & conditions',
                'Loan partner agreements',
                'Service-level agreements'
            ],
            date: 'Posted: September 25, 2023'
        }
    ];

    const handleDocumentDownload = (filename: string) => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = `/pdfs/lifeinsurancepdf/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-700 mb-2">Compliance Corner</h1>
                    <p className="text-gray-600">
                        Stay updated with regulatory guidelines and company policies.
                    </p>
                </div>

                {/* Key Compliance Documents */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4">
                        Key Compliance Documents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {complianceDocuments.map((doc, index) => (
                            <button
                                key={index}
                                onClick={() => handleDocumentDownload(doc.filename)}
                                className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-200 w-full text-left group cursor-pointer"
                            >
                                <div className="flex-shrink-0 w-6 h-6 bg-[#2076C7] rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-200">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-slate-700 text-sm flex-1">{doc.name}</span>
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rest of the component remains the same */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4">
                        Compliance Updates
                    </h2>
                    <div className="space-y-4">
                        {complianceUpdates.map((update, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-slate-700">
                                        {update.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {update.date}
                                    </p>
                                </div>
                                
                                <ul className="space-y-1">
                                    {update.content.map((point, pointIndex) => (
                                        <li key={pointIndex} className="flex items-start text-gray-600 text-sm">
                                            <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        For any compliance-related queries, please contact the Compliance Department.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComplianceCorner;