"use client"
import React, { useState } from 'react';
import { Download, Info } from 'lucide-react';

// Types
interface Campaign {
    id: string;
    title: string;
    description: string;
    personalizedPreview: {
        name: string;
        contactNo: string;
    };
}

// Mock Data
const mockData = {
    userName: 'Rajesh Kumar',
    userContact: '9876543210',
    campaigns: [
        {
            id: 'campaign-1',
            title: 'SecureFuture Life Plan',
            description: 'A comprehensive life insurance plan that provides financial security for your family\'s future.',
            personalizedPreview: {
                name: 'Rajesh Kumar',
                contactNo: '9876543210'
            }
        },
        {
            id: 'campaign-2',
            title: 'HealthGuard Plus',
            description: 'Complete health insurance coverage with cashless hospitalization and wide network of hospitals.',
            personalizedPreview: {
                name: 'Rajesh Kumar',
                contactNo: '9876543210'
            }
        },
        {
            id: 'campaign-3',
            title: 'AutoShield Motor Insurance',
            description: 'Comprehensive motor insurance with zero depreciation and roadside assistance.',
            personalizedPreview: {
                name: 'Rajesh Kumar',
                contactNo: '9876543210'
            }
        },
        {
            id: 'campaign-4',
            title: 'HomeSafe Property Insurance',
            description: 'Protect your home and belongings against natural disasters and theft.',
            personalizedPreview: {
                name: 'Rajesh Kumar',
                contactNo: '9876543210'
            }
        }
    ]
};

const MarketingCampaigns = () => {
    const [data] = useState(mockData);

    const handleDownload = (campaignId: string, campaignTitle: string) => {
        alert(`Download functionality for ${campaignTitle} - Connect your API here`);
        // Replace with: await campaignService.downloadPersonalizedPDF(campaignId);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
                        Marketing Campaigns
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Access the latest marketing materials, personalized with your details for effective client engagement.
                    </p>
                </div>

                {/* Info Banner */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                        Download your personalized one-pager for our latest campaign.
                    </p>
                </div>

                {/* Campaigns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.campaigns.map((campaign) => (
                        <div
                            key={campaign.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                        >
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {campaign.title}
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {campaign.description}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                {/* Personalized Preview */}
                                <div className="bg-gray-50 rounded-md p-4 mb-4">
                                    <div className="text-sm mb-3">
                                        <span className="font-semibold text-gray-700">Personalized Preview:</span>
                                        <span className="text-gray-600"> This flyer will be auto-filled with: </span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="font-semibold text-gray-700">Your Name:</span>
                                            <span className="text-gray-900 ml-1">{campaign.personalizedPreview.name}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-700">Your Contact No.:</span>
                                            <span className="text-gray-900 ml-1">{campaign.personalizedPreview.contactNo}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <button
                                    onClick={() => handleDownload(campaign.id, campaign.title)}
                                    className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Personalized PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    Note: Download buttons are connected to mock handlers. Replace with your API calls.
                </div>
            </div>
        </div>
    );
};

export default MarketingCampaigns;