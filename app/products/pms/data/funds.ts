export interface Fund {
    id: string;
    name: string;
    category: string;
    minInvestment: string;
    horizon: string;
    risk: string;
    returns: string;
    strategy: string;
    fees: string;
    manager: string;
    holdings?: string[];
    highlights: string[];
}

export interface FundsData {
    pms: Fund[];
    aif: Fund[];
}

export const funds: FundsData = {
    pms: [
        {
            id: "concentrated-equity",
            name: "Concentrated Equity Fund",
            category: "Equity-Focused",
            minInvestment: "₹50 Lakhs",
            horizon: "5+ Years",
            risk: "High",
            returns: "28.5% (YTD)",
            strategy: "A high-conviction portfolio of 15-20 stocks focused on multi-cap opportunities with strong fundamentals.",
            fees: "2.0% p.a. Management Fee + 20% Performance Fee above 10% Hurdle",
            manager: "Shweta Dalvi",
            holdings: ["Reliance Industries", "HDFC Bank", "TCS", "Infosys", "ICICI Bank"],
            highlights: [
                "Dynamic rebalancing based on market cycles",
                "Deep fundamental research approach",
                "Direct ownership in Demat account"
            ]
        },
        {
            id: "multi-asset-pms",
            name: "Multi-Asset PMS",
            category: "Multi-Asset",
            minInvestment: "₹50 Lakhs",
            horizon: "3-5 Years",
            risk: "Moderate",
            returns: "18.2% (YTD)",
            strategy: "A balanced approach investing across Equity, Debt, and Gold to provide stable returns with lower volatility.",
            fees: "1.5% p.a. Management Fee + 15% Performance Fee",
            manager: "Shweta Dalvi",
            holdings: ["Nifty ETF", "Gold BeES", "Bharat Bond ETF", "SBI Card"],
            highlights: [
                "Lower volatility than pure equity",
                "Quarterly rebalancing",
                "Tax-efficient allocation"
            ]
        }
    ],
    aif: [] // Placeholder for AIF funds if any
};
