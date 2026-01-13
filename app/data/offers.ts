// app/data/offers.ts

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

export const offerData: Record<string, Offer> = {
  // Finance Offers
  'home-loan': {
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
      'Minimum income: ₹25,000 per month (salaried) / ₹3 lakhs per annum (self-employed)',
      'CIBIL score: 650 and above',
      'Property value: ₹20 Lakhs to ₹5 Crores',
      'Minimum work experience: 2 years in current employment',
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
      interestRate: '8.5% - 9.5%',
      maxLoanAmount: '₹10 Crores',
      processingFee: '0.5% to 1% (min ₹10,000)',
      tenure: 'Up to 30 years',
      prepaymentCharges: 'Nil after 3 years',
      loanToValue: 'Up to 90% of property value'
    }
  },

  'personal-loan': {
    title: 'Personal Loan',
    category: 'Finance',
    icon: 'DollarSign',
    description: 'Instant personal loan with minimal documentation for urgent financial needs',
    overview: 'A personal loan is an unsecured loan that can be used for various personal expenses without requiring collateral. It offers quick disbursal and flexible usage for emergencies, celebrations, travel, medical expenses, debt consolidation, or home improvement.',
    features: [
      'Loan amount up to ₹25 Lakhs',
      'Instant approval within 30 minutes for eligible applicants',
      'No collateral or security required',
      'Same-day disbursal for pre-approved customers',
      'Flexible repayment tenure from 1 to 5 years',
      'Completely digital application process',
      'Competitive interest rates'
    ],
    benefits: [
      {
        title: 'Quick Financial Support',
        description: 'Get immediate funds for emergencies without lengthy approval processes or extensive documentation.'
      },
      {
        title: 'No Collateral Required',
        description: 'Being an unsecured loan, you don\'t need to pledge any assets or property as security.'
      },
      {
        title: 'Multi-purpose Usage',
        description: 'Use the funds for any legitimate personal need without restrictions or monitoring.'
      },
      {
        title: 'Credit Score Improvement',
        description: 'Timely repayments can significantly improve your credit score and borrowing capacity.'
      },
      {
        title: 'Debt Consolidation',
        description: 'Combine multiple high-interest debts into one manageable EMI with potentially lower interest.'
      }
    ],
    eligibility: [
      'Age: 21-58 years',
      'Minimum income: ₹15,000 per month for salaried',
      'CIBIL score: 650 and above',
      'Employment stability: Minimum 6 months in current job',
      'Resident Indian citizen',
      'Clean repayment history'
    ],
    documents: [
      'KYC documents (Aadhaar and PAN card mandatory)',
      'Latest 3 months salary slips',
      'Last 6 months bank statements',
      'Employment proof (Company ID, Appointment letter)',
      'Address proof (if not in Aadhaar)',
      'Passport size photographs'
    ],
    offerDetails: {
      interestRate: '10.5% - 15% p.a.',
      maxLoanAmount: '₹25 Lakhs',
      processingFee: '1% to 3% of loan amount',
      tenure: '1 to 5 years',
      prepaymentCharges: '2% to 4% of outstanding amount',
      specialFeature: 'First EMI free for loans above ₹5 Lakhs'
    }
  },

  'business-loan': {
    title: 'Business Loan',
    category: 'Finance',
    icon: 'Briefcase',
    description: 'Growth capital for businesses with flexible repayment options',
    overview: 'Business loans provide capital for entrepreneurs and established businesses to expand operations, purchase equipment, increase inventory, or meet working capital requirements. These loans can be secured or unsecured, depending on the business profile and requirements.',
    features: [
      'Loan amount from ₹1 Lakh to ₹2 Crores',
      'Collateral-free loans available for eligible businesses',
      'Flexible repayment options aligned with cash flow',
      'Quick processing with minimal documentation',
      'Top-up facilities for existing borrowers',
      'Business advisory services included',
      'Online application and tracking portal'
    ],
    benefits: [
      {
        title: 'Business Expansion',
        description: 'Access capital to scale operations, enter new markets, or launch new products/services.'
      },
      {
        title: 'Working Capital Management',
        description: 'Maintain healthy cash flow to manage daily operations, payroll, and supplier payments.'
      },
      {
        title: 'Asset Acquisition',
        description: 'Purchase machinery, equipment, or commercial vehicles to enhance productivity.'
      },
      {
        title: 'Tax Benefits',
        description: 'Interest paid on business loans is tax-deductible as business expense.'
      },
      {
        title: 'Build Business Credit',
        description: 'Timely repayments establish strong business credit history for future borrowing.'
      }
    ],
    eligibility: [
      'Business vintage: Minimum 3 years of operations',
      'Annual turnover: ₹20 Lakhs and above',
      'Profitability: Last 2 years profitable (for larger loans)',
      'Business entity: Proprietorship, Partnership, Pvt Ltd, LLP',
      'Credit score: 650+ for proprietors/directors',
      'Existing banking relationship preferred'
    ],
    documents: [
      'Business registration certificates',
      'PAN card of business and promoters',
      'Last 3 years audited financial statements',
      'Last 12 months bank statements',
      'KYC of all directors/partners',
      'Business address proof',
      'Existing loan details (if any)'
    ],
    offerDetails: {
      interestRate: '11% - 16% p.a.',
      maxLoanAmount: '₹2 Crores',
      processingFee: '1.5% to 2.5%',
      tenure: '1 to 7 years',
      moratoriumPeriod: 'Up to 6 months available',
      collateral: 'Required for loans above ₹50 Lakhs'
    }
  },

  'sme-loan': {
    title: 'SME Loan',
    category: 'Finance',
    icon: 'Factory',
    description: 'Tailored financing solutions for Small and Medium Enterprises',
    overview: 'SME Loans are specifically designed financial products catering to the unique needs of Small and Medium Enterprises. These loans help SMEs manage working capital, purchase equipment, expand facilities, or adopt new technologies with customized repayment structures.',
    features: [
      'Collateral-free loans up to ₹50 Lakhs',
      'Customized repayment based on business cycles',
      'Quick sanction within 72 hours',
      'Minimal documentation requirements',
      'Government subsidy assistance available',
      'Business mentoring support',
      'Insurance coverage options'
    ],
    benefits: [
      {
        title: 'Tailored Solutions',
        description: 'Loan structures designed specifically for SME business models and cash flow patterns.'
      },
      {
        title: 'Government Schemes',
        description: 'Access to various government subsidy schemes like CGTMSE for collateral-free loans.'
      },
      {
        title: 'Competitive Rates',
        description: 'Special interest rates for SMEs to support business growth and sustainability.'
      },
      {
        title: 'Advisory Services',
        description: 'Free business advisory and mentoring to help optimize operations and growth.'
      },
      {
        title: 'Digital Access',
        description: 'Complete digital journey from application to disbursement and repayment.'
      }
    ],
    eligibility: [
      'Business type: Manufacturing, Trading, Services',
      'Annual turnover: ₹5 Lakhs to ₹50 Crores',
      'Business vintage: Minimum 2 years',
      'Proprietorship/Partnership/Pvt Ltd/LLP',
      'Credit score: 600+ for promoters',
      'Positive bank statement history'
    ],
    documents: [
      'Business registration proof',
      'PAN of business entity',
      'Last 2 years financial statements',
      'Last 6 months bank statements',
      'KYC of proprietors/partners/directors',
      'Business address proof',
      'Existing loan details'
    ],
    offerDetails: {
      interestRate: '10% - 14% p.a.',
      maxLoanAmount: '₹5 Crores',
      processingFee: '1% to 2%',
      tenure: '6 months to 5 years',
      security: 'Collateral-free up to ₹50 Lakhs',
      specialFeature: 'MSME registration benefits available'
    }
  },

  'auto-loan': {
    title: 'Auto Loan',
    category: 'Finance',
    icon: 'Car',
    description: 'Affordable financing for new and pre-owned vehicles',
    overview: 'Auto loans provide financing for purchasing new or used cars, two-wheelers, commercial vehicles, or electric vehicles. These secured loans offer competitive interest rates with the vehicle itself serving as collateral, making vehicle ownership accessible with manageable EMIs.',
    features: [
      'Financing for new and used vehicles',
      'Loan up to 100% of on-road price for select models',
      'Flexible tenure from 1 to 7 years',
      'Quick online approval process',
      'Insurance and accessories financing',
      'Balance transfer facility',
      'Pre-approved offers for existing customers'
    ],
    benefits: [
      {
        title: 'Easy Ownership',
        description: 'Drive your dream vehicle immediately while paying in convenient monthly installments.'
      },
      {
        title: 'Competitive Rates',
        description: 'Special interest rates for electric vehicles and certain vehicle categories.'
      },
      {
        title: 'Comprehensive Coverage',
        description: 'Option to include insurance, registration, and accessories in the loan amount.'
      },
      {
        title: 'Pre-owned Vehicle Financing',
        description: 'Special schemes for certified pre-owned vehicles with warranty.'
      },
      {
        title: 'Quick Processing',
        description: 'Fast-track processing with tie-ups with major automobile dealers.'
      }
    ],
    eligibility: [
      'Age: 21-65 years',
      'Minimum income: ₹15,000 per month',
      'CIBIL score: 650 and above',
      'Employment: Salaried or self-employed',
      'Resident Indian citizen',
      'Valid driving license'
    ],
    documents: [
      'Identity proof (Aadhaar, PAN)',
      'Address proof',
      'Income proof (salary slips/bank statements)',
      'Vehicle quotation from dealer',
      'Passport size photographs',
      'Driving license copy'
    ],
    offerDetails: {
      interestRate: '7.9% - 12% p.a.',
      maxLoanAmount: '₹50 Lakhs',
      processingFee: '₹2,999 to ₹5,999',
      tenure: '1 to 7 years',
      marginMoney: '10% to 20% of vehicle cost',
      specialFeature: 'Zero down payment for select models'
    }
  },

  'mortgage-loan': {
    title: 'Mortgage Loan',
    category: 'Finance',
    icon: 'Landmark',
    description: 'Loan against property for business or personal needs',
    overview: 'A mortgage loan allows property owners to borrow money by pledging their residential or commercial property as collateral. This secured loan offers lower interest rates compared to personal loans and higher loan amounts, making it ideal for large financial requirements.',
    features: [
      'Loan against residential or commercial property',
      'High loan amount up to 70% of property value',
      'Long repayment tenure up to 15 years',
      'Flexible end-use - business or personal',
      'Balance transfer from existing loans',
      'Top-up facility on existing mortgage',
      'Online application and tracking'
    ],
    benefits: [
      {
        title: 'Lower Interest Rates',
        description: 'Secured nature of loan results in significantly lower interest rates compared to unsecured loans.'
      },
      {
        title: 'Higher Loan Amount',
        description: 'Access substantial funds based on property value for major expenses or investments.'
      },
      {
        title: 'Long Tenure',
        description: 'Extended repayment period up to 15 years ensures comfortable EMI payments.'
      },
      {
        title: 'Flexible Usage',
        description: 'Use funds for business expansion, education, medical treatment, or debt consolidation.'
      },
      {
        title: 'Tax Benefits',
        description: 'Interest paid may be tax-deductible if used for business or property purchase/construction.'
      }
    ],
    eligibility: [
      'Age: 25-70 years',
      'Property ownership: Clear title property',
      'Property age: Usually up to 30 years',
      'Income: Regular source of income',
      'Credit score: 650+ preferred',
      'Property location: In approved areas'
    ],
    documents: [
      'Property documents (Title deed, Sale deed)',
      'Property tax receipts',
      'NOC from society/association',
      'Identity and address proof',
      'Income proof',
      'Existing loan details (if any)',
      'Property valuation report'
    ],
    offerDetails: {
      interestRate: '8.2% - 11% p.a.',
      maxLoanAmount: '70% of property value',
      processingFee: '1% to 2% of loan amount',
      tenure: 'Up to 15 years',
      prepaymentCharges: '2% after 3 years',
      propertyType: 'Residential and Commercial'
    }
  },

  'education-loan': {
    title: 'Education Loan',
    category: 'Finance',
    icon: 'GraduationCap',
    description: 'Financing for domestic and international education',
    overview: 'Education loans provide financial assistance to students pursuing higher education in India or abroad. These loans cover tuition fees, accommodation, books, travel, and other educational expenses, with repayment typically starting after course completion.',
    features: [
      'Covers tuition fees and living expenses',
      'Domestic and international education',
      'Moratorium period during course + 6 months',
      'Collateral-free up to ₹7.5 Lakhs',
      'Government subsidy schemes available',
      'Insurance coverage for student',
      'Forex services for international studies'
    ],
    benefits: [
      {
        title: 'Career Investment',
        description: 'Invest in quality education without financial constraints, building a foundation for successful career.'
      },
      {
        title: 'Tax Benefits',
        description: 'Interest paid on education loan is deductible under Section 80E with no upper limit.'
      },
      {
        title: 'Flexible Repayment',
        description: 'Repayment starts only after course completion with sufficient grace period.'
      },
      {
        title: 'Comprehensive Coverage',
        description: 'Covers all education-related expenses including tuition, hostel, books, and travel.'
      },
      {
        title: 'Build Credit History',
        description: 'Early start to building credit history through responsible loan repayment.'
      }
    ],
    eligibility: [
      'Student age: 16-35 years',
      'Admission: To recognized institution in India/abroad',
      'Academic record: Minimum 50% in previous qualification',
      'Co-applicant: Parent/guardian with regular income',
      'Course: Graduate/Post-graduate/Professional courses',
      'Institution accreditation: Recognized by competent authority'
    ],
    documents: [
      'Admission letter from institution',
      'Fee structure from institution',
      'Academic records (marksheets, certificates)',
      'KYC of student and co-applicant',
      'Income proof of co-applicant',
      'Course details and duration',
      'Collateral documents (if applicable)'
    ],
    offerDetails: {
      interestRate: '8% - 11% p.a.',
      maxLoanAmount: '₹1.5 Crores (with collateral)',
      processingFee: 'As per bank policy',
      tenure: 'Up to 15 years',
      moratorium: 'Course period + 6 months',
      collateral: 'Required above ₹7.5 Lakhs'
    }
  },

  'vehicle-loan': {
    title: 'Vehicle Loan',
    category: 'Finance',
    icon: 'Car',
    description: 'Financing for all types of vehicles including commercial vehicles',
    overview: 'Vehicle loans provide financing for purchasing various types of vehicles including cars, two-wheelers, commercial vehicles, construction equipment, and agricultural vehicles. These secured loans offer competitive rates with the vehicle serving as collateral.',
    features: [
      'Financing for all vehicle categories',
      'New and used vehicle options',
      'Loan up to 90% of vehicle value',
      'Quick approval with minimal documentation',
      'Insurance and RTO charges inclusion',
      'Balance transfer facility',
      'Flexible repayment options'
    ],
    benefits: [
      {
        title: 'Mobility Solution',
        description: 'Access personal or commercial mobility without large upfront investment.'
      },
      {
        title: 'Income Generation',
        description: 'Commercial vehicle loans enable business opportunities and income generation.'
      },
      {
        title: 'Tax Benefits',
        description: 'Business vehicles offer depreciation benefits and interest tax deductions.'
      },
      {
        title: 'Comprehensive Package',
        description: 'Single loan covering vehicle cost, insurance, registration, and accessories.'
      },
      {
        title: 'Quick Disbursal',
        description: 'Fast processing through dealer partnerships for immediate vehicle delivery.'
      }
    ],
    eligibility: [
      'Age: 21-65 years',
      'Income: Regular source (business/salary)',
      'Credit score: 600+ preferred',
      'Vehicle purpose: Personal/Commercial',
      'Residency: Indian citizen',
      'Driving license: Valid for vehicle category'
    ],
    documents: [
      'Identity and address proof',
      'Income proof (salary slips/business documents)',
      'Vehicle quotation/invoice',
      'Bank statements',
      'Passport photographs',
      'Existing vehicle details (for replacement)',
      'Business proof (for commercial vehicles)'
    ],
    offerDetails: {
      interestRate: '8.1% - 13% p.a.',
      maxLoanAmount: '₹1 Crore',
      processingFee: '0.5% to 2%',
      tenure: '1 to 7 years',
      margin: '10% to 25%',
      specialFeature: 'Step-up/Step-down EMI options'
    }
  },

  'loan-against-securities': {
    title: 'Loan Against Securities',
    category: 'Finance',
    icon: 'TrendingUp',
    description: 'Instant liquidity without selling your investments',
    overview: 'Loan Against Securities (LAS) allows investors to borrow money by pledging their existing investments like shares, mutual funds, bonds, or insurance policies as collateral. This provides immediate liquidity without selling investments, allowing them to benefit from future appreciation.',
    features: [
      'Pledge shares, mutual funds, bonds, insurance',
      'Quick disbursal within 24 hours',
      'Margin flexibility based on security type',
      'No prepayment charges',
      'Online pledging and tracking',
      'Partial release of securities',
      'Top-up facility available'
    ],
    benefits: [
      {
        title: 'Investment Continuity',
        description: 'Access funds without selling investments, allowing continued participation in market growth.'
      },
      {
        title: 'Lower Cost',
        description: 'Significantly lower interest rates compared to personal loans due to secured nature.'
      },
      {
        title: 'Quick Access',
        description: 'Rapid processing and disbursal for urgent financial needs.'
      },
      {
        title: 'Flexible Tenure',
        description: 'Choose tenure from 3 months to 3 years with option to renew.'
      },
      {
        title: 'Tax Efficient',
        description: 'Avoid capital gains tax that would apply if investments were sold.'
      }
    ],
    eligibility: [
      'Age: 21-65 years',
      'Investor type: Resident Indian',
      'Security holding: In demat form',
      'Credit profile: No adverse history',
      'Security quality: Approved securities list',
      'Margin maintenance: As per regulatory requirements'
    ],
    documents: [
      'Demat account statement',
      'KYC documents',
      'PAN card',
      'Bank account details',
      'Address proof',
      'Income proof (for higher amounts)',
      'Security holding details'
    ],
    offerDetails: {
      interestRate: '9% - 12% p.a.',
      maxLoanAmount: '₹5 Crores',
      margin: '25% to 50% depending on security',
      tenure: '3 months to 3 years',
      processingFee: '0.5% of loan amount',
      securityTypes: 'Shares, Mutual Funds, Bonds, Insurance Policies'
    }
  },

  // Protection Offers
  'life-insurance': {
    title: 'Life Insurance',
    category: 'Protection',
    icon: 'Heart',
    description: 'Financial security for your family\'s future',
    overview: 'Life insurance provides financial protection to your family in case of your untimely demise. It ensures that your loved ones can maintain their lifestyle, pay off debts, fund education, and meet other financial obligations even in your absence.',
    features: [
      'Sum assured from ₹10 Lakhs to ₹50 Crores',
      'Term, endowment, ULIP, and whole life plans',
      'Riders for critical illness, accident, disability',
      'Tax benefits under Section 80C and 10(10D)',
      'Online policy purchase and management',
      'Quick claim settlement process',
      'Flexible premium payment options'
    ],
    benefits: [
      {
        title: 'Family Financial Security',
        description: 'Ensure your family\'s financial stability and lifestyle maintenance in your absence.'
      },
      {
        title: 'Debt Protection',
        description: 'Cover outstanding loans and liabilities so family doesn\'t inherit financial burdens.'
      },
      {
        title: 'Education Funding',
        description: 'Secure children\'s education expenses regardless of what happens to the earning member.'
      },
      {
        title: 'Retirement Planning',
        description: 'Certain plans offer savings and investment components for retirement corpus.'
      },
      {
        title: 'Tax Efficiency',
        description: 'Premium payments and maturity benefits offer significant tax advantages.'
      }
    ],
    eligibility: [
      'Age: 18-65 years (entry age)',
      'Coverage up to: 85-100 years depending on plan',
      'Medical examination: Required for higher sums',
      'Occupation: Most professions eligible',
      'Residency: Indian residents and NRIs',
      'Sum assured: Based on income and needs'
    ],
    documents: [
      'Identity proof (PAN, Aadhaar)',
      'Address proof',
      'Age proof (Birth certificate, Passport)',
      'Income proof (for higher coverage)',
      'Medical reports (if applicable)',
      'Passport size photographs',
      'Bank account details'
    ],
    offerDetails: {
      coverage: '₹10 Lakhs to ₹50 Crores',
      policyTerm: '10 to 40 years',
      premiumPayment: 'Yearly/Half-yearly/Quarterly/Monthly',
      claimSettlementRatio: '96%+',
      freeLookPeriod: '15-30 days',
      specialFeature: 'Return of premium options available'
    }
  },

  'health-insurance': {
    title: 'Health Insurance',
    category: 'Protection',
    icon: 'Heart',
    description: 'Comprehensive medical coverage for you and your family',
    overview: 'Health insurance provides financial coverage for medical expenses incurred due to illnesses, accidents, or hospitalization. It protects your savings from unexpected medical costs and ensures access to quality healthcare without financial stress.',
    features: [
      'Sum insured from ₹3 Lakhs to ₹2 Crores',
      'Individual, family floater, and senior citizen plans',
      'Cashless hospitalization network',
      'Pre and post hospitalization coverage',
      'Day care procedures coverage',
      'Annual health check-ups',
      'Restoration of sum insured'
    ],
    benefits: [
      {
        title: 'Financial Protection',
        description: 'Shield your savings from high medical costs and hospitalization expenses.'
      },
      {
        title: 'Cashless Treatment',
        description: 'Access network hospitals without upfront payment for covered treatments.'
      },
      {
        title: 'Preventive Care',
        description: 'Regular health check-ups to detect issues early and maintain wellness.'
      },
      {
        title: 'Tax Benefits',
        description: 'Premium payments deductible under Section 80D up to ₹25,000/₹50,000.'
      },
      {
        title: 'Lifetime Renewability',
        description: 'Continue coverage throughout life with guaranteed renewability feature.'
      }
    ],
    eligibility: [
      'Age: From 91 days to 65 years (entry)',
      'Family coverage: Spouse, children, parents',
      'Pre-existing conditions: Covered after waiting period',
      'Occupation: Most professions covered',
      'Residency: Indian residents',
      'Medical history: Declaration required'
    ],
    documents: [
      'KYC documents',
      'Age proof',
      'Medical history declaration',
      'Bank account details',
      'Existing policy details (if porting)',
      'Nominee details',
      'Photographs'
    ],
    offerDetails: {
      sumInsured: '₹3 Lakhs to ₹2 Crores',
      roomRent: 'Single/Shared private AC room',
      coPayment: '0% to 20% based on age and plan',
      waitingPeriod: '30 days for illness, 2-4 years for specific conditions',
      networkHospitals: '5000+ across India',
      specialFeature: 'No claim bonus up to 100%'
    }
  },

  'motor-insurance': {
    title: 'Motor Insurance',
    category: 'Protection',
    icon: 'Car',
    description: 'Comprehensive protection for your vehicles',
    overview: 'Motor insurance provides financial protection against damages to your vehicle, third-party liabilities, and personal injuries arising from accidents. It\'s mandatory by law and essential for responsible vehicle ownership.',
    features: [
      'Comprehensive and third-party policies',
      'Own damage and theft coverage',
      'Third-party liability coverage',
      'Personal accident cover',
      'No claim bonus protection',
      '24x7 roadside assistance',
      'Cashless repair network'
    ],
    benefits: [
      {
        title: 'Legal Compliance',
        description: 'Fulfill legal requirement under Motor Vehicles Act for vehicle operation.'
      },
      {
        title: 'Financial Protection',
        description: 'Cover repair costs from accidents, natural calamities, theft, or fire.'
      },
      {
        title: 'Liability Coverage',
        description: 'Protect against financial liabilities from third-party injuries or property damage.'
      },
      {
        title: 'Personal Safety',
        description: 'Personal accident cover for owner-driver and passengers.'
      },
      {
        title: 'Value Preservation',
        description: 'Maintain vehicle value through proper repairs and covered damages.'
      }
    ],
    eligibility: [
      'Vehicle type: Two-wheeler, Private Car, Commercial Vehicle',
      'Vehicle age: New and used vehicles',
      'Registration: Valid RC book',
      'Owner: Individual or company',
      'Usage: Personal or commercial',
      'Location: Registered in India'
    ],
    documents: [
      'Vehicle RC book',
      'Previous policy (for renewal)',
      'Owner KYC documents',
      'Vehicle purchase invoice (for new)',
      'Valid pollution certificate',
      'Vehicle photographs (sometimes)'
    ],
    offerDetails: {
      policyType: 'Comprehensive/Third-party',
      IDV: 'Insured Declared Value based on age',
      addOns: 'Zero depreciation, Engine protect, etc.',
      claimProcess: 'Cashless at network garages',
      noClaimBonus: '20% to 50% discount',
      specialFeature: 'Instant policy issuance online'
    }
  },

  'fire-insurance': {
    title: 'fire Insurance',
    category: 'Protection',
    icon: 'Home',
    description: 'Protection for your home and property assets',
    overview: 'Property insurance protects residential or commercial properties against risks like fire, natural calamities, theft, and other perils. It covers the structure, contents, and sometimes liability arising from property ownership.',
    features: [
      'Building and contents coverage',
      'Fire and allied perils protection',
      'Burglary and theft coverage',
      'Natural calamities coverage',
      'Alternative accommodation costs',
      'Third-party liability',
      'Electronic equipment coverage'
    ],
    benefits: [
      {
        title: 'Asset Protection',
        description: 'Safeguard your valuable property investment from unexpected damages.'
      },
      {
        title: 'Financial Security',
        description: 'Avoid major financial loss from rebuilding or repairing damaged property.'
      },
      {
        title: 'Contents Coverage',
        description: 'Protect furniture, appliances, and personal belongings within the property.'
      },
      {
        title: 'Liability Protection',
        description: 'Cover legal liabilities arising from property ownership (e.g., visitor injuries).'
      },
      {
        title: 'Peace of Mind',
        description: 'Secure your home or business premises against unforeseen events.'
      }
    ],
    eligibility: [
      'Property type: Residential/Commercial',
      'Construction: Pucca construction',
      'Property age: Usually up to 30 years',
      'Location: In approved areas',
      'Ownership: Clear title',
      'Usage: Owner-occupied or rented'
    ],
    documents: [
      'Property ownership documents',
      'Property valuation report',
      'Construction details',
      'Property photographs',
      'Previous policy (if renewal)',
      'KYC of property owner',
      'Inventory of contents (if covered)'
    ],
    offerDetails: {
      coverage: 'Reinstatement value or market value',
      perilsCovered: 'Fire, Lightning, Earthquake, Flood, etc.',
      sumInsured: 'Based on property value',
      policyPeriod: '1 year typically',
      claimProcess: 'Surveyor assessment',
      specialFeature: 'Home loan protection available'
    }
  },

  'travel-insurance': {
    title: 'Travel Insurance',
    category: 'Protection',
    icon: 'Globe',
    description: 'Comprehensive coverage for domestic and international travel',
    overview: 'Travel insurance provides coverage for unexpected events during travel including medical emergencies, trip cancellation, lost baggage, flight delays, and personal liabilities. It\'s essential for stress-free travel, especially internationally.',
    features: [
      'Medical emergency coverage abroad',
      'Trip cancellation/interruption',
      'Lost/delayed baggage coverage',
      'Flight delay compensation',
      'Personal accident cover',
      'Emergency evacuation',
      '24/7 travel assistance'
    ],
    benefits: [
      {
        title: 'Medical Protection Abroad',
        description: 'Access quality healthcare in foreign countries without worrying about high costs.'
      },
      {
        title: 'Trip Investment Protection',
        description: 'Recover non-refundable expenses if trip is cancelled due to covered reasons.'
      },
      {
        title: 'Baggage Security',
        description: 'Compensation for lost, stolen, or delayed baggage and personal effects.'
      },
      {
        title: 'Travel Assistance',
        description: '24/7 helpline for emergency cash, document replacement, legal assistance.'
      },
      {
        title: 'Flight Convenience',
        description: 'Compensation for flight delays, missed connections, and itinerary changes.'
      }
    ],
    eligibility: [
      'Traveler age: Usually 6 months to 70 years',
      'Trip duration: Up to 180 days typically',
      'Destination: Domestic and international',
      'Travel purpose: Leisure, business, study',
      'Residency: Indian passport holders',
      'Health: Generally healthy travelers'
    ],
    documents: [
      'Passport copy',
      'Travel itinerary',
      'Visa documents (if applicable)',
      'Ticket details',
      'Age proof',
      'Trip cost details',
      'Existing medical conditions declaration'
    ],
    offerDetails: {
      medicalCoverage: '$50,000 to $500,000',
      tripDuration: 'Up to 180 days',
      policyType: 'Single trip/Multi-trip/Student',
      claimProcess: 'Online/document submission',
      assistanceServices: 'Medical, Travel, Legal',
      specialFeature: 'Adventure sports coverage available'
    }
  },

  'cattle-insurance': {
    title: 'Cattle Insurance',
    category: 'Protection',
    icon: 'Heart',
    description: 'Protection for livestock and dairy animals',
    overview: 'Cattle insurance provides financial protection to farmers and dairy owners against loss of cattle due to death from accident, disease, or surgical operations. It supports the agricultural economy by securing valuable livestock assets.',
    features: [
      'Coverage for cows, buffaloes, bulls',
      'Death due to accident or disease',
      'Permanent disability due to accident',
      'Surgical operations coverage',
      'Theft coverage (with conditions)',
      'Transportation risks',
      'Epidemic diseases coverage'
    ],
    benefits: [
      {
        title: 'Asset Protection',
        description: 'Secure valuable livestock assets that are crucial for income and livelihood.'
      },
      {
        title: 'Financial Stability',
        description: 'Receive compensation to replace cattle or recover from financial loss.'
      },
      {
        title: 'Risk Management',
        description: 'Manage risks associated with cattle rearing and dairy farming.'
      },
      {
        title: 'Credit Enhancement',
        description: 'Insured cattle can serve as better collateral for agricultural loans.'
      },
      {
        title: 'Sustainable Farming',
        description: 'Encourage sustainable farming practices with risk protection.'
      }
    ],
    eligibility: [
      'Animal type: Cows, Buffaloes, Bulls',
      'Animal age: Usually 2 to 10 years',
      'Health: Certified healthy by veterinarian',
      'Identification: Proper identification marks',
      'Purpose: Milch, drought, breeding',
      'Ownership: Clear ownership proof'
    ],
    documents: [
      'Animal identification details',
      'Veterinary health certificate',
      'Age proof of animal',
      'Ownership proof',
      'Purchase invoice (if recent)',
      'Breed certificate (if pure breed)',
      'Photographs of animal'
    ],
    offerDetails: {
      sumInsured: 'Market value of animal',
      policyTerm: '1 year typically',
      premiumRate: '2% to 5% of sum insured',
      waitingPeriod: '15 days for diseases',
      claimProcess: 'Veterinary certificate required',
      specialFeature: 'Government subsidy available in some states'
    }
  },

  'marine-insurance': {
    title: 'Marine Insurance',
    category: 'Protection',
    icon: 'Globe',
    description: 'Protection for cargo and vessels during transit',
    overview: 'Marine insurance provides coverage for goods, cargo, and vessels during transit by sea, air, or land. It protects against losses due to perils of the sea, accidents, theft, and other risks during transportation.',
    features: [
      'Cargo insurance for imports/exports',
      'Hull insurance for vessels',
      'Transit by sea, air, road, rail',
      'Warehouse to warehouse coverage',
      'War and strike risks coverage',
      'General average contributions',
      'Salvage and sue & labor costs'
    ],
    benefits: [
      {
        title: 'Goods Protection',
        description: 'Secure cargo value against damage, loss, or theft during transit.'
      },
      {
        title: 'International Trade Security',
        description: 'Essential for import/export businesses to manage transportation risks.'
      },
      {
        title: 'Vessel Protection',
        description: 'Cover ships, boats, and other vessels against maritime perils.'
      },
      {
        title: 'Liability Coverage',
        description: 'Protect against third-party liabilities arising from maritime operations.'
      },
      {
        title: 'Business Continuity',
        description: 'Ensure business operations continue despite transit losses.'
      }
    ],
    eligibility: [
      'Cargo type: General, refrigerated, hazardous',
      'Transit mode: Sea, Air, Road, Rail',
      'Trade: Import, Export, Coastal',
      'Vessels: Ships, Boats, Barges',
      'Goods ownership: Clear ownership',
      'Route: Declared transit route'
    ],
    documents: [
      'Bill of Lading/Airway Bill',
      'Commercial invoice',
      'Packing list',
      'Shipping details',
      'Cargo details and value',
      'Vessel particulars (for hull)',
      'Route and transit details'
    ],
    offerDetails: {
      coverage: 'Institute Cargo Clauses A/B/C',
      sumInsured: 'CIF value plus 10%',
      policyType: 'Voyage/Time/Open policies',
      claimProcess: 'Surveyor assessment',
      specialConditions: 'As per trade terms',
      specialFeature: 'Container insurance available'
    }
  },

  'loan-protector-plan': {
    title: 'Loan Protector Plan',
    category: 'Protection',
    icon: 'ShieldCheck',
    description: 'Secure your family against outstanding loan liabilities',
    overview: 'A Loan Protector Plan is a specialized insurance policy designed to cover your outstanding loan balance in the event of the borrower’s untimely demise, disability, or critical illness. It ensures that your family retains ownership of assets (like a home or car) without the burden of debt repayment.',
    features: [
      'Decreasing Sum Assured (matches your reducing loan balance)',
      'Coverage for Home, Personal, Car, and Business loans',
      'Single premium or limited pay options',
      'Joint life coverage available for co-borrowers',
      'Coverage for Accidental Total Permanent Disability',
      'Critical Illness add-on options',
      'Tax benefits under Section 80C'
    ],
    benefits: [
      {
        title: 'Asset Protection',
        description: 'Prevents the bank from seizing your home or asset if the borrower is no longer there.'
      },
      {
        title: 'Financial Independence',
        description: 'Ensures your family or legal heirs are not burdened with EMIs during a crisis.'
      },
      {
        title: 'Comprehensive Security',
        description: 'Covers not just death, but also disability and terminal illnesses.'
      },
      {
        title: 'Peace of Mind',
        description: 'The insurance tenure and cover amount are perfectly synced with your loan schedule.'
      },
      {
        title: 'One-Time Premium',
        description: 'Can be added to the loan amount itself so you don’t feel the upfront cost.'
      }
    ],
    eligibility: [
      'Age at Entry: 18 - 65 years',
      'Maximum Maturity Age: 70 - 75 years',
      'Loan Status: New loan or existing outstanding loan',
      'Nationality: Resident Indian',
      'Loan Types: Home, Education, LAP, or Business loans',
      'Employment: Salaried and Self-employed individuals'
    ],
    documents: [
      'Loan Sanction Letter or Account Statement',
      'Identity Proof (Aadhaar / PAN Card)',
      'Income Proof (Salary slips or ITR)',
      'Address Proof (Electricity bill / Passport)',
      'Age Proof (Birth certificate / 10th Marksheet)',
      'Medical Reports (Depending on age and sum assured)'
    ],
    offerDetails: {
      sumInsured: 'Up to 100% of Loan Amount',
      tenure: '1 to 30 years (matches loan term)',
      premiumType: 'Single / Regular / Limited Pay',
      disabilityCover: 'Included in comprehensive plans',
      claimRatio: 'Provider specific',
      specialFeature: 'Surrender value available for single premium'
    }
  },

  'group-medi-claim-cover': {
    title: 'Group Medi-Claim Cover',
    category: 'Protection',
    icon: 'Users',
    description: 'Corporate health insurance for employees',
    overview: 'Group Mediclaim policies provide health insurance coverage to employees of an organization as a group. These policies offer comprehensive health coverage at competitive rates and are often provided as an employee benefit.',
    features: [
      'Coverage for employees and dependents',
      'Sum insured from ₹2-10 Lakhs per member',
      'Cashless hospitalization',
      'Maternity coverage options',
      'Pre-existing disease coverage',
      'Day care procedures',
      'Annual health check-ups'
    ],
    benefits: [
      {
        title: 'Employee Welfare',
        description: 'Enhance employee satisfaction and retention with health security.'
      },
      {
        title: 'Cost Effective',
        description: 'Lower premiums compared to individual policies due to group discount.'
      },
      {
        title: 'Tax Benefits',
        description: 'Premium paid by employer is tax-deductible business expense.'
      },
      {
        title: 'Customizable Plans',
        description: 'Tailor coverage, sum insured, and features based on organization needs.'
      },
      {
        title: 'Administrative Ease',
        description: 'Single policy management for entire employee group.'
      }
    ],
    eligibility: [
      'Organization type: Company, NGO, Institution',
      'Group size: Minimum 10-20 employees',
      'Employee age: Typically 18-65 years',
      'Service period: Often minimum 3-6 months',
      'Dependents: Spouse, children, parents',
      'Location: Operations in India'
    ],
    documents: [
      'Organization registration certificate',
      'Employee list with details',
      'Previous policy details (if renewal)',
      'Bank details of organization',
      'Employee age and relationship proof',
      'Organization financials (for larger groups)'
    ],
    offerDetails: {
      sumInsured: '₹2-10 Lakhs per member',
      floaterOption: 'Family floater available',
      maternityCover: 'Optional with waiting period',
      preExistingDiseases: 'Covered after waiting period',
      claimRatio: 'Group specific',
      specialFeature: 'Top-up covers available'
    }
  },

  'group-personal-accident-cover': {
    title: 'Group Personal Accident Cover',
    category: 'Protection',
    icon: 'Shield',
    description: 'Accident protection for employee groups',
    overview: 'Group Personal Accident insurance provides financial protection to employees against accidental death, disability, or injury. It\'s often provided by employers as part of employee benefits package.',
    features: [
      'Accidental death coverage',
      'Permanent total/partial disability',
      'Temporary total disability benefits',
      'Medical expenses reimbursement',
      'Education fund for children',
      'Repatriation of mortal remains',
      'Optional covers for specific risks'
    ],
    benefits: [
      {
        title: 'Financial Security',
        description: 'Provide financial support to employees/families in case of accidents.'
      },
      {
        title: 'Employee Morale',
        description: 'Boost employee confidence and loyalty with accident protection.'
      },
      {
        title: 'Cost Effective',
        description: 'Group policies offer better coverage at lower premiums.'
      },
      {
        title: 'Comprehensive Protection',
        description: 'Cover various accident scenarios and their financial consequences.'
      },
      {
        title: 'Flexible Coverage',
        description: 'Customize coverage amounts based on employee grades/roles.'
      }
    ],
    eligibility: [
      'Organization: Registered entity',
      'Group size: Minimum 10 employees',
      'Employee age: 18-70 years typically',
      'Employment: Active full-time employees',
      'Occupation: Based on risk category',
      'Geographic coverage: Worldwide/India'
    ],
    documents: [
      'Organization registration proof',
      'Employee list with age and designation',
      'Bank details of organization',
      'Previous policy details (if any)',
      'Risk assessment details',
      'Employee salary details (for graded benefits)'
    ],
    offerDetails: {
      sumInsured: 'Multiples of annual salary',
      coverageScope: '24x7 worldwide coverage',
      benefitTypes: 'Death, Disability, Medical',
      premiumRate: 'Based on occupation risk',
      claimProcess: 'Simple documentation',
      specialFeature: 'Graded benefits by employee level'
    }
  },

  'worker-compensation-insurance': {
    title: 'Worker Compensation Insurance',
    category: 'Protection',
    icon: 'Users',
    description: 'Statutory coverage for employee work-related injuries',
    overview: 'Worker Compensation Insurance (Employer\'s Liability Insurance) provides coverage for employers against legal liabilities arising from work-related injuries, illnesses, or deaths of employees as per the Workmen\'s Compensation Act.',
    features: [
      'Death compensation to dependents',
      'Permanent total/partial disability',
      'Temporary disability benefits',
      'Medical treatment expenses',
      'Legal liability protection',
      'Occupational disease coverage',
      'Extended coverage options'
    ],
    benefits: [
      {
        title: 'Legal Compliance',
        description: 'Meet statutory requirements under Workmen\'s Compensation Act.'
      },
      {
        title: 'Financial Protection',
        description: 'Protect business from substantial compensation claims and legal costs.'
      },
      {
        title: 'Employee Welfare',
        description: 'Ensure employees receive proper compensation for work-related injuries.'
      },
      {
        title: 'Business Continuity',
        description: 'Avoid financial strain from unexpected compensation payouts.'
      },
      {
        title: 'Risk Management',
        description: 'Transfer occupational risk to insurance company.'
      }
    ],
    eligibility: [
      'Employer type: Any entity employing workers',
      'Employee types: Manual, clerical, supervisors',
      'Industry: Manufacturing, Construction, Services',
      'Location: Operations in India',
      'Number of employees: Minimum 1',
      'Compliance: As per state regulations'
    ],
    documents: [
      'Business registration certificate',
      'Employee wage register',
      'Nature of business operations',
      'Previous claims history',
      'Risk assessment report',
      'Compliance certificates',
      'Employee count and details'
    ],
    offerDetails: {
      coverageBasis: 'As per WC Act calculations',
      policyLimit: 'Based on employee wages',
      premiumCalculation: 'Based on payroll and risk',
      claimProcess: 'As per statutory requirements',
      legalCoverage: 'Employer\'s liability',
      specialFeature: 'Add-on for common law liability'
    }
  },

  'corporate-insurance': {
    title: 'Corporate General Insurance',
    category: 'Protection',
    icon: 'Building',
    description: 'Comprehensive insurance package for businesses',
    overview: 'Corporate General Insurance is a packaged policy that combines various insurance covers needed by businesses into a single policy. It typically includes property, liability, business interruption, and other covers tailored to specific industries.',
    features: [
      'Property damage coverage',
      'Business interruption insurance',
      'Public liability coverage',
      'Product liability insurance',
      'Money insurance',
      'Electronic equipment insurance',
      'Fidelity guarantee coverage'
    ],
    benefits: [
      {
        title: 'Comprehensive Protection',
        description: 'Single policy covering multiple business risks.'
      },
      {
        title: 'Cost Effective',
        description: 'Better pricing compared to buying separate policies.'
      },
      {
        title: 'Administrative Ease',
        description: 'Single renewal, premium payment, and claim process.'
      },
      {
        title: 'Customizable',
        description: 'Tailor coverage based on specific business risks.'
      },
      {
        title: 'Risk Management',
        description: 'Holistic approach to managing business risks.'
      }
    ],
    eligibility: [
      'Business type: Various industries',
      'Turnover: Small to large businesses',
      'Location: Operations in India',
      'Asset ownership: Owned/leased premises',
      'Compliance: Legal business entity',
      'Risk profile: Based on industry'
    ],
    documents: [
      'Business registration documents',
      'Financial statements',
      'Asset details and values',
      'Previous insurance history',
      'Risk assessment details',
      'Business operations description',
      'Employee and turnover details'
    ],
    offerDetails: {
      policyType: 'Package policy for businesses',
      coverage: 'Customized per business needs',
      sumInsured: 'Based on asset values and risks',
      premium: 'Package discount available',
      claimProcess: 'Single point of contact',
      specialFeature: 'Industry-specific packages'
    }
  },

  // Investment Offers
  'mutual-funds': {
    title: 'Mutual Funds',
    category: 'Investment',
    icon: 'TrendingUp',
    description: 'Professional fund management for wealth creation',
    overview: 'Mutual funds pool money from multiple investors to invest in diversified portfolios of stocks, bonds, or other securities. They offer professional management, diversification, and liquidity for investors with varying risk appetites and financial goals.',
    features: [
      'Equity, debt, hybrid, and solution-oriented funds',
      'Systematic Investment Plans (SIP)',
      'Systematic Transfer Plans (STP)',
      'Systematic Withdrawal Plans (SWP)',
      'Direct and regular plan options',
      'Online investment and tracking',
      'Tax-saving ELSS funds'
    ],
    benefits: [
      {
        title: 'Professional Management',
        description: 'Expert fund managers make investment decisions based on research and market analysis.'
      },
      {
        title: 'Diversification',
        description: 'Spread risk across multiple securities and sectors with even small investments.'
      },
      {
        title: 'Liquidity',
        description: 'Easy entry and exit with daily NAV-based redemption (except close-ended funds).'
      },
      {
        title: 'Tax Efficiency',
        description: 'ELSS funds offer tax deductions under Section 80C with 3-year lock-in.'
      },
      {
        title: 'Systematic Investing',
        description: 'SIP allows disciplined investing with rupee cost averaging benefit.'
      }
    ],
    eligibility: [
      'Investor type: Individuals, HUFs, Companies',
      'Age: Minors through guardians, Adults',
      'KYC: Completed KYC mandatory',
      'Residency: Resident Indians, NRIs, PIOs',
      'Bank account: Indian bank account required',
      'PAN: Mandatory for investments'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Bank account proof',
      'Address proof',
      'Passport size photograph',
      'Cancelled cheque',
      'KYC application form'
    ],
    offerDetails: {
      investmentOptions: 'Lump sum, SIP, STP, SWP',
      minimumInvestment: '₹500 for SIP, ₹1000+ for lump sum',
      expenseRatio: '0.5% to 2.5% typically',
      exitLoad: '0% to 2% based on holding period',
      returnsPotential: 'Market-linked returns',
      specialFeature: 'SIP starting from ₹100 per month'
    }
  },

  'wealth-management': {
    title: 'Wealth Management',
    category: 'Investment',
    icon: 'Briefcase',
    description: 'Personalized investment solutions for high net-worth individuals',
    overview: 'Wealth management provides comprehensive financial planning and investment management services for high net-worth individuals. It includes investment advisory, portfolio management, estate planning, tax planning, and retirement planning.',
    features: [
      'Personalized financial planning',
      'Portfolio management services',
      'Tax optimization strategies',
      'Estate and succession planning',
      'Retirement planning',
      'Insurance planning',
      'Regular portfolio reviews'
    ],
    benefits: [
      {
        title: 'Holistic Planning',
        description: 'Integrated approach covering all aspects of financial life and goals.'
      },
      {
        title: 'Expert Guidance',
        description: 'Access to experienced wealth managers and financial planners.'
      },
      {
        title: 'Customized Solutions',
        description: 'Tailored investment strategies based on individual risk profile and goals.'
      },
      {
        title: 'Tax Efficiency',
        description: 'Structured investments to optimize tax liabilities and enhance returns.'
      },
      {
        title: 'Time Saving',
        description: 'Professional management frees up time for other pursuits.'
      }
    ],
    eligibility: [
      'Investor category: HNI, Ultra HNI',
      'Investment corpus: Typically ₹50 Lakhs+',
      'Income level: High income individuals',
      'Financial goals: Long-term wealth creation',
      'Risk appetite: Based on profile',
      'Residency: Indian residents and NRIs'
    ],
    documents: [
      'KYC documents',
      'Income proof',
      'Existing investment portfolio',
      'Financial goals statement',
      'Risk profile assessment',
      'Tax returns',
      'Bank and demat statements'
    ],
    offerDetails: {
      serviceModel: 'Fee-based or commission-based',
      minimumCorpus: '₹25 Lakhs to ₹1 Crore',
      reporting: 'Monthly/Quarterly portfolio statements',
      advisoryTeam: 'Dedicated relationship manager',
      investmentOptions: 'Equities, Bonds, Real Estate, Alternatives',
      specialFeature: 'Family office services available'
    }
  },

  'pension-funds': {
    title: 'Pension Funds',
    category: 'Investment',
    icon: 'Users',
    description: 'Retirement planning for secure golden years',
    overview: 'Pension funds or retirement plans help individuals accumulate corpus for post-retirement life through systematic savings and investments. They offer tax benefits during accumulation phase and provide regular income during retirement.',
    features: [
      'National Pension System (NPS)',
      'Annuity plans',
      'Pension mutual funds',
      'Retirement benefit funds',
      'Systematic withdrawal options',
      'Tax benefits under 80CCD',
      'Flexible contribution options'
    ],
    benefits: [
      {
        title: 'Retirement Security',
        description: 'Build substantial retirement corpus through disciplined long-term investing.'
      },
      {
        title: 'Tax Advantages',
        description: 'Additional ₹50,000 deduction under Section 80CCD(1B) for NPS beyond 80C limit.'
      },
      {
        title: 'Regular Income',
        description: 'Systematic withdrawal or annuity options for post-retirement regular income.'
      },
      {
        title: 'Professional Management',
        description: 'Pension fund managers with expertise in long-term retirement planning.'
      },
      {
        title: 'Portability',
        description: 'NPS is portable across jobs and locations throughout working life.'
      }
    ],
    eligibility: [
      'Age: 18-65 years for NPS opening',
      'Residency: Indian citizens (Resident/NRI)',
      'Employment: Salaried, Self-employed, Professionals',
      'Retirement age: Up to 75 years for NPS',
      'KYC: Completed KYC required',
      'Bank account: Indian bank account'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Address proof',
      'Bank account proof',
      'Passport size photograph',
      'Cancelled cheque',
      'KYC application form'
    ],
    offerDetails: {
      investmentOptions: 'Active choice or Auto choice',
      assetClasses: 'Equity, Corporate Bonds, Government Securities',
      minimumContribution: '₹500 per year for NPS',
      taxBenefits: 'E-E-T (Exempt-Exempt-Taxable)',
      withdrawalRules: '40% lump sum, 60% annuity at 60',
      specialFeature: 'Tier II account with flexibility'
    }
  },

  'stock-securities': {
    title: 'Stock & Securities',
    category: 'Investment',
    icon: 'TrendingUp',
    description: 'Direct equity investment for wealth creation',
    overview: 'Stock market investing involves buying shares of publicly listed companies to participate in their growth and profitability. It offers potential for high returns but comes with market volatility and requires research and risk management.',
    features: [
      'Equity shares trading',
      'IPO applications',
      'F&O trading',
      'Currency and commodity derivatives',
      'Research and advisory services',
      'Online trading platforms',
      'Margin trading facilities'
    ],
    benefits: [
      {
        title: 'High Return Potential',
        description: 'Equities historically offer highest returns among asset classes over long term.'
      },
      {
        title: 'Ownership Stake',
        description: 'Become part-owner of companies and benefit from their growth.'
      },
      {
        title: 'Liquidity',
        description: 'Easy buying and selling on stock exchanges during market hours.'
      },
      {
        title: 'Dividend Income',
        description: 'Receive regular dividend payments from profitable companies.'
      },
      {
        title: 'Tax Efficiency',
        description: 'Long-term capital gains tax benefits for holdings over 1 year.'
      }
    ],
    eligibility: [
      'Age: 18+ years (minors through guardians)',
      'Demat account: Required for equity trading',
      'Trading account: With registered broker',
      'Bank account: Linked to trading account',
      'PAN: Mandatory for securities market',
      'KYC: Completed with broker and depository'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Address proof',
      'Bank account proof',
      'Passport size photographs',
      'Income proof (for certain segments)',
      'Cancelled cheque'
    ],
    offerDetails: {
      brokerageCharges: 'Per trade or percentage based',
      accountTypes: 'Delivery, Intraday, F&O',
      tradingPlatform: 'Web, Mobile, Terminal',
      researchSupport: 'Fundamental and technical',
      marginFacility: 'Based on eligibility',
      specialFeature: 'Algorithmic trading options'
    }
  },

  'demat-account': {
    title: 'Demat Account',
    category: 'Investment',
    icon: 'FileText',
    description: 'Electronic holding of securities for trading and investment',
    overview: 'Demat (Dematerialized) account is an electronic account that holds securities like shares, bonds, mutual funds, and government securities in digital format. It\'s mandatory for trading in Indian stock markets and offers secure, convenient holding of investments.',
    features: [
      'Electronic holding of securities',
      'Single account for multiple securities',
      'Easy transfer and pledging',
      'Consolidated account statement',
      'Nomination facility',
      'Online access and management',
      'Safe and secure storage'
    ],
    benefits: [
      {
        title: 'Safety',
        description: 'Eliminates risks of physical certificates like loss, theft, or damage.'
      },
      {
        title: 'Convenience',
        description: 'Easy and instant transfer of securities without paperwork.'
      },
      {
        title: 'Cost Effective',
        description: 'Reduces transaction costs compared to physical certificates.'
      },
      {
        title: 'Transparency',
        description: 'Clear records of holdings and transactions with regular statements.'
      },
      {
        title: 'Quick Settlement',
        description: 'Faster settlement cycle (T+1) for stock market transactions.'
      }
    ],
    eligibility: [
      'Age: 18+ years (minors through guardians)',
      'Residency: Indian residents, NRIs, PIOs',
      'PAN: Mandatory for account opening',
      'Bank account: Required for transactions',
      'KYC: Completed KYC documentation',
      'Broker association: For trading account linkage'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Address proof',
      'Passport size photographs',
      'Bank account proof',
      'Income proof (for certain segments)',
      'Cancelled cheque'
    ],
    offerDetails: {
      accountCharges: 'Annual maintenance charges apply',
      depository: 'NSDL or CDSL',
      statementFrequency: 'Monthly/Quarterly/On demand',
      services: 'Holding, Transfer, Pledging',
      onlineAccess: 'Web and mobile platforms',
      specialFeature: 'Free account opening offers available'
    }
  },

  'real-estate-investments': {
    title: 'Real Estate Investments',
    category: 'Investment',
    icon: 'Home',
    description: 'Tangible property investments for wealth creation',
    overview: 'Real estate investment involves purchasing properties for capital appreciation, rental income, or both. It includes residential, commercial, industrial, and land investments, offering tangible assets with potential for steady returns and tax benefits.',
    features: [
      'Residential property investment',
      'Commercial property investment',
      'REITs (Real Estate Investment Trusts)',
      'Real estate mutual funds',
      'Land banking',
      'Property development projects',
      'Rental yield optimization'
    ],
    benefits: [
      {
        title: 'Tangible Asset',
        description: 'Physical property that can be used, improved, or developed.'
      },
      {
        title: 'Rental Income',
        description: 'Regular cash flow from property leasing.'
      },
      {
        title: 'Capital Appreciation',
        description: 'Property values typically increase over long term.'
      },
      {
        title: 'Inflation Hedge',
        description: 'Real estate often appreciates faster than inflation.'
      },
      {
        title: 'Leverage',
        description: 'Ability to finance purchases with mortgage loans.'
      }
    ],
    eligibility: [
      'Investor type: Individuals, Companies, Funds',
      'Investment capacity: Based on property value',
      'Location: Properties in approved areas',
      'Legal status: Clear title properties',
      'Financing: Home loan eligibility',
      'Residency: Indian residents and NRIs'
    ],
    documents: [
      'Identity and address proof',
      'Income proof',
      'Property documents',
      'Legal due diligence reports',
      'Financial capacity proof',
      'Tax returns',
      'Bank statements'
    ],
    offerDetails: {
      investmentOptions: 'Direct, REITs, Funds',
      minimumInvestment: 'Varies by property type',
      holdingPeriod: 'Typically 3-10 years',
      returns: 'Rental yield + Capital appreciation',
      taxBenefits: 'As per property investment rules',
      specialFeature: 'NRI investment options available'
    }
  },

  'portfolio-management-service': {
    title: 'Portfolio Management Service',
    category: 'Investment',
    icon: 'Briefcase',
    description: 'Customized portfolio management for discerning investors',
    overview: 'Portfolio Management Services (PMS) offer personalized investment management for high net-worth individuals with dedicated portfolio managers creating and managing customized portfolios based on individual objectives and risk profiles.',
    features: [
      'Customized portfolio construction',
      'Active portfolio management',
      'Regular performance reviews',
      'Risk management strategies',
      'Tax planning integration',
      'Direct equity investments',
      'Alternative investments access'
    ],
    benefits: [
      {
        title: 'Personalized Strategy',
        description: 'Tailored investment approach based on individual goals and constraints.'
      },
      {
        title: 'Professional Management',
        description: 'Experienced portfolio managers with proven track records.'
      },
      {
        title: 'Direct Ownership',
        description: 'Direct holding of securities in investor\'s name.'
      },
      {
        title: 'Active Management',
        description: 'Proactive portfolio adjustments based on market opportunities.'
      },
      {
        title: 'Transparent Reporting',
        description: 'Detailed portfolio statements and performance reports.'
      }
    ],
    eligibility: [
      'Investment corpus: Minimum ₹25-50 Lakhs',
      'Investor type: HNI, Institutional',
      'Risk appetite: As per investment policy',
      'Investment horizon: Typically long-term',
      'KYC: Complete documentation',
      'Residency: Indian residents and NRIs'
    ],
    documents: [
      'KYC documents',
      'Income proof',
      'Risk profile assessment',
      'Investment objective statement',
      'Existing portfolio details',
      'Bank and demat details',
      'Tax returns'
    ],
    offerDetails: {
      minimumInvestment: '₹25 Lakhs to ₹1 Crore',
      feeStructure: 'Fixed fee or performance-based',
      reporting: 'Monthly detailed statements',
      investmentApproach: 'Growth, Income, Balanced',
      assetClasses: 'Equities, Bonds, Alternatives',
      specialFeature: 'Discretionary/Non-discretionary options'
    }
  },

  'alternative-investment-fund': {
    title: 'Alternative Investment Fund',
    category: 'Investment',
    icon: 'TrendingUp',
    description: 'Sophisticated investments beyond traditional assets',
    overview: 'Alternative Investment Funds (AIFs) are privately pooled investment vehicles that invest in non-traditional assets like private equity, venture capital, hedge funds, real estate, distressed assets, and other alternative assets for sophisticated investors.',
    features: [
      'Category I, II, III AIFs',
      'Private equity investments',
      'Venture capital funding',
      'Hedge fund strategies',
      'Real estate funds',
      'Distressed asset funds',
      'Infrastructure funds'
    ],
    benefits: [
      {
        title: 'Diversification',
        description: 'Access to asset classes not available through traditional investments.'
      },
      {
        title: 'High Return Potential',
        description: 'Opportunity for superior returns through specialized strategies.'
      },
      {
        title: 'Professional Expertise',
        description: 'Managed by specialists in specific alternative asset classes.'
      },
      {
        title: 'Low Correlation',
        description: 'Often low correlation with traditional markets, reducing portfolio risk.'
      },
      {
        title: 'Innovative Strategies',
        description: 'Access to sophisticated investment approaches and opportunities.'
      }
    ],
    eligibility: [
      'Investor category: Sophisticated/HNI investors',
      'Minimum investment: ₹1 Crore typically',
      'Investor type: Individuals, Institutions',
      'Risk appetite: High risk tolerance',
      'Investment horizon: Long-term (5-10 years)',
      'Wealth level: High net-worth individuals'
    ],
    documents: [
      'KYC documents',
      'Financial capacity proof',
      'Risk acknowledgement',
      'Wealth certificates',
      'Investment experience declaration',
      'Tax returns',
      'Bank statements'
    ],
    offerDetails: {
      categories: 'I (Social impact), II (PE/Real estate), III (Hedge funds)',
      minimumInvestment: '₹1 Crore per investor',
      lockInPeriod: 'Typically 3-10 years',
      feeStructure: 'Management fee + Performance fee',
      regulatoryFramework: 'SEBI registered AIF',
      specialFeature: 'Opportunity for exceptional returns'
    }
  },

  'fixed-deposit': {
    title: 'Fixed Deposit',
    category: 'Investment',
    icon: 'Banknote',
    description: 'Safe and guaranteed returns on savings',
    overview: 'Fixed Deposits (FDs) are investment instruments offered by banks and financial institutions where investors deposit a lump sum for a fixed period at a predetermined interest rate. They offer capital protection and guaranteed returns, making them popular for risk-averse investors.',
    features: [
      'Fixed interest rates',
      'Flexible tenure options',
      'Quarterly/monthly interest payout',
      'Cumulative and non-cumulative options',
      'Loan against FD facility',
      'Auto-renewal option',
      'Senior citizen higher rates'
    ],
    benefits: [
      {
        title: 'Capital Protection',
        description: 'Principal amount is safe and returns are guaranteed.'
      },
      {
        title: 'Predictable Returns',
        description: 'Fixed interest rate ensures known returns at maturity.'
      },
      {
        title: 'Liquidity',
        description: 'Premature withdrawal available (with penalty) for emergency needs.'
      },
      {
        title: 'Loan Facility',
        description: 'Borrow against FD without breaking the deposit.'
      },
      {
        title: 'Tax Planning',
        description: '5-year tax-saving FDs eligible for Section 80C deduction.'
      }
    ],
    eligibility: [
      'Age: Minors through guardians, Adults',
      'Account: Savings account with bank',
      'Minimum deposit: ₹1,000 to ₹10,000',
      'Residency: Resident Indians, NRIs',
      'Entity type: Individuals, HUFs, Companies',
      'KYC: Completed with bank'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Address proof',
      'Passport size photograph',
      'Bank account details',
      'KYC form',
      'Nomination form'
    ],
    offerDetails: {
      tenure: '7 days to 10 years',
      interestRate: '3% to 7.5% based on tenure',
      minimumAmount: '₹1,000 to ₹10,000',
      taxSavingFD: '5-year lock-in for 80C benefit',
      prematureWithdrawal: 'Allowed with penalty',
      specialFeature: 'Senior citizen extra 0.5% interest'
    }
  },

  'bonds': {
    title: 'Bonds',
    category: 'Investment',
    icon: 'FileText',
    description: 'Fixed income investments for steady returns',
    overview: 'Bonds are debt instruments where investors lend money to entities (government or corporations) in exchange for periodic interest payments and return of principal at maturity. They offer predictable income and are generally lower risk than equities.',
    features: [
      'Government securities',
      'Corporate bonds',
      'Tax-free bonds',
      'Convertible bonds',
      'Debentures',
      'Bond funds',
      'Sovereign gold bonds'
    ],
    benefits: [
      {
        title: 'Regular Income',
        description: 'Fixed interest payments (coupon) at regular intervals.'
      },
      {
        title: 'Capital Preservation',
        description: 'Return of principal at maturity (subject to issuer credit risk).'
      },
      {
        title: 'Lower Volatility',
        description: 'Generally less price fluctuation compared to equities.'
      },
      {
        title: 'Tax Benefits',
        description: 'Tax-free bonds provide tax-free interest income.'
      },
      {
        title: 'Portfolio Diversification',
        description: 'Balance equity risk with fixed income component.'
      }
    ],
    eligibility: [
      'Investor type: Individuals, Institutions',
      'Demat account: Required for most bonds',
      'KYC: Completed KYC',
      'Residency: Based on bond type',
      'Minimum investment: Varies by bond issue',
      'PAN: Mandatory for investment'
    ],
    documents: [
      'PAN card',
      'Demat account details',
      'Bank account proof',
      'KYC documents',
      'Application form',
      'Cancelled cheque',
      'Income proof (for some bonds)'
    ],
    offerDetails: {
      types: 'Government, Corporate, Tax-free, SGB',
      tenure: '1 year to 20+ years',
      yield: '6% to 9% based on credit rating',
      creditRatings: 'AAA to below investment grade',
      liquidity: 'Secondary market trading',
      specialFeature: 'Sovereign Gold Bonds with gold appreciation benefit'
    }
  },

  'tax-consultancy': {
    title: 'Tax Consultancy',
    category: 'Investment',
    icon: 'FileText',
    description: 'Expert tax planning and compliance services',
    overview: 'Tax consultancy services provide expert guidance on tax planning, compliance, and optimization for individuals and businesses. Services include tax return filing, tax planning strategies, audit representation, and advice on tax-efficient investments.',
    features: [
      'Income tax return filing',
      'Tax planning and optimization',
      'Tax audit assistance',
      'International taxation',
      'Transfer pricing',
      'GST compliance',
      'Tax litigation support'
    ],
    benefits: [
      {
        title: 'Tax Savings',
        description: 'Identify legitimate deductions and exemptions to minimize tax liability.'
      },
      {
        title: 'Compliance Assurance',
        description: 'Ensure timely and accurate filing to avoid penalties and notices.'
      },
      {
        title: 'Expert Guidance',
        description: 'Access to qualified tax professionals with up-to-date knowledge.'
      },
      {
        title: 'Risk Management',
        description: 'Minimize audit risks through proper documentation and compliance.'
      },
      {
        title: 'Time Saving',
        description: 'Free up time by outsourcing complex tax matters to experts.'
      }
    ],
    eligibility: [
      'Client type: Individuals, Businesses, NRIs',
      'Income level: All income levels',
      'Entity type: Various legal structures',
      'Residency: Indian residents and NRIs',
      'Compliance needs: Based on complexity',
      'Documentation: Complete financial records'
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Bank statements',
      'Investment proofs',
      'Form 16/26AS',
      'Business financials',
      'Previous tax returns'
    ],
    offerDetails: {
      serviceScope: 'Planning, Compliance, Advisory',
      pricingModel: 'Fixed fee or hourly charges',
      turnaroundTime: 'Based on complexity',
      support: 'Year-round tax advisory',
      expertiseAreas: 'Individual, Corporate, International',
      specialFeature: 'Digital tax filing with expert review'
    }
  },

  'unlisted-shares': {
    title: 'Unlisted Shares',
    category: 'Investment',
    icon: 'TrendingUp',
    description: 'Pre-IPO investment opportunities in growing companies',
    overview: 'Unlisted shares represent ownership in private companies not listed on stock exchanges. These investments offer opportunity to invest in promising companies before they go public, potentially generating significant returns if the company succeeds and eventually IPOs.',
    features: [
      'Pre-IPO company investments',
      'Startup equity participation',
      'Private company shares',
      'ESOP purchases',
      'Secondary market transactions',
      'Due diligence services',
      'Exit planning assistance'
    ],
    benefits: [
      {
        title: 'High Growth Potential',
        description: 'Opportunity to invest in high-growth companies before public listing.'
      },
      {
        title: 'Early Entry Advantage',
        description: 'Lower entry valuations compared to post-IPO prices.'
      },
      {
        title: 'Portfolio Diversification',
        description: 'Add private market exposure to traditional public market portfolio.'
      },
      {
        title: 'Strategic Opportunities',
        description: 'Potential for significant returns if company succeeds or gets acquired.'
      },
      {
        title: 'Informed Investing',
        description: 'Access to detailed company information through due diligence.'
      }
    ],
    eligibility: [
      'Investor category: Accredited/Sophisticated investors',
      'Investment capacity: Typically high minimums',
      'Risk appetite: High risk tolerance',
      'Investment horizon: Long-term (3-7 years)',
      'Knowledge level: Understanding of private markets',
      'Wealth level: High net-worth individuals'
    ],
    documents: [
      'KYC documents',
      'Financial capacity proof',
      'Risk acknowledgement',
      'Wealth certificates',
      'Investment experience declaration',
      'Tax returns',
      'Bank statements'
    ],
    offerDetails: {
      investmentStage: 'Early, Growth, Pre-IPO',
      minimumInvestment: '₹10 Lakhs to ₹1 Crore+',
      holdingPeriod: 'Typically 3-7 years',
      exitOptions: 'IPO, Trade sale, Buyback',
      dueDiligence: 'Comprehensive company analysis',
      specialFeature: 'Access to curated deal flow'
    }
  }
};

// Helper function to get all offer keys
export const getAllOfferKeys = (): string[] => {
  return Object.keys(offerData);
};

// Helper function to get offer by key
export const getOfferByKey = (key: string): Offer | null => {
  return offerData[key] || null;
};