const AboutSection = () => {
    const leaders = [
        {
          name: "Mr. Rajesh Parkhi",
          title: "Executive Director",
          description: "Over 25 years of extensive experience in the retail finance sector with an MBA in Marketing. Expertise in structuring retail loan portfolios and fostering sustainable business growth.",
          image: "/leader/Image 8.jpeg"
        },
        {
          name: "Mr. Rahul Kangane",
          title: "Chairman and Managing Director",
          description: "15 years of expertise in broking and wealth management, with a focus on portfolio strategy. His sharp market insights fuel the company's growth and success.",
          image: "/leader/rahulsir4.jpeg"
        },
        {
          name: "Mr. Pravin Marathe",
          title: "Chief Financial Officer ",
          description: "Mr. Pravin Marathe is a Chief Financial Officer at Infinity Arthvishva with over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.",
          image: "/leader/Img3.jpeg"
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
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
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

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {leaders.map((leader, index) => (
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
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                {leader.name}
                                            </h3>
                                            <p className="text-[#2076C7] font-semibold mb-3">
                                                {leader.title}
                                            </p>
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                {leader.description}
                                            </p>
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
                                src="\ET Business Award\ET Business Award.jpeg"
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Kanpur Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Kanpur Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">Office No. 01, Kamlist Tower</p>
                                    <p>Behind Mishra Jewellers, Near Joga Bhogha Chauraha</p>
                                    <p>Nehru Nagar, Shuklaganj</p>
                                    <p>Kanpur, Unnao, Uttar Pradesh - 209861</p>
                                </div>
                            </div>
                        </div>

                        {/* Nagpur Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Nagpur Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">Apartment No. 202, 2nd Floor</p>
                                    <p>Sharda Enclave, Nagji Bhai Town</p>
                                    <p>Besides Platina Heart Institute, Sitabuldi</p>
                                    <p>Nagpur, Maharashtra - 440012</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolkata Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Kolkata Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">PS Qube, Room No. 620, 6th Floor</p>
                                    <p>Plot No. IID/31/1, NewTown</p>
                                    <p>Kolkata, West Bengal - 700135</p>
                                </div>
                            </div>
                        </div>

                        {/* Nashik Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Nashik Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">2064, 2nd Floor</p>
                                    <p>Roongta Shopping Hub</p>
                                    <p>Near Hotel Surya, Mumbai Agra Road, Indira Nagar</p>
                                    <p>Nashik, Maharashtra - 422009</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolhapur Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Kolhapur Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">Yashonandan Plaza, 1st Floor</p>
                                    <p>Shahupuri 3rd Lane</p>
                                    <p>Near Shubhash Photo</p>
                                    <p>Kolhapur, Maharashtra - 416001</p>
                                </div>
                            </div>
                        </div>

                        {/* Chiplun Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Chiplun Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">United Classic, 203/204, 2nd Floor</p>
                                    <p>Near Old S.T. Stand</p>
                                    <p>Chiplun Bazarpeth</p>
                                    <p>Chiplun, Maharashtra - 415605</p>
                                </div>
                            </div>
                        </div>


                        {/* Ratnagiri Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ratnagiri Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">S. No. A-4</p>
                                    <p>Soham Samarth Apartment, S.V. Road</p>
                                    <p>Maruti Mandir</p>
                                    <p>Ratnagiri, Maharashtra - 415612</p>
                                </div>
                            </div>
                        </div>
                        {/* Sangli Branch */}
                        <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-0.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="bg-white rounded-xl p-5 h-full">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Sangli Branch</h3>
                                <div className="text-gray-600 text-sm leading-relaxed space-y-2">
                                    <p className="font-medium text-gray-700">1st Floor, Plot No. 103</p>
                                    <p>Adity Sai Landmark Near Bhoi Clinic</p>
                                    <p>Ram Mandir Chowk</p>
                                    <p>Sangli,Maharashtra - 416416 </p>
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