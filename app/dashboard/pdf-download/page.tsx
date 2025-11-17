"use client"
import React from 'react';
import { FileText, BookOpen, FileCheck, ClipboardList, Scale, Download } from 'lucide-react';

// Types
interface Document {
    id: string;
    name: string;
    fileName: string;
    path: string;
}

interface DocumentSection {
    id: string;
    title: string;
    icon: any;
    documents: Document[];
}

// Mock Data - Update paths to match your public/documents folder structure
const mockData: DocumentSection[] = [
    {
        id: 'payout-structure',
        title: 'Payout Structure',
        icon: FileText,
        documents: [
            {
                id: 'doc-1',
                name: 'DSA Commission Structure - 2025.pdf',
                fileName: 'DSA Commission Structure - 2025.pdf',
                path: '/documents/DSA_Commission_Structure_2025.pdf'
            }
        ]
    },
    {
        id: 'product-brochures',
        title: 'Product Brochures',
        icon: BookOpen,
        documents: [
            {
                id: 'doc-2',
                name: 'Life Insurance Product Catalog.pdf',
                fileName: 'Life Insurance Product Catalog.pdf',
                path: '/documents/Life_Insurance_Product_Catalog.pdf'
            },
            {
                id: 'doc-3',
                name: 'Comprehensive Health Insurance Guide.pdf',
                fileName: 'Comprehensive Health Insurance Guide.pdf',
                path: '/documents/Comprehensive_Health_Insurance_Guide.pdf'
            },
            {
                id: 'doc-4',
                name: 'Motor Insurance Brochure.pdf',
                fileName: 'Motor Insurance Brochure.pdf',
                path: '/documents/Motor_Insurance_Brochure.pdf'
            }
        ]
    },
    {
        id: 'policy-documents',
        title: 'Policy Documents',
        icon: FileCheck,
        documents: [
            {
                id: 'doc-5',
                name: 'Sample Policy Wordings - Life.pdf',
                fileName: 'Sample Policy Wordings - Life.pdf',
                path: '/documents/Sample_Policy_Wordings_Life.pdf'
            }
        ]
    },
    {
        id: 'application-forms',
        title: 'Application Forms',
        icon: ClipboardList,
        documents: [
            {
                id: 'doc-6',
                name: 'New Business Application Form.pdf',
                fileName: 'New Business Application Form.pdf',
                path: '/documents/New_Business_Application_Form.pdf'
            }
        ]
    },
    {
        id: 'compliance-documents',
        title: 'Compliance Documents',
        icon: Scale,
        documents: [
            {
                id: 'doc-7',
                name: 'IRDAI Guidelines Summary.pdf',
                fileName: 'IRDAI Guidelines Summary.pdf',
                path: '/documents/IRDAI_Guidelines_Summary.pdf'
            }
        ]
    }
];

const DownloadsPage = () => {
    const handleDownload = (document: Document) => {
        // Create a temporary anchor element to trigger download
        const link = window.document.createElement('a');
        link.href = document.path;
        link.download = document.fileName;
        link.click();

        // Alternative: Open in new tab if download doesn't work
        // window.open(document.path, '_blank');
    };

    const IconComponent = ({ icon: Icon }: { icon: any }) => (
        <Icon className="w-6 h-6 text-teal-600" />
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-teal-700 mb-2">
                        Downloads
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        A centralized repository for all documents essential for your business.
                    </p>
                </div>

                {/* Document Sections */}
                <div className="space-y-8">
                    {mockData.map((section) => (
                        <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Section Header */}
                            <div className="bg-gradient-to-r from-teal-50 to-white px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <IconComponent icon={section.icon} />
                                    <h2 className="text-lg md:text-xl font-bold text-teal-700">
                                        {section.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Documents List */}
                            <div className="divide-y divide-gray-100">
                                {section.documents.map((document) => (
                                    <div
                                        key={document.id}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Document Info */}
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                                                        <svg
                                                            className="w-6 h-6 text-red-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <button
                                                        onClick={() => handleDownload(document)}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline text-left text-sm md:text-base font-medium transition-colors truncate block w-full"
                                                    >
                                                        {document.name}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Download Button */}
                                            <button
                                                onClick={() => handleDownload(document)}
                                                className="flex-shrink-0 p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Note */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-700">
                                <strong>Note:</strong> Make sure to place your PDF files in the <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">public/documents/</code> folder of your Next.js project. Update the file paths in the code if you use a different folder structure.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    All documents are in PDF format. Click on the document name or download icon to save.
                </div>
            </div>
        </div>
    );
};

export default DownloadsPage;