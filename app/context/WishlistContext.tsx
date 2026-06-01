"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types for wishlist items (copied from app/customer/wishlist/page.tsx for consistency)
export interface MutualFundMetrics {
    returns?: { '1Y': number; '3Y': number; '5Y': number };
    risk: string;
    expenseRatio?: number;
    minSIP?: number;
    nav?: number;
}

export interface PMSMetrics {
    returns?: { '1Y': number; '3Y': number; '5Y': number };
    benchmark?: string;
    minInvestment?: number;
    lockIn?: string;
    risk: string;
}

export interface AIFMetrics {
    category?: string;
    minInvestment?: number;
    targetIRR?: number;
    lockIn?: string;
    tenure?: string;
    sector?: string;
    risk: string;
}

export interface FixedIncomeMetrics {
    interestRate?: number;
    ytm?: number;
    creditRating?: string;
    tenure?: string;
    maturityAmount?: number;
    minInvestment?: number;
    prematureWithdrawal?: string;
    tds?: string;
    couponRate?: number;
    maturityDate?: string;
    interestPayment?: string;
    risk: string;
}

export interface NPSMetrics {
    equityAllocation?: number;
    expectedPension?: number;
    taxBenefit?: string;
    estimatedCorpus?: number;
    risk: string;
}

export interface RealEstateMetrics {
    price?: number;
    location?: string;
    expectedAppreciation?: number;
    rentalYield?: number;
    possessionDate?: string;
    developer?: string;
    emi?: number;
    risk: string;
}

export interface UnlistedMetrics {
    sector?: string;
    lastFundingRound?: string;
    lockIn?: string;
    expectedExit?: string;
    minLot?: number;
    currentPrice?: number;
    risk: string;
}

export interface EducationLoanMetrics {
    amount?: string | number;
    rate?: string | number;
    tenure?: string;
    risk: string;
}

export interface GenericInsuranceMetrics {
    amount?: string | number;
    rate?: string | number;
    tenure?: string;
    risk: string;
}

export interface CreditCardMetrics {
    amount?: string | number;
    rate?: string | number;
    tenure?: string;
    risk: string;
}

export type ProductMetrics =
    | MutualFundMetrics
    | PMSMetrics
    | AIFMetrics
    | FixedIncomeMetrics
    | NPSMetrics
    | RealEstateMetrics
    | UnlistedMetrics
    | EducationLoanMetrics
    | GenericInsuranceMetrics
    | CreditCardMetrics;

export interface WishlistItem {
    id: string | number;
    category: string;
    name: string;
    logo: string;
    keyMetrics: ProductMetrics;
    addedDate: string;
    fitScore?: number;
    portfolioFit?: string;
    alert?: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    toggleWishlist: (item: WishlistItem) => void;
    isInWishlist: (id: string | number) => boolean;
    removeFromWishlist: (id: string | number) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    // useEffect(() => {
    //     const savedWishlist = localStorage.getItem("infinity_wishlist");
    //     if (savedWishlist) {
    //         try {
    //             setWishlist(JSON.parse(savedWishlist));
    //         } catch (e) {
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // localStorage.setItem("infinity_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev.filter((i) => i.id !== item.id);
            }
            return [...prev, item];
        });
    };

    const isInWishlist = (id: string | number) => {
        return wishlist.some((item) => item.id === id);
    };

    const removeFromWishlist = (id: string | number) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            isInWishlist,
            removeFromWishlist,
            clearWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};