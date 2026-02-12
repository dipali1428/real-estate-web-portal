"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Login from "../auth/login/page"; // Adjust path accordingly
import PartnershipPage from "../auth/register/page";
import CustomerRegistrationForm from "../auth/signup/page"; // Import your new Customer file
import { X } from "lucide-react";

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
    closeAll: () => { },
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPartnerOpen, setIsPartnerOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false); // New state

    const closeAll = () => {
        setIsLoginOpen(false);
        setIsPartnerOpen(false);
        setIsSignupOpen(false);
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
        </ModalContext.Provider>
    );
};