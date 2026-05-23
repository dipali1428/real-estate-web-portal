import Image from 'next/image';

const AboutSection = () => {
    const leaders = [
        {
            name: "Mr. Rajesh Parkhi",
            title: "Executive Director",
            description: "MBA in Marketing with 25+ years of experience in retail finance and retail loan structuring.",
            image: "/leader/Image 8.jpeg"
        },
        {
            name: "Mr. Rahul Kangane",
            title: "Chairman and Managing Director",
            description: "15 years of experience in broking and wealth management, specializing in portfolio strategy and market-driven business growth.",
            image: "/leader/rahulsir4.jpeg"
        },
        {
            name: "Mrs. Triveni Deshpande",
            title: "Director - Business Manager",
            description: "30+ years of experience in business management, finance, and IT across India and Australia, specializing in operations and strategic growth.",
            image: "/leader/mrs-deshpande.png"
        },
        {
            name: "Mr. K Krishna",
            title: "Telangana State Director ",
            description: "K Krishna brings 18+ years of banking experience in strategic growth, operational excellence, and client-focused business expansion.",
            image: "/leader/K-Krishna.jpeg"
        },
        {
            name: "Dr. Sanjay Shaha",
            title: "Director – Infinity Arthvishva",
            description: "Dr. Sanjay Shaha is a senior physician with 40+ years of experience, known for strategic vision and ethical leadership.",
            image: "/leader/sanjay-shaha.jpeg"
        },
        {
            name: "Mr. Arun Job",
            title: "Regional Director (Hyderabad)",
            description: "Arun Job brings 20+ years of leadership experience in driving business growth and operational excellence across multiple sectors.",
            image: "/leader/arun-job.png"
        },
        {
            name: "Mr. Pravin Marathe",
            title: "Chief Financial Officer ",
            description: "Pravin Marathe has 18+ years of experience in financial markets with expertise in mutual funds, PMS, and AIFs.",
            image: "/leader/Img3.jpeg"
        },
        {
            name: "Mr. Sandip Powar",
            title: "Vice President",
            description: "Sandip Powar brings 11+ years of expertise in Home Loans and Insurance, driving branch expansion and strategic growth across India.",
            image: "/leader/Sandip-Powar.jpeg"
        },
        {
            name: "Mr. Ajay Mundada",
            title: "Business Growth Officer",
            description: "Ajay Mundada leads business expansion, strategic alliances, and performance-driven growth with a focus on risk management and market adaptability.",
            image: "/leader/Ajay-mundada.jpeg"
        },
        // Branch Heads Start
        {
            name: "Mr. Sharad Kulkarni",
            title: "Regional Business Head (Sangli Branch)",
            description: "Sharad Kulkarni brings 9+ years of lending and 5 years of insurance experience, driving regional growth and client-focused expansion.",
            image: "/leader/Sharad-Kulkarni.jpeg"
        },
        {
            name: "Mr. Anant Chachad",
            title: "Regional Business Head (Kolhapur Branch)",
            description: "With 14+ years of financial services experience with expertise in Mortgage Loans and strategic growth.",
            image: "/leader/Anant-Chachad.jpeg"
        },
        {
            name: "Mr. Kailas Patil",
            title: "Assistant Vice President (Nashik Branch)",
            description: "Kailas Eknath Patil has 15+ years of experience in Home Loans, LAP, and Business Loans, driving regional business growth.",
            image: "/leader/Kailas-Patil.jpeg"
        },
        {
            name: "Mr. Neeraj Mohata",
            title: "Regional Business Head (Nagpur Branch)",
            description: "Neeraj Mohata brings 11+ years of lending experience in sales growth and channel expansion.",
            image: "/leader/Neeraj-Mohata1.jpeg"
        },
        {
            name: "Mr. Pravin Rautray",
            title: "Business Head (Moshi Branch)",
            description: "Pravin Rautray drives growth across Loans and Insurance through strategic expansion and team leadership.",
            image: "/leader/Pravin-Rautray.jpeg"
        },
        {
            name: "Mr. Rahul Gadekar",
            title: "Branch Head (Jalna Branch)",
            description: "Rahul Gadekar has 10+ years of experience in banking and loans, specializing in Home, Car, Education, Mortgage, and Business Loans.",
            image: "/leader/mr-gadekar.png"
        },
        {
            name: "Mr. Yogesh Joshi",
            title: "Branch Head (Chhatrapati Sambhajinagar Branch)",
            description: "Home Loan Professional brings 16 years of experience in Home Loans and relationship management.",
            image: "/leader/mr-joshi.jpeg"
        },
        {
            name: "Mr. Anil Akolkar",
            title: "Investment Professional (Ahilyanagar Branch)",
            description: "Investment Professional has 18 years of experience in Mutual Funds, Insurance, and financial planning.",
            image: "/leader/mr-akolkar.png"
        },
        {
            name: "Mr. Santosh Tupe",
            title: "Tax Consultant & Financial Services (Ahilyanagar Branch)",
            description: "Taxation Professional brings 18+ years of expertise in taxation, compliance, and financial planning.",
            image: "/leader/mr-tupe.jpeg"
        },
        {
            name: "Mr. Pravin Nikam",
            title: "Branch Head (Chhatrapati Sambhajinagar Branch)",
            description: "BFSI Professional has 15+ years of experience in retail lending, Home Loans, LAP, and SME finance.",
            image: "/leader/mr-nikam.png"
        },
        {
            name: "Mr. Sanjay Kankariya",
            title: "Regional Business Head (Chhatrapati Sambhajinagar Branch)",
            description: "Finance and Real Estate Consultant brings 30+ years of experience in finance consultancy and real estate solutions.",
            image: "/leader/mr-kankariya.png"
        },
        {
            name: "Mr. Sumeet Nikalje",
            title: "Branch Manager (Chhatrapati Sambhajinagar Branch)",
            description: "Loan Advisory Professional has 7 years of experience in Business and Personal Loans with expertise in financial planning.",
            image: "/leader/mr-sumeet.png"
        },
        {
            name: "Mr. Manoj Powar",
            title: "Branch Manager (Kolhapur Branch)",
            description: "Kolhapur Branch Manager specializes in branch operations, business growth, and client relationship management.",
            image: "/leader/mr-powar.png"
        },
        {
            name: "Mr. Pravin Swami",
            title: "CRM Manager – Real Estate (PCMC Branch)",
            description: "CRM and Sales Professional has 10+ years of experience in CRM management, sales growth, and loan coordination.",
            image: "/leader/mr-swami.png"
        },
        {
            name: "Mr. Girijatmaj Sarnikar",
            title: "Branch Manager (Jalna Branch)",
            description: "Financial Services Professional brings 2+ years of experience in lending, sales growth, and branch performance.",
            image: "/leader/mr-sarnikar.png"
        },
        {
            name: "Mr. Rajendra Pawar",
            title: "Branch Head (Karad Branch)",
            description: "Karad Branch Head has 5+ years of experience in loans, branch operations, and business growth.",
            image: "/leader/mr-rajendra.png"
        },
    ];

    const branches = [
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Sumeet Nikalje",
            mobile: "+91 96571 95136",
            email: "sumeetnikalje@infinityarthvishva.com",
            lines: ["Office No 507,", "5th Floor, Freedom Tower,", "Akashwani Chowk,", "Chhatrapati Sambhajinagar, Maharashtra – 431001"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Pravin Nikam",
            mobile: "+91 87675 56611",
            email: "pravinnikam@infinityarthvishva.com",
            lines: ["Office No 03,", "Dwarka Complex,", "Mahesh Nagar,", "Chhatrapati Sambhaji Nagar, Maharashtra – 431001"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Yogesh Joshi",
            mobile: "+91 98233 20790",
            email: "yogeshjoshi@infinityarthvishva.com",
            lines: ["N-12 C-133,", "Swami Vivekanand Nagar,", "T V Center Road, Hudco, Opp. Maharshi Statue,", "Chhatrapati Sambhajinagar, Maharashtra - 431001"]
        },
        {
            title: "Ahilyanagar Branch",
            manager: "Mr. Santosh Tupe",
            mobile: "+91 98818 27936",
            email: "santoshtupe@infinityarthvishva.com",
            lines: ["Office No : 3, Rameshwar Appt.,", "Vani Nagar,", "Pipeline Road, Savedi", "Ahilyanagar, Maharashtra - 414003"]
        },
        {
            title: "Chhatrapati Sambhajinagar Branch",
            manager: "Mr. Sanjay Kankariya",
            mobile: "+91 9326009808 / 95116 31210",
            email: "sanjaykankariya@infinityarthvishva.com",
            lines: ["Office Akil Complex, Pundalik Nagar Road", "Opp. Nayara Petrol Pump", "Chhatrapati Sambhajinagar, Maharashtra – 431009"]
        },
        {
            title: "Kolhapur Branch",
            manager: "Mr. Manoj Powar",
            mobile: "+91 99237 37637",
            email: "manojpowar@infinityarthvishva.com",
            lines: ["Dabholkar Corner,", "Amatya Towers,", "Kolhapur, Maharashtra – 416001"]
        },
        {
            title: "Ahilyanagar Branch",
            manager: "Mr. Anil Akolkar",
            mobile: "+91 92707 19400",
            email: "anilakolkar@infinityarthvishva.com",
            website: "www.infinityarthvishva.com",
            lines: ["94, Sahakarnagar,", "Pipeline Road, Savedi,", "Ahilyanagar, Maharashtra – 414003"]
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
            manager: "Mr. Girijatmaj Sarnikar",
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
            title: "Karad Branch",
            manager: "Mr. Rajendra Pawar",
            mobile: "+91 94238 64043",
            email: "karadbranch@infinityarthvishva.com",
            lines: ["Office No 12,", "Prestige Point Pol Wasti, ", "Dhebewadi Road, Agashivnagar", "Karad, Satara, Maharashtra – 415539"]
        },
        {
            title: "Kondhwa Branch",
            manager: "Mr. Ajay Mundada",
            mobile: "+91 94035 79419",
            email: "ajaymundada@gmail.com",
            lines: ["Pukhraj Villa,", "Opp. Shantingar Society,", "Kondhwa Bk,", "Pune, Maharashtra - 411048"]
        },
        {
            title: "Kanpur Branch",
            lines: ["Office No. 01, Kamlist Tower", "Behind Mishra Jewellers, Near Joga Bhogha Chauraha", "Nehru Nagar, Shuklaganj", "Kanpur, Unnao, Uttar Pradesh - 209861"]
        },
        {
            title: "Kolkata Branch",
            lines: ["PS Qube,", "Room No. 620", "6th Floor", "Plot No. IID/31/1, NewTown", "Kolkata, West Bengal - 700135"]
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
            <section id="about" className="py-20" style={{ background: 'linear-gradient(to bottom right, #b5d9f3ff, #ffffffff, #ecf5ecff)' }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            About Us
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed mb-5">
                            At <span className="font-semibold text-[#1CADA3]">Infinity Arthvishva</span>,
                            we believe that your financial success is our true achievement. We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management. With a strong foundation of trust, expertise, and innovation, we strive to simplify finance and empower individuals and businesses to achieve their goals with confidence.
                        </p>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                            At Infinity Arthvishva, we don't just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.
                        </p>

                        {/* Leadership Team Section */}
                        <div className="py-12">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-4xl font-extrabold mb-2 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                                    Our Leadership Team
                                </h2>
                                <div className="w-20 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                                <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                                    Meet the experienced professionals leading our success
                                </p>
                            </div>

                            {/* Row 1: 5 Leaders */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-[90rem] mx-auto mb-10">
                                {leaders.slice(0, 5).map((leader, index) => (
                                    <LeaderCard key={index} leader={leader} />
                                ))}
                            </div>

                            {/* Row 2: Next 4 Leaders */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto mb-14">
                                {leaders.slice(5, 9).map((leader, index) => (
                                    <LeaderCard key={index + 5} leader={leader} />
                                ))}
                            </div>

                            {/* Headline for 3rd row */}
                            <div className="text-center mb-8">
                                <h3 className="text-xl md:text-2xl font-bold text-[#2076C7]">Branch Heads</h3>
                                <div className="w-12 h-0.5 mx-auto bg-[#1CADA3] mt-1"></div>
                            </div>

                            {/* Branch Heads Grid */}
                            <div className="max-w-[90rem] mx-auto">
                                <div className="flex flex-wrap justify-center gap-5">
                                    {leaders.slice(9).map((leader, index) => (
                                        <div key={index + 9} className="w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(33.33%-1.25rem)] lg:w-[calc(20%-1.25rem)]">
                                            <LeaderCard leader={leader} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision Grid - AS IS */}
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

            {/* Unified Branch Section - AS IS */}
            <section id="branches" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-6 max-w-[1600px]">
                    {/* Header - Remains Identical */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
                            Our Branches
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                            Visit us at any of our conveniently located branches across India
                        </p>
                    </div>

                    {/* Grid - Updated to 5 columns on XL screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {branches.map((branch, index) => (
                            <div
                                key={index}
                                className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-[1px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <div className="bg-white rounded-2xl p-5 h-full flex flex-col hover:-translate-y-1 transition-all duration-300">
                                    <h3 className="text-base font-bold text-[#2076C7] mb-2">
                                        {branch.title}
                                    </h3>

                                    {/* Contact Info */}
                                    {(branch.manager || branch.email || branch.mobile) && (
                                        <div className="mb-2 space-y-1 border-b border-gray-100 pb-2 text-[13px]">
                                            {branch.manager && (
                                                <p className="break-all">
                                                    <span className="font-bold text-gray-700">Manager:</span>{" "}
                                                    <span className="text-gray-700 text-[14px]">
                                                        {branch.manager}
                                                    </span>
                                                </p>
                                            )}

                                            {branch.mobile && (
                                                <p>
                                                    <span className="break-all text-gray-700 font-bold">
                                                        Mob:
                                                    </span>{" "}
                                                    <span className="text-gray-700 text-[14px]">
                                                        {branch.mobile}
                                                    </span>
                                                </p>
                                            )}

                                            {branch.email && (
                                                <p className="break-all">
                                                    <span className="font-bold text-gray-700">Email:</span>{" "}
                                                    <span className="text-gray-700 text-[14px]">
                                                        {branch.email}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Address */}
                                    <div className="text-[13px] text-gray-600 leading-snug space-y-1">
                                        <p className="text-gray-700 font-bold mb-2">Address:</p>

                                        {branch.lines.map((line, i) => (
                                            <p key={i}>{line}</p>
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

type Leader = {
    name: string;
    title: string;
    description: string;
    image: string;
};

const LeaderCard = ({ leader }: { leader: Leader }) => (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 h-full flex flex-col">
        <div className="w-full aspect-square overflow-hidden bg-gray-50">
            <Image
                src={leader.image}
                alt={leader.name}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>

        <div className="p-4 text-center flex flex-col flex-grow">
            <h3 className="text-base font-bold text-gray-800 mb-0.5">
                {leader.name}
            </h3>

            <p className="text-[#2076C7] text-[14px] font-semibold mb-2">
                {leader.title}
            </p>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {leader.description}
            </p>
        </div>
    </div>
);

export default AboutSection;