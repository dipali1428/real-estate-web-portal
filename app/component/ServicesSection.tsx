"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PieChart, Shield, TrendingUp, ArrowRight } from "lucide-react";

interface ServiceItem {
  name: string;
  slug: string;
}

interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  basePath: string;
  items: ServiceItem[];
}

const ServicesSection = () => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const services: ServiceCategory[] = [
    {
      id: "finance",
      basePath: "offers/finance",
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Finance",
      description: "Comprehensive loan solutions for all your financial needs.",
      items: [
        { name: "Home Loan", slug: "home-loan" },
        { name: "Personal Loan", slug: "personal-loan" },
        { name: "Business Loan", slug: "business-loan" },
        { name: "SME Loan", slug: "sme-loan" },
        { name: "Auto Loan", slug: "auto-loan" },
        { name: "Mortgage Loan", slug: "mortgage-loan" },
        { name: "Education Loan", slug: "education-loan" },
        { name: "Vehicle Loan", slug: "vehicle-loan" },
        { name: "Credit Card", slug: "credit-card" },
        { name: "Loan Against Securities", slug: "loan-against-securities" },
      ],
    },
    {
      id: "protection",
      basePath: "offers/protection",
      icon: <PieChart className="w-12 h-12 text-white" />,
      title: "Protection",
      description: "Insurance solutions to safeguard your future and assets.",
      items: [
        { name: "Life Insurance", slug: "life-insurance" },
        { name: "Health Insurance", slug: "../../products/health-insurance" },
        { name: "Motor Insurance", slug: "motor-insurance" },
        { name: "Property Insurance", slug: "property-insurance" },
        { name: "Travel Insurance", slug: "../../products/travel-insurance" },
        { name: "Cattle Insurance", slug: "../../products/cattle-insurance" },
        { name: "Marine Insurance", slug: "../../products/marine-insurance" },
        // { name: "Group Medi-Claim Cover", slug: "group-medi-claim-cover" },
        // { name: "Group Personal Accident Cover", slug: "group-personal-accident-cover" },
        // { name: "Worker Compensation Insurance", slug: "worker-compensation-insurance" },
        { name: "Corporate Insurance", slug: "corporate-insurance" },
      ],
    },
    {
      id: "investment",
      basePath: "products",
      icon: <TrendingUp className="w-12 h-12 text-white" />,
      title: "Investments",
      description: "Strategic investment options to grow your wealth.",
      items: [
        { name: "Mutual Funds", slug: "mutualfunds" },
        { name: "Unlisted", slug: "unlisted" },
        { name: "PMS", slug: "pms" },
        { name: "AIF", slug: "aif" },
        { name: "NCD Bonds", slug: "NCD" },
        { name: "Fixed Deposits", slug: "FD" },
        { name: "Real Estate", slug: "RealEstate" },
        // { name: "Alternative Investment Fund", slug: "alternative-investment-fund" },
        // { name: "Fixed Deposit", slug: "fixed-deposit" },
        { name: "Bonds", slug: "bonds" },
        // { name: "Tax Consultancy", slug: "tax-consultancy" },
        // { name: "Unlisted Shares", slug: "unlisted-shares" },
      ],
    },
  ];

  const handleServiceItemClick = (basePath: string, itemSlug: string) => {
    router.push(`/${basePath}/${itemSlug}`);
  };
  

  const handleServiceCardClick = (serviceId: string) => {
    router.push(`/offers/${serviceId}`);
  };

  return (
    <section
      id="services"
      className="relative py-16 bg-linear-to-br from-gray-50 to-white text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      {/* Gradient Orbs */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#2076C7]/20 to-[#1CADA3]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" /> */}
      {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#1CADA3]/20 to-[#2076C7]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" /> */}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
              Our Offers
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1CADA3] to-[#2076C7] font-medium">
              Exclusive financial offers tailored to your unique needs
            </span>
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col items-center text-center p-6 hover:shadow-xl hover:shadow-[#2076C7]/10 cursor-pointer border border-gray-100">
              {/* Icon Section */}
              <div className="relative mb-6">
                <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-5 rounded-full flex justify-center items-center shadow-md">
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col items-center w-full z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-[#2076C7] transition-colors duration-300 text-center">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed text-center max-w-xs">
                  {service.description}
                </p>

                {/* Service Items List */}
                <div className="w-full">
                  <h4 className="text-base font-semibold text-gray-700 mb-3 text-center">
                    Available Offers:
                  </h4>
                  <ul className="w-full">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        onMouseEnter={() => setHoveredItem(`${service.id}-${item.slug}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceItemClick(service.basePath, item.slug);
                        }}
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-linear-to-r hover:from-[#2076C7]/5 hover:to-[#1CADA3]/5 transition-all duration-200 cursor-pointer group/item"
                      >
                        <div className="flex items-center space-x-2 justify-center w-full">
                          <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center group-hover/item:scale-105 transition-transform">
                            <span className="text-[#1CADA3] font-bold text-sm">✓</span>
                          </div>
                          <span className="text-gray-700 text-sm group-hover/item:text-[#2076C7] transition-colors text-center">
                            {item.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#1CADA3] opacity-0 transform -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;