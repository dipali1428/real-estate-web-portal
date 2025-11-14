"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import AboutSection from "../page/about/page";
import ContactSection from "../page/contact/page";
import ServicesSection from "../page/services/page";
import CibilSection from "../page/cibil/page";
import EMICalculator from "../page/emi/page";

import { useModal } from "../context/ModalContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const { openLogin, openPartner } = useModal();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/page/about", component: AboutSection },
    { label: "Events", href: "/page/event", component: AboutSection },
    { label: "Services", href: "/page/services", component: ServicesSection },
    { label: "Cibil Check", href: "/page/cibil", component: CibilSection },
    // Contact Us removed from here since it will be placed after Calculator
  ];

  const calculatorOptions = [
    { label: "EMI Calculator", href: "/page/emi", component: EMICalculator },
    { label: "SIP Calculator", href: "/page/sip" },
    { label: "SIP Vs EMI", href: "/page/sipVsEmi" },
  ];

  return (
    <header className="bg-linear-to-br from-[#E8F6FA] via-[#F0FAFB] to-[#E9F8F6] backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-[#1CADA3]/20">
      <nav className="container mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <motion.div
          className="flex items-center space-x-2 sm:space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <img
            src="/logo.png"
            alt="Infinity Arthviksha Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative group rounded-lg overflow-hidden cursor-pointer">
              <motion.div
                className="absolute inset-0 rounded-lg bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 opacity-0 group-hover:opacity-100 blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              />
              <a
                href={link.href}
                className="relative z-10 px-3 xl:px-2 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7]"
              >
                {link.label}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}

          {/* Calculator Dropdown - Moved before Contact Us */}
          <motion.div
            className="relative"
            onMouseEnter={() => setIsCalculatorOpen(true)}
            onMouseLeave={() => setIsCalculatorOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative group rounded-lg overflow-hidden cursor-pointer">
              <motion.div
                className="absolute inset-0 rounded-lg bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 opacity-0 group-hover:opacity-100 blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              />
              <button className="relative z-10 px-3 xl:px-4 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] flex items-center space-x-1">
                <span>Calculator</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isCalculatorOpen ? "rotate-180" : ""}`}
                />
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
            </motion.div>

            <AnimatePresence>
              {isCalculatorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-44 md:w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {calculatorOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200"
                      onClick={() => setIsCalculatorOpen(false)}>
                      {option.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Us - Now placed after Calculator */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="relative group rounded-lg overflow-hidden cursor-pointer">
            <motion.div
              className="absolute inset-0 rounded-lg bg-linear-to-r from-[#2076C7]/10 to-[#1CADA3]/10 opacity-0 group-hover:opacity-100 blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0, scale: 0.95 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            />
            <a
              href="/#contact"
              className="relative z-10 px-3 xl:px-2 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7]"
            >
              Contact Us
            </a>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
          </motion.div>

          {/* Buttons */}
          <motion.button
            onClick={openLogin}
            whileHover={{ scale: 1.07, y: -2 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.08 }}
            className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 xl:px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
            Login
          </motion.button>

          <motion.button
            onClick={openPartner}
            whileHover={{ scale: 1.07, y: -2 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.04 }}
            className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 xl:px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-[#E8F6FA] transition-all duration-300 cursor-pointer">
            Become A Partner
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#2076C7]">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-linear-to-br from-[#E8F6FA] via-[#F0FAFB] to-[#E9F8F6] backdrop-blur-md shadow-md">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 py-4">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition text-sm sm:text-base">
                  {link.label}
                </a>
              ))}

              {/* Mobile Calculator Dropdown - Moved before Contact Us */}
              <div className="w-full text-center">
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-sm sm:text-base">
                  <span>Calculator</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isCalculatorOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isCalculatorOpen && (
                  <div className="mt-2 space-y-2">
                    {calculatorOptions.map((option, index) => (
                      <a
                        key={index}
                        href={option.href}
                        onClick={() => {
                          setIsOpen(false);
                          setIsCalculatorOpen(false);
                        }}
                        className="block text-gray-600 hover:text-[#1CADA3] transition text-sm sm:text-base"
                      >
                        {option.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Us - Now placed after Calculator in mobile */}
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium hover:text-[#1CADA3] transition text-sm sm:text-base">
                Contact Us
              </a>

              {/* Mobile Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto justify-center">
                <button
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                  className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition w-[80%] sm:w-auto mx-auto">
                  Login
                </button>
                <button
                  onClick={() => {
                    openPartner();
                    setIsOpen(false);
                  }}
                  className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-2 rounded-lg font-semibold hover:bg-[#E8F6FA] transition w-[80%] sm:w-auto mx-auto">
                  Become A Partner
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;