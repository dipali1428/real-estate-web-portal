import Image from 'next/image';
import { Manager } from 'socket.io-client';

const AboutSection = () => {
    const leaders = [
        {
            name: "Mr. Rajesh Parkhi",
            title: "Executive Director",
            description: "25+ years of experience in retail finance, MBA in Marketing, with strong expertise in retail loan structuring and driving sustainable business growth.",
            image: "/leader/Image 8.jpeg"
        },
        {
            name: "Mr. Rahul Kangane",
            title: "Chairman and Managing Director",
            description: "15 years of experience in broking and wealth management, specializing in portfolio strategy and delivering strong market insights that drive company growth.",
            image: "/leader/rahulsir4.jpeg"
        },
        {
            name: "Mr. K Krishna",
            title: "Telangana State Director ",
            description: "K Krishna brings 18+ years of banking experience, driving strategic growth, operational excellence, and revenue expansion through high-performing teams and strong client-focused strategies.",
            image: "/leader/K-Krishna.jpeg"
        },
        {
            name: "Dr. Sanjay Shaha",
            title: "Director – Infinity Arthvishva",
            description: "Dr. Sanjay Shaha, Director at Infinity Arthvishva, is a senior physician with 40+ years of experience. National Merit Winner, Gold Medalist & Vijay Ratna Awardee, bringing strategic vision and ethical leadership.",
            image: "/leader/sanjay-shaha.jpeg"
        },
        {
            name: "Mr. Arun Job",
            title: "Regional Director (Hyderabad)",
            description: "With over 20 years of leadership across telecommunications, manufacturing, pharma packaging and banking sectors, Arun Job drives transformative growth and operational excellence. An IIMA alumnus known for building high-performing teams, strategic partnerships, and revenue expansion.",
            image: "/leader/arun-job.png"
        },
        {
            name: "Mr. Pravin Marathe",
            title: "Chief Financial Officer ",
            description: "Mr. Pravin Marathe, CFO at Infinity Arthvishva, has 18+ years of experience in financial markets with expertise in mutual funds, PMS, and AIFs.",
            image: "/leader/Img3.jpeg"
        },
        {
            name: "Mr. Sandip Powar",
            title: "Vice President",
            description: "Mr. Sandip Powar, Vice President, brings 11+ years of expertise in Home Loans and Insurance, leading Pan-India expansion, branch development, and strategic growth with a strong customer-focused approach.",
            image: "/leader/Sandip-Powar.jpeg"
        },
        {
            name: "Mr. Ajay Mundada",
            title: "Business Growth Officer",
            description: "Ajay Mundada As the BGO (Business Growth Officer) at Infinity Arthvishva, he leads business expansion, strategic alliances, and performance-driven growth. With a strong focus on data-backed decision-making, risk management, and market adaptability, he ensures consistent value creation across evolving financial landscapes.",
            image: "/leader/Ajay-mundada.jpeg"
        },
        // Branch Heads Start (Index 8)
        {
            name: "Mr. Sharad Kulkarni",
            title: "Regional Business Head (Sangli Branch)",
            description: "Mr. Sharad Kulkarni, Regional Business Head – Sangli, brings over 9 years of lending and 5 years of insurance experience, driving regional growth, high-performing teams, and strong client-focused business expansion.",
            image: "/leader/Sharad-Kulkarni.jpeg"
        },
        {
            name: "Mr. Anant Chachad",
            title: "Regional Business Head (Kolhapur Branch)",
            description: "Mr. Anant Madhusudan Chachad, Regional Business Head – Kolhapur, brings over 14 years of experience in financial services, leading Mortgage Loans for the West region with expertise in Home Loans, LAP, distribution network development, and strategic portfolio growth.",
            image: "/leader/Anant-Chachad.jpeg"
        },
        {
            name: "Mr. Kailas Patil",
            title: "Assistant Vice President (Nashik Branch)",
            description: "Mr. Kailas Eknath Patil is a finance professional with 15+ years of experience in Home Loans, LAP, and Business Loans, driving regional growth through strong sales leadership, channel partnerships, and operational excellence.",
            image: "/leader/Kailas-Patil.jpeg"
        },
        {
            name: "Mr. Neeraj Mohata",
            title: "Regional Business Head (Nagpur Branch)",
            description: "Mr. Neeraj Mohata brings 11+ years of experience in lending and financial services, driving regional sales growth, channel expansion, and profitable business performance with strong leadership and market expertise.",
            image: "/leader/Neeraj-Mohata1.jpeg"
        },
        {
            name: "Mr. Pravin Rautray",
            title: "Business Head (Moshi Branch)",
            description: "Mr. Pravin Rautray drives growth across Loans and Insurance with a strong track record in building high-performing teams, expanding market reach, and delivering strategic, customer-focused revenue growth.",
            image: "/leader/Pravin-Rautray.jpeg"
        },
        {
            name: "Mr. Rahul Gadekar",
            title: "Branch Head (Jalna Branch)",
            description: "Mr. Rahul Gadekar has 10+ years of banking and finance experience, specializing in Home, Car, Education, Mortgage, and Business Loans. Formerly with State Bank of India, Old Jalna, he is skilled in loan processing and financial advisory across Jalna.",
            image: "/leader/mr-gadekar.png"
        },
        {
            name: "Mr. Yogesh Joshi",
            title: "Branch Head (Chhatrapati Sambhajinagar Branch)",
            description: "Seasoned professional with 16 years of experience in Home Loans. Previously served 5 years at IDBI Bank, 4 years as RM at Fullerton India, and 7 years as a Home Loan counsellor at SBI Bank.",
            image: "/leader/mr-joshi.jpeg"
        },

        {
            name: "Mr. Anil Akolkar",
            title: "Investment Professional",
            description: "Investment Professional with 18 years of experience in Mutual Funds and various insurance products. Specializes in customer-need-based financial planning for early retirement and a bright future.",
            image: "/leader/mr-akolkar.png"
        },
        {
            name: "Mr. Santosh Tupe",
            title: "Tax Consultant & Financial Services (Ahilyanagar Branch)",
            description: "Seasoned professional with 18+ years of experience in taxation, compliance, and planning. He helps clients optimize tax positions and achieve sustainable growth through personalized financial solutions.",
            image: "/leader/mr-tupe.jpeg"
        },
        {
            name: "Mr. Pravin Nikam",
            title: "Branch Head (Chhatrapati Sambhajinagar Branch)",
            description: "Result-oriented BFSI professional with 15+ years of experience in retail lending and sales across HDFC Bank and HDB Financial Services. Expert in Loan Against Property, Home Loans, and SME lending with strong team management skills.",
            image: "/leader/mr-nikam.png"
        },
        // NEW ADDITIONS
        {
            name: "Mr. Sanjay Kankariya",
            title: "Regional Business Head (Chhatrapati Sambhajinagar Branch)",
            description: "With over 30 years of experience in Tax & Finance Consultancy and Real Estate, he has expertise in financial consulting, investment guidance, and real estate solutions across Mumbai, Pune, Nagpur, and Dubai.",
            image: "/leader/mr-kankariya.png"
        },
        {
            name: "Mr. Sumeet Nikalje",
            title: "Branch Manager (Chhatrapati Sambhajinagar Branch)",
            description: "With 7 years of experience in Business and Personal Loans, he specializes in financial planning, loan advisory, and client relationship management, delivering reliable and customer-focused financial solutions.",
            image: "/leader/mr-sumeet.png"
        },
        {
            name: "Mr. Manoj Powar",
            title: "Branch Manager (Kolhapur Branch)",
            description: "Serves as the Branch Manager for the Kolhapur Branch with expertise in Home, Business, and Personal Loans, along with branch operations, business growth, and client relationship management.",
            image: "/leader/mr-powar.png"
        },
        {
            name: "Mr. Pravin Swami",
            title: "CRM Manager – Real Estate (PCMC Branch)",
            description: "With over 10 years of experience in financial institutes and real estate, he specializes in CRM management, sales growth, loan coordination, client relationship management, and delivering seamless customer experiences through effective team coordination and performance optimization.",
            image: "/leader/mr-swami.png"
        },
        {
            name: "Mr. Girijatmaj Sarnikar",
            title: "Branch Manager (Jalna Branch)",
            description: "Mr. Girijatmaj Sarnikar brings 2+ years of experience in Lending and Financial Services, specializing in sales growth, client relationship management, business development, and profitable branch performance through strong leadership and market expertise.",
            image: "/leader/mr-sarnikar.png"
        }

    ];

    const branches = [
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Sumeet Nikalje",
            mobile: "+91 96571 95136",
            email: "sumeetnikalje@infinityarthvishva.com",
            lines: ["Office No 507, 5th Floor, Freedom Tower", "Akashwani Chowk", "Chhatrapati Sambhajinagar, MH – 431001"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Pravin Nikam",
            mobile: "+91 87675 56611",
            email: "pravinnikam@infinityarthvishva.com",
            lines: ["Office No 03, Dwarka Complex", "Mahesh Nagar", "Chhatrapati Sambhaji Nagar, MH – 431001"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Yogesh Joshi",
            mobile: "+91 98233 20790",
            email: "yogeshjoshi@infinityarthvishva.com",
            lines: ["N-12 C-133, Swami Vivekanand Nagar", "T V Center Road, Hudco, Opp. Maharshi Statue", "Chhatrapati Sambhajinagar, MH - 431001"]
        },
        {
            title: "Ahilyanagar Branch",
            manager: "Mr. Santosh Tupe",
            mobile: "+91 98818 27936",
            email: "santoshtupe@infinityarthvishva.com",
            lines: ["Office No : 3, Rameshwar Appt., Vani Nagar", "Pipeline Road, Savedi", "Ahilyanagar, Maharashtra - 414003"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Sanjay Kankariya",
            mobile: "+91 9326009808 / 95116 31210",
            email: "sanjaykankariya@infinityarthvishva.com",
            lines: ["Office Akil Complex, Pundalik Nagar Road", "Opp. Nayara Petrol Pump", "Chhatrapati Sambhajinagar, MH – 431009"]
        },
        {
            title: "Kolhapur Branch",
            manager: "Mr. Manoj Powar",
            mobile: "+91 99237 37637",
            email: "manojpowar@infinityarthvishva.com",
            lines: ["Dabholkar Corner,", "Amatya Towers,", "Kolhapur, Maharashtra – 416001"]
        },
        {
            title: "Nagpur Branch",
            manager: "Mr. Neeraj Mohta",
            mobile: " +91 88050 02728",

            lines: ["Apartment No. 202, 2nd Floor", "Sharda Enclave, Nagji Bhai Town", "Besides Platina Heart Institute, Sitabuldi", "Nagpur, Maharashtra - 440012"]
        },
        {
            title: "Nashik Branch",
            manager: "Mr. Kailas Patil",
            mobile: " +91 832 978 2325",
            email: " kailas@infinityarthvishva.com",
            lines: ["2064, 2nd Floor", "Roongta Shopping Hub", "Near Hotel Surya, Mumbai Agra Road, Indira Nagar", "Nashik, Maharashtra - 422009"]
        },
        {
            title: "Kolhapur Branch",
            manager: "Mr. Anant Chachad",
            mobile: "+91 90498 29090",

            lines: ["Yashonandan Plaza, 1st Floor", "Shahupuri 3rd Lane", "Near Shubhash Photo", "Kolhapur, Maharashtra - 416001"]
        },
        {
            title: "Sangli Branch",
            manager: "Mr. Sharad Kulkarni",
            mobile: "+91 99555 91177",
            email: " sharad@infinityarthvishva.com",
            lines: ["1st Floor, Plot No. 103", "Adity Sai Landmark Near Bhoi Clinic", "Ram Mandir Chowk", "Sangli, Maharashtra - 416416"]
        },
        {
            title: "Moshi Branch",
            manager: "Mr. Pravin Rautray",
            mobile: "+91 77981 82112",
            email: "pravinrautray@infinityarthvishva.com",
            lines: ["1st Floor, Office No 104", "Destination Ostiya", "F Building, Alandi Moshi Road", "Pune, Maharashtra - 412105"]
        },
        {
            title: "Hyderabad Branch",
            manager: "Mr. Mohan Sai",
            mobile: " +91 76708 99115",
            email: "mohan@infintyarthvishva.com",
            lines: ["Office No: 5B, 5th Floor", "Vishwa Heritage Arcade", "Near ESI Metro Station, Pillar No. 1010, SR Nagar", "Hyderabad, Telangana - 500038"]
        },
        {
            title: "Pimpri-Chinchwad Branch",
            manager: "Mr. Pravin Swami",
            mobile: "+91 91463 00555",
            email: "pravinswami@infinityarthvishva.com",
            lines: ["Ganga Aashiyana Sosa Road,", "Near Purnabhamha Hotel,", "Thergaon, Pimpri-Chinchwad,", "Maharashtra - 411033"]
        },
        {
            title: "Jalna Branch",
            manager: "Girijatmaj Sarnikar",
            mobile: "+91 96077 57794",
            email: " girijatmajsarnikar@infinityarthvishva.com",
            lines: ["07, Kalptaru Park", "Opp Jalna Hospital", "Near Ambad Chaufuly", "Jalna, Maharashtra – 431203"]
        },
        {
            title: "Jalna Branch",
            manager: "Mr. Rahul Gadekar",
            mobile: "+91 98901 41450",
            email: "rahulgadekar@infinityarthvishva.com",
            lines: ["Office No 1,", "Base Floor,", "Banjara Tower Ambad Road,", "Jalna, Maharashtra – 431203"]
        },
        {
            title: "Kanpur Branch",
            lines: ["Office No. 01, Kamlist Tower", "Behind Mishra Jewellers, Near Joga Bhogha Chauraha", "Nehru Nagar, Shuklaganj", "Kanpur, Unnao, Uttar Pradesh - 209861"]
        },

        {
            title: "Kolkata Branch",
            lines: ["PS Qube, Room No. 620, 6th Floor", "Plot No. IID/31/1, NewTown", "Kolkata, West Bengal - 700135"]
        },
        {
            title: "Chiplun Branch",
            lines: ["United Classic, 203/204, 2nd Floor", "Near Old S.T. Stand", "Chiplun Bazarpeth", "Chiplun, Maharashtra - 415605"]
        },
        {
            title: "Ratnagiri Branch",
            lines: ["S No. A-4", "Soham Samarth Apartment, S.V. Road", "Maruti Mandir", "Ratnagiri, Maharashtra - 415612"]
        },

    ];

    return (
        <div>
            {/* Original About Section */}
            <section id="about" className="py-20 bg-linear-to-br from-blue-50 via-teal-50 to-emerald-50" style={{ background: 'linear-gradient(to bottom right, #b5d9f3ff, #ffffffff, #ecf5ecff)' }}>
                <div className="container mx-auto px-6">
                    {/* Section Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            About Us
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                            At <span className="font-semibold text-[#1CADA3]">Infinity Arthvishva</span>,
                            we believe that your financial success is our true achievement. We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management. With a strong foundation of trust, expertise, and innovation, we strive to simplify finance and empower individuals and businesses to achieve their goals with confidence.
                        </p>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
                            At Infinity Arthvishva, we don&apos;t just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.
                        </p>

                        {/* Leadership Team Section */}
                        <div className="py-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                    Our Leadership Team
                                </h2>
                                <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                                <p className="text-gray-600">
                                    Meet the experienced professionals leading our success
                                </p>
                            </div>

                            {/* Row 1: 5 Leaders */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[95rem] mx-auto mb-12">
                                {leaders.slice(0, 5).map((leader, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                        <div className="w-full aspect-square overflow-hidden">
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                width={800}
                                                height={360}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                                            <p className="text-[#2076C7] font-semibold mb-3">{leader.title}</p>
                                            <p className="text-gray-800 text-sm leading-relaxed">{leader.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Row 2: 3 Leaders */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                                {leaders.slice(5, 8).map((leader, index) => (
                                    <div
                                        key={index + 5}
                                        className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                        <div className="w-full aspect-square overflow-hidden">
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                width={800}
                                                height={360}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                                            <p className="text-[#2076C7] font-semibold mb-3">{leader.title}</p>
                                            <p className="text-gray-800 text-sm leading-relaxed">{leader.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Headline for 3rd row */}
                            <div className="text-center mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    Branch Heads
                                </h3>
                                <div className="w-16 h-0.5 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mt-2"></div>
                            </div>
                            
                        {/* Branch Heads Grid - Combined for perfect alignment */}
                        <div className="max-w-[95rem] mx-auto mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {leaders.slice(8).map((leader, index) => (
                                    <div
                                        key={index + 8}
                                        className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                    >
                                        <div className="w-full aspect-square overflow-hidden">
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                width={800}
                                                height={360}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{leader.name}</h3>
                                            <p className="text-[#2076C7] font-semibold mb-3">{leader.title}</p>
                                            <p className="text-gray-800 text-sm leading-relaxed">{leader.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Vision Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-3xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6 text-center md:text-left">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6 text-center md:text-left">
                                <span className="font-semibold text-[#2076C7]">Infinity Arthvishva</span>,
                                aims to seamlessly integrate advanced financial intelligence into everyday life — empowering families across India to achieve stability, growth, and prosperity.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { num: "1", title: "Strategic Approach", desc: "We deliver innovative loan and investment solutions that align with your goals." },
                                    { num: "2", title: "Long-Term Strategy", desc: "Our plans focus on sustainable financial growth and lasting security." },
                                    { num: "3", title: "Growth-Oriented Vision", desc: "We create tailored strategies that help you expand your financial horizon." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                            {item.num}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 bg-white">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/ET-Business-Award/ET-Business-Award.jpeg`}
                                alt="Team collaboration"
                                className="w-full h-90 object-cover"
                                width={800}
                                height={360}
                            />
                            <div className="p-4 text-center">
                                <p className="text-lg font-bold text-gray-800">
                                    🏆 Winner at ET Business Awards 2025 – Pune
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unified Branch Section */}
            <section id="branches" className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Our Branches
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                            Visit us at any of our conveniently located branches across India
                        </p>
                    </div>

                    {/* Unified Grid: 4 columns on desktop, all branches follow each other */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {branches.map((branch, index) => (
                            <div
                                key={index}
                                className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-[1px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                            >
                                <div className="bg-white rounded-2xl p-5 h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
                                    <h3 className="text-lg font-bold text-[#2076C7] mb-3 leading-tight">
                                        {branch.title}
                                    </h3>

                                    {/* Highlighted Manager Info */}
                                    {(branch.manager || branch.email || branch.mobile) && (
                                        <div className="mb-4 space-y-1 border-b border-gray-100 pb-3">
                                            {branch.manager && (
                                                <p className="text-sm"><span className="font-bold text-gray-700">Manager:</span> <span className="text-gray-800">{branch.manager}</span></p>
                                            )}
                                            {branch.email && (
                                                <p className="text-sm truncate"><span className="font-bold text-gray-700">Email:</span> <span className="text-gray-800 font-medium">{branch.email}</span></p>
                                            )}
                                            {branch.mobile && (
                                                <p className="text-sm"><span className="font-bold text-gray-700">Mob:</span> <span className="text-gray-800">{branch.mobile}</span></p>
                                            )}
                                        </div>
                                    )}

                                    {/* Address Section */}
                                    <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                                        {branch.lines.map((line, i) => (
                                            <p key={i} className={i === 0 ? "font-medium text-gray-600" : ""}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;