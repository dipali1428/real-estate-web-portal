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
        { name: "Home Loan", slug: "../../products/home-loan" },
        { name: "Personal Loan", slug: "../../products/personal-loan" },
        { name: "Business Loan", slug: "../../products/business-loan" },
        { name: "SME Loan", slug: "../../products/sme" },
        // { name: "Auto Loan", slug: "auto-loan" },
        { name: "Mortgage Loan", slug: "../../products/mortgage-loan" },
        { name: "Education Loan", slug: "../../products/educationloan" },
        { name: "Vehicle Loan", slug: "../../products/vehicle-loan" },
        { name: "Credit Card", slug: "credit-card" },
        { name: "Loan Against Securities", slug: "../../products/loan-against-securities" },
      ],
    },
    {
      id: "protection",
      basePath: "offers/protection",
      icon: <PieChart className="w-12 h-12 text-white" />,
      title: "Protection",
      description: "Insurance solutions to safeguard your future and assets.",
      items: [
        { name: "Life Insurance", slug: "../../products/life-insurance" },
        { name: "Health Insurance", slug: "../../products/health-insurance" },
        { name: "Motor Insurance", slug: "../../products/motor-insurance" },
        { name: "Property Insurance", slug: "property-insurance" },
        { name: "Travel Insurance", slug: "../../products/travel-insurance" },
        { name: "Cattle Insurance", slug: "../../products/cattle-insurance" },
        { name: "Marine Insurance", slug: "../../products/marine-insurance" },
        { name: "Pet Insurance", slug: "../../products/pet-insurance" },
        // { name: "Group Medi-Claim Cover", slug: "group-medi-claim-cover" },
        // { name: "Group Personal Accident Cover", slug: "group-personal-accident-cover" },
        // { name: "Worker Compensation Insurance", slug: "worker-compensation-insurance" },
        { name: "Corporate Insurance", slug: "../../products/corporate-insurance" },
      ],
    },
    {
      id: "investment",
      basePath: "products",
      icon: <TrendingUp className="w-12 h-12 text-white" />,
      title: "Investments",
      description: "Strategic investment options to grow your wealth.",
      items: [
        { name: "Mutual Funds", slug: "mutual-funds" },
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
  className="relative py-14 bg-white overflow-hidden"
>
  {/* Background Pattern */}
  <div
    className="absolute inset-0 opacity-[0.02]"
    style={{
      backgroundImage:
        "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
      backgroundSize: "50px 50px",
    }}
  />

  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7]">
          Our Offers
        </span>
      </h2>

      <div className="w-20 h-1 mx-auto bg-linear-to-r from-[#2076C7] via-[#1CADA3] to-[#2076C7] rounded-full mb-3" />

      <p className="text-gray-600 max-w-xl mx-auto text-base">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1CADA3] to-[#2076C7] font-medium">
          Exclusive financial offers tailored to your unique needs
        </span>
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {services.map((service) => (
        <div
          key={service.id}
          className="group bg-white rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2076C7]/10 border border-gray-100 p-5 flex flex-col"
        >

          {/* Icon */}
          <div className="mb-4">
            <div className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] p-3 rounded-full w-fit shadow-sm">
              <div className="transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
            </div>
          </div>

          {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
  {service.title}
</h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {service.description}
          </p>

          {/* Offers */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Available Offers:
            </h4>

            <ul className="space-y-2">
              {service.items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleServiceItemClick(service.basePath, item.slug);
                  }}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gradient-to-r hover:from-[#2076C7]/5 hover:to-[#1CADA3]/5 cursor-pointer transition-all"
                >

                  {/* Check Icon */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center">
                    <span className="text-[#1CADA3] font-bold text-xs">✓</span>
                  </div>

                  {/* Item */}
                  <span className="text-gray-700 text-sm md:text-base font-medium flex-1 hover:text-[#2076C7] transition-colors">
                    {item.name}
                  </span>

                  {/* Arrow */}
                  <ArrowRight className="w-3.5 h-3.5 text-[#1CADA3] opacity-0 group-hover:opacity-100 transition-all" />

                </li>
              ))}
            </ul>
          </div>

        </div>
      ))}

    </div>

  </div>
</section>
  );
};

export default ServicesSection;