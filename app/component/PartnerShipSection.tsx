"use client";
import { Users, Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const stats = [
  {
    icon: <Users className="w-14 h-14 text-[#1CADA3]" />,
    title: "Trusted Partnerships",
    value: "2700+",
    subtitle: "Active DSA & Partners",
  },
  {
    icon: <Building2 className="w-14 h-14 text-[#1CADA3]" />,
    title: "Pan India Presence",
    value: "20+",
    subtitle: "Branches Across India",
  },
  {
    icon: <MapPin className="w-14 h-14 text-[#1CADA3]" />,
    title: "Cities Covered",
    value: "127+",
    subtitle: "Across India",
  },
];

const PartnershipSection = () => {
  const { openPartner } = useModal();

  return (
    <section
      id="partner"
      className="relative py-24 bg-linear-to-br from-[#E8F6FA] via-[#F0FAFB] to-[#E9F8F6] overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-[#1CADA3]/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#2076C7]/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Become Our Partner
          </h2>
          <div className="w-28 h-1 mx-auto bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Join our growing network and unlock success with powerful tools, expert
            support, and a nationwide platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -20, x: 10, rotate: 1 }}
              className="group relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-md 
             transition-all duration-700 ease-out hover:shadow-[0_0_30px_5px_rgba(28,173,163,0.3)] 
             hover:-translate-y-2 hover:scale-[1.02]">

              {/* Blue gradient overlay (hidden by default) */}
              <div className="absolute inset-0 bg-linear-to-br from-[#2076C7] to-[#1CADA3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glow ring border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 delay-200 ring-2 ring-[#1CADA3]/30"></div>

              {/* Card content */}
              <div className="relative z-10 p-8 text-center transition-all duration-700 ease-in-out">
                <div className="flex justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  <div className="text-[#1CADA3] group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 group-hover:text-white mb-1 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-4xl font-bold text-[#2076C7] group-hover:text-white mb-1 transition-colors duration-500">
                  {item.value}
                </p>
                <p className="text-gray-600 group-hover:text-gray-100 transition-colors duration-500">
                  {item.subtitle}
                </p>
              </div>

            </motion.div>
          ))}
        </div>


        {/* Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          <button
            onClick={openPartner}
            className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-10 py-3.5 rounded-full font-semibold shadow-md hover:shadow-[#1CADA3]/40 hover:scale-105 transition-all duration-300 relative overflow-hidden cursor-pointer">
            <span className="relative z-10">Partner With Us Today</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
