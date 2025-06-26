// src/AdminDashboard/DashboardWidgets/SchoolStats.jsx
import React from 'react';

const SchoolStats = () => {
  const stats = [
    { name: 'Total Teachers', value: 24, change: '+4%', changeType: 'positive' },
    { name: 'Active Classes', value: 18, change: '+2', changeType: 'positive' },
    { name: 'Periods Configured', value: 8, change: '0%', changeType: 'neutral' },
    { name: 'Schedule Conflicts', value: 3, change: '-1', changeType: 'negative' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat) => (
        <div 
          key={stat.name} 
          className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-600"
        >
          <div className="flex justify-between">
            <h3 className="text-sm md:text-base font-medium text-gray-700">{stat.name}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              stat.changeType === 'positive' ? 'bg-green-100 text-green-800' :
              stat.changeType === 'negative' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {stat.change}
            </span>
          </div>
          <p className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                stat.changeType === 'positive' ? 'bg-green-600' :
                stat.changeType === 'negative' ? 'bg-red-600' :
                'bg-blue-600'
              }`} 
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolStats;