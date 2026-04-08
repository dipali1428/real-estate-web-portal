// ============================================================
// SINGLE SOURCE OF TRUTH for Travel Insurance Product Data
// Changes here will be reflected in:
//   - The public Travel Insurance product page (app/products/travel-insurance)
//   - The B2B Agent Dashboard insurance tab (app/dashboard/products)
// ============================================================

export const travelInsuranceProviders = [
    { name: 'Tata AIG', ratio: '99.01%', network: '7,000+', features: ['COVID-19 Coverage', 'No Sub-limits'], price: '₹24.8/*' },
    { name: 'Bajaj Allianz', ratio: '98.48%', network: '8,000+', features: ['Missed Flight Cover', 'Home Burglary Cover'], price: '₹13/*' },
    { name: 'HDFC ERGO', ratio: '99.85%', network: '1 Lakh+', features: ['Cashless Worldwide', 'No Medical Check-up'], price: '₹25/*' },
    { name: 'Niva Bupa', ratio: '99.99%', network: '10,000+', features: ['Zero Deductible', 'Quick Claim Settlement'], price: '₹20/*' },
    { name: 'Reliance', ratio: '98.65%', network: '8,500+', features: ['Auto-Extension', 'No Med Check'], price: '₹15/*' },
    { name: 'ICICI Lombard', ratio: '99.70%', network: '6,500+', features: ['Adventure Sports', 'Schengen Approved'], price: '₹22/*' },
];

export const travelInsurancePlans = [
    {
        title: 'Single Trip',
        tagline: 'One Trip, Full Coverage',
        desc: 'Perfect for one-off vacations or business trips. Coverage for up to 180 days.',
        features: ['Medical up to ₹2 Cr', 'Cancellation 100%', 'Baggage up to ₹50k', '24/7 Support'],
        price: '₹399',
        duration: 'per trip',
        popular: false,
    },
    {
        title: 'Multi-Trip Annual',
        tagline: 'Unlimited Trips, One Plan',
        desc: 'Ideal for frequent travelers. Cover unlimited trips within a year (up to 45 days each).',
        features: ['Medical up to ₹4 Cr', 'Unlimited Trips', 'Liability ₹8 Cr', 'Flight Delay Cover'],
        price: '₹2,499',
        duration: 'per year',
        popular: true,
    },
    {
        title: 'Student Travel',
        tagline: 'Study Abroad, Stay Safe',
        desc: 'Tailored for students. Extended stays up to 2 years with academic activity coverage.',
        features: ['Extended Stays', 'Tuition Protection', 'Sponsor Benefit', 'Mental Health Support'],
        price: '₹4,999',
        duration: 'per year',
        popular: false,
    },
    {
        title: 'Family Floater',
        tagline: 'Protect Your Whole Family',
        desc: 'One plan for the entire family. Cover spouse and up to 3 dependent children.',
        features: ['Family Medical ₹6 Cr', 'Child Benefits', 'Maternity Emergency', 'Adventure Sports'],
        price: '₹3,799',
        duration: 'per trip',
        popular: false,
    },
];

export const travelInsuranceAddons = [
    'Adventure Sports Cover',
    'Home Burglary Insurance',
    'Compassionate Visit',
    'Passport Loss Cover',
    'Auto-Extension Benefit',
    'Missed Departure Cover',
];

// Insurer names list (for quick reference in the B2B dashboard)
export const travelInsuranceInsurerNames = travelInsuranceProviders.map(p => p.name);