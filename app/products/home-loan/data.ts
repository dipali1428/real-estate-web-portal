// app/offers/loans/home-loan/data.ts

export type Offer = {
    title: string;
    category: string;
    icon: string;
    description: string;
    overview: string;
    features: string[];
    benefits: Array<{ title: string; description: string }>;
    eligibility: string[];
    documents: string[];
    offerDetails: Record<string, string>;
};

export const homeLoanData: Offer = {
    title: 'Home Loan',
    category: 'Finance',
    icon: 'Home',
    description: 'Special home loan offer with reduced interest rates for dream home ownership',
    overview: 'A home loan is a secured loan offered by financial institutions to help individuals purchase, construct, or renovate a residential property. The property itself serves as collateral, allowing for lower interest rates and longer repayment tenures compared to unsecured loans.',
    features: [
        'Interest rates starting from 8.5% p.a.',
        'Loan amount up to ₹10 Crores',
        'Flexible tenure up to 30 years',
        'Balance transfer facility available',
        'Top-up loan options for additional needs',
        'Pre-approved offers for existing customers',
        'Online application and tracking'
    ],
    benefits: [
        {
            title: 'Home Ownership',
            description: 'Makes property ownership accessible without requiring the full purchase amount upfront, enabling families to own their dream home.'
        },
        {
            title: 'Tax Benefits',
            description: 'Enjoy tax deductions under Section 24(b) for interest paid up to ₹2 lakhs annually and under Section 80C for principal repayment up to ₹1.5 lakhs.'
        },
        {
            title: 'Building Equity',
            description: 'Each EMI payment increases your ownership stake in the property, building valuable equity over time.'
        },
        {
            title: 'Long-Term Investment',
            description: 'Real estate typically appreciates in value, making your home both a living space and a financial investment.'
        },
        {
            title: 'Stable Housing Costs',
            description: 'Fixed EMI payments provide financial predictability compared to rising rental costs.'
        }
    ],
    eligibility: [
        'Age: 21-65 years for primary applicant',
        'Minimum income: ₹20,000 per month (salaried) / ₹3 lakhs per annum (self-employed)',
        'CIBIL score: 650 and above',
        'Property value: ₹20 Lakhs to ₹5 Crores',
        'Resident Indian citizen or NRI'
    ],
    documents: [
        'Identity proof (Aadhaar, PAN, Passport, Voter ID)',
        'Address proof (Utility bills, Rental agreement, Property papers)',
        'Income proof (Last 6 months salary slips, Form 16, Bank statements)',
        'Property documents (Sale deed, Allotment letter, NOC from society)',
        'Employment proof (Appointment letter, Employee ID card)',
        'Photographs (Passport size)'
    ],
    offerDetails: {
        interestRate: 'Start from 7.15%',
        maxLoanAmount: '₹10 Crores',
        tenure: 'Up to 30 years',
        prepaymentCharges: 'Nil after 3 years',
        loanToValue: 'Up to 90% of property value'
    }
};
