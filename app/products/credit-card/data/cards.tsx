import {
    IconShoppingBag, IconPlaneDeparture, IconCash, IconGift, IconCrown,
    IconGasStation, IconToolsKitchen2, IconDeviceMobile, IconPlane,
    IconHeartbeat, IconBallFootball
} from '@tabler/icons-react';

export interface CreditCard {
    id: number;
    bank: string;
    category: string;
    title: string;
    subtitle: string;
    image: string;
    highlights: string[];
    detailedFeatures: string[];
    joiningFee: string;
    annualFee: string;
    bestFor: string;
    tags: string[];
    featured?: boolean;
}

export const banks = [
    { name: 'SBI Card' },
    { name: 'HDFC Bank' },
    { name: 'ICICI Bank' },
    { name: 'Axis Bank' },
    { name: 'AU Bank' },
    { name: 'IndusInd Bank' },
    { name: 'IDFC First Bank' },
    { name: 'Kotak Bank' },
    { name: 'Union Bank of India' }
];

export const categories = [
    { id: 'shopping', title: 'Shopping', icon: <IconShoppingBag size={18} /> },
    { id: 'travel', title: 'Travel', icon: <IconPlaneDeparture size={18} /> },
    { id: 'cashback', title: 'Cashback', icon: <IconCash size={18} /> },
    { id: 'rewards', title: 'Rewards', icon: <IconGift size={18} /> },
    { id: 'premium', title: 'Premium', icon: <IconCrown size={18} /> },
    { id: 'fuel', title: 'Fuel', icon: <IconGasStation size={18} /> },
    { id: 'dining', title: 'Dining', icon: <IconToolsKitchen2 size={18} /> },
    { id: 'movies', title: 'Movies', icon: <IconDeviceMobile size={18} /> },
    { id: 'lounge', title: 'Lounge', icon: <IconPlane size={18} /> },
    { id: 'online', title: 'Online', icon: <IconDeviceMobile size={18} /> },
    { id: 'health', title: 'Health', icon: <IconHeartbeat size={18} /> },
    { id: 'lifestyle', title: 'Lifestyle', icon: <IconBallFootball size={18} /> }
];

export const KOTAK_ELIGIBILITY = ['Age: 21-65 years', 'Min. Income: ₹3 Lakh p.a. (Salaried/Self-employed)', 'Citizenship: Indian Resident'];
export const KOTAK_DOCS = ['PAN Card copy (Mandatory)', 'Identity Proof (Aadhaar/Passport)', 'Address Proof (Utility Bills/Aadhaar/Passport)', 'Income Proof (Latest 3 months salary slip/ITR)'];

export const INDUSIND_ELIGIBILITY = ['Age: 21-65 years', 'Min. Income: ₹20,000 monthly (Salaried)', 'Citizenship: Indian Resident'];
export const INDUSIND_DOCS = ['PAN Card copy (Mandatory)', 'Identity/Address Proof (Aadhaar/Passport)', 'Income Proof (3 months salary slip/Form 16/ITR)'];

export const UNION_ELIGIBILITY = ['Age: 21-65 years', 'Min. Income: ₹2.5 Lakh p.a. (Salaried)', 'Citizenship: Indian Resident'];
export const UNION_DOCS = ['2 Color Passport Size Photos', 'PAN Card copy (Mandatory)', 'KYC Docs (Aadhaar/Passport/Voter ID)', 'Income Proof (ITR/Form 16/Salary Slip)'];

export const GENERIC_ELIGIBILITY = ['Age: 21-70 years', 'Min. Income: ₹2 Lakh p.a. (Salaried/Self-employed)', 'Citizenship: Indian Resident'];
export const GENERIC_DOCS = ['PAN Card copy (Mandatory)', 'Identity Proof (Aadhaar)', 'Address Proof', 'Income Proof (ITR/Salary Slip)'];

export const cardTypes: CreditCard[] = [];