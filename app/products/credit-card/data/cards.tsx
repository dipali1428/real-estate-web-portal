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

export const cardTypes: CreditCard[] = [
    {
        id: 2,
        bank: 'SBI Card',
        category: 'online',
        title: 'SimplyCLICK SBI Card',
        subtitle: 'Log on to Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SimplyCLICK SBI Card.png`,
        highlights: [
            '10X rewards on Dominos, Myntra, Yatra & more.',
            'Low annual fee & easy approval.',
            '5X rewards on online shopping.'
        ],
        detailedFeatures: [
            '10X Reward Points equivalent to 2.5% value back on Amazon, BookMyShow, Cleartrip, and Lenskart.',
            'Earn 5X Reward Points (1.25% value back) on all other online purchases.',
            'Milestone Rewards: E-vouchers worth ₹2,000 each on hitting ₹1 Lakh and ₹2 Lakhs annual spends.',
            'Points can be redeemed for a wide range of gifts or used to pay outstanding credit card balance.',
            'Contactless Advantage: Just tap and pay for daily purchases up to ₹5000 securely.'
        ],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Online Shopping',
        tags: ['Online Shopping', 'Rewards']
    },
    {
        id: 3,
        bank: 'HDFC Bank',
        category: 'rewards',
        title: 'MONEYBACK PLUS Credit Card',
        subtitle: 'More value on every swipe',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/MONEYBACK PLUS Credit Card.png`,
        highlights: [
            'Convert big purchases into easy EMIs.',
            'Contactless payments up to Rs. 5,000.',
            'Get 500 CashPoints on joining fee.'
        ],
        detailedFeatures: [
            '10X CashPoints on Amazon, BigBasket, Flipkart, Reliance Smart SuperStore & Swiggy.',
            '5X CashPoints on EMI spends at merchant locations.',
            '2 CashPoints per ₹150 spent on other expenses.',
            'Gift voucher of Rs. 500 on spends of Rs. 50,000 in a calendar quarter.',
            'Renewal fee waived off if you spend Rs. 50,000 and above in the previous year.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Everyday Value',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 4,
        bank: 'HDFC Bank',
        category: 'premium',
        title: 'REGALIA GOLD Credit Card',
        subtitle: 'Experience Gold Standard',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/REGALIA GOLD Credit Card.png`,
        highlights: [
            'Upto 5X rewards on Nykaa, Myntra & more',
            'Complimentary Priority Pass membership',
            'Gift voucher worth Rs. 2,500 on joining'
        ],
        detailedFeatures: [
            'Marquee Rewards: Earn 4 Reward Points per ₹150 spent on retail including insurance, utilities & education.',
            'Unlock Priority Pass membership providing 6 international airport lounge visits purely on request.',
            'Milestone Benefit: Receive vouchers worth ₹1500 every time you spend ₹1.5 Lakhs in a calendar quarter.',
            'Low 2% Foreign Currency Markup fee on international transactions.',
            'Comprehensive travel insurance including air accident cover up to ₹1 Crore.'
        ],
        joiningFee: '₹2,500',
        annualFee: '₹2,500',
        bestFor: 'Luxury Travel & Shopping',
        tags: ['Priority Pass', 'Elite Status'],
        featured: true
    },
    {
        id: 5,
        bank: 'ICICI Bank',
        category: 'online',
        title: 'Amazon Pay ICICI Card',
        subtitle: 'Rewards that never end',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Amazon Pay ICICI Card.jpg`,
        highlights: [
            'Unlimited 5% back for Prime members',
            'Lifetime free — No annual fees',
            'Immediate cashback to Amazon Pay balance'
        ],
        detailedFeatures: [
            'Uncapped earning potential with no expiration dates on your accumulated points.',
            'Earn 2% reward points on transactions with 100+ partner merchants like Swiggy, BookMyShow and Yatra.',
            '1% reward points on all other payments including dining, insurance, and offline shopping.',
            'Cashback is automatically credited to your Amazon Pay wallet at the end of every billing cycle.',
            'Enjoy exclusive 15% savings on dining bills at participating restaurants via ICICI Culinary Treats.'
        ],
        joiningFee: 'Zero',
        annualFee: 'Zero',
        bestFor: 'Amazon Shopping',
        tags: ['Lifetime Free', 'Cashback']
    },
    {
        id: 1,
        bank: 'HDFC Bank',
        category: 'shopping',
        title: 'TATA NEU PLUS Credit Card',
        subtitle: 'Save up to 7% on Tata Neu',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/TATA NEU PLUS Credit Card.png`,
        highlights: [
            'Save up to 7% on Tata Neu apps',
            'Complimentary lounge access (1/qtr)',
            '2% value back as NeuCoins on partner brands'
        ],
        detailedFeatures: [
            'Welcome Benefit: Get 496 NeuCoins on Tata Neu App as a joining bonus (1 NeuCoin = ₹1).',
            'Earn 1% NeuCoins on all other spends excluding fuel and wallet reloads.',
            'Enjoy a 1% fuel surcharge waiver at petrol stations across India.',
            'Get up to 5% bonus NeuCoins with the NeuPass membership.',
            'Annual fee is reversed if your total spend exceeds ₹1 Lakh in the previous year.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Shopping & Rewards',
        tags: ['NeuCoins', 'Lounge Access']
    },
    {
        id: 6,
        bank: 'Axis Bank',
        category: 'cashback',
        title: 'Axis Bank ACE Card',
        subtitle: 'Aced with 5% Cashback',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AIRTEL+AXIS+BANK+Credit+Card.png`,
        highlights: [
            '5% Cashback on Bill payments via GPay',
            '2% Cashback on all other spends',
            'Complimentary domestic lounge access'
        ],
        detailedFeatures: [
            'Enjoy a guaranteed 4% flat cashback when spending on Swiggy, Zomato & Ola without upper limit.',
            'Base 2% unlimited cashback on almost all categories across offline and online stores.',
            'Exclusive access to the Axis Bank Dining Delights program offering up to 20% off at 4000+ restaurants.',
            'Card comes with a 1% fuel surcharge waiver up to ₹500 per month across all pump stations in India.',
            'Convert purchases above ₹2,500 easily into manageable EMIs.'
        ],
        joiningFee: '₹499',
        annualFee: '₹499',
        bestFor: 'Utility Bills & Cashback',
        tags: ['Highest Cashback', 'GPay Offers']
    },
    {
        id: 7,
        bank: 'AU Bank',
        category: 'premium',
        title: 'AU Zenith Metal Card',
        subtitle: 'The Pinnacle of Luxury',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AU Zenith Metal Card.png`,
        highlights: [
            'Premium Metal Card Construction',
            'Lowest 1.99% Forex markup fee',
            'Complimentary Taj Epicure membership'
        ],
        detailedFeatures: [
            'Welcome benefit includes Rs 10000 worth of luxury brand vouchers on activating the card.',
            'Earn 20 Reward points per ₹100 spent on Dining, Travel, and International spends.',
            'Buy one get one free on BookMyShow movie and event tickets (up to ₹500 off) twice every month.',
            'Unlimited domestic and international airport lounge access for primary & add-on cardholders.',
            'Get complimentary golf rounds and lessons globally based on your monthly spending tiers.'
        ],
        joiningFee: '₹7,999',
        annualFee: '₹7,999',
        bestFor: 'Ultra Luxury & International',
        tags: ['Metal Card', 'Low Forex']
    },
    {
        id: 8,
        bank: 'IndusInd Bank',
        category: 'lounge',
        title: 'Legend Credit Card',
        subtitle: 'Live the Legend',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Legend Credit Card.png`,
        highlights: [
            'Personal air accident insurance cover.',
            'Priority Pass with 600+ Airport Lounges access.',
            'Activation benefits from Luxe gift card, Montblanc, Post Card and vouchgram.'
        ],
        detailedFeatures: [
            'Earn 1 Reward point per ₹100 spent on weekdays and double points (2 points) on weekends.',
            'Bonus Milestone: Earn 4,000 bonus reward points on spending ₹6,00,000 or more within a year.',
            'Priority Pass Program providing access to 600+ VIP airport lounges worldwide.',
            'Travel Plus Program includes special waivers on international lounge usage charges.',
            'Auto Assist facility offers round-the-clock roadside assistance including flat-tire and towing services.'
        ],
        joiningFee: 'Lifetime Free',
        annualFee: 'Zero',
        bestFor: 'Movies & Weekend Spends',
        tags: ['Lifetime Free', 'Rewards', 'Travel']
    },
    {
        id: 9,
        bank: 'IDFC First Bank',
        category: 'movies',
        title: 'FIRST Millennia Credit Card',
        subtitle: 'Never Expiring Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/FIRST Millennia Credit Card.png`,
        highlights: [
            'Cashback capped at Rs. 1,000 on the 1st EMI transaction.',
            'Upto 25% off on movie tickets.',
            '0% interest charged on credit card cash withdrawals.'
        ],
        detailedFeatures: [
            'Earn 6X rewards on online merchants, 3X on retail stores without any earning caps.',
            'Pay with Points functionality allows using accumulated points seamlessly for any online transaction.',
            'Built-in lower interest rates starting from as low as 0.75% per month dynamically adjusting to behavior.',
            'Complimentary Roadside Assistance and a personal accident cover worth ₹2 Lakhs.',
            'Enjoy a ₹500 gift voucher upon spending ₹15,000 within 90 days of activation.'
        ],
        joiningFee: 'Nil',
        annualFee: 'Nil',
        bestFor: 'Young Professionals',
        tags: ['Lifetime Free', 'Rewards', 'Movies']
    },
    {
        id: 10,
        bank: 'HDFC Bank',
        category: 'lounge',
        title: 'HDFC Business Regalia',
        subtitle: 'For the Business Leader',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/HDFC Business Regalia.png`,
        highlights: [
            'Earn 4 Reward Points for every ₹150 spent',
            '12 Complimentary Airport Lounge access',
            '1% fuel surcharge waiver'
        ],
        detailedFeatures: [
            'Business specific rewards on telecom, electricity, and tax payments aiding in business expense management.',
            'Complimentary Dineout Passport membership ensuring flat 25% off at 2000+ premium restaurants.',
            'Bonus rewards: Earn 10,000 Reward Points on Rs. 5 Lakhs spends and additional 15,000 on Rs. 8 Lakhs.',
            '6 Complimentary International Airport Lounge visits through the global Priority Pass network.',
            'Enjoy zero liability on any fraudulent transactions if the physical card is reported lost.'
        ],
        joiningFee: '₹2,500',
        annualFee: '₹2,500',
        bestFor: 'Business Owners',
        tags: ['Business', 'Lounge']
    },
    {
        id: 11,
        bank: 'Axis Bank',
        category: 'fuel',
        title: 'Indian Oil Axis Card',
        subtitle: 'Fuel your Lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Indian Oil Axis Card.png`,
        highlights: [
            '100% cashback on first fuel spend',
            '4% value back on fuel spends',
            '1% fuel surcharge waiver'
        ],
        detailedFeatures: [
            'Welcome benefit: Earn 100% cashback up to ₹250 on the first fuel transaction within 30 days.',
            'Earn 20 Reward Points (4% value) per ₹100 spent strictly at Indian Oil outlets ranging ₹100 to ₹5000.',
            'Benefit from 1% value back on online shopping transactions through 5 Reward points per ₹100 spent.',
            'Access regular movie ticket discounts through BookMyShow up to 10% on select days.',
            'Annual fee is waived off upon spending ₹50,000 or more in the designated anniversary year.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Fuel Savings',
        tags: ['IndianOil', 'Fuel']
    },
    {
        id: 12,
        bank: 'HDFC Bank',
        category: 'dining',
        title: 'SWIGGY HDFC BANK Credit Card',
        subtitle: 'Cashback on every spend',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SWIGGY HDFC BANK Credit Card.png`,
        highlights: [
            'Upto 5% cashback on everyday spends.',
            'Upto 10% cashback on spends at Swiggy.',
            'Annual fee waived on ₹2L+ yearly spend.'
        ],
        detailedFeatures: [
            '10% Cashback on Swiggy applications.',
            '5% Cashback on online platforms.',
            '1% Cashback on other categories.',
            'Complimentary Swiggy One membership.',
            'Annual fee waived on spending ₹2L in a year.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Food Delivery',
        tags: ['Dining', 'Cashback']
    },
    {
        id: 13,
        bank: 'HDFC Bank',
        category: 'premium',
        title: 'TATA NEU INFINITY Credit Card',
        subtitle: 'The Infinite Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/TATA NEU INFINITY Credit Card.png`,
        highlights: [
            '1,499 NeuCoins on first transaction.',
            'Low 2% forex markup fee.',
            '8 domestic + 4 international lounge visits.'
        ],
        detailedFeatures: [
            'Earn 1.5% NeuCoins on all other spends.',
            'Get up to 10% bonus NeuCoins on Tata Neu App.',
            'Complimentary airport lounge access.',
            'Annual fee reversed on spending ₹3L.'
        ],
        joiningFee: '₹1,499',
        annualFee: '₹1,499',
        bestFor: 'Premium Shopping',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 14,
        bank: 'HDFC Bank',
        category: 'travel',
        title: 'MARRIOTT BONVOY Credit Card',
        subtitle: 'Hotel privileges',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/MARRIOTT BONVOY Credit Card.png`,
        highlights: [
            'Up to 8 Marriott Bonvoy Points.',
            'Up to 24 free lounge visits.',
            '2 complimentary golf access per quarter.'
        ],
        detailedFeatures: [
            '15 Elite Night Credits.',
            'Complimentary Silver Elite Status.',
            'Free Night Award every year.'
        ],
        joiningFee: '₹3,000',
        annualFee: '₹3,000',
        bestFor: 'Hotels',
        tags: ['Travel', 'Lounge']
    },
    {
        id: 15,
        bank: 'HDFC Bank',
        category: 'cashback',
        title: 'MILLENNIA Credit Card',
        subtitle: 'Ultimate Cashback',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/MILLENNIA Credit Card.png`,
        highlights: [
            '1,000 bonus points on activation.',
            '5% cashback on popular brands.',
            '20% savings on partner restaurants.'
        ],
        detailedFeatures: [
            '5% Cashback on Amazon, Flipkart, Swiggy, etc.',
            '1% cashback on other spends.',
            '8 Complimentary Domestic Lounge Access.'
        ],
        joiningFee: '₹1,000',
        annualFee: '₹1,000',
        bestFor: 'Digital Spends',
        tags: ['Cashback', 'Online']
    },
    {
        id: 16,
        bank: 'HDFC Bank',
        category: 'premium',
        title: 'INFINIA METAL Credit Card',
        subtitle: 'Peak exclusivity',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/INFINIA METAL Credit Card.png`,
        highlights: [
            'Unlimited lounge access.',
            'Save at ITC and Marriott.',
            'Metal card experience.'
        ],
        detailedFeatures: [
            'Reward points worth ₹12,500.',
            'Unlimited priority pass access.',
            'Lowest 2% markup fee.'
        ],
        joiningFee: '₹12,500',
        annualFee: '₹12,500',
        bestFor: 'Ultra Luxury',
        tags: ['Metal', 'Luxury']
    },
    {
        id: 17,
        bank: 'HDFC Bank',
        category: 'premium',
        title: 'DINERS BLACK METAL Credit Card',
        subtitle: 'Redefining luxury',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/DINERS BLACK METAL Credit Card.png`,
        highlights: [
            'Discounts at spas & gyms.',
            '24×7 concierge services.',
            'Free premium memberships.'
        ],
        detailedFeatures: [
            'Unlimited Airport Lounge Access.',
            '6 Complimentary Golf games every quarter.',
            'Up to 10X Reward Points on partners.'
        ],
        joiningFee: '₹10,000',
        annualFee: '₹10,000',
        bestFor: 'Luxury',
        tags: ['Metal', 'Concierge']
    },
    {
        id: 18,
        bank: 'ICICI Bank',
        category: 'movies',
        title: 'ICICI Bank Rubyx Credit Card',
        subtitle: 'Premium Rewards & Entertainment',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/DINERS BLACK METAL Credit Card.png`,
        highlights: [
            'Welcome vouchers worth ₹5,250 on joining.',
            '25% off on 2 BMS/INOX tickets, twice a month.',
            '1 free golf round per ₹50,000 spent (Max 2/month).'
        ],
        detailedFeatures: [
            'Experience dual card benefits with two different networks (American Express & Mastercard/Visa).',
            'Earn up to 4 PAYBACK points on every ₹100 spent.',
            'Complimentary access to select airport lounges and railway lounges across India.',
            'Fuel surcharge waiver on fuel transactions at HPCL pumps.',
            'Comprehensive insurance cover including air accident and lost card liability.'
        ],
        joiningFee: '₹3,000 + taxes',
        annualFee: '₹2,000 + taxes',
        bestFor: 'Rewards & Movies',
        tags: ['Rewards', 'Movies', 'Lounge Access']
    },
    {
        id: 19,
        bank: 'ICICI Bank',
        category: 'travel',
        title: 'ICICI Bank Sapphiro Credit Card',
        subtitle: 'Elite Travel & Lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/ICICI Bank Sapphiro Credit Card.png`,
        highlights: [
            '₹9,000+ welcome vouchers of Tata Cliq, Uber, EaseMyTrip, Tata Croma.',
            '2 complimentary international airport lounge access per calendar year.',
            '₹500 off on BookMyShow, buy one get one offer (twice in a month).'
        ],
        detailedFeatures: [
            'Complimentary Dreamfolks Membership for international lounge and spa access.',
            '4 complimentary domestic airport lounge visits and 2 spa visits per quarter.',
            'Earn up to 6 PAYBACK points for every ₹100 spent on international transactions.',
            'Enjoy 4 complimentary golf rounds or lessons per month based on your spending.',
            'Unmatched 24x7 concierge service for travel, hotel and dining reservations.'
        ],
        joiningFee: '₹6,500 + taxes',
        annualFee: '₹3,500 + taxes',
        bestFor: 'International Travel',
        tags: ['Travel', 'Shopping']
    },
    {
        id: 20,
        bank: 'ICICI Bank',
        category: 'premium',
        title: 'ICICI Bank Emeralde Credit Card',
        subtitle: 'Ultimate Luxury',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/ICICI Bank Emeralde Credit Card.png`,
        highlights: [
            'Movies: Buy 1 ticket, get up to ₹750 off 2nd (4x/month) on BookMyShow.',
            'Golf: 4 complimentary rounds/lessons per month (1 per ₹50,000 spent).',
            'Birthday Benefit: ₹5,000 Tata CLiQ voucher.'
        ],
        detailedFeatures: [
            'Unlimited complimentary international and domestic airport lounge access.',
            'Low foreign currency mark-up fee of 1.5% on international spends.',
            'No cancellation charges on any hotel and flight bookings (up to ₹12,000 per year).',
            'Complimentary memberships to major wellness and lifestyle brands.',
            'High reward point earning rate with no expiry on points.'
        ],
        joiningFee: '₹12,000 + taxes',
        annualFee: '₹12,000 + taxes',
        bestFor: 'Luxury Spends',
        tags: ['Travel', 'Rewards', 'Premium']
    },
    {
        id: 21,
        bank: 'ICICI Bank',
        category: 'movies',
        title: 'ICICI Bank Coral Credit Card',
        subtitle: 'Daily Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/ICICI Bank Coral Credit Card.png`,
        highlights: [
            '4 complimentary domestic airport lounge visits/year.',
            '25% off BMS & INOX, up to ₹100, 2 tickets, 2x/month.',
            '1% fuel surcharge waiver on ₹4,000 at HPCL via ICICI swipe.'
        ],
        detailedFeatures: [
            'Earn 2 reward points for every ₹100 spent (excluding fuel and taxes).',
            'Get 1 reward point for every ₹100 spent on utilities and insurance categories.',
            'Milestone Bonus: Earn 2,000 reward points on spending ₹2 Lakhs in a year.',
            'Enjoy a minimum 15% savings on dining bills under the Culinary Treats program.',
            'Chip-and-pin card for enhanced security on all your offline transactions.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Everyday Shopping',
        tags: ['Rewards', 'Movies']
    },
    {
        id: 22,
        bank: 'ICICI Bank',
        category: 'shopping',
        title: 'Manchester United Platinum Credit Card',
        subtitle: 'For the Red Devils Fans',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Manchester United Platinum Credit Card.png`,
        highlights: [
            'Manchester United branded merchandise to Monthly Top 100 spenders.',
            'Chance to join Top Spenders & attend Man Utd match at Old Trafford, UK.',
            '10% discount on merchandise at United Direct Store.'
        ],
        detailedFeatures: [
            'Complimentary Manchester United branded entry gift on card activation.',
            'Earn up to 3 reward points for every ₹100 spent on all your purchases.',
            'Enjoy a minimum 15% discount on dining at over 2,500 partner restaurants.',
            'Exclusive access to Manchester United events and contests throughout the year.',
            'Annual fee waiver on spending ₹1.5 Lakhs in the previous anniversary year.'
        ],
        joiningFee: '₹499',
        annualFee: '₹499',
        bestFor: 'Man Utd Fans',
        tags: ['Lounge Access']
    },
    {
        id: 23,
        bank: 'ICICI Bank',
        category: 'premium',
        title: 'Manchester United Signature Credit Card',
        subtitle: 'Elite Fan Experience',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Manchester United Signature Credit Card.png`,
        highlights: [
            'Top 100 spenders get Man Utd merchandise.',
            'Chance to attend Man Utd match at Old Trafford.',
            'Up to 5 Reward Points per ₹100 spent.'
        ],
        detailedFeatures: [
            'Premium Manchester United branded welcome kit on card joining.',
            'Complimentary domestic airport lounge access twice every quarter.',
            'Buy one ticket and get up to ₹200 off on the second ticket at BookMyShow.',
            'Higher milestone rewards for top card spenders annually.',
            'Global recognition and acceptance across the Visa/Mastercard network.'
        ],
        joiningFee: '₹2,499',
        annualFee: '₹2,499',
        bestFor: 'Premium Fans',
        tags: ['Lounge Access', 'Rewards']
    },
    {
        id: 24,
        bank: 'ICICI Bank',
        category: 'fuel',
        title: 'ICICI Bank HPCL Super Saver Credit Card',
        subtitle: 'Maximum Fuel Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/ICICI Bank HPCL Super Saver Credit Card.png`,
        highlights: [
            'Joining Benefit: 2,000 Reward Points + ₹100 cashback on HP Pay.',
            '4% cashback + 1% fuel surcharge waiver at HPCL.',
            'Extra 1.5% back in Loyalty Points via HP Pay.'
        ],
        detailedFeatures: [
            '5% back on fuel spends including 4% cashback and 1% surcharge waiver.',
            'Earn 5% back on grocery and departmental store spends (as reward points).',
            'Get 2 reward points on every ₹100 spent on all other categories.',
            'Annual fee waiver on spending ₹1.5 Lakhs in the preceding year.',
            'Complimentary 24x7 roadside assistance to ensure peace of mind on the road.'
        ],
        joiningFee: '₹500',
        annualFee: '₹500',
        bestFor: 'Fuel & Groceries',
        tags: ['Fuel']
    },
    {
        id: 25,
        bank: 'ICICI Bank',
        category: 'travel',
        title: 'Emirates Skywards ICICI Bank Sapphiro Credit Card',
        subtitle: 'Fly in Style',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Emirates Skywards ICICI Bank Sapphiro Credit Card.png`,
        highlights: [
            'Buy one Get one offer on BookMyShow (Max ₹500, twice a month).',
            'Exclusive dining offers via Culinary Treats.',
            '1% fuel surcharge waiver (₹400-₹4,000, Max ₹250/month).'
        ],
        detailedFeatures: [
            'Earn Emirates Skywards Miles on every transaction to redeem for flights and upgrades.',
            'Complimentary access to international and domestic airport lounges.',
            'Special privileges at Emirates partner hotels and car rental services.',
            'Comprehensive travel insurance and personal accident cover for air travel.',
            'Dedicated concierge service for your international travel and lifestyle needs.'
        ],
        joiningFee: '₹5,000 + taxes',
        annualFee: '₹5,000 + taxes',
        bestFor: 'Emirates Travelers',
        tags: ['Travel', 'Rewards']
    },
    {
        id: 26,
        bank: 'Axis Bank',
        category: 'cashback',
        title: 'FLIPKART AXIS BANK Credit Card',
        subtitle: 'Savings on every spend',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/FLIPKART AXIS BANK Credit Card.png`,
        highlights: [
            'Upto 5% cashback on spends at Flipkart.',
            'Upto 7.5% cashback on Myntra.',
            'Upto 5% cashback on Cleartrip.'
        ],
        detailedFeatures: [
            'Get 4% cashback on preferred partners like Swiggy, Uber, PVR, and Tata Play.',
            'Earn 1.5% unlimited cashback on all other online and offline transactions.',
            'Enjoy 4 complimentary domestic airport lounge visits in a calendar year.',
            'Receive a 1% fuel surcharge waiver for transactions between ₹400 and ₹4,00,0.',
            'Dining delights: Minimum 15% discount at partner restaurants across India.'
        ],
        joiningFee: '₹500 + Taxes',
        annualFee: '₹500 + Taxes',
        bestFor: 'E-commerce Shopping',
        tags: ['Cashback', 'Online Shopping']
    },
    {
        id: 27,
        bank: 'Axis Bank',
        category: 'fuel',
        title: 'INDIANOIL AXIS BANK Credit Card',
        subtitle: 'Fuel your Lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/INDIANOIL AXIS BANK Credit Card.png`,
        highlights: [
            'Upto 5% value-back on Indian Oil fuel spends.',
            'Domestic airport lounge visits every year.',
            '2X rewards on grocery & supermarket spends.'
        ],
        detailedFeatures: [
            'Earn 20 Reward Points per ₹100 spent strictly at Indian Oil outlets.',
            'Get 1% value back by earning 5 Reward Points per ₹100 spent on online shopping.',
            'Enjoy instant 10% discount on movie tickets via the BookMyShow website or app.',
            'Annual fee is waived off upon spending ₹50,000 or more in the preceding year.',
            'Edge Reward points can be redeemed against a wide variety of merchandise.'
        ],
        joiningFee: '₹500 + taxes',
        annualFee: '₹500 + taxes',
        bestFor: 'Fuel & Daily Spends',
        tags: ['Fuel']
    },
    {
        id: 28,
        bank: 'Axis Bank',
        category: 'movies',
        title: 'AXIS BANK MY ZONE Credit Card',
        subtitle: 'Online Entertainment & Shopping',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AXIS BANK MY ZONE Credit Card.png`,
        highlights: [
            'Offers on Swiggy, Ajio, District & SonyLiv.',
            'Complimentary domestic lounge access.',
            'Attractive reward point structure on all spends.'
        ],
        detailedFeatures: [
            'Complimentary SonyLiv Premium annual subscription on first spend within 30 days.',
            'Buy one get one free on movie tickets at BookMyShow (up to ₹200 off).',
            'Flat ₹120 off on Swiggy on a minimum order of ₹500 (twice a month).',
            'Exclusive 40% discount on AJIO on a minimum spend of ₹2,000.',
            'Interest-free period of up to 50 days on your credit card purchases.'
        ],
        joiningFee: '₹500 + taxes',
        annualFee: '₹500 + taxes',
        bestFor: 'Millennials & Gen Z',
        tags: ['Online Shopping']
    },
    {
        id: 29,
        bank: 'Axis Bank',
        category: 'rewards',
        title: 'REWARDS Credit Card',
        subtitle: 'Reward yourself daily',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/REWARDS Credit Card.png`,
        highlights: [
            'Up to 20 EDGE Reward points on card spends.',
            'Membership benefits upto ₹1,000.',
            'Complimentary lounge access.'
        ],
        detailedFeatures: [
            'Earn 2 EDGE Reward points for every ₹125 spent on the card.',
            'Get 10X reward points on every ₹125 spent at department stores and apparel shops.',
            'Enjoy 2 complimentary domestic airport lounge visits per calendar quarter.',
            'Receive 5,000 EDGE Reward points on card activation and spending ₹1,000.',
            'Convert your reward points into air miles or attractive gift vouchers.'
        ],
        joiningFee: '₹1,000 + taxes',
        annualFee: '₹1,000 + taxes',
        bestFor: 'Everyday Spends',
        tags: ['Rewards']
    },
    {
        id: 30,
        bank: 'Axis Bank',
        category: 'travel',
        title: 'AXIS BANK ATLAS Credit Card',
        subtitle: 'For the Global Traveler',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AXIS BANK ATLAS Credit Card.png`,
        highlights: [
            'Complimentary international & domestic lounge access.',
            '2,500 bonus EDGE Miles on card activation.',
            'Extra Platinum Tier Benefits.'
        ],
        detailedFeatures: [
            'Earn 5 EDGE Miles for every ₹100 spent on airline and travel bookings.',
            'Get 2 EDGE Miles for every ₹100 spent on all other retail transactions.',
            'Miles can be transferred to over 20+ domestic and international airline partners.',
            'Exclusive airport concierge services and luxury meet-and-greet options.',
            'High-value milestone benefits including additional bonus miles every year.'
        ],
        joiningFee: '₹5,000 + taxes',
        annualFee: '₹5,000 + taxes',
        bestFor: 'Frequent Flyers',
        tags: ['Travel', 'Lounge Access', 'Rewards']
    },
    {
        id: 31,
        bank: 'Axis Bank',
        category: 'shopping',
        title: 'AXIS BANK SELECT Credit Card',
        subtitle: 'Curated Lifestyle Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AXIS BANK SELECT Credit Card.png`,
        highlights: [
            'Complimentary lounge access worldwide.',
            'Discount on Swiggy, BigBasket & District apps.',
            '2X rewards across all retail spends.'
        ],
        detailedFeatures: [
            'Priority Pass Membership with 6 complimentary international lounge visits.',
            'Buy one get one free on movies at BookMyShow (up to ₹300 per month).',
            'Flat ₹200 off on Swiggy on a minimum spend of ₹500 twice a month.',
            'Six complimentary golf rounds per year for primary cardholders.',
            'Comprehensive concierge services including gift delivery and travel assistance.'
        ],
        joiningFee: '₹3,000 + taxes',
        annualFee: '₹3,000 + taxes',
        bestFor: 'Luxury Lifestyle',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 32,
        bank: 'Axis Bank',
        category: 'premium',
        title: 'AXIS BANK RESERVE Credit Card',
        subtitle: 'The Pinnacle of Luxury',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AXIS BANK RESERVE Credit Card.png`,
        highlights: [
            'Low foreign currency markup fee of 1.5%.',
            '15 Edge Reward Points for every Rs. 200 spent.',
            'Complimentary lounge access domestic/international.'
        ],
        detailedFeatures: [
            'Unlimited complimentary domestic and international airport lounge access.',
            'ITC Hotel benefits including complimentary breakfast and room upgrades.',
            'Club Marriott membership for exclusive dining and stay privileges globally.',
            'Complimentary handpicked luxury golf experiences and lessons.',
            'Dedicated luxury concierge to manage all your high-end lifestyle needs.'
        ],
        joiningFee: '₹50,000 + taxes',
        annualFee: '₹50,000 + taxes',
        bestFor: 'Ultra-High Net Worth',
        tags: ['Travel', 'Rewards', 'Premium']
    },
    {
        id: 33,
        bank: 'Axis Bank',
        category: 'cashback',
        title: 'AIRTEL AXIS BANK Credit Card',
        subtitle: 'Savings on Airtel spends',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AIRTEL AXIS BANK Credit Card.png`,
        highlights: [
            'Up to 25% cashback on Airtel Thanks App.',
            'Complimentary domestic lounge visits yearly.',
            '10% cashback on Zomato & Swiggy.'
        ],
        detailedFeatures: [
            '25% cashback on Airtel Mobile, DTH, and Broadband bill payments.',
            '10% cashback on utility bill payments (Electricity, Water, Gas) via Airtel app.',
            '10% cashback on online spends with Swiggy, Zomato, and BigBasket.',
            'Unlimited 1% unlimited cashback on all other retail transactions.',
            'Complimentary domestic airport lounge access (4 visits per year).'
        ],
        joiningFee: '₹500 + Taxes',
        annualFee: '₹500 + Taxes',
        bestFor: 'Airtel Users',
        tags: ['Cashback']
    },
    {
        id: 34,
        bank: 'Axis Bank',
        category: 'cashback',
        title: 'FIBE AXIS BANK Credit Card',
        subtitle: 'Instant Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/FIBE AXIS BANK Credit Card.jpg`,
        highlights: [
            'Complimentary domestic lounge visits yearly.',
            'Up to 3% value-back.',
            '1% fuel surcharge waiver up to ₹5,000.'
        ],
        detailedFeatures: [
            '3% flat cashback on all online spends through Fibe (earlier EarlySalary).',
            'Lifetime free card with zero joining and annual fees for eligible users.',
            'Instant digital card activation for immediate online shopping.',
            'Accelerated reward points on diverse ecosystem partner spends.',
            'Safe and secure contactless payments for all daily retail needs.'
        ],
        joiningFee: 'Nil',
        annualFee: 'Nil',
        bestFor: 'Instant Rewards',
        tags: ['Lifetime Free', 'Cashback']
    },
    {
        id: 35,
        bank: 'Axis Bank',
        category: 'premium',
        title: 'AXIS BANK MAGNUS Credit Card',
        subtitle: 'Redefining Grandeur',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/AXIS BANK MAGNUS Credit Card.png`,
        highlights: [
            'Complimentary domestic/international lounge access.',
            '5X rewards on travel spends.',
            'Bespoke lifestyle benefits.'
        ],
        detailedFeatures: [
            'Unlimited international lounge access through the Priority Pass program.',
            'Earn 12 EDGE Reward points for every ₹200 spent on regular retail.',
            'Accelerated 5X rewards on travel bookings through the EDGE Rewards portal.',
            'Annual fee waiver on spending ₹15 Lakhs in the anniversary year.',
            'VIP airport concierge services for a seamless travel experience.'
        ],
        joiningFee: '₹30,000 + taxes',
        annualFee: '₹30,000 + taxes',
        bestFor: 'Premium Rewards',
        tags: ['Travel', 'Premium', 'Rewards']
    },
    {
        id: 36,
        bank: 'SBI Card',
        category: 'dining',
        title: 'SimplySAVE SBI Card',
        subtitle: 'Save more on everyday spends',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SimplySAVE SBI Card.png`,
        highlights: [
            'Enjoy 10X Reward Points on Dining, Grocery & Movie spends.',
            '2,000 Bonus Reward Points.',
            '1% fuel surcharge waiver across all petrol pumps in India.'
        ],
        detailedFeatures: [
            'Earn 10 Reward Points per ₹150 spent on Dining, Grocery, Departmental stores and Movies.',
            'Get 1 Reward Point for every ₹150 spent on all other categories.',
            'Fuel Surcharge Waiver: 1% fuel surcharge waiver for each transaction between ₹500 & ₹3,000.',
            'Annual fee waiver on spending ₹1,00,000 or more in the preceding anniversary year.',
            'Add-on cards available for your parents, spouse, children or siblings above the age of 18.'
        ],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Daily Spends',
        tags: ['Dining', 'Rewards']
    },
    {
        id: 37,
        bank: 'SBI Card',
        category: 'premium',
        title: 'SBI Card ELITE',
        subtitle: 'The Elite Lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card ELITE.jpg`,
        highlights: [
            'Rewards points annually.',
            'Vouchers on card activation.',
            'Complimentary International and Domestic Airport Lounge visits.'
        ],
        detailedFeatures: [
            'Welcome Benefit: Get an E-Gift Voucher worth ₹5,000 on joining from premium brands.',
            'Earn 5X Reward Points on Dining, Departmental stores and Grocery spends.',
            'Up to 50,000 Bonus Reward Points (worth ₹12,500) per year based on spending milestones.',
            'Complimentary Priority Pass Program membership worth $99 for international lounge access.',
            'Low Foreign Currency Mark-up Fee of 1.99% for international transactions.'
        ],
        joiningFee: '₹4,999 + taxes',
        annualFee: '₹4,999 + taxes',
        bestFor: 'High Spenders',
        tags: ['Lounge Access', 'Movies', 'Rewards']
    },
    {
        id: 38,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'SBI Card PRIME',
        subtitle: 'Premium Rewards & Travel',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card PRIME.jpg`,
        highlights: [
            'Vouchers on shopping from Bata, Myntra, Yatra & Shoppers Stop.',
            'Complimentary domestic/international lounge visits yearly.',
            '5X rewards on dining, movies & grocery.'
        ],
        detailedFeatures: [
            'Earn 20 Reward Points per ₹100 spent on standing instructions for utility bill payments.',
            'Get 15 Reward Points per ₹100 spent on BigBasket and 10 points on Dining & Movies.',
            'Milestone Benefit: Get ₹7,000 worth of Yatra/Pantaloons vouchers on spending ₹5 Lakhs.',
            'Complimentary Club Vistara Silver membership and Trident Privilege Red Tier membership.',
            'Enjoy 4 complimentary visits to international airport lounges per year (max 2 per quarter).'
        ],
        joiningFee: '₹2,999 + Taxes',
        annualFee: '₹2,999 + Taxes',
        bestFor: 'Lifestyle & Travel',
        tags: ['Travel', 'Shopping', 'Rewards']
    },
    {
        id: 39,
        bank: 'SBI Card',
        category: 'rewards',
        title: 'SBI Card PULSE',
        subtitle: 'Healthy Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card PULSE.jpg`,
        highlights: [
            'FITPASS PRO & Netmeds membership.',
            'Complimentary domestic lounge visits every quarter.',
            '5X rewards on chemist, pharmacies, dining & more.'
        ],
        detailedFeatures: [
            'Welcome Benefit: Get a Noise ColorFit Pulse Smartwatch on payment of joining fee.',
            'Get 10 Reward Points for every ₹100 spent on Chemists, Pharmacies, Dining and Movies.',
            'Earn 2 Reward Points for every ₹100 spent on all other categories.',
            'Annual fee waiver on spending ₹2 Lakhs in the previous anniversary year.',
            'Complimentary Priority Pass membership for the first two years of the card.'
        ],
        joiningFee: '₹1,499',
        annualFee: '₹1,499',
        bestFor: 'Health & Fitness',
        tags: ['Rewards']
    },
    {
        id: 40,
        bank: 'IDFC First Bank',
        category: 'rewards',
        title: 'FIRST Classic Credit Card',
        subtitle: 'Savings on your lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card PULSE.jpg`,
        highlights: [
            'Up to 10X reward points.',
            'Upto 25% discount on tickets.',
            'No joining/annual fee.'
        ],
        detailedFeatures: [
            'Earn up to 10X Reward Points on monthly spends above ₹20,000.',
            'Get 3X Reward Points on offline spends and 6X on online spends.',
            'Enjoy a minimum of 15% discount at over 1,500 partner restaurants.',
            'Complimentary Roadside Assistance worth ₹1,399 for 1 year.',
            'Air Accident Insurance cover of ₹1 Crore and Personal Accident cover of ₹10 Lakhs.'
        ],
        joiningFee: 'Nil',
        annualFee: 'Nil',
        bestFor: 'Lifestyle Savings',
        tags: ['Lifetime Free', 'Rewards', 'Shopping']
    },
    {
        id: 41,
        bank: 'IDFC First Bank',
        category: 'lounge',
        title: 'FIRST Wealth Credit Card',
        subtitle: 'Wealth management & rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/FIRST Wealth Credit Card.png`,
        highlights: [
            'Upto 10X rewards on monthly spends.',
            'Up to 4 airport lounge visits per quarter.',
            'Upto 5% cashback on your 1st EMI transaction.'
        ],
        detailedFeatures: [
            'Complimentary domestic & international airport lounge and spa access.',
            'Earn 10X Reward Points on spends above ₹25,000 per month.',
            'Low foreign currency mark-up fee of 1.5% for international transactions.',
            'Buy 1 Get 1 free offer on movie tickets up to ₹500 (twice a month).',
            'Dedicated wealth management support and customized financial advice.'
        ],
        joiningFee: 'Nil',
        annualFee: 'Nil',
        bestFor: 'Wealth & Travel',
        tags: ['Travel', 'Lifetime Free', 'Rewards']
    },
    {
        id: 42,
        bank: 'IDFC First Bank',
        category: 'fuel',
        title: 'FIRST Power Credit Card',
        subtitle: 'Fuel & Utility Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/FIRST Power Credit Card.png`,
        highlights: [
            'Up to 6.5% savings on your fuel expenses.',
            'Upto 5% savings on Grocery & Utility expenses.',
            'Upto 25% off on 1 movie/month via Paytm.'
        ],
        detailedFeatures: [
            'Earn accelerated rewards on fuel spends at HPCL outlets via HP Pay app.',
            'Get 5% Reward Points on grocery, utility and IDFC First Bank FASTag reloads.',
            'Milestone Benefit: Earn 2,000 Reward Points on spending ₹1 Lakh in a year.',
            'Personal Accident Insurance cover of ₹2 Lakhs per cardholder.',
            'Contactless card for quick and secure payments for all small value transactions.'
        ],
        joiningFee: '₹499+taxes',
        annualFee: '₹499+taxes',
        bestFor: 'Fuel & Utility bill payments',
        tags: ['Rewards', 'Fuel']
    },
    {
        id: 43,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Platinum Aura Edge Credit Card',
        subtitle: 'Personalized for your lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Platinum Aura Edge Credit Card.png`,
        highlights: [
            'Vouchers of top brands at time of joining.',
            'Redeem reward points against cash credit.',
            '1% fuel waiver on fuel transactions.'
        ],
        detailedFeatures: [
            'Customizable reward plans (Shop Plan, Travel Plan, Party Plan, Household Plan).',
            'Earn reward points on retail spends and redeem them for cash or gift vouchers.',
            'Enjoy a personal air accident insurance cover of up to ₹25 Lakhs.',
            ' contactless feature for secure and fast daily transactions at merchant outlets.',
            '1% fuel surcharge waiver across all petrol pumps in India.'
        ],
        joiningFee: '₹0',
        annualFee: '₹0',
        bestFor: 'Lifestyle Rewards',
        tags: ['Rewards', 'Shopping']
    },
    {
        id: 44,
        bank: 'IndusInd Bank',
        category: 'dining',
        title: 'EazyDiner Platinum Credit Card',
        subtitle: 'Best for fine dining',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/EazyDiner Platinum Credit Card.png`,
        highlights: [
            'Reward points per Rs. 100 on spends.',
            'Prime membership discount up to 50% on dining.',
            'Complimentary Total Protect insurance cover.'
        ],
        detailedFeatures: [
            'Enjoy a flat 25% discount up to ₹1,000 on every dining bill paid via PayEazy on EazyDiner.',
            'Complimentary EazyDiner Prime membership for 12 months (worth ₹2,495).',
            'Earn 2 reward points for every ₹100 spent on all your lifestyle expenses.',
            'Receive 2,000 welcome reward points on card joining and activation.',
            'Secure your card with Total Protect covering you against unauthorized transactions.'
        ],
        joiningFee: '₹0',
        annualFee: '₹0',
        bestFor: 'Fine Dining lovers',
        tags: ['Dining', 'Lifetime Free', 'Rewards']
    },
    {
        id: 45,
        bank: 'IndusInd Bank',
        category: 'lounge',
        title: 'Pinnacle World Credit Card',
        subtitle: 'Global Privilege & Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Pinnacle World Credit Card.png`,
        highlights: [
            'Offer on movie tickets book with BookMyShow.',
            'Upto 1 international/domestic lounge visit.',
            'VIP access to airport lounges (8 visits/year).'
        ],
        detailedFeatures: [
            'Earn 1.5 reward points for every ₹100 spent on online and international purchases.',
            'Receive a luxury welcome gift from premium brands like Montblanc or Genesis Luxury.',
            'Complimentary access to over 600 airport lounges globally via Priority Pass.',
            'Buy 1 Get 1 free offer on movie tickets twice a month (up to ₹200 off).',
            'Comprehensive Golf program providing 1 complimentary lesson or game per month.'
        ],
        joiningFee: '₹15,000 + Taxes',
        annualFee: '₹0',
        bestFor: 'Global Travelers',
        tags: ['Travel', 'Rewards', 'Online Shopping']
    },
    {
        id: 46,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'IndusInd Platinum Credit Card',
        subtitle: 'Effortless Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd Platinum Credit Card.png`,
        highlights: [
            '1% fuel waiver on fuel transactions.',
            'Luxury Gift Card and vouchers of top brands.',
            'Redeem via IndusMoments catalogue.'
        ],
        detailedFeatures: [
            'Earn 1.5 reward points for every ₹150 spent (1% value back).',
            'Redeem your accumulated points for airline miles, gift vouchers or cash credit.',
            'Enjoy 24x7 concierge service for travel bookings, gifts and hotel reservations.',
            'Personal Air Accident insurance cover of up to ₹25 Lakhs for cardholders.',
            'Global acceptance and advanced chip security for worry-free shopping.'
        ],
        joiningFee: '₹0',
        annualFee: '₹0',
        bestFor: 'Simple Rewards',
        tags: ['Rewards']
    },
    {
        id: 47,
        bank: 'IndusInd Bank',
        category: 'dining',
        title: 'EazyDiner Signature Credit Card',
        subtitle: 'Elite Dining Experience',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/EazyDiner Signature Credit Card.png`,
        highlights: [
            'Extra 25% off via PayEazy on dining out.',
            'Upto 2 complimentary domestic lounge visits.',
            '2 free movie tickets on BookMyShow.'
        ],
        detailedFeatures: [
            'Flat 50% discount at top restaurants across India via EazyDiner Prime.',
            'Earn 2,000 welcome reward points which can be redeemed for EazyDiner rewards.',
            'Complimentary access to premium airport lounges twice every quarter.',
            'Enjoy 2 complimentary movie tickets up to ₹200 every month.',
            'Accelerated reward points on dining and entertainment categories.'
        ],
        joiningFee: '₹1,999 + Taxes',
        annualFee: '₹1,999 + Taxes',
        bestFor: 'Elite Dining',
        tags: ['Dining']
    },
    {
        id: 48,
        bank: 'SBI Card',
        category: 'travel',
        title: 'IndiGo SBI Card',
        subtitle: 'Unmatched travel benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndiGo SBI Card.png`,
        highlights: ['Welcome ticket on joining.', 'Up to 2.5% rewards on IndiGo.', 'Discounted convenience fee.'],
        detailedFeatures: ['Get a complimentary IndiGo flight ticket.', 'Earn 2.5% Reward Points on IndiGo flight bookings.', 'Earn 1% Reward Points on Dining, Grocery and Entertainment.', 'Get discounted convenience fee on IndiGo flight bookings.', '1% fuel surcharge waiver.'],
        joiningFee: '₹700 + taxes',
        annualFee: '₹700 + taxes',
        bestFor: 'Frequent Flyers',
        tags: ['Travel', 'Flights']
    },
    {
        id: 49,
        bank: 'SBI Card',
        category: 'premium',
        title: 'IndiGo SBI Card ELITE',
        subtitle: 'Premium travel benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndiGo SBI Card ELITE.png`,
        highlights: ['Welcome ticket worth Rs. 3,000.', 'Up to 5% rewards on IndiGo.', 'Complimentary lounge access.'],
        detailedFeatures: ['Welcome ticket worth Rs. 3,000.', 'Earn 5% Reward Points on IndiGo flight bookings.', 'Earn 2% Reward Points on Dining, Grocery and Entertainment.', '8 complimentary domestic airport lounge visits.', '1% fuel surcharge waiver.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Premium Flyers',
        tags: ['Travel', 'Flights', 'Lounge']
    },
    {
        id: 50,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Flipkart SBI Card',
        subtitle: 'Ultimate Flipkart savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndiGo SBI Card ELITE.png`,
        highlights: ['5% Cashback on Flipkart.', 'Welcome benefit worth Rs. 500.', '4 complimentary lounge visits.'],
        detailedFeatures: ['5% Cashback on Flipkart purchases.', 'Welcome benefit worth Rs. 500.', '4 complimentary domestic lounge visits per year.', '1.5% cashback on other merchants.', '1% fuel surcharge waiver.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Online Shopping',
        tags: ['Shopping', 'Cashback', 'Online']
    },
    {
        id: 51,
        bank: 'SBI Card',
        category: 'rewards',
        title: 'Apollo SBI Card SELECT',
        subtitle: 'Health & Wellness Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Apollo SBI Card SELECT.png`,
        highlights: ['Reward points on Apollo services.', 'Complimentary Apollo Gold Tier.', 'Extra reward points on health spends.'],
        detailedFeatures: ['Earn up to 6X reward points on Apollo services.', 'Complimentary Apollo Gold Tier membership.', 'Earn 2X reward points on health spends.', 'Fuel surcharge waiver.', 'Discounts on Apollo pharmacy.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Health & Wellness',
        tags: ['Rewards', 'Health']
    },
    {
        id: 52,
        bank: 'SBI Card',
        category: 'premium',
        title: 'Tata Neu Infinity SBI Card',
        subtitle: 'Infinite Tata Neu Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Tata Neu Infinity SBI Card.png`,
        highlights: ['High rewards on Tata brands.', 'Complimentary lounge access.', 'NeuCoins on every spend.'],
        detailedFeatures: ['Earn high NeuCoins on Tata brand purchases.', 'Complimentary domestic airport lounge access.', 'NeuCoins on every retail spend.', 'Exclusive offers on Tata Neu app.', 'Fuel surcharge waiver.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Tata Brand Loyalists',
        tags: ['Premium', 'Shopping', 'Lounge']
    },
    {
        id: 53,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Tata Neu Plus SBI Card',
        subtitle: 'Everyday Tata Neu Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Tata Neu Plus SBI Card.png`,
        highlights: ['Rewards on Tata brands.', 'NeuCoins on spends.', 'Fuel surcharge waiver.'],
        detailedFeatures: ['Earn NeuCoins on Tata brand purchases.', 'NeuCoins on every retail spend.', 'Exclusive offers on Tata Neu app.', 'Fuel surcharge waiver.', 'Simple joining fee structure.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Everyday Spending',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 54,
        bank: 'SBI Card',
        category: 'travel',
        title: 'KrisFlyer SBI Card',
        subtitle: 'Singapore Airlines Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Tata Neu Plus SBI Card.png`,
        highlights: ['Earn KrisFlyer miles directly.', 'Welcome bonus miles.', 'Singapore Airlines privileges.'],
        detailedFeatures: ['Earn KrisFlyer miles on all retail spends.', 'Welcome bonus miles upon fee payment.', 'Singapore Airlines exclusive privileges.', 'Milestone bonuses.', '1% fuel surcharge waiver.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'International Flyers',
        tags: ['Travel', 'Flights']
    },
    {
        id: 55,
        bank: 'SBI Card',
        category: 'premium',
        title: 'KrisFlyer SBI Card Apex',
        subtitle: 'Premium Singapore Airlines Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/KrisFlyer SBI Card Apex.png`,
        highlights: ['Maximum KrisFlyer miles.', 'Premium welcome bonus.', 'Elite tier upgrades.'],
        detailedFeatures: ['Earn maximum KrisFlyer miles on all spends.', 'Premium welcome bonus miles upon fee payment.', 'Elite tier upgrades on Singapore Airlines.', 'Exclusive lounge access.', 'Global concierge services.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'Luxury Travel',
        tags: ['Travel', 'Premium', 'Lounge']
    },
    {
        id: 56,
        bank: 'SBI Card',
        category: 'premium',
        title: 'SBI Card Miles Elite',
        subtitle: 'Elite Travel Experiences',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card Miles Elite.png`,
        highlights: ['High air miles conversion.', 'Priority Pass membership.', 'Comprehensive travel insurance.'],
        detailedFeatures: ['High air miles conversion rate.', 'Priority Pass membership with complimentary visits.', 'Comprehensive travel insurance coverage.', 'Milestone reward points.', '1% fuel surcharge waiver.'],
        joiningFee: '₹4,999 + taxes',
        annualFee: '₹4,999 + taxes',
        bestFor: 'Elite Travelers',
        tags: ['Travel', 'Lounge', 'Premium']
    },
    {
        id: 57,
        bank: 'SBI Card',
        category: 'travel',
        title: 'SBI Card MILES PRIME',
        subtitle: 'Premium AIR Miles',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card MILES PRIME.png`,
        highlights: ['Earn AIR miles easily.', 'Lounge access.', 'Travel benefits.'],
        detailedFeatures: ['Earn AIR miles on all transactions.', 'Complimentary domestic lounge access.', 'Travel benefits and discounts.', 'Milestone enhancements.', 'Fuel surcharge waiver.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Frequent Travelers',
        tags: ['Travel', 'Flights', 'Lounge']
    },
    {
        id: 58,
        bank: 'SBI Card',
        category: 'travel',
        title: 'SBI Card MILES',
        subtitle: 'Everyday Travel Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card MILES.png`,
        highlights: ['Earn AIR miles on spends.', 'Basic travel perks.', 'Fuel surcharge waiver.'],
        detailedFeatures: ['Earn AIR miles on everyday spends.', 'Basic travel perks and discounts.', '1% fuel surcharge waiver.', 'Easy milestone rewards.', 'Affordable joining fee.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Budget Travelers',
        tags: ['Travel', 'Rewards']
    },
    {
        id: 59,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Titan SBI Card',
        subtitle: 'Timeless Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Titan SBI Card.png`,
        highlights: ['High rewards on Titan brands.', 'Welcome vouchers.', 'Milestone benefits.'],
        detailedFeatures: ['High rewards on Titan, Tanishq, Fastrack purchases.', 'Welcome gift vouchers.', 'Milestone benefits on specific spend limits.', '1% fuel surcharge waiver.', 'Exclusive previews of Titan collections.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Titan Shoppers',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 60,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Reliance SBI Card',
        subtitle: 'Everyday Reliance Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Reliance SBI Card.png`,
        highlights: ['Rewards across Reliance stores.', 'Welcome benefits.', 'Fuel surcharge waiver.'],
        detailedFeatures: ['Earn high rewards across Reliance retail stores.', 'Welcome benefits on joining.', '1% fuel surcharge waiver.', 'Discounts on JioMart.', 'Exclusive sale access.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Reliance Retail',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 61,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Reliance SBI Card PRIME',
        subtitle: 'Premium Reliance Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Reliance SBI Card PRIME.png`,
        highlights: ['Maximum rewards at Reliance.', 'Lounge access.', 'Premium welcome gifts.'],
        detailedFeatures: ['Maximum rewards at Reliance retail stores.', 'Complimentary lounge access.', 'Premium welcome gifts on joining.', 'High milestone rewards.', 'Exclusive access to Reliance premium events.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Premium Shopping',
        tags: ['Shopping', 'Premium', 'Lounge']
    },
    {
        id: 62,
        bank: 'SBI Card',
        category: 'rewards',
        title: 'SBI Card PULSE',
        subtitle: 'Healthy Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/SBI Card PULSE.png`,
        highlights: ['FITPASS PRO membership.', 'Complimentary lounge visits.', 'Netmeds First membership.'],
        detailedFeatures: ['FITPASS PRO & Netmeds First membership.', 'Complimentary domestic lounge visits every quarter.', 'Earn 5X reward points on chemist & pharmacy.', 'Earn 5X reward points on dining & movies.', 'Welcome smartwatch on joining.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Health & Fitness',
        tags: ['Rewards', 'Health']
    },
    {
        id: 63,
        bank: 'SBI Card',
        category: 'cashback',
        title: 'CASHBACK SBI Card',
        subtitle: 'Universal Cashback',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/CASHBACK SBI Card.png`,
        highlights: ['5% cashback on all online spends.', '1% cashback on offline spends.', 'Card annual fee reversal on Rs 2 Lakhs spend.'],
        detailedFeatures: ['Earn 5% cashback on all online spends without merchant restrictions.', 'Earn 1% cashback on all offline spends.', 'Cashback auto-credited to next billing statement.', 'Complimentary domestic airport lounge access.', '1% fuel surcharge waiver.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Online Shopping',
        tags: ['Cashback', 'Online']
    },
    {
        id: 64,
        bank: 'SBI Card',
        category: 'fuel',
        title: 'BPCL SBI Card',
        subtitle: 'Fuel Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/BPCL SBI Card.png`,
        highlights: ['4.25% Value back on BPCL.', 'Welcome bonus points.', 'Rewards on groceries.'],
        detailedFeatures: ['4.25% Value back (13X Reward Points) on BPCL fuel purchases.', 'Welcome bonus points on fee payment.', '5X Reward Points on Groceries, Departmental stores & Movies.', '1 Reward Point on all other retail purchases.', 'No joining fee condition on milestones.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Fuel Spends',
        tags: ['Fuel', 'Rewards']
    },
    {
        id: 65,
        bank: 'SBI Card',
        category: 'fuel',
        title: 'BPCL SBI Card OCTANE',
        subtitle: 'Maximum Fuel Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/BPCL SBI Card OCTANE.png`,
        highlights: ['7.25% Value back on BPCL.', 'Complimentary lounge access.', 'Welcome bonus points.'],
        detailedFeatures: ['7.25% Value back on BPCL fuel purchases.', '4 complimentary domestic lounge visits per year.', 'Welcome bonus points on fee payment.', '10X Reward Points on Dining & Departmental stores.', 'Exclusive BPCL benefits cross-country.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Heavy Fuel Usage',
        tags: ['Fuel', 'Premium', 'Lounge']
    },
    {
        id: 66,
        bank: 'SBI Card',
        category: 'travel',
        title: 'IRCTC SBI Card Premier',
        subtitle: 'Premium Rail Travel',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IRCTC SBI Card Premier.png`,
        highlights: ['Up to 10% value back on IRCTC.', 'Complimentary lounge access.', 'Welcome bonus reward points.'],
        detailedFeatures: ['Up to 10% value back as Reward Points on IRCTC ticket purchases (AC1, AC2, AC3).', 'Complimentary railway lounge access.', 'Welcome bonus reward points on joining.', '1.8% transaction charge waiver on IRCTC.', 'Milestone rewards.'],
        joiningFee: '₹1,499 + taxes',
        annualFee: '₹1,499 + taxes',
        bestFor: 'Rail Travelers',
        tags: ['Travel', 'Lounge']
    },
    {
        id: 67,
        bank: 'SBI Card',
        category: 'travel',
        title: 'IRCTC SBI Platinum Card',
        subtitle: 'Everyday Rail Savings',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IRCTC SBI Platinum Card.png`,
        highlights: ['Up to 10% value back on IRCTC.', 'Welcome bonus points.', 'Transaction charge waiver.'],
        detailedFeatures: ['Up to 10% value back as Reward Points on IRCTC ticket purchases.', 'Welcome bonus points on fee payment.', '1.8% transaction charge waiver on IRCTC bookings.', 'Reward points on retail purchases.', 'Fuel surcharge waiver.'],
        joiningFee: '₹500 + taxes',
        annualFee: '₹300 + taxes',
        bestFor: 'Rail Travelers',
        tags: ['Travel', 'Rewards']
    },
    {
        id: 68,
        bank: 'SBI Card',
        category: 'shopping',
        title: 'Landmark Rewards SBI Card',
        subtitle: 'Lifestyle & Fashion',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Landmark Rewards SBI Card.png`,
        highlights: ['High rewards on Landmark brands.', 'Welcome vouchers.', 'Milestone points.'],
        detailedFeatures: ['Earn high rewards on Lifestyle, Max, Spar, and Home Centre.', 'Welcome gift vouchers.', 'Milestone reward points.', 'Fuel surcharge waiver.', 'Discounts during sale events.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Apparel Shopping',
        tags: ['Shopping', 'Rewards']
    },
    {
        id: 69,
        bank: 'SBI Card',
        category: 'premium',
        title: 'Landmark Rewards SBI Card SELECT',
        subtitle: 'Premium Lifestyle Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Landmark Rewards SBI Card SELECT.png`,
        highlights: ['Maximum rewards on Landmark brands.', 'Lounge access.', 'Premium welcome benefits.'],
        detailedFeatures: ['Maximum rewards on Lifestyle, Max, Spar, and Home Centre.', 'Complimentary lounge access.', 'Premium welcome benefits.', 'High milestone rewards.', 'Exclusive event invitations.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Fashion Enthusiasts',
        tags: ['Shopping', 'Premium', 'Lounge']
    },
    {
        id: 70,
        bank: 'SBI Card',
        category: 'premium',
        title: 'Landmark Rewards SBI Card PRIME',
        subtitle: 'Elite Lifestyle Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Landmark Rewards SBI Card PRIME.png`,
        highlights: ['Elite rewards on Landmark brands.', 'Priority Pass.', 'Luxury welcome gifts.'],
        detailedFeatures: ['Elite rewards on Lifestyle, Max, Spar, and Home Centre.', 'Priority Pass access.', 'Luxury welcome gifts.', 'Dedicated concierge.', 'Fuel surcharge waiver.'],
        joiningFee: '₹4,999 + taxes',
        annualFee: '₹4,999 + taxes',
        bestFor: 'Luxury Lifestyle',
        tags: ['Shopping', 'Premium', 'Lounge']
    },
    {
        id: 71,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'IndusInd Platinum RuPay Credit Card',
        subtitle: 'UPI-powered Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd Platinum RuPay Credit Card.png`,
        highlights: ['Credit Card enabled on UPI.', 'Earn 2 Reward Points per ₹100 via UPI.', '1% Fuel Surcharge Waiver.'],
        detailedFeatures: ['Credit Card enabled on UPI for seamless digital payments.', 'Earn 2 Reward Points on every ₹100 transaction done through UPI.', '1% Fuel Surcharge Waiver across all fuel stations.', 'Complimentary insurance coverage.', 'Reward points never expire.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'UPI Payments',
        tags: ['Rewards', 'Fuel', 'UPI']
    },
    {
        id: 72,
        bank: 'IndusInd Bank',
        category: 'dining',
        title: 'EazyDiner IndusInd Bank Platinum Credit Card',
        subtitle: 'Dining Privileges Redefined',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/EazyDiner IndusInd Bank Platinum Credit Card.png`,
        highlights: ['3 months EazyDiner Prime membership.', '20% OFF up to ₹500 thrice a month.', '2000 bonus reward points on ₹30,000 spend.'],
        detailedFeatures: ['3 months complimentary EazyDiner Prime membership worth ₹1,095.', 'Extra 20% OFF up to ₹500 at restaurants, 3 times a month.', '3-month Prime membership renewal on ₹30,000 spend in 90 days.', '2000 Reward Points on spending ₹30,000 every 90 days.', '1% fuel surcharge waiver.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Dining Enthusiasts',
        tags: ['Dining', 'Rewards', 'EazyDiner']
    },
    {
        id: 73,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Legend Credit Card',
        subtitle: 'Weekend Bonus Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Legend Credit Card.png`,
        highlights: ['2X rewards on weekends.', '1.8% discounted forex markup.', 'Fuel Surcharge Waiver.'],
        detailedFeatures: ['Earn 1 reward point per ₹100 on weekdays.', 'Earn 2 reward points per ₹100 on weekends.', 'Exclusive bonus rewards on annual milestone spends.', '1.8% discounted foreign currency markup.', '1% Fuel Surcharge Waiver.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Weekend Spenders',
        tags: ['Rewards', 'Travel', 'Fuel']
    },
    {
        id: 74,
        bank: 'IndusInd Bank',
        category: 'dining',
        title: 'EazyDiner Credit Card',
        subtitle: 'Next Revolution in Dining',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/EazyDiner Credit Card.png`,
        highlights: ['1-Year EazyDiner Prime (₹3,550 value).', 'Extra 25% off at partner restaurants.', 'Gift voucher ₹7500 at Postcard Hotel.'],
        detailedFeatures: ['1-Year EazyDiner Prime membership worth ₹3,550.', 'Complimentary premium alcoholic beverage at 200+ restaurants.', 'Gift Voucher worth ₹7500 at The Postcard Hotel.', 'Extra 25% off up to ₹1,000 per restaurant visit.', '1% fuel surcharge waiver.'],
        joiningFee: '₹1,999 + taxes',
        annualFee: '₹1,999 + taxes',
        bestFor: 'Premium Diners',
        tags: ['Dining', 'Premium', 'EazyDiner']
    },
    {
        id: 75,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Platinum Aura Edge Credit Card',
        subtitle: 'Flexible Lifestyle Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Platinum Aura Edge Credit Card.png`,
        highlights: ['Up to 8X Reward Points on select categories.', 'Flexible reward plans.', 'Contactless payment enabled.'],
        detailedFeatures: ['Earn up to 8X Reward Points on select merchant categories.', 'Flexibility to choose Reward Plans to suit your lifestyle.', 'Unique contactless feature for fast, secure purchases.', 'Fuel Surcharge Waiver.', 'Never-expiring reward points.'],
        joiningFee: '₹500 + taxes',
        annualFee: '₹500 + taxes',
        bestFor: 'Lifestyle Spenders',
        tags: ['Rewards', 'Shopping', 'Fuel']
    },
    {
        id: 76,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Platinum Visa Credit Card',
        subtitle: 'Comprehensive Insurance Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Platinum Visa Credit Card.png`,
        highlights: ['1.5 Reward Points per ₹150 spent.', 'Comprehensive Insurance Benefits.', 'Easy reward redemption.'],
        detailedFeatures: ['Earn 1.5 Reward Point for every ₹150 spent.', 'Comprehensive Insurance Benefits coverage.', 'Redeem reward points for merchandise, air miles, and more.', 'Emergency credit card replacement.', 'Contactless payment facility.'],
        joiningFee: '₹500 + taxes',
        annualFee: '₹500 + taxes',
        bestFor: 'Everyday Spending',
        tags: ['Rewards', 'Insurance']
    },
    {
        id: 77,
        bank: 'IndusInd Bank',
        category: 'travel',
        title: 'IndusInd Bank Avios Visa Infinite Credit Card',
        subtitle: 'International Travel Reimagined',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd Bank Avios Visa Infinite Credit Card.png`,
        highlights: ['6X Avios on international spends.', 'Up to 36,000 bonus Avios per year.', '1.5% discounted forex markup.'],
        detailedFeatures: ['Select preferred international destination and airline loyalty programme.', 'Earn 6X Avios on every ₹200 spent at preferred destination.', 'Earn milestone benefits of up to 36,000 bonus Avios per year.', 'Enjoy discounted forex markup of 1.5%.', 'Visa Infinite travel benefits.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'International Travelers',
        tags: ['Travel', 'Flights', 'Premium', 'Lounge']
    },
    {
        id: 78,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Pinnacle World Credit Card',
        subtitle: 'Golf & Online Privileges',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Pinnacle World Credit Card.png`,
        highlights: ['2.5 Reward Points per ₹100 online.', 'Comprehensive Golf Program.', 'Fuel Surcharge Waiver.'],
        detailedFeatures: ['Earn 2.5 Reward Points for every ₹100 spent online (E-commerce).', 'Comprehensive Golf Program — lessons and games.', 'Fuel Surcharge Waiver.', 'Exclusive Pinnacle World privileges.', 'Global lounge access via Priority Pass.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'Golf Enthusiasts',
        tags: ['Premium', 'Golf', 'Online Shopping', 'Lounge']
    },
    {
        id: 79,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Nexxt Credit Card',
        subtitle: "India's First Interactive Card",
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Nexxt Credit Card.png`,
        highlights: ["Switch between EMI, Rewards, or Credit at POS.", "1 Reward Point per ₹150 spent.", "Entertainment offers."],
        detailedFeatures: ["Flexible options — pay through EMI, Reward Points, or Credit at POS with LED buttons.", "Earn 1 Reward Point for every ₹150 spent.", "Entertainment offers — movies and more.", "Fuel Surcharge Waiver.", "Contactless payment enabled."],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Tech-Savvy Shoppers',
        tags: ['Rewards', 'Movies', 'Shopping']
    },
    {
        id: 80,
        bank: 'IndusInd Bank',
        category: 'cashback',
        title: 'Samman Credit Card',
        subtitle: 'Government Sector Exclusive',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Samman Credit Card.png`,
        highlights: ['1% cashback on all retail spends.', 'Free movie ticket via BookMyShow.', 'Nil Cash Advance fee.'],
        detailedFeatures: ['1% cashback on all retail spends up to ₹20,000 per statement cycle.', 'One assured movie ticket up to ₹200 every 6 months via BookMyShow.', '1% fuel surcharge waiver.', '1% railway surcharge waiver on transactions up to ₹5,000.', 'Nil Cash Advance fee.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'Government Employees',
        tags: ['Cashback', 'Movies', 'Fuel']
    },
    {
        id: 81,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'IndusInd Bank Tiger Credit Card',
        subtitle: 'Elite Privileges & Acceleration',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd Bank Tiger Credit Card.png`,
        highlights: ['Up to 6X accelerated rewards.', 'Priority Pass lounge access.', 'Complimentary Golf per quarter.'],
        detailedFeatures: ['Earn up to 6 accelerated rewards for every ₹100 spent.', 'BookMyShow: 1 free movie ticket up to ₹500 every 6 months.', '1.5% discounted foreign currency markup on international spends.', 'Lounge Access — Domestic 2 per Quarter, International 2 per Year via Priority Pass.', '1 complimentary Golf Game or Lesson per Quarter.'],
        joiningFee: '₹4,999 + taxes',
        annualFee: '₹4,999 + taxes',
        bestFor: 'Lifestyle Achievers',
        tags: ['Premium', 'Golf', 'Lounge', 'Movies', 'Priority Pass']
    },
    {
        id: 82,
        bank: 'IndusInd Bank',
        category: 'fuel',
        title: 'IndusInd Bank Jio-bp Mobility+ Credit Card',
        subtitle: 'Up to 60L Free Fuel Annually',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd+Bank+Jio-bp+Mobility%2B+Credit+Card.png`,
        highlights: ['Earn 12 Smiles per ₹100 at Jio-bp.', '400 bonus Smiles on first Jio-bp transaction.', '4000 bonus Smiles on ₹2L annual spend.'],
        detailedFeatures: ['Earn 400 Bonus Smiles after first fuel transaction at Jio-bp within 30 days.', 'Earn 12 Smiles on every ₹100 spent at Jio-bp.', 'Earn 200 Bonus Smiles on spending ₹4000 at Jio-bp every month.', 'Earn 4000 Bonus Smiles on spending ₹2 lakhs or more in a card anniversary year.', 'Smiles redeemable directly for fuel.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Frequent Fuel Users',
        tags: ['Fuel', 'Rewards']
    },
    {
        id: 83,
        bank: 'IndusInd Bank',
        category: 'cashback',
        title: 'CRED IndusInd Bank RuPay Credit Card',
        subtitle: 'CRED Points on Every Spend',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/CRED IndusInd Bank RuPay Credit Card.png`,
        highlights: ['5% back on e-commerce as CRED Points.', '5% back on CRED Pay & CRED Store.', '1% back on all other transactions.'],
        detailedFeatures: ['Earn 5% back as CRED Points on E-commerce transactions.', 'Earn 5% back on CRED Pay, CRED Store, CRED Travel, and online UPI via CRED.', 'Earn 1% back on Scan & Pay transactions through CRED.', 'Earn 1% back on insurance and utility bills paid via CRED.', 'Earn 1% back on all other transactions.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'CRED Users',
        tags: ['Cashback', 'Online Shopping', 'Rewards']
    },
    {
        id: 84,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'Poonawalla Fincorp IndusInd Bank eLITE RuPay Credit Card',
        subtitle: 'UPI & E-Commerce Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Poonawalla Fincorp IndusInd Bank eLITE RuPay Credit Card.png`,
        highlights: ['2.5X Reward Points on e-commerce.', 'Free movie ticket via BookMyShow monthly.', '3000 bonus points on ₹4L annual spend.'],
        detailedFeatures: ['Earn 2.5 Reward Points on E-commerce transactions.', 'Milestone Benefit of 3000 Reward Points on annual spends of ₹4,00,000.', 'Buy one, get one free movie ticket on BookMyShow every month up to ₹200.', '1% Fuel Surcharge Waiver.', 'UPI-enabled credit card.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'Online Shoppers',
        tags: ['Rewards', 'Movies', 'Online Shopping', 'Fuel']
    },
    {
        id: 85,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Indus Solitaire Credit Card',
        subtitle: 'Ultra Premium Banking',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Indus Solitaire Credit Card.png`,
        highlights: ['Zero forex markup on international spends.', '16 international + 16 domestic lounge visits.', 'Taj Epicure & EazyDiner Prime memberships.'],
        detailedFeatures: ['Zero Foreign Currency Markup on all international spends.', 'Taj Epicure Preferred Membership.', '16 international and 16 domestic lounge visits per year.', 'International Travel Health Insurance of USD 25,000.', 'EazyDiner Prime Membership and extraordinary concierge service.'],
        joiningFee: '₹25,000 + taxes',
        annualFee: '₹25,000 + taxes',
        bestFor: 'Ultra HNI Travelers',
        tags: ['Premium', 'Lounge', 'Travel', 'Dining', 'Priority Pass']
    },
    {
        id: 86,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Pioneer Private Credit Card',
        subtitle: 'The Pinnacle of Luxury',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Pioneer Private Credit Card.png`,
        highlights: ['Unlimited international & domestic lounge access.', '0% forex markup.', 'Unlimited Golf games & lessons.'],
        detailedFeatures: ['Complimentary Taj Epicure or Club ITC Culinaire and EazyDiner memberships.', 'Complimentary Postcard Hotel vouchers.', 'Complimentary international and domestic airport transfers and Meet & Greet.', 'Unlimited international and domestic lounge access.', '0% forex currency markup, unlimited domestic Golf, and movie tickets.'],
        joiningFee: '₹50,000 + taxes',
        annualFee: '₹50,000 + taxes',
        bestFor: 'Ultra Premium Lifestyle',
        tags: ['Premium', 'Lounge', 'Golf', 'Travel', 'Dining', 'Priority Pass']
    },
    {
        id: 87,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Indulge Credit Card',
        subtitle: '22K Gold Inlay No Preset Limit',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Indulge Credit Card.png`,
        highlights: ['22K Gold inlay on card plastic.', 'No preset spending limit.', 'Comprehensive Golf Program.'],
        detailedFeatures: ['First credit card in India with a pure 22K Gold inlay.', 'Absolutely no preset spending limit.', 'Earn 1.5 Reward Points for every ₹100 spent.', 'Comprehensive Golf Program — lessons and games.', 'Visa Infinite Benefits worldwide.'],
        joiningFee: 'By Invitation',
        annualFee: 'By Invitation',
        bestFor: 'UHNWI Customers',
        tags: ['Premium', 'Golf', 'Lounge', 'Elite Status']
    },
    {
        id: 88,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Pioneer Heritage Credit Card',
        subtitle: 'International Rewards & Golf',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Pioneer Heritage Credit Card.png`,
        highlights: ['2.5X rewards on international spends.', 'Comprehensive Golf Program.', 'Fuel Surcharge Waiver.'],
        detailedFeatures: ['Earn 2.5 Reward Points per ₹100 on international transactions.', 'Earn 1 Reward Point per ₹100 on domestic transactions.', 'Comprehensive Golf Program — lessons and games included.', 'Fuel Surcharge Waiver.', 'Mastercard World benefits.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'International Travelers',
        tags: ['Premium', 'Golf', 'Travel', 'Lounge']
    },
    {
        id: 89,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Pioneer Legacy Credit Card',
        subtitle: 'Weekend Rewards & Golf',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Pioneer Legacy Credit Card.png`,
        highlights: ['2X rewards on weekends.', 'Comprehensive Golf Program.', 'Exclusive Bonus Rewards.'],
        detailedFeatures: ['Earn 2 reward points per ₹100 on weekends.', 'Earn 1 reward point per ₹100 on weekdays.', 'Comprehensive Golf Program.', 'Exclusive milestone bonus rewards.', 'Fuel Surcharge Waiver.'],
        joiningFee: '₹4,999 + taxes',
        annualFee: '₹4,999 + taxes',
        bestFor: 'Weekend Lifestyle Spenders',
        tags: ['Premium', 'Golf', 'Rewards', 'Lounge']
    },
    {
        id: 90,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Crest Credit Card',
        subtitle: 'MasterCard World Elite Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Crest Credit Card.png`,
        highlights: ['2.5X rewards on international spends.', 'Comprehensive Golf Program.', 'MasterCard World Elite benefits.'],
        detailedFeatures: ['Earn 2.5 Reward Points per ₹100 on international spends.', 'Earn 1 Reward Point per ₹100 on domestic spends.', 'Comprehensive Golf Program.', 'Fuel Surcharge Waiver.', 'MasterCard World Elite benefits worldwide.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'Affluent International Travelers',
        tags: ['Premium', 'Golf', 'Travel', 'Elite Status']
    },
    {
        id: 91,
        bank: 'IndusInd Bank',
        category: 'travel',
        title: 'Club Vistara IndusInd Bank Explorer Credit Card',
        subtitle: 'Best-in-class Vistara Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Club Vistara IndusInd Bank Explorer Credit Card.png`,
        highlights: ['Complimentary Business Class ticket vouchers.', '1.8% discounted forex markup.', 'Best-in-class rewards program.'],
        detailedFeatures: ['Complimentary Business Class ticket vouchers on milestone spends.', 'Enjoy discounted foreign currency markup of 1.8%.', 'Best-in-class rewards program with Vistara miles.', 'Club Vistara exclusive privileges.', 'Milestone bonus Vistara points.'],
        joiningFee: '₹2,500 + taxes',
        annualFee: '₹2,500 + taxes',
        bestFor: 'Vistara Frequent Flyers',
        tags: ['Travel', 'Flights', 'Premium']
    },
    {
        id: 92,
        bank: 'IndusInd Bank',
        category: 'travel',
        title: 'InterMiles Odyssey Visa Credit Card',
        subtitle: 'InterMiles Frequent Flyer',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/InterMiles Odyssey Visa Credit Card.png`,
        highlights: ['6X InterMiles per ₹100 on weekends.', 'Welcome bonus of 15,000 InterMiles.', 'Dining and movie privileges.'],
        detailedFeatures: ['Earn 6 InterMiles per ₹100 on weekends.', 'Earn 2X InterMiles on all InterMiles spends.', 'Welcome Bonus of 15,000 InterMiles.', 'Privileges on movies, dining, and lifestyle.', 'Complimentary InterMiles frequent flyer membership.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'Frequent Flyers',
        tags: ['Travel', 'Flights', 'Rewards', 'Dining', 'Movies']
    },
    {
        id: 93,
        bank: 'IndusInd Bank',
        category: 'premium',
        title: 'Celesta Credit Card',
        subtitle: 'International First Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Celesta Credit Card.png`,
        highlights: ['3X rewards on international spends.', 'Dining, lifestyle & travel privileges.', 'Exclusive global events access.'],
        detailedFeatures: ['Earn 3 Reward Points per ₹100 on international transactions.', 'Earn 1 Reward Point per ₹100 on domestic transactions.', 'Exclusive privileges in Dining, Lifestyle, and Travel.', 'Access to exclusive events and experiences.', 'Lounge access benefits.'],
        joiningFee: '₹9,999 + taxes',
        annualFee: '₹9,999 + taxes',
        bestFor: 'Luxury International Travelers',
        tags: ['Premium', 'Travel', 'Dining', 'Lounge']
    },
    {
        id: 94,
        bank: 'IndusInd Bank',
        category: 'dining',
        title: 'ePay Amex Credit Card',
        subtitle: 'American Express Digital Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/ePay Amex Credit Card.png`,
        highlights: ['Up to 10 Reward Points per transaction.', '3 months Zomato Gold Membership.', 'Times Prime Membership on ₹2L spends.'],
        detailedFeatures: ['3 Months Zomato Gold Membership for new cardholders.', 'Unique transaction-based rewards — up to 10 Reward Points per transaction.', '2X Reward Points in the 12th month for active cardholders.', 'Times Prime Membership on annual spends of ₹2 lakhs.', '5% cashback annually on early payment of total outstanding.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Digital Payment Users',
        tags: ['Dining', 'Rewards', 'Cashback', 'Online Shopping']
    },
    {
        id: 95,
        bank: 'IndusInd Bank',
        category: 'rewards',
        title: 'IndusInd Platinum Credit Card',
        subtitle: 'Everyday Visa Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndusInd Platinum Credit Card.png`,
        highlights: ['Reward Points on all spends.', 'Comprehensive Insurance Benefits.', 'Contactless payment enabled.'],
        detailedFeatures: ['Earn Reward Points on every retail transaction.', 'Comprehensive Insurance Benefits coverage.', 'Contactless payment enabled for quick transactions.', 'Emergency card replacement worldwide.', 'Lifetime free or low annual fee variant available.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'First-time Credit Card Users',
        tags: ['Rewards', 'Insurance']
    },
    {
        id: 96,
        bank: 'Kotak Bank',
        category: 'cashback',
        title: 'Kotak Cashback+ Credit Card',
        subtitle: 'Accelerated Cashback Everyday',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Kotak+Cashback%2B+Credit+Card.png`,
        highlights: ['Up to 5% accelerated cashback.', 'Unlimited 0.5% base cashback.', 'Fuel surcharge waiver.'],
        detailedFeatures: ['Earn up to 5% accelerated cashback on online spends.', 'Earn unlimited 0.5% cashback on all other spends — no cap.', '1% fuel surcharge waiver at all fuel stations.', 'Cashback credited directly to statement — no redemption hassle.', 'Contactless payment enabled.'],
        joiningFee: '₹500 + taxes',
        annualFee: '₹500 + taxes',
        bestFor: 'Online Shoppers',
        tags: ['Cashback', 'Online Shopping', 'Fuel']
    },
    {
        id: 97,
        bank: 'Kotak Bank',
        category: 'travel',
        title: 'Kotak Air+ Credit Card',
        subtitle: 'Premium Air Miles Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Kotak+Air%2B+Credit+Card.png`,
        highlights: ['Earn Air Miles on every spend.', 'Milestone benefits worth ₹10,000.', 'Annual Fee Waiver on milestone.'],
        detailedFeatures: ['Earn Air Miles on every spend redeemable for flights.', 'Unlock milestone benefits worth ₹10,000 annually.', 'Annual fee waiver on achieving spend milestone.', 'Complimentary lounge access at airports.', 'Zero forex markup on select plans.'],
        joiningFee: '₹2,500 + taxes',
        annualFee: '₹2,500 + taxes',
        bestFor: 'Frequent Flyers',
        tags: ['Travel', 'Flights', 'Premium', 'Lounge']
    },
    {
        id: 98,
        bank: 'Kotak Bank',
        category: 'movies',
        title: 'PVR INOX Kotak Credit Card',
        subtitle: 'Unlimited Movie Entertainment',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/PVR INOX Kotak Credit Card.png`,
        highlights: ['Unlimited complimentary movie tickets.', '5% discount on all movie tickets.', '20% discount on Food & Beverages.'],
        detailedFeatures: ['Get unlimited complimentary movie tickets at PVR INOX.', '5% discount on all movie tickets at PVR INOX.', '20% discount on Food & Beverages at PVR INOX.', 'Special offers on weekend shows.', '1% fuel surcharge waiver.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Movie Lovers',
        tags: ['Movies', 'Dining', 'Entertainment']
    },
    {
        id: 99,
        bank: 'Kotak Bank',
        category: 'fuel',
        title: 'IndianOil Kotak Credit Card',
        subtitle: 'Save More at IndianOil Pumps',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndianOil Kotak Credit Card.png`,
        highlights: ['Save 5% on IndianOil fuel spends.', 'Welcome Gift on card activation.', 'Reward Points on other spends.'],
        detailedFeatures: ['Save 5% on IndianOil fuel spends as XTRAREWARDS points.', 'Welcome Gift of XTRAREWARDS points on card activation.', 'Earn XTRAREWARDS points on all other retail spends.', 'Redeem XTRAREWARDS points for free fuel.', '1% fuel surcharge waiver at all fuel stations.'],
        joiningFee: '₹0 (Lifetime Free)',
        annualFee: '₹0 (Lifetime Free)',
        bestFor: 'IndianOil Fuel Users',
        tags: ['Fuel', 'Rewards']
    },
    {
        id: 100,
        bank: 'Kotak Bank',
        category: 'travel',
        title: 'IndiGo XL Kotak Credit Card',
        subtitle: 'Fly More with IndiGo BluChips',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/IndiGo XL Kotak Credit Card.png`,
        highlights: ['Up to 21 IndiGo BluChips per flight booking.', 'Annual milestone rewards.', 'Airport lounge access.'],
        detailedFeatures: ['Earn up to 21 IndiGo BluChips on every IndiGo flight booking.', 'Earn extra BluChips on monthly travel milestones.', 'Annual milestone rewards on high spends.', 'Complimentary domestic airport lounge access.', 'BluChips redeemable for IndiGo flight bookings.'],
        joiningFee: '₹2,999 + taxes',
        annualFee: '₹2,999 + taxes',
        bestFor: 'IndiGo Frequent Flyers',
        tags: ['Travel', 'Flights', 'Lounge', 'Rewards']
    },
    {
        id: 101,
        bank: 'Kotak Bank',
        category: 'travel',
        title: 'Kotak Air Credit Card',
        subtitle: 'Earn Air Miles on Every Spend',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Kotak Air Credit Card.png`,
        highlights: ['Earn Air Miles on every spend.', 'Bonus milestone benefits.', 'Annual Fee Waiver on milestone.'],
        detailedFeatures: ['Earn Air Miles redeemable for flights on every spend.', 'Milestone bonus Air Miles on achieving annual spend targets.', 'Annual fee waiver on achieving spend milestone.', 'Complimentary lounge access at select airports.', 'Contactless payment enabled.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Budget Travelers',
        tags: ['Travel', 'Flights', 'Rewards']
    },
    {
        id: 102,
        bank: 'Kotak Bank',
        category: 'rewards',
        title: 'Kotak League Credit Card',
        subtitle: 'Premier Rewards & Milestones',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Kotak League Credit Card.png`,
        highlights: ['Premier rewards on all spends.', 'Quarterly milestone cashback.', 'Fuel surcharge waiver.'],
        detailedFeatures: ['Earn reward points on all retail spends.', 'Quarterly milestone cashback credits.', '1% fuel surcharge waiver at all fuel stations.', 'Redeem points for merchandise, vouchers, and more.', 'Complimentary accident insurance cover.'],
        joiningFee: '₹1,999 + taxes',
        annualFee: '₹1,999 + taxes',
        bestFor: 'Everyday Spenders',
        tags: ['Rewards', 'Shopping', 'Fuel', 'Cashback']
    },
    {
        id: 103,
        bank: 'Union Bank of India',
        category: 'premium',
        title: 'Union Rupay Nexteria Credit Card',
        subtitle: 'The Ultimate Metal Experience',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Union Rupay Nexteria Credit Card.png`,
        highlights: ['Metal card with exclusive family lounge access.', 'Unlimited individual lounge visits.', 'Complimentary ITC stay (Stay 2, Get 1 Free).'],
        detailedFeatures: ['Exclusive metal card design with premium feel.', 'Family lounge access: 2 visits per quarter for 1+3 family members.', 'Unlimited individual domestic and international lounge visits.', 'Complimentary stay at ITC hotels: Stay 2 nights, get 1 night free.', '₹50 Lakh Accidental Insurance and 4 complimentary golf lessons per year.'],
        joiningFee: '₹12,499 + taxes',
        annualFee: '₹12,499 + taxes',
        bestFor: 'Ultra HNIs & Luxury Travelers',
        tags: ['Premium', 'Lounge', 'Travel', 'Golf']
    },
    {
        id: 104,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'Union Rupay Unicorn Credit Card',
        subtitle: 'Affluent Rewards & Lifestyle',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Union Rupay Unicorn Credit Card.png`,
        highlights: ['Vouchers from Myntra, Blinkit, and Nykaa.', 'Flat ₹250 off on BookMyShow monthly.', '8 Domestic + 2 International lounge accesses.'],
        detailedFeatures: ['Welcome vouchers from top brands like Myntra, Blinkit, and Nykaa.', 'Monthly BookMyShow discount: Flat ₹250 off.', '8 complimentary domestic and 2 international lounge accesses per year.', '3 months complimentary Swiggy One membership.', 'Accelerated reward points on lifestyle spends.'],
        joiningFee: '₹2,400 + taxes',
        annualFee: '₹2,400 + taxes',
        bestFor: 'Lifestyle & Entertainment',
        tags: ['Rewards', 'Movies', 'Lounge', 'Shopping']
    },
    {
        id: 105,
        bank: 'Union Bank of India',
        category: 'health',
        title: 'Union Bank RuPay JCB Wellness Credit Card',
        subtitle: 'Health & Wellness Focused',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Union Bank RuPay JCB Wellness Credit Card.png`,
        highlights: ['Complimentary Spa, Gym, and Golf sessions.', 'Annual health check-ups included.', 'Domestic and International lounge access.'],
        detailedFeatures: ['Complimentary Spa, Gym, and Golf sessions every quarter.', 'Annual health check-ups and wellness benefits.', 'Domestic and International airport lounge access via JCB network.', 'Reward points on health and wellness related spends.', 'Personal accident insurance coverage.'],
        joiningFee: '₹999 + taxes',
        annualFee: '₹999 + taxes',
        bestFor: 'Wellness Enthusiasts',
        tags: ['Health', 'Wellness', 'Lounge', 'Golf']
    },
    {
        id: 106,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'RuPay Select Credit Card',
        subtitle: 'High Value Lifestyle Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/RuPay Select Credit Card.png`,
        highlights: ['NIL Joining Fee.', '8 Domestic + 2 International lounge accesses.', '4 Reward points per ₹100 spent.'],
        detailedFeatures: ['Zero joining fee for high-value customers.', '8 domestic and 2 international lounge visits per year.', 'Earn 4 reward points for every ₹100 spent.', '₹10 Lakh Accidental Insurance coverage.', 'Seamless UPI integration through RuPay network.'],
        joiningFee: '₹0',
        annualFee: '₹550 + taxes',
        bestFor: 'Everyday High Spenders',
        tags: ['Rewards', 'Lounge', 'UPI']
    },
    {
        id: 107,
        bank: 'Union Bank of India',
        category: 'health',
        title: 'Union JCB HEALTH Credit Card',
        subtitle: 'Affordable Health Benefits',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Union JCB HEALTH Credit Card.png`,
        highlights: ['8 Domestic + 2 International lounge accesses.', '1% Fuel surcharge waiver.', 'Annual benefits worth ₹31,750.'],
        detailedFeatures: ['8 domestic and 2 international lounge accesses per year.', 'Comprehensive personal accident insurance of ₹10 Lakh.', '1% fuel surcharge waiver at all stations.', 'Access to annual health benefits worth over ₹31,000.', 'Exclusive JCB health and dining offers.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹499 + taxes',
        bestFor: 'Health & Utility Spenders',
        tags: ['Health', 'Fuel', 'Lounge']
    },
    {
        id: 108,
        bank: 'Union Bank of India',
        category: 'fuel',
        title: 'Union Uni Carbon Credit Card',
        subtitle: 'Fuel Cashback & Transit',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Union Uni Carbon Credit Card.png`,
        highlights: ['4% Cashback on fuel at HPCL.', 'NCMC enabled for contactless transit.', 'Welcome bonus reward points.'],
        detailedFeatures: ['Earn 4% cashback on all fuel purchases at HPCL fuel stations.', 'NCMC (National Common Mobility Card) enabled for Metro and Bus transit.', 'Attractive welcome bonus reward points on first transaction.', 'Personal accident insurance coverage.', 'Contactless payment for faster checkouts.'],
        joiningFee: '₹499 + taxes',
        annualFee: '₹550 + taxes',
        bestFor: 'Commuters & Fuel Spenders',
        tags: ['Fuel', 'Cashback', 'Travel']
    },
    {
        id: 109,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'RuPay Platinum Credit Card',
        subtitle: 'Essential Shopping Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/RuPay Platinum Credit Card.png`,
        highlights: ['NIL Joining Fee.', '2 Reward points per ₹100 spent.', '₹2 Lakh Accidental Insurance.'],
        detailedFeatures: ['Zero joining fee for entry-level cardholders.', 'Earn 2 reward points for every ₹100 spent on all retail.', '₹2 Lakh personal accident insurance coverage.', 'Attractive discounts on grocery and utility payments.', 'UPI-enabled for effortless digital payments.'],
        joiningFee: '₹0',
        annualFee: '₹350 + taxes',
        bestFor: 'First-time Card Users',
        tags: ['Rewards', 'Shopping', 'UPI']
    },
    {
        id: 110,
        bank: 'Union Bank of India',
        category: 'premium',
        title: 'VISA Signature Credit Card',
        subtitle: 'Premium Signature Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/VISA Signature Credit Card.png`,
        highlights: ['NIL Joining Fee.', '4 Reward points per ₹100 spent.', 'Complimentary lounge access.'],
        detailedFeatures: ['Zero joining fee for premium banking customers.', 'Earn 4 reward points for every ₹100 spent.', 'Up to 50 days of interest-free credit period.', 'Complimentary domestic airport lounge access.', 'Global concierge and travel assistance.'],
        joiningFee: '₹0',
        annualFee: '₹1,999 + taxes',
        bestFor: 'Premium Lifestyle',
        tags: ['Premium', 'Lounge', 'Rewards']
    },
    {
        id: 111,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'VISA Platinum Credit Card',
        subtitle: 'Versatile Visa Rewards',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/VISA Platinum Credit Card.png`,
        highlights: ['NIL Joining Fee.', '2 Reward points per ₹100 spent.', 'Up to 50 days interest-free credit.'],
        detailedFeatures: ['Zero joining fee for eligibility-based issuance.', 'Earn 2 reward points for every ₹100 retail spent.', 'Up to 50 days of interest-free credit period.', 'Standard Visa Platinum benefits across shopping and travel.', 'Fuel surcharge waiver at select stations.'],
        joiningFee: '₹0',
        annualFee: '₹450 + taxes',
        bestFor: 'Generic Lifestyle Spends',
        tags: ['Rewards', 'Shopping']
    },
    {
        id: 112,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'VISA Gold Credit Card',
        subtitle: 'Classic Everyday Value',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/VISA Gold Credit Card.png`,
        highlights: ['Low service charges.', 'Personal accidental insurance cover.', 'Attractive cashback rewards.'],
        detailedFeatures: ['Competitive low service and interest charges.', 'Integrated personal accidental insurance coverage.', 'Attractive cashback rewards on departmental store spends.', 'Fuel surcharge waiver for convenient refueling.', 'Widely accepted globally with Visa network.'],
        joiningFee: '₹0',
        annualFee: '₹350 + taxes',
        bestFor: 'Value Seekers',
        tags: ['Rewards', 'Cashback', 'Insurance']
    },
    {
        id: 113,
        bank: 'Union Bank of India',
        category: 'lifestyle',
        title: 'Divaa Credit Card',
        subtitle: 'Exclusive for Women',
        image: `${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/credit-card/Divaa Credit Card.png`,
        highlights: ['Exclusive Travel, Spa, and Salon offers.', '8 Domestic + 2 International lounge accesses.', '₹2 Lakh Accidental Insurance.'],
        detailedFeatures: ['Curated offers for women across Travel, Spa, Salon, and Shopping.', '8 complimentary domestic and 2 international lounge visits per year.', 'Earn 2 reward points for every ₹100 spent.', '₹2 Lakh personal accident insurance coverage.', 'UPI-integrated for modern feminine lifestyle.'],
        joiningFee: '₹0',
        annualFee: '₹499 + taxes',
        bestFor: 'Modern Women',
        tags: ['Rewards', 'Lounge', 'Wellness', 'UPI']
    }
];