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

// Main Component for DSA with Single RM
const RelationshipManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appointments' | 'performance'>('profile');

  // Single Relationship Manager for the logged-in DSA
  const relationshipManager: RelationshipManager = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '1800-532-7600',
    position: 'Senior Relationship Manager',
    isAvailable: true
  };

  // DSA-specific appointments
  const appointments: ClientAppointment[] = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '14:30',
      type: 'investment',
      status: 'scheduled'
    },
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
    // Remove any non-digit characters except + for international numbers
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Create tel: link
    const telLink = `tel:${cleanPhoneNumber}`;
    
    // For web browsers, this will try to initiate a call if the device supports it
    // On mobile devices, it will open the dialer with the number
    // On desktop, it may open a calling app or do nothing depending on the system
    window.location.href = telLink;
    
    console.log('Initiating call to:', cleanPhoneNumber);
  };

  const getServiceColor = (service: string) => {
    const serviceColors: { [key: string]: string } = {
      'DSA Support': 'bg-indigo-100 text-indigo-800',
      'Investment Products': 'bg-green-100 text-green-800',
      'Loan Products': 'bg-purple-100 text-purple-800',
      'Insurance Solutions': 'bg-blue-100 text-blue-800',
      'Commission Structure': 'bg-amber-100 text-amber-800'
    };

    return serviceColors[service] || 'bg-slate-100 text-slate-800';
  };

  const getTypeStyles = (type: string) => {
    const styles = {
      loan: 'bg-purple-100 text-purple-800 border-purple-200',
      investment: 'bg-green-100 text-green-800 border-green-200',
      insurance: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return styles[type as keyof typeof styles] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-700">My Relationship Manager</h1>
          <p className="text-slate-600 mt-2">
            Your dedicated partner for business growth and client management
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                RM Profile
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
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
              <div className="bg-[#ffffff] rounded-lg shadow-md border border-slate-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-700">{relationshipManager.name}</h2>
                      <p className="text-slate-700 text-lg">{relationshipManager.position}</p>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${relationshipManager.isAvailable ? 'bg-green-400' : 'bg-red-500'
                          }`}
                      ></div>
                      <span className="text-sm text-slate-700 mt-1">
                        {relationshipManager.isAvailable ? 'Available Now' : 'Currently Busy'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-600 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-slate-600">
                        <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {relationshipManager.email}
                      </div>
                      <button
                        onClick={() => handlePhoneCall(relationshipManager.phone)}
                        className="flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 w-full text-left"
                      >
                        <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="hover:underline">{relationshipManager.phone}</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions Sidebar */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                    {/* Support Hours */}
                    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                      <h3 className="font-semibold text-slate-600 mb-3">Support Hours</h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emergency Support</span>
                          <span className="font-medium text-green-600">24/7</span>
                        </div>
                      </div>
                    </div>
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
                      <h3 className="font-semibold text-slate-700 mb-4">Quick Actions</h3>
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
                          className="w-full border border-slate-300 text-slate-700 py-3 px-4 rounded-lg bg-slate-50 hover:bg-[#00e4d5] transition-colors duration-200 font-medium flex items-center justify-center"
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
          <div className="bg-white rounded-lg shadow-md border border-slate-200">
            <div className="px-6 py-4 border-b bg-[#1CADA3] border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">My Appointments</h3>
              <button
                onClick={handleScheduleNewAppointment}
                className="bg-white text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors duration-200 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Schedule New
              </button>
            </div>

            <div className="p-6">
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-slate-500 text-lg">No upcoming appointments</p>
                  <p className="text-slate-400 text-sm mt-2">Schedule a meeting with your Relationship Manager</p>
                  <button
                    onClick={handleScheduleNewAppointment}
                    className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Schedule New Appointment
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-6 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getTypeStyles(appointment.type)}`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700">{appointment.clientName}</h4>
                          <p className="text-sm text-slate-600">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full border ${getTypeStyles(appointment.type)}`}
                            >
                              {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${appointment.status === 'scheduled'
                                  ? 'bg-green-100 text-green-800'
                                  : appointment.status === 'completed'
                                    ? 'bg-slate-100 text-slate-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="text-[#2076C7] hover:text-[#0068c9] text-sm font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipManager;