// app/offers/loans/mortgage-loan/data.ts

export const mortgageLoanData = {
    title: 'Mortgage Loan',
    category: 'Finance',
    icon: 'Landmark',
    description: 'Unlock the hidden potential of your property with a Mortgage Loan. Get huge funds at competitive rates while continuing to use your property.',
    overview: 'A Mortgage Loan (also known as Loan Against Property or LAP) is a secured loan where you pledge your residential, commercial, or industrial property as collateral to borrow funds. It is one of the most cost-effective ways to manage large financial needs like business expansion, medical emergencies, or child\'s education, as it offers much lower interest rates compared to personal loans and much higher loan amounts.',
    features: [
        'High loan amount up to ₹25 Crores+',
        'Loan against Residential, Commercial, and Industrial property',
        'Repayment tenure up to 15-20 years',
        'Attractive interest rates starting from 8.20%',
        'Balance Transfer & Top-up facility available',
        'No end-use restriction - Use for business or personal needs',
        'Overdraft (OD) facility available against property'
    ],
    benefits: [
        {
            title: 'Lower Interest Rates',
            description: 'Being a secured loan, interest rates are significantly lower than personal or business loans.'
        },
        {
            title: 'Maximum Liquidity',
            description: 'Unlock up to 60-70% of your property\'s market value for immediate financial needs.'
        },
        {
            title: 'Flexible Repayment',
            description: 'Longer tenures ensure lower EMIs, making repayment comfortable for your cash flow.'
        },
        {
            title: 'Property Usage',
            description: 'You can continue to use or rent out your property while it is pledged for the loan.'
        },
        {
            title: 'Simplified Documentation',
            description: 'Hassle-free process with door-step service and digital tracking.'
        }
    ],
    eligibility: [
        'Age: 21 to 70 years (at loan maturity)',
        'Occupation: Salaried individuals, Professionals, and Self-Employed Business Owners',
        'Property: Clear and marketable title of the property being pledged',
        'Income: Stable income with positive repayment capacity',
        'Nationality: Resident Indian and NRIs'
    ],
    documents: {
        kyc: [
            'Identity Proof (Aadhaar, PAN Card, Passport)',
            'Address Proof (Electricity Bill, Passport, Registered Rent Agreement)',
            'Passport Size Photographs'
        ],
        incomeSalaried: [
            'Latest 6 months Salary Slips',
            'Latest 6 months Bank Statement showing salary credit',
            'Form 16 & ITR for last 2 years'
        ],
        incomeSelfEmployed: [
            'Last 2-3 years audited Financial Statements (Balance Sheet, P&L)',
            'Last 2-3 years ITR with computation',
            'Last 12 months Bank Statements (Current & Savings accounts)'
        ],
        propertyDocs: [
            'Registered Sale Deed / Lease Deed / Title Deed',
            'NOC from Society or Authority',
            'Latest Property Tax receipts',
            'Approved Building Plan & Completion Certificate (CC)',
            'Past Chain of Documents (Last 30 years search report)'
        ]
    }
};
