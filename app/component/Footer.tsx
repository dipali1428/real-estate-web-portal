import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => (
<footer className="bg-[#0B1C2E] text-gray-300 pt-14 pb-8">

<div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

{/* Top Grid Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

{/* About Section */}
<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
<h3 className="font-bold text-2xl mb-4 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
About
</h3>

<p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-sm">
We are a leading financial advisory firm providing comprehensive
solutions across loans, insurance, and investments. Your financial
success is our mission.
</p>
</div>

{/* Quick Links */}
<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
<h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
Quick Links
</h3>

<ul className="space-y-2 text-sm text-gray-400">
<li><a href="/" className="hover:text-[#1CADA3] transition">Home</a></li>
<li><a href="/page/about" className="hover:text-[#1CADA3] transition">About Us</a></li>
<li><a href="/#services" className="hover:text-[#1CADA3] transition">Services</a></li>
<li><a href="/#contact" className="hover:text-[#1CADA3] transition">Contact Us</a></li>
</ul>
</div>

{/* Services */}
<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
<h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
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

{/* Contact Info */}
<div className="flex flex-col items-center lg:items-start text-center lg:text-left">
<h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-linear-to-r after:from-[#2076C7] after:to-[#1CADA3] after:mt-2">
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
className="hover:text-[#1CADA3]"
>
info@infinityarthvishva.com
</a>
</li>
</ul>
</div>

</div>

{/* Divider */}
<div className="border-t border-gray-700 my-8"></div>

{/* Bottom Section */}
<div className="flex flex-col items-center gap-4 text-center">

<p className="text-sm text-gray-400">
© 2026 <span className="font-medium">Infinity Arthvishva</span> — All Rights Reserved.
</p>

<div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
<a href="/page/privacypolicy" className="hover:text-[#1CADA3] transition">
Privacy Policy
</a>

<span className="text-gray-500">|</span>

<a href="/page/termsconditions" className="hover:text-[#1CADA3] transition">
Terms & Conditions
</a>
</div>

</div>

{/* Social Icons */}
<div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6">

{/* Facebook */}
<a
href="https://www.facebook.com/share/17getCdK5b/"
target="_blank"
rel="noopener noreferrer"
className="group p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
>
<Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white"/>
</a>

{/* Instagram */}
<a
href="https://www.instagram.com/infinity_arthvishva/"
target="_blank"
rel="noopener noreferrer"
className="group p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
>
<Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white"/>
</a>

{/* LinkedIn */}
<a
href="https://www.linkedin.com/in/infinity-arthvishva-b4aa583aa/"
target="_blank"
rel="noopener noreferrer"
className="group p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
>
<Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white"/>
</a>

{/* YouTube */}
<a
href="https://www.youtube.com/channel/UCo51iOv3JuNNfBubF-yx2sw"
target="_blank"
rel="noopener noreferrer"
className="group p-3 rounded-full bg-gray-800 hover:bg-linear-to-r hover:from-[#2076C7] hover:to-[#1CADA3] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
>
<Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white"/>
</a>

{/* Google Play */}
<a
href="https://play.google.com/store/apps/details?id=com.infinityarth.infi_world&pli=1"
target="_blank"
rel="noopener noreferrer"
className="transition-all duration-300 transform hover:-translate-y-1"
>
<img
src="/icons/Google_Play_Store_badge_EN.svg"
alt="Google Play"
className="h-10 sm:h-12 object-contain"
/>
</a>

</div>

</div>

{/* Bottom Gradient */}
<div className="mt-8 h-1 bg-linear-to-r from-[#2076C7] to-[#1CADA3]"></div>

</footer>
);

export default Footer;