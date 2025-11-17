// RelationshipManager.tsx
"use client";
import React, { useState, useMemo } from 'react';

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

// Manager Card Component
const ManagerCard: React.FC<{
  manager: RelationshipManager;
  onScheduleMeeting: (managerId: string) => void;
  onSendMessage: (managerId: string) => void;
}> = ({ manager, onScheduleMeeting, onSendMessage }) => {
  const getServiceColor = (service: string) => {
    const serviceColors: { [key: string]: string } = {
      'Investment Planning': 'bg-green-100 text-green-800',
      'Retirement Funds': 'bg-green-100 text-green-800',
      'Portfolio Management': 'bg-green-100 text-green-800',
      'Stock Investments': 'bg-green-100 text-green-800',
      'Mutual Funds': 'bg-green-100 text-green-800',
      'Market Analysis': 'bg-green-100 text-green-800',
      'Business Loans': 'bg-purple-100 text-purple-800',
      'Mortgages': 'bg-purple-100 text-purple-800',
      'Personal Loans': 'bg-purple-100 text-purple-800',
      'Residential Mortgages': 'bg-purple-100 text-purple-800',
      'Commercial Mortgages': 'bg-purple-100 text-purple-800',
      'Refinancing': 'bg-purple-100 text-purple-800',
      'Life Insurance': 'bg-blue-100 text-blue-800',
      'Health Insurance': 'bg-blue-100 text-blue-800',
      'Business Insurance': 'bg-blue-100 text-blue-800'
    };
    
    return serviceColors[service] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{manager.name}</h3>
            <p className="text-gray-600">{manager.position}</p>
            <p className="text-sm text-gray-500">{manager.department}</p>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                manager.isAvailable ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {manager.isAvailable ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{manager.clientsCount}</div>
            <div className="text-xs text-gray-500">Clients</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {manager.satisfactionRate}%
            </div>
            <div className="text-xs text-gray-500">Satisfaction</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{manager.bio}</p>

        {/* Expertise */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Areas of Expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {manager.expertise.map((skill, index) => (
              <span
                key={index}
                className={`px-3 py-1 ${getServiceColor(skill)} text-xs rounded-full font-medium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {manager.email}
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {manager.phone}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-3">
          <button 
            onClick={() => onScheduleMeeting(manager.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Meeting
          </button>
          <button 
            onClick={() => onSendMessage(manager.id)}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Send Message
          </button>
        </div>

        {!manager.isAvailable && manager.nextAvailable && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Next available: {new Date(manager.nextAvailable).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Appointments List Component
const AppointmentsList: React.FC<{
  appointments: ClientAppointment[];
  onReschedule: (appointmentId: string) => void;
  onCancel: (appointmentId: string) => void;
  onScheduleNew: () => void;
}> = ({ appointments, onReschedule, onCancel, onScheduleNew }) => {
  const getTypeStyles = (type: string) => {
    const styles = {
      loan: 'bg-purple-100 text-purple-800 border-purple-200',
      investment: 'bg-green-100 text-green-800 border-green-200',
      insurance: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusStyles = (status: string) => {
    const styles = {
      scheduled: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">My Appointments</h3>
        <button 
          onClick={onScheduleNew}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center"
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
            <p className="text-gray-400 text-sm mt-2">Schedule your first appointment with one of our relationship managers</p>
            <button 
              onClick={onScheduleNew}
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
                    <h4 className="font-semibold text-gray-900">{appointment.clientName}</h4>
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
                        className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(appointment.status)}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onReschedule(appointment.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Reschedule
                  </button>
                  <button 
                    onClick={() => onCancel(appointment.id)}
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
  );
};

// Filters Component
const ManagerFilters: React.FC<{
  managers: RelationshipManager[];
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (available: boolean) => void;
}> = ({ managers, selectedDepartment, onDepartmentChange, availableOnly, onAvailableOnlyChange }) => {
  const departments = Array.from(new Set(managers.map(manager => manager.department)));

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-medium text-gray-700">Filter by:</span>
        
        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="available-only"
            checked={availableOnly}
            onChange={(e) => onAvailableOnlyChange(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="available-only" className="text-sm text-gray-700">
            Available only
          </label>
        </div>
      </div>
    </div>
  );
};

// Main Component
const RelationshipManager: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'managers' | 'appointments'>('managers');

  // Mock data
  const relationshipManagers: RelationshipManager[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Relationship Manager',
      department: 'Wealth Management',
      bio: 'Specialized in investment portfolios and retirement planning with 10+ years of experience. Sarah helps clients build diversified investment strategies tailored to their financial goals.',
      expertise: ['Investment Planning', 'Retirement Funds', 'Portfolio Management'],
      clientsCount: 245,
      satisfactionRate: 98,
      isAvailable: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      phone: '+1 (555) 987-6543',
      position: 'Loan Specialist',
      department: 'Lending Services',
      bio: 'Expert in business loans, mortgages, and personal lending solutions. Michael has helped over 500 clients secure funding for their dreams and business ventures.',
      expertise: ['Business Loans', 'Mortgages', 'Personal Loans'],
      clientsCount: 189,
      satisfactionRate: 96,
      isAvailable: false,
      nextAvailable: '2024-01-15T10:00:00'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      phone: '+1 (555) 456-7890',
      position: 'Insurance Advisor',
      department: 'Insurance Services',
      bio: 'Focused on life insurance, health coverage, and business insurance solutions. Emily provides comprehensive risk management strategies for individuals and businesses.',
      expertise: ['Life Insurance', 'Health Insurance', 'Business Insurance'],
      clientsCount: 176,
      satisfactionRate: 97,
      isAvailable: true
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david.t@company.com',
      phone: '+1 (555) 234-5678',
      position: 'Investment Advisor',
      department: 'Wealth Management',
      bio: 'Specializes in stock market investments and mutual funds. David provides expert guidance on market trends and investment opportunities.',
      expertise: ['Stock Investments', 'Mutual Funds', 'Market Analysis'],
      clientsCount: 156,
      satisfactionRate: 95,
      isAvailable: true
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.w@company.com',
      phone: '+1 (555) 345-6789',
      position: 'Mortgage Consultant',
      department: 'Lending Services',
      bio: 'Expert in residential and commercial mortgages. Lisa helps clients navigate the home buying process with competitive loan options.',
      expertise: ['Residential Mortgages', 'Commercial Mortgages', 'Refinancing'],
      clientsCount: 132,
      satisfactionRate: 94,
      isAvailable: false,
      nextAvailable: '2024-01-16T14:00:00'
    }
  ];

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

  // Filter managers
  const filteredManagers = useMemo(() => {
    return relationshipManagers.filter(manager => {
      const departmentMatch = !selectedDepartment || manager.department === selectedDepartment;
      const availabilityMatch = !availableOnly || manager.isAvailable;
      return departmentMatch && availabilityMatch;
    });
  }, [selectedDepartment, availableOnly]);

  // Event handlers
  const handleScheduleMeeting = (managerId: string) => {
    console.log('Schedule meeting with manager:', managerId);
    alert(`Scheduling meeting with manager ${managerId}`);
  };

  const handleSendMessage = (managerId: string) => {
    console.log('Send message to manager:', managerId);
    alert(`Sending message to manager ${managerId}`);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Relationship Managers</h1>
          <p className="text-gray-600 mt-2">
            Connect with our expert relationship managers for personalized financial guidance across loans, investments, and insurance
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('managers')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'managers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Our Team ({filteredManagers.length})
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
            </nav>
          </div>
        </div>

        {activeTab === 'managers' ? (
          <>
            {/* Filters */}
            <ManagerFilters
              managers={relationshipManagers}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              availableOnly={availableOnly}
              onAvailableOnlyChange={setAvailableOnly}
            />

            {/* Managers Grid */}
            {filteredManagers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p className="mt-4 text-gray-500 text-lg">No relationship managers found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results</p>
                <button 
                  onClick={() => {
                    setSelectedDepartment('');
                    setAvailableOnly(false);
                  }}
                  className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredManagers.map((manager) => (
                  <ManagerCard
                    key={manager.id}
                    manager={manager}
                    onScheduleMeeting={handleScheduleMeeting}
                    onSendMessage={handleSendMessage}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <AppointmentsList
            appointments={appointments}
            onReschedule={handleRescheduleAppointment}
            onCancel={handleCancelAppointment}
            onScheduleNew={handleScheduleNewAppointment}
          />
        )}
      </div>
    </div>
  );
};

export default RelationshipManager;