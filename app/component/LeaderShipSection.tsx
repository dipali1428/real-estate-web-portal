// Leadership Team
const LeadershipSection = () => {
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
      title: "Director",
      description: "Mr. Pravin Marathe is a Director at Infinity Arthvishva with over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.",
      image: "/leader/Img3.jpeg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Our Leadership Team
          </h2>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>
          <p className="text-gray-600">
            Meet the experienced professionals leading our success
          </p>
        </div>

        {/* Team Cards - Fixed image cropping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              
              {/* Fixed Image Container */}
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
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
    </section>
  );
};

export default LeadershipSection;