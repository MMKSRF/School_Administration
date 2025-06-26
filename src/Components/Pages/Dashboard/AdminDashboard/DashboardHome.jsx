// src/AdminDashboard/DashboardHome.jsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import WelcomeBanner from './DashboardWidgets/WelcomeBanner';
import SchoolStats from './DashboardWidgets/SchoolStats';

const DashboardHome = () => {
  const contentRef = useRef();
  
  useEffect(() => {
    gsap.from(contentRef.current.children, {
      y: 0,
      opacity: 100,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    });
  }, []);

  const quickActions = [
    { 
      title: 'Add New Teacher', 
      description: 'Add a new teacher to your school staff', 
      icon: '👩‍🏫',
      path: '/admin-dashboard/teachers',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    { 
      title: 'Set Period Times', 
      description: 'Configure your school schedule periods', 
      icon: '⏰',
      path: '/admin-dashboard/periods',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    { 
      title: 'Create Schedule', 
      description: 'Generate or edit your school timetable', 
      icon: '📅',
      path: '/admin-dashboard/schedule/create',
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    { 
      title: 'Check Conflicts', 
      description: 'Resolve timetable scheduling issues', 
      icon: '⚠️',
      path: '/admin-dashboard/conflicts',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Added new teacher', details: 'Alemnesh Kassahun', time: '2 hours ago' },
    { id: 2, action: 'Updated schedule', details: 'Grade 10B Math period', time: '5 hours ago' },
    { id: 3, action: 'Resolved conflict', details: 'Teacher double-booking on Monday', time: '1 day ago' },
    { id: 4, action: 'Set period times', details: 'Added break period', time: '2 days ago' }
  ];

  return (
    <div ref={contentRef}>
      <WelcomeBanner />
      <SchoolStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {quickActions.map((action, index) => (
                <Link 
                  to={action.path}
                  key={index}
                  className={`p-3 md:p-4 rounded-lg border hover:shadow-md transition-shadow flex items-start ${action.color}`}
                >
                  <span className="text-2xl mr-3">{action.icon}</span>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-xs md:text-sm mt-1">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-700">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="mr-3 mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Timetable Preview */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">Timetable Preview</h2>
          <Link 
            to="/admin-dashboard/timetable" 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Full Timetable
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-100">Time/Day</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Monday</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Tuesday</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Wednesday</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Thursday</th>
                <th className="border border-gray-300 p-2 bg-gray-100">Friday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">8:00 - 8:45</td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-blue-100 text-blue-800 text-xs md:text-sm p-1 rounded">Math - Grade 9A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-green-100 text-green-800 text-xs md:text-sm p-1 rounded">Science - Grade 10B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-purple-100 text-purple-800 text-xs md:text-sm p-1 rounded">English - Grade 9B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-yellow-100 text-yellow-800 text-xs md:text-sm p-1 rounded">History - Grade 10A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-red-100 text-red-800 text-xs md:text-sm p-1 rounded">Amharic - Grade 9A</div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">8:50 - 9:35</td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-green-100 text-green-800 text-xs md:text-sm p-1 rounded">Science - Grade 9B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-blue-100 text-blue-800 text-xs md:text-sm p-1 rounded">Math - Grade 10A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-yellow-100 text-yellow-800 text-xs md:text-sm p-1 rounded">History - Grade 9A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-purple-100 text-purple-800 text-xs md:text-sm p-1 rounded">English - Grade 10B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-red-100 text-red-800 text-xs md:text-sm p-1 rounded">Amharic - Grade 10A</div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">Break</td>
                <td colSpan="5" className="border border-gray-300 p-2 bg-gray-50 text-center text-gray-500">
                  11:15 - 11:45
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">11:45 - 12:30</td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-purple-100 text-purple-800 text-xs md:text-sm p-1 rounded">English - Grade 10A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-red-100 text-red-800 text-xs md:text-sm p-1 rounded">Amharic - Grade 9B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-blue-100 text-blue-800 text-xs md:text-sm p-1 rounded">Math - Grade 10B</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-green-100 text-green-800 text-xs md:text-sm p-1 rounded">Science - Grade 9A</div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="bg-yellow-100 text-yellow-800 text-xs md:text-sm p-1 rounded">History - Grade 10B</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;