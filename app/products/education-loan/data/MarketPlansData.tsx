
export interface MarketPlan {
    id: string;
    name: string;
    interest: string;
    loanAmount: string;
    usp: string;
    bestFor: string;
    category: 'NBFC' | 'Private' | 'PSU' | 'Co-operative';
    logo: string;
    extra?: string;
}

export const marketPlans: MarketPlan[] = [
    // NBFCs
    {
        id: 'avanse',
        name: 'AVANSE Financial Services',
        interest: '10.5% – 14.5%',
        loanAmount: 'Abroad: up to ₹50L (non-collateral possible)',
        usp: 'Fast processing, Flexible profile',
        bestFor: 'Average profile + abroad students',
        category: 'NBFC',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/avanse.webp'
    },
    {
        id: 'auxilo',
        name: 'AUXILO Finserve',
        interest: '11.25% – 14%',
        loanAmount: 'Up to ₹50L unsecured',
        usp: '3–5 days approval, High visa success support',
        bestFor: 'Urgent cases',
        category: 'NBFC',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/Auxilo.webp'
    },
    {
        id: 'hdfc-credila',
        name: 'HDFC Credila',
        interest: '10.5% – 13.5%',
        loanAmount: '₹40L unsecured',
        usp: 'Strong brand trust, Premium universities focus',
        bestFor: 'Premium universities',
        category: 'NBFC',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/HDFC credila.jpg',
        extra: 'Insurance bundling common'
    },
    {
        id: 'incred',
        name: 'InCred',
        interest: '11% – 13.75%',
        loanAmount: 'Up to ₹1 Cr',
        usp: 'Fully digital, Flexible underwriting',
        bestFor: 'Digital-first users',
        category: 'NBFC',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/incred finance.jfif'
    },
    {
        id: 'tata-capital',
        name: 'Tata Capital',
        interest: '10.5% – 13%',
        loanAmount: 'Structured EMI options',
        usp: 'Strong corporate backing, Structured EMI options',
        bestFor: 'Structured repayment seekers',
        category: 'NBFC',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/tata capital.webp'
    },
    // Private Banks
    {
        id: 'axis-bank',
        name: 'Axis Bank',
        interest: '11% – 14%',
        loanAmount: 'Up to ₹75L',
        usp: 'Good for semi-strong profiles, Faster than PSU',
        bestFor: 'Semi-strong profiles',
        category: 'Private',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/axis bank.png'
    },
    {
        id: 'icici-bank',
        name: 'ICICI Bank',
        interest: '9.25% – 13%',
        loanAmount: '₹40L unsecured',
        usp: 'Top 200 universities focus, Good for abroad',
        bestFor: 'Top 200 universities',
        category: 'Private',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/icici bank.jfif'
    },
    {
        id: 'idfc-first',
        name: 'IDFC FIRST Bank',
        interest: '10.5% – 11%+',
        loanAmount: 'International Loans focus',
        usp: 'Competitive rates, Growing segment',
        bestFor: 'International students',
        category: 'Private',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/idfc bank logo.png'
    },
    {
        id: 'yes-bank',
        name: 'YES BANK',
        interest: '11%+',
        loanAmount: 'Selective lending',
        usp: 'Selective lending, Premium cases',
        bestFor: 'Premium cases',
        category: 'Private',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/yes bank.png'
    },
    // PSU Banks
    {
        id: 'bob',
        name: 'Bank of Baroda',
        interest: '10.15% – 11% abroad / 8.5%+ domestic',
        loanAmount: 'Up to ₹1.5 Cr',
        usp: 'Premier university list benefit',
        bestFor: 'Premier university students',
        category: 'PSU',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/bank of baroda.png'
    },
    {
        id: 'boi',
        name: 'Bank of India',
        interest: '7.5% – 10%',
        loanAmount: 'Star Education Loan scheme',
        usp: 'Discounts for girls & STEM',
        bestFor: 'Girls & STEM students',
        category: 'PSU',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/bank of india.png'
    },
    {
        id: 'bom',
        name: 'Bank of Maharashtra',
        interest: '7.7%+',
        loanAmount: 'Domestic focus',
        usp: 'Low interest, Good for domestic',
        bestFor: 'Domestic students',
        category: 'PSU',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/bank of maharashtra.jpg'
    },
    {
        id: 'cbi',
        name: 'Central Bank of India',
        interest: '7.35% (Lowest)',
        loanAmount: 'Widest domestic reach',
        usp: 'Cheapest loans',
        bestFor: 'Cost-conscious students',
        category: 'PSU',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/central bank of india.png'
    },
    {
        id: 'ubi',
        name: 'Union Bank (UBI)',
        interest: '10.5%+',
        loanAmount: 'Government schemes support',
        usp: 'Government schemes support',
        bestFor: 'Govt scheme seekers',
        category: 'PSU',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/union bank.png'
    },
    // Co-operative
    {
        id: 'saraswat',
        name: 'Saraswat Bank',
        interest: '9.5%+',
        loanAmount: 'Small ticket focus',
        usp: 'Local client focus',
        bestFor: 'Local clients',
        category: 'Co-operative',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/saraswat bank.jfif'
    },
    {
        id: 'svc',
        name: 'SVC Co-operative Bank',
        interest: '9.5%+',
        loanAmount: 'Small ticket focus',
        usp: 'Local client focus',
        bestFor: 'Local clients',
        category: 'Co-operative',
        logo: 'https://diva2ast20wqu.cloudfront.net/public/products/educationloan_banks/svc bank.png'
    }
];

export const marketSummary = [
    { category: 'PSU Banks', speed: 'Slow', interest: 'Low', approval: 'Strict' },
    { category: 'Private Banks', speed: 'Medium', interest: 'Medium', approval: 'Moderate' },
    { category: 'NBFCs', speed: 'Fast', interest: 'High', approval: 'Easy' }
];