export interface Bond {
    id: number;
    company: string;
    coupon: string;
    yield: string;
    rating: string;
    maturity: string;
    callDate?: string;
    minInvestment: string;
    frequency: string;
    type: "Secured" | "Unsecured";
    category: "Private" | "StateGuaranteed";
    isin?: string;
    featured?: boolean;
}

export const bondsData: Bond[] = [
    // --- PRIVATE BONDS ---
    {
        id: 1,
        company: "Punjab National Bank (PERP)",
        coupon: "8.75%",
        yield: "7.49%",
        rating: "AA+",
        maturity: "Perpetual",
        callDate: "27-Mar-2028",
        minInvestment: "₹1,00,00,000", // 1.00 CRS
        frequency: "Annual",
        type: "Unsecured", // Perp is typically unsecured
        category: "Private",
        isin: "INE160A08266",
        featured: true
    },
    {
        id: 2,
        company: "Canara Bank (PERP)",
        coupon: "8.40%",
        yield: "7.50%",
        rating: "AA+",
        maturity: "Perpetual",
        callDate: "11-Dec-2028",
        minInvestment: "₹1,00,00,000",
        frequency: "Annual",
        type: "Unsecured",
        category: "Private",
        isin: "INE476A08217"
    },
    {
        id: 3,
        company: "Canara Bank (PERP)",
        coupon: "8.40%",
        yield: "7.50%",
        rating: "AA+",
        maturity: "Perpetual",
        callDate: "14-Feb-2029",
        minInvestment: "₹1,00,00,000",
        frequency: "Annual",
        type: "Unsecured",
        category: "Private",
        isin: "INE476A08225"
    },
    {
        id: 4,
        company: "REC Limited (PERP)",
        coupon: "7.99%",
        yield: "7.52%",
        rating: "AAA",
        maturity: "Perpetual",
        callDate: "28-Feb-2035",
        minInvestment: "₹1,00,00,000",
        frequency: "Annual",
        type: "Unsecured",
        category: "Private",
        isin: "INE020B08FP0",
        featured: true
    },
    {
        id: 5,
        company: "Avanse Financial Services",
        coupon: "9.40%",
        yield: "8.50%",
        rating: "AA-",
        maturity: "07-Oct-2027",
        callDate: "22-Jun-2026",
        minInvestment: "₹1,00,000", // 1.00 LAC
        frequency: "Semi-Annual", // 23rd Jun / 23rd Dec
        type: "Secured",
        category: "Private",
        isin: "INE087P07410"
    },
    {
        id: 6,
        company: "Muthoot Finance Ltd",
        coupon: "7.88%",
        yield: "7.80%",
        rating: "AA+",
        maturity: "22-Nov-2028",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Secured",
        category: "Private",
        isin: "INE414G07JS2"
    },
    {
        id: 7,
        company: "Godrej Properties Ltd",
        coupon: "8.55%",
        yield: "7.65%",
        rating: "AA+",
        maturity: "26-Jul-2029",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured",
        category: "Private",
        isin: "INE484J08071"
    },
    {
        id: 8,
        company: "Aditya Birla Capital",
        coupon: "8.70%",
        yield: "7.50%",
        rating: "AAA",
        maturity: "04-Jul-2029",
        minInvestment: "₹10,00,000",
        frequency: "Annual",
        type: "Secured",
        category: "Private",
        isin: "INE860H07GU6",
        featured: true
    },
    {
        id: 9,
        company: "Indigrid Infrastructure Trust",
        coupon: "8.20%",
        yield: "7.80%",
        rating: "AAA",
        maturity: "06-May-2031",
        minInvestment: "₹1,000", // Interesting low ticket size
        frequency: "Annual",
        type: "Secured",
        category: "Private",
        isin: "INE219X07264"
    },
    {
        id: 10,
        company: "Tata Capital Housing Finance",
        coupon: "7.85%",
        yield: "7.55%",
        rating: "AAA",
        maturity: "13-Sep-2032",
        minInvestment: "₹10,00,000",
        frequency: "Annual",
        type: "Secured",
        category: "Private",
        isin: "INE033L07HW6",
        featured: true
    },
    {
        id: 11,
        company: "Aditya Birla Finance",
        coupon: "8.31%",
        yield: "7.97%",
        rating: "AAA",
        maturity: "11-Jul-2034",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE860H08EL8"
    },
    {
        id: 12,
        company: "HDB Financial Services",
        coupon: "8.40%",
        yield: "7.85%",
        rating: "AAA",
        maturity: "22-Dec-2033",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE756I08256"
    },
    {
        id: 13,
        company: "HDB Financial Services",
        coupon: "8.27%",
        yield: "7.85%",
        rating: "AAA",
        maturity: "27-Oct-2034",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE756I08298"
    },
    {
        id: 14,
        company: "Aditya Birla Capital",
        coupon: "8.03%",
        yield: "7.93%",
        rating: "AAA",
        maturity: "04-May-2035",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE674K08018"
    },
    {
        id: 15,
        company: "Aditya Birla Housing Finance",
        coupon: "8.03%",
        yield: "7.93%",
        rating: "AAA",
        maturity: "23-Apr-2035",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE831R08100"
    },
    {
        id: 16,
        company: "SMFG India Credit Co.",
        coupon: "8.05%",
        yield: "7.95%",
        rating: "AAA",
        maturity: "24-Oct-2035",
        minInvestment: "₹1,00,000",
        frequency: "Annual",
        type: "Unsecured", // Sub-Debt Tier 2
        category: "Private",
        isin: "INE535H08819"
    },

    // --- STATE GUARANTEED BONDS ---
    {
        id: 101,
        company: "AP State Beverages Corp",
        coupon: "9.15%",
        yield: "9.08%",
        rating: "AA(CE)",
        maturity: "28-Feb-2029",
        minInvestment: "₹1,00,000",
        frequency: "Quarterly",
        type: "Secured",
        category: "StateGuaranteed",
        isin: "INE0M2307354",
        featured: true
    },
    {
        id: 102,
        company: "AP State Beverages Corp",
        coupon: "9.15%",
        yield: "9.15%",
        rating: "AA(CE)",
        maturity: "27-Feb-2032",
        minInvestment: "₹1,00,000",
        frequency: "Quarterly",
        type: "Secured",
        category: "StateGuaranteed",
        isin: "INE0M2307347"
    },
    {
        id: 103,
        company: "AP State Beverages Corp",
        coupon: "9.15%",
        yield: "9.15%",
        rating: "AA(CE)",
        maturity: "28-Feb-2033",
        minInvestment: "₹1,00,00,000", // assumed quantum as standard block
        frequency: "Quarterly",
        type: "Secured",
        category: "StateGuaranteed",
        isin: "INE0M2307404"
    },
    {
        id: 104,
        company: "AP State Beverages Corp",
        coupon: "9.15%",
        yield: "9.15%",
        rating: "AA(CE)",
        maturity: "28-Feb-2034",
        minInvestment: "₹1,00,000",
        frequency: "Quarterly",
        type: "Secured",
        category: "StateGuaranteed",
        isin: "INE0M2307412"
    },
    {
        id: 105,
        company: "AP State Beverages Corp",
        coupon: "9.15%",
        yield: "9.15%",
        rating: "AA(CE)",
        maturity: "28-Feb-2035",
        minInvestment: "₹1,00,000",
        frequency: "Quarterly",
        type: "Secured",
        category: "StateGuaranteed",
        isin: "INE0M2307396"
    }
];
