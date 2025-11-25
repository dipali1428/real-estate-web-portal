'use client';
import React, { useState } from 'react';

// Types
interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  profileImage?: string;
  isAvailable: boolean;
  nextAvailable?: string;
}

interface ClientAppointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: 'loan' | 'investment' | 'insurance';
  status: 'scheduled' | 'completed' | 'cancelled';
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
  const [activeTab, setActiveTab] = useState<'profile' | 'appointments' | 'performance'>('profile');

  // Single Relationship Manager for the logged-in DSA
  const relationshipManager: RelationshipManager = {
    id: '1',
    name: 'Ashwini Kamble',
    email: 'info@infinityarthvishva.com',
    phone: '1800-532-7600',
    position: 'Senior Relationship Manager',
    isAvailable: true
  };

  // DSA-specific appointments
  const appointments: ClientAppointment[] = [
    {
      id: '1',
      clientName: 'Ashwini Kamble',
      date: '2024-01-15',
      time: '14:30',
      type: 'investment',
      status: 'scheduled'
    },
  ];

  // Contact Cards Data
  const contactCards: ContactCard[] = [
    {
      id: '1',
      name: 'Sandip Powar',
      phone: '+91-9876543210',
      designation: 'Vice President',
      specialization: 'Vice President'
    },
    {
      id: '2',
      name: 'Satyen Mehta',
      phone: '+91-9876543211',
      designation: 'General Manager',
      specialization: 'General Manager'
    },
    {
      id: '3',
      name: 'Ashwini Kamble',
      phone: '+91 80078 17504',
      designation: 'Senior Relationship Manager',
      specialization: 'Health Insurance'
    },
    {
      id: '4',
      name: 'Shweta Dalvi',
      phone: '+91 99221 28499',
      designation: 'Business Development Manager',
      specialization: 'Wealth Loan'
    },
    {
      id: '5',
      name: 'Akshay Pathak',
      phone: '+91-9876543214',
      designation: 'Relationship Manager',
      specialization: ''
    },
    {
      id: '6',
      name: 'Rohan Tapdiya',
      phone: '+91 90670 91947',
      designation: 'Senior Relationship Manager',
      specialization: 'Motor Insurance'
    },
    {
      id: '7',
      name: 'Rakhi Wankhade',
      phone: '+91 80107 12260',
      designation: 'Operation Manager',
      specialization: ''
    },
    {
      id: '8',
      name: 'Vrushali Hirve',
      phone: '+91 99221 28699',
      designation: 'Area Manager',
      specialization: 'Life Insurance'
    },
    {
      id: '9',
      name: 'Yashraj Naik',
      phone: '+91 90750 19462',
      designation: 'Relationship Manager',
      specialization: ''
    },
    {
      id: '10',
      name: 'Shubham Kshirsagar',
      phone: '+91-9876543219',
      designation: 'Loan Advisor',
      specialization: ''
    },
    {
      id: '11',
      name: 'Ritesh Pardeshi',
      phone: '+91 98765 43210',
      designation: 'Field Sales Officer',
      specialization: ''
    },
    {
      id: '12',
      name: 'Prajakta Deshpande',
      phone: '+91 70574 85583',
      designation: 'Business Co-Ordinator',
      specialization: 'Education Loan'
    },
    {
      id: '13',
      name: 'Girish Bansode',
      phone: '+91 98765 43212',
      designation: 'Business Co-Ordinator',
      specialization: ''
    }
  ];

  // DSA Performance Data
  const dsaPerformance = {
    totalClients: 23,
    monthlyTarget: 50,
    achievedTarget: 35,
    commissionEarned: 12500,
    pendingApplications: 5,
    approvalRate: 85
  };

  // Event handlers
  const handleScheduleMeeting = () => {
    console.log('Schedule meeting with RM');
    alert('Scheduling meeting with your Relationship Manager');
  };

  const handleSendMessage = () => {
    console.log('Send message to RM');
    alert('Opening chat with your Relationship Manager');
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    console.log('Reschedule appointment:', appointmentId);
    alert(`Rescheduling appointment ${appointmentId}`);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    console.log('Cancel appointment:', appointmentId);
    alert(`Canceling appointment ${appointmentId}`);
  };

  const handleScheduleNewAppointment = () => {
    console.log('Schedule new appointment');
    alert('Opening schedule new appointment form');
  };

  // Function to handle phone call
  const handlePhoneCall = (phoneNumber: string) => {
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    const telLink = `tel:${cleanPhoneNumber}`;
    window.location.href = telLink;
    console.log('Initiating call to:', cleanPhoneNumber);
  };

  const getTypeStyles = (type: string) => {
    const styles = {
      loan: 'bg-purple-100 text-purple-800 border-purple-200',
      investment: 'bg-green-100 text-green-800 border-green-200',
      insurance: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">My Relationship Manager</h1>
          <p className="text-gray-600 mt-2">
            Your dedicated partner for business growth and client management
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                RM Profile
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                My Appointments ({appointments.filter(a => a.status === 'scheduled').length})
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'profile' && (
          <div className="gap-6">
            {/* RM Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg shadow-blue-200 border border-blue-200">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-700">{relationshipManager.name}</h2>
                      <p className="text-slate-600 text-lg">{relationshipManager.position}</p>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${relationshipManager.isAvailable ? '' : ''
                          }`}
                      ></div>
                      <span className="text-sm bg-green-600 text-white p-1 rounded-lg text-slate-700 mt-1">
                        {relationshipManager.isAvailable ? 'Your Assigned RM' : 'Your Past RM'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-600 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {relationshipManager.email}
                      </div>
                      <button
                        onClick={() => handlePhoneCall(relationshipManager.phone)}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 w-full text-left"
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="hover:underline">{relationshipManager.phone}</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions Sidebar */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                    {/* Support Hours */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-600 mb-3">Support Hours</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          
                        </div>
                      </div>
                    </div>
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                      <h3 className="font-semibold text-gray-700 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleScheduleMeeting}
                          className="w-full bg-[#2076C7] text-white py-3 px-4 rounded-lg hover:bg-[#0a66bb] transition-colors duration-200 font-medium flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Schedule Meeting
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg bg-gray-50 hover:bg-[#00e4d5] transition-colors duration-200 font-medium flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          Send Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="px-4 sm:px-6 py-4 border-b bg-[#2076C7] border-gray-200 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="text-lg font-medium text-white">My Appointments</h3>
                <button
                  onClick={handleScheduleNewAppointment}
                  className="bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium flex items-center justify-center w-full sm:w-auto"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Schedule New
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6">
              {appointments.length === 0 ? (
                // Empty State
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h4>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Schedule a meeting with your Relationship Manager to get started
                  </p>
                  <button
                    onClick={handleScheduleNewAppointment}
                    className="bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Schedule New Appointment
                  </button>
                </div>
              ) : (
                // Appointments Grid
                <div className="grid gap-4 sm:gap-3">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 bg-white"
                    >
                      {/* Mobile Layout */}
                      <div className="block md:hidden p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getTypeStyles(appointment.type)}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm">{appointment.clientName}</h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getTypeStyles(appointment.type)}`}>
                            {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'scheduled'
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'completed'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>

                        <div className="flex space-x-2 border-t pt-3">
                          <button
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                            className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="flex-1 bg-red-50 text-red-700 py-2 px-3 rounded text-sm font-medium hover:bg-red-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* Tablet Layout */}
                      <div className="hidden md:block lg:hidden p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`p-3 rounded-lg flex-shrink-0 ${getTypeStyles(appointment.type)}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">{appointment.clientName}</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <span className={`px-2 py-1 text-xs rounded-full border ${getTypeStyles(appointment.type)}`}>
                                  {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    appointment.status === 'scheduled'
                                      ? 'bg-green-100 text-green-800'
                                      : appointment.status === 'completed'
                                      ? 'bg-gray-100 text-gray-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4 flex-shrink-0">
                            <button
                              onClick={() => handleRescheduleAppointment(appointment.id)}
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-800 font-medium flex items-center text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid lg:grid-cols-12 items-center p-4">
                        <div className="col-span-1">
                          <div className={`p-3 rounded-lg ${getTypeStyles(appointment.type)}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="col-span-4">
                          <h4 className="font-semibold text-gray-900">{appointment.clientName}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                        </div>
                        
                        <div className="col-span-3">
                          <div className="flex flex-wrap gap-2">
                            <span className={`px-3 py-1 text-sm rounded-full border ${getTypeStyles(appointment.type)}`}>
                              {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                            </span>
                            <span
                              className={`px-3 py-1 text-sm rounded-full ${
                                appointment.status === 'scheduled'
                                  ? 'bg-green-100 text-green-800'
                                  : appointment.status === 'completed'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="col-span-4 flex justify-end space-x-3">
                          <button
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-800 font-medium flex items-center text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Cards Section */}
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Team Contacts</h2>
            <p className="text-gray-600 mt-2">
              Reach out to our specialized team members for specific queries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {contactCards.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{contact.name}</h3>
                  <p className="text-xs text-blue-600 font-medium mb-2">{contact.designation}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Phone: </span>
                    <span className="text-gray-800">{contact.phone}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Specialization: </span>
                    <span className="text-gray-800">{contact.specialization}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipManager;