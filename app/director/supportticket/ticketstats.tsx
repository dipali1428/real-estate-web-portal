// app/admin/support-tickets/AdminTicketStats.tsx
'use client';

import React from 'react';
import { Inbox, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AdminTicketStats = ({ stats }: { stats: any }) => {
  const statCards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      icon: Inbox,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Open',
      value: stats.open,
      icon: AlertCircle,
      color: 'bg-red-400',
      textColor: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Closed',
      value: stats.closed,
      icon: XCircle,
      color: 'bg-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${stat.color} rounded-full transition-all duration-300`}
                style={{ 
                  width: stats.total > 0 
                    ? `${(stat.value / stats.total) * 100}%` 
                    : '0%' 
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.total > 0 
                ? `${Math.round((stat.value / stats.total) * 100)}% of total`
                : 'No tickets'
              }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTicketStats;