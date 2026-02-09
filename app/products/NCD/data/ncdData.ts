// TypeScript interfaces for NCD data
export interface NCDData {
    id: string;
    issuer: string;
    title: string;
    rating: string;
    ratingAgency: string;
    interest: string;
    tenure: string;
    minInvest: string;
    status: 'Open' | 'Closed' | 'Upcoming';
    payout: string;
    openDate: string;
    closeDate: string;
    frequency: string;
    securityType: string;
    faceValue: string;
    isin: string;
    allocationRatio: string;
    creditRatingDetails: string;
    highlights: string[];
}

export const ncdData: NCDData[] = [
    {
        id: "muthoot-fincorp-tranche-iv",
        issuer: "Muthoot Fincorp Ltd",
        title: "Secured NCD Tranche IV",
        rating: "CRISIL AA- / Stable",
        ratingAgency: "CRISIL",
        interest: "9.45%",
        tenure: "60 Months",
        minInvest: "₹10,000",
        status: "Open",
        payout: "Monthly",
        openDate: "Oct 10, 2024",
        closeDate: "Oct 25, 2024",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE549K07123",
        allocationRatio: "40% Retail",
        creditRatingDetails: "Instruments with this rating are considered to have a high degree of safety regarding timely servicing of financial obligations. Such instruments carry very low credit risk.",
        highlights: [
            "Leading Gold Loan NBFC in India",
            "Consistent Track Record of Profitability",
            "Diversified Product Portfolio"
        ]
    },
    {
        id: "edelweiss-financial-2024",
        issuer: "Edelweiss Financial Services",
        title: "NCD Public Issue 2024",
        rating: "CRISIL AA- / Stable",
        ratingAgency: "CRISIL",
        interest: "10.45%",
        tenure: "36 Months",
        minInvest: "₹10,000",
        status: "Open",
        payout: "Annual",
        openDate: "Oct 07, 2024",
        closeDate: "Oct 22, 2024",
        frequency: "Annual",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE532F07CX1",
        allocationRatio: "50% Retail",
        creditRatingDetails: "The rating indicates high safety with stable outlook. Edelweiss has a strong presence in credit and wealth management businesses.",
        highlights: [
            "Strong Parentage of Edelweiss Group",
            "Adequate Capitalization Levels",
            "Established Retail Franchise"
        ]
    },
    {
        id: "chemmanur-credits-issue",
        issuer: "Chemmanur Credits",
        title: "Secured NCD Issue",
        rating: "IND BBB+ / Stable",
        ratingAgency: "India Ratings",
        interest: "11.50%",
        tenure: "70 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Cumulative",
        openDate: "Nov 01, 2024",
        closeDate: "Nov 15, 2024",
        frequency: "Cumulative",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE123A08012",
        allocationRatio: "N/A",
        creditRatingDetails: "Moderate Degree of Safety (BBB+). Investors should verify risk appetite before investing in high-yield instruments.",
        highlights: [
            "High Yield of 11.50%",
            "Long Tenure for Wealth Creation",
            "Secured by Gold Assets"
        ]
    },
    {
        id: "shriram-finance-series-v",
        issuer: "Shriram Finance Ltd",
        title: "STFC NCD Series V",
        rating: "CRISIL AA+ / Stable",
        ratingAgency: "CRISIL",
        interest: "8.90%",
        tenure: "48 Months",
        minInvest: "₹10,000",
        status: "Closed",
        payout: "Quarterly",
        openDate: "Sep 01, 2024",
        closeDate: "Sep 15, 2024",
        frequency: "Quarterly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE721A07OB9",
        allocationRatio: "Sold Out",
        creditRatingDetails: "High Safety (AA+). Shriram Finance is one of India's largest retail NBFCs.",
        highlights: [
            "Pan-India Presence",
            "Robust Asset Quality",
            "Consistently Paying Dividends"
        ]
    },
    {
        id: "360-one-prime",
        issuer: "360 ONE Prime",
        title: "Secured Tranche I",
        rating: "CRISIL AA / Stable",
        ratingAgency: "CRISIL",
        interest: "9.66%",
        tenure: "24 Months",
        minInvest: "₹1,00,000",
        status: "Open",
        payout: "Annual",
        openDate: "Oct 15, 2024",
        closeDate: "Oct 28, 2024",
        frequency: "Annual",
        securityType: "Secured",
        faceValue: "₹1,00,000",
        isin: "INE466L07018",
        allocationRatio: "Private Placement",
        creditRatingDetails: "High Safety. Focus on high-net-worth individual lending with strong collateral.",
        highlights: [
            "Backed by 360 ONE WAM (formerly IIFL Wealth)",
            "Strong Capitalization",
            "Niche Lending Focus"
        ]
    },
    {
        id: "incred-financial",
        issuer: "Incred Financial Services",
        title: "Public NCD Issue",
        rating: "CRISIL A+ / Stable",
        ratingAgency: "CRISIL",
        interest: "10.15%",
        tenure: "27 Months",
        minInvest: "₹10,000",
        status: "Closed",
        payout: "Cumulative",
        openDate: "Aug 20, 2024",
        closeDate: "Sep 05, 2024",
        frequency: "Cumulative",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE945W07234",
        allocationRatio: "Fully Subscribed",
        creditRatingDetails: "Adequate Safety (A+). Incred is a new-age financial services platform backed by marquee investors.",
        highlights: [
            "Tech-driven Lending Platform",
            "Diversified Loan Book",
            "Healthy Growth Metrics"
        ]
    },
    {
        id: "aditya-birla-finance",
        issuer: "Aditya Birla Finance",
        title: "Infra Debt Fund Series",
        rating: "ICRA AAA / Stable",
        ratingAgency: "ICRA",
        interest: "8.10%",
        tenure: "60 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Annual",
        openDate: "Nov 10, 2024",
        closeDate: "Nov 25, 2024",
        frequency: "Annual",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE860H07987",
        allocationRatio: "TBD",
        creditRatingDetails: "Highest Safety (AAA). Backed by the strong Aditya Birla Group.",
        highlights: [
            "Highest Credit Rating",
            "Strong Parent Support",
            "Focus on Infrastructure Financing"
        ]
    },
    {
        id: "manappuram-finance",
        issuer: "Manappuram Finance",
        title: "Secured NCD Issue",
        rating: "CRISIL AA / Stable",
        ratingAgency: "CRISIL",
        interest: "9.90%",
        tenure: "60 Months",
        minInvest: "₹10,000",
        status: "Closed",
        payout: "Monthly",
        openDate: "Jul 15, 2024",
        closeDate: "Jul 30, 2024",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE522D07BZ9",
        allocationRatio: "Oversubscribed",
        creditRatingDetails: "High Safety. Manappuram is a leading gold loan NBFC with a long track record.",
        highlights: [
            "Established Gold Loan Player",
            "Diversified into Microfinance & Housing",
            "Strong Liquidity Profile"
        ]
    },
    {
        id: "kosamattam-finance",
        issuer: "Kosamattam Finance",
        title: "NCD Subscription",
        rating: "IND A- / Stable",
        ratingAgency: "India Ratings",
        interest: "10.00%",
        tenure: "36 Months",
        minInvest: "₹10,000",
        status: "Open",
        payout: "Monthly",
        openDate: "Oct 01, 2024",
        closeDate: "Oct 15, 2024",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE403Q07123",
        allocationRatio: "Available",
        creditRatingDetails: "Adequate Safety (A-). Regional gold loan player in South India.",
        highlights: [
            "Focus on Gold Loans",
            "Attractive Interest Rates",
            "Secured Lending Model"
        ]
    },
    {
        id: "navi-finserv",
        issuer: "Navi Finserv",
        title: "Navi NCD Bonds",
        rating: "CRISIL A / Stable",
        ratingAgency: "CRISIL",
        interest: "10.40%",
        tenure: "27 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Annual",
        openDate: "Nov 05, 2024",
        closeDate: "Nov 20, 2024",
        frequency: "Annual",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE04S407028",
        allocationRatio: "TBD",
        creditRatingDetails: "Adequate Safety. Digital-first lender promoted by Sachin Bansal.",
        highlights: [
            "Digital First Approach",
            "Rapid Growth",
            "Strong Promoter Backing"
        ]
    },
    {
        id: "ugro-capital",
        issuer: "Ugro Capital",
        title: "Secured NCD Public Issue",
        rating: "IND A+ / Stable",
        ratingAgency: "India Ratings",
        interest: "10.50%",
        tenure: "27 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Monthly",
        openDate: "Apr 01, 2025",
        closeDate: "Apr 15, 2025",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE583D07212",
        allocationRatio: "TBD",
        creditRatingDetails: "Adequate Safety (A+). Focused on SME lending with sector-specific approach.",
        highlights: [
            "Focus on MSME Sector",
            "Data & Tech Driven Model",
            "Diversified Liability Mix"
        ]
    },
    {
        id: "sakthi-finance",
        issuer: "Sakthi Finance",
        title: "NCD Public Issue 2025",
        rating: "ICRA BBB / Stable",
        ratingAgency: "ICRA",
        interest: "10.25%",
        tenure: "36 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Monthly",
        openDate: "Mar 01, 2025",
        closeDate: "Mar 15, 2025",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE638A07245",
        allocationRatio: "TBD",
        creditRatingDetails: "Moderate Safety (BBB). Commercial Vehicle financing NBFC based in South India.",
        highlights: [
            "Niche in CV Financing",
            "Established Regional Presence",
            "Long Operating History"
        ]
    },
    {
        id: "muthoot-mercantile",
        issuer: "Muthoot Mercantile",
        title: "Secured Non-Convertible Debentures",
        rating: "IND BBB / Stable",
        ratingAgency: "India Ratings",
        interest: "11.00%",
        tenure: "60 Months",
        minInvest: "₹10,000",
        status: "Closed",
        payout: "Monthly",
        openDate: "Jan 01, 2025",
        closeDate: "Jan 15, 2025",
        frequency: "Monthly",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE987A07134",
        allocationRatio: "Full",
        creditRatingDetails: "Moderate Safety (BBB). Gold loan focused NBFC.",
        highlights: [
            "High Yield Instrument",
            "Gold Loan Backed",
            "Retail Focus"
        ]
    },
    {
        id: "sammaan-capital",
        issuer: "Sammaan Capital",
        title: "Tranche III NCD Issue",
        rating: "CRISIL AA / Stable",
        ratingAgency: "CRISIL",
        interest: "9.50%",
        tenure: "24 Months",
        minInvest: "₹10,000",
        status: "Upcoming",
        payout: "Annual",
        openDate: "Feb 10, 2025",
        closeDate: "Feb 24, 2025",
        frequency: "Annual",
        securityType: "Secured",
        faceValue: "₹1,000",
        isin: "INE148I07654",
        allocationRatio: "TBD",
        creditRatingDetails: "High Safety (AA). Formerly Indiabulls Housing Finance.",
        highlights: [
            "Established Housing Finance Player",
            "Strong Capital Adequacy",
            "Shift to Asset Light Model"
        ]
    }
];

