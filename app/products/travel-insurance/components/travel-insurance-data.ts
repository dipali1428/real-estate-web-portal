// --- Types ---
export interface Traveler {
    id: number;
    age: number | string;
}

export interface Quotation {
    id: string;
    insurer: string;
    logo: string;
    csr: string; // Claim Settlement Ratio
    hospitals: string; // Network Hospitals
    rating: number;
    basePremium: number;
    addOnsCost: number;
    discount: number;
    gst: number;
    finalPremium: number;
    pricePerDay: number;
    benefits: string[];
    tag?: 'Best Value' | 'Lowest Price' | 'Most Trusted';
}

// --- Data & Constants ---
export const INSURERS = [
    { name: 'HDFC ERGO', logo: 'HE', csr: '99.85%', hospitals: '10,000+', rating: 4.8, color: 'from-blue-600 to-blue-400' },
    { name: 'Tata AIG', logo: 'TA', csr: '99.01%', hospitals: '7,000+', rating: 4.7, color: 'from-teal-600 to-teal-400' },
    { name: 'Bajaj Allianz', logo: 'BA', csr: '98.48%', hospitals: '8,000+', rating: 4.5, color: 'from-blue-700 to-blue-500' },
    { name: 'ICICI Lombard', logo: 'IL', csr: '99.70%', hospitals: '6,500+', rating: 4.6, color: 'from-orange-600 to-orange-400' },
    { name: 'Niva Bupa', logo: 'NB', csr: '99.99%', hospitals: '10,500+', rating: 4.9, color: 'from-red-600 to-red-400' },
];

export const DESTINATIONS = [
    { label: 'Asia (Excl. Japan/Korea)', riskFactor: 0.8, countries: ['Thailand', 'Vietnam', 'Indonesia', 'Singapore', 'Malaysia', 'India', 'Maldives', 'Philippines', 'Sri Lanka', 'Cambodia', 'Laos', 'Taiwan'] },
    { label: 'Schengen Countries', riskFactor: 1.2, countries: ['France', 'Germany', 'Switzerland', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Greece', 'Portugal', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary'] },
    { label: 'USA & Canada', riskFactor: 2.5, countries: ['USA', 'Canada', 'Mexico'] },
    { label: 'Worldwide', riskFactor: 1.8, countries: ['United Kingdom', 'Australia', 'New Zealand', 'South Africa', 'Brazil', 'Japan', 'South Korea', 'Ireland', 'Turkey', 'Egypt', 'Russia', 'Argentina', 'Chile'] },
    { label: 'Middle East', riskFactor: 1.1, countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'Jordan', 'Israel'] },
];

export const TRIP_PURPOSES = [
    { label: 'Leisure/Vacation', multiplier: 1 },
    { label: 'Business Trip', multiplier: 0.95 },
    { label: 'Student Study', multiplier: 0.85 },
    { label: 'Employment', multiplier: 1.1 },
];

export const SUM_INSURED_OPTIONS = [
    { label: '₹10 Lakhs', value: 1000000, multiplier: 0.8 },
    { label: '₹25 Lakhs', value: 2500000, multiplier: 1 },
    { label: '₹50 Lakhs', value: 5000000, multiplier: 1.4 },
    { label: '₹75 Lakhs', value: 7500000, multiplier: 1.7, recommended: true },
    { label: '₹1 Crore', value: 10000000, multiplier: 1.9 },
    { label: '₹1.5 Crores', value: 15000000, multiplier: 2.2, recommended: true },
    { label: '₹2 Crores', value: 20000000, multiplier: 2.6 },
    { label: '₹5 Crores', value: 50000000, multiplier: 4.5 },
];

export const ADDONS = [
    { id: 'medical_evac', label: 'Medical Evacuation', price: 2500 },
    { id: 'trip_cancel', label: 'Trip Cancellation', price: 1800 },
    { id: 'baggage_delay', label: 'Baggage Delay', price: 950 },
    { id: 'adventure_sports', label: 'Adventure Sports', price: 4500 },
];

export const BASE_DAILY_RATES: Record<string, number> = {
    'HDFC ERGO': 95,
    'Tata AIG': 105,
    'Bajaj Allianz': 85,
    'ICICI Lombard': 110,
    'Niva Bupa': 100,
};

export const getInsurerBenefits = (insurerName: string): string[] => {
    if (insurerName === 'HDFC ERGO') {
        return [
            'Cashless Worldwide Treatment',
            'COVID-19 Hospitalization Cover',
            'No Medical Check-up up to 70 years',
            'Loss of Passport & Documents',
            'Trip Delay & Interruption Cover',
            'Personal Accident Coverage',
            'Emergency Dental Treatment',
            'Automatic Policy Extension',
            'Compassionate Visit Cover',
            'Baggage Delay Compensation'
        ];
    }
    if (insurerName === 'Tata AIG') {
        return [
            'Adventure Sports Coverage',
            'Emergency Dental Treatment',
            'Compassionate Visit',
            'Automatic Extension of Policy',
            'Study Interruption (for Students)',
            'Baggage Loss Coverage',
            'Personal Liability Cover',
            'Flight Hijack Distress Allowance',
            'Loss of Passport Cover',
            'COVID-19 Hospitalization'
        ];
    }
    return [
        'COVID-19 Covered from Day 1',
        'Cashless Hospitalization Globally',
        'Emergency Dental Treatment',
        'Loss of Passport & Documents',
        'Trip Delay Compensation',
        'Personal Accident Cover',
        'Baggage Delay & Loss',
        'Medical Evacuation Cover',
        'Repatriation of Remains',
        '24x7 Global Assistance'
    ];
};

// Helper: Format Number
export const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);