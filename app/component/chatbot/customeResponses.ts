// customeResponses.ts

interface CustomQuestion {
  keywords: string[];
  response: string;
  category: string;
}

interface CustomResponseConfig {
  questions: CustomQuestion[];
}

export const getCustomResponses = (): CustomResponseConfig => {
  return {
    questions: [
      // ==== BASIC CONVERSATION & GREETINGS ====
      {
        keywords: ["hi", "hello", "hey", "greetings", "hii", "helo"],
        response: "Hello! 👋 I'm **ANITA**. How can I assist you with your financial goals today?",
        category: "Conversational"
      },
      {
        keywords: ["how are you", "how are u", "hows it going", "how's it going"],
        response: "I'm doing great, thank you for asking! 😊 I'm powered up and ready to help you navigate loans, insurance, and investments. How are you doing today?",
        category: "Conversational"
      },
      {
        keywords: ["good morning"],
        response: "Good morning! ☀️ A great day to plan your financial future. How can I help you today?",
        category: "Conversational"
      },
      {
        keywords: ["good afternoon"],
        response: "Good afternoon! 🌤️ Hope your day is going well. Need any help with financial advice?",
        category: "Conversational"
      },
      {
        keywords: ["good evening"],
        response: "Good evening! 🌙 Reflecting on your financial goals? I'm here to help if you need anything.",
        category: "Conversational"
      },
      {
        keywords: ["thank you", "thanks", "thx", "tysm"],
        response: "You're very welcome! 😊 Is there anything else I can help you with regarding loans or investments?",
        category: "Conversational"
      },
      {
        keywords: ["bye", "goodbye", "see ya", "by"],
        response: "Goodbye! 👋 Have a financially secure day ahead. Feel free to return if you have more questions!",
        category: "Conversational"
      },
      {
        keywords: ["who made you", "who created you", "who is your developer"],
        response: "I was developed for **Infinity Arthvishva** to serve as your Automated Navigation and Interface Task Assistant (ANITA).",
        category: "Conversational"
      },

      // ==== CORE BUSINESS RESPONSES ====
      {
        keywords: ["who are you", "what is anita", "your name"],
        response: "I am **ANITA**, your **Automated Navigation and Interface Task Assistant**. I specialize in providing guidance on Loans, Investments, and Insurance for Infinity Arthvishva.",
        category: "General"
      },
      {
        keywords: ["infinity arthvishva", "about the company", "what is this company"],
        response: "**Infinity Arthvishva** is a premier financial consultancy firm and a one-stop financial advisory powerhouse. We believe your financial success is our true achievement. We offer end-to-end solutions in loans, investments, insurance, and wealth management, built on a foundation of trust, expertise, and innovation. We don't just manage finances; we build lasting relationships.",
        category: "Company"
      },

      // ==== LEADERSHIP TEAM ====
      {
        keywords: ['leadership', 'management team', 'all directors', 'founders', 'directors', 'company directors'],
        response: `👥 **Leadership Team**\n\n**Mr. Rajesh Parkhi - Executive Director**\n• **Experience**: 25+ years in retail finance\n• **Qualification**: MBA in Marketing\n• **Specialization**: Retail loan portfolio structuring, business expansion, operational efficiency\n• **Previous Experience**: Bajaj Group, HDFC, Mafatlal, ICICI Bank, Kotak Group, Citi Financial\n• **Current Role**: Director of Infinity Arthvishva Advisory Pvt. Ltd. & Arthvishva Finance Consultancy\n\n**Mr. Rahul Kangane - Chairman and Managing Director**\n• **Experience**: 15+ years in broking, wealth management, portfolio strategy\n• **Expertise**: Capital markets, analytical approach, performance-driven solutions\n• **Leadership Roles**: Infinity Arthvishva, Infinity Investment, Infinite Financial Services, Triumph\n\n**Mr. Pravin Marathe - Director**\n• **Experience**: 18+ years in Mutual Funds, PMS, AIFs, Unlisted Equity products\n• **Qualification**: Bachelor of Commerce from Pune University\n• **Expertise**: Financial product distribution, strategic business growth\n• **Focus**: Transparent, compliance-focused operations`,
        category: 'Leadership Team'
    },
      {
        keywords: ["rahul kangane", "rahul", "who is rahul kangane", "tell me about rahul kangane"],
        response: "**Mr. Rahul Kangane** is our **Chairman and Managing Director**. He brings 15 years of deep expertise in broking and wealth management. His sharp market insights and focus on portfolio strategy are the driving forces behind the company's growth and success.",
        category: "Leadership"
      },
      {
        keywords: ["rajesh parkhi", "rajesh", "who is rajesh parkhi", "tell me about rajesh parkhi"],
        response: "**Mr. Rajesh Parkhi** is our **Executive Director**. He has over 25 years of extensive experience in the retail finance sector and holds an MBA in Marketing. He is an expert in structuring retail loan portfolios and fostering sustainable business growth.",
        category: "Leadership"
      },
      {
        keywords: ["pravin marathe", "pravin","who is pravin marathe","tell me about pravin marathe"],
        response: "**Mr. Pravin Marathe** is a **Director** at Infinity Arthvishva. With over 18 years of experience in financial markets, he is known for his client-focused approach and strategic vision, specifically driving growth through Mutual Funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIFs).",
        category: "Leadership"
      },

      // ==== SERVICES: FINANCE & LOANS ====
      {
        keywords: ["loan", "finance", "borrow", "emi"],
        response: "We provide comprehensive loan solutions tailored to your needs:\n\n• **Residential:** Home Loans, Mortgage Loans (LAP).\n• **Business:** Business Loans, SME Loans, Loans Against Securities.\n• **Personal \u0026 Education:** Personal Loans, Education Loans.\n• **Vehicles:** Auto Loans, Vehicle Loans.\n\nOur goal is to provide the best interest rates and smooth processing for all your credit requirements.",
        category: "Finance"
      },

      // ==== SERVICES: PROTECTION & INSURANCE ====
      {
        keywords: ["insurance", "protection", "safe", "policy"],
        response: "Safeguard your future and assets with our wide range of insurance products:\n\n• **Personal:** Life Insurance, Health Insurance, Travel Insurance.\n• **Asset:** Motor Insurance, Property Insurance, Marine Insurance.\n• **Commercial:** Corporate General Insurance, Worker Compensation Insurance, Group Medi-Claim Cover, Group Personal Accident Cover.\n• **Specialized:** Cattle Insurance.",
        category: "Protection"
      },

      // ==== SERVICES: INVESTMENTS ====
      {
        keywords: ["investment", "invest", "wealth", "mutual fund", "stock"],
        response: "Grow your wealth strategically with our expert investment advisory:\n\n• **Market Instruments:** Mutual Funds, Stocks \u0026 Securities, Bonds, Unlisted Shares.\n• **Management:** Portfolio Management Service (PMS), Alternative Investment Fund (AIF), Wealth Management.\n• **Savings:** Fixed Deposits, Pension Funds.\n• **Real Estate:** Real Estate Investments.\n• **Services:** Demat Account opening, Tax Consultancy.",
        category: "Investment"
      },

      // ==== PARTNERSHIP & DSA ====
      {
        keywords: ["partner", "dsa", "become a partner", "join"],
        response: "Join our growing network! Infinity Arthvishva currently has **2600+ Active DSA Partners**. By partnering with us, you gain access to a nationwide platform, powerful financial tools, and expert support. We manage a total loan book of **500Cr+**. Click the 'Become A Partner' button on our header to start your journey!",
        category: "Partnership"
      },

      // ==== COMPANY DETAILS & LEGAL ====
      {
        keywords: ["gst", "cin", "registration", "tax number"],
        response: "Here are the official registration details for Infinity Arthvishva:\n\n• **GST Number:** 27AAICI0723K1ZJ\n• **CIN Number:** U66190PN2025PTC238981\n\nWe are a fully compliant and transparent financial advisory firm.",
        category: "Company"
      },
      {
        keywords: ["vision", "mission", "goal"],
        response: "Our vision is to seamlessly integrate advanced financial intelligence into everyday life—empowering families across India to achieve stability, growth, and prosperity through a strategic, long-term, and growth-oriented approach.",
        category: "Company"
      },

      // ==== CONTACT & LOCATIONS ====
      {
        keywords: ['Get In Touch', 'contact', 'contact us', 'phone', 'call', 'address', 'contact number', 'where is infinity arthvishva', 'location', 'located'],
        response: `We are here to help, contact us for a free consultation.
        Our Address
        1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016\n
        1800-532-7600
        info@infinityarthvishva.com\n\n`,
        category: 'Technology'
    },
    // ==== ACHIEVEMENTS & PRESENCE ====
      { keywords: ['Our Pan-India Presence', 'Pan-India', 'pan india', 'growth', 'presence'], 
        response: "Our Pan-India Presence\n\nWith branches across 20+ cities, Infinity Arthvishva is empowering clients nationwide through trusted financial solutions.\nPune (Main Branch)\nMumbai\nKolhapur & Sangli\nNashik\nChiplun\nRatnagiri\nSatara\nRaipur\nBaramati\nAssam\nWest Bengal\nChhatrapati Sambhajinagar\nNagpur\nYavatmal\nGurgaon\nAhilyanagar\nHyderabad\nIndore\nSurat\nLucknow", 
        category: 'Achievements'
       },
 {
      keywords: ['Our Branches', 'branches', 'total companies', 'companies'], 
      response: "Visit us at any of our conveniently located branches across India\n\nKanpur Branch\nOffice No. 01, Kamlist Tower\nBehind Mishra Jewellers, Near Joga Bhogha Chauraha\nNehru Nagar, Shuklaganj\nKanpur, Unnao, Uttar Pradesh - 209861\n\nNagpur Branch\nApartment No. 202, 2nd Floor\nSharda Enclave, Nagji Bhai Town\nBesides Platina Heart Institute, Sitabuldi\nNagpur, Maharashtra - 440012\n\nKolkata Branch\nPS Qube, Room No. 620, 6th Floor\nPlot No. IID/31/1, NewTown\nKolkata, West Bengal - 700135\n\nNashik Branch\n2064, 2nd Floor\nRoongta Shopping Hub\nNear Hotel Surya, Mumbai Agra Road, Indira Nagar\nNashik, Maharashtra - 422009\n\nKolhapur Branch\nYashonandan Plaza, 1st Floor\nShahupuri 3rd Lane\nNear Shubhash Photo\nKolhapur, Maharashtra - 416001\n\nChiplun Branch\nUnited Classic, 203/204, 2nd Floor\nNear Old S.T. Stand\nChiplun Bazarpeth\nChiplun, Maharashtra - 415605\n\nRatnagiri Branch\nS. No. A-4\nSoham Samarth Apartment, S.V. Road\nMaruti Mandir\nRatnagiri, Maharashtra - 415612",
      category: 'branches'
     },

      // ==== AWARDS & ACHIEVEMENTS ====
      {
        keywords: ["award", "achievement", "et business", "recognition"],
        response: "We are proud to share that Infinity Arthvishva is the **🏆 Winner at ET Business Awards 2025 – Pune**. This recognition highlights our commitment to excellence in the financial services sector.",
        category: "General"
      },

      // ==== ADDITIONAL TABS/TOOLS ====
      {
        keywords: ['Cibil Score', 'Score', 'cibil', 'Want to know about cibil score', 'how to know cibil score', 'give cibil score', 'check score'],
        response: `Free CIBIL Score Check\n
              Instantly check your CIBIL score and monitor your credit health. No hidden charges. No credit card required.\n
              Get free access to get your cibil score on the cibil page by adding your details
              **Score Ranges & Meaning**:
              • 750-900: Excellent (Best loan rates)
              • 700-749: Good (Favorable terms)
              • 650-699: Fair (Higher rates)
              • Below 650: Poor (Loan approval difficult)\n
              **How to Improve Credit Score**:
              1. Pay all EMIs on time
              2. Keep credit utilization below 30%
              3. Maintain healthy credit mix
              4. Avoid multiple loan inquiries\n
              **Free Check Options**: CIBIL, Experian, CRIF High Mark`,
        category: 'Cibil'
    },

      {
        keywords: ["calculator", "emi calculator", "sip calculator"],
        response: "Planning is the first step to success! We provide various financial calculators to help you estimate your Loan EMIs or Investment returns. You can access them via the 'Calculator' dropdown menu in our navigation bar.",
        category: "General"
      },
       { keywords: ['what do you do', 'services', 'financial distribution', 'differential', 'what services do you provide'], 
        response: "Comprehensive financial solutions under one roof\n\n**Finance:**\nComprehensive financial solutions under one roof\n✓Home Loan\n✓Personal Loan\n✓Business Loan\n✓SME Loan\n✓Auto Loan\n✓Mortgage Loan\n✓Education Loan\n✓Vehicle Loan\n✓Loan Against Securities\n\n**Protection**\nInsurance solutions to safeguard your future and assets.\n✓Life Insurance\n✓Health Insurance\n✓Motor Insurance\n✓Property Insurance\n✓Travel Insurance\n✓Cattle Insurance\n✓Marine Insurance\n✓Group Medi-Claim Cover\n✓Group Personal Accident Cover\n✓Worker Compensation Insurance\n✓Corporate General Insurance\n\n**Investment**\nStrategic investment options to grow your wealth.\n✓Mutual Funds\n✓Wealth Management\n✓Pension Funds\n✓Stock & Securities\n✓Demat Account\n✓Real Estate Investments\n✓Portfolio Management Service\n✓Alternative Investment Fund\n✓Fixed Deposit\n✓Bonds\n✓Tax Consultancy\n✓Unlisted Shares", 
        category: 'Services' },
        // =====  home loan =====
    {
        keywords: ['home loan', 'ROI of home loan', 'what is home loan', 'home', 'financial stability', 'roi of home loan'],
        response: `'A home loan is a secured loan offered by financial institutions to help individuals purchase, construct, or renovate a residential property. The property itself serves as collateral, allowing for lower interest rates and longer repayment tenures compared to unsecured loans.',
    Features: 
      'Interest rates starting from 8.5% p.a.',
      'Loan amount up to ₹10 Crores',
      'Flexible tenure up to 30 years',
      'Balance transfer facility available',
      'Top-up loan options for additional needs',
      'Pre-approved offers for existing customers',
      'Online application and tracking'onsistently`,
        category: 'home loan'
    },

    // =====  vehicle loan =====
    {
        keywords: ['vehicle loan', 'ROI of vehicle loan', 'what is vehicle loan', 'vehicle'],
        response: `'Vehicle loans provide financing for purchasing various types of vehicles including cars, two-wheelers, commercial vehicles, construction equipment, and agricultural vehicles. These secured loans offer competitive rates with the vehicle serving as collateral.',
    Features: 
      'Financing for all vehicle categories',
      'New and used vehicle options',
      'Loan up to 90% of vehicle value',
      'Quick approval with minimal documentation',
      'Insurance and RTO charges inclusion',
      'Balance transfer facility',
      'Flexible repayment options'`,
        category: 'vehicle loan'
    },

    // =====  personal loan =====
    {
        keywords: ['personal loan', 'ROI of personal loan', 'what is personal loan'],
        response: `'A personal loan is an unsecured loan that can be used for various personal expenses without requiring collateral. It offers quick disbursal and flexible usage for emergencies, celebrations, travel, medical expenses, debt consolidation, or home improvement.',
    Features: 
      'Loan amount up to ₹25 Lakhs',
      'Instant approval within 30 minutes for eligible applicants',
      'No collateral or security required',
      'Same-day disbursal for pre-approved customers',
      'Flexible repayment tenure from 1 to 5 years',
      'Completely digital application process',
      'Competitive interest rates'`,
        category: 'personal loan'
    },

    // =====  business loan =====
    {
        keywords: ['business loan', 'ROI of business loan', 'what is business loan', 'business'],
        response: `'Business loans provide capital for entrepreneurs and established businesses to expand operations, purchase equipment, increase inventory, or meet working capital requirements. These loans can be secured or unsecured, depending on the business profile and requirements.',
    features: 
      'Loan amount from ₹1 Lakh to ₹2 Crores',
      'Collateral-free loans available for eligible businesses',
      'Flexible repayment options aligned with cash flow',
      'Quick processing with minimal documentation',
      'Top-up facilities for existing borrowers',
      'Business advisory services included',
      'Online application and tracking portal'`,
        category: 'business loan'
    },

    // =====  SME loan =====
    {
        keywords: ['SME loan', 'ROI of SME loan', 'what is SME loan', 'payout', 'SME'],
        response: `'SME Loans are specifically designed financial products catering to the unique needs of Small and Medium Enterprises. These loans help SMEs manage working capital, purchase equipment, expand facilities, or adopt new technologies with customized repayment structures.',
    features: [
      'Collateral-free loans up to ₹50 Lakhs',
      'Customized repayment based on business cycles',
      'Quick sanction within 72 hours',
      'Minimal documentation requirements',
      'Government subsidy assistance available',
      'Business mentoring support',
      'Insurance coverage options'`,
        category: ' SME loan'
    },
    // =====  auto loan =====
    {
        keywords: ['auto loan', 'ROI of auto loan', 'what is auto loan', 'auto'],
        response: ` 'Auto loans provide financing for purchasing new or used cars, two-wheelers, commercial vehicles, or electric vehicles. These secured loans offer competitive interest rates with the vehicle itself serving as collateral, making vehicle ownership accessible with manageable EMIs.',
    Features: 
      'Financing for new and used vehicles',
      'Loan up to 100% of on-road price for select models',
      'Flexible tenure from 1 to 7 years',
      'Quick online approval process',
      'Insurance and accessories financing',
      'Balance transfer facility',
      'Pre-approved offers for existing customers'`,
        category: 'auto loan'
    },
    // =====  mortgage loan =====
    {
        keywords: ['mortgage loan', 'ROI of mortgage loan', 'what is mortgage loan', 'mortgage'],
        response: `'A mortgage loan allows property owners to borrow money by pledging their residential or commercial property as collateral. This secured loan offers lower interest rates compared to personal loans and higher loan amounts, making it ideal for large financial requirements.',
    Features: 
      'Loan against residential or commercial property',
      'High loan amount up to 70% of property value',
      'Long repayment tenure up to 15 years',
      'Flexible end-use - business or personal',
      'Balance transfer from existing loans',
      'Top-up facility on existing mortgage',
      'Online application and tracking'`,
        category: ' mortgage loan'
    },

    // =====  education loan =====
    {
        keywords: ['education loan', 'ROI of education loan', 'what is education loan'],
        response: `'Education loans provide financial assistance to students pursuing higher education in India or abroad. These loans cover tuition fees, accommodation, books, travel, and other educational expenses, with repayment typically starting after course completion.',
    Features: 
      'Covers tuition fees and living expenses',
      'Domestic and international education',
      'Moratorium period during course + 6 months',
      'Collateral-free up to ₹7.5 Lakhs',
      'Government subsidy schemes available',
      'Insurance coverage for student',
      'Forex services for international studies'`,
        category: 'education loan'
    },

    // =====  Loan Against Securities =====
    {
        keywords: ['Loan Against Securities', 'las', 'LAS', 'against securities', 'what is las', 'what is loan against property', 'roi of las',],
        response: `'Loan Against Securities (LAS) allows investors to borrow money by pledging their existing investments like shares, mutual funds, bonds, or insurance policies as collateral. This provides immediate liquidity without selling investments, allowing them to benefit from future appreciation.',
    Features: 
      'Pledge shares, mutual funds, bonds, insurance',
      'Quick disbursal within 24 hours',
      'Margin flexibility based on security type',
      'No prepayment charges',
      'Online pledging and tracking',
      'Partial release of securities',
      'Top-up facility available'`,
        category: 'Loan Against Securities'
    },
    // =====  protection =====
    {
        keywords: ['protection services', 'protection', 'only protection'],
        response: `Protection Services\n
        Insurance solutions to safeguard your future and assets.
        ✓Life Insurance
        ✓Health Insurance
        ✓Motor Insurance
        ✓Property Insurance
        ✓Travel Insurance
        ✓Cattle Insurance
        ✓Marine Insurance
        ✓Group Medi-Claim Cover
        ✓Group Personal Accident Cover
        ✓Worker Compensation Insurance
        ✓Corporate General Insurance\n`,
        category: 'protection'
    },
    // ===== Life Insurance =====
    {
        keywords: ['Life Insurance', 'what is life insurance', 'life insurance', ''],
        response: `'Life insurance provides financial protection to your family in case of your untimely demise. It ensures that your loved ones can maintain their lifestyle, pay off debts, fund education, and meet other financial obligations even in your absence.',
    Features: 
      'Sum assured from ₹10 Lakhs to ₹50 Crores',
      'Term, endowment, ULIP, and whole life plans',
      'Riders for critical illness, accident, disability',
      'Tax benefits under Section 80C and 10(10D)',
      'Online policy purchase and management',
      'Quick claim settlement process',
      'Flexible premium payment options'`,
        category: 'Life Insurance'
    },
    // =====  Health Insurance =====
    {
        keywords: ['Health Insurance', 'what is Health Insurance', 'health insurance', 'what is health insurance'],
        response: `'Health insurance provides financial coverage for medical expenses incurred due to illnesses, accidents, or hospitalization. It protects your savings from unexpected medical costs and ensures access to quality healthcare without financial stress.',
    Features: 
      'Sum insured from ₹3 Lakhs to ₹2 Crores',
      'Individual, family floater, and senior citizen plans',
      'Cashless hospitalization network',
      'Pre and post hospitalization coverage',
      'Day care procedures coverage',
      'Annual health check-ups',
      'Restoration of sum insured'`,
        category: 'Health Insurance'
    },
    // =====  Motor Insurance =====
    {
        keywords: ['Motor Insurance', 'what is Motor Insurance', 'motor insurance', 'what is motor insurance'],
        response: `'Motor insurance provides financial protection against damages to your vehicle, third-party liabilities, and personal injuries arising from accidents. It\'s mandatory by law and essential for responsible vehicle ownership.',
    Features: 
      'Comprehensive and third-party policies',
      'Own damage and theft coverage',
      'Third-party liability coverage',
      'Personal accident cover',
      'No claim bonus protection',
      '24x7 roadside assistance',
      'Cashless repair network'`,
        category: 'Motor Insurance'
    },
    // =====Travel Insurance =====
    {
        keywords: ['Travel Insurance', 'what is Travel Insurance', 'travel insurance', 'what is travel insurnace'],
        response: `'Travel insurance provides coverage for unexpected events during travel including medical emergencies, trip cancellation, lost baggage, flight delays, and personal liabilities. It\'s essential for stress-free travel, especially internationally.',
    Features: 
      'Medical emergency coverage abroad',
      'Trip cancellation/interruption',
      'Lost/delayed baggage coverage',
      'Flight delay compensation',
      'Personal accident cover',
      'Emergency evacuation',
      '24/7 travel assistance'`,
        category: 'Motor Insurance'
    },
    // =====  Cattle Insurance =====
    {
        keywords: ['Cattle Insurance', 'what is Cattle Insurance'],
        response: `'Cattle insurance provides financial protection to farmers and dairy owners against loss of cattle due to death from accident, disease, or surgical operations. It supports the agricultural economy by securing valuable livestock assets.',
    Features: 
      'Coverage for cows, buffaloes, bulls',
      'Death due to accident or disease',
      'Permanent disability due to accident',
      'Surgical operations coverage',
      'Theft coverage (with conditions)',
      'Transportation risks',
      'Epidemic diseases coverage'`,
        category: 'Cattle Insurance'
    },
    // ===== Marine Insurance =====
    {
        keywords: ['Marine Insurance', 'what is Marine Insurance'],
        response: `'Marine insurance provides coverage for goods, cargo, and vessels during transit by sea, air, or land. It protects against losses due to perils of the sea, accidents, theft, and other risks during transportation.',
    Features: 
      'Cargo insurance for imports/exports',
      'Hull insurance for vessels',
      'Transit by sea, air, road, rail',
      'Warehouse to warehouse coverage',
      'War and strike risks coverage',
      'General average contributions',
      'Salvage and sue & labor costs'`,
        category: 'Marine Insurance'
    },
    // ===== Property Insurance =====
    {
        keywords: ['Property Insurance', 'what is Property Insurance', 'what is property insurance', 'property insurance'],
        response: `'Property insurance protects residential or commercial properties against risks like fire, natural calamities, theft, and other perils. It covers the structure, contents, and sometimes liability arising from property ownership.',
    Features: 
      'Building and contents coverage',
      'Fire and allied perils protection',
      'Burglary and theft coverage',
      'Natural calamities coverage',
      'Alternative accommodation costs',
      'Third-party liability',
      'Electronic equipment coverage'`,
        category: 'Property Insurance'
    },
    // =====  Group Medi-Claim Cover =====
    {
        keywords: ['Group Medi-Claim Cover', 'what is Group Medi-Claim Cover'],
        response: `'Group Mediclaim policies provide health insurance coverage to employees of an organization as a group. These policies offer comprehensive health coverage at competitive rates and are often provided as an employee benefit.',
    Features: 
      'Coverage for employees and dependents',
      'Sum insured from ₹2-10 Lakhs per member',
      'Cashless hospitalization',
      'Maternity coverage options',
      'Pre-existing disease coverage',
      'Day care procedures',
      'Annual health check-ups'`,
        category: ' Group Medi-Claim Cover'
    },
    // =====  Group Personal Accident Cover =====
    {
        keywords: ['Group Personal Accident Cover', 'what is Group Personal Accident Cover',],
        response: `'Group Personal Accident insurance provides financial protection to employees against accidental death, disability, or injury. It\'s often provided by employers as part of employee benefits package.',
    Features: 
      'Accidental death coverage',
      'Permanent total/partial disability',
      'Temporary total disability benefits',
      'Medical expenses reimbursement',
      'Education fund for children',
      'Repatriation of mortal remains',
      'Optional covers for specific risks'`,
        category: 'Group Personal Accident Cover'
    },


    ]
  };
};