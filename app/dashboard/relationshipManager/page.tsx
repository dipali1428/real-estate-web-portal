'use client';
import React, { useState, useEffect } from 'react';
import { DashboardService } from '../../services/dashboardService';
import toast from 'react-hot-toast';

// Types
interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  position: string;
  profileImage?: string;
  isAvailable: boolean;
  nextAvailable?: string;
}

interface ContactCard {
  id: string;
  name: string;
  phone: string;
  designation: string;
  specialization: string;
}

const RelationshipManager: React.FC = () => {
  // Single Relationship Manager State
  const [relationshipManager, setRelationshipManager] = useState<RelationshipManager>({
    id: '1',
    name: 'Your RM will be assigned soon',
    email: 'info@infinityarthvishva.com',
    phone: '1800-532-7600',
    city: 'Pune',
    position: 'Senior Relationship Manager',
    isAvailable: true
  });

  // Fetch API Data
  useEffect(() => {
    const fetchRM = async () => {
      try {
        const response = await DashboardService.getAssignedRM();

        if (response.success && response.assigned && response.rm) {
          const rmData = response.rm;
          setRelationshipManager({
            id: 'assigned-rm',
            name: rmData.name || 'Your RM will be assigned soon',
            email: rmData.email || 'info@infinityarthvishva.com',
            phone: (rmData.mobile && rmData.mobile !== 'null') ? rmData.mobile : '1800-532-7600',
            city: (rmData.city && rmData.city !== 'null') ? rmData.city : 'Pune',
            position: rmData.department && rmData.sub_category
              ? `Dept: ${rmData.department} - ${(rmData.sub_category)}`
              : 'Senior Relationship Manager',
            isAvailable: true
          });
        }
      } catch (error) {
        toast.error("Error fetching RM data:");
      }
    };
    fetchRM();
  }, []);

  const contactCards: ContactCard[] = [
    { id: '1', name: 'Sandip Powar', phone: '+91 9595247614', designation: 'Vice President', specialization: 'Vice President' },
    { id: '2', name: 'Satyen Mehta', phone: '+91 9833196133', designation: 'General Manager', specialization: 'General Manager' },
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
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">My Relationship Manager</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Your dedicated partner for business growth and client management
          </p>
        </div>

        <div className="space-y-12">
          {/* RM Profile Card */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-100">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 truncate">{relationshipManager.name}</h2>
                  {(() => {
                    const [deptPart, subPart] = relationshipManager.position.split(" - ");
                    const department = deptPart?.replace("Dept:", "").trim();
                    const subcategories = subPart?.split(",").map(item => item.trim()) || [];

                    return (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold bg-indigo-50 text-blue-500 px-3 py-1 rounded-full">
                          Department : {department}
                        </span>
                        {subcategories.map((item, idx) => (
                          <span key={idx} className="text-xs sm:text-sm bg-indigo-50 text-blue-500 font-semibold px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    );
                  })()}
                </div>
                <div className="flex items-center ml-2 shrink-0">
                  <span className="text-xs sm:text-sm bg-green-600 text-white px-2 py-1 rounded whitespace-nowrap">
                    {relationshipManager.isAvailable ? 'Your Assigned RM' : 'Your Past RM'}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">Contact Information</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">{relationshipManager.email}</span>
                  </div>
                  <button
                    onClick={() => handlePhoneCall(relationshipManager.phone)}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 w-full text-left text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="hover:underline break-all">{relationshipManager.phone}</span>
                  </button>
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="break-all">{relationshipManager.city}</span>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-md">
                  <h3 className="font-semibold text-gray-600 mb-2 text-sm sm:text-base">Support Hours</h3>
                  <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Cards Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Our Team Contacts</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Get in touch with our professional team members for specialized support.
              </p>
            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {contactCards.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col">
                  <div className="mb-3 shrink-0">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{contact.name}</h3>
                    <p className="text-xs text-blue-600 font-medium mb-2 truncate">{contact.designation}</p>
                  </div>

                  <div className="space-y-2 grow">
                    <div className="text-xs text-gray-600 leading-tight">
                      <span className="font-medium">Phone: </span>
                      <button
                        onClick={() => handlePhoneCall(contact.phone)}
                        className="text-gray-800 hover:text-blue-600 hover:underline">
                        {contact.phone}
                      </button>
                    </div>

                    {/* Updated Specialization */}
                    <div className="text-xs text-gray-600 leading-tight flex items-start">
                      <span className="font-medium underline mr-1 shrink-0">
                        Specialization:
                      </span>
                      <span className="text-gray-600 font-semibold  px-1 rounded">
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