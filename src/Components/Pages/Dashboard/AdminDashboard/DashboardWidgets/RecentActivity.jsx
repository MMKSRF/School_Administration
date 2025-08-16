// src/Components/Pages/Dashboard/AdminDashboard/DashboardWidgets/RecentActivity.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  FaUserPlus, 
  FaChalkboardTeacher, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaClock
} from 'react-icons/fa';

const RecentActivity = ({ activities }) => {
  const containerRef = useRef();
  const itemRefs = useRef([]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemRefs.current, {
        y: 16,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [activities]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'enrollment':
        return <FaUserPlus className="text-green-500" />;
      case 'approval':
        return <FaCheckCircle className="text-blue-500" />;
      case 'conflict':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'teacher':
        return <FaChalkboardTeacher className="text-indigo-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'enrollment':
        return 'bg-green-100 text-green-800';
      case 'approval':
        return 'bg-blue-100 text-blue-800';
      case 'conflict':
        return 'bg-yellow-100 text-yellow-800';
      case 'teacher':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div 
            key={index}
            ref={el => itemRefs.current[index] = el}
            className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="flex-shrink-0 mt-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
            </div>
            
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {activity.description}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-400">
                <span>{activity.time}</span>
                {activity.action && (
                  <button className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium">
                    {activity.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {activities?.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No recent activities</div>
            <p className="text-gray-500 text-sm">
              All caught up! New activities will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;