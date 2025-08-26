// src/Components/Pages/Dashboard/AdminDashboard/DashboardHome.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaChartLine,
  FaCalendarAlt,
  FaFileExport,
  FaCog
} from 'react-icons/fa';
import WelcomeBanner from '../../../Ui/Basics/WelcomeBanner.jsx'

const DashboardHome = () => {
  const containerRef = useRef();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.welcome-section', {
        y: 20,
        opacity: 100,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.from('.stat-card', {
        y: 20,
        opacity: 100,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out'
      });
      
      gsap.from('.quick-action', {
        y: 10,
        opacity: 100,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.6,
        ease: 'back.out(1.2)'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '1,248', label: 'Total Students', icon: <FaUsers className="text-indigo-500" />, change: '+3.2%' },
    { value: '58', label: 'Teaching Staff', icon: <FaChalkboardTeacher className="text-indigo-500" />, change: '+1.8%' },
    { value: '42', label: 'Active Classes', icon: <FaSchool className="text-indigo-500" />, change: '0%' },
    { value: '94.5%', label: 'Attendance Rate', icon: <FaChartLine className="text-indigo-500" />, change: '-0.7%' }
  ];

  const quickActions = [
    { 
      title: 'Schedule Management', 
      icon: <FaCalendarAlt className="text-indigo-600 text-xl" />,
      link: '/admin/schedule',
      color: 'bg-indigo-100'
    },
    { 
      title: 'Create Reports', 
      icon: <FaFileExport className="text-indigo-600 text-xl" />,
      link: '/admin/reports',
      color: 'bg-green-100'
    },
    { 
      title: 'System Settings', 
      icon: <FaCog className="text-indigo-600 text-xl" />,
      link: '/admin/settings',
      color: 'bg-purple-100'
    }
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Welcome Section */}

       < WelcomeBanner
           userName={'Admin Perez Endale'}
           message={"Here's what's happening with your school today. You have 3 pending requests and 2 schedule conflicts to resolve."}
           userRoleMessage={"This is User RoleMessage"}
       />

      {/*<div className="welcome-section bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">*/}
      {/*  <div className="p-6 md:p-8">*/}
      {/*    <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome back, Admin!</h1>*/}
      {/*    <p className="text-indigo-100 mt-2 max-w-2xl">*/}
      {/*      Here's what's happening with your school today. You have 3 pending requests and 2 schedule conflicts to resolve.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</div>*/}


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-card bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-indigo-600">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="quick-action"
          >
            <div className={`${action.color} rounded-2xl shadow-xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]`}>
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{action.title}</h3>
              </div>
              <p className="mt-3 text-gray-600 flex-1">
                {action.title === 'Schedule Management' 
                  ? 'View and manage class schedules, resolve conflicts' 
                  : action.title === 'Create Reports' 
                    ? 'Generate attendance and performance reports' 
                    : 'Configure system settings and preferences'}
              </p>
              <div className="mt-4 text-indigo-600 font-medium flex items-center">
                Go to section
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaUsers />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">New student enrolled in Grade 5</p>
                <p className="text-sm text-gray-500 mt-1">Sarah Johnson joined Section B</p>
                <div className="mt-2 text-xs text-gray-400">10 minutes ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;