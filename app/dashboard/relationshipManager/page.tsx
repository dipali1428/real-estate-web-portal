
'use client';
import React, { useState } from 'react';

// Types
interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  profileImage?: string;
  bio: string;
  expertise: string[];
  clientsCount: number;
  satisfactionRate: number;
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
    phone: '+1 (555) 123-4567',
    position: 'Senior Relationship Manager',
    department: 'Wealth Management',
    bio: 'Your dedicated Relationship Manager. Specialized in investment portfolios and retirement planning with 10+ years of experience. I help DSAs like you build successful partnerships and grow your business.',
    expertise: ['DSA Support', 'Investment Products', 'Loan Products', 'Insurance Solutions', 'Commission Structure'],
    clientsCount: 45,
    satisfactionRate: 98,
    isAvailable: true
  };

  // DSA-specific appointments
  const appointments: ClientAppointment[] = [
    {
      id: '1',
      clientName: 'John Smith',
      date: '2024-01-15',
      time: '14:30',
      type: 'investment',
      status: 'scheduled'
    },
    {
      id: '2',
      clientName: 'Alice Brown',
      date: '2024-01-16',
      time: '11:00',
      type: 'loan',
      status: 'scheduled'
    },
    {
      id: '3',
      clientName: 'Robert Wilson',
      date: '2024-01-10',
      time: '09:30',
      type: 'insurance',
      status: 'completed'
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

  const getServiceColor = (service: string) => {
    const serviceColors: { [key: string]: string } = {
      'DSA Support': 'bg-indigo-100 text-indigo-800',
      'Investment Products': 'bg-green-100 text-green-800',
      'Loan Products': 'bg-purple-100 text-purple-800',
      'Insurance Solutions': 'bg-blue-100 text-blue-800',
      'Commission Structure': 'bg-amber-100 text-amber-800'
    };
    
    return serviceColors[service] || 'bg-gray-100 text-gray-800';
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
      <div className="max-w-6xl mx-auto">
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
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                RM Profile
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appointments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Appointments ({appointments.filter(a => a.status === 'scheduled').length})
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Performance
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* RM Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-700">{relationshipManager.name}</h2>
                      <p className="text-gray-600 text-lg">{relationshipManager.position}</p>
                      <p className="text-gray-500">{relationshipManager.department}</p>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          relationshipManager.isAvailable ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {relationshipManager.isAvailable ? 'Available Now' : 'Currently Busy'}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{relationshipManager.clientsCount}</div>
                      <div className="text-xs text-gray-600">DSAs Supported</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {relationshipManager.satisfactionRate}%
                      </div>
                      <div className="text-xs text-gray-600">Satisfaction Rate</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-[#2076C7]">5+</div>
                      <div className="text-xs text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">24/7</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">About Your Relationship Manager</h3>
                    <p className="text-gray-700 leading-relaxed">{relationshipManager.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-3">Areas of Support:</h3>
                    <div className="flex flex-wrap gap-2">
                      {relationshipManager.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-2 ${getServiceColor(skill)} text-sm rounded-lg font-medium`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-700 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {relationshipManager.email}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {relationshipManager.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
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
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Send Message
                  </button>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-700 mb-3">Support Hours</h3>
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
                    <span>Emergency Support</span>
                    <span className="font-medium text-green-600">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700">My Appointments</h3>
              <button 
                onClick={handleScheduleNewAppointment}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-[#2076C7] transition-colors duration-200 font-medium flex items-center"
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
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-500 text-lg">No upcoming appointments</p>
                  <p className="text-gray-400 text-sm mt-2">Schedule a meeting with your Relationship Manager</p>
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
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getTypeStyles(appointment.type)}`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700">{appointment.clientName}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full border ${getTypeStyles(appointment.type)}`}
                            >
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

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance Cards */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Total Clients</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-[#2076C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dsaPerformance.totalClients}</div>
              <p className="text-sm text-gray-600 mt-2">Active clients in your portfolio</p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Monthly Target</h3>
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">
                {dsaPerformance.achievedTarget}/{dsaPerformance.monthlyTarget}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round((dsaPerformance.achievedTarget / dsaPerformance.monthlyTarget) * 100)}% of target achieved
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Commission Earned</h3>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">₹{dsaPerformance.commissionEarned.toLocaleString()}</div>
              <p className="text-sm text-gray-600 mt-2">Total commission this month</p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Pending Applications</h3>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-[#2076C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dsaPerformance.pendingApplications}</div>
              <p className="text-sm text-gray-600 mt-2">Applications under process</p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Approval Rate</h3>
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dsaPerformance.approvalRate}%</div>
              <p className="text-sm text-gray-600 mt-2">Application success rate</p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Next Review</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">15th</div>
              <p className="text-sm text-gray-600 mt-2">Monthly performance review</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipManager;