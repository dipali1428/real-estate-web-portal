// app/offers/loans/mortgage-loan/loanConstants.ts

export const CATEGORIES = [
    'Residential Property',
    'Commercial Property',
    'Industrial Property',
    'Lease Rental Discounting (LRD)',
    'Balance Transfer + Top-up'
];

export const categorizedPlans: Record<string, any[]> = {
    'Residential Property': [
        { bank: 'State Bank of India (SBI)', interest: '8.40% p.a.', fee: '0.35%', benefits: ['Lowest interest rates', 'India\'s most trusted bank', 'Quick approval for approved projects'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.45% p.a.', fee: '0.50%', benefits: ['Fast processing', 'Large network', 'Digital documentation'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.50% p.a.', fee: 'Up to 1%', benefits: ['Digital loan journey', 'Quick sanction', 'Flexible eligibility'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.45% p.a.', fee: '₹10,000 + GST', benefits: ['Competitive rates', 'Good for salaried', 'Online tracking'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.60% p.a.', fee: 'NIL', benefits: ['No processing fee', 'PSU trust', 'Stable rates'], color: 'blue' }
    ],
    'Commercial Property': [
        { bank: 'ICICI Bank', interest: '8.75% p.a.', fee: 'Up to 1.5%', benefits: ['High loan limits', 'Fast technical valuation', 'Suitable for SMEs'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.80% p.a.', fee: '1%', benefits: ['Expert property evaluation', 'Quick disbursal', 'Comprehensive support'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.90% p.a.', fee: '1%', benefits: ['Flexible collateral norms', 'Good for self-employed', 'Fast processing'], color: 'peacock-green' },
        { bank: 'State Bank of India (SBI)', interest: '9.00% p.a.', fee: '0.50%', benefits: ['Lowest ROI for commercial', 'Trusted scaling', 'Legal support'], color: 'blue' }
    ],
    'Industrial Property': [
        { bank: 'Bank of India', interest: '9.50% p.a.', fee: '1%', benefits: ['Specifically for manufacturing', 'High LTV for industrial plots', 'Flexible repayment'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '9.75% p.a.', fee: '1%', benefits: ['Funding for warehouses', 'Industrial project support', 'Quick technical check'], color: 'blue' },
        { bank: 'PNB Bank', interest: '9.60% p.a.', fee: '0.50%', benefits: ['Trusted PSU partner', 'Good for small industries', 'Transparent terms'], color: 'peacock-green' }
    ],
    'Lease Rental Discounting (LRD)': [
        { bank: 'HDFC Bank', interest: '8.20% p.a.', fee: '0.10%', benefits: ['Lowest ROI for LRD', 'Discounting against top lessees', 'Fast sanction'], color: 'blue' },
        { bank: 'Standard Chartered', interest: '8.25% p.a.', fee: 'NIL', benefits: ['Global bank trust', 'Expert LRD solutions', 'High discounting amount'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.35% p.a.', fee: '₹25,000', benefits: ['Fast legal verification', 'Good for commercial rentals', 'Digital monitoring'], color: 'peacock-green' }
    ],
    'Balance Transfer + Top-up': [
        { bank: 'Bank of Maharashtra', interest: '8.20% p.a.', fee: 'NIL', benefits: ['Lowest takeover ROI', 'Extra top-up funds', 'Zero processing fee'], color: 'blue' },
        { bank: 'Union Bank', interest: '8.30% p.a.', fee: 'NIL', benefits: ['PSU benefit', 'Easy documentation', 'Fast takeover process'], color: 'peacock-green' },
        { bank: 'HDFC Bank', interest: '8.45% p.a.', fee: '₹5,000 fixed', benefits: ['Smooth takeover', 'High top-up eligibility', 'Reputation'], color: 'blue' }
    ]
};

export const MORTGAGE_LOAN_TYPES = [
    {
        title: "Loan Against Residential Property",
        category: "Residential Property",
        icon: "Home",
        description: "Get immediate funds by pledging your residential property (self-occupied or rented).",
        bestFor: "Personal needs, education, or business capital.",
        benefits: [
            "Up to 70% of property value",
            "Tenure up to 15 years",
            "Lower rates than personal loans"
        ],
        color: "blue"
    },
    {
        title: "Loan Against Commercial Property",
        category: "Commercial Property",
        icon: "Building2",
        description: "Utilize your shop, office, or showroom as collateral for business growth.",
        bestFor: "Business expansion, inventory, or working capital.",
        benefits: [
            "Higher loan amounts for shops/offices",
            "Flexible repayment cycles",
            "Self-employed friendly"
        ],
        color: "peacock-green"
    },
    {
        title: "Lease Rental Discounting (LRD)",
        category: "Lease Rental Discounting (LRD)",
        icon: "Coins",
        description: "Discount your future lease rentals from reputed lessees for immediate capital.",
        bestFor: "Real estate investors with stable rental income.",
        benefits: [
            "Lowest interest rates in LAP",
            "High loan amount based on rent",
            "Simple documentation"
        ],
        color: "blue"
    },
    {
        title: "Mortgage Overdraft (OD) Facility",
        category: "Balance Transfer + Top-up",
        icon: "Zap",
        description: "Pay interest only on the amount used from your sanctioned limit against property.",
        bestFor: "Managing short-term liquidity and cash flow.",
        benefits: [
            "Interest on utilized amount only",
            "Flexible withdrawal and deposit",
            "Available for businesses"
        ],
        color: "peacock-green"
    }
];

export const PARTNER_BANKS = [
    { name: "STATE BANK OF INDIA (SBI)", color: "#2163AD" },
    { name: "HDFC BANK", color: "#1C51A1" },
    { name: "ICICI BANK", color: "#F37021" },
    { name: "AXIS BANK", color: "#851336" },
    { name: "BANK OF BARODA", color: "#F06B1B" },
    { name: "PUNJAB NATIONAL BANK", color: "#CC2229" },
    { name: "UNION BANK", color: "#E81717" },
    { name: "BANK OF MAHARASHTRA", color: "#3257A8" },
    { name: "STANDARD CHARTERED", color: "#006432" },
    { name: "IDBI BANK", color: "#008A45" },
    { name: "BANK OF INDIA", color: "#3257A8" }
];
