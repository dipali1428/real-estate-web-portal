// app/offers/loans/home-loan/loanConstants.ts

export const CATEGORIES = [
    'New Purchase',
    'Resale Property',
    'Takeover',
    'Home Renovation',
    'Plot + Construction'
];

export const categorizedPlans: Record<string, any[]> = {
    'New Purchase': [
        { bank: 'Bank of Maharashtra', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest ROI available', 'Zero processing charges', 'Ideal for first-time home buyers'], color: 'blue' },
        { bank: 'Central Bank of India', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest interest rate option', 'No processing fee', 'Strong PSU bank support'], color: 'peacock-green' },
        { bank: 'Bank of Baroda', interest: '7.35% p.a.', fee: '10500', benefits: ['Strong PSU bank', 'Transparent loan structure', 'No processing charges'], color: 'blue' },
        { bank: 'Punjab National Bank', interest: '7.45% p.a.', fee: 'NIL', benefits: ['Trusted PSU bank', 'Suitable for salaried & self-employed', 'Stable interest rates'], color: 'peacock-green' },
        { bank: 'State Bank of India (SBI)', interest: '7.50% p.a.', fee: 'Check for Details', benefits: ['India’s most trusted bank', 'High loan eligibility', 'Strong resale & purchase options'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '7.20% p.a.', fee: 'Check for Details', benefits: ['Fast processing', 'Strong private bank brand', 'Digital documentation support'], color: 'peacock-green' },
        { bank: 'ICICI Bank', interest: '7.30% p.a.', fee: 'Check for Details', benefits: ['Digital loan journey', 'Quick approval process', 'Suitable for takeover & purchase'], color: 'blue' },
        { bank: 'Axis Bank', interest: '7.25% p.a.', fee: 'Check for Details', benefits: ['Competitive private bank rates', 'Good for salaried applicants', 'Fast approval support'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '7.75% p.a.', fee: 'Check for Details', benefits: ['Flexible approval norms', 'Suitable for salaried & self-employed', 'Strong NBFC option'], color: 'blue' }
    ],
    'Resale Property': [
        { bank: 'Bank of Maharashtra', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest ROI option', 'Zero processing charges', 'Ideal for resale property purchase'], color: 'blue' },
        { bank: 'Bank of India', interest: '7.35% p.a.', fee: 'Waived for CIBIL 725+', benefits: ['CIBIL-based fee waiver', 'Competitive PSU rates', 'Suitable for strong credit profiles'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '7.50% p.a.', fee: 'Up to ₹16,000', benefits: ['Attractive starting ROI', 'Flexible loan eligibility', 'Suitable for resale & ready property'], color: 'blue' },
        { bank: 'Union Bank', interest: '7.15% p.a.', fee: 'As per eligibility', benefits: ['Competitive PSU rates', 'Suitable for salaried & self-employed', 'Flexible LTV norms'], color: 'peacock-green' },
        { bank: 'HDFC Bank', interest: '7.20% p.a.', fee: '₹3,300–₹4,000+ / 0.10%', benefits: ['Fast processing', 'Strong resale property verification', 'Digital documentation support'], color: 'blue' },
        { bank: 'Bank of Baroda', interest: '7.35% p.a.', fee: '10500', benefits: ['No processing charges', 'Trusted public sector bank', 'Transparent loan terms'], color: 'peacock-green' },
        { bank: 'Punjab National Bank', interest: '7.45% p.a.', fee: 'NIL', benefits: ['Zero processing fee', 'Suitable for resale & ready homes', 'Strong PSU backing'], color: 'blue' },
        { bank: 'State Bank of India (SBI)', interest: '7.50% p.a.', fee: '0.35% (₹2,000–₹10,000)', benefits: ['India’s most trusted bank', 'High loan eligibility', 'Stable long-term rates'], color: 'peacock-green' },
        { bank: 'Axis Bank', interest: '7.25% p.a.', fee: '₹11,800 / 0.35%', benefits: ['Quick approval', 'Competitive private bank rates', 'Good for salaried applicants'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '7.30% p.a.', fee: '₹5,900 + GST / 0.25%', benefits: ['Fast digital processing', 'Suitable for resale transfers', 'Strong brand trust'], color: 'peacock-green' }
    ],
    'Takeover': [
        { bank: 'Bank of Maharashtra', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest ROI option', 'Zero processing charges', 'Ideal for balance transfer cases'], color: 'blue' },
        { bank: 'Bank of India', interest: '7.35% p.a.', fee: 'Waived for CIBIL 725+', benefits: ['Fee waiver for strong credit profile', 'Competitive PSU rates', 'Suitable for takeover + top-up'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '7.50% p.a.', fee: 'Up to ₹16,000', benefits: ['Attractive ROI', 'Suitable for salaried & self-employed', 'Good takeover flexibility'], color: 'blue' },
        { bank: 'Union Bank', interest: '7.15% p.a.', fee: 'As per eligibility', benefits: ['PSU advantage', 'Competitive balance transfer option', 'Flexible LTV norms'], color: 'peacock-green' },
        { bank: 'HDFC Bank', interest: '7.20% p.a.', fee: '₹3,300–₹4,000+ / 0.10%', benefits: ['Fast digital processing', 'Smooth takeover procedure', 'Strong private bank brand'], color: 'blue' },
        { bank: 'Bank of Baroda', interest: '7.35% p.a.', fee: '10500', benefits: ['Zero processing fee', 'Trusted PSU bank', 'Suitable for loan switching'], color: 'peacock-green' },
        { bank: 'State Bank of India (SBI)', interest: '7.50% p.a.', fee: '0.35% (₹2,000–₹10,000)', benefits: ['India’s most trusted bank', 'Stable long-term rates', 'Suitable for large outstanding loans'], color: 'blue' },
        { bank: 'Axis Bank', interest: '7.50% p.a.', fee: '₹11,800 / 0.35%', benefits: ['Quick approval process', 'Competitive private bank option', 'Good for salaried customers'], color: 'peacock-green' },
        { bank: 'ICICI Bank', interest: '7.30% p.a.', fee: '₹5,900 + GST / 0.25%', benefits: ['Fast online process', 'Suitable for balance transfer + top-up', 'Strong customer support'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '7.70% p.a.', fee: '₹10,000 + GST / 0.25%', benefits: ['Flexible repayment options', 'Smooth takeover approval', 'Good for mid-to-high loan amounts'], color: 'peacock-green' }
    ],
    'Home Renovation': [
        { bank: 'Bank of Maharashtra', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest ROI option', 'Zero processing charges', 'Ideal for home renovation & repair'], color: 'blue' },
        { bank: 'Bank of India', interest: '7.35% p.a.', fee: 'Waived for CIBIL 725+', benefits: ['Fee waiver for strong credit profile', 'Competitive PSU rates', 'Suitable for renovation + extension'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '7.50% p.a.', fee: 'Up to ₹16,000', benefits: ['Attractive ROI', 'Flexible loan eligibility', 'Suitable for house improvement'], color: 'blue' },
        { bank: 'HDFC Bank', interest: '7.20% p.a.', fee: '₹3,300–₹4,000+ / 0.10%', benefits: ['Fast digital processing', 'Suitable for interior & structural renovation', 'Strong private bank brand'], color: 'blue' },
        { bank: 'Bank of Baroda', interest: '7.35% p.a.', fee: '10500', benefits: ['Zero processing fee', 'Trusted PSU bank', 'Transparent loan structure'], color: 'peacock-green' },
        { bank: 'Axis Bank', interest: '7.25% p.a.', fee: '₹11,800 / 0.35%', benefits: ['Quick approval process', 'Competitive private bank option', 'Good for salaried customers'], color: 'blue' },
        { bank: 'ICICI Bank', interest: '7.30% p.a.', fee: '₹5,900 + GST / 0.25%', benefits: ['Fast online documentation', 'Suitable for renovation + top-up', 'Strong customer support'], color: 'peacock-green' },
        { bank: 'Kotak Mahindra Bank', interest: '7.70% p.a.', fee: '₹10,000 + GST / 0.25%', benefits: ['Flexible repayment tenure', 'Smooth approval process', 'Suitable for mid-sized renovation loans'], color: 'blue' },
        { bank: 'PNB Bank', interest: '7.90% p.a.', fee: 'NIL', benefits: ['Zero processing charges', 'Suitable for renovation & extension', 'Trusted PSU backing'], color: 'peacock-green' },
        { bank: 'RBL Bank', interest: '8.20% p.a.', fee: 'Up to 1.5% of loan amount', benefits: ['Flexible eligibility', 'Suitable for self-employed applicants', 'Competitive private bank option'], color: 'blue' }
    ],
    'Plot + Construction': [
        { bank: 'Bank of Maharashtra', interest: '7.15% p.a.', fee: 'NIL', benefits: ['Lowest ROI option', 'Zero processing charges', 'Stage-wise construction disbursement'], color: 'blue' },
        { bank: 'Indian Overseas Bank', interest: '7.35% p.a.', fee: 'NIL', benefits: ['Competitive PSU rates', 'Suitable for plot purchase + construction', 'Transparent loan structure'], color: 'blue' },
        { bank: 'Bank of India', interest: '7.35% p.a.', fee: 'Waived for CIBIL 725+', benefits: ['Processing fee waiver benefit', 'Suitable for strong credit profiles', 'Flexible loan eligibility'], color: 'blue' },
        { bank: 'IDBI Bank', interest: '7.50% p.a.', fee: 'Up to ₹16,000', benefits: ['Attractive ROI', 'Suitable for plot + construction loans', 'Flexible tenure options'], color: 'blue' },
        { bank: 'Union Bank', interest: '7.15% p.a.', fee: 'As per eligibility', benefits: ['PSU advantage', 'Flexible LTV norms', 'Stage-wise disbursement support'], color: 'peacock-green' },
        { bank: 'HDFC Bank', interest: '7.20% p.a.', fee: '₹3,300–₹4,000+ / 0.10%', benefits: ['Fast processing', 'Strong private bank support', 'Suitable for salaried & self-employed'], color: 'blue' },
        { bank: 'Bank of Baroda', interest: '7.35% p.a.', fee: '10500', benefits: ['Zero processing charges', 'Trusted public sector bank', 'Competitive construction loan option'], color: 'peacock-green' },
        { bank: 'State Bank of India (SBI)', interest: '7.50% p.a.', fee: '0.35% (₹2,000–₹10,000)', benefits: ['India’s most trusted bank', 'High loan eligibility', 'Suitable for large construction projects'], color: 'blue' },
        { bank: 'Kotak Mahindra Bank', interest: '7.70% p.a.', fee: '₹10,000 + GST / 0.25%', benefits: ['Flexible repayment tenure', 'Smooth approval process', 'Suitable for mid to high loan amounts'], color: 'peacock-green' },
        { bank: 'Tata Capital Housing Finance', interest: '7.75% p.a.', fee: 'Up to ₹10,000', benefits: ['Quick processing', 'Flexible approval criteria', 'Suitable for plot + construction combination'], color: 'blue' }
    ],

};

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

export const PARTNER_BANKS = [
    { name: "BANK OF MAHARASHTRA", color: "#3257A8" },
    { name: "CENTRAL BANK OF INDIA", color: "#4F7FC1" },
    { name: "BANK OF BARODA", color: "#F06B1B" },
    { name: "PUNJAB NATIONAL BANK", color: "#CC2229" },
    { name: "STATE BANK OF INDIA (SBI)", color: "#2163AD" },
    { name: "HDFC BANK", color: "#1C51A1" },
    { name: "ICICI BANK", color: "#F37021" },
    { name: "AXIS BANK", color: "#851336" },
    { name: "TATA CAPITAL HOUSING FINANCE", color: "#2076C7" },
    { name: "IDBI BANK", color: "#008A45" },
    { name: "UNION BANK", color: "#E81717" },
    { name: "AVANSE FINANCIAL SERVICES", color: "#2076C7" },
    { name: "AUXILO FINSERVE PRIVATE LTD", color: "#1CADA3" },
    { name: "BANK OF INDIA", color: "#2076C7" },
    { name: "HDFC CREDILA", color: "#8B4791" }
];
