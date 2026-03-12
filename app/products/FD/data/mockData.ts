export interface BankTenure {
    rate: string;
    senior: string;
}

export interface Bank {
    name: string;
    logo: string;
    tenures: {
        short: BankTenure;
        medium: BankTenure;
        long: BankTenure;
        mega: BankTenure;
    };
    specialRate?: string;
}

export interface BankCategory {
    category: string;
    banks: Bank[];
}

export const bankData: BankCategory[] = [
    {
        category: "Public Sector Banks",
        banks: [
            {
                name: "SBI",
                logo: "https://www.sbi.co.in/documents/16012/1123512/sbi-logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "6.80%", senior: "7.30%" },
                    long: { rate: "6.75%", senior: "7.25%" },
                    mega: { rate: "6.50%", senior: "7.00%" }
                },
                specialRate: "7.10% (Amrit Vrishti 444 Days)"
            },
            {
                name: "Bank of Baroda",
                logo: "https://www.bankofbaroda.in/-/media/project/bob/mainweb/logos/logo.png",
                tenures: {
                    short: { rate: "5.75%", senior: "6.25%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "6.50%", senior: "7.15%" },
                    mega: { rate: "6.25%", senior: "7.25%" }
                },
                specialRate: "7.75% (399 Days)"
            },
            {
                name: "Punjab National Bank",
                logo: "https://www.pnbindia.in/images/logo.png",
                tenures: {
                    short: { rate: "5.80%", senior: "6.30%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "6.50%", senior: "7.30%" },
                    mega: { rate: "6.50%", senior: "7.30%" }
                },
                specialRate: "7.80% (444 Days)"
            },
            {
                name: "Canara Bank",
                logo: "https://canarabank.com/media/canara-bank-logo.png",
                tenures: {
                    short: { rate: "6.25%", senior: "6.75%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "6.80%", senior: "7.30%" },
                    mega: { rate: "6.70%", senior: "7.20%" }
                },
                specialRate: "7.90% (444 Days)"
            },
            {
                name: "Bank of Maharashtra",
                logo: "https://www.bankofmaharashtra.in/images/logo.png",
                tenures: {
                    short: { rate: "5.00%", senior: "5.50%" },
                    medium: { rate: "7.10%", senior: "7.60%" },
                    long: { rate: "6.25%", senior: "6.75%" },
                    mega: { rate: "6.00%", senior: "6.50%" }
                },
                specialRate: "7.50% (200 Days)"
            },
            {
                name: "Indian Bank",
                logo: "https://www.indianbank.in/wp-content/themes/indianbank/images/logo.png",
                tenures: {
                    short: { rate: "5.25%", senior: "5.75%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "6.10%", senior: "6.60%" },
                    mega: { rate: "6.00%", senior: "6.50%" }
                },
                specialRate: "7.70% (300 Days)"
            },
            {
                name: "Union Bank of India",
                logo: "https://www.unionbankofindia.co.in/images/logo.png",
                tenures: {
                    short: { rate: "5.90%", senior: "6.40%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "7.00%", senior: "7.50%" },
                    mega: { rate: "7.00%", senior: "7.50%" }
                },
                specialRate: "7.75% (399 Days)"
            },
            {
                name: "Bank of India",
                logo: "https://www.bankofindia.co.in/images/logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.25%", senior: "7.75%" },
                    long: { rate: "7.00%", senior: "7.50%" },
                    mega: { rate: "6.75%", senior: "7.25%" }
                },
                specialRate: "7.75% (666 Days)"
            },
        ]
    },
    {
        category: "Private Sector Banks",
        banks: [
            {
                name: "HDFC Bank",
                logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/652f7584-6028-4f81-9b7e-c5ee779fdfa7/Footer/Logo/HDFCBank_Logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "6.50%", senior: "7.00%" },
                    long: { rate: "6.50%", senior: "7.00%" },
                    mega: { rate: "6.50%", senior: "7.00%" }
                },
                specialRate: "7.00% (55 months)"
            },
            {
                name: "ICICI Bank",
                logo: "https://www.icicibank.com/content/dam/icicibank/india/assets/images/header/logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.10%", senior: "7.60%" },
                    long: { rate: "7.00%", senior: "7.50%" },
                    mega: { rate: "7.00%", senior: "7.50%" }
                },
                specialRate: "7.25% (15 months)"
            },
            {
                name: "Axis Bank",
                logo: "https://www.axisbank.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.10%", senior: "7.60%" },
                    long: { rate: "7.10%", senior: "7.60%" },
                    mega: { rate: "7.00%", senior: "7.75%" }
                },
                specialRate: "7.75% (Tax-saving FDs)"
            },
            {
                name: "YES Bank",
                logo: "https://www.yesbank.in/assets/images/logo.png",
                tenures: {
                    short: { rate: "6.25%", senior: "6.75%" },
                    medium: { rate: "7.75%", senior: "8.25%" },
                    long: { rate: "7.25%", senior: "8.00%" },
                    mega: { rate: "7.00%", senior: "7.75%" }
                },
                specialRate: "8.25% (18 months)"
            },
            {
                name: "Federal Bank",
                logo: "https://www.federalbank.co.in/assets/images/logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.40%", senior: "7.90%" },
                    long: { rate: "7.00%", senior: "7.50%" },
                    mega: { rate: "6.60%", senior: "7.10%" }
                },
                specialRate: "7.90% (777 Days)"
            },
            {
                name: "Kotak Mahindra Bank",
                logo: "https://www.kotak.com/content/dam/Kotak/kotak-logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.25%", senior: "7.80%" },
                    long: { rate: "7.00%", senior: "7.60%" },
                    mega: { rate: "6.25%", senior: "6.75%" }
                },
                specialRate: "7.80% (23 months)"
            },
            {
                name: "IndusInd Bank",
                logo: "https://www.indusind.com/content/dam/indusind/logo.png",
                tenures: {
                    short: { rate: "6.75%", senior: "7.25%" },
                    medium: { rate: "7.75%", senior: "8.25%" },
                    long: { rate: "7.50%", senior: "8.00%" },
                    mega: { rate: "7.00%", senior: "7.50%" }
                },
                specialRate: "8.25% (1 year 7 months)"
            },
            {
                name: "IDFC First Bank",
                logo: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/logo.svg",
                tenures: {
                    short: { rate: "6.50%", senior: "7.00%" },
                    medium: { rate: "8.00%", senior: "8.50%" },
                    long: { rate: "7.25%", senior: "7.75%" },
                    mega: { rate: "7.00%", senior: "7.50%" }
                },
                specialRate: "8.25% (500 Days)"
            },
            {
                name: "RBL Bank",
                logo: "https://www.rblbank.com/assets/images/rbl-bank-logo.png",
                tenures: {
                    short: { rate: "6.50%", senior: "7.00%" },
                    medium: { rate: "8.10%", senior: "8.60%" },
                    long: { rate: "7.50%", senior: "8.00%" },
                    mega: { rate: "7.25%", senior: "7.75%" }
                },
                specialRate: "8.60% (Senior Citizen)"
            },
            {
                name: "Bandhan Bank",
                logo: "https://www.bandhanbank.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "6.00%", senior: "6.50%" },
                    medium: { rate: "7.85%", senior: "8.35%" },
                    long: { rate: "7.25%", senior: "7.75%" },
                    mega: { rate: "7.00%", senior: "7.50%" }
                },
                specialRate: "8.35% (Senior Citizen)"
            }
        ]
    },
    {
        category: "Small Finance Banks",
        banks: [
            {
                name: "AU Small Finance Bank",
                logo: "https://www.aubank.in/assets/images/au-logo.png",
                tenures: {
                    short: { rate: "6.75%", senior: "7.25%" },
                    medium: { rate: "8.00%", senior: "8.50%" },
                    long: { rate: "7.25%", senior: "7.75%" },
                    mega: { rate: "7.25%", senior: "7.75%" }
                },
                specialRate: "8.50% (711 Days Special)"
            },
            {
                name: "Equitas Small Finance",
                logo: "https://www.equitasbank.com/sites/default/files/equitas-logo.png",
                tenures: {
                    short: { rate: "7.25%", senior: "7.75%" },
                    medium: { rate: "8.50%", senior: "9.00%" },
                    long: { rate: "7.50%", senior: "8.00%" },
                    mega: { rate: "7.25%", senior: "7.75%" }
                },
                specialRate: "8.80% (888 Days Special)"
            },
            {
                name: "Jana Small Finance",
                logo: "https://www.janabank.com/assets/images/jana-logo.png",
                tenures: {
                    short: { rate: "7.25%", senior: "7.75%" },
                    medium: { rate: "8.50%", senior: "9.00%" },
                    long: { rate: "7.75%", senior: "8.25%" },
                    mega: { rate: "7.25%", senior: "7.75%" }
                },
                specialRate: "9.00% (1 Year Special)"
            },
            {
                name: "Suryoday Small Finance",
                logo: "https://www.suryodaybank.com/assets/images/suryoday-logo.png",
                tenures: {
                    short: { rate: "7.50%", senior: "8.00%" },
                    medium: { rate: "8.65%", senior: "9.15%" },
                    long: { rate: "8.00%", senior: "8.50%" },
                    mega: { rate: "7.50%", senior: "8.00%" }
                },
                specialRate: "9.15% (Senior Citizen)"
            },
            {
                name: "Ujjivan Small Finance",
                logo: "https://www.ujjivansfb.in/assets/images/ujjivan-logo.png",
                tenures: {
                    short: { rate: "7.50%", senior: "8.00%" },
                    medium: { rate: "8.50%", senior: "9.00%" },
                    long: { rate: "7.50%", senior: "8.00%" },
                    mega: { rate: "7.25%", senior: "7.75%" }
                },
                specialRate: "8.75% (560 Days Special)"
            },
            {
                name: "Utkarsh Small Finance",
                logo: "https://www.utkarsh.bank/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.00%", senior: "7.50%" },
                    medium: { rate: "8.50%", senior: "9.10%" },
                    long: { rate: "7.85%", senior: "8.45%" },
                    mega: { rate: "7.50%", senior: "8.10%" }
                },
                specialRate: "9.10% (Senior Citizen)"
            },
            {
                name: "Fincare Small Finance",
                logo: "https://fincarebank.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.15%", senior: "7.65%" },
                    medium: { rate: "8.50%", senior: "9.11%" },
                    long: { rate: "8.00%", senior: "8.60%" },
                    mega: { rate: "7.50%", senior: "8.10%" }
                },
                specialRate: "9.11% (Senior Citizen)"
            }
        ]
    },
    {
        category: "NBFCs",
        banks: [
            {
                name: "Bajaj Finance",
                logo: "https://www.bajajfinserv.in/logos/bajaj-finance-logo.png",
                tenures: {
                    short: { rate: "7.40%", senior: "7.65%" },
                    medium: { rate: "8.10%", senior: "8.35%" },
                    long: { rate: "8.10%", senior: "8.35%" },
                    mega: { rate: "8.10%", senior: "8.35%" }
                },
                specialRate: "8.85% (33 Months Special)"
            },
            {
                name: "Shriram Finance",
                logo: "https://www.shriramfinance.in/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.80%", senior: "8.30%" },
                    medium: { rate: "8.60%", senior: "9.10%" },
                    long: { rate: "8.60%", senior: "9.10%" },
                    mega: { rate: "8.60%", senior: "9.10%" }
                },
                specialRate: "9.10% (Mahila/Senior Citizen)"
            },
            {
                name: "PNB Housing Finance",
                logo: "https://www.pnbhousing.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.25%", senior: "7.50%" },
                    medium: { rate: "7.85%", senior: "8.10%" },
                    long: { rate: "7.40%", senior: "7.65%" },
                    mega: { rate: "7.25%", senior: "7.50%" }
                },
                specialRate: "8.30% (Special Tenure)"
            },
            {
                name: "Mahindra Finance",
                logo: "https://www.mahindrafinance.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.50%", senior: "7.75%" },
                    medium: { rate: "8.25%", senior: "8.50%" },
                    long: { rate: "8.25%", senior: "8.50%" },
                    mega: { rate: "8.05%", senior: "8.30%" }
                },
                specialRate: "8.55% (40 Months Special)"
            },
            {
                name: "Sundaram Finance",
                logo: "https://www.sundaramfinance.in/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.15%", senior: "7.65%" },
                    medium: { rate: "7.90%", senior: "8.40%" },
                    long: { rate: "7.90%", senior: "8.40%" },
                    mega: { rate: "7.75%", senior: "8.25%" }
                },
                specialRate: "8.40% (36 Months Special)"
            },
            {
                name: "LIC Housing Finance",
                logo: "https://www.lichousing.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.25%", senior: "7.50%" },
                    medium: { rate: "7.75%", senior: "8.00%" },
                    long: { rate: "7.75%", senior: "8.00%" },
                    mega: { rate: "7.75%", senior: "8.00%" }
                },
                specialRate: "7.85% (18 Months Special)"
            },
            {
                name: "Tata Capital",
                logo: "https://www.tatacapital.com/content/dam/tata-capital/logo/logo.png",
                tenures: {
                    short: { rate: "7.50%", senior: "7.75%" },
                    medium: { rate: "8.10%", senior: "8.35%" },
                    long: { rate: "8.25%", senior: "8.50%" },
                    mega: { rate: "8.00%", senior: "8.25%" }
                },
                specialRate: "8.75% (Senior Citizen)"
            },
            {
                name: "Muthoot Finance",
                logo: "https://www.muthootfinance.com/assets/images/logo.png",
                tenures: {
                    short: { rate: "7.25%", senior: "7.50%" },
                    medium: { rate: "8.00%", senior: "8.25%" },
                    long: { rate: "8.25%", senior: "8.50%" },
                    mega: { rate: "7.75%", senior: "8.00%" }
                },
                specialRate: "8.50% (High-Yield Special)"
            }
        ]
    }
];


export const faqs = [
    {
        question: "What is a Fixed Deposit (FD)?",
        answer: "A Fixed Deposit (FD) is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date."
    },
    {
        question: "How safe are my Fixed Deposits?",
        answer: "FDs in scheduled banks (Public & Private) are insured up to ₹5 Lakhs by the DICGC (a subsidiary of RBI). For NBFCs, safety depends on their credit rating (e.g., AAA, AA+). Public sector banks are considered the safest as they are backed by the government."
    },
    {
        question: "Is the interest earned on FD taxable?",
        answer: "Yes, interest earned on FDs is taxable as per your income tax slab. Banks deduct TDS at 10% if the interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year. You can submit Form 15G/15H to avoid TDS if your total income is below the taxable limit."
    },
    {
        question: "Can I withdraw money from my FD before maturity?",
        answer: "Yes, most FDs allow premature withdrawal, but they usually come with a penalty of 0.5% to 1% on the applicable interest rate. Some 'non-callable' FDs may not allow withdrawal before maturity."
    },
    {
        question: "What is the minimum and maximum amount I can deposit?",
        answer: "Most banks allow you to start an FD with as little as ₹1,000. There is no upper limit for deposits, although amounts above ₹2 Crores are usually classified as 'Bulk Deposits' and may have different interest rates."
    },
    {
        question: "Can I get a loan against my Fixed Deposit?",
        answer: "Yes, you can typically get a loan or overdraft of up to 90-95% of your FD value without breaking the deposit. This is a quick way to get liquidity while your FD continues to earn interest."
    },
    {
        question: "Who is eligible to open a Fixed Deposit?",
        answer: "Any resident individual (sole or joint), Hindu Undivided Family (HUF), minor (through a guardian), or senior citizen can open an FD. Many banks also allow partnership firms, companies, and trusts to invest in FDs."
    },
    {
        question: "What documents are required for opening an FD?",
        answer: "Standard KYC documents are required: 1. Identity Proof (Aadhar, PAN, Passport), 2. Address Proof (Utility bills, Voter ID), 3. Recent Photographs. Most banks now offer digital FD opening via Aadhar-based e-KYC."
    },
    {
        question: "What is the difference between Cumulative and Non-Cumulative FD?",
        answer: "In a Cumulative FD, interest is compounded and paid along with the principal at maturity. In a Non-Cumulative FD, interest is paid out at regular intervals (monthly, quarterly, or yearly), which is ideal for those seeking a regular income stream."
    }
];
