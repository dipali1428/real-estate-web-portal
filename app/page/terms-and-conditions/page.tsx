import React from 'react';
import Head from 'next/head';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 leading-relaxed">
      <Head>
        <title>Terms and Conditions | Infinity Arthvishva</title>
      </Head>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">TERMS AND CONDITIONS</h1>
          <p className="text-gray-500 mt-2 font-medium">Last updated February 27, 2026</p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          
          {/* Agreement Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">AGREEMENT TO OUR LEGAL TERMS</h2>
            <p className="mb-4">
              We are <strong>Infinity Arthvishva</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), a company registered in India at 1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016, Pune, Maharashtra.
            </p>
            <p className="mb-4">
              We operate the website <a href="https://www.infinityarthvishva.com" className="text-blue-600 underline">https://www.infinityarthvishva.com</a> (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
            </p>
            <p className="mb-4">
              You can contact us by phone at 1800-532-7600, email at <a href="mailto:info@infinityarthvishva.com" className="text-blue-600 underline">info@infinityarthvishva.com</a>, or by mail to 1001 & 1201, 7 Business Square by Naiknavare, Ganeshkhind Rd, Near Datta Mandir, Model Colony, Shivajinagar, Pune, Maharashtra 411016, Pune, Maharashtra, India.
            </p>
            <p className="bg-gray-100 p-4 border-l-4 border-gray-900 italic">
              These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Infinity Arthvishva, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>
          </section>

          {/* Table of Contents */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-4">TABLE OF CONTENTS</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700 underline">
              <li><a href="#services">1. OUR SERVICES</a></li>
              <li><a href="#ip-rights">2. INTELLECTUAL PROPERTY RIGHTS</a></li>
              <li><a href="#user-reps">3. USER REPRESENTATIONS</a></li>
              <li><a href="#user-reg">4. USER REGISTRATION</a></li>
              <li><a href="#prohibited">5. PROHIBITED ACTIVITIES</a></li>
              <li><a href="#contributions">6. USER GENERATED CONTRIBUTIONS</a></li>
              <li><a href="#license">7. CONTRIBUTION LICENSE</a></li>
              <li><a href="#management">8. SERVICES MANAGEMENT</a></li>
              <li><a href="#termination">9. TERM AND TERMINATION</a></li>
              <li><a href="#modifications">10. MODIFICATIONS AND INTERRUPTIONS</a></li>
              <li><a href="#governing-law">11. GOVERNING LAW</a></li>
              <li><a href="#dispute">12. DISPUTE RESOLUTION</a></li>
              <li><a href="#corrections">13. CORRECTIONS</a></li>
              <li><a href="#disclaimer">14. DISCLAIMER</a></li>
              <li><a href="#liability">15. LIMITATIONS OF LIABILITY</a></li>
              <li><a href="#indemnification">16. INDEMNIFICATION</a></li>
              <li><a href="#user-data">17. USER DATA</a></li>
              <li><a href="#electronic">18. ELECTRONIC COMMUNICATIONS</a></li>
              <li><a href="#california">19. CALIFORNIA USERS AND RESIDENTS</a></li>
              <li><a href="#misc">20. MISCELLANEOUS</a></li>
              <li><a href="#contact">21. CONTACT US</a></li>
            </ul>
          </section>

          {/* 1. OUR SERVICES */}
          <section id="services">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase">1. OUR SERVICES</h2>
            <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>
            <p className="mt-4">The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services.</p>
          </section>

          {/* 2. INTELLECTUAL PROPERTY RIGHTS */}
          <section id="ip-rights">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase">2. INTELLECTUAL PROPERTY RIGHTS</h2>
            <h3 className="font-bold mb-2">Our intellectual property</h3>
            <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).</p>
            <p className="mt-4">Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p>
            <h3 className="font-bold mt-6 mb-2">Your use of our Services</h3>
            <p>Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable license to: access the Services; and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</p>
          </section>

          {/* 5. PROHIBITED ACTIVITIES */}
          <section id="prohibited">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase">5. PROHIBITED ACTIVITIES</h2>
            <p className="mb-4">You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
            <ul className="list-disc ml-6 space-y-2 text-sm">
              <li>Systematically retrieve data or other content from the Services to create or compile a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorized framing of or linking to the Services.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Delete the copyright or other proprietary rights notice from any Content.</li>
              <li>Attempt to impersonate another user or person or use the username of another user.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism.</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
            </ul>
          </section>

          {/* 11. GOVERNING LAW */}
          <section id="governing-law">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase">11. GOVERNING LAW</h2>
            <p>These Legal Terms shall be governed by and defined following the laws of India. Infinity Arthvishva and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.</p>
          </section>

          {/* 14. DISCLAIMER */}
          <section id="disclaimer">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase text-red-700">14. DISCLAIMER</h2>
            <div className="text-sm font-bold uppercase space-y-4">
              <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.</p>
              <p>WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES.</p>
            </div>
          </section>

          {/* 15. LIMITATIONS OF LIABILITY */}
          <section id="liability">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 uppercase">15. LIMITATIONS OF LIABILITY</h2>
            <p className="text-sm font-bold uppercase">
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          

        </div>

        {/* Sticky Footer for compliance */}
        {/* <div className="p-4 bg-gray-100 text-center text-xs text-gray-500 uppercase tracking-widest border-t border-gray-200">
          © {new Date().getFullYear()} Infinity Arthvishva • All Rights Reserved • This document was generated based on the provided legal screenshots.
        </div> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;