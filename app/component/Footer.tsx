import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => (

  <footer className="bg-[#0B1C2E] text-gray-300 pt-16 pb-10">
    <div className="container mx-auto px-6">
      <div>
        {/* Top Grid Section */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* About Section */}
          <div>
            {/* Title + Description */}
            <div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="font-bold text-2xl mb-4 relative inline-block after:content-[''] after:block after:w-18 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2 mx-auto md:mx-0">
                  About 
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-lg">
                  We are a leading financial advisory firm providing comprehensive
                  solutions across loans, insurance, and investments. Your financial
                  success is our mission.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-25 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#home" className="hover:text-[#1CADA3] transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#1CADA3] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#1CADA3] transition">
                  Services
                </a>
              </li>
              <li>
                {/* <a href="#partner" className="hover:text-[#1CADA3] transition">
                Become A Partner
              </a>*/}
              </li>
              <li>
                <a href="#contact" className="hover:text-[#1CADA3] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-27 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
                Our Services
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Finance & Loans</li>
                <li>Protection & Insurance</li>
                <li>Investments & Wealth</li>
                <li>Portfolio Management</li>
                <li>Mutual Funds</li>
                <li>Demat Services</li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-27 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
                Contact Info
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>1001 & 1201, 7 Business Square</li>
                <li>Shivajinagar, Pune, MH 411016</li>
                <li>
                  <a href="tel:18005327600" className="hover:text-[#1CADA3]">
                    1800-532-7600
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@infinityarthvishva.com"
                    className="hover:text-[#1CADA3]">
                    info@infinityarthvishva.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>

        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8" />

      {/* Bottom Section */}
      <div className="flex flex-col  justify-between items-center gap-6">
        {/* Left Side */}
        <div className="text-center md:text-center">
          <p className="text-sm text-gray-400 mb-2">
            © 2026{" "}
            <span className="font-medium">
              Infinity Arthvishva
            </span>{" "}— All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center  gap-4 text-sm text-gray-400">
            <a
              href="/page/privacypolicy"
              className="hover:text-[#1CADA3] transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="/page/termsconditions"
              className="hover:text-[#1CADA3] transition-colors duration-200">
              Terms & Conditions
            </a>
          </div>
        </div>


      </div>
      {/* Social Icons */}
      <div className="flex justify-center md:justify-center space-x-6 mt-4">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/share/17getCdK5b/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          <Facebook className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/infinity_arthvishva/?utm_source=qr&igsh=MWQ4ZTdraHcwZ3U0MQ%3D%3D#"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          <Instagram className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" />
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
          <Linkedin className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" />
        </a>
      </div>
    </div>

    {/* Bottom Gradient Line */}
    <div className="mt-10 h-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3]" />
  </footer>

);

export default Footer;
