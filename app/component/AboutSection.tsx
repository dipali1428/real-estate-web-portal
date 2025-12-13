
const AboutSection = () => (
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

                        <p className="text-gray-500 text-sm text-center mt-4 italic">
                            Registered and compliant with all regulatory requirements
                        </p>
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
                        At <span className="font-semibold text-[#2076C7]">Infinity Arthvishva</span>,
                        our vision is to seamlessly integrate advanced financial intelligence into everyday life —
                        empowering families across India to achieve stability, growth, and prosperity.
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
                <div className="rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                    <img
                        src="Vietnaam\Vietnaam4.jpeg"
                        alt="Team collaboration at Infinity Arthvishva"
                        className="w-full h-90 object-cover"
                    />
                </div>

            </div>
        </div>
    </section>
);

export default AboutSection;