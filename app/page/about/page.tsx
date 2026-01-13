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
                        we believe that your financial success is our true achievement. We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management. With a strong foundation of trust, expertise, and innovation, we strive to simplify finance and empower individuals and businesses to achieve their goals with confidence.
                    </p>
                    <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
                        At Infinity Arthvishva, we don’t just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.
                    </p>

                    {/* GST and CIN Numbers */}
                    <div className="max-w-3xl mx-auto mt-8">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 xl:gap-6">
                            {/* GST Number */}
                            <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">GST Number</div>
                                    <div className="font-mono text-xs mt-1">27AAICI0723K1ZJ</div>
                                </div>
                            </div>

                            {/* CIN Number */}
                            <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">CIN Number</div>
                                    <div className="font-mono text-xs mt-1 break-all">U66190PN2025PTC238981</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROFESSIONAL REGISTRATION DETAILS LAYOUT (NEW) */}
                   <div className="mt-20 max-w-6xl mx-auto px-4">
                    <div className="border-t border-b border-[#1CADA3]/20 py-16">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                                Group Of Companies
                            </h2>
                            <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                                Official corporate and regulatory registrations of the Infinity Arthvishva group.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            
                            {/* ADVISORY CARD */}
                            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
                                <div className="bg-white rounded-[15px] p-8 h-full flex flex-col">
                                    <h5 className="text-[14px] font-black text-gray-600 mb-8 tracking-tight leading-snug min-h-[40px]">
                                        INFINITY ARTHVISHVA <span className="text-[#2076C7]">ADVISORY</span> <br/>PRIVATE LIMITED
                                    </h5>
                                    
                                    <div className="space-y-4 mt-auto">
                                        <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">CIN (Corporate ID)</div>
                                    <div className="font-mono text-xs mt-1">U66190PN2025PTC238981</div>
                                </div>
                            </div>
                                       <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">GST Number</div>
                                    <div className="font-mono text-xs mt-1">27AAICI0723K1ZJ</div>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>

                            {/* INSURANCE CARD */}
                            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
                                <div className="bg-white rounded-[15px] p-8 h-full flex flex-col">
                                    <h5 className="text-[14px] font-black text-gray-600 mb-8 tracking-tight leading-snug min-h-[40px]">
                                        INFINITY ARTHVISHVA <span className="text-[#2076C7]">INSURANCE</span> <br/>BROKER PRIVATE LIMITED
                                    </h5>
                                    
                                    <div className="space-y-4 mt-auto">
                                        <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">CIN (Corporate ID)</div>
                                    <div className="font-mono text-xs mt-1">U65110PN2025PTC241213</div>
                                </div>
                            </div>
                                        <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">GST Number</div>
                                    <div className="font-mono text-xs mt-1">Under Process</div>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>

                            {/* MUTUAL FUND CARD */}
                            <div className="group p-[1px] rounded-2xl bg-linear-to-br from-[#2076C7]/20 to-[#1CADA3]/20 hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-500 shadow-sm hover:shadow-xl">
                                <div className="bg-white rounded-[15px] p-8 h-full flex flex-col">
                                    <h5 className="text-[14px] font-black text-gray-600 mb-8 tracking-tight leading-snug min-h-[40px]">
                                        INFINITY ARTHVISHVA <span className="text-[#2076C7]">MUTUAL FUND</span> <br/>DISTRIBUTOR LLP
                                    </h5>
                                    
                                    <div className="space-y-4 mt-auto">
                                        <div className="grid grid-cols-2 gap-3">
                                             <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">LLPIN</div>
                                    <div className="font-mono text-xs mt-1">ACP-0126</div>
                                </div>
                            </div>
                                            <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">ARN</div>
                                    <div className="font-mono text-xs mt-1">347839</div>
                                </div>
                            </div>
                                        </div>
                                        <div className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-3 xl:px-4 py-2 rounded-lg font-semibold shadow-sm text-sm xl:text-base whitespace-nowrap w-full md:w-auto text-center">
                                <div>
                                    <div className="font-semibold">GST Number</div>
                                    <div className="font-mono text-xs mt-1">27AALFI4941B1ZH</div>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>

                        </div>
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
                </div>
            </div>
        </section>
    </div>
);

export default AboutSection;