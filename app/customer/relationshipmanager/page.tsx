'use client';
import React, { useState, useEffect } from 'react';
import CustomerService from '../../services/customerService';
import { motion } from 'motion/react';
import { UserCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Types
interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactCard {
  id: string;
  name: string;
  phone: string;
  designation: string;
  specialization: string;
}

// Main Component for DSA with Single RM
const RelationshipManager: React.FC = () => {
  // Single Relationship Manager State - Initialized with placeholder
  const [relationshipManager, setRelationshipManager] = useState<RelationshipManager>({
    id: '1',
    name: 'Your RM will be assigned soon',
    email: 'info@infinityarthvishva.com',
    phone: '1800-532-7600'
  });

useEffect(() => {
  const fetchRM = async () => {
    try {
      const response = await CustomerService.getrmcustomer();

      if (response?.success && response?.data) {
        const rmData = response.data;

        setRelationshipManager({
          id: rmData.id?.toString() || 'assigned-rm',
          name: rmData.name || 'Your RM will be assigned soon',
          email: rmData.email || 'info@infinityarthvishva.com',
          phone: rmData.mobile ? `+91 ${rmData.mobile}` : '1800-532-7600'
        });
      }
    } catch (error) {
      toast.error('Failed to fetch RM details. Please try again later.');
    }
  };

  fetchRM();
}, []);

  // Contact Cards Data
  const contactCards: ContactCard[] = [
    { id: '1', name: 'Sandip Powar', phone: '+91 95952 47614', designation: 'Vice President', specialization: 'Vice President' },
    { id: '2', name: 'Satyen Mehta', phone: '+91 98331 96133', designation: 'General Manager', specialization: 'General Manager' },
    { id: '3', name: 'Ashwini Kamble', phone: '+91 80078 17504', designation: 'Senior Relationship Manager', specialization: 'Health Insurance' },
    { id: '4', name: 'Shweta Dalvi', phone: '+91 99221 28499', designation: 'Business Development Manager', specialization: 'Wealth Loan' },
    { id: '5', name: 'Rohit Kadam', phone: '+91 98765 43214', designation: 'Operation Executive', specialization: 'Accounts' },
    { id: '6', name: 'Rohan Tapdiya', phone: '+91 90670 91947', designation: 'Senior Relationship Manager', specialization: 'Motor Insurance' },
    { id: '7', name: 'Rakhi Raut', phone: '+91 80107 12260', designation: 'Operation Manager', specialization: 'Home Loan & LAP Loan ' },
    { id: '8', name: 'Vrushali Hirve', phone: '+91 99221 28699', designation: 'Area Manager', specialization: 'Life Insurance' },
    { id: '9', name: 'Dipti Waghmare', phone: '+91 90750 19467', designation: 'Relationship Manager', specialization: 'Personal Loan & Business Loan' },
    { id: '10', name: 'Ritesh Pardeshi', phone: '+91 80809 05911', designation: 'Field Sales Officer', specialization: 'Home Loan' },
  ];

  // Function to handle phone call
  const handlePhoneCall = (phoneNumber: string) => {
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    const telLink = `tel:${cleanPhoneNumber}`;
    window.location.href = telLink;
  };

  return (
    // Updated: p-4 sm:p-6 and bg-[#F8FAFC] to match Goal Planner exactly
    <div className="flex-1 p-4 sm:p-6 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="w-full">
        
        {/* --- HEADER (Padding p-6 and Margin mb-6 matched to Goal Planner) --- */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-linear-to-r from-[#2076C7] to-[#1CADA3] rounded-2xl p-6 mb-6 text-white shadow-lg"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-5 h-8 text-white" />
                    <h2 className="text-2xl font-bold">My Relationship Manager</h2>
                  </div>
                    <p className="text-sm sm:text-base text-white/80">
                        Your dedicated partner for business growth and client management.
                    </p>
                </div>
            </div>
        </motion.div>

        {/* RM Profile Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg border border-blue-100">
            {/* Keeping your original internal padding of the card */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-700 truncate">
                    {relationshipManager.name}
                  </h2>
                </div>
                <div className="flex items-center shrink-0">
                  <span className="text-[10px] sm:text-xs md:text-sm bg-green-600 text-white px-2 py-1 rounded whitespace-nowrap">
                    Your Assigned RM
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-600 mb-3 text-xs sm:text-sm md:text-base">Contact Information</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">{relationshipManager.email}</span>
                  </div>
                  <button
                    onClick={() => handlePhoneCall(relationshipManager.phone)}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 w-full text-left text-xs sm:text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="hover:underline break-all">{relationshipManager.phone}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Cards Grid Section */}
          <div className="pt-2">
            <div className="mb-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">Our Team Contacts</h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                Get in touch with our professional team members.
              </p>
            </div>

            {/* Grid gap updated to gap-6 to match Goal Planner dashboard cards */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {contactCards.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col min-h-0">
                  <div className="mb-3 shrink-0 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 truncate">
                      {contact.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-blue-600 font-medium truncate">
                      {contact.designation}
                    </p>
                  </div>

                  <div className="space-y-2 grow min-w-0">
                    <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                      <span className="font-medium text-gray-600">Phone Number:</span>{' '}
                      <button
                        onClick={() => handlePhoneCall(contact.phone)}
                        className="text-gray-600 hover:text-blue-600 hover:underline break-all text-left"
                      >
                        {contact.phone}
                      </button>
                    </div>

                    <div className="text-[10px] sm:text-xs text-gray-600 leading-tight">
                      <span className="font-medium text-gray-600">Specialization:</span>{' '}
                      <span className="text-gray-600 break-words">
                        {contact.specialization}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipManager;