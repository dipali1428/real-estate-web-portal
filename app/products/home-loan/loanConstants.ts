// app/offers/loans/home-loan/loanConstants.ts

export const CATEGORIES = [
    'New Purchase',
    'Resale Property',
    'Takeover',
    'Home Renovation',
    'Plot + Construction'
];



export const HOME_LOAN_TYPES = [
    {
        title: "New Purchase Home Loan",
        category: "New Purchase",
        icon: "Home",
        description: "Buy your dream home with attractive interest rates and flexible repayment options.",
        bestFor: "Buying a new flat, apartment, or under-construction property from a builder.",
        benefits: [
            "Competitive interest rates",
            "High loan eligibility",
            "Flexible tenure up to 30 years",
            "Quick approval process"
        ],
        color: "blue"
    },
    {
        title: "Resale Property Home Loan",
        category: "Resale Property",
        icon: "Building2",
        description: "Finance the purchase of a resale or second-hand property from an individual seller.",
        bestFor: "Ready-to-move-in resale homes.",
        benefits: [
            "Legal & technical property verification",
            "Transparent documentation",
            "Suitable for salaried & self-employed applicants"
        ],
        color: "peacock-green"
    },
    {
        title: "Takeover / Balance Transfer Home Loan",
        category: "Takeover",
        icon: "Repeat",
        description: "Transfer your existing home loan to another bank to get lower interest rates and better terms.",
        bestFor: "Reducing EMI or interest burden.",
        benefits: [
            "Lower interest rate options",
            "Top-up facility available",
            "Minimal documentation"
        ],
        color: "blue"
    },
    {
        title: "Home Renovation Loan",
        category: "Home Renovation",
        icon: "Wrench",
        description: "Upgrade, repair, or renovate your existing home with flexible funding.",
        bestFor: "Interior work, structural repair, house extension.",
        benefits: [
            "Quick approval",
            "Flexible repayment options",
            "Available as standalone or top-up loan"
        ],
        color: "peacock-green"
    },
    {
        title: "Plot + Construction Loan",
        category: "Plot + Construction",
        icon: "Construction",
        description: "Purchase a plot and construct your home with stage-wise disbursement.",
        bestFor: "Buying land and building your own house.",
        benefits: [
            "Stage-wise fund release",
            "Flexible tenure",
            "Suitable for salaried & self-employed"
        ],
        color: "blue"
    },

];

export const categorizedPlans: Record<string, any[]> = {
    'New Purchase': [
        { bank: 'State Bank of India (SBI)', interest: '8.40% p.a.', fee: '0.35%', benefits: ['Lowest interest rates', 'India\'s most trusted bank', 'Quick approval'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.45% p.a.', fee: '0.50%', benefits: ['Fast processing', 'Large network', 'Digital documentation'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.50% p.a.', fee: 'Up to 1%', benefits: ['Digital loan journey', 'Quick sanction', 'Flexible eligibility'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.45% p.a.', fee: '₹10,000 + GST', benefits: ['Competitive rates', 'Good for salaried', 'Online tracking'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.60% p.a.', fee: 'NIL', benefits: ['No processing fee', 'PSU trust', 'Stable rates'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '8.50% p.a.', fee: 'NIL', benefits: ['Government backed', 'Pan-India presence', 'Long tenure options'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '8.75% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' },
        { bank: 'Bank of Maharashtra', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Attractive rates', 'Quick processing', 'No hidden charges'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '8.50% p.a.', fee: '0.5%', benefits: ['PSU trust', 'Flexible tenure', 'Transparent process'], color: 'peacock-green' },
        { bank: 'Bank of India', interest: '8.45% p.a.', fee: 'NIL', benefits: ['Low processing fee', 'High loan amount', 'Customer friendly'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '8.55% p.a.', fee: '0.25%', benefits: ['Customized loans', 'Easy documentation', 'Fast sanction'], color: 'peacock-green' },
        { bank: 'Union Bank', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Zero prepay charges', 'Quick eligibility check', 'PSU benefit'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '8.70% p.a.', fee: '0.5%', benefits: ['Digital process', 'Fast turnaround', 'Attractive rates'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.75% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' }
    ],
    'Resale Property': [
        { bank: 'State Bank of India (SBI)', interest: '8.40% p.a.', fee: '0.35%', benefits: ['Lowest interest rates', 'India\'s most trusted bank', 'Quick approval for resale'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.45% p.a.', fee: '0.50%', benefits: ['Fast processing', 'Large network', 'Digital documentation'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.50% p.a.', fee: 'Up to 1%', benefits: ['Digital loan journey', 'Quick sanction', 'Flexible eligibility'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.45% p.a.', fee: '₹10,000 + GST', benefits: ['Competitive rates', 'Good for salaried', 'Online tracking'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.60% p.a.', fee: 'NIL', benefits: ['No processing fee', 'PSU trust', 'Stable rates'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '8.50% p.a.', fee: 'NIL', benefits: ['Government backed', 'Pan-India presence', 'Long tenure options'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '8.75% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' },
        { bank: 'Bank of Maharashtra', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Attractive rates', 'Quick processing', 'No hidden charges'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '8.50% p.a.', fee: '0.5%', benefits: ['PSU trust', 'Flexible tenure', 'Transparent process'], color: 'peacock-green' },
        { bank: 'Bank of India', interest: '8.45% p.a.', fee: 'NIL', benefits: ['Low processing fee', 'High loan amount', 'Customer friendly'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '8.55% p.a.', fee: '0.25%', benefits: ['Customized loans', 'Easy documentation', 'Fast sanction'], color: 'peacock-green' },
        { bank: 'Union Bank', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Zero prepay charges', 'Quick eligibility check', 'PSU benefit'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '8.70% p.a.', fee: '0.5%', benefits: ['Digital process', 'Fast turnaround', 'Attractive rates'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.75% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' }
    ],
    'Takeover': [
        { bank: 'State Bank of India (SBI)', interest: '8.25% p.a.', fee: 'NIL', benefits: ['Best rates for transfer', 'Transparent charges', 'Wide branch support'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.35% p.a.', fee: '₹3,000', benefits: ['Smooth balance transfer', 'Top-up facility', 'Established track record'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.35% p.a.', fee: '0.5%', benefits: ['Quick takeover process', 'Top-up available', 'Digital tracking'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.40% p.a.', fee: '0.5%', benefits: ['Minimal documentation', 'Fast processing', 'Lower EMIs'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.45% p.a.', fee: 'NIL', benefits: ['Zero processing fee', 'PSU trust', 'Flexible terms'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Easy transfer', 'No hidden charges', 'Good for salaried'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '8.50% p.a.', fee: '0.5%', benefits: ['Quick BT approvals', 'Simple documentation', 'Top-up allowed'], color: 'blue' },
        { bank: 'Bank of Maharashtra', interest: '8.20% p.a.', fee: 'NIL', benefits: ['Lowest takeover ROI', 'Extra top-up funds', 'Zero processing fee'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '8.45% p.a.', fee: '0.5%', benefits: ['Stable rates', 'PSU transparency', 'Easy handover'], color: 'peacock-green' },
        { bank: 'Bank of India', interest: '8.40% p.a.', fee: 'NIL', benefits: ['Zero transfer fees', 'High loan sums', 'Dedicated support'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '8.50% p.a.', fee: '0.25%', benefits: ['Smooth transitions', 'Top-up loans', 'Flexible terms'], color: 'peacock-green' },
        { bank: 'Union Bank', interest: '8.30% p.a.', fee: 'NIL', benefits: ['PSU benefit', 'Easy documentation', 'Fast takeover process'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '8.45% p.a.', fee: '0.5%', benefits: ['Competitive takeover rates', 'Fast turnaround', 'Digital process'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.60% p.a.', fee: '0.5%', benefits: ['Quick approvals', 'Top-up facility', 'Dedicated RM'], color: 'blue' }
    ],
    'Home Renovation': [
        { bank: 'State Bank of India (SBI)', interest: '8.45% p.a.', fee: '0.35%', benefits: ['Reliable funding', 'India\'s most trusted bank', 'Quick approval'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.50% p.a.', fee: '0.50%', benefits: ['Fast processing', 'Network reach', 'Easy repair loans'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.50% p.a.', fee: 'Up to 1%', benefits: ['Digital loan journey', 'Quick sanction', 'Flexible eligibility'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.45% p.a.', fee: '₹10,000 + GST', benefits: ['Competitive rates', 'Good for salaried', 'Online tracking'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.60% p.a.', fee: '0.50%', benefits: ['Standalone repair loans', 'Easy appraisals', 'PSU reliability'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '8.55% p.a.', fee: '0.50%', benefits: ['Government backed', 'Pan-India presence', 'Long tenure options'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '8.80% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' },
        { bank: 'Bank of Maharashtra', interest: '8.50% p.a.', fee: '0.50%', benefits: ['Attractive rates', 'Quick processing', 'Dedicated support'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '8.60% p.a.', fee: '0.5%', benefits: ['PSU trust', 'Flexible tenure', 'Renovation specific features'], color: 'peacock-green' },
        { bank: 'Bank of India', interest: '8.55% p.a.', fee: '0.50%', benefits: ['Low processing fee', 'High loan amount', 'Customer friendly'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '8.65% p.a.', fee: '0.50%', benefits: ['Customized repair loans', 'Easy documentation', 'Fast sanction'], color: 'peacock-green' },
        { bank: 'Union Bank', interest: '8.50% p.a.', fee: '0.50%', benefits: ['Fast approval pipeline', 'Quick eligibility check', 'PSU benefit'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '8.75% p.a.', fee: '1%', benefits: ['Digital process', 'Fast turnaround', 'Attractive repair rates'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.80% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Fast disbursal'], color: 'blue' }
    ],
    'Plot + Construction': [
        { bank: 'State Bank of India (SBI)', interest: '8.50% p.a.', fee: '0.50%', benefits: ['Stage-wise disbursement', 'Trusted checking', 'Plot+build loans'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '8.55% p.a.', fee: '0.50%', benefits: ['Fast processing', 'Expert evaluation', 'Digital tracking'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '8.60% p.a.', fee: '1%', benefits: ['Digital tracking', 'Quick stage sanction', 'Flexible disbursal'], color: 'blue' },
        { bank: 'Axis Bank', interest: '8.65% p.a.', fee: '1%', benefits: ['Competitive rates', 'Good for self-construction', 'Online tracking'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '8.70% p.a.', fee: 'NIL', benefits: ['No processing fee', 'PSU trust', 'Stable plot rates'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '8.65% p.a.', fee: '0.50%', benefits: ['Government backed', 'Pan-India presence', 'Long tenure options'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '8.90% p.a.', fee: '1%', benefits: ['High LTV for construction', 'Simple documentation', 'Fast first disbursal'], color: 'blue' },
        { bank: 'Bank of Maharashtra', interest: '8.60% p.a.', fee: '0.50%', benefits: ['Attractive rates', 'Quick stage checks', 'No hidden charges'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '8.75% p.a.', fee: '1%', benefits: ['PSU trust', 'Flexible tenure', 'Transparent stage payments'], color: 'peacock-green' },
        { bank: 'Bank of India', interest: '9.50% p.a.', fee: '1%', benefits: ['Specifically for manufacturing', 'High LTV for plots', 'Flexible repayment'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '9.75% p.a.', fee: '1%', benefits: ['Funding for warehouses', 'Industrial project support', 'Quick technical check'], color: 'blue' },
        { bank: 'Union Bank', interest: '8.60% p.a.', fee: '0.50%', benefits: ['Zero prepay charges', 'Quick eligibility check', 'PSU benefit'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '8.80% p.a.', fee: '1%', benefits: ['Digital tracking', 'Fast turnaround', 'Attractive construction rates'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.90% p.a.', fee: '1%', benefits: ['High LTV', 'Simple documentation', 'Dedicated relationship manager'], color: 'blue' }
    ]
};

export const PARTNER_BANKS = [
    { name: "BANK OF MAHARASHTRA", color: "#2076C7" },
    { name: "CENTRAL BANK OF INDIA", color: "#1CADA3" },
    { name: "BANK OF BARODA", color: "#2076C7" },
    { name: "PUNJAB NATIONAL BANK", color: "#1CADA3" },
    { name: "STATE BANK OF INDIA (SBI)", color: "#2076C7" },
    { name: "HDFC BANK", color: "#1CADA3" },
    { name: "ICICI BANK", color: "#2076C7" },
    { name: "AXIS BANK", color: "#1CADA3" },
    { name: "TATA CAPITAL HOUSING FINANCE", color: "#2076C7" },
    { name: "BANK OF INDIA", color: "#1CADA3" },
    { name: "IDBI BANK", color: "#2076C7" },
    { name: "UNION BANK", color: "#1CADA3" },
    { name: "KOTAK MAHINDRA BANK", color: "#2076C7" },
    { name: "RBL BANK", color: "#1CADA3" }
];
