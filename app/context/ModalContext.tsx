"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Login from "../auth/login/page"; // Adjust path accordingly
import PartnershipPage from "../auth/register/page";
import { X } from "lucide-react";

const ModalContext = createContext({
    isLoginOpen: false,
    openLogin: () => { },
    closeLogin: () => { },
    isPartnerOpen: false,
    openPartner: () => { },
    closePartner: () => { },
    closeAll: () => { },
});


export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPartnerOpen, setIsPartnerOpen] = useState(false);

    return (
        <ModalContext.Provider
            value={{
                isLoginOpen,
                openLogin: () => setIsLoginOpen(true),
                closeLogin: () => setIsLoginOpen(false),

                isPartnerOpen,
                openPartner: () => setIsPartnerOpen(true),
                closePartner: () => setIsPartnerOpen(false),

                closeAll: () => {
                    setIsLoginOpen(false);
                    setIsPartnerOpen(false);
                },
            }}>
            {children}

            {/* Login Modal */}
            {isLoginOpen && (
                <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            )}

            {/* Partner Modal */}
            {isPartnerOpen && (
                <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl p-6">
                        <button
                            onClick={() => setIsPartnerOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl cursor-pointer">
                            <X size={20} />
                        </button>
                        <PartnershipPage />
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

