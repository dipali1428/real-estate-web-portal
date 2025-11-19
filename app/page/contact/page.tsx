// import { MapPin, Phone, Mail } from "lucide-react"

// // Contact Section
// const ContactSection = () => (
//   <section id="contact" className="py-16 bg-gray-50">
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
//           Get In Touch
//         </h2>
//         <p className="text-gray-600">
//           We are here to help, contact us for a free consultation.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Our Address</h3>
//           <div className="space-y-4 mb-6">
//             <div className="flex items-start space-x-3">
//               <MapPin className="w-5 h-5 text-[#2076C7] mt-1 flex-shrink-0" />
//               <p className="text-gray-600">
//                 1001 & 1201, 7 Business Square by Naiknavare,
//                 Ganeshkhind Rd, Near Datta Mandir, Model Colony,
//                 Shivajinagar, Pune, Maharashtra 411016
//               </p>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Phone className="w-5 h-5 text-[#2076C7]" />
//               <p className="text-gray-600">1800-532-7600</p>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Mail className="w-5 h-5 text-[#2076C7]" />
//               <p className="text-gray-600">info@infinityarthvishva.com</p>
//             </div>
//           </div>

//           <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
//             <MapPin className="w-12 h-12 text-gray-400" />
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Send Us A Message</h3>
//           <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7]"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7]"
//             />
//             <input
//               type="tel"
//               placeholder="Your Phone Number"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7]"
//             />
//             <textarea
//               placeholder="Your Message"
//               rows="4"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7]">
//             </textarea>
//             <button className="w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded font-semibold hover:bg-indigo-800 transition cursor-pointer shadow-md hover:shadow-lg">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default ContactSection

import { MapPin, Phone, Mail } from "lucide-react"

// Contact Section
const ContactSection = () => (
  <section id="contact" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
          Get In Touch
        </h2>
        <p className="text-gray-600">
          We are here to help, contact us for a free consultation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Our Address</h3>
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#2076C7] mt-1 shrink-0" />
              <p className="text-gray-600">
                1001 & 1201, 7 Business Square by Naiknavare,
                Ganeshkhind Rd, Near Datta Mandir, Model Colony,
                Shivajinagar, Pune, Maharashtra 411016
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#2076C7]" />
              <p className="text-gray-600">1800-532-7600</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#2076C7]" />
              <p className="text-gray-600">info@infinityarthvishva.com</p>
            </div>
          </div>

          <div className="rounded-lg h-64 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.567683154472!2d73.83634507516995!3d18.543631682537887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06cb7e90001%3A0x2c2f8f5e4e4e4e4e!2s7%20Business%20Square%20by%20Naiknavare%2C%20Ganeshkhind%20Road!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Send Us A Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7] placeholder-gray-400 text-gray-700"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7] placeholder-gray-400 text-gray-700"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7] placeholder-gray-400 text-gray-700"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#2076C7] placeholder-gray-400 text-gray-700">
            </textarea>
            <button className="w-full bg-linear-to-r from-[#2076C7] to-[#1CADA3] text-white py-3 rounded font-semibold hover:bg-indigo-800 transition cursor-pointer shadow-md hover:shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection