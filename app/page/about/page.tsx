import { title } from "process";

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
            title: "General Manager",
            description: "Ajay Mundada As the BGO (Business Growth Officer) at Infinity Arthvishva, he leads business expansion, strategic alliances, and performance-driven growth. With a strong focus on data-backed decision-making, risk management, and market adaptability, he ensures consistent value creation across evolving financial landscapes.",
            image: "/leader/Ajay-mundada.jpeg"
        },
        {
            name: "Mr. Sharad Kulkarni",
            title: "Regional Business Head (Sangli Branch)",
            description: "Mr. Sharad Kulkarni, Regional Business Head – Sangli, brings over 9 years of lending and 5 years of insurance experience, driving regional growth, high-performing teams, and strong client-focused business expansion.",
            image: "/leader/Sharad-Kulkarni.jpeg"
        },
        {
            name: "Mr. Anant Chachad",
            title: "Regional Business Head – Kolhapur",
            description: "Mr. Anant Madhusudan Chachad, Regional Business Head – Kolhapur, brings over 14 years of experience in financial services, leading Mortgage Loans for the West region with expertise in Home Loans, LAP, distribution network development, and strategic portfolio growth.",
            image: "/leader/Anant-Chachad.jpeg"
        },
        {
            name: "Mr. Kailas Patil",
            title: "Assistant Vice President (AVP) – Nashik",
            description: "Mr. Kailas Eknath Patil is a finance professional with 15+ years of experience in Home Loans, LAP, and Business Loans, driving regional growth through strong sales leadership, channel partnerships, and operational excellence.",
            image: "/leader/Kailas-Patil.jpeg"
        },
        {
            name: "Mr. Neeraj Mohata",
            title: "Regional Business Head – Nagpur",
            description: "Mr. Neeraj Mohata brings 11+ years of experience in lending and financial services, driving regional sales growth, channel expansion, and profitable business performance with strong leadership and market expertise.",
            image: "/leader/Neeraj-Mohata1.jpeg"
        },
        {
            name: "Mr. Pravin Rautray",
            title: "Business Head (Moshi Branch )",
            description: "Mr. Pravin Rautray drives growth across Loans and Insurance with a strong track record in building high-performing teams, expanding market reach, and delivering strategic, customer-focused revenue growth.",
            image: "/leader/Pravin-Rautray.jpeg"
        }
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
                            At Infinity Arthvishva, we don’t just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.
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
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
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
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
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

                            {/* Row 3: Remaining 5 Leaders */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[95rem] mx-auto">
                                {leaders.slice(8).map((leader, index) => (
                                    <div
                                        key={index + 8}
                                        className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                        <div className="w-full aspect-[4/5] overflow-hidden">
                                            <img
                                                src={leader.image}
                                                alt={leader.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">{leader.name}</h3>
                                            <p className="text-[#2076C7] text-sm font-semibold mb-3">{leader.title}</p>
                                            <p className="text-gray-800 text-xs leading-relaxed">{leader.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Vision and Points */}
                        <div className="space-y-6">
                            <h3 className="text-3xl md:text-2xl font-bold bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent mb-6 text-center md:text-left">
                                Our Vision
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-6 text-center md:text-left">
                                <span className="font-semibold text-[#2076C7]">Infinity Arthvishva</span>,
                                aims to seamlessly integrate advanced financial intelligence into everyday life — empowering families across India to achieve stability, growth, and prosperity.
                            </p>

                            {/* Highlights */}
                            <div className="space-y-6">
                                {[
                                    {
                                        num: "1",
                                        title: "Strategic Approach",
                                        desc: "We deliver innovative loan and investment solutions that align with your goals.",
                                    },
                                    {
                                        num: "2",
                                        title: "Long-Term Strategy",
                                        desc: "Our plans focus on sustainable financial growth and lasting security.",
                                    },
                                    {
                                        num: "3",
                                        title: "Growth-Oriented Vision",
                                        desc: "We create tailored strategies that help you expand your financial horizon.",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                            {item.num}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Image */}
                        <div className="rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 bg-white">
                            <img
                                src={`${process.env.NEXT_PUBLIC_TEMPLATE_URL}/public/ET-Business-Award/ET-Business-Award.jpeg`}
                                alt="Team collaboration at Infinity Arthviksha"
                                className="w-full h-90 object-cover"
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

            {/* Branch Addresses Section */}
            <section id="branches" className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                            Our Branches
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                            Visit us at any of our conveniently located branches across India
                        </p>
                    </div>

                    {/* All branches in grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                        {/* Branch Card Common Pattern */}
                        {[
                            {
                                title: "Kanpur Branch",
                                lines: [
                                    "Office No. 01, Kamlist Tower",
                                    "Behind Mishra Jewellers, Near Joga Bhogha Chauraha",
                                    "Nehru Nagar, Shuklaganj",
                                    "Kanpur, Unnao, Uttar Pradesh - 209861"
                                ]
                            },
                            {
                                title: "Nagpur Branch",
                                lines: [
                                    "Apartment No. 202, 2nd Floor",
                                    "Sharda Enclave, Nagji Bhai Town",
                                    "Besides Platina Heart Institute, Sitabuldi",
                                    "Nagpur, Maharashtra - 440012"
                                ]
                            },
                            {
                                title: "Kolkata Branch",
                                lines: [
                                    "PS Qube, Room No. 620, 6th Floor",
                                    "Plot No. IID/31/1, NewTown",
                                    "Kolkata, West Bengal - 700135"
                                ]
                            },
                            {
                                title: "Nashik Branch",
                                lines: [
                                    "2064, 2nd Floor",
                                    "Roongta Shopping Hub",
                                    "Near Hotel Surya, Mumbai Agra Road, Indira Nagar",
                                    "Nashik, Maharashtra - 422009"
                                ]
                            },
                            {
                                title: "Kolhapur Branch",
                                lines: [
                                    "Yashonandan Plaza, 1st Floor",
                                    "Shahupuri 3rd Lane",
                                    "Near Shubhash Photo",
                                    "Kolhapur, Maharashtra - 416001"
                                ]
                            },
                            {
                                title: "Chiplun Branch",
                                lines: [
                                    "United Classic, 203/204, 2nd Floor",
                                    "Near Old S.T. Stand",
                                    "Chiplun Bazarpeth",
                                    "Chiplun, Maharashtra - 415605"
                                ]
                            },
                            {
                                title: "Ratnagiri Branch",
                                lines: [
                                    "S. No. A-4",
                                    "Soham Samarth Apartment, S.V. Road",
                                    "Maruti Mandir",
                                    "Ratnagiri, Maharashtra - 415612"
                                ]
                            },
                            {
                                title: "Sangli Branch",
                                lines: [
                                    "1st Floor, Plot No. 103",
                                    "Adity Sai Landmark Near Bhoi Clinic",
                                    "Ram Mandir Chowk",
                                    "Sangli, Maharashtra - 416416"
                                ]
                            }
                        ].map((branch, index) => (
                            <div
                                key={index}
                                className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-[1px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                            >
                                <div className="bg-white rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">

                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                                            {branch.title}
                                        </h3>

                                        <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                                            {branch.lines.map((line, i) => (
                                                <p
                                                    key={i}
                                                    className={i === 0 ? "font-medium text-gray-800" : ""}
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* NEW - Centered container for Moshi and Hyderabad branches */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

                        {/* Moshi Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-[1px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                            <div className="bg-white rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                                        Moshi Branch
                                    </h3>

                                    <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                                        <p className="font-medium text-gray-800">1st Floor, Office No 104</p>
                                        <p>Destination Ostiya</p>
                                        <p>F Building, Alandi Moshi Road</p>
                                        <p>Pune, Maharashtra - 412105</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hyderabad Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-[1px] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                            <div className="bg-white rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
                                        Hyderabad Branch
                                    </h3>

                                    <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                                        <p className="font-medium text-gray-800">Office No: 5B, 5th Floor</p>
                                        <p>Vishwa Heritage Arcade</p>
                                        <p>Near ESI Metro Station, Pillar No. 1010, SR Nagar</p>
                                        <p>Hyderabad, Telangana - 500038</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;