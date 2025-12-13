// customResponses.ts
export interface CustomQuestion {
  keywords: string[];
  response: string;
  category: string;
}

export interface CustomResponseConfig {
  questions: CustomQuestion[];
}

export const getCustomResponses = (): CustomResponseConfig => {
 return {
    questions: [
      // ===== PAGE 0:Greetings  =====
      {
        keywords: ['hi', 'helo', 'hello', 'hey', 'good morning', 'heyy'],
        response: `👋 Hello! I'm ANITA - Your Automated Assistant for all financial matters.\n\nHow can I assist you today?`,
        category: 'Greetings '
      },
      {
        keywords: ['bye', 'by', 'goodbye', 'shutup', 'see you', 'tata'],
        response: `Goodbye! 😊 Take care and have a wonderful day!\nIf you need any more help feel free to reach out. Best of luck with Infinity Arthvishva.\nStay financially smart and secure! `,
        category: 'Greetings '
      },
      {
        keywords: ['how are you', 'wassup anita', 'how you doing', 'wassup', 'how do you do'],
        response: `I'm doing great, thank you for asking! 😊 I'm running smoothly and ready to help you with anything related to financial matters.\n\nHow can I assist you today?`,
        category: 'Greetings '
      },
       {
        keywords: ['help', 'assist', 'guide'],
        response: `I'm here to help! 😊 What do you need assistance with?`,
        category: 'Greetings '
      },
        {
        keywords: ['thank', 'thanks', 'thankyou','thnx','thx','thnx'],
        response: `You're welcome! 😊 I'm glad I could help.\nIf you have any more questions about financial matters, loans, investments, or insurance, feel free to ask!\n\nHave a great day!l`,
        category: 'Greetings '
      },


      // ===== PAGE 1: Company Introduction =====
      {
        keywords: ['company name', 'infinity arthvishva', 'who are you', 'about company', 'introduction', 'what is infinity','what is this company about'],
        response: ` **Infinity Arthvishva - Company Introduction**\n
At Infinity Arthvishva, we blend technology and trust to simplify your financial journey. Our expert team provides transparent, unbiased, and goal-oriented financial guidance designed to help you achieve lasting success. By aligning every strategy with your unique investment goals, we ensure sustainable growth, informed decisions, and a secure financial future.`,
        category: 'Director Introduction'
      },

       {
        keywords: ['rahul', 'who is rahul', 'who is rahul kangane', 'kangane', 'rahul kangane', 'chairman' , 'managing director'],
        response: `Mr. Rahul Kangane
Chairman and Managing Director\n
15 years of expertise in broking and wealth management, with a focus on portfolio strategy. His sharp market insights fuel the company's growth and success.`,
        category: 'Director Introduction'
      },

      {
        keywords: ['rajesh', 'who is rajesh', 'who is rajesh parkhi', 'parkhi', 'rajesh parkhi', 'director' , 'executive director'],
        response: `Mr. Rajesh Parkhi
Executive Director
Over 25 years of extensive experience in the retail finance sector with an MBA in Marketing. Expertise in structuring retail loan portfolios and fostering sustainable business growth.`,
        category: 'Director Introduction'
      },

      {
        keywords: ['pravin', 'who is pravin', 'who is pravin marathe', 'marathe', 'pravin marathe', 'director' , ],
        response: `Mr. Pravin Marathe
Director
Over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.`,
        category: 'Director Introduction'
      },

      // ===== PAGE 2: Services =====
      {
        keywords: ['what do you do', 'services', 'financial distribution', 'differential', 'what services do you provide'],
        response: `Comprehensive financial solutions under one roof\n
**Finance:\n
Comprehensive financial solutions under one roof
✓Home Loan
✓Personal Loan
✓Business Loan
✓SME Loan
✓Auto Loan
✓Mortgage Loan
✓Education Loan
✓Vehicle Loan
✓Loan Against Securities\n
**Protection**\n
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
✓Corporate General Insurance\n
**Investment**\n
Strategic investment options to grow your wealth.
✓Mutual Funds
✓Wealth Management
✓Pension Funds
✓Stock & Securities
✓Demat Account
✓Real Estate Investments
✓Portfolio Management Service
✓Alternative Investment Fund
✓Fixed Deposit
✓Bonds
✓Tax Consultancy
✓Unlisted Shares
`,
    category: 'Services'
      },
      // ===== PAGE 3-4: Finance =====
      {
        keywords: ['finance services', 'finance','only finance'],
        response: `Finance Services\n
Comprehensive financial solutions under one roof
✓Home Loan
✓Personal Loan
✓Business Loan
✓SME Loan
✓Auto Loan
✓Mortgage Loan
✓Education Loan
✓Vehicle Loan
✓Loan Against Securities\n`,
        category: 'finance'
      },

// ===== PAGE 3-4: Events =====
      {
        keywords: ['how many events held', 'events', 'event', 'program', 'reach'],
        response: `Events\n
Our Event Reach
Across multiple cities in India
55+ Total Events
21+ Cities Covered
2 Years
10000+ Participants `,
        category: 'Events'
      },

      // ===== PAGE 4: Cibil =====
      {
        keywords: ['Cibil Score', 'Score', 'cibil', 'Want to know about cibil score', 'how to know cibil score', 'give cibil score','check score'],
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

      // ===== PAGE 5-7: Leadership Team =====
      {
        keywords: ['leadership', 'management team', 'all directors', 'founders', 'directors', 'company directors'],
        response: `👥 **Leadership Team**\n\n**Mr. Rajesh Parkhi - Executive Director**\n• **Experience**: 25+ years in retail finance\n• **Qualification**: MBA in Marketing\n• **Specialization**: Retail loan portfolio structuring, business expansion, operational efficiency\n• **Previous Experience**: Bajaj Group, HDFC, Mafatlal, ICICI Bank, Kotak Group, Citi Financial\n• **Current Role**: Director of Infinity Arthvishva Advisory Pvt. Ltd. & Arthvishva Finance Consultancy\n\n**Mr. Rahul Kangane - Chairman and Managing Director**\n• **Experience**: 15+ years in broking, wealth management, portfolio strategy\n• **Expertise**: Capital markets, analytical approach, performance-driven solutions\n• **Leadership Roles**: Infinity Arthvishva, Infinity Investment, Infinite Financial Services, Triumph\n\n**Mr. Pravin Marathe - Director**\n• **Experience**: 18+ years in Mutual Funds, PMS, AIFs, Unlisted Equity products\n• **Qualification**: Bachelor of Commerce from Pune University\n• **Expertise**: Financial product distribution, strategic business growth\n• **Focus**: Transparent, compliance-focused operations`,
        category: 'Leadership Team'
      },

      // ===== PAGE 8-9: Journey & Milestones =====
      {
        keywords: ['Become Our Partner', ' Partner', 'partner', 'partner with us', 'want partnership'],
        response: `Join our growing network and unlock success with powerful tools, expert support, and a nationwide platform.\n\n\n**Key Milestones**:\n✓ **Consistent Growth**: Across all product categories\n✓ **Extensive Network**: 2,500+ registered DSAs and channel associates\n✓ **Pan-India Presence**: 20+ active business locations nationwide\n✓ **Training & Events**: 52+ large-scale corporate events and training summits\n✓ **Market Penetration**: Deep reach across India\n\n**Growth Strategy**:\n• Strategic combination of business expansion\n• Technological innovation\n• Partner-centric growth model\n• Creating scalable and sustainable financial services platform`,
        category: 'Journey & Milestones'
      },

      // ===== PAGE 10: Key Achievements =====
      {
        keywords: ['Our Pan-India Presence', 'Pan-India', 'pan india', 'growth', 'presence',],
        response: `Our Pan-India Presence\n\n
        With branches across 20+ cities, Infinity Arthvishva is empowering clients nationwide through trusted financial solutions.
        Pune (Main Branch)
        Mumbai
        Kolhapur & Sangli
        Nashik
        Chiplun
        Ratnagiri
        Satara
        Raipur
        Baramati
        Assam
        West Bengal
        Chhatrapati Sambhajinagar
        Nagpur
        Yavatmal
        Gurgaon
        Ahilyanagar
        Hyderabad
        Indore
        Surat
        Lucknow`,
       category: 'Achievements'
      },

      // ===== PAGE 11: Address =====
      {
        keywords: ['Get In Touch', 'contact', 'contact us', 'phone', 'call', 'address','contact number', 'where is infinity arthvishva', 'location', 'located'],
        response: `We are here to help, contact us for a free consultation.
        Our Address
        1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016\n
        1800-532-7600
        info@infinityarthvishva.com\n\n`,
       category: 'Technology'
      },

      // ===== PAGE 12: Our Vision =====
      {
        keywords: ['Our Vision', 'vision', 'mission'],
        response: `Infinity Arthvishva, aims to seamlessly integrate advanced financial intelligence into everyday life — empowering families across India to achieve stability, growth, and prosperity.
            1.Strategic Approach
            We deliver innovative loan and investment solutions that align with your goals.\n
            2.Long-Term Strategy
            Our plans focus on sustainable financial growth and lasting security.\n
            3.Growth-Oriented Vision
            We create tailored strategies that help you expand your financial horizon`,
        category: 'Our Vision'
      },
      // ===== PAGE 13-14: Branches =====
      {
        keywords: ['Our Branches', 'branches', 'total companies', 'companies'],
        response: `Visit us at any of our conveniently located branches across India\n\n
        Kanpur Branch
        Office No. 01, Kamlist Tower
        Behind Mishra Jewellers, Near Joga Bhogha Chauraha
        Nehru Nagar, Shuklaganj
        Kanpur, Unnao, Uttar Pradesh - 209861\n
        Nagpur Branch
        Apartment No. 202, 2nd Floor
        Sharda Enclave, Nagji Bhai Town
        Besides Platina Heart Institute, Sitabuldi
        Nagpur, Maharashtra - 440012\n
        Kolkata Branch
        PS Qube, Room No. 620, 6th Floor
        Plot No. IID/31/1, NewTown
        Kolkata, West Bengal - 700135\n
        Nashik Branch
        2064, 2nd Floor
        Roongta Shopping Hub
        Near Hotel Surya, Mumbai Agra Road, Indira Nagar
        Nashik, Maharashtra - 422009\n
        Kolhapur Branch
        Yashonandan Plaza, 1st Floor
        Shahupuri 3rd Lane
        Near Shubhash Photo
        Kolhapur, Maharashtra - 416001\n
        Chiplun Branch
        United Classic, 203/204, 2nd Floor
        Near Old S.T. Stand
        Chiplun Bazarpeth
        Chiplun, Maharashtra - 415605\n
        Ratnagiri Branch
        S. No. A-4
        Soham Samarth Apartment, S.V. Road
        Maruti Mandir
        Ratnagiri, Maharashtra - 415612`,
        category: 'branches'
      },
 // ===== PAGE 15: home loan =====
      {
        keywords: ['home loan', 'ROI of home loan', 'what is home loan', 'home', 'financial stability','roi of home loan'],
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

      // ===== PAGE 17: vehicle loan =====
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

      // ===== PAGE 18: personal loan =====
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

      // ===== PAGE 19: business loan =====
      {
        keywords: ['business loan', 'ROI of business loan', 'what is business loan','business'],
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

      // ===== PAGE 20-22: SME loan =====
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
// ===== PAGE 23-24: auto loan =====
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
 // ===== PAGE 25-26: mortgage loan =====
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

      // ===== PAGE 27-28: education loan =====
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

      // ===== PAGE 29: Loan Against Securities =====
      {
        keywords: ['Loan Against Securities', 'las', 'LAS', 'against securities','what is las','what is loan against property','roi of las',],
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
       // ===== PAGE 3-4: protection =====
      {
        keywords: ['protection services', 'protection','only protection'],
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
 // ===== PAGE 30:Life Insurance =====
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
      // ===== PAGE 31: Health Insurance =====
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
 // ===== PAGE 32: Motor Insurance =====
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
      // ===== PAGE 33: Travel Insurance =====
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
       // ===== PAGE 33: Cattle Insurance =====
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
      // ===== PAGE 33: Marine Insurance =====
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
           // ===== PAGE 33: Property Insurance =====
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
      // ===== PAGE 34: Group Medi-Claim Cover =====
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
      // ===== PAGE 34: Group Personal Accident Cover =====
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
       // ===== PAGE 35: Investment Services =====
      {
        keywords: ['investment services', 'investment'],
        response: `Investment Services\n
Strategic investment options to grow your wealth.
✓Mutual Funds
✓Wealth Management
✓Pension Funds
✓Stock & Securities
✓Demat Account
✓Real Estate Investments
✓Portfolio Management Service
✓Alternative Investment Fund
✓Fixed Deposit
✓Bonds
✓Tax Consultancy
✓Unlisted Shares\n`,
        category: 'investment'
      },
     // ===== PAGE 36: Mutual Funds =====
      {
        keywords: ['Mutual Funds', 'what is Mutual Funds', 'information for Mutual Funds'],
        response: `'Mutual funds pool money from multiple investors to invest in diversified portfolios of stocks, bonds, or other securities. They offer professional management, diversification, and liquidity for investors with varying risk appetites and financial goals.',
    Features: 
      'Equity, debt, hybrid, and solution-oriented funds',
      'Systematic Investment Plans (SIP)',
      'Systematic Transfer Plans (STP)',
      'Systematic Withdrawal Plans (SWP)',
      'Direct and regular plan options',
      'Online investment and tracking',
      'Tax-saving ELSS funds'`,
        category: ' Mutual Funds'
      },
      // ===== PAGE 37: Wealth Management =====
      {
        keywords: ['Wealth Management', 'what is Wealth Management', 'information for Wealth Management','Wealth'],
        response: `'Wealth management provides comprehensive financial planning and investment management services for high net-worth individuals. It includes investment advisory, portfolio management, estate planning, tax planning, and retirement planning.',
    Features: 
      'Personalized financial planning',
      'Portfolio management services',
      'Tax optimization strategies',
      'Estate and succession planning',
      'Retirement planning',
      'Insurance planning',
      'Regular portfolio reviews'`,
        category: 'Wealth Management'
      },
      // ===== PAGE 38: Pension Funds =====
      {
        keywords: ['Pension Funds', 'what is Pension Funds', 'information for Pension Funds','Pension'],
        response: `'Pension funds or retirement plans help individuals accumulate corpus for post-retirement life through systematic savings and investments. They offer tax benefits during accumulation phase and provide regular income during retirement.',
    Features: 
      'National Pension System (NPS)',
      'Annuity plans',
      'Pension mutual funds',
      'Retirement benefit funds',
      'Systematic withdrawal options',
      'Tax benefits under 80CCD',
      'Flexible contribution options'`,
        category: 'Pension Funds'
      },
      // ===== PAGE 39: Stock & Securities =====
      {
        keywords: ['Stock & Securities', 'what is Stock & Securities', 'information for Stock & Securities','information for Stock','what is Stock'],
        response: `'Stock market investing involves buying shares of publicly listed companies to participate in their growth and profitability. It offers potential for high returns but comes with market volatility and requires research and risk management.',
    Features: 
      'Equity shares trading',
      'IPO applications',
      'F&O trading',
      'Currency and commodity derivatives',
      'Research and advisory services',
      'Online trading platforms',
      'Margin trading facilities'`,
        category: 'Stock & Securities'
      },
      // ===== PAGE 40: Real Estate Investments =====
      {
        keywords: ['Real Estate Investments', 'what is Real Estate Investments', 'information for Real Estate Investments'],
        response: `'Real estate investment involves purchasing properties for capital appreciation, rental income, or both. It includes residential, commercial, industrial, and land investments, offering tangible assets with potential for steady returns and tax benefits.',
    Features: 
      'Residential property investment',
      'Commercial property investment',
      'REITs (Real Estate Investment Trusts)',
      'Real estate mutual funds',
      'Land banking',
      'Property development projects',
      'Rental yield optimization'`,
        category: 'Real Estate Investments'
      },
      // ===== PAGE 41: Portfolio Management Service =====
      {
        keywords: ['Portfolio Management Service', 'what is Portfolio Management Service', 'information for Portfolio Management Service','what is Portfolio Management','information for Portfolio Management'],
        response: `'Portfolio Management Services (PMS) offer personalized investment management for high net-worth individuals with dedicated portfolio managers creating and managing customized portfolios based on individual objectives and risk profiles.',
    Features: 
      'Customized portfolio construction',
      'Active portfolio management',
      'Regular performance reviews',
      'Risk management strategies',
      'Tax planning integration',
      'Direct equity investments',
      'Alternative investments access'`,
        category: 'Portfolio Management Service'
      },
      // ===== PAGE 42:  Alternative Investment Fund=====
      {
        keywords: ['Alternative Investment Fund', 'what is Alternative Investment Fund', 'information for Alternative Investment Fund','what is Alternative Investment','information for Alternative Investment'],
        response: `'Alternative Investment Funds (AIFs) are privately pooled investment vehicles that invest in non-traditional assets like private equity, venture capital, hedge funds, real estate, distressed assets, and other alternative assets for sophisticated investors.',
    Features: 
      'Category I, II, III AIFs',
      'Private equity investments',
      'Venture capital funding',
      'Hedge fund strategies',
      'Real estate funds',
      'Distressed asset funds',
      'Infrastructure funds'`,
        category: 'Alternative Investment Fund'
      },
// ===== PAGE 43: Fixed Deposit=====
      {
        keywords: ['Fixed Deposit', 'what is Fixed Deposit', 'information for Fixed Deposit','what is fd','information for fd'],
        response: `'Fixed Deposits (FDs) are investment instruments offered by banks and financial institutions where investors deposit a lump sum for a fixed period at a predetermined interest rate. They offer capital protection and guaranteed returns, making them popular for risk-averse investors.',
    Features: 
      'Fixed interest rates',
      'Flexible tenure options',
      'Quarterly/monthly interest payout',
      'Cumulative and non-cumulative options',
      'Loan against FD facility',
      'Auto-renewal option',
      'Senior citizen higher rates'`,
        category: 'Fixed Deposit'
      },
      // ===== PAGE 44: Bonds=====
      {
        keywords: ['Bonds', 'what is Bonds', 'information for Bonds'],
        response: `'Bonds are debt instruments where investors lend money to entities (government or corporations) in exchange for periodic interest payments and return of principal at maturity. They offer predictable income and are generally lower risk than equities.',
    Features: 
      'Government securities',
      'Corporate bonds',
      'Tax-free bonds',
      'Convertible bonds',
      'Debentures',
      'Bond funds',
      'Sovereign gold bonds'`,
        category: 'Bonds'
      },
      // ===== PAGE 45: Tax Consultancy=====
      {
        keywords: ['Tax Consultancy', 'what is Tax Consultancy', 'information for Tax Consultancy'],
        response: `'Tax consultancy services provide expert guidance on tax planning, compliance, and optimization for individuals and businesses. Services include tax return filing, tax planning strategies, audit representation, and advice on tax-efficient investments.',
    Features: 
      'Income tax return filing',
      'Tax planning and optimization',
      'Tax audit assistance',
      'International taxation',
      'Transfer pricing',
      'GST compliance',
      'Tax litigation support'`,
        category: ' Tax Consultancy'
      },
  // ===== PAGE 46: Unlisted Shares=====
      {
        keywords: ['Unlisted Shares', 'what is Unlisted Shares', 'information for Unlisted Shares'],
        response: ` 'Unlisted shares represent ownership in private companies not listed on stock exchanges. These investments offer opportunity to invest in promising companies before they go public, potentially generating significant returns if the company succeeds and eventually IPOs.',
    Features: 
      'Pre-IPO company investments',
      'Startup equity participation',
      'Private company shares',
      'ESOP purchases',
      'Secondary market transactions',
      'Due diligence services',
      'Exit planning assistance'`,
        category: ' Unlisted Shares'
      },
     ]
  };
};