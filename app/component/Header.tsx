"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import AboutSection from "../page/about/page";
import CibilSection from "../page/cibil/page";
import EMICalculator from "../page/emi/page";
import Image from "next/image";
import { useModal } from "../context/ModalContext";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useClientCookie } from "../hooks/useClientCookie";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isMutualFundOpen, setIsMutualFundOpen] = useState(false);
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isRealEstateOpen, setIsRealEstateOpen] = useState(false);
  const [isUnlistedOpen, setIsUnlistedOpen] = useState(false);
  const { openLogin, openPartner, openSignup } = useModal();

  // const router = useRouter();
  // const token = useClientCookie("authToken");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/page/about", component: AboutSection },
    { label: "Events", href: "/page/event", component: AboutSection },
    { label: "Careers", href: "/page/careers" },
    { label: "Cibil Check", href: "/page/cibil", component: CibilSection },
  ];

  const calculatorOptions = [
    { label: "EMI Calculator", href: "/page/emi", component: EMICalculator },
    { label: "SIP Calculator", href: "/page/sip" },
    { label: "SIP Vs EMI", href: "/page/sipVsEmi" },
    { label: "Home Loan Calculator", href: "/page/homeloan" },
    { label: "Personal Loan Calculator", href: "/page/personalloan" },
    { label: "Business Loan Calculator", href: "/page/businessloan" },
    { label: "FD Calculator", href: "/page/fd" },
    { label: "CI Calculator", href: "/page/CompoundInterest" },

  ];

  const loansOptions = [
    { label: "Home Loan", href: "/offers/loans/home-loan" },
    { label: "Personal Loan", href: "/offers/loans/personal-loan" },
    { label: "Business Loan", href: "/offers/loans/business-loan" },
    { label: "Mortgage Loan", href: "/offers/loans/mortgage-loan" },
    { label: "SME Loan", href: "/offers/loans/sme-loan" },
    { label: "Education Loan", href: "/offers/loans/education-loan" },
    { label: "Vehicle Loan", href: "/offers/loans/vehicle-loan" },
    { label: "Loan Against Securities", href: "/offers/loans/loan-against-securities" },
  ];

  const insuranceOptions = [
    { label: "Life Insurance", href: "/products/life-insurance" },
    { label: "Health Insurance", href: "/products/health-insurance" },
    { label: "Motor Insurance", href: "/offers/insurance/motor-insurance" },
    { label: "Travel Insurance", href: "/products/travel-insurance" },
    { label: "Fire Insurance", href: "/offers/insurance/fire-insurance" },
    { label: "Cattle Insurance", href: "/offers/insurance/cattle-insurance" },
    { label: "Marine Insurance", href: "/products/marine-insurance" },
    { label: "Corporate Insurance", href: "/offers/insurance/corporate-insurance" },
    { label: "Loan Protector", href: "/offers/insurance/loan-protector-plan" },
  ];

  const mutualFundOptions = [
    { label: "Mutual Fund", href: "/products/mutualfunds" },
  ];

  const investmentOptions = [
    { label: "PMS", href: "/products/pms/" },
    { label: "AIF", href: "/products/aif/" },
    { label: "Fixed Deposit", href: "/products/FD" },
    { label: "Bonds", href: "/products/bonds" },
    { label: "NCD", href: "/products/NCD" },
    { label: "NPS", href: "/products/nps" },
  ];

  const realEstateOptions = [
    { label: "Real Estate", href: "/products/RealEstate" },
  ];

  const unlistedOptions = [
    { label: "Unlisted", href: "/products/unlisted" },
  ];

  return (
    <header className="bg-linear-to-br from-[#E8F6FA] via-[#F0FAFB] to-[#E9F8F6] backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-[#1CADA3]/20">
      <nav className="max-w-[1600px] container mx-auto px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* <nav className="max-w-[1600px] mx-auto px-4 xl:px-6 2xl:px-8 py-3 flex items-center justify-between"> */}
        {/* Logo Section */}
        <motion.div
            className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>

          <Link href="/">
            <Image
              src="/logo.png"
              alt="Infinity Arthvishva Logo"
              width={200}
              height={200}
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
              priority
            />
          </Link>
          {/* <Image
            src="/logo.png"
            alt="Infinity Arthviksha Logo"
            href="/"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
          /> */}
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-0 xl:space-x-0.5 2xl:space-x-1 font-sans">
          {/* Home Link */}
          {navLinks.slice(0, 1).map((link, i) => (
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
                className="relative z-10 px-2 xl:px-3 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] text-sm xl:text-base">
                {link.label}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}

          {/* Product Dropdown */}
          <motion.div
            className="relative"
            onMouseEnter={() => setIsProductOpen(true)}
            onMouseLeave={() => {
              setIsProductOpen(false);
              setIsLoansOpen(false);
              setIsInsuranceOpen(false);
              setIsMutualFundOpen(false);
              setIsInvestmentOpen(false);
              setIsRealEstateOpen(false);
              setIsUnlistedOpen(false);
            }}>
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
              <button className="relative z-10 px-2 xl:px-3 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] flex items-center space-x-1 text-sm xl:text-base">
                <span>Product</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isProductOpen ? "rotate-180" : ""}`}
                />
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
            </motion.div>

            <AnimatePresence>
              {isProductOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* Loans Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsLoansOpen(true)}
                    onMouseLeave={() => setIsLoansOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Loans</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isLoansOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isLoansOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {loansOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsLoansOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Insurance Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsInsuranceOpen(true)}
                    onMouseLeave={() => setIsInsuranceOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Insurance</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isInsuranceOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isInsuranceOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {insuranceOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsInsuranceOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mutual Fund Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsMutualFundOpen(true)}
                    onMouseLeave={() => setIsMutualFundOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Mutual Fund</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isMutualFundOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isMutualFundOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {mutualFundOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsMutualFundOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Investment Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsInvestmentOpen(true)}
                    onMouseLeave={() => setIsInvestmentOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Investments</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isInvestmentOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isInvestmentOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {investmentOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsInvestmentOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Real Estate Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsRealEstateOpen(true)}
                    onMouseLeave={() => setIsRealEstateOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Real Estate</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isRealEstateOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isRealEstateOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {realEstateOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsRealEstateOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Unlisted Submenu */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsUnlistedOpen(true)}
                    onMouseLeave={() => setIsUnlistedOpen(false)}>
                    <div className="flex items-center justify-between px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 cursor-pointer">
                      <span className="text-sm xl:text-base">Unlisted</span>
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${isUnlistedOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isUnlistedOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-2 w-48 xl:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                          {unlistedOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                              onClick={() => {
                                setIsProductOpen(false);
                                setIsUnlistedOpen(false);
                              }}>
                              {option.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>


          {/* Other Nav Links */}
          {navLinks.slice(1).map((link, i) => (
            <motion.div
              key={i + 1}
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
                className="relative z-10 px-2 xl:px-3 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] text-sm xl:text-base">
                {link.label}
              </a>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}

          {/* Calculator Dropdown */}
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
              <button className="relative z-10 px-2 xl:px-3 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] flex items-center space-x-1 text-sm xl:text-base">
                <span>Calculator</span>
                <ChevronDown
                  size={14}
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
                  className="absolute top-full left-0 mt-2 w-40 xl:w-54 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {calculatorOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.href}
                      className="block px-3 xl:px-4 py-2 text-gray-700 hover:bg-[#E8F6FA] hover:text-[#2076C7] transition-colors duration-200 text-sm xl:text-base"
                      onClick={() => setIsCalculatorOpen(false)}>
                      {option.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Us */}
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
              className="relative z-10 px-1.5 2xl:px-2 py-2 text-gray-700 font-medium transition-colors duration-300 group-hover:text-[#2076C7] text-sm xl:text-base">
              Contact Us
            </a>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-linear-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-300 group-hover:w-full" />
          </motion.div>

          {/* Buttons */}
          <div className="flex items-center space-x-2 xl:space-x-3 pl-1 xl:pl-2 ">
            <motion.button
              onClick={openLogin}
              whileHover={{ scale: 1.07, y: -2 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.08 }}
              className="font-sans bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-2 px-2 xl:px-3 2xl:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-sm xl:text-base whitespace-nowrap">
              Login
            </motion.button>
            {/* NEW SIGNUP BUTTON */}
            <motion.button
              onClick={openSignup}
              whileHover={{ scale: 1.07, y: -2 }}
              transition={{ type: "tween", duration: 0.1 }}
              className="font-sans bg-white text-[#1CADA3] border-2 border-[#1CADA3] py-2 px-2 xl:px-3 2xl:px-4 rounded-lg font-semibold shadow-sm hover:bg-[#E8F6FA] transition-all duration-300 cursor-pointer text-sm xl:text-base whitespace-nowrap">
              Signup
            </motion.button>

            <motion.button
              onClick={openPartner}
              whileHover={{ scale: 1.05, y: -1 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
              className="font-sans bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-2 xl:px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-[#E8F6FA] transition-all duration-300 cursor-pointer text-[13px] xl:text-sm 2xl:text-base whitespace-nowrap"
            >
              {/* Show "Partner" on small desktop, full text on large desktop */}
              <span className="xl:hidden">Partner</span>
              <span className="hidden xl:inline">Become A Partner</span>
            </motion.button>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#2076C7]">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            <div className="flex flex-col items-center space-y-3 py-4">
              {/* Home Link */}
              {navLinks.slice(0, 1).map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition text-base">
                  {link.label}
                </a>
              ))}

              {/* Mobile Product Dropdown */}
              <div className="w-full text-center">
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                  <span>Product</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isProductOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isProductOpen && (
                  <div className="mt-2 space-y-3 pl-4">
                    {/* Mobile Loans Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsLoansOpen(!isLoansOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Loans</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isLoansOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isLoansOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {loansOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsLoansOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Insurance Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Insurance</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isInsuranceOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isInsuranceOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {insuranceOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsInsuranceOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Mutual Fund Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsMutualFundOpen(!isMutualFundOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Mutual Fund</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isMutualFundOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isMutualFundOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {mutualFundOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsMutualFundOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Investment Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsInvestmentOpen(!isInvestmentOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Investment</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isInvestmentOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isInvestmentOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {investmentOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsInvestmentOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Real Estate Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsRealEstateOpen(!isRealEstateOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Real Estate</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isRealEstateOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isRealEstateOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {realEstateOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsRealEstateOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mobile Unlisted Dropdown */}
                    <div className="w-full text-center">
                      <button
                        onClick={() => setIsUnlistedOpen(!isUnlistedOpen)}
                        className="text-gray-600 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
                        <span>Unlisted</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isUnlistedOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isUnlistedOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {unlistedOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.href}
                              onClick={() => {
                                setIsOpen(false);
                                setIsProductOpen(false);
                                setIsUnlistedOpen(false);
                              }}
                              className="block text-gray-500 hover:text-[#1CADA3] transition text-sm">
                              {option.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              {navLinks.slice(1).map((link, i) => (
                <a
                  key={i + 1}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition text-base">
                  {link.label}
                </a>
              ))}

              {/* Mobile Calculator Dropdown */}
              <div className="w-full text-center">
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className="text-gray-700 font-medium hover:text-[#1CADA3] transition flex items-center justify-center space-x-1 mx-auto text-base">
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
                        className="block text-gray-600 hover:text-[#1CADA3] transition text-base">
                        {option.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium hover:text-[#1CADA3] transition text-base">
                Contact Us
              </a>

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-3 pt-2 w-full justify-center items-center">
                <button
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                  className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition w-[80%] max-w-xs mx-auto" >
                  Login
                </button>
                <button
                  onClick={() => { openSignup(); setIsOpen(false); }}
                  className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white px-4 py-2 rounded-lg shadow-md w-[80%] max-w-xs mx-auto" >
                  Signup
                </button>
                <button
                  onClick={() => {
                    openPartner();
                    setIsOpen(false);
                  }}
                  className="bg-white text-[#1CADA3] border-2 border-[#1CADA3] px-4 py-2 rounded-lg font-semibold hover:bg-[#E8F6FA] transition w-[80%] max-w-xs mx-auto">
                  Become A Partner
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Header;