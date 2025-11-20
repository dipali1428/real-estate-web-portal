const AboutSection = () => (
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
                        we blend technology and trust to simplify your financial journey.
                        Our expert team provides transparent, unbiased, and goal-oriented financial guidance designed to help you achieve lasting success. By aligning every strategy with your unique investment goals, we ensure sustainable growth, informed decisions, and a secure financial future.
                    </p>
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
                    <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                            alt="Team collaboration at Infinity Arthviksha"
                            className="w-full h-120 object-cover"
                        />
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
                    {/* Unnao Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Unnao Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                Office No -01, Kamlist Tower, Behind Mishra Jewellers, Near Joga Bhogha Chauraha, Nehru Nagar, Shuklaganj, Unnao, Uttar Pradesh-209861
                            </p>
                        </div>
                    </div>

                    {/* Nagpur Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Nagpur Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                Apartment No.202, 2nd Floor, Sharda Enclave, Nagji Bhai Town, Besides Platina Heart Institute, Sitabuldi, Nagpur, Maharashtra-440012
                            </p>
                        </div>
                    </div>

                    {/* Kolkata Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Kolkata Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                PS Qube, Room No 620, 6th Floor, Plot No IID/31/1, NewTown, Kolkata, West Bengal-700135
                            </p>
                        </div>
                    </div>

                    {/* Nashik Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Nashik Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                2064, 2nd Floor Roongta Shopping Hub, Near Hotel Surya, Mumbai Agra Road, Indira Nagar, Nashik, Maharashtra 422009
                            </p>
                        </div>
                    </div>

                    {/* Kolhapur Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Kolhapur Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                Yashonandan Plaza, 1st Floor, Shahupuri 3rd Lane, Near Shubhash Photo, Kolhapur, Maharashtra-416001
                            </p>
                        </div>
                    </div>

                    {/* Chiplun Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Chiplun Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                United Classic, 203/204, 2nd Floor, Near Old S.T. Stand, Chiplun Bazarpeth, Chiplun, Maharashtra - 415605
                            </p>
                        </div>
                    </div>

                    {/* Ratnagiri Branch */}
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#2076C7] mb-3 border-b-2 border-[#2076C7] pb-2">Ratnagiri Branch</h3>
                        <div className="text-gray-600 text-sm">
                            <p>
                                S. No. A-4, Soham Samarth Appartment, S.V.Road, Maruti Madir, Ratnagiri, Maharashtra - 415612
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default AboutSection;