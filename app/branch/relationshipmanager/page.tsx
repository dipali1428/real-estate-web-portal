'use client';
import React from 'react';

// Types
interface ContactCard {
  id: string;
  name: string;
  phone: string;
  designation: string;
  specialization: string;
}

const RelationshipManager: React.FC = () => {
  // Static Team Data
  const contactCards: ContactCard[] = [
    { id: '1', name: 'Sandip Powar', phone: '+91 9595247614', designation: 'Vice President', specialization: 'Vice President' },
    { id: '3', name: 'Ashwini Kamble', phone: '+91 8007817504', designation: 'Senior Relationship Manager', specialization: 'Health Insurance' },
    { id: '4', name: 'Shweta Dalvi', phone: '+91 9922128499', designation: 'Business Development Manager', specialization: 'Investments' },
    { id: '5', name: 'Rohit Kadam', phone: '+91 9876543214', designation: 'Operation Executive', specialization: 'Accounts' },
    { id: '6', name: 'Rohan Tapdiya', phone: '+91 9067091947', designation: 'Senior Relationship Manager', specialization: 'Motor Insurance' },
    { id: '7', name: 'Rakhi Raut', phone: '+91 8010712260', designation: 'Operation Manager', specialization: 'Home Loan & LAP Loan ' },
    { id: '8', name: 'Vrushali Hirve', phone: '+91 9922128699', designation: 'Area Manager', specialization: 'Life Insurance' },
    { id: '9', name: 'Dipti Waghmare', phone: '+91 9075019467', designation: 'Relationship Manager', specialization: 'Personal Loan & Business Loan' },
    { id: '10', name: 'Ritesh Pardeshi', phone: '+91 8080905911', designation: 'Field Sales Officer', specialization: 'Home Loan' },
    { id: '11', name: 'Rishikesh Sahasrabudhe', phone: '+91 9823272731', designation: 'Relationship Manager', specialization: 'Mutual Fund' },
  ];

  const handlePhoneCall = (phoneNumber: string) => {
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    window.location.href = `tel:${cleanPhoneNumber}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">Our Relationship Manager Team Contacts</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Get in touch with our professional team members for specialized support and business growth.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {contactCards.map((contact) => (
            <div 
              key={contact.id} 
              className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
            >
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 truncate">
                  {contact.name}
                </h3>
                <p className="text-xs text-blue-600 font-semibold mb-2 truncate">
                  {contact.designation}
                </p>
              </div>

              <div className="space-y-3">
                {/* Phone Section */}
                <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <button
                    onClick={() => handlePhoneCall(contact.phone)}
                    className="text-gray-800 hover:text-blue-600 hover:underline transition-colors font-medium"
                  >
                    {contact.phone}
                  </button>
                </div>

                {/* Specialization Section */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    Specialization
                  </p>
                  <p className="text-xs text-gray-700 font-semibold bg-gray-50 p-1.5 rounded">
                    {contact.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Footer */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <p className="text-blue-800 font-medium text-sm sm:text-base">
            Can't find who you're looking for? 
            <span className="block sm:inline ml-0 sm:ml-1 font-bold">
              Call our general helpline: 1800-532-7600
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelationshipManager;