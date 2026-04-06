export interface PMSProduct {
  name: string;
  desc: string;
  link: string;
  risk: string;
  horizon: string;
  color: string;
  category: "Multi-Cap" | "Mid & Small-Cap" | "Ethical";
  returns: string;
  minInvestment: string;
  strategyDetails?: string;
  holdings?: { name: string; weight: string }[];
  benchmark?: string;
  inceptionDate?: string;
  investmentStyle?: string;
  portfolioSize?: string;
  performance?: { period: string; strategy: number; benchmark: number }[];
  marketCap?: { label: string; value: number }[];
  sectorAllocation?: { name: string; value: number }[];
  strategyType?: string;
  bestSuitedFor?: string;
}

export const MIN_INVESTMENT = 5000000; // 50 Lakhs

export const pmsProducts: PMSProduct[] = [
    { 
        name: "Carnelian Capital Compounder Strategy", 
        desc: "Multi-cap strategy focused on 'Magic' (Growth) and 'Compounder' (Quality) businesses.", 
        link: "/products/pms/carnelian-compounder", 
        risk: "High Risk", 
        horizon: "5+ Years", 
        color: "#2076C7", 
        category: "Multi-Cap", 
        returns: "24.5%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Focuses on businesses with strong growth ('Magic') and sustainable quality ('Compounder').",
        benchmark: "NIFTY 500 TRI",
        inceptionDate: "26 May 2019",
        investmentStyle: "Growth & Quality",
        portfolioSize: "₹1,240 Cr",
        strategyType: "Quality Growth",
        bestSuitedFor: "Long-term compounding",
        performance: [
            { period: "FY 2021-22", strategy: 17.5, benchmark: 15.2 },
            { period: "FY 2022-23", strategy: 13.1, benchmark: 10.8 },
            { period: "FY 2023-24", strategy: 31.8, benchmark: 26.5 },
            { period: "FY 2024-25", strategy: 11.2, benchmark: 9.4 }
        ],
        marketCap: [
            { label: "Large Cap", value: 68 },
            { label: "Mid Cap", value: 22 },
            { label: "Small Cap", value: 8 },
            { label: "Cash", value: 2 }
        ],
        sectorAllocation: [
            { name: "Financials", value: 20.4 },
            { name: "Information Technology", value: 13.9 },
            { name: "Consumer Discretionary", value: 13.4 },
            { name: "Industrials", value: 12.3 },
            { name: "Health Care", value: 8.9 }
        ],
        holdings: [
            { name: "HDFC Bank Ltd", weight: "8.2%" },
            { name: "ICICI Bank Ltd", weight: "7.5%" },
            { name: "Reliance Industries", weight: "6.8%" },
            { name: "Infosys Ltd", weight: "5.4%" },
            { name: "Tata Consultancy Services", weight: "4.9%" }
        ]
    },
    { 
        name: "Carnelian Shift Strategy", 
        desc: "High-conviction mid & small-cap strategy focused on manufacturing and technology leaders.", 
        link: "/products/pms/carnelian-shift", 
        risk: "High Risk", 
        horizon: "5+ Years", 
        color: "#1CADA3", 
        category: "Mid & Small-Cap", 
        returns: "32.1%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Aims to capture the structural shift in Indian manufacturing and technology sectors.",
        benchmark: "NIFTY 500 TRI",
        inceptionDate: "04 Oct 2020",
        investmentStyle: "Structural Shift",
        portfolioSize: "₹284 Cr",
        strategyType: "Growth",
        bestSuitedFor: "Aggressive growth seekers",
        performance: [
            { period: "Since Inception", strategy: 41.2, benchmark: 24.5 },
            { period: "1 Year", strategy: 38.4, benchmark: 26.1 }
        ],
        marketCap: [
            { label: "Large Cap", value: 12 },
            { label: "Mid Cap", value: 38 },
            { label: "Small Cap", value: 46 },
            { label: "Cash", value: 4 }
        ],
        sectorAllocation: [
            { name: "Industrials", value: 28.4 },
            { name: "Information Technology", value: 18.9 },
            { name: "Health Care", value: 12.4 },
            { name: "Materials", value: 11.2 },
            { name: "Consumer Discretionary", value: 10.8 }
        ],
        holdings: [
            { name: "Kaynes Technology India", weight: "7.4%" },
            { name: "KEI Industries Ltd", weight: "6.8%" },
            { name: "KPIT Technologies Ltd", weight: "6.2%" },
            { name: "Praj Industries Ltd", weight: "5.9%" },
            { name: "Timken India Ltd", weight: "5.4%" }
        ]
    },
    { 
        name: "Carnelian Contra Portfolio Strategy", 
        desc: "Large-cap-biased multi-cap strategy following a contrarian, absolute-return approach.", 
        link: "/products/pms/carnelian-contra", 
        risk: "Moderate to High", 
        horizon: "3+ Years", 
        color: "#2076C7", 
        category: "Multi-Cap", 
        returns: "18.8%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Invests in undervalued companies with strong fundamentals that are currently out of favor.",
        benchmark: "NIFTY 500 TRI",
        inceptionDate: "24 May 2021",
        investmentStyle: "Contrarian Value",
        portfolioSize: "₹96 Cr",
        strategyType: "Contrarian",
        bestSuitedFor: "Defensive investors",
        performance: [
            { period: "FY 2023-24", strategy: 28.9, benchmark: 26.5 },
            { period: "FY 2024-25", strategy: 14.1, benchmark: 9.4 }
        ],
        marketCap: [
            { label: "Large Cap", value: 58 },
            { label: "Mid Cap", value: 26 },
            { label: "Small Cap", value: 12 },
            { label: "Cash", value: 4 }
        ],
        sectorAllocation: [
            { name: "Financials", value: 24.5 },
            { name: "Utilities", value: 16.2 },
            { name: "Materials", value: 14.1 },
            { name: "Energy", value: 12.8 },
            { name: "Consumer Discretionary", value: 11.4 }
        ],
        holdings: [
            { name: "State Bank of India", weight: "6.5%" },
            { name: "NTPC Ltd", weight: "6.2%" },
            { name: "Coal India Ltd", weight: "5.8%" },
            { name: "Hindalco Industries", weight: "5.4%" },
            { name: "Axis Bank Ltd", weight: "5.1%" }
        ]
    },
    { 
        name: "PGIM India Core Equity Portfolio", 
        desc: "A core equity strategy investing in high-quality Indian companies available at reasonable valuations.", 
        link: "/products/pms/pgim-india-core-equity", 
        risk: "Moderate", 
        horizon: "3+ Years", 
        color: "#2076C7", 
        category: "Multi-Cap", 
        returns: "16.5%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Follows a growth-at-reasonable-price (GARP) philosophy for core equity exposure.",
        benchmark: "NIFTY 500 TRI",
        inceptionDate: "08 Jul 2013",
        investmentStyle: "Value/GARP",
        portfolioSize: "₹120 Cr",
        strategyType: "Core Equity",
        bestSuitedFor: "Stability-focused",
        performance: [
            { period: "FY 2023-24", strategy: 34.2, benchmark: 26.5 },
            { period: "FY 2024-25", strategy: 8.4, benchmark: 9.4 }
        ],
        marketCap: [
            { label: "Large Cap", value: 62 },
            { label: "Mid Cap", value: 24 },
            { label: "Small Cap", value: 11 },
            { label: "Cash", value: 3 }
        ],
        sectorAllocation: [
            { name: "Financials", value: 28.4 },
            { name: "Industrials", value: 16.2 },
            { name: "Consumer Discretionary", value: 12.4 },
            { name: "Information Technology", value: 11.2 },
            { name: "Materials", value: 10.8 }
        ],
        holdings: [
            { name: "HDFC Bank Ltd", weight: "7.8%" },
            { name: "ICICI Bank Ltd", weight: "7.2%" },
            { name: "Infosys Ltd", weight: "6.5%" },
            { name: "Cummins India Ltd", weight: "5.9%" },
            { name: "Bharat Electronics Ltd", weight: "5.4%" }
        ]
    },
    { 
        name: "PGIM India Equity Portfolio", 
        desc: "Diversified multi-cap equity portfolio aiming for long-term capital appreciation.", 
        link: "/products/pms/pgim-india-equity", 
        risk: "Moderate to High", 
        horizon: "3+ Years", 
        color: "#2076C7", 
        category: "Multi-Cap", 
        returns: "20.2%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Provides broad-based equity market exposure across various sectors and capitalizations.",
        benchmark: "NIFTY 50 TRI",
        inceptionDate: "19 Jan 2023",
        investmentStyle: "Multi-Cap",
        portfolioSize: "₹120 Cr",
        strategyType: "Diversified",
        bestSuitedFor: "Balanced investors",
        performance: [
            { period: "FY 2023-24", strategy: 36.7, benchmark: 30.1 },
            { period: "FY 2024-25", strategy: 9.1, benchmark: 11.0 }
        ],
        marketCap: [
            { label: "Large Cap", value: 18 },
            { label: "Mid Cap", value: 26 },
            { label: "Small Cap", value: 52 },
            { label: "Cash", value: 3 }
        ],
        sectorAllocation: [
            { name: "Industrials", value: 20.43 },
            { name: "Information Technology", value: 16.75 },
            { name: "Materials", value: 12.33 },
            { name: "Financials", value: 12.25 },
            { name: "Consumer Discretionary", value: 11.69 }
        ],
        holdings: [
            { name: "Bharti Airtel Ltd", weight: "7.06%" },
            { name: "Shaily Engineering Plastics", weight: "4.92%" },
            { name: "360 ONE WAM Ltd", weight: "4.80%" },
            { name: "HBL Engineering Ltd", weight: "4.80%" },
            { name: "Jubilant Foodworks Ltd", weight: "4.74%" }
        ]
    },
    { 
        name: "PGIM India Phoenix Portfolio", 
        desc: "Quality-focused mid and small-cap equity portfolio aiming for long-term capital appreciation.", 
        link: "/products/pms/pgim-india-phoenix", 
        risk: "High Risk", 
        horizon: "3+ Years", 
        color: "#1CADA3", 
        category: "Mid & Small-Cap", 
        returns: "28.4%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Targets emerging companies with strong potential for long-term category leadership.",
        benchmark: "NIFTY Smallcap 250",
        inceptionDate: "01 Aug 2016",
        investmentStyle: "Mid & Small Cap",
        portfolioSize: "₹57 Cr",
        strategyType: "High Growth",
        bestSuitedFor: "High-risk, high-reward",
        performance: [
            { period: "FY 2023-24", strategy: 35.86, benchmark: 30.0 },
            { period: "FY 2024-25", strategy: 11.9, benchmark: 15.0 }
        ],
        marketCap: [
            { label: "Mid Cap", value: 5 },
            { label: "Small Cap", value: 91 },
            { label: "Cash", value: 4 }
        ],
        sectorAllocation: [
            { name: "Industrials", value: 22.49 },
            { name: "Consumer Discretionary", value: 16.96 },
            { name: "Financials", value: 15.50 },
            { name: "Health Care", value: 10.51 },
            { name: "Information Technology", value: 10.42 }
        ],
        holdings: [
            { name: "KPIT Technologies Ltd", weight: "4.78%" },
            { name: "Power Mech Projects Ltd", weight: "4.78%" },
            { name: "Electronics Mart India", weight: "4.55%" },
            { name: "Timken India Ltd", weight: "4.55%" },
            { name: "Dollar Industries Ltd", weight: "4.36%" }
        ]
    },
    { 
        name: "MOTILAL OSWAL ETHICAL STRATEGY", 
        desc: "A long-term equity strategy focused on ethical businesses with strong earnings growth and quality governance.", 
        link: "/products/pms/motilal-oswal-ethical", 
        risk: "High Risk", 
        horizon: "3+ Years", 
        color: "#1CADA3", 
        category: "Ethical", 
        returns: "22.0%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Invests in Shariah-compliant and ethically sound businesses according to strict screening criteria.",
        benchmark: "BSE 500 TRI",
        inceptionDate: "08 June 2021",
        investmentStyle: "Ethical/Shariah",
        portfolioSize: "₹150 Cr",
        strategyType: "Ethical",
        bestSuitedFor: "Shariah/Ethical investors",
        performance: [
            { period: "CAGR", strategy: 13.13, benchmark: 11.5 },
            { period: "Since Inception", strategy: 82.0, benchmark: 72.0 }
        ],
        marketCap: [
            { label: "Large Cap", value: 16.3 },
            { label: "Mid Cap", value: 35.6 },
            { label: "Small Cap", value: 35.0 },
            { label: "Cash", value: 13.1 }
        ],
        sectorAllocation: [
            { name: "Capital Goods", value: 32.2 },
            { name: "Consumer Durables", value: 21.6 },
            { name: "Auto Components", value: 9.6 },
            { name: "Healthcare", value: 7.7 },
            { name: "Information Technology", value: 6.6 }
        ],
        holdings: [
            { name: "Havells India Ltd", weight: "6.2%" },
            { name: "Marico Ltd", weight: "5.8%" },
            { name: "Siemens Ltd", weight: "5.4%" },
            { name: "ABB India Ltd", weight: "5.1%" },
            { name: "Pidilite Industries", weight: "4.8%" }
        ]
    },
    { 
        name: "Invesco India Challengers Portfolio", 
        desc: "Globally recognized investment approaches tailored for institutional-grade equity performance.", 
        link: "/products/pms/invesco-challengers", 
        risk: "Moderate to High", 
        horizon: "3-5 Years", 
        color: "#1CADA3", 
        category: "Multi-Cap", 
        returns: "19.5%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Focuses on 'challenger' companies that are disrupting established market leaders.",
        benchmark: "BSE 500 TRI",
        inceptionDate: "Sep 2021",
        investmentStyle: "Growth",
        portfolioSize: "₹180 Cr",
        strategyType: "Challenger Theme",
        bestSuitedFor: "Structural growth",
        performance: [
            { period: "CAGR", strategy: 13.7, benchmark: 12.5 },
            { period: "1 Year", strategy: 19.5, benchmark: 16.8 }
        ],
        marketCap: [
            { label: "Large Cap", value: 41.3 },
            { label: "Mid Cap", value: 20.5 },
            { label: "Small Cap", value: 33.1 },
            { label: "Cash", value: 5.1 }
        ],
        sectorAllocation: [
            { name: "Financials", value: 34.0 },
            { name: "Consumer Discretionary", value: 26.1 },
            { name: "Healthcare", value: 9.8 },
            { name: "Consumer Staples", value: 9.8 },
            { name: "Communication Services", value: 7.7 }
        ],
        holdings: [
            { name: "Bharti Airtel Ltd", weight: "7.7%" },
            { name: "Dixon Technologies", weight: "6.9%" },
            { name: "Axis Bank Ltd", weight: "5.9%" },
            { name: "PB Fintech Ltd", weight: "5.9%" },
            { name: "ICICI Bank Ltd", weight: "5.6%" }
        ]
    },
    { 
        name: "Abakkus Emerging Opportunities – PMS", 
        desc: "Focusing on mid and small-cap companies with high growth potential and strong fundamental backings.", 
        link: "/products/pms/abakkus-emerging", 
        risk: "High Risk", 
        horizon: "5+ Years", 
        color: "#1CADA3", 
        category: "Mid & Small-Cap", 
        returns: "35.2%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "High-conviction portfolio targeting the next generation of Indian market leaders.",
        benchmark: "BSE 500 TRI",
        inceptionDate: "26 Aug 2020",
        investmentStyle: "Bottom-up",
        portfolioSize: "₹240 Cr",
        strategyType: "Emerging Growth",
        bestSuitedFor: "Alpha seekers",
        performance: [
            { period: "CAGR", strategy: 29.11, benchmark: 22.5 },
            { period: "1 Year", strategy: 35.2, benchmark: 26.1 }
        ],
        marketCap: [
            { label: "Large Cap", value: 8.93 },
            { label: "Mid Cap", value: 36.06 },
            { label: "Small Cap", value: 48.36 },
            { label: "Cash", value: 6.65 }
        ],
        sectorAllocation: [
            { name: "Banks", value: 17.48 },
            { name: "NBFCs", value: 12.94 },
            { name: "Healthcare", value: 9.51 },
            { name: "Commodities", value: 8.77 },
            { name: "Industrials", value: 8.18 }
        ],
        holdings: [
            { name: "Federal Bank Ltd", weight: "6.03%" },
            { name: "IIFL Finance Ltd", weight: "5.19%" },
            { name: "Max Financial Services", weight: "5.04%" },
            { name: "Sarda Energy & Minerals", weight: "5.01%" },
            { name: "PNB Housing Finance", weight: "4.79%" }
        ]
    },
    { 
        name: "Abakkus All Cap Approach – PMS", 
        desc: "A diversified approach across market capitalizations to capture growth opportunities in various cycles.", 
        link: "/products/pms/abakkus-all-cap", 
        risk: "Moderate Risk", 
        horizon: "3-5 Years", 
        color: "#2076C7", 
        category: "Multi-Cap", 
        returns: "21.6%", 
        minInvestment: "₹50 Lakhs", 
        strategyDetails: "Flexible strategy that dynamically adjusts market cap bias based on relative valuations.",
        benchmark: "BSE 500 TRI",
        inceptionDate: "22 Jan 2021",
        investmentStyle: "Multi-Cap Value",
        portfolioSize: "₹284 Cr",
        strategyType: "Diversified Growth",
        bestSuitedFor: "Alpha seekers",
        performance: [
            { period: "CAGR", strategy: 21.6, benchmark: 18.5 },
            { period: "Since Inception", strategy: 138.5, benchmark: 92.0 }
        ],
        marketCap: [
            { label: "Large Cap", value: 42 },
            { label: "Mid Cap", value: 38 },
            { label: "Small Cap", value: 16 },
            { label: "Cash", value: 4 }
        ],
        sectorAllocation: [
            { name: "Financials", value: 22.4 },
            { name: "Industrials", value: 16.8 },
            { name: "Information Technology", value: 13.2 },
            { name: "Consumer Discretionary", value: 11.5 },
            { name: "Health Care", value: 9.4 }
        ],
        holdings: [
            { name: "HDFC Bank Ltd", weight: "7.2%" },
            { name: "ICICI Bank Ltd", weight: "6.8%" },
            { name: "Reliance Industries", weight: "6.1%" },
            { name: "Infosys Ltd", weight: "5.4%" },
            { name: "Cummins India Ltd", weight: "4.9%" }
        ]
    }
];

