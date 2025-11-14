import { PieChart, Shield, TrendingUp } from "lucide-react";

const ServicesSection = () => {
    const services = [
        {
            icon: <Shield className="w-12 h-12 text-white" />,
            title: "Finance",
            description: "Comprehensive loan solutions for all your financial needs.",
            items: [
                "Home Loan",
                "Personal Loan",
                "Business Loan",
                "SME Loan",
                "Auto Loan",
                "Mortgage Loan",
                "Education Loan",
                "Vehicle Loan",
                "Loan Against Securities",
            ],
        },
        {
            icon: <PieChart className="w-12 h-12 text-white" />,
            title: "Protection",
            description: "Insurance solutions to safeguard your future and assets.",
            items: [
                "Life Insurance",
                "Health Insurance",
                "Motor Insurance",
                "Property Insurance",
                "Travel Insurance",
                "Cattle Insurance",
                "Marine Insurance",
                "Group Medi-Claim Cover",
                "Group Personal Accident Cover",
                "Worker Compensation Insurance",
                "Corporate General Insurance",
            ],
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-white" />,
            title: "Investment",
            description: "Strategic investment options to grow your wealth.",
            items: [
                "Mutual Funds",
                "Wealth Management",
                "Pension Funds",
                "Stock & Securities",
                "Demat Account",
                "Real Estate Investments",
                "Portfolio Management Service",
                "AIF",
                "Fixed Deposit",
                "Bonds",
                "Tax Consultancy",
                "Unlisted Shares",
            ],
        },
    ];

    return (
        <section
            id="services"
            className="relative py-20 bg-white text-white overflow-hidden">
            {/* Subtle gradient overlay for readability */}
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>

            <div className="relative container mx-auto px-4">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
                        Our Services
                    </h2>

                    <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-4"></div>

                    <p className="text-lg text-white/90">
                        <span className="bg-linear-to-r from-[#1CADA3] to-[#2076C7] bg-clip-text text-transparent font-medium">
                            Comprehensive financial solutions under one roof
                        </span>
                    </p>
                </div>


                {/* Service Cards */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg 
                 hover:shadow-2xl transition-all duration-300 overflow-hidden 
                 hover:-translate-y-2 flex flex-col items-center text-center p-6">
                            {/* Icon Section */}
                            <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-6 rounded-full flex justify-center items-center mb-6 shadow-md">
                                <div className="transform transition-transform duration-500 group-hover:scale-110">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl md:text-2xl font-bold mb-3 text-[#2076C7] group-hover:text-[#1CADA3] transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-base md:text-lg mb-5 max-w-xs leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                                    {service.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center justify-center">
                                            <span className="text-[#1CADA3] mr-2 font-semibold">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Subtle floating shapes in background */}
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        </section>
    );
};

export default ServicesSection;
