
const AboutSection = () => (
  <section
  id="about"
  className="py-16 sm:py-20 bg-white"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">

      <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent">
        About Us
      </h2>

      <div className="w-20 sm:w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>

      <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
        At <span className="font-semibold text-[#1CADA3]">Infinity Arthvishva</span>, we believe that
        your financial success is our true achievement. We are a one-stop financial advisory firm
        offering end-to-end solutions in loans, investments, insurance, and wealth management.
      </p>

      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        With a strong foundation of trust, expertise, and innovation, we simplify finance and empower
        individuals and businesses to achieve their goals with confidence.
      </p>

      {/* GST & CIN */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">

        <div className="bg-white border border-[#1CADA3]/30 rounded-lg px-5 py-3 shadow-sm text-center w-full sm:w-auto">
          <p className="text-sm font-semibold text-[#1CADA3]">GST Number</p>
          <p className="font-mono text-sm text-gray-700 mt-1 break-all  font-bold">
            27AAICI0723K1ZJ
          </p>
        </div>

        <div className="bg-white border border-[#1CADA3]/30 rounded-lg px-5 py-3 shadow-sm text-center w-full sm:w-auto">
          <p className="text-sm font-semibold text-[#1CADA3]">CIN Number</p>
          <p className="font-mono text-sm text-gray-700 mt-1 break-all  font-bold">
            U66190PN2025PTC238981
          </p>
        </div>

      </div>

    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">

      {/* Left Content */}
      <div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent text-center md:text-left">
          Our Vision
        </h3>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 text-center md:text-left">
          At <span className="font-semibold text-[#2076C7]">Infinity Arthvishva</span>, our vision is
          to integrate advanced financial intelligence into everyday life — empowering families
          across India to achieve stability, growth, and prosperity.
        </p>

        {/* Vision Points */}
        <div className="space-y-6">

          {[
            {
              num: "1",
              title: "Strategic Approach",
              desc: "Innovative loan and investment solutions aligned with your financial goals.",
            },
            {
              num: "2",
              title: "Long-Term Strategy",
              desc: "Financial planning focused on sustainable growth and long-term security.",
            },
            {
              num: "3",
              title: "Growth-Oriented Vision",
              desc: "Personalized strategies designed to expand your financial horizon.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 hover:translate-x-1 transition duration-300"
            >

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                {item.num}
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Right Image */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition duration-500 bg-white">

        <img
          src="/ET Business Award/ET Business Award.jpeg"
          alt="ET Business Award Winner"
          className="w-full h-[260px] sm:h-[320px] lg:h-[360px] object-cover"
        />

        <div className="p-4 sm:p-5 text-center">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            🏆 Winner at ET Business Awards 2025 – Pune
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
);

export default AboutSection;