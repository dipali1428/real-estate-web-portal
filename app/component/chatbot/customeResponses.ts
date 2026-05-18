
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
        keywords: ["hi", "hello", "hey", "greetings", "hii", "helo", "Hi there", "hey there", "hello there","Heyy","helloo", "hii there", "hiiiii"],
        response: "Hello! 👋 I'm **ANITA**. How can I assist you with your financial goals today?",
        category: "Conversational"
      },
      {
        keywords: ["how are you", "how are u", "hows it going", "how's it going"],
        response: "I'm doing great, thank you for asking! 😊 I'm powered up and ready to help you navigate loans, insurance, and investments. How are you doing today?",
        category: "Conversational"
      },
      {
        keywords: ["good morning", "morning"],
        response: "Good morning! ☀️ A great day to plan your financial future. How can I help you today?",
        category: "Conversational"
      },
      {
        keywords: ["good afternoon", "afternoon"],
        response: "Good afternoon! 🌤️ Hope your day is going well. Need any help with financial advice?",
        category: "Conversational"
      },
      {
        keywords: ["good evening", "evening"],
        response: "Good evening! 🌙 Reflecting on your financial goals? I'm here to help if you need anything.",
        category: "Conversational"
      },
      {
        keywords: ["thank you", "thanks", "thx", "tysm", "thanku", "thankyou", "thank u", "thanks a lot", "many thanks", "thanks a ton", "thankx"],
        response: "You're very welcome! 😊 Is there anything else I can help you with regarding loans or investments?",
        category: "Conversational"
      },
      {
        keywords: ["bye", "goodbye", "see ya", "by", "see you", "catch you later", "talk to you later",],
        response: "Goodbye! 👋 Have a financially secure day ahead. Feel free to return if you have more questions!",
        category: "Conversational"
      },
      {
        keywords: ["who trained you", "who developed you", "who built you"],
        response: "I was created by a talented team at **Infinity Arthvishva** to assist you with your financial needs.",
        category: "Conversational"
      },
      {
        keywords: ["who made you", "who created you", "who is your developer"],
        response: "I was developed for **Infinity Arthvishva** to serve as your Automated Navigation and Interface Task Assistant (ANITA).",
        category: "Conversational"
      },

      // ==== CORE BUSINESS RESPONSES ====
      {
        keywords: ["who are you", "what is anita", "your name", "who is anita", "tell me about anita", "about anita"],
        response: "I am **ANITA**, your **Automated Navigation and Interface Task Assistant**. I specialize in providing guidance on Loans, Investments, and Insurance for Infinity Arthvishva.",
        category: "General"
      },
      {
        keywords: ["infinity arthvishva", "about the company", "what is this company", "tell me about infinity arthvishva", "information about infinity arthvishva", "about company"],
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
        keywords: ["rahul kangane", "rahul", "who is rahul kangane", "tell me about rahul kangane", "information about rahul kangane", "chairman", "managing director", "MrKangane"],
        response: "**Mr. Rahul Kangane** is our **Chairman and Managing Director**. He brings 15 years of deep expertise in broking and wealth management. His sharp market insights and focus on portfolio strategy are the driving forces behind the company's growth and success.",
        category: "Leadership"
      },
      {
        keywords: ["rajesh parkhi", "rajesh", "who is rajesh parkhi", "tell me about rajesh parkhi", "information about rajesh parkhi", "Mr Parkhi"],
        response: "**Mr. Rajesh Parkhi** is our **Executive Director**. He has over 25 years of extensive experience in the retail finance sector and holds an MBA in Marketing. He is an expert in structuring retail loan portfolios and fostering sustainable business growth.",
        category: "Leadership"
      },
      {
        keywords: ["pravin marathe", "pravin", "who is pravin marathe", "tell me about pravin marathe", "information about pravin marathe", "director", "Mr. Marathe"],
        response: "**Mr. Pravin Marathe** is a **Director** at Infinity Arthvishva. With over 18 years of experience in financial markets, he is known for his client-focused approach and strategic vision, specifically driving growth through Mutual Funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIFs).",
        category: "Leadership"
      },
      {
        keywords: ["k krishna", "krishna", "who is k krishna", "tell me about k krishna", "information about k krishna", "telangana state director", "Mr. Krishna"],
        response: "**Mr. K Krishna** is our **Telangana State Director**. He brings 18+ years of banking experience, driving strategic growth, operational excellence, and revenue expansion through high-performing teams and strong client-focused strategies.",
        category: "Leadership"
      },
      {
        keywords: ["sanjay shaha", "dr sanjay shaha", "who is sanjay shaha", "tell me about sanjay shaha", "information about sanjay shaha", "Mr. Shaha", "sanjay"],
        response: "**Dr. Sanjay Shaha** is a **Director** at Infinity Arthvishva. He is a senior physician with 40+ years of experience, National Merit Winner, Gold Medalist & Vijay Ratna Awardee, bringing strategic vision and ethical leadership.",
        category: "Leadership"
      },
      {
        keywords: ["arun job", "arun", "who is arun job", "tell me about arun job", "information about arun job", "regional director hyderabad", "Mr. Arun"],
        response: "**Mr. Arun Job** is our **Regional Director (Hyderabad)**. With over 20 years of leadership across telecommunications, manufacturing, pharma packaging and banking sectors, he drives transformative growth and operational excellence. He is an IIMA alumnus known for building high-performing teams, strategic partnerships, and revenue expansion.",
        category: "Leadership"
      },
      {
        keywords: ["sandip powar", "sandip", "who is sandip powar", "tell me about sandip powar", "information about sandip powar", "vice president", "Mr. Powar"],
        response: "**Mr. Sandip Powar** is our **Vice President**. He brings 11+ years of expertise in Home Loans and Insurance, leading Pan-India expansion, branch development, and strategic growth with a strong customer-focused approach.",
        category: "Leadership"
      },
      {
        keywords: ["ajay mundada", "ajay", "who is ajay mundada", "tell me about ajay mundada", "information about ajay mundada", "Mr. Mundada"],
        response: "**Mr. Ajay Mundada** is our **Business Growth Officer**. He leads business expansion, strategic alliances, and performance-driven growth. With a strong focus on data-backed decision-making, risk management, and market adaptability, he ensures consistent value creation across evolving financial landscapes.",
        category: "Leadership"
      },
      {
        keywords: ["sharad kulkarni", "sharad", "who is sharad kulkarni", "tell me about sharad kulkarni", "information about sharad kulkarni", "sangli branch head", "Mr. Kulkarni"],
        response: "**Mr. Sharad Kulkarni** is our **Regional Business Head (Sangli Branch)**. He brings over 9 years of lending and 5 years of insurance experience, driving regional growth, high-performing teams, and strong client-focused business expansion.",
        category: "Leadership"
      },
      {
        keywords: ["anant chachad", "anant", "who is anant chachad", "tell me about anant chachad", "information about anant chachad", "kolhapur branch head", "Mr. Chachad"],
        response: "**Mr. Anant Chachad** is our **Regional Business Head (Kolhapur Branch)**. He brings over 14 years of experience in financial services, leading Mortgage Loans for the West region with expertise in Home Loans, LAP, distribution network development, and strategic portfolio growth.",
        category: "Leadership"
      },
      {
        keywords: ["kailas patil", "kailas", "who is kailas patil", "tell me about kailas patil", "information about kailas patil", "nashik branch head", "Mr. Patil"],
        response: "**Mr. Kailas Patil** is our **Assistant Vice President (Nashik Branch)**. He is a finance professional with 15+ years of experience in Home Loans, LAP, and Business Loans, driving regional growth through strong sales leadership, channel partnerships, and operational excellence.",
        category: "Leadership"
      },
      {
        keywords: ["neeraj mohata", "neeraj", "who is neeraj mohata", "tell me about neeraj mohata", "information about neeraj mohata", "nagpur branch head", "Mr. Mohata"],
        response: "**Mr. Neeraj Mohata** is our **Regional Business Head (Nagpur Branch)**. He brings 11+ years of experience in lending and financial services, driving regional sales growth, channel expansion, and profitable business performance with strong leadership and market expertise.",
        category: "Leadership"
      },
      {
        keywords: ["pravin rautray", "pravin rautray", "who is pravin rautray", "tell me about pravin rautray", "information about pravin rautray", "moshi branch head", "Mr. Rautray"],
        response: "**Mr. Pravin Rautray** is our **Business Head (Moshi Branch)**. He drives growth across Loans and Insurance with a strong track record in building high-performing teams, expanding market reach, and delivering strategic, customer-focused revenue growth.",
        category: "Leadership"
      },
      {
        keywords: ["rahul gadekar", "who is rahul gadekar", "tell me about rahul gadekar", "information about rahul gadekar", "jalna branch head", "Gadekar", "Mr. Gadekar"],
        response: "**Mr. Rahul Gadekar** is our **Branch Head (Jalna Branch)**. He has 10+ years of banking and finance experience, specializing in Home, Car, Education, Mortgage, and Business Loans. Formerly with State Bank of India, Old Jalna, he is skilled in loan processing and financial advisory across Jalna.",
        category: "Leadership"
      },
      {
        keywords: ["yogesh joshi", "yogesh", "who is yogesh joshi", "tell me about yogesh joshi", "information about yogesh joshi", "sambhajinagar branch head", "Mr. Joshi"],
        response: "**Mr. Yogesh Joshi** is our **Branch Head (Chhatrapati Sambhajinagar Branch)**. He is a seasoned professional with 16 years of experience in Home Loans. Previously served 5 years at IDBI Bank, 4 years as RM at Fullerton India, and 7 years as a Home Loan counsellor at SBI Bank.",
        category: "Leadership"
      },
      {
        keywords: ["anil akolkar", "anil", "who is anil akolkar", "tell me about anil akolkar", "information about anil akolkar", "Mr. Akolkar"],
        response: "**Mr. Anil Akolkar** is an **Investment Professional** at Infinity Arthvishva. He has 18 years of experience in Mutual Funds and various insurance products. He specializes in customer-need-based financial planning for early retirement and a bright future.",
        category: "Leadership"
      },
      {
        keywords: ["santosh tupe", "santosh", "who is santosh tupe", "tell me about santosh tupe", "information about santosh tupe", "ahilyanagar branch head", "Mr. Tupe"],
        response: "**Mr. Santosh Tupe** is our **Tax Consultant & Financial Services (Ahilyanagar Branch)**. He is a seasoned professional with 18+ years of experience in taxation, compliance, and planning. He helps clients optimize tax positions and achieve sustainable growth through personalized financial solutions.",
        category: "Leadership"
      },
      {
        keywords: ["pravin nikam", "nikam", "who is pravin nikam", "tell me about pravin nikam", "information about pravin nikam", "Mr. Nikam"],
        response: "**Mr. Pravin Nikam** is our **Branch Head (Chhatrapati Sambhajinagar Branch)**. He is a result-oriented BFSI professional with 15+ years of experience in retail lending and sales across HDFC Bank and HDB Financial Services. Expert in Loan Against Property, Home Loans, and SME lending with strong team management skills.",
        category: "Leadership"
      },
      {
        keywords: ["sanjay kankariya", "kankariya", "who is sanjay kankariya", "tell me about sanjay kankariya", "information about sanjay kankariya", "Mr. Kankariya"],
        response: "**Mr. Sanjay Kankariya** is our **Regional Business Head (Chhatrapati Sambhajinagar Branch)**. With over 30 years of experience in Tax & Finance Consultancy and Real Estate, he has expertise in financial consulting, investment guidance, and real estate solutions across Mumbai, Pune, Nagpur, and Dubai.",
        category: "Leadership"
      },
      {
        keywords: ["sumeet nikalje", "sumeet", "who is sumeet nikalje", "tell me about sumeet nikalje", "information about sumeet nikalje", "Mr. Nikalje"],
        response: "**Mr. Sumeet Nikalje** is our **Branch Manager (Chhatrapati Sambhajinagar Branch)**. With 7 years of experience in Business and Personal Loans, he specializes in financial planning, loan advisory, and client relationship management, delivering reliable and customer-focused financial solutions.",
        category: "Leadership"
      },
      {
        keywords: ["manoj powar", "manoj", "who is manoj powar", "tell me about manoj powar", "information about manoj powar", "Mr. Powar"],
        response: "**Mr. Manoj Powar** is our **Branch Manager (Kolhapur Branch)**. He serves as the Branch Manager for the Kolhapur Branch with expertise in Home, Business, and Personal Loans, along with branch operations, business growth, and client relationship management.",
        category: "Leadership"
      },
      {
        keywords: ["pravin swami", "swami", "who is pravin swami", "tell me about pravin swami", "information about pravin swami", "Mr. Swami"],
        response: "**Mr. Pravin Swami** is our **CRM Manager – Real Estate (PCMC Branch)**. With over 10 years of experience in financial institutes and real estate, he specializes in CRM management, sales growth, loan coordination, client relationship management, and delivering seamless customer experiences through effective team coordination and performance optimization.",
        category: "Leadership"
      },
      {
        keywords: ["girijatmaj sarnikar", "girijatmaj", "sarnikar", "who is girijatmaj sarnikar", "tell me about girijatmaj sarnikar", "information about girijatmaj sarnikar", "Mr. Sarnikar"],
        response: "**Mr. Girijatmaj Sarnikar** is our **Branch Manager (Jalna Branch)**. He brings 2+ years of experience in Lending and Financial Services, specializing in sales growth, client relationship management, business development, and profitable branch performance through strong leadership and market expertise.",
        category: "Leadership"
      },

      {
        keywords: ["sangli branch", "where is sangli branch", "sangli branch address", "sangli branch location", "sangli office", "sangli branch head"],
        response: "Sangli Branch\n\nManager: Mr. Sharad Kulkarni\nEmail: sharad@infinityarthvishva.com\nMob: +91 99555 91177\nAddress: 1st Floor, Plot No. 103, Adity Sai Landmark Near Bhoi Clinic, Ram Mandir Chowk, Sangli, Maharashtra - 416416",
        category: "branches"
      },
      {
        keywords: ["kolhapur branch", "where is kolhapur branch", "kolhapur branch address", "kolhapur branch location", "kolhapur office", "kolhapur branch head"],
        response: "Kolhapur Branches\n\nBranch 1 (Mr. Manoj Powar): Dabholkar Corner, Amatya Towers, Kolhapur, Maharashtra – 416001, Mob: +91 99237 37637\n\nBranch 2 (Mr. Anant Chachad): Yashonandan Plaza, 1st Floor, Shahupuri 3rd Lane, Near Shubhash Photo, Kolhapur, Maharashtra - 416001, Mob: +91 90498 29090",
        category: "branches"
      },
      {
        keywords: ["pune branch", "where is pune branch", "pune branch address", "pune main branch", "pune office", "shivajinagar branch", "main branch", "pune branch head"],
        response: "**Pune Main Branch (Head Office)**\n\nAddress: 1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016\nPhone: 1800-532-7600\nEmail: info@infinityarthvishva.com",
        category: "branches"
      },
      {
        keywords: ["nashik branch", "where is nashik branch", "nashik branch address", "nashik branch location", "nashik office", "nashik branch head"],
        response: "Nashik Branch\n\nManager: Mr. Kailas Patil\nEmail: kailas@infinityarthvishva.com\nMob: +91 832 978 2325\nAddress: 2064, 2nd Floor, Roongta Shopping Hub, Near Hotel Surya, Mumbai Agra Road, Indira Nagar, Nashik, Maharashtra - 422009",
        category: "branches"
      },
      {
        keywords: ["nagpur branch", "where is nagpur branch", "nagpur branch address", "nagpur branch location", "nagpur office", "nagpur branch head"],
        response: "Nagpur Branch\n\nManager: Mr. Neeraj Mohta\nMob: +91 88050 02728\nAddress: Apartment No. 202, 2nd Floor, Sharda Enclave, Nagji Bhai Town, Besides Platina Heart Institute, Sitabuldi, Nagpur, Maharashtra - 440012",
        category: "branches"
      },
      {
        keywords: ["hyderabad branch", "where is hyderabad branch", "hyderabad branch address", "hyderabad branch location", "hyderabad office", "hyderabad branch head"],
        response: "Hyderabad Branch\n\nManager: Mr. Mohan Sai\nEmail: mohan@infintyarthvishva.com\nMob: +91 76708 99115\nAddress: Office No: 5B, 5th Floor, Vishwa Heritage Arcade, Near ESI Metro Station, Pillar No. 1010, SR Nagar, Hyderabad, Telangana - 500038",
        category: "branches"
      },
      {
        keywords: ["jalna branch", "where is jalna branch", "jalna branch address", "jalna branch location", "jalna office", "jalna branch head"],
        response: "Jalna Branches\n\nBranch 1 (Girijatmaj Sarnikar): 07, Kalptaru Park, Opp Jalna Hospital, Near Ambad Chaufuly, Jalna, Maharashtra – 431203, Mob: +91 96077 57794\n\nBranch 2 (Mr. Rahul Gadekar): Office No 1, Base Floor, Banjara Tower Ambad Road, Jalna, Maharashtra – 431203, Mob: +91 98901 41450",
        category: "branches"
      },
      {
        keywords: ["ahilyanagar branch", "ahilyanagar branch address", "ahilyanagar branch location", "ahmednagar branch", "savedi branch", "ahilyanagar branch head"],
        response: "Ahilyanagar Branch (Ahmednagar)\n\nManager: Mr. Santosh Tupe\nEmail: santoshtupe@infinityarthvishva.com\nMob: +91 98818 27936\nAddress: Office No : 3, Rameshwar Appt., Vani Nagar, Pipeline Road, Savedi, Ahilyanagar, Maharashtra - 414003",
        category: "branches"
      },
      {
        keywords: ["sambhajinagar branch", "chhatrapati sambhajinagar branch", "aurangabad branch", "sambhajinagar branch address", "csn branch", "sambhajinagar branch head"],
        response: "Chhatrapati Sambhajinagar Branches (Aurangabad)\n\nBranch 1 (Mr. Sumeet Nikalje): Office No 507, 5th Floor, Freedom Tower, Akashwani Chowk, Chhatrapati Sambhajinagar, MH – 431001, Mob: +91 96571 95136\n\nBranch 2 (Mr. Pravin Nikam): Office No 03, Dwarka Complex, Mahesh Nagar, Chhatrapati Sambhaji Nagar, MH – 431001, Mob: +91 87675 56611\n\nBranch 3 (Mr. Yogesh Joshi): N-12 C-133, Swami Vivekanand Nagar, T V Center Road, Hudco, Opp. Maharshi Statue, Chhatrapati Sambhajinagar, MH - 431001, Mob: +91 98233 20790\n\nBranch 4 (Mr. Sanjay Kankariya): Office Akil Complex, Pundalik Nagar Road, Opp. Nayara Petrol Pump, Chhatrapati Sambhajinagar, MH – 431009, Mob: +91 9326009808",
        category: "branches"
      },
      {
        keywords: ["moshi branch", "where is moshi branch", "moshi branch address", "moshi branch location", "pune moshi branch", "moshi branch head"],
        response: "Moshi Branch (Pune)\n\nManager: Mr. Pravin Rautray\nEmail: pravinrautray@infinityarthvishva.com\nMob: +91 77981 82112\nAddress: 1st Floor, Office No 104, Destination Ostiya, F Building, Alandi Moshi Road, Pune, Maharashtra - 412105",
        category: "branches"
      },
      {
        keywords: ["pimpri chinchwad branch", "pcmc branch", "pimpri branch", "thergaon branch", "pimpri chinchwad branch address", "pimpri chinchwad branch head"],
        response: "Pimpri-Chinchwad Branch (PCMC)\n\nManager: Mr. Pravin Swami\nEmail: pravinswami@infinityarthvishva.com\nMob: +91 91463 00555\nAddress: Ganga Aashiyana Sosa Road, Near Purnabhamha Hotel, Thergaon, Pimpri-Chinchwad, Maharashtra - 411033",
        category: "branches"
      },
      {
        keywords: ["mumbai branch", "where is mumbai branch", "mumbai branch address", "mumbai office", "mumbai branch head" ],
        response: "Mumbai Branch\n\nAddress: Coming Soon. Currently, you can visit our Pune Head Office or contact us at 1800-532-7600 for assistance in Mumbai region. We have a strong presence across Maharashtra with planned expansion in Mumbai.",
        category: "branches"
      },
      {
        keywords: ["kanpur branch", "where is kanpur branch", "kanpur branch address", "kanpur office", "uttar pradesh branch", "kanpur branch head"],
        response: "Kanpur Branch\n\nAddress: Office No. 01, Kamlist Tower, Behind Mishra Jewellers, Near Joga Bhogha Chauraha, Nehru Nagar, Shuklaganj, Kanpur, Unnao, Uttar Pradesh - 209861",
        category: "branches"
      },
      {
        keywords: ["kolkata branch", "where is kolkata branch", "kolkata branch address", "kolkata office", "west bengal branch", "kolkata branch head"],
        response: "Kolkata Branch\n\nAddress: PS Qube, Room No. 620, 6th Floor, Plot No. IID/31/1, NewTown, Kolkata, West Bengal - 700135",
        category: "branches"
      },
      {
        keywords: ["chiplun branch", "where is chiplun branch", "chiplun branch address", "chiplun office", "ratnagiri branch", "chiplun branch head"],
        response: "Chiplun Branch\n\nAddress: United Classic, 203/204, 2nd Floor, Near Old S.T. Stand, Chiplun Bazarpeth, Chiplun, Maharashtra - 415605",
        category: "branches"
      },
      {
        keywords: ["ratnagiri branch", "where is ratnagiri branch", "ratnagiri branch address", "ratnagiri office", "ratnagiri branch head"],
        response: "Ratnagiri Branch\n\nAddress: S No. A-4, Soham Samarth Apartment, S.V. Road, Maruti Mandir, Ratnagiri, Maharashtra - 415612",
        category: "branches"
      },
      {
        keywords: ["nearest branch", "branch near me", "closest branch", "find branch", "branch location near me", "where is the nearest branch", "nearest branch head"],
        response: "To find the nearest Infinity Arthvishva branch, We have branches across Maharashtra (Pune, Mumbai, Nashik, Nagpur, Kolhapur, Sangli, Chhatrapati Sambhajinagar, Jalna, Ahilyanagar, Chiplun, Ratnagiri, Pimpri-Chinchwad, Moshi), plus Hyderabad (Telangana), Kanpur (Uttar Pradesh), and Kolkata (West Bengal). Call 1800-532-7600 for assistance.",
        category: "branches"
      },

      // ==== SERVICES: FINANCE & LOANS ====
      {
        keywords: ["loan", "finance", "borrow", "emi", "loan services"],
        response: "We provide comprehensive loan solutions tailored to your needs:\n\n• **Residential:** Home Loans, Mortgage Loans (LAP).\n• **Business:** Business Loans, SME Loans, Loans Against Securities.\n• **Personal \u0026 Education:** Personal Loans, Education Loans.\n• **Vehicles:** Auto Loans, Vehicle Loans.\n\nOur goal is to provide the best interest rates and smooth processing for all your credit requirements.",
        category: "Finance"
      },

      // ==== SERVICES: PROTECTION & INSURANCE ====
      {
        keywords: ["insurance", "protection", "safe", "policy", "insurance services"],
        response: "Safeguard your future and assets with our wide range of insurance products:\n\n• **Personal:** Life Insurance, Health Insurance, Travel Insurance.\n• **Asset:** Motor Insurance, Property Insurance, Marine Insurance.\n• **Commercial:** Corporate General Insurance, Worker Compensation Insurance, Group Medi-Claim Cover, Group Personal Accident Cover.\n• **Specialized:** Cattle Insurance.",
        category: "Protection"
      },

      // ==== SERVICES: INVESTMENTS ====
      {
        keywords: ["investment", "invest", "wealth", "mutual fund", "stock", "investment services"],
        response: "Grow your wealth strategically with our expert investment advisory:\n\n• **Market Instruments:** Mutual Funds, Stocks \u0026 Securities, Bonds, Unlisted Shares.\n• **Management:** Portfolio Management Service (PMS), Alternative Investment Fund (AIF), Wealth Management.\n• **Savings:** Fixed Deposits, Pension Funds.\n• **Real Estate:** Real Estate Investments.\n• **Services:** Demat Account opening, Tax Consultancy.",
        category: "Investment"
      },

      // ==== PARTNERSHIP & DSA ====
      {
        keywords: ["partner", "dsa", "become a partner", "join"],
        response: "Join our growing network! Infinity Arthvishva currently has **3200+ Active DSA Partners**. By partnering with us, you gain access to a nationwide platform, powerful financial tools, and expert support. We manage a total loan book of **500Cr+**. Click the 'Become A Partner' button on our header to start your journey!",
        category: "Partnership"
      },

      // ==== COMPANY DETAILS & LEGAL ====
      {
        keywords: ["gst", "cin", "registration", "tax number"],
        response: "Here are the official registration details for Infinity Arthvishva:\n\n• **GST Number:** 27AAICI0723K1ZJ\n• **CIN Number:** U66190PN2025PTC238981\n\nWe are a fully compliant and transparent financial advisory firm.",
        category: "Company"
      },
      {
        keywords: ["About Us", "About", "who we are"],
        response: "At Infinity Arthvishva, we believe that your financial success is our true achievement. We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management. With a strong foundation of trust, expertise, and innovation, we strive to simplify finance and empower individuals and businesses to achieve their goals with confidence\nAt Infinity Arthvishva, we don’t just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.",
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
      {
        keywords: ['Our Pan-India Presence', 'Pan-India', 'pan india', 'growth', 'presence'],
        response: "Our Pan-India Presence\n\nWith branches across 30+ cities, Infinity Arthvishva is empowering clients nationwide through trusted financial solutions.\nPune (Main Branch)\nKolhapur & Sangli\nNashik\nChiplun\nRatnagiri\nSatara\nRaipur\nBaramati\nAssam\nWest Bengal\nChhatrapati Sambhajinagar\nNagpur\nYavatmal\nGurgaon\nAhilyanagar\nHyderabad\nIndore\nSurat\nLucknow",
        category: 'Achievements'
      },
      {
        keywords: ['Our Branches', 'branches', 'total companies', 'branch locations', 'where are your branches', 'branch details'],
        response: "Visit us at any of our conveniently located branches across India\n\n" +

          "🏢 Chhatrapati Sambhajinagar Branch (Mr. Sumeet Nikalje)\n" +
          "   Office No 507, 5th Floor, Freedom Tower\n" +
          "   Akashwani Chowk\n" +
          "   Chhatrapati Sambhajinagar, MH – 431001\n\n" +

          "🏢 Chhatrapati Sambhajinagar Branch (Mr. Pravin Nikam)\n" +
          "   Office No 03, Dwarka Complex\n" +
          "   Mahesh Nagar\n" +
          "   Chhatrapati Sambhaji Nagar, MH – 431001\n\n" +

          "🏢 Chhatrapati Sambhajinagar Branch (Mr. Yogesh Joshi)\n" +
          "   N-12 C-133, Swami Vivekanand Nagar\n" +
          "   T V Center Road, Hudco, Opp. Maharshi Statue\n" +
          "   Chhatrapati Sambhajinagar, MH - 431001\n\n" +

          "🏢 Ahilyanagar Branch (Mr. Santosh Tupe)\n" +
          "   Office No : 3, Rameshwar Appt., Vani Nagar\n" +
          "   Pipeline Road, Savedi\n" +
          "   Ahilyanagar, Maharashtra - 414003\n\n" +

          "🏢 Chhatrapati Sambhajinagar Branch (Mr. Sanjay Kankariya)\n" +
          "   Office Akil Complex, Pundalik Nagar Road\n" +
          "   Opp. Nayara Petrol Pump\n" +
          "   Chhatrapati Sambhajinagar, MH – 431009\n\n" +

          "🏢 Kolhapur Branch (Mr. Manoj Powar)\n" +
          "   Dabholkar Corner,\n" +
          "   Amatya Towers,\n" +
          "   Kolhapur, Maharashtra – 416001\n\n" +

          "🏢 Nagpur Branch (Mr. Neeraj Mohta)\n" +
          "   Apartment No. 202, 2nd Floor\n" +
          "   Sharda Enclave, Nagji Bhai Town\n" +
          "   Besides Platina Heart Institute, Sitabuldi\n" +
          "   Nagpur, Maharashtra - 440012\n\n" +

          "🏢 Nashik Branch (Mr. Kailas Patil)\n" +
          "   2064, 2nd Floor\n" +
          "   Roongta Shopping Hub\n" +
          "   Near Hotel Surya, Mumbai Agra Road, Indira Nagar\n" +
          "   Nashik, Maharashtra - 422009\n\n" +

          "🏢 Kolhapur Branch (Mr. Anant Chachad)\n" +
          "   Yashonandan Plaza, 1st Floor\n" +
          "   Shahupuri 3rd Lane\n" +
          "   Near Shubhash Photo\n" +
          "   Kolhapur, Maharashtra - 416001\n\n" +

          "🏢 Sangli Branch (Mr. Sharad Kulkarni)\n" +
          "   1st Floor, Plot No. 103\n" +
          "   Adity Sai Landmark Near Bhoi Clinic\n" +
          "   Ram Mandir Chowk\n" +
          "   Sangli, Maharashtra - 416416\n\n" +

          "🏢 Moshi Branch (Mr. Pravin Rautray)\n" +
          "   1st Floor, Office No 104\n" +
          "   Destination Ostiya\n" +
          "   F Building, Alandi Moshi Road\n" +
          "   Pune, Maharashtra - 412105\n\n" +

          "🏢 Hyderabad Branch (Mr. Mohan Sai)\n" +
          "   Office No: 5B, 5th Floor\n" +
          "   Vishwa Heritage Arcade\n" +
          "   Near ESI Metro Station, Pillar No. 1010, SR Nagar\n" +
          "   Hyderabad, Telangana - 500038\n\n" +

          "🏢 Pimpri-Chinchwad Branch (Mr. Pravin Swami)\n" +
          "   Ganga Aashiyana Sosa Road,\n" +
          "   Near Purnabhamha Hotel,\n" +
          "   Thergaon, Pimpri-Chinchwad,\n" +
          "   Maharashtra - 411033\n\n" +

          "🏢 Jalna Branch (Girijatmaj Sarnikar)\n" +
          "   07, Kalptaru Park\n" +
          "   Opp Jalna Hospital\n" +
          "   Near Ambad Chaufuly\n" +
          "   Jalna, Maharashtra – 431203\n\n" +

          "🏢 Jalna Branch (Mr. Rahul Gadekar)\n" +
          "   Office No 1,\n" +
          "   Base Floor,\n" +
          "   Banjara Tower Ambad Road,\n" +
          "   Jalna, Maharashtra – 431203\n",

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
        keywords: ["home loan tax benefits", "tax saving on home loan", "80c home loan deduction", "home loan income tax benefit", "section 24 home loan"],
        response: "Home Loan Tax Benefits under Income Tax Act\n\nPrincipal Repayment: Deduction up to Rs. 1.5 lakhs under Section 80C\nInterest Payment: Deduction up to Rs. 2 lakhs under Section 24(b)\nFirst Time Home Buyer: Additional deduction up to Rs. 50,000 under Section 80EEA\nJoint Loan: Each co-owner can claim separate benefits\nStamp Duty and Registration: Deduction under Section 80C\nNote: Tax benefits apply only after construction is complete for under-construction properties.",
        category: "Finance"
      },
      {
        keywords: ["home loan balance transfer", "home loan takeover", "transfer home loan", "home loan refinance", "switch home loan"],
        response: "Home Loan Balance Transfer Facility\n\nYou can transfer your existing home loan from another bank to Infinity Arthvishva for lower interest rates. Benefits include lower EMIs, reduced total interest cost, top-up loan facility, better customer service. Interest rates starting from 8.40% p.a. Processing fee waived for select customers. Documentation includes loan statement, repayment track record, property documents, and NOC from existing lender.",
        category: "Finance"
      },
      {
        keywords: ["home loan pre approval", "pre approved home loan", "in principle home loan", "home loan sanction letter"],
        response: "Home Loan Pre-Approval Process\n\nPre-approval gives you an estimated loan amount based on your income and credit score before you find a property. Steps include submitting income documents, KYC, and bank statements. Within 3-5 days, you receive an in-principle sanction letter. Valid for 3-6 months. Benefits include faster disbursal once property is finalized and stronger negotiation power with builders. No property documents needed at this stage.",
        category: "Finance"
      },
      {
        keywords: ["home loan for women", "women home loan benefits", "lady home loan", "female home loan", "women loan scheme"],
        response: "Home Loan Benefits for Women\n\nLower interest rates typically 0.05% to 0.10% lower than standard rates. Higher loan eligibility as women are considered lower risk. Stamp duty concession in many states (1-2% lower). Joint ownership with wife as co-applicant improves eligibility and tax benefits. Special schemes from banks like SBI Grih Lakshmi, HDFC Woman Saathi. Processing fee concessions available. Women can be sole owner or joint owner.",
        category: "Finance"
      },
      {
        keywords: ["home loan for nri", "nri home loan india", "nri housing loan", "non resident indian home loan"],
        response: "NRI Home Loan Eligibility\n\nNRIs can get home loans for property purchase in India. Age limit 21 to 65 years. Minimum income depends on country of residence. Loan amount up to 80% of property value. Repayment via NRE/NRO account. Co-applicant can be resident Indian. Interest rates typically 0.25-0.50% higher than resident rates. Documents required include passport, visa, work permit, overseas bank statements, employment contract. Processing takes 2-3 weeks.",
        category: "Finance"
      },
      {
        keywords: ["personal loan for low cibil", "personal loan bad credit", "low credit score personal loan", "cibil below 700 personal loan", "poor cibil personal loan"],
        response: "Personal Loan Options for Low CIBIL Score\n\nIf your CIBIL score is below 700, options include secured personal loan against FD, loan against gold, loan with co-applicant having good score, loan from NBFCs with higher interest rates. Interest rates typically 13-18% for low scores. Lower loan amounts up to Rs. 5 lakhs. Shorter tenure of 1-3 years. Building credit history by paying existing dues on time is recommended before applying.",
        category: "Finance"
      },
      {
        keywords: ["personal loan foreclosure", "prepay personal loan", "close personal loan early", "personal loan prepayment charges", "personal loan early settlement"],
        response: "Personal Loan Prepayment and Foreclosure\n\nMost personal loans allow prepayment after 6-12 months. Foreclosure charges typically 2-5% of outstanding principal. No charges for partial prepayment up to 25% of principal per year. To save interest, pay extra EMIs whenever possible. Check loan agreement for exact terms. Foreclosure processing time is 3-7 working days. No charges if loan is closed after completing full tenure.",
        category: "FAQ"
      },
      {
        keywords: ["instant personal loan", "quick personal loan approval", "same day personal loan", "24 hour personal loan", "fast personal loan"],
        response: "Instant Personal Loan Approval Process\n\nGet instant personal loan approval within 30 minutes for eligible applicants. Fully digital process with no physical paperwork. Approval depends on CIBIL score (700+ preferred), monthly income (Rs. 20,000+), and employment stability. Funds disbursed within 24 hours after approval. Aadhar-based e-KYC required. Same-day disbursal for pre-approved customers with existing relationship.",
        category: "Finance"
      },
      {
        keywords: ["personal loan documents", "documents for personal loan", "personal loan paperwork", "personal loan requirements list"],
        response: "Personal Loan Required Documents\n\nIdentity Proof: Aadhar Card, PAN Card, Voter ID, Passport (any one)\nAddress Proof: Aadhar Card, Utility Bill, Bank Statement, Passport (any one)\nIncome Proof Salaried: Last 3 months salary slips, Last 6 months bank statement, Form 16\nIncome Proof Self Employed: ITR last 2 years, Bank statement last 6 months\nPhotograph: 2 passport size photos\nOthers: Company ID card (for salaried), Business proof (for self-employed)",
        category: "Finance"
      },
      {
        keywords: ["business loan without collateral", "unsecured business loan", "no security business loan", "collateral free business loan", "cgtmse loan"],
        response: "Collateral Free Business Loan\n\nUnsecured business loans available up to Rs. 50 lakhs under CGTMSE scheme. No collateral or third-party guarantee required. Eligibility includes business vintage of 3+ years, minimum annual turnover of Rs. 10 lakhs, CIBIL score 700+. Interest rates start from 12% p.a. Tenure up to 5 years. GST registration mandatory. Quick processing within 72 hours. Suitable for small businesses, traders, and service providers.",
        category: "Finance"
      },
      {
        keywords: ["working capital loan", "business working capital", "cash credit facility", "business overdraft", "working capital finance"],
        response: "Working Capital Loan for Businesses\n\nWorking capital loans help manage day-to-day operations including raw material purchase, salary payments, and inventory management. Options include Cash Credit (CC) facility with limit based on stock and debtors, Overdraft (OD) against current account, and Bill Discounting for immediate cash against unpaid invoices. Interest only on utilized amount. Tenure 12-36 months. Quick approval within 48 hours.",
        category: "Finance"
      },
      {
        keywords: ["msme loan government scheme", "msme subsidy", "government business loan scheme", "small business government scheme", "mudra loan"],
        response: "Government MSME Loan Schemes\n\nPradhan Mantri Mudra Yojana (PMMY): Loans up to Rs. 10 lakhs under Shishu, Kishor, Tarun categories. CGTMSE: Collateral free loan up to Rs. 2 crores. Stand-Up India: Loans up to Rs. 1 crore for SC/ST and women entrepreneurs. Interest subvention of 2% for GST registered MSMEs. Benefits available for manufacturing and service sector businesses with Udyam Registration.",
        category: "Finance"
      },
      {
        keywords: ["business loan eligibility", "business loan criteria", "who can get business loan", "business loan requirements"],
        response: "Business Loan Eligibility Criteria\n\nAge: 25 to 65 years\nBusiness Vintage: Minimum 3 years in operation\nITR: Minimum Rs. 1.5 lakhs per annum\nCIBIL Score: 650 or above for unsecured, 600+ for secured\nLoan Amount: Rs. 1 lakh to Rs. 2 crores\nRepayment Tenure: 1 to 7 years\nSecured and unsecured options available\nGST registration preferred for higher loan amounts",
        category: "Finance"
      },
      {
        keywords: ["education loan without collateral", "unsecured education loan", "study loan no security", "collateral free education loan", "education loan without property"],
        response: "Collateral Free Education Loan\n\nAvailable up to Rs. 7.5 lakhs for studies in India. Up to Rs. 30 lakhs for select premier institutes like IITs, IIMs, NITs, BITS. Parent must be co-borrower. Good academic record required with 60%+ marks. CIBIL score of co-borrower considered. Moratorium period during course plus 6-12 months. Interest rate 9-12% per annum. Quick approval within 7 days.",
        category: "Finance"
      },
      {
        keywords: ["education loan for abroad", "study abroad loan", "overseas education loan", "foreign education loan", "international study loan"],
        response: "Overseas Education Loan Details\n\nLoan amount up to Rs. 1.5 crores for studies abroad. Covers tuition fees, living expenses, travel, books, and equipment. Secured loan requires collateral, unsecured available up to Rs. 40 lakhs. Interest rates 8.5% to 18% per annum. Tenure up to 15 years. Moratorium period includes course duration plus 6-12 months. Documents required include admission letter, IELTS/TOEFL/GRE scores, visa, and co-applicant financials.",
        category: "Finance"
      },
      {
        keywords: ["education loan interest rate", "education loan roi", "study loan rate", "education loan interest"],
        response: "Education Loan Interest Rates\n\nPublic Sector Banks: 8.5% to 10.5% per annum\nPrivate Sector Banks: 9.5% to 14% per annum\nNBFCs: 10% to 18% per annum\nInterest rate concession of 0.5% for girl students\n0.5% concession for students from premier institutes (IITs, IIMs)\nSimple interest during moratorium period, compound interest after\nTax benefit under Section 80E for interest paid",
        category: "Finance"
      },
      {
        keywords: ["loan against shares", "loan against mutual funds", "loan against stocks", "loan against demat account", "share pledged loan"],
        response: "Loan Against Shares and Mutual Funds\n\nPledge your listed shares or mutual fund units to get instant liquidity. Loan amount up to 50-80% of market value depending on security type. Interest rates starting from 9% per annum. No prepayment charges. Online pledging and tracking. Funds disbursed within 24 hours. Top-up facility available. Continue to earn dividends and bonuses on pledged securities. Minimum loan amount Rs. 50,000.",
        category: "Finance"
      },
      {
        keywords: ["loan against insurance policy", "policy loan", "loan against lic policy", "insurance policy loan"],
        response: "Loan Against Insurance Policy\n\nBorrow against your life insurance policies including endowment, money-back, and LIC traditional plans. Loan amount up to 90% of surrender value. Interest rates 10-13% per annum. No credit check required as loan is secured by policy. Simple documentation. Continue to enjoy policy benefits and bonuses. Repayment flexible with no prepayment penalty. Policy must have acquired surrender value.",
        category: "Finance"
      },
      {
        keywords: ["credit card", "apply credit card", "best credit card", "credit card offers", "credit card benefits"],
        response: "Credit Card Services\n\nWe offer exclusive access to premium credit cards with up to 10% cashback, luxury travel perks, and airport lounge access. Cards available from SBI Card, HDFC Bank, ICICI Bank, Axis Bank, AU Bank, IndusInd Bank, IDFC First Bank, Kotak Bank. Features include rewards points, global lounge access, zero lost card liability, up to 55 days interest free credit, dining perks up to 20% discount. Apply online with free CIBIL check.",
        category: "Finance"
      },
      {
        keywords: ["sbi credit card", "simplyclick sbi card", "sbi card apply", "sbi credit card benefits"],
        response: "SBI SimplyCLICK Credit Card\n\nJoining Fee: Rs. 499 + taxes\nAnnual Fee: Rs. 499 + taxes\nBenefits include 10X rewards on Dominos, Myntra, Yatra and more. 5X rewards on online shopping. Low annual fee with easy approval. Contactless payments up to Rs. 5,000. Welcome benefits include reward points on joining. Best for online shoppers.",
        category: "Finance"
      },
      {
        keywords: ["hdfc regalia gold", "regalia credit card", "hdfc regalia benefits", "premium credit card"],
        response: "HDFC Regalia Gold Credit Card\n\nJoining Fee: Rs. 2,500 + taxes\nAnnual Fee: Rs. 2,500 + taxes\nBenefits include upto 5X rewards on Nykaa, Myntra and more. Complimentary Priority Pass membership for airport lounge access. Gift voucher worth Rs. 2,500 on joining. Travel and lifestyle benefits. Best for frequent travelers and premium card seekers.",
        category: "Finance"
      },
      {
        keywords: ["fixed deposit", "fd rates", "bank fd", "fd interest rates", "best fd rates"],
        response: "Fixed Deposit Investment\n\nPartnering with top-rated public sector banks, private banks, small finance banks, and NBFCs. Interest rates up to 9.10% per annum. Deposit amounts from Rs. 10,000 to Rs. 1 crore and above. Tenure options from 7 days to 10 years. Senior citizens get additional 0.50% interest. DICGC insurance up to Rs. 5 lakhs for bank FDs. Tax saving FDs under Section 80C with 5 year lock-in available.",
        category: "Investment"
      },
      {
        keywords: ["senior citizen fd", "fd for senior citizens", "senior citizen fixed deposit", "higher fd rates for seniors"],
        response: "Senior Citizen Fixed Deposit Benefits\n\nSenior citizens (age 60+ years) get additional 0.50% interest over regular rates. Interest rates up to 9.10% p.a. for senior citizens. Monthly, quarterly, or annual interest payout options. Sweep-in facility available for liquidity. Tax deduction up to Rs. 50,000 on interest for senior citizens under Section 80TTB. Form 15H can be submitted to avoid TDS if income below taxable limit.",
        category: "Investment"
      },
      {
        keywords: ["corporate bonds", "bond investment", "tax free bonds", "psu bonds", "ncd investment"],
        response: "Corporate Bonds and NCDs\n\nInvest in high-quality corporate bonds and Non-Convertible Debentures with returns up to 11% per annum. Options include PSU bonds (AAA rated, 7.5-8.5% returns), tax-free bonds (100% tax exemption, 7.0-7.5% returns), private corporate bonds (8.5-11.5% returns), and state guaranteed bonds (7.8-8.5% returns). Minimum investment Rs. 10,000 for some options. Listed on NSE/BSE for liquidity.",
        category: "Investment"
      },
      {
        keywords: ["sovereign gold bond", "sgb", "gold bond scheme", "digital gold investment", "rbi gold bond"],
        response: "Sovereign Gold Bonds (SGB)\n\nSGBs are RBI issued gold bonds with 2.5% fixed annual interest plus market linked gold returns. Investment in grams of gold with minimum 1 gram. Lock-in period 5 years with exit option after year 5. Maturity 8 years. Tax benefits on capital gains if held till maturity. No GST on purchase. Safe alternative to physical gold. SGB 2024-25 Series currently available.",
        category: "Investment"
      },
      {
        keywords: ["elss mutual fund", "tax saving mutual fund", "80c mutual fund", "elss tax benefit", "best elss funds"],
        response: "ELSS Tax Saving Mutual Funds\n\nEquity Linked Savings Scheme (ELSS) offers tax deduction up to Rs. 1.5 lakhs under Section 80C. Lock-in period of 3 years (shortest among all 80C options). Potential for higher returns as funds invest in equities. Options from top AMCs including Motilal Oswal ELSS, DSP ELSS, Nippon India ELSS, SBI ELSS, HDFC ELSS. High risk with potential for high returns. SIP or lump sum both available.",
        category: "Investment"
      },
      {
        keywords: ["large cap mutual fund", "large cap fund", "bluechip fund", "large cap investment"],
        response: "Large Cap Mutual Funds\n\nLarge cap funds invest in top 100 companies by market capitalization. Lower risk compared to mid and small cap funds. Suitable for conservative equity investors. Expected returns 10-12% over long term. Options include ICICI Prudential Large Cap Fund, Nippon India Large Cap Fund, SBI Large Cap Fund, HDFC Large Cap Fund. SIP starting from Rs. 500. Good for core portfolio allocation.",
        category: "Investment"
      },
      {
        keywords: ["small cap mutual fund", "small cap fund", "mid cap fund", "small cap investment", "mid cap fund investment"],
        response: "Small Cap and Mid Cap Mutual Funds\n\nMid cap funds invest in companies ranked 101-250, offering higher growth potential with higher risk. Small cap funds invest in companies beyond 250, very high risk with potential for highest returns. Options include Nippon India Small Cap Fund, HDFC Small Cap Fund, Sundaram Mid Cap Fund, Edelweiss Mid Cap Fund. Suitable for aggressive investors with 5+ year horizon.",
        category: "Investment"
      },
      {
        keywords: ["nps", "national pension system", "nps investment", "pension scheme", "retirement planning nps"],
        response: "National Pension System (NPS)\n\nNPS is a government-backed retirement savings scheme. Open to Indian citizens aged 18-70 years. Two account types: Tier I (mandatory pension account with lock-in till 60) and Tier II (voluntary savings with no lock-in). Tax benefits under Section 80CCD(1) up to Rs. 1.5 lakhs and additional Rs. 50,000 under 80CCD(1B). At retirement, 60% can be withdrawn tax-free and 40% used to buy annuity for monthly pension.",
        category: "Investment"
      },
      {
        keywords: ["nps vatsalya", "nps for minors", "pension for child", "child pension scheme", "nps minor account"],
        response: "NPS Vatsalya for Minors\n\nA specialized pension scheme for minors (age 0-18 years). Parents can open NPS account for their child. Benefits from long-term compounding up to 60 years of growth. Auto-converts to regular Tier-I NPS account when child becomes adult. Instills early retirement planning habit. Tax benefits for parent under Section 80C. Small contributions can grow into substantial retirement corpus.",
        category: "Investment"
      },
      {
        keywords: ["fractional real estate", "property investment fractional", "real estate investment", "shared property investment", "fractional ownership"],
        response: "Fractional Real Estate Investment\n\nInvest in premium real estate starting from Rs. 5 lakhs. Become co-owner of commercial and residential properties. Benefits include rental yields of 8-14% per annum, capital appreciation, and professional property management. RERA registered properties with 3-tier legal audit. Investment backed by physical real estate assets. Exit through buy-back agreement or secondary marketplace. 15,000+ active investors managing Rs. 2,500+ crores in assets.",
        category: "Investment"
      },
      {
        keywords: ["real estate investment trust", "reit india", "real estate trust", "property reit"],
        response: "Real Estate Investment Options\n\nWe offer fractional real estate ownership in prime commercial and residential properties. Minimum investment starts from Rs. 8 lakhs. Properties include retail/commercial spaces in Pune, residential projects in Panvel. Expected rental yields 8.5-14.5%. Professional property management included. Direct legal ownership through LLP structure. Buy-back agreement available on exit.",
        category: "Investment"
      },
      {
        keywords: ["unlisted shares", "pre ipo investment", "unlisted shares buy", "private equity investment", "pre ipo shares india"],
        response: "Pre-IPO and Unlisted Shares Investment\n\nInvest in high-growth unlisted companies before they go public. Access to fast-growing startups and unicorns at pre-IPO valuations. Minimum investment from Rs. 28,750 depending on company. Shares transferred to your Demat account within 24-48 hours. High return potential post-listing. 150+ companies available including late-stage startups.",
        category: "Investment"
      },
      {
        keywords: ["how to buy unlisted shares", "unlisted shares process", "pre ipo investment process", "buy pre ipo shares", "how to buy shares", "how to buy unlisted"],
        response: "How to Invest in Unlisted Shares\n\nStep 1: Browse and select from curated list of high-growth pre-IPO companies. Step 2: Select number of shares and review investment amount. Step 3: Complete payment via secure gateway with ESCROW protection. Step 4: Shares transferred to your Demat account within 24-48 hours. Step 5: Receive email confirmation and regular portfolio updates. Demat account required for investment.",
        category: "Investment"
      },
      {
        keywords: ["pet insurance", "dog insurance", "cat insurance", "pet health insurance", "pet medical cover"],
        response: "Pet Insurance Plans\n\nComprehensive health coverage for dogs, cats, birds, and exotic pets. Plans starting from Rs. 299 per month. Coverage includes accident cover up to Rs. 5 lakhs, illness protection, surgery and hospitalization, OPD and diagnostic tests, lost pet recovery, and third-party liability. Senior pet plans for ages 7+. Network of 5,000+ veterinary clinics. Cashless claim settlement available.",
        category: "Protection"
      },
      {
        keywords: ["corporate insurance", "business insurance", "commercial insurance", "company insurance", "sme insurance"],
        response: "Corporate Insurance Solutions\n\nComplete business protection including Group Health Insurance (starting Rs. 400/employee/month), Group Personal Accident (starting Rs. 200/employee/year), Group Term Life (starting Rs. 100/employee/year), Workmen Compensation, Fire and Burglary cover, Public Liability, Cyber Insurance, and Director's Liability. Policies from top insurers like HDFC ERGO, ICICI Lombard, New India Assurance, Tata AIG. Customized for IT, manufacturing, healthcare, retail, and construction industries.",
        category: "Protection"
      },

      {
        keywords: ["calculator", "emi calculator", "sip calculator"],
        response: "Planning is the first step to success! We provide various financial calculators to help you estimate your Loan EMIs or Investment returns. You can access them via the 'Calculator' dropdown menu in our navigation bar.",
        category: "General"
      },
      {
        keywords: ['what do you do', 'services', 'financial distribution', 'differential', 'product', 'products', 'what services do you provide', 'service', 'services offered', 'tell me about your services', 'your services', 'service details', 'information about your services', "offers"],
        response: "Comprehensive financial solutions under one roof\n\n**Finance:**\nComprehensive financial solutions under one roof\n✓Home Loan\n✓Personal Loan\n✓Business Loan\n✓SME Loan\n✓Auto Loan\n✓Mortgage Loan\n✓Education Loan\n✓Vehicle Loan\n✓Loan Against Securities\n\n**Protection**\nInsurance solutions to safeguard your future and assets.\n✓Life Insurance\n✓Health Insurance\n✓Motor Insurance\n✓Property Insurance\n✓Travel Insurance\n✓Cattle Insurance\n✓Marine Insurance\n✓Group Medi-Claim Cover\n✓Group Personal Accident Cover\n✓Worker Compensation Insurance\n✓Corporate General Insurance\n\n**Investment**\nStrategic investment options to grow your wealth.\n✓Mutual Funds\n✓Wealth Management\n✓Pension Funds\n✓Stock & Securities\n✓Demat Account\n✓Real Estate Investments\n✓Portfolio Management Service\n✓Alternative Investment Fund\n✓Fixed Deposit\n✓Bonds\n✓Tax Consultancy\n✓Unlisted Shares",
        category: 'Services'
      },
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
        keywords: ['protection services', 'protection', 'only protection', 'what is protection services'],
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
        keywords: ['Life Insurance', 'what is life insurance', 'life insurance', 'what is Life Insurance'],
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

      {
        keywords: ['group of companies', 'group companies', 'official registrations', 'corporate details', 'company registrations', 'CIN', 'LLPIN', 'group entities', 'subsidiaries', 'Infinity Arthvishva Group', 'group structure', 'legal entities'],
        response: "Infinity Arthvishva - Group of Companies\n\n" +
          "Official registrations and corporate details of the Infinity Arthvishva group.\n\n" +

          "**GROUP COMPANY**\n" +
          "Infinity Arthvishva Group Private Limited\n" +
          "CIN: U70200PN2026PTC252411\n" +
          "GST: Under Process\n\n" +

          "**ADVISORY**\n" +
          "Infinity Arthvishva Advisory Private Limited\n" +
          "CIN: U66190PN2025PTC238981\n" +
          "GST: 27AAICI0723K1ZJ\n\n" +

          "**INSURANCE**\n" +
          "Infinity Arthvishva Insurance Broker Private Limited\n" +
          "CIN: U65110PN2025PTC241213\n" +
          "GST: Under Process\n\n" +

          "**MUTUAL FUND**\n" +
          "Infinity Arthvishva Mutual Fund Distributor LLP\n" +
          "LLPIN: ACP-0126\n" +
          "GST: 27AALFI4941B1ZH\n" +
          "ARN: 347839\n\n" +

          "**FINANCE**\n" +
          "Infinity Arthvishva Finance Private Limited\n" +
          "CIN: U64990PN2026PTC253870\n" +
          "GST: Under Process\n\n" +

          "**WEALTH**\n" +
          "Infinity Arthvishva Wealth Private Limited\n" +
          "CIN: U64990PN2026PTC253870\n" +
          "GST: Under Process",
        category: "Company"
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