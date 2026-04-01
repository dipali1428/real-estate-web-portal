"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Login from "../auth/login/page"; // Adjust path accordingly
import PartnershipPage from "../auth/register/page";
import CustomerRegistrationForm from "../auth/signup/page"; // Import your new Customer file
import QuoteRequestForm from "../products/corporate-insurance/components/QuoteRequestForm"; // Import Quote Form
import { X } from "lucide-react";
import ApplyNowModal from "../component/ApplyNowModal";
import ContactSection from "../component/ContactSection";

const ModalContext = createContext({
    isLoginOpen: false,
    openLogin: () => { },
    closeLogin: () => { },
    isPartnerOpen: false,
    openPartner: () => { },
    closePartner: () => { },
    isSignupOpen: false, // Added
    openSignup: () => { }, // Added
    closeSignup: () => { }, // Added
    isQuoteOpen: false, // Added Quote
    openQuote: (productName?: string) => { }, // Added Quote
    closeQuote: () => { }, // Added Quote
    isApplyNowOpen: false,
    openApplyNow: (productName?: string) => { },
    closeApplyNow: () => { },
    isContactOpen: false,
    openContact: (productName?: string) => { },
    closeContact: () => { },
    closeAll: () => { },
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPartnerOpen, setIsPartnerOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false); // New state
    const [isQuoteOpen, setIsQuoteOpen] = useState(false); // Quote State
    const [quoteProduct, setQuoteProduct] = useState<string | undefined>(undefined); // Product for Quote
    const [isApplyNowOpen, setIsApplyNowOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [appliedProduct, setAppliedProduct] = useState<string | undefined>(undefined);

    const closeAll = () => {
        setIsLoginOpen(false);
        setIsPartnerOpen(false);
        setIsSignupOpen(false);
        setIsSignupOpen(false);
        setIsQuoteOpen(false);
        setIsApplyNowOpen(false);
        setIsContactOpen(false);
    };

    return (
        <ModalContext.Provider
            value={{
                isLoginOpen,
                openLogin: () => { closeAll(); setIsLoginOpen(true); },
                closeLogin: () => setIsLoginOpen(false),

                isPartnerOpen,
                openPartner: () => { closeAll(); setIsPartnerOpen(true); },
                closePartner: () => setIsPartnerOpen(false),

                isSignupOpen,
                openSignup: () => { closeAll(); setIsSignupOpen(true); },
                closeSignup: () => setIsSignupOpen(false),

                isQuoteOpen,
                openQuote: (productName?: string) => {
                    closeAll();
                    setQuoteProduct(productName);
                    setIsQuoteOpen(true);
                },
                closeQuote: () => setIsQuoteOpen(false),

                isApplyNowOpen,
                openApplyNow: (productName?: string) => {
                    closeAll();
                    setAppliedProduct(productName);
                    setIsApplyNowOpen(true);
                },
                closeApplyNow: () => setIsApplyNowOpen(false),

                isContactOpen,
                openContact: (productName?: string) => {
                    closeAll();
                    if (productName) setAppliedProduct(productName);
                    setIsContactOpen(true);
                },
                closeContact: () => setIsContactOpen(false),

                closeAll,
            }}>
            {children}

            {/* Login Modal */}
            {isLoginOpen && (
                <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            )}

            {/* Partner Modal (DSA) */}
            {isPartnerOpen && (
                <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                        <button
                            onClick={() => setIsPartnerOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors z-10 cursor-pointer">
                            <X size={24} />
                        </button>
                        <PartnershipPage />
                    </div>
                </div>
            )}

            {/* Customer Signup Modal */}
            {isSignupOpen && (
                <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                        <button
                            onClick={() => setIsSignupOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors z-10 cursor-pointer">
                            <X size={24} />
                        </button>
                        <CustomerRegistrationForm />
                    </div>
                </div>
            )}

            {/* Custom Quote Modal */}
            {isQuoteOpen && (
                <QuoteRequestForm
                    isOpen={isQuoteOpen}
                    onClose={() => setIsQuoteOpen(false)}
                    initialProduct={quoteProduct}
                />
            )}

            {/* Apply Now (Processing) Modal */}
            <ApplyNowModal
                isOpen={isApplyNowOpen}
                onClose={() => setIsApplyNowOpen(false)}
                productName={appliedProduct}
                onConfirm={() => {
                    setIsApplyNowOpen(false);
                    setIsContactOpen(true);
                }}
            />

            {/* Contact Section Modal */}
            {isContactOpen && (
                <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto">
                    <div className="relative bg-white rounded-[3rem] w-full max-w-6xl my-8 shadow-2xl">
                        <button
                            onClick={() => setIsContactOpen(false)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors z-[1010] p-2 bg-slate-50 rounded-full hover:bg-slate-100 shadow-sm"
                        >
                            <X size={24} />
                        </button>
                        <div className="max-h-[85vh] overflow-y-auto rounded-[3rem]">
                           <ContactSection productName={appliedProduct} />
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};